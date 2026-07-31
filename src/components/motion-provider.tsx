"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Khởi tạo toàn bộ chuyển động cuộn của site ở một chỗ duy nhất.
 *
 * Nguyên tắc:
 *  - Chỉ animate `opacity` và `transform` (GPU) — không đụng vào width/height/top
 *    để tránh layout thrashing.
 *  - Thêm class `js-ready` lên <html> rồi mới ẩn phần tử, nên khi tắt JS
 *    hoặc script lỗi thì nội dung vẫn hiển thị đầy đủ.
 *  - Tôn trọng `prefers-reduced-motion`: bỏ qua hoàn toàn phần animate.
 */
export default function MotionProvider() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.classList.add("js-ready");

    const ctx = gsap.context(() => {
      // --- Reveal khi cuộn tới, gom theo nhóm để tạo hiệu ứng so le ---
      const groups = new Map<string, HTMLElement[]>();
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        const key = el.dataset.revealGroup ?? `solo-${Math.random()}`;
        groups.set(key, [...(groups.get(key) ?? []), el]);
      });

      groups.forEach((els) => {
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "expo.out",
          stagger: 0.08,
          // Xoá `transform` còn sót lại sau khi reveal xong. Một phần tử có
          // transform sẽ trở thành containing block, khiến `position: fixed`
          // của con (lightbox, menu) bị neo vào nó thay vì vào viewport.
          onComplete: () => gsap.set(els, { clearProps: "transform" }),
          scrollTrigger: {
            trigger: els[0],
            start: "top 88%",
            once: true,
          },
        });
      });

      // --- Ảnh trong khối lớn trôi nhẹ theo chiều cuộn (parallax tiết chế) ---
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const strength = Number(el.dataset.parallax) || 12;
        gsap.fromTo(
          el,
          { yPercent: -strength / 2 },
          {
            yPercent: strength / 2,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      // --- Đường kẻ ngang tự vẽ khi vào khung nhìn ---
      gsap.utils.toArray<HTMLElement>("[data-line]").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.1,
            ease: "expo.out",
            transformOrigin: "left center",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          },
        );
      });
    });

    // Ảnh tải xong làm thay đổi chiều cao trang → cần tính lại mốc kích hoạt.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      ctx.revert();
      document.documentElement.classList.remove("js-ready");
    };
  }, []);

  return null;
}
