import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Stubs and the form endpoint have nothing to index.
      disallow: ["/api/", "/privacy", "/terms"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
