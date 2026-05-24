"use client";

import React from "react";
import { AlertTriangle, Cpu, Globe, ShieldAlert, Wrench, Zap } from "lucide-react";

// =============================================================
// BrandIssueComponents — Shared reusable brand troubleshooting
// components for Router Brand Authority pages (Phase A+).
// All config-driven — no hardcoded brand logic inside pages.
// =============================================================

// ─── BrandRouterBadge ────────────────────────────────────────

export interface BrandRouterBadgeProps {
  brandName: string;
  seriesLabel?: string;
  accentColor?: "blue" | "orange" | "purple" | "emerald" | "amber" | "red";
  icon?: "router" | "wifi" | "cpu";
}

const accentMap: Record<NonNullable<BrandRouterBadgeProps["accentColor"]>, {
  border: string;
  bg: string;
  text: string;
  dot: string;
  glow: string;
}> = {
  blue:    { border: "border-blue-800/50",    bg: "bg-blue-950/20",    text: "text-blue-300",    dot: "bg-blue-400",    glow: "shadow-blue-900/30" },
  orange:  { border: "border-orange-800/50",  bg: "bg-orange-950/20",  text: "text-orange-300",  dot: "bg-orange-400",  glow: "shadow-orange-900/30" },
  purple:  { border: "border-purple-800/50",  bg: "bg-purple-950/20",  text: "text-purple-300",  dot: "bg-purple-400",  glow: "shadow-purple-900/30" },
  emerald: { border: "border-emerald-800/50", bg: "bg-emerald-950/20", text: "text-emerald-300", dot: "bg-emerald-400", glow: "shadow-emerald-900/30" },
  amber:   { border: "border-amber-800/50",   bg: "bg-amber-950/20",   text: "text-amber-300",   dot: "bg-amber-400",   glow: "shadow-amber-900/30" },
  red:     { border: "border-red-800/50",     bg: "bg-red-950/20",     text: "text-red-300",     dot: "bg-red-400",     glow: "shadow-red-900/30" },
};

export function BrandRouterBadge({
  brandName,
  seriesLabel,
  accentColor = "blue",
  icon = "router",
}: BrandRouterBadgeProps) {
  const a = accentMap[accentColor];
  const Icon = icon === "cpu" ? Cpu : icon === "wifi" ? Zap : Wrench;

  return (
    <div
      className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-xl border ${a.border} ${a.bg} shadow-lg ${a.glow} backdrop-blur-sm`}
      role="img"
      aria-label={`${brandName} router diagnostics badge`}
    >
      <span className={`w-2 h-2 rounded-full animate-pulse ${a.dot}`} />
      <Icon size={13} className={a.text} aria-hidden="true" />
      <span className={`text-xs font-bold tracking-wide ${a.text}`}>
        {brandName}
        {seriesLabel && (
          <span className="ml-1.5 font-normal opacity-70">{seriesLabel}</span>
        )}
      </span>
    </div>
  );
}

// ─── ISPWarningBanner ─────────────────────────────────────────

export interface ISPWarningBannerProps {
  title: string;
  body: string;
  escalationSteps?: string[];
  variant?: "warning" | "danger" | "info";
}

const ispVariantMap = {
  warning: {
    border: "border-amber-800/40",
    bg: "bg-amber-950/10",
    iconColor: "text-amber-400",
    titleColor: "text-amber-400",
    stepDot: "bg-amber-800/50 text-amber-300",
  },
  danger: {
    border: "border-red-800/40",
    bg: "bg-red-950/10",
    iconColor: "text-red-400",
    titleColor: "text-red-400",
    stepDot: "bg-red-800/50 text-red-300",
  },
  info: {
    border: "border-blue-800/40",
    bg: "bg-blue-950/10",
    iconColor: "text-blue-400",
    titleColor: "text-blue-400",
    stepDot: "bg-blue-800/50 text-blue-300",
  },
};

export function ISPWarningBanner({
  title,
  body,
  escalationSteps,
  variant = "warning",
}: ISPWarningBannerProps) {
  const v = ispVariantMap[variant];
  return (
    <div className={`p-5 rounded-2xl border ${v.border} ${v.bg} space-y-3`}>
      <div className="flex items-start gap-3">
        <Globe size={16} className={`${v.iconColor} flex-shrink-0 mt-0.5`} aria-hidden="true" />
        <div className="flex-1 space-y-1.5">
          <h4 className={`text-xs font-bold uppercase tracking-wider ${v.titleColor}`}>
            {title}
          </h4>
          <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">{body}</p>
        </div>
      </div>
      {escalationSteps && escalationSteps.length > 0 && (
        <ol className="space-y-1.5 pl-2">
          {escalationSteps.map((step, i) => (
            <li key={i} className="flex items-start gap-2 text-[10px] text-[var(--text-muted)]">
              <span className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-bold ${v.stepDot}`}>
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

// ─── HardwareFailureCard ──────────────────────────────────────

export interface HardwareFailureIndicator {
  component: string;
  failureSign: string;
  severity: "low" | "medium" | "high";
  action: string;
}

export interface HardwareFailureCardProps {
  brandName: string;
  indicators: HardwareFailureIndicator[];
  replacementAdvice?: string;
}

const severityConfig = {
  low:    { dot: "bg-emerald-400", text: "text-emerald-400", label: "Low Risk" },
  medium: { dot: "bg-amber-400",   text: "text-amber-400",   label: "Monitor" },
  high:   { dot: "bg-red-400",     text: "text-red-400",     label: "Replace" },
};

export function HardwareFailureCard({
  brandName,
  indicators,
  replacementAdvice,
}: HardwareFailureCardProps) {
  return (
    <section
      className="glass-card border border-[var(--border-subtle)] rounded-2xl overflow-hidden"
      aria-labelledby="hw-failure-title"
    >
      <div className="px-5 py-4 border-b border-[var(--border-subtle)] flex items-center gap-2 bg-[var(--bg-elevated)]">
        <AlertTriangle size={14} className="text-amber-400" aria-hidden="true" />
        <h3 id="hw-failure-title" className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
          {brandName} Hardware Failure Indicators
        </h3>
      </div>
      <div className="divide-y divide-[var(--border-subtle)]">
        {indicators.map((item, i) => {
          const sc = severityConfig[item.severity];
          return (
            <div key={i} className="px-5 py-3 grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-3 items-start text-[11px]">
              <div>
                <p className="font-semibold text-[var(--text-primary)]">{item.component}</p>
              </div>
              <div className="sm:col-span-1">
                <p className="text-[var(--text-secondary)] leading-relaxed">{item.failureSign}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${sc.dot}`} />
                <span className={`font-mono font-bold ${sc.text}`}>{sc.label}</span>
              </div>
              <div>
                <p className="text-[var(--text-muted)] italic leading-relaxed">{item.action}</p>
              </div>
            </div>
          );
        })}
      </div>
      {replacementAdvice && (
        <div className="px-5 py-4 bg-[var(--bg-elevated)] border-t border-[var(--border-subtle)]">
          <div className="flex gap-2 items-start">
            <ShieldAlert size={13} className="text-[var(--brand-400)] flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-[10px] text-[var(--text-muted)] leading-relaxed italic">
              <strong className="text-[var(--text-secondary)] not-italic">When replacement is more cost-effective:</strong>{" "}
              {replacementAdvice}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
