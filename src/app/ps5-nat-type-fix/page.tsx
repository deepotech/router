import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import { Target, ShieldAlert } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "How to Fix PS5 NAT Type 3 to Open NAT Type 2 — RouterVia",
  description:
    "Solve PS5 NAT Type Failed, strict NAT Type 3, or chat connectivity errors. Detailed instructions for static IP, UPnP, and PSN port forwarding.",
  canonical: "/ps5-nat-type-fix",
  keywords: [
    "ps5 nat type fix",
    "fix nat type 3 ps5",
    "ps5 nat type failed",
    "playstation 5 ports to forward",
    "how to change nat type on ps5",
    "ps5 open nat type 2",
  ],
});

const breadcrumbs = [
  { name: "Gaming Tools", url: "/nat-type-checker" },
  { name: "PS5 NAT Type Fix", url: "/ps5-nat-type-fix" },
];

const steps = [
  {
    title: "Determine Your Current PS5 NAT Profile",
    description: "Go to your PS5 home screen, navigate to Settings -> Network -> Connection Status -> Test Internet Connection. Wait for the diagnostics to complete and write down your NAT Type (Type 1 is Open, Type 2 is Moderate, and Type 3 is Strict) and any error prompts such as 'NAT Type Failed'.",
    tip: "If you see Type 3, you are heavily restricted from P2P matchmaking and lobby voice chats.",
  },
  {
    title: "Assign a Static IP to Your PS5 Console",
    description: "To prevent your PS5's local IP address from changing, go to Settings -> Network -> Settings -> Set Up Internet Connection. Hover over your network, press the Options button on your controller, select 'Advanced Settings', change IP Address Settings to 'Manual', and assign a designated IP address (e.g. 192.168.1.150). Fill in your subnet mask (255.255.255.0) and default gateway (192.168.1.1).",
  },
  {
    title: "Enable Universal Plug and Play (UPnP) on Your Router",
    description: "Log into your router admin panel using your phone or PC. Locate the Advanced Network or NAT settings page, find the UPnP setting, and toggle it to 'Enabled'. Save changes and restart the router. For many gamers, this is the only step required to transition the PS5 to NAT Type 2.",
  },
  {
    title: "Set Up Custom Port Forwarding Rules for PlayStation Network",
    description: "If UPnP fails or remains Moderate, you must configure static port redirection. In your router's port forwarding section, add rules targeting your PS5's static IP: TCP Ports: 3478, 3479, 3480; UDP Ports: 3074, 3478, 3479. Apply and save the changes.",
    tip: "Some routers let you enter ranges. If so, configure TCP as 3478-3480 and UDP as 3074, 3478-3479.",
  },
  {
    title: "Opt-In for DMZ Configuration (Alternative Fix)",
    description: "If port forwarding seems too complex, you can temporarily assign your PS5 IP to the router's DMZ (Demilitarized Zone) settings. DMZ routes all incoming traffic straight to the PS5, bypassing the firewall completely. While unsafe for PCs, the PS5's closed sandbox architecture makes it safe to place in the DMZ.",
  },
];

const faqs = [
  {
    question: "What does 'PS5 NAT Type Failed' mean?",
    answer: "This error occurs when the console can communicate with the internet but cannot determine how the router handles translation. It's almost always caused by a Double NAT (two routers running simultaneously), strict firewall blockages from your ISP, or a blocked SIP ALG setting in your router.",
  },
  {
    question: "Can I get NAT Type 1 on my PS5?",
    answer: "NAT Type 1 is only possible if your PS5 is connected directly to your fiber/broadband modem without any router in between. Since a router is essential for home firewall security and connecting other devices, NAT Type 2 is the ideal target. NAT Type 2 gives you the same open, unrestricted multiplayer access as Type 1.",
  },
  {
    question: "Why does my PS5 keep disconnecting from voice chats?",
    answer: "PlayStation Party Chat runs over a P2P protocol. If you or someone in your lobby has NAT Type 3 (Strict), your systems cannot establish a direct audio handshake. Switching to NAT Type 2 resolves voice chat dropouts permanently.",
  },
];

export default async function Ps5NatTypeFixPage() {
  return (
    <TroubleshootingArticleShell
      h1="PS5 NAT Type Fix Guide"
      intro="Are you experiencing matchmaking errors, voice chat blockages, or a restrictive 'NAT Type 3' status on your PlayStation 5? Read our comprehensive tutorial to open your network."
      category="nat"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={steps}
    >
      <div className="space-y-6">
        {/* Core console advice block */}
        <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-2xl bg-gradient-to-br from-blue-950/10 via-transparent to-transparent space-y-4">
          <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <Target size={16} className="text-blue-400" />
            PlayStation 5 Recommended Settings
          </h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            For the best gaming performance on PS5, combine your NAT configurations with these high-speed public DNS settings in the console advanced menu:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-1">
              <span className="font-bold text-blue-400 block font-mono">Primary DNS (Cloudflare)</span>
              <p className="text-[10px] text-[var(--text-muted)] font-mono">1.1.1.1</p>
            </div>
            <div className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-1">
              <span className="font-bold text-blue-400 block font-mono">Secondary DNS (Google)</span>
              <p className="text-[10px] text-[var(--text-muted)] font-mono">8.8.8.8</p>
            </div>
          </div>
        </div>
      </div>
    </TroubleshootingArticleShell>
  );
}
