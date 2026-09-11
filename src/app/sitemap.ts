import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

/**
 * Legal stubs are excluded: they carry `robots: noindex` until real copy
 * exists, and listing them here would contradict that.
 */
const routes = [
  { path: "", priority: 1 },
  { path: "/what-we-automate", priority: 0.9 },
  { path: "/websites", priority: 0.9 },
  { path: "/never-miss-a-lead", priority: 0.9 },
  { path: "/home-services", priority: 0.9 },
  { path: "/products/royto-social", priority: 0.8 },
  { path: "/pricing", priority: 0.9 },
  { path: "/about", priority: 0.7 },
  { path: "/contact", priority: 0.9 },
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
