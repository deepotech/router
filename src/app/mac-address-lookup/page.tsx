import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import NetworkingToolShell from "@/components/tools/NetworkingToolShell";
import MacLookupClient from "@/components/tools/MacLookupClient";

export const metadata: Metadata = buildMetadata({
  title: "MAC Address Lookup | Find Device Vendor & OUI Manufacturer — RouterVia",
  description:
    "Instantly identify the vendor and manufacturer of any device using its physical hardware MAC address. Reference our complete OUI database for network forensics.",
  canonical: "/mac-address-lookup",
  keywords: [
    "mac address lookup",
    "mac vendor lookup",
    "find mac manufacturer",
    "oui database lookup",
    "hardware address brand",
    "mac address finder",
    "ethernet vendor search",
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
];

export default function MacAddressLookupPage() {
  return (
    <NetworkingToolShell
      h1="MAC Address Lookup"
      intro="Instantly identify the vendor and manufacturer of any device using its physical hardware MAC address. Reference our complete OUI database for network forensics."
      toolType="mac"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
    >
      <MacLookupClient />
    </NetworkingToolShell>
  );
}
