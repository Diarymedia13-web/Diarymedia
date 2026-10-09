import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Chính sách bảo mật",
  description: "Cách Diary Media thu thập, sử dụng và bảo vệ thông tin cá nhân của khách hàng.",
  alternates: { canonical: "/chinh-sach-bao-mat/" },
};

const sections = [
  {
    title: "1. Thông tin chúng tôi thu thập",
    body: [
      "Khi bạn điền form đăng ký audit hoặc form liên hệ, chúng tôi thu thập: họ và tên, tên doanh nghiệp, số điện thoại, email, website hoặc fanpage, ngành hàng và vấn đề bạn đang gặp phải.",
      "Khi bạn truy cập website, chúng tôi có thể thu thập dữ liệu kỹ thuật như loại trình duyệt, thời gian truy cập và nguồn đến (ví dụ đường link quảng cáo có tham số UTM).",
    ],
  },
  {
    title: "2. Mục đích sử dụng",
    body: [
      "Liên hệ, tư vấn và thực hiện đánh giá (audit) theo yêu cầu của bạn.",
      "Đo lường hiệu quả chiến dịch quảng cáo để cải thiện nội dung và chi phí.",
    ],
  },
  {
    title: "3. Chia sẻ thông tin",
    body: [
      "Chúng tôi không bán dữ liệu cá nhân. Thông tin chỉ được chuyển cho các đơn vị giúp vận hành: dịch vụ gửi form Web3Forms để chuyển nội dung về hộp thư của Diary Media, và nền tảng quảng cáo đo lường (Meta, OpenAI, Google) khi bạn tương tác với quảng cáo của chúng tôi, dưới dạng dữ liệu đã mã hoá.",
    ],
  },
  {
    title: "4. Cookie và công cụ đo lường",
    body: [
      "Website sử dụng các đoạn mã đo lường quảng cáo (pixel) để biết chiến dịch nào đưa khách đến. Các đoạn mã này có thể lưu cookie trên trình duyệt của bạn. Bạn có thể tắt cookie trong cài đặt trình duyệt.",
    ],
  },
  {
    title: "5. Lưu trữ",
    body: [
      "Chúng tôi lưu thông tin trong thời gian cần thiết để thực hiện yêu cầu tư vấn và các mục đích tại mục 2, sau đó xoá hoặc ẩn danh.",
    ],
  },
  {
    title: "6. Quyền của bạn",
    body: [
      "Bạn có quyền yêu cầu xem, sửa, xoá thông tin cá nhân hoặc rút lại sự đồng ý sử dụng thông tin bằng cách liên hệ chúng tôi theo mục 8.",
    ],
  },
  {
    title: "7. Bảo mật",
    body: [
      "Chúng tôi áp dụng biện pháp kỹ thuật và tổ chức phù hợp để bảo vệ thông tin. Tuy nhiên, không có hệ thống nào tuyệt đối an toàn.",
    ],
  },
  {
    title: "8. Liên hệ",
    body: [
      `Đơn vị: ${site.name} (Mã số thuế ${site.legalId})`,
      `Địa chỉ: ${site.contact.address}`,
      `Email: ${site.contact.email}`,
      `Điện thoại: ${site.contact.phoneDisplay}`,
    ],
  },
  {
    title: "9. Thay đổi chính sách",
    body: [
      "Chúng tôi có thể cập nhật chính sách này. Phiên bản mới sẽ được đăng trên trang này kèm ngày cập nhật.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <Container size="narrow" className="pb-28 pt-28 sm:pt-32">
      <h1 className="t-h2">Chính sách bảo mật</h1>
      <p className="mt-4 text-sm text-fg-dim">Cập nhật lần cuối: 03/10/2026</p>

      <div className="mt-12 flex flex-col gap-10">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="t-h3">{s.title}</h2>
            <div className="mt-4 flex flex-col gap-3">
              {s.body.map((p) => (
                <p key={p} className="text-[15px] leading-relaxed text-fg-muted">
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </Container>
  );
}
