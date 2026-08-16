/**
 * API nội bộ của Diary Business Agent.
 *
 * POST /api/agent
 *   body:  { messages: [{ role: "user" | "assistant", content: string }, ...] }
 *   200:   { reply: string }
 *   4xx/5xx: { error: string }  ← luôn là tiếng Việt dễ hiểu, không có chi tiết kỹ thuật
 *
 * Route handler chỉ chạy phía server, nên `ANTHROPIC_API_KEY` không bao giờ
 * đi xuống trình duyệt.
 */

import { NextResponse } from "next/server";
import { callAgent, type AgentMessage, type AgentRole } from "@/lib/anthropic";

/*
 * Cố ý KHÔNG khai báo `export const dynamic = "force-dynamic"`.
 *
 * `next.config.mjs` đang bật `output: "export"`. Với cấu hình đó, chỉ cần có
 * dòng `dynamic` là Next.js ném lỗi ngay khi nạp module — hỏng cả ở chế độ
 * dev lẫn lúc build. Route handler vẫn chạy động bình thường dưới `next dev`
 * mà không cần khai báo này.
 */

/** Số lượt hội thoại tối đa gửi lên trong một yêu cầu. */
const MAX_MESSAGES = 40;

/** Độ dài tối đa một tin nhắn. Chặn người dùng dán nguyên quyển sách vào. */
const MAX_MESSAGE_LENGTH = 8000;

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

/** Kiểm tra một phần tử bất kỳ có đúng dạng tin nhắn hợp lệ không. */
function parseMessage(raw: unknown): AgentMessage | null {
  if (typeof raw !== "object" || raw === null) return null;

  const { role, content } = raw as { role?: unknown; content?: unknown };

  if (role !== "user" && role !== "assistant") return null;
  if (typeof content !== "string") return null;

  const trimmed = content.trim();
  if (trimmed.length === 0 || trimmed.length > MAX_MESSAGE_LENGTH) return null;

  return { role: role as AgentRole, content: trimmed };
}

export async function POST(request: Request) {
  // --- Kiểm tra định dạng gói tin ---
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return badRequest("Dữ liệu gửi lên không đúng định dạng.");
  }

  if (typeof body !== "object" || body === null) {
    return badRequest("Dữ liệu gửi lên không đúng định dạng.");
  }

  const { messages } = body as { messages?: unknown };

  if (!Array.isArray(messages)) {
    return badRequest("Thiếu danh sách tin nhắn.");
  }
  if (messages.length === 0) {
    return badRequest("Sếp chưa nhập nội dung yêu cầu.");
  }
  if (messages.length > MAX_MESSAGES) {
    return badRequest(
      "Cuộc trò chuyện đã quá dài. Sếp bấm “Cuộc trò chuyện mới” để bắt đầu lại giúp em.",
    );
  }

  // --- Kiểm tra từng tin nhắn ---
  const parsed: AgentMessage[] = [];
  for (const raw of messages) {
    const message = parseMessage(raw);
    if (!message) {
      return badRequest(
        `Có tin nhắn không hợp lệ hoặc dài quá ${MAX_MESSAGE_LENGTH.toLocaleString("vi-VN")} ký tự.`,
      );
    }
    parsed.push(message);
  }

  // Anthropic yêu cầu lượt đầu và lượt cuối đều phải là của người dùng.
  if (parsed[0].role !== "user") {
    return badRequest("Cuộc trò chuyện phải bắt đầu bằng tin nhắn của người dùng.");
  }
  if (parsed[parsed.length - 1].role !== "user") {
    return badRequest("Tin nhắn cuối cùng phải là của người dùng.");
  }

  // --- Gọi Claude ---
  const result = await callAgent(parsed);

  if (!result.ok) {
    return NextResponse.json({ error: result.message }, { status: result.status });
  }

  return NextResponse.json({ reply: result.reply });
}

/**
 * Mọi phương thức khác đều bị từ chối. Next.js tự trả 405 cho phương thức
 * không khai báo, nhưng khai báo GET tường minh giúp thông báo dễ hiểu hơn
 * khi ai đó mở thẳng URL này trên trình duyệt.
 */
export async function GET() {
  return NextResponse.json(
    { error: "Endpoint này chỉ nhận phương thức POST." },
    { status: 405, headers: { Allow: "POST" } },
  );
}
