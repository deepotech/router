import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import { JsonLd } from "@/lib/seo/schema";
import {
  Wifi,
  Lock,
  Globe,
  Shield,
  Settings,
  RefreshCw,
  AlertTriangle,
  ChevronRight,
  Cpu,
  Zap,
  Sliders,
  CheckCircle2,
  Network,
  Server,
  Info,
  ArrowRight,
  Gauge,
  Layers,
  HelpCircle,
  FileText,
  Star,
  Radio,
} from "lucide-react";

// =============================================================
// Premium SEO Metadata
// =============================================================

export const metadata: Metadata = buildMetadata({
  title: "Arris Router Login, Password, Reset & Setup Guide (2026)",
  description:
    "Complete guide to log in to Arris modem-routers at 192.168.0.1 or 192.168.100.1. Default passwords, LED indicator meanings, model specs for SBG, SVG, and SURFboard series, plus full troubleshooting.",
  canonical: "/routers/arris",
  keywords: [
    "arris router login",
    "arris default password",
    "arris modem router setup",
    "192.168.0.1 arris",
    "192.168.100.1 arris",
    "arris sbg router login",
    "arris surfboard login",
    "arris router admin",
    "arris router reset",
    "arris svg router",
    "arris router password",
    "arris modem troubleshooting",
  ],
});

// =============================================================
// Breadcrumbs
// =============================================================

const breadcrumbs = [
  { name: "Routers", url: "/routers" },
  { name: "Arris", url: "/routers/arris" },
];

// =============================================================
// Root Causes
// =============================================================

const commonCauses = [
  {
    title: "Dual IP Structure: 192.168.0.1 vs 192.168.100.1",
    desc: "Arris modem-routers have two separate admin interfaces. The router/Wi-Fi admin is at 192.168.0.1. The cable modem diagnostic interface (cable signal levels, upstream/downstream channels) is at 192.168.100.1. Many users confuse these two and access the wrong panel for their task.",
  },
  {
    title: "ISP-Locked Firmware Restrictions",
    desc: "Most Arris devices are deployed by ISPs (Comcast/Xfinity, Cox, Spectrum) with locked firmware that restricts certain settings. ISP-branded Arris units may have limited admin panels — the ISP controls core configuration remotely and only exposes basic Wi-Fi settings to end users.",
  },
  {
    title: "Custom Default Password Per Device",
    desc: "Unlike most routers with a single universal default password, many Arris modem-routers use a unique default password printed on the device label (often the last 8 characters of the serial number or MAC address). There is no single universal default.",
  },
  {
    title: "Double-NAT from ISP Modem-Router",
    desc: "If you add a separate router behind an Arris modem-router (common when upgrading to a better Wi-Fi router), you create a double-NAT situation where both devices perform NAT. This causes issues with port forwarding, VPN, and some online games. Enable bridge mode or DMZ on the Arris to resolve this.",
  },
];

// =============================================================
// Quick Fix Checklist
// =============================================================

const quickFixChecklist = [
  "Connect your device via Ethernet to a LAN port on the Arris device, or join the Arris Wi-Fi network.",
  "Navigate to http://192.168.0.1 to access the router/Wi-Fi admin panel, or http://192.168.100.1 for modem diagnostics.",
  "Check the sticker on the side or bottom of your Arris device for the model-specific default username and password.",
  "Common defaults: username 'admin' with password 'password', or username 'admin' with the last 8 digits of the serial number.",
  "Disable VPN clients and browser proxy settings before attempting to access the admin panel.",
  "To factory reset: press and hold the RESET button on the rear for 10-15 seconds until indicator lights cycle — then wait 2 minutes for full reboot.",
];

// =============================================================
// Diagnostic Steps
// =============================================================

const troubleshootingSteps = [
  {
    title: "Identify Your Arris Device's Admin IP",
    description:
      "Arris modem-routers have two separate interfaces. The Wi-Fi and router configuration panel is at http://192.168.0.1 (or sometimes 192.168.1.1 on some models). The cable modem status page showing DOCSIS signal levels and channel bonding info is at http://192.168.100.1. Connect via Ethernet to a LAN port and run 'ipconfig' in Windows to confirm your default gateway.",
    tip: "If your Arris device's label shows a default IP other than 192.168.0.1, use that exact IP. Some ISP-customized Arris units use non-standard subnets.",
  },
  {
    title: "Access the Arris Admin Panel",
    description:
      "Open your browser in Private/Incognito mode. Type http://192.168.0.1 in the address bar. The Arris login page will appear with username and password fields. The default credentials vary by model: most use 'admin' as the username. The password may be 'password', 'admin', or a unique code printed on the device label (often the last 8 characters of the serial number or a printed 'WiFi Password').",
    tip: "ISP-deployed Arris units (Comcast/Xfinity, Cox, Spectrum) often have their own custom login screens. The ISP tech support can provide the correct credentials or reset the admin panel access.",
  },
  {
    title: "Navigate Admin Settings and Configure Wi-Fi",
    description:
      "Once logged in, the Arris admin panel provides sections for: Basic Setup (WAN/internet type), Wireless (SSID name and password for 2.4GHz and 5GHz radios), Firewall (port forwarding, DMZ, IP filtering), Advanced (DHCP reservations, DNS, routing). Navigate to Wireless > Basic to change your Wi-Fi SSID and security key. Navigate to Wireless > Security to set WPA2 or WPA3 mode.",
    tip: "On ISP-locked Arris units, the admin panel may only show Wi-Fi settings with all other sections grayed out. Call your ISP to configure WAN, port forwarding, or bridge mode — they control these settings remotely.",
  },
  {
    title: "Verify Cable Signal Levels via Modem Status Page",
    description:
      "Navigate to http://192.168.100.1 (no login required on most Arris models) to view the modem's cable signal diagnostics. Check the Downstream tab for signal levels: downstream power should be between -7 dBmV and +7 dBmV, SNR should be above 30 dB. The Upstream tab should show power between 38 dBmV and 48 dBmV. Values outside these ranges indicate a cable signal problem — contact your ISP.",
    tip: "Consistently low downstream signal levels often indicate a faulty coaxial splitter, damaged cable, or a weak signal at the street junction. Request a line inspection from your ISP if signal levels are marginal.",
  },
];

// =============================================================
// FAQs
// =============================================================

const faqs = [
  {
    question: "What is the default IP address for Arris routers?",
    answer:
      "Arris modem-routers have two default IP addresses: (1) http://192.168.0.1 — the router and Wi-Fi admin interface for changing Wi-Fi settings, password, and firewall rules. (2) http://192.168.100.1 — the cable modem status page showing DOCSIS signal levels, channel bonding, and upstream/downstream diagnostics. No login is typically required for the 192.168.100.1 status page.",
  },
  {
    question: "What is the default username and password for Arris routers?",
    answer:
      "Arris default credentials vary by model: For most SBG and SVG series, the default username is 'admin' and the default password is 'password'. On some ISP-deployed models, the password is the last 8 digits of the serial number or a unique code printed on the label. Always check the physical sticker on your specific Arris unit. ISP-customized firmware may use different credentials — contact your ISP if defaults fail.",
  },
  {
    question: "How do I factory reset an Arris router?",
    answer:
      "To factory reset an Arris modem-router: (1) Ensure the unit is powered on. (2) Locate the RESET button (usually a recessed button on the back). (3) Press and hold using a paperclip for 10 to 15 seconds until the indicator lights cycle or blink. (4) Release and wait approximately 2 minutes for the full reboot to complete. All settings — including Wi-Fi SSID, password, admin password, and ISP provisioning data — will be reset. Note: after reset, the ISP may need to re-provision the modem.",
  },
  {
    question: "What is the Arris modem status page at 192.168.100.1?",
    answer:
      "The Arris modem status page at 192.168.100.1 is a diagnostic interface specific to DOCSIS cable modems. It shows: downstream signal levels (dBmV) and SNR (dB) for each bonded channel, upstream signal power levels, DOCSIS provisioning status, system event log, and hardware/firmware version info. This page usually requires no login and is accessible even without internet service. Technicians and advanced users use this to diagnose cable signal quality issues.",
  },
  {
    question: "How do I enable bridge mode on an Arris modem-router?",
    answer:
      "Enabling bridge mode on Arris disables the NAT/router function and converts the device to a pure cable modem, passing the public IP directly to your connected router. Steps: (1) Log in to the admin panel at 192.168.0.1. (2) Navigate to Basic Setup > WAN or Connection Type. (3) Select 'Bridge Mode' or 'Disable NAT'. (4) Click Save and reboot. Warning: bridge mode disables the Arris's built-in Wi-Fi and router. Your external router will now handle all routing, NAT, and Wi-Fi. Some ISP-locked Arris units require a call to the ISP to enable bridge mode.",
  },
  {
    question: "How do I fix slow internet on Arris modem-routers?",
    answer:
      "Slow internet on Arris can be caused by: (1) Poor cable signal — check 192.168.100.1 for signal levels outside acceptable ranges. (2) Outdated firmware — check for updates in the admin panel. (3) Overheating — ensure the unit has ventilation and is not stacked under other devices. (4) DOCSIS channel congestion during peak hours — this is an ISP infrastructure issue; contact your provider. (5) Wi-Fi interference — change channels in the Wireless settings from auto to a manually selected less-congested channel.",
  },
  {
    question: "What is the difference between Arris SBG and SVG series?",
    answer:
      "Arris SBG (SURFboard Gateway) units are DOCSIS cable modem-routers with integrated Wi-Fi for residential cable broadband. Arris SVG (Telephony Gateway) units add a built-in cable phone (VoIP) adapter, making them a 3-in-1 cable modem + router + phone. SVG units have additional RJ-11 telephone ports. Both series support Wi-Fi 5 (AC) and newer models support Wi-Fi 6 (AX). If you don't use cable phone service, the SBG is functionally equivalent to SVG.",
  },
  {
    question: "Does Arris support port forwarding?",
    answer:
      "Yes, Arris modem-routers support port forwarding (called 'Port Triggers' or 'Port Forwarding' in the admin panel). Navigate to Firewall > Port Forwarding in the admin panel at 192.168.0.1. Add a rule specifying the external port, protocol (TCP/UDP), and the internal IP of the target device. Note: first assign a static DHCP reservation to the target device to ensure its IP doesn't change. ISP-locked firmware may restrict or disable port forwarding — call your ISP if the option is grayed out.",
  },
  {
    question: "How do I update Arris firmware?",
    answer:
      "Most Arris ISP-deployed modem-routers receive firmware updates automatically from the ISP's provisioning servers — you cannot manually trigger or control these updates. The ISP pushes firmware overnight during low-traffic periods. For retail Arris units (purchased independently): log in to the admin panel, navigate to Advanced > Firmware Update, check for updates online, or download from Arris's support website and upload manually. Do not interrupt power during firmware update.",
  },
  {
    question: "Why can't I access some settings on my Arris router?",
    answer:
      "Most Arris modem-routers deployed by ISPs (Comcast/Xfinity, Cox, Spectrum, Charter) have restricted admin panels with locked firmware. The ISP intentionally limits what you can configure — typically showing only Wi-Fi SSID and password settings, hiding advanced options like VLAN, WAN configuration, bridge mode, and port forwarding. To access these features, you must contact your ISP, or purchase your own retail Arris unit (unlocked) that is compatible with your ISP's DOCSIS certification.",
  },
];

// =============================================================
// JSON-LD Schema
// =============================================================

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://routervia.com/routers/arris#collection",
  url: "https://routervia.com/routers/arris",
  name: "Arris Router Hub: Login, Password, Setup & Troubleshooting",
  description:
    "Complete guide to Arris modem-router login at 192.168.0.1. Default credentials, modem status page at 192.168.100.1, LED diagnostics, bridge mode, port forwarding, and factory reset.",
  mainEntity: {
    "@type": "ItemList",
    name: "Arris Modem-Router Product Lines",
    numberOfItems: 3,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Arris SBG Series (SURFboard Gateway)",
        description: "DOCSIS cable modem + Wi-Fi router combo units for residential cable broadband.",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Arris SVG Series (Telephony Gateway)",
        description: "Cable modem + Wi-Fi router + VoIP phone adapter in one unit.",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Arris SB Series (SURFboard Modems)",
        description: "Standalone DOCSIS cable modems without integrated Wi-Fi or router.",
      },
    ],
  },
};

// =============================================================
// 1. Login Addresses
// =============================================================

const loginAddresses = [
  {
    address: "192.168.0.1",
    usage: "Router / Wi-Fi admin panel",
    notes: "Primary admin interface for changing Wi-Fi SSID, password, firewall, and routing settings.",
  },
  {
    address: "192.168.100.1",
    usage: "Cable modem status page",
    notes: "DOCSIS diagnostic page showing signal levels, channel bonding, and event log. Usually no login required.",
  },
  {
    address: "192.168.1.1",
    usage: "Some ISP-customized Arris units",
    notes: "Used on select ISP-deployed Arris configurations. Check your device label.",
  },
];

// =============================================================
// 2. Arris Models Table
// =============================================================

const arrisModels = [
  {
    model: "Arris SBG6580",
    type: "DOCSIS 3.0 Gateway",
    standard: "Wi-Fi 4 (N)",
    highlight: "8×4 DOCSIS 3.0, dual-band N450, 4x GbE LAN",
  },
  {
    model: "Arris SBG7400AC2",
    type: "DOCSIS 3.0 Gateway",
    standard: "Wi-Fi 5 (AC2350)",
    highlight: "32×8 DOCSIS 3.0, MU-MIMO, 1.6GHz dual-core CPU",
  },
  {
    model: "Arris SBG8300",
    type: "DOCSIS 3.1 Gateway",
    standard: "Wi-Fi 5 (AC3200)",
    highlight: "DOCSIS 3.1, tri-band AC3200, 4x GbE, USB 3.0",
  },
  {
    model: "Arris SBG10",
    type: "DOCSIS 3.0 Gateway",
    standard: "Wi-Fi 5 (AC1600)",
    highlight: "Compact, 16×4 DOCSIS 3.0, dual-band AC1600",
  },
  {
    model: "Arris SVG2482AC",
    type: "Telephony Gateway",
    standard: "Wi-Fi 5 (AC2350)",
    highlight: "DOCSIS 3.0 + VoIP, dual-band AC2350, 2 phone lines",
  },
  {
    model: "Arris SBG10-RB",
    type: "DOCSIS 3.0 Gateway",
    standard: "Wi-Fi 5 (AC1600)",
    highlight: "Retail DOCSIS 3.0, 400 Mbps downstream, budget combo",
  },
  {
    model: "Arris S33",
    type: "DOCSIS 3.1 Modem",
    standard: "Modem only (no Wi-Fi)",
    highlight: "DOCSIS 3.1, 2.5G Ethernet port, multi-gig cable speeds",
  },
];

// =============================================================
// 3. LED Status Meanings
// =============================================================

const ledStatuses = [
  {
    name: "Power LED",
    status: "Solid Green",
    meaning: "Device has power and is fully operational.",
  },
  {
    name: "Power LED",
    status: "Blinking Green",
    meaning: "Device is booting up or performing a firmware update. Do not unplug.",
  },
  {
    name: "DS (Downstream) LED",
    status: "Solid Blue / Green",
    meaning: "Downstream DOCSIS channels are locked and bonded — maximum speed mode.",
  },
  {
    name: "DS (Downstream) LED",
    status: "Blinking Green",
    meaning: "Modem is scanning for downstream DOCSIS channels. Normal during startup.",
  },
  {
    name: "US (Upstream) LED",
    status: "Solid Blue / Green",
    meaning: "Upstream channels bonded and modem is registered with the ISP head-end.",
  },
  {
    name: "Online LED",
    status: "Solid Green",
    meaning: "Modem is fully provisioned and internet is available.",
  },
  {
    name: "Online LED",
    status: "Blinking Green",
    meaning: "Modem is in the registration/provisioning process with the ISP. Normal during startup.",
  },
  {
    name: "2.4 / 5 GHz Wi-Fi LED",
    status: "Off",
    meaning: "Wireless radio is disabled. Enable via admin panel > Wireless Settings.",
  },
];

// =============================================================
// 4. Arris vs Netgear vs TP-Link Comparison
// =============================================================

const comparisonRows = [
  {
    feature: "Device Type",
    arris: "Cable Modem-Router (DOCSIS)",
    netgear: "Standalone Router / Cable Modem-Router",
    tplink: "Standalone Wi-Fi Router",
  },
  {
    feature: "Default Login IP",
    arris: "192.168.0.1",
    netgear: "192.168.1.1 / routerlogin.net",
    tplink: "192.168.0.1 / tplinkwifi.net",
  },
  {
    feature: "Modem Status Page",
    arris: "192.168.100.1 (DOCSIS diagnostics)",
    netgear: "N/A (router only)",
    tplink: "N/A (router only)",
  },
  {
    feature: "ISP Deployment",
    arris: "Very common (Comcast, Cox, Spectrum)",
    netgear: "Common (Nighthawk CM series)",
    tplink: "Rare (mostly retail)",
  },
  {
    feature: "Bridge Mode",
    arris: "Yes (may require ISP unlock)",
    netgear: "Yes (CM/CAX series)",
    tplink: "N/A (not a modem)",
  },
  {
    feature: "Best For",
    arris: "Cable broadband subscribers (all-in-one)",
    netgear: "Performance broadband users",
    tplink: "General home Wi-Fi routing",
  },
];

// =============================================================
// Page Component
// =============================================================

export default function ArrisRouterHubPage() {
  return (
    <>
      <JsonLd data={collectionPageSchema} />

      <TroubleshootingArticleShell
        h1="Arris Router & Modem Login, Password, Setup & Troubleshooting Guide"
        intro="Arris is a leading manufacturer of cable broadband modems and modem-router combo gateways, widely deployed by major ISPs including Comcast/Xfinity, Cox, Spectrum, and Charter. The Arris SURFboard (SBG) series integrates a DOCSIS cable modem with a Wi-Fi router and Ethernet switch in a single unit, eliminating the need for separate modem and router devices. Arris devices use 192.168.0.1 for the router and Wi-Fi admin panel, and a separate diagnostic interface at 192.168.100.1 for DOCSIS cable signal monitoring. This guide explains how to log in to Arris routers, find default passwords, understand LED indicators, configure bridge mode, enable port forwarding, interpret cable signal levels, and perform factory resets."
        category="wifi"
        breadcrumbs={breadcrumbs}
        faqs={faqs}
        troubleshootingSteps={troubleshootingSteps}
        warningBanner={{
          title: "ISP-Locked Units: Some Settings Require ISP Support",
          text: "Most Arris devices deployed by ISPs have restricted admin panels with locked firmware. Advanced features like bridge mode, port forwarding, and WAN configuration may be grayed out or hidden. Contact your ISP's technical support team to enable these features, or purchase an unlocked retail Arris unit from a third-party seller.",
        }}
        quickFixChecklist={quickFixChecklist}
        commonCauses={commonCauses}
        whenToContactISP="If your Arris modem's Online LED is blinking but never turns solid green after 5+ minutes, the modem may have failed DOCSIS provisioning. This means the ISP's head-end cannot authenticate or provision your modem. Call your ISP with your modem's MAC address (on the label) to verify it is registered on your account and its firmware is up to date on the ISP's system."
        severityLevel="medium"
      >
        <div className="space-y-12">
          {/* FEATURED SNIPPET */}
          <section
            className="glass-card p-6 border border-green-950/20 bg-green-950/5 rounded-2xl relative overflow-hidden space-y-4"
            aria-label="How to Login to an Arris Router"
          >
            <div className="absolute top-0 right-0 bg-green-500/10 text-green-400 text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-bl-lg font-bold">
              Featured Snippet
            </div>
            <h2 className="text-sm font-bold text-green-400 uppercase tracking-wide flex items-center gap-1.5">
              <Zap size={16} /> How to Login to an Arris Modem-Router
            </h2>
            <div className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
              <p className="mb-3">
                Follow these exact steps to access your Arris SBG or SVG admin panel:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-xs text-[var(--text-secondary)] font-medium">
                <li>
                  <strong>Connect via Ethernet:</strong> Plug a cable into one of the LAN ports on the Arris device, or join its Wi-Fi network.
                </li>
                <li>
                  <strong>Open your browser:</strong> Use Chrome or Edge in Private/Incognito mode.
                </li>
                <li>
                  <strong>Go to admin panel:</strong> Type{" "}
                  <Link href="/ips/192-168-0-1" className="text-green-400 hover:underline font-mono">
                    http://192.168.0.1
                  </Link>{" "}
                  in the URL bar. For cable diagnostics only, use{" "}
                  <strong className="font-mono">http://192.168.100.1</strong>.
                </li>
                <li>
                  <strong>Enter credentials:</strong> Default username: <code>admin</code> — Default password: <code>password</code> (or check the sticker on your device for a unique password).
                </li>
                <li>
                  <strong>Configure settings:</strong> Manage Wi-Fi (SSID & password), port forwarding, firewall, and DHCP reservations from the main dashboard.
                </li>
              </ol>
            </div>
          </section>

          {/* 1. LOGIN ADDRESSES */}
          <section className="space-y-4" id="login-addresses" aria-label="Arris Login Addresses">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Globe size={18} className="text-green-400" />
              1. Arris Router & Modem Login Addresses
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Arris modem-routers have two distinct admin interfaces — one for router/Wi-Fi settings and one for DOCSIS cable modem diagnostics.
            </p>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-green-500/10 text-green-300 text-left">
                    <th className="px-4 py-3 font-semibold">Address</th>
                    <th className="px-4 py-3 font-semibold">Function</th>
                    <th className="px-4 py-3 font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {loginAddresses.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}>
                      <td className="px-4 py-3 font-mono text-green-300 font-semibold">
                        {row.address === "192.168.0.1" ? (
                          <Link href="/ips/192-168-0-1" className="hover:underline">192.168.0.1</Link>
                        ) : row.address === "192.168.1.1" ? (
                          <Link href="/ips/192-168-1-1" className="hover:underline">192.168.1.1</Link>
                        ) : row.address}
                      </td>
                      <td className="px-4 py-3">{row.usage}</td>
                      <td className="px-4 py-3 text-[var(--text-tertiary)]">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 2. MODELS TABLE */}
          <section className="space-y-4" id="models-lookup" aria-label="Arris Models">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Layers size={18} className="text-green-400" />
              2. Arris Modem-Router Models Specifications
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Find your specific Arris SBG or SVG model below to check its DOCSIS version, Wi-Fi standard, and included features.
            </p>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-green-500/10 text-green-300 text-left">
                    <th className="px-4 py-3 font-semibold">Model</th>
                    <th className="px-4 py-3 font-semibold">Type</th>
                    <th className="px-4 py-3 font-semibold">Wi-Fi Standard</th>
                    <th className="px-4 py-3 font-semibold">Key Features</th>
                  </tr>
                </thead>
                <tbody>
                  {arrisModels.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}>
                      <td className="px-4 py-3 font-semibold text-green-300">{row.model}</td>
                      <td className="px-4 py-3">{row.type}</td>
                      <td className="px-4 py-3 font-mono text-xs">{row.standard}</td>
                      <td className="px-4 py-3 text-[var(--text-tertiary)]">{row.highlight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 3. LED STATUS */}
          <section className="space-y-4" id="led-meanings" aria-label="Arris LED Meanings">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Sliders size={18} className="text-green-400" />
              3. Arris Modem LED Status Meanings
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Use the LED diagnostic table below to understand what each indicator light on your Arris modem-router is communicating.
            </p>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-green-500/10 text-green-300 text-left">
                    <th className="px-4 py-3 font-semibold">LED Indicator</th>
                    <th className="px-4 py-3 font-semibold">State</th>
                    <th className="px-4 py-3 font-semibold">Meaning & Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ledStatuses.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}>
                      <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">{row.name}</td>
                      <td className="px-4 py-3 font-mono text-green-300 font-semibold">{row.status}</td>
                      <td className="px-4 py-3 text-[var(--text-tertiary)]">{row.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 4. COMPARISON */}
          <section className="space-y-4" id="comparison" aria-label="Arris vs Netgear vs TP-Link">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Cpu size={18} className="text-green-400" />
              4. Device Comparison: Arris vs. Netgear vs. TP-Link
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Arris serves a distinct niche as a cable modem-router. Compare it against standalone router brands below to understand the key operational differences.
            </p>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-green-500/10 text-green-300 text-left">
                    <th className="px-4 py-3 font-semibold">Feature</th>
                    <th className="px-4 py-3 font-semibold">Arris</th>
                    <th className="px-4 py-3 font-semibold">Netgear</th>
                    <th className="px-4 py-3 font-semibold">TP-Link</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}>
                      <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">{row.feature}</td>
                      <td className="px-4 py-3 text-green-300">{row.arris}</td>
                      <td className="px-4 py-3">{row.netgear}</td>
                      <td className="px-4 py-3 text-[var(--text-tertiary)]">{row.tplink}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* DOCSIS SIGNAL GUIDE */}
          <section className="space-y-4" id="docsis-signals" aria-label="Arris DOCSIS Signal Guide">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Radio size={18} className="text-green-400" />
              Arris Cable Signal Level Reference Guide
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Access the DOCSIS signal status page at <strong className="font-mono text-green-400">http://192.168.100.1</strong> to view your cable signal levels. Use the reference values below to assess your signal quality.
            </p>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-xs text-[var(--text-secondary)]">
                <thead>
                  <tr className="bg-green-500/10 text-green-300 text-left">
                    <th className="px-4 py-3 font-semibold">Parameter</th>
                    <th className="px-4 py-3 font-semibold">Acceptable Range</th>
                    <th className="px-4 py-3 font-semibold">Optimal Range</th>
                    <th className="px-4 py-3 font-semibold">Action if Outside Range</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { param: "Downstream Power", acceptable: "-15 to +15 dBmV", optimal: "-7 to +7 dBmV", action: "Check coaxial cable and splitters for signal loss" },
                    { param: "Downstream SNR", acceptable: "Above 25 dB", optimal: "Above 33 dB", action: "Low SNR indicates cable noise — contact ISP for line inspection" },
                    { param: "Upstream Power", acceptable: "38 to 55 dBmV", optimal: "40 to 48 dBmV", action: "High upstream power = signal loss upstream; inspect cable path" },
                    { param: "Downstream Channels", acceptable: "4+ bonded channels", optimal: "8-32 bonded (DOCSIS 3.0)", action: "Few channels = weak signal or modem issue — restart modem" },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}>
                      <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">{row.param}</td>
                      <td className="px-4 py-3">{row.acceptable}</td>
                      <td className="px-4 py-3 text-green-300 font-mono font-semibold">{row.optimal}</td>
                      <td className="px-4 py-3 text-[var(--text-tertiary)]">{row.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </TroubleshootingArticleShell>
    </>
  );
}
