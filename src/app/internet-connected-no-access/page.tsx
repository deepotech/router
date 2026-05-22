import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import WifiTroubleshooterClient from "@/components/tools/WifiTroubleshooterClient";

export const metadata: Metadata = buildMetadata({
  title: "WiFi Connected But No Internet? How to Fix No Access — RouterVia",
  description:
    "Are you connected to WiFi or Ethernet but have no internet access? Learn how to flush DNS, renew DHCP leases, resolve IPv6 conflicts, and bypass captive portals.",
  canonical: "/internet-connected-no-access",
  keywords: [
    "connected no internet",
    "wifi connected but no internet",
    "internet access unavailable",
    "ethernet connected no internet",
    "flush dns cmd settings",
    "dhcp renew release release ip",
    "ipv6 conflict no internet access"
  ],
});

const breadcrumbs = [
  { name: "WiFi Troubleshooting", url: "/wifi-keeps-disconnecting" },
  { name: "Internet Connected No Access", url: "/internet-connected-no-access" },
];

const troubleshootingSteps = [
  {
    title: "Flush DNS Cache and Reset TCP/IP Stack",
    description: "On Windows, open Command Prompt as Administrator and run: 'ipconfig /flushdns', then 'netsh int ip reset' and reboot. On macOS, open Terminal and run 'sudo killall -HUP mDNSResponder'.",
    tip: "Flushing DNS clears outdated domain mappings, forcing your computer to request clean IP addresses."
  },
  {
    title: "Release and Renew Your IP Address",
    description: "In the same command window, type 'ipconfig /release' to release your current lease, and then type 'ipconfig /renew' to acquire a fresh local IP address configuration from the router.",
  },
  {
    title: "Change to Public DNS Servers",
    description: "Log into your router admin dashboard (or your device's network properties) and replace the default ISP DNS. Set your primary DNS to '1.1.1.1' (Cloudflare) and secondary to '8.8.8.8' (Google).",
  },
  {
    title: "Disable IPv6 Connection Profile",
    description: "If your ISP does not fully support IPv6, go to Network and Sharing Center -> Change Adapter Options -> Right-click your connection -> Properties, and uncheck 'Internet Protocol Version 6 (TCP/IPv6)'.",
    tip: "A buggy IPv6 network negotiation often tricks operating systems into displaying a 'no internet' error status even when IPv4 works fine."
  }
];

const faqs = [
  {
    question: "Why does it say WiFi is connected but there is no internet access?",
    answer: "This means your device has successfully established a local wireless link with the router (Layer 2 connectivity) and has an IP address, but the router itself cannot forward packets to the public internet. Common reasons include dead DNS servers, ISP outages, expired DHCP leases, or VPN routing conflicts."
  },
  {
    question: "How do I bypass a captive portal that blocks internet access?",
    answer: "Captive portals (common in hotels/airports) require you to sign in before granting access. If the login page does not pop up automatically, open your browser and type 'neverssl.com' or the router's gateway IP (e.g. 192.168.1.1) in the address bar to force redirect."
  },
  {
    question: "Can third-party antivirus software cause this error?",
    answer: "Yes, active web shields and firewalls in suites like Avast, Bitdefender, or McAfee can sometimes block outbound web traffic if their local filters crash or become out of sync with system updates."
  }
];

export default function InternetConnectedNoAccessPage() {
  return (
    <TroubleshootingArticleShell
      h1="How to Fix 'Connected but No Internet Access'"
      intro="Stuck with a successful WiFi connection but unable to browse the web? Follow our detailed resolution workflow to flush your local DNS, reset your TCP/IP stack, and get back online."
      category="wifi"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
    >
      <div className="space-y-6">
        {/* Interactive wizard */}
        <WifiTroubleshooterClient issueType="no-internet" />

        {/* Detailed SEO article section */}
        <article className="prose prose-invert max-w-none space-y-4 text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
          <h2 className="text-sm font-bold text-[var(--text-primary)]">Layer 2 vs. Layer 3 Connection Breakdown</h2>
          <p>
            The 'Connected, No Internet' status is a classic symptom of a breakdown between the **Link Layer** and the **Network/Transport Layers**. Your computer’s wireless radio is actively communicating with the router’s antennas. The router has assigned your device an internal IP address (like 192.168.1.15). However, when your system attempts to send a test packet to Microsoft or Google to verify internet status, the route fails.
          </p>
          <p>
            In over 60% of cases, the bottleneck is a dead **Domain Name System (DNS)** resolver. If your ISP’s local DNS servers crash, your browser can no longer map friendly URLs (like google.com) to their numeric hosting servers. By manually redirecting your network settings to public DNS clusters like Cloudflare or Google, you bypass these ISP bottlenecks completely.
          </p>
          <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
            <span className="font-bold text-[var(--text-primary)] block text-xs">Recommended Tools & Quick Links</span>
            <ul className="list-disc pl-4 space-y-1 text-[11px]">
              <li>Is your DNS query resolving? Run a live query on our <a href="/dns-propagation-checker" className="text-[var(--brand-400)] hover:underline">Global DNS Propagation Checker</a>.</li>
              <li>Learn how to resolve port blocks with our <a href="/port-checker" className="text-[var(--brand-400)] hover:underline">Port Checker Utility</a>.</li>
              <li>Verify your device IP configuration with the <a href="/public-ip-checker" className="text-[var(--brand-400)] hover:underline">Public IP Checker Tool</a>.</li>
            </ul>
          </div>
        </article>
      </div>
    </TroubleshootingArticleShell>
  );
}
