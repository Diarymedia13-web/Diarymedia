"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

/**
 * Dải số liệu năng lực. Con số đếm lên khi khối lọt vào khung nhìn.
 * Nếu người dùng bật giảm chuyển động thì hiển thị thẳng giá trị cuối.
 */
export default function StatBand() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 gap-px overflow-hidden rounded-block bg-line lg:grid-cols-4">
      {site.stats.map((s) => (
        <div key={s.label} className="bg-ink-2/55 backdrop-blur-sm px-6 py-9 sm:px-8 sm:py-11">
          {/* Cỡ chữ nhỏ hơn t-display để con số 4 ký tự như "12–48h" không bị xuống dòng */}
          <p
            className="whitespace-nowrap text-[clamp(2rem,3.4vw,3rem)] font-extrabold leading-none tracking-tight text-gradient-brand"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {s.prefix}
            <Counter to={s.value} run={run} />
            {s.suffix}
          </p>
          <p className="mt-3 text-[15px] font-semibold text-fg">{s.label}</p>
          <p className="mt-1 text-sm text-fg-dim">{s.sub}</p>
        </div>
      ))}
    </div>
  );
}

function Counter({ to, run }: { to: number; run: boolean }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(to);
      return;
    }

    const duration = 1500;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      // easeOutExpo — nhanh lúc đầu, dừng mượt ở cuối
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setN(Math.round(to * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [run, to]);

  return <>{n.toLocaleString("vi-VN")}</>;
}
