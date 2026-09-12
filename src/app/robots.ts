import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The empty /work route and the form endpoint have nothing to index.
      disallow: ["/api/", "/work"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
