import { prisma } from "../db/prisma";

export interface ExpansionDirective {
  entityId: number;
  entityType: "ROUTER" | "PROBLEM" | "IP";
  title: string;
  urlSlug: string;
  currentWordCount: number;
  targetWordCount: number;
  missingSections: string[];
  expansionPriority: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  confidence: number;
  reasoning: string;
}

export class ContentExpansionPlannerService {
  /**
   * Scans existing pages and identifies thin articles requiring expansion directives.
   */
  public static async planExpansions(): Promise<ExpansionDirective[]> {
    const directives: ExpansionDirective[] = [];

    // Scan Router Models
    const models = await prisma.routerModel.findMany({
      take: 40,
      include: { resources: true }
    });

    for (const model of models) {
      const guideLength = (model.wifiSetupGuide?.length || 0) + (model.resetGuide?.length || 0);
      const approxWordCount = Math.round(guideLength / 5);
      const isThin = approxWordCount < 1200;

      if (isThin) {
        const missingSections: string[] = [];
        if (!model.hasVpnServer) missingSections.push("VPN Server & Passthrough Configuration");
        if (!model.supportsWpa3) missingSections.push("WPA3 / WPA2 Security Migration Guide");
        if (model.resources.length === 0) missingSections.push("Official Manual & Firmware Binary Downloads");
        missingSections.push("Troubleshooting Common Connection Drops & LED Diagnostic Lights");

        directives.push({
          entityId: model.id,
          entityType: "ROUTER",
          title: model.name,
          urlSlug: `/routers/${model.slug}`,
          currentWordCount: Math.max(approxWordCount, 450),
          targetWordCount: 2200,
          missingSections,
          expansionPriority: approxWordCount < 600 ? "CRITICAL" : "HIGH",
          confidence: 93,
          reasoning: `Word count (~${approxWordCount} words) is below target authority threshold (2,200 words). Missing ${missingSections.length} core sections.`
        });
      }
    }

    // Scan Problems
    const problems = await prisma.problem.findMany({ take: 30 });
    for (const problem of problems) {
      const len = problem.content?.length || 0;
      const wordCount = Math.round(len / 5);
      if (wordCount < 1500) {
        directives.push({
          entityId: problem.id,
          entityType: "PROBLEM",
          title: problem.title,
          urlSlug: `/problems/${problem.slug}`,
          currentWordCount: wordCount,
          targetWordCount: 2000,
          missingSections: ["OS-Specific Fix Steps (Windows 11, macOS Sonoma, iOS, Android)", "Hardware Master Reset Procedure"],
          expansionPriority: "HIGH",
          confidence: 89,
          reasoning: `Diagnostic guide word count (${wordCount} words) lacks multi-OS step-by-step resolution sections.`
        });
      }
    }

    return directives;
  }
}
