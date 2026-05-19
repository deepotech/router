import type { MetadataRoute } from "next";
import { APP_URL } from "@/lib/constants";
import { RouterService } from "@/server/services/router.service";

export async function generateSitemaps() {
  const brands = await RouterService.getAllBrandPaths();
  // We chunk them if we had thousands of brands, but here we can just create one sitemap per brand
  return brands.map((brand) => ({ id: brand.brand }));
}

export default async function sitemap({ id }: { id: Promise<string> }): Promise<MetadataRoute.Sitemap> {
  const resolvedId = await id;
  const models = await RouterService.getBrandModels(resolvedId);
  
  return models.map((model) => ({
    url: `${APP_URL}/routers/${resolvedId}/${model.slug}`,
    lastModified: model.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
}
