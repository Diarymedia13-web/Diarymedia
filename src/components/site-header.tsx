"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { ButtonLink, cx } from "./ui";

const nav = [
  { href: "/", label: "Trang chủ" },
  { href: "/giai-phap/", label: "Giải pháp" },
  { href: "/du-an/", label: "Dự án" },
  { href: "/ve-chung-toi/", label: "Về chúng tôi" },
];

// Landing page chiến dịch (/audit) dùng nav rút gọn, chỉ neo trong cùng
// trang — không dẫn khách sang trang khác khiến traffic quảng cáo thoát funnel.
const auditNav = [
  { href: "#cach-tiep-can", label: "Giải pháp" },
  { href: "#growth-system", label: "Quy trình" },
  { href: "#audit-scope", label: "Audit" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  // Landing chiến dịch: /audit dùng nav rút gọn; /thank-you đi theo luôn vì
  // là điểm đến cuối của cùng funnel, không cần nav đầy đủ của site chính.
  const isAudit = pathname.startsWith("/audit") || pathname.startsWith("/thank-you");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Đóng menu khi đổi trang thật. Bấm mục neo (#id, dùng ở nav /audit)
  // KHÔNG đổi pathname nên effect này không chạy — phải đóng menu thủ công
  // ở onClick của từng mục trong menu di động (xem bên dưới), nếu không
  // menu che kín màn hình sẽ không tự tắt sau khi bấm.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, ""));

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cx(
          "mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 transition-all duration-500 sm:px-8",
          scrolled ? "py-3" : "py-5",
        )}
      >
        <Link
          href="/"
          className="relative z-10 flex shrink-0 items-center"
          aria-label={`${site.name} — về trang chủ`}
        >
          <Image
            src="/images/brand/logo-wordmark.png"
            alt={site.name}
            width={573}
            height={388}
            priority
            className="h-10 w-auto sm:h-11"
          />
        </Link>

        {/* Điều hướng desktop — viên thuốc kính mờ nổi trên nội dung */}
        <nav
          aria-label="Điều hướng chính"
          className={cx(
            "hidden items-center gap-1 rounded-full border px-1.5 py-1.5 backdrop-blur-xl transition-colors duration-500 lg:flex",
            scrolled ? "border-line bg-surface/85" : "border-line/70 bg-surface/60",
          )}
        >
          {(isAudit ? auditNav : nav).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={!isAudit && isActive(item.href) ? "page" : undefined}
              className={cx(
                "cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                !isAudit && isActive(item.href)
                  ? "bg-ink-2 text-fg"
                  : "text-fg-muted hover:bg-ink-2/70 hover:text-fg",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          {!isAudit && (
            <a
              href={`tel:${site.contact.phoneIntl}`}
              className="hidden cursor-pointer items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm font-medium text-fg-muted transition-colors duration-300 hover:border-brand/50 hover:text-fg md:inline-flex"
            >
              <Phone size={15} strokeWidth={2.2} aria-hidden />
              {site.contact.phoneDisplay}
            </a>
          )}

          <span className="hidden md:block">
            <ButtonLink href={isAudit ? "#dang-ky-audit" : "/lien-he/"} variant="primary">
              {isAudit ? "Đăng ký Audit" : "Nhận tư vấn"}
            </ButtonLink>
          </span>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Đóng menu" : "Mở menu"}
            className="relative z-10 flex size-11 cursor-pointer items-center justify-center rounded-full border border-line bg-surface/85 text-fg backdrop-blur-xl transition-colors hover:border-brand/50 lg:hidden"
          >
            {open ? <X size={19} aria-hidden /> : <Menu size={19} aria-hidden />}
          </button>
        </div>
      </div>

      {/* Menu di động toàn màn hình */}
      <div
        id="mobile-nav"
        hidden={!open}
        // z-45: dưới header (z-50, vẫn bấm được nút đóng) nhưng trên mọi
        // thanh CTA dính cuối trang trong nội dung (vd. sticky CTA ở /audit,
        // z-40) — nếu không, menu mở ra vẫn thấy thanh CTA đè lên trên.
        className="fixed inset-0 z-[45] bg-ink/97 backdrop-blur-2xl lg:hidden"
      >
        <nav aria-label="Điều hướng di động" className="flex h-full flex-col justify-center px-7">
          {(isAudit ? auditNav : nav).map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cx(
                "flex cursor-pointer items-baseline gap-4 border-b border-line py-5 text-3xl font-bold tracking-tight transition-colors sm:text-4xl",
                !isAudit && isActive(item.href) ? "text-brand" : "text-fg hover:text-brand",
              )}
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="t-label text-fg-dim">{String(i + 1).padStart(2, "0")}</span>
              {item.label}
            </Link>
          ))}

          <div className="mt-10 flex flex-col gap-3">
            <ButtonLink
              href={isAudit ? "#dang-ky-audit" : "/lien-he/"}
              variant="solid"
              className="w-fit"
              onClick={() => setOpen(false)}
            >
              {isAudit ? "Đăng ký Audit miễn phí" : "Nhận tư vấn miễn phí"}
            </ButtonLink>
            <a
              href={`tel:${site.contact.phoneIntl}`}
              className="t-label cursor-pointer text-fg-muted"
            >
              Hotline · {site.contact.phoneDisplay}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
