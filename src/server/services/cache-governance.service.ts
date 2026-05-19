import { SemanticMemoryService } from "./semantic-memory.service";
import { SemanticGovernanceService } from "./semantic-governance.service";

export class CacheGovernanceService {
  /**
   * Final gate before allowing a generation to be cached in Semantic Memory.
   * Prevents poisoning the cache with hallucinated IP ranges or duplicate intent.
   */
  public static async evaluateAndStore(
    prompt: string,
    generatedContent: string,
    entityType: string,
    entityId: number,
    ips: string[] = []
  ) {
    // 1. Run through the Phase D Governance Gate
    const governance = await SemanticGovernanceService.evaluateEntity(
      `Cache Evaluation for ${entityType}`, // Mock title for cache evaluation
      generatedContent,
      entityType,
      entityId,
      ips
    );

    if (!governance.isSafe) {
      console.warn(`[CacheGovernance] Refusing to cache content due to safety risk. Hallucination: ${governance.hallucinationScore}`);
      return false;
    }

    // 2. Synthesize a Trust Score (1.0 - penalties)
    const trustScore = 1.0 - governance.hallucinationScore - (governance.crawlRiskScore * 0.5);

    if (trustScore >= 0.8) {
      await SemanticMemoryService.storeMemory(prompt, generatedContent, trustScore, entityType);
      return true;
    }

    return false;
  }
}
