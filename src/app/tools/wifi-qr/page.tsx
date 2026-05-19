"use client";

import { useState } from "react";
import { Wifi, Lock, RefreshCw, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

const breadcrumbs = [
  { label: "Tools", href: "/tools" },
  { label: "WiFi QR Generator", href: "/tools/wifi-qr" },
];

export default function WifiQrPage() {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [security, setSecurity] = useState<"WPA" | "WEP" | "nopass">("WPA");
  const [qrSrc, setQrSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function generate() {
    if (!ssid) return;
    setLoading(true);
    const wifiString = `WIFI:T:${security};S:${ssid};P:${password};;`;
    // Use QR Server API (no install needed, client-side)
    const encoded = encodeURIComponent(wifiString);
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encoded}&bgcolor=0f1523&color=60a5fa&format=png`;
    setQrSrc(url);
    setLoading(false);
  }

  async function copyString() {
    const wifiString = `WIFI:T:${security};S:${ssid};P:${password};;`;
    await navigator.clipboard.writeText(wifiString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb items={breadcrumbs} className="mb-8" />

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-purple-900/20 flex items-center justify-center">
            <Wifi size={20} className="text-purple-400" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)]">
            WiFi QR Code Generator
          </h1>
        </div>
        <p className="text-[var(--text-secondary)]">
          Generate a scannable QR code to share your WiFi credentials — no typing needed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form */}
        <div className="glass-card p-6 space-y-4">
          <div>
            <label className="block text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2" htmlFor="wifi-ssid">
              Network Name (SSID)
            </label>
            <input
              id="wifi-ssid"
              type="text"
              value={ssid}
              onChange={(e) => setSsid(e.target.value)}
              placeholder="My Home WiFi"
              className="w-full px-4 py-2.5 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--brand-500)] focus:ring-1 focus:ring-[var(--brand-500)] text-sm transition-all"
            />
          </div>

          <div>
            <label className="block text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2" htmlFor="wifi-password">
              Password
            </label>
            <input
              id="wifi-password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter WiFi password"
              className="w-full px-4 py-2.5 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--brand-500)] focus:ring-1 focus:ring-[var(--brand-500)] text-sm transition-all"
            />
          </div>

          <div>
            <label className="block text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2">
              Security Type
            </label>
            <div className="flex gap-2">
              {(["WPA", "WEP", "nopass"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setSecurity(type)}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-all ${
                    security === type
                      ? "bg-[var(--brand-700)] border-[var(--brand-600)] text-white"
                      : "bg-[var(--bg-elevated)] border-[var(--border-default)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {type === "nopass" ? "Open" : type}
                </button>
              ))}
            </div>
          </div>

          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={generate}
            loading={loading}
            disabled={!ssid}
            id="generate-qr-btn"
          >
            <Wifi size={16} /> Generate QR Code
          </Button>
        </div>

        {/* QR Preview */}
        <div className="glass-card p-6 flex flex-col items-center justify-center min-h-[280px]">
          {qrSrc ? (
            <>
              <img
                src={qrSrc}
                alt={`QR code to join ${ssid} WiFi network`}
                width={200}
                height={200}
                className="rounded-xl mb-4"
              />
              <p className="text-xs text-[var(--text-muted)] mb-3">Scan to join <strong className="text-[var(--text-primary)]">{ssid}</strong></p>
              <div className="flex gap-2">
                <a
                  href={qrSrc}
                  download={`wifi-${ssid}-qr.png`}
                  className="text-xs text-[var(--brand-400)] hover:underline"
                >
                  Download PNG
                </a>
                <span className="text-[var(--border-default)]">·</span>
                <button onClick={copyString} className="text-xs text-[var(--brand-400)] hover:underline flex items-center gap-1">
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  {copied ? "Copied!" : "Copy string"}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="w-20 h-20 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center mx-auto mb-3">
                <Wifi size={32} className="text-[var(--text-muted)]" />
              </div>
              <p className="text-sm text-[var(--text-muted)]">QR code will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
