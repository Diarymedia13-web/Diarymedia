"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Chữ ký nét bút tự "viết" ra khi lá thư cuộn vào tầm nhìn. Người dùng bật
 * giảm chuyển động hoặc trình duyệt không hỗ trợ → hiện sẵn chữ ký tĩnh.
 */
export default function Signature({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setDrawn(true);
      return;
    }
    el.classList.add("sig-armed");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 220 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`signature ${drawn ? "sig-drawn" : ""} ${className ?? ""}`}
    >
      <path pathLength={1} d="M8 58 C 26 50, 40 22, 52 18 C 62 15, 50 52, 44 62 C 60 40, 78 30, 84 36 C 90 42, 74 58, 86 56 C 100 54, 112 26, 124 24 C 132 23, 120 48, 130 50 C 146 52, 168 30, 212 20" />
      <path pathLength={1} d="M70 66 C 110 60, 160 58, 204 52" />
    </svg>
  );
}
