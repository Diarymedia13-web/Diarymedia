import Link from "next/link";
import { ArrowUpRight, Camera, Layers, LineChart, Sprout } from "lucide-react";
import { ButtonLink, Container, SectionLabel } from "../ui";

/**
 * Nối tiếp lá tâm thư: chuyển đổi kép là gì, vì sao quan trọng → vì sao chọn
 * chúng tôi. Bằng chứng duy nhất được
 * nêu là dự án Biên Hải Quán có thật; không dùng số liệu chưa kiểm chứng.
 */
const reasons = [
  {
    icon: Layers,
    title: "Một đầu mối cho cả chuỗi",
    body: "Từ nguồn hàng, thương hiệu, nội dung tới kênh bán — không phải thuê năm bên rồi tự ghép lại với nhau.",
  },
  {
    icon: Sprout,
    title: "Có nguồn hàng thật",
    body: "HTX Quê Hương Xanh kết nối trực tiếp nhà sản xuất, hợp tác xã — biết rõ sản phẩm làm ở đâu, ai làm.",
  },
  {
    icon: Camera,
    title: "Tự sản xuất hình ảnh",
    body: "Ekip quay chụp, thiết kế của Diary Media làm trực tiếp — câu chuyện được kể bằng hình ảnh thật, tại nơi làm ra.",
  },
  {
    icon: LineChart,
    title: "Minh bạch, có đo lường",
    body: "Không hứa doanh số. Mỗi kế hoạch có chỉ số để theo dõi, và chúng tôi chỉ công bố điều đã được xác nhận.",
  },
];

export default function StoryIntro() {
  return (
    <section aria-label="Chuyển đổi kép và lý do chọn Hệ Sinh Thái DIARY">
      {/* ---------- Chuyển đổi kép ---------- */}
      <Container className="mt-24 sm:mt-32">
        <SectionLabel>Chuyển đổi kép là gì</SectionLabel>
        <h2 className="t-h2 mt-5 max-w-3xl">Hai cuộc chuyển đổi phải đi cùng nhau</h2>
        <div className="relative mt-10 grid gap-5 md:grid-cols-2">
          <article className="rounded-block border border-line bg-ink-2/60 p-8 sm:p-10" data-reveal data-reveal-group="dual">
            <SectionLabel tone="dim">Chuyển đổi thứ nhất</SectionLabel>
            <h3 className="t-h3 mt-3 text-fg">Từ “hàng làm ra” thành “thương hiệu được chọn”</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">
              Chuẩn hoá sản phẩm, tìm ra câu chuyện đáng kể, làm lại bao bì và hình ảnh, rồi đưa lên những kênh mà người
              mua hôm nay thực sự dùng: sàn thương mại điện tử, livestream, quà tặng doanh nghiệp.
            </p>
          </article>
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 z-10 hidden size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-xl font-bold text-brand-ink md:flex"
          >
            ×
          </span>
          <article className="rounded-block border border-line bg-ink-2/60 p-8 sm:p-10" data-reveal data-reveal-group="dual">
            <SectionLabel tone="dim">Chuyển đổi thứ hai</SectionLabel>
            <h3 className="t-h3 mt-3 text-fg">Từ vận hành thủ công thành vận hành số</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">
              Gom dữ liệu khách hàng về một nơi, bán đa kênh trên một quy trình, đo được hiệu quả từng đồng chi ra, và
              dùng AI để làm nhanh những việc lặp lại.
            </p>
          </article>
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-[17px] leading-relaxed text-fg" data-reveal>
          Làm một nửa là chưa đủ. Sản phẩm đẹp mà không có kênh bán thì vẫn nằm trong kho. Có kênh bán mà sản phẩm chưa
          sẵn sàng thì tiền quảng cáo hết nhanh hơn doanh thu về.{" "}
          <span className="text-gradient-brand font-semibold">Vì vậy chúng tôi làm cả hai, cùng lúc.</span>
        </p>
      </Container>

      {/* ---------- Vì sao chọn chúng tôi ---------- */}
      <Container className="mt-20 sm:mt-24">
        <SectionLabel>Vì sao chọn chúng tôi</SectionLabel>
        <div className="mt-8 grid gap-px overflow-hidden rounded-block bg-line sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-ink-2 p-7" data-reveal data-reveal-group="reasons">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-brand/12 text-brand">
                <Icon size={20} strokeWidth={1.9} aria-hidden />
              </span>
              <h3 className="mt-5 font-bold text-fg">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-6 rounded-block border border-line bg-ink-2/60 p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between" data-reveal>
          <p className="max-w-2xl text-[15px] leading-relaxed text-fg-muted">
            <span className="font-semibold text-fg">Một ví dụ thật:</span> với Biên Hải Quán — đặc sản muối tiêu Phú Quốc —
            chúng tôi biến bao bì cũ dày chữ thành bộ nhận diện kể câu chuyện ông Út Trà Đá, làm lại hình ảnh và đưa sản
            phẩm lên kênh thương mại điện tử.{" "}
            <Link href="/du-an/" className="inline-flex items-center gap-1 font-semibold text-brand underline-offset-4 hover:underline">
              Xem trước / sau <ArrowUpRight size={14} aria-hidden />
            </Link>
          </p>
          <div className="shrink-0">
            <ButtonLink href="#dang-ky" variant="solid">
              Đăng ký hợp tác
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
