import { OptimizationOrchestratorService } from "./optimization-orchestrator.service";
import { SearchIntelligenceService } from "./search-intelligence.service";
import { EditorialPlannerService } from "./editorial-planner.service";
import { TopicGapService } from "./topic-gap.service";
import { KnowledgeOptimizerService } from "./knowledge-optimizer.service";

export interface ScheduledJobLog {
  jobName: string;
  frequency: "HOURLY" | "DAILY" | "WEEKLY" | "MONTHLY";
  executedAt: Date;
  status: "SUCCESS" | "FAILED";
  message: string;
}

export class OptimizationScheduler {
  private static logs: ScheduledJobLog[] = [];

  /**
   * Hourly Scheduled Job: Search Intent & SERP Monitoring
   */
  public static async runHourlyJob(): Promise<ScheduledJobLog> {
    try {
      const intents = await SearchIntelligenceService.analyzeAllIntents();
      const log: ScheduledJobLog = {
        jobName: "Hourly Search Intent & SERP Scan",
        frequency: "HOURLY",
        executedAt: new Date(),
        status: "SUCCESS",
        message: `Processed ${intents.length} search intent classifications.`
      };
      this.logs.unshift(log);
      return log;
    } catch (e: any) {
      const failLog: ScheduledJobLog = {
        jobName: "Hourly Search Intent & SERP Scan",
        frequency: "HOURLY",
        executedAt: new Date(),
        status: "FAILED",
        message: e.message || "Unknown error"
      };
      this.logs.unshift(failLog);
      return failLog;
    }
  }

  /**
   * Daily Scheduled Job: Daily Editorial Queue Generation
   */
  public static async runDailyJob(): Promise<ScheduledJobLog> {
    try {
      const plan = await EditorialPlannerService.generateDailyEditorialPlan();
      const log: ScheduledJobLog = {
        jobName: "Daily Editorial Queue Generation",
        frequency: "DAILY",
        executedAt: new Date(),
        status: "SUCCESS",
        message: `Scheduled ${plan.totalActionsScheduled} editorial actions across publishing & refresh queues.`
      };
      this.logs.unshift(log);
      return log;
    } catch (e: any) {
      const failLog: ScheduledJobLog = {
        jobName: "Daily Editorial Queue Generation",
        frequency: "DAILY",
        executedAt: new Date(),
        status: "FAILED",
        message: e.message || "Unknown error"
      };
      this.logs.unshift(failLog);
      return failLog;
    }
  }

  /**
   * Weekly Scheduled Job: Topic Gap Discovery & Coverage Saturation
   */
  public static async runWeeklyJob(): Promise<ScheduledJobLog> {
    try {
      const gaps = await TopicGapService.discoverGaps();
      const log: ScheduledJobLog = {
        jobName: "Weekly Topic Gap & Saturation Audit",
        frequency: "WEEKLY",
        executedAt: new Date(),
        status: "SUCCESS",
        message: `Discovered ${gaps.length} broad topic gap opportunities.`
      };
      this.logs.unshift(log);
      return log;
    } catch (e: any) {
      const failLog: ScheduledJobLog = {
        jobName: "Weekly Topic Gap & Saturation Audit",
        frequency: "WEEKLY",
        executedAt: new Date(),
        status: "FAILED",
        message: e.message || "Unknown error"
      };
      this.logs.unshift(failLog);
      return failLog;
    }
  }

  /**
   * Monthly Scheduled Job: Knowledge Graph Audit & Link Healing
   */
  public static async runMonthlyJob(): Promise<ScheduledJobLog> {
    try {
      const graphReport = await KnowledgeOptimizerService.auditAndRepairGraph();
      const log: ScheduledJobLog = {
        jobName: "Monthly Knowledge Graph Healing Audit",
        frequency: "MONTHLY",
        executedAt: new Date(),
        status: "SUCCESS",
        message: `Graph Health: ${graphReport.graphHealthIndex}%, Healed ${graphReport.healedRelationsCount} edges.`
      };
      this.logs.unshift(log);
      return log;
    } catch (e: any) {
      const failLog: ScheduledJobLog = {
        jobName: "Monthly Knowledge Graph Healing Audit",
        frequency: "MONTHLY",
        executedAt: new Date(),
        status: "FAILED",
        message: e.message || "Unknown error"
      };
      this.logs.unshift(failLog);
      return failLog;
    }
  }

  public static getJobLogs(): ScheduledJobLog[] {
    return this.logs;
  }
}
