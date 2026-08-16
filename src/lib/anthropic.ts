/**
 * Lớp gọi Anthropic Messages API bằng `fetch` — CHỈ CHẠY PHÍA SERVER.
 *
 * ⚠️ Không bao giờ import file này vào component có "use client".
 * `ANTHROPIC_API_KEY` chỉ tồn tại trong tiến trình Node của Next.js; biến môi
 * trường không có tiền tố `NEXT_PUBLIC_` nên Next sẽ không nhúng nó vào bundle
 * trình duyệt. Đây là lý do agent gọi qua `/api/agent` chứ không gọi thẳng
 * Anthropic từ phía client.
 *
 * Dùng `fetch` thay vì `@anthropic-ai/sdk` để không phải cài thêm package.
 */

import {
  AGENT_EFFORT,
  AGENT_MAX_TOKENS,
  AGENT_MODEL,
  AGENT_SYSTEM_PROMPT,
} from "./agent-prompt";

const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";

/** Phiên bản API — cố định theo tài liệu Anthropic, không phải ngày hôm nay. */
const ANTHROPIC_VERSION = "2023-06-01";

/**
 * Bật cơ chế dự phòng phía máy chủ của Anthropic. Claude Opus 5 có bộ lọc an
 * toàn có thể từ chối một số yêu cầu; khi đó Anthropic tự chạy lại trên model
 * dự phòng thay vì trả về lỗi từ chối. Không tốn thêm gì nếu không kích hoạt.
 */
const ANTHROPIC_BETA = "server-side-fallback-2026-07-01";

/** Chờ tối đa 2 phút. Bài dài (SEO, kịch bản, kế hoạch) cần thời gian soạn. */
const TIMEOUT_MS = 120_000;

export type AgentRole = "user" | "assistant";

export interface AgentMessage {
  role: AgentRole;
  content: string;
}

export type AgentResult =
  | { ok: true; reply: string }
  | { ok: false; status: number; message: string };

/** Khối nội dung Anthropic trả về. Chỉ khai báo phần mình thực sự đọc. */
interface AnthropicContentBlock {
  type: string;
  text?: string;
}

interface AnthropicResponse {
  content?: AnthropicContentBlock[];
  stop_reason?: string;
}

/**
 * Gộp các khối `text` thành một chuỗi.
 *
 * Quan trọng: Opus 5 bật suy luận sẵn nên mảng `content` còn chứa cả khối
 * `thinking` (phần chữ để rỗng). Lọc lấy đúng khối `text`, nếu không sẽ ghép
 * nhầm hoặc ra chuỗi rỗng.
 */
function extractText(data: AnthropicResponse): string {
  if (!Array.isArray(data.content)) return "";
  return data.content
    .filter((block) => block.type === "text" && typeof block.text === "string")
    .map((block) => block.text as string)
    .join("")
    .trim();
}

/**
 * Gọi Claude và trả về câu trả lời dạng văn bản.
 *
 * Hàm này KHÔNG bao giờ ném lỗi ra ngoài và KHÔNG bao giờ để lộ chi tiết kỹ
 * thuật (mã lỗi upstream, nội dung phản hồi, khóa API) cho phía gọi. Mọi tình
 * huống hỏng đều quy về một thông báo tiếng Việt dễ hiểu.
 */
export async function callAgent(messages: AgentMessage[]): Promise<AgentResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    // Ghi log để người vận hành biết đường sửa — không in giá trị khóa.
    console.error("[agent] Thiếu biến môi trường ANTHROPIC_API_KEY");
    return {
      ok: false,
      status: 503,
      message:
        "Trợ lý chưa được cấu hình khóa API. Vui lòng báo người quản trị thêm ANTHROPIC_API_KEY vào file .env.local rồi khởi động lại ứng dụng.",
    };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(ANTHROPIC_URL, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": ANTHROPIC_VERSION,
        "anthropic-beta": ANTHROPIC_BETA,
      },
      body: JSON.stringify({
        model: AGENT_MODEL,
        max_tokens: AGENT_MAX_TOKENS,
        system: AGENT_SYSTEM_PROMPT,
        messages,
        output_config: { effort: AGENT_EFFORT },
        fallbacks: "default",
      }),
    });

    if (!response.ok) {
      // Chỉ log mã trạng thái. Không log body — có thể vọng lại dữ liệu nhạy cảm.
      console.error(`[agent] Anthropic trả về mã ${response.status}`);

      if (response.status === 401 || response.status === 403) {
        return {
          ok: false,
          status: 503,
          message:
            "Khóa API không hợp lệ hoặc không đủ quyền. Vui lòng kiểm tra lại ANTHROPIC_API_KEY.",
        };
      }
      if (response.status === 429) {
        return {
          ok: false,
          status: 429,
          message:
            "Trợ lý đang nhận quá nhiều yêu cầu cùng lúc. Sếp chờ khoảng một phút rồi gửi lại giúp em.",
        };
      }
      if (response.status >= 500) {
        return {
          ok: false,
          status: 502,
          message:
            "Máy chủ Claude đang quá tải hoặc gặp sự cố tạm thời. Sếp thử lại sau ít phút.",
        };
      }
      return {
        ok: false,
        status: 502,
        message: "Không gửi được yêu cầu tới trợ lý. Sếp thử lại giúp em.",
      };
    }

    const data = (await response.json()) as AnthropicResponse;

    if (data.stop_reason === "refusal") {
      return {
        ok: false,
        status: 422,
        message:
          "Trợ lý từ chối xử lý yêu cầu này vì lý do an toàn nội dung. Sếp thử diễn đạt lại hoặc đổi sang yêu cầu khác.",
      };
    }

    const reply = extractText(data);

    if (!reply) {
      console.error("[agent] Phản hồi không có khối text nào");
      return {
        ok: false,
        status: 502,
        message: "Trợ lý trả về nội dung rỗng. Sếp thử gửi lại yêu cầu.",
      };
    }

    // Bị cắt vì chạm trần token — nói thật thay vì im lặng đưa bài dở dang.
    if (data.stop_reason === "max_tokens") {
      return {
        ok: true,
        reply: `${reply}\n\n---\n\n*[Nội dung bị cắt vì quá dài. Sếp nhắn "viết tiếp" để em soạn nốt phần còn lại.]*`,
      };
    }

    return { ok: true, reply };
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return {
        ok: false,
        status: 504,
        message:
          "Yêu cầu xử lý quá lâu nên đã dừng. Sếp thử chia nhỏ yêu cầu hoặc rút ngắn nội dung rồi gửi lại.",
      };
    }
    console.error("[agent] Lỗi mạng khi gọi Anthropic");
    return {
      ok: false,
      status: 502,
      message: "Không kết nối được tới trợ lý. Sếp kiểm tra mạng rồi thử lại.",
    };
  } finally {
    clearTimeout(timer);
  }
}
