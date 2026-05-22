import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import WifiTroubleshooterClient from "@/components/tools/WifiTroubleshooterClient";

export const metadata: Metadata = buildMetadata({
  title: "WiFi Keeps Disconnecting? Unstable Connection Fixes — RouterVia",
  description:
    "Is your internet randomly disconnecting every few minutes? Learn how to fix unstable WiFi connections, channel congestion, DHCP leases, and Smart Connect drops.",
  canonical: "/wifi-keeps-disconnecting",
  keywords: [
    "wifi keeps disconnecting",
    "internet randomly disconnects",
    "unstable wifi connection",
    "wifi drops every few minutes",
    "dhcp lease renewal dropout",
    "smart connect wifi problems",
    "signal interference 2.4ghz"
  ],
});

const breadcrumbs = [
  { name: "WiFi Troubleshooting", url: "/wifi-keeps-disconnecting" },
  { name: "WiFi Disconnects", url: "/wifi-keeps-disconnecting" },
];

const troubleshootingSteps = [
  {
    title: "Separate the 2.4 GHz and 5 GHz Bands",
    description: "Disable 'Smart Connect' or band-steering inside your router admin dashboard. Give the 2.4GHz and 5GHz networks different names (SSIDs) to stop your devices from constantly hopping and dropping connection.",
    tip: "Rename the 5GHz band with a suffix like '_5G' and connect your high-traffic devices exclusively to it."
  },
  {
    title: "Change Channel Width to Avoid Overlaps",
    description: "Navigate to Wireless Settings. Set the 2.4GHz band channel width to strictly 20 MHz (not 40 MHz or Auto). This limits overlap with adjacent networks. For 5GHz, set it to 40 MHz or 80 MHz depending on router range.",
  },
  {
    title: "Deactivate Wireless Adapter Power Saving",
    description: "On Windows laptops/desktops, open Device Manager, expand Network Adapters, right-click your WiFi card, select Properties, open the Power Management tab, and uncheck 'Allow the computer to turn off this device to save power'.",
  },
  {
    title: "Increase DHCP Lease Time",
    description: "Log into your gateway dashboard. In the LAN / DHCP server settings, increase the Client Lease Time from 1 or 2 hours to 24 hours (1440 minutes) or 7 days to prevent frequent IP address renegotiations.",
    tip: "A short DHCP lease forces devices to renew their IP lease frequently, causing momentary drops on older network adapters."
  }
];

const faqs = [
  {
    question: "Why does my WiFi disconnect and reconnect randomly every few minutes?",
    answer: "This is typically caused by router band steering (Smart Connect), channel congestion from nearby networks, or wireless adapter power-saving settings. When the router tries to migrate your device between the 2.4GHz and 5GHz bands dynamically, it forces a physical socket drop, causing your internet to disconnect briefly."
  },
  {
    question: "Does microwave oven activity or other appliances interfere with WiFi?",
    answer: "Yes. Many household appliances (microwaves, baby monitors, Bluetooth speakers, cordless phones) operate on the unlicensed 2.4 GHz ISM frequency band. When in use, they emit electromagnetic radiation that swamps WiFi radio waves, causing high packet loss and disconnections."
  },
  {
    question: "Can a faulty router power supply cause connection dropouts?",
    answer: "Yes, a failing or incorrect AC adapter that cannot supply stable amperage to the router will cause the router to randomly reboot or brown out when network traffic spikes, resulting in all devices losing connection."
  }
];

export default function WifiKeepsDisconnectingPage() {
  return (
    <TroubleshootingArticleShell
      h1="How to Fix WiFi That Keeps Disconnecting"
      intro="If your internet connection drops randomly, or your devices disconnect every few minutes, follow our step-by-step diagnostic guide and use our interactive wizard to pin down the root cause."
      category="wifi"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
    >
      <div className="space-y-6">
        {/* Interactive wizard */}
        <WifiTroubleshooterClient issueType="disconnecting" />

        {/* Detailed SEO article section */}
        <article className="prose prose-invert max-w-none space-y-4 text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
          <h2 className="text-sm font-bold text-[var(--text-primary)]">Understanding WiFi Instability and Signal Decay</h2>
          <p>
            An unstable WiFi connection is rarely an issue with the actual fiber or copper internet line entering your home. Instead, it is almost always a result of <strong>airspace congestion</strong> or <strong>local configuration conflicts</strong>. In crowded apartment buildings, dozens of routers broadcast on identical channels, creating radio frequency collisions that result in corrupted packets.
          </p>
          <p>
            Furthermore, modern mesh systems and high-end routers utilize proprietary algorithms to steer client devices. While intended to keep you on the fastest node, <em>band steering</em> frequently miscalculates signal levels, forcing mobile phones or laptops to disassociate and re-associate continuously as you walk through your home.
          </p>
          <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
            <span className="font-bold text-[var(--text-primary)] block text-xs">Recommended Tools & Quick Links</span>
            <ul className="list-disc pl-4 space-y-1 text-[11px]">
              <li>Use our <a href="/dns-lookup" className="text-[var(--brand-400)] hover:underline">DNS Lookup Tool</a> to verify external hostnames are resolving correctly.</li>
              <li>Check your public connection address with the <a href="/public-ip-checker" className="text-[var(--brand-400)] hover:underline">Public IP Checker</a>.</li>
              <li>Learn how to configure specific brands in our <a href="/port-forwarding-guide" className="text-[var(--brand-400)] hover:underline">Port Forwarding Guide</a>.</li>
            </ul>
          </div>
        </article>
      </div>
    </TroubleshootingArticleShell>
  );
}
