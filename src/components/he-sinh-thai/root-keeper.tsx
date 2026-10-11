import Image from "next/image";
import { Lora } from "next/font/google";
import { Container, ButtonLink, SectionLabel, cx } from "../ui";
import { htxDirector } from "@/lib/he-sinh-thai";

/**
 * "Người giữ gốc" — giới thiệu Giám đốc HTX Quê Hương Xanh. Nối thẳng hình
 * ảnh "Một bên giữ gốc, một bên mở đường" trong lá tâm thư phía trên.
 *
 * Chỉ kể những điều đã được xác nhận về chị (chuyên nông nghiệp, hiểu quy
 * trình chuyển đổi, tư vấn doanh nghiệp). Không thêm năm kinh nghiệm, quê
 * quán, giải thưởng hay trích dẫn khi chưa có xác nhận của chính chị.
 */
const lora = Lora({ subsets: ["latin", "vietnamese"], weight: ["500", "600"], style: ["normal", "italic"], display: "swap" });

export default function RootKeeper() {
  const d = htxDirector;
  return (
    <section aria-labelledby="nguoi-giu-goc" className="mt-24 sm:mt-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Chân dung trong khung ngắm — ngôn ngữ hình ảnh chung của Diary */}
          <div className="lg:col-span-5" data-reveal>
            <figure className="relative mx-auto max-w-md">
              <div className="relative aspect-[4/5] overflow-hidden rounded-block">
                <Image
                  src={d.photo}
                  alt={`${d.name ?? "Giám đốc HTX Quê Hương Xanh"} — ${d.role}`}
                  fill
                  sizes="(max-width: 1024px) 90vw, 36vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <span className="vf-corner vf-tl" aria-hidden />
                <span className="vf-corner vf-tr" aria-hidden />
                <span className="vf-corner vf-bl" aria-hidden />
                <span className="vf-corner vf-br" aria-hidden />
              </div>
              <figcaption className="absolute -bottom-6 left-6 right-6 rounded-2xl border border-line bg-ink-2/95 px-5 py-4 backdrop-blur-md sm:left-10 sm:right-auto">
                {d.name && <p className="font-bold text-fg">{d.name}</p>}
                <p className={cx("text-sm text-brand-light", !d.name && "font-semibold")}>{d.role}</p>
              </figcaption>
            </figure>
          </div>

          <div className="lg:col-span-7" data-reveal>
            <SectionLabel>Người giữ gốc</SectionLabel>
            <h2 id="nguoi-giu-goc" className={cx(lora.className, "mt-5 text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-[1.12] text-fg")}>
              “Một bên giữ gốc” —{" "}
              <span className="italic text-gradient-brand">{d.name ? `là chị ${d.name}.` : "là chị."}</span>
            </h2>

            <div className="mt-7 flex flex-col gap-5 text-[17px] leading-relaxed text-fg-muted">
              <p>
                Đứng sau mạng lưới nhà sản xuất của Hệ Sinh Thái DIARY là Giám đốc HTX Quê Hương Xanh. Xuất phát từ
                nông nghiệp, chị hiểu một sản phẩm từ chính gốc rễ của nó:{" "}
                <span className="text-fg">đất, mùa vụ, cách làm ra và cả những khó khăn mà người sản xuất ít khi nói thành lời.</span>
              </p>
              <p>
                Điều làm nên khác biệt là chị nhìn được cả hai phía. Một phía là nhà sản xuất cần chuẩn hoá để đi xa.
                Phía kia là thị trường với những đòi hỏi về chất lượng, giấy tờ, bao bì và kênh bán. Chị đứng ở giữa,
                tư vấn từng bước chuyển đổi để sản phẩm thật sự sẵn sàng trước khi bước ra thị trường.
              </p>
              <p className="text-fg">
                Khi Diary Media mở đường bằng hình ảnh, câu chuyện và kênh bán, chị là người giữ cho con đường ấy luôn
                bắt đầu từ một sản phẩm thật.
              </p>
            </div>

            <ul className="mt-8 flex flex-wrap gap-2.5">
              {d.expertise.map((e) => (
                <li key={e} className="rounded-full border border-line bg-ink-2/60 px-4 py-2 text-sm text-fg">
                  {e}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <ButtonLink href="?nhom=nha-san-xuat#dang-ky" variant="solid">
                Trao đổi về sản phẩm của bạn
              </ButtonLink>
              <p className="text-sm text-fg-dim">Dành cho nhà sản xuất, hợp tác xã muốn được tư vấn lộ trình chuyển đổi.</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
