import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import { Key, ShieldAlert } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Complete Router Port Forwarding Guide | Open NAT Tutorial — RouterVia",
  description:
    "Learn how to configure port forwarding on any router. Step-by-step instructions for TP-Link, ASUS, Netgear, Linksys, and standard gaming ports.",
  canonical: "/port-forwarding-guide",
  keywords: [
    "how to port forward",
    "router port forwarding guide",
    "open router ports",
    "port forward tutorial",
    "gaming ports table",
    "static ip setup",
  ],
});

const breadcrumbs = [
  { name: "Gaming Tools", url: "/nat-type-checker" },
  { name: "Port Forwarding Guide", url: "/port-forwarding-guide" },
];

const steps = [
  {
    title: "Reserve a Static IP Address for Your Device",
    description: "By default, your router uses DHCP to assign temporary, dynamic IP addresses. If your console or PC reboots, it might get a new IP address, which breaks your port forwarding rules. Log into your router, find the DHCP Client List or Address Reservation section, and bind your system's physical MAC address to a permanent, static local IP (e.g. 192.168.1.150).",
    tip: "You can also manually set a static IP address in the network configuration settings of your PS5, Xbox, or Windows PC, but router-level reservation is cleaner.",
  },
  {
    title: "Log Into Your Router's Administration Console",
    description: "Open a web browser on a device connected to your network and enter your router's default gateway IP address (commonly 192.168.1.1 or 192.168.0.1) in the address bar. Enter the administrative username and password (found on the sticker underneath your router if you haven't changed it).",
    tip: "If you don't know your router IP, use our IP checkers or check the default gateway in your computer network diagnostics.",
  },
  {
    title: "Navigate to the Port Forwarding Settings Section",
    description: "Look for a tab or menu labelled 'Port Forwarding', 'Virtual Server', 'NAT / QoS', 'Applications & Gaming', or 'Advanced Settings'. The location varies by manufacturer but is almost always nested under advanced firewall or routing options.",
  },
  {
    title: "Create a New Port Forwarding Rule",
    description: "Click 'Add New', 'Create Rule', or 'Add Custom Service'. Enter a descriptive name (e.g. 'PS5 Gaming'), select the protocol (TCP, UDP, or Both), and enter the internal and external port numbers. Finally, enter the static local IP address you reserved in Step 1.",
    tip: "Make sure you double check whether the rule is active by ticking the 'Enable' checkbox.",
  },
  {
    title: "Save Changes and Restart Your Router",
    description: "Apply or save the rule. Many routers require a reboot to flush active NAT tables and apply permanent port redirection maps. Reboot the router from the administrative console or unplug it for 10 seconds.",
  },
];

const faqs = [
  {
    question: "Is port forwarding safe?",
    answer: "Yes, port forwarding is safe for dedicated gaming systems like PlayStation or Xbox because these consoles do not run standard background services or exploitable operating system software. However, forwarding ports to a Windows PC or server does expose those services directly to the internet, so ensure you have a robust firewall active.",
  },
  {
    question: "What is the difference between TCP and UDP?",
    answer: "TCP (Transmission Control Protocol) is connection-oriented and guarantees that all data packets arrive in order (used for chat, game updates, and matchmaking). UDP (User Datagram Protocol) is connectionless and focuses on raw speed, sending data instantly without checking order (used for live real-time position sync and in-game movement).",
  },
  {
    question: "Why is my port forwarding not working after setup?",
    answer: "This is usually caused by: 1) Your device's local IP address changed because it wasn't set to static, 2) You have a Double NAT (two routers running simultaneously), 3) Your ISP has placed you behind a CGNAT (Carrier-Grade NAT) which blocks inbound port forwarding entirely, or 4) An antivirus firewall software is blocking the port locally.",
  },
];

export default async function PortForwardingGuidePage() {
  return (
    <TroubleshootingArticleShell
      h1="Router Port Forwarding Guide"
      intro="Learn how to open specific incoming network channels on your router to establish an Open NAT type, reduce server latency, and guarantee stable connection handshakes."
      category="nat"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={steps}
    >
      <div className="space-y-6">
        {/* Core Ports Table */}
        <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <Key size={16} className="text-cyan-400" />
            Common Gaming & Platform Ports
          </h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            When configuring custom rules, use these official reference ports for major gaming platforms and game services:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-[var(--text-muted)] font-mono">
                  <th className="py-2.5 pr-4 font-semibold uppercase">Platform / Service</th>
                  <th className="py-2.5 px-4 font-semibold uppercase">TCP Ports</th>
                  <th className="py-2.5 pl-4 font-semibold uppercase">UDP Ports</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-secondary)] font-mono">
                <tr>
                  <td className="py-3 pr-4 font-bold text-[var(--text-primary)]">PlayStation Network (PSN)</td>
                  <td className="py-3 px-4">3478, 3479, 3480</td>
                  <td className="py-3 pl-4">3074, 3478, 3479</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-[var(--text-primary)]">Xbox Live</td>
                  <td className="py-3 px-4">3074</td>
                  <td className="py-3 pl-4">88, 500, 3074, 3544, 4500</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-[var(--text-primary)]">Steam client</td>
                  <td className="py-3 px-4">27014-27050</td>
                  <td className="py-3 pl-4">27015-27030, 27036</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-[var(--text-primary)]">Nintendo Switch</td>
                  <td className="py-3 px-4">6667, 12400, 28910</td>
                  <td className="py-3 pl-4">1-65535 (Or dynamic UPnP)</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-[var(--text-primary)]">Minecraft (Java Edition)</td>
                  <td className="py-3 px-4">25565</td>
                  <td className="py-3 pl-4">25565</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CGNAT notice */}
        <div className="p-4 border border-amber-900/30 bg-amber-900/5 rounded-xl flex items-start gap-3">
          <ShieldAlert size={18} className="text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-[var(--text-primary)]">Carrier-Grade NAT (CGNAT) Warning</h4>
            <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">
              If your WAN IP address in your router status page is different from your public IP shown on IP checkers (usually starting with 100.64.x.x to 100.127.x.x), your ISP is running CGNAT. Under CGNAT, inbound port forwarding rules are ignored. You will need to contact your ISP to request a dynamic public IP or opt-in for a static IP service.
            </p>
          </div>
        </div>
      </div>
    </TroubleshootingArticleShell>
  );
}
