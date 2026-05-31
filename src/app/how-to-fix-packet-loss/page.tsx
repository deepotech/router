import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import ConnectionOptimizerClient from "@/components/tools/ConnectionOptimizerClient";

// Premium SEO Metadata
export const metadata: Metadata = buildMetadata({
  title: "How to Fix Packet Loss: Complete Network Remediation Blueprint",
  description:
    "Is your connection dropping packets? Follow our technical guide to fix packet loss on Wi-Fi and Ethernet. Mitigate bufferbloat, RF interference, double NAT, and bad ISP peering.",
  canonical: "/how-to-fix-packet-loss",
  keywords: [
    "how to fix packet loss",
    "packet loss fix",
    "reduce packet loss",
    "packet loss gaming",
    "internet packet loss",
    "packet loss troubleshooting",
    "packet loss on wifi",
    "packet loss on ethernet",
  ],
});

const breadcrumbs = [
  { name: "Network Problems", url: "/problems" },
  { name: "How to Fix Packet Loss", url: "/how-to-fix-packet-loss" },
];

const troubleshootingSteps = [
  {
    title: "Configure Smart Queue Management (SQM / FQ-CoDEL)",
    description:
      "Log into your router's admin portal (typically 192.168.1.1) and enable Smart Queue Management (SQM) using the FQ-CoDEL or CAKE algorithm. Run a speed test to obtain your baseline download and upload speeds. Enter these values into the SQM configurations, capping them at exactly 90% of your provisioned plan. This creates a 10% bandwidth safety buffer, preventing your local network from saturating the WAN interface and eliminating bufferbloat-induced tail-drops.",
    tip: "If your stock router firmware lacks SQM options, consider flashing an open-source alternative like OpenWrt to gain access to CAKE queuing.",
  },
  {
    title: "Eradicate Wi-Fi Channel Overlaps and Lock Channel Width",
    description:
      "RF congestion is a major source of packet drops. Access your wireless settings and change the 5 GHz band channel selection from 'Auto' to a dedicated, non-overlapping channel (e.g., 36, 44, or 149). Lock the channel width strictly to 40 MHz. Avoid using 80 MHz or 160 MHz widths in dense residential areas, as wide channels are highly susceptible to adjacent-channel interference and background noise.",
    tip: "Avoid DFS (Dynamic Frequency Selection) channels (52-144) if you live near an airport or radar station, as radar detection events will temporarily disable your Wi-Fi interface.",
  },
  {
    title: "Manually Lock Speed and Duplex on Local Adapters",
    description:
      "Physical Layer 1 auto-negotiation mismatches can cause local routers and network cards to drop frames. Open your operating system's device manager, go to your Ethernet adapter properties, navigate to Advanced, and set 'Speed & Duplex' from 'Auto Negotiation' to '1.0 Gbps Full Duplex' (or matching your switch limit). This prevents the interface from falling back to half-duplex, which triggers ethernet collisions and severe packet drops.",
    tip: "If the link fails to establish after forcing 1.0 Gbps, your Ethernet cable is degraded and can only support 100 Mbps. Replace the cable immediately.",
  },
  {
    title: "Disable Network Adapter Power-Saving low-Power States",
    description:
      "Operating systems frequently suspend or throttle network controllers to conserve energy. Under Device Manager, right-click your network controller, select Properties, open the Power Management tab, and uncheck 'Allow the computer to turn off this device to save power'. In the Advanced tab, also disable 'Energy Efficient Ethernet', 'Green Ethernet', and 'Ultra Low Power Mode' to prevent the NIC from dropping frames during idle transitions.",
    tip: "On macOS, run terminal optimizations to prevent the operating system from entering deep sleep states that affect background socket polling.",
  },
  {
    title: "Bypass Cascading Double NAT Interfaces",
    description:
      "If your third-party router is connected to an ISP-supplied gateway, both devices are performing NAT translation. This duplicate packet-parsing overhead can exhaust conntrack tables, dropping packets during heavy multi-device loads. Log into the ISP-provided unit, navigate to WAN configuration, and toggle the device to 'Bridge Mode' or 'IP Passthrough'. This passes the public IP directly to your secondary router, disabling its internal routing and DHCP daemons.",
    tip: "If your ISP gateway does not support Bridge Mode, assign your secondary router a static WAN IP and add that IP to the ISP gateway's DMZ (Demilitarized Zone).",
  },
  {
    title: "Tune WAN MTU and MSS Size to Prevent Fragmentation",
    description:
      "An oversized packet will fragment at the WAN boundary. If the Don't Fragment (DF) flag is set, the router drops the packet. Avoid this by logging into your router and checking WAN settings. For standard cable/fiber connections, set the MTU (Maximum Transmission Unit) to 1500. For DSL or PPPoE connections, reduce the MTU to 1492 and ensure the TCP MSS (Maximum Segment Size) is configured to clamp to the Path MTU (typically 1452).",
    tip: "Run pings with the DF flag set ('ping -f -l 1464 1.1.1.1' on Windows) to verify the exact maximum packet size your ISP line supports without fragmentation.",
  },
  {
    title: "Deconflict Software Kernel Sockets and Antivirus Hooks",
    description:
      "Third-party firewalls, network accelerators, and antivirus packet scanners install kernel-level network drivers that hook directly into your OS socket stack. A resource bottleneck in these tools will silently discard parsed frames. Disable or uninstall third-party security suites and use your OS's default security profile. Additionally, disable virtual network adapters created by inactive VPNs or virtualization tools.",
    tip: "Use command 'netsh winsock reset' on Windows to rebuild your local socket catalog and clear corrupted bindings created by uninstalled security software.",
  },
  {
    title: "Replace Corroded Coaxial Splitters and Local Lines",
    description:
      "Physical copper coax lines that transport cable broadband degrade over time due to weather exposure and heat. Inspect the coaxial cable entering your home. Replace old, gold-colored splitters with modern, high-quality 5-1002 MHz bi-directional splitters. Ensure all F-connectors are tightened securely using a wrench, as loose connectors act as antennas, introducing ingress noise that corrupts data packets.",
    tip: "Keep coaxial runs as short as possible. Every additional splitter on the line drops the downstream signal power by approximately 3.5 dB to 7 dB.",
  },
];

const faqs = [
  {
    question: "Why do I have packet loss on Ethernet but my Wi-Fi works perfectly?",
    answer:
      "Packet loss isolated to a wired Ethernet connection is typically caused by a damaged or low-quality LAN cable, an auto-negotiation duplex mismatch, or a failing port on the router or switch. Inspect the cable for physical damage, ensure it is at least Cat5e or Cat6, and lock your network card's Speed & Duplex to '1.0 Gbps Full Duplex' to rule out negotiation conflicts. If the issue persists, connect to a different LAN port on your router.",
  },
  {
    question: "How does Wi-Fi airtime congestion trigger dropped packets?",
    answer:
      "Wi-Fi operates on a half-duplex medium using the CSMA/CA protocol, meaning only one device can transmit on a channel at any given instant. When multiple devices (smart TVs, phones, laptops) on your network or neighboring networks attempt to transmit simultaneously, they must wait for the channel to clear. If the channel remains saturated, the router's transmit queue overflows, and packets are dropped. Upgrading to a Wi-Fi 6 or 6E router with OFDMA mitigates this by dividing channels into smaller sub-carriers, allowing concurrent transmissions.",
    },
  {
    question: "Can I fix packet loss by changing my DNS servers?",
    answer:
      "Changing your DNS servers will not resolve physical or logical packet loss on an active data stream, as DNS is only used to resolve domain names to IP addresses. However, if your ISP's DNS servers are dropping packets, web pages will fail to resolve or load. Switching to a stable public resolver, such as Cloudflare (1.1.1.1) or Google DNS (8.8.8.8), resolves this lookup bottleneck. Learn more in our guide on the best DNS settings for faster internet.",
  },
  {
    question: "Why does my connection suffer from packet loss only when gaming?",
    answer:
      "Multiplayer games like Valorant, CS2, and Fortnite use the stateless UDP protocol for real-time synchronization. Unlike TCP, UDP has no built-in retransmission mechanism. If a packet is lost, the client doesn't request it again. This makes even minor packet drops highly noticeable as in-game stutters or rubber-banding. Furthermore, gaming traffic is highly sensitive to bufferbloat, which occurs when other household devices saturate the bandwidth and queue up your real-time packets in the router's memory.",
  },
  {
    question: "How do I configure bridge mode to fix double NAT packet drops?",
    answer:
      "To resolve double NAT packet parsing overhead, you must configure your ISP-provided gateway to 'Bridge Mode'. Log into the ISP gateway's admin portal (typically using the IP printed on the device's sticker), go to WAN or Network Settings, and change the operation mode from 'Router' to 'Bridge' or 'IP Passthrough'. This disables the ISP unit's routing and DHCP functions, passing the public IP directly to your secondary router.",
  },
  {
    question: "What is the correct MTU size to prevent packet fragmentation?",
    answer:
      "For standard cable, fiber, and Ethernet connections, the standard MTU size is 1500 bytes. For DSL or PPPoE connections, the MTU must be reduced to 1492 bytes to accommodate the 8-byte PPPoE encapsulation header. If your MTU is too large, packets will fragment at the WAN boundary, and if the Don't Fragment flag is set, they will be discarded, resulting in silent packet drops on large file downloads.",
  },
  {
    question: "Can a faulty network interface card (NIC) cause packet loss?",
    answer:
      "Yes. A degrading NIC, outdated network drivers, or corrupted protocol bindings can drop frames at the OS kernel layer before they ever reach the network stack. Update your NIC drivers to the latest manufacturer-certified version, disable power-saving settings (like Energy Efficient Ethernet), and reset your TCP/IP stack using terminal commands to resolve local software-based drops.",
  },
  {
    question: "Why does packet loss happen during peak evening hours?",
    answer:
      "Peak-hour packet loss (typically between 7 PM and 11 PM) is almost always caused by ISP-side network congestion. During these hours, high household streaming and downloading traffic saturates the local ISP node (the CMTS in cable networks or the OLT in fiber networks). This forces the ISP's routers to drop excess packets. You can document this by running a pathping or MTR test and presenting the logs to your ISP as evidence of node congestion.",
  },
  {
    question: "How does Spanning Tree Protocol (STP) cause intermittent packet drops?",
    answer:
      "In local network switches, Spanning Tree Protocol (STP) runs to prevent packet loops. If a new switch is plugged in or a link state changes, STP triggers a topology change reconvergence. During this recalculation phase, switches will block traffic on specific ports for 30 to 50 seconds to prevent loops. During this blocking window, all routed and switched packets are dropped, presenting as a temporary but total connection blackout.",
  },
  {
    question: "What is an ICMP Black Hole and how do I fix it?",
    answer:
      "An ICMP Black Hole occurs when an intermediate router discards an oversized packet that exceeds its link's MTU but has the Don't Fragment flag set, and then fails to send a destination unreachable message back to the sender (often because firewalls are blocking ICMP traffic). The sender continues to transmit oversized packets which are silently dropped. To fix this, enable Path MTU Discovery (PMTUD) on your OS and reduce your router's WAN MTU setting to 1492 or 1450.",
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
    title: "Cascading Gateway Double NAT",
    desc: "Two routers connected in series performing duplicate NAT translation, leading to connection table (conntrack) saturation and frame dropouts.",
  },
  {
    title: "ICMP Black Hole Discards",
    desc: "Oversized packets fragmenting at the WAN boundary, while firewalls block critical ICMP Type 3 packets, resulting in silent packet drops on large payloads.",
  },
  {
    title: "Upstream ISP Node Congestion",
    desc: "Saturated neighborhood distribution nodes (CMTS/OLT) during peak evening hours, forcing the ISP's gateway routers to drop excess traffic.",
  },
];

const quickFixChecklist = [
  "Switch from unstable Wi-Fi to a shielded Cat6 Ethernet cable directly connected to the router.",
  "Enable Smart Queue Management (SQM/FQ-CoDEL) in your router to eliminate bufferbloat.",
  "Lock your 5GHz wireless channel width to 40MHz and select a clear, non-DFS channel.",
  "Manually lock your network adapter's Speed & Duplex settings to '1.0 Gbps Full Duplex'.",
  "Disable Energy Efficient Ethernet and Green Power-saving features in your device manager.",
  "Configure your ISP-supplied gateway to Bridge Mode to bypass double NAT conflicts.",
  "Check and reduce your router's WAN MTU setting to 1492 if using a PPPoE or DSL connection.",
  "Rebuild your local network socket bindings using 'netsh winsock reset' in Windows.",
];

export default function HowToFixPacketLossPage() {
  return (
    <TroubleshootingArticleShell
      h1="How to Fix Packet Loss: The Ultimate Network Remediation Blueprint"
      intro="If you are experiencing packet loss, you already know the symptoms: online games stuttering, Zoom calls freezing, and web pages stalling. Measuring packet loss is easy, but resolving it requires a systematic, engineering-grade approach. This comprehensive blueprint details how to eliminate Wi-Fi RF collisions, bypass Layer 1 physical cable errors, configure Smart Queue Management to combat bufferbloat, and troubleshoot ISP routing failures."
      category="wifi"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "Remediation Phase Warning",
        text: "Unlike simple diagnostic steps, implementing network fixes requires altering adapter parameters, flushing socket tables, and adjusting router WAN configurations. Always export a backup of your router configuration before modifying WAN MTU sizes, NAT profiles, or QoS queues to ensure you can restore baseline connectivity in a single click.",
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="If you have completed a direct-modem Ethernet bypass test and still observe consistent packet drops on hop 2 of your traceroute, the fault lies entirely with your ISP. Provide them with MTR logs and modem telemetry (downstream SNR, upstream power levels, and uncorrected codeword statistics) to bypass level 1 scripting and initiate a physical line audit."
      severityLevel="high"
    >
      <div className="space-y-8">
        {/* Section 1: Quick AI Answer */}
        <section
          className="glass-card p-6 border border-amber-950/20 bg-amber-950/5 rounded-2xl relative overflow-hidden"
          aria-label="Quick AI Answer"
        >
          <div className="absolute top-0 right-0 bg-[var(--brand-500)]/10 text-[var(--brand-400)] text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-bl-lg font-bold">
            Remediation Quick Answer
          </div>
          <h2 className="text-xs font-bold text-[var(--brand-400)] mb-3 uppercase tracking-wide">
            How to Fix Packet Loss Immediately
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            To fix packet loss, bypass Wi-Fi by connecting directly via <strong>Cat6 Ethernet</strong>. If Wi-Fi is required, lock your 5GHz channel width to <strong>40 MHz</strong> on a clear, manual channel. Enable <strong>Smart Queue Management (SQM/FQ-CoDEL)</strong> in your router settings to eliminate bufferbloat, set your ISP gateway to <strong>Bridge Mode</strong> to eliminate double NAT, and adjust your router WAN MTU to <strong>1492</strong> to prevent packet fragmentation.
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
            1. Packet Loss Symptoms and Remediation Matrix
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Observed packet loss percentages directly indicate the type of network bottleneck you are facing. Use this matrix to identify your severity tier and the corresponding remediation step:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">Observed Symptom</th>
                  <th className="px-4 py-3 text-left">Packet Loss %</th>
                  <th className="px-4 py-3 text-left">Severity</th>
                  <th className="px-4 py-3 text-left">Recommended Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-semibold">
                    In-game character stuttering, missing hits, minor rubber-banding
                  </td>
                  <td className="px-4 py-3 font-mono text-yellow-400 font-semibold">0.5% - 2%</td>
                  <td className="px-4 py-3">
                    <span className="text-yellow-400 font-bold">Medium</span>
                  </td>
                  <td className="px-4 py-3">
                    Mitigate bufferbloat by configuring SQM or prioritizing devices with QoS.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">
                    Severe VoIP voice cracking, frozen Discord feeds, telemetry rollback
                  </td>
                  <td className="px-4 py-3 font-mono text-red-400 font-semibold">2% - 5%</td>
                  <td className="px-4 py-3">
                    <span className="text-red-400 font-bold">High</span>
                  </td>
                  <td className="px-4 py-3">
                    Bypass Wi-Fi RF noise with a wired <Link href="/ethernet-connected-but-no-internet" className="text-[var(--brand-400)] hover:underline">Cat6 Ethernet cable</Link>.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">
                    Frequent socket disconnection, SSH timeout, web requests failing
                  </td>
                  <td className="px-4 py-3 font-mono text-red-500 font-semibold">&gt; 5%</td>
                  <td className="px-4 py-3">
                    <span className="text-red-500 font-bold">Critical</span>
                  </td>
                  <td className="px-4 py-3">
                    Verify physical Layer 1 connectors and check <Link href="/router-keeps-disconnecting" className="text-[var(--brand-400)] hover:underline">router disconnect events</Link>.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">
                    Web downloads freeze after 5-10MB, but simple Google searches work
                  </td>
                  <td className="px-4 py-3 font-mono text-yellow-400 font-semibold">100% (on large sizes)</td>
                  <td className="px-4 py-3">
                    <span className="text-yellow-400 font-bold">Medium</span>
                  </td>
                  <td className="px-4 py-3">
                    Eradicate ICMP Black Holes by adjusting WAN MTU settings.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Why Packet Loss Happens */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            2. Why Packet Loss Happens: The Physical and Logical Mechanics
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Packet loss is the result of frames being discarded along a transmission path. To resolve it permanently, network administrators must isolate whether the drops are caused by **physical errors** (degraded signals, corrupted bits) or **logical policy discards** (congestion queuing, firewalls, routing loops).
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            When a computer transmits a packet, the data is encapsulated in an Ethernet or 802.11 Wi-Fi frame. The sending interface calculates a 32-bit Frame Check Sequence (FCS) using a cyclic redundancy check (CRC) and appends this value to the frame footer. The receiving node recalculates the CRC. If the values do not match (due to electrical interference or signal attenuation), the receiver discards the corrupted frame immediately at Layer 2. No retransmission occurs at the link layer, forcing Layer 4 protocols (like TCP) to wait for a timeout to detect the loss.
          </p>
        </section>

        {/* Section 4: Wi-Fi Packet Loss */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            3. Wi-Fi Packet Loss: Remediating RF Signal Obstacles
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Wi-Fi is an inherently unstable medium. It operates as a half-duplex shared spectrum where data frames are susceptible to several radio-frequency (RF) degradation factors:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-xs md:text-sm text-[var(--text-muted)]">
            <li>
              <strong>RF Interference:</strong> Cordless phones, Bluetooth adapters, smart locks, and household appliances operating on the 2.4 GHz and 5 GHz bands degrade the signal-to-noise ratio.
            </li>
            <li>
              <strong>DFS (Dynamic Frequency Selection) Radar Events:</strong> Many modern routers use DFS channels to expand 5GHz bandwidth. However, when the router detects airport or military radar signals on these channels, it must vacate the channel immediately. This triggers a 60-second transmission silence, dropping all active streams.
            </li>
            <li>
              <strong>Co-Channel and Adjacent Overlap:</strong> In dense neighborhoods, multiple routers broadcasting on adjacent channels (e.g., channel 3 overlapping channels 1 and 6) corrupt each other&apos;s waveforms. Ensure you lock your router to channels 1, 6, or 11 on the 2.4 GHz band.
            </li>
            <li>
              <strong>Weak RSSI (Received Signal Strength Indicator):</strong> If your device&apos;s RSSI falls below -75 dBm, the signal is too weak to overcome the background noise floor, leading to high CRC check failures and dropped packets.
            </li>
            <li>
              <strong>Airtime Congestion:</strong> Older Wi-Fi standard routers transmit to one client at a time. If a distant client with a weak signal is downloading a file, it consumes excessive airtime, filling the router&apos;s transmit buffer and causing drops for other clients.
            </li>
          </ul>
        </section>

        {/* Section 5: Ethernet Packet Loss */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            4. Ethernet Packet Loss: Eliminating Cable and Port Failures
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            While wired Ethernet is far more stable than Wi-Fi, it is not immune to Layer 1 failures. If you have a wired connection but are experiencing drops, audit these components:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-xs md:text-sm text-[var(--text-muted)]">
            <li>
              <strong>Physical Cable Degradation:</strong> Severely bent, crushed, or oxidation-damaged copper conductors corrupt transmission bits. Make sure your cables are Cat5e, Cat6, or Cat6A, and discard old Cat5 or unshielded cables.
            </li>
            <li>
              <strong>Duplex Mismatches:</strong> If your network interface card (NIC) is configured to Full Duplex while the router port is configured to Half Duplex (or vice versa), the interfaces will transmit simultaneously, causing collision storms and severe packet loss.
            </li>
            <li>
              <strong>Bad Switch Ports:</strong> Static electricity discharges or physical stress can damage the physical RJ45 ports on your router or switch, causing intermittent link drops.
            </li>
            <li>
              <strong>Hardware NIC Failures:</strong> Degrading network adapter controllers or corrupted OS network drivers will drop incoming frames at the driver level. Update NIC drivers to the latest manufacturer version.
            </li>
          </ul>
        </section>

        {/* Section 6: Gaming Packet Loss */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            5. Gaming Packet Loss: Restoring Netcode Synchronization
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Multiplayer games utilize stateless UDP packets to achieve low latency. When packet loss occurs, it corrupts the game engine&apos;s client-server synchronization:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl">
              <h4 className="text-sm font-bold text-[var(--text-primary)] mb-2">Rubberbanding</h4>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                When player coordinate packets are dropped, the client-side predictive netcode continues moving your character forward. When the next server packet arrives, it rolls back your position to match the last server-validated coordinate, causing your character to snap backward.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl">
              <h4 className="text-sm font-bold text-[var(--text-primary)] mb-2">Hit Registration Failures</h4>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                If the UDP packet containing your weapon firing trigger is lost, the server never registers the action. On your screen, the shot fires, but the target takes no damage because the server has no record of the event.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl">
              <h4 className="text-sm font-bold text-[var(--text-primary)] mb-2">Desynchronization (Desync)</h4>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Persistent packet loss halts player state updates. The game world freezes or enemies run in straight lines into walls because the client is receiving no telemetry updates from the server.
              </p>
            </div>
          </div>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed mt-2">
            This affects competitive titles like <strong>Valorant</strong>, <strong>CS2</strong>, <strong>Warzone</strong>, and <strong>Fortnite</strong>. Elevating your gaming network prioritization via QoS is crucial for stabilizing your client&apos;s predictive netcode.
          </p>
        </section>

        {/* Section 7: Router Causes */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            6. Router-Side Bottlenecks and Failures
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Your router is the gateway controller for your entire home network. If the router&apos;s processor or operating system is bottlenecked, it will actively drop packets:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-xs md:text-sm text-[var(--text-muted)]">
            <li>
              <strong>Bufferbloat Queue saturation:</strong> Standard routers queue excess packets in memory under heavy load, inflating latency and forcing tail-drops.
            </li>
            <li>
              <strong>Firmware memory leaks:</strong> Bugs in the router&apos;s WAN daemon or DNS caching service deplete its limited RAM, causing routing processes to crash.
            </li>
            <li>
              <strong>NAT Table Overload:</strong> Having too many active TCP/UDP connections (e.g., torrenting or running multiple smart home devices) fills the router&apos;s conntrack table, dropping new socket requests.
            </li>
            <li>
              <strong>CPU Clock Throttling:</strong> An overheating SoC will throttle its clock speed to prevent damage, reducing packet processing throughput.
            </li>
          </ul>
        </section>

        {/* Section 8: ISP Causes */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            7. ISP-Side Infrastructure Congestion
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            When local bypass tests confirm that packet loss originates on the first upstream hop, the fault lies entirely with your Internet Service Provider:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-xs md:text-sm text-[var(--text-muted)]">
            <li>
              <strong>CMTS Node Overload (Cable):</strong> Cable broadband shares local node bandwidth (CMTS) with your neighbors. Saturated node capacity during peak evening hours forces packet discards.
            </li>
            <li>
              <strong>Fiber OLT Attenuation (FTTH):</strong> High attenuation on fiber optic lines (optical loss exceeding -27 dBm due to dirty connectors or microbends) prevents the Optical Line Terminal (OLT) from decoding frames.
            </li>
            <li>
              <strong>BGP Routing Peering Congestion:</strong> Inefficient routing pathways selected by ISP peering agreements force packets through congested transit hops, dropping frames at autonomous boundaries.
            </li>
          </ul>
        </section>

        {/* Section 9: Windows Fixes */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            8. Windows Command-Line Remediation Steps
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Run these diagnostic and repair commands inside an elevated Windows Command Prompt or PowerShell terminal (Run as Administrator):
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">
            Rebuild Local TCP/IP Stack and Flush DNS Cache
          </h3>
          <pre className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-green-400 overflow-x-auto">
{`ipconfig /flushdns
netsh winsock reset
netsh int ip reset`}
          </pre>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            This sequence flushes the local DNS lookup cache, resets the Winsock catalog API bindings, and overwrites corrupted TCP/IP registry settings with default values, resolving local socket drops. Restart your computer after executing.
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">
            Determine Path MTU Size and Check for Fragmentation drops
          </h3>
          <pre className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-green-400 overflow-x-auto">
            ping -f -l 1472 1.1.1.1
          </pre>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Transmits 1500-byte packets (1472 payload + 28 headers) with the Don&apos;t Fragment flag active. If this returns 'Packet needs to be fragmented but DF set', reduce the payload size in decrements of 10 until you find the maximum size your ISP accepts.
          </p>
        </section>

        {/* Section 10: Linux Fixes */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            9. Linux Terminal Remediation and Diagnostic Tools
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Linux features highly detailed system tuning utilities. Run these commands inside a bash terminal:
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">
            Run a My Traceroute (MTR) Report
          </h3>
          <pre className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-green-400 overflow-x-auto">
            mtr --report --report-cycles=100 8.8.8.8
          </pre>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Generates a static report calculating packet loss and latency statistics across 100 cycles to pinpoint the exact upstream hop discarding frames.
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">
            Inspect Hardware Interface Statistics and CRC Errors
          </h3>
          <pre className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-green-400 overflow-x-auto">
            ethtool -S eth0 | grep -i &quot;crc&quot;
          </pre>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Queries interface `eth0` statistics for physical alignment, CRC, and frame sequence check errors, indicating physical cable damage or electromagnetic noise.
          </p>
        </section>

        {/* Section 11: macOS Fixes */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            10. macOS Terminal Remediation and Network Quality Testing
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Apple macOS features integrated network diagnostic utilities. Run these commands in your Terminal:
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)]">
            Measure Latency Under Load (Bufferbloat Test)
          </h3>
          <pre className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-green-400 overflow-x-auto">
            networkQuality
          </pre>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Runs a network responsiveness test measuring download and upload capacity while tracking latency under load (responsiveness measured in RPM — Rounds Per Minute). A low RPM confirms severe bufferbloat.
          </p>
        </section>

        {/* Section 12: Router Brand Guides */}
        <section className="space-y-6">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            11. Brand-Specific Router Configuration Steps
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Apply these configurations inside your router admin interface:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">TP-Link Settings</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Log into <code>tplinkwifi.net</code> (192.168.0.1). Navigate to <strong>Advanced &gt; QoS</strong> and prioritize real-time traffic. Go to <strong>System Parameters &gt; NAT Boost</strong> and disable it to ensure QoS rules process correctly on the CPU.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">ASUSWRT Settings</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Access <code>router.asus.com</code> (192.168.50.1). Go to <strong>Adaptive QoS</strong> and enable it. Select the <strong>Games</strong> priority template. Under <strong>Wireless &gt; Professional</strong>, disable <strong>Green TX</strong> and <strong>TX Bursting</strong>.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Netgear Setup</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Log into <code>routerlogin.net</code> (192.168.1.1). Go to <strong>ADVANCED &gt; Setup &gt; WAN Setup</strong> and disable <strong>SIP ALG</strong>. In <strong>QoS Setup</strong>, disable <strong>WMM (Wi-Fi Multimedia)</strong> troubleshooting checks.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Linksys Config</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Log into <code>192.168.1.1</code>. Go to <strong>Smart Wi-Fi &gt; Media Prioritization</strong>. Drag your gaming PC or console to the High Priority list. Ensure the WAN MTU is set to 1492 if on a DSL connection.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Huawei GPON</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Log into <code>192.168.100.1</code>. Go to <strong>System Tools &gt; ONT Information</strong> and check Rx Optical Power (should be between -8dBm and -27dBm). Go to QoS Settings and ensure the queue mode is set to <strong>PQ (Priority Queuing)</strong>.
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

        {/* Section 13: ISP Escalation Checklist */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            12. ISP Escalation Evidence Checklist
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            If your diagnostic tests confirm that the packet loss originates on the ISP&apos;s network, you must gather solid technical evidence to avoid generic Tier 1 scripts. Compile this escalation package:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-xs md:text-sm text-[var(--text-muted)]">
            <li>
              <strong>Bypass Validation Statement:</strong> &quot;I have bypassed the local router, connected a PC directly to the modem LAN port via a known-good Cat6 Ethernet cable, and disabled Wi-Fi entirely. Packet loss persists under bypass.&quot;
            </li>
            <li>
              <strong>MTR/Pathping Logs:</strong> 100-packet traceroute logs showing 0% packet loss at hop 1 (your computer/modem), but continuous packet loss (e.g., 3%) starting at hop 2 or hop 3 and carrying through to the target server.
            </li>
            <li>
              <strong>Modem Telemetry Data:</strong> Screenshots of your cable modem diagnostic interface (192.168.100.1) displaying downstream SNR (if &lt;33 dB) and upstream power levels (if &gt;51 dBmV).
            </li>
            <li>
              <strong>Modem Event Logs:</strong> A copy of your modem log showing recurring <strong>T3 or T4 timeout</strong> errors, proving physical synchronization loss on the street lines.
            </li>
          </ul>
        </section>

        {/* Section 14: When To Replace Hardware */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            13. Identifying Hardware Degradation and Failing Components
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            If packet loss persists after applying all software and configuration fixes, it is highly likely that your physical hardware is failing:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[var(--text-secondary)]">
            <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)]">Failing Router</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Chassis is extremely hot to the touch, custom configurations reset to default after a reboot, or the local administrative dashboard is sluggish and reports 100% CPU usage with only a few connected devices.
              </p>
            </div>
            <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)]">Failing NIC</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                The operating system continuously logs &quot;Network cable unplugged&quot; followed immediately by reconnecting, even with a known-good Cat6 cable, indicating that the controller chip is resetting due to power rail instability.
              </p>
            </div>
            <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)]">Failing Modem</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                The modem completely drops upstream synchronization (flashing online light) multiple times per day despite having healthy line signal levels, indicating that the internal receiver or power adapter is degraded.
              </p>
            </div>
          </div>
        </section>
      </div>
    </TroubleshootingArticleShell>
  );
}
