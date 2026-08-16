/*
 * Chế độ xuất HTML tĩnh BẬT THEO MẶC ĐỊNH — giữ nguyên hành vi cũ của dự án.
 *
 * Lý do phải làm thành điều kiện: `output: "export"` không cho phép tồn tại
 * route handler động, nên `/api/agent` (Diary Business Agent) sẽ hỏng — hỏng
 * cả ở `next dev` chứ không riêng lúc build.
 *
 *   npm run build            → vẫn xuất tĩnh ra out/, đường deploy Hostinger
 *                              KHÔNG đổi một chút nào.
 *   AGENT_DEV=1 npm run dev  → tắt xuất tĩnh, /api/agent chạy được.
 *
 * Chỉ đặt AGENT_DEV=1 khi chạy máy local. Tuyệt đối không đặt biến này trong
 * môi trường build deploy, nếu không `out/` sẽ không được sinh ra.
 */
const staticExport = process.env.AGENT_DEV !== "1";

/*
 * Chỉ riêng việc tắt `output` là chưa đủ: file route vẫn nằm trong app/ nên
 * bản build tĩnh vẫn cố dựng nó và vẫn hỏng. Nên API của agent được đặt tên
 * `route.agent.ts`, và đuôi `agent.ts` chỉ được khai báo là đuôi hợp lệ khi
 * AGENT_DEV=1.
 *
 * Build tĩnh → Next không nhận ra `route.agent.ts` là route, coi như file
 * thường nằm cạnh (App Router cho phép), bỏ qua hoàn toàn → build sạch.
 *
 * Trang `/agent` (`page.agent.tsx`) dùng đúng cơ chế đó. Đây là công cụ nội
 * bộ: nếu để nó lọt vào bản tĩnh thì website công khai sẽ có một trang chat
 * bấm vào là lỗi, vì bản tĩnh không có `/api/agent`. Loại hẳn sạch hơn.
 */
const pageExtensions = staticExport
  ? ["tsx", "ts", "jsx", "js"]
  : ["agent.ts", "agent.tsx", "tsx", "ts", "jsx", "js"];

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions,
  // Xuất ra HTML tĩnh trong thư mục `out/` để upload thẳng lên Hostinger Shared Hosting.
  ...(staticExport ? { output: "export" } : {}),
  // Sinh ra /giai-phap/index.html thay vì /giai-phap.html — Apache của Hostinger phục vụ đúng URL sạch.
  trailingSlash: true,
  // Shared hosting không có Node runtime nên Image Optimization của Next không chạy được.
  images: { unoptimized: true },
  productionBrowserSourceMaps: false,
};

export default nextConfig;
