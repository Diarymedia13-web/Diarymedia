import type { Metadata } from "next";
import Image from "next/image";
import { Check, Sprout } from "lucide-react";
import { site } from "@/lib/site";
import { ecosystem, pillars, processSteps, publishedProducts, roles } from "@/lib/he-sinh-thai";
import { ButtonLink, Container, SectionHead, SectionLabel, cx } from "@/components/ui";
import { PageHero } from "@/components/blocks";
import EcosystemLeadForm from "@/components/he-sinh-thai/lead-form";
import StoryIntro from "@/components/he-sinh-thai/story-intro";
import Letter from "@/components/he-sinh-thai/letter";

const description =
  "Hệ Sinh Thái DIARY — hợp tác giữa Diary Media và HTX Quê Hương Xanh: kết nối nhà sản xuất, thương mại hoá đặc sản Việt, livestream bán hàng, quà tặng doanh nghiệp, đào tạo KOC và giải pháp chuyển đổi số cho SME.";

export const metadata: Metadata = {
  title: "Hệ Sinh Thái DIARY – Chuyển đổi kép SME",
  description,
  alternates: { canonical: "/he-sinh-thai/" },
  openGraph: {
    title: "Hệ Sinh Thái DIARY – Chuyển đổi kép SME",
    description,
    url: `${site.url}/he-sinh-thai/`,
    images: [{ url: "/images/work/dana-tramhuong-04.webp", alt: "Hệ Sinh Thái DIARY" }],
  },
};

// Chỉ khai báo đúng những gì trang thể hiện: WebPage + Breadcrumb + Service do
// Diary Media cung cấp. Không khai báo Product/Review khi chưa có dữ liệu thật.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      url: `${site.url}/he-sinh-thai/`,
      name: "Hệ Sinh Thái DIARY",
      description,
      inLanguage: "vi-VN",
      isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: site.name, item: `${site.url}/` },
        { "@type": "ListItem", position: 2, name: "Hệ Sinh Thái DIARY", item: `${site.url}/he-sinh-thai/` },
      ],
    },
    {
      "@type": "Service",
      name: "Hệ Sinh Thái DIARY – Chuyển đổi kép SME",
      description,
      provider: { "@type": "Organization", name: site.name, url: site.url },
      areaServed: { "@type": "Country", name: "Việt Nam" },
    },
  ],
};

export default function EcosystemPage() {
  const products = publishedProducts();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        label={`Diary Media × ${ecosystem.partner}`}
        title={
          <>
            Hệ Sinh Thái
            <br />
            DIARY
          </>
        }
        kicker={`${ecosystem.message}.`}
        lead="Diary Media hợp tác cùng HTX Quê Hương Xanh kết nối nhà sản xuất, sáng tạo nội dung, thương mại hoá sản phẩm Việt và đồng hành phát triển doanh nghiệp SME — chuyển đổi kép: đưa sản phẩm ra thị trường và đưa doanh nghiệp lên số."
        gradient="grad-ember"
        image="/images/work/dana-tramhuong-04.webp"
        imageAlt=""
        viewfinder
      />

      <Letter />
      <StoryIntro />

      {/* ================= ĐỐI TÁC HỢP TÁC ================= */}
      <Container className="mt-24 sm:mt-32">
        <SectionHead
          label="Mô hình hợp tác"
          title={
            <>
              Hai đơn vị,
              <br />
              một hệ sinh thái
            </>
          }
          lead="Mỗi bên giữ một phần việc mình làm tốt nhất, cùng phối hợp vận hành một hệ sinh thái."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {roles.map((r) => (
            <article key={r.name} className="rounded-block border border-line bg-ink-2/60 p-8" data-reveal data-reveal-group="roles">
              <SectionLabel>{r.role}</SectionLabel>
              <h3 className="t-h3 mt-3 text-fg">{r.name}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">{r.body}</p>
            </article>
          ))}
        </div>
      </Container>

      {/* ================= NĂM TRỤ CỘT ================= */}
      <Container className="mt-24 sm:mt-32">
        <SectionHead
          label="Năm trụ cột"
          title={
"Một điểm đến cho cả hành trình đưa sản phẩm ra thị trường"
          }
          lead="Mỗi trụ cột dùng riêng được, nhưng mạnh nhất khi kết hợp: sản phẩm được kể chuyện, lên livestream, vào hộp quà và bán trên nhiều kênh."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {pillars.map((p, i) => (
            <article
              key={p.id}
              id={p.id}
              data-reveal
              data-reveal-group="pillars"
              className={cx(
                "flex scroll-mt-28 flex-col overflow-hidden rounded-block border border-line bg-ink-2/60",
                i < 3 ? "lg:col-span-2" : "lg:col-span-3",
                i === 4 && "md:col-span-2 lg:col-span-3",
              )}
            >
              <figure className="relative aspect-[16/9] overflow-hidden">
                <Image src={p.media.src} alt={p.media.alt} fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" />
                <figcaption className="absolute bottom-3 left-3 rounded-full bg-black/45 px-3 py-1 text-[11px] text-white/85 backdrop-blur-md">
                  Ảnh: {p.media.credit}
                </figcaption>
              </figure>
              <div className="flex flex-1 flex-col p-7">
                <SectionLabel tone="dim">0{i + 1}</SectionLabel>
                <h3 className="t-h3 mt-2 text-fg">{p.name}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">{p.summary}</p>
                <ul className="mt-5 flex flex-col gap-2">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-sm text-fg">
                      <Check size={15} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Container>

      {/* ================= QUY TRÌNH ================= */}
      <Container className="mt-24 sm:mt-32">
        <SectionHead label="Cách hoạt động" title="Năm bước từ đăng ký tới tăng trưởng" />
        <ol className="mt-12 grid gap-px overflow-hidden rounded-block bg-line sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((s, i) => (
            <li key={s.title} className="bg-ink-2 p-7" data-reveal data-reveal-group="steps">
              <span className="t-display text-gradient-brand">{i + 1}</span>
              <h3 className="mt-4 font-bold text-fg">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </Container>

      {/* ================= ĐẶC SẢN & CÂU CHUYỆN ================= */}
      <Container className="mt-24 sm:mt-32">
        <SectionHead
          label="Đặc sản trong hệ sinh thái"
          title="Sản phẩm thật, câu chuyện thật"
          lead="Chỉ những sản phẩm đã thẩm định nguồn gốc, pháp lý và được nhà sản xuất duyệt nội dung mới xuất hiện tại đây."
        />
        {products.length === 0 ? (
          <div className="mt-12 flex flex-col items-center rounded-block border border-dashed border-line px-6 py-14 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-brand/12 text-brand">
              <Sprout size={24} aria-hidden />
            </span>
            <SectionLabel className="mt-5">Đang cập nhật</SectionLabel>
            <h3 className="t-h3 mt-3 max-w-xl text-fg">Danh mục đặc sản đang được tuyển chọn cùng HTX Quê Hương Xanh</h3>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-fg-muted">
              Bạn là nhà sản xuất, hợp tác xã có sản phẩm tốt? Đăng ký để được thẩm định và đưa vào hệ sinh thái.
            </p>
            <div className="mt-7">
              <ButtonLink href="?nhom=nha-san-xuat#dang-ky" variant="solid">
                Đăng ký sản phẩm
              </ButtonLink>
            </div>
          </div>
        ) : (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <article key={p.slug} className="overflow-hidden rounded-block border border-line bg-ink-2/60">
                <div className="relative aspect-[4/3]">
                  <Image src={p.image.src} alt={p.image.alt} fill sizes="33vw" className="object-cover" />
                </div>
                <div className="p-6">
                  <SectionLabel tone="dim">{p.region}</SectionLabel>
                  <h3 className="t-h3 mt-2 text-fg">{p.name}</h3>
                  <p className="mt-2 text-sm text-fg-muted">{p.summary}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </Container>

      {/* ================= ĐĂNG KÝ HỢP TÁC ================= */}
      <section id="dang-ky" className="scroll-mt-24">
        <Container className="mt-24 sm:mt-32">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <SectionLabel>Đăng ký hợp tác</SectionLabel>
                <h2 className="t-h2 mt-5">Doanh nghiệp có sản phẩm tốt. Chúng tôi đưa sản phẩm đến thị trường.</h2>
                <p className="t-lead mt-5">
                  Chọn nhóm của bạn — form chỉ hỏi những thông tin cần thiết. Đội ngũ Diary Media phản hồi trong 1–2 ngày
                  làm việc.
                </p>
              </div>
            </div>
            <div className="lg:col-span-8">
              <EcosystemLeadForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
