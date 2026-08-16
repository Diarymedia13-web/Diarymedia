/**
 * Lớp "khí quyển" chuyển động phía sau toàn bộ trang: bốn quầng sáng lớn trôi
 * theo quỹ đạo riêng + một lớp hạt bụi sáng bay lên chậm.
 *
 * Nằm ở `z-index: -1`, `pointer-events: none` nên không bao giờ che hay chặn
 * thao tác trên nội dung. Chỉ animate `transform`/`opacity` (chạy trên GPU),
 * không đụng tới layout. Tất cả chuyển động tắt theo `prefers-reduced-motion`
 * — xem cuối `globals.css`.
 *
 * Vị trí/kích thước hạt sinh từ một mảng cố định (không random) để bản HTML
 * dựng sẵn trên máy chủ khớp y hệt bản trình duyệt vẽ lại — random sẽ gây lỗi
 * hydration mismatch của React.
 */

const MOTES = [
  { left: "6%", size: 3, duration: 26, delay: 0 },
  { left: "14%", size: 2, duration: 34, delay: -6 },
  { left: "23%", size: 4, duration: 29, delay: -14 },
  { left: "31%", size: 2, duration: 38, delay: -3 },
  { left: "39%", size: 3, duration: 31, delay: -20 },
  { left: "47%", size: 2, duration: 36, delay: -9 },
  { left: "55%", size: 4, duration: 27, delay: -17 },
  { left: "63%", size: 2, duration: 33, delay: -1 },
  { left: "71%", size: 3, duration: 40, delay: -23 },
  { left: "79%", size: 2, duration: 28, delay: -11 },
  { left: "87%", size: 3, duration: 35, delay: -5 },
  { left: "94%", size: 2, duration: 30, delay: -18 },
];

export default function AmbientBackground() {
  return (
    <div className="ambient-layer" aria-hidden>
      <span className="ambient-orb ambient-orb-1" />
      <span className="ambient-orb ambient-orb-2" />
      <span className="ambient-orb ambient-orb-3" />
      <span className="ambient-orb ambient-orb-4" />

      {MOTES.map((m) => (
        <span
          key={m.left}
          className="ambient-mote"
          style={{
            left: m.left,
            bottom: 0,
            width: `${m.size}px`,
            height: `${m.size}px`,
            animationDuration: `${m.duration}s`,
            animationDelay: `${m.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
