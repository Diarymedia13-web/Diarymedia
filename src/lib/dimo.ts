/**
 * DIMO — official Diary Media mascot. Single source of truth for the floating
 * assistant: artwork, dialogue, service routing and per-page hints.
 *
 * - Turn DIMO off site-wide: set `enabled: false` (the classic floating
 *   Zalo/Messenger/Call button comes back automatically).
 * - Change artwork: replace files in /public/images/dimo/ (transparent WebP)
 *   or point `artwork` to new files. Animated WebP works as a drop-in; a
 *   Lottie/Rive renderer can later replace <DimoFigure> without touching the
 *   panel logic (see `DimoArtwork` below).
 * - Change dialogue: edit `copy` / `pageHints` (visitor-facing text = Vietnamese).
 */

export type DimoPose = "wave" | "cheer" | "heart" | "laptop";

/** Phase 3 hook: today only static images; `kind` leaves room for lottie/rive. */
export interface DimoArtwork {
  kind: "image";
  src: string;
  width: number;
  height: number;
}

export interface DimoService {
  id: string;
  label: string;
  /** Existing destination on the site — never an invented URL. */
  href: string;
}

export const dimoConfig = {
  enabled: true,
  /** Delay before DIMO greets a visitor (ms). */
  appearDelayMs: 3000,
  /** Routes where DIMO stays hidden (campaign funnels with a single CTA). */
  hiddenOn: ["/audit", "/thank-you"],

  artwork: {
    wave: { kind: "image", src: "/images/dimo/dimo-wave.webp", width: 405, height: 420 },
    cheer: { kind: "image", src: "/images/dimo/dimo-cheer.webp", width: 305, height: 300 },
    heart: { kind: "image", src: "/images/dimo/dimo-heart.webp", width: 275, height: 300 },
    laptop: { kind: "image", src: "/images/dimo/dimo-laptop.webp", width: 293, height: 300 },
  } satisfies Record<DimoPose, DimoArtwork>,

  copy: {
    greeting: "Xin chào! Mình là DIMO, người bạn nhỏ của Diary Media!",
    question: "Bạn muốn kể câu chuyện thương hiệu hay tìm giải pháp giúp doanh nghiệp phát triển?",
    panelTitle: "DIMO – Người bạn đồng hành của doanh nghiệp",
    panelMessage: "Diary Media có thể giúp gì cho bạn hôm nay?",
    quickContactLabel: "Hoặc trò chuyện trực tiếp",
    celebrate: "Yay! Diary Media đã nhận được yêu cầu của bạn rồi nè!",
    openLabel: "Mở trợ lý DIMO",
    closeLabel: "Đóng trợ lý DIMO",
  },

  /**
   * Service shortcuts. Anchors exist on /giai-phap/ (each ServiceCard has
   * id={slug}); the expert option jumps straight to the contact form.
   */
  services: [
    { id: "production", label: "Sản xuất phim & câu chuyện thương hiệu", href: "/giai-phap/#san-xuat-sang-tao" },
    { id: "marketing", label: "Truyền thông & quảng cáo", href: "/giai-phap/#quang-cao-da-nen-tang" },
    { id: "website", label: "Website & chuyển đổi số", href: "/giai-phap/#thiet-ke-website" },
    { id: "ai", label: "Giải pháp AI doanh nghiệp", href: "/giai-phap/#ai-cho-doanh-nghiep" },
    {
      id: "expert",
      label: "Kết nối chuyên gia Diary Media",
      href: "/lien-he/#form-lien-he",
    },
  ] satisfies DimoService[],

  /** Gentle line shown inside the panel depending on the page — never as a popup. */
  pageHints: [
    { match: "/lien-he", text: "DIMO có thể giúp bạn bắt đầu kết nối với Diary Media!" },
    { match: "/du-an", text: "Mỗi doanh nghiệp đều có một câu chuyện đáng được kể." },
    { match: "/giai-phap", text: "Bạn muốn thương hiệu tiếp cận đúng khách hàng?" },
    { match: "/he-sinh-thai", text: "Có sản phẩm tốt? Cùng đưa nó đến đúng người cần nhé!" },
    { match: "/", text: "Khám phá giải pháp phù hợp với doanh nghiệp bạn nhé!" },
  ],
  /** Shown when the AI service is focused (kept for when an AI page exists). */
  aiHint: "Khám phá cách AI giúp doanh nghiệp làm việc hiệu quả hơn!",
};

export const pageHintFor = (pathname: string) =>
  dimoConfig.pageHints.find((h) => (h.match === "/" ? pathname === "/" : pathname.startsWith(h.match)))?.text ??
  dimoConfig.pageHints[dimoConfig.pageHints.length - 1].text;

/* --------------------------------------------------------------------------
   Analytics — only uses tags that are already configured on the page
   (gtag / dataLayer). Sends event names only, never personal data.
   -------------------------------------------------------------------------- */
export type DimoEvent = "dimo_open" | "dimo_service_select" | "dimo_contact_click" | "dimo_dismiss";

export function trackDimo(event: DimoEvent, params: Record<string, string> = {}) {
  try {
    window.gtag?.("event", event, params);
    window.dataLayer?.push({ event, ...params });
  } catch {
    // Analytics must never break the mascot.
  }
}

/** Fire after a VERIFIED successful form submission to let DIMO celebrate. */
export const DIMO_CELEBRATE_EVENT = "dimo:celebrate";
export function celebrateWithDimo() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(DIMO_CELEBRATE_EVENT));
}

/* --------------------------------------------------------------------------
   Phase 2 boundary (NOT active). A future AI brain plugs in here — e.g. a
   server route that answers questions from a service knowledge base, books
   consultations, or writes to a CRM. Keep API keys server-side only.
   -------------------------------------------------------------------------- */
export interface DimoBrain {
  reply(message: string, context: { pathname: string }): Promise<{ text: string; suggestions?: DimoService[] }>;
}
export const dimoBrain: DimoBrain | null = null;
