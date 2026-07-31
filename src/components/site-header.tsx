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

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Đóng menu và khoá cuộn nền khi menu di động đang mở
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
          className="relative z-10 flex shrink-0 items-center gap-2.5"
          aria-label={`${site.name} — về trang chủ`}
        >
          <Image
            src="/images/brand/logo-mark.png"
            alt=""
            width={180}
            height={206}
            priority
            className="h-8 w-auto sm:h-9"
          />
          <span className="text-[15px] font-bold tracking-tight text-fg sm:text-base">
            Diary<span className="text-brand">Agency</span>
          </span>
        </Link>

        {/* Điều hướng desktop — viên thuốc kính mờ nổi trên nội dung */}
        <nav
          aria-label="Điều hướng chính"
          className={cx(
            "hidden items-center gap-1 rounded-full border px-1.5 py-1.5 backdrop-blur-xl transition-colors duration-500 lg:flex",
            scrolled ? "border-white/12 bg-ink-2/80" : "border-white/10 bg-white/[0.06]",
          )}
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cx(
                "cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                isActive(item.href)
                  ? "bg-white/12 text-fg"
                  : "text-fg-muted hover:bg-white/[0.07] hover:text-fg",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href={`tel:${site.contact.phoneIntl}`}
            className="hidden cursor-pointer items-center gap-2 rounded-full border border-white/12 px-4 py-2.5 text-sm font-medium text-fg-muted transition-colors duration-300 hover:border-brand/50 hover:text-fg md:inline-flex"
          >
            <Phone size={15} strokeWidth={2.2} aria-hidden />
            {site.contact.phoneDisplay}
          </a>

          <span className="hidden md:block">
            <ButtonLink href="/lien-he/" variant="primary">
              Nhận tư vấn
            </ButtonLink>
          </span>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Đóng menu" : "Mở menu"}
            className="relative z-10 flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/12 bg-ink-2/70 text-fg backdrop-blur-xl transition-colors hover:border-brand/50 lg:hidden"
          >
            {open ? <X size={19} aria-hidden /> : <Menu size={19} aria-hidden />}
          </button>
        </div>
      </div>

      {/* Menu di động toàn màn hình */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="fixed inset-0 z-0 bg-ink/97 backdrop-blur-2xl lg:hidden"
      >
        <nav aria-label="Điều hướng di động" className="flex h-full flex-col justify-center px-7">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={cx(
                "flex cursor-pointer items-baseline gap-4 border-b border-line py-5 text-3xl font-bold tracking-tight transition-colors sm:text-4xl",
                isActive(item.href) ? "text-brand" : "text-fg hover:text-brand",
              )}
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="t-label text-fg-dim">{String(i + 1).padStart(2, "0")}</span>
              {item.label}
            </Link>
          ))}

          <div className="mt-10 flex flex-col gap-3">
            <ButtonLink href="/lien-he/" variant="solid" className="w-fit">
              Nhận tư vấn miễn phí
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
