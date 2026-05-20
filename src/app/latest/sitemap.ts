import { MetadataRoute } from "next";
import { ArticlesService } from "@/server/services/articles.service";
import { APP_URL } from "@/lib/constants";
import { safeDb } from "@/lib/server/safe-db";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // 1. Core entries for paginated latest list
  const entries: MetadataRoute.Sitemap = [
    {
      url: `${APP_URL}/latest`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  try {
    // Fetch count for pagination
    const totalCount = await safeDb(async () => ArticlesService.getTotalArticlesCount(), 0);
    const limit = 12;
    const totalPages = Math.ceil(totalCount / limit);

    // Add paginated pages
    for (let page = 2; page <= Math.min(totalPages, 20); page++) {
      entries.push({
        url: `${APP_URL}/latest?page=${page}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.5,
      });
    }

    // 2. Fetch the 100 latest dynamic articles
    const articles = await safeDb(async () => {
      return ArticlesService.getLatestArticles({ limit: 100 });
    }, []);

    // Add individual articles
    articles.forEach((article) => {
      const url = article.href.startsWith("http") ? article.href : `${APP_URL}${article.href}`;
      entries.push({
        url,
        lastModified: article.createdAt ? new Date(article.createdAt) : now,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    });
  } catch (error) {
    console.error("[Build] Unified latest sitemap generation failed:", error);
  }

  return entries;
}
