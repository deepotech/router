import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import {
  Wifi,
  Shield,
  Zap,
  CheckCircle2,
  ArrowRight,
  Info,
  Router,
  Settings,
  Activity,
  Star,
  TrendingUp,
  Home,
} from "lucide-react";

// =============================================================
// Premium SEO Metadata
// =============================================================

export const metadata: Metadata = buildMetadata({
  title: "Best WiFi Routers 2026: Expert Buying Guide & Top Picks | RouterVia",
  description:
    "Find the best WiFi router for your home. Compare WiFi 6, WiFi 6E, and WiFi 7 routers across every budget. Expert picks for gaming, fiber, large homes, and smart home setups.",
  canonical: "/best-wifi-routers",
  keywords: [
    "best wifi router",
    "best home router",
    "wifi 6 router",
    "wifi 7 router",
    "best router 2026",
    "router buying guide",
    "best router for home",
    "router comparison",
  ],
});

// =============================================================
// Breadcrumbs
// =============================================================

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Best WiFi Routers", url: "/best-wifi-routers" },
];

// =============================================================
// Common Causes (why people need a new router)
// =============================================================

const commonCauses = [
  {
    title: "Outdated WiFi Standard",
    desc: "Routers running WiFi 5 (802.11ac) or older lack OFDMA and Target Wake Time (TWT), creating congestion in households with 20+ connected devices and IoT sensors.",
  },
  {
    title: "Underpowered CPU & RAM",
    desc: "Entry-level routers ship with dual-core MIPS or ARM processors and only 128 MB of RAM. Under typical household load — streaming, gaming, smart home — these bottleneck and drop packets.",
  },
  {
    title: "Insufficient Coverage Area",
    desc: "Single-unit routers rarely cover homes larger than 2,000 sq ft without dead zones. Thick concrete walls and multi-story layouts amplify signal attenuation beyond recovery.",
  },
  {
    title: "Weak Security Posture",
    desc: "Routers lacking WPA3 support rely solely on WPA2-AES, which is vulnerable to KRACK and PMKID offline attacks. ISP-provided gateways are almost never patched for CVEs.",
  },
  {
    title: "No MU-MIMO or OFDMA",
    desc: "Without MU-MIMO and OFDMA, the router communicates with one device at a time in round-robin fashion. Every device on the network experiences increased latency as device count grows.",
  },
  {
    title: "ISP Gateway Limitations",
    desc: "ISP combo modem-routers prioritize cost over performance. They are locked down, rarely updated, and often cap LAN speeds, prevent VPN pass-through, and disable advanced QoS.",
  },
];

// =============================================================
// Quick Buying Checklist
// =============================================================

const quickFixChecklist = [
  "Confirm your ISP speed tier: If you have a plan over 1 Gbps, you need a router with a 2.5G or 10G WAN port — standard Gigabit Ethernet is a hard bottleneck.",
  "Count your connected devices including phones, laptops, smart TVs, game consoles, smart speakers, thermostats, and security cameras before choosing a router class.",
  "Identify your home's square footage and construction materials. Concrete and brick walls require either a mesh system or a router with beamforming and high transmit power.",
  "Check if your ISP connection type is DOCSIS 3.1 cable, GPON fiber, or DSL — this determines whether you need a separate modem or if you can use an all-in-one gateway.",
  "Verify the router supports WPA3 Personal or WPA3 Enterprise. WPA2-only routers are no longer considered secure for modern networks.",
  "Look for at least 4 Gigabit LAN ports plus one dedicated WAN port, or 2.5G multi-gig ports if you plan to wire multiple PCs or NAS devices.",
  "Confirm the firmware update track record of the manufacturer. ASUS, TP-Link, and Netgear release regular CVE patches; avoid brands that abandon firmware after 12 months.",
  "If you play games or use video conferencing heavily, prioritize routers with 4-stream (4x4) MU-MIMO and OFDMA on both 5 GHz and 6 GHz bands for the lowest airtime latency.",
];

// =============================================================
// Step-by-Step Purchase Decision Flow
// =============================================================

const troubleshootingSteps = [
  {
    title: "Audit Your Current Network Performance",
    description:
      "Before buying a new router, benchmark your current setup. Run a wired speed test directly from your modem to establish your ISP baseline, then run the same test over WiFi on both 2.4 GHz and 5 GHz. Compare packet loss and latency during idle and loaded conditions. If your WiFi speeds are within 80% of your wired baseline, the problem may not be the router at all — it might be ISP congestion, modem issues, or device drivers.",
    tip: "Run an online bufferbloat test at full load. If your router grades a C or lower, a new router with OFDMA and SQM support will have a dramatically measurable impact on responsiveness.",
  },
  {
    title: "Match WiFi Standard to Your Device Ecosystem",
    description:
      "Audit which WiFi standards your devices support before investing in WiFi 7. Most smartphones and laptops sold before 2023 support only WiFi 6 (802.11ax) at best. Purchasing a WiFi 7 router for a WiFi 5 device ecosystem provides zero wireless benefit — the router will negotiate down to the lowest common standard. However, buying WiFi 7 now future-proofs you for the next 5-7 years as WiFi 7 devices become mainstream.",
    tip: "Check your phone's WiFi specification under Settings > About. Intel AX211 and AX411 laptop chips support WiFi 6E. The Qualcomm FastConnect 7800 chip found in 2024+ premium Android phones supports WiFi 7.",
  },
  {
    title: "Determine Your Coverage Architecture",
    description:
      "For homes under 2,000 sq ft with open floor plans, a single tri-band router is almost always sufficient. For homes between 2,000-4,000 sq ft with mixed construction, a two-node mesh system is ideal. For large homes over 4,000 sq ft, multi-story properties, or homes with thick masonry walls, deploy a three-node or four-node WiFi 6E or WiFi 7 mesh system with wired backhaul (Ethernet between nodes) for zero-latency roaming.",
    tip: "Wired backhaul between mesh nodes eliminates the 40-50% throughput penalty of wireless backhaul. Even running a single CAT-6 cable between nodes transforms a mediocre mesh into a performance powerhouse.",
  },
  {
    title: "Verify Port Counts and Multi-Gig Capability",
    description:
      "Map every wired device in your home: desktops, NAS servers, smart TVs, game consoles, and any managed switches. Count the minimum LAN ports required, then add two for expansion. If you have a multi-gigabit internet plan (2 Gbps+), your router must have a 2.5G or 10G WAN port — otherwise your router becomes the bottleneck, not your ISP. Modern routers like the ASUS RT-BE96U include a 10G WAN, a 10G LAN, and multiple 2.5G ports.",
    tip: "If your internet plan is 1 Gbps or less, standard Gigabit WAN is fine. But a 2.5G LAN port between your router and a gaming PC or NAS is still valuable for local file transfers.",
  },
  {
    title: "Validate Security, Firmware Cadence, and Warranty",
    description:
      "A router is a network security device that sits at the boundary between your home and the internet. Verify the manufacturer's CVE response history: search for '[brand] router CVE' and check how quickly patches were issued. ASUS and TP-Link typically patch within 30-60 days. Confirm the unit comes with at least a 2-year hardware warranty. For maximum security, choose a router with Automatic Security Updates enabled by default, such as Eero's rolling firmware model.",
    tip: "Enable automatic firmware updates on day one. The most common router exploits target known vulnerabilities that have already been patched in firmware — users who disable auto-updates are the primary attack vector.",
  },
];

// =============================================================
// FAQ Data (10 Questions)
// =============================================================

const faqs = [
  {
    question: "Is WiFi 7 worth it in 2026?",
    answer:
      "Yes, WiFi 7 is worth buying in 2026 if you are purchasing a router that will last 5+ years. WiFi 7 (802.11be) introduces Multi-Link Operation (MLO), which allows compatible devices to simultaneously transmit across 5 GHz and 6 GHz bands — dramatically reducing wireless latency and eliminating interference-related drops. Even if your current devices do not support WiFi 7, the router's improved processor, port lineup, and security features alone justify the upgrade over a WiFi 5 unit.",
  },
  {
    question: "What is the difference between WiFi 6 and WiFi 6E?",
    answer:
      "WiFi 6 (802.11ax) operates on 2.4 GHz and 5 GHz bands and introduced OFDMA and Target Wake Time (TWT). WiFi 6E extends the same 802.11ax standard to add a third band: the 6 GHz spectrum. The 6 GHz band is interference-free (no legacy devices, no microwaves, no Bluetooth overlap) and supports 160 MHz channels in a clean environment, making it ideal for low-latency applications. WiFi 6E was the bridge technology before WiFi 7 arrived.",
  },
  {
    question: "How many devices can a WiFi 6 router handle?",
    answer:
      "A properly configured WiFi 6 router with 4x4 MU-MIMO and OFDMA can comfortably serve 50-80 simultaneously active devices. However, 'connected' and 'simultaneously transmitting' are different things. Most IoT devices (light bulbs, sensors) connect but rarely transmit. A 4-stream (4x4) WiFi 6 router handles real-world household loads of 20-30 active devices without congestion, making it suitable for most homes.",
  },
  {
    question: "Should I buy a mesh system or a single router?",
    answer:
      "Buy a mesh system if your home is larger than 2,000 sq ft, has multiple floors, or features thick concrete, brick, or masonry walls that absorb radio signals. Buy a single high-performance router if your home is compact and open-plan. The advantage of mesh is seamless roaming — your phone or laptop transitions between nodes without a dropped connection. The disadvantage is cost and, for wireless backhaul setups, a 40-50% throughput reduction on the backhaul band.",
  },
  {
    question: "Do I need a router with a 10G port?",
    answer:
      "You need a 10G WAN port only if your internet plan exceeds 1 Gbps — multi-gig fiber plans (2.5 Gbps, 5 Gbps, 10 Gbps) are becoming available in major metro areas. You might want a 10G LAN port if you run a local NAS with 10GbE connectivity or stream large uncompressed media files between machines on your LAN. For the vast majority of home users on 500 Mbps to 1 Gbps plans, Gigabit ports are sufficient.",
  },
  {
    question: "What is OFDMA and why does it matter?",
    answer:
      "OFDMA (Orthogonal Frequency Division Multiple Access) is a channel scheduling technology introduced in WiFi 6. It divides each radio channel into small sub-carriers called Resource Units (RUs), allowing the router to serve multiple devices simultaneously within the same transmission cycle — instead of serving them one at a time. This dramatically reduces the airtime latency experienced by small-packet devices like game consoles and IoT sensors. Think of it as upgrading from a single checkout lane to parallel self-checkout kiosks.",
  },
  {
    question: "What router specs should I look for under $150?",
    answer:
      "Under $150, target a router with at minimum: WiFi 6 (802.11ax) standard, a dual-core ARM processor at 1.5 GHz or higher, 256 MB RAM (512 MB preferred), OFDMA support on 5 GHz, WPA3 support, and at least 4 Gigabit LAN ports. The TP-Link Archer AX55 (AX3000) hits all these marks at around $80 and includes an active firmware update pipeline. Avoid WiFi 6 routers from unknown brands that hide single-core MIPS processors and only 128 MB of RAM.",
  },
  {
    question: "Is WPA3 mandatory in 2026?",
    answer:
      "WPA3 is strongly recommended but not yet strictly mandatory for home users. WPA2-AES remains reasonably secure against casual attackers when combined with a strong password. However, WPA3's Simultaneous Authentication of Equals (SAE) protocol is immune to the PMKID offline dictionary attacks that can crack WPA2 passphrases captured passively from the handshake. As router prices have normalized, there is no reason to accept WPA2-only hardware in 2026.",
  },
  {
    question: "Does router antenna count matter?",
    answer:
      "Antenna count matters primarily as an indicator of MIMO stream count, not raw signal power. A 4-antenna router transmitting 4 spatial streams (4x4 MIMO) delivers significantly better coverage and throughput than a 2-antenna 2x2 router. However, more than 8 antennas provides diminishing returns — most consumer devices (phones, laptops) can only receive 2 or 4 spatial streams. High-gain antennas (3-5 dBi) matter more for range extension than quantity.",
  },
  {
    question: "What is beamforming and does it help?",
    answer:
      "Beamforming is a radio technique where the router uses phase shifts across multiple antennas to direct radio energy toward specific client devices rather than broadcasting in all directions uniformly. Explicit beamforming (802.11ac and newer) requires the client device to report its location using channel sounding. This can improve signal strength by 3-6 dB at medium distances, effectively extending usable range by 20-30%. It is particularly beneficial in directional deployments where the router is mounted on a wall and clients are in a focused zone.",
  },
];

// =============================================================
// Page Component
// =============================================================

export default function BestWifiRoutersPage() {
  return (
    <TroubleshootingArticleShell
      h1="Best WiFi Routers 2026: The Definitive Buying Guide"
      intro="Shopping for a new router is overwhelming. The market is flooded with spec numbers, marketing jargon, and vague claims. This guide cuts through the noise with rigorous technical analysis, real-world performance context, and clear category winners across every budget and use case — from budget apartments to large smart homes with 100+ connected devices."
      category="wifi"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      severityLevel="low"
      commonCauses={commonCauses}
      quickFixChecklist={quickFixChecklist}
      troubleshootingSteps={troubleshootingSteps}
      whenToContactISP="Contact your ISP if you experience packet loss or high latency even with a brand-new router, as the issue may lie upstream with your ISP's equipment or routing infrastructure. Use a wired connection directly from the modem to run a packet loss test — if loss persists at the first hop, it is an ISP-side issue and no router upgrade will resolve it."
    >
      <div className="space-y-14">

        {/* ── SECTION 1: What Makes a Great WiFi Router ─────────────────── */}
        <section className="space-y-5" aria-labelledby="criteria-heading">
          <h2
            id="criteria-heading"
            className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2"
          >
            <Router size={18} className="text-orange-400" />
            1. What Makes a Great WiFi Router?
          </h2>

          <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-4">
            <p>
              The router market is littered with products making identical-sounding claims — &quot;ultra-fast,&quot; &quot;whole-home coverage,&quot; &quot;gaming-grade.&quot; Cutting through that noise requires understanding the specific hardware and protocol characteristics that translate into real-world performance. Here is the engineering checklist that separates a genuinely capable home router from an overpriced ISP gateway replacement.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 glass-card border border-[var(--border-subtle)] rounded-xl space-y-1.5">
                <h3 className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                  <Zap size={13} className="text-orange-400" />
                  CPU: Quad-Core ARM 1.8 GHz+
                </h3>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                  The router&apos;s central processor handles NAT translation, packet inspection, firewall rule evaluation, and traffic shaping simultaneously. Single-core MIPS processors (common in sub-$50 routers) bottleneck at ~100 Mbps when running advanced QoS. Look for quad-core ARM Cortex-A53 or A55 processors clocked at 1.8 GHz or higher — these handle gigabit shaping without dropping packets. Top-tier models use A73 or A78 cores at 2.0–2.6 GHz with dedicated NPU (Network Processing Unit) co-processors for hardware-accelerated NAT.
                </p>
              </div>

              <div className="p-4 glass-card border border-[var(--border-subtle)] rounded-xl space-y-1.5">
                <h3 className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                  <Activity size={13} className="text-orange-400" />
                  RAM: 512 MB DDR4 Minimum
                </h3>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                  RAM stores the routing table, ARP cache, active firewall states, DHCP lease table, and packet queues. A home network with 50 devices and active SQM (Smart Queue Management) can consume 180–220 MB of RAM. 256 MB is sufficient for basic routing; 512 MB allows CAKE or FQ-CoDel queue disciplines to run without memory pressure; 1 GB+ is ideal for homes with 80+ devices, multiple VLANs, or VPN server functionality.
                </p>
              </div>

              <div className="p-4 glass-card border border-[var(--border-subtle)] rounded-xl space-y-1.5">
                <h3 className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                  <Wifi size={13} className="text-orange-400" />
                  Tri-Band vs. Dual-Band
                </h3>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                  Dual-band routers broadcast on 2.4 GHz and 5 GHz. Tri-band adds a second 5 GHz or a 6 GHz radio. The additional radio allows the router to dedicate one band exclusively to backhaul (in mesh systems) while the other two serve client devices. In non-mesh single-router setups, the extra band provides capacity headroom for congested environments with many simultaneously active devices.
                </p>
              </div>

              <div className="p-4 glass-card border border-[var(--border-subtle)] rounded-xl space-y-1.5">
                <h3 className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                  <Shield size={13} className="text-orange-400" />
                  MU-MIMO, OFDMA &amp; Beamforming
                </h3>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                  MU-MIMO (Multi-User, Multiple Input, Multiple Output) lets the router transmit to multiple clients simultaneously using spatial multiplexing. OFDMA subdivides each channel into Resource Units, serving many clients in a single transmission window. Beamforming steers radio energy directionally toward each client, improving SNR at range. All three technologies working together reduce per-device airtime latency and increase aggregate throughput under real-world multi-device load.
                </p>
              </div>

              <div className="p-4 glass-card border border-[var(--border-subtle)] rounded-xl space-y-1.5">
                <h3 className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                  <Shield size={13} className="text-cyan-400" />
                  WPA3 Personal / Enterprise
                </h3>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                  WPA3 replaces WPA2&apos;s PSK (Pre-Shared Key) exchange with SAE (Simultaneous Authentication of Equals), eliminating offline dictionary attacks against captured handshakes. WPA3 also mandates PMF (Protected Management Frames), preventing deauthentication attacks. In 2026, any router without WPA3 support is a security liability for networks containing smart home devices, cameras, and banking sessions.
                </p>
              </div>

              <div className="p-4 glass-card border border-[var(--border-subtle)] rounded-xl space-y-1.5">
                <h3 className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                  <Settings size={13} className="text-cyan-400" />
                  Port Count &amp; Multi-Gig
                </h3>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                  Most routers ship with 4x Gigabit LAN ports and 1x Gigabit WAN. Premium routers add 2.5 GbE or 10 GbE ports for NAS, gaming PCs, and multi-gig ISP connections. Count your wired devices: desktop PCs, game consoles (PS5/Xbox support Gigabit Ethernet), NAS, smart TVs, and any managed switches. The ideal router provides at least one 2.5G multi-gig port in 2026, as next-generation ISP plans increasingly exceed 1 Gbps.
                </p>
              </div>
            </div>

            {/* Info box */}
            <div className="flex gap-3 p-4 rounded-xl border border-orange-800/40 bg-orange-950/10 mt-2">
              <Info size={16} className="text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-orange-400 mb-1">Expert Insight: The CPU is the True Bottleneck</h4>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                  The WiFi standard printed on the box (AX3000, AX6000, BE19000) is the theoretical maximum radio throughput — not routing throughput. A WiFi 7 router with a weak dual-core CPU will still bottleneck at 400–600 Mbps under real-world multi-device load. Always verify the CPU model and core count in third-party teardowns (SmallNetBuilder, ServeTheHome) before purchasing. The router&apos;s CPU determines what you actually experience daily; the WiFi generation determines what is achievable in a decade.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: WiFi Standards Comparison Table ────────────────── */}
        <section className="space-y-5" aria-labelledby="standards-heading">
          <h2
            id="standards-heading"
            className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2"
          >
            <Wifi size={18} className="text-cyan-400" />
            2. WiFi Standards Explained: WiFi 5 vs WiFi 6 vs WiFi 6E vs WiFi 7
          </h2>

          <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed space-y-4">
            <p>
              The WiFi Alliance has released four major generations since 2013. Each generation introduced new encoding schemes, frequency band access, and MAC-layer scheduling improvements. Understanding what each standard delivers — and which use cases each is optimized for — is the foundation of a smart router purchase decision.
            </p>

            <p>
              The following table documents the technical characteristics of each standard. Note that &quot;Max Speed&quot; values are theoretical peak speeds under ideal, single-client, zero-interference conditions. Real-world aggregate throughput across all connected clients is typically 40–60% of the advertised figure.
            </p>

            <div className="overflow-x-auto border border-[var(--border-subtle)] rounded-xl">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold text-xs">
                    <th className="px-4 py-3 text-left border-b border-[var(--border-subtle)]">Standard</th>
                    <th className="px-4 py-3 text-left border-b border-[var(--border-subtle)]">Max Speed</th>
                    <th className="px-4 py-3 text-left border-b border-[var(--border-subtle)]">Frequency Bands</th>
                    <th className="px-4 py-3 text-left border-b border-[var(--border-subtle)]">OFDMA</th>
                    <th className="px-4 py-3 text-left border-b border-[var(--border-subtle)]">MU-MIMO</th>
                    <th className="px-4 py-3 text-left border-b border-[var(--border-subtle)]">Typical Latency</th>
                    <th className="px-4 py-3 text-left border-b border-[var(--border-subtle)]">Best For</th>
                  </tr>
                </thead>
                <tbody className="text-[11px] text-[var(--text-secondary)] divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--text-primary)] whitespace-nowrap">
                      WiFi 5<br />
                      <span className="font-normal text-[10px] text-[var(--text-muted)]">802.11ac</span>
                    </td>
                    <td className="px-4 py-3">3.5 Gbps</td>
                    <td className="px-4 py-3">2.4 GHz, 5 GHz</td>
                    <td className="px-4 py-3 text-red-400">No</td>
                    <td className="px-4 py-3 text-amber-400">DL only (4x4)</td>
                    <td className="px-4 py-3 text-red-400">8–30 ms</td>
                    <td className="px-4 py-3">Legacy devices, low-density small homes</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--text-primary)] whitespace-nowrap">
                      WiFi 6<br />
                      <span className="font-normal text-[10px] text-[var(--text-muted)]">802.11ax</span>
                    </td>
                    <td className="px-4 py-3">9.6 Gbps</td>
                    <td className="px-4 py-3">2.4 GHz, 5 GHz</td>
                    <td className="px-4 py-3 text-emerald-400">Yes (UL + DL)</td>
                    <td className="px-4 py-3 text-emerald-400">UL + DL (8x8)</td>
                    <td className="px-4 py-3 text-amber-400">3–10 ms</td>
                    <td className="px-4 py-3">Dense households, 20–50 devices, streaming + gaming</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--text-primary)] whitespace-nowrap">
                      WiFi 6E<br />
                      <span className="font-normal text-[10px] text-[var(--text-muted)]">802.11ax (6 GHz)</span>
                    </td>
                    <td className="px-4 py-3">9.6 Gbps</td>
                    <td className="px-4 py-3">2.4, 5, 6 GHz</td>
                    <td className="px-4 py-3 text-emerald-400">Yes (UL + DL)</td>
                    <td className="px-4 py-3 text-emerald-400">UL + DL (8x8)</td>
                    <td className="px-4 py-3 text-emerald-400">2–6 ms</td>
                    <td className="px-4 py-3">Low-latency wireless, interference-free 6 GHz band</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--text-primary)] whitespace-nowrap">
                      WiFi 7<br />
                      <span className="font-normal text-[10px] text-[var(--text-muted)]">802.11be</span>
                    </td>
                    <td className="px-4 py-3 font-bold text-emerald-400">46 Gbps</td>
                    <td className="px-4 py-3">2.4, 5, 6 GHz</td>
                    <td className="px-4 py-3 text-emerald-400">Yes + Multi-RU</td>
                    <td className="px-4 py-3 text-emerald-400">UL + DL (16x16)</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">&lt;1 ms (MLO)</td>
                    <td className="px-4 py-3">Future-proofing, 10 Gbps fiber, professional gaming, AR/VR</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex gap-3 p-4 rounded-xl border border-cyan-800/40 bg-cyan-950/10">
              <Info size={16} className="text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-cyan-400 mb-1">What is Multi-Link Operation (MLO)?</h4>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                  MLO is WiFi 7&apos;s flagship capability. It allows a WiFi 7 client device to maintain simultaneous, active connections to a WiFi 7 router across two or three bands at once (e.g., 5 GHz + 6 GHz). Packets are load-balanced or transmitted redundantly across both links. If a 5 GHz channel temporarily suffers interference from a microwave, the 6 GHz link instantly absorbs the traffic with zero packet loss. This delivers effective wireless latency under 1 ms — closer to wired Ethernet than any previous WiFi generation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: Top Router Picks by Category ───────────────────── */}
        <section className="space-y-5" aria-labelledby="picks-heading">
          <h2
            id="picks-heading"
            className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2"
          >
            <Star size={18} className="text-yellow-400" />
            3. Top Router Picks by Category (2026)
          </h2>

          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Every router below was selected based on verified hardware specifications, third-party independent testing data from SmallNetBuilder and ServeTheHome, real-world firmware stability history, and value-for-performance at the time of publication. Prices reflect typical retail; check current listings for fluctuations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Card 1 – Best Overall */}
            <div className="glass-card border border-[var(--border-subtle)] rounded-2xl p-5 space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-yellow-500/15 text-yellow-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-xl">
                Best Overall
              </div>
              <div>
                <h3 className="text-sm font-bold text-[var(--text-primary)] leading-tight">ASUS RT-BE96U</h3>
                <p className="text-[10px] text-[var(--text-muted)] font-mono mt-0.5">WiFi 7 · BE19000 · $399–$449</p>
              </div>
              <ul className="space-y-1.5">
                <li className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)]">
                  <CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" />
                  Tri-band WiFi 7 — 2.4G (688 Mbps) + 5G (5764 Mbps) + 6G (11530 Mbps)
                </li>
                <li className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)]">
                  <CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" />
                  Dual 10G ports (1x WAN, 1x LAN) + 4x 2.5G LAN ports
                </li>
                <li className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)]">
                  <CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" />
                  Broadcom quad-core 2.6 GHz CPU · 2 GB RAM · WPA3 + AiProtection Pro
                </li>
              </ul>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                The RT-BE96U is the definitive all-rounder for 2026. Its dual 10G ports are unmatched at its price tier, and ASUS&apos;s Merlin-compatible firmware means you can install CAKE SQM, custom VPN profiles, and advanced monitoring scripts. Exceptional for homes upgrading to multi-gig fiber who want a router that will not need replacing for 6–8 years.
              </p>
            </div>

            {/* Card 2 – Best Budget */}
            <div className="glass-card border border-[var(--border-subtle)] rounded-2xl p-5 space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-500/15 text-emerald-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-xl">
                Best Budget
              </div>
              <div>
                <h3 className="text-sm font-bold text-[var(--text-primary)] leading-tight">TP-Link Archer AX55</h3>
                <p className="text-[10px] text-[var(--text-muted)] font-mono mt-0.5">WiFi 6 · AX3000 · $75–$90</p>
              </div>
              <ul className="space-y-1.5">
                <li className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)]">
                  <CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" />
                  Dual-band WiFi 6 — 2.4G (574 Mbps) + 5G (2402 Mbps)
                </li>
                <li className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)]">
                  <CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" />
                  4x Gigabit LAN + 1x Gigabit WAN · 512 MB RAM · USB 3.0
                </li>
                <li className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)]">
                  <CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" />
                  OFDMA + MU-MIMO + WPA3 + HomeCare antivirus (first year free)
                </li>
              </ul>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                The Archer AX55 is the most capable sub-$100 WiFi 6 router available. TP-Link&apos;s firmware releases are consistent, and the 512 MB RAM headroom means it handles 40-device households without memory pressure. Perfect for apartments, starter homes, or anyone on ISP plans up to 500 Mbps who does not need multi-gig ports.
              </p>
            </div>

            {/* Card 3 – Best for Large Homes */}
            <div className="glass-card border border-[var(--border-subtle)] rounded-2xl p-5 space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-500/15 text-blue-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-xl">
                Large Homes
              </div>
              <div>
                <h3 className="text-sm font-bold text-[var(--text-primary)] leading-tight">ASUS ZenWiFi Pro ET12</h3>
                <p className="text-[10px] text-[var(--text-muted)] font-mono mt-0.5">WiFi 6E Mesh · AXE11000 · $449–$499 (2-pack)</p>
              </div>
              <ul className="space-y-1.5">
                <li className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)]">
                  <CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" />
                  Tri-band WiFi 6E — dedicated 6 GHz backhaul band up to 4804 Mbps
                </li>
                <li className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)]">
                  <CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" />
                  Covers 6,000+ sq ft (2-node) · wired or wireless backhaul supported
                </li>
                <li className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)]">
                  <CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" />
                  2.5G WAN/LAN ports per node · 256-QAM on 6 GHz · WPA3 mesh encryption
                </li>
              </ul>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                The ZenWiFi Pro ET12 is purpose-built for large homes where a single router cannot overcome building materials. The dedicated 6 GHz backhaul ensures client throughput does not degrade as you roam between nodes. Pair with wired backhaul via Cat-6 between nodes and coverage becomes enterprise-grade across 6,000+ sq ft.
              </p>
            </div>

            {/* Card 4 – Best for Gaming */}
            <div className="glass-card border border-[var(--border-subtle)] rounded-2xl p-5 space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-red-500/15 text-red-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-xl">
                Best Gaming
              </div>
              <div>
                <h3 className="text-sm font-bold text-[var(--text-primary)] leading-tight">ASUS ROG Rapture GT-BE98</h3>
                <p className="text-[10px] text-[var(--text-muted)] font-mono mt-0.5">WiFi 7 · BE98000 · $499–$599</p>
              </div>
              <ul className="space-y-1.5">
                <li className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)]">
                  <CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" />
                  Quad-band WiFi 7 — dual 6 GHz radios + 5 GHz + 2.4 GHz, MLO capable
                </li>
                <li className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)]">
                  <CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" />
                  Dual 10G ports + 4x 2.5G ports · ASUS GameFirst VI traffic prioritization
                </li>
                <li className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)]">
                  <CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" />
                  2.6 GHz quad-core ARM + dedicated NPU · 2 GB RAM · VPN Fusion support
                </li>
              </ul>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                The GT-BE98 is the pinnacle of consumer gaming routers in 2026. GameFirst VI automatically detects gaming traffic and places it in a strict-priority hardware queue, preventing any household activity — 4K streaming, file downloads, video calls — from increasing game ping. The dual 6 GHz radios provide truly unprecedented wireless throughput capacity.
              </p>
            </div>

            {/* Card 5 – Best for Fiber 10Gbps */}
            <div className="glass-card border border-[var(--border-subtle)] rounded-2xl p-5 space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-purple-500/15 text-purple-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-xl">
                Best Fiber
              </div>
              <div>
                <h3 className="text-sm font-bold text-[var(--text-primary)] leading-tight">Netgear Nighthawk RS700S</h3>
                <p className="text-[10px] text-[var(--text-muted)] font-mono mt-0.5">WiFi 7 · BE19000 · $499–$549</p>
              </div>
              <ul className="space-y-1.5">
                <li className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)]">
                  <CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" />
                  10G SFP+ WAN port — designed specifically for multi-gig fiber ONT connections
                </li>
                <li className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)]">
                  <CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" />
                  WiFi 7 tri-band — 19 Gbps aggregate theoretical throughput
                </li>
                <li className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)]">
                  <CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" />
                  2.6 GHz quad-core CPU · 1 GB RAM · Netgear Armor (Bitdefender) security
                </li>
              </ul>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                The RS700S is the router you buy when your ISP delivers 2.5 Gbps, 5 Gbps, or 10 Gbps fiber. The 10G SFP+ WAN port accepts both direct fiber SFP modules and RJ45 copper adapters, making it compatible with virtually every ONT on the market. Netgear Armor provides always-on threat intelligence powered by Bitdefender — critical for high-value smart home networks.
              </p>
            </div>

            {/* Card 6 – Best Mesh System */}
            <div className="glass-card border border-[var(--border-subtle)] rounded-2xl p-5 space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-teal-500/15 text-teal-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-xl">
                Best Mesh
              </div>
              <div>
                <h3 className="text-sm font-bold text-[var(--text-primary)] leading-tight">Amazon Eero Max 7</h3>
                <p className="text-[10px] text-[var(--text-muted)] font-mono mt-0.5">WiFi 7 Mesh · 9.4 Gbps · $599 (2-pack)</p>
              </div>
              <ul className="space-y-1.5">
                <li className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)]">
                  <CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" />
                  WiFi 7 tri-band with 10G wired + wireless backhaul per node
                </li>
                <li className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)]">
                  <CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" />
                  Thread border router built in — native Matter + Thread smart home hub
                </li>
                <li className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)]">
                  <CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" />
                  Automatic rolling firmware updates · 2x 10G ports per node · zero-config app
                </li>
              </ul>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                The Eero Max 7 is the easiest WiFi 7 mesh system to deploy and maintain. Its built-in Thread border router makes it the ideal hub for Matter-compatible smart home devices — every Eero node acts as a Thread router, extending the mesh not just for WiFi but also for the ultra-low-power Thread radio protocol used by smart sensors, locks, and lighting. The automatic update model means you never run vulnerable firmware.
              </p>
            </div>
          </div>
        </section>

        {/* ── SECTION 4: How to Choose by Home Size ─────────────────────── */}
        <section className="space-y-5" aria-labelledby="homesize-heading">
          <h2
            id="homesize-heading"
            className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2"
          >
            <Home size={18} className="text-orange-400" />
            4. How to Choose by Home Size
          </h2>

          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Coverage area is one of the most misunderstood router specifications. Marketing figures (e.g., &quot;covers 3,000 sq ft&quot;) are measured in open air with zero obstructions. Real homes have walls, floors, furniture, and appliances that absorb and reflect radio waves. Use these guidelines as your starting point and plan to verify with a WiFi analyzer app after installation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Apartments */}
            <div className="glass-card border border-orange-800/30 bg-orange-950/5 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-orange-500/15 flex items-center justify-center flex-shrink-0">
                  <Home size={15} className="text-orange-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">Apartments</h3>
                  <p className="text-[10px] text-[var(--text-muted)]">Under 1,000 sq ft</p>
                </div>
              </div>
              <div className="space-y-2 text-[11px] text-[var(--text-secondary)]">
                <p><strong className="text-[var(--text-primary)]">Router Class:</strong> Single dual-band or tri-band WiFi 6 router. No mesh system required.</p>
                <p><strong className="text-[var(--text-primary)]">Coverage Tip:</strong> Center the router in the apartment — ideally mounted on a wall at chest height or placed on a bookshelf rather than on the floor. This single placement adjustment can double effective coverage.</p>
                <p><strong className="text-[var(--text-primary)]">Spec Minimums:</strong> WiFi 6 (802.11ax), dual-core ARM 1.5 GHz+, 256 MB RAM, 4x Gigabit LAN, WPA3.</p>
                <p><strong className="text-[var(--text-primary)]">Recommended:</strong> TP-Link Archer AX55, ASUS RT-AX58U, TP-Link Deco XE75 (single node).</p>
              </div>
            </div>

            {/* Medium Homes */}
            <div className="glass-card border border-cyan-800/30 bg-cyan-950/5 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-cyan-500/15 flex items-center justify-center flex-shrink-0">
                  <Home size={15} className="text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">Medium Homes</h3>
                  <p className="text-[10px] text-[var(--text-muted)]">1,000–2,500 sq ft</p>
                </div>
              </div>
              <div className="space-y-2 text-[11px] text-[var(--text-secondary)]">
                <p><strong className="text-[var(--text-primary)]">Router Class:</strong> High-performance single tri-band WiFi 6E or WiFi 7 router, or a 2-node mesh system for multi-story properties.</p>
                <p><strong className="text-[var(--text-primary)]">Coverage Tip:</strong> On two-story homes, place the router on the upper floor. Radio waves travel more readily downward through floors than upward. If installing a 2-node mesh, use a wired Ethernet backhaul between nodes for maximum throughput.</p>
                <p><strong className="text-[var(--text-primary)]">Spec Minimums:</strong> WiFi 6E or WiFi 7, quad-core ARM 1.8 GHz+, 512 MB RAM, at least one 2.5G port, WPA3.</p>
                <p><strong className="text-[var(--text-primary)]">Recommended:</strong> ASUS RT-BE96U, TP-Link Deco BE85 (2-node), Eero Pro 6E (2-node).</p>
              </div>
            </div>

            {/* Large Homes */}
            <div className="glass-card border border-purple-800/30 bg-purple-950/5 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-500/15 flex items-center justify-center flex-shrink-0">
                  <Home size={15} className="text-purple-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">Large Homes</h3>
                  <p className="text-[10px] text-[var(--text-muted)]">2,500+ sq ft</p>
                </div>
              </div>
              <div className="space-y-2 text-[11px] text-[var(--text-secondary)]">
                <p><strong className="text-[var(--text-primary)]">Router Class:</strong> 3–4 node WiFi 6E or WiFi 7 mesh system with wired backhaul. Single routers cannot reliably serve areas above 2,500 sq ft with consistent throughput in multi-wall environments.</p>
                <p><strong className="text-[var(--text-primary)]">Coverage Tip:</strong> Run a single CAT-6 cable from the main router node to each satellite node. Even in homes where drilling is difficult, MoCA 2.5 adapters can convert existing coaxial TV wiring into a 2.5 Gbps backhaul link — no new cable required.</p>
                <p><strong className="text-[var(--text-primary)]">Spec Minimums:</strong> WiFi 6E or WiFi 7 tri-band, dedicated 6 GHz backhaul radio, quad-core CPU, 1 GB RAM per node, 2.5G ports per node.</p>
                <p><strong className="text-[var(--text-primary)]">Recommended:</strong> ASUS ZenWiFi Pro ET12, Eero Max 7, TP-Link Deco BE85 (3-node), Netgear Orbi 960.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 5: Router Buying Checklist ────────────────────────── */}
        <section className="space-y-5" aria-labelledby="checklist-ext-heading">
          <h2
            id="checklist-ext-heading"
            className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2"
          >
            <CheckCircle2 size={18} className="text-emerald-400" />
            5. Router Buying Checklist: 8 Things to Verify Before You Buy
          </h2>

          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Use this checklist during your purchase research. Print it out or open it alongside product listings. Each item represents a genuine differentiator between routers that perform and routers that disappoint within six months of purchase.
          </p>

          <div className="space-y-3">
            {[
              {
                n: "01",
                title: "ISP Speed Tier",
                detail:
                  "If your internet plan is 1 Gbps or less, standard Gigabit WAN is sufficient. If you are on 2 Gbps, 5 Gbps, or 10 Gbps fiber, verify the router has a 2.5G, 5G, or 10G WAN port. A Gigabit WAN on a 2.5 Gbps plan caps your speed at 940 Mbps permanently — no firmware update can fix a hardware port limitation.",
              },
              {
                n: "02",
                title: "LAN Port Count and Speed",
                detail:
                  "Count every device you plan to wire: gaming PC (benefits from 2.5G), NAS server (benefits from 2.5G or 10G), smart TV, console, and any network switches. Ensure the router provides enough wired ports. If you need more than 4 LAN ports, plan for a downstream unmanaged switch — this does not reduce performance.",
              },
              {
                n: "03",
                title: "Connected Device Count",
                detail:
                  "Count every WiFi device: phones, tablets, laptops, smart TVs, streaming sticks, smart speakers, smart plugs, thermostats, doorbells, cameras, and wearables. If the count exceeds 30, verify the router supports 4x4 MU-MIMO on 5 GHz and OFDMA on both 5 GHz and 6 GHz. WiFi 5 routers without OFDMA will struggle visibly above 20 simultaneously active clients.",
              },
              {
                n: "04",
                title: "Band Requirements and 6 GHz Availability",
                detail:
                  "If you plan to use the 6 GHz band for gaming or high-throughput wireless work, confirm your country's regulatory body (FCC in the US, Ofcom in the UK, ETSI in the EU) has approved 6 GHz operation for indoor low-power use in your region. All three have done so as of 2024, but travel routers intended for international use may not support 6 GHz globally.",
              },
              {
                n: "05",
                title: "Firmware Update Track Record",
                detail:
                  "Research how frequently the manufacturer issues firmware updates and whether they address CVEs promptly. Search '[router brand] CVE 2024' and '[router brand] firmware changelog.' ASUS (ASUSWRT), TP-Link (Tether), and Amazon (Eero) all have reliable, frequent patch cycles. Avoid brands that ship one firmware at launch and abandon the product within a year — this is a common pattern with budget-tier brands from marketplace sellers.",
              },
              {
                n: "06",
                title: "Warranty and Return Policy",
                detail:
                  "Verify the hardware warranty period: ASUS provides 2 years, TP-Link provides 2 years, Netgear provides 1–2 years depending on the product line, and Eero provides 1 year (extendable with Eero Plus). Network hardware can develop intermittent hardware faults (dying capacitors, antenna driver issues) after 12–18 months. A 2-year warranty covers the most likely early-failure window.",
              },
              {
                n: "07",
                title: "MU-MIMO Stream Count",
                detail:
                  "Confirm the spatial stream count: 2x2 (2 streams), 4x4 (4 streams), or 8x8 (8 streams). For a home with over 30 devices, 4x4 MU-MIMO on 5 GHz is the minimum recommended configuration. 8x8 offers marginal real-world benefit for most homes — most client devices (phones, laptops) only support 2x2 MIMO, meaning the router can serve 4 simultaneous 2x2 clients in a single transmission frame with a 4x4 radio.",
              },
              {
                n: "08",
                title: "WPA3 Personal Support",
                detail:
                  "Filter your shortlist to WPA3-capable routers only. Verify that WPA3 Personal (also called WPA3-SAE) is enabled in the default out-of-box configuration, or can be enabled in the security settings. Some budget routers list WPA3 on the box but implement it only in compatibility mode (WPA2/WPA3 transition mode), which reduces protection against dictionary attacks. True WPA3-only mode is the gold standard.",
              },
            ].map((item) => (
              <div
                key={item.n}
                className="flex gap-4 p-4 glass-card border border-[var(--border-subtle)] rounded-xl"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full border border-emerald-800/40 bg-emerald-950/20 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-emerald-400 font-mono">{item.n}</span>
                </div>
                <div className="space-y-1 min-w-0">
                  <h3 className="text-xs font-bold text-[var(--text-primary)]">{item.title}</h3>
                  <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 6: Internal Links ──────────────────────────────────── */}
        <section className="space-y-5" aria-labelledby="related-heading">
          <h2
            id="related-heading"
            className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2"
          >
            <TrendingUp size={18} className="text-orange-400" />
            6. Related Guides &amp; Deep Dives
          </h2>

          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Choosing the right router is just the beginning. These guides cover the specific use cases, configuration steps, and optimization techniques that turn a good hardware investment into a genuinely high-performance home network.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                href: "/best-router-for-gaming",
                icon: Activity,
                iconColor: "text-red-400",
                bgColor: "bg-red-950/10 border-red-800/30",
                title: "Best Router for Gaming",
                desc: "Deep-dive CPU benchmarks, SQM configuration, QoS settings, and router picks optimized for minimal ping and zero jitter in competitive multiplayer.",
              },
              {
                href: "/best-mesh-wifi",
                icon: Wifi,
                iconColor: "text-cyan-400",
                bgColor: "bg-cyan-950/10 border-cyan-800/30",
                title: "Best Mesh WiFi Systems",
                desc: "Wired vs. wireless backhaul, node placement strategies, and head-to-head comparisons of Eero, Netgear Orbi, ASUS ZenWiFi, and TP-Link Deco.",
              },
              {
                href: "/wifi-6-for-gaming",
                icon: Zap,
                iconColor: "text-yellow-400",
                bgColor: "bg-yellow-950/10 border-yellow-800/30",
                title: "WiFi 6 for Gaming",
                desc: "Is WiFi 6 fast enough for competitive gaming? An analysis of OFDMA, BSS Coloring, and TWT and their real impact on gaming latency versus WiFi 5.",
              },
              {
                href: "/wifi-7-for-gaming",
                icon: Star,
                iconColor: "text-purple-400",
                bgColor: "bg-purple-950/10 border-purple-800/30",
                title: "WiFi 7 for Gaming",
                desc: "Multi-Link Operation explained, MLO latency measurements, and a buyer guide to the first wave of WiFi 7 gaming routers including GT-BE98 and RS700S.",
              },
              {
                href: "/how-to-improve-wifi-signal",
                icon: TrendingUp,
                iconColor: "text-emerald-400",
                bgColor: "bg-emerald-950/10 border-emerald-800/30",
                title: "How to Improve WiFi Signal",
                desc: "Practical steps to eliminate dead zones and improve signal strength without buying new hardware — router placement, channel selection, and band steering.",
              },
              {
                href: "/bufferbloat-fix",
                icon: Shield,
                iconColor: "text-orange-400",
                bgColor: "bg-orange-950/10 border-orange-800/30",
                title: "Bufferbloat Fix Guide",
                desc: "Step-by-step instructions for diagnosing bufferbloat, configuring CAKE and FQ-CoDel SQM on ASUS, TP-Link, and OpenWRT routers to eliminate ping spikes under load.",
              },
            ].map(({ href, icon: Icon, iconColor, bgColor, title, desc }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-start gap-3 p-4 rounded-xl border ${bgColor} hover:scale-[1.01] transition-transform duration-200 group`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  <Icon size={16} className={iconColor} />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-400)] transition-colors">
                      {title}
                    </h3>
                    <ArrowRight size={12} className="text-[var(--text-muted)] group-hover:text-[var(--brand-400)] flex-shrink-0 transition-colors" />
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">{desc}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-4 p-5 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1">Not Sure Which Router to Buy?</h3>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                Use our comparison tool to see side-by-side specs for any two routers, or read our comprehensive mesh WiFi guide if you are unsure whether you need a mesh system versus a single high-performance router.
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Link
                href="/compare"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--brand-500)] hover:bg-[var(--brand-600)] text-white text-xs font-semibold transition-colors"
              >
                Compare Routers <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </section>

      </div>
    </TroubleshootingArticleShell>
  );
}
