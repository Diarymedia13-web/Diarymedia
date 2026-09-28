import type { Metadata } from "next";
import {
  Search,
  Compass,
  Sparkles,
  FileText,
  Film,
  Target,
  ShoppingCart,
  Network,
  Brain,
  BarChart3,
  Facebook,
  Video,
  Globe,
  Layers,
  Database,
  CheckCircle2,
  ChevronRight,
  Rocket,
  Cpu,
  Eye,
  Stethoscope,
  ListOrdered,
  Map,
} from "lucide-react";
import { Container, GradientBlock, SectionHead, SectionLabel, ButtonLink, cx } from "@/components/ui";
import AuditForm from "@/components/audit-form";

export const metadata: Metadata = {
  title: "Digital Growth Audit cho doanh nghiệp",
  description:
    "DAY Agency phân tích hệ thống thương hiệu, truyền thông, quảng cáo, thương mại điện tử, CRM và AI để xác định cơ hội tăng trưởng Digital cho doanh nghiệp.",
  alternates: { canonical: "/audit/" },
};

/* --------------------------------------------------------------------------
   Dữ liệu tĩnh cho từng khối — tách khỏi JSX cho dễ đọc, không dùng ở nơi khác
   nên để thẳng trong file trang thay vì tạo module lib riêng.
   -------------------------------------------------------------------------- */

const problems = [
  { icon: Facebook, text: "Facebook đăng bài nhưng không biết tác động tới doanh thu." },
  { icon: Video, text: "TikTok có video nhưng không tạo thành hệ thống bán hàng." },
  { icon: Target, text: "Quảng cáo chạy nhưng Marketing và Sale không nối dữ liệu." },
  { icon: Globe, text: "Website có nhưng không tạo lead." },
  { icon: ShoppingCart, text: "Sàn TMĐT hoạt động rời rạc." },
  { icon: Layers, text: "Content, hình ảnh và video thiếu định vị chung." },
  { icon: Database, text: "CRM chưa được xây hoặc không được sử dụng đúng." },
  { icon: Brain, text: "Doanh nghiệp biết AI quan trọng nhưng không biết ứng dụng vào đâu." },
];

const approachFlow = [
  { icon: Search, label: "Research" },
  { icon: Compass, label: "Strategy" },
  { icon: Sparkles, label: "Brand" },
  { icon: FileText, label: "Content" },
  { icon: Film, label: "Media" },
  { icon: Target, label: "Ads" },
  { icon: ShoppingCart, label: "Commerce" },
  { icon: Network, label: "CRM" },
  { icon: Brain, label: "AI" },
  { icon: BarChart3, label: "Measurement" },
];

const auditScope = [
  { no: "01", title: "Brand Positioning", body: "Định vị thương hiệu hiện tại có còn đúng với khách hàng mục tiêu và thị trường bây giờ không." },
  { no: "02", title: "Customer Journey", body: "Hành trình khách hàng từ lúc biết tới lúc mua — đang đứt ở mắt xích nào." },
  { no: "03", title: "Website", body: "Website có đang tạo ra lead, hay chỉ để trưng bày thông tin." },
  { no: "04", title: "Social Media", body: "Nội dung và tần suất trên các kênh mạng xã hội đang phục vụ mục tiêu gì." },
  { no: "05", title: "Content", body: "Content có đang nhất quán về định vị và đủ sức thuyết phục khách mua hàng." },
  { no: "06", title: "Video / TVC", body: "Hình ảnh chuyển động hiện có đã khai thác đúng năng lực thương hiệu chưa." },
  { no: "07", title: "Performance Ads", body: "Ngân sách quảng cáo đang chảy vào đâu và hiệu quả thật đến mức nào." },
  { no: "08", title: "Marketplace / Commerce", body: "Các sàn thương mại điện tử đang vận hành rời rạc hay đã thành hệ thống." },
  { no: "09", title: "CRM & Sales Funnel", body: "Dữ liệu khách hàng có được thu thập, phân loại và chăm sóc lại hay không." },
  { no: "10", title: "AI Opportunities", body: "Những khâu nào trong vận hành hiện tại có thể rút ngắn thời gian nhờ AI." },
];

const outputs = [
  "Hiện tại đang mắc ở đâu.",
  "Hạng mục nào đang lãng phí nguồn lực.",
  "Kênh nào nên ưu tiên.",
  "Funnel đang thiếu mắt xích nào.",
  "AI có thể được ứng dụng ở đâu.",
  "3 – 5 việc quan trọng nhất cần triển khai tiếp theo.",
];

const growthSystem = [
  "Awareness",
  "Interest",
  "Consideration",
  "Lead",
  "CRM",
  "Sales",
  "Customer",
  "Revenue",
];

const whyDay = [
  {
    icon: Layers,
    title: "ONE SYSTEM",
    body: "Strategy + Creative + Media + Commerce + AI vận hành trong cùng một đội ngũ, không phải ghép từ nhiều nhà cung cấp rời rạc.",
  },
  {
    icon: Rocket,
    title: "A–Z EXECUTION",
    body: "Không chỉ tư vấn mà có khả năng triển khai thật — từ chiến lược tới sản phẩm cuối cùng.",
  },
  {
    icon: BarChart3,
    title: "BUSINESS THINKING",
    body: "Đo hiệu quả bằng lead, tỉ lệ chuyển đổi và doanh thu — không chỉ bằng lượt tiếp cận.",
  },
  {
    icon: Cpu,
    title: "AI-NATIVE",
    body: "Ứng dụng AI vào nghiên cứu, vận hành, tự động hoá và tối ưu trong suốt quá trình đồng hành.",
  },
];

const trustSteps = [
  { no: "01", icon: Eye, title: "Review", body: "Xem hệ thống hiện tại." },
  { no: "02", icon: Stethoscope, title: "Diagnose", body: "Xác định vấn đề và cơ hội." },
  { no: "03", icon: ListOrdered, title: "Priority", body: "Xác định những việc nên làm trước." },
  { no: "04", icon: Map, title: "Roadmap", body: "Đề xuất hướng triển khai nếu phù hợp." },
];

/* --------------------------------------------------------------------------
   Khối dòng chảy dùng chung cho DAY Approach và Growth System — chip nối
   bằng mũi tên, tự xuống dòng trên màn hình nhỏ.
   -------------------------------------------------------------------------- */
function FlowRow({
  items,
}: {
  items: Array<{ icon?: React.ComponentType<{ size?: number; strokeWidth?: number }>; label: string }>;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-4" data-reveal data-reveal-group="flow">
      {items.map((item, i) => (
        <div key={item.label} className="flex items-center gap-2">
          <span
            className={cx(
              "inline-flex items-center gap-2 rounded-full border border-line bg-ink-2/70 px-4 py-2.5 text-sm font-semibold text-fg",
              item.icon && "pl-3",
            )}
          >
            {item.icon && (
              <span className="flex size-7 items-center justify-center rounded-full bg-brand/12 text-brand">
                <item.icon size={14} strokeWidth={2.2} />
              </span>
            )}
            {item.label}
          </span>
          {i < items.length - 1 && (
            <ChevronRight size={16} strokeWidth={2.4} className="text-fg-dim" aria-hidden />
          )}
        </div>
      ))}
    </div>
  );
}

export default function AuditPage() {
  return (
    <>
      {/* ================= HERO ================= */}
      <Container size="wide" className="pt-24 sm:pt-28">
        <GradientBlock gradient="grad-ember">
          {/* Trang trí "hệ thống dữ liệu" trừu tượng — dùng lại đúng hiệu ứng
              CSS đã có của thương hiệu (ai-halo, data-pulse), không dùng ảnh
              stock doanh nhân bắt tay. */}
          <span
            className="ai-halo"
            style={{ left: "88%", top: "8%", width: "26rem", aspectRatio: "1" }}
            aria-hidden
          />
          <span
            className="ai-halo ai-halo-reverse"
            style={{ left: "88%", top: "8%", width: "17rem", aspectRatio: "1" }}
            aria-hidden
          />
          <span className="data-pulse" style={{ left: "8%", top: "22%", width: "30%" }} aria-hidden />
          <span
            className="data-pulse"
            style={{ left: "55%", top: "68%", width: "26%", animationDelay: "-1.8s" }}
            aria-hidden
          />

          <div className="relative z-10 px-7 pb-14 pt-16 sm:px-12 sm:pb-20 sm:pt-20">
            <SectionLabel tone="light" className="mb-6">
              Digital Growth Audit
            </SectionLabel>
            <h1 className="max-w-4xl text-[clamp(2rem,5.2vw,3.75rem)] font-extrabold leading-[1.08] tracking-tight text-white">
              Có sản phẩm tốt nhưng Digital chưa tạo ra doanh thu?
            </h1>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/80">
              DAY Agency giúp doanh nghiệp xây lại hệ thống từ chiến lược, thương hiệu, content,
              TVC, quảng cáo, thương mại điện tử đến CRM và AI — để Digital không chỉ đẹp mà phải
              tạo ra tăng trưởng.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="#dang-ky-audit" variant="primary">
                Nhận Digital Growth Audit
              </ButtonLink>
              <ButtonLink href="#audit-scope" variant="outline">
                Xem DAY sẽ phân tích những gì
              </ButtonLink>
            </div>
          </div>
        </GradientBlock>
      </Container>

      {/* ================= VẤN ĐỀ ================= */}
      <section id="van-de" className="scroll-mt-28">
        <Container className="mt-24 sm:mt-32">
          <SectionHead
            label="Vấn đề"
            title={
              <>
                Doanh nghiệp không thiếu kênh.
                <br />
                Doanh nghiệp thiếu một hệ thống.
              </>
            }
            lead="Từng mảnh đều có người làm — nhưng không mảnh nào nói chuyện với mảnh nào."
            group="problem"
          />

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {problems.map((p) => (
              <div
                key={p.text}
                data-reveal
                data-reveal-group="problem-cards"
                className="flex flex-col gap-4 rounded-block border border-line bg-ink-2/55 backdrop-blur-sm p-6 transition-colors duration-500 hover:border-brand/40 sm:p-7"
              >
                <span className="flex size-11 items-center justify-center rounded-2xl bg-brand/12 text-brand">
                  <p.icon size={20} strokeWidth={1.9} />
                </span>
                <p className="text-[15px] leading-relaxed text-fg">{p.text}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-2xl text-[17px] font-medium leading-relaxed text-fg" data-reveal>
            Sản phẩm không yếu. Vấn đề nằm ở việc hệ thống truyền thông, bán hàng và Digital chưa
            kết nối với nhau.
          </p>

          <div className="mt-8" data-reveal>
            <ButtonLink href="#dang-ky-audit" variant="solid">
              Nhận Digital Growth Audit
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* ================= DAY APPROACH ================= */}
      <section id="cach-tiep-can" className="scroll-mt-28">
        <Container className="mt-24 sm:mt-32">
          <SectionHead
            label="Cách DAY làm việc"
            title={
              <>
                DAY không bắt đầu
                <br />
                từ &ldquo;chạy quảng cáo&rdquo;.
              </>
            }
            lead="Chúng tôi bắt đầu từ việc hiểu sản phẩm, khách hàng, mô hình kinh doanh và hành trình mua — sau đó mới xây hệ thống truyền thông và Digital phù hợp."
            group="approach"
          />

          <div className="mt-14 overflow-x-auto pb-2">
            <FlowRow items={approachFlow} />
          </div>
        </Container>
      </section>

      {/* ================= DIGITAL GROWTH AUDIT — PHẠM VI ================= */}
      <section id="audit-scope" className="scroll-mt-28">
        <Container className="mt-24 sm:mt-32">
          <SectionHead
            label="Digital Growth Audit"
            title={<>DAY sẽ phân tích gì cho doanh nghiệp?</>}
            lead="Mười hạng mục — đủ để nhìn ra bức tranh toàn cảnh, không sa vào tiểu tiết."
            group="scope"
          />

          <div className="mt-14 flex flex-col">
            {auditScope.map((item) => (
              <div
                key={item.no}
                data-reveal
                data-reveal-group="scope-rows"
                className="group grid gap-4 border-t border-line py-7 transition-colors last:border-b hover:border-brand/40 sm:grid-cols-12 sm:gap-6"
              >
                <div className="sm:col-span-1">
                  <span
                    className="text-2xl font-bold text-line transition-colors duration-500 group-hover:text-brand"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.no}
                  </span>
                </div>
                <div className="sm:col-span-3">
                  <h3 className="t-h3">{item.title}</h3>
                </div>
                <div className="sm:col-span-8">
                  <p className="text-[15px] leading-relaxed text-fg">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ================= OUTPUT ================= */}
      <section id="ket-qua" className="scroll-mt-28">
        <Container className="mt-24 sm:mt-32">
          <SectionHead
            label="Kết quả nhận được"
            title={<>Sau buổi audit, doanh nghiệp biết rõ</>}
            group="output"
          />

          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {outputs.map((o) => (
              <div
                key={o}
                data-reveal
                data-reveal-group="output-items"
                className="flex items-start gap-3.5 rounded-block border border-line bg-ink-2/55 backdrop-blur-sm p-5"
              >
                <CheckCircle2 size={20} strokeWidth={2} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                <p className="text-[15px] leading-relaxed text-fg">{o}</p>
              </div>
            ))}
          </div>

          <div className="mt-8" data-reveal>
            <ButtonLink href="#dang-ky-audit" variant="solid">
              Nhận Digital Growth Audit
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* ================= OPERATING SYSTEM ================= */}
      <section id="growth-system" className="scroll-mt-28">
        <Container className="mt-24 sm:mt-32">
          <SectionHead
            label="Từ truyền thông đến hệ thống"
            title={<>Từ truyền thông đến hệ thống tăng trưởng</>}
            lead="DAY không chỉ sản xuất content — DAY xây cả đường đi từ người lạ chưa biết thương hiệu tới khách hàng mang lại doanh thu."
            group="system"
          />

          <div className="mt-14 overflow-x-auto pb-2">
            <FlowRow items={growthSystem.map((label) => ({ label }))} />
          </div>
        </Container>
      </section>

      {/* ================= WHY DAY ================= */}
      <section id="vi-sao-day" className="scroll-mt-28">
        <Container className="mt-24 sm:mt-32">
          <SectionHead label="Vì sao DAY" title={<>Năng lực tạo nên khác biệt</>} group="why" />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyDay.map((w) => (
              <div
                key={w.title}
                data-reveal
                data-reveal-group="why-cards"
                className="flex flex-col gap-4 rounded-block border border-line bg-ink-2/55 backdrop-blur-sm p-6 transition-colors duration-500 hover:border-brand/40 sm:p-7"
              >
                <span className="flex size-11 items-center justify-center rounded-2xl bg-brand/12 text-brand">
                  <w.icon size={20} strokeWidth={1.9} />
                </span>
                <h3 className="t-h3">{w.title}</h3>
                <p className="text-[15px] leading-relaxed text-fg">{w.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ================= DAY SẼ LÀM GÌ SAU KHI NHẬN THÔNG TIN ================= */}
      <section id="quy-trinh-tiep-theo" className="scroll-mt-28">
        <Container className="mt-24 sm:mt-32">
          <SectionHead label="Quy trình sau audit" title={<>DAY sẽ làm gì sau khi nhận thông tin?</>} group="trust" />

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trustSteps.map((step) => (
              <div
                key={step.no}
                data-reveal
                data-reveal-group="trust-cards"
                className="flex flex-col gap-4 rounded-block border border-line bg-ink-2/55 backdrop-blur-sm p-6 transition-colors duration-500 hover:border-brand/40 sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-brand/12 text-brand">
                    <step.icon size={20} strokeWidth={1.9} />
                  </span>
                  <span className="t-label text-fg-dim">{step.no}</span>
                </div>
                <h3 className="t-h3">{step.title}</h3>
                <p className="text-[15px] leading-relaxed text-fg">{step.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ================= FORM ================= */}
      <section id="dang-ky-audit" className="scroll-mt-28">
        <Container size="narrow" className="mt-24 pb-28 sm:mt-32 sm:pb-36">
          <div className="text-center">
            <SectionLabel className="mb-5 justify-center" data-reveal>
              Bước tiếp theo
            </SectionLabel>
            <h2 className="t-h2" data-reveal>
              Nhận phân tích Digital Growth
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-fg" data-reveal>
              Gửi thông tin doanh nghiệp. DAY sẽ xem xét hệ thống hiện tại và xác định những điểm
              cần ưu tiên trước — hoàn toàn miễn phí, không ràng buộc.
            </p>
          </div>

          <div className="mt-12" data-reveal>
            <AuditForm />
            <p className="mt-5 text-center text-sm text-fg-dim">
              Thông tin được sử dụng để DAY Agency liên hệ và thực hiện đánh giá theo yêu cầu của
              doanh nghiệp.
            </p>
          </div>
        </Container>
      </section>

      {/* ================= STICKY CTA DI ĐỘNG ================= */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 px-5 pt-3 backdrop-blur-xl lg:hidden"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 0.75rem)" }}
      >
        <a
          href="#dang-ky-audit"
          className="flex w-full cursor-pointer items-center justify-center rounded-full bg-brand py-3.5 text-sm font-semibold text-brand-ink"
        >
          Đăng ký Digital Growth Audit miễn phí
        </a>
      </div>
      {/* Đệm để nội dung cuối trang không bị thanh sticky trên che mất trên di động */}
      <div className="h-20 lg:hidden" aria-hidden />
    </>
  );
}
