import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, Facebook, MapPin } from "lucide-react";
import { site } from "@/lib/site";
import { Container, SectionLabel } from "./ui";

const columns = [
  {
    title: "Giải pháp",
    links: [
      { href: "/giai-phap/#giai-phap-doanh-nghiep", label: "Giải pháp doanh nghiệp" },
      { href: "/giai-phap/#san-xuat-sang-tao", label: "Sản xuất sáng tạo" },
      { href: "/giai-phap/#quy-trinh", label: "Quy trình làm việc" },
      { href: "/giai-phap/#cau-hoi-thuong-gap", label: "Câu hỏi thường gặp" },
    ],
  },
  {
    title: "Công ty",
    links: [
      { href: "/ve-chung-toi/", label: "Về Day Agency" },
      { href: "/ve-chung-toi/#founder", label: "Founder" },
      { href: "/du-an/", label: "Dự án tiêu biểu" },
      { href: "/lien-he/", label: "Liên hệ hợp tác" },
    ],
  },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-line bg-ink-2/60 pb-10 pt-20 backdrop-blur-xl sm:mt-32">
      {/* Vầng sáng cam mờ neo dưới đáy trang */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[900px] -translate-x-1/2 rounded-full bg-brand/10 blur-[120px]"
      />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Cột thương hiệu */}
          <div className="lg:col-span-5">
            <Link href="/" className="flex w-fit items-center" aria-label={site.name}>
              <Image
                src="/images/brand/logo-wordmark.png"
                alt={site.name}
                width={573}
                height={388}
                className="h-14 w-auto"
              />
            </Link>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-fg-muted">
              {site.tagline}. Đối tác giải pháp truyền thông toàn diện — từ chiến lược, hạ tầng số,
              quảng cáo cho tới sản xuất hình ảnh và ứng dụng trí tuệ nhân tạo.
            </p>

            <div className="mt-8 flex flex-col gap-3.5">
              <a
                href={`tel:${site.contact.phoneIntl}`}
                className="group flex w-fit cursor-pointer items-center gap-3 text-[15px] text-fg transition-colors hover:text-brand"
              >
                <span className="flex size-9 items-center justify-center rounded-full border border-line transition-colors group-hover:border-brand/60">
                  <Phone size={15} strokeWidth={2.2} aria-hidden />
                </span>
                {site.contact.phoneDisplay}
              </a>
              <a
                href={`mailto:${site.contact.email}`}
                className="group flex w-fit cursor-pointer items-center gap-3 text-[15px] text-fg transition-colors hover:text-brand"
              >
                <span className="flex size-9 items-center justify-center rounded-full border border-line transition-colors group-hover:border-brand/60">
                  <Mail size={15} strokeWidth={2.2} aria-hidden />
                </span>
                {site.contact.email}
              </a>
              <a
                href={site.contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-fit cursor-pointer items-center gap-3 text-[15px] text-fg transition-colors hover:text-brand"
              >
                <span className="flex size-9 items-center justify-center rounded-full border border-line transition-colors group-hover:border-brand/60">
                  <Facebook size={15} strokeWidth={2.2} aria-hidden />
                </span>
                {site.contact.facebookLabel}
              </a>
              <p className="flex w-fit items-center gap-3 text-[15px] text-fg-muted">
                <span className="flex size-9 items-center justify-center rounded-full border border-line">
                  <MapPin size={15} strokeWidth={2.2} aria-hidden />
                </span>
                {site.contact.address}
              </p>
            </div>
          </div>

          {/* Cột liên kết */}
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="lg:col-span-2">
              <SectionLabel tone="dim" className="mb-5">
                {col.title}
              </SectionLabel>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className="cursor-pointer text-[15px] text-fg-muted transition-colors hover:text-brand"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Cột giờ làm việc */}
          <div className="lg:col-span-3">
            <SectionLabel tone="dim" className="mb-5">
              Giờ làm việc
            </SectionLabel>
            <p className="text-[15px] text-fg-muted">{site.contact.workingHours}</p>
            <p className="mt-5 text-[15px] leading-relaxed text-fg-muted">
              Yêu cầu ngoài giờ vẫn được tiếp nhận qua Zalo và phản hồi trong buổi làm việc kế tiếp.
            </p>
            <p className="mt-7 rounded-2xl border border-brand/25 bg-brand/[0.07] px-4 py-3 text-sm text-brand-light">
              Cam kết bàn giao sản phẩm trong 12 – 48 giờ.
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-fg-dim">
            © {year} {site.name} · Mã số thuế {site.legalId}
          </p>
          <p className="t-label text-fg-dim">{site.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
