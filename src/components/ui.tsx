import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/* --------------------------------------------------------------------------
   Nhãn mono nhỏ đứng đầu mỗi khối — chữ ký thị giác của bố cục
   -------------------------------------------------------------------------- */
export function SectionLabel({
  children,
  tone = "brand",
  className,
  ...rest
}: {
  children: ReactNode;
  tone?: "brand" | "light" | "dim";
} & React.HTMLAttributes<HTMLParagraphElement>) {
  const toneClass =
    tone === "brand" ? "text-brand" : tone === "light" ? "text-white/80" : "text-fg-dim";
  return (
    <p className={cx("t-label", toneClass, className)} {...rest}>
      {children}
    </p>
  );
}

/* --------------------------------------------------------------------------
   Nút chính: viên thuốc trắng + chấm cam có mũi tên, giống ngôn ngữ tham chiếu
   -------------------------------------------------------------------------- */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "solid" | "ghost" | "outline" | "outline-ink";
  className?: string;
  external?: boolean;
}) {
  // `inline-flex` nằm trong base nên đừng truyền `hidden` qua className —
  // hai utility cùng thuộc tính `display` sẽ đá nhau. Muốn ẩn thì bọc nút
  // trong một phần tử cha có `hidden md:block`.
  const base =
    "group inline-flex cursor-pointer items-center gap-2.5 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2";

  const variants = {
    // Nền trắng, chữ đen — dùng trên các mảng gradient
    primary: "bg-white py-1.5 pl-6 pr-1.5 text-[#141416] hover:bg-white/90",
    // Nền cam đặc — dùng trên nền tối
    solid: "bg-brand py-1.5 pl-6 pr-1.5 text-brand-ink hover:bg-brand-light",
    outline:
      "border border-white/25 py-1.5 pl-6 pr-1.5 text-white hover:border-white/60 hover:bg-white/5",
    // Viền — dùng trên nền sáng/giấy kem, chữ đậm để đủ tương phản (khác "outline" ở trên là cho nền tối)
    "outline-ink": "border border-line py-1.5 pl-6 pr-1.5 text-fg hover:border-brand/50 hover:bg-brand/5",
    ghost: "px-1 py-1 text-fg-muted hover:text-brand",
  } as const;

  const inner = (
    <>
      <span>{children}</span>
      {variant !== "ghost" && (
        <span
          className={cx(
            "flex size-9 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45",
            variant === "solid" ? "bg-brand-ink/85 text-brand-light" : "bg-brand text-white",
          )}
        >
          <ArrowUpRight size={17} strokeWidth={2.4} aria-hidden />
        </span>
      )}
      {variant === "ghost" && (
        <ArrowUpRight
          size={16}
          strokeWidth={2.4}
          aria-hidden
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cx(base, variants[variant], className)}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={cx(base, variants[variant], className)}>
      {inner}
    </Link>
  );
}

/* --------------------------------------------------------------------------
   Khối gradient bo góc lớn dùng làm hero của từng trang
   -------------------------------------------------------------------------- */
export function GradientBlock({
  gradient = "grad-fire",
  className,
  children,
}: {
  gradient?: "grad-fire" | "grad-ember" | "grad-copper" | "grad-dusk";
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cx("grain relative isolate overflow-hidden rounded-hero", gradient, className)}>
      {children}
    </div>
  );
}

/* --------------------------------------------------------------------------
   Thẻ "giấy mềm" hữu cơ: bo tròn ba góc trên, cạnh đáy uốn lượn thay vì
   thẳng — vẽ bằng một dải SVG cùng màu nền trang, phủ lên đáy khối để tạo
   ảo giác thẻ "tan" vào nền. Dùng cho hero trang chủ (điểm nhấn thị giác
   chính) — các khối gradient khác trong site vẫn dùng GradientBlock thường.
   -------------------------------------------------------------------------- */
export function OrganicCard({
  children,
  className,
  waveFill = "var(--color-ink)",
}: {
  children: ReactNode;
  className?: string;
  waveFill?: string;
}) {
  return (
    <div className={cx("relative isolate overflow-hidden rounded-t-hero", className)}>
      {children}
      <span className="wave-edge" aria-hidden>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0,42 C 200,105 360,0 610,48 C 860,96 1040,12 1260,54 C 1350,72 1400,66 1440,58 L1440,120 L0,120 Z"
            fill={waveFill}
          />
        </svg>
      </span>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Bọc chiều rộng nội dung — dùng thống nhất toàn site
   -------------------------------------------------------------------------- */
export function Container({
  children,
  className,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow";
}) {
  const sizes = {
    narrow: "max-w-4xl",
    default: "max-w-[1240px]",
    wide: "max-w-[1440px]",
  } as const;
  return <div className={cx("mx-auto w-full px-5 sm:px-8", sizes[size], className)}>{children}</div>;
}

/* --------------------------------------------------------------------------
   Bố cục 2 cột kinh điển: tiêu đề trái · dẫn nhập + CTA phải
   -------------------------------------------------------------------------- */
export function SectionHead({
  label,
  title,
  lead,
  cta,
  className,
  group = "head",
}: {
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  cta?: ReactNode;
  className?: string;
  group?: string;
}) {
  return (
    <div className={cx("grid gap-8 lg:grid-cols-12 lg:gap-12", className)}>
      <div className="lg:col-span-6">
        <SectionLabel className="mb-5" data-reveal>
          {label}
        </SectionLabel>
        <h2 className="t-h2" data-reveal data-reveal-group={group}>
          {title}
        </h2>
      </div>
      {(lead || cta) && (
        <div className="flex flex-col items-start gap-7 lg:col-span-5 lg:col-start-8 lg:pt-1">
          {lead && (
            <p className="t-lead" data-reveal data-reveal-group={group}>
              {lead}
            </p>
          )}
          {cta && (
            <div data-reveal data-reveal-group={group}>
              {cta}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
