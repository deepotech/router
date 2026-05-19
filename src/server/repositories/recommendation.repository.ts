import { prisma } from "../db/prisma";

export class RecommendationRepository {
  static async getRoutersByBrand(brandId: number, excludeModelId?: number, limit = 4) {
    return prisma.routerModel.findMany({
      where: {
        brandId,
        ...(excludeModelId ? { id: { not: excludeModelId } } : {}),
      },
      include: { brand: true },
      take: limit,
      orderBy: { id: "desc" }, // Pseudo-random/recent
    });
  }

  static async getProblemsByCategory(category: any, excludeSlug?: string, limit = 3) {
    return prisma.problem.findMany({
      where: {
        category,
        ...(excludeSlug ? { slug: { not: excludeSlug } } : {}),
      },
      take: limit,
    });
  }
  
  static async getRoutersByIp(ipAddress: string, limit = 4) {
    return prisma.routerModel.findMany({
      where: {
        loginIps: {
          has: ipAddress,
        },
      },
      include: { brand: true },
      take: limit,
    });
  }
}
