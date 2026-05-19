import { prisma } from "../db/prisma";
import { SemanticChunkingService } from "./semantic-chunking.service";

export class CrawlRiskService {
  /**
   * Calculates the overall crawl risk of publishing an entity.
   * If risk > 0.8, the entity should NOT be published.
   */
  public static async calculateCrawlRisk(
    title: string,
    textContent: string,
    entityType: string
  ): Promise<number> {
    let riskScore = 0.0;

    // 1. Thin Content Check (< 200 words is usually considered thin for troubleshooting)
    const wordCount = textContent.split(/\s+/).length;
    if (wordCount < 100) {
      riskScore += 0.8; 
    } else if (wordCount < 250) {
      riskScore += 0.4;
    }

    // 2. Duplicate Intent Check
    // We check if an entity with a very similar title already exists
    const similarTitles = await prisma.semanticChunk.count({
      where: {
        entityType: entityType as any,
        title: { contains: title, mode: "insensitive" }
      }
    });

    if (similarTitles > 1) {
      riskScore += 0.5; // Cannibalization risk
    }

    // 3. Exact Duplicate Hash Check
    const fullHash = SemanticChunkingService.generateSemanticHash(textContent);
    const exactDuplicates = await prisma.semanticChunk.count({
      where: { semanticHash: fullHash }
    });

    if (exactDuplicates > 0) {
      riskScore += 1.0; // Absolute duplication, instant fail
    }

    return Math.min(riskScore, 1.0);
  }

  /**
   * Boolean helper to determine if indexing is safe.
   */
  public static async shouldIndex(title: string, textContent: string, entityType: string): Promise<boolean> {
    const risk = await this.calculateCrawlRisk(title, textContent, entityType);
    return risk < 0.5;
  }
}
