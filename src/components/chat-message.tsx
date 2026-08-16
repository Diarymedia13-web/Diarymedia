"use client";

import type { ReactNode } from "react";

export type ChatRole = "user" | "assistant";

export interface ChatMessageData {
  id: string;
  role: ChatRole;
  content: string;
}

/**
 * Tô đậm phần nằm giữa cặp dấu ** ** .
 *
 * Cố tình dựng ra React node thay vì nhét HTML thô — không dùng
 * dangerouslySetInnerHTML, nên nội dung model trả về không thể chèn thẻ HTML
 * vào trang.
 */
function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const parts = text.split("**");
  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <strong key={`${keyPrefix}-b${index}`} className="font-semibold text-fg">
        {part}
      </strong>
    ) : (
      <span key={`${keyPrefix}-t${index}`}>{part}</span>
    ),
  );
}

/**
 * Bộ dựng Markdown tối giản: tiêu đề, gạch đầu dòng, danh sách đánh số, đoạn văn.
 *
 * Không dùng thư viện Markdown để khỏi phải cài thêm package. Đủ dùng cho phần
 * lớn nội dung agent sinh ra; cú pháp lạ sẽ hiển thị nguyên văn chứ không vỡ giao diện.
 */
function renderContent(content: string): ReactNode[] {
  const lines = content.split("\n");
  const nodes: ReactNode[] = [];
  let paragraph: string[] = [];

  const flushParagraph = (key: string) => {
    if (paragraph.length === 0) return;
    const text = paragraph.join("\n");
    nodes.push(
      <p key={key} className="whitespace-pre-wrap leading-relaxed">
        {renderInline(text, key)}
      </p>,
    );
    paragraph = [];
  };

  lines.forEach((line, index) => {
    const key = `l${index}`;
    const trimmed = line.trim();

    // Dòng trống → kết thúc đoạn hiện tại
    if (trimmed === "") {
      flushParagraph(`p${index}`);
      return;
    }

    // Tiêu đề: # / ## / ###
    const heading = /^(#{1,3})\s+(.*)$/.exec(trimmed);
    if (heading) {
      flushParagraph(`p${index}`);
      const level = heading[1].length;
      nodes.push(
        <p
          key={key}
          className={
            level === 1
              ? "mt-4 font-display text-lg font-bold text-fg first:mt-0"
              : "mt-3 font-display text-base font-semibold text-fg first:mt-0"
          }
        >
          {renderInline(heading[2], key)}
        </p>,
      );
      return;
    }

    // Đường kẻ ngang
    if (/^(-{3,}|\*{3,})$/.test(trimmed)) {
      flushParagraph(`p${index}`);
      nodes.push(<hr key={key} className="my-3 border-line" />);
      return;
    }

    // Gạch đầu dòng: - hoặc * hoặc •
    const bullet = /^[-*•]\s+(.*)$/.exec(trimmed);
    if (bullet) {
      flushParagraph(`p${index}`);
      nodes.push(
        <div key={key} className="flex gap-2 leading-relaxed">
          <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-brand" />
          <span>{renderInline(bullet[1], key)}</span>
        </div>,
      );
      return;
    }

    // Danh sách đánh số: 1. 2. 3.
    const numbered = /^(\d{1,2})[.)]\s+(.*)$/.exec(trimmed);
    if (numbered) {
      flushParagraph(`p${index}`);
      nodes.push(
        <div key={key} className="flex gap-2 leading-relaxed">
          <span className="shrink-0 font-mono text-sm text-brand">{numbered[1]}.</span>
          <span>{renderInline(numbered[2], key)}</span>
        </div>,
      );
      return;
    }

    paragraph.push(line);
  });

  flushParagraph("p-last");
  return nodes;
}

export default function ChatMessage({ message }: { message: ChatMessageData }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={
          isUser
            ? "max-w-[85%] rounded-2xl rounded-br-md bg-brand px-4 py-3 text-[0.95rem] text-brand-ink sm:max-w-[75%]"
            : "max-w-[92%] rounded-2xl rounded-bl-md border border-line bg-surface px-4 py-3 text-[0.95rem] text-fg sm:max-w-[85%]"
        }
      >
        {isUser ? (
          <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
        ) : (
          <div className="space-y-2">{renderContent(message.content)}</div>
        )}
      </div>
    </div>
  );
}
