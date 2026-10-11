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
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Chân dung trong khung ngắm — ngôn ngữ hình ảnh chung của Diary */}
          <div className="lg:sticky lg:top-28 lg:col-span-5" data-reveal>
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
              <span className="italic text-gradient-brand">{d.name ? `là chị ${d.name.split(" ").slice(-2).join(" ")}.` : "là chị."}</span>
            </h2>

            <div className="mt-7 flex flex-col gap-5 text-[17px] leading-relaxed text-fg-muted">
              <p>
                Chị Kim Tiên là Giám đốc HTX Quê Hương Xanh — người đứng sau mạng lưới nhà sản xuất của Hệ Sinh Thái
                DIARY. Gắn bó với nông nghiệp, chị hiểu một sản phẩm từ chính gốc rễ của nó:{" "}
                <span className="text-fg">đất, mùa vụ, cách làm ra, và cả những khó khăn mà người sản xuất ít khi nói thành lời.</span>
              </p>
              <p>
                Với các ngành nghề đặc sản và truyền thống, chị không chỉ nhìn vào sản phẩm cuối cùng mà hiểu cả nhịp
                làm việc phía sau: mật ong phụ thuộc vào mùa hoa, nước mắm cần thời gian ủ chượp, trà đi theo từng lứa
                hái, một món thủ công cần đôi tay người thợ lành nghề. Vì hiểu nhịp ấy, chị biết{" "}
                <span className="text-fg">điều gì phải giữ nguyên để sản phẩm còn là chính nó</span>, và điều gì cần thay
                đổi để nó đi được xa hơn — từ quy trình, giấy tờ, chất lượng ổn định cho tới bao bì và cách kể chuyện.
              </p>
              <p>
                Điều chị trăn trở nhất là những cơ sở làm ra sản phẩm tốt nhưng phải tự mò mẫm một mình: không biết bắt
                đầu chuẩn hoá từ đâu, không rõ thị trường cần gì, rồi bỏ cuộc giữa chừng. Chị muốn là người đi cùng họ từ
                bước đầu tiên — ngồi lại lắng nghe, cùng nhìn ra điểm mạnh, vạch từng bước chuyển đổi vừa sức với từng
                doanh nghiệp.
              </p>
            </div>

            <p
              className={cx(
                lora.className,
                "mt-8 border-l-2 border-brand/60 pl-5 text-[clamp(1.25rem,2vw,1.55rem)] italic leading-snug text-brand-light",
              )}
            >
              Để không một nghề tốt nào phải dừng lại chỉ vì thiếu người dẫn đường.
            </p>

            <p className="mt-6 text-[17px] leading-relaxed text-fg">
              Khi Diary Media mở đường bằng hình ảnh, câu chuyện và kênh bán, chị Kim Tiên là người giữ cho con đường ấy
              luôn bắt đầu từ một sản phẩm thật.
            </p>

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
