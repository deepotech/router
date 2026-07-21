import { EntityType } from "@prisma/client";
import { SearchIntelligenceService } from "./search-intelligence.service";
import { SerpChangeService } from "./serp-change.service";
import { TopicGapService } from "./topic-gap.service";
import { ContentExpansionPlannerService } from "./content-expansion-planner.service";
import { PredictiveRefreshService } from "./predictive-refresh.service";
import { FallbackRecommendationService } from "./fallback-recommendation.service";
import { RetrievalResult } from "./search-orchestrator.service";

export interface AIRecommendation {
  id: string;
  category: "PUBLISH" | "EXPAND" | "REFRESH" | "MERGE" | "SCHEMA" | "LINKING";
  title: string;
  targetSlug: string;
  priority: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  impact: "HIGH" | "MEDIUM" | "LOW";
  estimatedSeoGain: string; // e.g. "+15% Traffic"
  estimatedTimeMinutes: number;
  confidence: number; // 0 - 100%
  reasoning: string;
  score: number; // 0 - 100 for Decision Engine sorting
}

export class RecommendationEngineService {
  /**
   * Page retrieval helper: Returns related entity recommendations for a page.
   */
  public static async getRecommendations(
    _entityType: EntityType,
    _entityId: number,
    limit: number = 5
  ): Promise<RetrievalResult[]> {
    return FallbackRecommendationService.getGlobalFallbacks(limit);
  }

  /**
   * Generates prioritized, highly actionable AI recommendations across all discovery modules.
   */
  public static async generateRecommendations(): Promise<AIRecommendation[]> {
    const recommendations: AIRecommendation[] = [];

    // 1. Topic Gap Recommendations
    const gaps = await TopicGapService.discoverGaps();
    for (const gap of gaps) {
      recommendations.push({
        id: `gap-${gap.proposedSlug}`,
        category: "PUBLISH",
        title: `Publish New Content: ${gap.targetTitle}`,
        targetSlug: gap.proposedSlug,
        priority: gap.estimatedDemandScore > 90 ? "CRITICAL" : "HIGH",
        impact: "HIGH",
        estimatedSeoGain: "+25% Organic Impressions",
        estimatedTimeMinutes: 18,
        confidence: gap.confidence,
        reasoning: gap.reasoning,
        score: gap.estimatedDemandScore
      });
    }

    // 2. Predictive Refresh Recommendations
    const refreshTargets = await PredictiveRefreshService.calculateDecayAndQueues();
    for (const target of refreshTargets) {
      recommendations.push({
        id: `refresh-${target.entityId}`,
        category: "REFRESH",
        title: `Predictive Refresh: ${target.title}`,
        targetSlug: target.urlSlug,
        priority: target.urgency,
        impact: target.urgency === "CRITICAL" ? "HIGH" : "MEDIUM",
        estimatedSeoGain: "+18% CTR Retention",
        estimatedTimeMinutes: 12,
        confidence: target.confidence,
        reasoning: target.reasoning,
        score: Math.round(target.predictedDecayScore * 100)
      });
    }

    // 3. Content Expansion Recommendations
    const expansions = await ContentExpansionPlannerService.planExpansions();
    for (const exp of expansions) {
      recommendations.push({
        id: `expand-${exp.entityId}`,
        category: "EXPAND",
        title: `Expand Thin Guide: ${exp.title}`,
        targetSlug: exp.urlSlug,
        priority: exp.expansionPriority,
        impact: "HIGH",
        estimatedSeoGain: "+30% Topical Depth",
        estimatedTimeMinutes: 22,
        confidence: exp.confidence,
        reasoning: exp.reasoning,
        score: Math.round((exp.targetWordCount - exp.currentWordCount) / 20)
      });
    }

    return recommendations;
  }
}
