import type { Metadata } from "next";
import Link from "next/link";
import { Link2, Info, Shield, Lock, Wifi, Smartphone, Globe, Settings, RefreshCw, AlertTriangle } from "lucide-react";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "How to Fix Ethernet Packet Loss: Physical Link & Cabling Guide (2026)",
  description:
    "Troubleshoot physical Layer 1 Ethernet packet loss, damaged RJ45 terminations, electromagnetic interference (EMI), switch port failures, and duplex mismatches.",
  canonical: "/ethernet-packet-loss",
  keywords: [
    "ethernet packet loss",
    "fix physical packet drops",
    "bad ethernet cable packet loss",
    "rj45 termination check",
    "duplex mismatch packet loss",
    "switch port failure",
    "lan cable shielding",
  ],
});

export default async function EthernetPacketLossPage() {
  const breadcrumbs = [
    { name: "Network Problems", url: "/ethernet-connected-but-no-internet" },
    { name: "Fix Packet Loss", url: "/packet-loss-test" },
    { name: "Ethernet Packet Loss", url: "/ethernet-packet-loss" },
  ];

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${APP_URL}/ethernet-packet-loss#webpage`,
    "url": `${APP_URL}/ethernet-packet-loss`,
    "name": "How to Fix Ethernet Packet Loss: Physical Link & Cabling Guide (2026)",
    "description": "Troubleshoot physical Layer 1 Ethernet packet loss, damaged RJ45 terminations, electromagnetic interference (EMI), switch port failures, and duplex mismatches.",
    "about": {
      "@type": "Thing",
      "name": "Ethernet Packet Loss",
    },
  };

  const troubleshootingSteps = [
    {
      title: "Inspect Physical Cable Jacket and RJ45 Connectors",
      description:
        "Physical damage is the primary cause of Ethernet frame corruption. Check the entire length of your cable for sharp bends, pinches, or heavy crushing. Inspect the RJ45 connectors on both ends. Ensure that the gold pins are not oxidized or dirty, and that the plastic locking tab is intact, holding the connector firmly inside the port. Replace any cable that has a loose or wobbly termination.",
      tip: "Gold-plated contacts on cheaper patch cables can corrode over time, especially in humid environments, leading to resistance and intermittent frame drops.",
    },
    {
      title: "Isolate Electromagnetic Interference (EMI) Along Cable Runs",
      description:
        "Ethernet cables use twisted copper pairs to cancel out crosstalk. However, unshielded twisted pair (UTP) cables routed close to high-voltage power lines, fluorescent lighting ballasts, or large household appliances can absorb electromagnetic noise. This noise corrupts data frames, causing the receiving NIC (Network Interface Card) to discard them. Route Ethernet cables at least 12 inches away from power lines, or upgrade to Shielded Foil Twisted Pair (S/FTP) Cat6a cabling.",
      tip: "If your Ethernet run must cross a power line, route it at a perpendicular 90-degree angle to minimize electromagnetic coupling.",
    },
    {
      title: "Verify Speed and Duplex Settings for Port Mismatches",
      description:
        "A duplex mismatch occurs when one end of the physical link is set to Full Duplex and the other end is forced to Half Duplex. When the Full Duplex device transmits data while the Half Duplex device is sending, it triggers physical collisions. This forces the switch to drop frames. Ensure both your computer's network adapter and the router's LAN port are set to 'Auto Negotiation'. This allows the devices to negotiate the highest mutually supported speed and duplex parameters.",
      tip: "In Windows, go to Device Manager -> Network adapters -> right-click NIC -> Properties -> Advanced tab -> Speed & Duplex -> set to Auto Negotiation.",
    },
    {
      title: "Diagnose Switch Port or Router LAN Interface Failure",
      description:
        "Network switch ports can experience electrical degradation due to static discharge or power surges. This manifests as packet drops limited to a single physical port. Plug your Ethernet cable into a different LAN port on your router or switch. If the packet loss immediately drops to 0%, the previous port is failing or damaged.",
      tip: "Check your switch's status LEDs. A flashing amber light can indicate physical layer collisions or port negotiation errors.",
    },
  ];

  const faqs = [
    {
      question: "Can a bad Ethernet cable cause packet loss?",
      answer: "Yes, damaged or poorly manufactured copper cabling is a major cause of packet drops. Physical breaks in copper conductors, poorly crimped RJ45 connectors, or unshielded cables routed near power lines corrupt data frames, causing the receiving adapter to discard them due to failing checksum checks.",
    },
    {
      question: "How do I check my Ethernet connection for CRC errors?",
      answer: "On Windows, open PowerShell and execute 'Get-NetAdapterStatistics'. Look at the received discard or error counters. On macOS/Linux, open Terminal and run 'ifconfig' or 'ip -s link'. If you see non-zero counters for 'errors', 'dropped', or 'overruns', your physical link is actively corrupting packets.",
    },
    {
      question: "What is the difference between UTP and FTP cabling?",
      answer: "UTP (Unshielded Twisted Pair) has no metal shielding and is flexible and cheap, making it suitable for standard home networks. FTP (Foil Twisted Pair) wraps the copper pairs in a metal foil shield to protect against electromagnetic interference (EMI) from power lines, making it ideal for runs inside walls or near electrical conduits.",
    },
    {
      question: "Does the length of my Ethernet cable cause packet loss?",
      answer: "Standard twisted-pair copper Ethernet cabling supports runs up to 100 meters (328 feet). If your cable exceeds this distance without an active repeater or switch to amplify the signal, signal attenuation will corrupt frames and trigger severe packet loss.",
    },
    {
      question: "Why is my Gigabit Ethernet adapter negotiating at 100 Mbps?",
      answer: "This is a sign of a physical layer failure. Gigabit Ethernet requires all four copper twisted pairs inside the cable to negotiate successfully. If even one conductor is broken or poorly terminated, the network card will fall back to Fast Ethernet (100 Mbps). Replace the cable to restore Gigabit speeds.",
    },
  ];

  const commonCauses = [
    {
      title: "Oxidized Connector Pins",
      desc: "Corrosion on the gold contact pins of RJ45 plugs increasing resistance, corrupting data packets.",
    },
    {
      title: "Electromagnetic Interference",
      desc: "UTP network lines routed parallel to high-voltage household electrical conduits or power supplies.",
    },
    {
      title: "Duplex Mismatch Conflicts",
      desc: "Incorrect manual speed configurations forcing one link interface to Half Duplex while the other uses Full Duplex.",
    },
  ];

  const quickFixChecklist = [
    "Verify that the Ethernet cable connectors are clicked securely into the RJ45 port slots.",
    "Route your network cabling away from power lines and electrical appliances.",
    "Set your device's network adapter Speed & Duplex properties to 'Auto Negotiation'.",
    "Test connection stability on different physical LAN ports on the router/switch.",
    "Replace older Cat5 or damaged patch cables with verified Cat6 or Cat6a shielded runs.",
  ];

  return (
    <>
      <JsonLd data={collectionPageSchema} />
      <TroubleshootingArticleShell
        h1="How to Fix Ethernet Packet Loss & Cabling Interface Failures"
        intro="Ethernet connections are highly reliable, but they are not immune to physical failures. Degraded copper conductors, poorly crimped RJ45 connectors, electromagnetic noise, and port auto-negotiation mismatches can corrupt network frames, leading to packet drops. This guide outlines how to audit your physical cabling, isolate electrical noise, configure interface settings, and restore error-free connectivity."
        category="wifi"
        breadcrumbs={breadcrumbs}
        faqs={faqs}
        troubleshootingSteps={troubleshootingSteps}
        warningBanner={{
          title: "Physical Layer Cheksum Discards",
          text: "When an Ethernet card receives a corrupted frame, it discards it immediately to protect the operating system. Standard software diagnostics may show this as simple packet loss, but the root cause is entirely physical layer degradation.",
        }}
        quickFixChecklist={quickFixChecklist}
        commonCauses={commonCauses}
        severityLevel="high"
        whenToContactISP="If you experience packet drops on your WAN connection despite replacing the Ethernet cable between your router and the ONT/modem, the physical GPON line outside is damaged. Contact your ISP to test optical fiber db attenuation."
      >
        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              1. Ethernet Cable Category Comparison Matrix
            </h2>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
              Ensure you are utilizing the appropriate category and shielding type for your network application:
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                    <th className="px-4 py-3 text-left">Cable Category</th>
                    <th className="px-4 py-3 text-left">Max Transmission Speed</th>
                    <th className="px-4 py-3 text-left">Max Frequency Bandwidth</th>
                    <th className="px-4 py-3 text-left">Shielding Option</th>
                    <th className="px-4 py-3 text-left">Susceptibility to Packet Loss</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Cat 5 (Legacy)</td>
                    <td className="px-4 py-3">100 Mbps</td>
                    <td className="px-4 py-3">100 MHz</td>
                    <td className="px-4 py-3">UTP only (Unshielded)</td>
                    <td className="px-4 py-3 text-red-400">High (no crosstalk protection)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Cat 5e (Standard)</td>
                    <td className="px-4 py-3">1 Gbps (1000 Mbps)</td>
                    <td className="px-4 py-3">100 MHz</td>
                    <td className="px-4 py-3">UTP / FTP (Foil shield)</td>
                    <td className="px-4 py-3 text-yellow-400">Medium (prone to heavy EMI)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Cat 6 (Recommended)</td>
                    <td className="px-4 py-3">10 Gbps (up to 55m)</td>
                    <td className="px-4 py-3">250 MHz</td>
                    <td className="px-4 py-3">UTP / FTP (internal spline separator)</td>
                    <td className="px-4 py-3 text-green-400">Low (isolated twisted pairs)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Cat 6a (High Performance)</td>
                    <td className="px-4 py-3">10 Gbps (full 100m)</td>
                    <td className="px-4 py-3">500 MHz</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">S/FTP (Individual pair shielding)</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">Near Zero (~ 0.0%)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              2. How to Diagnose Link Collisions and Duplex Conflicts
            </h2>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed text-justify">
              In full-duplex Ethernet, devices can transmit and receive data simultaneously over separate physical wire paths. Collisions are theoretically impossible. However, if a device is forced to <strong>Half-Duplex</strong>, it must utilize a carrier-sense mechanism (CSMA/CD) to ensure the line is quiet before transmitting.
            </p>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed text-justify">
              If the device on the other end is set to Full-Duplex, it ignores carrier-sensing and transmits whenever it wants. This triggers collisions. The half-duplex adapter marks these collisions as errors, drops the packets, and requests retransmissions. This conflict ruins throughput speeds and causes packet loss. Keep all interfaces configured to <strong>Auto Negotiation</strong> to ensure matching duplex profiles.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              3. Internal Linking Hub
            </h2>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
              Explore more network diagnostic resources in our system:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-elevated)] space-y-2">
                <h3 className="text-sm font-bold text-[var(--text-primary)]">Packet Loss Cluster</h3>
                <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--text-muted)]">
                  <li>Primary diagnostic page: <Link href="/packet-loss-test" className="text-[var(--brand-400)] hover:underline">Packet Loss Test Guide</Link></li>
                  <li>Gaming optimization: <Link href="/packet-loss-for-gaming" className="text-[var(--brand-400)] hover:underline">Gaming Packet Loss Guide</Link></li>
                  <li>Solve wireless issues: <Link href="/wifi-packet-loss" className="text-[var(--brand-400)] hover:underline">Wi-Fi Packet Loss Guide</Link></li>
                </ul>
              </div>
              <div className="p-4 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-elevated)] space-y-2">
                <h3 className="text-sm font-bold text-[var(--text-primary)]">Wired Network Troubleshooting</h3>
                <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--text-muted)]">
                  <li>Fix physical connection drops: <Link href="/ethernet-connected-but-no-internet" className="text-[var(--brand-400)] hover:underline">Ethernet Connected No Internet Guide</Link></li>
                  <li>Diagnose slow Ethernet links: <Link href="/ethernet-slower-than-wifi" className="text-[var(--brand-400)] hover:underline">Ethernet Slower Than Wi-Fi Fix</Link></li>
                  <li>Audit default gateway paths: <Link href="/default-gateway-not-available" className="text-[var(--brand-400)] hover:underline">Fix Default Gateway Not Available</Link></li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </TroubleshootingArticleShell>
    </>
  );
}
