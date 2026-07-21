import { SearchIntelligenceService } from "./search-intelligence.service";
import { SerpChangeService } from "./serp-change.service";
import { TopicGapService } from "./topic-gap.service";
import { EntityCoverageService } from "./entity-coverage.service";
import { ContentExpansionPlannerService } from "./content-expansion-planner.service";
import { PredictiveRefreshService } from "./predictive-refresh.service";
import { SemanticClusterOptimizerService } from "./semantic-cluster.service";
import { CompetitorIntelligenceService } from "./competitor-intelligence.service";
import { KnowledgeOptimizerService } from "./knowledge-optimizer.service";
import { EditorialPlannerService } from "./editorial-planner.service";
import { OptimizationFeedbackService } from "./optimization-feedback.service";

export interface SystemOrchestrationSummary {
  timestamp: Date;
  searchIntelligenceCount: number;
  serpAlertsCount: number;
  topicGapsCount: number;
  coverageMetricsCount: number;
  expansionsPlannedCount: number;
  refreshTargetsCount: number;
  semanticClustersCount: number;
  knowledgeGraphHealthIndex: number;
  dailyEditorialQueueTotal: number;
  averageSystemConfidence: number;
}

export class OptimizationOrchestratorService {
  /**
   * Orchestrates execution across all independent optimization services without tight coupling.
   */
  public static async runFullOrchestration(): Promise<SystemOrchestrationSummary> {
    console.log("⚡ Starting Autonomous AI Optimization Orchestration...");

    const [
      searchIntents,
      serpAlerts,
      topicGaps,
      coverage,
      expansions,
      refreshes,
      clusters,
      competitors,
      graphReport,
      editorialPlan,
      feedback
    ] = await Promise.all([
      SearchIntelligenceService.analyzeAllIntents(),
      SerpChangeService.detectSerpChanges(),
      TopicGapService.discoverGaps(),
      EntityCoverageService.analyzeCoverage(),
      ContentExpansionPlannerService.planExpansions(),
      PredictiveRefreshService.calculateDecayAndQueues(),
      SemanticClusterOptimizerService.optimizeClusters(),
      CompetitorIntelligenceService.evaluateEntityBenchmarks(),
      KnowledgeOptimizerService.auditAndRepairGraph(),
      EditorialPlannerService.generateDailyEditorialPlan(),
      OptimizationFeedbackService.evaluateFeedback()
    ]);

    const avgConfidence = Math.round(
      (searchIntents.reduce((acc, i) => acc + i.confidence, 0) / Math.max(1, searchIntents.length) +
        serpAlerts.reduce((acc, a) => acc + a.confidence, 0) / Math.max(1, serpAlerts.length) +
        topicGaps.reduce((acc, g) => acc + g.confidence, 0) / Math.max(1, topicGaps.length)) / 3
    );

    console.log(`✅ Orchestration Completed. Average System AI Confidence: ${avgConfidence}%`);

    return {
      timestamp: new Date(),
      searchIntelligenceCount: searchIntents.length,
      serpAlertsCount: serpAlerts.length,
      topicGapsCount: topicGaps.length,
      coverageMetricsCount: coverage.length,
      expansionsPlannedCount: expansions.length,
      refreshTargetsCount: refreshes.length,
      semanticClustersCount: clusters.length,
      knowledgeGraphHealthIndex: graphReport.graphHealthIndex,
      dailyEditorialQueueTotal: editorialPlan.totalActionsScheduled,
      averageSystemConfidence: avgConfidence
    };
  }
}
