"use client";

import { useState } from "react";
import { Gauge, Loader2, Download, Upload, Clock } from "lucide-react";

interface SpeedResult {
  download: number;
  upload: number;
  ping: number;
}

async function measureDownload(): Promise<number> {
  const url = "https://speed.cloudflare.com/__down?bytes=10000000";
  const start = Date.now();
  const res = await fetch(url + "&nocache=" + Date.now());
  const blob = await res.blob();
  const duration = (Date.now() - start) / 1000;
  return (blob.size * 8) / duration / 1_000_000; // Mbps
}

async function measureUpload(): Promise<number> {
  const data = new Uint8Array(2_000_000);
  const start = Date.now();
  await fetch("https://speed.cloudflare.com/__up", {
    method: "POST",
    body: data,
  }).catch(() => {});
  const duration = (Date.now() - start) / 1000;
  return (data.length * 8) / duration / 1_000_000;
}

async function measurePing(): Promise<number> {
  const start = Date.now();
  await fetch("https://speed.cloudflare.com/__down?bytes=0&nocache=" + Date.now());
  return Date.now() - start;
}

export function SpeedTestTool() {
  const [result, setResult] = useState<SpeedResult | null>(null);
  const [phase, setPhase] = useState<"idle" | "ping" | "download" | "upload" | "done">("idle");

  async function run() {
    setResult(null);
    setPhase("ping");
    const ping = await measurePing();
    setPhase("download");
    const download = await measureDownload();
    setPhase("upload");
    const upload = await measureUpload();
    setResult({ download, upload, ping });
    setPhase("done");
  }

  const loading = phase !== "idle" && phase !== "done";

  return (
    <div className="glass-card p-6 md:p-8 text-center flex-1 flex flex-col justify-center">
      {phase === "idle" && (
        <>
          <div className="w-20 h-20 rounded-full bg-[var(--bg-elevated)] border-2 border-[var(--border-default)] flex items-center justify-center mx-auto mb-6">
            <Gauge size={36} className="text-[var(--text-muted)]" />
          </div>
          <p className="text-[var(--text-secondary)] mb-6">Click to start a speed test using Cloudflare&apos;s servers.</p>
          <button className="inline-flex items-center gap-2 justify-center rounded-xl bg-[var(--brand-600)] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[var(--brand-500)]/20 hover:bg-[var(--brand-500)] hover:-translate-y-0.5 hover:shadow-[var(--brand-500)]/40 transition-all focus:outline-none focus:ring-2 focus:ring-[var(--brand-400)] focus:ring-offset-2 focus:ring-offset-[var(--bg-base)]" onClick={run} id="speed-test-btn">
            <Gauge size={18} /> Start Speed Test
          </button>
        </>
      )}

      {loading && (
        <div className="py-4">
          <Loader2 size={40} className="text-[var(--brand-400)] mx-auto mb-4 animate-spin" />
          <p className="text-lg font-semibold text-[var(--text-primary)] mb-1 capitalize">
            Testing {phase}...
          </p>
          <p className="text-sm text-[var(--text-muted)]">Please wait, do not close this tab</p>
        </div>
      )}

      {result && phase === "done" && (
        <div className="animate-fade-in-up">
          <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6">
            <div className="bg-[var(--bg-elevated)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)]">
              <Download size={20} className="text-[var(--brand-400)] mx-auto mb-2" />
              <p className="text-xl md:text-2xl font-extrabold text-[var(--text-primary)]">{result.download.toFixed(1)}</p>
              <p className="text-[10px] md:text-xs text-[var(--text-muted)] mt-1">Mbps Down</p>
            </div>
            <div className="bg-[var(--bg-elevated)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)]">
              <Upload size={20} className="text-emerald-400 mx-auto mb-2" />
              <p className="text-xl md:text-2xl font-extrabold text-[var(--text-primary)]">{result.upload.toFixed(1)}</p>
              <p className="text-[10px] md:text-xs text-[var(--text-muted)] mt-1">Mbps Up</p>
            </div>
            <div className="bg-[var(--bg-elevated)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)]">
              <Clock size={20} className="text-amber-400 mx-auto mb-2" />
              <p className="text-xl md:text-2xl font-extrabold text-[var(--text-primary)]">{result.ping}</p>
              <p className="text-[10px] md:text-xs text-[var(--text-muted)] mt-1">ms Ping</p>
            </div>
          </div>
          <button className="inline-flex items-center gap-2 justify-center rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-strong)] px-6 py-2.5 text-sm font-bold text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-all" onClick={run}>
            <Gauge size={15} /> Run Again
          </button>
        </div>
      )}
    </div>
  );
}
