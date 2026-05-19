export interface ReliabilitySignals {
  entityConfidence: number;
  supportingEvidenceCount: number;
  semanticConsistency: number;
  contradictionRisk: number;
  hallucinationRisk: number;
  troubleshootingValidation: number;
  historicalSuccessRates: number;
}

export interface AnswerReliabilityResult {
  reliabilityScore: number;
  isReliable: boolean;
  signals: ReliabilitySignals;
  escalationRequired: boolean;
  fallbackTriggered: boolean;
}

export class AnswerReliabilityService {
  private static readonly RELIABILITY_THRESHOLD = 0.75;
  private static readonly CRITICAL_HALLUCINATION_THRESHOLD = 0.3;

  /**
   * Scores the reliability of an AI-generated answer before releasing it.
   */
  static evaluateAnswer(
    answerText: string,
    signals: ReliabilitySignals
  ): AnswerReliabilityResult {
    // Weight the signals
    let reliabilityScore =
      signals.entityConfidence * 0.2 +
      Math.min(signals.supportingEvidenceCount * 0.1, 0.2) +
      signals.semanticConsistency * 0.2 -
      signals.contradictionRisk * 0.2 -
      signals.hallucinationRisk * 0.3 +
      signals.troubleshootingValidation * 0.15 +
      signals.historicalSuccessRates * 0.15;

    // Normalize between 0 and 1
    reliabilityScore = Math.max(0, Math.min(1, reliabilityScore));

    const isReliable = reliabilityScore >= this.RELIABILITY_THRESHOLD;
    const escalationRequired = signals.hallucinationRisk > this.CRITICAL_HALLUCINATION_THRESHOLD;
    const fallbackTriggered = !isReliable;

    return {
      reliabilityScore,
      isReliable,
      signals,
      escalationRequired,
      fallbackTriggered,
    };
  }

  /**
   * Provides the fallback behavior when the AI answer is deemed unreliable.
   */
  static generateFallbackResponse(): string {
    return "I'm currently unable to verify this troubleshooting step with high confidence. Please consult the official router manual or try resetting your router to factory defaults before proceeding.";
  }
}
