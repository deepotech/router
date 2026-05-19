// @ts-nocheck
import { HallucinationDetectionService } from "./hallucination-detection.service";
import { CrawlRiskService } from "./crawl-risk.service";
import { RolloutControlService } from "./rollout-control.service";
import { GovernanceMetricsService } from "./governance-metrics.service";
import { RetrievalDensityService } from "./retrieval-density.service";
import { SemanticOverlapService } from "./semantic-overlap.service";
import { prisma } from "../db/prisma";
import { ContentQualityStatus } from "@prisma/client";

export class SemanticGovernanceService {
  /**
   * Main evaluation gate. Evaluates an entity's content payload.
   * Returns a recommendation on whether it can be safely moved to REVIEWED or PUBLISHED.
   */
  public static async evaluateEntity(
    title: string,
    textContent: string,
    entityType: string,
    entityId: number,
    ips: string[] = []
  ) {
    const hallucinationScore = HallucinationDetectionService.evaluateEntityPayload({ ips, textContent });
    const crawlRiskScore = await CrawlRiskService.calculateCrawlRisk(title, textContent, entityType);

    if (hallucinationScore > 0) {
      await GovernanceMetricsService.logHallucination(entityType, entityId, hallucinationScore);
    }

    // Phase G: Semantic Density & Overlap Validation
    const { isDense, densityScore } = RetrievalDensityService.calculateDensity(textContent);
    const hasHighOverlap = await SemanticOverlapService.hasHighOverlap(textContent, 0.7);

    // If Hallucination > 0 or Crawl Risk > 0.8, we recommend REJECT
    // If not dense or has high overlap, we also reject to protect index quality
    const isSafe = hallucinationScore === 0.0 && crawlRiskScore < 0.5 && isDense && !hasHighOverlap;

    let recommendedStatus = ContentQualityStatus.REVIEWED;
    if (!isSafe) {
      if (hasHighOverlap) recommendedStatus = ContentQualityStatus.REJECTED_DUPLICATE;
      else if (!isDense) recommendedStatus = ContentQualityStatus.REJECTED_THIN;
      else recommendedStatus = ContentQualityStatus.REJECTED_THIN; // Fallback
    }

    return {
      hallucinationScore,
      crawlRiskScore,
      densityScore,
      hasHighOverlap,
      isSafe,
      recommendedStatus
    };
  }

  /**
   * Final publication execution. Moves an entity to PUBLISHED if it passes gates.
   */
  public static async approvePublication(entityType: string, id: number) {
    const canPublish = await RolloutControlService.canPublish(1);
    if (!canPublish) {
      throw new Error(`[Governance] Publication rejected by Rollout Control. Stage limit reached or publishing disabled.`);
    }

    const updateData = { status: ContentQualityStatus.PUBLISHED, publishedAt: new Date(), isPublished: true };

    if (entityType === "PROBLEM") {
      await prisma.problem.update({ where: { id }, data: updateData });
    } else if (entityType === "ROUTER") {
      await prisma.routerModel.update({ where: { id }, data: updateData });
    } else if (entityType === "IP") {
      await prisma.ipAddress.update({ where: { id }, data: updateData });
    }
  }

  public static async rejectEntity(entityType: string, id: number, reason: string) {
    console.warn(`[Governance] Entity ${entityType}:${id} rejected. Reason: ${reason}`);
    const updateData = { status: ContentQualityStatus.REJECTED_THIN };

    if (entityType === "PROBLEM") {
      await prisma.problem.update({ where: { id }, data: updateData });
    } else if (entityType === "ROUTER") {
      await prisma.routerModel.update({ where: { id }, data: updateData });
    } else if (entityType === "IP") {
      await prisma.ipAddress.update({ where: { id }, data: updateData });
    }
  }
}
