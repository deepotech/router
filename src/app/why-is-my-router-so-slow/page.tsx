import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import ConnectionOptimizerClient from "@/components/tools/ConnectionOptimizerClient";

export const metadata: Metadata = buildMetadata({
  title: "Why Is My Router So Slow? How to Diagnose & Fix Lag — RouterVia",
  description:
    "Is your internet lagging? Discover why your router is running slow, how to resolve channel congestion, configure QoS, update firmware, and optimize your Wi-Fi speeds.",
  canonical: "/why-is-my-router-so-slow",
  keywords: [
    "why is my router so slow",
    "slow router fix",
    "internet slow on router",
    "router lagging",
    "wi-fi channel congestion",
    "router overheating lag",
    "qos speed capping problem"
  ],
});

const breadcrumbs = [
  { name: "WiFi Troubleshooting", url: "/wifi-keeps-disconnecting" },
  { name: "Why Is My Router So Slow", url: "/why-is-my-router-so-slow" },
];

const troubleshootingSteps = [
  {
    title: "Migrate to the 5 GHz Wireless Band",
    description: "Access your device Wi-Fi configuration and connect to the 5 GHz band (often suffixed with _5G). The 5 GHz spectrum offers wider channels, higher throughput, and minimal congestion compared to 2.4 GHz.",
    tip: "5 GHz has shorter range but up to 10x the throughput capacity, avoiding neighbor network noise."
  },
  {
    title: "Pin a Fixed, Non-Overlapping Channel",
    description: "Log into your router admin panel (usually 192.168.1.1 or 192.168.0.1) and navigate to Wireless Settings. Change 2.4 GHz channel selection from Auto to manual channels 1, 6, or 11, and set channel width to 20 MHz.",
    tip: "Auto-channel settings regularly select crowded channels, causing packet collisions and buffering."
  },
  {
    title: "Update Router Firmware Partition",
    description: "Under the router's Administration or Advanced settings tab, check for the latest firmware release. If an update is available, download and apply it to fix underlying memory leaks and driver crashes.",
  },
  {
    title: "Disable Quality of Service (QoS) Capping",
    description: "If you have a high-speed line (above 100-200 Mbps) and experience throughput limits, disable QoS. On budget routers, QoS forces packet parsing onto the main CPU, bypassing hardware NAT acceleration.",
    tip: "Enabling QoS can drop gigabit speeds down to 150 Mbps on low-spec single-core processors."
  }
];

const faqs = [
  {
    question: "Can too many connected devices slow down my router?",
    answer: "Yes. Older or low-end routers have limited CPU power and RAM. When many devices run downloads, streaming, or smart home loops, the router runs out of buffer memory, leading to packet loss and high latency."
  },
  {
    question: "How do I check if my router is overheating?",
    answer: "Feel the router shell. If it is hot to the touch or stored in a closed media console without ventilation, the internal chips will thermal throttle, capping packet routing speeds to prevent chip damage."
  },
  {
    question: "What is bufferbloat and how does it slow down my connection?",
    answer: "Bufferbloat occurs when a router's packet buffer memory overflows during large downloads, creating huge queues that delay time-sensitive packets like gaming or DNS requests."
  }
];

export default function WhyIsMyRouterSoSlowPage() {
  return (
    <TroubleshootingArticleShell
      h1="Why Is My Router So Slow? How to Diagnose & Fix Lag"
      intro="Experiencing dropouts or sluggish speeds? Learn the core causes of router latency—such as channel congestion, obsolete firmware, thermal limits, and device over-saturation—and optimize your network settings instantly."
      category="wifi"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
    >
      <div className="space-y-6">
        <ConnectionOptimizerClient mode="slow-router" />

        <article className="prose prose-invert max-w-none space-y-4 text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
          <h2 className="text-sm font-bold text-[var(--text-primary)]">Understanding Router Hardware and Wireless Bottlenecks</h2>
          <p>
            When diagnosing a slow connection, it is critical to distinguish between your incoming line speed (provided by your ISP) and local router performance. If your router is old or unoptimized, it creates a processing bottleneck. A router is essentially a small computer with a CPU and RAM. It is responsible for parsing packets, translating local IP addresses via NAT (Network Address Translation), and scheduling radio frequencies.
          </p>
          <p>
            A common mistake is utilizing combined 2.4 GHz and 5 GHz wireless networks (often called Smart Connect). While this setup sounds convenient, it regularly pushes legacy devices or distant clients onto the slow, crowded 2.4 GHz spectrum. Separating the bands allows you to lock heavy users onto 5 GHz, maximizing throughput.
          </p>
          <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
            <span className="font-bold text-[var(--text-primary)] block text-xs">Recommended Tools & Quick Links</span>
            <ul className="list-disc pl-4 space-y-1 text-[11px]">
              <li>Configure your local gateway parameters at the <a href="/ips/192-168-1-1" className="text-[var(--brand-400)] hover:underline">192.168.1.1 Gateway Administration Page</a>.</li>
              <li>Learn how to resolve port blocks with our <a href="/port-checker" className="text-[var(--brand-400)] hover:underline">Port Checker Utility</a>.</li>
              <li>Verify your device IP configuration with the <a href="/public-ip-checker" className="text-[var(--brand-400)] hover:underline">Public IP Checker Tool</a>.</li>
              <li>Analyze your wireless dropouts using the <a href="/wifi-keeps-disconnecting" className="text-[var(--brand-400)] hover:underline">WiFi Disconnection Guide</a>.</li>
            </ul>
          </div>
        </article>
      </div>
    </TroubleshootingArticleShell>
  );
}
