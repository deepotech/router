import { prisma } from "../db/prisma";

export interface SerpAlert {
  entityId: number;
  entityType: "ROUTER" | "PROBLEM" | "IP";
  urlSlug: string;
  alertType: "RANK_DROP" | "FEATURED_SNIPPET_OPPORTUNITY" | "PAA_EXPANSION" | "AI_OVERVIEW_TRIGGER";
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  confidence: number;
  reasoning: string;
}

export class SerpChangeService {
  /**
   * Scans and monitors SERP signals to flag pages needing refresh or structural schema optimization.
   */
  public static async detectSerpChanges(): Promise<SerpAlert[]> {
    const alerts: SerpAlert[] = [];

    // Analyze Router Models with analytics
    const models = await prisma.routerModel.findMany({
      take: 50,
      include: { analytics: true }
    });

    for (const model of models) {
      const impressions = model.analytics?.monthlyImpressions || 0;
      const decay = model.decayScore || 0;

      if (decay > 0.5) {
        alerts.push({
          entityId: model.id,
          entityType: "ROUTER",
          urlSlug: `/routers/${model.slug}`,
          alertType: "RANK_DROP",
          severity: decay > 0.75 ? "CRITICAL" : "HIGH",
          confidence: 91,
          reasoning: `Decay score ${decay.toFixed(2)} detected due to unrefreshed content over 180 days.`
        });
      }

      if (impressions > 20000 && (!model.faqs || (model.faqs as any[]).length < 3)) {
        alerts.push({
          entityId: model.id,
          entityType: "ROUTER",
          urlSlug: `/routers/${model.slug}`,
          alertType: "FEATURED_SNIPPET_OPPORTUNITY",
          severity: "HIGH",
          confidence: 88,
          reasoning: `High impressions (${impressions}/mo) but insufficient FAQ schema structure (< 3 FAQs).`
        });
      }
    }

    // Analyze Problems
    const problems = await prisma.problem.findMany({ take: 30 });
    for (const problem of problems) {
      if (!problem.content || problem.content.length < 1500) {
        alerts.push({
          entityId: problem.id,
          entityType: "PROBLEM",
          urlSlug: `/problems/${problem.slug}`,
          alertType: "AI_OVERVIEW_TRIGGER",
          severity: "MEDIUM",
          confidence: 84,
          reasoning: `Content length (< 1,500 chars) is vulnerable to Google AI Overviews without rich structured steps.`
        });
      }
    }

    return alerts;
  }
}
