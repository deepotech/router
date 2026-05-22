import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import WifiTroubleshooterClient from "@/components/tools/WifiTroubleshooterClient";

export const metadata: Metadata = buildMetadata({
  title: "Router Not Detecting WAN Port? Connection Troubleshooting — RouterVia",
  description:
    "Is your router showing WAN port unplugged or ethernet WAN disconnected? Learn how to inspect ONT signals, test ethernet pins, and configure PPPoE and VLANs.",
  canonical: "/router-not-detecting-wan",
  keywords: [
    "router not detecting wan",
    "wan port unplugged",
    "ethernet wan disconnected",
    "router no wan signal",
    "ont fiber box status",
    "ethernet pin damage",
    "pppoe login credentials"
  ],
});

const breadcrumbs = [
  { name: "WiFi Troubleshooting", url: "/wifi-keeps-disconnecting" },
  { name: "WAN Port Not Detected", url: "/router-not-detecting-wan" },
];

const troubleshootingSteps = [
  {
    title: "Inspect Physical WAN Port Pins",
    description: "Unplug the ethernet cable from the back of the router's WAN port. Look closely inside the port with a flashlight. Verify none of the 8 gold pins are bent, crossed, or touch one another, which short-circuits the port transceiver.",
    tip: "A single bent pin can prevent physical loopback, resulting in a permanent 'WAN port unplugged' status."
  },
  {
    title: "Force Port Negotiation Speed",
    description: "Log into the router dashboard, go to WAN Settings, and find 'Port Speed' or 'Negotiation'. Change it from 'Auto' to a fixed setting like '1000Mbps Full Duplex' or '100Mbps Full Duplex' depending on your modem capability.",
  },
  {
    title: "Check Fiber ONT Box Status",
    description: "If your Fiber internet runs through a wall-mounted ONT box, check its lights. Ensure the 'PON' (Passive Optical Network) light is solid green. If the 'LOS' (Loss of Signal) light is active, the ONT is receiving no optical feed.",
  },
  {
    title: "Verify PPPoE and VLAN tagging settings",
    description: "If your ISP uses PPPoE (like CenturyLink or DSL), go to WAN settings, set Connection Type to PPPoE, and enter your ISP username and password. Enable VLAN settings and input the specific tag required (e.g. VLAN 201).",
    tip: "If your router is connected to an ISP modem, verify the modem is in transparent 'Bridge Mode' to prevent double routing allocation."
  }
];

const faqs = [
  {
    question: "Why does my router say WAN port is unplugged when it is plugged in?",
    answer: "This occurs due to a lack of electrical feedback on the WAN port's transceiver. It is commonly caused by a damaged ethernet cable, bent contact pins inside the port, a powered-down modem/ONT, or a speed negotiation mismatch where the router cannot sync duplex rates with the modem."
  },
  {
    question: "How do I perform a loopback test to verify WAN port functionality?",
    answer: "Plug a known working ethernet cable into the router's WAN/Internet port, and insert the other end into one of the router's LAN ports (e.g., LAN 1). If the WAN/Internet LED indicator turns on or flashes, the router's physical WAN port is functional, meaning the issue lies on the ISP modem or cabling side."
  },
  {
    question: "Can an ISP provisioning lock cause a WAN disconnected error?",
    answer: "No, a provisioning lock will result in 'Connected, No Internet' (an orange light). A 'WAN Unplugged' error is strictly a physical Layer 1 issue where the router's network controller detects 0 volts on the transmit/receive pins."
  }
];

export default function RouterNotDetectingWanPage() {
  return (
    <TroubleshootingArticleShell
      h1="How to Fix 'Router Not Detecting WAN Port'"
      intro="If your router claims the WAN port is unplugged or fails to detect the incoming ethernet signal from your modem/ONT, follow our diagnostic checklist to isolate physical, negotiation, and PPPoE authentication issues."
      category="wifi"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
    >
      <div className="space-y-6">
        {/* Interactive wizard */}
        <WifiTroubleshooterClient issueType="wan-error" />

        {/* Detailed SEO article section */}
        <article className="prose prose-invert max-w-none space-y-4 text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
          <h2 className="text-sm font-bold text-[var(--text-primary)]">Physical Layer Loopback and Signal Voltage</h2>
          <p>
            When a router reports that the <strong>WAN/Internet port is disconnected</strong>, it is experiencing a failure at **Layer 1 (Physical Layer)** of the OSI model. The ethernet controller on the router's motherboard monitors electrical resistance across the copper wire pairs inside the cable. If it does not detect a partner transceiver at the other end (on the ONT or modem), it remains in an idle state.
          </p>
          <p>
            In modern Gigabit fiber configurations, auto-negotiation can sometimes fail if the ONT's ethernet port is rated for 10/100/1000Mbps and the router is trying to establish a 2.5Gbps link. Forcing the negotiation down to 1000Mbps (1 Gbps) or replacing flat ethernet cables with shielded twisted-pair (STP) cables often establishes the loopback connection instantly.
          </p>
          <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
            <span className="font-bold text-[var(--text-primary)] block text-xs">Recommended Tools & Quick Links</span>
            <ul className="list-disc pl-4 space-y-1 text-[11px]">
              <li>Configure Minecraft multiplayer connections using our <a href="/minecraft-port-forwarding" className="text-[var(--brand-400)] hover:underline">Minecraft Port Forwarding Guide</a>.</li>
              <li>Resolve console connection problems with our <a href="/xbox-nat-type-open" className="text-[var(--brand-400)] hover:underline">Xbox Open NAT Guide</a>.</li>
              <li>Read about the <a href="/ps5-nat-type-fix" className="text-[var(--brand-400)] hover:underline">PS5 NAT Type Fix</a> for troubleshooting multiplayer lobby drops.</li>
            </ul>
          </div>
        </article>
      </div>
    </TroubleshootingArticleShell>
  );
}
