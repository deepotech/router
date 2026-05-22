import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import NetworkingToolShell from "@/components/tools/NetworkingToolShell";
import PortCheckerClient from "@/components/tools/PortCheckerClient";

export const metadata: Metadata = buildMetadata({
  title: "Open Port Checker | Test Port Forwarding Online — RouterVia",
  description:
    "Test if specific TCP ports are open, closed, or stealth on your IP address. Verify port forwarding configurations for gaming, security cameras, or home servers.",
  canonical: "/port-checker",
  keywords: [
    "port checker",
    "check open ports",
    "port scanner online",
    "test port forwarding",
    "router port test",
    "tcp port checker",
    "firewall port scanner",
  ],
});

const breadcrumbs = [
  { name: "Tools", url: "/tools" },
  { name: "Port Checker", url: "/port-checker" },
];

const faqs = [
  {
    question: "What is port forwarding and why do I need it?",
    answer: "Port forwarding is a router configuration that routes external internet traffic on a specific port to a specific device on your private local network. It is essential for hosting game servers, remote desktop access, or hosting websites from home.",
  },
  {
    question: "Why does my port checker say 'Closed'?",
    answer: "A port will show as closed if no application is actively running and listening on that port, if your router's port forwarding rules are misconfigured, or if an internal firewall (like Windows Defender Firewall) is blocking the inbound connection.",
  },
  {
    question: "Is it dangerous to leave ports open?",
    answer: "Leaving ports open is not inherently dangerous, but it does expose the service listening on that port to the public internet. If the listening application has security vulnerabilities or uses weak passwords, malicious actors could exploit it to compromise your network.",
  },
  {
    question: "What is the difference between a Closed port and a Filtered port?",
    answer: "A 'Closed' port actively rejects connections by responding with a TCP RST packet. A 'Filtered' port (often called stealth) simply ignores the request, causing the connection attempt to time out. Filtered states are typically caused by firewalls silently dropping traffic.",
  },
];

export default function PortCheckerPage() {
  return (
    <NetworkingToolShell
      h1="Open Port Checker"
      intro="Test if specific TCP ports are open, closed, or stealth on your IP address. Verify port forwarding configurations for gaming, security cameras, or home servers."
      toolType="port"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
    >
      <PortCheckerClient />
    </NetworkingToolShell>
  );
}
