import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import GamingToolShell from "@/components/tools/GamingToolShell";
import { Server, Zap, Shield, HelpCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Best DNS Servers for Gaming | Low Ping DNS Rankings — RouterVia",
  description:
    "Find the lowest latency public DNS servers optimized for multiplayer gaming. Get IP addresses and setups for Cloudflare, Google DNS, and Quad9.",
  canonical: "/best-dns-for-gaming",
  keywords: [
    "best dns for gaming",
    "lowest latency dns",
    "fastest gaming dns",
    "cloudflare dns gaming",
    "google dns ip address",
    "reduce gaming ping with dns",
  ],
});

const breadcrumbs = [
  { name: "Gaming Tools", url: "/nat-type-checker" },
  { name: "Best DNS for Gaming", url: "/best-dns-for-gaming" },
];

const dnsList = [
  {
    provider: "Cloudflare",
    primary: "1.1.1.1",
    secondary: "1.0.0.1",
    latency: "Under 12ms",
    focus: "Absolute Speed & Privacy",
    tags: ["Fastest Resolution", "DNSSEC Enabled", "No Logs"],
    color: "border-orange-500/20 text-orange-400 bg-orange-950/10",
  },
  {
    provider: "Google Public DNS",
    primary: "8.8.8.8",
    secondary: "8.8.4.4",
    latency: "14ms - 18ms",
    focus: "Global Stability & Caching",
    tags: ["Massive Distribution", "Excellent Routing", "IPv6 Supported"],
    color: "border-blue-500/20 text-blue-400 bg-blue-950/10",
  },
  {
    provider: "Quad9",
    primary: "9.9.9.9",
    secondary: "149.112.112.112",
    latency: "15ms - 20ms",
    focus: "Security & Threat Blocking",
    tags: ["Anti-Malware", "Privacy Safeguard", "Swiss-Based"],
    color: "border-purple-500/20 text-purple-400 bg-purple-950/10",
  },
  {
    provider: "OpenDNS Home",
    primary: "208.67.222.222",
    secondary: "208.67.220.220",
    latency: "18ms - 25ms",
    focus: "Web Filters & Parental Safety",
    tags: ["Custom Profiles", "Phishing Protection", "Cisco Core"],
    color: "border-teal-500/20 text-teal-400 bg-teal-950/10",
  },
];

const faqs = [
  {
    question: "Does DNS reduce my in-game multiplayer ping?",
    answer: "No, DNS does not lower your actual in-game packet transit ping (which depends on physical routing paths to the game servers). However, it dramatically reduces DNS resolution latency (hostname translation). This means matchmaking handshakes, lobby loading times, and global server synchronization occur much faster.",
  },
  {
    question: "How do I change the DNS servers on my home router?",
    answer: "1. Log into your router admin panel (usually 192.168.1.1). 2. Find the WAN or DNS settings under Setup/Network. 3. Select 'Use These DNS Servers' (instead of automatic). 4. Enter Cloudflare's primary (1.1.1.1) and secondary (1.0.0.1) IPs. 5. Save settings and reboot your router.",
  },
  {
    question: "Is it better to change DNS on my router or my console?",
    answer: "Changing DNS on your router updates all connected devices in your household. However, if your router is locked by your ISP, you can manually change DNS in your PS5, Xbox, or PC network configuration page. The device settings will always override router-level defaults.",
  },
];

export default function BestDnsForGamingPage() {
  return (
    <GamingToolShell
      h1="Best DNS Servers for Gaming"
      intro="Accelerate server handshakes and optimize multiplayer lobby matching by selecting high-performance recursive public resolvers instead of sluggish default ISP DNS servers."
      toolType="dns-gaming"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
    >
      <div className="space-y-6">
        {/* Comparison Table/Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dnsList.map((dns) => (
            <div
              key={dns.provider}
              className={`p-5 rounded-2xl border bg-[var(--bg-elevated)] hover:bg-[var(--bg-surface)] transition-all duration-300 flex flex-col justify-between gap-4 ${dns.color}`}
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">
                    {dns.provider}
                  </h3>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] font-mono">
                    {dns.latency}
                  </span>
                </div>
                <p className="text-[11px] text-[var(--text-muted)] italic">
                  {dns.focus}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {dns.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] px-2 py-0.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* IP addresses display */}
              <div className="p-3 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-subtle)] space-y-2 font-mono text-xs">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-[var(--text-muted)]">Primary DNS:</span>
                  <span className="font-bold text-[var(--text-primary)] select-all">
                    {dns.primary}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-[var(--text-muted)]">Secondary DNS:</span>
                  <span className="font-bold text-[var(--text-primary)] select-all">
                    {dns.secondary}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Informative tutorial step block */}
        <div className="p-6 border border-emerald-900/30 bg-emerald-900/5 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <Zap size={16} className="text-emerald-400" />
            Quick Optimization Hack
          </h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Changing your DNS settings from your ISP's automatic server to Cloudflare (1.1.1.1) or Google Public DNS (8.8.8.8) is the single most effective free network upgrade you can perform. It eliminates lookup delays when loading new web pages, matching lobbies, or loading game assets.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl">
              <span className="font-bold text-emerald-400 block mb-1">1. IP Resolution</span>
              <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">Resolvers map friendly domain names to numeric IPs instantly.</p>
            </div>
            <div className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl">
              <span className="font-bold text-emerald-400 block mb-1">2. Packet Routing</span>
              <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">Direct routing skips bottlenecked local DNS caches.</p>
            </div>
            <div className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl">
              <span className="font-bold text-emerald-400 block mb-1">3. Lobby Match</span>
              <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">Fast queries result in faster matchmaking queue handshakes.</p>
            </div>
          </div>
        </div>
      </div>
    </GamingToolShell>
  );
}
