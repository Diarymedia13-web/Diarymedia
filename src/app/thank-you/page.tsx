import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Container, SectionLabel, ButtonLink } from "@/components/ui";
import AuditAnalytics from "@/components/audit-analytics";

/* Đích đến sau khi gửi form audit thành công — dùng làm "conversion
   destination" cho quảng cáo (Google/Meta/ChatGPT Ads...). Sự kiện chuyển
   đổi cho GA4/Meta Pixel/GTM đã được bắn ngay lúc submit thành công trong
   `audit-form.tsx` (không phụ thuộc trang này tải xong hay không, vì chuyển
   trang trong Next.js App Router không reload toàn bộ nên script không tự
   chạy lại "page_view" ở đây) — nạp lại `AuditAnalytics` ở trang này chỉ để
   đảm bảo GA4/Meta Pixel/GTM cũng có mặt nếu nền tảng quảng cáo cần đo
   thêm một lượt xem trang đích riêng. */

export const metadata: Metadata = {
  title: "Đã nhận yêu cầu Digital Growth Audit",
  robots: { index: false, follow: false },
  alternates: { canonical: "/thank-you/" },
};

export default function ThankYouPage() {
  return (
    <>
      <AuditAnalytics />
      <Container
        size="narrow"
        className="flex min-h-[70vh] flex-col items-center justify-center pt-28 text-center sm:pt-32"
      >
        <span className="flex size-16 items-center justify-center rounded-full bg-brand text-brand-ink">
          <CheckCircle2 size={30} strokeWidth={2.2} aria-hidden />
        </span>

        <SectionLabel className="mb-4 mt-8 justify-center">Đã gửi thành công</SectionLabel>
        <h1 className="t-h2">Cảm ơn bạn đã gửi yêu cầu</h1>
        <p className="mx-auto mt-5 max-w-lg text-[17px] leading-relaxed text-fg">
          DAY Agency đã nhận được thông tin doanh nghiệp của bạn. Chúng tôi sẽ xem xét trước khi
          trao đổi bước tiếp theo.
        </p>

        <div className="mt-10">
          <ButtonLink href="/" variant="solid">
            Về DAY Agency
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
