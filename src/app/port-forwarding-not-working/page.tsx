import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import ConnectionOptimizerClient from "@/components/tools/ConnectionOptimizerClient";
import { ShieldAlert, Server, Settings, Globe, Shield, Terminal, Network, HelpCircle, HardDrive, Cpu } from "lucide-react";

// Premium SEO Metadata
export const metadata: Metadata = buildMetadata({
  title: "Port Forwarding Not Working? Fix Closed Ports & Router Rules — RouterVia",
  description:
    "Troubleshoot broken port forwarding rules. Ultimate networking guide to fix closed ports, resolve local application socket bindings, bypass CGNAT, clear UPnP conflicts, and fix Double NAT.",
  canonical: "/port-forwarding-not-working",
  keywords: [
    "port forwarding not working",
    "how to fix port forwarding",
    "router port forwarding issue",
    "open ports not working",
    "gaming port forwarding",
    "port forwarding failed",
    "nat forwarding problem",
  ],
});

const breadcrumbs = [
  { name: "Gaming Tools", url: "/nat-type-checker" },
  { name: "Port Forwarding Not Working", url: "/port-forwarding-not-working" },
];

const troubleshootingSteps = [
  {
    title: "Verify Host Listening State and Port Binding",
    description:
      "A port cannot show as open on external checkers unless a service is actively listening on that interface. Ensure your game server, NAS, or application is fully launched. Use local command utilities like 'netstat -ano' (Windows) or 'ss -tulpn' (Linux) to check that the port is bound to the wildcard IP address (0.0.0.0 or [::]) and not the local loopback (127.0.0.1). If it is bound to loopback, the system will discard packets arriving from your router.",
    tip: "Configure your server software configurations to bind to '0.0.0.0' or '*' to accept network-wide traffic rather than local loopback.",
  },
  {
    title: "Configure Firewall Rules to Allow Inbound Sockets",
    description:
      "Modern operating system firewalls silently drop unsolicited inbound connections. In Windows Defender, create a custom Inbound Rule specifying the port and protocol (TCP or UDP) with the action set to 'Allow'. On Linux systems running ufw, execute 'sudo ufw allow <port>/<protocol>'. On routers or security software suites (Norton, Kaspersky, Bitdefender), add exclusions inside their proprietary firewall configuration portals.",
    tip: "Never disable your firewall entirely. Instead, use narrow port-specific exception parameters to maintain a secure profile.",
  },
  {
    title: "Validate Carrier-Grade NAT (CGNAT) Exclusion",
    description:
      "Check your router's WAN IP in the administration dashboard. If the WAN IP address falls within the 100.64.0.0/10 range (100.64.0.0 to 100.127.255.255), your ISP is utilizing CGNAT. In this scenario, inbound port redirection is blocked at the carrier's gateway, ignoring any configurations you set up on your local router.",
    tip: "Contact your ISP to request a dynamic public IP or buy a static IP. Alternatively, utilize overlay networks like Tailscale or Cloudflare Tunnels.",
  },
  {
    title: "Deconflict Cascading Double NAT Interfaces",
    description:
      "If your secondary router's WAN port is assigned a private IP address (such as 192.168.x.x or 10.x.x.x) by an upstream ISP modem-router combo, you are in a Double NAT state. Packets redirected from the public internet terminate at the ISP modem's translation table and never reach your secondary router's network interfaces.",
    tip: "Configure the ISP-provided modem to 'Bridge Mode' or 'IP Passthrough' to pass the public IP directly to your secondary router. Learn more in our Double NAT guide.",
  },
  {
    title: "Disable UPnP to Clean Translation Table Conflicts",
    description:
      "Universal Plug and Play (UPnP) dynamically allocates port redirect maps. When UPnP tries to allocate the same ports as your manual static port forwarding rules, conntrack table collisions occur, causing the router's processor to drop packets. Navigate to your router's advanced settings and set UPnP to 'Disabled'.",
    tip: "Reboot both the router and your host computer after disabling UPnP to completely flush the active translation memory tables.",
  },
  {
    title: "Bypass ISP Carrier Port Filters and Disable SIP ALG",
    description:
      "Many residential ISPs actively filter common incoming ports (like 25, 80, 443, 21, 22) to prevent users from hosting commercial web or mail servers. Also, search under your router's advanced settings or firewall settings for 'SIP ALG' and set it to 'Disabled', as this helper tool frequently corrupts game packet headers.",
    tip: "If you are hosting a web server locally under port 80, map the external port on your router to a high-numbered port like 8080 while mapping the internal port to 80.",
  },
];

const faqs = [
  {
    question: "Why does my port forwarding test fail when the rule is enabled in the router?",
    answer:
      "A port forward rule only instructs the router where to redirect incoming traffic; it does not keep the port open. If the target application or game server is not running on your host computer, or if the server binds to localhost (127.0.0.1) instead of the wildcard interface (0.0.0.0), there is no listener to respond to the port checker. The test probe times out and reports as closed. Additionally, operating system firewalls (like Windows Defender) and third-party antivirus suites will block the probe unless an inbound rule is configured.",
  },
  {
    question: "What is NAT Loopback (Hairpinning) and why can't I join my own server using the public IP?",
    answer:
      "NAT Loopback is a feature that allows devices on the local LAN to access a local server using the network's public IP address. If your router does not support NAT Loopback, any connection attempts to your public IP from inside the network will fail. This does not mean your port forwarding rule is broken for the outside world. To test your server locally, connect using the local private IP address (e.g. 192.168.1.150) or localhost.",
  },
  {
    question: "How can I bypass CGNAT if my internet provider refuses to assign a public IP?",
    answer:
      "If your ISP uses Carrier-Grade NAT (CGNAT) and will not supply a public IP, standard port forwarding is impossible. You can bypass CGNAT by setting up a Cloudflare Tunnel (for HTTP/HTTPS traffic), using overlay networks like Tailscale or ZeroTier to establish encrypted peer-to-peer tunnels with your friends, or using reverse proxies like ngrok or playit.gg that host a public entry point on their servers and tunnel the traffic back to your local client.",
  },
  {
    question: "Why do UDP port checks always show as closed on scanner tools?",
    answer:
      "TCP is a connection-oriented protocol that uses a three-way handshake (SYN, SYN-ACK, ACK) to establish connections. Port checkers send a SYN packet and look for a SYN-ACK to confirm the port is open. UDP is connectionless and stateless; it does not acknowledge incoming packets. Unless the application listening on the UDP port is programmed to send a specific response payload back to the scanner, the checker receives nothing and reports the port as closed or filtered. The best way to test UDP forwarding is to run an active connection test inside the game or app.",
  },
  {
    question: "How do I fix a Double NAT issue preventing my port forwarding?",
    answer:
      "Double NAT occurs when you have two routers translating IP addresses in series. To resolve this, log into the ISP-provided modem/gateway and toggle it to 'Bridge Mode' or 'IP Passthrough' (refer to our default gateway guide to find its login IP). This disables its internal DHCP and routing functions, passing the public IP directly to your personal router. If bridge mode is unavailable, assign your personal router a static WAN IP in the ISP gateway and add that IP to its DMZ (Demilitarized Zone) settings.",
  },
  {
    question: "Is it safe to use UPnP instead of manually forwarding ports?",
    answer:
      "While Universal Plug and Play (UPnP) is convenient because it allows applications to dynamically map ports as needed, it carries significant security risks. Any malware or unverified software running on your network can request the router to open inbound ports without user authentication, exposing local devices to external scans. For maximum security, disable UPnP entirely and configure manual, narrow port forwarding rules targeting specific local IP addresses.",
  },
  {
    question: "Why did my port forwarding rule stop working after I restarted my PC?",
    answer:
      "When your computer restarts, the router's DHCP server may assign it a new local IP address. Since your port forwarding rule points to your old local IP, the forwarded traffic is directed to a non-existent device or a different computer. To prevent this, you must reserve a static IP address for your host PC. This is done by binding your network card's physical MAC address to a permanent local IP in the DHCP Server or Address Reservation section of your router.",
  },
  {
    question: "Can an antivirus software block port forwarding even if Windows Firewall is open?",
    answer:
      "Yes. Premium antivirus packages (such as Bitdefender, Kaspersky, Norton, and McAfee) include proprietary firewall engines that run at the kernel level. Disabling Windows Defender Firewall has no effect on these third-party security stacks. You must open your antivirus settings dashboard, locate the network threat or firewall section, and add a specific inbound port rule for your application, or temporarily toggle off their network protection module to isolate the issue.",
  },
  {
    question: "Which ports are blocked by default by residential ISPs?",
    answer:
      "Most residential internet service providers block incoming traffic on ports 25 (SMTP), 80 (HTTP), 443 (HTTPS), 21 (FTP), and 22 (SSH) to prevent residential connections from hosting mail servers, web servers, or file distribution nodes, which violate standard consumer terms of service. If you need to host a service on these ports, you can often configure your router to map a high-numbered external port (like 8080 or 2222) to the standard internal port on your host machine.",
  },
  {
    question: "What is the difference between Port Forwarding and DMZ?",
    answer:
      "Port forwarding redirects traffic arriving on specific ports (e.g. port 25565 for Minecraft) to a designated local IP address, keeping all other ports protected by the firewall. DMZ (Demilitarized Zone) forwards ALL unsolicited incoming traffic on every port directly to a single local device. While placing a gaming console in the DMZ is generally safe due to its closed architecture, you should NEVER place a Windows PC, NAS, or CCTV camera in the DMZ, as it exposes the device to automated external attacks.",
  },
];

const commonCauses = [
  {
    title: "Unbound Application Socket",
    desc: "The host server is offline or bound to the loopback IP (127.0.0.1) instead of the wildcard interface (0.0.0.0), rejecting external packets.",
  },
  {
    title: "DHCP Local IP Shifts",
    desc: "The target device obtained a new local IP address from the router's DHCP pool, rendering the port forward rule mismatched.",
  },
  {
    title: "Operating System Firewall Blocks",
    desc: "Windows Defender, macOS socket security, or Linux ufw/iptables dropping incoming packets at the host kernel layer.",
  },
  {
    title: "Carrier-Grade NAT (CGNAT)",
    desc: "The internet provider allocates a shared private IP (100.64.x.x range) on the WAN interface, blocking incoming routing paths.",
  },
  {
    title: "UPnP Mapping Overlaps",
    desc: "Dynamic UPnP allocations clashing with static port forwarding rules for the same ports in the router's conntrack memory.",
  },
  {
    title: "Double NAT Topologies",
    desc: "Two cascading routers running address translation, causing incoming packets to terminate at the upstream gateway's WAN interface.",
  },
];

const quickFixChecklist = [
  "Confirm your server software is running and listening on all interfaces (0.0.0.0).",
  "Reserve a static IP for your target device in the router's DHCP reservation menu.",
  "Create an inbound exception rule for the TCP/UDP port in your local OS firewall.",
  "Check your router's WAN IP to ensure it is public and does not fall under 100.64.0.0/10.",
  "Disable UPnP in advanced settings to prevent conntrack translation collisions.",
  "Ensure your ISP gateway is in Bridge Mode if you are using a secondary personal router.",
  "Test TCP ports using telnet or Test-NetConnection instead of web browser scans.",
];

export default function PortForwardingNotWorkingPage() {
  return (
    <TroubleshootingArticleShell
      h1="Port Forwarding Not Working? Fix Closed Ports & Router Rules"
      intro="You configured port forwarding rules on your router, but external port checkers still report them as 'closed' and clients fail to connect. Troubleshooting this issue requires a structured, expert-level examination of application socket states, local firewall tables, and carrier-level translation boundaries. Follow this technical blueprint to resolve closed ports, bypass CGNAT, clear UPnP collisions, and eliminate Double NAT bottlenecks."
      category="nat"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "Configuration Warning",
        text: "Modifying network rules, binding sockets to public interfaces, and editing firewall tables exposes network paths. Always limit your port forward rules to the exact ports required and use DHCP reservation rather than manually typing static IPs to prevent configuration mismatches.",
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="If you verify that your WAN IP matches the CGNAT range (100.64.0.0/10) or notice that standard ports (80, 443, 25) are filtered at hop 2, contact your ISP to request a dynamic public IP or opt-in for a static IP configuration."
      severityLevel="medium"
    >
      <div className="space-y-10">
        {/* SECTION 1: Quick AI Answer */}
        <section
          className="glass-card p-6 border border-cyan-950/20 bg-cyan-950/5 rounded-2xl relative overflow-hidden"
          aria-label="Quick AI Answer"
        >
          <div className="absolute top-0 right-0 bg-[var(--brand-500)]/10 text-[var(--brand-400)] text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-bl-lg font-bold">
            Featured Snippet / AI Overview Summary
          </div>
          <h2 className="text-xs font-bold text-[var(--brand-400)] mb-3 uppercase tracking-wide">
            How to Fix Port Forwarding Not Working Immediately
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            To resolve port forwarding failures:
          </p>
          <ol className="list-decimal pl-5 mt-2 space-y-1.5 text-xs text-[var(--text-muted)] leading-relaxed">
            <li>
              <strong>Verify Host Listener:</strong> Start the target server application and verify it is bound to <code>0.0.0.0</code> (all interfaces) rather than <code>127.0.0.1</code> (localhost loopback).
            </li>
            <li>
              <strong>Configure Firewall:</strong> Add an Inbound Rule in Windows Defender or run <code>sudo ufw allow &lt;port&gt;</code> on Linux to allow incoming socket connections.
            </li>
            <li>
              <strong>Bind Static IP:</strong> Set up a DHCP Address Reservation in your router settings to lock your computer's local IP address.
            </li>
            <li>
              <strong>Bypass CGNAT:</strong> Check your router's WAN IP. If it begins with <code>100.64.x.x</code>, contact your ISP to opt-out of CGNAT or request a static IP.
            </li>
            <li>
              <strong>Eliminate Double NAT:</strong> Configure your ISP-supplied modem/router gateway to <strong>Bridge Mode</strong> if using a secondary router.
            </li>
            <li>
              <strong>Disable UPnP:</strong> Toggle UPnP off in router advanced settings and reboot the router to flush stale NAT translation mappings.
            </li>
          </ol>
        </section>

        {/* Dynamic Diagnostics Tool Integration */}
        <section aria-label="Interactive Diagnostic Assistant">
          <div className="mb-4">
            <h2 className="text-base font-bold text-[var(--text-primary)]">
              Interactive Port Forwarding Diagnostic Wizard
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Select your network profile parameters below to get a custom, step-by-step diagnostic resolution flow tailored to your specific hardware setup.
            </p>
          </div>
          <ConnectionOptimizerClient mode="router-admin" />
        </section>

        {/* SECTION 2: Symptoms Table */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            2. Port Forwarding Failure Symptoms & Diagnostics Matrix
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Troubleshooting port routing requires isolating where the handshake drops. Use this matrix to identify your network's behavior and execute the recommended fix:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">Observed Symptom</th>
                  <th className="px-4 py-3 text-left">Likely Cause</th>
                  <th className="px-4 py-3 text-left">Severity</th>
                  <th className="px-4 py-3 text-left">Fastest Remediation Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-semibold">
                    Port checker reports 'Closed', but local clients join the server normally.
                  </td>
                  <td className="px-4 py-3">Host OS firewall block or missing inbound rule.</td>
                  <td className="px-4 py-3 text-yellow-400 font-bold">Medium</td>
                  <td className="px-4 py-3">
                    Add TCP/UDP inbound exceptions in Windows Defender or <code>ufw</code>.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">
                    Port forwarding works initially but stops working when the PC restarts.
                  </td>
                  <td className="px-4 py-3">Local DHCP IP lease expired or shifted to a new IP.</td>
                  <td className="px-4 py-3 text-emerald-400 font-bold">Low</td>
                  <td className="px-4 py-3">
                    Configure a DHCP Address Reservation in the router dashboard.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">
                    Console reports Strict NAT / Moderate NAT after opening ports.
                  </td>
                  <td className="px-4 py-3">UPnP collisions, Double NAT, or SIP ALG interference.</td>
                  <td className="px-4 py-3 text-yellow-400 font-bold">Medium</td>
                  <td className="px-4 py-3">
                    Disable UPnP, disable SIP ALG, or verify WAN IP for Double NAT.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">
                    Port checker reports 'Connection Refused' immediately.
                  </td>
                  <td className="px-4 py-3">Host application is offline or bound to 127.0.0.1.</td>
                  <td className="px-4 py-3 text-yellow-400 font-bold">Medium</td>
                  <td className="px-4 py-3">
                    Start the server application and bind it to wildcard interface (0.0.0.0).
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">
                    Port checker reports 'Connection Timeout' across all ports.
                  </td>
                  <td className="px-4 py-3">Carrier-Grade NAT (CGNAT) or ISP WAN port filtering.</td>
                  <td className="px-4 py-3 text-red-500 font-bold">Critical</td>
                  <td className="px-4 py-3">
                    Check if WAN IP starts with 100.64.x.x. Request public IP from ISP.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: What Is Port Forwarding? */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Network size={18} className="text-cyan-400" />
            3. What Is Port Forwarding? A Networking Deep Dive
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            In standard network architectures, your Internet Service Provider assigns a single public IP address to your residential line. Because you have multiple devices (PCs, consoles, smart TVs, cameras) sharing this single public connection, your router acts as a translator using <strong>Network Address Translation (NAT)</strong>. Specifically, routers utilize a sub-technique called <strong>Port Address Translation (PAT)</strong> or NAPT (Network Address Port Translation).
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Under standard NAT/PAT, your local devices use private IP addresses (defined by RFC 1918, such as <code>192.168.1.0/24</code>). When an internal device initiates an outbound connection (e.g., loading RouterVia.com), the router translates the private source IP and source port into its public WAN IP and a unique source port, recording this translation in its stateful conntrack table. When the web server replies, the router references this table and redirects the return packets back to the correct local computer.
          </p>
          <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-3">
            <h3 className="text-xs font-bold text-[var(--text-primary)]">The Firewall and Incoming Packet Boundary</h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Stateful packet inspection (SPI) firewalls built into your router block all incoming connection requests that have not been initiated by an internal client. If an external client (like an online gaming matchmaking lobby, a remote security feed reader, or a friend trying to join your Minecraft server) attempts to connect directly to your public IP, the router's WAN interface receives the packet, checks its translation memory, finds no active outbound record matching that destination socket, and drops the packet at the boundary.
            </p>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              <strong>Port Forwarding</strong> creates a static, permanent rule in the NAT table. It instructs the router: <em>'When a packet arrives on WAN interface port X, bypass standard firewall discards and route it directly to local IP Y, port Z.'</em>
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl">
              <h4 className="text-xs font-bold text-[var(--text-primary)] mb-1">TCP Port Forwarding</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                TCP (Transmission Control Protocol) is connection-oriented. It requires a three-way handshake (SYN, SYN-ACK, ACK) to establish connection states and guarantees packet delivery. Used for web servers (80/443), SSH (22), and remote desktop (3389).
              </p>
            </div>
            <div className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl">
              <h4 className="text-xs font-bold text-[var(--text-primary)] mb-1">UDP Port Forwarding</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                UDP (User Datagram Protocol) is stateless and connectionless, sending datagrams without confirming receipt. Crucial for real-time applications where speed is prioritized over reliability, such as voice chats (VoIP) and online multiplayer gaming synchronization (movement telemetry).
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: How Port Forwarding Works Internally */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            4. How Port Forwarding Works Internally: The Packet Journey
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            To visualize why a port forward rule fails, you must understand the hop-by-hop packet header modification path. When an external device on the internet attempts to connect to your local hosting server, the transaction proceeds through the following physical and logical stages:
          </p>

          <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-[var(--text-muted)] space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <span>[Packet State Workflow Diagram]</span>
            </div>
            <div className="space-y-2 leading-relaxed">
              <div>
                <strong>1. Initialization (Internet Sender):</strong>
                <br />
                The external client creates a socket targeting your public IP:
                <br />
                <span className="text-green-400">Source: 203.0.113.50:52410 → Destination: 198.51.100.8:25565 (Public IP:Port)</span>
              </div>
              <div className="pl-4 border-l-2 border-[var(--border-subtle)]">
                ↓ Packet travels across the internet backbone to your router's WAN port.
              </div>
              <div>
                <strong>2. NAT Table Inspection:</strong>
                <br />
                The router WAN interface receives the packet. Since the packet destination matches a static port forwarding rule:
                <br />
                <span className="text-yellow-400">Rule Match: WAN TCP Port 25565 → Redirect to Local IP 192.168.1.150:25565</span>
              </div>
              <div className="pl-4 border-l-2 border-[var(--border-subtle)]">
                ↓ Destination IP is rewritten (Destination NAT / DNAT).
              </div>
              <div>
                <strong>3. LAN Delivery:</strong>
                <br />
                The router updates the destination IP header and sends the packet over the local network:
                <br />
                <span className="text-green-400">Source: 203.0.113.50:52410 → Destination: 192.168.1.150:25565 (Private LAN IP)</span>
              </div>
              <div className="pl-4 border-l-2 border-[var(--border-subtle)]">
                ↓ Host network card accepts packet and forwards it to the OS socket table.
              </div>
              <div>
                <strong>4. Socket Binding Match:</strong>
                <br />
                The host OS scans its active listeners. If the game server application is running and bound to port 25565, it accepts the connection.
              </div>
            </div>
          </div>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            If any link in this sequence is broken—such as your router translating to an outdated local IP, the host firewall dropping the incoming packet, or the host application listening on the wrong interface—the connection fails, resulting in a timeout.
          </p>
        </section>

        {/* SECTION 5: Why Port Forwarding Stops Working */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            5. Why Port Forwarding Stops Working: Root Failure Analysis
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            When users report an <Link href="/router-login-not-working" className="text-[var(--brand-400)] hover:underline">open ports not working</Link> failure, it is rarely due to the router corrupting basic routing tables. Instead, logical conflicts on the local network or host devices are the primary causes.
          </p>
          <ul className="list-disc pl-6 space-y-3 text-xs md:text-sm text-[var(--text-muted)]">
            <li>
              <strong>Outdated Internal IP Bindings (DHCP Leases):</strong> By default, routers allocate dynamic IP leases to local clients. When your PC, server, or console reboots, the DHCP server may assign it a different IP address. Since the port forwarding rule points to the old IP address, incoming connections fail to reach the device.
            </li>
            <li>
              <strong>Unconfigured Local Firewalls:</strong> Firewalls built into Windows Defender, macOS, Linux, and third-party antivirus suites are designed to drop unsolicited inbound network packets. If you configure a rule in your router but fail to add an inbound exclusion rule on the host system, the packets are discarded upon reaching your device.
            </li>
            <li>
              <strong>UPnP conntrack hijack:</strong> Dynamic UPnP allocations can conflict with manual static configurations. If UPnP is enabled, a client program can request dynamic port redirections on the same ports you set manually, causing routing collisions.
            </li>
            <li>
              <strong>NAT Table Memory Corruption:</strong> Consumer-grade routers have limited memory. Under heavy loads (like peer-to-peer torrent sharing or multi-device streaming), the router's connection tracking table (conntrack) can overflow, causing the router to drop new and static port redirect requests.
            </li>
          </ul>
        </section>

        {/* SECTION 6: Double NAT Problems */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Globe size={18} className="text-emerald-400" />
            6. Cascading Double NAT Architecture Obstacles
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Double NAT occurs when your local network contains two routers in series, both performing Network Address Translation. This setup is common when users connect their personal wireless router or mesh Wi-Fi system to a combined modem/router gateway supplied by their ISP.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            When an external client attempts to connect to your server, the packet hits the first translation barrier at the ISP gateway. If the ISP gateway lacks a port forwarding rule targeting your personal router's WAN IP, the connection is dropped. Even if you configure port forwarding on your personal router, the traffic never reaches it because the packet was discarded at the upstream gateway.
          </p>
          <div className="p-5 border border-blue-900/30 bg-blue-950/10 rounded-xl space-y-2">
            <h4 className="text-xs font-bold text-blue-400">Diagnosing and Resolving Double NAT</h4>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Check your personal router's WAN IP address. If it falls within private subnets like <code>192.168.x.x</code>, <code>10.x.x.x</code>, or <code>172.16.x.x</code>, your router is behind an upstream router. To resolve this, you must configure the ISP-provided gateway to <strong>Bridge Mode</strong> or <strong>IP Passthrough</strong>. This disables the ISP gateway's routing and DHCP functions, passing the public IP directly to your personal router.
            </p>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              If your ISP gateway doesn't support bridge mode, configure a static WAN IP for your personal router inside the ISP gateway and add that IP to the gateway's DMZ (Demilitarized Zone) settings. For a step-by-step walkthrough, refer to our <Link href="/double-nat-detected" className="text-[var(--brand-400)] hover:underline">Double NAT fix guide</Link>.
            </p>
          </div>
        </section>

        {/* SECTION 7: Carrier Grade NAT (CGNAT) */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Shield size={18} className="text-cyan-400" />
            7. Carrier-Grade NAT (CGNAT): The Port Forwarding Barrier
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Due to the exhaustion of public IPv4 addresses, many ISPs employ <strong>Carrier-Grade NAT (CGNAT)</strong>, also known as Large-Scale NAT (LSN). Instead of assigning a unique public IP to your home connection, the ISP assigns a private WAN IP to your router and translates your traffic at a central carrier-level gateway, sharing one public IP among thousands of households.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Under CGNAT, you do not have a public IP address. All inbound connection attempts to your shared public IP are dropped at the carrier's gateway because the carrier's routers cannot determine which customer's network should receive the packets. Any port forwarding rules you configure on your home router will be ignored because the incoming traffic never reaches your WAN port.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-[var(--text-primary)]">How to Verify if You are Behind CGNAT:</h4>
              <ol className="list-decimal pl-5 space-y-1 text-[11px] text-[var(--text-muted)] leading-relaxed">
                <li>Log into your router's administration page.</li>
                <li>Locate the WAN or Internet status section and note the WAN IP.</li>
                <li>Open a public IP checker tool to see your public IP.</li>
                <li>
                  If the router's WAN IP is different from your public IP, or if it falls within the <code>100.64.0.0/10</code> range (specifically <code>100.64.0.0</code> to <code>100.127.255.255</code>), you are behind CGNAT.
                </li>
              </ol>
            </div>
            <div className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-[var(--text-primary)]">Resolving CGNAT Restrictions:</h4>
              <ul className="list-disc pl-5 space-y-1 text-[11px] text-[var(--text-muted)] leading-relaxed">
                <li>
                  <strong>Request a Public IP:</strong> Contact your ISP support line and request to opt-out of CGNAT or purchase a static public IP address.
                </li>
                <li>
                  <strong>Use a Tunneling Service:</strong> Set up a Cloudflare Tunnel (ideal for web traffic) or use reverse proxies like playit.gg or ngrok to route traffic back to your local client.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 8: Windows Firewall Diagnostics */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Terminal size={18} className="text-cyan-400" />
            8. Host-Side Diagnostics: Windows Command Line & PowerShell
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            If your port forwarding rule is configured on the router but fails to work, you must verify that the host operating system is actively listening on that port and not blocking the connection.
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">Verify Listening Ports with netstat</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Open Command Prompt as an Administrator and execute the following command to check if your server software is listening:
          </p>
          <pre className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-green-400 overflow-x-auto">
            netstat -ano | findstr /i "listening"
          </pre>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Look for the row containing your target port. The local address must display as <code>0.0.0.0:PORT</code> (listening on all interfaces) or your PC's specific local IP (e.g. <code>192.168.1.150:PORT</code>). If it displays as <code>127.0.0.1:PORT</code>, the application is locked to loopback and will not receive forwarded traffic.
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">PowerShell Socket Diagnostics</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            PowerShell provides advanced cmdlets to inspect socket states and track the specific process ID (PID) holding the port:
          </p>
          <pre className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-green-400 overflow-x-auto">
            Get-NetTCPConnection -State Listen | Select-Object LocalAddress, LocalPort, OwningProcess
          </pre>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Identify the process ID (OwningProcess) holding the port. You can cross-reference this PID in Task Manager to verify that the correct application has bound the socket.
          </p>
        </section>

        {/* SECTION 9: Linux Diagnostics */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Terminal size={18} className="text-cyan-400" />
            9. Host-Side Diagnostics: Linux Terminal Socket Auditing
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            On Linux servers (such as Ubuntu or Debian running game servers or media hosts), check port bindings and local packet filters using these diagnostics:
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">Check Listening Interfaces with ss and lsof</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Run the following socket statistics command to audit listening ports and their associated process daemons:
          </p>
          <pre className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-green-400 overflow-x-auto">
            sudo ss -tulpn | grep -i "listen"
          </pre>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Alternatively, list active network socket bindings using <code>lsof</code>:
          </p>
          <pre className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-green-400 overflow-x-auto">
            sudo lsof -i -P -n | grep -i "listen"
          </pre>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">Inspect Netfilter Rules (iptables / nftables)</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Linux systems utilize <code>iptables</code> or <code>nftables</code> to manage firewall rules. Even if your router redirects the port, the Linux kernel will drop the packets if your firewall is blocking them. To list your active iptables rules and check for drops, run:
          </p>
          <pre className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-green-400 overflow-x-auto">
            sudo iptables -L INPUT -v -n
          </pre>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Ensure there is an ACCEPT rule for the target port in the INPUT chain. If you are using <code>ufw</code> (Uncomplicated Firewall), simplify the process by running:
            <br />
            <code>sudo ufw allow 25565/tcp</code> (replacing 25565 with your port).
          </p>
        </section>

        {/* SECTION 10: Router Brand Guides */}
        <section className="space-y-6">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            10. Brand-Specific Router Configuration Guides
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Menu layouts and naming conventions for port forwarding settings vary by router manufacturer. Follow these navigation paths to locate and configure the settings on your brand:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">TP-Link Routers</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Log into your dashboard (typically at <code>192.168.0.1</code> or <code>tplinkwifi.net</code>). Navigate to <strong>Advanced &gt; NAT Forwarding &gt; Virtual Servers</strong>. Click <strong>Add</strong>, select your protocol, enter the port numbers, and input your host device's local IP address.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">ASUS Routers</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Access the admin portal (typically at <code>192.168.1.1</code> or <code>router.asus.com</code>). Go to <strong>Advanced Settings &gt; WAN &gt; Port Forwarding</strong>. Toggle <strong>Enable Port Forwarding</strong> to Yes, click <strong>Add profile</strong>, and fill in the service name, port range, local IP, and protocol.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Netgear Routers</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Log into the admin page (typically at <code>192.168.1.1</code> or <code>routerlogin.net</code>). Go to <strong>Advanced &gt; Advanced Setup &gt; Port Forwarding / Port Triggering</strong>. Ensure the radio button is set to Port Forwarding, click <strong>Add Custom Service</strong>, enter the port values, and input your local IP address.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Linksys Routers</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Access the dashboard (typically at <code>192.168.1.1</code>). Navigate to <strong>Security &gt; Apps and Gaming &gt; Single Port Forwarding</strong> (or Port Range Forwarding). Enter the application name, internal/external ports, protocol, and target local IP address.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Huawei Routers</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Log into the admin page (typically at <code>192.168.100.1</code> or <code>192.168.8.1</code>). Navigate to <strong>Advanced &gt; Forward Rules &gt; IPv4 Port Mapping</strong>. Click <strong>New</strong>, set the mapping name, internal host IP, protocol type, and internal/external port ranges.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">ZTE Gateways</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Access the gateway dashboard (typically at <code>192.168.1.1</code>). Navigate to <strong>Internet &gt; Security &gt; Port Forwarding</strong>. Enable the rule, set the protocol, input the WAN port range, LAN host IP, and the target LAN host port.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 11: Gaming Ports */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            11. Gaming Port Forwarding Rules & NAT Profiles
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Multiplayer console and PC games use peer-to-peer (P2P) connections for matchmaking and voice chats. Restrictive firewalls block incoming connection handshakes, resulting in a Strict NAT status. Refer to our <Link href="/nat-type-strict" className="text-[var(--brand-400)] hover:underline">Strict NAT fix guide</Link> for console-specific troubleshooting.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            If you are configuring rules to resolve matchmaking lag or lobby disconnects (see our <Link href="/high-ping-fix" className="text-[var(--brand-400)] hover:underline">high ping troubleshooting guide</Link>), forward these official network ports:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-[var(--text-muted)] font-mono">
                  <th className="py-2.5 pr-4 font-semibold uppercase">Platform / Game</th>
                  <th className="py-2.5 px-4 font-semibold uppercase">TCP Ports</th>
                  <th className="py-2.5 pl-4 font-semibold uppercase">UDP Ports</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] font-mono">
                <tr>
                  <td className="py-3 pr-4 font-bold text-[var(--text-primary)]">Xbox Live</td>
                  <td className="py-3 px-4">3074</td>
                  <td className="py-3 pl-4">88, 500, 3074, 3544, 4500</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-[var(--text-primary)]">PlayStation Network (PSN)</td>
                  <td className="py-3 px-4">3478, 3479, 3480</td>
                  <td className="py-3 pl-4">3074, 3478, 3479</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-[var(--text-primary)]">Steam Client</td>
                  <td className="py-3 px-4">27015-27030, 27036</td>
                  <td className="py-3 pl-4">27015-27030, 27036</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-[var(--text-primary)]">Call of Duty (All Titles)</td>
                  <td className="py-3 px-4">3074, 27014-27050</td>
                  <td className="py-3 pl-4">3074, 3478, 4379-4380, 27000-27031</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-[var(--text-primary)]">Minecraft (Java Edition)</td>
                  <td className="py-3 px-4">25565</td>
                  <td className="py-3 pl-4">25565</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 12: CCTV & NAS Forwarding */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <HardDrive size={18} className="text-cyan-400" />
            12. CCTV Security Feeds & Network Attached Storage (NAS) Scenarios
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Hosting local files on a Network Attached Storage (NAS) device or accessing IP security cameras remotely requires robust port forwarding. However, configurations frequently fail due to application port changes or security exclusions:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-xs md:text-sm text-[var(--text-muted)]">
            <li>
              <strong>Synology & QNAP NAS:</strong> Standard management dashboards utilize ports 5000/5001 (Synology) or 8080/443 (QNAP). If you force HTTPS redirection on the NAS device without forwarding the secure port, remote connections will time out. Always verify that your external port forwarding rule targets the HTTPS port (e.g. 5001) instead of the HTTP port (5000).
            </li>
            <li>
              <strong>Hikvision & Reolink CCTV Systems:</strong> IP cameras and Digital Video Recorders (DVRs) require separate ports for video stream distribution. A common mistake is only forwarding the HTTP management port (typically 80 or 85). You must also forward the RTSP media streaming port (typically 554) and the SDK server command port (typically 8000) to allow remote mobile apps (like iVMS-4500) to display the live video feed.
            </li>
            <li>
              <strong>Subnet Conflicts:</strong> Many security installers configure cameras with static IP addresses manually typed into the device. If the installer uses an IP outside the router's current DHCP range (e.g., configuring <code>192.168.1.200</code> on a router that operates on the <code>192.168.0.x</code> subnet), the router will be unable to reach the camera, causing the port forward rule to fail.
            </li>
          </ul>
        </section>

        {/* SECTION 13: ISP Port Blocking */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            13. ISP Residential Port Filtering Rules
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Even if your local router and host configurations are correct, connection attempts may fail if your Internet Service Provider filters specific ports at the carrier network level. To prevent mail spam distribution, web server hosting, or network scans, residential ISPs block incoming traffic on these ports by default:
          </p>
          <ul className="list-disc pl-6 space-y-2.5 text-xs md:text-sm text-[var(--text-muted)]">
            <li>
              <strong>Port 25 (SMTP):</strong> Blocked to prevent infected local computers from running mail relays and sending bulk outbound spam.
            </li>
            <li>
              <strong>Ports 80 & 443 (HTTP/HTTPS):</strong> Often filtered to prevent residential accounts from hosting public web servers, violating consumer service terms.
            </li>
            <li>
              <strong>Ports 21 & 22 (FTP/SSH):</strong> Blocked by some ISPs to mitigate automated password-cracking scans targeting home servers.
            </li>
          </ul>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            <strong>The Solution:</strong> Use Port Translation. Configure your router's port forwarding rule to listen on a non-standard external port (e.g. <code>8080</code> for web traffic or <code>2222</code> for SSH) and redirect it to the standard port on your host machine (e.g. <code>80</code> or <code>22</code>). When connecting from the outside, specify the custom port (e.g., <code>ssh user@yourip -p 2222</code>).
          </p>
        </section>

        {/* SECTION 14: Advanced Testing */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Terminal size={18} className="text-cyan-400" />
            14. Advanced Port Verification & Packet Capture Tools
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Web-based port checker tools can be unreliable because they only verify TCP connections and are often blocked by security systems. Instead, utilize these network diagnostics:
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">Test Connections with PowerShell or Telnet</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Run this PowerShell command to test if a specific port is open and accessible from your system:
          </p>
          <pre className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-green-400 overflow-x-auto">
            Test-NetConnection -ComputerName 192.168.1.150 -Port 25565
          </pre>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Check the value of <code>TcpTestSucceeded</code>. If it returns <code>True</code>, your host is listening and accessible over the local network.
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">External Scanning with Nmap</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            From an external network (e.g., a laptop tethered to mobile data), use <code>nmap</code> to verify the state of your public IP address:
          </p>
          <pre className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-green-400 overflow-x-auto">
            nmap -p 25565 your_public_ip
          </pre>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Nmap will report the port as <code>open</code> (the packet reached the app and it replied), <code>closed</code> (the packet reached the host but no application was listening), or <code>filtered</code> (the packet was dropped by a firewall, indicating your forward rule is incorrect or blocked).
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">Packet Analysis with tcpdump or Wireshark</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            To determine if forwarded packets are reaching your host machine, run a packet capture. On a Linux server, capture traffic arriving on your target port:
          </p>
          <pre className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-green-400 overflow-x-auto">
            sudo tcpdump -i eth0 port 25565
          </pre>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            While tcpdump is running, attempt to connect from an external client. If you see incoming packets but the connection fails, the issue is on your host machine (such as firewall blocks or application binding issues). If no packets appear, the connection is being blocked upstream at the router or ISP gateway.
          </p>
        </section>

        {/* SECTION 15: Alternatives When Port Forwarding Is Impossible */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Globe size={18} className="text-emerald-400" />
            15. Tunneling Alternatives When Port Forwarding is Impossible
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            If you are behind CGNAT, lack admin access to the router gateway (refer to our <Link href="/default-gateway-not-available" className="text-[var(--brand-400)] hover:underline">default gateway troubleshooting guide</Link> if you cannot connect), or your ISP blocks inbound connections, you can use these tunneling alternatives to bypass standard port forwarding:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)]">Cloudflare Tunnels</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Cloudflare Tunnels establish a secure, outbound connection from your local device directly to Cloudflare's network. External users can access your local web application using your custom domain without opening any inbound ports on your router.
              </p>
            </div>
            <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)]">Tailscale / ZeroTier Overlay Networks</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Overlay networks use WireGuard and custom coordination servers to build secure, peer-to-peer virtual networks across CGNAT barriers. Once your devices are connected to the same virtual network, they can communicate directly using virtual IP addresses.
              </p>
            </div>
            <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)]">ngrok / playit.gg Tunnels</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Tunneling clients connect your local port to a public gateway hosted on ngrok or playit.gg servers. The service provides a public IP and port (e.g., <code>playit.gg:19245</code>) that routes traffic directly back to your local server.
              </p>
            </div>
            <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)]">Reverse SSH Proxies</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                If you have access to a remote Virtual Private Server (VPS) with a public IP, you can establish an outbound reverse SSH tunnel (<code>ssh -R</code>) from your local device to the VPS, forwarding public traffic arriving at the VPS back to your home device.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 16: Security Risks */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Shield size={18} className="text-cyan-400" />
            16. Security Risks: The Trade-off of Open Inbound Ports
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Opening ports exposes pathways through your router's firewall, allowing external clients to communicate directly with internal devices. While necessary for hosting services, this configuration introduces security vulnerabilities:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-xs md:text-sm text-[var(--text-muted)]">
            <li>
              <strong>Exposed Device Vulnerabilities:</strong> Any vulnerability in the software listening on the open port (such as an unpatched game server daemon, NAS operating system, or camera firmware) can be exploited by attackers to run malicious code or access your private files.
            </li>
            <li>
              <strong>Exposed NAS Systems:</strong> Network Attached Storage devices contain sensitive personal data. Ransomware campaigns scan the web for open ports (like port 5001 or 8080) targeting Synology or QNAP systems, exploiting known vulnerabilities to encrypt files.
            </li>
            <li>
              <strong>Exposed CCTV Security Feeds:</strong> Automated search engines (like Shodan) scan the web for unsecured IP camera ports (such as port 80 or 554). If you use default or weak passwords on your cameras, your video feed can be accessed publicly.
            </li>
          </ul>
        </section>
      </div>
    </TroubleshootingArticleShell>
  );
}
