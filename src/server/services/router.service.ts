import { RouterRepository } from "@/server/repositories/router.repository";
import type { Brand, RouterModel } from "@/types";

// =============================================================
// Router Service — business logic on top of the repository
// =============================================================

export const RouterService = {
  /**
   * Get all brands with their model count.
   * Used for the /routers listing and navigation.
   */
  async getAllBrands(): Promise<Brand[]> {
    return RouterRepository.getAllBrands();
  },

  /**
   * Get a single brand with validation.
   * Returns null if brand doesn't exist (triggers notFound in pages).
   */
  async getBrand(slug: string): Promise<Brand | null> {
    return RouterRepository.getBrandBySlug(slug);
  },

  /**
   * Get all models for a brand page.
   */
  async getBrandModels(brandSlug: string): Promise<RouterModel[]> {
    return RouterRepository.getModelsByBrand(brandSlug);
  },

  /**
   * Get a single router model page data.
   */
  async getModel(
    brandSlug: string,
    modelSlug: string
  ): Promise<RouterModel | null> {
    return RouterRepository.getModelByBrandAndSlug(brandSlug, modelSlug);
  },

  /**
   * Get related models from the same brand (for "See also" section).
   */
  async getRelatedModels(
    brandId: number,
    excludeSlug: string
  ): Promise<RouterModel[]> {
    return RouterRepository.getRelatedModels(brandId, excludeSlug, 4);
  },

  /**
   * Returns all [brand, model] slug pairs for generateStaticParams.
   */
  async getAllModelPaths(): Promise<{ brand: string; model: string }[]> {
    const slugs = await RouterRepository.getAllModelSlugs();
    return slugs.map((s) => ({ brand: s.brandSlug, model: s.modelSlug }));
  },

  /**
   * Returns all brand slugs for generateStaticParams.
   */
  async getAllBrandPaths(): Promise<{ brand: string }[]> {
    const slugs = await RouterRepository.getAllBrandSlugs();
    return slugs.map((slug) => ({ brand: slug }));
  },
};
