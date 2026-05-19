import { SeoKillSwitchService } from "./seo-kill-switch.service";
import { TokenOptimizationService } from "./token-optimization.service";

export class AiBudgetGuardService {
  // Mocked state for token counting in a vertical slice.
  // Must use Redis incrementers in production.
  private static dailyTokensUsed = 0;
  
  private static readonly SOFT_LIMIT = 500_000;
  private static readonly HARD_LIMIT = 1_000_000;

  /**
   * Evaluates if a generation is safe to run given current token projections.
   */
  public static canAfford(prompt: string): boolean {
    const projectedCost = TokenOptimizationService.estimateTokens(prompt);
    
    if (this.dailyTokensUsed + projectedCost >= this.HARD_LIMIT) {
      SeoKillSwitchService.freezeAiGeneration("Projected AI Token Hard Limit Exceeded");
      return false;
    }
    return true;
  }

  /**
   * Tracks token usage and evaluates budget safety.
   */
  public static recordUsage(tokens: number) {
    this.dailyTokensUsed += tokens;
    this.evaluateBudget();
  }

  private static evaluateBudget() {
    if (this.dailyTokensUsed >= this.HARD_LIMIT) {
      SeoKillSwitchService.freezeAiGeneration("Daily AI Token Hard Limit Exceeded");
    } else if (this.dailyTokensUsed >= this.SOFT_LIMIT) {
      console.warn(`⚠️ [AiBudgetGuard] Soft limit reached (${this.dailyTokensUsed} tokens). Low-priority queues should pause.`);
    }
  }

  public static getUsage() {
    return this.dailyTokensUsed;
  }

  public static resetDailyUsage() {
    this.dailyTokensUsed = 0;
  }
}
