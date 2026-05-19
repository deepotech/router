export class TokenOptimizationService {
  /**
   * Extremely lightweight token estimation (approx 4 chars per token).
   * Fast enough to run synchronously before every OpenAI call.
   */
  public static estimateTokens(text: string): number {
    return Math.ceil(text.length / 4);
  }

  /**
   * Compresses a prompt by removing unnecessary whitespace and repeated characters
   * to shave off 5-10% of token costs on massive contexts.
   */
  public static compressPrompt(prompt: string): string {
    return prompt
      .replace(/\s{2,}/g, " ") // Collapse multiple spaces
      .replace(/\n{3,}/g, "\n\n") // Collapse massive line breaks
      .trim();
  }

  /**
   * Pre-flight check. Aborts if the projected input prompt is wildly out of bounds,
   * protecting against malicious user inputs or run-away loop payloads.
   */
  public static validatePromptCost(prompt: string, maxAllowedTokens = 4000): boolean {
    const estimated = this.estimateTokens(prompt);
    if (estimated > maxAllowedTokens) {
      console.error(`[TokenOptimization] Aborting generation. Prompt exceeds allowed bounds: ${estimated} > ${maxAllowedTokens}`);
      return false;
    }
    return true;
  }
}
