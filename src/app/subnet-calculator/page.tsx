import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import NetworkingToolShell from "@/components/tools/NetworkingToolShell";
import SubnetCalculatorClient from "@/components/tools/SubnetCalculatorClient";

export const metadata: Metadata = buildMetadata({
  title: "IP Subnet Calculator | CIDR & Subnet Mask Tool — RouterVia",
  description:
    "Perform high-precision offline IP subnetting. Calculate CIDR prefixes, subnet masks, wildcards, network classes, broadcast boundaries, and usable IP host counts.",
  canonical: "/subnet-calculator",
  keywords: [
    "subnet calculator",
    "cidr calculator",
    "ip subnet calculator",
    "subnet mask checker",
    "calculate ip range",
    "network prefix calculator",
    "cidr subnet tool",
  ],
});

const breadcrumbs = [
  { name: "Tools", url: "/tools" },
  { name: "Subnet Calculator", url: "/subnet-calculator" },
];

const faqs = [
  {
    question: "What is subnetting and why is it useful?",
    answer: "Subnetting is the architectural partitioning of an IP network into smaller, logical sub-networks. This improves security control, optimizes routing overhead, isolates network broadcast storms, and prevents wasted IP address space.",
  },
  {
    question: "What does /24 mean in an IP address?",
    answer: "The '/24' notation represents the CIDR prefix length, indicating that the first 24 bits of the 32-bit IP address represent the network address, leaving the remaining 8 bits to identify unique host devices (supporting up to 254 usable hosts).",
  },
  {
    question: "Why do we subtract 2 from the total hosts in a subnet?",
    answer: "In any standard subnet, two IP addresses are strictly reserved: the first address (host bits all 0) represents the Network Address, and the last address (host bits all 1) represents the Broadcast Address. Neither can be assigned to physical devices.",
  },
  {
    question: "What is a subnet mask?",
    answer: "A subnet mask is a 32-bit mathematical mask used to divide an IP address into its network address and host address components. It sets network bits to 1s and host bits to 0s, resulting in formats like 255.255.255.0.",
  },
];

export default function SubnetCalculatorPage() {
  return (
    <NetworkingToolShell
      h1="IP Subnet Calculator"
      intro="Perform high-precision offline IP subnetting. Calculate CIDR prefixes, subnet masks, wildcards, network classes, broadcast boundaries, and usable IP host counts."
      toolType="subnet"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
    >
      <SubnetCalculatorClient />
    </NetworkingToolShell>
  );
}
