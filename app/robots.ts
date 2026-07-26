import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Tells search engines which pages to crawl.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
