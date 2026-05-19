import React from "react";
import { CheckCircle, AlertTriangle, Zap, Server } from "lucide-react";

interface RetrievalAnswerBlockProps {
  quickAnswer: string;
  diagnosticSummary: string[];
  retrievalTierUsed: 0 | 1 | 2;
  semanticConfidence: number;
  estimatedResolutionComplexity: "LOW" | "MEDIUM" | "HIGH";
  recommendedNextStep: string;
}

export function RetrievalAnswerBlock({
  quickAnswer,
  diagnosticSummary,
  retrievalTierUsed,
  semanticConfidence,
  estimatedResolutionComplexity,
  recommendedNextStep
}: RetrievalAnswerBlockProps) {
  
  // Format percentage deterministic
  const confidenceStr = (semanticConfidence * 100).toFixed(1) + "%";
  
  const complexityColor = 
    estimatedResolutionComplexity === "LOW" ? "text-green-400 bg-green-400/10" :
    estimatedResolutionComplexity === "MEDIUM" ? "text-amber-400 bg-amber-400/10" :
    "text-red-400 bg-red-400/10";

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden mb-8" data-nosnippet="false">
      <div className="p-5 border-b border-neutral-800 bg-neutral-800/30 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-3">
          <Zap className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-bold text-white m-0">AI Retrieval Summary</h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2 py-1 rounded bg-neutral-800 text-neutral-400 border border-neutral-700 flex items-center gap-1">
            <Server className="w-3 h-3" /> Tier {retrievalTierUsed}
          </span>
          <span className="px-2 py-1 rounded bg-neutral-800 text-neutral-400 border border-neutral-700">
            Confidence: <span className="text-white font-semibold">{confidenceStr}</span>
          </span>
          <span className={`px-2 py-1 rounded border border-transparent ${complexityColor} font-semibold`}>
            Complexity: {estimatedResolutionComplexity}
          </span>
        </div>
      </div>
      
      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-2">Quick Answer</h3>
          <p className="text-neutral-200 text-base leading-relaxed font-medium">
            {quickAnswer}
          </p>
        </div>

        {diagnosticSummary.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-2">Diagnostic Signals</h3>
            <ul className="space-y-1">
              {diagnosticSummary.map((sig, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-neutral-300">
                  <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <span>{sig}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {recommendedNextStep && (
          <div className="pt-2 border-t border-neutral-800/50 mt-4">
            <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-2">Recommended Next Step</h3>
            <p className="flex items-center gap-2 text-sm text-blue-300 font-medium">
              <CheckCircle className="w-4 h-4 text-blue-400" />
              {recommendedNextStep}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
