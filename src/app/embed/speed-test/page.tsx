import { SpeedTestTool } from "@/components/tools/SpeedTestTool";
import { APP_URL } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Embeddable Internet Speed Test | RouterVia",
  description: "A lightweight, embeddable internet speed test widget.",
  robots: {
    index: false, // Don't index the naked iframe URL
    follow: true,
  },
};

export default function EmbedSpeedTestPage() {
  return (
    <div className="min-h-screen bg-transparent p-4 flex flex-col font-sans">
      <div className="flex-1 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl overflow-hidden shadow-lg flex flex-col">
        {/* Tool Header */}
        <div className="bg-[var(--bg-elevated)] p-3 border-b border-[var(--border-subtle)] flex items-center justify-between">
          <span className="text-sm font-bold text-[var(--text-primary)]">
            Internet Speed Test
          </span>
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--brand-400)] hover:text-[var(--brand-300)] font-semibold transition-colors flex items-center gap-1"
          >
            Powered by RouterVia
          </a>
        </div>
        
        {/* Tool Body */}
        <div className="p-4 flex-1">
           {/* Reusing the existing SpeedTestTool component but wrapping it cleanly for iframe context */}
           <SpeedTestTool />
        </div>
      </div>
    </div>
  );
}
