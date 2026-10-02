import { MetadataRoute } from "next";
import { getPartnersCollection } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/workshop`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/partner/apply`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  try {
    const partnersCol = await getPartnersCollection();
    const approvedPartners = await partnersCol
      .find({ status: { $in: ["APPROVED", "LIVE"] } })
      .toArray();

    const campusRoutes: MetadataRoute.Sitemap = approvedPartners.map((p) => ({
      url: `${siteUrl}/campus/${p.slug}`,
      lastModified: p.updatedAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [...staticRoutes, ...campusRoutes];
  } catch (err) {
    console.error("Sitemap generation database fallback:", err);
    return staticRoutes;
  }
}
