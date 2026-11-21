import type { MetadataRoute } from "next";
import { engineeringInsightsData } from "@/data/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://0xdevprabhu.vercel.app";
  const latestDate = engineeringInsightsData[0]?.publishedAt
    ? new Date(engineeringInsightsData[0].publishedAt)
    : new Date();

  const insightRoutes: MetadataRoute.Sitemap = engineeringInsightsData.map(
    (item) => ({
      url: `${baseUrl}/insights/${item.slug}`,
      lastModified: new Date(item.publishedAt),
      changeFrequency: "weekly",
      priority: 0.85,
    })
  );

  return [
    {
      url: baseUrl,
      lastModified: latestDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/insights`,
      lastModified: latestDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...insightRoutes,
  ];
}