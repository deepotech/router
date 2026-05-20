import { prisma } from "../db/prisma";
import { RecommendationRepository } from "../repositories/recommendation.repository";

export class RecommendationService {
  static async getRelatedRouters(brandId: number, currentModelId: number) {
    try {
      return await RecommendationRepository.getRoutersByBrand(brandId, currentModelId, 4);
    } catch (e) {
      console.error("[RecommendationService] Error in getRelatedRouters:", e);
      return [];
    }
  }

  static async getRelatedProblems(category: string, currentSlug: string) {
    try {
      return await RecommendationRepository.getProblemsByCategory(category, currentSlug, 3);
    } catch (e) {
      console.error("[RecommendationService] Error in getRelatedProblems:", e);
      return [];
    }
  }

  static async getRoutersForIp(ipAddress: string) {
    try {
      return await RecommendationRepository.getRoutersByIp(ipAddress, 4);
    } catch (e) {
      console.error("[RecommendationService] Error in getRoutersForIp:", e);
      return [];
    }
  }

  static async getRelatedProblemsForIp(ipAddress: string, diagnosticCategory: string | null, limit = 3) {
    try {
      return await prisma.problem.findMany({
        where: {
          isPublished: true,
          OR: [
            ...(diagnosticCategory ? [{ diagnosticCategory }] : []),
            { content: { contains: ipAddress } },
            { excerpt: { contains: ipAddress } },
          ],
        },
        take: limit,
      });
    } catch (e) {
      console.error("[RecommendationService] Error in getRelatedProblemsForIp:", e);
      return [];
    }
  }

  static async getRelatedRoutersForProblem(diagnosticCategory: string | null, limit = 4) {
    try {
      return await prisma.routerModel.findMany({
        where: {
          isPublished: true,
          ...(diagnosticCategory ? { diagnosticCategory } : {}),
        },
        include: { brand: true },
        take: limit,
      });
    } catch (e) {
      console.error("[RecommendationService] Error in getRelatedRoutersForProblem:", e);
      return [];
    }
  }
}
