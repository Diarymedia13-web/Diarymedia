"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, MessageCircle, MessagesSquare, Phone, X } from "lucide-react";
import { site } from "@/lib/site";
import {
  DIMO_CELEBRATE_EVENT,
  dimoConfig,
  pageHintFor,
  trackDimo,
  type DimoPose,
} from "@/lib/dimo";
import { cx } from "../ui";

const GREETED_KEY = "dimo_greeted";
const DISMISSED_KEY = "dimo_dismissed";

const session = {
  get(key: string) {
    try {
      return sessionStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string) {
    try {
      sessionStorage.setItem(key, "1");
    } catch {
      // Private mode — DIMO simply greets again next time.
    }
  },
};

/** Renders one pose. Swap this for a Lottie/Rive player later (Phase 3). */
function DimoFigure({ pose, className, priority }: { pose: DimoPose; className?: string; priority?: boolean }) {
  const art = dimoConfig.artwork[pose];
  return (
    <Image
      src={art.src}
      alt=""
      width={art.width}
      height={art.height}
      priority={priority}
      draggable={false}
      className={cx("pointer-events-none select-none", className)}
    />
  );
}

export default function DimoAssistant() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [bubble, setBubble] = useState<null | "greet" | "celebrate">(null);
  const [open, setOpen] = useState(false);
  const [pose, setPose] = useState<DimoPose>("wave");
  const [reaction, setReaction] = useState<"" | "pop" | "celebrate">("");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const hidden = !dimoConfig.enabled || dimoConfig.hiddenOn.some((p) => pathname.startsWith(p));

  // Appear after a short delay; greet once per browsing session.
  useEffect(() => {
    if (hidden) return;
    const t = window.setTimeout(() => {
      setVisible(true);
      if (!session.get(GREETED_KEY) && !session.get(DISMISSED_KEY)) {
        session.set(GREETED_KEY);
        window.setTimeout(() => setBubble("greet"), 900);
      }
    }, dimoConfig.appearDelayMs);
    return () => window.clearTimeout(t);
  }, [hidden]);

  // The greeting fades away by itself — never lingers over content.
  useEffect(() => {
    if (!bubble) return;
    const t = window.setTimeout(() => setBubble(null), bubble === "greet" ? 14000 : 6000);
    return () => window.clearTimeout(t);
  }, [bubble]);

  // Celebrate only when a form reports a VERIFIED successful submission.
  useEffect(() => {
    const onCelebrate = () => {
      setVisible(true);
      setPose("cheer");
      setReaction("celebrate");
      setBubble("celebrate");
      window.setTimeout(() => {
        setPose("wave");
        setReaction("");
      }, 4200);
    };
    window.addEventListener(DIMO_CELEBRATE_EVENT, onCelebrate);
    return () => window.removeEventListener(DIMO_CELEBRATE_EVENT, onCelebrate);
  }, []);

  // Pause idle motion while the tab is hidden.
  useEffect(() => {
    const onVis = () => rootRef.current?.setAttribute("data-paused", document.hidden ? "true" : "false");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const closePanel = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus({ preventScroll: true });
  }, []);

  // Close on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape, outside click, and focus trap while the panel is open.
  useEffect(() => {
    if (!open) return;
    // Focus the first service (not the close button) without scrolling the page.
    const raf = requestAnimationFrame(() =>
      panelRef.current?.querySelector<HTMLElement>("li a")?.focus({ preventScroll: true }),
    );
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePanel();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = [...panelRef.current.querySelectorAll<HTMLElement>("a,button")];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) closePanel(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      cancelAnimationFrame(raf);
    };
  }, [open, closePanel]);

  if (hidden) return null;

  function toggle() {
    setReaction("pop");
    window.setTimeout(() => setReaction((r) => (r === "pop" ? "" : r)), 450);
    setBubble(null);
    if (!open) trackDimo("dimo_open", { page: pathname });
    setOpen((v) => !v);
  }

  function dismissBubble() {
    session.set(DISMISSED_KEY);
    trackDimo("dimo_dismiss", { page: pathname });
    setBubble(null);
  }

  const { copy, services } = dimoConfig;

  return (
    <div
      ref={rootRef}
      data-paused="false"
      className={cx(
        "dimo-root fixed z-40 flex flex-col items-end",
        "bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] sm:bottom-6 sm:right-6",
        visible ? "dimo-enter" : "pointer-events-none opacity-0",
      )}
    >
      {/* ---------- Panel ---------- */}
      {open && (
        <div
          ref={panelRef}
          id="dimo-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="dimo-title"
          className="dimo-panel mb-3 w-[min(92vw,360px)] overflow-hidden rounded-[1.6rem] bg-[#fffaf3] text-[#3b2619] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.55)] ring-1 ring-[#f0dcc4]"
        >
          <div className="relative flex items-end gap-3 bg-gradient-to-br from-[#fff1e2] to-[#ffe2c6] px-5 pb-4 pt-5">
            <DimoFigure pose="heart" className="-mb-1 h-[72px] w-auto shrink-0" />
            <div className="min-w-0 pb-1 pr-7">
              <p id="dimo-title" className="text-[15px] font-bold leading-snug text-[#3b2619]">
                {copy.panelTitle}
              </p>
              <p className="mt-1 text-[13px] leading-snug text-[#7a5a44]">{copy.panelMessage}</p>
            </div>
            <button
              type="button"
              onClick={() => closePanel()}
              aria-label={copy.closeLabel}
              className="absolute right-3 top-3 flex size-8 cursor-pointer items-center justify-center rounded-full text-[#7a5a44] transition hover:bg-white/70 hover:text-[#3b2619]"
            >
              <X size={17} aria-hidden />
            </button>
          </div>

          <div className="px-4 pb-4 pt-3">
            <p className="mb-3 rounded-2xl bg-white px-3.5 py-2.5 text-[13px] leading-snug text-[#5c4130] shadow-sm">
              {pageHintFor(pathname)}
            </p>
            <ul className="flex flex-col gap-1.5">
              {services.map((s) => (
                <li key={s.id}>
                  <Link
                    href={s.href}
                    onClick={() => {
                      trackDimo(s.id === "expert" ? "dimo_contact_click" : "dimo_service_select", { service: s.id });
                      closePanel(false);
                    }}
                    className={cx(
                      "group flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-[14px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#e07a3f]",
                      s.id === "expert"
                        ? "mt-1 bg-[#f39a62] text-[#2a1206] hover:bg-[#f6ad7e]"
                        : "bg-[#fff3e6] text-[#3b2619] hover:bg-[#ffe6cc]",
                    )}
                  >
                    {s.label}
                    <ArrowUpRight size={16} className="shrink-0 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mb-2 mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#a07f68]">{copy.quickContactLabel}</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Zalo", href: site.contact.zalo, icon: MessageCircle, external: true },
                { label: "Messenger", href: site.contact.messenger, icon: MessagesSquare, external: true },
                { label: "Gọi ngay", href: `tel:${site.contact.phoneIntl}`, icon: Phone, external: false },
              ].map(({ label, href, icon: Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  onClick={() => trackDimo("dimo_contact_click", { channel: label })}
                  className="flex min-h-11 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl bg-white py-2 text-[12px] font-semibold text-[#5c4130] shadow-sm transition hover:text-[#c2622d] focus-visible:outline-2 focus-visible:outline-[#e07a3f]"
                >
                  <Icon size={17} aria-hidden />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ---------- Speech bubble ---------- */}
      {bubble && !open && (
        <div
          role="status"
          className="dimo-bubble relative mb-2 mr-2 max-w-[min(78vw,280px)] rounded-[1.25rem] rounded-br-md bg-[#fffaf3] py-3 pl-4 pr-9 text-[#3b2619] shadow-[0_18px_40px_-16px_rgba(0,0,0,0.55)] ring-1 ring-[#f0dcc4]"
        >
          {bubble === "greet" ? (
            <>
              <p className="text-[14px] font-bold leading-snug">{copy.greeting}</p>
              <p className="mt-1.5 text-[13px] leading-snug text-[#6b4c38]">{copy.question}</p>
              <button
                type="button"
                onClick={toggle}
                className="mt-2.5 cursor-pointer text-[13px] font-semibold text-[#c2622d] underline-offset-4 hover:underline"
              >
                Xem gợi ý cho mình →
              </button>
            </>
          ) : (
            <p className="text-[14px] font-bold leading-snug">{copy.celebrate}</p>
          )}
          <button
            type="button"
            onClick={dismissBubble}
            aria-label="Ẩn lời chào của DIMO"
            className="absolute right-2 top-2 flex size-7 cursor-pointer items-center justify-center rounded-full text-[#a07f68] transition hover:bg-[#f6e6d4] hover:text-[#3b2619]"
          >
            <X size={15} aria-hidden />
          </button>
        </div>
      )}

      {/* ---------- DIMO himself ---------- */}
      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        aria-label={open ? copy.closeLabel : copy.openLabel}
        aria-expanded={open}
        aria-controls="dimo-panel"
        className={cx(
          "dimo-button group relative flex cursor-pointer items-end justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f39a62]",
          "h-[72px] w-[72px] sm:h-[92px] sm:w-[92px]",
          reaction && `dimo-${reaction}`,
        )}
      >
        {/* Cream pedestal — keeps the artwork's soft floor shadow blending in */}
        <span aria-hidden className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_35%,#fffdf9,#f6e7d6)] shadow-[0_14px_30px_-10px_rgba(0,0,0,0.6)] ring-1 ring-white/70" />
        <span className="dimo-figure relative -mb-0.5 block">
          <DimoFigure pose={pose} className="h-[78px] w-auto sm:h-[112px]" />
        </span>
        {visible && !open && <span aria-hidden className="dimo-ping absolute right-0.5 top-1 size-3 rounded-full bg-[#f39a62] ring-2 ring-[#fffaf3]" />}
      </button>
    </div>
  );
}
