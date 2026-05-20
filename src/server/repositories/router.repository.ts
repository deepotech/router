import { prisma } from "@/server/db/prisma";
import type { Brand, RouterModel } from "@/types";

// =============================================================
// Router Repository — all DB queries isolated here
// Never put Prisma queries in UI components or pages directly
// =============================================================

export const RouterRepository = {
  // ---- Brands ----

  async getAllBrands(): Promise<Brand[]> {
    const brands = await prisma.brand.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: { select: { models: true } },
      },
    });
    return brands.map((b) => ({
      id: b.id,
      name: b.name,
      slug: b.slug,
      logo: b.logo,
      description: b.description,
      modelCount: b._count.models,
    }));
  },

  async getBrandBySlug(slug: string): Promise<Brand | null> {
    const brand = await prisma.brand.findUnique({
      where: { slug },
      include: { _count: { select: { models: true } } },
    });
    if (!brand) return null;
    return {
      id: brand.id,
      name: brand.name,
      slug: brand.slug,
      logo: brand.logo,
      description: brand.description,
      modelCount: brand._count.models,
    };
  },

  async getAllBrandSlugs(): Promise<string[]> {
    const brands = await prisma.brand.findMany({
      select: { slug: true },
    });
    return brands.map((b) => b.slug);
  },

  // ---- Router Models ----

  async getModelsByBrand(brandSlug: string): Promise<RouterModel[]> {
    const models = await prisma.routerModel.findMany({
      where: { brand: { slug: brandSlug } },
      include: { brand: { select: { name: true, slug: true } } },
      orderBy: { name: "asc" },
    });
    return models.map(mapModel);
  },

  async getModelBySlug(modelSlug: string): Promise<RouterModel | null> {
    const model = await prisma.routerModel.findUnique({
      where: { slug: modelSlug },
      include: { brand: { select: { name: true, slug: true } } },
    });
    if (!model) return null;
    return mapModel(model);
  },

  async getModelByBrandAndSlug(
    brandSlug: string,
    modelSlug: string
  ): Promise<RouterModel | null> {
    const model = await prisma.routerModel.findFirst({
      where: {
        slug: modelSlug,
        brand: { slug: brandSlug },
      },
      include: { brand: { select: { name: true, slug: true } } },
    });
    if (!model) return null;
    return mapModel(model);
  },

  async getAllModelSlugs(): Promise<{ brandSlug: string; modelSlug: string }[]> {
    const models = await prisma.routerModel.findMany({
      select: { slug: true, brand: { select: { slug: true } } },
    });
    return models.map((m) => ({
      brandSlug: m.brand.slug,
      modelSlug: m.slug,
    }));
  },

  async getRelatedModels(
    brandId: number,
    excludeSlug: string,
    limit = 4
  ): Promise<RouterModel[]> {
    const models = await prisma.routerModel.findMany({
      where: { brandId, NOT: { slug: excludeSlug } },
      include: { brand: { select: { name: true, slug: true } } },
      take: limit,
    });
    return models.map(mapModel);
  },
};

// ---- Internal mapper ----
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapModel(model: any): RouterModel {
  return {
    id: model.id,
    brandId: model.brandId,
    brand: model.brand
      ? { name: model.brand.name, slug: model.brand.slug }
      : undefined,
    name: model.name,
    slug: model.slug,
    loginIps: model.loginIps,
    defaultUsername: model.defaultUsername,
    defaultPassword: model.defaultPassword,
    wifiSetupGuide: model.wifiSetupGuide,
    resetGuide: model.resetGuide,
    faqs: model.faqs as RouterModel["faqs"],
    imageUrl: model.imageUrl,
    metaTitle: model.metaTitle,
    metaDescription: model.metaDescription,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
    diagnosticCategory: model.diagnosticCategory,
    decayScore: model.decayScore,
  };
}
