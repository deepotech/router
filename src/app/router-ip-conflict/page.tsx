import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import RelatedGuides from "@/components/tools/RelatedGuides";

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = buildMetadata({
  title: "Router IP Conflict: Fix Duplicate IP Addresses (2026)",
  description:
    "Diagnose and resolve IP address conflicts on your network caused by duplicate static IPs, DHCP pool collisions, and ARP cache issues — step-by-step fix guide.",
  canonical: "/router-ip-conflict",
  keywords: [
    "router IP conflict",
    "duplicate IP address",
    "IP address conflict fix",
    "DHCP conflict",
    "static IP conflict router",
    "IP address collision network",
    "ARP conflict router",
    "fix IP conflict Windows",
  ],
});

// ─── Static data ─────────────────────────────────────────────────────────────

const breadcrumbs = [
  { name: "Router Login", url: "/router-login" },
  { name: "Router Login Recovery", url: "/router-login-recovery" },
  { name: "Router IP Conflict", url: "/router-ip-conflict" },
];

const troubleshootingSteps = [
  {
    title: "Identify the Conflicting Devices Using ARP",
    description:
      "On Windows, open Command Prompt and run: arp -a. This displays all IP-to-MAC address mappings cached on your device. Look for the same IP address mapped to two different MAC addresses — this confirms a conflict. On Linux/Mac, run: arp -n. Note both MAC addresses and use an online MAC address lookup to identify which devices have the conflict.",
    tip:
      "You can also find conflicts in your router admin panel: log into 192.168.1.1, navigate to DHCP → DHCP Lease Table. Any IP shown twice with different MAC addresses is conflicting. On ASUS routers, this is under Network Map → Clients.",
  },
  {
    title: "Release and Renew IP Addresses on Conflicting Devices",
    description:
      "On the device showing the &apos;IP Address Conflict&apos; Windows notification: open Command Prompt as Administrator and run 'ipconfig /release' followed by 'ipconfig /renew'. This forces the device to release its current IP and request a new one from the router&apos;s DHCP server. On macOS: System Settings → Network → your connection → Advanced → TCP/IP → Renew DHCP Lease. On Android/iOS: forget the Wi-Fi network and reconnect.",
    tip:
      "If the conflict recurs after renewal, one of the conflicting devices has a manually assigned (static) IP that falls inside the router&apos;s DHCP lease pool. Static IPs must be set outside the DHCP pool range.",
  },
  {
    title: "Move Static IP Addresses Outside the DHCP Pool",
    description:
      "Log into your router admin panel. Navigate to LAN → DHCP Server settings. Note the DHCP pool range (e.g., 192.168.1.100 to 192.168.1.199). Any device you want to assign a static IP must use an address outside this pool — for example, 192.168.1.2 through 192.168.1.99 or 192.168.1.200 through 192.168.1.254. Go to each conflicting device and update its static IP configuration accordingly.",
    tip:
      "The better practice is to use DHCP Reservations (also called static DHCP) rather than manually setting static IPs on devices. In your router admin panel, bind a specific MAC address to a fixed IP within the DHCP pool — the router will always assign that IP to that device while managing the pool correctly.",
  },
  {
    title: "Clear ARP Cache on Affected Devices",
    description:
      "Stale ARP cache entries can cause ghost IP conflicts long after the actual conflict is resolved. On Windows: open Command Prompt as Administrator and run 'netsh interface ip delete arpcache'. On Linux: sudo ip -s neigh flush all. On macOS: sudo arp -d -a. After clearing, the devices will re-discover correct IP-to-MAC mappings during the next network activity.",
    tip:
      "ARP cache entries expire automatically within minutes, but flushing them immediately speeds up conflict resolution. Devices on Windows also update cached entries when a new ARP announcement arrives from the router.",
  },
  {
    title: "Configure DHCP Reservations to Prevent Future Conflicts",
    description:
      "Log into your router admin panel and navigate to DHCP Reservations (or Address Reservation / Static DHCP — the name varies by brand). For each device that needs a fixed IP (printers, NAS, smart TVs, game consoles), add a reservation binding the device&apos;s MAC address to a specific IP. The router will always assign that IP via DHCP rather than from the dynamic pool, eliminating conflicts while maintaining proper pool management.",
    tip:
      "Find a device&apos;s MAC address under its Wi-Fi or Ethernet settings (Windows: ipconfig /all → Physical Address; Android: Settings → About → Wi-Fi MAC address). Some routers let you add reservations directly from the connected clients list without manually entering the MAC.",
  },
];

const faqs = [
  {
    question: "What is an IP address conflict and why does it happen?",
    answer:
      "An IP address conflict occurs when two devices on the same local network are assigned or use the same IP address simultaneously. Since IP communication requires unique addressing, both devices experience network failures — packets sent to that IP are delivered to whichever device responds first, causing erratic connectivity for both. Conflicts happen when: a device is manually configured with a static IP that the DHCP server later also assigns dynamically, two devices are configured with the same static IP, or a DHCP lease persists after a router reboot while a device also holds a manual assignment for the same IP.",
  },
  {
    question: "What is DHCP Reservation vs. Static IP, and which is better?",
    answer:
      "A static IP is manually configured directly on the device (in its network settings) — the device always uses that IP regardless of what the DHCP server does. A DHCP Reservation is configured in the router — it tells the DHCP server to always assign a specific IP to a specific MAC address whenever that device requests a lease. DHCP Reservation is almost always better: it centralizes IP management, prevents conflicts with the DHCP pool, and automatically handles device reconnections without any device-side configuration.",
  },
  {
    question: "How do I know if I have an IP conflict?",
    answer:
      "On Windows, you will see a notification &apos;There is an IP address conflict with another system on the network&apos; and the conflicting device may lose internet access intermittently. On macOS, a similar alert appears saying another device is using your IP address. On Linux, you may see ARP conflict messages in system logs (dmesg | grep -i arp). Affected devices typically experience erratic connectivity — working for a few seconds then dropping — rather than complete failure.",
  },
  {
    question: "Can an IP conflict affect other devices on the network?",
    answer:
      "Primarily, an IP conflict only directly affects the two devices sharing the same IP. However, secondary effects can occur: ARP confusion can cause intermittent routing failures for devices in the same subnet, broadcast traffic from conflicting ARP announcements increases slightly, and in rare cases with poorly implemented network stacks, the ARP storm from conflict resolution can cause brief network-wide slowdowns. Resolving the conflict quickly prevents these secondary effects.",
  },
  {
    question: "What is the DHCP lease pool and how should I size it?",
    answer:
      "The DHCP lease pool is the range of IP addresses the router&apos;s DHCP server can assign to clients. For example, a pool of 192.168.1.100 to 192.168.1.199 provides 100 addresses. Size the pool larger than your expected connected device count — typically 2–5x larger for home networks. Addresses outside the pool (e.g., 192.168.1.2 to 192.168.1.99) are safe to use for static IPs without conflict risk. Avoid overlapping any static IP assignments with the DHCP pool range.",
  },
];

const commonCauses = [
  {
    title: "Static IP Inside DHCP Pool",
    desc: "A device is manually assigned an IP (e.g., 192.168.1.105) that falls within the router DHCP range — the router may assign the same IP to another device.",
  },
  {
    title: "Duplicate Static Assignments",
    desc: "Two devices are manually configured with the same static IP address, causing immediate and persistent conflict.",
  },
  {
    title: "DHCP Lease Persistence After Router Reset",
    desc: "After a router reboot, the DHCP server may re-assign a previously used IP to a different device before the original lease expires.",
  },
  {
    title: "Stale ARP Cache",
    desc: "Outdated ARP entries cause devices to route traffic to the wrong MAC address even after the conflict is resolved.",
  },
];

const quickFixChecklist = [
  "Run arp -a in Command Prompt to identify conflicting IP/MAC pairs",
  "Run ipconfig /release then ipconfig /renew on affected Windows device",
  "Check router DHCP lease table for duplicate IPs",
  "Move static IPs outside the DHCP pool range",
  "Convert static IP assignments to DHCP Reservations",
  "Flush ARP cache: netsh interface ip delete arpcache",
  "Power cycle the router to clear stale DHCP leases",
];

export default async function RouterIpConflictPage() {
  return (
    <TroubleshootingArticleShell
      h1="Router IP Conflict: Diagnose & Fix Duplicate IP Addresses (2026)"
      intro="An IP address conflict occurs when two devices on your network claim the same local IP address, causing erratic connectivity failures for both devices. This guide explains how to identify conflicting devices using ARP inspection, release and renew DHCP leases, move static IP assignments outside the DHCP pool, configure permanent DHCP reservations, and prevent conflicts from recurring on any router brand."
      category="nat"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "IP Conflicts Cause Intermittent, Hard-to-Diagnose Failures",
        text: "IP conflicts do not produce consistent errors — affected devices may connect for seconds, then drop, making them appear as Wi-Fi issues. If a device shows inconsistent connectivity with no clear cause, an IP conflict is a primary suspect.",
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="Contact your ISP only if you suspect the conflict involves the WAN-side IP address (your public IP). ISP DHCP conflicts in the WAN segment are managed by the ISP and cannot be resolved from your side. For LAN-side conflicts, the fixes above apply universally."
      severityLevel="medium"
    >
      <div className="space-y-8">

        {/* Quick Answer */}
        <section
          className="glass-card p-5 border border-orange-950/30 bg-orange-950/5 rounded-2xl relative overflow-hidden"
          aria-label="Quick Answer: IP Conflict"
        >
          <div className="absolute top-0 right-0 bg-orange-500/10 text-orange-400 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-bl-lg font-bold">
            AIO Quick Answer
          </div>
          <h3 className="text-xs font-bold text-orange-400 mb-2 uppercase tracking-wide">
            What Causes Router IP Conflicts and How to Fix Them
          </h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            IP conflicts occur when a manually assigned static IP overlaps with the router&apos;s DHCP pool, or when
            two devices are configured with the same static IP. Fix it by running{" "}
            <code className="font-mono text-green-400">ipconfig /release</code> then{" "}
            <code className="font-mono text-green-400">ipconfig /renew</code> on affected Windows devices, and
            checking your router&apos;s DHCP lease table for duplicates. For a permanent fix, use DHCP Reservations
            in your{" "}
            <Link href="/router-settings" className="text-[var(--brand-400)] hover:underline">
              router settings
            </Link>
            .
          </p>
        </section>

        {/* Key Terms */}
        <section aria-label="IP Conflict Key Terms">
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">
            Key Networking Terms for IP Conflict Resolution
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                term: "DHCP",
                color: "text-blue-400",
                def: "Dynamic Host Configuration Protocol — the router&apos;s service that automatically assigns IP addresses to connecting devices from a defined pool range.",
              },
              {
                term: "DHCP Reservation",
                color: "text-green-400",
                def: "A router-side binding that tells the DHCP server to always assign a specific IP to a specific device (identified by MAC address).",
              },
              {
                term: "Static IP",
                color: "text-amber-400",
                def: "An IP address manually configured on a device itself, bypassing DHCP assignment. Must be outside the DHCP pool to avoid conflicts.",
              },
              {
                term: "ARP Cache",
                color: "text-purple-400",
                def: "Address Resolution Protocol cache — a temporary table mapping IP addresses to MAC addresses, used for local network communication. Can become stale and cause ghost conflicts.",
              },
              {
                term: "IP Pool",
                color: "text-cyan-400",
                def: "The range of IP addresses the DHCP server draws from when assigning leases to clients (e.g., 192.168.1.100–192.168.1.199).",
              },
              {
                term: "ARP Conflict",
                color: "text-red-400",
                def: "A network event where two devices broadcast conflicting ARP announcements for the same IP address, causing routing confusion for other devices.",
              },
            ].map(({ term, color, def }, i) => (
              <div key={i} className="glass-card p-4 rounded-xl border border-[var(--border-subtle)]">
                <h3 className={`text-xs font-bold mb-1 ${color}`}>{term}</h3>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">{def}</p>
              </div>
            ))}
          </div>
        </section>

        {/* DHCP vs Static IP Comparison */}
        <section aria-label="DHCP vs Static IP vs DHCP Reservation Comparison">
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">
            DHCP vs. Static IP vs. DHCP Reservation
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--border-subtle)]">
                  <th className="text-left py-2 px-3 text-[var(--text-muted)] font-medium">Aspect</th>
                  <th className="text-left py-2 px-3 text-blue-400 font-medium">DHCP (Dynamic)</th>
                  <th className="text-left py-2 px-3 text-amber-400 font-medium">Static IP (Device)</th>
                  <th className="text-left py-2 px-3 text-green-400 font-medium">DHCP Reservation</th>
                </tr>
              </thead>
              <tbody className="text-[var(--text-secondary)]">
                {[
                  ["Conflict risk", "Low (managed by router)", "High (if inside pool)", "None"],
                  ["IP stability", "May change on reconnect", "Always the same", "Always the same"],
                  ["Configuration location", "Automatic", "On each device", "In router admin panel"],
                  ["Best for", "Regular client devices", "Legacy systems", "Printers, NAS, servers"],
                  ["Management effort", "None", "High", "One-time setup"],
                ].map(([aspect, dhcp, staticIp, reservation], i) => (
                  <tr key={i} className="border-b border-[var(--border-subtle)]/50">
                    <td className="py-2 px-3 text-[var(--text-primary)] font-medium">{aspect}</td>
                    <td className="py-2 px-3 text-blue-300">{dhcp}</td>
                    <td className="py-2 px-3 text-amber-300">{staticIp}</td>
                    <td className="py-2 px-3 text-green-300">{reservation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Related links */}
        <RelatedGuides
          currentUrl="/router-ip-conflict"
          category="nat"
          tags={["ip", "conflict", "dhcp"]}
          maxItems={4}
        />

      </div>
    </TroubleshootingArticleShell>
  );
}
