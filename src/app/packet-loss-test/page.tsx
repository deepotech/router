import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import ConnectionOptimizerClient from "@/components/tools/ConnectionOptimizerClient";

// Premium SEO Metadata
export const metadata: Metadata = buildMetadata({
  title: "Packet Loss Test: Step-by-Step Diagnostic & Troubleshooting Guide",
  description:
    "Is your connection dropping packets? Learn how to run a packet loss test, analyze ICMP/UDP frame discards, isolate bufferbloat, and troubleshoot router or ISP line noise using Windows, macOS, and Linux.",
  canonical: "/packet-loss-test",
  keywords: [
    "packet loss test",
    "packet loss fix",
    "high packet loss",
    "packet loss gaming",
    "internet packet loss",
    "how to test packet loss",
    "bufferbloat test",
    "ping spikes",
    "network jitter",
  ],
});

const breadcrumbs = [
  { name: "Network Problems", url: "/router-keeps-restarting" },
  { name: "Packet Loss Test & Diagnostic Guide", url: "/packet-loss-test" },
];

const troubleshootingSteps = [
  {
    title: "Isolate the Local Layer 2 Link (Router Bypass)",
    description:
      "Disconnect your device from Wi-Fi or local switches and plug a high-quality Cat6 Ethernet cable directly into the LAN port of your ISP-provided modem or Optical Network Terminal (ONT). Run a ping loop to an external DNS resolver (e.g., 1.1.1.1). If packet loss immediately drops to 0%, your issue lies strictly within your local Layer 2 Wi-Fi network or switch configuration. If packet loss persists, the root cause is either modem hardware degradation, an upstream ISP routing bottleneck, or a physical Layer 1 line fault.",
    tip: "When bypassing, make sure to temporarily disable your device's Wi-Fi adapter entirely to force all network traffic through the physical Ethernet interface.",
  },
  {
    title: "Assess Default Gateway Latency and Jitter",
    description:
      "Identify your router's default gateway IP address (typically 192.168.1.1 or 192.168.0.1) and run a continuous ping test of at least 100 packets. Under healthy local wired configurations, the round-trip time (RTT) should remain consistently below 1ms with 0% packet loss. Over Wi-Fi, RTT should remain under 5ms with minimal standard deviation. High variance (jitter) or dropped packets at this first hop indicate local radio frequency (RF) interference, client congestion, or a failing router CPU.",
    tip: "Use command 'ping -t 192.168.1.1' on Windows or 'ping -c 100 192.168.1.1' on macOS/Linux to run a sufficient sample size for calculating true packet loss statistics.",
  },
  {
    title: "Diagnose Bufferbloat and Queue Saturation",
    description:
      "Perform an asymmetric network bandwidth stress test. Open an elevated command window and run a continuous ping to a stable external target (e.g., 8.8.8.8). Simultaneously, run a local speed test that completely saturates your upstream and downstream bandwidth. Monitor the ping latency. If your latency spikes by more than 15-20ms during saturation, or if packets begin to drop, your router suffers from bufferbloat — a common phenomenon where oversized memory buffers queue real-time packets, leading to severe latency spikes.",
    tip: "Bufferbloat is highly prevalent on high-speed copper and cable connections. The absolute resolution is implementing Smart Queue Management (SQM) with the FQ-CoDEL or CAKE algorithms on your gateway.",
  },
  {
    title: "Analyze Upstream Peering Points with MTR",
    description:
      "Deploy a My Traceroute (MTR) diagnostic tool (or pathping on Windows) to trace the path to your target server (e.g., a game server or DNS resolver) over a period of 10 minutes. MTR combines traceroute and ping to measure packet loss and latency at every single router hop along the path. Examine the hop where packet loss begins. If hop 1 and 2 (your router and ISP gateway) show 0% loss, but hop 5 shows 4% loss which carries through to the final destination, the bottleneck is upstream peering congestion at a BGP autonomous system (AS) boundary.",
    tip: "Discard isolated packet loss at intermediate hops (e.g., hop 4 shows 10% loss but hop 5 shows 0% loss). This is merely ICMP rate-limiting by that specific router, not actual network degradation.",
  },
  {
    title: "Verify Maximum Transmission Unit (MTU) Sizing",
    description:
      "When a packet's size exceeds the Maximum Transmission Unit of a physical link, routers along the path must fragment the packet. If the 'Don't Fragment' (DF) flag is set in the IP header, the router will discard the packet and return an ICMP Type 3 Code 4 ('Destination Unreachable, Fragmentation Needed') message. If these ICMP messages are blocked by overzealous firewalls, it results in a 'black hole' router, causing silent packet loss on large data transfers while small pings succeed.",
    tip: "Determine your optimal MTU size by sending pings with the DF flag set and varying payload sizes until you find the maximum size that passes without fragmentation. Add 28 bytes (IP + ICMP headers) to calculate the final MTU.",
  },
  {
    title: "Audit local Network Interface Card (NIC) Drivers",
    description:
      "Outdated or corrupted network card drivers frequently drop frames at the OS interface layer before they ever reach the network stack. Open your operating system's device manager, identify your Ethernet or Wi-Fi controller, and update to the latest manufacturer-certified driver (e.g., Intel, Realtek, or Broadcom). In the adapter's advanced settings, disable power-saving features like Energy Efficient Ethernet (EEE) and Green Ethernet, which can cause the NIC to enter low-power states inappropriately.",
    tip: "Manually lock your Ethernet Speed & Duplex settings to '1.0 Gbps Full Duplex' or 'Auto Negotiation' to prevent auto-negotiation mismatches that trigger physical Layer 1 alignment errors.",
  },
  {
    title: "Isolate Rogue Background Sockets and Software Firewalls",
    description:
      "Third-party software firewalls, antivirus packet filtering engines, VPN virtual adapters, and system optimization utilities hook directly into the operating system's kernel-level network stack. A bug or resource bottleneck in these tools can cause them to fail to parse incoming packets, leading to immediate silent local packet loss. Temporarily disable third-party security suites, disconnect active VPN tunnels, and boot your system in Safe Mode with Networking to isolate software-level drops.",
    tip: "Run 'netstat -abno' in Windows or 'ss -tup' in Linux to inspect all active TCP/UDP sockets and identify background applications consuming excessive network resources.",
  },
  {
    title: "Escalate Physical Layer Failures to Your ISP",
    description:
      "If direct-modem bypass tests confirm that packet loss originates on the first upstream hop outside your home, the issue resides in the ISP's physical plant (e.g., water ingress in coaxial taps, corroded copper pairs at the DSLAM, or high fiber-optic decibel attenuation). Log into your cable modem's web interface (typically at 192.168.100.1) and document downstream SNR, upstream transmit power, and uncorrected codeword statistics to present as clear technical evidence to support escalation.",
    tip: "ISP phone support agents often run brief, automated line tests that miss intermittent packet drops. Requesting a Tier 2 network operations center (NOC) representative and providing raw ping loops or MTR logs will dramatically speed up resolution.",
  },
];

const faqs = [
  {
    question: "What is the difference between packet loss and high latency (ping)?",
    answer:
      "Latency (ping) measures the time in milliseconds it takes for a single data packet to travel from your device to a server and back. Packet loss, however, represents the percentage of those transmitted packets that fail to reach their destination entirely. While high latency causes delayed actions (lag), packet loss causes broken actions, such as in-game rubber-banding, audio dropouts during VoIP calls, and frozen video frames. A connection can have very low latency (e.g., 15ms) but still be completely unusable due to 5% packet loss.",
  },
  {
    question: "How do I run a reliable packet loss test on my internet connection?",
    answer:
      "To run an accurate packet loss test, you must send a large, continuous stream of ICMP echo requests (pings) to a highly stable public IP address (such as Cloudflare DNS at 1.1.1.1 or Google DNS at 8.8.8.8). Running a quick 4-packet test is insufficient. You should run a continuous ping of at least 100 to 500 packets using your terminal (e.g., 'ping -t 1.1.1.1' on Windows). Divide the number of dropped packets by the total sent packets to calculate your exact loss percentage. Alternatively, deploy a My Traceroute (MTR) tool to monitor loss across the entire path.",
  },
  {
    question: "Why does packet loss occur during online gaming in Valorant, Fortnite, or CS2?",
    answer:
      "Online multiplayer games utilize the stateless UDP (User Datagram Protocol) rather than TCP. UDP does not implement packet delivery verification or retransmissions, trading reliability for absolute speed. When a UDP packet carrying player position data is dropped due to local Wi-Fi interference or bufferbloat, the game client receives no acknowledgment and cannot re-request the data. This triggers immediate in-game micro-stuttering, teleportation (rubber-banding), and registry errors. Gaming packet loss is almost always caused by Wi-Fi packet collisions or local queue saturation.",
  },
  {
    question: "What is bufferbloat, and how does it cause high packet loss?",
    answer:
      "Bufferbloat is a technical phenomenon that occurs when a router's memory buffers are oversized and poorly managed. When a device on your local network saturates the bandwidth (such as downloading a large file or streaming 4K video), the router queues the excess packets in its memory buffer to prevent dropping them. However, this queuing adds massive delay (latency) to real-time packets (like gaming pings or VoIP frames). Once the buffer becomes completely filled, the router has no choice but to drop all incoming packets (known as tail-drop), resulting in sudden spikes of severe packet loss.",
  },
  {
    question: "Can an outdated or damaged Ethernet cable cause packet loss?",
    answer:
      "Yes. Physical Layer 1 infrastructure is a primary source of network frame corruption. Ethernet cables (especially older Cat5 or poorly shielded runs) are susceptible to electromagnetic interference (EMI) from power lines and appliances. Furthermore, physical damage such as sharp bends, crushed conductors, or oxidized RJ45 gold pins will degrade signal integrity. When the network interface card detects a corrupted frame that fails the Cyclic Redundancy Check (CRC), it discards the frame immediately at the physical layer, presenting as packet loss.",
  },
  {
    question: "How does Spanning Tree Protocol (STP) trigger temporary packet loss?",
    answer:
      "In managed network environments with redundant physical links, switches run Spanning Tree Protocol (STP) to prevent loop storms. If a network bridge experiences a link state change or is poorly configured, STP will trigger a topology change reconvergence. During this reconvergence phase, switches will block traffic on specific ports for up to 30 to 50 seconds while recalculating the loop-free forwarding path. During this blocking window, all routed and switched packets are dropped, presenting as a temporary but total network blackout.",
  },
  {
    question: "What is an ICMP Black Hole, and how does it relate to MTU?",
    answer:
      "An ICMP Black Hole occurs when a router along a network path discards a packet that exceeds the link's Maximum Transmission Unit (MTU) but is marked with the 'Don't Fragment' (DF) flag. Normally, the router should return an ICMP Destination Unreachable message to the host to negotiate a smaller packet size (Path MTU Discovery). However, if firewalls along the path are misconfigured to block all ICMP traffic, the sending host never receives this notice. The host continues to send oversized packets which are silently dropped, causing permanent packet loss on large data payloads while tiny test pings succeed.",
  },
  {
    question: "How do I read a My Traceroute (MTR) report to find packet loss?",
    answer:
      "When reviewing an MTR report, you must track packet loss from top to bottom. If packet loss appears at an intermediate hop (e.g., hop 4 shows 15% loss) but does not carry through to subsequent hops (hop 5 and the final destination show 0% loss), the intermediate router is simply rate-limiting ICMP responses. This is normal and does not represent an issue. However, if packet loss begins at a specific hop (e.g., hop 3 shows 3% loss) and that same 3% loss persists through hops 4, 5, and the final destination, then hop 3 is the exact node causing packet discards.",
  },
  {
    question: "Does double NAT cause packet loss on home networks?",
    answer:
      "Double NAT (Network Address Translation) occurs when you have two routers connected in series, both performing network address translation (e.g., an ISP gateway connected to a third-party mesh router). While double NAT does not directly cause packet drops under light loads, it adds significant packet parsing overhead. Both devices must actively track connection tables (conntrack). Under heavy multi-device loads, the outer router's NAT table can become exhausted, leading to packet discards, port-mapping failures, and dropped UDP streams.",
  },
  {
    question: "Should I contact my ISP if I detect packet loss on hop 2 of my traceroute?",
    answer:
      "Yes. Hop 1 in a traceroute is your local router, and hop 2 is the first upstream router in your Internet Service Provider's network (the gateway or CMTS). If you run a direct-modem Ethernet bypass test and still observe consistent packet loss starting at hop 2, the fault lies entirely within your ISP's network. This indicates physical line degradation (attenuation, low SNR) on the street cable, a faulty coaxial splitter, an overloaded fiber splitter, or congestion at the local ISP node. Provide these logs to your ISP to expedite escalation.",
  },
];

const commonCauses = [
  {
    title: "Wi-Fi Co-Channel Congestion",
    desc: "Multiple neighboring wireless access points broadcasting on overlapping frequencies saturate the RF medium, forcing carrier-sense backoffs and packet collisions.",
  },
  {
    title: "Layer 1 Ethernet Degradation",
    desc: "Oxidized copper conductors, degraded RJ45 connectors, or unshielded twisted pair runs routed near electromagnetic noise sources corrupt data frames.",
  },
  {
    title: "Asymmetric Bufferbloat",
    desc: "Massive downstream or upstream file transfers fill the router's hardware queues, forcing tail-drops that discard latency-sensitive real-time packets.",
  },
  {
    title: "BGP Peering Congestion",
    desc: "Transit data bottlenecking at autonomous system boundaries due to inefficient routing paths selected by ISP peering agreements.",
  },
  {
    title: "Double NAT State Overhead",
    desc: "Two cascading routers running active connection tracking tables, leading to memory exhaustion and packet dropouts under concurrent heavy traffic.",
  },
  {
    title: "ICMP Black Hole Discards",
    desc: "Path MTU mismatches combined with firewalls blocking critical ICMP type 3 packets, resulting in the silent drop of large TCP data segments.",
  },
];

const quickFixChecklist = [
  "Bypass Wi-Fi entirely and connect to your router using a shielded Cat6 Ethernet cable.",
  "Run a continuous ping sweep to your default gateway to isolate local vs. WAN drops.",
  "Update your wireless router firmware to clear memory leaks and update WAN network drivers.",
  "Enable Smart Queue Management (SQM / FQ-CoDEL) to throttle buffer queues and prevent bufferbloat.",
  "Check your coaxial or DSL modem's downstream SNR and upstream power levels at 192.168.100.1.",
  "Disable energy-saving features (Green Ethernet) in your device's network adapter settings.",
  "Validate Path MTU size by running packet-size test pings with the Don't Fragment flag active.",
  "Disable third-party security software hooks and check active sockets using 'netstat'.",
];

export default function PacketLossTestPage() {
  return (
    <TroubleshootingArticleShell
      h1="Packet Loss Test: The Ultimate Engineering Guide to Fixing Lost Packets"
      intro="Packet loss is the silent killer of modern network performance. While high ping causes simple delays, dropped packets corrupt active data streams, triggering in-game rubber-banding, audio dropouts, and connection timeouts. This engineering-grade guide details how to execute a packet loss test, isolate Layer 1 to Layer 4 bottlenecks, and resolve network drops across Windows, macOS, Linux, and all major router platforms."
      category="wifi"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "Wired Bypass Verification Required",
        text: "Before configuring advanced router settings or calling your Internet Service Provider, you must isolate the local wireless interface. Connect a computer directly to your modem or ONT via a known-good Cat6 Ethernet cable. If packet loss disappears, your issue is strictly a local wireless Layer 2 problem — do not attempt to configure WAN settings until Wi-Fi RF health is restored.",
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="Escalate your packet loss to your ISP if: 1) direct bypass tests to the modem show persistent packet drops starting at hop 2 of your traceroute; 2) your cable modem diagnostic interface (192.168.100.1) reports downstream SNR below 33 dB, or upstream transmit power exceeding 50 dBmV; 3) your modem log records recurring T3 or T4 range-response timeout errors. Be prepared to provide raw MTR logs as evidence to skip level 1 support scripts."
      severityLevel="high"
    >
      <div className="space-y-8">
        {/* Section 1: Quick AI Answer */}
        <section
          className="glass-card p-6 border border-amber-950/20 bg-amber-950/5 rounded-2xl relative overflow-hidden"
          aria-label="Quick AI Answer"
        >
          <div className="absolute top-0 right-0 bg-[var(--brand-500)]/10 text-[var(--brand-400)] text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-bl-lg font-bold">
            AI Overview Quick Answer
          </div>
          <h2 className="text-xs font-bold text-[var(--brand-400)] mb-3 uppercase tracking-wide">
            Quick Diagnostic Summary
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Network packet loss occurs when data packets fail to reach their destination. Test for it by running a 100-packet continuous ping loop in your terminal to an external DNS resolver like <code>1.1.1.1</code>. To fix it, switch from unstable Wi-Fi to a wired Cat6 Ethernet cable, activate Smart Queue Management (SQM/FQ-CoDEL) in your router settings to eliminate bufferbloat, adjust your MTU size to prevent packet fragmentation, and replace degraded coaxial splitters or cabling.
          </p>
        </section>

        {/* Dynamic Diagnostics Tool */}
        <section aria-label="Interactive Packet Loss Optimizer">
          <div className="mb-4">
            <h2 className="text-base font-bold text-[var(--text-primary)]">
              Interactive Latency & Packet Loss Optimizer
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Select your network parameters below to receive a custom, step-by-step diagnostic resolution flow tailored to your environment.
            </p>
          </div>
          <ConnectionOptimizerClient mode="latency" />
        </section>

        {/* Section 2: Symptoms Table */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            1. Packet Loss Symptoms Diagnostic Matrix
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Different packet loss signatures present distinct symptoms depending on the network protocols in play (TCP vs. UDP). Use this comprehensive matrix to diagnose the likely cause based on your system's behavior:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">Observed Symptom</th>
                  <th className="px-4 py-3 text-left">Likely Cause</th>
                  <th className="px-4 py-3 text-left">Severity</th>
                  <th className="px-4 py-3 text-left">Fastest Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-mono text-amber-400 font-semibold">
                    Frequent in-game rubber-banding and micro-stutters
                  </td>
                  <td className="px-4 py-3">
                    Local Wi-Fi packet collisions or UDP queue overflows
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-red-400 font-bold">High</span>
                  </td>
                  <td className="px-4 py-3">
                    Switch to a wired <Link href="/ethernet-connected-but-no-internet" className="text-[var(--brand-400)] hover:underline">Cat6 Ethernet connection</Link>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-amber-400 font-semibold">
                    VoIP audio dropouts and frozen Zoom video feeds
                  </td>
                  <td className="px-4 py-3">
                    Upstream bufferbloat under heavy local network usage
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-red-400 font-bold">High</span>
                  </td>
                  <td className="px-4 py-3">
                    Enable SQM (FQ-CoDEL) QoS in router dashboard
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-amber-400 font-semibold">
                    Web pages take long to start resolving, then load fine
                  </td>
                  <td className="px-4 py-3">
                    DNS packet drops due to unoptimized resolver pathing
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-yellow-400 font-bold">Medium</span>
                  </td>
                  <td className="px-4 py-3">
                    Configure <Link href="/best-dns-for-faster-internet" className="text-[var(--brand-400)] hover:underline">best public DNS resolvers</Link> (1.1.1.1)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-amber-400 font-semibold">
                    SSH sessions hang and terminate with &quot;broken pipe&quot;
                  </td>
                  <td className="px-4 py-3">
                    Physical Layer 1 cable degradation or WAN link resets
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-red-400 font-bold">High</span>
                  </td>
                  <td className="px-4 py-3">
                    Replace degraded LAN cables; audit <Link href="/router-keeps-disconnecting" className="text-[var(--brand-400)] hover:underline">router disconnect events</Link>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-amber-400 font-semibold">
                    File transfers start fast, then stall out completely
                  </td>
                  <td className="px-4 py-3">
                    Path MTU mismatch triggering ICMP Black Hole drops
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-yellow-400 font-bold">Medium</span>
                  </td>
                  <td className="px-4 py-3">
                    Reduce router WAN MTU setting to 1492 (or 1450)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-amber-400 font-semibold">
                    Drops occur only during peak evening hours (8PM-11PM)
                  </td>
                  <td className="px-4 py-3">
                    ISP CMTS node overload or backbone peering congestion
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-yellow-400 font-bold">Medium</span>
                  </td>
                  <td className="px-4 py-3">
                    Gather MTR diagnostic reports and escalate to ISP
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Why This Happens (Technical Overview) */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            2. Why Packet Loss Happens: The Technical Overview
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            In standard IP networking, data streams are divided into discrete blocks called packets, which are routed independently across multiple network nodes. Ideally, every transmitted packet arrives at its target destination intact. However, packet loss occurs when one or more packets fail to traverse the physical or logical pathways, resulting in their complete discard.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            This phenomenon can occur at multiple layers of the OSI model:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-xs md:text-sm text-[var(--text-muted)]">
            <li>
              <strong>Physical Layer (Layer 1):</strong> Signal attenuation, electromagnetic interference, and copper oxidation corrupt data frames. When a receiving network interface card (NIC) parses a packet that fails the frame check sequence (FCS) cyclic redundancy check, it discards the frame immediately.
            </li>
            <li>
              <strong>Data Link Layer (Layer 2):</strong> Wireless packet collisions are highly prevalent. Wi-Fi operates as a half-duplex medium where only one device can transmit on a channel at a time. If two devices transmit simultaneously, a collision occurs, destroying both frames.
            </li>
            <li>
              <strong>Network Layer (Layer 3):</strong> Routers route packets using active buffers. When the volume of incoming packets exceeds the egress port&apos;s physical capacity, the router&apos;s memory queue overflows. The router has no choice but to drop all incoming packets that cannot fit into the buffer, a policy known as <em>tail-drop</em>.
            </li>
          </ul>
        </section>

        {/* Section 4: How The Technology Works Internally */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            3. How Network Protocols Handle Packet Loss Internally
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            To understand the impact of packet loss, we must look at how Layer 4 transport protocols handle data loss. The internet primarily relies on two protocols: TCP (Transmission Control Protocol) and UDP (User Datagram Protocol).
          </p>
          
          <h3 className="text-sm font-bold text-[var(--text-primary)]">
            TCP: Reliable Transport with High Latency Overhead
          </h3>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            TCP is a connection-oriented protocol that guarantees delivery. Every packet sent must be acknowledged by the receiving host via an ACK packet.
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-xs md:text-sm text-[var(--text-muted)]">
            <li>
              <strong>Sliding Window:</strong> TCP uses a sliding window (the congestion window, or <em>cwnd</em>) to control how many bytes can be in flight before requiring an ACK.
            </li>
            <li>
              <strong>Loss Detection:</strong> If a packet is lost, subsequent packets will trigger <em>Duplicate ACKs</em> from the receiver, notifying the sender of a gap in sequence numbers.
            </li>
            <li>
              <strong>Congestion Control Backoff:</strong> Upon receiving three duplicate ACKs (or hit by a Retransmission Timeout), TCP assumes network congestion has occurred. It retransmits the missing packet and immediately shrinks its congestion window — halving it in classic TCP Reno, or scaling it back by 30% in modern TCP CUBIC.
            </li>
          </ol>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            This safety mechanism ensures data integrity but degrades throughput. When packet loss occurs, TCP halts the transmission stream while waiting for the retransmitted segment to arrive, inflating latency and causing noticeable speed drops.
          </p>

          <h3 className="text-sm font-bold text-[var(--text-primary)]">
            UDP: Stateless, High-Speed Transport for Gaming
          </h3>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            UDP is stateless and connectionless. It simply transmits packets without expecting ACKs. Real-time applications, such as VoIP and multiplayer games (e.g., Valorant, Fortnite, CS2), utilize UDP because speed is critical.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            If a UDP packet carrying your player coordinates is dropped, the protocol does not retransmit it. The game engine simply waits for the next coordinate packet. However, this missing packet forces the game&apos;s predictive netcode to recalculate your position. This triggers immediate <strong>rubber-banding</strong>, where your client-side position is rolled back to match the server&apos;s last validated coordinate.
          </p>
        </section>

        {/* Section 5: Common Causes */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            4. Common Root Causes of Packet Loss
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Resolving packet loss requires isolating the specific node in the network chain that is discarding frames. Let&apos;s look at the primary real-world culprits:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2">
                Wi-Fi RF Congestion
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                The 2.4 GHz and 5 GHz wireless spectra are shared mediums. Overlapping channels from neighboring routers, baby monitors, and microwave ovens corrupt radio waveforms, triggering packet collisions.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2">
                Bufferbloat & Saturation
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                When a device on your network downloads a large file, the router&apos;s CPU queues real-time packets in an oversized memory buffer. This queue latency eventual overflows, resulting in massive tail-drops.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2">
                Physical Cable Corrosion
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Damaged copper lines, corroded coax connectors, or unshielded cables routed near heavy power cables introduce physical noise, corrupting frames and triggering CRC check discards.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2">
                Upstream ISP Peering Congestion
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Inefficient routing pathways at BGP autonomous boundaries cause traffic to bottle at intermediate peering exchanges, dropping frames before they reach the game server.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Step-by-Step Fixes */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            5. Deep-Dive Diagnostic & Resolution Procedures
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Follow these technical troubleshooting procedures to systematically resolve packet drops on your local network:
          </p>

          <div className="space-y-6">
            <div className="p-5 bg-[var(--bg-elevated)] border-l-4 border-[var(--brand-500)] rounded-r-xl">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2">
                Procedure A: Resolving Bufferbloat via SQM (Smart Queue Management)
              </h3>
              <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                Bufferbloat occurs because traditional routers use simple FIFO (First-In, First-Out) queuing. Smart Queue Management uses active queue management (AQM) algorithms like FQ-CoDEL (Fair Queueing Controlled Delay) or CAKE to dynamically manage packet scheduling.
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-xs md:text-sm text-[var(--text-muted)]">
                <li>Log into your router admin dashboard (e.g., 192.168.1.1).</li>
                <li>Navigate to the <strong>Advanced</strong> or <strong>QoS (Quality of Service)</strong> settings.</li>
                <li>Enable <strong>Smart Queue Management (SQM)</strong> or <strong>FQ-CoDEL</strong>.</li>
                <li>Run a speed test to determine your baseline download and upload speeds.</li>
                <li>Set the router&apos;s SQM bandwidth limit parameters to exactly <strong>90%</strong> of your baseline speed. This leaves a 10% overhead, preventing the WAN link from ever reaching full physical saturation and keeping the router&apos;s buffers completely flat.</li>
              </ol>
            </div>

            <div className="p-5 bg-[var(--bg-elevated)] border-l-4 border-emerald-500 rounded-r-xl">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2">
                Procedure B: Isolating Double NAT Conflicts
              </h3>
              <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                Cascading routers perform duplicate NAT translations, leading to tracking table exhaustion. If your private router is connected to an ISP modem-router combo unit, you have double NAT. Learn more about local gateway mismatches in our <Link href="/default-gateway-not-available" className="text-[var(--brand-400)] hover:underline">default gateway not available</Link> guide.
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-xs md:text-sm text-[var(--text-muted)]">
                <li>Access the web interface of your ISP-provided gateway device.</li>
                <li>Navigate to WAN Settings and locate the routing mode parameter.</li>
                <li>Toggle the setting from Router Mode to <strong>Bridge Mode</strong> (or IP Passthrough). This disables NAT and DHCP on the ISP unit, passing the public IP directly to your personal router.</li>
                <li>Restart both units to force a clean WAN DHCP renegotiation.</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Section 7: Windows Commands */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            6. Windows Terminal Commands for Network Diagnosis
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Run these diagnostic commands inside an elevated Windows Command Prompt or PowerShell terminal (Run as Administrator):
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">
            Continuous Ping with Custom Payload Sizing
          </h3>
          <pre className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-green-400 overflow-x-auto">
            ping -n 150 -l 1472 1.1.1.1
          </pre>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            This command transmits 150 packets to Cloudflare with a custom payload size of 1472 bytes. When combined with the 28-byte IP and ICMP headers, this totals exactly 1500 bytes (the standard Ethernet MTU limit). If this command drops packets while a standard ping (32 bytes) succeeds, you have a physical layer framing issue or MTU fragmentation block.
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">
            Pathping Diagnostic (Hop-by-Hop Packet Loss Calculation)
          </h3>
          <pre className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-green-400 overflow-x-auto">
            pathping 8.8.8.8
          </pre>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Pathping acts as a hybrid of traceroute and ping. It traces the route to the target server, then spends 250 seconds sending pings to every intermediate router hop along the path, calculating precise packet loss percentages for each node.
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">
            Displaying Detailed Protocol Statistics
          </h3>
          <pre className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-green-400 overflow-x-auto">
            netstat -s -p tcp
          </pre>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            This retrieves comprehensive statistics for the TCP protocol stack, showing exact counters for segments sent, received, retransmitted, and connection errors. If your retransmitted segment count is high relative to total segments sent, your local OS is actively dropping frames.
          </p>
        </section>

        {/* Section 8: macOS Commands */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            7. macOS Terminal Commands for Network Diagnosis
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Open the Terminal application on macOS and utilize these Unix-based diagnostic utilities:
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">
            Continuous Ping with Sub-Second Interval
          </h3>
          <pre className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-green-400 overflow-x-auto">
            ping -c 100 -i 0.2 -s 1400 1.1.1.1
          </pre>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Transmits 100 packets at a high-speed interval of 0.2 seconds (5 packets per second) with a payload size of 1400 bytes. This creates local link pressure, revealing intermittent buffer dropouts and Wi-Fi scheduling delays.
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">
            Detailed TCP Retransmission Analysis
          </h3>
          <pre className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-green-400 overflow-x-auto">
            netstat -s | grep -i &quot;retransmit&quot;
          </pre>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Filters the system-wide protocol statistics to display cumulative counters for TCP retransmissions, timeouts, and selective acknowledgements (SACK) events.
          </p>
        </section>

        {/* Section 9: Linux Commands */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            8. Linux Terminal Commands for Advanced Users
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Linux systems feature highly modular and detailed diagnostic utilities. Run these commands in your bash or zsh terminal:
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">
            My Traceroute (MTR) Report Generation
          </h3>
          <pre className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-green-400 overflow-x-auto">
            mtr --report --report-cycles=100 8.8.8.8
          </pre>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Runs a command-line traceroute targetting Google DNS over a cycle of 100 cycles, outputting a static table of hops, sent packets, packet loss percentages, average latency, and jitter.
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">
            Inspecting Physical Drop counters (Layer 1/2)
          </h3>
          <pre className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-green-400 overflow-x-auto">
            ip -s link show eth0
          </pre>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Retrieves raw statistics for interface <code>eth0</code> (replace with your actual NIC name), displaying physical link errors, dropped incoming/outgoing frames, and collision counters.
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">
            Analyzing TCP Socket Internals
          </h3>
          <pre className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-green-400 overflow-x-auto">
            ss -tin
          </pre>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Queries active TCP socket parameters, displaying real-time statistics including round-trip time (RTT), congestion window (cwnd), retransmission counters, and socket options for every active connection.
          </p>
        </section>

        {/* Section 10: Router Brand Sections */}
        <section className="space-y-6">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            9. Brand-Specific Router Optimizations
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Every router manufacturer implements different firmware menus and feature nomenclatures. Use these brand-specific paths to configure optimizations for packet loss:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">TP-Link Routers</h3>
              <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--text-muted)]">
                <li>Log in to <code>tplinkwifi.net</code> or <code>192.168.0.1</code>.</li>
                <li>Go to <strong>Advanced &gt; NAT Forwarding &gt; ALG</strong> and disable <strong>SIP ALG</strong> to prevent voice packet drops.</li>
                <li>Go to <strong>Advanced &gt; QoS</strong> and prioritize your gaming device, setting a static upload/download limit.</li>
                <li>Disable <strong>NAT Boost</strong> (found under system parameters) if you are running custom QoS to ensure the CPU processes queues.</li>
              </ul>
            </div>

            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">ASUS Routers</h3>
              <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--text-muted)]">
                <li>Access <code>router.asus.com</code> or <code>192.168.50.1</code>.</li>
                <li>Go to <strong>Adaptive QoS &gt; QoS</strong> and choose <strong>Adaptive QoS</strong> to prioritize latency-sensitive traffic.</li>
                <li>Go to <strong>Wireless &gt; Professional</strong> and disable <strong>Green TX</strong> and <strong>TX Bursting</strong> to stabilize the Wi-Fi signal.</li>
                <li>Under <strong>WAN &gt; Internet Connection</strong>, set WAN MTU to 1492 if on DSL/PPPoE, or 1500 for standard fiber.</li>
              </ul>
            </div>

            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Netgear Routers</h3>
              <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--text-muted)]">
                <li>Log in to <code>routerlogin.net</code> or <code>192.168.1.1</code>.</li>
                <li>Navigate to <strong>ADVANCED &gt; Setup &gt; WAN Setup</strong> and check the box to disable <strong>SIP ALG</strong>.</li>
                <li>Go to <strong>ADVANCED &gt; Setup &gt; QoS Setup</strong> and uncheck <strong>WMM (Wi-Fi Multimedia)</strong> troubleshooting if you experience local drops.</li>
                <li>Ensure the router&apos;s firmware is updated manually rather than using auto-updater to avoid partition corruption.</li>
              </ul>
            </div>

            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Linksys Routers</h3>
              <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--text-muted)]">
                <li>Log in to <code>192.168.1.1</code> or your Linksys Cloud account.</li>
                <li>Go to <strong>Smart Wi-Fi &gt; Media Prioritization</strong> and turn the toggle to On.</li>
                <li>Drag your critical computers/consoles to the high-priority box to exempt them from queue throttling.</li>
                <li>Under Advanced Routing, ensure <strong>RIP (Routing Information Protocol)</strong> is disabled to prevent routing table loop drops.</li>
              </ul>
            </div>

            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Huawei Gateways</h3>
              <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--text-muted)]">
                <li>Log in to <code>192.168.100.1</code> or the gateway IP listed on the device sticker.</li>
                <li>Go to <strong>System Tools &gt; Ont Information &gt; Optical Information</strong> and check the Rx Optical Power (should be between -8dBm and -27dBm).</li>
                <li>Under WAN Settings, verify that <strong>VLAN binding parameters</strong> match your ISP profile exactly to prevent Layer 2 packet drops.</li>
                <li>Navigate to QoS Settings and ensure queue scheduling mode is set to <strong>PQ (Priority Queuing)</strong> for gaming packets.</li>
              </ul>
            </div>

            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">ZTE ONT Gateways</h3>
              <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--text-muted)]">
                <li>Log in to <code>192.168.1.1</code> using administrator credentials.</li>
                <li>Navigate to <strong>Local Network &gt; WLAN &gt; WLAN Basic &gt; WLAN Advanced</strong>.</li>
                <li>Lock your 5GHz channel width to <strong>40 MHz</strong> to reduce interference susceptibility.</li>
                <li>Go to <strong>Application &gt; QoS</strong> and assign priority queuing rules based on DSCP (Differentiated Services Code Point) values.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 11: Advanced Diagnostics */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            10. Advanced Diagnostics: Sniffing Packets in Wireshark
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            When standard command-line tools fail to isolate a subtle packet loss signature, network engineers rely on packet capture (PCAP) analysis. Download and open Wireshark to run a packet capture on your primary network interface card during a loss event.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Once you capture a sufficient sample size (e.g., 5 minutes), apply these display filters to detect packet drops:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-xs md:text-sm text-[var(--text-muted)]">
            <li>
              <code className="font-mono bg-[var(--bg-elevated)] px-1.5 py-0.5 rounded text-[var(--brand-400)]">
                tcp.analysis.retransmission
              </code>
              : This filter isolates all TCP segments that the sender has had to transmit a second time. A high density of retransmissions confirms that packets are being lost along the transit path.
            </li>
            <li>
              <code className="font-mono bg-[var(--bg-elevated)] px-1.5 py-0.5 rounded text-[var(--brand-400)]">
                tcp.analysis.duplicate_ack
              </code>
              : Shows duplicate acknowledgements sent by the receiver. This occurs when packets are lost or arrive out of order, forcing the receiver to repeatedly request the missing segment.
            </li>
            <li>
              <code className="font-mono bg-[var(--bg-elevated)] px-1.5 py-0.5 rounded text-[var(--brand-400)]">
                tcp.analysis.out_of_order
              </code>
              : Identifies packets that arrived at the destination in an incorrect sequence. While not technically dropped, out-of-order delivery forces TCP to buffer segments and wait, degrading latency similarly to packet loss.
            </li>
          </ul>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            By analyzing these captures, you can determine if loss is symmetrical (happening on both inbound and outbound hops) and verify if <strong>SACK (Selective Acknowledgement)</strong> is active. SACK allows the receiver to acknowledge non-contiguous packet blocks, allowing the sender to retransmit only the missing packets rather than the entire queue, mitigating performance penalties.
          </p>
        </section>

        {/* Section 12: ISP-Side Detection */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            11. ISP-Side Line Detection & Signal Metrics
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            If your direct-modem bypass tests confirm that packet loss originates upstream, the issue is on your Internet Service Provider&apos;s physical network plant. To see how this affects other devices, read our guide on <Link href="/router-keeps-disconnecting" className="text-[var(--brand-400)] hover:underline">router keeps disconnecting</Link>.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Access your modem&apos;s internal configuration page by opening a browser and navigating to <code>192.168.100.1</code> (common for Motorola, Netgear, and Arris modems). Locate the <strong>Cable Connection</strong> or <strong>Diagnostics</strong> tab and audit these critical Layer 1 parameters:
          </p>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-2.5 text-left">Metric</th>
                  <th className="px-4 py-2.5 text-left">Target Threshold</th>
                  <th className="px-4 py-2.5 text-left">Failure Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-4 py-2.5 font-mono text-[var(--brand-400)] font-semibold">Downstream SNR (Signal-to-Noise Ratio)</td>
                  <td className="px-4 py-2.5">&gt; 33 dB (DOCSIS 3.0/3.1)</td>
                  <td className="px-4 py-2.5">Values below 30 dB allow noise to corrupt RF packets, triggering uncorrectable codewords and total WAN dropouts.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-mono text-[var(--brand-400)] font-semibold">Downstream Power Level</td>
                  <td className="px-4 py-2.5">-7 dBmV to +7 dBmV</td>
                  <td className="px-4 py-2.5">Power levels exceeding +15 dBmV or falling below -15 dBmV saturate the modem receiver, causing frame dropouts.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-mono text-[var(--brand-400)] font-semibold">Upstream Transmit Power</td>
                  <td className="px-4 py-2.5">38 dBmV to 48 dBmV</td>
                  <td className="px-4 py-2.5">Power above 51 dBmV means the modem is pushing maximum power to overcome line resistance, dropping sync periodically.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-mono text-[var(--brand-400)] font-semibold">Uncorrected Codewords (FEC)</td>
                  <td className="px-4 py-2.5">Exactly 0 (Zero)</td>
                  <td className="px-4 py-2.5">Non-zero uncorrected codewords indicate that the modem&apos;s Forward Error Correction was overwhelmed, discarding corrupted packets.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed italic">
            Note: If you have a fiber connection (GPON or Active Ethernet), you will not have a traditional cable modem interface. Instead, locate the Optical Network Terminal (ONT) LEDs. A blinking red &quot;Fail&quot; or &quot;Video&quot; light indicates fiber microbends that require an ISP splice technician.
          </p>
        </section>

        {/* Section 13: Hardware Failure Signs */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            12. Router Hardware Failure: The Warning Signs
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Sometimes, packet loss is not caused by unoptimized settings or ISP lines, but by failing physical components inside your router. Learn more about physical connection drops in our <Link href="/ethernet-connected-but-no-internet" className="text-[var(--brand-400)] hover:underline">ethernet connected but no internet</Link> guide.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Audit your router for these key hardware failure warning signs:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-xs md:text-sm text-[var(--text-muted)]">
            <li>
              <strong>Unprovoked CPU Spikes:</strong> If the router admin dashboard reports 100% CPU usage with only 1 or 2 active devices connected, the internal processor is bottlenecked or the system has an unresolvable memory leak.
            </li>
            <li>
              <strong>Thermal Throttling:</strong> Consumer routers are fanless. If the chassis feels extremely hot to the touch (exceeding 50°C) and packet loss begins to escalate after 2 or 3 hours of operation, the processor is thermal throttling.
            </li>
            <li>
              <strong>Capacitor Swelling (Bulging):</strong> If you disassemble a failing router, inspect the electrolytic capacitors on the PCB. If their tops are slightly domed, bulging, or leaking brown residue, they have failed and can no longer stabilize the DC voltage rails.
            </li>
            <li>
              <strong>PHY Controller Resets:</strong> If your operating system continuously logs &quot;Ethernet cable unplugged&quot; followed immediately by reconnecting, the router&apos;s physical Layer 1 controller chip is resetting due to power fluctuations.
            </li>
          </ul>
        </section>

        {/* Section 14: When To Replace Hardware */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            13. When to Decommission and Replace Your Router
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            If your router is older than 5 years, it is highly likely that its hardware is no longer capable of keeping pace with modern multi-device households. You should decommission your router if it meets any of these criteria:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-xs md:text-sm text-[var(--text-muted)]">
            <li>
              <strong>Lack of Smart Queue Management (SQM) Support:</strong> If your router lacks a multi-core CPU and cannot support AQM algorithms like FQ-CoDEL, it will suffer from permanent bufferbloat on high-speed internet connections.
            </li>
            <li>
              <strong>Wi-Fi 5 or Legacy Frequencies:</strong> Older Wi-Fi 5 (802.11ac) and Wi-Fi 4 (802.11n) routers lack modern packet multiplexing features like OFDMA (Orthogonal Frequency-Division Multiple Access) and MU-MIMO. Upgrading to a Wi-Fi 6 or 6E system allows the router to handle dozens of smart devices concurrently without packet delays.
            </li>
            <li>
              <strong>End of Life (EOL) Status:</strong> If the manufacturer has discontinued firmware security patches for your router model, security vulnerabilities will pile up. Buggy, unpatched firmware can lead to memory exhaustion that manifests as persistent packet loss.
            </li>
          </ol>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            If a direct bypass test to the modem works flawlessly, but your router continues to drop packets even after a full factory reset, flash update, and cable replacement, the hardware is degraded and must be replaced.
          </p>
        </section>
      </div>
    </TroubleshootingArticleShell>
  );
}
