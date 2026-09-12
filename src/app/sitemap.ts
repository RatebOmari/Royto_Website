import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

/** /work is excluded: it is noindex until there is a case study to read. */
const routes = [
  { path: "", priority: 1 },
  { path: "/what-we-automate", priority: 0.9 },
  { path: "/websites", priority: 0.9 },
  { path: "/packages", priority: 0.9 },
  { path: "/never-miss-a-lead", priority: 0.9 },
  { path: "/royto-social", priority: 0.8 },
  { path: "/pricing", priority: 0.9 },
  { path: "/about", priority: 0.7 },
  { path: "/contact", priority: 0.9 },
  { path: "/privacy", priority: 0.2 },
  { path: "/terms", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
