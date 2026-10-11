import Link from "next/link";
import Image from "next/image";
import { Lora } from "next/font/google";
import { ArrowDown, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";
import { Container, cx } from "../ui";
import Signature from "./signature";

/**
 * "Lá tâm thư gửi doanh nghiệp" — khối mở đầu trang Hệ Sinh Thái DIARY.
 * Thư dựng bằng chữ thật (không phải ảnh) để đọc rõ trên điện thoại, máy tìm
 * kiếm đọc được, và gắn được lời mời hồi âm (CTA) ngay trong phần tái bút.
 * Font Lora chỉ nạp ở trang này.
 */
const lora = Lora({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export default function Letter() {
  return (
    <section aria-labelledby="la-thu-title" className="relative mt-24 overflow-x-clip py-6 sm:mt-32">
      {/* Vầng sáng ấm như ánh đèn bàn chiếu lên lá thư */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-0 h-[640px] w-[760px] rounded-full bg-[radial-gradient(closest-side,rgba(243,154,98,0.22),transparent)] blur-2xl"
      />
      <Container size="wide" className="relative">
        <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-10">
          {/* ---------- Tiêu đề ---------- */}
          <div className="lg:sticky lg:top-32 lg:col-span-5 lg:pt-16" data-reveal>
            <p className="t-label text-brand-light/80">Lá tâm thư gửi doanh nghiệp</p>
            <span aria-hidden className="mt-4 block h-px w-12 bg-brand/60" />
            <h2
              id="la-thu-title"
              className={cx(lora.className, "mt-8 text-[clamp(2.1rem,4.2vw,3.6rem)] font-bold leading-[1.08] tracking-[-0.015em] text-fg")}
            >
              Sản phẩm tốt xứng đáng được biết đến.{" "}
              <span className="text-gradient-brand">
                Doanh nghiệp tử tế xứng đáng có một con đường phát triển rõ ràng hơn.
              </span>
            </h2>
          </div>

          {/* ---------- Lá thư ---------- */}
          <div className="lg:col-span-7" data-reveal>
            <div className="letter-stack relative mx-auto max-w-[680px]">
            <article
              className={cx(
                lora.className,
                "letter-paper relative px-7 pb-10 pt-11 text-[#3b2619] sm:rotate-[1.2deg] sm:px-12 sm:pb-12 sm:pt-14",
              )}
            >
              <span aria-hidden className="letter-watermark" />
              <p className="text-[clamp(1.5rem,2.4vw,1.9rem)] font-medium italic text-[#4a2b1a]">Thưa anh/chị,</p>

              <div className="mt-6 flex flex-col gap-4 text-[16.5px] leading-[1.75] sm:text-[17px]">
                <p>
                  Có một hũ mật ong rừng, một chai nước mắm ủ chượp theo cách của ông bà, một gói trà hái trên núi lúc
                  sương còn chưa tan. Người làm ra chúng dậy từ khi trời còn tối, giữ nghề qua bao mùa mưa nắng.
                </p>
                <p>
                  Rồi những sản phẩm ấy nằm yên ở một góc chợ phiên, trên kệ một cửa hàng nhỏ ven đường.{" "}
                  <strong className="font-bold text-[#2a170d]">Không phải vì không ngon.</strong> Mà vì nó chưa được đến tay
                  khách hàng thông qua những kênh họ đang tìm và mua mỗi ngày — sàn thương mại điện tử, mạng xã hội,
                  livestream hay những bộ quà tặng doanh nghiệp.
                </p>
                <p>
                  Chúng tôi cũng gặp rất nhiều chủ doanh nghiệp làm ăn tử tế. Họ biết mình phải lên mạng, lên sàn, làm
                  livestream… nhưng mỗi việc thuê một nơi, mỗi kênh làm một kiểu. Tiền chi ra đều đặn, còn khách hàng
                  thì vẫn chưa biết tìm đến từ đâu.
                </p>
                <p>
                  <strong className="font-bold text-[#2a170d]">Không phải vì anh/chị chưa đủ giỏi.</strong> Mà vì hôm
                  nay, để một giá trị thật đi xa, cần nhiều hơn một sản phẩm tốt — cần một câu chuyện được kể đúng, một
                  hệ thống truyền thông chạy đều và một con đường chuyển đổi phù hợp.
                </p>
                <p className="font-semibold text-[#2a170d]">Hệ Sinh Thái DIARY ra đời từ chính những lần gặp ấy.</p>
                <p>
                  HTX Quê Hương Xanh đi cùng nhà sản xuất từ nơi làm ra. Diary Media mang hình ảnh, câu chuyện, kênh bán
                  và công nghệ để đưa sản phẩm tới đúng người cần. Một bên giữ gốc, một bên mở đường — để anh/chị không
                  phải xoay xở một mình.
                </p>
                <p>
                  <span className="font-semibold text-[#2a170d]">Chúng tôi tin rằng:</span>
                  <br />
                  Một sản phẩm tử tế không nên dừng lại ở một góc chợ nhỏ.
                  <br />
                  Một doanh nghiệp có tâm không nên bị giới hạn chỉ vì thiếu hệ thống.
                </p>
              </div>

              <div className="relative mt-9 border-t border-[#3b2619]/20 pt-6">
                <p className="italic text-[#4a2b1a]">Trân trọng,</p>
                <p className="mt-1 text-[17px] font-semibold italic text-[#4a2b1a]">Diary Media × HTX Quê Hương Xanh</p>
                <Signature className="pointer-events-none absolute -top-2 right-16 h-20 w-40 text-[#a85f34] sm:right-24 sm:w-48" />
                <span aria-hidden className="wax-seal absolute -top-5 right-0 sm:right-2">
                  <Image src="/images/brand/diary-mark.png" alt="" width={512} height={512} className="h-8 w-8 opacity-90 mix-blend-luminosity" />
                </span>
              </div>

              {/* Tái bút = lời mời hồi âm — điểm chuyển đổi chính của khối */}
              <div className="mt-8 rounded-xl bg-[#3b2619]/[0.06] px-5 py-5 sm:px-6">
                <p className="text-[16px] leading-relaxed">
                  <span className="font-bold italic">Tái bút:</span> Nếu hũ mật ong, chai nước mắm ấy là của anh/chị —
                  hay anh/chị đang có một bài toán phát triển chưa có lời giải — hãy hồi âm cho chúng tôi. Chỉ mất 3
                  phút. Chúng tôi sẽ gọi lại để lắng nghe trước khi đề xuất bất cứ điều gì.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 font-sans">
                  <Link
                    href="#dang-ky"
                    className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full bg-[#3b2619] px-6 text-[15px] font-semibold text-[#fbf3e6] transition-colors hover:bg-[#5a3825] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b86a3c]"
                  >
                    Hồi âm lá thư này
                    <ArrowDown size={16} aria-hidden />
                  </Link>
                  <a
                    href={site.contact.zalo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex cursor-pointer items-center gap-1.5 text-[15px] font-semibold text-[#8a4a24] underline-offset-4 hover:underline"
                  >
                    <MessageCircle size={16} aria-hidden />
                    Nhắn Zalo {site.contact.phoneDisplay}
                  </a>
                </div>
              </div>

              <Sprig className="pointer-events-none absolute right-6 top-8 hidden h-28 w-20 rotate-12 text-[#c08b5c]/60 sm:block" />
            </article>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Cành lá nét mảnh ở góc thư */
function Sprig({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 120" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" aria-hidden className={className}>
      <path d="M14 116 C 30 90, 44 60, 66 6" />
      {[
        [24, 96, -1],
        [31, 82, 1],
        [38, 66, -1],
        [45, 52, 1],
        [52, 38, -1],
        [59, 24, 1],
      ].map(([x, y, s], i) => (
        <path
          key={i}
          d={`M${x} ${y} q ${s === 1 ? 14 : -14} -4 ${s === 1 ? 18 : -16} -16 q ${s === 1 ? -12 : 10} 0 ${s === 1 ? -18 : 16} 16 z`}
        />
      ))}
    </svg>
  );
}
