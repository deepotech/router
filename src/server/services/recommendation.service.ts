import { RecommendationRepository } from "../repositories/recommendation.repository";

export class RecommendationService {
  static async getRelatedRouters(brandId: number, currentModelId: number) {
    return RecommendationRepository.getRoutersByBrand(brandId, currentModelId, 4);
  }

  static async getRelatedProblems(category: string, currentSlug: string) {
    return RecommendationRepository.getProblemsByCategory(category, currentSlug, 3);
  }

  static async getRoutersForIp(ipAddress: string) {
    return RecommendationRepository.getRoutersByIp(ipAddress, 4);
  }
}
