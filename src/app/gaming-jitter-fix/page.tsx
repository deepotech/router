import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import ConnectionOptimizerClient from "@/components/tools/ConnectionOptimizerClient";

// Premium SEO Metadata
export const metadata: Metadata = buildMetadata({
  title: "Gaming Jitter Fix: Complete Guide to Fix Unstable Ping in Games",
  description:
    "Learn how to fix network jitter and ping fluctuations in gaming. Optimize Wi-Fi, Ethernet, QoS (SQM, FQ-CoDel, CAKE), and ISP routing for Valorant, Warzone, Fortnite, CS2, and Apex Legends.",
  canonical: "/gaming-jitter-fix",
  keywords: [
    "gaming jitter fix",
    "how to fix jitter in games",
    "reduce jitter gaming",
    "network jitter fix",
    "jitter vs ping",
    "jitter causing lag",
    "packet delay variation",
    "gaming latency spikes",
    "jitter warzone",
    "jitter valorant",
    "jitter fortnite",
    "jitter cs2",
    "unstable ping gaming",
    "network fluctuation gaming",
  ],
});

const breadcrumbs = [
  { name: "Gaming Net", url: "/problems" },
  { name: "Gaming Jitter Fix", url: "/gaming-jitter-fix" },
];

const troubleshootingSteps = [
  {
    title: "Bypass Wireless Mediums via Wired Cat6/Cat6A Ethernet",
    description:
      "Physical air interface scheduling is the primary source of packet delay variation (jitter). Replace Wi-Fi connections with a direct, shielded Cat6 or Cat6A Ethernet cable. Ensure it connects directly from your PC or console's Network Interface Card (NIC) to a physical Gigabit LAN port on your primary router, avoiding intermediary devices like powerline adapters or unmanaged switches.",
    tip: "Avoid flat Ethernet cables as they lack twisted copper pairs and are highly susceptible to crosstalk, which corrupts frames and triggers packet latency spikes.",
  },
  {
    title: "Implement Smart Queue Management (SQM) with FQ-CoDEL or CAKE",
    description:
      "Bufferbloat occurs under asymmetric network load when background applications saturate upload or download bandwidth, filling the router's buffer queues. Log into your router's gateway configuration interface (typically 192.168.1.1 or 192.168.0.1). Enable SQM using FQ-CoDEL or CAKE algorithms. Perform a raw speed test, then set the SQM upload and download caps to exactly 90% of your maximum provisioned line speed to maintain flat network buffers.",
    tip: "If your stock firmware lacks SQM, flashing open-source firmware like OpenWrt can expose advanced CAKE active queue management parameters.",
  },
  {
    title: "Configure Dynamic Class-of-Service QoS for Game Port Priority",
    description:
      "If your hardware does not support SQM, configure traditional Class-of-Service (CoS) or Quality of Service (QoS). Assign your gaming system a static IP address, then designate that IP as 'Highest Priority' within your QoS rules. Configure port-specific priority queues for multiplayer game client ports (e.g., UDP ports 5000-5500 for Warzone or UDP 7000-7500 for Valorant) to bypass low-priority background downloads.",
    tip: "Ensure WMM (Wi-Fi Multimedia) is checked under QoS wireless tabs, as this is required to authorize high-speed wireless transmission standards.",
  },
  {
    title: "Flush System Sockets and Reset the OS Network Catalog",
    description:
      "Operating system socket configurations can accumulate corrupt winsock bindings, faulty routing entries, and dirty DNS records that silently drop network frames. Reset these catalogs on Windows by running 'netsh winsock reset' and 'netsh int ip reset' in an elevated terminal, then rebooting your machine. This forces your OS kernel to rebuild the socket bindings, clearing local driver-level discard bugs.",
    tip: "Always execute a clean reboot after resetting the IP stack to force the network adapter to rebind its DHCP lease and system routing tables.",
  },
  {
    title: "Audit and Secure the WAN Maximum Transmission Unit (MTU)",
    description:
      "An oversized MTU size leads to packet fragmentation. If a packet exceeds the WAN MTU limit and is marked with the 'Don't Fragment' (DF) flag, it is discarded by intermediate routers. Prevent this by determining your exact link MTU using manual ping test payloads, then adjusting the WAN MTU setting in your router configuration to fit the network limit (e.g., 1492 for PPPoE or 1500 for cable/fiber).",
    tip: "Run 'ping -f -l 1472 1.1.1.1' on Windows; if it returns fragmentation requirements, drop the size by 10-byte steps until you find the exact non-fragmenting payload.",
  },
  {
    title: "Transition to Bridged Gateway and Deconflict Double NAT",
    description:
      "Cascading two routers in series (such as an ISP-supplied optical terminal connected to your premium Asus or Netgear router) forces double NAT. Both gateways perform concurrent translation overhead, filling connection state tables and dropping UDP game packets. Log into your ISP gateway, disable its DHCP server, turn off wireless radios, and activate 'Bridge Mode' or 'IP Passthrough' to deliver the public IP directly to your secondary gaming router.",
    tip: "If Bridge Mode is locked by your ISP, configure DMZ (Demilitarized Zone) on the ISP gateway targeting the WAN IP of your primary gaming router to bypass filtering layers.",
  },
];

const faqs = [
  {
    question: "What is acceptable jitter for gaming?",
    answer:
      "For competitive online gaming, the ideal jitter level is under 2ms. Jitter between 2ms and 5ms is generally acceptable and rarely noticeable. Jitter between 5ms and 15ms can cause minor stutters and input lag, while levels above 15ms lead to severe rubberbanding, missed hit registration, and erratic gameplay behavior. Competitive players should aim for a solid, stable jitter level under 2ms.",
  },
  {
    question: "Is 5ms jitter bad?",
    answer:
      "Jitter of 5ms is not inherently bad and will be playable in most casual games. However, in fast-paced competitive shooters like Valorant or CS2, even 5ms of jitter means your ping fluctuates by 5ms in either direction, causing inconsistent click registration and subtle micro-stutters. If you are aiming for peak performance, you should troubleshoot your network to bring jitter down under 2ms.",
  },
  {
    question: "Can DNS reduce jitter?",
    answer:
      "No, DNS (Domain Name System) has no impact on network jitter. DNS is only used once to resolve a game server's domain name to an IP address when you initially connect. Once the game connection is established, all gameplay packets flow directly via IP addresses, completely bypassing the DNS server. Changing your DNS can improve initial connection times, but it won't stabilize ping fluctuations or jitter.",
  },
  {
    question: "Does Ethernet eliminate jitter?",
    answer:
      "Ethernet eliminates Wi-Fi-specific jitter caused by radio frequency interference, signal blockage, and airtime congestion. However, Ethernet cannot fix jitter that occurs outside your local network, such as router buffer saturation, ISP node congestion, bad peering, or server-side problems. While switching to a Cat6 Ethernet cable is the most effective local fix, you may still experience drops if the issue lies with your ISP.",
  },
  {
    question: "Does QoS actually help reduce jitter?",
    answer:
      "Yes, Quality of Service (QoS) and Smart Queue Management (SQM) are highly effective at reducing jitter. They prioritize real-time, latency-sensitive packets (like game commands and voice chat) over bulk downloads. By queuing and delaying low-priority traffic, QoS prevents your network from saturating your bandwidth, keeping buffers clean and eliminating congestion-induced packet drops.",
  },
  {
    question: "Can a gaming router reduce jitter?",
    answer:
      "Yes. Premium gaming routers feature more powerful CPUs, larger RAM buffers, and advanced traffic-shaping firmware (like DumaOS or OpenWrt-based systems). These hardware and software capabilities allow the router to process dense packet streams more efficiently, manage connection tracking tables without overloading, and implement advanced SQM algorithms that keep local network jitter near 0ms.",
  },
  {
    question: "Why is jitter worse at night?",
    answer:
      "Jitter that occurs consistently during peak evening hours (typically 7 PM to 11 PM) is almost always caused by ISP congestion. During these hours, high local residential usage (streaming, downloading, gaming) saturates your neighborhood's distribution node (CMTS or OLT). When the node reaches its bandwidth limit, the ISP's routers drop excess packets. You can document this using MTR logs to prove the drops occur on your ISP's network hops.",
  },
  {
    question: "Does fiber optic internet eliminate jitter?",
    answer:
      "Fiber to the Home (FTTH) connections offer the lowest latency and jitter because light signals traveling through glass fibers are completely immune to electromagnetic interference, radio congestion, and signal attenuation over distance. While fiber drastically reduces local line jitter compared to cable or DSL, upstream ISP peering bottlenecks or congested game servers can still introduce network jitter.",
  },
  {
    question: "Can VPNs reduce jitter?",
    answer:
      "Yes, in specific cases where your ISP has poor routing policies or congested peering agreements. A gaming VPN (such as ExitLag or Mudfish) routes your packets over a private, optimized network directly to the game server. By bypassing your ISP's standard, congested routing nodes, a VPN can stabilize your connection, reduce ping fluctuations, and lower jitter.",
  },
  {
    question: "What causes jitter without packet loss?",
    answer:
      "Jitter without packet loss is typically caused by queuing delays in your router (bufferbloat) or along your ISP's routing path. When network buffers are filled but not completely saturated, packets are not dropped, but they are forced to wait in memory queues for varying amounts of time. This variation in waiting times causes packets to arrive at the server at inconsistent intervals, creating high jitter without active packet loss.",
  },
  {
    question: "Can low ping still have high jitter?",
    answer:
      "Yes. Jitter is the variation in packet arrival times, not the speed of the packets themselves. You can have a low average ping of 15ms, but if your packets arrive at intervals ranging from 5ms to 45ms, your connection has high jitter. This creates an extremely unstable gaming experience with micro-stutters and rubberbanding, despite the low ping counter displayed in the game HUD.",
  },
  {
    question: "Does Wi-Fi 6 reduce jitter?",
    answer:
      "Yes. Wi-Fi 6 (802.11ax) introduces OFDMA (Orthogonal Frequency-Division Multiple Access) and improved MU-MIMO, allowing the router to transmit data to multiple devices simultaneously rather than queuing them. This scheduling efficiency dramatically reduces latency variation and wireless jitter compared to older Wi-Fi 5 or Wi-Fi 4 standards.",
  },
  {
    question: "Can QoS eliminate jitter completely?",
    answer:
      "QoS can completely eliminate local network jitter caused by bufferbloat and bandwidth saturation from other devices in your home. However, QoS cannot control what happens once your packets leave your router. If the jitter is caused by an overloaded ISP street node, bad peering agreements, or congested game servers, router-level QoS will not be able to resolve it.",
  },
  {
    question: "Why do I only get jitter at night?",
    answer:
      "Peak-hour jitter (typically between 7 PM and 11 PM) is caused by neighborhood bandwidth saturation. As your neighbors stream video, download updates, and browse the web, they saturate the shared ISP distribution node. This node congestion forces the ISP gateway to queue or drop packets, introducing massive delay variations and jitter to your real-time gaming streams.",
  },
];

const commonCauses = [
  {
    title: "Wi-Fi RF Path Degradation",
    desc: "Overlapping adjacent channels, DFS radar handoffs, and weak RSSI signal levels corrupt wireless frames, triggering half-duplex collisions and packet drops.",
  },
  {
    title: "Asymmetric Bufferbloat Queues",
    desc: "Saturating upstream or downstream data transfers fill the router's memory queues, forcing tail-drops that discard latency-sensitive real-time packets.",
  },
  {
    title: "Layer 1 Cable & Port Failures",
    desc: "Oxidized copper conductors, degraded RJ45 connectors, or unshielded twisted pair runs routed near electromagnetic noise sources corrupt data frames.",
  },
  {
    title: "Upstream ISP Node Congestion",
    desc: "Saturated neighborhood distribution nodes (CMTS/OLT) during peak evening hours, forcing the ISP's gateway routers to drop excess traffic.",
  },
];

const quickFixChecklist = [
  "Switch from unstable Wi-Fi to a shielded Cat6 Ethernet cable directly connected to the router.",
  "Enable Smart Queue Management (SQM/FQ-CoDEL) in your router to eliminate bufferbloat.",
  "Lock your 5GHz wireless channel width to 40MHz and select a clear, manual channel.",
  "Manually lock your network adapter's Speed & Duplex settings to '1.0 Gbps Full Duplex'.",
  "Disable Energy Efficient Ethernet and Green Power-saving features in your device manager.",
  "Configure your ISP-supplied gateway to Bridge Mode to bypass double NAT conflicts.",
  "Check and reduce your router's WAN MTU setting to 1492 if using a PPPoE or DSL connection.",
  "Rebuild your local network socket bindings using 'netsh winsock reset' in Windows.",
];

export default function GamingJitterFixPage() {
  return (
    <TroubleshootingArticleShell
      h1="Gaming Jitter Fix: Complete Guide to Fix Latency Fluctuations & Unstable Ping"
      intro="Are you experiencing sudden micro-stutters, rubberbanding, and input delays in your games despite having a low average ping? The issue is network jitter (packet delay variation). While high ping causes static lag, network jitter breaks player simulation, triggering desynchronization and missed hit registrations. This technical guide outlines how to diagnose network fluctuations, configure active queue management (SQM/QoS), optimize wireless interfaces, and secure stable routing to competitive game servers."
      category="wifi"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "Isolate Wireless Interferences First",
        text: "Before altering router configurations or contacting your ISP, you must verify your local network interface. Connect your PC or console directly to your router using a known-good Cat6 Ethernet cable. If your ping stabilizes and jitter drops to near 0ms, your problem is strictly a local wireless Layer 2 issue — do not configure WAN settings until Wi-Fi RF health is restored.",
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="Contact your ISP if: 1) A direct-modem bypass test shows persistent packet drops starting at the second or third hop of a WinMTR trace; 2) Your modem interface (192.168.100.1) reports downstream SNR below 33 dB or upstream power exceeding 50 dBmV; 3) Your modem logs record recurring T3 or T4 timeout errors. Provide your ISP with WinMTR or PingPlotter logs to bypass Tier 1 support script loops."
      severityLevel="high"
    >
      <div className="space-y-12">
        {/* Section 1: Quick AI Answer */}
        <section
          className="glass-card p-6 border border-amber-950/20 bg-amber-950/5 rounded-2xl relative overflow-hidden"
          aria-label="Quick AI Answer"
        >
          <div className="absolute top-0 right-0 bg-[var(--brand-500)]/10 text-[var(--brand-400)] text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-bl-lg font-bold">
            Quick AI Response
          </div>
          <h2 className="text-xs font-bold text-[var(--brand-400)] mb-3 uppercase tracking-wide">
            How to Fix Gaming Jitter Instantly
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            To immediately resolve gaming jitter, switch from unstable Wi-Fi to a <strong>Cat6 Ethernet cable</strong>. Stop all background downloads and streams, and enable <strong>Smart Queue Management (SQM/FQ-CoDEL)</strong> or <strong>Quality of Service (QoS)</strong> in your router settings to eliminate bufferbloat. Reboot your modem and router to clear memory leaks. If using Wi-Fi, lock your router to the <strong>5 GHz band with a 40 MHz channel width</strong> on a clear, non-overlapping channel. Lastly, flush your DNS and reset your OS network stack using <code>netsh winsock reset</code>.
          </p>
        </section>

        {/* Dynamic Diagnostics Tool */}
        <section aria-label="Interactive Packet Loss Optimizer">
          <div className="mb-4">
            <h2 className="text-base font-bold text-[var(--text-primary)]">
              Interactive Latency & Packet Loss Optimizer
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Configure your current network setup below to generate custom, step-by-step remediation instructions for your specific environment.
            </p>
          </div>
          <ConnectionOptimizerClient mode="latency" />
        </section>

        {/* Section 2: Acceptable Jitter Levels */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            1. Acceptable Jitter Levels for Competitive Gaming
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Network jitter is measured in milliseconds (ms) and represents the average difference between the round-trip times of consecutive packets. In fast-paced games, stable frame transmission is critical:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">Jitter Range</th>
                  <th className="px-4 py-3 text-left">Quality Tier</th>
                  <th className="px-4 py-3 text-left">Impact on Online Gaming</th>
                  <th className="px-4 py-3 text-left">Remediation Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-mono font-semibold text-emerald-400">0 - 2 ms</td>
                  <td className="px-4 py-3 font-bold text-emerald-400">Excellent</td>
                  <td className="px-4 py-3">Perfect game synchronization. Hitboxes remain aligned and player movement is fluid.</td>
                  <td className="px-4 py-3">No actions required. Peak network performance.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono font-semibold text-emerald-500">2 - 5 ms</td>
                  <td className="px-4 py-3 font-bold text-emerald-500">Good</td>
                  <td className="px-4 py-3">Completely playable. Input commands register smoothly with minimal latency variation.</td>
                  <td className="px-4 py-3">Standard baseline. No immediate troubleshooting needed.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono font-semibold text-yellow-500">5 - 15 ms</td>
                  <td className="px-4 py-3 font-bold text-yellow-500">Acceptable</td>
                  <td className="px-4 py-3">Playable in casual lobbies. Occasional micro-stutters and minor registration delays.</td>
                  <td className="px-4 py-3">Recommended to check for Wi-Fi interference or background usage.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono font-semibold text-orange-400">15 - 30 ms</td>
                  <td className="px-4 py-3 font-bold text-orange-400">Poor</td>
                  <td className="px-4 py-3">Frequent stutters. Players warp slightly during movement. Noticeable delay in gunfights.</td>
                  <td className="px-4 py-3">Action required. Switch to Ethernet and check router settings.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono font-semibold text-red-500">30 - 50 ms</td>
                  <td className="px-4 py-3 font-bold text-red-500">Unplayable</td>
                  <td className="px-4 py-3">Severe rubberbanding. Characters snap backwards constantly. Frequent disconnect warnings.</td>
                  <td className="px-4 py-3">Critical issue. Configure SQM/QoS immediately to address local queue buildup.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono font-semibold text-red-600">&gt; 50 ms</td>
                  <td className="px-4 py-3 font-bold text-red-600">Critical Failure</td>
                  <td className="px-4 py-3">Total synchronization loss. Gameplay freezes for seconds at a time followed by server disconnects.</td>
                  <td className="px-4 py-3">Complete network failure. Audit physical line noise or ISP routing immediately.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Jitter Symptoms Matrix */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            2. Gaming Jitter Symptoms Diagnostic Matrix
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Unstable packet delivery intervals cause the client-side game engine and the game server to lose synchronization. Use this matrix to identify the likely root causes based on your in-game symptoms:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">Observed Symptom</th>
                  <th className="px-4 py-3 text-left">Under-the-Hood Cause</th>
                  <th className="px-4 py-3 text-left">Severity</th>
                  <th className="px-4 py-3 text-left">Remediation Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-semibold text-amber-400">
                    Rubberbanding (frequent position snapping)
                  </td>
                  <td className="px-4 py-3">
                    UDP packets carrying user input arrive out of sequence, forcing client position rewinds.
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-red-400 font-bold">High</span>
                  </td>
                  <td className="px-4 py-3">
                    Bypass wireless interfaces with a <Link href="/ethernet-connected-but-no-internet" className="text-[var(--brand-400)] hover:underline">Cat6 Ethernet cable</Link>.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-amber-400">
                    Delayed hit registration
                  </td>
                  <td className="px-4 py-3">
                    Collision verification packets delayed in router memory queues, missing server tick updates.
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-red-500 font-bold">Critical</span>
                  </td>
                  <td className="px-4 py-3">
                    Activate Smart Queue Management (SQM/CAKE) in router settings.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-amber-400">
                    Robotic voice chat or Discord cutouts
                  </td>
                  <td className="px-4 py-3">
                    Saturated upload channels create packet delay variation in VoIP UDP streams.
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-yellow-500 font-bold">Medium</span>
                  </td>
                  <td className="px-4 py-3">
                    Prioritize gaming traffic using QoS device tags.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-amber-400">
                    Random, massive ping spikes during matches
                  </td>
                  <td className="px-4 py-3">
                    Wi-Fi channel changes (DFS radar events) or background auto-backups.
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-yellow-500 font-bold">Medium</span>
                  </td>
                  <td className="px-4 py-3">
                    Lock 5GHz width to 40MHz; disable background upload tasks.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: What Is Jitter? */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            3. What Is Jitter? The Technical Breakdown
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            In networking science, jitter is defined as <strong>Packet Delay Variation (PDV)</strong>. When a client application transmits a stream of packets to a host, they are sent at a constant rate (e.g., one packet every 10ms for a 100Hz client). Jitter measures the statistical variance in the arrival times of these packets at the receiving end.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            If your ping is a stable 50ms, every packet takes exactly 50ms to arrive. The jitter is 0ms. However, if packet 1 takes 30ms, packet 2 takes 120ms, and packet 3 takes 45ms, your connection has high jitter.
          </p>
          <div className="bg-[var(--bg-elevated)] p-5 rounded-xl border border-[var(--border-subtle)] font-mono text-[11px] text-[var(--text-muted)] space-y-2">
            <div className="text-center font-bold text-[var(--text-primary)] mb-2">PACKET ARRIVAL JITTER SCHEDULING</div>
            <div className="flex flex-col items-center space-y-3">
              <div className="text-left">
                <strong>Stable Stream (0ms Jitter):</strong><br />
                Sent:    [ P1 ] --10ms-- [ P2 ] --10ms-- [ P3 ] --10ms-- [ P4 ]<br />
                Arrived: [ P1 ] --10ms-- [ P2 ] --10ms-- [ P3 ] --10ms-- [ P4 ]
              </div>
              <div className="text-left text-red-400">
                <strong>Jittery Stream (High PDV):</strong><br />
                Sent:    [ P1 ] --10ms-- [ P2 ] --10ms-- [ P3 ] --10ms-- [ P4 ]<br />
                Arrived: [ P1 ] ----4ms---- [ P2 ] --------22ms-------- [ P3 ] --4ms-- [ P4 ]
              </div>
            </div>
          </div>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed mt-4">
            For online gaming, a stable connection is significantly more important than raw speed. A player on a stable, consistent 60ms ping has a major competitive advantage over a player whose ping fluctuates rapidly between 20ms and 120ms. When latency is highly variable, the game engine&apos;s predictive netcode cannot predict player positions accurately, leading to stutters and missed shots.
          </p>
        </section>

        {/* Section 5: Jitter vs Ping vs Packet Loss */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            4. Connection Metrics Comparison: Jitter vs. Ping vs. Packet Loss
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Understanding connection quality requires isolating the three primary network metrics. Learn how they differ and interact:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">Metric</th>
                  <th className="px-4 py-3 text-left">What It Measures</th>
                  <th className="px-4 py-3 text-left">Impact on Gameplay</th>
                  <th className="px-4 py-3 text-left">Remediation Guide</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Ping (Latency)</td>
                  <td className="px-4 py-3">The time (in ms) for data to make a round trip from client to server.</td>
                  <td className="px-4 py-3">Constant action delay. Commands register late, but visual simulation remains steady.</td>
                  <td className="px-4 py-3">Explore our <Link href="/high-ping-fix" className="text-[var(--brand-400)] hover:underline">High Ping Fix Guide</Link>.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Packet Loss</td>
                  <td className="px-4 py-3">The percentage of sent data packets that fail to arrive at their destination.</td>
                  <td className="px-4 py-3">Characters warp, inputs are ignored, and you experience frequent disconnections.</td>
                  <td className="px-4 py-3">Read our <Link href="/packet-loss-test" className="text-[var(--brand-400)] hover:underline">Packet Loss Test</Link> and <Link href="/how-to-fix-packet-loss" className="text-[var(--brand-400)] hover:underline">Packet Loss Fix</Link> guides.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Jitter</td>
                  <td className="px-4 py-3">The variance in arrival times between consecutive packets (Packet Delay Variation).</td>
                  <td className="px-4 py-3">Erratic micro-stutters, sudden lag spikes, and inconsistent hitbox registry.</td>
                  <td className="px-4 py-3">Apply the SQM and QoS steps in this guide.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 6: Jitter by Connection Type */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            5. Jitter Profile by Internet Connection Type
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Your physical connection technology determines your baseline jitter and latency stability. Compare the primary internet standards:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">Connection Type</th>
                  <th className="px-4 py-3 text-left">Typical Ping (ms)</th>
                  <th className="px-4 py-3 text-left">Average Jitter (ms)</th>
                  <th className="px-4 py-3 text-left">Packet Loss Risk</th>
                  <th className="px-4 py-3 text-left">Gaming Performance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-semibold text-emerald-400">Fiber (FTTH)</td>
                  <td className="px-4 py-3 font-mono">2 - 15 ms</td>
                  <td className="px-4 py-3 font-mono">&lt; 1 ms</td>
                  <td className="px-4 py-3">Minimal</td>
                  <td className="px-4 py-3">Excellent. Light signals in glass are immune to RF noise and local link congestion.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-emerald-500">Cable (Coaxial)</td>
                  <td className="px-4 py-3 font-mono">15 - 45 ms</td>
                  <td className="px-4 py-3 font-mono">1 - 4 ms</td>
                  <td className="px-4 py-3">Low</td>
                  <td className="px-4 py-3">Good. However, shared neighborhood bandwidth can cause peak-hour jitter spikes.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-yellow-500">DSL (Copper)</td>
                  <td className="px-4 py-3 font-mono">25 - 60 ms</td>
                  <td className="px-4 py-3 font-mono">3 - 8 ms</td>
                  <td className="px-4 py-3">Medium</td>
                  <td className="px-4 py-3">Fair. Highly susceptible to physical copper corrosion and local line noise.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-orange-400">5G Home Internet</td>
                  <td className="px-4 py-3 font-mono">30 - 80 ms</td>
                  <td className="px-4 py-3 font-mono">8 - 25 ms</td>
                  <td className="px-4 py-3">High</td>
                  <td className="px-4 py-3">Poor. Wireless tower congestion and atmospheric attenuation introduce high jitter.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-red-500">Starlink (Satellite)</td>
                  <td className="px-4 py-3 font-mono">40 - 90 ms</td>
                  <td className="px-4 py-3 font-mono">10 - 30 ms</td>
                  <td className="px-4 py-3">Medium</td>
                  <td className="px-4 py-3">Acceptable. Inter-satellite handoffs and weather elements create unavoidable fluctuations.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 7: How Online Games React to Jitter */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            6. How Online Games React to Jitter: Inside Game Netcode
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Multiplayer game engines use advanced synchronization methods to handle network fluctuations:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-xs md:text-sm text-[var(--text-muted)]">
            <li>
              <strong>Client-Side Prediction:</strong> The game client simulates character movement locally without waiting for server verification. If jitter disrupts the server stream, client predictions fail, forcing position resets (rubberbanding).
            </li>
            <li>
              <strong>Server Reconciliation:</strong> The server verifies client coordinates. If high jitter delays your input packets, the server rejects your action timing, resulting in shots not registering.
            </li>
            <li>
              <strong>Interpolation (lerp) Buffers:</strong> To keep movement smooth, clients delay the rendering of other players by a short buffer (e.g., 20ms). High jitter can exceed this buffer, causing player models to stutter or warp.
            </li>
            <li>
              <strong>Extrapolation:</strong> If a player&apos;s packets are delayed by jitter, the game client guesses their path based on past inputs. Once the delayed packets arrive, the client corrects their position, causing them to warp.
            </li>
          </ul>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Let&apos;s look at how this impacts specific competitive titles:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl">
              <h4 className="text-xs font-bold text-[var(--brand-400)] mb-1">Valorant (128-Tick)</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Requires server updates every 7.8ms. Even minor jitter of 3-5ms disrupts the input schedule, causing visual stutters and shots failing to register.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl">
              <h4 className="text-xs font-bold text-[var(--brand-400)] mb-1">CS2 (Sub-Tick System)</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Valve&apos;s sub-tick model tracks the exact timing of actions. If packet delay variation occurs, the server receives actions at inconsistent times, ruining muscle memory and shot accuracy.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl">
              <h4 className="text-xs font-bold text-[var(--brand-400)] mb-1">Apex Legends (20-Tick)</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Its low 20Hz tick rate makes it highly prone to prediction errors. Jitter triggers prediction icons, sliding animation issues, and severe player warping.
              </p>
            </div>
          </div>
        </section>

        {/* Section 8: Why Jitter Happens */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            7. Why Network Jitter Happens
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Network jitter is caused by queuing delays, physical interference, and routing fluctuations along the network path. Let&apos;s analyze the key areas where these issues occur:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-xs md:text-sm text-[var(--text-muted)]">
            <li>
              <strong>Local Network Bottlenecks:</strong> Wi-Fi RF noise, failing Ethernet ports, and unoptimized network card drivers.
            </li>
            <li>
              <strong>Router Queue Saturation (Bufferbloat):</strong> Heavy home network traffic saturates router buffers, adding variable delays to gaming packets.
            </li>
            <li>
              <strong>ISP Routing Instability:</strong> Inefficient routing paths and congested peering points along your ISP&apos;s network.
            </li>
            <li>
              <strong>Server-Side Congestion:</strong> Overloaded game servers fail to process incoming UDP packets at a consistent rate.
            </li>
          </ul>
        </section>

        {/* Section 9: Wi-Fi Jitter Causes */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            8. Wireless Weakness: How Wi-Fi Triggers Network Jitter
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Wi-Fi is a shared, half-duplex medium, meaning only one device can transmit on a channel at a time. Several factors disrupt this scheduling, introducing variable delay:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-xs md:text-sm text-[var(--text-muted)]">
            <li>
              <strong>Channel Congestion:</strong> Overlapping frequencies from neighboring routers disrupt transmissions. Always use manual channels like 1, 6, or 11 on 2.4 GHz, or clear channels on 5 GHz.
            </li>
            <li>
              <strong>DFS Radar Events:</strong> Many modern routers use DFS channels to expand bandwidth. If radar is detected, the router must shift channels immediately, creating sudden latency spikes and packet drops.
            </li>
            <li>
              <strong>Hidden Node Problem:</strong> Multiple wireless clients out of range of each other transmit to the router simultaneously, corrupting both data streams.
            </li>
            <li>
              <strong>Airtime Fairness Bottlenecks:</strong> Older routers process transmissions sequentially. If a distant device with a weak signal is active, it consumes excess airtime, delaying packets for other clients.
            </li>
          </ul>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            For stable wireless performance, read our guide on the <Link href="/best-router-settings-for-gaming" className="text-[var(--brand-400)] hover:underline">best router settings for gaming</Link>.
          </p>
        </section>

        {/* Section 10: Ethernet Jitter Causes */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            9. Physical Layer Problems: Ethernet-Specific Jitter
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            While wired Ethernet is much more stable than Wi-Fi, Layer 1 physical issues can still introduce jitter. Inspect these components:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-xs md:text-sm text-[var(--text-muted)]">
            <li>
              <strong>Damaged Copper Conductors:</strong> Flat cables or degraded Cat5/Cat6 runs routed near power lines absorb electromagnetic interference, corrupting packets and causing retransmission delays.
            </li>
            <li>
              <strong>Duplex Mismatches:</strong> If your network card and router port disagree on transmission modes, collisions occur, creating severe jitter.
            </li>
            <li>
              <strong>Failing Switch Ports:</strong> Corroded ports or unstable power rails on network switches cause intermittent frame delays.
            </li>
          </ul>
          
          <h3 className="text-sm font-bold text-[var(--text-primary)] mt-6">Diagnostic Commands by Platform</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-[var(--text-primary)]">Windows Console</h4>
              <pre className="p-2.5 bg-black/40 rounded font-mono text-[10px] text-green-400 overflow-x-auto">
                ping -t 8.8.8.8
              </pre>
              <p className="text-[10px] text-[var(--text-muted)]">
                Run a continuous ping test and press Ctrl+C after 100 packets to calculate average delay variation.
              </p>
            </div>
            <div className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-[var(--text-primary)]">Linux Terminal</h4>
              <pre className="p-2.5 bg-black/40 rounded font-mono text-[10px] text-green-400 overflow-x-auto">
                ethtool eth0
              </pre>
              <p className="text-[10px] text-[var(--text-muted)]">
                Verify speed, duplex settings, and interface errors on your active network interface.
              </p>
            </div>
            <div className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-[var(--text-primary)]">macOS Console</h4>
              <pre className="p-2.5 bg-black/40 rounded font-mono text-[10px] text-green-400 overflow-x-auto">
                networkQuality
              </pre>
              <p className="text-[10px] text-[var(--text-muted)]">
                Run Apple&apos;s network responsiveness test to measure ping stability under load (RPM).
              </p>
            </div>
          </div>
        </section>

        {/* Section 11: Router Queue Congestion & Bufferbloat */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            10. Router Bufferbloat & Queue Instability
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Bufferbloat is a primary cause of local network jitter. When a device on your network downloads a large file, the router queues the excess packets in its memory buffer to prevent drops.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            While this keeps file transfers steady, it adds variable delays to real-time packets (like gaming pings). As the queue grows and shrinks, your ping fluctuates wildly, creating severe jitter.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            To resolve this, configure QoS settings to prioritize real-time traffic. Learn more in our <Link href="/best-qos-settings-for-gaming" className="text-[var(--brand-400)] hover:underline">best QoS settings for gaming guide</Link>.
          </p>
        </section>

        {/* Section 12: Best QoS Settings */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            11. Best QoS Settings for Jitter Reduction
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Implementing Quality of Service (QoS) or Smart Queue Management (SQM) in your router settings is the most effective way to eliminate bufferbloat-induced ping fluctuations:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-xs md:text-sm text-[var(--text-muted)]">
            <li>
              <strong>Enable SQM (FQ-CoDEL or CAKE):</strong> These algorithms dynamically manage queue scheduling, letting small game packets bypass large file downloads.
            </li>
            <li>
              <strong>Set Bandwidth Shaping Caps:</strong> Cap your router&apos;s download and upload speeds slightly below your provisioned limits. We recommend <strong>90% for high-speed fiber</strong>, <strong>85% for cable</strong>, and <strong>80% for DSL</strong> to ensure network buffers remain flat under load.
            </li>
            <li>
              <strong>Prioritize Game Traffic:</strong> Assign your gaming console or PC a static IP address, then designate that IP as 'Highest Priority' within your QoS rules.
            </li>
          </ul>
        </section>

        {/* Section 13: Router Brand Guides */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            12. Brand-Specific Router QoS Configuration Paths
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Apply these configurations inside your router admin interface:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">TP-Link Routers</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Log into <code>tplinkwifi.net</code> (192.168.0.1). Navigate to <strong>Advanced &gt; QoS</strong>. Enable QoS and enter your upload/download speeds. Add your gaming device to the priority list and set the duration to <strong>Always</strong>. Disable <strong>NAT Boost</strong> if you experience processing conflicts.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">ASUS Routers (ASUSWRT)</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Access <code>router.asus.com</code> (192.168.50.1). Go to <strong>Adaptive QoS</strong>. Toggle QoS to <strong>ON</strong> and select the <strong>Games</strong> priority template. Under <strong>Wireless &gt; Professional</strong>, disable <strong>Green TX</strong> and <strong>TX Bursting</strong>.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Netgear Routers</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Log into <code>routerlogin.net</code> (192.168.1.1). Go to <strong>ADVANCED &gt; Setup &gt; QoS Setup</strong>. Enable WMM (Wi-Fi Multimedia) and check the box to enable bandwidth shaping. Cap speeds at 85-90% of your plan limit.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Linksys Routers</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Log into <code>192.168.1.1</code>. Go to <strong>Smart Wi-Fi &gt; Media Prioritization</strong>. Drag and drop your gaming PC or console into the High Priority list. Ensure the WAN MTU is set to 1492 if on a DSL connection.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Huawei GPON ONTs</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Log into <code>192.168.100.1</code>. Go to <strong>System Tools &gt; ONT Information</strong> and check Rx Optical Power. Navigate to QoS Settings and ensure the queue mode is set to <strong>PQ (Priority Queuing)</strong> to prioritize game packets.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">ZTE ONT Gateways</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Log into <code>192.168.1.1</code>. Go to <strong>Local Network &gt; WLAN &gt; Advanced</strong>. Lock your 5GHz channel width strictly to <strong>40 MHz</strong> to prevent co-channel overlap and adjacent-channel noise drops.
              </p>
            </div>
          </div>
        </section>

        {/* Section 14: ISP Routing Problems */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            13. ISP-Level Routing & Peering Bottlenecks
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            If local bypass tests confirm that your home network is stable, the jitter originates on your ISP&apos;s network. Common ISP-side issues include:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-xs md:text-sm text-[var(--text-muted)]">
            <li>
              <strong>BGP Routing Flaps:</strong> Border Gateway Protocol routers dynamically change pathways to avoid outages, creating sudden latency variations.
            </li>
            <li>
              <strong>Peering Congestion:</strong> High volume at exchange points forces packets through congested nodes, introducing delay variations.
            </li>
            <li>
              <strong>Shared Node Saturation:</strong> Shared fiber/coax nodes in residential areas become saturated during peak evening hours, causing queues and drops.
            </li>
          </ul>
        </section>

        {/* Section 15: Measuring Jitter Properly */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            14. Measuring Jitter Properly: Tools & Methodologies
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Isolating network fluctuations requires running reliable diagnostics. Use these measurement tools and test methods:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-xs md:text-sm text-[var(--text-muted)]">
            <li>
              <strong>Ookla Speedtest:</strong> Offers a built-in Jitter metric. Run the test and check the results table to find your connection&apos;s average delay variation.
            </li>
            <li>
              <strong>Cloudflare Speed Test:</strong> Provides highly detailed latency graphs, measuring ping stability under load and showing idle vs. download/upload jitter statistics.
            </li>
            <li>
              <strong>Waveform Bufferbloat Test:</strong> Measures how much your latency increases when your connection is saturated, grading your network buffer health.
            </li>
            <li>
              <strong>WinMTR / MTR:</strong> Combines ping and traceroute. Run MTR to your game server for 10 minutes to analyze packet loss and latency stability at every hop along the route. Learn to analyze these reports in our <Link href="/packet-loss-test" className="text-[var(--brand-400)] hover:underline">Packet Loss Test guide</Link> and <Link href="/how-to-fix-packet-loss" className="text-[var(--brand-400)] hover:underline">general packet loss fix guide</Link>.
            </li>
          </ul>

          <h3 className="text-sm font-bold text-[var(--text-primary)] mt-6">Executing Continuous Ping Loops</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-[var(--text-primary)]">Windows continuous test</h4>
              <pre className="p-2.5 bg-black/40 rounded font-mono text-[10px] text-green-400 overflow-x-auto">
                ping -n 500 8.8.8.8
              </pre>
              <p className="text-[10px] text-[var(--text-muted)]">
                Calculates maximum, minimum, and average RTT over a large sample, making it easy to identify latency fluctuations.
              </p>
            </div>
            <div className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-[var(--text-primary)]">Linux continuous test</h4>
              <pre className="p-2.5 bg-black/40 rounded font-mono text-[10px] text-green-400 overflow-x-auto">
                mtr -r -c 100 8.8.8.8
              </pre>
              <p className="text-[10px] text-[var(--text-muted)]">
                Generates a clean report displaying average latency, jitter, and loss for every hop along the path.
              </p>
            </div>
          </div>
        </section>

        {/* Section 16: Game-Specific Jitter Fixes */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            15. Game-Specific Jitter Troubleshooting & Fixes
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Different games utilize unique netcode models. Use these titles-specific optimizations to stabilize your connection:
          </p>

          <div className="space-y-6">
            <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="text-sm font-bold text-[var(--text-primary)]">Valorant Jitter Optimizations</h4>
              <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--text-muted)]">
                <li>Go to <strong>Settings &gt; Video &gt; Stats</strong> and turn on the <strong>Network RTT Jitter</strong> graph.</li>
                <li>If the graph shows frequent spikes, cap your frame rate (FPS) to match your monitor&apos;s refresh rate. This limits client send rate spikes.</li>
                <li>Disable Windows Game Mode hooks that throttle background network threads.</li>
              </ul>
            </div>
            <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="text-sm font-bold text-[var(--text-primary)]">Counter-Strike 2 (CS2) Jitter Optimizations</h4>
              <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--text-muted)]">
                <li>Enable the network telemetry interface in game settings to monitor real-time packet stability.</li>
                <li>Configure the client-side buffer size using launch parameters. Setting <code>cl_net_buffer_ticks 2</code> forces the game to buffer incoming packets for 2 ticks, smoothing out variations caused by jitter.</li>
                <li>Select a static server region instead of relying on the matchmaking engine&apos;s automatic routing.</li>
              </ul>
            </div>
            <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="text-sm font-bold text-[var(--text-primary)]">Fortnite & Warzone Jitter Optimizations</h4>
              <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--text-muted)]">
                <li>Turn on HUD net stats to track real-time packet statistics.</li>
                <li>Configure port forwarding for Call of Duty (UDP/TCP 3074) to secure an Open NAT type, preventing packet routing delays. Learn more in our <Link href="/nat-type-strict" className="text-[var(--brand-400)] hover:underline">NAT type strict guide</Link>.</li>
                <li>Disable high-resolution texture streaming in the Epic Games Launcher settings to prevent background downloads.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 17: Advanced Network Optimization */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            16. Advanced Home Network Adjustments for Low Jitter
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Advanced users can configure additional settings in their OS and router for optimal stability:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-xs md:text-sm text-[var(--text-muted)]">
            <li>
              <strong>VLAN Prioritization:</strong> Set up a dedicated virtual LAN (VLAN) for your gaming devices, and assign it priority queues (802.1p) to bypass general household traffic.
            </li>
            <li>
              <strong>DSCP Tagging:</strong> Configure Quality of Service packet tagging in Windows (via Group Policy) to tag game UDP packets with DSCP value <code>46 (EF - Expedited Forwarding)</code>. This instructs your router to process them before any other traffic.
            </li>
            <li>
              <strong>OFDMA & Wi-Fi 6 Scheduling:</strong> If using Wi-Fi 6, enable OFDMA and MU-MIMO in your router settings. This allows the router to transmit data to multiple clients simultaneously, eliminating wireless queue latency.
            </li>
            <li>
              <strong>Disable WMM Power Save:</strong> Ensure WMM Power Save is disabled in your router&apos;s wireless settings to prevent the gateway from putting the wireless chip to sleep during idle gameplay frames.
            </li>
          </ul>
        </section>

        {/* Section 18: Escalation Checklist */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            17. Gathering Evidence & Escalating Upstream Jitter to Your ISP
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            If your diagnostic tests confirm that the jitter originates on the ISP&apos;s network, you must gather solid technical evidence to avoid generic Tier 1 scripts. Compile this escalation package:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-xs md:text-sm text-[var(--text-muted)]">
            <li>
              <strong>Bypass Validation Statement:</strong> &quot;I have bypassed the local router, connected a PC directly to the modem LAN port via a known-good Cat6 Ethernet cable, and disabled Wi-Fi entirely. Jitter fluctuations persist under bypass.&quot;
            </li>
            <li>
              <strong>MTR/Pathping Logs:</strong> 100-packet traceroute logs showing low, stable ping at hop 1 (your computer/modem), but continuous delay variation and spikes starting at hop 2 or hop 3 and carrying through to the target server.
            </li>
            <li>
              <strong>Modem Telemetry Data:</strong> Screenshots of your cable modem diagnostic interface (192.168.100.1) displaying downstream SNR (if &lt;33 dB) and upstream power levels (if &gt;51 dBmV).
            </li>
            <li>
              <strong>Peak-Hour Comparison Logs:</strong> Collect network traces at 9 AM (off-peak, low jitter) and 9 PM (peak-hour, high jitter) to document node congestion.
            </li>
          </ul>
        </section>
      </div>
    </TroubleshootingArticleShell>
  );
}
