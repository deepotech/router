import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  Wrench,
  AlertTriangle,
  Globe,
  Lock,
  Shield,
  RefreshCw,
  Link2,
  ChevronRight,
} from "lucide-react";
import { IpService } from "@/server/services/ip.service";
import { AnalyticsService } from "@/server/services/analytics.service";
import { buildIpMetadata, buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import {
  JsonLd,
  buildBreadcrumbSchema,
  buildFaqSchema,
  generateSemanticArticleSchema,
} from "@/lib/seo/schema";
import { APP_URL } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { slugToIp } from "@/lib/utils";
import { RelatedProblemsForIp } from "@/components/seo/RelatedProblemsForIp";
import { RelatedArticles } from "@/components/seo/RelatedArticles";
import { hasDatabase } from "@/lib/server/env-safe";
import { COMMON_IPS } from "@/lib/constants";

type Props = { params: Promise<{ ip: string }> };

// ─── Static fallback data for common IPs ──────────────────────────────────────

interface StaticIpData {
  address: string;
  brands: string[];
  description: string;
  loginSteps: string[];
  defaultUsername: string;
  defaultPassword: string;
  adminPath: string;
  notes: string;
  troubleshootingTips: string[];
  firmwareTip: string;
  faqs: { question: string; answer: string }[];
  routerBrands?: {
    brand: string;
    models: string;
    defaultLogin: string;
    alternativeUrl?: string;
  }[];
}

const STATIC_IP_DATA: Record<string, StaticIpData> = {
  "192-168-1-1": {
    address: "192.168.1.1",
    brands: ["ASUS", "Netgear", "Linksys", "TP-Link", "ZTE", "Belkin"],
    description:
      "192.168.1.1 is the most common default gateway IP for home routers worldwide. Used by ASUS, Netgear, Linksys, and many other brands as the primary admin login address.",
    defaultUsername: "admin",
    defaultPassword: "admin",
    adminPath: "/",
    notes:
      "If 192.168.1.1 doesn't work, try 192.168.0.1. ASUS routers also respond to router.asus.com, and Netgear routers to routerlogin.net.",
    loginSteps: [
      "Connect your device to the router via Wi-Fi or Ethernet cable.",
      "Open any web browser (Chrome, Firefox, Safari, Edge).",
      "Type http://192.168.1.1 in the address bar and press Enter.",
      "Enter the default username: admin and password: admin.",
      "If prompted, follow the setup wizard to change your credentials.",
      "If credentials fail, check the label on the back of your router for custom credentials.",
    ],
    troubleshootingTips: [
      "Disable VPN — VPN tunnels block local subnet access.",
      "Type http://192.168.1.1 not https:// — many routers don't support HTTPS on the admin panel.",
      "Try a different browser or Incognito mode to avoid cookie/cache issues.",
      "Run ipconfig (Windows) or ip route (Linux) to verify your gateway is 192.168.1.1.",
      "Try 192.168.0.1 — some TP-Link and D-Link models use a different subnet.",
      "Factory reset: hold the Reset button for 10 seconds to restore defaults.",
    ],
    firmwareTip:
      "After logging in, navigate to Administration → Firmware Upgrade (ASUS) or Advanced → System Tools → Firmware Upgrade (TP-Link) to check for updates. Keeping firmware current prevents security vulnerabilities.",
    faqs: [
      {
        question: "What routers use 192.168.1.1?",
        answer:
          "ASUS, Netgear, Linksys, D-Link (some models), ZTE, and Belkin routers commonly use 192.168.1.1 as their default gateway. Check the sticker on the bottom of your router to confirm.",
      },
      {
        question: "Why is 192.168.1.1 not opening?",
        answer:
          "Common causes: (1) your device is not connected to the router, (2) an active VPN is intercepting local traffic, (3) your router uses a different IP like 192.168.0.1, or (4) the browser is forcing HTTPS. Run ipconfig (Windows) to check your actual gateway.",
      },
      {
        question: "What is the default username and password for 192.168.1.1?",
        answer:
          "Most routers use admin/admin or admin/password. Netgear uses admin/password. D-Link uses Admin (capital A) with a blank password. Always check the sticker on your router first as ISPs sometimes set custom credentials.",
      },
      {
        question: "How do I log in to 192.168.1.1 from my phone?",
        answer:
          "Connect your phone to the router's Wi-Fi. Turn off mobile data temporarily (it can override Wi-Fi for browser requests). Open any browser, type http://192.168.1.1 in the address bar, and press Go.",
      },
      {
        question: "Is 192.168.1.1 a public or private IP address?",
        answer:
          "It is a private IP address defined by RFC 1918. It is only accessible within your local network and cannot be reached from the internet. Any device outside your home cannot connect to 192.168.1.1.",
      },
      {
        question: "How do I reset my router if I forgot the password for 192.168.1.1?",
        answer:
          "Hold the Reset button (pinhole on the back) for 10–15 seconds while the router is powered on. The router reboots with factory defaults. You can then log in with the original default credentials printed on the label.",
      },
      {
        question: "Can I change my router's IP address from 192.168.1.1?",
        answer:
          "Yes. Log in at 192.168.1.1, go to LAN Settings → LAN IP Address, and change it to any private IP (e.g. 192.168.2.1 or 10.0.0.1). After saving, reconnect to the router and use the new IP.",
      },
      {
        question: "Why does my browser redirect 192.168.1.1 to Google?",
        answer:
          "You typed it in the search bar, not the address bar. The address bar is at the top of the browser. Click it, type http://192.168.1.1 exactly, and press Enter.",
      },
      {
        question: "What is a default gateway?",
        answer:
          "The default gateway is the device (usually your router) that your computer sends traffic to when the destination is outside your local network. For most home setups, the gateway is 192.168.1.1.",
      },
      {
        question: "How do I change the Wi-Fi password at 192.168.1.1?",
        answer:
          "Log in at 192.168.1.1, navigate to Wireless → Wireless Security (or Wi-Fi Password on newer routers), enter a new password in the WPA2 Pre-Shared Key field, and click Save. Reconnect all devices with the new password.",
      },
      {
        question: "What should I do if I get a security warning when accessing 192.168.1.1?",
        answer:
          "Local routers use HTTP or self-signed certificates. Click Advanced → Proceed to 192.168.1.1. This is normal and not dangerous because the connection is entirely local — no data leaves your network.",
      },
      {
        question: "How do I update router firmware at 192.168.1.1?",
        answer:
          "Log in, go to Administration → Firmware Upgrade (ASUS), Advanced → Firmware Update (Netgear), or System Tools → Firmware Upgrade (TP-Link). Click Check for updates or upload a firmware file from the manufacturer's website.",
      },
      {
        question: "What is double NAT and how does it affect 192.168.1.1?",
        answer:
          "Double NAT occurs when two routers both perform NAT, typically an ISP modem/router and your personal router. If both use 192.168.1.1, your secondary router shifts to 192.168.2.1 to avoid conflict. Run ipconfig to find your actual gateway.",
      },
      {
        question: "What security risks come with using default credentials on 192.168.1.1?",
        answer:
          "Default credentials (admin/admin) are publicly documented. Anyone on your Wi-Fi network can access your router admin panel with them. Change the admin password immediately after first login to prevent unauthorized access.",
      },
      {
        question: "Can I access 192.168.1.1 via Ethernet without Wi-Fi?",
        answer:
          "Yes. Plug an Ethernet cable from your computer into any LAN port on the router. Wired connections are often more reliable for initial router setup since they don't depend on wireless configuration.",
      },
    ],
    routerBrands: [
      { brand: "ASUS", models: "RT-AX88U, RT-AX86U, RT-AC68U", defaultLogin: "admin / admin", alternativeUrl: "router.asus.com" },
      { brand: "Netgear", models: "Nighthawk R7000, RAX50, RS700S", defaultLogin: "admin / password", alternativeUrl: "routerlogin.net" },
      { brand: "Linksys", models: "Velop, WRT3200ACM", defaultLogin: "admin / admin (or blank)", alternativeUrl: "myrouter.local" },
      { brand: "D-Link", models: "DIR-882, DIR-842", defaultLogin: "admin / (blank)", alternativeUrl: "dlinkrouter.local" },
      { brand: "ZTE", models: "ZXHN H298A", defaultLogin: "admin / admin" },
    ],
  },
  "192-168-0-1": {
    address: "192.168.0.1",
    brands: ["TP-Link", "D-Link", "Tenda", "Mercusys", "Xiaomi"],
    description:
      "192.168.0.1 is the default admin login IP for TP-Link, D-Link, Tenda, and Mercusys routers. Enter this address in your browser to access your router's control panel.",
    defaultUsername: "admin",
    defaultPassword: "admin",
    adminPath: "/",
    notes:
      "TP-Link routers also accept tplinkwifi.net as an alternative URL. D-Link routers accept dlinkrouter.local. The D-Link default username is 'Admin' (capital A) with a blank password.",
    loginSteps: [
      "Connect your device to the router via Wi-Fi or Ethernet.",
      "Open a browser and go to http://192.168.0.1.",
      "For TP-Link: enter username admin, password admin.",
      "For D-Link: enter username Admin (capital A), leave password blank.",
      "For Tenda/Mercusys: check the router label for credentials.",
      "If the page doesn't load, try http://192.168.1.1 as an alternate.",
    ],
    troubleshootingTips: [
      "Ensure you're connected to the router's Wi-Fi or Ethernet — not just mobile data.",
      "For TP-Link, try tplinkwifi.net if 192.168.0.1 fails.",
      "Clear browser cache or use Incognito mode.",
      "Disable VPN before attempting access.",
      "Check your Default Gateway via ipconfig (Windows) to confirm the router uses 192.168.0.1.",
      "Factory reset: hold Reset for 10 seconds to restore defaults.",
    ],
    firmwareTip:
      "For TP-Link routers at 192.168.0.1, go to Advanced → System Tools → Firmware Upgrade to update. D-Link users should visit support.dlink.com for the latest firmware files.",
    faqs: [
      {
        question: "What is 192.168.0.1?",
        answer:
          "192.168.0.1 is a private IPv4 address used as the default gateway for home routers from TP-Link, D-Link, Tenda, and Mercusys. Navigating to it in a browser opens the router admin panel.",
      },
      {
        question: "Which routers use 192.168.0.1?",
        answer:
          "TP-Link (Archer, TL-WR series), D-Link (DIR series), Tenda (AC series), Mercusys, and some Huawei HiLink models use 192.168.0.1 as their default gateway.",
      },
      {
        question: "What is the default TP-Link login at 192.168.0.1?",
        answer:
          "Older TP-Link routers use username admin and password admin. Newer Archer AX series require you to create a password during setup — if skipped, try tplinkwifi.net to complete setup first.",
      },
      {
        question: "What is the default D-Link login at 192.168.0.1?",
        answer:
          "D-Link uses username Admin (with capital A) and a blank password field. Just press Enter after typing Admin — do not type anything in the password box.",
      },
      {
        question: "Why won't 192.168.0.1 open in my browser?",
        answer:
          "Check that your device is connected to the router. Run ipconfig to verify your Default Gateway is 192.168.0.1. If it shows 192.168.1.1, your router uses that IP instead. Also disable VPN and type http:// explicitly.",
      },
      {
        question: "What is tplinkwifi.net?",
        answer:
          "tplinkwifi.net is a local domain name registered by TP-Link that resolves to the router's admin IP (192.168.0.1 or 192.168.1.1) when you're connected to the TP-Link network. It's a convenient alternative to typing the IP address.",
      },
      {
        question: "How do I reset a TP-Link router to 192.168.0.1?",
        answer:
          "Hold the Reset button (pinhole on the back) for 10 seconds while the router is powered on. The LED will blink and the router reboots with factory settings: 192.168.0.1 gateway and admin/admin credentials.",
      },
      {
        question: "Can I access 192.168.0.1 from my phone?",
        answer:
          "Yes. Connect your phone to the router Wi-Fi, turn off mobile data temporarily, and open a browser. Type http://192.168.0.1 in the address bar and press Go. Mobile data can override Wi-Fi for DNS lookups on some phones.",
      },
      {
        question: "Is 192.168.0.1 the same as 192.168.1.1?",
        answer:
          "No. They are different IP addresses on different subnets (192.168.0.x vs 192.168.1.x). Your router uses one or the other depending on the manufacturer's default configuration.",
      },
      {
        question: "How do I change the Wi-Fi password at 192.168.0.1?",
        answer:
          "Log in at 192.168.0.1, go to Wireless → Wireless Security (TP-Link) or Wireless → Wi-Fi Password (D-Link), change the WPA2 Pre-Shared Key, and click Save. Reconnect all devices with the new password.",
      },
      {
        question: "What security risks come with the default admin/admin credentials?",
        answer:
          "Any device on your Wi-Fi network — including guests — can log in to your router admin panel with admin/admin if you have not changed it. This allows full control over your network settings, DNS, and port forwarding.",
      },
      {
        question: "Can ISP restrictions prevent me from changing settings at 192.168.0.1?",
        answer:
          "If the router is provided by your ISP, they may restrict access to certain menus (especially WAN and VLAN settings). Consumer-purchased routers generally have no such restrictions.",
      },
      {
        question: "What should I do if my browser cache shows an old login page?",
        answer:
          "Clear your browser cache (Ctrl+Shift+Delete on Windows) or open an Incognito/Private window. Cached login pages from a previous router session can cause authentication failures.",
      },
      {
        question: "What alternate IP should I try if 192.168.0.1 doesn't work?",
        answer:
          "Try 192.168.1.1 (ASUS, Netgear, Linksys) or 192.168.8.1 (Huawei MiFi). Run ipconfig to find your actual Default Gateway — that is always the correct IP for your router.",
      },
      {
        question: "How do I update D-Link firmware from 192.168.0.1?",
        answer:
          "D-Link does not support automatic online firmware updates from the admin panel. Download the latest firmware from support.dlink.com for your model, then go to Tools → Firmware and upload the file manually.",
      },
    ],
    routerBrands: [
      { brand: "TP-Link", models: "Archer C7, Archer AX50", defaultLogin: "admin / admin", alternativeUrl: "tplinkwifi.net" },
      { brand: "D-Link", models: "DIR-605L, DIR-615", defaultLogin: "Admin / (blank)", alternativeUrl: "dlinkrouter.local" },
      { brand: "Tenda", models: "AC10, AC19", defaultLogin: "admin / admin", alternativeUrl: "tendawifi.com" },
      { brand: "Mercusys", models: "MR70X, MR30G", defaultLogin: "admin / admin", alternativeUrl: "mwlogin.net" }
    ],
  },
  "192-168-50-1": {
    address: "192.168.50.1",
    brands: ["ASUS"],
    description:
      "192.168.50.1 is the default LAN IP address for ASUS routers including the RT-AX series, ROG Rapture, ZenWiFi, and most modern ASUS models. Access the ASUS admin panel here or at router.asus.com.",
    defaultUsername: "admin",
    defaultPassword: "admin",
    adminPath: "/",
    notes:
      "ASUS routers also respond at router.asus.com. ROG Rapture gaming routers include a dedicated gaming dashboard. After first login, ASUS requires you to set a new admin password.",
    loginSteps: [
      "Connect to your ASUS router via Wi-Fi or Ethernet cable.",
      "Open a browser and go to http://192.168.50.1 or router.asus.com.",
      "Enter username: admin and password: admin.",
      "ASUS will prompt you to change the default password immediately — set a strong one.",
      "If the page doesn't load, check you're on the ASUS network (not a VPN).",
      "For forgotten passwords, hold the Reset button 10 seconds to restore defaults.",
    ],
    troubleshootingTips: [
      "Try router.asus.com as an alternative to 192.168.50.1.",
      "Some older ASUS models use 192.168.1.1 instead of 192.168.50.1.",
      "Disable VPN before accessing the admin panel.",
      "Run ipconfig (Windows) to verify your gateway — ASUS routers show 192.168.50.1.",
      "If ROG UI doesn't load, try http://192.168.50.1 instead of the router.asus.com domain.",
      "For AiMesh nodes, always manage from the main router's admin panel.",
    ],
    firmwareTip:
      "In the ASUS admin panel, go to Administration → Firmware Upgrade → Check. For ROG Rapture and ZenWiFi models, you can also use the ASUS Router app for OTA updates. Asuswrt-Merlin is available for advanced users.",
    faqs: [
      {
        question: "Why does ASUS use 192.168.50.1 instead of 192.168.1.1?",
        answer:
          "ASUS switched to 192.168.50.1 as the default gateway to avoid IP conflicts with ISP-provided modems which commonly use 192.168.1.1. This reduces double-NAT issues.",
      },
      {
        question: "What is the default ASUS router password at 192.168.50.1?",
        answer:
          "Default username and password are both 'admin'. ASUS requires you to change the password on first login via the Quick Internet Setup wizard.",
      },
      {
        question: "Can I access 192.168.50.1 from my phone?",
        answer:
          "Yes. Connect to ASUS Wi-Fi, open a browser, and go to http://192.168.50.1. Alternatively, download the ASUS Router app (iOS/Android) for mobile management.",
      },
      {
        question: "What is router.asus.com?",
        answer:
          "router.asus.com is ASUS's local domain name that resolves to 192.168.50.1 (or 192.168.1.1 on older models) when connected to the ASUS network. It's an easier alternative to typing the IP.",
      },
      {
        question: "How do I access the ROG router gaming dashboard?",
        answer:
          "Log in at 192.168.50.1 or router.asus.com. ROG Rapture models have a dedicated ROG UI with a gaming dashboard showing network prioritization and QoS settings.",
      },
      {
        question: "What is ASUS AiMesh?",
        answer:
          "AiMesh lets you combine multiple ASUS routers into one seamless mesh network. Configure it from the main router's admin panel at 192.168.50.1 under AiMesh.",
      },
      {
        question: "What is AiProtection on ASUS routers?",
        answer:
          "AiProtection is a free Trend Micro-powered security suite built into ASUS routers. Enable it at 192.168.50.1 → AiProtection to block malware, phishing, and intrusions.",
      },
      {
        question: "How do I reset an ASUS router?",
        answer:
          "Hold the Reset button on the back of the router for 10 seconds while powered on. The power LED blinks and the router reboots with factory defaults at 192.168.50.1.",
      },
    ],
  },
  "192-168-31-1": {
    address: "192.168.31.1",
    brands: ["Xiaomi", "Mi Router"],
    description:
      "192.168.31.1 is the default login address for Xiaomi Mi routers (AX3000, AX6000, AX9000, Redmi AX series). Also accessible via miwifi.com. Xiaomi requires setting a password during first setup.",
    defaultUsername: "admin",
    defaultPassword: "(set during first setup)",
    adminPath: "/",
    notes:
      "Xiaomi routers do not have a factory-set password. You must create one during the initial setup via the MiWiFi app or at 192.168.31.1. The MiWiFi app provides full management on mobile.",
    loginSteps: [
      "Connect to the Xiaomi router via Wi-Fi or Ethernet.",
      "Open a browser and go to http://192.168.31.1 or miwifi.com.",
      "If setting up for the first time, create an admin password when prompted.",
      "For subsequent logins, use the password you set during setup.",
      "If you forgot the password, press the Reset button for 5 seconds to reset the router.",
      "After reset, go to 192.168.31.1 and set a new password.",
    ],
    troubleshootingTips: [
      "Use miwifi.com as an alternative if 192.168.31.1 doesn't load.",
      "Xiaomi MiWiFi app is the easiest way to manage the router from a phone.",
      "Disable mobile data when accessing 192.168.31.1 from a phone browser.",
      "Disable VPN before accessing the admin panel.",
      "Factory reset: hold Reset button for 5 seconds until the LED blinks.",
      "For OpenWrt users: Mi 4A Gigabit and AX3200 have community OpenWrt support.",
    ],
    firmwareTip:
      "Open MiWiFi app → select router → Common Settings → Upgrade. Or log in at 192.168.31.1 → System → Upgrade to check for and install firmware updates.",
    faqs: [
      {
        question: "What is the default IP for Xiaomi Mi routers?",
        answer:
          "The default gateway for all Xiaomi Mi routers is 192.168.31.1. You can also use miwifi.com when connected to the Xiaomi network.",
      },
      {
        question: "What is the default Xiaomi router password?",
        answer:
          "Xiaomi routers don't have a factory-set password. You create one during the first setup via the MiWiFi app or the web interface at 192.168.31.1.",
      },
      {
        question: "How do I reset a Xiaomi router?",
        answer:
          "Press and hold the Reset button for 5 seconds while the router is powered on. The LED blinks and the router reboots with factory settings.",
      },
      {
        question: "What is the MiWiFi app?",
        answer:
          "MiWiFi is the official Xiaomi app for managing Mi routers. It provides network overview, device management, parental controls, speed tests, and firmware update alerts.",
      },
      {
        question: "Can I install OpenWrt on Xiaomi routers?",
        answer:
          "Some models support OpenWrt: Mi Router 4A Gigabit, AX3200, and AX6S have active OpenWrt community support. Check openwrt.org for your specific model.",
      },
      {
        question: "Why won't 192.168.31.1 open?",
        answer:
          "Ensure you're connected to Xiaomi Wi-Fi or Ethernet. Disable VPN. Try miwifi.com. Turn off mobile data on phones. If still failing, reset the router (5 seconds on Reset button).",
      },
      {
        question: "Does Xiaomi support Wi-Fi 6?",
        answer:
          "Yes. The Xiaomi AX3000T, AX6000, AX9000, and Redmi AX5400 support Wi-Fi 6 (802.11ax) at competitive prices.",
      },
      {
        question: "How do I update Xiaomi router firmware?",
        answer:
          "Via MiWiFi app: select router → Common Settings → Upgrade. Via web: go to 192.168.31.1 → System → Upgrade → Check for Updates.",
      },
    ],
  },
  "192-168-3-1": {
    address: "192.168.3.1",
    brands: ["Huawei HiLink", "Huawei AX series"],
    description:
      "192.168.3.1 is the default admin gateway for Huawei HiLink home routers including AX2, AX3, AX3 Pro, BE3, and Mesh series. Managed via the Huawei AI Life app or the web interface.",
    defaultUsername: "admin",
    defaultPassword: "admin",
    adminPath: "/",
    notes:
      "Huawei ISP-deployed fiber gateways (ONTs) use 192.168.100.1, not 192.168.3.1. The 192.168.3.1 address is specific to Huawei HiLink consumer routers. Use the Huawei AI Life app for the best experience.",
    loginSteps: [
      "Connect to the Huawei router via Wi-Fi or Ethernet.",
      "Open a browser and go to http://192.168.3.1.",
      "Enter username: admin and password: admin (or set during first setup).",
      "Some models prompt you to set a new password on first login.",
      "For ISP fiber gateways, try 192.168.100.1 instead.",
      "Factory reset: hold Reset button for 15 seconds.",
    ],
    troubleshootingTips: [
      "Try 192.168.100.1 if 192.168.3.1 doesn't work — ISP Huawei ONTs use that IP.",
      "Use Huawei AI Life app for easier management on mobile devices.",
      "Disable VPN before accessing the admin panel.",
      "ISP-deployed routers may restrict access to the telecomadmin account.",
      "Check the router label for credentials — ISP models often have custom passwords.",
      "Factory reset requires 15 seconds (longer than most routers).",
    ],
    firmwareTip:
      "Huawei ISP gateways are typically updated remotely by the ISP via TR-069. For HiLink consumer routers, use the Huawei AI Life app or go to Maintenance → Software Upgrade in the admin panel.",
    faqs: [
      {
        question: "What Huawei routers use 192.168.3.1?",
        answer:
          "Huawei HiLink consumer routers use 192.168.3.1. This includes the AX2, AX3, AX3 Pro, BE3 Pro, and Mesh 3 / Mesh 7 series.",
      },
      {
        question: "What is the difference between 192.168.3.1 and 192.168.100.1?",
        answer:
          "192.168.3.1 is for Huawei HiLink consumer routers. 192.168.100.1 is for Huawei ISP-deployed fiber gateways (ONTs). If you have a fiber box from your ISP, try 192.168.100.1.",
      },
      {
        question: "What is the Huawei AI Life app?",
        answer:
          "Huawei AI Life is the official management app for HiLink-compatible Huawei routers. It provides Wi-Fi management, device control, network tests, and firmware updates.",
      },
      {
        question: "What are the default Huawei HiLink credentials?",
        answer:
          "Consumer Huawei routers typically use admin/admin. ISP-deployed models use telecomadmin/admintelecom. Always check the label on your specific device.",
      },
      {
        question: "How do I reset a Huawei router?",
        answer:
          "Hold the Reset button for 15 seconds while powered on. All LEDs flash and the device reboots with factory settings.",
      },
      {
        question: "Does Huawei support Wi-Fi 7?",
        answer:
          "Yes. Huawei BE3 Pro and BE7 support Wi-Fi 7. The AX3 and AX3 Pro support Wi-Fi 6/6+.",
      },
      {
        question: "Can I access the ISP telecomadmin account?",
        answer:
          "The telecomadmin account provides full access on Huawei ONTs. If your ISP has locked it, contact them. The regular 'user' account allows basic Wi-Fi settings.",
      },
      {
        question: "How do I update Huawei firmware?",
        answer:
          "For HiLink routers: use Huawei AI Life app or admin panel → Maintenance → Software Upgrade. ISP gateways are updated remotely by the ISP.",
      },
    ],
  },
  "192-168-100-1": {
    address: "192.168.100.1",
    brands: ["Huawei ONT", "Motorola", "Arris", "Zoom"],
    description:
      "192.168.100.1 is the standard management IP for cable modems and Huawei ISP fiber gateways (ONTs). Used by Motorola, Arris, Zoom DSL modems, and ISP-deployed Huawei GPON routers.",
    defaultUsername: "admin",
    defaultPassword: "admin",
    adminPath: "/",
    notes:
      "For Huawei ISP ONTs: username telecomadmin / password admintelecom. For cable modems: admin/admin or admin/password. The Huawei 'user' account uses the password printed on the device label.",
    loginSteps: [
      "Connect directly to the modem/ONT via Ethernet cable.",
      "Open a browser and go to http://192.168.100.1.",
      "For Huawei ONT: try telecomadmin / admintelecom, or user / [label password].",
      "For cable modems (Motorola, Arris): try admin / admin or admin / password.",
      "If the page won't load, check you're connected directly to this device (not through another router).",
      "Factory reset: hold Reset for 15 seconds.",
    ],
    troubleshootingTips: [
      "Connect directly to the modem with Ethernet — not through a secondary router.",
      "Huawei ONTs use telecomadmin/admintelecom for the full access account.",
      "ISPs often lock the telecomadmin account — contact your ISP if needed.",
      "Arris SURFboard modems may use a different web interface at 192.168.100.1.",
      "Some cable modems only allow read-only access on 192.168.100.1.",
      "Factory reset requires 15 seconds for most fiber gateways.",
    ],
    firmwareTip:
      "Huawei ISP ONT firmware is automatically updated by your ISP via TR-069. Motorola and Arris cable modems are typically updated by the ISP provider. Contact your ISP for manual firmware requests.",
    faqs: [
      {
        question: "What is 192.168.100.1?",
        answer:
          "192.168.100.1 is the default management IP for ISP-deployed fiber GPON gateways (ONTs) from Huawei and ZTE, and for standalone cable modems from Motorola and Arris. It provides access to signal diagnostics and WAN configuration.",
      },
      {
        question: "What devices use 192.168.100.1?",
        answer:
          "Huawei fiber ONTs (HG8145V5, HG8245H, EG8145V5), ZTE ONTs (F660, F680), Motorola cable modems (MB8600, MB7621), and Arris SURFboard modems use 192.168.100.1 as their management IP.",
      },
      {
        question: "What is the Huawei telecomadmin login?",
        answer:
          "telecomadmin is the ISP-level administrator account on Huawei ONTs with full access to all settings. The default password is admintelecom. Many ISPs change or lock this password remotely — contact your ISP if it fails.",
      },
      {
        question: "Why is 192.168.100.1 not accessible from my computer?",
        answer:
          "The most common cause is that your computer is connected through a personal router on a different subnet (e.g. 192.168.1.x). Connect your computer directly to the ONT or modem LAN port using an Ethernet cable to access 192.168.100.1.",
      },
      {
        question: "What is the difference between an ONT and a cable modem?",
        answer:
          "An ONT (Optical Network Terminal) converts fiber optic light signals to Ethernet, used in fiber/GPON networks. A cable modem converts coaxial cable signals to Ethernet using DOCSIS. Both often use 192.168.100.1 as their management IP.",
      },
      {
        question: "How do I check fiber signal levels at 192.168.100.1?",
        answer:
          "Log in at 192.168.100.1, navigate to Status → Optical Information (Huawei) or PON Information (ZTE). The Rx Optical Power should be between -8 dBm and -27 dBm. Values outside this range indicate a fiber connection problem.",
      },
      {
        question: "What does the LOS red light mean on a Huawei ONT?",
        answer:
          "LOS (Loss of Signal) means the ONT is not receiving optical light from the fiber line. Check that the green SC/APC fiber connector at the bottom is fully plugged in. If it is, the issue is likely a cut fiber or ISP infrastructure problem.",
      },
      {
        question: "Can I reset my fiber ONT at 192.168.100.1?",
        answer:
          "You can factory reset via the Reset button, but this clears the ONT's GPON registration keys. The fiber line will go offline until your ISP re-provisions the device remotely. Only reset if instructed by your ISP.",
      },
      {
        question: "What is bridge mode and how do I enable it?",
        answer:
          "Bridge mode turns the ONT into a pure media converter, passing the WAN IP to your personal router. This eliminates double NAT. Access 192.168.100.1 with telecomadmin and change the WAN connection type, or ask your ISP to enable it remotely.",
      },
      {
        question: "How do I check cable modem signal quality at 192.168.100.1?",
        answer:
          "Log in at 192.168.100.1 and go to Signal or Connection Status. Check Downstream Power (-15 to +15 dBmV), SNR (>30 dB), and Upstream Power (38-48 dBmV). High T3/T4 timeout counts indicate upstream packet loss.",
      },
      {
        question: "Can I change settings on my ISP-provided ONT?",
        answer:
          "The user account allows basic Wi-Fi changes. The telecomadmin account provides full access but ISPs may lock it. Advanced settings like VLAN and PPPoE credentials require telecomadmin or ISP assistance.",
      },
      {
        question: "Why is my WAN IP empty at 192.168.100.1?",
        answer:
          "An empty or 0.0.0.0 WAN IP means the device failed to authenticate with the ISP. Causes include: account not activated, MAC address not provisioned, or a GPON registration mismatch. Contact your ISP.",
      },
      {
        question: "What is TR-069 and how does it affect my ONT?",
        answer:
          "TR-069 is a WAN management protocol that allows your ISP to remotely configure, update, and monitor your ONT. ISPs use it to push firmware updates and configuration changes. Settings you change locally may be overwritten by TR-069.",
      },
      {
        question: "Can I update firmware on a Huawei ONT?",
        answer:
          "Huawei ONT firmware is managed remotely by your ISP via TR-069. You cannot manually update it from the admin panel. If you need a firmware update, contact your ISP.",
      },
      {
        question: "How is 192.168.100.1 different from 192.168.1.1?",
        answer:
          "192.168.100.1 is the management IP for ISP modems and ONTs (not purchased by the end user). 192.168.1.1 is the typical gateway for consumer routers (ASUS, Netgear, Linksys). In a standard home setup, the modem at 192.168.100.1 is upstream from the router at 192.168.1.1.",
      },
    ],
    routerBrands: [
      { brand: "Huawei ONT", models: "HG8145V5, HG8245H", defaultLogin: "telecomadmin / admintelecom", alternativeUrl: "user / (label password)" },
      { brand: "Motorola", models: "MB8600, MB7621 modems", defaultLogin: "admin / motorola (or admin)" },
      { brand: "Arris SURFboard", models: "SB8200, SB6183 modems", defaultLogin: "admin / password" }
    ],
  },
  "10-0-0-1": {
    address: "10.0.0.1",
    brands: ["Xfinity", "Comcast", "Apple AirPort", "Cisco"],
    description:
      "10.0.0.1 is the default gateway for Xfinity/Comcast routers, Apple AirPort base stations, and many Cisco business routers. Enter it in your browser to access the admin panel.",
    defaultUsername: "admin",
    defaultPassword: "password",
    adminPath: "/",
    notes:
      "Xfinity gateways (Comcast) use 10.0.0.1. Apple AirPort Utility manages AirPort routers — the web interface at 10.0.0.1 has limited functionality. Cisco business routers use admin/cisco.",
    loginSteps: [
      "Connect to the router via Wi-Fi or Ethernet.",
      "Open a browser and go to http://10.0.0.1.",
      "For Xfinity: use admin / password as default credentials.",
      "For Apple AirPort: use the AirPort Utility app (the web interface is limited).",
      "For Cisco: use admin / cisco as default credentials.",
      "If credentials fail, check the label on your device.",
    ],
    troubleshootingTips: [
      "Ensure you're connected to the device using 10.0.0.1 as the gateway.",
      "Run ipconfig (Windows) to verify your default gateway is 10.0.0.1.",
      "Xfinity customers can use the Xfinity app for easier management.",
      "VPN software will block access to 10.0.0.1 — disable VPN first.",
      "Try 10.0.0.138 if 10.0.0.1 doesn't respond (some Xfinity models).",
      "Factory reset: hold Reset for 10–15 seconds.",
    ],
    firmwareTip:
      "Xfinity gateways receive firmware updates automatically from Comcast. Cisco routers can be updated via admin panel → Administration → Firmware. Apple AirPort devices are managed exclusively via the AirPort Utility app.",
    faqs: [
      {
        question: "What devices use 10.0.0.1?",
        answer:
          "Xfinity/Comcast gateways, Apple AirPort Express/Extreme, and many Cisco business routers use 10.0.0.1 as their default gateway.",
      },
      {
        question: "What are the default Xfinity login credentials?",
        answer:
          "Xfinity (Comcast) gateways default to username: admin, password: password. Change these immediately after logging in.",
      },
      {
        question: "How do I access my Xfinity router admin panel?",
        answer:
          "Go to http://10.0.0.1 or use the Xfinity app. Login with admin / password. The Xfinity admin panel also allows parental controls, port forwarding, and Wi-Fi settings.",
      },
      {
        question: "Why is 10.0.0.1 not loading?",
        answer:
          "Common causes: VPN blocking local network, not connected to the correct router, or your router uses a different gateway. Run ipconfig to check your actual gateway.",
      },
      {
        question: "Is 10.0.0.1 a public IP?",
        answer:
          "No. 10.0.0.1 is in the 10.0.0.0/8 private address range (RFC 1918). It is only accessible from within your local network.",
      },
      {
        question: "Can I change Xfinity's default gateway from 10.0.0.1?",
        answer:
          "Yes, you can change the LAN IP in the Xfinity admin panel under Gateway → Connection → Local IP. However, be cautious as this can disrupt network connectivity.",
      },
      {
        question: "What is Apple AirPort and how do I access it at 10.0.0.1?",
        answer:
          "Apple AirPort is Apple's discontinued Wi-Fi router line. Management is done via AirPort Utility app (Mac/iOS), not the web interface. The gateway 10.0.0.1 is limited in browser-based control.",
      },
      {
        question: "How do I factory reset a Xfinity gateway?",
        answer:
          "Hold the Reset button on the gateway for 10–15 seconds. The device reboots with factory defaults. Note: this resets all custom settings including Wi-Fi name and password.",
      },
    ],
  },
  "192-168-8-1": {
    address: "192.168.8.1",
    brands: ["Huawei MiFi", "Huawei B series", "Mobile Hotspot"],
    description:
      "192.168.8.1 is the default gateway for Huawei 4G/5G mobile Wi-Fi hotspots (MiFi) and B-series CPE routers. Access the admin panel here to manage mobile data settings, Wi-Fi, and connected devices.",
    defaultUsername: "admin",
    defaultPassword: "admin",
    adminPath: "/",
    notes:
      "Huawei MiFi devices also respond to the Huawei AI Life app or at 192.168.8.1. The default password may be printed on the device label (especially E5573, E5577, B535 series).",
    loginSteps: [
      "Connect your device to the Huawei MiFi Wi-Fi network.",
      "Open a browser and go to http://192.168.8.1.",
      "Enter username: admin and password: admin (or check the device label).",
      "Manage mobile data settings, APN configuration, and connected devices.",
      "Use the Huawei AI Life app for easier mobile management.",
      "Factory reset: hold the Reset button for 10 seconds.",
    ],
    troubleshootingTips: [
      "Connect to the MiFi Wi-Fi network first — not another Wi-Fi.",
      "The Huawei AI Life app provides full management without the web interface.",
      "Disable mobile data on your phone when connecting to the MiFi hotspot.",
      "Try accessing http://192.168.8.1 — not https://.",
      "Check the label on the MiFi device for the unique admin password.",
      "Some models use 192.168.1.1 instead of 192.168.8.1.",
    ],
    firmwareTip:
      "Huawei MiFi firmware can be updated via the Huawei AI Life app or at 192.168.8.1 → Settings → System → Firmware Update. Keep firmware updated for security and improved mobile network support.",
    faqs: [
      {
        question: "What devices use 192.168.8.1?",
        answer:
          "Huawei 4G/5G MiFi pocket hotspots (E5573, E5577, E5785) and B-series CPE routers (B535, B818) use 192.168.8.1 as their default gateway. The Huawei 5G CPE Pro also uses this address.",
      },
      {
        question: "What is the default login for 192.168.8.1?",
        answer:
          "Username admin and password admin. Many newer Huawei MiFi models have a unique password printed on the label inside the battery cover — check there first before trying admin/admin.",
      },
      {
        question: "Why is 192.168.8.1 not loading on my phone?",
        answer:
          "The most common cause on smartphones is mobile data overriding the Wi-Fi connection. Go to Settings and turn off mobile data temporarily. Then open a browser and try http://192.168.8.1 again.",
      },
      {
        question: "How do I change the Wi-Fi password at 192.168.8.1?",
        answer:
          "Log in at 192.168.8.1, go to Settings → Wi-Fi → Wi-Fi Settings (or Advanced Settings on some models), change the Wi-Fi Password field, and click Save. All connected devices will be disconnected and must reconnect with the new password.",
      },
      {
        question: "Can I manage a Huawei MiFi from an app instead of 192.168.8.1?",
        answer:
          "Yes. The Huawei AI Life app (available on Android and iOS) provides full management of compatible Huawei routers and MiFi hotspots including Wi-Fi settings, data usage monitoring, and firmware updates.",
      },
      {
        question: "How do I configure the APN at 192.168.8.1?",
        answer:
          "Log in at 192.168.8.1, go to Settings → Mobile Network → APN Settings (or Dial-up → APN Management). Create a new profile with your carrier's APN details and set it as default. Contact your mobile carrier for the correct APN name.",
      },
      {
        question: "How do I factory reset a Huawei MiFi?",
        answer:
          "With the device powered on, press and hold the Reset button (small pinhole) for 10 seconds until all LEDs flash. The device reboots with factory default settings including 192.168.8.1 and admin/admin credentials.",
      },
      {
        question: "What does a red LED mean on a Huawei MiFi?",
        answer:
          "A red LED typically indicates: no SIM card detected, SIM PIN is locked, or no cellular signal in your area. Check the SIM card seating, enter the PIN if required, and move to an area with better coverage.",
      },
      {
        question: "Can I check my data usage at 192.168.8.1?",
        answer:
          "Yes. Log in at 192.168.8.1 and check the Statistics or Data Usage section. You can view monthly data consumption and set alerts. The Huawei AI Life app provides a more detailed usage dashboard.",
      },
      {
        question: "What is the Huawei AI Life app?",
        answer:
          "The Huawei AI Life app is the official management application for Huawei routers and MiFi devices. It provides network overview, connected device management, Wi-Fi settings, data usage tracking, and firmware update notifications.",
      },
      {
        question: "Does 192.168.8.1 work for Huawei 5G CPE routers?",
        answer:
          "Yes. Huawei 5G CPE Pro (H122-373), 5G CPE Win (H312-371), and similar 5G fixed wireless access models use 192.168.8.1. The Huawei AI Life app is the recommended management tool for these devices.",
      },
      {
        question: "Can my Huawei MiFi at 192.168.8.1 run in bridge mode?",
        answer:
          "B-series CPE routers (B535, B818) support bridge mode under Network settings, which disables NAT and passes the public WAN IP to a secondary router. Compact MiFi hotspots typically do not have bridge mode.",
      },
      {
        question: "How do I update Huawei MiFi firmware at 192.168.8.1?",
        answer:
          "Log in at 192.168.8.1, go to Settings → System → Firmware Update, and click Check for Updates. Alternatively, use the Huawei AI Life app which notifies you of available updates automatically.",
      },
      {
        question: "My Huawei MiFi shows 192.168.8.1 but I cannot access it from laptop",
        answer:
          "Check that your laptop is connected to the Huawei Wi-Fi network and that your Default Gateway is 192.168.8.1 (run ipconfig). Also check if a VPN is active — VPNs block local subnet access. Try an Incognito browser window to eliminate cache issues.",
      },
      {
        question: "Is it safe to use http:// for 192.168.8.1?",
        answer:
          "Yes. Using plain HTTP to access a local router admin panel is safe because the connection never leaves your local network. Data exchanged with 192.168.8.1 cannot be intercepted by external parties.",
      },
    ],
    routerBrands: [
      { brand: "Huawei CPE", models: "B535, B818", defaultLogin: "admin / (sticker password)", alternativeUrl: "AI Life App" },
      { brand: "Huawei MiFi", models: "E5573, E5577", defaultLogin: "admin / admin", alternativeUrl: "AI Life App" },
      { brand: "Huawei Mobile WiFi", models: "Pro series", defaultLogin: "admin / admin", alternativeUrl: "AI Life App" }
    ],
  },
  "192-168-1-254": {
    address: "192.168.1.254",
    brands: ["BT Hub", "Virgin Media", "SpeedTouch", "Thomson"],
    description:
      "192.168.1.254 is the default admin IP for BT Smart Hub routers (UK), Virgin Media Super Hubs, Thomson/SpeedTouch DSL modems, and various ISP-provided routers in Europe.",
    defaultUsername: "admin",
    defaultPassword: "admin",
    adminPath: "/",
    notes:
      "BT Smart Hubs also respond at bthomehub.home. Virgin Media Super Hub 3 and 4 use 192.168.0.1 — check your specific model. Thomson modems typically have a blank password.",
    loginSteps: [
      "Connect to the router via Wi-Fi or Ethernet.",
      "Open a browser and go to http://192.168.1.254.",
      "BT Hub: use the password printed on the bottom of the hub.",
      "Thomson/SpeedTouch: use admin / admin or admin / (blank).",
      "For BT Smart Hub, also try bthomehub.home.",
      "Factory reset: hold Reset button for 10 seconds.",
    ],
    troubleshootingTips: [
      "BT Smart Hub admin password is printed on the hub's label — not admin/admin.",
      "Try bthomehub.home as an alternative URL for BT routers.",
      "Virgin Media: try 192.168.0.1 if 192.168.1.254 doesn't work.",
      "Disable VPN before accessing the admin panel.",
      "Thomson modems often have a blank password — just press Enter.",
    ],
    firmwareTip:
      "BT Smart Hub firmware updates are pushed automatically by BT. For Thomson/SpeedTouch modems, firmware updates are available from your ISP. Contact your ISP for updates on ISP-provided equipment.",
    faqs: [
      {
        question: "What routers use 192.168.1.254?",
        answer:
          "BT Smart Hub (UK), Virgin Media Super Hub (older models), Thomson/SpeedTouch DSL modems, and various European ISP-provided routers use 192.168.1.254.",
      },
      {
        question: "What is the BT Smart Hub admin password?",
        answer:
          "The BT Smart Hub admin password is unique per device and printed on the hub's base label. There is no universal default — look at the sticker on your hub.",
      },
      {
        question: "How do I access the BT Smart Hub admin panel?",
        answer:
          "Go to http://192.168.1.254 or bthomehub.home while connected to your BT Wi-Fi. Use the password from the hub's label.",
      },
      {
        question: "Why won't 192.168.1.254 load?",
        answer:
          "Check that you're on the router's Wi-Fi or Ethernet. Disable VPN. Try bthomehub.home. Your router may use a different gateway — run ipconfig to verify.",
      },
      {
        question: "How do I reset a BT Smart Hub?",
        answer:
          "Hold the Reset button on the back for 10 seconds. The hub reboots with factory settings and will use the credentials on the label.",
      },
      {
        question: "Does Virgin Media use 192.168.1.254?",
        answer:
          "Older Virgin Media Super Hub models use 192.168.1.254. Newer Super Hub 3/4 models may use 192.168.0.1. Check the label on your hub.",
      },
      {
        question: "What is the Thomson/SpeedTouch default login?",
        answer:
          "Thomson DSL modems use admin / admin or admin with a blank password. The admin panel at 192.168.1.254 provides DSL line stats and Wi-Fi configuration.",
      },
      {
        question: "Can I change BT Smart Hub settings at 192.168.1.254?",
        answer:
          "Yes. You can change Wi-Fi password, DNS servers, port forwarding, and parental controls. BT locks some advanced features — contact BT support for ISP-level changes.",
      },
    ],
  },
  "10-0-0-138": {
    address: "10.0.0.138",
    brands: ["Xfinity", "Comcast XB7", "Comcast XB8"],
    description:
      "10.0.0.138 is associated with Xfinity (Comcast) XB7 and XB8 gateways as a secondary management address. The primary admin IP for Xfinity is 10.0.0.1. Use the Xfinity app for the easiest management.",
    defaultUsername: "admin",
    defaultPassword: "password",
    adminPath: "/",
    notes:
      "10.0.0.1 is the primary Xfinity gateway address. 10.0.0.138 may appear as a device on your network rather than the gateway itself. Use the Xfinity app or 10.0.0.1 for admin access.",
    loginSteps: [
      "Connect to the Xfinity network via Wi-Fi or Ethernet.",
      "Try the primary admin IP: http://10.0.0.1.",
      "If 10.0.0.1 doesn't work, the Xfinity app is the recommended management tool.",
      "Log in with admin / password or your custom credentials.",
      "For technical users, 10.0.0.138 may appear in advanced network diagnostics.",
      "Factory reset: hold Reset button on the gateway for 10–15 seconds.",
    ],
    troubleshootingTips: [
      "Use http://10.0.0.1 as the primary Xfinity gateway address instead.",
      "The Xfinity app provides easier access to most settings.",
      "Disable VPN — it blocks local subnet access.",
      "Run ipconfig to verify your actual default gateway.",
      "Contact Xfinity support for ISP-level configuration changes.",
    ],
    firmwareTip:
      "Xfinity gateways receive firmware updates automatically from Comcast. You cannot manually update firmware on Xfinity-provided equipment. Contact Xfinity support for firmware-related issues.",
    faqs: [
      {
        question: "What is 10.0.0.138 used for?",
        answer:
          "10.0.0.138 is associated with Xfinity/Comcast hardware. The primary admin IP for Xfinity gateways is 10.0.0.1. Use the Xfinity app or http://10.0.0.1 to manage your gateway.",
      },
      {
        question: "Is 10.0.0.1 or 10.0.0.138 the correct Xfinity admin IP?",
        answer:
          "10.0.0.1 is the standard Xfinity gateway admin IP. Use http://10.0.0.1 to log in with admin / password.",
      },
      {
        question: "How do I access Xfinity router settings?",
        answer:
          "Go to http://10.0.0.1 or use the Xfinity app. Default login: admin / password. The Xfinity app offers the most complete management experience.",
      },
      {
        question: "Can I change settings on my Xfinity gateway?",
        answer:
          "Yes. At http://10.0.0.1 you can change Wi-Fi name, password, security settings, and port forwarding. Some ISP-level settings are locked by Comcast.",
      },
      {
        question: "How do I factory reset my Xfinity gateway?",
        answer:
          "Hold the Reset button on the back of the gateway for 10–15 seconds. The device reboots with factory settings. This resets your Wi-Fi name and password.",
      },
      {
        question: "What is the Xfinity gateway model XB7/XB8?",
        answer:
          "XB7 (Technicolor CGM4981) and XB8 (CommScope) are Comcast's Wi-Fi 6 gateways combining cable modem and router. Admin access at http://10.0.0.1.",
      },
      {
        question: "Does Xfinity support Wi-Fi 6?",
        answer:
          "Yes. The Xfinity XB7 and XB8 gateways support Wi-Fi 6 (802.11ax). The XFi Pods provide mesh coverage extension.",
      },
      {
        question: "How do I update Xfinity firmware?",
        answer:
          "Xfinity pushes firmware updates automatically to gateways. You cannot manually trigger updates. If you're having issues, contact Xfinity support.",
      },
    ],
  },
};

export async function generateStaticParams() {
  // Include both DB-driven IPs and the static fallback IPs
  const staticSlugs = Object.keys(STATIC_IP_DATA).map((ip) => ({ ip }));
  try {
    const dbSlugs = await IpService.getAllPaths();
    // Merge, deduplicating by slug
    const allSlugs = new Map<string, { ip: string }>();
    for (const s of [...staticSlugs, ...dbSlugs]) allSlugs.set(s.ip, s);
    return Array.from(allSlugs.values());
  } catch {
    console.warn("[Build] Skipping IP DB SSG — database unavailable. Using static fallback.");
    return staticSlugs;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ip: ipSlug } = await params;

  // Try DB first
  if (hasDatabase) {
    try {
      const ip = await IpService.getBySlug(ipSlug);
      if (ip) {
        return buildIpMetadata({
          ipAddress: ip.address,
          ipSlug: ip.slug,
          brands: ip.commonBrands,
        });
      }
    } catch {}
  }

  // Fall back to static data
  const staticData = STATIC_IP_DATA[ipSlug];
  if (staticData) {
    return buildIpMetadata({
      ipAddress: staticData.address,
      ipSlug: ipSlug,
      brands: staticData.brands,
    });
  }

  return {};
}

export const revalidate = 86400;

export default async function IpPage({ params }: Props) {
  const { ip: ipSlug } = await params;

  // ── Try live DB record first ──────────────────────────────────────────────
  let dbIp = null;
  if (hasDatabase) {
    try {
      dbIp = await IpService.getBySlug(ipSlug);
      if (dbIp) {
        AnalyticsService.logEvent("PAGE_VIEW", { url: `/ips/${dbIp.slug}`, title: dbIp.address });
      }
    } catch {}
  }

  // ── Fall back to static data ───────────────────────────────────────────────
  const staticData = STATIC_IP_DATA[ipSlug];
  if (!dbIp && !staticData) notFound();

  // When using DB, render the full DB-driven layout
  if (dbIp) {
    const staticFallback = STATIC_IP_DATA[dbIp.slug];
    const breadcrumbs = [
      { label: "IP Addresses", href: "/ips" },
      { label: dbIp.address, href: `/ips/${dbIp.slug}` },
    ];

    return (
      <>
        <JsonLd data={buildBreadcrumbSchema([{ label: "Home", href: "/" }, ...breadcrumbs], APP_URL)} />
        {dbIp.faqs.length > 0 && <JsonLd data={buildFaqSchema(dbIp.faqs)} />}
        <JsonLd
          data={generateSemanticArticleSchema(
            `${dbIp.address} Router Login Guide`,
            dbIp.metaDescription || dbIp.description,
            `https://routervia.com/ips/${dbIp.slug}`,
            dbIp.createdAt,
            dbIp.updatedAt,
            dbIp.decayScore ?? 0.9,
            "RouterVia",
            "https://routervia.com"
          )}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumb items={breadcrumbs} className="mb-8" />

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-3">
              <span className="font-mono text-[var(--brand-400)]">{dbIp.address}</span>
              {" "}— Router Admin Login Page
            </h1>
            <p className="text-[var(--text-secondary)] text-lg">{dbIp.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {dbIp.commonBrands.map((brand) => (
                <Badge key={brand} variant="brand">{brand}</Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <section className="glass-card p-6">
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-5 flex items-center gap-2">
                  <Wrench size={20} className="text-[var(--brand-400)]" />
                  How to Login at {dbIp.address}
                </h2>
                <div
                  className="prose-dark"
                  dangerouslySetInnerHTML={{ __html: markdownToHtml(dbIp.loginGuide) }}
                />
              </section>

              <section className="glass-card p-6 border-amber-800/50 bg-amber-900/10">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={20} className="text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)] mb-2">
                      Can&apos;t access {dbIp.address}?
                    </h3>
                    <ul className="text-sm text-[var(--text-secondary)] space-y-1.5 list-disc pl-4">
                      <li>Make sure you&apos;re connected to the router (WiFi or cable)</li>
                      <li>Check your Default Gateway: run <code className="text-[var(--accent-400)] bg-[var(--bg-elevated)] px-1 rounded">ipconfig</code> on Windows</li>
                      <li>Try <Link href="/ips/192-168-0-1" className="text-[var(--brand-400)] hover:underline">192.168.0.1</Link> or <Link href="/ips/192-168-1-1" className="text-[var(--brand-400)] hover:underline">192.168.1.1</Link> if this doesn&apos;t work</li>
                      <li>Disable VPN if you&apos;re using one</li>
                    </ul>
                  </div>
                </div>
              </section>

              {staticFallback?.firmwareTip && (
                <section className="glass-card p-6 border-l-2 border-[var(--brand-400)]">
                  <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                    <RefreshCw size={18} className="text-[var(--brand-400)]" />
                    Firmware &amp; Security
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {staticFallback.firmwareTip}
                  </p>
                </section>
              )}

              {dbIp.faqs.length > 0 && (
                <section className="glass-card p-6">
                  <h2 className="text-xl font-bold text-[var(--text-primary)] mb-5 flex items-center gap-2">
                    <HelpCircle size={20} className="text-[var(--accent-400)]" />
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {dbIp.faqs.map((faq, i) => (
                      <details key={i} className="group border border-[var(--border-subtle)] rounded-xl overflow-hidden">
                        <summary className="flex items-center justify-between p-4 cursor-pointer list-none hover:bg-[var(--bg-elevated)] transition-colors">
                          <span className="font-medium text-[var(--text-primary)] pr-4">{faq.question}</span>
                          <ChevronDown size={16} className="text-[var(--text-muted)] flex-shrink-0 group-open:rotate-180 transition-transform" />
                        </summary>
                        <div className="px-4 pb-4 text-[var(--text-secondary)] text-sm leading-relaxed border-t border-[var(--border-subtle)] pt-3">
                          {faq.answer}
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              <RelatedProblemsForIp ipAddress={dbIp.address} diagnosticCategory={dbIp.diagnosticCategory} />
              <RelatedArticles
                diagnosticCategory={dbIp.diagnosticCategory}
                currentId={`ip-${dbIp.id}`}
                currentType="IP"
              />
            </div>

            <aside className="space-y-4">
              <div className="glass-card p-5">
                <h3 className="text-sm font-bold text-[var(--text-primary)] mb-4">Common Routers Using This IP</h3>
                <ul className="space-y-2">
                  {dbIp.commonBrands.map((brand) => (
                    <li key={brand}>
                      <Link
                        href={`/routers/${brand.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-sm text-[var(--brand-400)] hover:underline"
                      >
                        {brand} routers →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-card p-5 border border-[var(--brand-800)] bg-[var(--brand-900)]/20">
                <p className="text-sm font-semibold text-[var(--text-primary)] mb-2">Need help?</p>
                <p className="text-xs text-[var(--text-secondary)] mb-4">Our AI assistant can walk you through the login process step by step.</p>
                <Link href="/assistant" className="block w-full text-center py-2 px-4 rounded-lg bg-[var(--brand-600)] hover:bg-[var(--brand-500)] text-white text-sm font-semibold transition-colors">
                  Ask AI Assistant
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </>
    );
  }

  // ── Static fallback layout ─────────────────────────────────────────────────
  const d = staticData!;
  const breadcrumbs = [
    { label: "IP Addresses", href: "/ips" },
    { label: d.address, href: `/ips/${ipSlug}` },
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
            <Globe size={28} className="text-[var(--brand-400)]" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)] mb-1">
              <span className="font-mono text-[var(--brand-400)]">{d.address}</span>
              {" "}— Router Admin Login
            </h1>
            <p className="text-[var(--text-secondary)] max-w-2xl mb-3">{d.description}</p>
            <div className="flex flex-wrap gap-2">
              {d.brands.map((brand) => (
                <Badge key={brand} variant="brand">{brand}</Badge>
              ))}
            </div>
          </div>
        </div>

        {/* ── Quick Credentials Panel ── */}
        <section>
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Lock size={18} className="text-[var(--brand-400)]" />
            Default Login Credentials
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "IP Address", value: d.address, sub: "enter in browser", icon: Globe },
              { label: "Username", value: d.defaultUsername, sub: "default", icon: Lock },
              { label: "Password", value: d.defaultPassword, sub: "change after login", icon: Shield },
              { label: "Admin Path", value: d.adminPath, sub: "URL path", icon: Wrench },
            ].map(({ label, value, sub, icon: Icon }) => (
              <div key={label} className="glass-card p-5 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[var(--brand-900)] border border-[var(--brand-800)] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={16} className="text-[var(--brand-400)]" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-[var(--text-muted)] mb-0.5">{label}</p>
                  <p className="font-mono font-bold text-[var(--text-primary)] truncate">{value}</p>
                  <p className="text-xs text-[var(--text-secondary)] truncate">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Step-by-step login guide ── */}
        <section>
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Wrench size={18} className="text-[var(--brand-400)]" />
            How to Log In at {d.address}
          </h2>
          <div className="glass-card p-6">
            <ol className="space-y-3">
              {d.loginSteps.map((step, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-[var(--brand-900)] border border-[var(--brand-800)] flex items-center justify-center text-xs font-bold text-[var(--brand-400)] flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-[var(--text-secondary)]">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Troubleshooting Tips ── */}
        <section>
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <AlertTriangle size={18} className="text-amber-400" />
            Can&apos;t Access {d.address}? Troubleshooting
          </h2>
          <div className="glass-card p-6 border border-amber-500/20 bg-amber-500/5">
            <ul className="space-y-2.5">
              {d.troubleshootingTips.map((tip, i) => (
                <li key={i} className="flex gap-2.5 items-start text-sm text-[var(--text-secondary)]">
                  <span className="text-amber-400 mt-0.5 flex-shrink-0">→</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Notes Panel ── */}
        <section>
          <div className="glass-card p-5 border-l-2 border-[var(--brand-400)]">
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              <span className="font-semibold text-[var(--text-primary)]">💡 Note: </span>
              {d.notes}
            </p>
          </div>
        </section>

        {/* ── Brand Router Links ── */}
        <section>
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Link2 size={18} className="text-[var(--brand-400)]" />
            Routers Using {d.address}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {d.brands.map((brand) => (
              <Link
                key={brand}
                href={`/routers/${brand.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`}
                className="glass-card p-4 flex items-center justify-between gap-2 hover:border-[var(--border-strong)] hover:bg-[var(--bg-hover)] transition-all group"
              >
                <span className="text-sm font-semibold text-[var(--text-primary)]">{brand}</span>
                <ChevronRight size={14} className="text-[var(--brand-400)] flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ))}
          </div>
        </section>

        {/* ── Router Brands Table ── */}
        {d.routerBrands && d.routerBrands.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <Link2 size={18} className="text-[var(--brand-400)]" />
              Default Login Details by Brand
            </h2>
            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-[var(--border-subtle)] text-sm">
                  <thead>
                    <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-semibold">
                      <th className="px-5 py-3 text-left">Brand</th>
                      <th className="px-5 py-3 text-left">Common Models</th>
                      <th className="px-5 py-3 text-left">Default Login</th>
                      <th className="px-5 py-3 text-left">Alternative Access</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-secondary)]">
                    {d.routerBrands.map((item, i) => (
                      <tr key={i} className="hover:bg-[var(--bg-hover)] transition-colors">
                        <td className="px-5 py-3.5 font-bold text-[var(--text-primary)]">{item.brand}</td>
                        <td className="px-5 py-3.5">{item.models}</td>
                        <td className="px-5 py-3.5 font-mono text-xs">{item.defaultLogin}</td>
                        <td className="px-5 py-3.5 font-mono text-xs text-[var(--brand-400)]">
                          {item.alternativeUrl || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* ── Firmware Tip ── */}
        <section>
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <RefreshCw size={18} className="text-[var(--brand-400)]" />
            Firmware &amp; Security
          </h2>
          <div className="glass-card p-6 border-l-2 border-[var(--brand-400)]">
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{d.firmwareTip}</p>
          </div>
        </section>

        {/* ── FAQ Accordion ── */}
        <section>
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <HelpCircle size={18} className="text-[var(--accent-400)]" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {d.faqs.map((faq, i) => (
              <details key={i} className="glass-card group overflow-hidden">
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
              { label: "IP Directory", href: "/ips" },
              { label: "Router Brands", href: "/routers" },
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

function markdownToHtml(md: string): string {
  return md
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/\n\n/g, "<br/><br/>")
    .replace(/\n/g, "<br/>");
}
