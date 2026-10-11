import Image from "next/image";
import { cx } from "./ui";

/**
 * Tường ảnh hậu trường làm nền hero trang Liên hệ: các cột ảnh trôi chậm,
 * cột chẵn đi lên, cột lẻ đi xuống, cả mảng nghiêng nhẹ. Mỗi cột chứa danh
 * sách ảnh lặp 2 lần và dịch đúng -50% nên vòng lặp liền mạch — vì thế
 * khoảng cách giữa các ô phải là padding (mỗi ô tự mang) chứ không dùng gap.
 */
const w = (n: number) => `/images/wall/wall-${String(n).padStart(2, "0")}.webp`;
const b = (n: number) => `/images/bts/bts-${n}.webp`;

/** Trang Liên hệ: trộn hậu trường với thành phẩm của khách hàng. */
export const contactWall = [
  [1, 14, 19, 7],
  [9, 2, 16, 21],
  [11, 5, 20, 13],
  [6, 15, 3, 22],
  [12, 17, 8, 18],
  [4, 10, 1, 16],
].map((col) => col.map(w));

/** Trang Về chúng tôi: chỉ ekip đang làm việc — kể về con người, không về sản phẩm. */
export const teamWall = [
  [b(11), w(1), b(17), w(6)],
  [b(14), b(21), w(2), b(19)],
  [w(7), b(12), b(16), w(4)],
  [b(13), w(3), b(20), b(23)],
  [b(15), b(18), w(9), b(22)],
  [w(1), b(14), b(11), w(7)],
];

// Điện thoại 3 cột, máy tính bảng 4, desktop đủ 6.
const visibility = ["flex", "flex", "flex", "hidden sm:flex", "hidden lg:flex", "hidden lg:flex"];

export default function ProductionWall({ columns = contactWall }: { columns?: string[][] }) {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className="absolute -inset-x-[4%] -inset-y-[40%] grid rotate-[-7deg] grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {columns.map((col, i) => (
          <div
            key={i}
            className={cx("wall-col flex-col", visibility[i], i % 2 === 1 && "wall-col-down")}
            style={{ animationDuration: `${56 + i * 9}s` }}
          >
            {[...col, ...col].map((src, j) => (
              <div key={`${src}-${j}`} className="pb-3">
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  <Image src={src} alt="" fill sizes="(max-width: 640px) 34vw, (max-width: 1024px) 26vw, 18vw" className="object-cover" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Phủ tối từ dưới lên và từ trái sang để tiêu đề đặt góc dưới-trái luôn đọc được */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/35" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/30 to-transparent" />
    </div>
  );
}
