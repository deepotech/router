import { AIDecisionEngineService, ExecutionDecision } from "./decision-engine.service";

export interface DailyEditorialQueue {
  generatedAt: Date;
  publishingQueue: ExecutionDecision[];
  refreshQueue: ExecutionDecision[];
  expansionQueue: ExecutionDecision[];
  reviewQueue: ExecutionDecision[];
  archiveQueue: ExecutionDecision[];
  totalActionsScheduled: number;
}

export class EditorialPlannerService {
  /**
   * Generates the automated daily editorial plan grouped by actionable queues.
   */
  public static async generateDailyEditorialPlan(): Promise<DailyEditorialQueue> {
    const decisions = await AIDecisionEngineService.makeDecisions();

    const publishingQueue = decisions.filter(d => d.recommendation.category === "PUBLISH" && d.action === "EXECUTE");
    const refreshQueue = decisions.filter(d => d.recommendation.category === "REFRESH" && d.action === "EXECUTE");
    const expansionQueue = decisions.filter(d => d.recommendation.category === "EXPAND" && d.action === "EXECUTE");
    const reviewQueue = decisions.filter(d => d.action === "SCHEDULE");
    const archiveQueue: ExecutionDecision[] = [];

    return {
      generatedAt: new Date(),
      publishingQueue,
      refreshQueue,
      expansionQueue,
      reviewQueue,
      archiveQueue,
      totalActionsScheduled: publishingQueue.length + refreshQueue.length + expansionQueue.length + reviewQueue.length
    };
  }
}
