import type { MetadataRoute } from "next";
import { APP_URL } from "@/lib/constants";
import { RouterService } from "@/server/services/router.service";

import { hasDatabase } from "@/lib/server/env-safe";

export async function generateSitemaps() {
  if (!hasDatabase) return [];
  try {
    const brands = await RouterService.getAllBrandPaths();
    return brands.map((brand) => ({ id: brand.brand }));
  } catch (error) {
    console.error("[Build] Sitemap generation failed:", error);
    return [];
  }
}

export default async function sitemap({ id }: { id: Promise<string> }): Promise<MetadataRoute.Sitemap> {
  if (!hasDatabase) return [];
  try {
    const resolvedId = await id;
    const models = await RouterService.getBrandModels(resolvedId);
    
    return models.map((model) => ({
      url: `${APP_URL}/routers/${resolvedId}/${model.slug}`,
      lastModified: model.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("[Build] Sitemap generation failed:", error);
    return [];
  }
}
