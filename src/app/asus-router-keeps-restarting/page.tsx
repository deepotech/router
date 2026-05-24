import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import ConnectionOptimizerClient from "@/components/tools/ConnectionOptimizerClient";
import {
  BrandRouterBadge,
  ISPWarningBanner,
  HardwareFailureCard,
} from "@/components/tools/BrandIssueComponents";

export const metadata: Metadata = buildMetadata({
  title: "ASUS Router Keeps Restarting? Fix Overheating & Boot Loops",
  description:
    "Is your ASUS router rebooting randomly? Troubleshoot Broadcom SoC overheating, NVRAM corruption, firmware bugs (ASUSWRT-Merlin), and AiMesh sync loops.",
  canonical: "/asus-router-keeps-restarting",
  keywords: [
    "asus router keeps restarting",
    "asus router reboot loop",
    "asuswrt-merlin crash reboot",
    "asus router overheating fix",
    "clear nvram asus router",
    "rt-ax86u random restarts",
    "aimesh node reboot loop",
  ],
});

const breadcrumbs = [
  { name: "Router Problems", url: "/router-keeps-restarting" },
  { name: "ASUS Router Keeps Restarting", url: "/asus-router-keeps-restarting" },
];

const troubleshootingSteps = [
  {
    title: "Verify SoC Thermal Health (Prevent Overheating Throttling)",
    description:
      "ASUS RT-series routers (e.g. RT-AC86U, RT-AX88U) utilize high-performance Broadcom SoCs that generate significant heat. Log into ASUSWRT at http://router.asus.com. Navigate to Administration → System. Check the CPU and wireless radio temperatures. If the CPU temperature exceeds 85°C (185°F), the hardware watchdog will trigger an emergency reboot to prevent thermal runaway.",
    tip: "Ensure your router is placed vertically on a flat, elevated surface with at least 6 inches of clearance around all vents. Avoid placing it inside enclosed AV cabinets or next to hot modems.",
  },
  {
    title: "Perform a WPS Button Hard Factory Reset (Wipe NVRAM)",
    description:
      "When upgrading ASUSWRT stock firmware or flashing custom Merlin builds, orphan variables in the NVRAM partition can corrupt routing tables and trigger loops. A standard UI reset does not clear all blocks. Power off the router. Press and hold the physical 'WPS' button. While holding WPS, power the router on. Keep holding the WPS button for 10-15 seconds until the power LED flashes rapidly or turns off, then release. The router will boot with a fully cleared NVRAM partition.",
    tip: "A WPS reset wipes all custom configurations. Do not restore an old backup config file directly; re-enter settings manually to prevent restoring the corrupt NVRAM variables.",
  },
  {
    title: "Check and Isolate AiMesh Sync Loop Conflicts",
    description:
      "In an AiMesh setup, if a node loses its wired or wireless backhaul connection during synchronization, the main router's watchdog daemon (syslogd/wand) may crash and trigger a device reboot. Unplug or power down all AiMesh node satellites. Run the main router standalone for 24 hours. If restarts stop, factory reset the node units and rebind them to the mesh structure.",
    tip: "Using a dedicated Ethernet backhaul (connecting the main router's LAN port to the node's WAN port) bypasses wireless backhaul sync failures completely.",
  },
  {
    title: "Disable Network Services (UPnP, Traffic Analyzer, AiProtection)",
    description:
      "Dynamic background services on ASUS routers require high CPU cycles. Under heavy torrenting or high-session traffic, features like AiProtection (Trend Micro engine), Traffic Analyzer (dcd daemon), and UPnP can trigger kernel panics or out-of-memory (OOM) situations, leading to sudden restarts. Turn off Traffic Analyzer and AiProtection via their respective tabs in the left navigation sidebar.",
    tip: "Disabling Trend Micro's database checks reduces CPU core loads by up to 30%, lowering temperatures and stabilizing aged transceivers.",
  },
  {
    title: "Reflash Firmware via ASUS Rescue Mode (CFE Recovery)",
    description:
      "If your router is stuck in a boot loop (power light flashing slowly), the firmware bootloader block is corrupted. Download the latest official firmware .w2 filename. Install the 'ASUS Firmware Restoration' utility on your computer. Set your PC's Ethernet card IP to static 192.168.1.10. Power off the router. Hold the physical 'Reset' button and plug in the power. Release the button when the power LED slowly flashes. Run the Restoration utility to upload the firmware directly to the CFE partition.",
    tip: "CFE Recovery bypasses the main operating system entirely, allowing you to salvage routers that fail to boot to the administration GUI.",
  },
];

const faqs = [
  {
    question: "Why does my ASUS router reboot itself randomly under heavy network loads?",
    answer:
      "Heavy loads (such as large downloads, game updates, or torrent sessions) increase CPU processing activity on the Broadcom chip. If the router's internal thermal paste has degraded, or if the ventilation slots are dusty, this activity pushes the processor temperature past the 85°C thermal limit, causing the firmware's watchdog daemon to execute a hardware reset to avoid damage.",
  },
  {
    question: "How does a WPS button reset differ from a standard factory reset in ASUSWRT?",
    answer:
      "A standard GUI reset clears the custom setting parameters visible in the browser admin dashboard. A WPS button reset (WPS Hard Reset) wipes the entire physical NVRAM chip sector-by-sector, purging hidden orphan system variables, corrupt system log logs, and residual script hooks left by third-party modifications like ASUSWRT-Merlin.",
  },
  {
    question: "Will installing ASUSWRT-Merlin custom firmware stop random reboots?",
    answer:
      "It can if the reboots are caused by known memory-leak bugs in the official ASUS factory software. Merlin contains optimized swap-space scripts and minor kernel tweaks. However, if the restarts are caused by overheating hardware, NVRAM corruption, or a dying power adapter, custom firmware will not resolve the issue and could exacerbate thermal loads.",
  },
  {
    question: "Why does my AiMesh satellite node keep cycling on and off?",
    answer:
      "This indicates a backhaul handshake failure. If the satellite is placed too far from the main router, it continually tries to sync, times out, and restarts its internal networking daemon. Ensure the node is placed within 30-40 feet of the main router, or switch the backhaul connection mode to wired Ethernet.",
  },
  {
    question: "How can I check the error log to see what triggered my ASUS router restart?",
    answer:
      "Log into the router, navigate to System Log -> General Log in the left-hand column. Scroll down and look for entries labeled 'watchdog', 'kernel panic', or 'OOM' (Out of Memory). If you see watchdog entries, it means a system process hung or exceeded temp thresholds, prompting the automatic system restart.",
  },
];

const commonCauses = [
  {
    title: "Broadcom SoC Overheating",
    desc: "Processor temperatures crossing safety limits (85°C+), triggering automatic hardware watchdog shutdowns.",
  },
  {
    title: "Orphan NVRAM Variables",
    desc: "Stale data remnants left over from firmware modifications causing kernel memory faults and crash loops.",
  },
  {
    title: "AiMesh Synchronization Loop",
    desc: "Wireless node handshake failures crashing the main router's daemon processes during heavy broadcasts.",
  },
  {
    title: "Power Adapter Failure",
    desc: "Aged capacitors inside the power adapter dropping below the rated 19V/12V output when load spikes occur.",
  },
];

const quickFixChecklist = [
  "Relocate the router to a vertical, open area to improve ventilation.",
  "Check system logs for 'watchdog' or CPU temperature readings.",
  "Perform a hardware-level WPS button reset to wipe the NVRAM chip.",
  "Temporarily disable AiProtection and Traffic Analyzer database scans.",
  "Replace the 12V/19V power adapter brick to check for voltage ripple.",
];

const hardwareIndicators = [
  {
    component: "Broadcom CPU Heat Spreader",
    failureSign: "System restarts within 5 minutes of powering on; chassis feels burning hot to the touch.",
    severity: "high" as const,
    action: "Thermal pad has degraded. Apply a new copper shim / thermal paste or replace the router.",
  },
  {
    component: "Power Brick Adapter",
    failureSign: "Restarts coincide with high bandwidth utilization, gaming sessions, or USB drive access.",
    severity: "high" as const,
    action: "Replace power adapter. ASUS RT series often use 19V adapters which fail after 3-4 years.",
  },
  {
    component: "Wired WAN Controller",
    failureSign: "Power LED blinks orange; connection drops whenever an Ethernet cable is plugged into WAN.",
    severity: "medium" as const,
    action: "The physical WAN transceiver chip is damaged. Assign a LAN port as WAN via VLAN config or replace.",
  },
];

export default function AsusRouterKeepsRestartingPage() {
  return (
    <TroubleshootingArticleShell
      h1="ASUS Router Keeps Restarting? Fix Overheating & Boot Loops"
      intro="Is your ASUS RT-series router rebooting randomly throughout the day or caught in a constant flashing boot loop? Troubleshoot Broadcom CPU thermal limits, NVRAM partition boundary corruption, custom firmware (ASUSWRT-Merlin) cache conflicts, and AiMesh backhaul sync failures."
      category="wifi"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "Power Adapter Voltage Check",
        text: "Using a power adapter with incorrect voltage or amperage ratings on ASUS high-performance routers can damage the main board components. Ensure your replacement power adapter matches the exact voltage (typically 19V for high-end models, 12V for mid-range models) and equals or exceeds the factory-specified amperage.",
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="Do not contact your ISP for random router restarts. Since your ASUS router is a customer-owned routing device, your service provider has no control or visibility over its hardware stability. The issue is strictly local to the router's physical power, heat, or internal software configuration."
      severityLevel="high"
    >
      <div className="space-y-6">
        {/* Brand Badge */}
        <BrandRouterBadge
          brandName="ASUS"
          seriesLabel="RT-Series / ROG Gaming / ZenWiFi"
          accentColor="red"
          icon="cpu"
        />

        {/* Quick Answer AI Snippet */}
        <section
          className="glass-card p-5 border border-red-950/20 bg-red-950/5 rounded-2xl relative overflow-hidden"
          aria-label="Quick Answer Summary"
        >
          <div className="absolute top-0 right-0 bg-red-500/10 text-red-400 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-bl-lg font-bold">
            AIO Quick Answer
          </div>
          <h3 className="text-xs font-bold text-red-400 mb-2 uppercase tracking-wide">
            Quick Diagnostic Summary
          </h3>
          <ul className="space-y-2 text-xs text-[var(--text-secondary)] leading-relaxed">
            <li>
              <strong>Symptoms:</strong> The router randomly powers down and boots back up, or gets stuck with a pulsing power LED that doesn't resolve to internet access.
            </li>
            <li>
              <strong>Primary Cause:</strong> High internal temperatures exceeding 80°C/85°C, corrupt entries in the NVRAM block (often after firmware upgrades), or a failing power adapter supplying unstable voltage.
            </li>
            <li>
              <strong>Fastest Safe Fix:</strong> Relocate the router to verify airflow, execute a hard WPS button factory reset to purge the NVRAM partition, and disable heavy background processes like AiProtection.
            </li>
          </ul>
        </section>

        <ConnectionOptimizerClient mode="router-restarts" />

        {/* ISP escalation banner */}
        <ISPWarningBanner
          title="Hardware Power Supply Degradation Warning"
          body="A highly overlooked cause of ASUS router boot loops is the external power adapter. Over time, the internal capacitors inside the AC brick leak voltage, failing to supply the necessary current when the router's CPU cores spike during network activity. The router detects a power drop and triggers a full restart."
          variant="danger"
          escalationSteps={[
            "Check if restarts occur during file transfers or when connecting multiple USB devices.",
            "Compare the specifications printed on the power brick (typically 19V / 1.75A or 19V / 3.42A).",
            "Purchase a verified matching replacement adapter; test for stability.",
          ]}
        />

        <article className="prose prose-invert max-w-none space-y-6 text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
          <h2 className="text-sm font-bold text-[var(--text-primary)]">
            Symptoms vs. Root Causes — ASUS Random Reboot Isolation Table
          </h2>
          <p>
            Review this matrix to match the restart behavior with its associated software loop or physical
            hardware failure:
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">Observed Restart Symptom</th>
                  <th className="px-3 py-2 text-left">Root Cause Mechanism</th>
                  <th className="px-3 py-2 text-left">Affected Models</th>
                  <th className="px-3 py-2 text-left">Fix Difficulty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2">Reboots when doing large file downloads or speed tests</td>
                  <td className="px-3 py-2">CPU thermal limit exceeded (exceeds 85°C watchdog limit)</td>
                  <td className="px-3 py-2">RT-AC86U, RT-AX88U, GT-AX11000</td>
                  <td className="px-3 py-2 text-emerald-400 font-bold">Easy (improve airflow)</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Stuck in continuous boot loop (Power LED blinking slowly)</td>
                  <td className="px-3 py-2">Corrupted firmware partition / bootloader crash</td>
                  <td className="px-3 py-2">All ASUS RT models</td>
                  <td className="px-3 py-2 text-red-400 font-bold">Hard (CFE Recovery Mode)</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Reboots immediately after modifying settings or flashing firmware</td>
                  <td className="px-3 py-2">NVRAM boundary overflow / corrupted configuration file variables</td>
                  <td className="px-3 py-2">All routers running ASUSWRT or Merlin</td>
                  <td className="px-3 py-2 text-amber-400 font-bold">Medium (WPS Reset)</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Reboots randomly 1-2 times daily with empty system logs</td>
                  <td className="px-3 py-2">Voltage drop from a failing power supply adapter brick</td>
                  <td className="px-3 py-2">Older RT-AC series (3+ years old)</td>
                  <td className="px-3 py-2 text-emerald-400 font-bold">Easy (Swap adapter)</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Restarts when AiMesh satellite node is added</td>
                  <td className="px-3 py-2">Mesh synchronization process crashing the main network daemon</td>
                  <td className="px-3 py-2">ZenWiFi series, RT-AX series mesh</td>
                  <td className="px-3 py-2 text-amber-400 font-bold">Medium (Factory reset node)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-sm font-bold text-[var(--text-primary)]">
            Advanced Technical Context: Watchdogs, NVRAM, and Broadcom SoCs
          </h2>
          <p>
            ASUS routers are high-performance networking devices powered by Broadcom ARM Cortex multicore processors (SoCs). These processors run a Linux kernel that manages network traffic, packet inspections, and security processes.
          </p>
          <p>
            To ensure high availability, ASUSWRT includes an embedded daemon process called the <strong>Watchdog</strong>. The watchdog regularly polls critical daemons (like <code>rc</code>, <code>httpd</code>, and <code>wand</code>) and monitors hardware sensors. If a process stops responding for more than a preconfigured timeout window, or if the internal CPU thermal sensor reads over 85°C, the watchdog kernel thread triggers a hardware reset by pulling the processor's RESET line low.
          </p>
          <p>
            <strong>NVRAM Partition Issues:</strong> The configuration database of your ASUS router is stored in a dedicated flash partition called NVRAM (Non-Volatile Random Access Memory). During firmware transitions (especially from older stock ASUSWRT versions to custom ASUSWRT-Merlin builds), the data structures inside this partition can shift. Standard firmware updates do not reformat the NVRAM. Stale variables from the old firmware occupy memory spaces, conflicting with new system daemons. This leads to recursive crashes, stack overflows, and random watchdog reboots.
          </p>

          <h2 className="text-sm font-bold text-[var(--text-primary)]">
            How to Monitor Temperature and Clean NVRAM on ASUSWRT
          </h2>
          <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase">
            Checking Temperature via SSH CLI
          </h3>
          <p>
            If you want exact readings, enable SSH inside your ASUS dashboard (Administration → System → Enable SSH). Open a terminal client and run the following commands to check CPU and wireless adapter temperature readings:
          </p>
          <pre className="bg-[var(--bg-elevated)] p-3 rounded-lg text-[10px] text-emerald-400 font-mono">
{`# Check Broadcom CPU Temperature
cat /sys/class/thermal/thermal_zone0/temp | awk '{print $1/1000 "°C"}'

# Check 2.4 GHz Radio Temperature
wl -i eth1 phy_temp

# Check 5 GHz Radio Temperature
wl -i eth2 phy_temp`}
          </pre>
          <p className="text-[11px] text-[var(--text-muted)]">
            Note: Safe operating temperatures for Broadcom processors are below 80°C. If your readings exceed 82°C at idle, thermal throttling or crash loops are highly likely.
          </p>

          <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase mt-4">
            Performing the WPS Hard Reset Protocol
          </h3>
          <ol className="list-decimal pl-5 space-y-1.5 text-[11px] text-[var(--text-muted)]">
            <li>Power off your ASUS router using the physical power switch.</li>
            <li>Press and hold the physical <strong>WPS button</strong> on the side or rear of the router.</li>
            <li>While maintaining pressure on the WPS button, turn on the power switch.</li>
            <li>Keep holding the WPS button. The power LED will behave in one of these ways:
              <ul className="list-disc pl-4 mt-1">
                <li>Blink rapidly for several seconds.</li>
                <li>Turn solid red or orange, then turn off.</li>
              </ul>
            </li>
            <li>Release the WPS button. Turn the router off and back on. It will boot into factory default state with a pristine NVRAM partition.</li>
          </ol>

          <HardwareFailureCard
            brandName="ASUS"
            indicators={hardwareIndicators}
            replacementAdvice="If the ASUS router continues to restart randomly when powered by a new power adapter, in a well-ventilated area, and after a full WPS hard reset, the internal solder joints of the Broadcom SoC have cracked due to thermal expansion/contraction cycles. In this state, replacing the unit is the most cost-effective solution."
          />

          <h2 className="text-sm font-bold text-[var(--text-primary)]">
            Beginner vs. Advanced Fix Matrix
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-3 py-2 text-left">Fix Method</th>
                  <th className="px-3 py-2 text-left">Difficulty</th>
                  <th className="px-3 py-2 text-left">Time</th>
                  <th className="px-3 py-2 text-left">Risk</th>
                  <th className="px-3 py-2 text-left">Success Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <tr>
                  <td className="px-3 py-2">Relocate router vertically for air clearance</td>
                  <td className="px-3 py-2 text-emerald-400">Beginner</td>
                  <td className="px-3 py-2">2 mins</td>
                  <td className="px-3 py-2 text-emerald-400">None</td>
                  <td className="px-3 py-2">60% (for overheating)</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Disable AiProtection & Traffic Analyzer database scans</td>
                  <td className="px-3 py-2 text-emerald-400">Beginner</td>
                  <td className="px-3 py-2">3 mins</td>
                  <td className="px-3 py-2 text-emerald-400">None</td>
                  <td className="px-3 py-2">75% (for load-based reboots)</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Swap AC power adapter brick</td>
                  <td className="px-3 py-2 text-emerald-400">Beginner</td>
                  <td className="px-3 py-2">5 mins</td>
                  <td className="px-3 py-2 text-emerald-400">Low</td>
                  <td className="px-3 py-2">80% (for older units)</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">WPS hard factory reset (NVRAM wipe)</td>
                  <td className="px-3 py-2 text-amber-400">Intermediate</td>
                  <td className="px-3 py-2">10 mins</td>
                  <td className="px-3 py-2 text-amber-400">Restores default settings</td>
                  <td className="px-3 py-2">95% (for software faults)</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">CFE Recovery Mode firmware reflash</td>
                  <td className="px-3 py-2 text-red-400">Advanced</td>
                  <td className="px-3 py-2">25 mins</td>
                  <td className="px-3 py-2 text-red-400">Medium (requires manual IP config)</td>
                  <td className="px-3 py-2">90% (for bootloops)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl space-y-2">
            <span className="font-bold text-[var(--text-primary)] block text-xs">Related Router Management Articles</span>
            <ul className="list-disc pl-4 space-y-1 text-[11px]">
              <li>Read the general reboot guide: <a href="/router-keeps-restarting" className="text-[var(--brand-400)] hover:underline">Why Does My Router Keep Restarting? Solutions & Fixes</a>.</li>
              <li>If you have a red power light, read <a href="/asus-router-red-light" className="text-[var(--brand-400)] hover:underline">How to Resolve ASUS Router Red Light Errors</a>.</li>
              <li>Learn to optimize your Wi-Fi signals at <a href="/how-to-improve-wifi-signal" className="text-[var(--brand-400)] hover:underline">How to Improve Router Wi-Fi Range and Strength</a>.</li>
              <li>If your router doesn't detect WAN, read <a href="/router-not-detecting-wan" className="text-[var(--brand-400)] hover:underline">Fix Router WAN Interface Port Not Detected Guide</a>.</li>
              <li>Learn about gaming settings at <a href="/best-router-settings-for-gaming" className="text-[var(--brand-400)] hover:underline">Best Router QoS and Port Forwarding Settings for Gaming</a>.</li>
            </ul>
          </div>
        </article>
      </div>
    </TroubleshootingArticleShell>
  );
}
