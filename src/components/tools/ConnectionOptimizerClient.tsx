"use client";

import dynamic from "next/dynamic";
import { Activity } from "lucide-react";

export type OptimizerMode =
  | "slow-router"
  | "dns-fix"
  | "ethernet-no-internet"
  | "gaming-settings"
  | "wifi-signal"
  | "router-restarts"
  | "mobile-no-internet"
  | "modem-sync"
  | "router-admin"
  | "dns-optimizer"
  | "ethernet-speed"
  | "dns-setup"
  | "latency";

export interface ConnectionOptimizerClientProps {
  mode: OptimizerMode;
}

// Dynamically import the heavy implementation with a CLS-safe fallback skeleton
const ConnectionOptimizerImpl = dynamic(
  () => import("./ConnectionOptimizerImpl"),
  {
    ssr: false,
    loading: () => (
      <div className="animate-pulse h-[450px] w-full bg-[var(--bg-elevated)]/50 rounded-2xl border border-[var(--border-subtle)] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 rounded-xl bg-[var(--brand-900)]/45 flex items-center justify-center mb-4">
          <Activity size={24} className="text-[var(--brand-400)] animate-spin" />
        </div>
        <div className="h-4 bg-slate-800 rounded w-1/3 mb-2.5"></div>
        <div className="h-3 bg-slate-800 rounded w-1/2"></div>
      </div>
    ),
  }
);

export default function ConnectionOptimizerClient(props: ConnectionOptimizerClientProps) {
  return <ConnectionOptimizerImpl {...props} />;
}
