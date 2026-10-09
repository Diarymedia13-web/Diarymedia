import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { site } from "@/lib/site";
import { solutionServices, productionServices, processSteps, tracks } from "@/lib/services";
import { ButtonLink, Container, SectionHead, SectionLabel } from "@/components/ui";
import { ClientMarquee, CtaBlock, FeaturedWork, ServiceCard } from "@/components/blocks";
import StatBand from "@/components/stat-band";
import Timecode from "@/components/timecode";

/* Đúng 5 mảng ghi trên ảnh bìa chính thức, thêm AI là hướng đi mới — không
   đánh số vì đây là danh mục, không phải trình tự. */
const heroServices = ["Visual Branding", "Creative Agency", "Event", "TVC", "Marketing", "AI"];

const BTS_STRIP = [
  { src: "/images/bts/bts-14.webp", alt: "Đạo diễn đeo tai nghe bộ đàm theo dõi khung hình trên màn hình máy quay" },
  { src: "/images/bts/bts-15.webp", alt: "Quay phim đẩy máy trên ray trượt trong căn hộ mẫu" },
  { src: "/images/bts/bts-11.webp", alt: "Phỏng vấn nhân vật với đèn amaran và máy quay đặt trên chân" },
  { src: "/images/bts/bts-18.webp", alt: "Máy quay gắn màn hình và bộ phát không dây trên ray trượt cạnh giường" },
  { src: "/images/bts/bts-19.webp", alt: "Ekip chuyển thiết bị trước cửa showroom trước giờ quay" },
  { src: "/images/bts/bts-23.webp", alt: "Ekip chỉ đạo diễn xuất cho nhóm công nhân trong cảnh quay ngoài trời lúc chiều tối" },
];

export default function HomePage() {
  return (
    <>
      {/* ================= HERO — khung ngắm máy quay ================= */}
      <Container size="wide" className="pt-24 sm:pt-28">
        <div className="relative overflow-hidden rounded-[1.25rem] border border-line bg-black shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]">
          <Image
            src="/images/brand/diary-cover.webp"
            alt="Ảnh bìa Diary Media: logo công ty, các thương hiệu đã đồng hành và ekip đang vận hành máy quay tại phim trường"
            width={2048}
            height={780}
            priority
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="hero-slow-zoom h-auto w-full"
          />
          <span className="vf-corner vf-tl" aria-hidden />
          <span className="vf-corner vf-tr" aria-hidden />
          <span className="vf-corner vf-bl" aria-hidden />
          <span className="vf-corner vf-br" aria-hidden />
          <div
            className="absolute left-[clamp(22px,3.6vw,56px)] top-[clamp(10px,1.8vw,26px)] z-[2] flex items-center gap-[0.6em] font-mono text-[clamp(8px,0.95vw,13px)] tracking-[0.12em] text-white/90"
            aria-hidden
          >
            <span className="rec-dot size-[0.75em] rounded-full bg-[#ff3b30]" />
            REC
            <Timecode className="tabular-nums text-white/75" />
          </div>
        </div>

        <div className="mt-10 grid gap-8 sm:mt-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel className="mb-5">{site.legalName} · Đà Nẵng</SectionLabel>
            <h1
              className="text-[clamp(2.1rem,4.4vw,3.9rem)] font-extrabold leading-[1.12] tracking-[-0.03em]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Hình ảnh kể câu chuyện.
              <br />
              <span className="text-gradient-brand">AI vận hành hệ thống.</span>
            </h1>
          </div>
          <div className="flex flex-col items-start gap-7 lg:col-span-5">
            <p className="text-[17px] leading-relaxed text-fg-muted">
              Diary Media sản xuất hình ảnh, TVC và sự kiện cho thương hiệu, rồi dùng AI để biến nội
              dung đó thành một hệ thống truyền thông đo được bằng khách hàng và doanh thu.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/audit/" variant="solid">
                Nhận Digital Growth Audit
              </ButtonLink>
              <ButtonLink href="/du-an/" variant="outline-ink">
                Xem dự án
              </ButtonLink>
            </div>
          </div>
        </div>

        <ul className="mt-12 flex flex-wrap border-t border-line pt-6">
          {heroServices.map((s) => (
            <li
              key={s}
              className="t-label mb-3 mr-6 text-fg-muted last:mr-0 sm:mr-10"
            >
              {s}
            </li>
          ))}
        </ul>
      </Container>

      <ClientMarquee />

      {/* ================= ĐỊNH VỊ ================= */}
      <Container className="mt-16 sm:mt-24">
        <SectionHead
          label="Đằng sau mỗi thương hiệu"
          title={
            <>
              Kiến tạo nội dung,
              <br />
              kết nối thành công
            </>
          }
          lead={
            <>
              Hơn bốn năm đứng sau hàng nghìn dự án, chúng tôi nhận ra thứ doanh nghiệp Việt Nam
              thiếu không phải một video đẹp — mà là một hệ thống truyền thông chạy được: từ thông
              điệp, kênh phân phối cho tới cách đo lường hiệu quả kinh doanh.
            </>
          }
          cta={
            <ButtonLink href="/ve-chung-toi/" variant="solid">
              Câu chuyện Diary Media
            </ButtonLink>
          }
          group="intro"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {[
            { src: "/images/work/aodai-02.webp", alt: "Khung hình từ dự án fashion film Áo Dài “Yên”" },
            { src: "/images/work/coffee-05.webp", alt: "Ảnh thương hiệu cho dự án cà phê Agreco" },
            { src: "/images/work/food-02.webp", alt: "Ảnh ẩm thực thương mại cho thương hiệu Lê Gia" },
          ].map((img, i) => (
            <div
              key={img.src}
              data-reveal
              data-reveal-group="intro-imgs"
              className="relative aspect-[4/5] overflow-hidden rounded-block border border-line"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
                data-parallax={i === 1 ? "10" : "6"}
              />
            </div>
          ))}
        </div>
      </Container>

      {/* ================= HAI DÒNG DỊCH VỤ ================= */}
      <Container className="mt-24 sm:mt-32">
        <SectionHead
          label="Hai dòng dịch vụ"
          title={
            <>
              Chọn đúng thứ
              <br />
              doanh nghiệp bạn cần
            </>
          }
          lead="Diary Media vận hành hai dòng dịch vụ tách bạch. Một bên giải quyết bài toán hệ thống, một bên giải quyết bài toán sản xuất. Bạn có thể chọn riêng, hoặc kết hợp cả hai."
          group="tracks"
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {/* Dòng 01 */}
          <Link
            href="/giai-phap/#giai-phap-doanh-nghiep"
            data-reveal
            data-reveal-group="tracks-cards"
            className="group grain relative isolate flex flex-col justify-between overflow-hidden rounded-hero grad-copper p-8 transition-transform duration-500 hover:-translate-y-1 sm:p-11"
          >
            <div className="relative z-10">
              <SectionLabel tone="light" className="mb-5">
                {tracks.solution.label} · Mảng đang đẩy mạnh
              </SectionLabel>
              <h3 className="t-display max-w-sm text-white">{tracks.solution.title}</h3>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/85">
                {tracks.solution.lead}
              </p>
            </div>
            <ul className="relative z-10 mt-9 flex flex-wrap gap-2">
              {solutionServices.map((s) => (
                <li
                  key={s.slug}
                  className="rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[13px] font-medium text-white backdrop-blur-sm"
                >
                  {s.title}
                </li>
              ))}
            </ul>
            <span className="relative z-10 mt-9 inline-flex items-center gap-2 text-sm font-semibold text-white">
              Xem chi tiết giải pháp
              <ArrowRight
                size={17}
                strokeWidth={2.4}
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </span>
          </Link>

          {/* Dòng 02 */}
          <Link
            href="/giai-phap/#san-xuat-sang-tao"
            data-reveal
            data-reveal-group="tracks-cards"
            className="group relative flex flex-col justify-between overflow-hidden rounded-hero border border-line bg-ink-2/55 backdrop-blur-sm p-8 transition-all duration-500 hover:-translate-y-1 hover:border-brand/40 sm:p-11"
          >
            <div className="relative z-10">
              <SectionLabel className="mb-5">{tracks.production.label} · Năng lực lõi</SectionLabel>
              <h3 className="t-display max-w-sm">{tracks.production.title}</h3>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-fg-muted">
                {tracks.production.lead}
              </p>
            </div>
            <ul className="relative z-10 mt-9 flex flex-wrap gap-2">
              {productionServices.map((s) => (
                <li
                  key={s.slug}
                  className="rounded-full border border-line px-3.5 py-1.5 text-[13px] font-medium text-fg-muted"
                >
                  {s.title}
                </li>
              ))}
            </ul>
            <span className="relative z-10 mt-9 inline-flex items-center gap-2 text-sm font-semibold text-brand">
              Xem năng lực sản xuất
              <ArrowRight
                size={17}
                strokeWidth={2.4}
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </span>
          </Link>
        </div>
      </Container>

      {/* ================= SỐ LIỆU ================= */}
      <Container className="mt-24 sm:mt-32">
        <div data-reveal>
          <StatBand />
        </div>
      </Container>

      {/* ================= DỰ ÁN TIÊU BIỂU ================= */}
      <Container className="mt-24 sm:mt-32">
        <SectionHead
          label="Selected Work"
          title={
            <>
              Thương hiệu thật,
              <br />
              kết quả thật
            </>
          }
          lead="Một lát cắt từ hơn 1.000 dự án đã triển khai — trải từ TVC doanh nghiệp, fashion film, sự kiện quy mô lớn cho tới nhiếp ảnh thương mại."
          cta={
            <ButtonLink href="/du-an/" variant="solid">
              Xem toàn bộ dự án
            </ButtonLink>
          }
          group="work"
        />
        <div className="mt-14">
          <FeaturedWork />
        </div>
      </Container>

      {/* ================= GIẢI PHÁP NỔI BẬT ================= */}
      <Container className="mt-24 sm:mt-32">
        <SectionHead
          label="Giải pháp doanh nghiệp"
          title={
            <>
              Truyền thông vận hành
              <br />
              như một hệ thống
            </>
          }
          lead="Sáu mảng dưới đây được thiết kế để ghép vào nhau. Bạn có thể bắt đầu từ một mảng và mở rộng dần theo tốc độ tăng trưởng của doanh nghiệp."
          group="solutions"
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {solutionServices.map((s) => (
            <ServiceCard key={s.slug} service={s} group="solutions-cards" />
          ))}
        </div>
        <div className="mt-10" data-reveal>
          <ButtonLink href="/giai-phap/" variant="solid">
            Tìm hiểu toàn bộ giải pháp
          </ButtonLink>
        </div>
      </Container>

      {/* ================= QUY TRÌNH ================= */}
      <Container className="mt-24 sm:mt-32">
        <SectionHead
          label="Cách chúng tôi làm việc"
          title={
            <>
              Bốn bước,
              <br />
              không có bước nào mơ hồ
            </>
          }
          lead="Bạn luôn biết dự án đang ở đâu, ai chịu trách nhiệm và mốc kế tiếp là gì. Không có giai đoạn nào diễn ra trong im lặng."
          group="process"
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-block bg-line md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => (
            <div
              key={step.no}
              data-reveal
              data-reveal-group="process-steps"
              className="group flex flex-col bg-ink-2/55 backdrop-blur-sm p-7 transition-colors duration-500 hover:bg-surface/75 sm:p-8"
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-5xl font-bold text-line transition-colors duration-500 group-hover:text-brand"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {step.no}
                </span>
                <span className="t-label rounded-full border border-line px-3 py-1.5 text-fg-dim">
                  {step.duration}
                </span>
              </div>
              <h3 className="t-h3 mt-7">{step.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* ================= HẬU TRƯỜNG ================= */}
      <section className="relative isolate mt-24 overflow-hidden sm:mt-32">
        <Image
          src="/images/bts/bts-12.webp"
          alt="Ekip Diary Media dựng đèn và máy quay trong phòng họp của khách hàng SBS Villa"
          fill
          sizes="100vw"
          className="object-cover object-[center_30%]"
          data-reveal
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent" />
        <span className="grain absolute inset-0" aria-hidden />

        <Container className="relative z-10 py-24 sm:py-32">
          <SectionLabel tone="light" className="mb-5" data-reveal>
            Hậu trường sản xuất
          </SectionLabel>
          <h2
            className="max-w-3xl text-[clamp(1.75rem,4.2vw,3.25rem)] font-extrabold leading-[1.08] tracking-tight text-white"
            style={{ fontFamily: "var(--font-display)" }}
            data-reveal
            data-reveal-group="bts"
          >
            Phía sau mỗi khung hình
            <br />
            là một ekip đang chạy hết mình.
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/80" data-reveal data-reveal-group="bts">
            Không có ảnh dàn dựng nào ở đây — đây là ekip Diary Media trên phim trường thật: đèn,
            máy quay và những người đứng sau mỗi khung hình.
          </p>
        </Container>
      </section>

      <Container size="wide" className="mt-5">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {BTS_STRIP.map((b) => (
            <li
              key={b.src}
              data-reveal
              data-reveal-group="bts-strip"
              className="relative aspect-[3/4] overflow-hidden rounded-xl border border-line"
            >
              <Image
                src={b.src}
                alt={b.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 17vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </li>
          ))}
        </ul>
      </Container>

      {/* ================= GIÁ TRỊ CỐT LÕI ================= */}
      <Container className="mt-24 sm:mt-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel className="mb-5" data-reveal>
              Tại sao chọn Diary Media
            </SectionLabel>
            <h2 className="t-h2" data-reveal data-reveal-group="values">
              Tốc độ.
              <br />
              Sáng tạo.
              <br />
              <span className="text-gradient-brand">Chất lượng.</span>
            </h2>
            <p className="t-lead mt-7 max-w-md" data-reveal data-reveal-group="values">
              Ba giá trị này không phải khẩu hiệu treo tường. Chúng là ba cam kết chúng tôi bị đo
              lường trên từng dự án.
            </p>
            <div className="mt-8" data-reveal data-reveal-group="values">
              <ButtonLink href="/lien-he/" variant="solid">
                Bắt đầu dự án
              </ButtonLink>
            </div>
          </div>

          <div className="flex flex-col lg:col-span-6 lg:col-start-7">
            {site.values.map((v) => (
              <div
                key={v.no}
                data-reveal
                data-reveal-group="values-list"
                className="group border-t border-line py-8 transition-colors last:border-b hover:border-brand/40"
              >
                <div className="flex items-baseline gap-5">
                  <span className="t-label text-brand">#{v.no}</span>
                  <div>
                    <h3 className="t-h3">{v.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">{v.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* ================= FOUNDER ================= */}
      <Container className="mt-24 sm:mt-32">
        <div className="grid items-center gap-10 overflow-hidden rounded-hero border border-line bg-ink-2/55 backdrop-blur-sm lg:grid-cols-12">
          <div className="relative order-2 aspect-square w-full bg-black lg:order-1 lg:col-span-5 lg:aspect-auto lg:h-full lg:min-h-[520px]">
            <Image
              src={site.founder.photo}
              alt={`${site.founder.name} — ${site.founder.role} của ${site.name}`}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-contain object-bottom"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand/20 to-transparent"
            />
          </div>

          <div className="order-1 px-7 py-10 lg:order-2 lg:col-span-6 lg:col-start-7 lg:px-0 lg:py-16">
            <SectionLabel className="mb-6" data-reveal>
              Người đứng sau
            </SectionLabel>
            <blockquote
              className="text-2xl font-bold leading-snug tracking-tight sm:text-3xl"
              style={{ fontFamily: "var(--font-display)" }}
              data-reveal
              data-reveal-group="founder"
            >
              “{site.founder.quote}”
            </blockquote>
            <div className="mt-8 flex items-center gap-4" data-reveal data-reveal-group="founder">
              <span className="h-px w-10 bg-brand" aria-hidden />
              <div>
                <p className="font-semibold text-fg">{site.founder.name}</p>
                <p className="text-sm text-fg-dim">{site.founder.role}</p>
              </div>
            </div>

            <ul className="mt-9 flex flex-col gap-3" data-reveal data-reveal-group="founder">
              {[
                "Định hướng chiến lược trực tiếp cho từng dự án trọng điểm",
                "Hơn 4 năm dẫn dắt đội ngũ sản xuất và sáng tạo nội dung",
                "Đưa AI vào quy trình sản xuất và tư vấn doanh nghiệp",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] text-fg-muted">
                  <Check size={17} strokeWidth={2.6} className="mt-1 shrink-0 text-brand" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-9" data-reveal data-reveal-group="founder">
              <ButtonLink href="/ve-chung-toi/#founder" variant="ghost">
                Tìm hiểu về founder
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>

      <CtaBlock />
    </>
  );
}
