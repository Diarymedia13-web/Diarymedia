"use client";

import { useState } from "react";
import { ArrowUpRight, Check, AlertCircle, Loader2 } from "lucide-react";
import { site } from "@/lib/site";
import { cx } from "./ui";

/**
 * Form yêu cầu báo giá.
 *
 * Hostinger Shared Hosting không chạy được backend Node, nên form gửi thẳng
 * tới Web3Forms — dịch vụ miễn phí chuyển nội dung form về email.
 * Lấy access key tại https://web3forms.com rồi đặt vào biến môi trường
 * NEXT_PUBLIC_WEB3FORMS_KEY (xem file .env.example).
 */

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

const budgets = [
  "Dưới 20 triệu",
  "20 – 50 triệu",
  "50 – 150 triệu",
  "Trên 150 triệu",
  "Chưa xác định",
];

const interests = [
  "Chiến lược truyền thông",
  "Chiến lược kinh doanh",
  "Thúc đẩy chuyển đổi số",
  "Thiết kế website",
  "Chạy quảng cáo",
  "Trí tuệ nhân tạo cho doanh nghiệp",
  "TVC & phim doanh nghiệp",
  "Video ngắn / Reels / TikTok",
  "Quay chụp sự kiện & livestream",
  "Chụp ảnh sản phẩm",
];

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Chưa cấu hình key → hướng dẫn khách gửi email thay vì báo lỗi mơ hồ.
    if (!ACCESS_KEY) {
      setStatus("error");
      setMessage(
        `Form chưa được kết nối. Vui lòng gửi email tới ${site.contact.email} hoặc gọi ${site.contact.phoneDisplay} — chúng tôi phản hồi trong ngày làm việc.`,
      );
      return;
    }

    setStatus("sending");
    setMessage("");

    data.append("access_key", ACCESS_KEY);
    data.append("subject", `[${site.name}] Yêu cầu tư vấn mới từ website`);
    data.append("from_name", `Website ${site.name}`);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const json = await res.json();

      if (json.success) {
        setStatus("success");
        setMessage(
          "Đã nhận được yêu cầu của bạn. Đội ngũ Diary Agency sẽ liên hệ trong vòng 24 giờ làm việc.",
        );
        form.reset();
      } else {
        throw new Error(json.message || "Gửi không thành công");
      }
    } catch {
      setStatus("error");
      setMessage(
        `Không gửi được yêu cầu. Vui lòng thử lại hoặc liên hệ trực tiếp ${site.contact.phoneDisplay}.`,
      );
    }
  }

  const field =
    "w-full rounded-xl border border-line bg-ink px-4 py-3.5 text-[15px] text-fg placeholder:text-fg-dim transition-colors duration-200 hover:border-white/20 focus:border-brand focus:outline-none";
  const labelCls = "mb-2 block text-sm font-medium text-fg";

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-5 rounded-block border border-brand/30 bg-brand/[0.06] p-8 sm:p-10">
        <span className="flex size-12 items-center justify-center rounded-full bg-brand text-brand-ink">
          <Check size={24} strokeWidth={2.6} aria-hidden />
        </span>
        <div>
          <h3 className="t-h3">Cảm ơn bạn đã liên hệ</h3>
          <p className="mt-3 max-w-md text-[15px] text-fg-muted">{message}</p>
        </div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="cursor-pointer text-sm font-semibold text-brand underline-offset-4 hover:underline"
        >
          Gửi thêm một yêu cầu khác
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-block border border-line bg-ink-2 p-6 sm:p-9">
      {/* Bẫy bot: người dùng thật không bao giờ điền vào ô này */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelCls}>
            Họ và tên <span className="text-brand">*</span>
          </label>
          <input
            id="cf-name"
            name="Họ và tên"
            required
            autoComplete="name"
            placeholder="Nguyễn Văn A"
            className={field}
          />
        </div>

        <div>
          <label htmlFor="cf-company" className={labelCls}>
            Doanh nghiệp
          </label>
          <input
            id="cf-company"
            name="Doanh nghiệp"
            autoComplete="organization"
            placeholder="Tên công ty / thương hiệu"
            className={field}
          />
        </div>

        <div>
          <label htmlFor="cf-phone" className={labelCls}>
            Số điện thoại <span className="text-brand">*</span>
          </label>
          <input
            id="cf-phone"
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
          <label htmlFor="cf-email" className={labelCls}>
            Email <span className="text-brand">*</span>
          </label>
          <input
            id="cf-email"
            name="Email"
            type="email"
            required
            autoComplete="email"
            placeholder="ban@congty.com"
            className={field}
          />
        </div>
      </div>

      <fieldset className="mt-7">
        <legend className={labelCls}>Bạn đang quan tâm hạng mục nào?</legend>
        <p className="mb-3 text-sm text-fg-dim">Chọn một hoặc nhiều hạng mục.</p>
        <div className="flex flex-wrap gap-2">
          {interests.map((item) => (
            <label
              key={item}
              className="group cursor-pointer rounded-full border border-line px-4 py-2 text-sm text-fg-muted transition-colors duration-200 hover:border-brand/50 hover:text-fg has-[:checked]:border-brand has-[:checked]:bg-brand/12 has-[:checked]:text-brand-light"
            >
              <input type="checkbox" name="Hạng mục quan tâm" value={item} className="sr-only" />
              {item}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-budget" className={labelCls}>
            Ngân sách dự kiến
          </label>
          <select id="cf-budget" name="Ngân sách dự kiến" defaultValue="" className={cx(field, "cursor-pointer")}>
            <option value="" disabled>
              Chọn khoảng ngân sách
            </option>
            {budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="cf-deadline" className={labelCls}>
            Thời điểm cần triển khai
          </label>
          <input
            id="cf-deadline"
            name="Thời điểm triển khai"
            placeholder="VD: đầu tháng sau, gấp trong tuần…"
            className={field}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="cf-message" className={labelCls}>
          Mô tả ngắn về nhu cầu
        </label>
        <textarea
          id="cf-message"
          name="Nội dung"
          rows={5}
          placeholder="Sản phẩm/dịch vụ của bạn, mục tiêu muốn đạt được, kênh đang chạy…"
          className={cx(field, "resize-y")}
        />
        <p className="mt-2 text-sm text-fg-dim">
          Càng cụ thể, đề xuất chúng tôi gửi lại càng sát với bài toán của bạn.
        </p>
      </div>

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
          {status === "sending" ? "Đang gửi…" : "Gửi yêu cầu tư vấn"}
          <span className="flex size-9 items-center justify-center rounded-full bg-brand-ink/85 text-brand-light transition-transform duration-300 group-hover:rotate-45">
            {status === "sending" ? (
              <Loader2 size={17} className="animate-spin" aria-hidden />
            ) : (
              <ArrowUpRight size={17} strokeWidth={2.4} aria-hidden />
            )}
          </span>
        </button>

        <p className="text-sm text-fg-dim">
          Hoặc gọi thẳng{" "}
          <a
            href={`tel:${site.contact.phoneIntl}`}
            className="cursor-pointer font-semibold text-brand underline-offset-4 hover:underline"
          >
            {site.contact.phoneDisplay}
          </a>
        </p>
      </div>
    </form>
  );
}
