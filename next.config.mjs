/** @type {import('next').NextConfig} */
const nextConfig = {
  // Xuất ra HTML tĩnh trong thư mục `out/` để upload thẳng lên Hostinger Shared Hosting.
  output: "export",
  // Sinh ra /giai-phap/index.html thay vì /giai-phap.html — Apache của Hostinger phục vụ đúng URL sạch.
  trailingSlash: true,
  // Shared hosting không có Node runtime nên Image Optimization của Next không chạy được.
  images: { unoptimized: true },
  productionBrowserSourceMaps: false,
};

export default nextConfig;
