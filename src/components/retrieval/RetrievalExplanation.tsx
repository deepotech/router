import React from "react";
import { Info } from "lucide-react";

interface RetrievalExplanationProps {
  resolutionRate: number; // e.g. 0.81 for 81%
  relatedIssue: string; // e.g. "DNS failures"
  actionTaken: string; // e.g. "changing upstream DNS"
  confidenceScore: number;
}

export function RetrievalExplanation({
  resolutionRate,
  relatedIssue,
  actionTaken,
  confidenceScore
}: RetrievalExplanationProps) {
  // Suppress entirely if telemetry confidence is too low
  if (confidenceScore < 0.6) return null;

  const percentage = Math.round(resolutionRate * 100);

  return (
    <div className="flex items-start gap-3 p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/20 mt-6" data-nosnippet="false">
      <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
      <p className="text-sm text-neutral-300 leading-relaxed m-0">
        <strong className="text-indigo-300 font-semibold">{percentage}%</strong> of similar <span className="font-medium text-neutral-200">{relatedIssue}</span> resolved after <span className="font-medium text-neutral-200">{actionTaken}</span>.
      </p>
    </div>
  );
}
