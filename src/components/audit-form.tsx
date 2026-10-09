"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, AlertCircle, Loader2 } from "lucide-react";
import { site } from "@/lib/site";

/**
 * Form thu lead cho landing page chiến dịch /audit.
 *
 * Dùng lại đúng cơ chế gửi của form Liên hệ (Web3Forms — site xuất tĩnh nên
 * không có backend nhận form). Khác biệt so với form Liên hệ:
 *  - Bộ câu hỏi rút gọn, bám sát ICP "Digital Growth Audit" (ngành hàng, vấn
 *    đề lớn nhất) thay vì hạng mục dịch vụ — cố tình không hỏi quy mô doanh
 *    nghiệp để giữ form ngắn cho traffic quảng cáo.
 *  - Chụp UTM + referrer ngay lúc trang tải xong (không chờ tới lúc submit)
 *    rồi lưu tạm vào sessionStorage — khách cuộn xem lâu, thậm chí bấm mục
 *    neo trong trang trước khi điền form, UTM vẫn không bị mất.
 *  - Bắn sự kiện cho GA4/Meta Pixel/GTM NẾU các script đó đã được nạp qua
 *    `AuditAnalytics` (xem component cùng thư mục) — không tự bắn nếu chưa
 *    cấu hình, tránh lỗi tham chiếu biến không tồn tại.
 */

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";
const ATTRIBUTION_KEY = "day_audit_attribution";

const painPoints = [
  "Xây thương hiệu",
  "Content",
  "Quảng cáo",
  "Bán hàng online",
  "Website",
  "Sàn TMĐT",
  "CRM",
  "AI",
  "Chưa xác định",
];

type Status = "idle" | "sending" | "error";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    oaiq?: (...args: unknown[]) => void;
  }
}

function captureAttribution() {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") ?? "",
    utm_medium: params.get("utm_medium") ?? "",
    utm_campaign: params.get("utm_campaign") ?? "",
    utm_content: params.get("utm_content") ?? "",
    utm_term: params.get("utm_term") ?? "",
    landing_page: window.location.pathname,
    referrer: document.referrer || "",
    timestamp: new Date().toISOString(),
  };
}

export default function AuditForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const attributionRef = useRef<Record<string, string> | null>(null);

  // Chụp UTM ngay khi trang tải xong — lúc URL quảng cáo vừa dẫn khách vào,
  // trước khi khách kịp cuộn qua các mục neo trong trang (không đổi UTM
  // nhưng phòng trường hợp trình duyệt/tiện ích nào đó dọn query string).
  useEffect(() => {
    const attribution = captureAttribution();
    attributionRef.current = attribution;
    try {
      sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
    } catch {
      // Riêng tư trình duyệt chặn sessionStorage — vẫn còn attributionRef
      // trong bộ nhớ của lượt tải trang này nên form vẫn gửi được UTM.
    }
  }, []);

  function readAttribution() {
    try {
      const raw = sessionStorage.getItem(ATTRIBUTION_KEY);
      if (raw) return JSON.parse(raw) as Record<string, string>;
    } catch {
      // Bỏ qua, dùng dữ liệu chụp lúc mount hoặc chụp lại ngay bên dưới.
    }
    return attributionRef.current ?? captureAttribution();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const attribution = readAttribution();

    if (!ACCESS_KEY) {
      setStatus("error");
      setMessage(
        `Form chưa được kết nối. Vui lòng gửi email tới ${site.contact.email} hoặc gọi ${site.contact.phoneDisplay} để đăng ký audit.`,
      );
      return;
    }

    setStatus("sending");
    setMessage("");

    const companyName = String(data.get("Tên doanh nghiệp") ?? "").trim() || "(chưa rõ tên)";
    // Ghép nguồn quảng cáo thành 1 dòng đọc hiểu ngay, không bắt người nhận
    // mail phải tự suy ra từ utm_source/utm_campaign rời rạc.
    const sourceSummary = attribution.utm_source
      ? `${attribution.utm_source}${attribution.utm_medium ? ` (${attribution.utm_medium})` : ""}${attribution.utm_campaign ? ` — chiến dịch ${attribution.utm_campaign}` : ""}`
      : "Không có UTM — khách vào thẳng trang, không qua link quảng cáo";

    data.append("access_key", ACCESS_KEY);
    data.append("subject", `[DIARY AUDIT] Lead mới – ${companyName}`);
    data.append("from_name", `Chiến dịch Audit — ${site.name}`);
    data.append("Nguồn lead", sourceSummary);
    Object.entries(attribution).forEach(([key, value]) => data.append(key, value));

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const json = await res.json();

      if (!json.success) throw new Error(json.message || "Gửi không thành công");

      // Chỉ gọi nếu script tương ứng đã được nạp qua AuditAnalytics — an
      // toàn khi sếp chưa gắn GA4/Meta Pixel, không throw lỗi ra console.
      window.gtag?.("event", "generate_lead", {
        event_category: "audit_form",
        ...attribution,
      });
      window.fbq?.("track", "Lead");
      window.dataLayer?.push({ event: "audit_lead_submit", ...attribution });
      // OpenAI Ads — sự kiện chuẩn "lead_created" (category customer_action,
      // tra trực tiếp trong SDK oaiq.min.js, không đoán). Field "type" bên
      // trong PHẢI đúng bằng tên category ("customer_action"), không phải
      // tên event — đây là quy ước của chính SDK, không phải lỗi gõ nhầm.
      window.oaiq?.("measure", "lead_created", { type: "customer_action" });

      form.reset();
      router.push("/thank-you/");
    } catch {
      // Cố tình không hiện lỗi kỹ thuật/API gốc — người dùng chỉ cần biết
      // hướng xử lý tiếp theo. Dữ liệu form không bị xoá (không gọi
      // form.reset() ở nhánh này) nên không phải nhập lại từ đầu.
      setStatus("error");
      setMessage(
        `Chưa thể gửi yêu cầu. Vui lòng thử lại hoặc liên hệ Diary Media qua Zalo ${site.contact.phoneDisplay}.`,
      );
    }
  }

  const field =
    "w-full rounded-xl border border-line bg-ink px-4 py-3.5 text-[15px] text-fg placeholder:text-fg-dim transition-colors duration-200 hover:border-white/20 focus:border-brand focus:outline-none";
  const labelCls = "mb-2 block text-sm font-medium text-fg";

  return (
    <form onSubmit={handleSubmit} className="rounded-block border border-line bg-ink-2 p-6 sm:p-9">
      {/* Bẫy bot: người dùng thật không bao giờ điền vào ô này */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="af-name" className={labelCls}>
            Họ và tên <span className="text-brand">*</span>
          </label>
          <input
            id="af-name"
            name="Họ và tên"
            required
            autoComplete="name"
            placeholder="Nguyễn Văn A"
            className={field}
          />
        </div>

        <div>
          <label htmlFor="af-company" className={labelCls}>
            Tên doanh nghiệp <span className="text-brand">*</span>
          </label>
          <input
            id="af-company"
            name="Tên doanh nghiệp"
            required
            autoComplete="organization"
            placeholder="Tên công ty / thương hiệu"
            className={field}
          />
        </div>

        <div>
          <label htmlFor="af-phone" className={labelCls}>
            Số điện thoại <span className="text-brand">*</span>
          </label>
          <input
            id="af-phone"
            name="Số điện thoại"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            placeholder="09xx xxx xxx"
            className={field}
          />
        </div>

        <div>
          <label htmlFor="af-email" className={labelCls}>
            Email <span className="text-brand">*</span>
          </label>
          <input
            id="af-email"
            name="Email"
            type="email"
            required
            autoComplete="email"
            placeholder="ban@congty.com"
            className={field}
          />
        </div>

        <div>
          <label htmlFor="af-web" className={labelCls}>
            Website / Fanpage
          </label>
          <input
            id="af-web"
            name="Website / Facebook"
            placeholder="facebook.com/thuonghieu"
            className={field}
          />
        </div>

        <div>
          <label htmlFor="af-nganh" className={labelCls}>
            Ngành hàng
          </label>
          <input
            id="af-nganh"
            name="Ngành hàng"
            placeholder="VD: nông sản, thực phẩm, sản xuất…"
            className={field}
          />
        </div>
      </div>

      <fieldset className="mt-7">
        <legend className={labelCls}>Vấn đề lớn nhất hiện tại</legend>
        <p className="mb-3 text-sm text-fg-dim">Chọn một hoặc nhiều mục.</p>
        <div className="flex flex-wrap gap-2">
          {painPoints.map((item) => (
            <label
              key={item}
              className="group cursor-pointer rounded-full border border-line px-4 py-2 text-sm text-fg-muted transition-colors duration-200 hover:border-brand/50 hover:text-fg has-[:checked]:border-brand has-[:checked]:bg-brand/12 has-[:checked]:text-brand-light"
            >
              <input type="checkbox" name="Vấn đề lớn nhất" value={item} className="sr-only" />
              {item}
            </label>
          ))}
        </div>
      </fieldset>

      {status === "error" && (
        <p
          role="alert"
          className="mt-6 flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/[0.08] px-4 py-3 text-sm text-red-300"
        >
          <AlertCircle size={17} className="mt-0.5 shrink-0" aria-hidden />
          {message}
        </p>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-brand py-1.5 pl-6 pr-1.5 text-sm font-semibold text-brand-ink transition-all duration-300 hover:bg-brand-light disabled:cursor-wait disabled:opacity-70"
        >
          {status === "sending" ? "Đang gửi…" : "Gửi yêu cầu Audit"}
          <span className="flex size-9 items-center justify-center rounded-full bg-brand-ink/85 text-brand-light transition-transform duration-300 group-hover:rotate-45">
            {status === "sending" ? (
              <Loader2 size={17} className="animate-spin" aria-hidden />
            ) : (
              <ArrowUpRight size={17} strokeWidth={2.4} aria-hidden />
            )}
          </span>
        </button>

        <p className="text-sm text-fg-dim">
          Hoặc nhắn Zalo{" "}
          <a
            href={site.contact.zalo}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer font-semibold text-brand underline-offset-4 hover:underline"
          >
            {site.contact.phoneDisplay}
          </a>
        </p>
      </div>
    </form>
  );
}
