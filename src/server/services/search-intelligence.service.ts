import { prisma } from "../db/prisma";

export interface IntentClassificationResult {
  entityId: number;
  entityType: "ROUTER" | "PROBLEM" | "IP";
  primaryIntent: "COMMERCIAL" | "TROUBLESHOOTING" | "CONFIGURATION" | "BUYING" | "DEVICE_SPECIFIC";
  commercialScore: number;
  informationalScore: number;
  confidence: number;
  reasoning: string;
}

export class SearchIntelligenceService {
  /**
   * Evaluates and classifies search intent across all published router models, problems, and IPs.
   */
  public static async analyzeAllIntents(): Promise<IntentClassificationResult[]> {
    const results: IntentClassificationResult[] = [];

    // 1. Analyze Router Models
    const routerModels = await prisma.routerModel.findMany({
      take: 100,
      include: { brand: true, analytics: true }
    });

    for (const model of routerModels) {
      const isHighEndSpec = (model.maxSpeedMbps || 0) > 3000 || (model.ramMB || 0) >= 512 || model.hasVpnServer;
      const isConfigOnly = model.loginIps.length > 0 && !!model.defaultPassword;
      
      let primaryIntent: IntentClassificationResult["primaryIntent"] = "DEVICE_SPECIFIC";
      let commercialScore = 0.5;
      let informationalScore = 0.8;
      let confidence = 85;
      let reasoning = `Classified as device-specific for model ${model.name}.`;

      if (isHighEndSpec) {
        primaryIntent = "BUYING";
        commercialScore = 0.85;
        informationalScore = 0.90;
        confidence = 92;
        reasoning = `High-end hardware specs (RAM: ${model.ramMB || 0}MB, Speed: ${model.maxSpeedMbps || 0}Mbps) indicate buying & specs research intent.`;
      } else if (isConfigOnly) {
        primaryIntent = "CONFIGURATION";
        commercialScore = 0.20;
        informationalScore = 0.95;
        confidence = 88;
        reasoning = `Configuration credentials & default gateway IP (${model.loginIps.join(", ")}) indicate technical setup intent.`;
      }

      // Sync with RouterAnalytics
      await prisma.routerAnalytics.upsert({
        where: { routerId: model.id },
        update: {
          commercialIntentScore: commercialScore,
          informationalIntentScore: informationalScore
        },
        create: {
          routerId: model.id,
          commercialIntentScore: commercialScore,
          informationalIntentScore: informationalScore,
          popularityScore: 50.0,
          evergreenScore: 1.0,
          monthlyImpressions: 1000
        }
      });

      results.push({
        entityId: model.id,
        entityType: "ROUTER",
        primaryIntent,
        commercialScore,
        informationalScore,
        confidence,
        reasoning
      });
    }

    // 2. Analyze Problems
    const problems = await prisma.problem.findMany({ take: 50 });
    for (const problem of problems) {
      results.push({
        entityId: problem.id,
        entityType: "PROBLEM",
        primaryIntent: "TROUBLESHOOTING",
        commercialScore: 0.15,
        informationalScore: 0.98,
        confidence: 95,
        reasoning: `Problem article '${problem.title}' directly matches diagnostic troubleshooting intent.`
      });
    }

    return results;
  }
}
