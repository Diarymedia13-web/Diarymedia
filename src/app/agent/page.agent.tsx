import type { Metadata } from "next";
import AgentChat from "@/components/agent-chat";

/**
 * Trang Diary Business Agent — công cụ nội bộ.
 *
 * Đặt ở route riêng `/agent` thay vì ghi đè `src/app/page.tsx`, vì file đó là
 * trang chủ của website thật đang chạy.
 */
export const metadata: Metadata = {
  title: "Diary Business Agent",
  description:
    "Trợ lý AI nội bộ hỗ trợ soạn nội dung truyền thông, bài SEO, kịch bản video, kế hoạch marketing và proposal.",
  // Công cụ nội bộ — không cho công cụ tìm kiếm lập chỉ mục.
  robots: { index: false, follow: false },
};

export default function AgentPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
      <AgentChat />
    </main>
  );
}
