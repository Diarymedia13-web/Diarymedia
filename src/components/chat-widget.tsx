"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, X, Send, Loader2 } from "lucide-react";
import { site } from "@/lib/site";
import { cx } from "./ui";

/**
 * Trợ lý AI chat với khách trên website — gọi qua Cloudflare Worker proxy
 * (xem worker/) để giữ ANTHROPIC_API_KEY an toàn, vì site xuất tĩnh không
 * chạy được backend. Xem NEXT_PUBLIC_CHAT_WORKER_URL trong .env.example.
 */

const WORKER_URL = process.env.NEXT_PUBLIC_CHAT_WORKER_URL ?? "";

type Role = "user" | "assistant";
interface ChatMessage {
  role: Role;
  content: string;
}
type Status = "idle" | "sending" | "error";

const GREETING: ChatMessage = {
  role: "assistant",
  content: `Xin chào! Mình là trợ lý ảo của ${site.name}. Bạn cần tư vấn về dịch vụ nào?`,
};

const FALLBACK_ERROR = `Không kết nối được với trợ lý. Vui lòng gọi ${site.contact.phoneDisplay} hoặc nhắn Zalo để được hỗ trợ trực tiếp.`;

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  if (!WORKER_URL) return null;

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || status === "sending") return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setStatus("sending");

    try {
      const res = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages
            .filter((m) => m !== GREETING)
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.error || FALLBACK_ERROR }]);
        setStatus("error");
        return;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      setStatus("idle");
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: FALLBACK_ERROR }]);
      setStatus("error");
    }
  }

  return (
    <div className="fixed bottom-5 left-5 z-40 flex flex-col items-start gap-2.5 sm:bottom-7 sm:left-7">
      {open && (
        <div className="flex h-[70vh] max-h-[520px] w-[90vw] max-w-[360px] flex-col overflow-hidden rounded-block border border-line bg-ink-2 shadow-2xl shadow-black/40">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <div>
              <p className="text-sm font-semibold text-fg">Trợ lý {site.name}</p>
              <p className="text-xs text-fg-dim">Thường trả lời ngay</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Đóng trợ lý"
              className="cursor-pointer rounded-full p-1.5 text-fg-muted transition-colors hover:bg-surface hover:text-fg"
            >
              <X size={18} aria-hidden />
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cx("flex", m.role === "user" ? "justify-end" : "justify-start")}
              >
                <p
                  className={cx(
                    "max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm",
                    m.role === "user" ? "bg-brand text-brand-ink" : "bg-surface text-fg",
                  )}
                >
                  {m.content}
                </p>
              </div>
            ))}
            {status === "sending" && (
              <div className="flex justify-start">
                <span className="flex items-center gap-2 rounded-2xl bg-surface px-4 py-2.5 text-sm text-fg-muted">
                  <Loader2 size={14} className="animate-spin" aria-hidden />
                  Đang trả lời…
                </span>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-line p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập câu hỏi của bạn…"
              className="flex-1 rounded-full border border-line bg-ink px-4 py-2.5 text-sm text-fg placeholder:text-fg-dim focus:border-brand focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === "sending" || !input.trim()}
              aria-label="Gửi"
              className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-brand text-brand-ink transition-colors hover:bg-brand-light disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send size={16} strokeWidth={2.4} aria-hidden />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Đóng trợ lý" : "Mở trợ lý AI"}
        className="flex size-14 cursor-pointer items-center justify-center rounded-full bg-brand text-brand-ink shadow-xl shadow-brand/25 transition-all duration-300 hover:bg-brand-light active:scale-95"
      >
        {open ? (
          <X size={22} strokeWidth={2.4} aria-hidden />
        ) : (
          <Sparkles size={22} strokeWidth={2.4} aria-hidden />
        )}
      </button>
    </div>
  );
}
