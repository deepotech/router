import { AIRecommendation, RecommendationEngineService } from "./recommendation-engine.service";

export interface ExecutionDecision {
  recommendationId: string;
  action: "EXECUTE" | "SCHEDULE" | "IGNORE";
  rank: number;
  score: number;
  recommendation: AIRecommendation;
  decisionReason: string;
}

export class AIDecisionEngineService {
  /**
   * Evaluates raw AI recommendations, eliminates duplicates/conflicts, and assigns explicit execution decisions.
   */
  public static async makeDecisions(minConfidence = 70): Promise<ExecutionDecision[]> {
    const rawRecommendations = await RecommendationEngineService.generateRecommendations();

    // Filter by confidence threshold
    const qualified = rawRecommendations.filter(r => r.confidence >= minConfidence);

    // Sort by calculated score descending
    qualified.sort((a, b) => b.score - a.score);

    const decisions: ExecutionDecision[] = [];
    const seenSlugs = new Set<string>();

    let rank = 1;
    for (const rec of qualified) {
      if (seenSlugs.has(rec.targetSlug)) {
        decisions.push({
          recommendationId: rec.id,
          action: "IGNORE",
          rank: 999,
          score: rec.score,
          recommendation: rec,
          decisionReason: `Conflicting/duplicate recommendation ignored for target ${rec.targetSlug}.`
        });
        continue;
      }

      seenSlugs.add(rec.targetSlug);

      const action = rec.score >= 80 ? "EXECUTE" : "SCHEDULE";

      decisions.push({
        recommendationId: rec.id,
        action,
        rank: rank++,
        score: rec.score,
        recommendation: rec,
        decisionReason: action === "EXECUTE"
          ? `High ROI score (${rec.score}) & high confidence (${rec.confidence}%). Queued for immediate execution.`
          : `Moderate ROI score (${rec.score}). Scheduled for upcoming editorial batch.`
      });
    }

    return decisions;
  }
}
