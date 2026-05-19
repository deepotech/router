// @ts-nocheck
import { HybridRetrievalResult } from "./retrieval-intelligence.service";
import { AnswerReliabilityResult } from "./answer-reliability.service";

export interface ExplanationTrace {
  timestamp: string;
  query: string;
  retrievalReasoning: string;
  entityWeightingVisibility: Record<string, number>;
  confidenceExplanation: string;
  troubleshootingReasoningTrace: string[];
  semanticJustification: string;
}

export class ExplainabilityService {
  /**
   * Generates a human-readable tracing report explaining WHY a specific answer
   * or troubleshooting path was chosen by the AI.
   */
  static generateTrace(
    query: string,
    retrievalResults: HybridRetrievalResult[],
    reliabilityResult: AnswerReliabilityResult,
    decisionSteps: string[]
  ): ExplanationTrace {
    const topResult = retrievalResults[0];

    const retrievalReasoning = topResult
      ? `Selected top result (ID: ${topResult.id}) due to high hybrid score (${topResult.finalScore.toFixed(2)}). Semantic relevance: ${topResult.factors.semanticRelevance.toFixed(2)}, Trust Score: ${topResult.factors.trustScore.toFixed(2)}.`
      : "No suitable semantic matches found. Falling back to base generation.";

    const entityWeightingVisibility = topResult
      ? {
          semanticRelevanceWeight: 0.4,
          trustScoreWeight: 0.2,
          entityAuthorityWeight: 0.15,
          troubleshootingSuccessWeight: 0.2,
          freshnessWeight: 0.05,
        }
      : {};

    const confidenceExplanation = reliabilityResult.isReliable
      ? `Answer deemed reliable (Score: ${reliabilityResult.reliabilityScore.toFixed(2)}). Hallucination risk is low (${reliabilityResult.signals.hallucinationRisk.toFixed(2)}).`
      : `Answer rejected due to low reliability (Score: ${reliabilityResult.reliabilityScore.toFixed(2)}). Escalation required.`;

    const semanticJustification = topResult
      ? `The chosen fix aligns historically with past successful resolutions for similar models.`
      : `Generated theoretically safe diagnostic steps based on generalized networking principles.`;

    return {
      timestamp: new Date().toISOString(),
      query,
      retrievalReasoning,
      entityWeightingVisibility,
      confidenceExplanation,
      troubleshootingReasoningTrace: decisionSteps,
      semanticJustification,
    };
  }
}
