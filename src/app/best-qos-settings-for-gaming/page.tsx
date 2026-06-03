import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import ConnectionOptimizerClient from "@/components/tools/ConnectionOptimizerClient";
import {
  Settings,
  Wifi,
  Globe,
  Shield,
  Terminal,
  Activity,
  Network,
  Cpu,
  Zap,
  HardDrive,
  Gamepad2,
  BarChart3,
  BookOpen,
} from "lucide-react";

// =============================================================
// Premium SEO Metadata
// =============================================================

export const metadata: Metadata = buildMetadata({
  title: "Best QoS Settings for Gaming: Smart Queue Management & Low Latency | RouterVia",
  description:
    "Master router Quality of Service (QoS) for competitive gaming. Set up SQM, CAKE, and FQ-CoDel, eliminate bufferbloat, and prioritize Valorant, CS2, and console traffic.",
  canonical: "/best-qos-settings-for-gaming",
  keywords: [
    "best qos settings for gaming",
    "qos for gaming",
    "gaming qos settings",
    "reduce gaming lag with qos",
    "qos router gaming",
    "gaming traffic prioritization",
    "bufferbloat fix",
    "fq codel",
    "cake qos",
    "gaming latency",
    "packet loss gaming",
    "reduce ping gaming",
    "smart queue management",
  ],
});

// =============================================================
// Breadcrumbs
// =============================================================

const breadcrumbs = [
  { name: "Gaming Tools", url: "/nat-type-checker" },
  { name: "Best QoS Settings for Gaming", url: "/best-qos-settings-for-gaming" },
];

// =============================================================
// Common Causes
// =============================================================

const commonCauses = [
  {
    title: "FIFO Queue Downstream Congestion",
    desc: "By default, routers process packets in a First-In, First-Out queue, causing gaming packets to wait behind large streaming or download flows.",
  },
  {
    title: "Upload Buffer Saturation",
    desc: "Consumer modems have very small upload buffers. Saturation from background photo syncs or backups spikes ping to 300ms instantly.",
  },
  {
    title: "Aggressive TCP Window Scaling",
    desc: "Downloads use TCP window scaling to saturate your line capacity, leaving no headroom for latency-sensitive game UDP packets.",
  },
  {
    title: "Router CPU Bottlenecking",
    desc: "Enabling QoS on high-speed lines (above 250 Mbps) on older routers can max out their CPU, creating local queue delays and jitter.",
  },
];

// =============================================================
// Quick Fix Checklist
// =============================================================

const quickFixChecklist = [
  "Run a speed test on a wired connection to establish your baseline speeds.",
  "Calculate 90% of your measured speeds to determine your QoS download/upload caps.",
  "Log into your router's admin panel and locate the QoS, Traffic Control, or SQM menu.",
  "Select CAKE or FQ-CoDel as your Smart Queue Management queue discipline.",
  "Input your calculated download/upload caps into the QoS speed fields.",
  "Enable link-layer overhead compensation (select ATM for DSL, or Cable/DOCSIS).",
  "Assign your gaming console or PC Highest or Real-time priority.",
  "Verify your configuration using a bufferbloat test at waveform.com."
];

// =============================================================
// Troubleshooting Steps (Renders at the top of the shell)
// =============================================================

const troubleshootingSteps = [
  {
    title: "Identify Bandwidth Baselines via Wired Speed Test",
    description:
      "Connect your PC or console directly to your router with an Ethernet cable. Run three speed tests during off-peak hours using a reliable utility like Speedtest.net or Fast.com. Document your average download and upload speeds. Do not use the speed tier values advertised by your ISP, as physical line attenuation and local node load will often reduce real-world throughput by 5% to 15%. Your QoS configuration requires actual measured speeds to calculate queue limits accurately.",
    tip: "Always run these tests while other household devices are disconnected or idle. If background streaming or downloads are active during the test, your baseline measurements will be artificially low, skewing your QoS parameters.",
  },
  {
    title: "Calculate and Set Your Bandwidth Caps",
    description:
      "Take your measured baseline download and upload speeds and calculate 90% of those values (multiply by 0.90). For highly congested connections or DSL lines, use 85% (multiply by 0.85). Log into your router's admin panel, locate the QoS, Traffic Control, or SQM menu, and input these calculated speeds as your maximum bandwidth limits. This 10% to 15% headroom is the essential boundary that keeps your router's transmit buffers from saturating.",
    tip: "If your measured download speed is 300 Mbps, your QoS cap should be set to 270 Mbps. If upload is 30 Mbps, set the upload cap to 27 Mbps. Move these limits down by another 5% if you continue to see ping spikes under full load.",
  },
  {
    title: "Choose the Best Queue Discipline (SQM)",
    description:
      "If your router supports Smart Queue Management (SQM) through OpenWRT or custom firmware, select either CAKE (Common Applications Kept Enhanced) or FQ-CoDel (Fair Queueing Controlled Delay) as your Active Queue Management (AQM) discipline. In the settings, specify your physical interface type (e.g., Cable, Fiber, or DSL/PPPoE) so the router can automatically account for link-layer protocol framing and overhead bytes.",
    tip: "If CAKE is available, prioritize it over FQ-CoDel. CAKE handles host fairness natively, meaning it prevents a single device downloading files from starving your gaming console's queue, even if they share the same priority class.",
  },
  {
    title: "Prioritize Gaming Devices and UDP Traffic",
    description:
      "Assign your gaming console or PC a static IP address via DHCP Reservation. Inside the QoS rules panel, create a device priority rule assigning your gaming device 'Highest' or 'Real-time' priority. If your router supports application-level shaping, enable prioritization for gaming protocols and create a rule that matches all outbound UDP traffic within your game client's port ranges (e.g., UDP ports 3074, 27015-27030).",
    tip: "Make sure you don't over-prioritize devices. Assigning 'Highest' priority to multiple streaming devices or laptops in addition to your gaming PC will dilute the queue management, causing packet scheduling conflicts.",
  },
];

// =============================================================
// FAQ Data (10 advanced FAQs)
// =============================================================

const faqs = [
  {
    question: "Is CAKE QoS better than FQ-CoDel for competitive gaming?",
    answer:
      "Yes, CAKE is generally superior to FQ-CoDel for modern home networks. While both utilize fair queueing to isolate traffic flows, CAKE introduces two critical improvements: host fairness and automatic link-layer overhead calculation. Host fairness ensures that if one user runs multiple parallel download streams, they are treated as a single 'host' and cannot crowd out your gaming device. CAKE also calculates ATM/PPPoE overhead internally, preventing bufferbloat on DSL and cable links more accurately.",
  },
  {
    question: "Does QoS lower my in-game ping when the network is idle?",
    answer:
      "No, Quality of Service does not lower your baseline ping. Your baseline ping is determined by the physical distance between your router, your ISP's routing nodes, and the game server. If your idle ping is 20ms, enabling QoS will not make it 10ms. Instead, QoS is designed to stabilize your ping. It prevents your latency from spiking to 150ms or 300ms when other devices on your home network are downloading files, streaming video, or backing up data.",
  },
  {
    question: "Should I prioritize my gaming PC by IP address or MAC address?",
    answer:
      "It is best to prioritize by MAC address if your router supports it, as MAC addresses are permanently hardcoded into your network card and cannot change. If your router only supports IP-based prioritization, you must configure a DHCP Static Reservation first. This ensures your router always assigns the exact same local IP address to your gaming PC or console; otherwise, if the device receives a new IP via dynamic DHCP, your QoS rules will stop working.",
  },
  {
    question: "Does QoS help fix in-game packet loss?",
    answer:
      "QoS can resolve packet loss if the loss is caused by local network congestion (bufferbloat). Under heavy load, an unoptimized router will experience 'tail-drop,' where its memory buffer fills up completely, forcing it to discard incoming packets. QoS prevents these buffers from saturating, eliminating local packet drops. However, if the packet loss is occurring at the ISP level or along the external routing path to the game server, local QoS settings cannot fix it.",
  },
  {
    question: "Does QoS work on high-speed gigabit fiber connections?",
    answer:
      "Yes, but it is rarely necessary and can actually degrade performance on older routers. On a 1 Gbps fiber line, saturating the download or upload buffer requires massive throughput, which rarely happens during normal household use. Furthermore, shaping 1 Gbps of traffic requires significant router CPU power. If you enable QoS on a gigabit line, your router's processor may bottleneck, lowering your speeds and actually introducing latency. Only enable QoS on gigabit lines if you have a powerful quad-core router.",
  },
  {
    question: "What happens if I set my QoS bandwidth limits higher than my actual speed?",
    answer:
      "If you set your QoS limits higher than your actual line speed (for example, setting a limit of 100 Mbps on a line that only delivers 90 Mbps), QoS will fail to prevent bufferbloat. The bottleneck will shift from your router's managed queue back to the ISP's unmanaged modem buffer. The router will assume it has headroom when it does not, allowing packets to pile up in the modem queue, causing severe latency spikes.",
  },
  {
    question: "What is the difference between Upstream QoS and Downstream QoS?",
    answer:
      "Upstream QoS manages traffic leaving your home (upload), while Downstream QoS manages traffic entering your home (download). Upstream QoS is critical because upload buffers on consumer modems are typically very small, and upload saturation (like cloud backups or streaming to Twitch) spikes ping instantly. Downstream QoS is harder to control because packets have already traveled through the internet before reaching your router, but it is necessary to prevent bulk downloads from saturating your line.",
  },
  {
    question: "Will WMM (Wi-Fi Multimedia) help my gaming latency over Wi-Fi?",
    answer:
      "WMM is a Wi-Fi-specific QoS standard that classifies wireless traffic into four categories: Voice, Video, Best Effort, and Background. WMM is required for Wi-Fi 4, 5, 6, and 7 to operate at high speeds; disabling it will lock your wireless speed to 54 Mbps. While WMM does prioritize voice and video over background data, it does not prioritize gaming packets natively. You still need router-level QoS (like SQM) to manage the queue bottleneck at your WAN interface.",
  },
  {
    question: "Should I prioritize TCP or UDP traffic for gaming QoS?",
    answer:
      "You should prioritize UDP traffic. The vast majority of online multiplayer games use UDP (User Datagram Protocol) for live gameplay states (like player coordinates, actions, and physics) because it has no transmission verification overhead. TCP (Transmission Control Protocol) is used for lobbies, shop interfaces, and game downloads. Prioritizing UDP ensures your active gameplay packets bypass TCP download flows.",
  },
  {
    question: "Can I use QoS if my ISP has assigned me a private IP behind CGNAT?",
    answer:
      "Yes, QoS operates entirely on the local interface level of your router, shaping traffic before it is sent to your modem. A CGNAT (Carrier-Grade NAT) environment blocks inbound port forwarding, which affects your NAT type, but it does not prevent your local router from managing its own outbound queues. You can still use SQM, CAKE, or FQ-CoDel to eliminate bufferbloat even if your WAN IP is behind CGNAT.",
  },
];

// =============================================================
// Page Component
// =============================================================

export default function BestQosSettingsForGamingPage() {
  return (
    <TroubleshootingArticleShell
      h1="Best QoS Settings for Gaming: Eliminate Bufferbloat & Latency Spikes"
      intro="If your in-game ping is low when you are home alone but spikes to 300ms when someone else streams video or downloads a patch, your network is suffering from bufferbloat. Quality of Service (QoS) is the most powerful router configuration tool to solve this. In this guide, we dive deep into the technical mechanics of Smart Queue Management (SQM), CAKE, and FQ-CoDel, and show you exactly how to configure your router for lag-free gaming."
      category="dns"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "Router CPU Performance Warning",
        text: "Enabling advanced Quality of Service (QoS) or Smart Queue Management (SQM) requires your router's CPU to inspect and shape every incoming and outgoing packet. On entry-level routers or older hardware, enabling QoS on connections faster than 250 Mbps can max out the CPU, resulting in reduced throughput and increased jitter. Ensure your router has a multi-core processor before shaping high-speed lines.",
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="Contact your ISP if your baseline latency remains high on a direct, wired connection to your modem (indicating routing congestion on the ISP's side), or if your physical line rate fluctuates wildly, which prevents your fixed QoS bandwidth caps from functioning reliably."
      severityLevel="medium"
    >
      <div className="space-y-12">
        {/* SECTION 1: Quick AI Answer */}
        <section
          className="glass-card p-6 border border-cyan-950/20 bg-cyan-950/5 rounded-2xl relative overflow-hidden"
          aria-label="Quick AI Answer"
        >
          <div className="absolute top-0 right-0 bg-[var(--brand-500)]/10 text-[var(--brand-400)] text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-bl-lg font-bold">
            Quick AI Response Summary
          </div>
          <h2 className="text-xs font-bold text-[var(--brand-400)] mb-3 uppercase tracking-wide">
            The Optimal QoS Settings Checklist
          </h2>
          <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
            <p>
              To configure QoS for the lowest gaming latency, implement these settings in your router:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[var(--text-muted)]">
              <li><strong>Bandwidth Capping:</strong> Cap both download and upload limits to <strong>90%</strong> of your actual measured speed test results (not your advertised plan speed).</li>
              <li><strong>Queue Discipline (SQM):</strong> Select <strong>CAKE</strong> as your queue discipline. If CAKE is not supported, select <strong>FQ-CoDel</strong>.</li>
              <li><strong>Overhead Settings:</strong> If on DSL, enable ATM/PPPoE overhead calculation. If on Cable, configure DOCSIS framing settings.</li>
              <li><strong>Priority Rules:</strong> Prioritize your gaming device by MAC address, or assign highest priority to UDP port ranges 3074 and 27015-27030.</li>
            </ul>
          </div>
        </section>

        {/* Interactive Tool */}
        <section aria-label="Interactive Router Optimization Tool">
          <div className="mb-4">
            <h2 className="text-base font-bold text-[var(--text-primary)]">
              Interactive Network Latency Wizard
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Select your current internet speed and router type below to calculate your exact QoS bandwidth caps and retrieve optimized queue configs.
            </p>
          </div>
          <ConnectionOptimizerClient mode="latency" />
        </section>

        {/* SECTION 2: Symptoms Matrix */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Activity size={18} className="text-cyan-400" />
            1. Diagnostic Matrix: Network Symptoms & QoS Solutions
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Many gaming connection issues are mistakenly attributed to bad servers or slow speeds. Use this diagnostic matrix to match your symptoms with the correct QoS settings:
          </p>
          <div className="overflow-x-auto border border-[var(--border-subtle)] rounded-xl">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">Symptom</th>
                  <th className="px-4 py-3 text-left">Likely Network Cause</th>
                  <th className="px-4 py-3 text-left">QoS Solution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Ping Spikes when Downloads Start</td>
                  <td className="px-4 py-3">Modem buffers saturating (bufferbloat) due to downstream congestion.</td>
                  <td className="px-4 py-3">Enable Downstream QoS and cap speed to 90% of maximum.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">In-Game Teleporting (Jitter)</td>
                  <td className="px-4 py-3">Packet queuing delays variable over time, causing unstable packet delivery.</td>
                  <td className="px-4 py-3">Enable Smart Queue Management (SQM) with FQ-CoDel or CAKE.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Lobby Disconnections during Uploads</td>
                  <td className="px-4 py-3">Upstream buffer saturation (cloud backup or streaming) dropping TCP session packets.</td>
                  <td className="px-4 py-3">Enable Upstream QoS and cap upload speed to 85% of baseline.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Voice Chat (Discord) Robotic Audio</td>
                  <td className="px-4 py-3">UDP voice packets queued behind heavy download streams.</td>
                  <td className="px-4 py-3">Configure WMM / DiffServ to prioritize voice (EF class) and gaming UDP.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">In-Game Packet Loss Under Load</td>
                  <td className="px-4 py-3">Tail-drop at the router or modem interface due to memory queue saturation.</td>
                  <td className="px-4 py-3">Enable SQM to discard excess bulk packets before buffers fill up.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: What QoS Actually Does */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Network size={18} className="text-cyan-400" />
            2. Queuing Theory: What QoS Actually Does
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            By default, routers operate on a **FIFO (First-In, First-Out)** queuing model. Packets are processed in the exact order they arrive at the interface. If a console game packet arrives at the router behind 500 packets from a Netflix stream, the game packet must wait for the router to transmit all 500 video packets first.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            This queuing behavior creates a major bottleneck under network load. QoS solves this problem by introducing three core networking mechanisms:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)]">1. Classification</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                The router inspects packet headers (looking at IP addresses, port numbers, or DiffServ/DSCP tags) to identify what type of application generated the data. It splits traffic into separate logical categories (e.g., Gaming, VoIP, Video, Background).
              </p>
            </div>
            <div className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)]">2. Scheduling (Queue Discipline)</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                The router determines the order in which packets are pulled from the different category queues and sent over the WAN link. Advanced schedulers ensure that low-bandwidth, high-priority queues are served first.
              </p>
            </div>
            <div className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)]">3. Traffic Shaping (Rate Limiting)</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                The router artificially caps the transmission rate below the physical line speed. This prevents packets from piling up in the ISP modem's unmanaged buffer, ensuring the router retains full control over packet scheduling.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Why Gaming Suffers Without QoS */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Gamepad2 size={18} className="text-cyan-400" />
            3. Out-of-Order Gameplay: Why Gaming Suffers Without QoS
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Multiplayer online games like **Valorant**, **CS2**, **Call of Duty: Warzone**, **Fortnite**, and **Apex Legends** rely on constant, bidirectional updates of game state information. Your client sends input states to the server, and the server sends back coordinates, hit detection vectors, and physics updates.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Because these updates must happen in real time, game clients use the lightweight **UDP (User Datagram Protocol)** instead of TCP. If a UDP packet is delayed by even 50ms in a router queue, it becomes useless. The game engine cannot wait for a late coordinate update — it must skip it. In-game, this appears as rubberbanding (your character warping back to a previous position), desync (shooting a player but no hits register), and sudden, unplayable latency spikes.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Without QoS, a single bulk download (like a Steam update running on a laptop or a Twitch stream loading on a tablet) will saturate your connection, filling your router's queue and delaying these vital UDP packets.
          </p>
        </section>

        {/* SECTION 5: Bufferbloat Explained */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Activity size={18} className="text-cyan-400" />
            4. Bufferbloat: The Technical Root Cause of Gaming Lag
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            **Bufferbloat** is the term for latency inflation caused by excessive buffering of packets. Modems and routers are designed with physical memory buffers to absorb bursty traffic and prevent packet loss. However, if a download saturates your internet connection, packets will arrive faster than the physical line can transmit them, causing them to pile up in the buffer queue.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            The severity of bufferbloat varies based on connection type:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-xs md:text-sm text-[var(--text-muted)]">
            <li><strong>DSL Connections:</strong> Highly susceptible. DSL has very low upload bandwidth, meaning upload buffers saturate almost instantly when a phone uploads photos or a cloud backup runs.</li>
            <li><strong>Cable (Coaxial) Connections:</strong> Extremely susceptible. Cable networks share bandwidth across neighborhoods. During peak hours, co-axial buffers bloat severely under downstream loads.</li>
            <li><strong>Fiber (FTTH) Connections:</strong> Less susceptible due to high bandwidth, but bufferbloat still occurs when download speeds reach capacity, or on lower-tier speed plans.</li>
          </ul>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            To isolate and diagnose baseline network latency from bufferbloat spikes, read our comprehensive guide on{" "}
            <Link href="/high-ping-fix" className="text-[var(--brand-400)] hover:underline">How to Fix High Ping Issues</Link>.
          </p>
        </section>

        {/* SECTION 6: Smart Queue Management */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <BarChart3 size={18} className="text-cyan-400" />
            5. Smart Queue Management (SQM) Disciplines
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Traditional QoS prioritizes traffic based on static rules, which is easily bypassed by modern applications that use dynamic ports. **Smart Queue Management (SQM)** replaces static rules with dynamic scheduling algorithms. Use this comparison table to understand how different queue disciplines handle traffic:
          </p>
          <div className="overflow-x-auto border border-[var(--border-subtle)] rounded-xl">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">Queue Discipline</th>
                  <th className="px-4 py-3 text-left">How It Works</th>
                  <th className="px-4 py-3 text-left">Pros / Cons</th>
                  <th className="px-4 py-3 text-left">Gaming Performance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">FIFO (First-In, First-Out)</td>
                  <td className="px-4 py-3">Processes packets in the exact order they arrive.</td>
                  <td className="px-4 py-3">Pros: Zero CPU load. Cons: Severe bufferbloat under load.</td>
                  <td className="px-4 py-3 text-red-500 font-bold">Poor (Lag Spikes)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">RED (Random Early Detection)</td>
                  <td className="px-4 py-3">Randomly discards packets as the buffer fills up to force TCP slowdown.</td>
                  <td className="px-4 py-3">Pros: Reduces buffer growth. Cons: High packet loss, hard to tune.</td>
                  <td className="px-4 py-3 text-yellow-400 font-bold">Mediocre</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">FQ-CoDel</td>
                  <td className="px-4 py-3">Splits traffic into multiple sub-queues and prioritizes low-bandwidth flows.</td>
                  <td className="px-4 py-3">Pros: Great bufferbloat control. Cons: Doesn't handle host fairness natively.</td>
                  <td className="px-4 py-3 text-green-400 font-bold">Excellent</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">CAKE</td>
                  <td className="px-4 py-3">Extends FQ-CoDel with host fairness, bandwidth shaping, and auto-overhead management.</td>
                  <td className="px-4 py-3">Pros: Best bufferbloat prevention. Cons: Requires moderate router CPU.</td>
                  <td className="px-4 py-3 text-green-400 font-bold">Best (Flattest Ping)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 7: FQ-CoDel Deep Dive */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Cpu size={18} className="text-cyan-400" />
            6. FQ-CoDel (Fair Queueing Controlled Delay) Deep Dive
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            **FQ-CoDel** is an industry-standard Active Queue Management (AQM) algorithm designed to combat bufferbloat. It works by combining two distinct mechanisms:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-xs md:text-sm text-[var(--text-muted)]">
            <li><strong>Fair Queueing (FQ):</strong> The router hashes connection parameters (source IP, destination IP, protocol, ports) to dynamically assign each data flow to its own separate queue. Instead of serving one large queue, the router cycles through the queues, sending one packet from each active flow. Because gaming UDP flows send very few packets, their queues are emptied instantly, bypassing bloated TCP queues.</li>
            <li><strong>Controlled Delay (CoDel):</strong> CoDel monitors the time packets spend waiting in each queue. If the delay in a queue exceeds a target threshold (typically 5ms) for too long, CoDel begins dropping packets from that specific queue. This packet drop signals the sender's TCP stack to reduce its transmission rate, keeping the queue length under control.</li>
          </ul>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Gamers love FQ-CoDel because it provides flow isolation, ensuring your game packets never have to wait behind a download flow.
          </p>
        </section>

        {/* SECTION 8: CAKE QoS Deep Dive */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Cpu size={18} className="text-cyan-400" />
            7. CAKE (Common Applications Kept Enhanced) Deep Dive
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            **CAKE** is a modern, unified queue discipline designed as a complete replacement for the combination of FQ-CoDel and HTB (Hierarchical Token Bucket) shapers. It incorporates several advanced features:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-xs md:text-sm text-[var(--text-muted)]">
            <li><strong>Triple-Isolate Mode:</strong> Unlike FQ-CoDel, which only isolates individual flows, CAKE can isolate flows based on source host, destination host, and flow type simultaneously. If a device on your network starts 20 parallel download flows, CAKE groups them under one host ID, ensuring that device cannot starve another device that is running a single game flow.</li>
            <li><strong>Automatic Link-Layer Overhead Compensation:</strong> Modems encapsulate internet packets into physical framing layers (like ATM cells on DSL or DOCSIS frames on Cable). These layers add extra bytes to each packet. Traditional shapers only measure IP packet size, leading to buffer saturation at the physical link level. CAKE calculates these extra bytes automatically, maintaining strict queue limits.</li>
          </ul>
        </section>

        {/* SECTION 9: Bandwidth Configuration */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Settings size={18} className="text-cyan-400" />
            8. Bandwidth Configuration Formulas
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            For QoS to function, your router must control the bottleneck. If your ISP modem's buffer is saturated, your router's QoS scheduler is bypassed. Therefore, you must configure a **traffic shaper limit** that sits slightly below your physical line speed.
          </p>
          <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-3 font-mono text-xs text-[var(--text-muted)]">
            <h4 className="text-xs font-bold text-[var(--text-primary)] font-sans">Calculating Your QoS Caps</h4>
            <div className="space-y-2">
              <div><strong>Formula:</strong> <code>QoS Cap = Measured Speed * Headroom Co-efficient</code></div>
              <div><strong>Standard Connections (Fiber/Cable):</strong> Use a co-efficient of <code>0.90</code> (10% headroom).</div>
              <div><strong>Unstable Connections (Copper/DSL):</strong> Use a co-efficient of <code>0.85</code> (15% headroom).</div>
              <hr className="border-[var(--border-subtle)] my-2" />
              <div><strong>Example calculation for a 500 Mbps connection:</strong></div>
              <div>Download Cap = 500 Mbps * 0.90 = <strong>450 Mbps</strong></div>
              <div>Upload Cap = 50 Mbps * 0.90 = <strong>45 Mbps</strong></div>
            </div>
          </div>
        </section>

        {/* SECTION 10: Router Brand Settings */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Settings size={18} className="text-cyan-400" />
            9. Menu Paths by Router Brand
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Locate your router manufacturer below to access the exact configuration submenus:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)]">TP-Link (Archer / Deco)</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Open browser &gt; Log in &gt; Go to <strong>Advanced &gt; QoS</strong>. Enable QoS. Set upload and download limits to 90% of your measured speeds. Under <strong>Device Priority</strong>, find your gaming device and toggle Priority to High.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)]">ASUS (RT / ROG Series)</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Log into dashboard &gt; Go to <strong>Adaptive QoS &gt; QoS</strong>. Toggle Enable QoS. Set QoS Type to <strong>Adaptive QoS</strong> or <strong>Traditional QoS</strong>. Input upload and download limits manually. Drag the <strong>Gaming</strong> category block to the top of the priority stack.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)]">Netgear (Nighthawk / DumaOS)</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Log into DumaOS &gt; Go to <strong>Congestion Control</strong>. Under the QoS menu, drag the sliders to 90% for download and upload. Under <strong>Bandwidth Allocation</strong>, drag the percentage nodes to allocate a larger share of queue priority to your console or PC.
              </p>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)]">Linksys (Smart Wi-Fi)</h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Log into dashboard &gt; Select <strong>Device Prioritization</strong> from the left menu. Drag your gaming PC or console into the High Priority box. Set your downstream bandwidth limit in the settings gear icon.
              </p>
            </div>
          </div>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            For details on general routing parameters, static IP setups, and hardware performance adjustments, refer to our comprehensive guide on{" "}
            <Link href="/best-router-settings-for-gaming" className="text-[var(--brand-400)] hover:underline">Best Router Settings for Gaming</Link>.
          </p>
        </section>

        {/* SECTION 11: OpenWRT Gaming QoS */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Terminal size={18} className="text-cyan-400" />
            10. OpenWRT Smart Queue Management Configuration
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            If your router runs **OpenWRT**, you have access to industry-grade SQM shaping. OpenWRT handles queue disciplines via the `luci-app-sqm` package:
          </p>
          <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-green-400 space-y-2">
            <h4 className="text-xs font-bold text-[var(--text-primary)] font-sans">OpenWRT SQM Setup Steps:</h4>
            <pre className="overflow-x-auto">{`# Install the SQM package via SSH
opkg update
opkg install luci-app-sqm

# Configure SQM in /etc/config/sqm or via LuCI Web UI:
# Go to Network -> SQM Queue Discipline -> Add New Interface
# Name: wan
# Checked: Enable this SQM instance
# Interface: Select your WAN interface (e.g., eth0.2 or wan)
# Download / Upload Speed (kbit/s): Set to 90% of your speed test values
# Queue discipline: cake (Recommended) or fq_codel
# Queue setup script: piece_of_cake.qos (for cake) or simple.qos (for fq_codel)
# Linklayer: Choose 'Ethernet' or 'ATM' depending on your line type.`}</pre>
          </div>
        </section>

        {/* SECTION 12: Gaming Traffic Prioritization */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Network size={18} className="text-cyan-400" />
            11. DSCP & Traffic Classification Classes
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            **Differentiated Services Code Point (DSCP)** is a field in the IP header that allows devices to flag what priority class a packet belongs to. Game clients and consoles use specific DSCP markings for outbound traffic:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-xs md:text-sm text-[var(--text-muted)]">
            <li><strong>EF (Expedited Forwarding - DSCP 46):</strong> Used for real-time voice chat and critical game client synchronization. Packets marked EF bypass standard queues and are sent immediately.</li>
            <li><strong>CS4 / AF41 (DSCP 32/34):</strong> Used by many game engines for standard multiplayer coordination.</li>
            <li><strong>CS0 (Best Effort - DSCP 0):</strong> The default classification for all unspecified traffic (browsing, video streaming).</li>
          </ul>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            A well-configured QoS shaper will read these DSCP markings and automatically map them to corresponding priority queues inside your router. If your router has a strict firewall blocking dynamic mappings, see our guide on{" "}
            <Link href="/nat-type-strict" className="text-[var(--brand-400)] hover:underline">Fixing Strict NAT Types</Link> to configure exceptions.
          </p>
        </section>

        {/* SECTION 13: Wi-Fi QoS */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Wifi size={18} className="text-cyan-400" />
            12. Wi-Fi QoS: WMM, Airtime Fairness & Wi-Fi 6
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            QoS doesn't end at your router's WAN port. If you are playing over Wi-Fi, your wireless interface must also manage packet queue priorities:
          </p>
          <ul className="list-disc pl-6 space-y-2.5 text-xs md:text-sm text-[var(--text-muted)]">
            <li><strong>WMM (Wi-Fi Multimedia):</strong> The wireless implementation of 802.11e QoS. It categorizes wireless traffic into Voice (AC_VO), Video (AC_VI), Best Effort (AC_BE), and Background (AC_BK). WMM must remain enabled in your router settings; otherwise, the router will fallback to legacy 802.11g speeds.</li>
            <li><strong>Airtime Fairness:</strong> A feature that allocates equal wireless airtime to all devices. While this stops slow, legacy devices from slowing down the entire network, it can introduce queue delays for fast gaming devices. <strong>Disable Airtime Fairness</strong> on routers where gaming latency is prioritized.</li>
            <li><strong>OFDMA (Orthogonal Frequency-Division Multiple Access):</strong> A core feature of Wi-Fi 6 and Wi-Fi 7. It splits a single wireless channel into smaller sub-channels, allowing the router to transmit data to multiple devices simultaneously. This significantly reduces wireless queue latency.</li>
          </ul>
        </section>

        {/* SECTION 14: Ethernet QoS */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Network size={18} className="text-cyan-400" />
            13. Ethernet Link-Layer QoS: 802.1p & VLAN Tagging
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            On wired networks, Quality of Service is managed via the **802.1p** standard. 802.1p operates at Layer 2 (Data Link layer) inside the Ethernet frame header, providing a 3-bit priority field that supports eight priority classes (0 to 7).
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            If you connect your PC or console through a managed switch, you can configure the switch port connected to your gaming rig to tag all outgoing frames with **Class of Service (CoS) 5 (Voice/Real-time)** or **CoS 6 (Network Control)**. The router will read these Layer 2 tags and automatically map them to the highest priority WAN queue.
          </p>
        </section>

        {/* SECTION 15: Why QoS Sometimes Makes Things Worse */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <HardDrive size={18} className="text-cyan-400" />
            14. Pitfalls: Why QoS Sometimes Degrades Latency
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            If configured incorrectly, QoS can actually increase your ping and degrade overall network performance:
          </p>
          <ul className="list-disc pl-6 space-y-2.5 text-xs md:text-sm text-[var(--text-muted)]">
            <li><strong>Router CPU Bottlenecks:</strong> Basic routers rely on hardware NAT acceleration (cutting through CPU processing) to achieve gigabit speeds. Enabling QoS disables this hardware offload, forcing the router CPU to inspect every packet. If the CPU is slow, it will max out, dropping packets and spiking latency.</li>
            <li><strong>Incorrect Bandwidth Limits:</strong> Setting your caps higher than actual line rates renders QoS useless, shifting the queue bottleneck to the modem. Setting caps too low unnecessarily starves your network of speed.</li>
            <li><strong>Over-Prioritization:</strong> Prioritizing too many devices (e.g., adding three streaming TVs and two laptops to the high priority list) creates collision conflicts inside the high-priority queue, causing jitter.</li>
          </ul>
        </section>

        {/* SECTION 16: Testing Results */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Terminal size={18} className="text-cyan-400" />
            15. How to Verify Your QoS Optimization
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            After configuring your router, run these diagnostics to verify that bufferbloat has been resolved:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)] font-sans">Windows Command Prompt</h4>
              <p className="text-[11px] text-green-400 leading-relaxed">
                <code>pathping -q 100 8.8.8.8</code>
                <br />
                Pings the server 100 times to calculate detailed packet loss stats for each hop along the path.
              </p>
            </div>
            <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)] font-sans">macOS Terminal</h4>
              <p className="text-[11px] text-green-400 leading-relaxed">
                <code>networkQuality -v</code>
                <br />
                Measures downstream and upstream responsiveness (in Roundtrips Per Minute) under active network load.
              </p>
            </div>
            <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2">
              <h4 className="font-bold text-[var(--text-primary)] font-sans">Linux Command Line</h4>
              <p className="text-[11px] text-green-400 leading-relaxed">
                <code>mtr -e 8.8.8.8</code>
                <br />
                Runs an active, live traceroute chart showing real-time jitter and packet loss statistics.
              </p>
            </div>
          </div>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            If you continue to experience packet loss or high jitter even after configuring your caps, refer to our diagnostic guides on{" "}
            <Link href="/packet-loss-test" className="text-[var(--brand-400)] hover:underline">Packet Loss Testing</Link> and{" "}
            <Link href="/how-to-fix-packet-loss" className="text-[var(--brand-400)] hover:underline">Fixing Local Packet Loss</Link>.
          </p>
        </section>

        {/* SECTION 17: Best Gaming QoS Profiles */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Gamepad2 size={18} className="text-cyan-400" />
            16. QoS Profiles by Game Type
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Different game genres have different network requirements. Customize your QoS parameters based on what you play:
          </p>
          <div className="overflow-x-auto border border-[var(--border-subtle)] rounded-xl">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">Genre</th>
                  <th className="px-4 py-3 text-left">Traffic Characteristics</th>
                  <th className="px-4 py-3 text-left">Optimal QoS Recommendation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">FPS (Valorant, CS2)</td>
                  <td className="px-4 py-3">Low bandwidth, ultra-high frequency (128Hz send rate). Zero tolerance for jitter.</td>
                  <td className="px-4 py-3">Use CAKE / FQ-CoDel; prioritize device IP; set strict 90% bandwidth cap.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">Battle Royale (Warzone)</td>
                  <td className="px-4 py-3">Moderate bandwidth (up to 300 Kbps in dense player drop zones). Jitter causes rubberbanding.</td>
                  <td className="px-4 py-3">Prioritize UDP port 3074; use host fairness to prevent other streams from competing.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">MMO (World of Warcraft)</td>
                  <td className="px-4 py-3">Low frequency, bursts of high-bandwidth TCP traffic during raids. Jitter can desync triggers.</td>
                  <td className="px-4 py-3">Standard QoS prioritization; prioritize the game client's IP.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">MOBA (League of Legends)</td>
                  <td className="px-4 py-3">Very low bandwidth, low frequency. Stable ping is critical for click response times.</td>
                  <td className="px-4 py-3">Use FQ-CoDel with small target delay (e.g. target 3ms instead of 5ms).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 18: Router Hardware Requirements */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <HardDrive size={18} className="text-cyan-400" />
            17. Hardware Requirements for QoS Shaping
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Shaping network traffic is highly CPU-intensive. Every single packet must be received, parsed, assigned a queue index, scheduled, and delayed if it exceeds the limit.
          </p>
          <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-3 text-xs">
            <h4 className="font-bold text-[var(--text-primary)]">QoS Bandwidth Thresholds and CPU Needs</h4>
            <ul className="list-disc pl-5 space-y-2 text-[var(--text-muted)]">
              <li><strong>Below 100 Mbps:</strong> Can be handled by almost any budget single-core MIPS processor (found in cheap routers).</li>
              <li><strong>100 - 500 Mbps:</strong> Requires a dual-core ARM CPU running at 1.0 GHz or faster to prevent CPU bottlenecks.</li>
              <li><strong>500 Mbps - 1 Gbps+:</strong> Requires a high-performance quad-core ARM processor (such as Broadcom BCM4908 or MediaTek Filogic) or an x86 based home server router to shape traffic at full line speed.</li>
            </ul>
          </div>
        </section>

        {/* SECTION 19: ISP Limitations */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Globe size={18} className="text-cyan-400" />
            18. When QoS Cannot Fix the Bottleneck
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            QoS only optimizes traffic inside your home. It cannot fix latency issues that originate outside your router's WAN interface:
          </p>
          <ul className="list-disc pl-6 space-y-2.5 text-xs md:text-sm text-[var(--text-muted)]">
            <li>
              <strong>CGNAT Constraints:</strong> If your ISP assigns you a private WAN IP (common with cellular or satellite connections), your inbound traffic must transit their CGNAT gateway. This adds 10-30ms of latency and forces a Strict NAT type. See our guide on{" "}
              <Link href="/double-nat-detected" className="text-[var(--brand-400)] hover:underline">Carrier-Grade and Double NAT Resolution</Link> to identify exceptions.
            </li>
            <li>
              <strong>ISP Routing Paths:</strong> If your ISP has bad peering contracts, they may route your game packets through a circuitous path (e.g. routing a packet from New York to Philadelphia via Chicago).
            </li>
            <li>
              <strong>First-Hop Over-Subscription:</strong> If your physical cable or DSL node is congested with too many neighbors, packets will wait in the ISP's node queues, creating jitter outside your control.
            </li>
          </ul>
        </section>
      </div>
    </TroubleshootingArticleShell>
  );
}
