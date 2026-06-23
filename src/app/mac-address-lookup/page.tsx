import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import NetworkingToolShell from "@/components/tools/NetworkingToolShell";
import MacLookupClient from "@/components/tools/MacLookupClient";

export const metadata: Metadata = buildMetadata({
  title: "MAC Address Lookup | Find Device Vendor & OUI Manufacturer (Updated 2026)",
  description:
    "Instantly identify the vendor, brand, and hardware manufacturer of any device using its physical MAC address. Free OUI lookup tool for network analysis.",
  canonical: "/mac-address-lookup",
  keywords: [
    "mac address lookup",
    "mac vendor lookup",
    "find mac manufacturer",
    "oui database lookup",
    "hardware address brand",
    "mac address finder",
    "ethernet vendor search",
    "how to find mac address",
    "oui prefix check",
  ],
});

const breadcrumbs = [
  { name: "Tools", url: "/tools" },
  { name: "MAC Address Lookup", url: "/mac-address-lookup" },
];

const faqs = [
  {
    question: "What is a MAC address?",
    answer: "A MAC (Media Access Control) address is a unique 12-character physical hardware address assigned to a network interface controller (NIC) by its manufacturer. It is used as a network address for most IEEE 802 network technologies, including Ethernet and Wi-Fi.",
  },
  {
    question: "How do I find my device's MAC address?",
    answer: "On Windows, open Command Prompt and type 'getmac' or 'ipconfig /all'. On macOS/Linux, open Terminal and run 'ifconfig' or 'ip link'. On iOS/Android, go to Settings -> About Phone/Tablet -> Status or Hardware Information.",
  },
  {
    question: "What is an OUI?",
    answer: "An OUI (Organizationally Unique Identifier) is the first 24 bits (three octets) of a MAC address. OUIs are purchased from the IEEE by companies and manufacturers to uniquely identify their network-capable products.",
  },
  {
    question: "Why does the tool show 'Unknown Vendor' for some devices?",
    answer: "This usually occurs if the MAC address is randomized (a privacy feature on modern smartphones and laptops) or if it belongs to a brand new manufacturer OUI that has not yet been synced with the public IEEE database registers.",
  },
  {
    question: "What is MAC Address Randomization?",
    answer: "MAC address randomization is a privacy feature built into modern operating systems (like iOS 14+, Android 10+, and Windows 10/11). When scanning for or connecting to Wi-Fi networks, the device generates a temporary, randomized MAC address to prevent third parties from tracking your physical location.",
  },
  {
    question: "How can I tell if a MAC address is randomized?",
    answer: "You can identify a randomized MAC address by looking at the second character of the first octet. If the character is 2, 6, A, or E (e.g., x2:xx:xx:xx:xx:xx), it is a locally administered address, which confirms randomization is active.",
  },
  {
    question: "Can two devices have the same MAC address?",
    answer: "In theory, no. Every hardware MAC address is meant to be globally unique. However, MAC addresses can be changed or spoofed in software, meaning two devices on different networks could use the same MAC address. On the same local subnet, duplicate MAC addresses will cause severe IP conflict drops.",
  },
  {
    question: "What is the difference between a MAC address and an IP address?",
    answer: "A MAC address is a physical address burned into the hardware at the factory and operates at Layer 2 (Data Link) of the OSI model. An IP address is a logical address assigned dynamically by routers (DHCP) at Layer 3 (Network) to specify where a device is located on a network.",
  },
  {
    question: "Why do routers use MAC addresses for MAC Filtering?",
    answer: "Routers use MAC address filtering as a security layer to allow or block specific hardware from associating with the wireless network. Because MAC addresses are hardware-level, they are harder to bypass than IP addresses, though determined attackers can still spoof permitted MACs.",
  },
  {
    question: "What is the format of a MAC address?",
    answer: "A MAC address is typically written in one of three formats: colon-hexadecimal notation (e.g., 00:1A:2B:3C:4D:5E), hyphen-hexadecimal notation (e.g., 00-1A-2B-3C-4D-5E), or dot-hexadecimal notation (e.g., 001.a2b.3c4.d5e).",
  }
];

export default function MacAddressLookupPage() {
  return (
    <NetworkingToolShell
      h1="MAC Address Lookup & OUI Analyzer"
      intro="Instantly identify the vendor, brand, and hardware manufacturer of any network device using its physical MAC address. Search our comprehensive Organizationally Unique Identifier (OUI) database."
      toolType="mac"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
    >
      <div className="space-y-6">
        <MacLookupClient />
        
        {/* Technical Article Body */}
        <article className="prose prose-invert max-w-none mt-10 space-y-6 text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
          <h2 className="text-sm font-bold text-[var(--text-primary)]">Understanding the Structure of a MAC Address</h2>
          <p>
            A Media Access Control (MAC) address consists of 48 bits, represented as 12 hexadecimal characters separated by colons or hyphens (e.g., <code>00:1A:2B:3C:4D:5E</code>). These 48 bits are divided into two equal parts:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-[11px] text-[var(--text-muted)]">
            <li>
              <strong>Organizationally Unique Identifier (OUI):</strong> The first 24 bits (first 6 characters) represent the manufacturer ID. OUIs are formally assigned and registered by the IEEE. Looking up this prefix reveals the brand of the network card (e.g., Intel, Apple, Cisco).
            </li>
            <li>
              <strong>Network Interface Controller (NIC) Specific:</strong> The remaining 24 bits (last 6 characters) are assigned by the manufacturer to uniquely identify that specific physical chip. No two chips from the same manufacturer share this suffix.
            </li>
          </ul>

          <h2 className="text-sm font-bold text-[var(--text-primary)]">MAC Address Randomization and Locally Administered Addresses (LAA)</h2>
          <p>
            To protect user privacy and prevent tracking across public Wi-Fi access points, modern operating systems like iOS, Android, and Windows implement **MAC Randomization**. When randomization is active, your device does not broadcast its real burned-in MAC address (BIA). Instead, it generates a randomized locally administered MAC address.
          </p>
          <p>
            You can verify if a MAC address is randomized by checking the first octet. If the second hexadecimal character of the address is **2, 6, A, or E** (representing bit values 10 in binary for the local administration bit), the address was generated dynamically in software. Randomized MACs will show up as "Unknown Vendor" because they do not have a registered OUI in the IEEE registry.
          </p>

          <h2 className="text-sm font-bold text-[var(--text-primary)]">How to Find Your MAC Address on Different Systems</h2>
          <p>
            Follow these instructions to locate the physical hardware address of your device:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">Operating System</th>
                  <th className="px-3 py-2 text-left">Navigation Command / Path</th>
                  <th className="px-3 py-2 text-left">Key Identifier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2 font-bold">Windows 10 / 11</td>
                  <td className="px-3 py-2 font-mono">cmd &rarr; ipconfig /all (or getmac)</td>
                  <td className="px-3 py-2">Physical Address</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-bold">macOS</td>
                  <td className="px-3 py-2 font-mono">Terminal &rarr; ifconfig (or System Settings &rarr; Network &rarr; Details)</td>
                  <td className="px-3 py-2">ether (or MAC Address)</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-bold">Linux</td>
                  <td className="px-3 py-2 font-mono">Terminal &rarr; ip link show</td>
                  <td className="px-3 py-2">link/ether</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-bold">Android</td>
                  <td className="px-3 py-2">Settings &rarr; About Phone &rarr; Status Information</td>
                  <td className="px-3 py-2">Wi-Fi MAC Address</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-bold">iOS (iPhone/iPad)</td>
                  <td className="px-3 py-2">Settings &rarr; General &rarr; About</td>
                  <td className="px-3 py-2">Wi-Fi Address</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-sm font-bold text-[var(--text-primary)]">Why Do Network Engineers Use MAC Lookups?</h2>
          <p>
            MAC address analysis is a core part of network security, device auditing, and troubleshooting:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-[11px] text-[var(--text-muted)]">
            <li>
              <strong>Intruder Detection:</strong> When auditing your router's connected client list, running MAC lookups helps identify unrecognized devices (e.g. distinguishing an IoT smart bulb from an intruder's laptop).
            </li>
            <li>
              <strong>Static DHCP Reservations:</strong> Binding a local IP address to a device's MAC address ensures it always receives the same IP, which is crucial for port forwarding.
            </li>
            <li>
              <strong>Hardware Spoofing Verification:</strong> Verification of MAC structures helps identify legacy devices or spoofed hardware trying to bypass network restrictions.
            </li>
          </ul>

          <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
            <span className="font-bold text-[var(--text-primary)] block text-xs">Deep Diagnostics & Internal Authority Links</span>
            <ul className="list-disc pl-4 space-y-1 text-[11px]">
              <li>If you need to configure static mappings, read our <a href="/router-not-assigning-ip-addresses" className="text-[var(--brand-400)] hover:underline">DHCP Address Allocation Guide</a>.</li>
              <li>Verify your primary router access gateway address at the <a href="/ips/192-168-1-1" className="text-[var(--brand-400)] hover:underline">192.168.1.1 Gateway Portal</a>.</li>
              <li>Learn how to resolve gateway dropouts at the <a href="/default-gateway-not-available" className="text-[var(--brand-400)] hover:underline">Default Gateway Diagnostics Guide</a>.</li>
              <li>Analyze double translation layers in our <a href="/double-nat-detected" className="text-[var(--brand-400)] hover:underline">Double NAT Troubleshooting Walkthrough</a>.</li>
              <li>Find the fastest DNS configs using the <a href="/best-dns-for-faster-internet" className="text-[var(--brand-400)] hover:underline">Best DNS Servers Guide</a>.</li>
              <li>Configure manual settings for consoles with the <a href="/best-dns-for-ps5" className="text-[var(--brand-400)] hover:underline">Best DNS for PS5 Walkthrough</a>.</li>
              <li>Isolate packet drops on Wi-Fi or Ethernet using our <a href="/packet-loss-test" className="text-[var(--brand-400)] hover:underline">Packet Loss Test Tool</a>.</li>
            </ul>
          </div>
        </article>
      </div>
    </NetworkingToolShell>
  );
}
