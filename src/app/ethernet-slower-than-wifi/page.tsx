import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import ConnectionOptimizerClient from "@/components/tools/ConnectionOptimizerClient";

export const metadata: Metadata = buildMetadata({
  title: "Ethernet Slower Than Wi-Fi? Fix 100Mbps Wired Speed Cap (2026)",
  description:
    "Is your wired internet slow? Discover why your Ethernet connection is slower than Wi-Fi—covering Fast Ethernet 100Mbps auto-negotiation caps, duplex mismatches, and driver energy throttling.",
  canonical: "/ethernet-slower-than-wifi",
  keywords: [
    "ethernet slower than wifi",
    "wired internet slow",
    "ethernet capped at 100mbps",
    "duplex mismatch fix",
    "energy efficient ethernet EEE",
    "NIC driver throttling"
  ],
});

const breadcrumbs = [
  { name: "Internet Fixes", url: "/wifi-connected-but-no-internet-phone" },
  { name: "Ethernet Slower Than Wi-Fi", url: "/ethernet-slower-than-wifi" },
];

const troubleshootingSteps = [
  {
    title: "Inspect Physical Cable Category & Sheath Integrity",
    description: "Examine the Ethernet cable jacket. Verify that it is marked as Cat5e, Cat6, Cat6A, or Cat8. If utilizing an obsolete Cat5 cable, replace it immediately with a certified Cat6 patch cord.",
    tip: "Legacy Cat5 cables only feature 2 active copper pairs, restricting physical link negotiation to a hard 100 Mbps Fast Ethernet cap."
  },
  {
    title: "Force Gigabit Full Duplex Speed in OS Settings",
    description: "On Windows, open Device Manager → Expand Network Adapters → Right-click your Ethernet card → Properties → Advanced tab. Locate 'Speed & Duplex' and change it from 'Auto Negotiation' to '1.0 Gbps Full Duplex'.",
    tip: "If the connection drops completely after forcing 1.0 Gbps, your cable has physical internal damage and cannot handle high-frequency gigabit signaling."
  },
  {
    title: "Disable Energy Efficient Ethernet (EEE)",
    description: "In the same network adapter Advanced tab, scroll down and set 'Energy Efficient Ethernet' (EEE) and 'Green Ethernet' to DISABLED. This prevents the controller from entering low-power sleep states that throttle peak data throughput.",
  },
  {
    title: "Enable TCP Window Auto-Tuning via Admin Terminal",
    description: "Open Command Prompt as Administrator and execute 'netsh interface tcp set global autotuninglevel=normal' to reset network packet buffer scaling.",
    tip: "Disabling Auto-Tuning forces Windows to use legacy static receive window sizes, capping speed on high-speed fiber plans."
  }
];

const faqs = [
  {
    question: "Why is my Ethernet connection slower than my Wi-Fi?",
    answer: "This is usually caused by a physical link negotiation cap. If your Wi-Fi is modern (Wi-Fi 6 or 5GHz) and resolves at 300 Mbps+, but your Ethernet cable or port is capped at 100 Mbps (Fast Ethernet) due to cable damage or port limitations, your wired connection will be significantly slower."
  },
  {
    question: "How do I check if my Ethernet is negotiation at 100 Mbps or 1 Gbps?",
    answer: "On Windows, go to Settings → Network & Internet → Ethernet. Check the 'Link Speed (Receive/Transmit)' field. If it displays '100/100 (Mbps)', your connection is capped. On macOS, go to System Settings → Network → Ethernet → Details → Hardware to check link speed."
  },
  {
    question: "Can a damaged router port cause slow Ethernet?",
    answer: "Yes. If a specific LAN port on your router has damaged internal copper contact springs, it cannot negotiate gigabit speeds, falling back to Fast Ethernet 100 Mbps or dropping links entirely."
  }
];

const commonCauses = [
  {
    title: "Fast Ethernet Cap",
    desc: "Obsolete Cat5 or damaged network cables failing to negotiate Gigabit speeds, falling back to a 100 Mbps physical limit."
  },
  {
    title: "Green NIC Driver Throttling",
    desc: "Energy Efficient Ethernet (EEE) power-saving features putting network interfaces into low-power states under active load."
  },
  {
    title: "Physical Duplex Mismatch",
    desc: "A mismatched duplex handshake between your computer network card and the router switch, causing high packet collision rates."
  },
  {
    title: "Damaged RJ45 Port Springs",
    desc: "Mechanical pins inside the router or laptop Ethernet port bending or oxidizing, restricting physical signaling."
  }
];

const quickFixChecklist = [
  "Verify your Ethernet cable category is printed as Cat5e or Cat6 on the jacket.",
  "Check your Link Speed in OS settings to see if it is capped at 100 Mbps.",
  "Disable Energy Efficient Ethernet (EEE) inside device manager properties.",
  "Change the router switch port to verify if the port itself is damaged.",
  "Enable TCP Window Auto-Tuning via Command Prompt as Administrator."
];

export default function EthernetSlowerThanWifiPage() {
  return (
    <TroubleshootingArticleShell
      h1="Ethernet Slower Than Wi-Fi? Fix 100Mbps Wired Speed Cap (2026)"
      intro="Is your wired connection failing to match your wireless speeds? Learn why your Ethernet cable is capping network performance at 100 Mbps, how to resolve duplex mismatches, disable green driver power-saving throttling, and enable TCP Window Auto-Tuning."
      category="wifi"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "E-E-A-T Safety Notice: Speed & Duplex Configuration",
        text: "Forcing '1.0 Gbps Full Duplex' on a degraded cable or older network switch that only supports 100 Mbps will drop your network connection entirely. Always set this back to 'Auto Negotiation' if you lose link sync after modifying adapter parameters."
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="Contact your ISP if both Wi-Fi and Ethernet connections drop below your subscribed broadband speeds simultaneously. If the speed drop only occurs over your wired connection while Wi-Fi is running at full capacity, the issue is local to your network cables, card driver, or router switch ports."
      severityLevel="medium"
    >
      <div className="space-y-6">
        {/* Quick Answer Snippet for AI Search Engines */}
        <section className="glass-card p-5 border border-amber-950/20 bg-amber-950/5 rounded-2xl relative overflow-hidden" aria-label="Quick Answer Summary">
          <div className="absolute top-0 right-0 bg-amber-500/10 text-amber-400 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-bl-lg font-bold">
            AIO Quick Answer
          </div>
          <h3 className="text-xs font-bold text-amber-400 mb-2 uppercase tracking-wide">Quick Diagnostic Summary</h3>
          <ul className="space-y-2 text-xs text-[var(--text-secondary)] leading-relaxed">
            <li><strong>Symptoms:</strong> Your wired Ethernet speeds are capped at exactly 90–95 Mbps, while your Wi-Fi resolves at 200–500 Mbps.</li>
            <li><strong>Most Likely Cause:</strong> An obsolete Cat5 cable or a damaged network cable with a broken copper wire pair, forcing a physical 100 Mbps Fast Ethernet link cap.</li>
            <li><strong>Fastest Safe Fix:</strong> Replace the interconnecting cable with a certified Cat6 or Cat6A patch cord, and ensure it is plugged into a Gigabit LAN port on both the router and computer.</li>
          </ul>
        </section>

        <ConnectionOptimizerClient mode="ethernet-speed" />

        <article className="prose prose-invert max-w-none space-y-6 text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
          
          <h2 className="text-sm font-bold text-[var(--text-primary)]">Symptoms vs. Root Causes Diagnostic Table</h2>
          <p>
            Wired networks negotiate speeds physically over copper wiring. Use this comparison table to identify why your wired connection is bottlenecking:
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">Observed Link Status</th>
                  <th className="px-3 py-2 text-left">Likely Physical/Protocol Cause</th>
                  <th className="px-3 py-2 text-left">Hardware Layer</th>
                  <th className="px-3 py-2 text-left">Primary Diagnostic Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2 font-mono">Link Speed reads exactly 100/100 Mbps</td>
                  <td className="px-3 py-2">Obsolete Cat5 or broken cable pair (lacks 8 active pins)</td>
                  <td className="px-3 py-2">Layer 1 (Physical Cable)</td>
                  <td className="px-3 py-2">Replace with certified Cat6 Ethernet cable</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono">1 Gbps negotiated, but throughput caps at 100 Mbps</td>
                  <td className="px-3 py-2">Energy Efficient Ethernet (EEE) sleep throttling active</td>
                  <td className="px-3 py-2">Layer 2 (Network Card PHY)</td>
                  <td className="px-3 py-2">Disable EEE / Green Ethernet in Device Manager</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono">Connection negotiation drops and loops</td>
                  <td className="px-3 py-2">Physical duplex mismatch or oxidization on LAN springs</td>
                  <td className="px-3 py-2">Layer 1 (Physical Interface)</td>
                  <td className="px-3 py-2">Change router LAN port, clean F-pins</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono">Throughput slow, high latency under upload</td>
                  <td className="px-3 py-2">TCP Window Auto-Tuning disabled in operating system</td>
                  <td className="px-3 py-2">Layer 4 (Transport TCP)</td>
                  <td className="px-3 py-2">Enable Auto-Tuning via Admin Command Prompt</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-sm font-bold text-[var(--text-primary)]">What Happens Internally During Ethernet Speed Negotiation?</h2>
          <p>
            When you insert an RJ45 Ethernet connector into your computer's LAN port, the physical layer interface (PHY) on your network card performs an **Auto-Negotiation** handshake with the router's network switch.
          </p>
          <p>
            This handshake uses a series of fast link pulses (FLPs) to exchange speed and duplex capabilities. Gigabit Ethernet (1000BASE-T) operates at high frequencies, requiring all 4 twisted copper pairs (8 active wires) to negotiate and transmit data. If even a single copper wire inside the cable has a microscopic break or the pins inside the RJ45 jack are oxidized, the PHY interface fails the gigabit handshake. To prevent connection failure, the controller falls back to Fast Ethernet (100BASE-TX), which only requires 2 active pairs (4 wires). This caps your maximum throughput at 100 Mbps (effectively 90–95 Mbps real-world speeds), making your wired link significantly slower than a modern 5 GHz Wi-Fi connection.
          </p>

          <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
            <span className="font-bold text-[var(--text-primary)] block text-xs">Deep Diagnostics & Internal Authority Links</span>
            <ul className="list-disc pl-4 space-y-1 text-[11px]">
              <li>If you need step-by-step guidance on setting custom parameters, read our <a href="/how-to-change-dns-on-router" className="text-[var(--brand-400)] hover:underline">How to Change DNS on Router Walkthrough</a>.</li>
              <li>Learn how to resolve port blocks with our <a href="/best-dns-for-faster-internet" className="text-[var(--brand-400)] hover:underline">Best DNS for Faster Internet Guide</a>.</li>
              <li>Verify your gateway configuration endpoints at the <a href="/ips/192-168-1-1" className="text-[var(--brand-400)] hover:underline">192.168.1.1 Gateway Portal</a>.</li>
              <li>Analyze your wireless dropouts using the <a href="/wifi-keeps-disconnecting" className="text-[var(--brand-400)] hover:underline">WiFi Disconnection Walkthrough</a>.</li>
              <li>Troubleshoot physical WAN link drops with our <a href="/router-blinking-orange" className="text-[var(--brand-400)] hover:underline">Router Blinking Orange Guide</a>.</li>
            </ul>
          </div>

          <h2 className="text-sm font-bold text-[var(--text-primary)]">When Hardware is Physically Failing</h2>
          <p>
            If your Ethernet cable is new and certified Cat6, but the link speed remains stuck at 100 Mbps or disconnects periodically, your physical hardware components are likely degrading:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-[11px] text-[var(--text-muted)]">
            <li>
              <strong>Oxidized RJ45 Connector Pins:</strong> Gold-plated contact pins inside the laptop or router port can tarnish or snap over years of insertion cycles. This increases contact resistance, causing high packet corruption rates that drop link negotiation.
            </li>
            <li>
              <strong>NIC Transceiver Aging:</strong> The physical transceiver chip (PHY) on your computer's motherboard can suffer from heat wear. This reduces its voltage signal output, failing high-frequency gigabit handshakes.
            </li>
            <li>
              <strong>Green Ethernet Clock Drifts:</strong> Many network cards feature power management circuits. Over time, the internal clock crystals drift, triggering wake-up delays that drop connection synchronization.
            </li>
          </ul>

          <h2 className="text-sm font-bold text-[var(--text-primary)]">Commercial Intent: Upgrading Cables & Switches</h2>
          <p>
            If your home router has limited LAN ports or lacks Gigabit support, upgrading your local hardware is essential. 
          </p>
          <p>
            Purchase a dedicated **Gigabit Unmanaged Switch** (such as a TP-Link or Netgear 5-port Gigabit switch). Connect one LAN port of your router to the switch using a high-quality Cat6 cable, and connect all your devices directly to the switch. Unmanaged switches have dedicated backplane processing units that switch local LAN packets at wire speed (1 Gbps or 2.5 Gbps) without putting load on your router's main CPU.
          </p>
          <p>
            Ensure all interconnecting patch cords are high-quality **Cat6 or Cat6A** cables featuring 100% pure copper conductors; avoid cheap CCA (Copper Clad Aluminum) cables, which have high attenuation and easily break under minor tension.
          </p>
        </article>
      </div>
    </TroubleshootingArticleShell>
  );
}
