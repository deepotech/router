import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import { Zap, HelpCircle } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Best DNS Settings for PS5 | Low Latency PS5 DNS — RouterVia",
  description:
    "Discover the absolute best DNS settings for PS5 to improve download speeds and reduce matchmaking latency. Step-by-step PlayStation 5 configuration.",
  canonical: "/best-dns-for-ps5",
  keywords: [
    "best dns for ps5",
    "playstation 5 dns settings",
    "fastest dns for ps5",
    "reduce ps5 ping",
    "ps5 download speed dns",
  ],
});

const breadcrumbs = [
  { name: "Gaming Tools", url: "/nat-type-checker" },
  { name: "Best DNS for PS5", url: "/best-dns-for-ps5" },
];

const steps = [
  {
    title: "Navigate to Your PS5 Network Settings Menu",
    description: "Turn on your PlayStation 5, go to the top right of the home dashboard, and select the Settings cog icon. Scroll down and click on Network -> Settings -> Set Up Internet Connection.",
  },
  {
    title: "Access the Advanced Settings for Your Connection",
    description: "Hover over your active internet connection (WiFi or Wired LAN), press the Options button (three horizontal lines) on your DualSense controller, and select 'Advanced Settings'.",
    tip: "Make sure you do this on the active connection currently marked with a green check.",
  },
  {
    title: "Switch DNS Settings to Manual",
    description: "Scroll down to 'DNS Settings' and change it from 'Automatic' to 'Manual'. This opens two new input rows: 'Primary DNS' and 'Secondary DNS'.",
  },
  {
    title: "Enter the Optimised Gaming DNS IP Addresses",
    description: "Enter Cloudflare's high-speed servers: Primary DNS: '1.1.1.1', Secondary DNS: '1.0.0.1'. Alternatively, use Google Public DNS: Primary DNS: '8.8.8.8', Secondary DNS: '8.8.4.4'. Select 'OK' to save configurations.",
    tip: "You can test different providers to see which has the fastest routing for your local ISP.",
  },
  {
    title: "Run a PS5 Network Diagnostic Check",
    description: "The console will automatically reconnect to your network. Click 'Test Internet Connection' and wait for the results. You should observe a rapid hostname lookup and excellent, stable upload and download speeds.",
  },
];

const faqs = [
  {
    question: "Will changing DNS increase my raw PS5 download speed?",
    answer: "Yes. Many default ISP DNS servers have slow resolution times and poor CDN caching. By switching your PS5 to a premium public DNS like Cloudflare or Google, your console will resolve the hostnames of PlayStation's content delivery networks (CDNs) much faster, which can trigger higher parallel download streams and faster updates.",
  },
  {
    question: "Does changing DNS solve the 'PS5 WS-116520-5' update error?",
    answer: "Yes. This PlayStation Network error is typically caused by a failure to resolve the official update hostnames. Overriding your automatic ISP DNS settings and inputting Google's public IP (8.8.8.8) or Cloudflare's (1.1.1.1) immediately bypasses the routing block and allows the update to download successfully.",
  },
  {
    question: "Is it safe to change DNS on my PS5?",
    answer: "Absolutely. Using reputable public DNS providers like Cloudflare, Google, or Quad9 is completely safe and highly recommended by network professionals. They offer much stronger privacy guardrails, faster lookup routing, and cleaner caching infrastructure than standard residential ISPs.",
  },
];

export default async function BestDnsForPs5Page() {
  return (
    <TroubleshootingArticleShell
      h1="Best DNS for PS5 Settings"
      intro="Struggling with slow PlayStation Store downloads, server communication time-outs, or high matchmaking queue times on your PS5? Learn how to configure custom DNS settings for maximum speed."
      category="dns"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={steps}
    >
      <div className="space-y-6">
        {/* Comparison grid for PS5 */}
        <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-2xl bg-gradient-to-br from-blue-950/10 via-transparent to-transparent space-y-4">
          <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <Zap size={16} className="text-blue-400" />
            Top DNS Recommendations for PlayStation 5
          </h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            These three public DNS clusters consistently score the lowest resolution latency and cleanest routing indexes on the PlayStation Network:
          </p>

          <div className="space-y-3">
            <div className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-[var(--text-primary)] block">Cloudflare DNS</span>
                <span className="text-[10px] text-[var(--text-muted)]">Fastest overall resolution times for online multiplayer.</span>
              </div>
              <div className="text-right font-mono text-[var(--text-secondary)]">
                <span className="block text-[var(--text-primary)] font-semibold">1.1.1.1</span>
                <span className="block text-[10px] text-[var(--text-muted)]">1.0.0.1</span>
              </div>
            </div>
            <div className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-[var(--text-primary)] block">Google Public DNS</span>
                <span className="text-[10px] text-[var(--text-muted)]">Highly robust download cache routing for large game patches.</span>
              </div>
              <div className="text-right font-mono text-[var(--text-secondary)]">
                <span className="block text-[var(--text-primary)] font-semibold">8.8.8.8</span>
                <span className="block text-[10px] text-[var(--text-muted)]">8.8.4.4</span>
              </div>
            </div>
            <div className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-[var(--text-primary)] block">Quad9 DNS</span>
                <span className="text-[10px] text-[var(--text-muted)]">Combines fast connectivity with security blocklists against phishing.</span>
              </div>
              <div className="text-right font-mono text-[var(--text-secondary)]">
                <span className="block text-[var(--text-primary)] font-semibold">9.9.9.9</span>
                <span className="block text-[10px] text-[var(--text-muted)]">149.112.112.112</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TroubleshootingArticleShell>
  );
}
