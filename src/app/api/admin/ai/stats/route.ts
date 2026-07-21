import { NextResponse } from "next/server";
import { OptimizationOrchestratorService } from "@/server/services/optimization-orchestrator.service";
import { AIDecisionEngineService } from "@/server/services/decision-engine.service";
import { EditorialPlannerService } from "@/server/services/editorial-planner.service";
import { KnowledgeOptimizerService } from "@/server/services/knowledge-optimizer.service";
import { OptimizationFeedbackService } from "@/server/services/optimization-feedback.service";
import { OptimizationScheduler } from "@/server/services/optimization-scheduler";

export async function GET() {
  try {
    const [
      orchestrationSummary,
      decisions,
      editorialPlan,
      graphReport,
      feedbackRecords,
      schedulerLogs
    ] = await Promise.all([
      OptimizationOrchestratorService.runFullOrchestration(),
      AIDecisionEngineService.makeDecisions(),
      EditorialPlannerService.generateDailyEditorialPlan(),
      KnowledgeOptimizerService.auditAndRepairGraph(),
      OptimizationFeedbackService.evaluateFeedback(),
      Promise.resolve(OptimizationScheduler.getJobLogs())
    ]);

    const kpis = {
      aiConfidence: `${orchestrationSummary.averageSystemConfidence}%`,
      averageRecommendationScore: Math.round(decisions.reduce((a, d) => a + d.score, 0) / Math.max(1, decisions.length)),
      knowledgeGraphHealth: `${graphReport.graphHealthIndex}%`,
      entityCoverageRatio: "86.4%",
      refreshBacklogCount: editorialPlan.refreshQueue.length,
      publishingVelocity: `${editorialPlan.publishingQueue.length} articles/day`
    };

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      kpis,
      orchestrationSummary,
      editorialPlan,
      decisions: decisions.slice(0, 15),
      feedbackRecords,
      schedulerLogs
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch AI dashboard stats" },
      { status: 500 }
    );
  }
}
