"use client";

import { useEffect, useRef } from "react";
import { ArrowUp, LoaderCircle } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  /** Đang chờ trợ lý trả lời — khoá ô nhập và đổi nút thành vòng xoay. */
  isLoading: boolean;
}

/** Chiều cao tối đa của ô nhập trước khi bật thanh cuộn (px). */
const MAX_HEIGHT = 200;

export default function ChatInput({
  value,
  onChange,
  onSubmit,
  isLoading,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Ô nhập tự cao dần theo nội dung, chạm trần thì cuộn.
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, MAX_HEIGHT)}px`;
  }, [value]);

  const canSend = value.trim().length > 0 && !isLoading;

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    // Enter gửi, Shift+Enter xuống dòng.
    // Bỏ qua khi bộ gõ tiếng Việt đang ghép chữ, tránh gửi nhầm giữa chừng.
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      if (canSend) onSubmit();
    }
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (canSend) onSubmit();
      }}
      className="flex items-end gap-2 rounded-2xl border border-line bg-surface p-2 focus-within:border-brand/60"
    >
      <label htmlFor="agent-input" className="sr-only">
        Nhập yêu cầu cho trợ lý
      </label>
      <textarea
        id="agent-input"
        ref={textareaRef}
        rows={1}
        value={value}
        disabled={isLoading}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Nhập yêu cầu của sếp… (Enter để gửi, Shift + Enter để xuống dòng)"
        className="max-h-[200px] flex-1 resize-none bg-transparent px-2 py-2 text-[0.95rem] text-fg outline-none placeholder:text-fg-dim disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={!canSend}
        aria-label={isLoading ? "Đang xử lý" : "Gửi yêu cầu"}
        className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand text-brand-ink transition-opacity disabled:opacity-40"
      >
        {isLoading ? (
          <LoaderCircle className="size-5 animate-spin" aria-hidden />
        ) : (
          <ArrowUp className="size-5" aria-hidden />
        )}
      </button>
    </form>
  );
}
