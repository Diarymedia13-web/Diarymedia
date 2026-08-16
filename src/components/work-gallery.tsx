"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { projects, projectCategories, type Project } from "@/lib/projects";
import { cx } from "./ui";

/**
 * Lưới dự án có bộ lọc theo hạng mục + lightbox xem chi tiết.
 * Lọc chạy hoàn toàn phía client nên vẫn hoạt động trên hosting tĩnh.
 */
export default function WorkGallery() {
  const [filter, setFilter] = useState<string>("Tất cả");
  const [active, setActive] = useState<Project | null>(null);

  const filtered = useMemo(
    () => (filter === "Tất cả" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  const filters = ["Tất cả", ...projectCategories];

  return (
    <>
      {/* Bộ lọc */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Lọc dự án theo hạng mục">
        {filters.map((f) => {
          const count = f === "Tất cả" ? projects.length : projects.filter((p) => p.category === f).length;
          if (count === 0) return null;
          const isOn = filter === f;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={isOn}
              className={cx(
                "cursor-pointer rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-300",
                isOn
                  ? "border-brand bg-brand text-brand-ink"
                  : "border-line text-fg-muted hover:border-white/25 hover:text-fg",
              )}
            >
              {f}
              <span className={cx("ml-2 text-xs", isOn ? "text-brand-ink/60" : "text-fg-dim")}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Lưới */}
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <button
            key={p.slug}
            type="button"
            onClick={() => setActive(p)}
            className={cx(
              "group relative flex cursor-pointer flex-col overflow-hidden rounded-block border border-line bg-ink-2/55 backdrop-blur-sm text-left transition-colors duration-300 hover:border-brand/40",
              p.span === "tall" && "sm:row-span-2",
            )}
          >
            <div className={cx("relative overflow-hidden", p.span === "tall" ? "aspect-[3/4]" : "aspect-[4/3]")}>
              <Image
                src={p.cover}
                alt={`${p.title} — ${p.client}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent opacity-70" />
              <span className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
                <ArrowUpRight size={18} strokeWidth={2.4} aria-hidden />
              </span>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center gap-3">
                <span className="t-label text-brand">{p.category}</span>
                <span className="t-label text-fg-dim">{p.year}</span>
              </div>
              <h3 className="t-h3 mt-3 text-fg transition-colors group-hover:text-brand-light">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-fg-dim">{p.client}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox chi tiết dự án */}
      {active && <ProjectDialog project={active} onClose={() => setActive(null)} />}
    </>
  );
}

function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  // Khoá cuộn nền và bắt phím Esc ở cấp tài liệu để đóng được dù con trỏ ở đâu.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="fixed inset-0 z-[60] overflow-y-auto bg-ink/92 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="mx-auto my-6 w-full max-w-5xl px-4 sm:my-12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-hidden rounded-block border border-line bg-ink-2/55 backdrop-blur-sm">
          <div className="relative aspect-[16/9]">
            <Image
              src={project.cover}
              alt={project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-transparent to-transparent" />
            <button
              type="button"
              onClick={onClose}
              autoFocus
              aria-label="Đóng chi tiết dự án"
              className="absolute right-4 top-4 flex size-11 cursor-pointer items-center justify-center rounded-full bg-ink/70 text-fg backdrop-blur-md transition-colors hover:bg-brand hover:text-brand-ink"
            >
              <X size={20} strokeWidth={2.4} aria-hidden />
            </button>
          </div>

          <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3">
                <span className="t-label text-brand">{project.category}</span>
                <span className="t-label text-fg-dim">{project.year}</span>
                {project.location && <span className="t-label text-fg-dim">{project.location}</span>}
              </div>
              <h3 className="t-h2 mt-4">{project.title}</h3>
              <p className="mt-3 text-sm font-semibold text-fg-muted">Khách hàng · {project.client}</p>
              <p className="t-lead mt-6">{project.summary}</p>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <p className="t-label mb-4 text-fg-dim">Hạng mục thực hiện</p>
              <ul className="flex flex-col gap-2.5">
                {project.scope.map((s) => (
                  <li key={s} className="flex items-start gap-2.5 text-[15px] text-fg-muted">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {project.gallery.length > 1 && (
            <div className="grid gap-2 p-2 sm:grid-cols-2 lg:grid-cols-3">
              {project.gallery.slice(1).map((src, i) => (
                <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src={src}
                    alt={`${project.title} — hình ${i + 2}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
