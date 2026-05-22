import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import WifiTroubleshooterClient from "@/components/tools/WifiTroubleshooterClient";

export const metadata: Metadata = buildMetadata({
  title: "Router Blinking Orange? Amber & Red Light Fixes — RouterVia",
  description:
    "Is your router blinking orange or showing a solid red internet light? Learn how to debug modem sync issues, fiber ONT failures, WAN cabling, and ISP MAC locks.",
  canonical: "/router-blinking-orange",
  keywords: [
    "router blinking orange",
    "blinking amber router light",
    "red internet light router",
    "router orange light no internet",
    "modem sync issues",
    "mac cloning new router",
    "fiber ont optical signal"
  ],
});

const breadcrumbs = [
  { name: "WiFi Troubleshooting", url: "/wifi-keeps-disconnecting" },
  { name: "Router Blinking Orange", url: "/router-blinking-orange" },
];

const troubleshootingSteps = [
  {
    title: "Sequential Power Cycle (Modem -> Router)",
    description: "Unplug both the modem (or ONT fiber box) and the router from power. Wait exactly 5 full minutes. Plug the MODEM/ONT in first and wait for all DSL/PON/US-DS lights to turn solid green. Once ready, plug the ROUTER back in.",
    tip: "Powering them up simultaneously often prevents the router from acquiring a fresh WAN IP before the modem registers on the ISP network."
  },
  {
    title: "Inspect and Replace WAN Ethernet Cabling",
    description: "Ensure the Ethernet cord running between the modem's LAN port and the router's WAN (Internet) port is a high-quality Cat5e or Cat6 cable. Avoid flat or heavily bent cables that suffer from internal conductor fractures.",
  },
  {
    title: "Clone MAC Address on New Router Settings",
    description: "If you just replaced your router, log into your router administration dashboard, navigate to WAN / Internet Settings, find MAC Address Clone, and clone your computer's MAC address or the old router's MAC.",
  },
  {
    title: "Check Fiber ONT LOS Indicator",
    description: "If you have fiber, inspect your wall-mounted ONT box. If the 'LOS' (Loss of Signal) light is blinking red or amber, there is an active fiber line interruption, and you must call your ISP to test the physical loop.",
    tip: "A red LOS light means the ONT is receiving 0% optical light, which usually points to a fiber line break in your street or neighborhood."
  }
];

const faqs = [
  {
    question: "What does a blinking orange or amber internet light mean on a router?",
    answer: "A blinking orange or amber light indicates that the router detects a physical cable connection on its WAN port, but it is unable to establish an IP handshake with your ISP's DHCP server. This could mean your modem is out of sync, your ISP has locked your connection to an old MAC address, or there is an active neighborhood outage."
  },
  {
    question: "Why does my router show a solid red light for the internet?",
    answer: "A solid red light usually indicates a complete physical layer disconnection. Either the ethernet cable is unplugged from the WAN/Internet port, the modem/ONT is completely powered down, or there is no signal coming through the coax/dsl lines."
  },
  {
    question: "Can firmware corruption cause a persistent orange light?",
    answer: "Yes. If a firmware upgrade is interrupted, or the configuration partition (NVRAM) becomes corrupted, the WAN daemon will fail to initialize. Doing a hardware factory reset (holding the physical reset button for 15 seconds) resolves this."
  }
];

export default function RouterBlinkingOrangePage() {
  return (
    <TroubleshootingArticleShell
      h1="How to Fix a Router Blinking Orange or Red"
      intro="An orange, amber, or red LED on your router means your gateway cannot establish a connection with your ISP. Use our diagnostic tool to test your physical WAN links and find the correct solution."
      category="wifi"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
    >
      <div className="space-y-6">
        {/* Interactive wizard */}
        <WifiTroubleshooterClient issueType="orange-light" />

        {/* Detailed SEO article section */}
        <article className="prose prose-invert max-w-none space-y-4 text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
          <h2 className="text-sm font-bold text-[var(--text-primary)]">Deciphering Gateway WAN LED Behaviors</h2>
          <p>
            When your router throws an orange or red indicator, it tells you that the <strong>Physical Layer (PHY)</strong> connection might be active, but the <strong>Data Link Layer (Layer 2)</strong> or <strong>Network Layer (Layer 3)</strong> has failed. In simple terms: the router knows a cable is plugged in, but the ISP is refusing to talk to it.
          </p>
          <p>
            For many modern fiber setups, the problem lies in the transition between your router and the Fiber Optical Network Terminal (ONT). ONTs act as fiber-to-ethernet bridges and cache MAC addresses. If you swap routers, the ONT will refuse to route traffic to the new MAC address until the ONT is completely power cycled for several minutes to flush its local MAC lease table.
          </p>
          <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
            <span className="font-bold text-[var(--text-primary)] block text-xs">Recommended Tools & Quick Links</span>
            <ul className="list-disc pl-4 space-y-1 text-[11px]">
              <li>Read our full guide on <a href="/port-forwarding-guide" className="text-[var(--brand-400)] hover:underline">Port Forwarding Setup</a>.</li>
              <li>Perform a detailed query with our <a href="/dns-propagation-checker" className="text-[var(--brand-400)] hover:underline">DNS Propagation Checker</a> to verify resolver health.</li>
              <li>Learn how to fix restrictive NAT settings in our <a href="/nat-type-checker" className="text-[var(--brand-400)] hover:underline">NAT Checker</a>.</li>
            </ul>
          </div>
        </article>
      </div>
    </TroubleshootingArticleShell>
  );
}
