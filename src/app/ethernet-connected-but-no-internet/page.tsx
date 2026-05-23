import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import ConnectionOptimizerClient from "@/components/tools/ConnectionOptimizerClient";

export const metadata: Metadata = buildMetadata({
  title: "Ethernet Connected But No Internet? How to Fix It — RouterVia",
  description:
    "Is your wired Ethernet showing connected but no internet access? Learn how to diagnose APIPA IP conflicts, flush DNS, reset Winsock, and repair router WAN connections.",
  canonical: "/ethernet-connected-but-no-internet",
  keywords: [
    "ethernet connected but no internet",
    "lan connected no internet",
    "wired connection no internet",
    "ethernet internet unavailable",
    "unidentified network ethernet",
    "netsh winsock reset command",
    "dhcp renew release release ip"
  ],
});

const breadcrumbs = [
  { name: "WiFi Troubleshooting", url: "/wifi-keeps-disconnecting" },
  { name: "Ethernet Connected No Internet", url: "/ethernet-connected-but-no-internet" },
];

const troubleshootingSteps = [
  {
    title: "Verify Physical Port and Cable Link",
    description: "Unplug the Ethernet cable from both your computer's adapter and the router's LAN port. Re-insert it until you hear a clear click. Check if the green/amber link indicator LEDs on the port begin flashing.",
    tip: "Avoid long flat Ethernet cables which lack proper twisted-pair shielding and are highly prone to electromagnetic interference."
  },
  {
    title: "Reset TCP/IP Stack and Winsock Catalog",
    description: "Open Command Prompt as Administrator. Type 'netsh int ip reset' and press Enter to reset the routing table. Next, type 'netsh winsock reset' and press Enter. Reboot your computer.",
    tip: "This step removes residual network socket binds created by crashed VPNs, proxy clients, or security tools."
  },
  {
    title: "Release and Request a New DHCP IP Lease",
    description: "In the same command prompt window, type 'ipconfig /release' to drop your current IP configuration. Then type 'ipconfig /renew' to request a new IP address and default gateway route from the router.",
  },
  {
    title: "Verify Router WAN Connection Status",
    description: "Log into your router (e.g. 192.168.1.1). Under WAN or Internet settings, verify if the router has received an external IP. If it shows 0.0.0.0, power cycle your internet modem or ONT fiber box.",
    tip: "If your router shows an active WAN IP but you can't load pages, the issue is likely a DNS configuration mismatch."
  }
];

const faqs = [
  {
    question: "Why does my PC say Ethernet is connected but there is no internet?",
    answer: "This means your computer has successfully established a local physical link (Layer 1 and 2) with the router and has an IP address. However, the router cannot forward packets to the public internet, usually due to a WAN link failure, DNS issue, or ISP outage."
  },
  {
    question: "What does 'Unidentified Network' mean on an Ethernet connection?",
    answer: "This indicates that the computer was unable to receive a configuration response from the router's DHCP server. The operating system assigns a default local APIPA address (169.254.x.x) which has no default gateway, preventing external traffic."
  },
  {
    question: "Can a bad Ethernet cable cause a 'No Internet' status?",
    answer: "Yes. Degraded cables or loose connectors can suffer from broken internal copper pairs. The cable might negotiate a physical link but fail to transmit data frames properly, leading to packet loss and disconnected states."
  }
];

export default function EthernetConnectedButNoInternetPage() {
  return (
    <TroubleshootingArticleShell
      h1="How to Fix 'Ethernet Connected but No Internet'"
      intro="Stuck with a successful physical cable link but unable to load websites? Follow our detailed diagnostics to reset your TCP/IP catalog, resolve APIPA address configurations, and restore WAN communication."
      category="wifi"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
    >
      <div className="space-y-6">
        <ConnectionOptimizerClient mode="ethernet-no-internet" />

        <article className="prose prose-invert max-w-none space-y-4 text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
          <h2 className="text-sm font-bold text-[var(--text-primary)]">Layer 1 Physical Link vs. Layer 3 Internet Routing</h2>
          <p>
            When Windows displays the <strong>'Unidentified Network'</strong> error on an Ethernet connection, it indicates a failure in Layer 2 (Data Link) or Layer 3 (Network) negotiations. Physically, the ethernet adapter card has established an electrical link (Layer 1) with the router's switchport. However, the system is not receiving DHCP configuration frames.
          </p>
          <p>
            In most consumer routers, this configuration failure happens when the router's internal DHCP server hangs or when a static IP subnet mismatch blocks communication. Manually configuring DHCP options or power cycling the router clears the routing table, restoring local address allocation.
          </p>
          <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
            <span className="font-bold text-[var(--text-primary)] block text-xs">Recommended Tools & Quick Links</span>
            <ul className="list-disc pl-4 space-y-1 text-[11px]">
              <li>Is your WAN gateway signal down? Follow the <a href="/router-not-detecting-wan" className="text-[var(--brand-400)] hover:underline">Router WAN Port Troubleshooting Guide</a>.</li>
              <li>Test your connection parameters with the <a href="/port-checker" className="text-[var(--brand-400)] hover:underline">Port Checker Utility</a>.</li>
              <li>Verify your device IP configuration with the <a href="/public-ip-checker" className="text-[var(--brand-400)] hover:underline">Public IP Checker Tool</a>.</li>
              <li>Learn how to log in and update gateway settings at <a href="/ips/192-168-1-1" className="text-[var(--brand-400)] hover:underline">192.168.1.1</a>.</li>
            </ul>
          </div>
        </article>
      </div>
    </TroubleshootingArticleShell>
  );
}
