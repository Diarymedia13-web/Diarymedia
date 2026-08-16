"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
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
 *
 * PHẢI chạy lại sau MỖI lần đổi trang (`pathname` nằm trong danh sách phụ
 * thuộc của useEffect). Component này sống trong layout dùng chung, nên khi
 * người dùng bấm menu để chuyển trang thì layout KHÔNG dựng lại — nếu chỉ
 * chạy một lần lúc mở web, các khối `[data-reveal]` của trang mới sẽ dính
 * `opacity: 0` từ CSS mà không có ScrollTrigger nào bật chúng lên, khiến cả
 * trang trông như trống trơn. Đây từng là lỗi thật ở trang /giai-phap/.
 */
export default function MotionProvider() {
  const pathname = usePathname();

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

    // Sau khi đổi trang, chiều cao và vị trí các khối đều khác — tính lại ngay
    // ở khung hình kế tiếp, nếu không ScrollTrigger vẫn dùng mốc của trang cũ.
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());

    // Ảnh tải xong làm thay đổi chiều cao trang → cần tính lại mốc kích hoạt.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    /* Lưới an toàn: nội dung KHÔNG BAO GIỜ được phép ẩn vĩnh viễn. Nếu vì lý
       do nào đó (lỗi script, mốc cuộn tính sai...) mà một khối vẫn còn
       `opacity: 0` sau 2.5 giây, hiện thẳng nó ra. Thà mất hiệu ứng còn hơn
       mất nội dung — đúng lỗi đã xảy ra ở trang /giai-phap/. */
    const safety = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        if (getComputedStyle(el).opacity === "0") {
          gsap.set(el, { opacity: 1, y: 0, clearProps: "transform" });
        }
      });
    }, 2500);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(safety);
      window.removeEventListener("load", onLoad);
      ctx.revert();
      document.documentElement.classList.remove("js-ready");
    };
  }, [pathname]);

  return null;
}
