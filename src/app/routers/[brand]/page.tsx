import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Wifi,
  Lock,
  Globe,
  Shield,
  Settings,
  RefreshCw,
  AlertTriangle,
  ChevronRight,
  Link2,
  Cpu,
} from "lucide-react";
import { RouterService } from "@/server/services/router.service";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import {
  JsonLd,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";
import { hasDatabase } from "@/lib/server/env-safe";

// ─── Per-brand static SEO data ────────────────────────────────────────────────

interface BrandStaticData {
  loginIps: string[];
  altUrl?: string;
  defaultUsername: string;
  defaultPassword: string;
  adminPath: string;
  tagline: string;
  marketPosition: string;
  bestKnownFor: string;
  troubleshootingSteps: string[];
  firmwareTip: string;
  securityChecklist: string[];
  faqs: { question: string; answer: string }[];
}

const BRAND_DATA: Record<string, BrandStaticData> = {
  "tp-link": {
    loginIps: ["192.168.0.1", "192.168.1.1"],
    altUrl: "tplinkwifi.net",
    defaultUsername: "admin",
    defaultPassword: "admin",
    adminPath: "/",
    tagline: "Global leader in home & SMB networking equipment",
    marketPosition: "#1 Global Wi-Fi Router Market Share",
    bestKnownFor: "Archer & Deco series, value-for-money Wi-Fi 6/7 routers",
    troubleshootingSteps: [
      "Open a browser and go to 192.168.0.1 or tplinkwifi.net",
      "Enter username: admin and password: admin (or check the label on your router)",
      "If login fails, try 192.168.1.1 as the alternate gateway",
      "Ensure your device is connected to the TP-Link Wi-Fi or via Ethernet",
      "If the admin page doesn't load, disable VPN and browser extensions",
      "For a forgotten password, press the Reset button for 10 seconds to factory reset",
    ],
    firmwareTip:
      "TP-Link firmware updates are available at tp-link.com/support. Log in to your admin panel → Advanced → System Tools → Firmware Upgrade. Enable auto-update for Archer AX/BE series running firmware 1.3+.",
    securityChecklist: [
      "Change admin password from default 'admin'",
      "Set a strong WPA3 or WPA2 Wi-Fi password",
      "Disable WPS if not in use",
      "Enable TP-Link HomeCare or TP-Link Shield parental controls",
      "Update firmware to the latest version",
      "Disable remote management unless required",
    ],
    faqs: [
      {
        question: "What is the default IP address for TP-Link routers?",
        answer:
          "The default login IP for most TP-Link routers is 192.168.0.1. You can also use the domain tplinkwifi.net. Older models may use 192.168.1.1.",
      },
      {
        question: "What are the default TP-Link username and password?",
        answer:
          "The default username is 'admin' and the default password is 'admin'. Some newer models prompt you to create a password during the first setup.",
      },
      {
        question: "How do I reset a TP-Link router to factory settings?",
        answer:
          "While the router is powered on, press and hold the Reset button (small pinhole on the back) for 10 seconds until the LED flashes. The router will reboot with factory default settings.",
      },
      {
        question: "Can I access my TP-Link router from my phone?",
        answer:
          "Yes. Download the TP-Link Tether app (iOS/Android). Connect your phone to the TP-Link Wi-Fi and use the app to manage settings without opening a browser.",
      },
      {
        question: "Why can't I access 192.168.0.1 on my TP-Link router?",
        answer:
          "Ensure your device is connected to the TP-Link network (not a different Wi-Fi). Disable any VPN. Try using tplinkwifi.net. If still failing, try 192.168.1.1. If none work, do a factory reset.",
      },
      {
        question: "Does TP-Link support Wi-Fi 6?",
        answer:
          "Yes. The Archer AX series (AX55, AX73, AX90) and Deco series (XE75, XE200) support Wi-Fi 6 and Wi-Fi 6E. The Archer BE series supports Wi-Fi 7.",
      },
      {
        question: "How do I update TP-Link firmware?",
        answer:
          "Log in to 192.168.0.1, navigate to Advanced → System Tools → Firmware Upgrade, and click Check for Updates. Alternatively, download the firmware manually from tp-link.com/support.",
      },
      {
        question: "What is tplinkwifi.net used for?",
        answer:
          "tplinkwifi.net is the official web address for accessing your TP-Link router's admin panel. It resolves to the router's local IP address (192.168.0.1) when you're connected to the TP-Link network.",
      },
    ],
  },
  asus: {
    loginIps: ["192.168.50.1", "192.168.1.1"],
    altUrl: "router.asus.com",
    defaultUsername: "admin",
    defaultPassword: "admin",
    adminPath: "/",
    tagline: "Premium Wi-Fi routers for gaming, mesh, and power users",
    marketPosition: "Top Premium & Gaming Router Brand",
    bestKnownFor: "ROG Rapture gaming routers, ZenWiFi mesh, AiMesh",
    troubleshootingSteps: [
      "Open a browser and go to router.asus.com or 192.168.50.1",
      "Enter username: admin and password: admin",
      "If that fails, check your router's label for credentials set during setup",
      "Ensure you are connected to the ASUS Wi-Fi or via Ethernet cable",
      "Disable VPN and try a different browser if the page doesn't load",
      "For a forgotten password, hold the Reset button for 10 seconds",
    ],
    firmwareTip:
      "ASUS releases regular AiProtection and Merlin-compatible firmware. In the admin panel go to Administration → Firmware Upgrade. For advanced users, Asuswrt-Merlin provides extra features and security patches.",
    securityChecklist: [
      "Change the default admin password immediately",
      "Enable AiProtection (Trend Micro powered) for malware blocking",
      "Set Wi-Fi password to WPA3-Personal if all devices support it",
      "Disable WPS unless actively pairing a device",
      "Enable router firewall: Firewall → General → Enable Firewall",
      "Update firmware regularly — ASUS patches security CVEs frequently",
    ],
    faqs: [
      {
        question: "What is the default IP address for ASUS routers?",
        answer:
          "The default login IP for ASUS routers is 192.168.50.1. You can also use router.asus.com. Some older ASUS models use 192.168.1.1.",
      },
      {
        question: "What are the default ASUS router credentials?",
        answer:
          "The default username and password are both 'admin'. You will be prompted to change the password during the Quick Setup wizard on first boot.",
      },
      {
        question: "What is AiMesh on ASUS routers?",
        answer:
          "AiMesh is ASUS's proprietary mesh Wi-Fi system that lets you combine multiple ASUS routers into a single seamless network. It's managed from the main router's admin panel.",
      },
      {
        question: "How do I access the ASUS ROG router admin panel?",
        answer:
          "Connect to your ROG router network, then open a browser and go to router.asus.com or 192.168.50.1. The gaming dashboard (ROG UI) is available on ROG Rapture models.",
      },
      {
        question: "How do I reset an ASUS router?",
        answer:
          "With the router powered on, press and hold the Reset button for 10 seconds until the power LED starts blinking. The router will reboot to factory defaults.",
      },
      {
        question: "Does ASUS support Wi-Fi 7?",
        answer:
          "Yes. The ASUS ROG Rapture GT-BE98 and ZenWiFi BQ16 Pro support Wi-Fi 7 (802.11be) with up to 19 Gbps combined throughput and MLO technology.",
      },
      {
        question: "What is ASUS AiProtection?",
        answer:
          "AiProtection is a free network security suite powered by Trend Micro, built into most ASUS routers. It blocks malicious websites, prevents unauthorized access, and scans for vulnerable devices on your network.",
      },
      {
        question: "How do I update ASUS router firmware?",
        answer:
          "Log in to router.asus.com → Administration → Firmware Upgrade → Check. ASUS also supports auto-update. For ROG and ZenWiFi models, use the ASUS Router app for OTA updates.",
      },
    ],
  },
  netgear: {
    loginIps: ["192.168.1.1", "192.168.0.1"],
    altUrl: "routerlogin.net",
    defaultUsername: "admin",
    defaultPassword: "password",
    adminPath: "/",
    tagline: "High-performance Nighthawk & Orbi mesh routers",
    marketPosition: "Top Premium Home & Prosumer Brand (USA)",
    bestKnownFor: "Nighthawk gaming routers, Orbi mesh Wi-Fi systems",
    troubleshootingSteps: [
      "Open a browser and go to routerlogin.net or 192.168.1.1",
      "Enter username: admin and password: password (default)",
      "If the page doesn't load, try 192.168.0.1 as an alternate IP",
      "Make sure your device is connected to the Netgear network",
      "Clear browser cache or try Incognito mode",
      "If credentials don't work, press the Reset button for 7–10 seconds",
    ],
    firmwareTip:
      "Netgear releases firmware via the Nighthawk or Orbi app, or through routerlogin.net → Advanced → Router Update. Enable auto-update in Netgear Armor for the fastest security patches.",
    securityChecklist: [
      "Change the default password from 'password' immediately",
      "Enable Netgear Armor (Bitdefender-powered) for cyber threat protection",
      "Disable WPS after pairing devices",
      "Use WPA3 security for Wi-Fi if your devices support it",
      "Enable the built-in firewall under Advanced → Security",
      "Regularly check for firmware updates",
    ],
    faqs: [
      {
        question: "What is the default IP address for Netgear routers?",
        answer:
          "Most Netgear routers use 192.168.1.1 as the default gateway. You can also use routerlogin.net. Some Orbi models use 192.168.1.1 or 192.168.0.1.",
      },
      {
        question: "What are the default Netgear credentials?",
        answer:
          "The default username is 'admin' and the default password is 'password'. You should change this immediately after the first login.",
      },
      {
        question: "How do I reset a Netgear router?",
        answer:
          "With the router powered on, use a pin to press and hold the Reset button for 7 seconds until the Power LED blinks amber. The router restores factory defaults and reboots.",
      },
      {
        question: "What is Netgear Orbi?",
        answer:
          "Netgear Orbi is a premium tri-band mesh Wi-Fi system that uses a dedicated backhaul band to maintain maximum speeds between satellite nodes. The Orbi 960 series supports Wi-Fi 6E.",
      },
      {
        question: "What is the Nighthawk app used for?",
        answer:
          "The Netgear Nighthawk app lets you set up, manage, and monitor your Nighthawk router from your smartphone. It includes speed tests, device management, and parental controls.",
      },
      {
        question: "Does Netgear support Wi-Fi 6E?",
        answer:
          "Yes. Netgear Orbi 960 (RBK963S), Orbi 960X, and Nighthawk RAXE500 support Wi-Fi 6E (6 GHz band) for ultra-fast, low-interference connections.",
      },
      {
        question: "How do I update Netgear firmware?",
        answer:
          "Log in to routerlogin.net → Advanced → Administration → Firmware Update → Check. Alternatively use the Nighthawk or Orbi app for automatic OTA updates.",
      },
      {
        question: "Why is routerlogin.net not working?",
        answer:
          "Ensure you are connected to the Netgear network (not a different Wi-Fi or VPN). Try using 192.168.1.1 directly. Clear browser cache. If still failing, do a factory reset and reconfigure.",
      },
    ],
  },
  huawei: {
    loginIps: ["192.168.100.1", "192.168.3.1"],
    defaultUsername: "telecomadmin",
    defaultPassword: "admintelecom",
    adminPath: "/",
    tagline: "Enterprise-grade ISP and fiber gateway routers",
    marketPosition: "Global ISP & Fiber Router Leader",
    bestKnownFor: "ONT/ONU fiber gateways, ISP-deployed home routers",
    troubleshootingSteps: [
      "Open a browser and go to 192.168.100.1 (or 192.168.3.1 for newer models)",
      "For ISP-deployed routers try username: telecomadmin, password: admintelecom",
      "Some Huawei routers use: admin / admin or admin / (blank)",
      "Check the label on the back of your router for exact credentials",
      "If the login page doesn't load, make sure you're connected via Ethernet or the Huawei Wi-Fi",
      "For a factory reset, press and hold the Reset button for 15 seconds",
    ],
    firmwareTip:
      "Huawei fiber gateways (ONTs) are often updated remotely by your ISP via TR-069. For HiLink-compatible home routers, use the Huawei AI Life app or log in to the admin panel under Maintenance → Software Upgrade.",
    securityChecklist: [
      "Change the telecomadmin password from the default",
      "Set a strong Wi-Fi password (WPA2 minimum)",
      "Disable remote management if not needed by your ISP",
      "Check for firmware updates in the Maintenance section",
      "Enable MAC address filtering for extra security",
      "Disable UPnP unless required by specific applications",
    ],
    faqs: [
      {
        question: "What is the default IP for Huawei routers?",
        answer:
          "Most Huawei ISP fiber gateways use 192.168.100.1. Newer Huawei home routers (HiLink series) typically use 192.168.3.1.",
      },
      {
        question: "What are the default Huawei router credentials?",
        answer:
          "ISP-deployed Huawei ONTs typically use telecomadmin / admintelecom. HiLink home routers often use admin / admin. Always check the label on your device first.",
      },
      {
        question: "How do I reset a Huawei router?",
        answer:
          "Press and hold the Reset button for 15 seconds while the router is powered on. All LEDs will flash and the device will reboot with factory settings.",
      },
      {
        question: "What is the Huawei AI Life app?",
        answer:
          "Huawei AI Life is the official management app for HiLink-compatible Huawei routers. It allows you to configure Wi-Fi, manage connected devices, run network tests, and update firmware.",
      },
      {
        question: "Why can't I log in to 192.168.100.1?",
        answer:
          "Ensure you are connected to the Huawei router's network. The ISP may have locked access to the telecomadmin account. Try the 'user' account with the password on the router label.",
      },
      {
        question: "Does Huawei offer Wi-Fi 6 routers?",
        answer:
          "Yes. The Huawei AX3, AX3 Pro, BE3 Pro, and Mesh 7 support Wi-Fi 6 and Wi-Fi 6+. The BE series supports Wi-Fi 7.",
      },
      {
        question: "Can I change settings on an ISP-locked Huawei router?",
        answer:
          "ISP-deployed Huawei ONTs restrict certain settings via a 'user' account. The telecomadmin account has full access. If locked out, contact your ISP or use the user account for basic Wi-Fi settings.",
      },
      {
        question: "How do I update Huawei router firmware?",
        answer:
          "For ISP gateways, updates are pushed remotely by the ISP. For HiLink routers, open the Huawei AI Life app or go to the admin panel → Maintenance → Software Upgrade → Check for Updates.",
      },
    ],
  },
  "d-link": {
    loginIps: ["192.168.0.1", "192.168.1.1"],
    altUrl: "dlinkrouter.local",
    defaultUsername: "Admin",
    defaultPassword: "(blank)",
    adminPath: "/",
    tagline: "Reliable home and SMB networking equipment",
    marketPosition: "Established Global Networking Brand",
    bestKnownFor: "DIR Archer routers, EAGLE PRO AI series, COVR mesh",
    troubleshootingSteps: [
      "Open a browser and go to 192.168.0.1 or dlinkrouter.local",
      "Enter username: Admin (capital A) and leave the password blank",
      "Some newer models prompt you to set a password during initial setup",
      "Make sure your device is connected to the D-Link Wi-Fi or via Ethernet",
      "If the login page doesn't appear, try 192.168.1.1",
      "If credentials fail, press and hold the Reset button for 10 seconds",
    ],
    firmwareTip:
      "D-Link firmware updates are at support.dlink.com. In the admin panel go to Management → Upgrade. The D-Link WiFi app provides push notifications for new firmware on EAGLE PRO AI models.",
    securityChecklist: [
      "Set an admin password on first login (default is blank)",
      "Change the default Wi-Fi password from the label",
      "Disable WPS after device pairing",
      "Enable D-Link's SPI firewall under Security settings",
      "Update firmware regularly from support.dlink.com",
      "Disable remote access management if not needed",
    ],
    faqs: [
      {
        question: "What is the default IP for D-Link routers?",
        answer:
          "Most D-Link routers use 192.168.0.1 as the default gateway. You can also use dlinkrouter.local. Some models use 192.168.1.1.",
      },
      {
        question: "What are the default D-Link credentials?",
        answer:
          "The default username is 'Admin' (with a capital A). The default password field is left blank — just click Login without entering a password.",
      },
      {
        question: "How do I reset a D-Link router?",
        answer:
          "With the router powered on, press and hold the Reset button for 10 seconds until the LED blinks. The router reboots to factory defaults.",
      },
      {
        question: "What is the D-Link EAGLE PRO AI?",
        answer:
          "EAGLE PRO AI is D-Link's smart Wi-Fi router series using AI-powered traffic optimization to automatically manage bandwidth and minimize latency.",
      },
      {
        question: "Does D-Link support Wi-Fi 6?",
        answer:
          "Yes. D-Link's EAGLE PRO AI AX3200, DIR-X5460, and COVR-X1872 support Wi-Fi 6. The AXE series supports Wi-Fi 6E.",
      },
      {
        question: "How do I update D-Link firmware?",
        answer:
          "Log in to 192.168.0.1 → Management → Upgrade Firmware → Check Online. Or download the firmware manually from support.dlink.com and upload it via the manual upgrade option.",
      },
      {
        question: "Why is dlinkrouter.local not working?",
        answer:
          "dlinkrouter.local uses mDNS which some browsers block. Try using 192.168.0.1 directly instead. Disable VPN before attempting to access the admin panel.",
      },
      {
        question: "Can I use the D-Link WiFi app?",
        answer:
          "Yes. The D-Link WiFi app (iOS and Android) manages compatible D-Link routers and mesh systems. It includes network maps, device prioritization, and firmware update alerts.",
      },
    ],
  },
  zte: {
    loginIps: ["192.168.1.1", "192.168.0.1"],
    defaultUsername: "admin",
    defaultPassword: "admin",
    adminPath: "/",
    tagline: "Telecom-grade routers and fiber broadband gateways",
    marketPosition: "Major ISP-Deployed Fiber Gateway Brand",
    bestKnownFor: "ZXHN fiber gateways, ISP broadband routers",
    troubleshootingSteps: [
      "Open a browser and go to 192.168.1.1",
      "Enter username: admin and password: admin",
      "Check the label on the back of your ZTE router for exact credentials",
      "Some ISP-deployed ZTE models use a printed password on the device label",
      "If the login page doesn't appear, try 192.168.0.1",
      "For a factory reset, press and hold the Reset button for 10 seconds",
    ],
    firmwareTip:
      "ZTE fiber gateway firmware is typically updated remotely by your ISP via TR-069. For non-ISP models, check zte.com.cn/support or the ZTE admin panel under Maintenance → Software Update.",
    securityChecklist: [
      "Change the default admin/admin password immediately",
      "Set a strong unique Wi-Fi password",
      "Disable WPS if not in use",
      "Enable the firewall under Security settings",
      "Check with your ISP about available firmware updates",
      "Disable UPnP unless required",
    ],
    faqs: [
      {
        question: "What is the default IP for ZTE routers?",
        answer:
          "Most ZTE home routers and fiber gateways use 192.168.1.1 as the default gateway. Some models use 192.168.0.1.",
      },
      {
        question: "What are the default ZTE credentials?",
        answer:
          "ZTE routers typically use admin/admin as defaults. ISP-deployed models may have a unique password printed on the router label. Always check the label first.",
      },
      {
        question: "How do I reset a ZTE router?",
        answer:
          "Press and hold the Reset button for 10 seconds while the router is on. The device will reboot with factory settings.",
      },
      {
        question: "Does ZTE make Wi-Fi 6 routers?",
        answer:
          "Yes. ZTE's MC801A, MF287, and AX3000 series support Wi-Fi 6. ZTE also manufactures 5G CPE devices with Wi-Fi 6 built in.",
      },
      {
        question: "Can I update ZTE firmware myself?",
        answer:
          "ISP-deployed ZTE gateways are usually updated remotely by the provider. For retail models, check the admin panel under Maintenance or visit zte.com.cn/support.",
      },
      {
        question: "What is the ZTE ZXHN series?",
        answer:
          "ZXHN is ZTE's primary home gateway product line. Models like ZXHN H298A, H267A, and H168N are widely deployed by ISPs worldwide as fiber ONT gateways.",
      },
      {
        question: "Why can't I access 192.168.1.1 on my ZTE router?",
        answer:
          "Make sure you are connected to the ZTE router via Ethernet or its Wi-Fi network. Disable any VPN. Some ISP-deployed routers block web admin access — contact your ISP if needed.",
      },
      {
        question: "Does ZTE support IPv6?",
        answer:
          "Yes. Most modern ZTE gateways support IPv6. Enable it under Network → WAN Settings → IPv6 in the admin panel, if your ISP provides IPv6 connectivity.",
      },
    ],
  },
  linksys: {
    loginIps: ["192.168.1.1"],
    altUrl: "myrouter.local",
    defaultUsername: "admin",
    defaultPassword: "admin",
    adminPath: "/",
    tagline: "Velop mesh Wi-Fi and WRT gaming router specialists",
    marketPosition: "Established US Mesh & Gaming Router Brand",
    bestKnownFor: "Velop mesh systems, WRT gaming routers, HomeWRK",
    troubleshootingSteps: [
      "Open a browser and go to myrouter.local or 192.168.1.1",
      "Enter username: admin and password: admin (default)",
      "Velop mesh systems are managed via the Linksys app, not a web browser",
      "Ensure your device is connected to the Linksys Wi-Fi or via Ethernet",
      "Clear browser cache or try Incognito mode if the page doesn't load",
      "For a factory reset, press the Reset button for 10 seconds",
    ],
    firmwareTip:
      "Linksys Velop updates are delivered via the Linksys app. For WRT gaming routers, updates are in the admin panel under Connectivity → Router Firmware Update. OpenWrt is officially supported on some WRT3200ACM and WRT32X models.",
    securityChecklist: [
      "Change the default admin password on first login",
      "Use a strong WPA3 or WPA2 Wi-Fi passphrase",
      "Enable the Linksys Shield parental controls for guest network protection",
      "Disable WPS after pairing devices",
      "Regularly update firmware through the Linksys app",
      "Enable automatic security updates if available",
    ],
    faqs: [
      {
        question: "What is the default IP for Linksys routers?",
        answer:
          "Most Linksys routers use 192.168.1.1. You can also use myrouter.local. Velop mesh systems are managed via the Linksys app instead.",
      },
      {
        question: "What are the default Linksys credentials?",
        answer:
          "The default username and password are both 'admin'. Some Velop models set the password during setup via the Linksys app.",
      },
      {
        question: "How do I reset a Linksys router?",
        answer:
          "Press and hold the Reset button for 10 seconds with the router powered on. The router will reboot to factory defaults.",
      },
      {
        question: "What is Linksys Velop?",
        answer:
          "Velop is Linksys's tri-band mesh Wi-Fi system. It uses a dedicated wireless backhaul to maintain full speed between nodes. Managed entirely through the Linksys app.",
      },
      {
        question: "Does Linksys support Wi-Fi 6?",
        answer:
          "Yes. The Linksys Velop MX5300, MX8400, and Atlas Max 6E support Wi-Fi 6 and Wi-Fi 6E. The Hydra Pro 6E is Linksys's flagship Wi-Fi 6E router.",
      },
      {
        question: "Can I install OpenWrt on a Linksys WRT router?",
        answer:
          "Yes. The Linksys WRT3200ACM and WRT32X officially support OpenWrt. Linksys designed these models with open-source firmware in mind.",
      },
      {
        question: "How do I update Linksys Velop firmware?",
        answer:
          "Open the Linksys app → select your Velop system → tap More (···) → Router Settings → Firmware Update. Updates are OTA and usually apply automatically overnight.",
      },
      {
        question: "Why is myrouter.local not working?",
        answer:
          "myrouter.local uses mDNS. Try using 192.168.1.1 directly. If you're using a VPN or have DNS-over-HTTPS enabled, it may block local domain resolution.",
      },
    ],
  },
  xiaomi: {
    loginIps: ["192.168.31.1", "miwifi.com"],
    altUrl: "miwifi.com",
    defaultUsername: "admin",
    defaultPassword: "(set during setup)",
    adminPath: "/",
    tagline: "Affordable smart home routers with excellent app integration",
    marketPosition: "Top Budget & Smart Home Router Brand",
    bestKnownFor: "Mi Router, AX series, affordable Wi-Fi 6 routers",
    troubleshootingSteps: [
      "Open a browser and go to 192.168.31.1 or miwifi.com",
      "Xiaomi routers require you to set a password during first setup — there is no universal default",
      "Use the MiWiFi app for complete router management on mobile",
      "Ensure your device is connected to the Xiaomi Wi-Fi or via Ethernet",
      "If the page doesn't load, try disabling VPN or switching browsers",
      "For a factory reset, press and hold the Reset button for 5 seconds",
    ],
    firmwareTip:
      "Xiaomi/Mi router firmware updates are available through the MiWiFi app or at the admin panel under System → Upgrade. The Mi Router 4A and AX series support OpenWrt via community-supported firmware.",
    securityChecklist: [
      "Set a strong admin password during initial setup",
      "Use WPA3 encryption if supported by your device",
      "Disable network access for unknown devices",
      "Enable the built-in firewall",
      "Keep firmware up to date via the MiWiFi app",
      "Disable remote access if not needed",
    ],
    faqs: [
      {
        question: "What is the default IP for Xiaomi Mi routers?",
        answer:
          "The default gateway for Xiaomi Mi routers is 192.168.31.1. You can also use miwifi.com when connected to the Xiaomi Wi-Fi network.",
      },
      {
        question: "What is the default Xiaomi router admin password?",
        answer:
          "Xiaomi routers do not have a factory-set password. You create one during the initial setup using the MiWiFi app or web browser at 192.168.31.1.",
      },
      {
        question: "How do I reset a Xiaomi Mi router?",
        answer:
          "Press and hold the Reset button for 5 seconds while the router is powered on. The indicator light will blink and the router reboots with factory settings.",
      },
      {
        question: "Does Xiaomi support Wi-Fi 6?",
        answer:
          "Yes. The Xiaomi AX3000T, AX6000, AX9000, and Redmi AX5400 support Wi-Fi 6. These models offer excellent performance at competitive prices.",
      },
      {
        question: "What is the MiWiFi app?",
        answer:
          "MiWiFi is the official app for managing Xiaomi routers. It provides network overview, device management, parental controls, speed tests, and firmware update notifications.",
      },
      {
        question: "Can I install OpenWrt on a Xiaomi router?",
        answer:
          "Some Xiaomi models support OpenWrt via community ports. The Mi Router 4A Gigabit, AX3200, and AX6S have active OpenWrt support. Check openwrt.org for your specific model.",
      },
      {
        question: "How do I update Xiaomi router firmware?",
        answer:
          "Open the MiWiFi app → select your router → Common Settings → Upgrade. Or log in to 192.168.31.1 → System → Upgrade to check for and install updates.",
      },
      {
        question: "Why can't I access 192.168.31.1?",
        answer:
          "Ensure you're connected to the Xiaomi Wi-Fi network or via Ethernet. Disable VPN. Try using miwifi.com instead. If still failing, do a factory reset by holding the Reset button for 5 seconds.",
      },
    ],
  },
  tenda: {
    loginIps: ["192.168.0.1", "192.168.1.1"],
    altUrl: "tendawifi.com",
    defaultUsername: "admin",
    defaultPassword: "admin (or blank)",
    adminPath: "/",
    tagline: "Easy-to-use, budget-friendly wireless routers and mesh networks",
    marketPosition: "#1 Entry-Level & Value Router Brand",
    bestKnownFor: "Nova mesh series, AC and RX series Wi-Fi 6 routers",
    troubleshootingSteps: [
      "Open a browser and go to 192.168.0.1 or tendawifi.com",
      "Enter admin credentials (on newer firmware, enter the custom password created during setup)",
      "If the login page fails to load, try 192.168.1.1 as a fallback IP",
      "Verify that your device is connected to the Tenda Wi-Fi or via Ethernet",
      "Temporarily disable VPN or ad-blocking extensions to prevent routing redirects",
      "For a forgotten password, hold the physical Reset button for 8 seconds to factory reset",
    ],
    firmwareTip:
      "Log in to the Tenda admin page, go to Administration -> System Upgrade, and click Check for Updates. Tenda also offers OTA updates via the Tenda WiFi mobile app for Nova and RX models.",
    securityChecklist: [
      "Change default admin credentials from 'admin'",
      "Set up WPA3-SAE or WPA2-PSK Wi-Fi security",
      "Disable WPS under Wireless Settings to prevent brute-force attacks",
      "Disable remote web management in Advanced options",
      "Keep router firmware updated to prevent vulnerability exploits",
    ],
    faqs: [
      {
        question: "What is the default IP address for Tenda routers?",
        answer: "The default login IP address for Tenda routers is 192.168.0.1. Tenda also uses the local domain tendawifi.com. Some custom ISP units use 192.168.1.1.",
      },
      {
        question: "What is the default username and password for Tenda?",
        answer: "The default credentials are username: 'admin' and password: 'admin'. On many newer Tenda routers, there is no default password; you are required to set one during the initial setup.",
      },
      {
        question: "How do I factory reset a Tenda router?",
        answer: "With the router powered on, press and hold the physical Reset (RST) button on the back for 8 to 10 seconds. All LEDs will flash, indicating the reset is complete. The router will reboot to factory default settings.",
      },
    ],
  },
  mercusys: {
    loginIps: ["192.168.1.1", "192.168.0.1"],
    altUrl: "mwlogin.net",
    defaultUsername: "admin",
    defaultPassword: "(set during setup)",
    adminPath: "/",
    tagline: "Affordable and reliable home networking devices",
    marketPosition: "Growing Budget-Friendly Network Brand",
    bestKnownFor: "MR-series Wi-Fi 6 routers, Halo mesh Wi-Fi systems",
    troubleshootingSteps: [
      "Open a browser and go to 192.168.1.1 or mwlogin.net",
      "Mercusys routers require you to create a custom password during first boot; enter that password to log in",
      "Ensure your device is connected directly to the Mercusys LAN port or SSID",
      "Disable any active VPNs to allow local domain resolution",
      "If the login page fails to load, try 192.168.0.1 as an alternative IP",
      "To reset, hold the physical Reset button on the back panel for 10 seconds",
    ],
    firmwareTip:
      "Visit mercusys.com/support to check for firmware. Log in to the web admin interface -> System Tools -> Firmware Upgrade to flash downloaded files.",
    securityChecklist: [
      "Ensure a strong admin password is set during initial boot",
      "Set WPA2/WPA3 wireless security with a complex key",
      "Disable UPnP and WPS to block local network vulnerabilities",
      "Check for firmware updates on mercusys.com regularly",
    ],
    faqs: [
      {
        question: "What is the default IP address for Mercusys routers?",
        answer: "Most Mercusys routers use 192.168.1.1 as the default gateway. The local domain hostname is mwlogin.net.",
      },
      {
        question: "Does Mercusys support mesh Wi-Fi?",
        answer: "Yes, Mercusys Halo series provides seamless mesh Wi-Fi coverage across large homes.",
      },
    ],
  },
  cisco: {
    loginIps: ["192.168.1.1", "192.168.15.1"],
    defaultUsername: "admin / cisco",
    defaultPassword: "admin / cisco",
    adminPath: "/",
    tagline: "Enterprise-grade secure business networking equipment",
    marketPosition: "#1 Global Enterprise Networking Leader",
    bestKnownFor: "Catalyst and ISR routers, RV-series small business VPN routers",
    troubleshootingSteps: [
      "Open your browser and connect to 192.168.1.1 (or 192.168.15.1 on select RV models)",
      "Authenticate with the default credentials (e.g. cisco/cisco or admin/admin)",
      "Ensure you are connected to the router's LAN interface using a static or DHCP IP",
      "Disable VPN clients and check that routing rules are not diverting local packets",
      "To factory reset, hold the Reset button for 10 seconds while the unit is powered on",
    ],
    firmwareTip:
      "Cisco publishes security advisories and software downloads at software.cisco.com. Always verify SHA256 checksums before flashing firmware via the web GUI.",
    securityChecklist: [
      "Change default admin/cisco credentials immediately",
      "Disable telnet and HTTP; enforce SSH and HTTPS access only",
      "Configure client VLANs to isolate guest or IoT traffic from secure LANs",
      "Enable firewall and Intrusion Prevention System (IPS) policies",
      "Keep firmware up to date to patch zero-day vulnerabilities",
    ],
    faqs: [
      {
        question: "What is the default IP for Cisco business routers?",
        answer: "Standard RV-series small business routers use 192.168.1.1. Some configurations default to 192.168.15.1.",
      },
      {
        question: "What are the default Cisco RV credentials?",
        answer: "Cisco small business RV-series routers typically default to cisco/cisco or admin/admin. Check the physical sticker or quick install guide.",
      },
    ],
  },
  belkin: {
    loginIps: ["192.168.2.1"],
    altUrl: "http://router",
    defaultUsername: "admin",
    defaultPassword: "(blank)",
    adminPath: "/",
    tagline: "Consumer lifestyle accessories and simple home routers",
    marketPosition: "Consumer Home Wi-Fi Brand",
    bestKnownFor: "RT-series Wi-Fi 6 routers, easy dashboard setups",
    troubleshootingSteps: [
      "Open a browser and go to 192.168.2.1 or http://router",
      "Leave the password field blank and click Submit (or enter admin if prompted)",
      "Verify connection to the Belkin SSID or Ethernet LAN port",
      "Turn off any active VPNs or browser proxy settings",
      "To reset, hold the physical Reset button on the back of the router for 10 seconds",
    ],
    firmwareTip:
      "Go to belkin.com/support and search for your model to find the latest firmware. Upload it through the admin panel under Utilities -> Firmware Update.",
    securityChecklist: [
      "Create a strong administrator password (default is blank)",
      "Use WPA2 or WPA3 personal security for wireless networks",
      "Change the default SSID to a custom name",
      "Disable remote administration in the Utilities menu",
    ],
    faqs: [
      {
        question: "What is the default IP for Belkin routers?",
        answer: "Belkin routers default to 192.168.2.1. You can also access them by typing http://router in your browser's address bar.",
      },
      {
        question: "What is the default password for Belkin?",
        answer: "By default, Belkin routers do not have a password. Leave the password field blank and click Login/Submit.",
      },
    ],
  },
  arris: {
    loginIps: ["192.168.0.1", "192.168.100.1"],
    defaultUsername: "admin",
    defaultPassword: "password",
    adminPath: "/",
    tagline: "High-speed broadband cable modems and Surfboard gateways",
    marketPosition: "Top Cable Modem & Gateway Provider (North America)",
    bestKnownFor: "Surfboard cable modems, DOCSIS 3.1 gateways",
    troubleshootingSteps: [
      "Open a browser and go to 192.168.0.1 (or 192.168.100.1 for standalone modems)",
      "Enter username 'admin' and password 'password' (or the custom password printed on the sticker)",
      "Verify the coaxial cable is screwed in tightly on the modem and wall outlet",
      "Check that your PC is connected to the modem LAN port via Ethernet",
      "If you cannot log in, hold the physical Reset button on the back with a pin for 15 seconds",
    ],
    firmwareTip:
      "For standalone modems, cable operators push firmware updates automatically. For Arris gateway routers, check Arris support and flash firmware via the router settings page.",
    securityChecklist: [
      "Change default admin/password credentials immediately",
      "Set a strong Wi-Fi key on the gateway router",
      "Disable WPS pairing features",
      "Check upstream/downstream SNR levels regularly to monitor cable line health",
    ],
    faqs: [
      {
        question: "What is the default IP for Arris modems and routers?",
        answer: "Arris Surfboard Wi-Fi gateways use 192.168.0.1. Standalone modems (like SB8200) use 192.168.100.1 to access status pages.",
      },
      {
        question: "What is the default Arris login password?",
        answer: "The default username is 'admin' and the password is 'password'. Some models print a unique password on the device label.",
      },
    ],
  },
};

// ─── Fallback data for unknown brands ─────────────────────────────────────────
const DEFAULT_BRAND_DATA: BrandStaticData = {
  loginIps: ["192.168.1.1", "192.168.0.1"],
  defaultUsername: "admin",
  defaultPassword: "admin",
  adminPath: "/",
  tagline: "Networking equipment manufacturer",
  marketPosition: "Networking Brand",
  bestKnownFor: "Home and SMB routers",
  troubleshootingSteps: [
    "Open a browser and go to 192.168.1.1 or 192.168.0.1",
    "Enter default credentials (check the label on your router)",
    "Ensure your device is connected to the router's Wi-Fi or via Ethernet",
    "Disable VPN before accessing the admin panel",
    "Try Incognito mode if the page doesn't load",
    "Factory reset by holding the Reset button for 10 seconds",
  ],
  firmwareTip:
    "Check the manufacturer's official support site for the latest firmware. Log in to the router admin panel and navigate to Administration or Maintenance → Firmware Upgrade.",
  securityChecklist: [
    "Change the default admin password",
    "Set a strong Wi-Fi password using WPA2 or WPA3",
    "Disable WPS if not in use",
    "Enable the built-in firewall",
    "Update firmware regularly",
    "Disable remote management unless required",
  ],
  faqs: [
    {
      question: "What is the default router admin IP?",
      answer:
        "Most routers use 192.168.1.1 or 192.168.0.1. Check the label on the back of your router for the exact IP address and default credentials.",
    },
    {
      question: "How do I reset my router to factory settings?",
      answer:
        "Press and hold the Reset button for 10 seconds while the router is on. The router will reboot with default settings.",
    },
  ],
};

// ─── Types ────────────────────────────────────────────────────────────────────

type Props = { params: Promise<{ brand: string }> };

// ─── generateStaticParams ─────────────────────────────────────────────────────

export async function generateStaticParams() {
  try {
    return await RouterService.getAllBrandPaths();
  } catch {
    console.warn("[Build] Skipping Brand SSG — database unavailable.");
    return [];
  }
}

// ─── generateMetadata ─────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!hasDatabase) return {};
  const { brand: brandSlug } = await params;
  const brand = await RouterService.getBrand(brandSlug);
  if (!brand) return {};
  const d = BRAND_DATA[brandSlug] ?? DEFAULT_BRAND_DATA;
  return buildMetadata({
    title: `${brand.name} Router Login — Default IP ${d.loginIps[0]}, Username & Password`,
    description: `${brand.name} router default login: IP ${d.loginIps[0]}, username: ${d.defaultUsername}, password: ${d.defaultPassword}. Setup guides, troubleshooting, FAQs, and all ${brand.name} models.`,
    canonical: `/routers/${brand.slug}`,
  });
}

export const revalidate = 86400;

// ─── Page Component ───────────────────────────────────────────────────────────

export default async function BrandPage({ params }: Props) {
  const { brand: brandSlug } = await params;
  const [brand, models] = await Promise.all([
    RouterService.getBrand(brandSlug),
    RouterService.getBrandModels(brandSlug),
  ]);
  if (!brand) notFound();

  const d = BRAND_DATA[brandSlug] ?? DEFAULT_BRAND_DATA;

  const breadcrumbs = [
    { label: "Routers", href: "/routers" },
    { label: brand.name, href: `/routers/${brand.slug}` },
  ];

  const faqSchema = buildFaqSchema(d.faqs);
  const breadcrumbSchema = buildBreadcrumbSchema(
    [{ label: "Home", href: "/" }, ...breadcrumbs],
    APP_URL
  );

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <Breadcrumb items={breadcrumbs} className="mb-2" />

        {/* ── Hero ── */}
        <div className="glass-card p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-[var(--brand-900)] border border-[var(--brand-800)] flex items-center justify-center flex-shrink-0">
            <Wifi size={28} className="text-[var(--brand-400)]" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)] mb-1">
              {brand.name} Router Login &amp; Setup Guide
            </h1>
            <p className="text-[var(--text-secondary)] max-w-2xl mb-3">
              {brand.description ?? d.tagline}
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="brand">{models.length} models</Badge>
              <Badge variant="default">{d.marketPosition}</Badge>
            </div>
          </div>
        </div>

        {/* ── Quick Access Panel ── */}
        <section>
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Globe size={18} className="text-[var(--brand-400)]" />
            {brand.name} Default Login Credentials
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "Login IP",
                value: d.loginIps[0],
                sub: d.loginIps[1] ?? "—",
                icon: Globe,
              },
              {
                label: "Alt URL",
                value: d.altUrl ?? d.loginIps[1] ?? "—",
                sub: "browser address bar",
                icon: Link2,
              },
              {
                label: "Username",
                value: d.defaultUsername,
                sub: "default",
                icon: Lock,
              },
              {
                label: "Password",
                value: d.defaultPassword,
                sub: "change after login",
                icon: Shield,
              },
            ].map(({ label, value, sub, icon: Icon }) => (
              <div
                key={label}
                className="glass-card p-5 flex items-start gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-[var(--brand-900)] border border-[var(--brand-800)] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={16} className="text-[var(--brand-400)]" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-[var(--text-muted)] mb-0.5">
                    {label}
                  </p>
                  <p className="font-mono font-bold text-[var(--text-primary)] truncate">
                    {value}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)] truncate">
                    {sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Step-by-step login ── */}
        <section>
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Settings size={18} className="text-[var(--brand-400)]" />
            How to Log In to Your {brand.name} Router
          </h2>
          <div className="glass-card p-6">
            <ol className="space-y-3">
              {d.troubleshootingSteps.map((step, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-[var(--brand-900)] border border-[var(--brand-800)] flex items-center justify-center text-xs font-bold text-[var(--brand-400)] flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-[var(--text-secondary)]">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Default IP address table ── */}
        <section>
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Cpu size={18} className="text-[var(--brand-400)]" />
            {brand.name} Default IP Addresses
          </h2>
          <div className="glass-card overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border-subtle)]">
                  <th className="text-left px-4 py-3 text-[var(--text-muted)] font-semibold">
                    Gateway IP
                  </th>
                  <th className="text-left px-4 py-3 text-[var(--text-muted)] font-semibold">
                    Default Username
                  </th>
                  <th className="text-left px-4 py-3 text-[var(--text-muted)] font-semibold">
                    Default Password
                  </th>
                  <th className="text-left px-4 py-3 text-[var(--text-muted)] font-semibold">
                    Note
                  </th>
                </tr>
              </thead>
              <tbody>
                {d.loginIps.map((ip, i) => (
                  <tr
                    key={ip}
                    className="border-b border-[var(--border-subtle)] hover:bg-[var(--bg-hover)] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/ips/${ip.replace(/\./g, "-")}`}
                        className="font-mono text-[var(--brand-400)] hover:underline"
                      >
                        {ip}
                      </Link>
                    </td>
                    <td className="px-4 py-3 font-mono text-[var(--text-primary)]">
                      {d.defaultUsername}
                    </td>
                    <td className="px-4 py-3 font-mono text-[var(--text-primary)]">
                      {d.defaultPassword}
                    </td>
                    <td className="px-4 py-3 text-[var(--text-muted)] text-xs">
                      {i === 0 ? "Primary gateway" : "Alternate gateway"}
                    </td>
                  </tr>
                ))}
                {d.altUrl && (
                  <tr className="hover:bg-[var(--bg-hover)] transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-mono text-[var(--brand-400)]">
                        {d.altUrl}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-[var(--text-primary)]">
                      {d.defaultUsername}
                    </td>
                    <td className="px-4 py-3 font-mono text-[var(--text-primary)]">
                      {d.defaultPassword}
                    </td>
                    <td className="px-4 py-3 text-[var(--text-muted)] text-xs">
                      Official web URL
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Models grid ── */}
        {models.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <Wifi size={18} className="text-[var(--brand-400)]" />
              {brand.name} Router Models
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {models.map((model, i) => (
                <Link
                  key={model.slug}
                  href={`/routers/${brand.slug}/${model.slug}`}
                  className={`glass-card p-6 hover:border-[var(--border-strong)] hover:bg-[var(--bg-hover)] hover:-translate-y-0.5 transition-all duration-[var(--transition-base)] group animate-fade-in-up stagger-${Math.min(i + 1, 6)}`}
                >
                  <h3 className="text-base font-bold text-[var(--text-primary)] mb-3">
                    {brand.name} {model.name}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mb-1">
                    Login IP:{" "}
                    <span className="font-mono text-[var(--brand-400)]">
                      {model.loginIps[0]}
                    </span>
                  </p>
                  <p className="text-xs text-[var(--text-secondary)] mb-3">
                    Default:{" "}
                    <span className="font-mono text-[var(--text-primary)]">
                      {model.defaultUsername} /{" "}
                      {model.defaultPassword || "(blank)"}
                    </span>
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-xs bg-[var(--bg-elevated)] border border-[var(--border-subtle)] px-2 py-0.5 rounded text-[var(--text-muted)]">
                      Login guide
                    </span>
                    <span className="text-xs bg-[var(--bg-elevated)] border border-[var(--border-subtle)] px-2 py-0.5 rounded text-[var(--text-muted)]">
                      Reset guide
                    </span>
                  </div>
                  <div className="mt-3 text-xs text-[var(--brand-400)] group-hover:underline flex items-center gap-1">
                    Full model guide <ChevronRight size={12} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── Security Checklist ── */}
        <section>
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Shield size={18} className="text-[var(--brand-400)]" />
            {brand.name} Router Security Checklist
          </h2>
          <div className="glass-card p-6">
            <ul className="space-y-2.5">
              {d.securityChecklist.map((item, i) => (
                <li key={i} className="flex gap-2.5 items-start text-sm text-[var(--text-secondary)]">
                  <span className="text-[var(--brand-400)] mt-0.5 flex-shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Firmware Tip ── */}
        <section>
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <RefreshCw size={18} className="text-[var(--brand-400)]" />
            {brand.name} Firmware Updates
          </h2>
          <div className="glass-card p-6 border-l-2 border-[var(--brand-400)]">
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {d.firmwareTip}
            </p>
          </div>
        </section>

        {/* ── Troubleshooting Alert ── */}
        <section>
          <div className="glass-card p-5 border border-amber-500/20 bg-amber-500/5 flex gap-3">
            <AlertTriangle size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-[var(--text-secondary)] leading-relaxed">
              <span className="font-semibold text-[var(--text-primary)]">
                Can&apos;t log in?
              </span>{" "}
              If you&apos;ve forgotten your {brand.name} router password or the admin page isn&apos;t loading, visit our{" "}
              <Link href="/router-login-not-working" className="text-[var(--brand-400)] hover:underline">
                Router Login Not Working
              </Link>{" "}
              guide or perform a{" "}
              <Link href="/router-reset" className="text-[var(--brand-400)] hover:underline">
                factory reset
              </Link>.
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section>
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Lock size={18} className="text-[var(--brand-400)]" />
            {brand.name} Router FAQ
          </h2>
          <div className="space-y-3">
            {d.faqs.map((faq, i) => (
              <details
                key={i}
                className="glass-card group overflow-hidden"
              >
                <summary className="px-5 py-4 cursor-pointer text-sm font-semibold text-[var(--text-primary)] flex justify-between items-center gap-3 list-none hover:text-[var(--brand-400)] transition-colors">
                  <span>{faq.question}</span>
                  <ChevronRight
                    size={15}
                    className="flex-shrink-0 text-[var(--text-muted)] group-open:rotate-90 transition-transform"
                  />
                </summary>
                <div className="px-5 pb-4 text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)] pt-3">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ── Cluster Nav ── */}
        <div className="p-5 glass-card border border-[var(--border-subtle)] rounded-2xl">
          <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3 flex items-center gap-1.5">
            <Link2 size={14} className="text-[var(--brand-400)]" />
            Router Access Cluster
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Router Brands Directory", href: "/routers" },
              { label: "IP Directory", href: "/ips" },
              { label: "Router Login", href: "/router-login" },
              { label: "Default Passwords", href: "/router-password" },
              { label: "Router Reset", href: "/router-reset" },
              { label: "Router Admin", href: "/router-admin" },
              { label: "Login Not Working", href: "/router-login-not-working" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--brand-800)] px-3 py-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:bg-[var(--bg-hover)] transition-all font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
