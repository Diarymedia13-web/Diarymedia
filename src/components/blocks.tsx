import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Compass,
  TrendingUp,
  Network,
  LayoutTemplate,
  Target,
  Sparkles,
  Film,
  Flame,
  Smartphone,
  Camera,
  Radio,
  Package,
  CalendarDays,
  Clapperboard,
} from "lucide-react";
import { site } from "@/lib/site";
import { featuredProjects } from "@/lib/projects";
import type { IconKey, Service } from "@/lib/services";
import { ButtonLink, Container, SectionLabel, cx } from "./ui";

/* --------------------------------------------------------------------------
   Bảng ánh xạ icon — dùng SVG của Lucide, không dùng emoji làm biểu tượng
   -------------------------------------------------------------------------- */
const icons: Record<IconKey, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  compass: Compass,
  trending: TrendingUp,
  network: Network,
  layout: LayoutTemplate,
  target: Target,
  sparkles: Sparkles,
  film: Film,
  flame: Flame,
  smartphone: Smartphone,
  camera: Camera,
  radio: Radio,
  package: Package,
  calendar: CalendarDays,
  clapperboard: Clapperboard,
};

/* --------------------------------------------------------------------------
   Dải tên khách hàng chạy ngang
   -------------------------------------------------------------------------- */
export function ClientMarquee() {
  const items = [...site.clients, ...site.clients];
  return (
    <section aria-label="Thương hiệu đã đồng hành" className="overflow-hidden py-10">
      <Container>
        <SectionLabel tone="dim" className="mb-6 text-center">
          Được tin tưởng bởi các thương hiệu &amp; ban tổ chức
        </SectionLabel>
      </Container>
      <div className="relative">
        {/* Làm mờ hai mép để dải chạy không bị cắt cụt */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
        <div className="marquee-track flex w-max items-center gap-10 sm:gap-16">
          {items.map((c, i) => (
            <span
              key={`${c}-${i}`}
              aria-hidden={i >= site.clients.length}
              className="whitespace-nowrap text-lg font-semibold tracking-tight text-fg-dim transition-colors sm:text-xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Thẻ dịch vụ
   -------------------------------------------------------------------------- */
export function ServiceCard({ service, group }: { service: Service; group: string }) {
  const Icon = icons[service.icon];
  return (
    <article
      data-reveal
      data-reveal-group={group}
      className="group relative flex flex-col rounded-block border border-line bg-ink-2/55 backdrop-blur-sm p-7 transition-all duration-500 hover:border-brand/40 hover:bg-surface/75 sm:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-brand/12 text-brand transition-colors duration-500 group-hover:bg-brand group-hover:text-brand-ink">
          <Icon size={22} strokeWidth={1.9} />
        </span>
        <span className="t-label text-fg-dim">#{service.no}</span>
      </div>

      <h3 className="t-h3 mt-6">{service.title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">{service.summary}</p>

      <ul className="mt-6 flex flex-col gap-2.5 border-t border-line pt-6">
        {service.deliverables.map((d) => (
          <li key={d} className="flex items-start gap-2.5 text-sm text-fg-muted">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand/70" aria-hidden />
            {d}
          </li>
        ))}
      </ul>
    </article>
  );
}

/* --------------------------------------------------------------------------
   Lưới dự án tiêu biểu dùng ở trang chủ
   -------------------------------------------------------------------------- */
export function FeaturedWork() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {featuredProjects.map((p, i) => (
        <Link
          key={p.slug}
          href="/du-an/"
          data-reveal
          data-reveal-group="featured"
          className={cx(
            "group relative overflow-hidden rounded-block border border-line bg-ink-2/55 backdrop-blur-sm transition-colors duration-300 hover:border-brand/40",
            i === 0 && "sm:col-span-2 lg:col-span-2",
          )}
        >
          <div className={cx("relative", i === 0 ? "aspect-[16/10]" : "aspect-[4/3]")}>
            <Image
              src={p.cover}
              alt={`${p.title} — ${p.client}`}
              fill
              sizes={i === 0 ? "(max-width: 640px) 100vw, 66vw" : "(max-width: 640px) 100vw, 33vw"}
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
              <div>
                <p className="t-label text-brand-light">
                  {p.category} · {p.year}
                </p>
                <h3 className={cx("mt-2 font-bold tracking-tight text-white", i === 0 ? "text-2xl sm:text-3xl" : "text-lg")}
                  style={{ fontFamily: "var(--font-display)" }}>
                  {p.client}
                </h3>
                <p className="mt-1 max-w-md text-sm text-white/70">{p.title}</p>
              </div>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/12 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-brand group-hover:text-brand-ink">
                <ArrowUpRight size={18} strokeWidth={2.4} aria-hidden />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

/* --------------------------------------------------------------------------
   Khối CTA cuối trang — dùng lại ở mọi trang
   -------------------------------------------------------------------------- */
export function CtaBlock({
  label = "Bắt đầu",
  title = (
    <>
      Cùng xây hệ thống
      <br />
      truyền thông chạy được
    </>
  ),
  lead = "Đặt lịch một buổi trao đổi 30 phút. Chúng tôi nghe bài toán của bạn và đưa ra hướng đi cụ thể — miễn phí, không ràng buộc.",
}: {
  label?: string;
  title?: React.ReactNode;
  lead?: string;
}) {
  return (
    <Container className="mt-24 sm:mt-32">
      <div className="grain relative isolate overflow-hidden rounded-hero grad-ember px-7 py-16 sm:px-14 sm:py-24">
        <div className="relative z-10 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionLabel tone="light" className="mb-5" data-reveal>
              {label}
            </SectionLabel>
            {/* Nhỏ hơn t-display một bậc để tiêu đề tiếng Việt dài không vỡ dòng trong cột 7/12 */}
            <h2
              className="text-[clamp(2rem,4.2vw,3.25rem)] font-extrabold leading-[1.05] tracking-tight text-white"
              style={{ fontFamily: "var(--font-display)" }}
              data-reveal
              data-reveal-group="cta"
            >
              {title}
            </h2>
          </div>
          <div className="flex flex-col items-start gap-7 lg:col-span-4 lg:col-start-9 lg:pt-3">
            <p className="text-[17px] leading-relaxed text-white/85" data-reveal data-reveal-group="cta">
              {lead}
            </p>
            <div className="flex flex-wrap gap-3" data-reveal data-reveal-group="cta">
              <ButtonLink href="/lien-he/" variant="primary">
                Nhận tư vấn miễn phí
              </ButtonLink>
              <ButtonLink href={`tel:${site.contact.phoneIntl}`} variant="outline" external>
                {site.contact.phoneDisplay}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

/* --------------------------------------------------------------------------
   Hero dùng chung cho các trang con
   -------------------------------------------------------------------------- */
export function PageHero({
  label,
  title,
  lead,
  gradient = "grad-ember",
  image,
  imageAlt,
  kicker,
}: {
  label: string;
  title: React.ReactNode;
  lead: string;
  gradient?: "grad-fire" | "grad-ember" | "grad-copper" | "grad-dusk";
  image?: string;
  imageAlt?: string;
  kicker?: string;
}) {
  return (
    <Container size="wide" className="pt-24 sm:pt-28">
      <div className={cx("grain relative isolate overflow-hidden rounded-hero", gradient)}>
        {image && (
          <>
            <Image
              src={image}
              alt={imageAlt ?? ""}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-45 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/55 via-black/10 to-transparent" />
          </>
        )}

        <div className="relative z-10 flex min-h-[62vh] flex-col justify-end px-7 pb-12 pt-32 sm:px-12 sm:pb-16 sm:pt-40">
          <SectionLabel tone="light" className="mb-5">
            {label}
          </SectionLabel>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <h1 className="t-hero text-white lg:col-span-7">{title}</h1>
            <div className="lg:col-span-4 lg:col-start-9">
              {kicker && (
                <p className="mb-4 text-xl font-semibold leading-snug text-white sm:text-2xl"
                   style={{ fontFamily: "var(--font-display)" }}>
                  {kicker}
                </p>
              )}
              <p className="max-w-md text-[15px] leading-relaxed text-white/80">{lead}</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
