import { prisma } from "../db/prisma";
import { DeviceLifecycle } from "@prisma/client";

export interface PredictiveRefreshTarget {
  entityId: number;
  entityType: "ROUTER" | "PROBLEM" | "IP";
  title: string;
  urlSlug: string;
  predictedDecayScore: number; // 0.0 to 1.0
  urgency: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  recommendedActions: string[];
  confidence: number;
  reasoning: string;
}

export class PredictiveRefreshService {
  /**
   * Calculates predictive decay and flags pages for refresh before traffic drops.
   */
  public static async calculateDecayAndQueues(): Promise<PredictiveRefreshTarget[]> {
    const targets: PredictiveRefreshTarget[] = [];

    const models = await prisma.routerModel.findMany({
      take: 40,
      include: { analytics: true, resources: true }
    });

    const now = new Date();

    for (const model of models) {
      let decayScore = model.decayScore || 0;

      // Factors calculating predictive decay:
      // 1. Lifecycle status (END_OF_LIFE / DISCONTINUED adds decay)
      if (model.lifecycle === DeviceLifecycle.END_OF_LIFE || model.lifecycle === DeviceLifecycle.DISCONTINUED) {
        decayScore += 0.35;
      }

      // 2. Refresh age (if lastRefreshedAt is > 120 days ago)
      if (model.lastRefreshedAt) {
        const daysSinceRefresh = Math.floor((now.getTime() - new Date(model.lastRefreshedAt).getTime()) / (1000 * 60 * 60 * 24));
        if (daysSinceRefresh > 120) {
          decayScore += Math.min(0.4, (daysSinceRefresh - 120) * 0.003);
        }
      } else {
        decayScore += 0.3; // Never refreshed
      }

      // 3. Firmware age (if no firmware resource attached)
      const hasFirmware = model.resources.some(r => r.resourceType === "FIRMWARE_BINARY");
      if (!hasFirmware) {
        decayScore += 0.2;
      }

      decayScore = Math.min(1.0, Math.round(decayScore * 100) / 100);

      if (decayScore > 0.45) {
        const urgency = decayScore > 0.75 ? "CRITICAL" : decayScore > 0.6 ? "HIGH" : "MEDIUM";
        const recommendedActions: string[] = [];

        if (!hasFirmware) recommendedActions.push("Attach latest 2026 firmware patch release notes");
        if (model.lifecycle === DeviceLifecycle.END_OF_LIFE) recommendedActions.push("Add Security End-of-Life warning badge and upgrade path recommendations");
        recommendedActions.push("Update Default IP Login procedure and screenshots for latest UI revision");

        targets.push({
          entityId: model.id,
          entityType: "ROUTER",
          title: model.name,
          urlSlug: `/routers/${model.slug}`,
          predictedDecayScore: decayScore,
          urgency,
          recommendedActions,
          confidence: 91,
          reasoning: `Predicted decay score is ${decayScore} (Last refreshed: ${model.lastRefreshedAt ? model.lastRefreshedAt.toISOString().split('T')[0] : 'Never'}, EOL: ${model.lifecycle}).`
        });
      }
    }

    return targets;
  }
}
