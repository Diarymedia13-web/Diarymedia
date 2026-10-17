"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { site } from "@/lib/site";
import { sendLeadToReach } from "@/lib/reach";
import {
  budgetTiers,
  giftCategories,
  isLeadType,
  leadTypes,
  productGroups,
  type LeadTypeId,
} from "@/lib/he-sinh-thai";
import { cx } from "../ui";

/**
 * Form đăng ký hợp tác Hệ Sinh Thái DIARY (/he-sinh-thai/#dang-ky).
 *
 * Nơi nhận: Web3Forms, cùng hộp thư với form Liên hệ và /audit (site xuất tĩnh
 * nên không có backend riêng). Web3Forms kiểm tra access key, lọc spam phía
 * máy chủ rồi chuyển lead về email. Form chỉ báo "đã gửi" khi Web3Forms trả
 * về success — thiếu key hay lỗi mạng đều hiện lỗi thật, không giả thành công.
 *
 * Chống spam phía trình duyệt: ô bẫy bot, chặn gửi trong 4 giây đầu sau khi
 * mở trang, giãn cách 60 giây giữa hai lần gửi và tối đa 5 lần/24 giờ.
 * Không ghi bất kỳ thông tin cá nhân nào ra console.
 */

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";
const RATE_KEY = "ecosystem_lead_log";
const COOLDOWN_MS = 60_000;
const DAILY_MAX = 5;
const MIN_FILL_MS = 4_000;

type FieldKind = "text" | "number" | "date" | "select" | "checkboxes" | "textarea";

interface FieldDef {
  name: string;
  kind: FieldKind;
  required?: boolean;
  placeholder?: string;
  options?: readonly string[];
  /** Chiếm cả hàng trong lưới 2 cột */
  wide?: boolean;
}

const typeFields: Record<LeadTypeId, FieldDef[]> = {
  "nha-san-xuat": [
    { name: "Sản phẩm chính", kind: "text", required: true, placeholder: "VD: mật ong rừng, nước mắm, trà shan tuyết…" },
    { name: "Nhóm sản phẩm", kind: "select", options: productGroups },
    { name: "Địa phương sản xuất / vùng nguyên liệu", kind: "text", placeholder: "Xã, huyện, tỉnh" },
    { name: "Sản lượng ước tính mỗi tháng", kind: "text", placeholder: "VD: 500 kg, 2.000 chai…" },
    { name: "Chứng nhận đã có", kind: "checkboxes", options: ["OCOP", "VietGAP", "Hữu cơ", "HACCP / ISO", "Chưa có"], wide: true },
    { name: "Kênh bán hiện tại", kind: "checkboxes", options: ["Bán tại chỗ", "Đại lý / cửa hàng", "Facebook / Zalo", "Sàn TMĐT", "Chưa có kênh"], wide: true },
  ],
  livestream: [
    { name: "Ngành hàng", kind: "text", required: true, placeholder: "VD: thực phẩm, mỹ phẩm, thời trang…" },
    { name: "Hình thức mong muốn", kind: "select", options: ["Thuê trọn gói ekip + host", "Chỉ thuê ekip kỹ thuật", "Kết nối KOC", "Cần tư vấn"] },
    { name: "Số phiên dự kiến mỗi tháng", kind: "select", options: ["1–2 phiên", "3–5 phiên", "6–10 phiên", "Trên 10 phiên", "Chưa xác định"] },
    { name: "Thời gian muốn bắt đầu", kind: "date" },
    { name: "Nền tảng muốn live", kind: "checkboxes", options: ["TikTok Shop", "Facebook", "Shopee Live", "YouTube"], wide: true },
  ],
  "qua-tang": [
    { name: "Loại quà", kind: "select", required: true, options: giftCategories },
    { name: "Số lượng hộp", kind: "number", required: true, placeholder: "VD: 50" },
    { name: "Ngân sách mỗi hộp", kind: "select", required: true, options: [...budgetTiers.map((t) => t.label), "Cần tư vấn"] },
    { name: "Ngày cần giao", kind: "date", required: true },
    { name: "Địa điểm giao", kind: "text", placeholder: "Tỉnh / thành phố nhận hàng", wide: true },
    { name: "Yêu cầu tùy chỉnh", kind: "textarea", placeholder: "In logo, thiệp riêng, đồng thương hiệu, sản phẩm muốn có trong hộp…", wide: true },
  ],
  koc: [
    { name: "Link kênh đang sở hữu", kind: "text", required: true, placeholder: "tiktok.com/@tenkenh" },
    { name: "Nền tảng chính", kind: "select", options: ["TikTok", "Facebook", "YouTube", "Instagram", "Shopee", "Chưa có kênh"] },
    { name: "Lượng người theo dõi", kind: "select", options: ["Chưa có", "Dưới 1.000", "1.000 – 10.000", "10.000 – 100.000", "Trên 100.000"] },
    { name: "Kinh nghiệm livestream", kind: "select", options: ["Chưa từng", "Đã thử vài lần", "Live thường xuyên"] },
    { name: "Lĩnh vực nội dung", kind: "text", placeholder: "VD: ẩm thực, làm đẹp, du lịch…", wide: true },
    { name: "Mục tiêu tham gia", kind: "checkboxes", options: ["Học xây kênh", "Học livestream bán hàng", "Kết nối nhãn hàng", "Tiếp thị liên kết"], wide: true },
  ],
  "giai-phap": [
    { name: "Ngành nghề", kind: "text", required: true, placeholder: "VD: sản xuất, bán lẻ, du lịch…" },
    { name: "Quy mô nhân sự", kind: "select", options: ["Dưới 10 người", "10 – 50 người", "50 – 200 người", "Trên 200 người"] },
    { name: "Ngân sách dự kiến", kind: "select", options: ["Dưới 20 triệu", "20 – 50 triệu", "50 – 150 triệu", "Trên 150 triệu", "Cần tư vấn"], wide: true },
    {
      name: "Hạng mục quan tâm",
      kind: "checkboxes",
      options: ["Chiến lược kinh doanh", "Xây dựng thương hiệu", "Truyền thông đa nền tảng", "Website & TMĐT", "AI & chuyển đổi số", "CRM & tự động hoá", "Vận hành marketing A–Z"],
      wide: true,
    },
  ],
};

type Status = "idle" | "sending" | "success" | "error";
type Errors = Record<string, string>;

const PHONE_RE = /^(?:\+?84|0)(?:3|5|7|8|9)\d{8}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function readLog(): number[] {
  try {
    const raw = localStorage.getItem(RATE_KEY);
    const arr = raw ? (JSON.parse(raw) as number[]) : [];
    return Array.isArray(arr) ? arr.filter((t) => Date.now() - t < 86_400_000) : [];
  } catch {
    return [];
  }
}

function writeLog(log: number[]) {
  try {
    localStorage.setItem(RATE_KEY, JSON.stringify(log));
  } catch {
    // Trình duyệt chặn bộ nhớ cục bộ — bỏ qua giới hạn tần suất phía trình duyệt.
  }
}

export default function HstxLeadForm({
  initialType = "nha-san-xuat",
  lockType = false,
  heading,
}: {
  initialType?: LeadTypeId;
  /** Khoá một nhóm (trang con) — ẩn bộ chọn nhóm. */
  lockType?: boolean;
  heading?: string;
}) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const mountedAt = useRef(0);
  const [type, setType] = useState<LeadTypeId>(initialType);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [today, setToday] = useState<string>();

  useEffect(() => {
    mountedAt.current = Date.now();
    setToday(new Date().toISOString().slice(0, 10));
    // /he-sinh-thai/?nhom=qua-tang#dang-ky → chọn sẵn nhóm tương ứng
    if (!lockType) {
      const fromUrl = new URLSearchParams(window.location.search).get("nhom");
      if (isLeadType(fromUrl)) setType(fromUrl);
    }
  }, [lockType]);

  useEffect(() => {
    if (status === "success" || status === "error") statusRef.current?.focus();
  }, [status]);

  const current = leadTypes.find((t) => t.id === type)!;
  const fieldId = (name: string) => `${uid}-${name.replace(/[^\p{L}\p{N}]+/gu, "-")}`;

  function validate(data: FormData): Errors {
    const e: Errors = {};
    const get = (k: string) => String(data.get(k) ?? "").trim();

    if (get("Họ và tên").length < 2) e["Họ và tên"] = "Vui lòng nhập họ và tên.";
    const phone = get("Số điện thoại").replace(/[\s.\-()]/g, "");
    if (!phone) e["Số điện thoại"] = "Vui lòng nhập số điện thoại.";
    else if (!PHONE_RE.test(phone)) e["Số điện thoại"] = "Số điện thoại chưa đúng định dạng Việt Nam (VD: 0912 345 678).";
    const email = get("Email");
    if (email && !EMAIL_RE.test(email)) e["Email"] = "Email chưa đúng định dạng.";
    if (!get("Khu vực")) e["Khu vực"] = "Vui lòng cho biết tỉnh / thành phố.";
    if (get("Nội dung yêu cầu").length < 10) e["Nội dung yêu cầu"] = "Mô tả ngắn nhu cầu (ít nhất 10 ký tự).";
    if (!data.get("consent")) e["consent"] = "Cần đồng ý để chúng tôi liên hệ lại.";

    for (const f of typeFields[type]) {
      if (!f.required) continue;
      if (f.kind === "checkboxes" ? data.getAll(f.name).length === 0 : !get(f.name)) {
        e[f.name] = "Vui lòng điền mục này.";
      }
    }
    const qty = get("Số lượng hộp");
    if (type === "qua-tang" && qty && (!Number.isInteger(Number(qty)) || Number(qty) < 1)) {
      e["Số lượng hộp"] = "Số lượng hộp phải là số nguyên lớn hơn 0.";
    }
    const due = get("Ngày cần giao");
    if (type === "qua-tang" && due && today && due < today) e["Ngày cần giao"] = "Ngày giao phải từ hôm nay trở đi.";
    return e;
  }

  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = new FormData(form);

    // Bot điền ô ẩn hoặc gửi ngay tức thì → từ chối, không gửi đi.
    if (data.get("botcheck") || Date.now() - mountedAt.current < MIN_FILL_MS) {
      setStatus("error");
      setMessage("Không gửi được yêu cầu. Vui lòng kiểm tra lại thông tin và thử lại sau vài giây.");
      return;
    }

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("idle");
      const first = Object.keys(found)[0];
      const el = form.querySelector<HTMLElement>(
        first === "consent" ? `#${CSS.escape(fieldId("consent"))}` : `[name="${CSS.escape(first)}"]`,
      );
      el?.focus();
      return;
    }

    const log = readLog();
    const last = log[log.length - 1];
    if (last && Date.now() - last < COOLDOWN_MS) {
      const wait = Math.ceil((COOLDOWN_MS - (Date.now() - last)) / 1000);
      setStatus("error");
      setMessage(`Bạn vừa gửi một yêu cầu. Vui lòng đợi ${wait} giây trước khi gửi tiếp.`);
      return;
    }
    if (log.length >= DAILY_MAX) {
      setStatus("error");
      setMessage(`Trình duyệt này đã gửi nhiều yêu cầu trong hôm nay. Vui lòng gọi ${site.contact.phoneDisplay} để được hỗ trợ trực tiếp.`);
      return;
    }

    if (!ACCESS_KEY) {
      setStatus("error");
      setMessage(`Form chưa được kết nối nơi nhận. Vui lòng gọi ${site.contact.phoneDisplay} hoặc email ${site.contact.email}.`);
      return;
    }

    setStatus("sending");
    setMessage("");

    // Gom dữ liệu: nhóm checkbox nối thành một dòng để email dễ đọc.
    const payload: Record<string, string> = {};
    for (const key of new Set(data.keys())) {
      if (key === "botcheck" || key === "consent" || key === "lead_type_choice") continue;
      const values = data.getAll(key).map((v) => String(v).trim()).filter(Boolean);
      if (values.length) payload[key] = values.join(", ");
    }
    const params = new URLSearchParams(window.location.search);
    const who = payload["Tên doanh nghiệp"] || payload["Họ và tên"];

    Object.assign(payload, {
      access_key: ACCESS_KEY,
      subject: `[HỆ SINH THÁI DIARY] ${current.label} – ${who}`,
      from_name: "Hệ Sinh Thái DIARY",
      "Nhóm nhu cầu": current.label,
      "Đồng ý liên hệ & xử lý dữ liệu": "Có",
      project: "He Sinh Thai DIARY",
      lead_type: type,
      source_page: window.location.origin + window.location.pathname,
      created_at: new Date().toISOString(),
      utm_source: params.get("utm_source") ?? "",
      utm_medium: params.get("utm_medium") ?? "",
      utm_campaign: params.get("utm_campaign") ?? "",
      referrer: document.referrer || "",
    });

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as { success?: boolean };
      if (!res.ok || !json.success) throw new Error("submit-failed");

      writeLog([...log, Date.now()]);
      window.dataLayer?.push({ event: "ecosystem_lead_submit", lead_type: type });
      window.gtag?.("event", "generate_lead", { event_category: "ecosystem_form", lead_type: type });
      // Lead có email → đưa vào Reach để nhận chuỗi email "Hành trình chuyển đổi kép".
      await sendLeadToReach({
        email: payload["Email"],
        name: payload["Họ và tên"],
        phone: payload["Số điện thoại"],
        group: type,
        note: `Hệ Sinh Thái – ${current.label}`,
      });
      form.reset();
      setErrors({});
      setStatus("success");
      // /thank-you/ là trang chuyển đổi của Google Ads: chỉ người gửi form thật mới tới được.
      // Tải lại toàn trang (không dùng điều hướng nội bộ của Next) để thẻ Google trên /thank-you/
        // chắc chắn chạy và Google Ads ghi nhận lượt chuyển đổi.
        window.location.assign("/thank-you/");
    } catch {
      // Không hiện lỗi kỹ thuật; dữ liệu đã nhập được giữ nguyên để gửi lại.
      setStatus("error");
      setMessage(`Chưa gửi được yêu cầu. Vui lòng thử lại hoặc gọi/Zalo ${site.contact.phoneDisplay}.`);
    }
  }

  const input =
    "w-full rounded-xl border bg-ink px-4 py-3.5 text-[15px] text-fg placeholder:text-fg-dim transition-colors duration-200 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";
  const labelCls = "mb-2 block text-sm font-semibold text-fg";

  function errorText(name: string) {
    return errors[name] ? (
      <p id={`${fieldId(name)}-err`} className="mt-1.5 text-sm text-red-300">
        {errors[name]}
      </p>
    ) : null;
  }

  function textField(name: string, opts: { required?: boolean; type?: string; placeholder?: string; autoComplete?: string; inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"]; label?: string; min?: string }) {
    const id = fieldId(name);
    return (
      <div>
        <label htmlFor={id} className={labelCls}>
          {opts.label ?? name} {opts.required && <span className="text-brand">*</span>}
        </label>
        <input
          id={id}
          name={name}
          type={opts.type ?? "text"}
          placeholder={opts.placeholder}
          autoComplete={opts.autoComplete}
          inputMode={opts.inputMode}
          min={opts.min}
          aria-required={opts.required || undefined}
          aria-invalid={!!errors[name] || undefined}
          aria-describedby={errors[name] ? `${id}-err` : undefined}
          className={cx(input, errors[name] ? "border-red-400" : "border-line hover:border-brand/40")}
        />
        {errorText(name)}
      </div>
    );
  }

  function renderField(f: FieldDef) {
    const id = fieldId(f.name);
    const wrap = f.wide ? "sm:col-span-2" : undefined;
    const invalid = !!errors[f.name];
    const describedBy = invalid ? `${id}-err` : undefined;

    if (f.kind === "checkboxes") {
      return (
        <fieldset key={f.name} className={wrap} aria-describedby={describedBy}>
          <legend className={labelCls}>
            {f.name} {f.required && <span className="text-brand">*</span>}
          </legend>
          <div className="flex flex-wrap gap-2">
            {f.options!.map((o) => (
              <label
                key={o}
                className="cursor-pointer rounded-full border border-line bg-ink px-4 py-2 text-sm text-fg-muted transition-colors hover:border-brand/50 has-[:checked]:border-brand has-[:checked]:bg-brand has-[:checked]:text-brand-ink has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand/40"
              >
                <input type="checkbox" name={f.name} value={o} className="sr-only" />
                {o}
              </label>
            ))}
          </div>
          {errorText(f.name)}
        </fieldset>
      );
    }

    if (f.kind === "select") {
      return (
        <div key={f.name} className={wrap}>
          <label htmlFor={id} className={labelCls}>
            {f.name} {f.required && <span className="text-brand">*</span>}
          </label>
          <select
            id={id}
            name={f.name}
            defaultValue=""
            aria-required={f.required || undefined}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            className={cx(input, "cursor-pointer", invalid ? "border-red-400" : "border-line hover:border-brand/40")}
          >
            <option value="" disabled>
              Chọn một mục
            </option>
            {f.options!.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          {errorText(f.name)}
        </div>
      );
    }

    if (f.kind === "textarea") {
      return (
        <div key={f.name} className={wrap}>
          <label htmlFor={id} className={labelCls}>
            {f.name}
          </label>
          <textarea id={id} name={f.name} rows={3} placeholder={f.placeholder} className={cx(input, "resize-y border-line hover:border-brand/40")} />
        </div>
      );
    }

    return (
      <div key={f.name} className={wrap}>
        {textField(f.name, {
          required: f.required,
          type: f.kind,
          placeholder: f.placeholder,
          inputMode: f.kind === "number" ? "numeric" : undefined,
          min: f.kind === "number" ? "1" : f.kind === "date" ? today : undefined,
        })}
      </div>
    );
  }

  if (status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="rounded-block border border-brand/30 bg-ink p-8 text-center outline-none sm:p-12"
      >
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand/12 text-brand">
          <CheckCircle2 size={30} strokeWidth={1.8} aria-hidden />
        </span>
        <h3 className="t-h3 mt-6 text-fg">Đã gửi yêu cầu thành công</h3>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-fg-muted">
          Đội ngũ Diary Media sẽ liên hệ lại trong vòng 1–2 ngày làm việc. Cần gấp, bạn có thể gọi hoặc nhắn Zalo{" "}
          <a href={site.contact.zalo} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand underline-offset-4 hover:underline">
            {site.contact.phoneDisplay}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-7 cursor-pointer text-sm font-semibold text-brand underline-offset-4 hover:underline"
        >
          Gửi thêm một yêu cầu khác
        </button>
      </div>
    );
  }

  const kocOrPerson = type === "koc";

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="rounded-block border border-line bg-ink-2 p-6 sm:p-9"
      aria-label={heading ?? "Đăng ký hợp tác Hệ Sinh Thái DIARY"}
    >
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      {!lockType && (
        <fieldset className="mb-9">
          <legend className={labelCls}>Bạn là ai? Chọn nhóm nhu cầu</legend>
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {leadTypes.map((t) => (
              <label
                key={t.id}
                className="group cursor-pointer rounded-2xl border border-line bg-ink p-4 transition-all hover:border-brand/50 has-[:checked]:border-brand has-[:checked]:bg-brand/12 has-[:checked]:shadow-[inset_0_0_0_1px_var(--color-brand)] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand/40"
              >
                <input
                  type="radio"
                  name="lead_type_choice"
                  value={t.id}
                  checked={type === t.id}
                  onChange={() => {
                    setType(t.id);
                    setErrors({});
                  }}
                  className="sr-only"
                />
                <span className="block text-[15px] font-semibold text-fg">{t.label}</span>
                <span className="mt-1 block text-[13px] leading-snug text-fg-muted">{t.hint}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        {textField("Họ và tên", { required: true, autoComplete: "name", placeholder: "Nguyễn Văn A" })}
        {textField("Tên doanh nghiệp", {
          label: kocOrPerson ? "Tên kênh / thương hiệu cá nhân" : type === "nha-san-xuat" ? "Tên cơ sở / HTX / doanh nghiệp" : "Tên doanh nghiệp",
          autoComplete: "organization",
          placeholder: kocOrPerson ? "Không bắt buộc" : "Nếu có",
        })}
        {textField("Số điện thoại", { required: true, type: "tel", autoComplete: "tel", inputMode: "tel", placeholder: "09xx xxx xxx" })}
        {textField("Email", { type: "email", autoComplete: "email", placeholder: "Không bắt buộc" })}
        <div className="sm:col-span-2">
          {textField("Khu vực", { required: true, autoComplete: "address-level1", placeholder: "Tỉnh / thành phố của bạn" })}
        </div>
      </div>

      <div key={type} className="mt-8 border-t border-dashed border-line pt-8">
        <p className="t-label mb-5 text-brand">Thông tin cho nhóm · {current.label}</p>
        <div className="grid gap-5 sm:grid-cols-2">{typeFields[type].map(renderField)}</div>
      </div>

      <div className="mt-6">
        <label htmlFor={fieldId("Nội dung yêu cầu")} className={labelCls}>
          Nội dung yêu cầu <span className="text-brand">*</span>
        </label>
        <textarea
          id={fieldId("Nội dung yêu cầu")}
          name="Nội dung yêu cầu"
          rows={4}
          aria-required
          aria-invalid={!!errors["Nội dung yêu cầu"] || undefined}
          aria-describedby={errors["Nội dung yêu cầu"] ? `${fieldId("Nội dung yêu cầu")}-err` : undefined}
          placeholder="Bạn đang cần gì, mong muốn đạt được điều gì?"
          className={cx(input, "resize-y", errors["Nội dung yêu cầu"] ? "border-red-400" : "border-line hover:border-brand/40")}
        />
        {errorText("Nội dung yêu cầu")}
      </div>

      <div className="mt-6">
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-fg-muted">
          <input
            id={fieldId("consent")}
            type="checkbox"
            name="consent"
            value="yes"
            aria-invalid={!!errors.consent || undefined}
            aria-describedby={errors.consent ? `${fieldId("consent")}-err` : undefined}
            className="mt-1 size-4 shrink-0 cursor-pointer accent-[#f39a62]"
          />
          <span>
            Tôi đồng ý để Diary Media và đối tác HTX Quê Hương Xanh liên hệ và xử lý thông tin này theo{" "}
            <Link href="/chinh-sach-bao-mat/" className="font-semibold text-brand underline-offset-4 hover:underline">
              Chính sách bảo mật
            </Link>
            . <span className="text-brand">*</span>
          </span>
        </label>
        {errorText("consent")}
      </div>

      {status === "error" && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="mt-6 flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/[0.08] px-4 py-3 text-sm text-red-300 outline-none"
        >
          <AlertCircle size={17} className="mt-0.5 shrink-0" aria-hidden />
          {message}
        </div>
      )}

      {Object.keys(errors).length > 0 && status !== "error" && (
        <p role="alert" className="mt-6 text-sm font-medium text-red-300">
          Còn {Object.keys(errors).length} mục cần bổ sung — xem các ô được đánh dấu đỏ.
        </p>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-12 cursor-pointer items-center gap-2.5 rounded-full bg-brand px-7 text-[15px] font-semibold text-brand-ink transition-colors hover:bg-brand-light disabled:cursor-wait disabled:opacity-70"
        >
          {status === "sending" ? (
            <>
              <Loader2 size={17} className="animate-spin" aria-hidden />
              Đang gửi…
            </>
          ) : (
            <>
              Gửi đăng ký hợp tác
              <Send size={16} aria-hidden />
            </>
          )}
        </button>
        <p className="text-sm text-fg-muted">
          Hoặc gọi/Zalo{" "}
          <a href={`tel:${site.contact.phoneIntl}`} className="font-semibold text-brand underline-offset-4 hover:underline">
            {site.contact.phoneDisplay}
          </a>
        </p>
      </div>
    </form>
  );
}
