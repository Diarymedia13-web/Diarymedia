import { site } from "../../src/lib/site";
import { tracks, solutionServices, productionServices, processSteps, faqs } from "../../src/lib/services";

interface Env {
  ANTHROPIC_API_KEY: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const ALLOWED_ORIGINS = new Set([site.url, "http://localhost:3000"]);

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2000;
const MODEL = "claude-haiku-4-5";

function buildSystemPrompt(): string {
  const solutionList = solutionServices.map((s) => `- ${s.title}: ${s.summary}`).join("\n");
  const productionList = productionServices.map((s) => `- ${s.title}: ${s.summary}`).join("\n");
  const processList = processSteps
    .map((p) => `${p.no}. ${p.title} (${p.duration}): ${p.body}`)
    .join("\n");
  const faqList = faqs.map((f) => `Hỏi: ${f.q}\nĐáp: ${f.a}`).join("\n\n");

  return `Bạn là trợ lý ảo của ${site.name}, tư vấn cho khách truy cập website ${site.url}.

Giới thiệu công ty:
${site.description}

--- ${tracks.solution.title} ---
${tracks.solution.lead}
${solutionList}

--- ${tracks.production.title} ---
${tracks.production.lead}
${productionList}

Quy trình làm việc:
${processList}

Câu hỏi thường gặp:
${faqList}

Thông tin liên hệ:
- Hotline: ${site.contact.phoneDisplay}
- Email: ${site.contact.email}
- Zalo: ${site.contact.zalo}
- Địa chỉ: ${site.contact.address}
- Giờ làm việc: ${site.contact.workingHours}

Quy tắc trả lời:
- Chỉ trả lời dựa trên thông tin ở trên. Không bịa giá cụ thể hay cam kết ngoài phạm vi đã nêu.
- Nếu khách hỏi báo giá chi tiết, ngân sách cụ thể, hoặc điều gì bạn không chắc chắn, hãy hướng khách gọi hotline, nhắn Zalo, hoặc để lại thông tin qua form liên hệ trên website.
- Giọng văn tiếng Việt thân thiện, chuyên nghiệp, ngắn gọn, đi thẳng vào trọng tâm — tránh trả lời dài dòng.
- Nếu được hỏi có phải con người không, xác nhận thẳng thắn rằng bạn là trợ lý ảo của ${site.name}.`;
}

const SYSTEM_PROMPT = buildSystemPrompt();

function corsHeaders(origin: string | null): Record<string, string> {
  const allowOrigin = origin && ALLOWED_ORIGINS.has(origin) ? origin : "";
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

function json(body: unknown, status: number, headers: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...headers, "Content-Type": "application/json" },
  });
}

function fallbackMessage(): string {
  return `Vui lòng gọi ${site.contact.phoneDisplay} hoặc nhắn Zalo ${site.contact.zalo} để được hỗ trợ trực tiếp.`;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin");
    const headers = corsHeaders(origin);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    if (!origin || !ALLOWED_ORIGINS.has(origin)) {
      return json({ error: "Origin không được phép." }, 403, headers);
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405, headers);
    }

    let body: { messages?: ChatMessage[] };
    try {
      body = await request.json();
    } catch {
      return json({ error: "Dữ liệu gửi lên không hợp lệ." }, 400, headers);
    }

    const rawMessages = Array.isArray(body.messages) ? body.messages : [];
    if (rawMessages.length === 0) {
      return json({ error: "Thiếu nội dung tin nhắn." }, 400, headers);
    }

    const messages = rawMessages.slice(-MAX_MESSAGES).map((m) => ({
      role: m.role === "assistant" ? ("assistant" as const) : ("user" as const),
      content: String(m.content ?? "").slice(0, MAX_MESSAGE_LENGTH),
    }));

    if (!env.ANTHROPIC_API_KEY) {
      return json({ error: `Trợ lý chưa được cấu hình. ${fallbackMessage()}` }, 503, headers);
    }

    try {
      const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages,
        }),
      });

      if (!anthropicRes.ok) {
        return json({ error: `Trợ lý đang gặp sự cố. ${fallbackMessage()}` }, 502, headers);
      }

      const data = (await anthropicRes.json()) as {
        stop_reason?: string;
        content?: Array<{ type: string; text?: string }>;
      };

      if (data.stop_reason === "refusal") {
        return json(
          { reply: `Xin lỗi, mình chưa thể trả lời câu này. ${fallbackMessage()}` },
          200,
          headers,
        );
      }

      const textBlock = data.content?.find((b) => b.type === "text");
      const reply = textBlock?.text ?? `Xin lỗi, mình chưa có câu trả lời. ${fallbackMessage()}`;

      return json({ reply }, 200, headers);
    } catch {
      return json({ error: `Không kết nối được với trợ lý. ${fallbackMessage()}` }, 502, headers);
    }
  },
};
