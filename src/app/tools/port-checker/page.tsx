import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import NetworkingToolShell from "@/components/tools/NetworkingToolShell";
import PortCheckerClient from "@/components/tools/PortCheckerClient";

export const metadata: Metadata = buildMetadata({
  title: "Open Port Checker — Test If a TCP Port Is Open | RouterVia",
  description:
    "Instantly check if any TCP port is open or closed on any host or IP address. Test port forwarding, firewall rules, and service availability for free.",
  canonical: "/tools/port-checker",
  keywords: [
    "open port checker",
    "port checker",
    "check port online",
    "tcp port test",
    "is port open",
    "port forwarding test",
    "firewall port checker",
    "port scanner online",
  ],
});

const breadcrumbs = [
  { name: "Tools", url: "/tools" },
  { name: "Port Checker", url: "/tools/port-checker" },
];

const faqs = [
  {
    question: "What is an open port and why does it matter?",
    answer:
      "An open port is a TCP/UDP network port that is actively accepting incoming connections because a service or process is listening on it. Open ports matter because they are the entry points for network communication — a web server needs port 80/443 open, an SSH server needs port 22 open, and game servers need their specific ports open. Unnecessary open ports also represent attack surfaces for hackers.",
  },
  {
    question: "Why is my port showing as closed even though I set up port forwarding?",
    answer:
      "Several issues can block port forwarding from working: (1) Your ISP may be blocking the port at the network level — especially common for ports 25, 80, and 443 on residential accounts. (2) Your modem is in bridge mode but your router has a double NAT configuration. (3) The firewall on your computer is blocking inbound connections even though the router is forwarding. (4) You forwarded to the wrong internal IP address. Run 'ipconfig' to verify your device's actual local IP and check the router's port forwarding table.",
  },
  {
    question: "What is the difference between TCP and UDP ports?",
    answer:
      "TCP (Transmission Control Protocol) ports use a connection-oriented three-way handshake (SYN, SYN-ACK, ACK) that guarantees reliable, ordered packet delivery. This handshake makes TCP ports easy to test remotely. UDP (User Datagram Protocol) ports are connectionless and fire-and-forget — no handshake occurs. Because UDP has no acknowledgement mechanism, silent firewalls and active services look identical, making UDP port testing unreliable from a remote checker.",
  },
  {
    question: "What are the most common ports I should know?",
    answer:
      "Key port numbers: 21 (FTP), 22 (SSH), 25 (SMTP email), 53 (DNS), 80 (HTTP web), 110 (POP3 email), 143 (IMAP email), 443 (HTTPS web), 3306 (MySQL), 3389 (Windows Remote Desktop), 5432 (PostgreSQL), 8080 (alternative HTTP). Game-specific ports: Minecraft (25565), Steam (27015-27030), Fortnite (5222), Call of Duty (3074).",
  },
  {
    question: "What does 'filtered' mean vs 'closed'?",
    answer:
      "A 'closed' port actively rejects the connection with a TCP RST (Reset) packet — the host is reachable but nothing is listening. A 'filtered' port silently drops incoming SYN packets without responding, causing connection attempts to time out. Filtered ports are typically protected by a stateful firewall (router firewall, iptables, Windows Defender Firewall) configured to DROP rather than REJECT packets.",
  },
  {
    question: "How do I check my own external IP's open ports?",
    answer:
      "To check ports on your own router's public IP: (1) Find your public IP at routervia.com/check-my-ip. (2) Enter that IP address in the host field of the port checker. (3) Enter the port number you want to test. (4) This will confirm whether your router is correctly forwarding the port to your internal service. Note: You must have port forwarding configured on your router for the port to appear open.",
  },
  {
    question: "Why does my ISP block certain ports?",
    answer:
      "ISPs block ports to prevent abuse and reduce spam on their network. Residential accounts commonly have ports 25 (SMTP), 135-139 (Windows NetBIOS), and 445 (SMB/file sharing) blocked by default to prevent email spamming and worm propagation. Some ISPs also block ports 80 and 443 on residential plans to prevent customers from running commercial web servers. Business accounts typically have fewer port restrictions.",
  },
];

export default function PortCheckerPage() {
  return (
    <NetworkingToolShell
      h1="Open Port Checker"
      intro="Instantly check if a TCP port is open or closed on any host or IP. Test port forwarding rules, verify firewall configurations, and confirm service availability."
      toolType="port"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
    >
      <PortCheckerClient />
    </NetworkingToolShell>
  );
}
