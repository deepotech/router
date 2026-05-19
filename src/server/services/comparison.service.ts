import { prisma } from "../db/prisma";
import { RouterModel } from "@prisma/client";

export class ComparisonService {
  /**
   * Fetches an existing comparison or creates a placeholder one.
   * In a full system, you would enqueue a BullMQ job to generate it via AI.
   */
  static async getComparisonBySlug(slug: string) {
    const comparison = await prisma.comparison.findUnique({
      where: { slug },
    });
    
    if (comparison) return comparison;

    // Parse the slug "brandA-modelA-vs-brandB-modelB"
    // Since this is complex without knowing exact boundaries, a robust system
    // would pre-generate valid comparison slugs and store them.
    // For this implementation, we will assume it's pre-populated or handle 404.
    
    return null;
  }

  /**
   * Helper to retrieve two routers explicitly for comparison
   */
  static async getRoutersForComparison(routerAId: number, routerBId: number) {
    const routers = await prisma.routerModel.findMany({
      where: { id: { in: [routerAId, routerBId] } },
      include: { brand: true },
    });

    return {
      routerA: routers.find(r => r.id === routerAId),
      routerB: routers.find(r => r.id === routerBId),
    };
  }

  /**
   * Returns a list of popular comparison slugs for the Hub page or Sitemap
   */
  static async getPopularComparisons(limit = 10) {
    return prisma.comparison.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  }
}
