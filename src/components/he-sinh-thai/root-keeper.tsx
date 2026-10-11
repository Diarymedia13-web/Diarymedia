"use client";

import { useState } from "react";
import Image from "next/image";
import { Lora } from "next/font/google";
import {
  Award,
  CheckCircle2,
  GraduationCap,
  Building2,
  Sparkles,
  ShieldCheck,
  Sprout,
  Calendar,
  MapPin,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";
import { Container, ButtonLink, SectionLabel, cx } from "../ui";
import { htxDirector } from "@/lib/he-sinh-thai";

const lora = Lora({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

type TabKey = "credentials" | "training" | "organization";

export default function RootKeeper() {
  const d = htxDirector;
  const [activeTab, setActiveTab] = useState<TabKey>("credentials");

  return (
    <section aria-labelledby="nguoi-giu-goc" className="mt-24 sm:mt-32">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ================= CỘT TRÁI: CHÂN DUNG & BẢO CHỨNG ================= */}
          <div className="lg:sticky lg:top-28 lg:col-span-5" data-reveal>
            <figure className="relative mx-auto max-w-md">
              <div className="relative aspect-[4/5] overflow-hidden rounded-block border border-line/60 shadow-2xl shadow-black/50">
                <Image
                  src={d.photo}
                  alt={`${d.name} — ${d.role} (${d.organization.name})`}
                  fill
                  sizes="(max-width: 1024px) 90vw, 36vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
                <span className="vf-corner vf-tl" aria-hidden />
                <span className="vf-corner vf-tr" aria-hidden />
                <span className="vf-corner vf-bl" aria-hidden />
                <span className="vf-corner vf-br" aria-hidden />
              </div>

              {/* Tag định danh chân dung */}
              <figcaption className="absolute -bottom-6 left-5 right-5 rounded-2xl border border-line bg-ink-2/95 px-5 py-4 backdrop-blur-md sm:left-8 sm:right-auto">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-fg text-base sm:text-lg">{d.name}</p>
                  <span className="rounded-full bg-brand/15 px-2 py-0.5 text-[11px] font-semibold text-brand-light">
                    VINAGC
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-brand-light mt-0.5">{d.role}</p>
                <p className="text-[12px] text-fg-dim mt-0.5">{d.organization.name}</p>
              </figcaption>
            </figure>

            {/* Thẻ bảo chứng nhanh dưới ảnh chân dung */}
            <div className="mx-auto mt-12 max-w-md space-y-2.5">
              <div className="rounded-xl border border-line/80 bg-ink-2/60 p-3.5 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand/15 text-brand">
                    <Award size={18} aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-brand-light uppercase tracking-wider">
                      Chuyên gia Khởi nghiệp Quốc gia
                    </p>
                    <p className="text-[13px] text-fg-muted mt-0.5 leading-snug">
                      Hội đồng Tư vấn Khởi nghiệp Quốc gia & Viện Nghiên cứu Khởi nghiệp
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-line/80 bg-ink-2/60 p-3.5 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
                    <Sprout size={18} aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                      Doanh nghiệp Bao trùm (IID Certified)
                    </p>
                    <p className="text-[13px] text-fg-muted mt-0.5 leading-snug">
                      HTX Quê Hương Xanh · Hiệu lực đến 12/2028 (IID/25/IB1-004)
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-line/80 bg-ink-2/60 p-3.5 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-orange-500/15 text-orange-400">
                    <ShieldCheck size={18} aria-hidden />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-semibold text-orange-300 uppercase tracking-wider">
                        Orange Seal · IIX Impact: 8.21/10
                      </p>
                    </div>
                    <p className="text-[13px] text-fg-muted mt-0.5 leading-snug">
                      Cam kết Giới & Khí hậu quốc tế · 70%–89% khách hàng nữ
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= CỘT PHẢI: CÂU CHUYỆN & HỒ SƠ CHI TIẾT ================= */}
          <div className="lg:col-span-7" data-reveal>
            <div className="flex flex-wrap items-center gap-2.5">
              <SectionLabel>Người giữ gốc · Lãnh đạo đối tác</SectionLabel>
              <span className="rounded-full border border-line/80 bg-ink-2/80 px-2.5 py-0.5 text-xs text-fg-muted">
                {d.role}
              </span>
            </div>

            <h2
              id="nguoi-giu-goc"
              className={cx(
                lora.className,
                "mt-4 text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-[1.12] text-fg",
              )}
            >
              “Một bên giữ gốc” —{" "}
              <span className="italic text-gradient-brand">là {d.displayName}.</span>
            </h2>

            {/* Thông tin đơn vị đại diện tóm tắt */}
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-fg-dim">
              <span>Họ và tên: <strong className="text-fg-muted font-medium">{d.fullName}</strong></span>
              <span className="text-line">•</span>
              <span>Đơn vị: <strong className="text-fg-muted font-medium">{d.organization.name}</strong></span>
              <span className="text-line">•</span>
              <span>Lĩnh vực: <strong className="text-fg-muted font-medium">{d.organization.field}</strong></span>
            </div>

            {/* Triết lý câu chuyện người giữ gốc */}
            <div className="mt-7 flex flex-col gap-5 text-[17px] leading-relaxed text-fg-muted">
              <p>
                {d.displayName.charAt(0).toUpperCase() + d.displayName.slice(1)} là Chủ tịch VINAGC (Hợp tác xã Quê Hương Xanh) — người đứng sau mạng lưới nhà sản xuất
                của Hệ Sinh Thái DIARY. Gắn bó với nông nghiệp, chị hiểu một sản phẩm từ chính gốc rễ của nó:{" "}
                <span className="text-fg font-medium">
                  đất, mùa vụ, cách làm ra, và cả những khó khăn mà người sản xuất ít khi nói thành lời.
                </span>
              </p>
              <p>
                Với các ngành nghề đặc sản và truyền thống, chị không chỉ nhìn vào sản phẩm cuối cùng mà hiểu cả nhịp
                làm việc phía sau: mật ong phụ thuộc vào mùa hoa, nước mắm cần thời gian ủ chượp, trà đi theo từng lứa
                hái, một món thủ công cần đôi tay người thợ lành nghề. Vì hiểu nhịp ấy, chị biết{" "}
                <span className="text-fg font-medium">điều gì phải giữ nguyên để sản phẩm còn là chính nó</span>, và
                điều gì cần thay đổi để nó đi được xa hơn — từ quy trình, giấy tờ, chất lượng ổn định cho tới bao bì và
                cách kể chuyện.
              </p>
              <p>
                Điều chị trăn trở nhất là những cơ sở làm ra sản phẩm tốt nhưng phải tự mò mẫm một mình: không biết bắt
                đầu chuẩn hoá từ đâu, không rõ thị trường cần gì, rồi bỏ cuộc giữa chừng. Chị muốn là người đi cùng họ từ
                bước đầu tiên — ngồi lại lắng nghe, cùng nhìn ra điểm mạnh, vạch từng bước chuyển đổi vừa sức với từng
                doanh nghiệp.
              </p>
            </div>

            <p
              className={cx(
                lora.className,
                "mt-8 border-l-2 border-brand/60 pl-5 text-[clamp(1.25rem,2vw,1.55rem)] italic leading-snug text-brand-light",
              )}
            >
              Để những giá trị được tạo nên bằng tâm huyết không phải lặng lẽ biến mất giữa một thị trường không ngừng
              thay đổi.
            </p>

            <p className="mt-6 text-[17px] leading-relaxed text-fg">
              Khi Diary Media mở đường bằng hình ảnh, câu chuyện và kênh bán, {d.displayName} là người giữ cho con đường ấy
              luôn bắt đầu từ một sản phẩm thật.
            </p>

            {/* Tags lĩnh vực chuyên môn */}
            <ul className="mt-7 flex flex-wrap gap-2">
              {d.expertise.map((e) => (
                <li
                  key={e}
                  className="rounded-full border border-line bg-ink-2/80 px-3.5 py-1.5 text-xs text-fg font-medium"
                >
                  {e}
                </li>
              ))}
            </ul>

            {/* ================= TABS HỒ SƠ NĂNG LỰC & CHỨNG NHẬN ================= */}
            <div className="mt-10 overflow-hidden rounded-block border border-line bg-ink-2/70 backdrop-blur-md">
              {/* Tab Navigation Buttons */}
              <div className="flex border-b border-line bg-ink/40 p-2 gap-1.5 overflow-x-auto no-scrollbar">
                <button
                  type="button"
                  onClick={() => setActiveTab("credentials")}
                  className={cx(
                    "flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap",
                    activeTab === "credentials"
                      ? "bg-brand text-brand-ink shadow-sm"
                      : "text-fg-muted hover:bg-white/5 hover:text-fg",
                  )}
                >
                  <Award size={16} aria-hidden />
                  <span>Danh hiệu & Thành tựu</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("training")}
                  className={cx(
                    "flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap",
                    activeTab === "training"
                      ? "bg-brand text-brand-ink shadow-sm"
                      : "text-fg-muted hover:bg-white/5 hover:text-fg",
                  )}
                >
                  <GraduationCap size={16} aria-hidden />
                  <span>Quá trình đào tạo chuyên môn</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("organization")}
                  className={cx(
                    "flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap",
                    activeTab === "organization"
                      ? "bg-brand text-brand-ink shadow-sm"
                      : "text-fg-muted hover:bg-white/5 hover:text-fg",
                  )}
                >
                  <Building2 size={16} aria-hidden />
                  <span>Về VINAGC</span>
                </button>
              </div>

              {/* Tab Contents */}
              <div className="p-5 sm:p-7">
                {/* 1. DANH HIỆU & THÀNH TỰU */}
                {activeTab === "credentials" && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-brand-light flex items-center gap-2 mb-3">
                        <Sparkles size={14} className="text-brand" />
                        Danh hiệu & Chứng nhận chuyên môn nổi bật
                      </h4>
                      <div className="grid gap-3.5 sm:grid-cols-2">
                        {d.credentials.map((c) => (
                          <div
                            key={c.id}
                            className="rounded-xl border border-line/90 bg-ink-2/90 p-4 transition-all hover:border-brand/40"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="rounded-full bg-brand/15 px-2.5 py-0.5 text-[11px] font-semibold text-brand">
                                {c.badge}
                              </span>
                              <span className="flex items-center gap-1 text-[11px] text-fg-dim">
                                <Calendar size={11} />
                                {c.period}
                              </span>
                            </div>
                            <h5 className="mt-2 text-sm font-bold text-fg leading-snug">{c.title}</h5>
                            {c.englishTitle && (
                              <p className="text-xs italic text-brand-light/80">{c.englishTitle}</p>
                            )}
                            <p className="mt-2 text-xs text-fg-muted leading-relaxed">{c.description}</p>
                            <p className="mt-2.5 border-t border-line/60 pt-2 text-[11px] font-medium text-fg-dim">
                              Cấp bởi: {c.issuer}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-line/70 pt-5">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-300 flex items-center gap-2 mb-3">
                        <Sprout size={14} className="text-emerald-400" />
                        Thành tựu của Hợp tác xã Quê Hương Xanh (VINAGC)
                      </h4>
                      <div className="grid gap-3.5 sm:grid-cols-2">
                        {d.achievements.map((a) => (
                          <div
                            key={a.id}
                            className="rounded-xl border border-line/90 bg-ink-2/90 p-4 transition-all hover:border-emerald-500/40"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400">
                                {a.badge}
                              </span>
                              {a.code && <span className="text-[10px] text-fg-dim">{a.code}</span>}
                            </div>
                            <h5 className="mt-2 text-sm font-bold text-fg leading-snug">{a.title}</h5>
                            <p className="mt-2 text-xs text-fg-muted leading-relaxed">{a.desc}</p>
                            {a.metrics && (
                              <div className="mt-3 grid grid-cols-2 gap-2 rounded-lg bg-ink/60 p-2 text-center border border-line/50">
                                {a.metrics.map((m) => (
                                  <div key={m.label}>
                                    <p className="text-[10px] text-fg-dim">{m.label}</p>
                                    <p className="text-xs font-bold text-brand-light mt-0.5">{m.value}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                            <p className="mt-2.5 border-t border-line/60 pt-2 text-[11px] font-medium text-fg-dim">
                              Bảo chứng: {a.issuer}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. QUÁ TRÌNH ĐÀO TẠO & BỒI DƯỠNG */}
                {activeTab === "training" && (
                  <div className="space-y-6">
                    {d.training.map((grp) => (
                      <div key={grp.group} className="space-y-3">
                        <div className="flex items-center justify-between border-b border-line/60 pb-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-brand-light flex items-center gap-2">
                            <GraduationCap size={15} className="text-brand" />
                            {grp.group}
                          </h4>
                          <span className="rounded-full bg-ink/70 px-2.5 py-0.5 text-[11px] text-fg-dim border border-line/50">
                            {grp.badge}
                          </span>
                        </div>

                        <div className="space-y-3">
                          {grp.items.map((it) => (
                            <div
                              key={it.name}
                              className="rounded-xl border border-line/80 bg-ink-2/90 p-4 transition-all hover:border-line"
                            >
                              <div className="flex flex-wrap items-baseline justify-between gap-2">
                                <h5 className="text-sm font-bold text-fg">{it.name}</h5>
                                <div className="flex items-center gap-2 text-xs text-brand-light">
                                  <span className="flex items-center gap-1">
                                    <Calendar size={12} />
                                    {it.date}
                                  </span>
                                  {it.location && (
                                    <span className="flex items-center gap-1 text-fg-dim">
                                      <MapPin size={12} />
                                      {it.location}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <p className="mt-1.5 text-xs text-fg-muted leading-relaxed">{it.desc}</p>

                              {it.details && (
                                <ul className="mt-3 grid gap-1.5 sm:grid-cols-2 rounded-lg bg-ink/50 p-2.5 border border-line/50">
                                  {it.details.map((dt) => (
                                    <li key={dt} className="flex items-start gap-1.5 text-[11px] text-fg-muted">
                                      <CheckCircle2 size={12} className="mt-0.5 shrink-0 text-brand" />
                                      <span>{dt}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}

                              <p className="mt-2.5 border-t border-line/50 pt-2 text-[11px] text-fg-dim">
                                Đơn vị tổ chức: <span className="text-fg-muted font-medium">{it.issuer}</span>
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 3. VỀ HTX QUÊ HƯƠNG XANH (VINAGC) */}
                {activeTab === "organization" && (
                  <div className="space-y-5">
                    <div className="rounded-xl border border-line/90 bg-ink-2/90 p-5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <span className="rounded-full bg-brand/15 px-2.5 py-0.5 text-xs font-semibold text-brand">
                            Đối tác chiến lược · Hệ Sinh Thái DIARY
                          </span>
                          <h4 className="mt-2 text-lg font-bold text-fg">{d.organization.name}</h4>
                          <p className="text-xs text-brand-light mt-0.5">{d.organization.field}</p>
                        </div>
                        <div className="text-right text-xs text-fg-dim">
                          <p>Thành lập: <strong className="text-fg">{d.organization.founded}</strong></p>
                          <p className="mt-1">Người đại diện: <strong className="text-fg">{d.displayName}</strong></p>
                        </div>
                      </div>

                      <p className="mt-4 text-xs sm:text-sm text-fg-muted leading-relaxed">
                        Hợp tác xã Quê Hương Xanh (VINAGC) là doanh nghiệp tiên phong trong lĩnh vực nông nghiệp bền
                        vững, kết nối trực tiếp với mạng lưới nhà sản xuất, hợp tác xã và hộ nông dân tại các địa
                        phương. VINAGC đóng vai trò là chiếc cầu nối chuẩn hoá: từ nguyên tắc canh tác hữu cơ, kiểm
                        soát quy trình thu hoạch đến thực hành quy chuẩn kỹ thuật tốt (GRP).
                      </p>

                      <div className="mt-5 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-lg border border-line/60 bg-ink/70 p-3">
                          <p className="text-[11px] font-semibold text-brand-light">Mô hình bao trùm</p>
                          <p className="mt-1 text-[11px] text-fg-dim leading-snug">
                            Tích hợp bền vững nhóm thu nhập thấp và yếu thế vào chuỗi giá trị (Chứng nhận IID).
                          </p>
                        </div>
                        <div className="rounded-lg border border-line/60 bg-ink/70 p-3">
                          <p className="text-[11px] font-semibold text-emerald-300">Nông nghiệp bền vững</p>
                          <p className="mt-1 text-[11px] text-fg-dim leading-snug">
                            Áp dụng nông nghiệp hữu cơ, tiêu chuẩn GRP và quy trình tín chỉ Carbon.
                          </p>
                        </div>
                        <div className="rounded-lg border border-line/60 bg-ink/70 p-3">
                          <p className="text-[11px] font-semibold text-orange-300">Tác động giới & khí hậu</p>
                          <p className="mt-1 text-[11px] text-fg-dim leading-snug">
                            Đạt Orange Seal theo báo cáo IIX với 70%–89% khách hàng là phụ nữ.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-brand/30 bg-brand/5 p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <HeartHandshake size={22} className="text-brand shrink-0" />
                        <p className="text-xs text-fg-muted">
                          Bạn là nhà sản xuất hoặc hợp tác xã cần tư vấn chuẩn hoá sản phẩm và lộ trình thương mại hoá?
                        </p>
                      </div>
                      <ButtonLink href="?nhom=nha-san-xuat#dang-ky" variant="solid" className="shrink-0 text-xs">
                        Đăng ký kết nối
                      </ButtonLink>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Nút hành động */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <ButtonLink href="?nhom=nha-san-xuat#dang-ky" variant="solid">
                Trao đổi về sản phẩm của bạn
              </ButtonLink>
              <p className="text-sm text-fg-dim">
                Dành cho nhà sản xuất, hợp tác xã muốn được tư vấn lộ trình chuyển đổi và thương mại hoá.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
