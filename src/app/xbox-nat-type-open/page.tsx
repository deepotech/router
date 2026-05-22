import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import { ShieldCheck, Info } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "How to Get Xbox Open NAT Type | Strict NAT Fix — RouterVia",
  description:
    "Get an Open NAT type on your Xbox Series X, Series S, or Xbox One. Step-by-step instructions for UPnP, port forwarding, and custom DNS settings.",
  canonical: "/xbox-nat-type-open",
  keywords: [
    "xbox open nat type",
    "xbox strict nat fix",
    "change nat type xbox",
    "xbox series x port forwarding",
    "xbox double nat detected",
    "how to get open nat on xbox",
  ],
});

const breadcrumbs = [
  { name: "Gaming Tools", url: "/nat-type-checker" },
  { name: "Xbox NAT Type Open", url: "/xbox-nat-type-open" },
];

const steps = [
  {
    title: "Check Your Xbox Current NAT Status",
    description: "Press the Xbox button on your controller to open the guide, select Profile & System -> Settings -> General -> Network Settings. Under 'Current Network Status', observe your NAT Type (Open, Moderate, or Strict) and look for specific error prompts like 'Double NAT detected' or 'UPnP Not Successful'.",
    tip: "If your NAT is 'Open', your console has optimal connectivity and you do not need to make changes.",
  },
  {
    title: "Reserve a Static IP for Your Xbox Console",
    description: "Configure your router DHCP settings to bind your Xbox console's MAC address to a permanent, static local IP address (e.g. 192.168.1.160). This ensures your port forwarding rules never break due to dynamic IP re-allocation.",
    tip: "You can find your Xbox MAC address under General -> Network Settings -> Advanced Settings -> IP Settings.",
  },
  {
    title: "Enable Universal Plug and Play (UPnP)",
    description: "Open your router's web admin page and toggle UPnP to Enabled. Many modern routers use UPnP to automatically establish the necessary Xbox Live inbound mapping paths on demand.",
  },
  {
    title: "Add Xbox Live Port Forwarding Rules",
    description: "If your NAT type remains Moderate or Strict after enabling UPnP, configure manual port forwarding. Navigate to the router's port forwarding section and create these redirect rules pointing to your Xbox's static IP: TCP Port: 3074; UDP Ports: 88, 500, 3074, 3544, 4500. Save and apply settings.",
    tip: "Xbox Live relies heavily on port 3074 (both TCP and UDP) for secure peer-to-peer matchmaking.",
  },
  {
    title: "Trigger a Port Refresh via Xbox Network Settings",
    description: "If your NAT is still Moderate, you can force the console to select an alternate port. Go to Network Settings -> Advanced Settings -> Alternate Port Selection. Select 'Manual', choose a different port from the dropdown list (e.g. 49000-52000 range), and verify if your NAT type transitions to 'Open'.",
  },
];

const faqs = [
  {
    question: "What is the difference between Xbox Open, Moderate, and Strict NAT?",
    answer: "Open NAT lets you connect to any player, host games, and chat without restrictions. Moderate NAT lets you join games and chat, but you might experience delays and cannot host lobbies for players with strict profiles. Strict NAT blocks multiplayer hosting and voice chats entirely, limiting your matching exclusively to players with Open profiles.",
  },
  {
    question: "What should I do if my Xbox reports 'Double NAT detected'?",
    answer: "This means your home network has two active routers translation layers. Log into your primary ISP gateway/modem and change it to 'Bridge Mode', or log into your secondary router and change it to 'Access Point (AP)' or 'Bridge' mode. This consolidates DHCP routing to a single gateway.",
  },
  {
    question: "How do I fix the 'UPnP Not Successful' error on Xbox?",
    answer: "This means the console requested a port map but the router ignored or refused the handshake. To fix this: 1. Toggle UPnP OFF in your router settings, reboot the router, and toggle it back ON. 2. Ensure your router firmware is fully updated. 3. If UPnP continues to fail, disable it completely and configure manual port forwarding.",
  },
];

export default async function XboxNatTypeOpenPage() {
  return (
    <TroubleshootingArticleShell
      h1="Xbox NAT Type Open Guide"
      intro="Tired of disconnected parties, lobby connection errors, and matchmaking wait times on your Xbox console? Read our ultimate tutorial to open your NAT."
      category="nat"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={steps}
    >
      <div className="space-y-6">
        {/* Core console advice block */}
        <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-2xl bg-gradient-to-br from-emerald-950/10 via-transparent to-transparent space-y-4">
          <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <ShieldCheck size={16} className="text-emerald-400" />
            Xbox Recommended DNS Configuration
          </h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Boost hostname lookups and lobby handshakes by entering these high-performance independent DNS IPs in your Xbox Advanced Network panel:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-1">
              <span className="font-bold text-emerald-400 block font-mono">Primary DNS (Cloudflare)</span>
              <p className="text-[10px] text-[var(--text-muted)] font-mono">1.1.1.1</p>
            </div>
            <div className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-1">
              <span className="font-bold text-emerald-400 block font-mono">Secondary DNS (Google)</span>
              <p className="text-[10px] text-[var(--text-muted)] font-mono">8.8.8.8</p>
            </div>
          </div>
        </div>
      </div>
    </TroubleshootingArticleShell>
  );
}
