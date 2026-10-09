"use client";

import { useEffect, useRef } from "react";

const FPS = 25;
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Timecode HH:MM:SS:FF chạy ở 25 khung/giây như màn hình máy quay. Ghi thẳng
 * vào textContent thay vì setState để không bắt React vẽ lại 25 lần mỗi giây.
 * Người dùng bật "giảm chuyển động" thì đứng yên ở 00:00:00:00.
 */
export default function Timecode({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const frames = Math.floor(((now - start) / 1000) * FPS);
      const f = frames % FPS;
      const totalSec = Math.floor(frames / FPS);
      if (ref.current) {
        ref.current.textContent = `${pad(Math.floor(totalSec / 3600))}:${pad(Math.floor(totalSec / 60) % 60)}:${pad(totalSec % 60)}:${pad(f)}`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <span ref={ref} className={className} aria-hidden>
      00:00:00:00
    </span>
  );
}
