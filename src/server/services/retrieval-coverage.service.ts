import { prisma } from "../db/prisma";

export interface EntityCoverageReport {
  entityType: "PROBLEM" | "IP" | "ROUTER";
  entityId: number;
  title: string;
  chunkCount: number;
  chunkTypes: string[];
  retrievalReadinessScore: number; // 0-100
  tier1Eligible: boolean;
  vectorComplete: boolean;
  missingChunkTypes: string[];
}

export interface CoverageSnapshot {
  generatedAt: string;
  totalEntities: number;
  totalChunks: number;
  avgChunksPerEntity: number;
  tier1EligibleCount: number;
  tier1EligibilityRate: number;
  vectorCompleteCount: number;
  entities: EntityCoverageReport[];
  criticalGaps: EntityCoverageReport[];
}

export class RetrievalCoverageService {
  // Minimum chunk types required for Tier 1 eligibility
  private static readonly REQUIRED_CHUNK_TYPES = ["OVERVIEW", "DIAGNOSTIC"];
  private static readonly FULL_COVERAGE_TYPES = ["OVERVIEW", "DIAGNOSTIC", "FAQ"];

  /**
   * Calculates the retrieval readiness score for a single entity.
   * 100 = fully indexed, Tier 1 eligible
   */
  static calculateReadinessScore(chunkCount: number, chunkTypes: string[]): number {
    if (chunkCount === 0) return 0;

    let score = 0;
    // Base: having any chunk at all
    score += Math.min(chunkCount * 15, 40); // max 40 pts from count

    // Bonus for required types
    const hasOverview = chunkTypes.some((t) => t === "OVERVIEW");
    const hasDiagnostic = chunkTypes.some((t) => t === "DIAGNOSTIC");
    const hasFaq = chunkTypes.some((t) => t === "FAQ");

    if (hasOverview) score += 25;
    if (hasDiagnostic) score += 25;
    if (hasFaq) score += 10;

    return Math.min(score, 100);
  }

  /**
   * Identifies which chunk types are missing for an entity.
   */
  static getMissingChunkTypes(presentTypes: string[]): string[] {
    return this.FULL_COVERAGE_TYPES.filter(
      (t) => !presentTypes.includes(t)
    );
  }

  /**
   * Generates a full coverage snapshot across all entities.
   */
  static async generateCoverageSnapshot(): Promise<CoverageSnapshot> {
    const [problems, ips, routers, allChunks] = await Promise.all([
      prisma.problem.findMany({
        select: { id: true, title: true, status: true },
      }),
      prisma.ipAddress.findMany({
        select: { id: true, address: true, status: true },
      }),
      prisma.routerModel.findMany({
        select: { id: true, name: true, status: true },
      }),
      prisma.semanticChunk.findMany({
        select: { entityType: true, entityId: true, chunkType: true, chunkId: true },
      }),
    ]);

    // Build chunk map: { "PROBLEM-1": [OVERVIEW, DIAGNOSTIC, ...] }
    const chunkMap = new Map<string, string[]>();
    const chunkCountMap = new Map<string, number>();

    for (const chunk of allChunks) {
      const key = `${chunk.entityType}-${chunk.entityId}`;
      if (!chunkMap.has(key)) chunkMap.set(key, []);
      chunkMap.get(key)!.push(chunk.chunkType);
      chunkCountMap.set(key, (chunkCountMap.get(key) || 0) + 1);
    }

    const entities: EntityCoverageReport[] = [];

    // Analyze Problems
    for (const p of problems) {
      const key = `PROBLEM-${p.id}`;
      const chunkTypes = chunkMap.get(key) || [];
      const chunkCount = chunkTypes.length;
      const readiness = this.calculateReadinessScore(chunkCount, chunkTypes);
      const missingChunkTypes = this.getMissingChunkTypes(chunkTypes);
      entities.push({
        entityType: "PROBLEM", entityId: p.id, title: p.title,
        chunkCount, chunkTypes, retrievalReadinessScore: readiness,
        tier1Eligible: readiness >= 65,
        vectorComplete: chunkTypes.includes("OVERVIEW") && chunkTypes.includes("DIAGNOSTIC"),
        missingChunkTypes,
      });
    }

    // Analyze IPs
    for (const ip of ips) {
      const key = `IP-${ip.id}`;
      const chunkTypes = chunkMap.get(key) || [];
      const chunkCount = chunkTypes.length;
      const readiness = this.calculateReadinessScore(chunkCount, chunkTypes);
      entities.push({
        entityType: "IP", entityId: ip.id, title: ip.address,
        chunkCount, chunkTypes, retrievalReadinessScore: readiness,
        tier1Eligible: readiness >= 65,
        vectorComplete: chunkCount >= 2,
        missingChunkTypes: this.getMissingChunkTypes(chunkTypes),
      });
    }

    // Analyze Routers
    for (const r of routers) {
      const key = `ROUTER-${r.id}`;
      const chunkTypes = chunkMap.get(key) || [];
      const chunkCount = chunkTypes.length;
      const readiness = this.calculateReadinessScore(chunkCount, chunkTypes);
      entities.push({
        entityType: "ROUTER", entityId: r.id, title: r.name,
        chunkCount, chunkTypes, retrievalReadinessScore: readiness,
        tier1Eligible: readiness >= 65,
        vectorComplete: chunkCount >= 2,
        missingChunkTypes: this.getMissingChunkTypes(chunkTypes),
      });
    }

    const tier1Eligible = entities.filter((e) => e.tier1Eligible);
    const vectorComplete = entities.filter((e) => e.vectorComplete);
    const totalChunks = allChunks.length;
    const avgChunks = totalChunks / (entities.length || 1);

    return {
      generatedAt: new Date().toISOString(),
      totalEntities: entities.length,
      totalChunks,
      avgChunksPerEntity: Math.round(avgChunks * 10) / 10,
      tier1EligibleCount: tier1Eligible.length,
      tier1EligibilityRate: Math.round((tier1Eligible.length / (entities.length || 1)) * 100),
      vectorCompleteCount: vectorComplete.length,
      entities,
      criticalGaps: entities.filter((e) => e.retrievalReadinessScore < 50).sort((a, b) => a.retrievalReadinessScore - b.retrievalReadinessScore),
    };
  }

  /**
   * Records a coverage snapshot to the analytics table for trend tracking.
   */
  static async recordCoverageSnapshot(): Promise<CoverageSnapshot> {
    const snapshot = await this.generateCoverageSnapshot();
    await prisma.analyticsEvent.create({
      data: {
        eventType: "RETRIEVAL_COVERAGE_SNAPSHOT",
        eventData: {
          totalEntities: snapshot.totalEntities,
          totalChunks: snapshot.totalChunks,
          tier1EligibilityRate: snapshot.tier1EligibilityRate,
          avgChunksPerEntity: snapshot.avgChunksPerEntity,
          criticalGaps: snapshot.criticalGaps.length,
        },
      },
    });
    return snapshot;
  }
}
