import { MetadataRoute } from "next";

// ✅ NEW FILE: Tells search engines what to crawl and where the sitemap is
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/profile/",
          "/api/",
          "/(auth)/",
          "/sign-in",
          "/sign-up",
          "/signin",
        ],
      },
    ],
    sitemap: "https://westcanauto.store/sitemap.xml",
    host: "https://westcanauto.store",
  };
}