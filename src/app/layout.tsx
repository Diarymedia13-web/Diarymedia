import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Inter, JetBrains_Mono } from "next/font/google";
import { site } from "@/lib/site";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import FloatingCta from "@/components/floating-cta";
import ChatWidget from "@/components/chat-widget";
import MotionProvider from "@/components/motion-provider";
import AmbientBackground from "@/components/ambient-background";
import "./globals.css";

/* Cả ba font đều nạp subset `vietnamese` để dấu tiếng Việt hiển thị đúng,
   không bị rơi về font hệ thống ở các chữ có dấu. */
const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["600", "700", "800"],
  variable: "--font-be-vietnam",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const isDemo = process.env.NEXT_PUBLIC_DEMO === "1";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Giải pháp truyền thông toàn diện cho doanh nghiệp`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "giải pháp truyền thông",
    "agency truyền thông",
    "chiến lược truyền thông",
    "sản xuất TVC",
    "quay phim sự kiện Đà Nẵng",
    "thiết kế website doanh nghiệp",
    "chạy quảng cáo",
    "AI cho doanh nghiệp",
    "Day Agency",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Giải pháp truyền thông toàn diện cho doanh nghiệp`,
    description: site.description,
    images: [{ url: "/images/bts-02.webp", width: 1600, height: 1066, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Giải pháp truyền thông toàn diện`,
    description: site.description,
    images: ["/images/bts-02.webp"],
  },
  // Bản demo (build với NEXT_PUBLIC_DEMO=1) bị chặn lập chỉ mục, tránh Google
  // coi link demo là bản sao trùng nội dung với tên miền chính sau này.
  robots: isDemo ? { index: false, follow: false } : { index: true, follow: true },
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/images/brand/logo-mark.png", type: "image/png" }],
    apple: [{ url: "/images/brand/logo-mark.png" }],
  },
};

export const viewport: Viewport = {
  // Mảng theo prefers-color-scheme là màu mặc định cho tới khi JS chạy xong
  // và ThemeToggle đồng bộ lại theo lựa chọn thủ công của người dùng.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0e6d3" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1710" },
  ],
  width: "device-width",
  initialScale: 1,
  // Không đặt maximumScale — người dùng phải luôn phóng to được trang.
};

/**
 * Script chống-nháy theme: chạy đồng bộ trước khi trình duyệt vẽ khung hình
 * đầu tiên, nên phải là inline + không async/defer/module. Đọc lựa chọn đã
 * lưu; nếu chưa từng chọn thì theo prefers-color-scheme của hệ điều hành.
 * Không có JS (hoặc bị chặn) → không có data-theme → CSS mặc định về bản kem sáng.
 */
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("day-theme");
    var theme = stored === "light" || stored === "dark"
      ? stored
      : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
})();
`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: site.contact.phoneIntl,
  email: site.contact.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Đà Nẵng",
    addressCountry: "VN",
  },
  sameAs: [site.contact.facebook],
  founder: {
    "@type": "Person",
    name: site.founder.name,
    jobTitle: site.founder.role,
  },
  areaServed: "VN",
  priceRange: "$$",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${beVietnam.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-brand-ink"
        >
          Bỏ qua điều hướng, tới nội dung chính
        </a>
        <AmbientBackground />
        <MotionProvider />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <FloatingCta />
        <ChatWidget />
      </body>
    </html>
  );
}
