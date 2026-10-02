import { MetadataRoute } from "next";
import { getCanonicalSiteUrlSync } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getCanonicalSiteUrlSync();

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/workshop", "/campus/"],
        disallow: [
          "/admin",
          "/admin/*",
          "/partner",
          "/partner/*",
          "/register/success",
          "/r/*",
          "/api/*",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
