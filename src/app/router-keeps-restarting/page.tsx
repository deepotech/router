import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import ConnectionOptimizerClient from "@/components/tools/ConnectionOptimizerClient";

export const metadata: Metadata = buildMetadata({
  title: "Router Keeps Restarting? How to Fix Random Reboots (Updated 2026)",
  description:
    "Is your router randomly rebooting? Discover the root causes behind router power cycling—including thermal overheating, capacitor aging, failing power adapters, and firmware panic loops.",
  canonical: "/router-keeps-restarting",
  keywords: [
    "router keeps restarting",
    "router randomly rebooting",
    "modem keeps restarting",
    "router power cycling",
    "router thermal shutdown",
    "capacitor ripple voltage"
  ],
});

const breadcrumbs = [
  { name: "Router Problems", url: "/router-keeps-restarting" },
  { name: "Router Keeps Restarting", url: "/router-keeps-restarting" },
];

const troubleshootingSteps = [
  {
    title: "Inspect and Upgrade the DC Power Adapter",
    description: "Verify that the AC/DC power brick matches the exact voltage (typically 12V DC) and meets or exceeds the required current (typically 1.5A to 2.5A) required by your router. Degraded transformer coils fail under heavy packet parsing.",
    tip: "Using an under-powered adapter causes the voltage rail to drop below the threshold when the CPU spikes, triggering a brownout reset."
  },
  {
    title: "Relocate Router to Avoid Thermal Throttling",
    description: "Move the router out of enclosed spaces like TV cabinets or crowded shelves. Ensure there is at least 3 inches of clearance around all vents. Dust the chassis with compressed air to clear blockages.",
    tip: "Router SoCs throttle performance when junction temperatures exceed 85°C, eventually power cycling as a hardware safety trigger."
  },
  {
    title: "Flush NVRAM Partition via Hard Factory Reset",
    description: "Press and hold the physical reset button on the rear panel for 15 seconds while powered. This clears old NVRAM variables from previous firmware flashes that cause kernel crashes.",
  },
  {
    title: "Disable UPnP and Port Forwarding Overload",
    description: "Log into the admin panel, navigate to WAN settings, and disable UPnP. Stale NAT mapping allocations can overflow the router conntrack table, triggering kernel panics.",
    tip: "High-volume torrent or gaming traffic creates thousands of temporary NAT mappings that overwhelm legacy memory tables."
  }
];

const faqs = [
  {
    question: "Why does my router restart only under heavy download load?",
    answer: "When you download files or stream high-definition media, the router's CPU operates at peak utilization, which spikes both its temperature and the current drawn from the power supply. If the power adapter's capacitors are degraded or the SoC cooling is insufficient, the system brownouts or thermal shuts down."
  },
  {
    question: "Can a bad firmware update cause a router reboot loop?",
    answer: "Yes. If firmware variables are corrupt or incompatible with legacy NVRAM configurations, the operating system kernel will trigger a kernel panic. The hardware Watchdog Timer (WDT) monitors this freeze and cuts power to reboot the device."
  },
  {
    question: "How do I know if my modem is failing instead of the router?",
    answer: "Check the status LEDs on both devices. If the modem's link or online lights flash before a reset while the router's power light remains solid, the modem is dropping sync due to coaxial signal noise or GPON ONT authentication timeouts."
  }
];

const commonCauses = [
  {
    title: "Thermal SoC Shutdown",
    desc: "Obstructed air vents trigger emergency thermal protection routines on the dual-core processor, shutting down the board to prevent permanent silicon fusion."
  },
  {
    title: "Power Supply Sag (Brownout)",
    desc: "Degraded transformer brick capacitors fail to maintain steady DC output when the router's radio amplifiers pull peak current during heavy packet routing."
  },
  {
    title: "Conntrack Table Overflow",
    desc: "Thousands of concurrent NAT connections from active clients exhaust the router's RAM buffer, forcing kernel watchdog loops."
  },
  {
    title: "ISP Provisioning Loop",
    desc: "The upstream ONT or cable tap drops signal synchronization, triggering aggressive DHCP requests that crash unstable router WAN daemons."
  }
];

const quickFixChecklist = [
  "Connect the power brick directly to a wall outlet instead of overloaded extension strips.",
  "Elevate the router on a hard, flat surface to optimize cooling airflow.",
  "Check the power adapter label to verify it output matches the router's rated input.",
  "Perform a factory reset and reconfigure the WAN credentials manually.",
  "Update the firmware partition to the latest stable, non-beta release."
];

export default function RouterKeepsRestartingPage() {
  return (
    <TroubleshootingArticleShell
      h1="Router Keeps Restarting? How to Fix Random Reboots (Updated 2026)"
      intro="Are you experiencing sudden network dropouts and spontaneous router restarts? Learn how to identify and resolve thermal throttling, power adapter voltage sags, capacitor degradation, and firmware kernel panics."
      category="wifi"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "Warning: Advanced Reset Actions",
        text: "Performing a hard factory reset will erase all custom configurations, including custom Wi-Fi names, passwords, static IPs, and port forwards. Make sure you back up your current settings file before proceeding."
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="Contact your Internet Service Provider if the rebooting occurs synchronously with upstream coaxial signal line drops, visible as flashing 'Online' or 'Link' lights on your modem while the router is stable. Ask for an RF signal level audit or ONT telemetry check."
      severityLevel="high"
    >
      <div className="space-y-6">
        {/* Quick Answer Snippet for AI Search Engines */}
        <section className="glass-card p-5 border border-red-950/20 bg-red-950/5 rounded-2xl relative overflow-hidden" aria-label="Quick Answer Summary">
          <div className="absolute top-0 right-0 bg-red-500/10 text-red-400 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-bl-lg font-bold">
            AIO Quick Answer
          </div>
          <h3 className="text-xs font-bold text-red-400 mb-2 uppercase tracking-wide">Quick Diagnostic Summary</h3>
          <ul className="space-y-2 text-xs text-[var(--text-secondary)] leading-relaxed">
            <li><strong>Symptoms:</strong> The router randomly power-cycles every few hours or minutes, dropping all wired and wireless connections.</li>
            <li><strong>Most Likely Cause:</strong> Thermal SoC overheating due to poor ventilation, or a degraded power adapter transformer failing under peak current draw.</li>
            <li><strong>Fastest Safe Fix:</strong> Relocate the router to an open, elevated space, plug it directly into a wall outlet, and verify the power adapter matches the factory voltage and amperage rating.</li>
          </ul>
        </section>

        <ConnectionOptimizerClient mode="router-restarts" />

        <article className="prose prose-invert max-w-none space-y-6 text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
          
          <h2 className="text-sm font-bold text-[var(--text-primary)]">Symptoms vs. Root Causes Diagnostic Table</h2>
          <p>
            Before modifying your network settings or buying new equipment, match your router's physical indicators to the corresponding diagnostic state using the table below. This ensures you target the correct layer of the network stack.
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">Observed Symptom</th>
                  <th className="px-3 py-2 text-left">Likely Physical/Protocol Cause</th>
                  <th className="px-3 py-2 text-left">OSI Layer Location</th>
                  <th className="px-3 py-2 text-left">Primary Diagnostic Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2 font-mono">All LEDs flash off, then power turns red/amber</td>
                  <td className="px-3 py-2">Voltage drop or aging power adapter capacitors</td>
                  <td className="px-3 py-2">Layer 1 (Physical Power)</td>
                  <td className="px-3 py-2">Replace AC/DC power supply brick</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono">Router gets hot, restarts under heavy download</td>
                  <td className="px-3 py-2">SoC Thermal Throttling / Cooling block</td>
                  <td className="px-3 py-2">Layer 1 (Physical Hardware)</td>
                  <td className="px-3 py-2">Clear dust vents, elevate router</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono">Reboots immediately after a client connects</td>
                  <td className="px-3 py-2">IP DHCP pool collision / ARP table leak</td>
                  <td className="px-3 py-2">Layer 2 (Data Link)</td>
                  <td className="px-3 py-2">Clear DHCP lease table, update firmware</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono">Router restarts periodically every 24 hours</td>
                  <td className="px-3 py-2">ISP lease renewal crash (DHCP kernel panic)</td>
                  <td className="px-3 py-2">Layer 3 (Network Routing)</td>
                  <td className="px-3 py-2">Configure custom WAN query timings</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-sm font-bold text-[var(--text-primary)]">What Happens Internally When a Router Crashes?</h2>
          <p>
            To understand why your router reboots on its own, it helps to look inside its operating system. Most modern consumer routers run a customized version of Linux or a real-time OS (RTOS) on top of their processors. The system manages packet routing tables, executes Network Address Translation (NAT) to convert your private IPs to your public WAN address, and hosts local servers for DHCP and DNS.
          </p>
          <p>
            When a router processes a packet, it updates a conntrack table in memory. If a device has limited RAM (such as older or budget dual-band systems) and a user launches a high-session application like a torrent client or multiplayer lobby, the table rapidly fills up. When the kernel runs out of dynamic memory (OOM - Out of Memory state), it faces a choice: drop packets or halt the kernel. If a core process halts, a hardware-level chip called the <strong>Watchdog Timer (WDT)</strong> notices the freeze and cuts power to reboot the system.
          </p>

          <div className="p-4 border-l-2 border-red-500 bg-red-950/10 rounded-r-lg my-4 space-y-2">
            <span className="font-bold text-red-400 block text-xs">A Critical E-E-A-T Safety Warning</span>
            <p className="text-[11px] text-[var(--text-muted)] italic">
              <strong>Risk Assessment: High.</strong> Flashing router firmware or modifying underlying kernel parameters via SSH represents a minor risk of bricking your device. If power is interrupted during a flash write cycle, the bootloader partition may become corrupted, leaving the router permanently unresponsive. Always ensure the router is plugged into a stable power source and do not refresh the browser during update sequences.
            </p>
          </div>

          <h2 className="text-sm font-bold text-[var(--text-primary)]">Specific Router Brand Pathways to Fix Kernel Instability</h2>
          <p>
            Each router brand utilizes a different firmware skin and layout. Below are the exact menu paths to update firmware, clear NVRAM, and manage power configuration on major brands:
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase">1. ASUS (ASUSWRT Firmware)</h3>
          <p>
            ASUS routers are popular for gaming but their custom script engines can occasionally crash.
            <br />
            <strong>Path to Upgrade Firmware:</strong> <code>Administration → Firmware Upgrade</code>. Select 'Check' or upload the manual <code>.w</code> or <code>.trx</code> firmware file.
            <br />
            <strong>Path to Clear NVRAM:</strong> Turn off the router. Press and hold the physical <strong>WPS button</strong> on the side. Turn the power switch on. Keep holding WPS for 15 seconds until the power light flashes rapidly, then release.
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase">2. TP-Link (Archer & Deco Systems)</h3>
          <p>
            TP-Link routers are stable but susceptible to conntrack table saturation under high session rates.
            <br />
            <strong>Path to Upgrade Firmware:</strong> <code>Advanced → System Tools → Firmware Upgrade</code>. Deco users must open the <code>Deco Mobile App → More → Update Deco</code>.
            <br />
            <strong>Path to Clear Table Leases:</strong> <code>Advanced → Network → DHCP Server</code>. Change lease time from 120 minutes to 60 minutes to reclaim addresses faster.
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase">3. Netgear (Nighthawk & Orbi)</h3>
          <p>
            Netgear systems are prone to thermal throttling due to large flat shell profiles that restrict heat dissipation.
            <br />
            <strong>Path to Upgrade Firmware:</strong> <code>Advanced → Administration → Router Update</code>. Check for updates online and apply.
            <br />
            <strong>Path to Disable UPnP Overloads:</strong> <code>Advanced → Advanced Setup → UPnP</code>. Uncheck 'Turn UPnP On' and click Apply.
          </p>

          <h2 className="text-sm font-bold text-[var(--text-primary)]">When the Hardware Itself is Physically Failing</h2>
          <p>
            If your router is over 4 or 5 years old and continues to restart despite factory resets, the underlying hardware components are likely degrading:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-[11px] text-[var(--text-muted)]">
            <li>
              <strong>Capacitor Aging (Ripple Voltage Distortion):</strong> Consumer routers utilize cheap electrolytic capacitors to filter raw DC voltage from the wall block. Over years of thermal cycles, these capacitors dry out, increasing their Equivalent Series Resistance (ESR). When the CPU spikes, the voltage drops instantly, triggering a brownout.
            </li>
            <li>
              <strong>Silicon Electromigration:</strong> Under continuous high-temperature operation, the micro-traces on the SoC chip degrade physically. This leads to bit flipping and cache errors that crash the OS kernel.
            </li>
            <li>
              <strong>Oxidized RJ45 Pins:</strong> If the WAN port has oxidized contacts, it will create high resistance, dropping physical links and triggering boot cycles as the interface resets.
            </li>
          </ul>

          <h2 className="text-sm font-bold text-[var(--text-primary)]">Commercial Intent: Is it Time to Upgrade?</h2>
          <p>
            If you determine that your router is experiencing physical component decay or can no longer handle your modern high-speed broadband plan, replacing the hardware is the most economical path. Modern Wi-Fi 6, 6E, and Wi-Fi 7 routers feature dedicated co-processors and active thermal dissipation fins to handle dozens of devices concurrently without slowing down.
          </p>
          <p>
            If your home has thick masonry or multi-story layouts, consider upgrading to a dedicated tri-band mesh system (like the TP-Link Deco or Netgear Orbi) to distribute client load over multiple wireless backhauls, eliminating the load bottleneck on a single central gateway.
          </p>

          <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
            <span className="font-bold text-[var(--text-primary)] block text-xs">Deep Diagnostics & Internal Authority Links</span>
            <ul className="list-disc pl-4 space-y-1 text-[11px]">
              <li>If your speed is fluctuating alongside reboots, read our <a href="/why-is-my-router-so-slow" className="text-[var(--brand-400)] hover:underline">Why Is My Router So Slow Analysis</a>.</li>
              <li>Learn how to optimize gaming performance with our <a href="/best-router-settings-for-gaming" className="text-[var(--brand-400)] hover:underline">Best Router Settings for Gaming Guide</a>.</li>
              <li>Troubleshoot modem signal drops with our <a href="/router-blinking-orange" className="text-[var(--brand-400)] hover:underline">Router Blinking Orange Diagnostics</a>.</li>
              <li>Verify your incoming DNS resolution parameters with the <a href="/dns-server-not-responding" className="text-[var(--brand-400)] hover:underline">DNS Server Not Responding Page</a>.</li>
              <li>Check your physical link speed using the <a href="/ethernet-connected-but-no-internet" className="text-[var(--brand-400)] hover:underline">Ethernet Connection Optimizer</a>.</li>
            </ul>
          </div>
        </article>
      </div>
    </TroubleshootingArticleShell>
  );
}
