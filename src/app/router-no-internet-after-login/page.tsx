import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import RelatedGuides from "@/components/tools/RelatedGuides";

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = buildMetadata({
  title: "No Internet After Router Login? 7 WAN & ISP Fixes (2026)",
  description:
    "Fix the issue where your router login page loads normally but there is no internet. Covers PPPoE authentication failure, WAN disconnection, DNS failures, and ISP outages.",
  canonical: "/router-no-internet-after-login",
  keywords: [
    "no internet after router login",
    "router admin works but no internet",
    "router connected but no internet",
    "PPPoE authentication failed",
    "WAN disconnected router",
    "router DNS failure",
    "internet down after login router",
    "router shows connected but no internet",
  ],
});

// ─── Static data ─────────────────────────────────────────────────────────────

const breadcrumbs = [
  { name: "Router Login", url: "/router-login" },
  { name: "Router Login Recovery", url: "/router-login-recovery" },
  { name: "No Internet After Login", url: "/router-no-internet-after-login" },
];

const troubleshootingSteps = [
  {
    title: "Check the WAN/Internet LED on Your Router",
    description:
      "Look at the physical LED indicators on your router. The WAN or Internet LED should be solid white, green, or blue when the upstream link is active. If it is OFF, orange, or blinking in an error pattern, the physical connection between your router and the modem or ISP line is the problem — not the router admin page. Re-seat the WAN cable (the cable plugged into the router&apos;s WAN port, not the LAN ports), power cycle the modem first, then the router.",
    tip:
      "The WAN port is labeled &apos;WAN&apos;, &apos;Internet&apos;, or shows a globe icon on the router. It is where the cable from your modem or ISP wall socket connects. Do not confuse it with the numbered LAN ports (1–4) where your computer connects.",
  },
  {
    title: "Check WAN Connection Status in the Router Admin Panel",
    description:
      "Log into the router admin panel (typically at 192.168.1.1 or 192.168.0.1). Navigate to the Status or WAN page. Verify the WAN IP, Subnet Mask, Gateway, and DNS fields are populated with real values — not 0.0.0.0 or blank. If the WAN status shows &apos;Disconnected&apos;, &apos;No Link&apos;, or empty WAN IP, the router cannot get an IP from the ISP. Check the physical WAN cable and try releasing and renewing the WAN connection from the admin panel.",
    tip:
      "On TP-Link: Status → WAN. On Netgear: ADVANCED → Internet Setup. On ASUS: Network Map. On D-Link: Status → Device Info. Look specifically for the WAN IP Address field — a valid IP there means the router has a WAN connection; 0.0.0.0 or blank means it does not.",
  },
  {
    title: "Fix PPPoE Authentication Failed Errors",
    description:
      "If your ISP uses PPPoE (common with DSL/ADSL connections), the router must authenticate with the ISP using a username and password before getting internet access. In the admin panel, navigate to WAN → Internet Connection Type → PPPoE. Verify the PPPoE username and password match exactly what your ISP provided — including any domain suffix (e.g., username@isp.com rather than just username). Also check the MTU: PPPoE requires MTU 1492, not the standard 1500.",
    tip:
      "PPPoE passwords are case-sensitive and often contain @ symbols, numbers, and special characters. If your ISP recently changed your PPPoE credentials (common after a plan change), you must update them in the router admin panel manually — the router does not receive this change automatically.",
  },
  {
    title: "Fix DNS Resolution Failures",
    description:
      "If the router&apos;s WAN status shows a valid IP address but websites still do not load, the problem is likely DNS. In the admin panel, navigate to WAN → DNS settings. Change the DNS servers to reliable public ones: use 1.1.1.1 and 1.0.0.1 (Cloudflare) or 8.8.8.8 and 8.8.4.4 (Google). Apply and reboot the router. You can also test DNS from your computer: open Command Prompt and run nslookup google.com — if it times out, DNS is the problem.",
    tip:
      "Many ISPs provide DNS servers that occasionally go down or apply filtering. Setting Cloudflare (1.1.1.1) or Google (8.8.8.8) as your DNS provider is a permanent improvement for reliability and speed. See our guide on changing DNS for detailed instructions.",
  },
  {
    title: "Power Cycle the Modem-Router Chain in the Correct Order",
    description:
      "Incorrect power cycle order is a common cause of persistent no-internet issues after router login. The correct sequence is: (1) Unplug both the modem and router. (2) Wait 60 seconds. (3) Power on the modem only and wait 60 seconds for it to connect to the ISP. (4) Power on the router and wait 90 seconds. (5) Test internet. The modem must be fully connected to the ISP before the router attempts to negotiate a WAN connection.",
    tip:
      "If you have a modem-router combo device (common with ISP-supplied equipment), a single power cycle is sufficient. The 60-second wait between modem and router power-on is critical — it gives the modem time to establish a sync with the ISP infrastructure.",
  },
  {
    title: "Check for ISP Outage",
    description:
      "If all steps above fail and the WAN LED remains off or the WAN IP is unavailable after multiple modem power cycles, the problem is an ISP-side outage. Check your ISP&apos;s status page or social media accounts. You can also use a phone on mobile data to call the ISP&apos;s support line. Connect a laptop directly to the modem (bypassing the router) using an Ethernet cable — if you also have no internet, this confirms the issue is with the ISP or modem, not the router.",
    tip:
      "Run traceroute (Windows: tracert 8.8.8.8; Mac/Linux: traceroute 8.8.8.8) while connected directly to the modem. If it fails at the first hop, the issue is the modem or ISP physical line. If it fails a few hops in, the ISP&apos;s backbone is experiencing issues.",
  },
];

const faqs = [
  {
    question: "Why can I access the router login page but not the internet?",
    answer:
      "The router login page (at 192.168.1.1 or similar) is served from the router&apos;s own internal web server — it does not require internet connectivity at all. The router manages two separate connections: the LAN (local network, where your devices connect) and the WAN (the upstream connection to your modem/ISP). You can have a fully working LAN (and therefore reach the admin page) while the WAN connection is completely down. The admin page loading successfully actually helps narrow down the problem — it means your device-to-router connection is fine, and the issue is on the WAN side.",
  },
  {
    question: "What is PPPoE and why does it affect internet access?",
    answer:
      "PPPoE (Point-to-Point Protocol over Ethernet) is an authentication method used by many ISPs, particularly for DSL, ADSL, and VDSL connections. Your router must log into the ISP using PPPoE credentials (username and password provided by the ISP) before receiving a WAN IP address. If these credentials are wrong, expired, or the PPPoE session is not established, the router gets no WAN IP and therefore no internet — even though the admin page loads normally. PPPoE credentials are separate from your ISP account login.",
  },
  {
    question: "How do I know if my ISP is having an outage?",
    answer:
      "Connect a laptop or phone directly to your modem (bypassing the router) — if there is still no internet, the issue is outside your home. Check downdetector.com for your ISP&apos;s current outage reports. Check your ISP&apos;s official Twitter/X account or support page. Call the ISP support line from your mobile phone. If the modem&apos;s sync LED (typically labeled &apos;DS&apos; for downstream or &apos;Online&apos;) is not solid, the ISP signal has not been established — this is an ISP or physical line problem.",
  },
  {
    question: "My router has a valid WAN IP but still no internet. What next?",
    answer:
      "A valid WAN IP means the router successfully connected to the ISP. The remaining causes are: (1) DNS failure — test by running nslookup google.com in Command Prompt; if it fails, change DNS to 8.8.8.8; (2) firewall rules on the router blocking outbound traffic — check Security → Firewall in the admin panel; (3) MTU mismatch — try setting MTU to 1400 in WAN settings as a test; (4) MAC address filter on the ISP side — try cloning your PC&apos;s MAC to the router&apos;s WAN interface in the admin panel.",
  },
];

const commonCauses = [
  {
    title: "WAN Cable Not Connected",
    desc: "The Ethernet cable from the modem or ISP socket is unplugged from the router&apos;s WAN port or has a damaged connector.",
  },
  {
    title: "PPPoE Credentials Incorrect",
    desc: "For DSL connections, the ISP-provided username/password for PPPoE authentication is wrong or expired.",
  },
  {
    title: "DNS Server Failure",
    desc: "The ISP&apos;s DNS servers are down or slow, causing name resolution to fail even with a valid WAN IP.",
  },
  {
    title: "Modem Not Synced with ISP",
    desc: "The modem upstream has not established a connection with the ISP infrastructure — a modem power cycle is needed.",
  },
];

const quickFixChecklist = [
  "Check the WAN/Internet LED on the router — should be solid not blinking amber",
  "Re-seat the cable in the WAN port (globe icon) on the router",
  "Log into admin panel → Status page and confirm WAN IP is not 0.0.0.0",
  "Power cycle modem first (60s), then router (90s)",
  "For DSL: verify PPPoE username/password in WAN settings",
  "Change DNS to 1.1.1.1 and 8.8.8.8 in router WAN settings",
  "Bypass router, connect laptop directly to modem to test ISP link",
  "Check ISP outage page or call support line",
];

export default async function RouterNoInternetAfterLoginPage() {
  return (
    <TroubleshootingArticleShell
      h1="No Internet After Router Login? 7 WAN & ISP Fixes (2026)"
      intro="One of the most confusing network scenarios: your router admin page loads perfectly at 192.168.1.1, but nothing has internet access. This is a WAN-side problem — your local network is fine, but the upstream connection to your ISP is broken. This guide covers every scenario from physical cable failures and PPPoE authentication errors to DNS resolution failures and ISP outages, with step-by-step diagnostic commands."
      category="wifi"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "Router Admin Page Loading ≠ Internet Working",
        text: "The router login page at 192.168.1.1 is served locally by the router and does NOT require internet connectivity. If the admin page loads but you have no internet, the problem is specifically on the WAN/internet side — not your local network.",
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="Contact your ISP if: (1) the WAN LED remains off after multiple modem power cycles; (2) a laptop connected directly to the modem also has no internet; (3) the modem&apos;s downstream sync LED is off. These indicate an ISP-side or physical line problem that requires ISP intervention."
      severityLevel="high"
    >
      <div className="space-y-8">

        {/* Quick Answer */}
        <section
          className="glass-card p-5 border border-orange-950/30 bg-orange-950/5 rounded-2xl relative overflow-hidden"
          aria-label="Quick Answer: No Internet After Login"
        >
          <div className="absolute top-0 right-0 bg-orange-500/10 text-orange-400 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-bl-lg font-bold">
            AIO Quick Answer
          </div>
          <h3 className="text-xs font-bold text-orange-400 mb-2 uppercase tracking-wide">
            Why Does the Admin Page Load But There&apos;s No Internet?
          </h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            The router admin page is served locally — it does not need internet. When it loads but internet fails,
            the WAN connection is broken. Start by checking the WAN LED and Status page in the{" "}
            <Link href="/router-settings" className="text-[var(--brand-400)] hover:underline">
              router settings
            </Link>
            . Power cycle the modem first, then the router. For DSL connections, verify PPPoE credentials. If
            the WAN IP shows 0.0.0.0, the ISP connection is not established.
          </p>
        </section>

        {/* Scenarios Grid */}
        <section aria-label="No Internet Scenarios">
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">
            Diagnose Your Specific Scenario
          </h2>
          <div className="space-y-3">
            {[
              {
                title: "Scenario 1: Router has Internet LED OFF",
                color: "border-red-800/30 bg-red-900/5",
                symptom: "The WAN/Internet LED on the router is off, amber, or blinking red.",
                cause: "Physical connection failure — WAN cable disconnected, modem not powered, or ISP line down.",
                fix: "Re-seat the WAN cable. Power cycle modem (wait 60s) then router. If LED stays off, connect a laptop directly to the modem to test.",
              },
              {
                title: "Scenario 2: WAN Status Shows &apos;Disconnected&apos;",
                color: "border-amber-800/30 bg-amber-900/5",
                symptom: "Admin panel Status page shows WAN as Disconnected or WAN IP is 0.0.0.0.",
                cause: "Router cannot negotiate a WAN IP — ISP DHCP server not responding or wrong WAN type configured.",
                fix: "Navigate to WAN settings. Try clicking &apos;Connect&apos; or &apos;Renew&apos;. Verify the WAN connection type (DHCP, PPPoE, Static) matches your ISP.",
              },
              {
                title: "Scenario 3: PPPoE Authentication Failed",
                color: "border-orange-800/30 bg-orange-900/5",
                symptom: "Admin panel shows PPPoE Error or Authentication Failed in WAN status.",
                cause: "PPPoE username or password is incorrect, expired, or formatted wrongly.",
                fix: "Go to WAN → PPPoE settings. Re-enter credentials exactly as provided by ISP (case-sensitive, include @domain if required). Set MTU to 1492.",
              },
              {
                title: "Scenario 4: DNS Resolution Failure",
                color: "border-purple-800/30 bg-purple-900/5",
                symptom: "WAN IP is valid but websites do not load. Ping 8.8.8.8 works but ping google.com fails.",
                cause: "ISP DNS servers are unavailable or returning incorrect responses.",
                fix: "Change DNS to 1.1.1.1 / 8.8.8.8 in router WAN settings. Clear device DNS cache: ipconfig /flushdns.",
              },
              {
                title: "Scenario 5: ISP Outage or Physical Line Problem",
                color: "border-gray-700/30 bg-gray-900/5",
                symptom: "Everything looks correct but no internet. Modem sync LED is off.",
                cause: "ISP service disruption, fiber/coax/phone line damage, or modem hardware failure.",
                fix: "Bypass router, connect laptop directly to modem. Check ISP outage page. Call ISP support from mobile phone.",
              },
            ].map((item, i) => (
              <div key={i} className={`glass-card p-4 rounded-xl border ${item.color}`}>
                <h3 className="text-xs font-bold text-[var(--text-primary)] mb-2">{item.title}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                  <div>
                    <span className="text-[var(--text-muted)] block mb-0.5">Symptom</span>
                    <span className="text-[var(--text-secondary)]">{item.symptom}</span>
                  </div>
                  <div>
                    <span className="text-[var(--text-muted)] block mb-0.5">Cause</span>
                    <span className="text-amber-400">{item.cause}</span>
                  </div>
                  <div>
                    <span className="text-[var(--text-muted)] block mb-0.5">Fix</span>
                    <span className="text-green-400">{item.fix}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related links */}
        <RelatedGuides
          currentUrl="/router-no-internet-after-login"
          category="wifi"
          tags={["internet", "wan", "dns"]}
          maxItems={4}
        />

      </div>
    </TroubleshootingArticleShell>
  );
}
