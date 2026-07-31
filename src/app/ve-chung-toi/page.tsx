import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import { ButtonLink, Container, SectionHead, SectionLabel } from "@/components/ui";
import { CtaBlock, PageHero } from "@/components/blocks";
import StatBand from "@/components/stat-band";

export const metadata: Metadata = {
  title: "Về chúng tôi",
  description:
    "Diary Agency — công ty tiên phong trong sản xuất nội dung và truyền thông sáng tạo tại Việt Nam. Câu chuyện thương hiệu, giá trị cốt lõi và founder Nguyễn Hồ Thanh Pháp.",
  alternates: { canonical: "/ve-chung-toi/" },
};

const milestones = [
  {
    year: "2021",
    title: "Những khung hình đầu tiên",
    body: "Diary khởi đầu từ một ekip nhỏ nhận quay chụp sự kiện tại Đà Nẵng, với niềm tin rằng mỗi sản phẩm truyền thông đều phải là một câu chuyện chứ không chỉ là tư liệu.",
  },
  {
    year: "2022",
    title: "Mở rộng năng lực sản xuất",
    body: "Đầu tư thiết bị, xây dựng đội ngũ sáng tạo nội dung và bắt đầu nhận các dự án TVC, phim doanh nghiệp cùng những sự kiện quy mô lớn hơn.",
  },
  {
    year: "2023 – 2024",
    title: "Đồng hành cùng thương hiệu lớn",
    body: "Trở thành đối tác sản xuất cho Panasonic, AIA, các liên hoan nghệ thuật và hàng loạt chương trình cấp quốc gia. Cột mốc 1.000 dự án được xác lập.",
  },
  {
    year: "2025 – nay",
    title: "Từ nhà sản xuất thành đối tác giải pháp",
    body: "Diary Agency mở rộng sang giải pháp truyền thông toàn diện: chiến lược, chuyển đổi số, website, quảng cáo và ứng dụng trí tuệ nhân tạo cho doanh nghiệp.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="Về Diary Agency"
        title={
          <>
            Về
            <br />
            Chúng Tôi
          </>
        }
        kicker="Kiến tạo nội dung, kết nối thành công."
        lead="Chúng tôi không chỉ là một đội ngũ sản xuất, mà là những người thổi hồn vào từng khung hình — và giờ là những người dựng nên hệ thống truyền thông cho doanh nghiệp Việt."
        gradient="grad-copper"
        image="/images/team-01.webp"
        imageAlt=""
      />

      {/* ================= CÂU CHUYỆN ================= */}
      <Container className="mt-24 sm:mt-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionLabel className="mb-5" data-reveal>
              Chúng tôi là ai
            </SectionLabel>
            <h2 className="t-h2" data-reveal data-reveal-group="story">
              Thiết kế có mục đích,
              <br />
              và có cá tính
            </h2>
          </div>

          <div className="flex flex-col gap-5 lg:col-span-6 lg:col-start-7">
            <p className="t-lead" data-reveal data-reveal-group="story">
              Diary Agency là công ty tiên phong trong lĩnh vực sản xuất nội dung và truyền thông
              sáng tạo tại Việt Nam. Với phương châm “Kiến tạo nội dung, kết nối thành công”, chúng
              tôi không ngừng đổi mới để mang đến những giải pháp truyền thông chất lượng cao, giúp
              doanh nghiệp nâng tầm thương hiệu và chinh phục khách hàng mục tiêu.
            </p>
            <p className="text-[15px] leading-relaxed text-fg-muted" data-reveal data-reveal-group="story">
              Mỗi sản phẩm truyền thông không đơn thuần là hình ảnh hay video, mà là một câu chuyện,
              một thông điệp truyền tải giá trị thương hiệu của khách hàng đến đúng đối tượng mục
              tiêu. Đó là lý do chúng tôi luôn bắt đầu bằng câu hỏi “thương hiệu này cần được hiểu
              như thế nào?” trước khi bàn tới máy quay và ánh sáng.
            </p>
            <p className="text-[15px] leading-relaxed text-fg-muted" data-reveal data-reveal-group="story">
              Với hơn 4 năm kinh nghiệm, hơn 2.000 khách hàng tin tưởng và hơn 1.000 dự án thành
              công, Diary Agency tự hào là đối tác đáng tin cậy của nhiều doanh nghiệp, tập đoàn và
              thương hiệu lớn tại Việt Nam.
            </p>
          </div>
        </div>

        <div
          data-reveal
          className="relative mt-16 h-72 overflow-hidden rounded-hero border border-line sm:h-[480px]"
        >
          <Image
            src="/images/bts-02.webp"
            alt="Ekip Diary Agency căn khung hình tại hiện trường sản xuất"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
          />
        </div>
      </Container>

      {/* ================= SỐ LIỆU ================= */}
      <Container className="mt-24 sm:mt-32">
        <div data-reveal>
          <StatBand />
        </div>
      </Container>

      {/* ================= FOUNDER ================= */}
      <section id="founder" className="scroll-mt-28">
        <Container className="mt-24 sm:mt-32">
          <div className="grain relative isolate overflow-hidden rounded-hero grad-dusk">
            <div className="relative z-10 grid gap-10 p-6 sm:p-8 lg:grid-cols-12 lg:gap-12 lg:p-10">
              {/* Ảnh gốc có nền đen đặc, nên đóng khung thành panel chân dung
                  thay vì thả trực tiếp lên gradient. */}
              <div className="relative order-2 aspect-square overflow-hidden rounded-block border border-white/15 bg-black shadow-2xl shadow-black/40 lg:order-1 lg:col-span-5 lg:aspect-auto lg:min-h-[540px]">
                <Image
                  src={site.founder.photo}
                  alt={`${site.founder.name}, ${site.founder.role} của ${site.name}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-brand/25 to-transparent"
                />
              </div>

              <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7 lg:py-10">
                <SectionLabel tone="light" className="mb-5">
                  Founder
                </SectionLabel>
                <h2 className="t-display text-white">{site.founder.name}</h2>
                <p className="mt-4 text-[15px] font-semibold uppercase tracking-widest text-white/70">
                  {site.founder.role}
                </p>

                <div className="mt-8 flex flex-col gap-4">
                  {site.founder.bio.map((p) => (
                    <p key={p.slice(0, 24)} className="text-[15px] leading-relaxed text-white/85">
                      {p}
                    </p>
                  ))}
                </div>

                <blockquote
                  className="mt-9 border-l-2 border-white/50 pl-6 text-xl font-bold leading-snug text-white sm:text-2xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  “{site.founder.quote}”
                </blockquote>

                <div className="mt-9">
                  <ButtonLink href="/lien-he/" variant="primary">
                    Trao đổi trực tiếp
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================= GIÁ TRỊ CỐT LÕI ================= */}
      <Container className="mt-24 sm:mt-32">
        <SectionHead
          label="Giá trị cốt lõi"
          title={
            <>
              Tốc độ. Sáng tạo.
              <br />
              Chất lượng.
            </>
          }
          lead="Ba giá trị này là ba cam kết chúng tôi tự đặt mình vào thế bị đo lường trên từng dự án — không phải khẩu hiệu treo tường."
          group="val"
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-block bg-line lg:grid-cols-3">
          {site.values.map((v) => (
            <div
              key={v.no}
              data-reveal
              data-reveal-group="val-cards"
              className="group bg-ink-2 p-8 transition-colors duration-500 hover:bg-surface sm:p-10"
            >
              <span
                className="text-5xl font-bold text-line transition-colors duration-500 group-hover:text-brand"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {v.no}
              </span>
              <h3 className="t-h3 mt-7">{v.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">{v.body}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* ================= CHẶNG ĐƯỜNG ================= */}
      <Container className="mt-24 sm:mt-32">
        <SectionHead
          label="Chặng đường"
          title={
            <>
              Từ nhà sản xuất
              <br />
              thành đối tác giải pháp
            </>
          }
          lead="Bốn năm không chỉ là bốn năm tích luỹ dự án — mà là quá trình chuyển vai từ người cầm máy sang người cùng doanh nghiệp giải bài toán tăng trưởng."
          group="mile"
        />

        <div className="mt-14 flex flex-col">
          {milestones.map((m) => (
            <div
              key={m.year}
              data-reveal
              data-reveal-group="mile-items"
              className="group grid gap-5 border-t border-line py-9 transition-colors last:border-b hover:border-brand/40 lg:grid-cols-12 lg:gap-10"
            >
              <div className="lg:col-span-3">
                <span
                  className="text-3xl font-bold text-brand sm:text-4xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {m.year}
                </span>
              </div>
              <div className="lg:col-span-4">
                <h3 className="t-h3">{m.title}</h3>
              </div>
              <div className="lg:col-span-5">
                <p className="text-[15px] leading-relaxed text-fg-muted">{m.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <CtaBlock
        label="Hợp tác"
        title={
          <>
            Bắt đầu một
            <br />
            câu chuyện mới
          </>
        }
        lead="Chúng tôi nhận số lượng dự án có giới hạn mỗi tháng để đảm bảo chất lượng. Liên hệ sớm để giữ chỗ trong lịch sản xuất."
      />
    </>
  );
}
