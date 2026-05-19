import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { prisma } from "../db/prisma";
import { QualityService } from "./quality.service";

export class ContentGovernanceService {
  /**
   * Generates a WiFi setup guide, scores it, and saves it ONLY if it passes quality checks.
   */
  static async generateAndScoreSetupGuide(router: any) {
    console.log(`[Governance] Generating guide for ${router.name}`);
    
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `
        You are a Staff Network Engineer.
        Write a highly technical, step-by-step WiFi setup guide for the router: ${router.brand.name} ${router.name}.
        Default IP: ${router.loginIps[0]}
        Use Markdown. Include sections for:
        - Prerequisites
        - Connecting to the Admin Panel
        - Changing SSID and Password
      `,
    });

    const evaluation = QualityService.evaluateContent(text, "GUIDE");

    if (!evaluation.passed) {
      console.error(`[Governance] Guide rejected for ${router.name}. Issues:`, evaluation.issues);
      // We could throw an error to make BullMQ retry
      throw new Error(`Quality check failed: ${evaluation.issues.join(", ")}`);
    }

    // Save to database
    await prisma.routerModel.update({
      where: { id: router.id },
      data: { wifiSetupGuide: text },
    });

    console.log(`[Governance] Guide approved and saved for ${router.name}`);
  }

  static async generateAndScoreFaqs(router: any) {
    // Similar logic but for generating a JSON array of FAQs, parsing, and scoring them.
    console.log(`[Governance] Generating FAQs for ${router.name}`);
  }
}
