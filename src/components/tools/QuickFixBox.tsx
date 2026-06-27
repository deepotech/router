import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowRight, RefreshCw, BookOpen, ExternalLink } from "lucide-react";

interface QuickFixBoxProps {
  alternativeHostname: string;
  defaultIp: string;
  factoryResetUrl?: string;
  routerLoginGuideUrl?: string;
  brandLoginGuideUrl?: string;
  brandName: string;
}

export function QuickFixBox({
  alternativeHostname,
  defaultIp,
  factoryResetUrl = "/router-reset",
  routerLoginGuideUrl = "/router-login",
  brandLoginGuideUrl,
  brandName,
}: QuickFixBoxProps) {
  // Slugify IP helper
  const getIpSlug = (ip: string) => ip.replace(/\./g, "-");

  return (
    <div className="relative p-6 rounded-2xl border border-red-800/40 bg-gradient-to-br from-red-950/15 via-[var(--bg-surface)] to-[var(--bg-elevated)] overflow-hidden shadow-lg mb-8">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none text-red-500">
        <ShieldAlert size={120} />
      </div>
      
      <h3 className="text-base font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
        <ShieldAlert size={20} className="text-red-400" />
        Quick Fix Diagnostics
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div className="p-3.5 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)]">
          <span className="block text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider mb-1">Alternative Hostname</span>
          <span className="font-mono text-sm font-bold text-[var(--text-primary)]">{alternativeHostname}</span>
        </div>
        <div className="p-3.5 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)]">
          <span className="block text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider mb-1">Default IP Address</span>
          <Link href={`/ips/${getIpSlug(defaultIp)}`} className="font-mono text-sm font-bold text-[var(--brand-400)] hover:underline flex items-center gap-1">
            {defaultIp} <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <a
          href={`http://${defaultIp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-800 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-all active:scale-[0.98]"
        >
          <ExternalLink size={14} /> Direct IP Login
        </a>
        <Link
          href={factoryResetUrl}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] hover:bg-[var(--bg-hover)] text-[var(--text-primary)] font-bold text-xs transition-all"
        >
          <RefreshCw size={14} className="text-amber-500" /> Factory Reset Guide
        </Link>
        <Link
          href={routerLoginGuideUrl}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] hover:bg-[var(--bg-hover)] text-[var(--text-primary)] font-bold text-xs transition-all"
        >
          <BookOpen size={14} className="text-blue-400" /> Router Login Guide
        </Link>
        {brandLoginGuideUrl && (
          <Link
            href={brandLoginGuideUrl}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] hover:bg-[var(--bg-hover)] text-[var(--text-primary)] font-bold text-xs transition-all"
          >
            <BookOpen size={14} className="text-emerald-400" /> {brandName} Guide
          </Link>
        )}
      </div>
    </div>
  );
}
