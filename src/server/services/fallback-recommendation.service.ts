import { prisma } from "../db/prisma";
import { RetrievalResult } from "./search-orchestrator.service";

export class FallbackRecommendationService {
  /**
   * Provides real fallback suggestions based on actual DB records.
   * Does NOT hallucinate. Queries popular Problems and RouterModels.
   */
  public static async getGlobalFallbacks(limit: number = 5): Promise<RetrievalResult[]> {
    // We try to get popular problems and routers.
    // Assuming problems and routers have some form of 'status' or just get the most recently updated ones
    // if we don't have explicit popularity metrics yet.
    
    // Get popular problems (e.g. PUBLISHED ones)
    const problems = await prisma.problem.findMany({
      where: { status: "PUBLISHED" },
      take: Math.ceil(limit / 2),
      orderBy: { updatedAt: "desc" },
    });

    // Get popular routers
    const routers = await prisma.routerModel.findMany({
      take: limit - problems.length,
      orderBy: { updatedAt: "desc" },
      include: { brand: true }
    });

    const results: RetrievalResult[] = [];

    for (const p of problems) {
      results.push({
        chunkId: `fallback-prob-${p.id}`,
        title: p.title,
        content: p.excerpt || "Common troubleshooting guide.",
        entityType: "PROBLEM",
        entityId: p.id,
        score: 0.5,
        tierUsed: 3,
        isFallback: true
      });
    }

    for (const r of routers) {
      results.push({
        chunkId: `fallback-rout-${r.id}`,
        title: `${r.brand.name} ${r.name}`,
        content: "Common default login instructions.",
        entityType: "ROUTER",
        entityId: r.id,
        score: 0.5,
        tierUsed: 3,
        isFallback: true
      });
    }

    return results.slice(0, limit);
  }
}
