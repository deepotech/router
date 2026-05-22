import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import GamingToolShell from "@/components/tools/GamingToolShell";
import NatTypeCheckerClient from "@/components/tools/NatTypeCheckerClient";

export const metadata: Metadata = buildMetadata({
  title: "Gaming NAT Type Checker & Strict NAT Fix Guide — RouterVia",
  description:
    "Test your multiplayer NAT type (Open, Moderate, Strict) and follow custom step-by-step router configurations to open your NAT on PS5, Xbox, Switch, and PC.",
  canonical: "/nat-type-checker",
  keywords: [
    "nat type checker",
    "strict nat fix",
    "check nat type",
    "open nat router settings",
    "how to fix double nat",
    "upnp gaming router",
    "port forwarding for gaming",
  ],
});

const breadcrumbs = [
  { name: "Gaming Tools", url: "/nat-type-checker" },
  { name: "NAT Checker", url: "/nat-type-checker" },
];

const faqs = [
  {
    question: "What is NAT type and why does it matter for gaming?",
    answer: "Network Address Translation (NAT) determines how your router translates public WAN sockets to private LAN IPs. For multiplayer gaming, a restrictive NAT (Strict / Type 3) prevents other consoles from establishing direct peer-to-peer (P2P) socket handshakes. This leads to matchmaking failures, high ping, and disconnected lobby voice chats.",
  },
  {
    question: "How do I fix a Strict NAT (Type 3 / F) to Open?",
    answer: "You can open your NAT by: 1) Enabling UPnP in your router's admin panel, 2) Reserving a static IP address for your console/PC, or 3) Creating dedicated Port Forwarding rules in the router's settings. In extreme cases, changing your ISP connection from CGNAT to a dynamic public IP is required.",
  },
  {
    question: "What is Double NAT and how do I solve it?",
    answer: "Double NAT occurs when two routers are translating network addresses simultaneously (e.g. an ISP fiber modem/router connected to your own mesh WiFi router). To fix this, log into the ISP router and toggle 'Bridge Mode', or log into your mesh router and select 'Access Point (AP) Mode' to disable its secondary DHCP engine.",
  },
  {
    question: "Is it safe to place my gaming console in the DMZ?",
    answer: "Yes, it is generally safe to place dedicated gaming systems like PlayStation or Xbox in the router's DMZ because they run specialized closed operating systems without standard network attack surfaces. However, you should NEVER place a Windows PC in the DMZ, as it exposes all network ports to direct malicious scans.",
  },
];

export default function NatTypeCheckerPage() {
  return (
    <GamingToolShell
      h1="Gaming NAT Type Checker"
      intro="Struggling with lag, restricted lobby matching, or chat dropouts? Use our interactive multiplayer NAT checker to diagnose your console connection profile and retrieve custom port-opening workflows."
      toolType="nat"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
    >
      <NatTypeCheckerClient />
    </GamingToolShell>
  );
}
