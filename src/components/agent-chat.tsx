"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AlertTriangle, PlusCircle, Sparkles } from "lucide-react";
import ChatInput from "./chat-input";
import ChatMessage, { type ChatMessageData } from "./chat-message";

/**
 * Khoá lưu lịch sử trong localStorage.
 * Có đánh số phiên bản: đổi cấu trúc dữ liệu thì tăng số, bản cũ tự bị bỏ qua
 * thay vì làm vỡ giao diện.
 */
const STORAGE_KEY = "diary-business-agent:v1";

/** Số tin nhắn tối đa giữ lại. Khớp với giới hạn của API. */
const MAX_STORED = 40;

const SUGGESTIONS = [
  "Viết 3 bài Facebook giới thiệu dịch vụ quay TVC cho doanh nghiệp vừa và nhỏ",
  "Lập kế hoạch marketing 1 tháng cho một quán cà phê mới mở tại Đà Nẵng",
  "Viết kịch bản video TikTok 30 giây quảng bá dịch vụ thiết kế website",
  "Soạn proposal báo giá gói truyền thông tổng thể cho khách hàng ngành F&B",
];

function createId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/** Đọc lịch sử đã lưu. Dữ liệu hỏng thì trả mảng rỗng, không ném lỗi. */
function loadHistory(): ChatMessageData[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((item): item is ChatMessageData => {
      if (typeof item !== "object" || item === null) return false;
      const { id, role, content } = item as Record<string, unknown>;
      return (
        typeof id === "string" &&
        (role === "user" || role === "assistant") &&
        typeof content === "string"
      );
    });
  } catch {
    return [];
  }
}

export default function AgentChat() {
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  /** Đã nạp xong localStorage chưa — tránh ghi đè lịch sử bằng mảng rỗng. */
  const [isHydrated, setIsHydrated] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  // Nạp lịch sử sau khi component gắn vào DOM.
  // Không đọc localStorage lúc render, nếu không HTML dựng ở server và ở
  // trình duyệt sẽ lệch nhau (hydration mismatch).
  useEffect(() => {
    setMessages(loadHistory());
    setIsHydrated(true);
  }, []);

  // Lưu lại mỗi khi lịch sử đổi.
  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(messages.slice(-MAX_STORED)),
      );
    } catch {
      // Hết dung lượng hoặc trình duyệt chặn — bỏ qua, chat vẫn chạy bình thường.
    }
  }, [messages, isHydrated]);

  // Tự cuộn xuống tin mới nhất.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading]);

  /** Gửi toàn bộ hội thoại lên API và ghép câu trả lời vào danh sách. */
  const requestReply = useCallback(async (history: ChatMessageData[]) => {
    setIsLoading(true);
    setError(null);

    try {
      // Có dấu / ở cuối: next.config bật `trailingSlash`, gọi "/api/agent"
      // sẽ bị chuyển hướng 308 thừa một nhịp.
      const response = await fetch("/api/agent/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: history
            .slice(-MAX_STORED)
            .map(({ role, content }) => ({ role, content })),
        }),
      });

      const data: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        const message =
          data && typeof data === "object" && typeof (data as { error?: unknown }).error === "string"
            ? (data as { error: string }).error
            : "Trợ lý đang gặp sự cố. Sếp thử lại sau ít phút.";
        setError(message);
        return;
      }

      const reply =
        data && typeof data === "object" && typeof (data as { reply?: unknown }).reply === "string"
          ? (data as { reply: string }).reply
          : "";

      if (!reply) {
        setError("Trợ lý trả về nội dung rỗng. Sếp thử gửi lại giúp em.");
        return;
      }

      setMessages((previous) => [
        ...previous,
        { id: createId(), role: "assistant", content: reply },
      ]);
    } catch {
      setError("Không kết nối được tới máy chủ. Sếp kiểm tra mạng rồi thử lại.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendMessage = useCallback(
    (text: string) => {
      const content = text.trim();
      if (!content || isLoading) return;

      const next: ChatMessageData[] = [
        ...messages,
        { id: createId(), role: "user", content },
      ];
      setMessages(next);
      setInput("");
      void requestReply(next);
    },
    [isLoading, messages, requestReply],
  );

  function startNewConversation() {
    setMessages([]);
    setInput("");
    setError(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Không xoá được thì thôi — trạng thái trong bộ nhớ đã được dọn.
    }
  }

  const isEmpty = messages.length === 0;

  return (
    <div className="flex min-h-[70vh] flex-col gap-4">
      {/* ---------- Thanh tiêu đề ---------- */}
      <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
        <div>
          <h1 className="font-display text-xl font-bold text-fg sm:text-2xl">
            Diary Business Agent
          </h1>
          <p className="mt-1 text-sm text-fg-muted">
            Trợ lý AI soạn nội dung, kế hoạch và proposal cho đội ngũ agency
          </p>
        </div>
        <button
          type="button"
          onClick={startNewConversation}
          disabled={isEmpty && !error}
          className="flex shrink-0 items-center gap-2 rounded-xl border border-line px-3 py-2 text-sm text-fg-muted transition-colors hover:border-brand/60 hover:text-fg disabled:opacity-40 disabled:hover:border-line disabled:hover:text-fg-muted"
        >
          <PlusCircle className="size-4" aria-hidden />
          <span className="hidden sm:inline">Cuộc trò chuyện mới</span>
          <span className="sm:hidden">Mới</span>
        </button>
      </div>

      {/* ---------- Khung hội thoại ---------- */}
      <div className="flex-1 space-y-4 overflow-y-auto">
        {isEmpty && (
          <div className="py-6">
            <div className="mb-4 flex items-center gap-2 text-sm text-fg-muted">
              <Sparkles className="size-4 text-brand" aria-hidden />
              <span>Sếp thử bắt đầu bằng một trong các yêu cầu sau:</span>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => sendMessage(suggestion)}
                  disabled={isLoading}
                  className="rounded-xl border border-line bg-surface/60 px-4 py-3 text-left text-sm leading-relaxed text-fg-muted transition-colors hover:border-brand/60 hover:text-fg disabled:opacity-50"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {/* Trạng thái đang xử lý */}
        {isLoading && (
          <div className="flex justify-start" aria-live="polite">
            <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-line bg-surface px-4 py-3 text-sm text-fg-muted">
              <span className="flex gap-1" aria-hidden>
                <span className="size-1.5 animate-bounce rounded-full bg-brand [animation-delay:-0.3s]" />
                <span className="size-1.5 animate-bounce rounded-full bg-brand [animation-delay:-0.15s]" />
                <span className="size-1.5 animate-bounce rounded-full bg-brand" />
              </span>
              Trợ lý đang soạn nội dung…
            </div>
          </div>
        )}

        {/* Thông báo lỗi */}
        {error && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-brand-deep/50 bg-brand-deep/10 px-4 py-3 text-sm text-fg"
          >
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
            <div className="flex-1">
              <p className="leading-relaxed">{error}</p>
              {messages.length > 0 && messages[messages.length - 1].role === "user" && (
                <button
                  type="button"
                  onClick={() => void requestReply(messages)}
                  disabled={isLoading}
                  className="mt-2 text-sm font-medium text-brand underline underline-offset-4 disabled:opacity-50"
                >
                  Gửi lại
                </button>
              )}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ---------- Ô nhập ---------- */}
      <div className="space-y-2">
        <ChatInput
          value={input}
          onChange={setInput}
          onSubmit={() => sendMessage(input)}
          isLoading={isLoading}
        />
        <p className="text-center text-xs text-fg-dim">
          Lịch sử chỉ lưu tạm trên trình duyệt này. Trợ lý có thể nhầm — hãy kiểm tra lại
          số liệu và thông tin khách hàng trước khi dùng.
        </p>
      </div>
    </div>
  );
}
