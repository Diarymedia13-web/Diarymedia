import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    { path: "/", priority: 1 },
    { path: "/giai-phap/", priority: 0.9 },
    { path: "/du-an/", priority: 0.8 },
    { path: "/ve-chung-toi/", priority: 0.7 },
    { path: "/lien-he/", priority: 0.8 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
