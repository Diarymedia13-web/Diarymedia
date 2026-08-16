"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cx } from "./ui";

const STORAGE_KEY = "day-theme";

type Theme = "dark" | "light";

/** Đồng bộ màu thanh trạng thái trên di động với theme đang bật. */
function syncThemeColorMeta(theme: Theme) {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "light" ? "#f0e6d3" : "#1c1710");
}

/**
 * Nút chuyển chế độ sáng/tối.
 *
 * Trạng thái ban đầu của trang được set bởi script chống-nháy trong
 * layout.tsx (chạy trước khi React hydrate), nên ở đây chỉ cần đọc lại
 * `data-theme` đã có sẵn trên <html> để hiển thị đúng icon ngay từ frame
 * đầu tiên — không tự ý đặt lại theme.
 */
export default function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light" : "dark");
  }, []);

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Chế độ duyệt web riêng tư có thể chặn localStorage — bỏ qua, không chặn thao tác.
    }
    syncThemeColorMeta(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "light" ? "Chuyển sang chế độ tối" : "Chuyển sang chế độ sáng"}
      className={cx(
        "relative flex size-11 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-line text-fg-muted transition-colors duration-300 hover:border-brand/50 hover:text-brand",
        className,
      )}
    >
      {/* Ẩn cả hai icon cho tới khi biết chắc theme thật (tránh nháy icon sai ở lần vẽ đầu). */}
      <Sun
        size={18}
        strokeWidth={2}
        aria-hidden
        className={cx(
          "absolute transition-all duration-300",
          theme === "light" ? "scale-100 opacity-100" : "scale-50 opacity-0",
          theme === null && "opacity-0",
        )}
      />
      <Moon
        size={18}
        strokeWidth={2}
        aria-hidden
        className={cx(
          "absolute transition-all duration-300",
          theme === "dark" ? "scale-100 opacity-100" : "scale-50 opacity-0",
          theme === null && "opacity-0",
        )}
      />
    </button>
  );
}
