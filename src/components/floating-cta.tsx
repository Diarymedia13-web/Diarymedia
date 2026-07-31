"use client";

import { useEffect, useState } from "react";
import { Phone, MessageCircle, X, MessagesSquare } from "lucide-react";
import { site } from "@/lib/site";
import { cx } from "./ui";

/**
 * Cụm nút liên hệ nhanh nổi ở góc phải — Zalo, Messenger, gọi điện.
 * Chỉ xuất hiện sau khi người dùng đã cuộn qua vùng hero để không che nội dung đầu trang.
 */
export default function FloatingCta() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const actions = [
    {
      label: "Chat qua Zalo",
      href: site.contact.zalo,
      icon: MessageCircle,
      className: "bg-[#0068ff] text-white hover:bg-[#0058db]",
    },
    {
      label: "Nhắn tin Messenger",
      href: site.contact.messenger,
      icon: MessagesSquare,
      className: "bg-[#8b5cf6] text-white hover:bg-[#7c48f0]",
    },
    {
      label: `Gọi ${site.contact.phoneDisplay}`,
      href: `tel:${site.contact.phoneIntl}`,
      icon: Phone,
      className: "bg-brand text-brand-ink hover:bg-brand-light",
    },
  ];

  return (
    <div
      className={cx(
        "fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5 transition-all duration-500 sm:bottom-7 sm:right-7",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <div
        id="quick-contact-actions"
        hidden={!open}
        className="flex flex-col items-end gap-2.5"
      >
        {actions.map(({ label, href, icon: Icon, className }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("tel:") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className={cx(
              "flex cursor-pointer items-center gap-2.5 rounded-full py-2.5 pl-4 pr-5 text-sm font-semibold shadow-lg shadow-black/40 transition-colors duration-300",
              className,
            )}
          >
            <Icon size={17} strokeWidth={2.3} aria-hidden />
            {label}
          </a>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="quick-contact-actions"
        aria-label={open ? "Đóng liên hệ nhanh" : "Mở liên hệ nhanh"}
        className="flex size-14 cursor-pointer items-center justify-center rounded-full bg-brand text-brand-ink shadow-xl shadow-brand/25 transition-all duration-300 hover:bg-brand-light active:scale-95"
      >
        {open ? (
          <X size={22} strokeWidth={2.4} aria-hidden />
        ) : (
          <MessageCircle size={22} strokeWidth={2.4} aria-hidden />
        )}
      </button>
    </div>
  );
}
