import type { Metadata } from "next";
import { Phone, Mail, Facebook, MapPin, Clock, Zap } from "lucide-react";
import { site } from "@/lib/site";
import { faqs } from "@/lib/services";
import { Container, SectionHead, SectionLabel } from "@/components/ui";
import { PageHero } from "@/components/blocks";
import ContactForm from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: `Liên hệ Diary Agency để nhận tư vấn giải pháp truyền thông cho doanh nghiệp. Hotline ${site.contact.phoneDisplay}, email ${site.contact.email}.`,
  alternates: { canonical: "/lien-he/" },
};

const channels = [
  {
    icon: Phone,
    label: "Hotline",
    value: site.contact.phoneDisplay,
    href: `tel:${site.contact.phoneIntl}`,
    note: "Nhanh nhất — gọi trong giờ làm việc",
  },
  {
    icon: Mail,
    label: "Email",
    value: site.contact.email,
    href: `mailto:${site.contact.email}`,
    note: "Phù hợp khi gửi brief và tài liệu",
  },
  {
    icon: Facebook,
    label: "Fanpage",
    value: site.contact.facebookLabel,
    href: site.contact.facebook,
    note: "Xem dự án mới nhất mỗi tuần",
    external: true,
  },
  {
    icon: MapPin,
    label: "Khu vực",
    value: site.contact.address,
    note: "Ekip triển khai trên toàn quốc",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Liên hệ"
        title={
          <>
            Liên
            <br />
            Hệ
          </>
        }
        kicker="Hãy cùng xây điều gì đó đáng nhớ."
        lead="Gửi yêu cầu qua form bên dưới hoặc gọi thẳng hotline. Chúng tôi phản hồi trong vòng 24 giờ làm việc và luôn bắt đầu bằng một buổi trao đổi miễn phí."
        gradient="grad-ember"
        image="/images/work/gala-01.webp"
        imageAlt=""
      />

      {/* ================= KÊNH LIÊN HỆ ================= */}
      <Container className="mt-20 sm:mt-24">
        <div className="grid gap-px overflow-hidden rounded-block bg-line sm:grid-cols-2 lg:grid-cols-4">
          {channels.map(({ icon: Icon, label, value, href, note, external }) => {
            const inner = (
              <>
                <span className="flex size-11 items-center justify-center rounded-2xl bg-brand/12 text-brand transition-colors duration-500 group-hover:bg-brand group-hover:text-brand-ink">
                  <Icon size={20} strokeWidth={1.9} aria-hidden />
                </span>
                <SectionLabel tone="dim" className="mt-6">
                  {label}
                </SectionLabel>
                <p className="mt-2 break-words text-[17px] font-semibold text-fg">{value}</p>
                <p className="mt-2 text-sm text-fg-dim">{note}</p>
              </>
            );

            const cls =
              "group flex flex-col bg-ink-2 p-7 transition-colors duration-500 hover:bg-surface sm:p-8";

            return href ? (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className={`${cls} cursor-pointer`}
              >
                {inner}
              </a>
            ) : (
              <div key={label} className={cls}>
                {inner}
              </div>
            );
          })}
        </div>
      </Container>

      {/* ================= FORM ================= */}
      <Container className="mt-20 sm:mt-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionLabel className="mb-5" data-reveal>
              Yêu cầu tư vấn
            </SectionLabel>
            <h2 className="t-h2" data-reveal data-reveal-group="form">
              Kể cho chúng tôi
              <br />
              nghe bài toán
              <br />
              của bạn
            </h2>
            <p className="t-lead mt-7" data-reveal data-reveal-group="form">
              Càng cụ thể về sản phẩm, mục tiêu và ngân sách, đề xuất chúng tôi gửi lại càng sát với
              thực tế doanh nghiệp bạn.
            </p>

            <div className="mt-10 flex flex-col gap-4" data-reveal data-reveal-group="form">
              {[
                { icon: Clock, title: "Phản hồi trong 24 giờ", body: "Tính theo ngày làm việc." },
                {
                  icon: Zap,
                  title: "Buổi trao đổi đầu miễn phí",
                  body: "Không ràng buộc, không phí ẩn.",
                },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex items-start gap-4 rounded-2xl border border-line p-5">
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-brand/12 text-brand">
                    <Icon size={17} strokeWidth={2.1} aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold text-fg">{title}</p>
                    <p className="mt-1 text-sm text-fg-dim">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <ContactForm />
          </div>
        </div>
      </Container>

      {/* ================= FAQ ================= */}
      <Container className="mt-24 sm:mt-32">
        <SectionHead
          label="Trước khi liên hệ"
          title={
            <>
              Có thể câu trả lời
              <br />
              đã ở ngay đây
            </>
          }
          lead="Những câu hỏi khách hàng hay đặt ra nhất trong buổi làm việc đầu tiên."
          group="cfaq"
        />

        <div className="mt-14 flex flex-col">
          {faqs.map((f, i) => (
            <details
              key={f.q}
              data-reveal
              data-reveal-group="cfaq-items"
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
    </>
  );
}
