import type { Metadata } from "next";
import Link from "next/link";
import { Link2, Info, Shield, Lock, Wifi, Smartphone, Globe, Settings, RefreshCw, AlertTriangle } from "lucide-react";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "How to Fix Wi-Fi Packet Loss: Signal & RF Interference Guide (2026)",
  description:
    "Stop Wi-Fi packet drops, signal attenuation, and channel congestion. Learn how to optimize 2.4GHz/5GHz bands, reduce ping spikes, and eliminate interference.",
  canonical: "/wifi-packet-loss",
  keywords: [
    "wifi packet loss",
    "fix wireless packet drops",
    "wifi channel interference",
    "5ghz packet loss",
    "reduce packet drops on wifi",
    "wifi signal decay",
    "ping spikes wifi",
  ],
});

export default async function WifiPacketLossPage() {
  const breadcrumbs = [
    { name: "Network Problems", url: "/wifi-keeps-disconnecting" },
    { name: "Fix Packet Loss", url: "/packet-loss-test" },
    { name: "Wi-Fi Packet Loss", url: "/wifi-packet-loss" },
  ];

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${APP_URL}/wifi-packet-loss#webpage`,
    "url": `${APP_URL}/wifi-packet-loss`,
    "name": "How to Fix Wi-Fi Packet Loss: Signal & RF Interference Guide (2026)",
    "description": "Stop Wi-Fi packet drops, signal attenuation, and channel congestion. Learn how to optimize 2.4GHz/5GHz bands, reduce ping spikes, and eliminate interference.",
    "about": {
      "@type": "Thing",
      "name": "Wi-Fi Packet Loss",
    },
  };

  const troubleshootingSteps = [
    {
      title: "Switch to the Less Congested 5 GHz or 6 GHz Frequency Bands",
      description:
        "The 2.4 GHz frequency band is heavily saturated. It only has three non-overlapping channels (1, 6, and 11) and shares bandwidth with Bluetooth, baby monitors, and microwave ovens, causing frequent packet collisions. Switch your gaming or streaming device to the 5 GHz or 6 GHz wireless band. These higher frequencies feature dozens of non-overlapping channels and far wider channel bandwidth (80MHz or 160MHz), drastically reducing packet collisions and latency spikes.",
      tip: "Configure your router's wireless settings to separate SSID names (e.g. 'HomeNet_2G' and 'HomeNet_5G') to force your gaming device to remain on the 5 GHz band.",
    },
    {
      title: "Perform a Wi-Fi Channel Scan to Avoid Overlapping Frequencies",
      description:
        "If you are surrounded by neighboring wireless networks, they may be broadcasting on the same channel, causing co-channel congestion. Download a Wi-Fi analyzer tool on your phone or laptop. Scan the local RF environment to identify which channels have the lowest signal overlap. Log into your router admin page (e.g., 192.168.1.1), navigate to Wireless Settings, change the channel selection from 'Auto' to a specific clean channel number (for 2.4GHz, use only 1, 6, or 11; for 5GHz, select a clear DFS or non-DFS channel).",
      tip: "DFS (Dynamic Frequency Selection) channels offer clean bandwidth but can temporarily disconnect if radar signals are detected nearby.",
    },
    {
      title: "Address Wireless Signal Attenuation and Distance Decay",
      description:
        "Physical obstacles like brick walls, concrete floors, metal studs, and water pipes absorb RF signals, causing attenuation. If your signal strength drops below -70 dBm, the signal-to-noise ratio (SNR) decreases, corrupting wireless packets. Relocate your wireless router to a central, elevated location. Ensure it is not placed inside a closet, metal cabinet, or directly behind a television screen.",
      tip: "If you must cover multiple floors, deploy a mesh Wi-Fi system with wired Ethernet backhauls rather than daisy-chaining cheap wireless repeaters, which halve bandwidth and double packet drops.",
    },
    {
      title: "Disable Power Saving States on Device Wireless Adapters",
      description:
        "Modern operating systems enable power management features on Wi-Fi cards by default. When the adapter enters low-power states, it increases sleep latency, delaying or dropping packet handshakes. On Windows, open Device Manager -> expand Network adapters -> right-click your Wi-Fi card -> click Properties. Under the Power Management tab, uncheck the box next to 'Allow the computer to turn off this device to save power'. Under the Advanced tab, change 'MIMO Power Save Mode' to 'No SMPS' or 'Maximum Performance'.",
    },
  ];

  const faqs = [
    {
      question: "Why does Wi-Fi cause more packet loss than Ethernet?",
      answer: "Wi-Fi is a shared, half-duplex medium prone to radio frequency (RF) interference, signal attenuation from physical obstacles, and packet collisions when multiple devices transmit simultaneously. Ethernet is a dedicated, full-duplex medium with shielding that isolates the physical signal, delivering 0% packet loss under normal operation.",
    },
    {
      question: "What is a good Wi-Fi signal strength to prevent packet drops?",
      answer: "A Wi-Fi signal strength between -30 dBm and -60 dBm is considered excellent and will deliver 0% packet loss. Once signal levels drop below -70 dBm, noise dominates the signal, leading to corrupted data frames and severe packet drops.",
    },
    {
      question: "Will a Wi-Fi extender fix my packet loss?",
      answer: "No, wireless range extenders or repeaters often increase packet loss. They must receive and re-transmit every packet on the same wireless channel, which increases packet collisions and doubles latency. To extend coverage safely, deploy a wired Access Point or a Mesh Wi-Fi system using Ethernet backhauls.",
    },
    {
      question: "What are DFS channels, and do they cause packet loss?",
      answer: "DFS (Dynamic Frequency Selection) channels are shared with weather and military radar systems. If your router detects radar activity on a DFS channel, it must immediately vacate the channel, causing a brief network drop of 20 to 60 seconds, which presents as temporary but complete packet loss.",
    },
    {
      question: "Does disabling 'Smart Connect' help reduce packet loss?",
      answer: "Yes. Smart Connect combines the 2.4GHz and 5GHz bands into a single SSID, letting the router decide which band your device should use. Under marginal signals, the router may repeatedly steer your gaming console back and forth between bands, causing disconnects and packet drops. Separating the SSIDs resolves this issue.",
    },
  ];

  const commonCauses = [
    {
      title: "RF Interference",
      desc: "Household electronics (microwaves, baby monitors) broadcasting on the shared 2.4 GHz spectrum, disrupting wireless data frames.",
    },
    {
      title: "Co-Channel Congestion",
      desc: "Multiple neighboring routers broadcasting on overlapping channel frequencies, causing transmission delays and collisions.",
    },
    {
      title: "Physical Obstacles",
      desc: "Reinforced concrete, brick, foil-backed insulation, and mirrors attenuating wireless signal power below readable levels.",
    },
  ];

  const quickFixChecklist = [
    "Connect to the 5 GHz Wi-Fi band instead of the older 2.4 GHz band.",
    "Relocate your wireless router to a central, elevated position away from physical obstacles.",
    "Change your router's wireless channel selection from 'Auto' to a clean, manually scanned channel.",
    "Disable power-saving modes in your computer's Wi-Fi adapter properties.",
    "Set up a dedicated SSID for the 5 GHz band to prevent devices from band-steering.",
  ];

  return (
    <>
      <JsonLd data={collectionPageSchema} />
      <TroubleshootingArticleShell
        h1="How to Fix Wi-Fi Packet Loss & Wireless Latency Spikes"
        intro="Wireless networks offer unmatched convenience, but are highly susceptible to packet drops. Radio frequency interference, co-channel congestion, and physical signal decay corrupt wireless frames, triggering stutters in games and video feeds. This guide outlines how to optimize your Wi-Fi channels, select the best frequency bands, and restore stable connectivity."
        category="wifi"
        breadcrumbs={breadcrumbs}
        faqs={faqs}
        troubleshootingSteps={troubleshootingSteps}
        warningBanner={{
          title: "Wi-Fi Half-Duplex Bandwidth Limit",
          text: "Wi-Fi is a half-duplex medium, meaning only one device can transmit on a channel at a time. If you have dozens of smart home IoT devices connected to the same band, packet collisions and latency spikes are inevitable.",
        }}
        quickFixChecklist={quickFixChecklist}
        commonCauses={commonCauses}
        severityLevel="medium"
        whenToContactISP="If you have optimized your channels and verified that packet drops only happen when your router connects to your ISP gateway, the issue resides in the modem interface. Contact your ISP to replace the gateway unit or update its wireless firmware."
      >
        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              1. 2.4 GHz vs. 5 GHz vs. 6 GHz Wi-Fi Comparison
            </h2>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
              Understand the performance differences between wireless bands when optimizing for packet loss:
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                    <th className="px-4 py-3 text-left">Wi-Fi Frequency Band</th>
                    <th className="px-4 py-3 text-left">Signal Range / Penetration</th>
                    <th className="px-4 py-3 text-left">Channel Congestion</th>
                    <th className="px-4 py-3 text-left">Average Packet Loss Rate</th>
                    <th className="px-4 py-3 text-left">Recommended Use Case</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">2.4 GHz (802.11b/g/n)</td>
                    <td className="px-4 py-3">Excellent (Long distance, passes through walls)</td>
                    <td className="px-4 py-3 text-red-400">Extreme (overlapping channels)</td>
                    <td className="px-4 py-3 text-red-400">High (&gt; 2% in congested areas)</td>
                    <td className="px-4 py-3">Smart home IoT, legacy devices, long-range browsing</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">5 GHz (802.11ac/ax)</td>
                    <td className="px-4 py-3">Moderate (Short range, easily blocked)</td>
                    <td className="px-4 py-3 text-green-400">Low (dozens of clean channels)</td>
                    <td className="px-4 py-3 text-green-400">Very Low (&lt; 0.2%)</td>
                    <td className="px-4 py-3">Gaming, 4K streaming, video calls</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">6 GHz (Wi-Fi 6E / Wi-Fi 7)</td>
                    <td className="px-4 py-3">Short (Line of sight, highly blocked)</td>
                    <td className="px-4 py-3 text-green-400">Zero (No legacy device overlap)</td>
                    <td className="px-4 py-3 text-green-400">Near Zero (~ 0.0%)</td>
                    <td className="px-4 py-3">Ultra-low latency VR, high-speed transfers</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              2. How to Measure Wi-Fi Signal Quality (SNR vs. RSSI)
            </h2>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed text-justify">
              When diagnosing wireless packet loss, you must evaluate both <strong>RSSI (Received Signal Strength Indicator)</strong> and <strong>SNR (Signal-to-Noise Ratio)</strong>. RSSI measures raw signal power, represented in decibels relative to a milliwatt (dBm). It ranges from -30 dBm (perfect) to -90 dBm (completely disconnected).
            </p>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed text-justify">
              However, high RSSI does not guarantee a stable connection if the local RF environment has high noise. SNR measures the difference between signal power and noise floor. A healthy network requires an SNR of at least <strong>25 dB</strong>. If your signal is -65 dBm but the local noise floor is -70 dBm (due to neighboring routers), your SNR is only 5 dB, resulting in corrupted frames and severe packet loss despite a decent signal indicator.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              3. Internal Linking Hub
            </h2>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
              Explore more diagnostic resources to optimize your wireless connection:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-elevated)] space-y-2">
                <h3 className="text-sm font-bold text-[var(--text-primary)]">Packet Loss Cluster</h3>
                <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--text-muted)]">
                  <li>Primary diagnostic page: <Link href="/packet-loss-test" className="text-[var(--brand-400)] hover:underline">Packet Loss Test Guide</Link></li>
                  <li>Gaming optimization: <Link href="/packet-loss-for-gaming" className="text-[var(--brand-400)] hover:underline">Gaming Packet Loss Guide</Link></li>
                  <li>Solve wired connection drops: <Link href="/ethernet-packet-loss" className="text-[var(--brand-400)] hover:underline">Ethernet Packet Loss Guide</Link></li>
                </ul>
              </div>
              <div className="p-4 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-elevated)] space-y-2">
                <h3 className="text-sm font-bold text-[var(--text-primary)]">Wireless Troubleshooting Guides</h3>
                <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--text-muted)]">
                  <li>Fix disconnect loops: <Link href="/wifi-keeps-disconnecting" className="text-[var(--brand-400)] hover:underline">Wi-Fi Keeps Disconnecting Guide</Link></li>
                  <li>Optimize mesh configurations: <Link href="/mesh-wifi-setup" className="text-[var(--brand-400)] hover:underline">Mesh Wi-Fi Setup Walkthrough</Link></li>
                  <li>Compare encryption protocols: <Link href="/wpa3-vs-wpa2" className="text-[var(--brand-400)] hover:underline">WPA2 vs WPA3 SAE Guide</Link></li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </TroubleshootingArticleShell>
    </>
  );
}
