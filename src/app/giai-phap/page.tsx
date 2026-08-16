import type { Metadata } from "next";
import { Check } from "lucide-react";
import { site } from "@/lib/site";
import {
  solutionServices,
  productionServices,
  processSteps,
  tracks,
  faqs,
} from "@/lib/services";
import { ButtonLink, Container, SectionHead, SectionLabel } from "@/components/ui";
import { CtaBlock, PageHero, ServiceCard } from "@/components/blocks";

export const metadata: Metadata = {
  title: "Giải pháp truyền thông cho doanh nghiệp",
  description:
    "Hai dòng dịch vụ của Day Agency: giải pháp doanh nghiệp (chiến lược truyền thông, chiến lược kinh doanh, chuyển đổi số, website, quảng cáo, AI) và sản xuất sáng tạo (TVC, viral video, sự kiện, livestream, nhiếp ảnh thương mại).",
  alternates: { canonical: "/giai-phap/" },
};

const packages = [
  {
    name: "Khởi động",
    tag: "Dành cho doanh nghiệp mới định vị",
    body: "Dựng nền móng truyền thông: định vị thông điệp, bộ nhận diện nội dung và một hạ tầng số tối thiểu để bắt đầu chạy.",
    items: [
      "Định vị & kiến trúc thông điệp",
      "Website chuẩn chuyển đổi",
      "Gói nội dung khởi động 10 video ngắn",
      "Thiết lập kênh & đo lường cơ bản",
    ],
  },
  {
    name: "Tăng trưởng",
    tag: "Phổ biến nhất",
    highlight: true,
    body: "Vận hành truyền thông đều tay hằng tháng: sản xuất nội dung theo lịch, chạy quảng cáo có tối ưu và báo cáo hiệu quả hằng tuần.",
    items: [
      "Toàn bộ hạng mục gói Khởi động",
      "Kế hoạch truyền thông theo quý",
      "20 – 30 nội dung mỗi tháng",
      "Vận hành quảng cáo đa nền tảng",
      "Báo cáo hiệu quả hằng tuần",
    ],
  },
  {
    name: "Đối tác toàn diện",
    tag: "Dành cho chuỗi & tập đoàn",
    body: "Day Agency đóng vai trò phòng marketing thuê ngoài: chiến lược, sản xuất, quảng cáo, chuyển đổi số và ứng dụng AI trong cùng một đầu mối.",
    items: [
      "Toàn bộ hạng mục gói Tăng trưởng",
      "Chiến lược kinh doanh & phễu bán hàng",
      "Chuyển đổi số và thiết lập CRM",
      "Triển khai AI cho vận hành nội bộ",
      "TVC, phim doanh nghiệp và sự kiện lớn",
    ],
  },
];

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        label="Giải pháp truyền thông"
        title={
          <>
            Giải
            <br />
            Pháp
          </>
        }
        kicker="Hai dòng dịch vụ, một đầu mối chịu trách nhiệm."
        lead="Doanh nghiệp cần hệ thống thì đi theo dòng 01. Thương hiệu cần đơn vị sản xuất tin cậy thì đi theo dòng 02. Cả hai đều do cùng một ekip vận hành nên không có khoảng trống giữa chiến lược và sản phẩm cuối."
        gradient="grad-fire"
        image="/images/work/wellness-05.webp"
        imageAlt=""
      />

      {/* ================= DÒNG 01 ================= */}
      <section id="giai-phap-doanh-nghiep" className="scroll-mt-28">
        <Container className="mt-24 sm:mt-32">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <SectionLabel className="mb-5" data-reveal>
                {tracks.solution.label} — {tracks.solution.forWho}
              </SectionLabel>
              <h2 className="t-h2" data-reveal data-reveal-group="t1">
                {tracks.solution.title}
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="t-lead" data-reveal data-reveal-group="t1">
                {tracks.solution.lead}
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {solutionServices.map((s) => (
              <ServiceCard key={s.slug} service={s} group="t1-cards" />
            ))}
          </div>
        </Container>
      </section>

      {/* ================= DÒNG 02 ================= */}
      <section id="san-xuat-sang-tao" className="scroll-mt-28">
        <Container className="mt-24 sm:mt-32">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <SectionLabel className="mb-5" data-reveal>
                {tracks.production.label} — {tracks.production.forWho}
              </SectionLabel>
              <h2 className="t-h2" data-reveal data-reveal-group="t2">
                {tracks.production.title}
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="t-lead" data-reveal data-reveal-group="t2">
                {tracks.production.lead}
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {productionServices.map((s) => (
              <ServiceCard key={s.slug} service={s} group="t2-cards" />
            ))}
          </div>
        </Container>
      </section>

      {/* ================= GÓI DỊCH VỤ ================= */}
      <section id="goi-dich-vu" className="scroll-mt-28">
        <Container className="mt-24 sm:mt-32">
          <SectionHead
            label="Cách hợp tác"
            title={
              <>
                Ba mức độ đồng hành
                <br />
                theo giai đoạn doanh nghiệp
              </>
            }
            lead="Mỗi gói là một điểm khởi đầu, không phải khuôn cứng. Sau buổi trao đổi đầu tiên, chúng tôi sẽ điều chỉnh hạng mục cho khớp với ngân sách và mục tiêu thật của bạn."
            group="pkg"
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {packages.map((p) => (
              <div
                key={p.name}
                data-reveal
                data-reveal-group="pkg-cards"
                className={
                  p.highlight
                    ? "grain relative isolate flex flex-col overflow-hidden rounded-block grad-copper p-8 sm:p-9"
                    : "flex flex-col rounded-block border border-line bg-ink-2/55 backdrop-blur-sm p-8 transition-colors duration-500 hover:border-brand/40 sm:p-9"
                }
              >
                <div className="relative z-10 flex items-center justify-between gap-3">
                  <h3 className="t-h3" style={{ color: p.highlight ? "#fff" : undefined }}>
                    {p.name}
                  </h3>
                  <span
                    className={
                      p.highlight
                        ? "t-label rounded-full bg-white/18 px-3 py-1.5 text-white"
                        : "t-label rounded-full border border-line px-3 py-1.5 text-fg-dim"
                    }
                  >
                    {p.tag}
                  </span>
                </div>

                <p
                  className={
                    p.highlight
                      ? "relative z-10 mt-5 text-[15px] leading-relaxed text-white/85"
                      : "relative z-10 mt-5 text-[15px] leading-relaxed text-fg-muted"
                  }
                >
                  {p.body}
                </p>

                <ul
                  className={
                    p.highlight
                      ? "relative z-10 mt-7 flex flex-1 flex-col gap-3 border-t border-white/25 pt-7"
                      : "relative z-10 mt-7 flex flex-1 flex-col gap-3 border-t border-line pt-7"
                  }
                >
                  {p.items.map((item) => (
                    <li
                      key={item}
                      className={
                        p.highlight
                          ? "flex items-start gap-2.5 text-[15px] text-white"
                          : "flex items-start gap-2.5 text-[15px] text-fg-muted"
                      }
                    >
                      <Check
                        size={17}
                        strokeWidth={2.6}
                        aria-hidden
                        className={p.highlight ? "mt-1 shrink-0 text-white" : "mt-1 shrink-0 text-brand"}
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="relative z-10 mt-9">
                  <ButtonLink href="/lien-he/" variant={p.highlight ? "primary" : "solid"}>
                    Nhận báo giá
                  </ButtonLink>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-sm text-fg-dim" data-reveal>
            Chưa rõ nên bắt đầu ở đâu? Gọi{" "}
            <a
              href={`tel:${site.contact.phoneIntl}`}
              className="cursor-pointer font-semibold text-brand underline-offset-4 hover:underline"
            >
              {site.contact.phoneDisplay}
            </a>{" "}
            — chúng tôi tư vấn hướng đi trước, bàn chuyện hợp tác sau.
          </p>
        </Container>
      </section>

      {/* ================= QUY TRÌNH ================= */}
      <section id="quy-trinh" className="scroll-mt-28">
        <Container className="mt-24 sm:mt-32">
          <SectionHead
            label="Quy trình"
            title={
              <>
                Bạn luôn biết
                <br />
                dự án đang ở đâu
              </>
            }
            lead="Mỗi giai đoạn có đầu ra rõ ràng và người chịu trách nhiệm cụ thể. Không có bước nào diễn ra trong im lặng."
            group="proc"
          />

          <div className="mt-14 flex flex-col">
            {processSteps.map((step) => (
              <div
                key={step.no}
                data-reveal
                data-reveal-group="proc-steps"
                className="group grid gap-5 border-t border-line py-9 transition-colors last:border-b hover:border-brand/40 lg:grid-cols-12 lg:gap-10"
              >
                <div className="lg:col-span-2">
                  <span
                    className="text-4xl font-bold text-line transition-colors duration-500 group-hover:text-brand sm:text-5xl"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {step.no}
                  </span>
                </div>
                <div className="lg:col-span-4">
                  <h3 className="t-h3">{step.title}</h3>
                  <span className="t-label mt-3 inline-block rounded-full border border-line px-3 py-1.5 text-fg-dim">
                    {step.duration}
                  </span>
                </div>
                <div className="lg:col-span-5 lg:col-start-8">
                  <p className="text-[15px] leading-relaxed text-fg-muted">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ================= FAQ ================= */}
      <section id="cau-hoi-thuong-gap" className="scroll-mt-28">
        <Container className="mt-24 sm:mt-32">
          <SectionHead
            label="Câu hỏi thường gặp"
            title={
              <>
                Những điều khách hàng
                <br />
                hay hỏi nhất
              </>
            }
            lead="Nếu câu hỏi của bạn chưa có ở đây, cứ gọi thẳng — chúng tôi trả lời trực tiếp, không vòng vo."
            group="faq"
          />

          <div className="mt-14 flex flex-col">
            {faqs.map((f, i) => (
              <details
                key={f.q}
                data-reveal
                data-reveal-group="faq-items"
                className="group border-t border-line last:border-b"
                open={i === 0}
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-7 text-left [&::-webkit-details-marker]:hidden">
                  <h3 className="t-h3 pr-4 transition-colors group-open:text-brand">{f.q}</h3>
                  <span
                    aria-hidden
                    className="relative mt-2 flex size-8 shrink-0 items-center justify-center rounded-full border border-line transition-colors group-open:border-brand group-open:bg-brand"
                  >
                    <span className="absolute h-px w-3.5 bg-fg-muted group-open:bg-brand-ink" />
                    <span className="absolute h-3.5 w-px bg-fg-muted transition-transform duration-300 group-open:scale-y-0" />
                  </span>
                </summary>
                <p className="max-w-3xl pb-8 text-[15px] leading-relaxed text-fg-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <CtaBlock
        label="Bước tiếp theo"
        title={
          <>
            Nói cho chúng tôi biết
            <br />
            bài toán của bạn
          </>
        }
        lead="Gửi một mô tả ngắn về sản phẩm, mục tiêu và ngân sách dự kiến. Trong vòng 24 giờ làm việc, bạn nhận được đề xuất hướng đi cụ thể."
      />
    </>
  );
}
