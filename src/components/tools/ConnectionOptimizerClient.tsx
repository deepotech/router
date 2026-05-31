"use client";

import { useState } from "react";
import {
  Wifi,
  WifiOff,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  BookOpen,
  Clock,
  Activity,
  Layers,
  Settings,
  Shield,
  Zap,
  Server,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export type OptimizerMode =
  | "slow-router"
  | "dns-fix"
  | "ethernet-no-internet"
  | "gaming-settings"
  | "wifi-signal"
  | "router-restarts"
  | "mobile-no-internet"
  | "modem-sync"
  | "router-admin"
  | "dns-optimizer"
  | "ethernet-speed"
  | "dns-setup"
  | "latency";

interface ConnectionOptimizerClientProps {
  mode: OptimizerMode;
}

interface Question {
  id: number;
  text: string;
  options: { label: string; value: string }[];
}

interface ActionStep {
  title: string;
  priority: "High" | "Medium" | "Low";
  time: string;
  description: string;
  tip?: string;
}

interface AssessmentResult {
  title: string;
  severity: "danger" | "warning" | "info" | "success";
  description: string;
  steps: ActionStep[];
  technicalExplanation: string;
}

const OPTIMIZER_DATA: Record<OptimizerMode, {
  title: string;
  icon: any;
  description: string;
  questions: Question[];
}> = {
  "slow-router": {
    title: "Slow Router Speed Assistant",
    icon: Activity,
    description: "Diagnose why your router is bottlenecking internet speeds, causing buffers, and failing under heavy network demands.",
    questions: [
      {
        id: 1,
        text: "How old is your current home router?",
        options: [
          { label: "Under 2 years old (Modern Wi-Fi 6 or 6E)", value: "modern" },
          { label: "2 to 5 years old (Wi-Fi 5 / Dual-Band)", value: "mid-age" },
          { label: "Over 5 years old (Legacy Single/Dual-Band)", value: "legacy" }
        ]
      },
      {
        id: 2,
        text: "Which Wi-Fi band or physical connection are you experiencing issues on?",
        options: [
          { label: "2.4 GHz wireless connection (longer range)", value: "2.4ghz" },
          { label: "5 GHz wireless connection (shorter range)", value: "5ghz" },
          { label: "Wired Ethernet connection (direct to router)", value: "wired" },
          { label: "Smart Connect (combined 2.4/5GHz under one name)", value: "smart" }
        ]
      },
      {
        id: 3,
        text: "What is your subscribed internet download speed from your ISP?",
        options: [
          { label: "Under 100 Mbps (Basic broadband)", value: "low-tier" },
          { label: "100 Mbps to 500 Mbps (Standard high-speed)", value: "mid-tier" },
          { label: "500 Mbps or greater (Gigabit/Fiber connection)", value: "high-tier" }
        ]
      }
    ]
  },
  "dns-fix": {
    title: "DNS Connection Optimizer",
    icon: Server,
    description: "Determine why your DNS queries are failing, causing page timeouts, or showing lookup configuration errors.",
    questions: [
      {
        id: 1,
        text: "What specific DNS error is displayed on your web browser?",
        options: [
          { label: "DNS Server Not Responding / Timeouts", value: "responding-error" },
          { label: "DNS_PROBE_FINISHED_NXDOMAIN (domain lookup fails)", value: "nxdomain" },
          { label: "Pages are slow to start loading, but load fine once started", value: "slow-lookup" }
        ]
      },
      {
        id: 2,
        text: "Which DNS servers are configured on your network gateway/adapter?",
        options: [
          { label: "Obtain automatically (Assigned by your ISP)", value: "isp-dns" },
          { label: "Custom Public DNS (e.g., Cloudflare 1.1.1.1, Google 8.8.8.8)", value: "custom-dns" },
          { label: "Unsure or default settings", value: "unsure-dns" }
        ]
      },
      {
        id: 3,
        text: "Are you running an active Virtual Private Network (VPN) or local security suite?",
        options: [
          { label: "Yes, an active VPN software is running", value: "vpn-active" },
          { label: "Yes, third-party firewall/antivirus is installed", value: "firewall-active" },
          { label: "No, using standard operating system security profiles", value: "standard-security" }
        ]
      }
    ]
  },
  "ethernet-no-internet": {
    title: "Ethernet Connectivity Diagnostics",
    icon: AlertTriangle,
    description: "Diagnose why your wired LAN connection is established but network status displays 'No Internet Access'.",
    questions: [
      {
        id: 1,
        text: "What indicator status is shown on your system tray icon?",
        options: [
          { label: "Yellow warning triangle or 'Unidentified Network'", value: "unidentified" },
          { label: "Connected (but web browsers refuse to resolve pages)", value: "connected-timeout" },
          { label: "Red X (cable disconnected status)", value: "disconnected-red-x" }
        ]
      },
      {
        id: 2,
        text: "Are you able to open the local router administration page (e.g. 192.168.1.1)?",
        options: [
          { label: "Yes, I can load and login to the router portal", value: "local-ok" },
          { label: "No, the gateway login times out", value: "local-fail" }
        ]
      },
      {
        id: 3,
        text: "How is your device's local IP address allocated?",
        options: [
          { label: "Assigned automatically via DHCP (standard)", value: "dhcp" },
          { label: "Static IP configuration (manual details entered)", value: "static" },
          { label: "Unsure / using default configuration", value: "unsure-ip" }
        ]
      }
    ]
  },
  "gaming-settings": {
    title: "Gaming Router Optimizer",
    icon: Zap,
    description: "Fine-tune router performance settings to reduce gaming ping, eliminate bufferbloat, and open NAT Type profiles.",
    questions: [
      {
        id: 1,
        text: "What is your console or PC's reported NAT Type?",
        options: [
          { label: "Strict (Type 3) - Constant lobby disconnections", value: "strict" },
          { label: "Moderate (Type 2) - Minor multiplayer join errors", value: "moderate" },
          { label: "Open (Type 1) - Best matching connection", value: "open" }
        ]
      },
      {
        id: 2,
        text: "What is your primary gaming device connection type?",
        options: [
          { label: "Wi-Fi (Wireless connection)", value: "wifi" },
          { label: "Wired Ethernet (Direct connection)", value: "ethernet" },
          { label: "Powerline adapters or wireless range extenders", value: "extender" }
        ]
      },
      {
        id: 3,
        text: "Does ping spike dramatically when other devices upload or download files?",
        options: [
          { label: "Yes, heavy latency spikes occur (severe bufferbloat)", value: "bufferbloat-yes" },
          { label: "No, ping is consistently high but stable", value: "ping-stable" }
        ]
      }
    ]
  },
  "wifi-signal": {
    title: "Wi-Fi Coverage & Range Diagnostic",
    icon: Wifi,
    description: "Improve wireless coverage, expand router signal penetration, and select optimal broadcast frequencies.",
    questions: [
      {
        id: 1,
        text: "Where is your wireless router physically located in the home?",
        options: [
          { label: "Central area, elevated on a shelf or desk", value: "central" },
          { label: "Corner of the residence or stored on the floor", value: "corner" },
          { label: "Inside a closed cabinet, closet, or media enclosure", value: "closet" }
        ]
      },
      {
        id: 2,
        text: "What materials primarily block the line of sight to your device?",
        options: [
          { label: "Standard drywall and wooden doors", value: "wood-drywall" },
          { label: "Brick, concrete walls, or chimneys", value: "brick-concrete" },
          { label: "Mirrors, glass panels, or metallic studs", value: "glass-metal" }
        ]
      },
      {
        id: 3,
        text: "How many signal bars does your device display at its usual location?",
        options: [
          { label: "1 to 2 bars (Weak signal strength)", value: "low-bars" },
          { label: "3 bars (Moderate signal strength)", value: "mid-bars" },
          { label: "Full signal bars (but speeds fluctuate rapidly)", value: "full-bars" }
        ]
      }
    ]
  },
  "router-restarts": {
    title: "Router Power-Cycle Instability Diagnosis",
    icon: AlertTriangle,
    description: "Identify the root hardware, firmware, or ISP provisioning cause behind your router's random reboot cycles.",
    questions: [
      {
        id: 1,
        text: "How frequently does your router restart on its own?",
        options: [
          { label: "Multiple times per day (severe instability)", value: "frequent" },
          { label: "Once every few days (intermittent issue)", value: "intermittent" },
          { label: "Only during peak usage hours (load-triggered)", value: "peak" }
        ]
      },
      {
        id: 2,
        text: "How old is the router, and do you notice it running very hot to the touch?",
        options: [
          { label: "Over 4 years old and feels very warm/hot", value: "old-hot" },
          { label: "Under 3 years old but still overheating", value: "young-hot" },
          { label: "Any age but temperature feels normal", value: "normal-temp" }
        ]
      },
      {
        id: 3,
        text: "Did the random reboots begin after a firmware update or ISP equipment change?",
        options: [
          { label: "Yes — started right after a firmware update", value: "post-firmware" },
          { label: "Yes — ISP swapped my modem or ONT recently", value: "post-isp-change" },
          { label: "No — gradual onset over weeks or months", value: "gradual" }
        ]
      }
    ]
  },
  "mobile-no-internet": {
    title: "Mobile Device Wi-Fi Connectivity Analyzer",
    icon: WifiOff,
    description: "Diagnose why your phone connects to Wi-Fi but shows no internet — covering Android, iOS, VPN, and captive portal conflicts.",
    questions: [
      {
        id: 1,
        text: "What type of device is experiencing the Wi-Fi no-internet issue?",
        options: [
          { label: "Android phone or tablet", value: "android" },
          { label: "iPhone or iPad (iOS/iPadOS)", value: "iphone" },
          { label: "Both Android and iPhone on the same network", value: "both-platforms" }
        ]
      },
      {
        id: 2,
        text: "Does the issue occur on this network only, or on all Wi-Fi networks?",
        options: [
          { label: "Only on my home/office Wi-Fi network", value: "network-specific" },
          { label: "On all Wi-Fi networks I connect to", value: "all-networks" },
          { label: "Intermittently — works sometimes, fails others", value: "intermittent" }
        ]
      },
      {
        id: 3,
        text: "Is a VPN, Private Relay (iCloud), or mobile security app active on your device?",
        options: [
          { label: "Yes — I use a VPN app regularly", value: "vpn-active" },
          { label: "Yes — iCloud Private Relay is enabled (iPhone)", value: "private-relay" },
          { label: "No — no VPN or extra security apps running", value: "no-vpn" }
        ]
      }
    ]
  },
  "modem-sync": {
    title: "Modem Signal Synchronization Diagnostic",
    icon: Layers,
    description: "Analyze why your modem's online light is blinking and it cannot complete downstream channel bonding or upstream registration.",
    questions: [
      {
        id: 1,
        text: "What type of internet connection does your modem use?",
        options: [
          { label: "Cable/HFC (coaxial cable from wall)", value: "cable" },
          { label: "Fiber optic (ONT device with ethernet or optical port)", value: "fiber" },
          { label: "DSL (telephone line copper connection)", value: "dsl" }
        ]
      },
      {
        id: 2,
        text: "How long has the modem been blinking without establishing sync?",
        options: [
          { label: "Just started — been blinking under 30 minutes", value: "new-onset" },
          { label: "Several hours or since a power outage", value: "extended" },
          { label: "Repeatedly drops and re-syncs throughout the day", value: "recurring" }
        ]
      },
      {
        id: 3,
        text: "Are there cable TV splitters, old wall sockets, or long coax runs on your line?",
        options: [
          { label: "Yes — there are one or more cable splitters installed", value: "splitter" },
          { label: "Old wiring — house built over 20 years ago", value: "old-wiring" },
          { label: "No — direct clean coax run to the modem", value: "clean-line" }
        ]
      }
    ]
  },
  "router-admin": {
    title: "Router Admin Page Access Diagnostic",
    icon: Shield,
    description: "Troubleshoot why your router's admin dashboard (e.g. 192.168.1.1) is unreachable, timing out, or showing certificate errors.",
    questions: [
      {
        id: 1,
        text: "What happens when you try to open the router admin page in your browser?",
        options: [
          { label: "Page times out — connection refused or no response", value: "timeout" },
          { label: "Browser shows SSL certificate error or 'Not Secure' warning", value: "ssl-error" },
          { label: "Login page loads but credentials are rejected", value: "auth-fail" }
        ]
      },
      {
        id: 2,
        text: "What is your current connection type when trying to access the admin page?",
        options: [
          { label: "Connected via Wi-Fi to the router", value: "wifi-connected" },
          { label: "Connected via Ethernet cable directly to the router", value: "eth-connected" },
          { label: "Trying to access remotely over the internet", value: "remote-access" }
        ]
      },
      {
        id: 3,
        text: "Have you recently changed the router's IP address, subnet, or enabled AP mode?",
        options: [
          { label: "Yes — I modified LAN IP or subnet settings", value: "ip-changed" },
          { label: "Yes — router is set to AP/bridge mode", value: "ap-mode" },
          { label: "No — no configuration changes were made", value: "no-change" }
        ]
      }
    ]
  },
  "dns-optimizer": {
    title: "DNS Resolver Performance Optimizer",
    icon: Server,
    description: "Find the fastest, most private DNS resolver for your region — comparing Cloudflare, Google, Quad9, and ISP resolvers.",
    questions: [
      {
        id: 1,
        text: "What is your primary goal for changing your DNS resolver?",
        options: [
          { label: "Faster page load speeds and lower latency", value: "speed" },
          { label: "Better privacy — no query logging or tracking", value: "privacy" },
          { label: "Malware and phishing domain blocking", value: "security" }
        ]
      },
      {
        id: 2,
        text: "What type of internet activity consumes most of your bandwidth?",
        options: [
          { label: "Online gaming (low-latency is critical)", value: "gaming" },
          { label: "Video streaming and large file downloads", value: "streaming" },
          { label: "General browsing and remote work", value: "general" }
        ]
      },
      {
        id: 3,
        text: "Do you currently use DNS over HTTPS (DoH) or DNS over TLS (DoT)?",
        options: [
          { label: "No — using standard unencrypted DNS on port 53", value: "plain-dns" },
          { label: "Yes — DoH or DoT is already configured", value: "encrypted-dns" },
          { label: "Unsure — using whatever my router defaulted to", value: "unsure" }
        ]
      }
    ]
  },
  "ethernet-speed": {
    title: "Wired LAN Speed Bottleneck Analyzer",
    icon: Activity,
    description: "Diagnose why your Ethernet connection is slower than Wi-Fi — covering duplex mismatches, cable quality, NIC settings, and switch limits.",
    questions: [
      {
        id: 1,
        text: "What speed does your operating system report for the Ethernet link?",
        options: [
          { label: "100 Mbps (capped — Fast Ethernet negotiation)", value: "100mbps" },
          { label: "1 Gbps (Gigabit) but throughput is still low", value: "1gbps-slow" },
          { label: "Connection drops and re-negotiates frequently", value: "unstable" }
        ]
      },
      {
        id: 2,
        text: "What Ethernet cable category are you using?",
        options: [
          { label: "Cat5 or older (max 100 Mbps at long runs)", value: "cat5" },
          { label: "Cat5e or Cat6 (Gigabit capable)", value: "cat5e-cat6" },
          { label: "Unknown — cable came with a device or router", value: "unknown-cable" }
        ]
      },
      {
        id: 3,
        text: "Is Energy Efficient Ethernet (EEE) or Green Ethernet enabled in your NIC driver?",
        options: [
          { label: "Yes — EEE is enabled (default on most drivers)", value: "eee-on" },
          { label: "No — I disabled it already", value: "eee-off" },
          { label: "Unsure — I have not checked NIC advanced settings", value: "eee-unknown" }
        ]
      }
    ]
  },
  "dns-setup": {
    title: "Custom DNS Router Configuration Assistant",
    icon: Settings,
    description: "Step-by-step guidance to configure custom DNS resolvers on your specific router brand — including IPv6 fallback and propagation verification.",
    questions: [
      {
        id: 1,
        text: "Which router brand are you configuring DNS settings on?",
        options: [
          { label: "TP-Link (Archer, Deco, or TL series)", value: "tplink" },
          { label: "ASUS (RT, ZenWifi, or ROG series)", value: "asus" },
          { label: "Netgear (Nighthawk, Orbi, or R series)", value: "netgear" }
        ]
      },
      {
        id: 2,
        text: "Which DNS resolver would you like to configure?",
        options: [
          { label: "Cloudflare DNS (1.1.1.1 / 1.0.0.1) — fastest & private", value: "cloudflare" },
          { label: "Google DNS (8.8.8.8 / 8.8.4.4) — reliable & global", value: "google" },
          { label: "Quad9 (9.9.9.9) — security & malware filtering", value: "quad9" }
        ]
      },
      {
        id: 3,
        text: "Do you also need to configure IPv6 DNS resolvers?",
        options: [
          { label: "Yes — my ISP provides IPv6 connectivity", value: "ipv6-yes" },
          { label: "No — IPv4 only network", value: "ipv6-no" },
          { label: "Unsure — I do not know my IPv6 status", value: "ipv6-unsure" }
        ]
      }
    ]
  },
  "latency": {
    title: "Latency & Packet Loss Diagnostic",
    icon: Activity,
    description: "Diagnose and optimize high ping, jitter, and packet loss affecting gaming, video streaming, and real-time remote applications.",
    questions: [
      {
        id: 1,
        text: "What is your primary issue or where does it occur?",
        options: [
          { label: "Online Gaming (Valorant, Fortnite, CS2, etc.)", value: "gaming" },
          { label: "Video Calls & Streaming (Zoom, Teams, Netflix)", value: "streaming" },
          { label: "Frequent dropouts and slow loading across all sites", value: "general" }
        ]
      },
      {
        id: 2,
        text: "How is your device physically connected to the network?",
        options: [
          { label: "Wi-Fi Connection (Wireless)", value: "wifi" },
          { label: "Wired Ethernet Cable (Direct to Router)", value: "ethernet" },
          { label: "Wi-Fi Extender / Powerline Adapter", value: "extender" }
        ]
      },
      {
        id: 3,
        text: "When does the latency or packet loss occur?",
        options: [
          { label: "Constantly, even when no other network activity", value: "constant" },
          { label: "During peak evening hours or when others are downloading", value: "congested" },
          { label: "Only during specific multiplayer gaming match sessions", value: "servers" }
        ]
      }
    ]
  }
};

export default function ConnectionOptimizerClient({ mode }: ConnectionOptimizerClientProps) {
  const [step, setStep] = useState(0); // 0 = Intro, 1-3 = Questions, 4 = Results
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});

  const config = OPTIMIZER_DATA[mode];
  const ModeIcon = config.icon;
  const currentQuestion = config.questions[step - 1];

  const handleOptionSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    if (step < config.questions.length) {
      setStep((prev) => prev + 1);
    } else {
      setLoading(true);
      setTimeout(() => {
        setStep(config.questions.length + 1);
        setLoading(false);
      }, 1000);
    }
  };

  const resetWizard = () => {
    setStep(0);
    setAnswers({});
    setCheckedSteps({});
  };

  const getResults = (): AssessmentResult => {
    switch (mode) {
      case "slow-router": {
        const q1 = answers[1];
        const q2 = answers[2];
        const q3 = answers[3];

        if (q1 === "legacy") {
          return {
            title: "Outdated Router Hardware Limitation",
            severity: "danger",
            description: "Your router is over 5 years old. Legacy processing units (CPUs) and small RAM partitions are easily exhausted by modern multi-device households, resulting in high latency and packet routing drops.",
            steps: [
              {
                title: "Upgrade to a Modern Wi-Fi 6 (802.11ax) Router",
                priority: "High",
                time: "10 mins",
                description: "Purchase a modern Wi-Fi 6 or 6E router. These platforms use OFDMA and MU-MIMO technologies to process packets from dozens of smart devices concurrently without CPU bottlenecks.",
                tip: "For gigabit plans, choose a router with at least a quad-core 1.5 GHz CPU and 512MB RAM."
              },
              {
                title: "Verify Router Temperature & Ventilation",
                priority: "Medium",
                time: "2 mins",
                description: "Ensure the router is not overheating. Older routers running near thermal limits throttle CPU clock speeds to prevent hardware failure, slowing data throughput.",
              },
              {
                title: "Turn Off Quality of Service (QoS) Bandwidth Caps",
                priority: "Medium",
                time: "3 mins",
                description: "If active, disable QoS. On older hardware, QoS disables hardware NAT engines, forcing the CPU to handle all packets, which caps maximum speed below 150 Mbps.",
              }
            ],
            technicalExplanation: "Legacy routers run on single-core MIPS architecture. Modern web transactions, video streaming, and smart home pings fill the router's connection tracking table (conntrack), depleting the RAM buffer. Once full, the router drops packets, forcing TCP retransmissions that present as a crawl."
          };
        }

        if (q2 === "2.4ghz") {
          return {
            title: "2.4 GHz Band Signal Congestion",
            severity: "warning",
            description: "The 2.4 GHz Wi-Fi band is heavily congested. With only 3 non-overlapping channels (1, 6, 11) and interference from microwaves and neighboring routers, speeds are severely restricted.",
            steps: [
              {
                title: "Migrate High-Speed Devices to the 5 GHz Band",
                priority: "High",
                time: "3 mins",
                description: "Open your device Wi-Fi settings and connect to your router's 5 GHz network (usually suffixed with '_5G'). 5 GHz has wider frequency channels and less interference.",
                tip: "Keep high-throughput systems like TVs, gaming consoles, and work laptops strictly on 5 GHz."
              },
              {
                title: "Configure Channel Width to 20 MHz on 2.4 GHz",
                priority: "Medium",
                time: "4 mins",
                description: "Access your router dashboard (e.g. 192.168.1.1), go to Wireless Settings, and set the 2.4 GHz channel width strictly to 20 MHz. Avoid 40 MHz, which overlaps neighboring channels and causes collisions.",
              },
              {
                title: "Fix Wireless Channel to 1, 6, or 11",
                priority: "High",
                time: "3 mins",
                description: "Set your 2.4 GHz channel selection to 'Manual' and choose the cleanest channel from 1, 6, or 11 based on a Wi-Fi analyzer check. Do not use auto-channels which float.",
              }
            ],
            technicalExplanation: "The 2.4 GHz spectrum spans only 83 MHz. Channel bonding (40 MHz width) in this spectrum overlaps with adjacent Wi-Fi systems, triggering Carrier Sense Multiple Access with Collision Avoidance (CSMA/CA) delays, keeping your devices waiting to talk."
          };
        }

        return {
          title: "ISP Configuration Mismatch or Double NAT",
          severity: "info",
          description: "Your router hardware is modern and connection parameters are healthy. The bottleneck is likely upstream on the WAN link, an unoptimized MTU configuration, or an double NAT setup.",
          steps: [
            {
              title: "Verify Router WAN Negotiation Speed",
              priority: "High",
              time: "3 mins",
              description: "Log into the admin portal, check WAN settings, and ensure the port is negotiating at '1000 Mbps Full Duplex' rather than falling back to '100 Mbps' due to a degraded Ethernet cable.",
            },
            {
              title: "Test WAN Direct Bypass",
              priority: "High",
              time: "5 mins",
              description: "Temporarily plug a laptop directly into the ISP modem's LAN port using a Cat6 cable and run a speed test. If speeds match your plan, your router's configuration is limiting throughput.",
              tip: "If the bypass speed is also slow, contact your ISP as the bottleneck lies on their incoming network fiber/cable."
            },
            {
              title: "Disable Double NAT (Modem Bridge Mode)",
              priority: "Medium",
              time: "5 mins",
              description: "If your router is connected to an ISP-provided gateway, configure the ISP gateway to 'Bridge Mode' to disable its built-in routing, preventing packet parsing redundancy.",
            }
          ],
          technicalExplanation: "If the MTU (Maximum Transmission Unit) is set too high for your ISP configuration, packets will fragment at the WAN interface. This fragmentation forces the router to break down and rebuild packets, increasing latency and reducing overall throughput."
        };
      }

      case "dns-fix": {
        const q1 = answers[1];
        const q2 = answers[2];
        const q3 = answers[3];

        if (q2 === "isp-dns" || q2 === "unsure-dns") {
          return {
            title: "ISP DNS Resolver Outage",
            severity: "danger",
            description: "Your network is configured to use your Internet Service Provider's automatic DNS servers. ISP DNS servers frequently suffer from network load, outages, and poor caching, leading to name resolution errors.",
            steps: [
              {
                title: "Configure Public DNS on Your Router",
                priority: "High",
                time: "5 mins",
                description: "Log into your router admin panel. Go to WAN/DHCP Settings, toggle DNS to manual, and enter Cloudflare DNS (Primary: 1.1.1.1, Secondary: 1.0.0.1) or Google DNS (Primary: 8.8.8.8, Secondary: 8.8.4.4).",
                tip: "Applying DNS at the router level protects all connected devices automatically."
              },
              {
                title: "Flush Local DNS Cache",
                priority: "High",
                time: "2 mins",
                description: "On Windows, open Command Prompt as Administrator and run: 'ipconfig /flushdns'. On macOS, open Terminal and run 'sudo killall -HUP mDNSResponder'.",
              },
              {
                title: "Restart the Router DNS Daemon",
                priority: "Medium",
                time: "2 mins",
                description: "Reboot your router to clear its internal DNS cache and force DHCP client devices to lease the updated DNS settings.",
              }
            ],
            technicalExplanation: "Web browsers request the numeric IP address of domain names from DNS resolvers. If the ISP's DNS resolver fails to respond or times out, the browser cannot open the socket, displaying the 'DNS_PROBE_FINISHED_NO_INTERNET' or 'DNS Server Not Responding' error."
          };
        }

        if (q3 === "vpn-active" || q3 === "firewall-active") {
          return {
            title: "Security Stack Routing Block",
            severity: "warning",
            description: "An active VPN or security firewall has overridden the operating system's routing table, blocking local DNS queries or directing them into a dead network tunnel.",
            steps: [
              {
                title: "Deactivate VPN and Verify Connectivity",
                priority: "High",
                time: "1 min",
                description: "Disconnect your VPN client entirely. Check if websites immediately resolve. If they do, configure the VPN to use its built-in DNS leak protection or enable split tunneling.",
              },
              {
                title: "Reset TCP/IP Winsock Catalog",
                priority: "High",
                time: "3 mins",
                description: "Open Command Prompt as Admin. Type: 'netsh winsock reset' and press enter. Reboot your computer. This resets the network socket bindings altered by security software.",
                tip: "Antivirus firewalls often block outbound port 53 (DNS) queries if they flag anomalous traffic."
              }
            ],
            technicalExplanation: "VPN clients create virtual network adapters (TUN/TAP) that intercept DNS calls. If the VPN application drops its tunnel handshake but fails to release the DNS hooks, the operating system attempts to route query packets into a non-existent tunnel interface."
          };
        }

        return {
          title: "Device DNS Cache Corruption",
          severity: "info",
          description: "Your router and DNS settings are optimal. The issue is likely a local resolver conflict, outdated hosts file mappings, or cache block corruption on this specific computer.",
          steps: [
            {
              title: "Clear Browser Host Cache",
              priority: "High",
              time: "2 mins",
              description: "In Google Chrome, navigate to chrome://net-internals/#dns and click 'Clear host cache'. Repeat for other browsers to clear internal application domain mappings.",
            },
            {
              title: "Disable IPv6 Protocol Conflicts",
              priority: "Medium",
              time: "3 mins",
              description: "Go to Network Settings, right-click your network adapter, select Properties, and uncheck 'Internet Protocol Version 6 (TCP/IPv6)'. This forces clean IPv4 DNS queries.",
              tip: "Incomplete network IPv6 paths often cause DNS queries to fail silently while waiting for AAAA record timeouts."
            }
          ],
          technicalExplanation: "Operating systems cache DNS mappings in RAM. If a domain updates its server IP, the cached IP points to a dead end. Flushing forces the OS to send an active recursive lookup query to retrieve the current records."
        };
      }

      case "ethernet-no-internet": {
        const q1 = answers[1];
        const q2 = answers[2];
        const q3 = answers[3];

        if (q2 === "local-fail") {
          return {
            title: "Local Gateway Disconnection (Layer 2 Failure)",
            severity: "danger",
            description: "Your computer cannot communicate with the router gateway. The physical link is active, but the router is refusing packets or failing to assign an IP address via DHCP.",
            steps: [
              {
                title: "Release and Renew DHCP IP Configuration",
                priority: "High",
                time: "3 mins",
                description: "Open Command Prompt as Admin and run 'ipconfig /release' to release the current invalid IP lease. Then run 'ipconfig /renew' to request a new assignment from the router.",
                tip: "If the command outputs an address starting with 169.254.x.x, the router's DHCP server is unresponsive."
              },
              {
                title: "Power Cycle the Router & Modem",
                priority: "High",
                time: "5 mins",
                description: "Power down the router and unplug it. Wait 30 seconds. Restart the router to reset its internal DHCP lease database and allocation tables.",
              },
              {
                title: "Inspect Ethernet Cable Pins",
                priority: "Medium",
                time: "2 mins",
                description: "Unplug both ends of the Ethernet cable. Inspect the pins for damage, re-insert securely until you hear a clear click, and try a different LAN port on the router.",
              }
            ],
            technicalExplanation: "If the network adapter shows 'Unidentified Network', it has failed to negotiate an IP address via DHCP. The OS falls back to an APIPA (Automatic Private IP Addressing) range of 169.254.0.0/16, which lacks a default gateway and prevents routing beyond the local link."
          };
        }

        if (q3 === "static") {
          return {
            title: "Static IP / Gateway Subnet Mismatch",
            severity: "warning",
            description: "Your network adapter has a manual static IP address that is either outside the router's IP subnet or conflicting with another device on the network.",
            steps: [
              {
                title: "Reset Adapter to Automatic IP (DHCP)",
                priority: "High",
                time: "3 mins",
                description: "Go to Change Adapter Options -> Right-click Ethernet -> Properties. Double-click Internet Protocol Version 4. Select 'Obtain an IP address automatically' and 'Obtain DNS server address automatically'.",
                tip: "Always rely on DHCP unless you are configuring specific server hardware."
              },
              {
                title: "Check for IP Address Conflicts",
                priority: "Medium",
                time: "2 mins",
                description: "Ensure no other device on the network is assigned the same static IP. Duplicate IP allocations cause ARP packet collisions, dropping both devices offline.",
              }
            ],
            technicalExplanation: "Routers forward packets using routing tables. If a static IP does not share the same network prefix (e.g. 192.168.1.0/24) as the router's LAN IP, the device cannot build an ARP table entry for the gateway, failing all outbound hops."
          };
        }

        return {
          title: "Upstream WAN Connection Loss",
          severity: "danger",
          description: "Your local connection to the router is healthy, but the router itself is not receiving an internet IP from your ISP modem or optical unit.",
          steps: [
            {
              title: "Inspect Router WAN Port LED",
              priority: "High",
              time: "2 mins",
              description: "Look at the WAN/Internet LED indicator on your router. If it is solid orange, amber, or off, the physical link between the router and modem has dropped.",
            },
            {
              title: "Reboot the ISP Modem/ONT First",
              priority: "High",
              time: "8 mins",
              description: "Unplug the modem power. Wait 2 minutes. Plug the modem back in and wait for its online light to go solid. Only then, restart the router to request a WAN IP.",
              tip: "Modern fiber connections require modems to release MAC bindings before accepting a new router link."
            }
          ],
          technicalExplanation: "Your computer shows 'Connected' because the LAN link to the router is active. However, when the router sends packets to the WAN gateway, the WAN interface receives no ARP responses. This results in the router dropping the route, reporting internet unavailable."
        };
      }

      case "gaming-settings": {
        const q1 = answers[1];
        const q2 = answers[2];
        const q3 = answers[3];

        if (q1 === "strict") {
          return {
            title: "Restricted Port Mapping (Strict NAT Type)",
            severity: "danger",
            description: "Your router is blocking the inbound UDP ports used by game servers for matchmaking, preventing direct peer-to-peer data transfers.",
            steps: [
              {
                title: "Enable UPnP (Universal Plug and Play)",
                priority: "High",
                time: "4 mins",
                description: "Log into the router dashboard, navigate to Advanced/NAT settings, and toggle 'UPnP' to Enabled. UPnP allows consoles to dynamically request port forwards.",
                tip: "If UPnP is already on, toggle it off, save, and toggle it back on to clear stale leases."
              },
              {
                title: "Configure Port Forwarding for Gaming",
                priority: "High",
                time: "8 mins",
                description: "Assign your console a static IP. Navigate to Port Forwarding inside the router dashboard. Add forwarding rules for the specific ports requested by your game or console (e.g. UDP 3074).",
              },
              {
                title: "Disable SIP ALG settings",
                priority: "Medium",
                time: "3 mins",
                description: "Find the ALG (Application Layer Gateway) section inside firewall settings and disable 'SIP ALG'. This helper feature often corrupts network packets used in voice lobbies.",
              }
            ],
            technicalExplanation: "Strict NAT (Symmetric NAT) changes both the internal IP and port mapping for every outbound connection. Incoming packets from other game consoles are rejected because they do not match the exact destination port mapped in the router's translation table."
          };
        }

        if (q3 === "bufferbloat-yes") {
          return {
            title: "Bufferbloat Queue Congestion",
            severity: "warning",
            description: "Your router's packet buffer overflows when other devices load the network, queuing your gaming packets and causing latency spikes.",
            steps: [
              {
                title: "Enable QoS Bandwidth Management",
                priority: "High",
                time: "5 mins",
                description: "Log into the router, navigate to QoS, and enable it. Set your upload and download speeds to 90% of your actual speed test results. This leaves a 10% buffer to prevent congestion.",
                tip: "Make sure to prioritize your gaming console or PC MAC address in the QoS options."
              },
              {
                title: "Switch to a Wired Ethernet Connection",
                priority: "High",
                time: "3 mins",
                description: "Avoid gaming over Wi-Fi. Wireless packet collisions require retransmissions that trigger latency spikes under heavy queue loads.",
              }
            ],
            technicalExplanation: "When bandwidth is saturated, routers buffer excess packets in memory. Because these buffers are large, packets sit in queues for hundreds of milliseconds before transmission, leading to high ping spikes during downloads."
          };
        }

        return {
          title: "Wireless Packet Loss & Jitter",
          severity: "warning",
          description: "Your ping issues are caused by wireless interference, beacon delays, and RF noise. The local routing path is optimized, but Wi-Fi jitter degrades real-time responsiveness.",
          steps: [
            {
              title: "Connect to the 5 GHz Wi-Fi Band",
              priority: "High",
              time: "2 mins",
              description: "Move your console to the 5 GHz band. 5 GHz has significantly higher bandwidth and is less prone to interference from household electronics than 2.4 GHz.",
            },
            {
              title: "Adjust Wi-Fi Multimedia (WMM) Settings",
              priority: "Medium",
              time: "3 mins",
              description: "Ensure WMM (Wi-Fi Multimedia) is enabled in wireless settings. WMM prioritizes time-sensitive voice and video packets over background downloads.",
              tip: "Disabling WMM caps wireless speeds on modern standards to legacy 54 Mbps rates."
            }
          ],
          technicalExplanation: "Wi-Fi is a half-duplex medium: only one device can talk at a time. Interference forces packet drops at the physical layer, requiring the adapter to re-negotiate transmission windows, causing latency spikes."
        };
      }

      case "wifi-signal": {
        const q1 = answers[1];
        const q2 = answers[2];
        const q3 = answers[3];

        if (q1 === "closet" || q1 === "corner") {
          return {
            title: "Poor Router Positioning & Physical Barriers",
            severity: "danger",
            description: "Your router's physical location is restricting the radio waves. Low placement, corners, and metallic or concrete barriers absorb signal energy, creating wireless dead zones.",
            steps: [
              {
                title: "Elevate and Centralize the Router",
                priority: "High",
                time: "10 mins",
                description: "Move your router to a central location in your home, elevated on a table or shelf. Ensure it is out of cabinets, away from walls, and not placed directly behind TVs.",
                tip: "Elevating the router helps signals propagate downward and outward, bypassing low furniture obstacles."
              },
              {
                title: "Position Router Antennas Correctly",
                priority: "Medium",
                time: "2 mins",
                description: "If your router has external antennas, point half of them vertically (straight up) and the other half horizontally (flat/45 degrees) to cover different device orientations.",
              },
              {
                title: "Avoid Placing Near Interference Sources",
                priority: "Medium",
                time: "3 mins",
                description: "Keep the router at least 3 feet away from baby monitors, cordless phones, microwaves, and Bluetooth speakers, which operate on the same 2.4 GHz frequency.",
              }
            ],
            technicalExplanation: "Wi-Fi signals degrade according to the inverse-square law and concrete/brick attenuation. A drywall reduces signal strength by 3dB (halving power), while concrete blocks can absorb up to 15-20dB, blocking signals entirely."
          };
        }

        if (q3 === "low-bars") {
          return {
            title: "Signal Path Attenuation or Mesh Distance Gap",
            severity: "warning",
            description: "The distance between your device and the router is too great, or your mesh node is placed too far from the parent router.",
            steps: [
              {
                title: "Relocate Mesh Nodes Closer to the Router",
                priority: "High",
                time: "5 mins",
                description: "If using a mesh system, place the node halfway between the main router and the dead zone. Placing a node in the dead zone itself results in a weak backhaul connection.",
                tip: "Ideally, mesh nodes should have a clear line of sight or pass through a maximum of one wall."
              },
              {
                title: "Use 2.4 GHz for Remote Devices",
                priority: "Medium",
                time: "2 mins",
                description: "If you cannot move closer, connect to the 2.4 GHz network. 2.4 GHz radio waves are longer and penetrate walls better than 5 GHz.",
              }
            ],
            technicalExplanation: "5 GHz frequencies have shorter wavelengths, which reflect off solid objects rather than passing through them. 2.4 GHz signals travel farther because their longer wavelengths scatter less through home construction materials."
          };
        }

        return {
          title: "Co-Channel Congestion & DFS Interference",
          severity: "info",
          description: "Your signal strength is high, but the signal-to-noise ratio is low. Neighboring networks are broadcasting on the same channel, causing packet collisions.",
          steps: [
            {
              title: "Manually Choose a Clean Wi-Fi Channel",
              priority: "High",
              time: "3 mins",
              description: "Use a Wi-Fi analyzer app to identify neighbor channel usage. On 2.4 GHz, set your router manually to channel 1, 6, or 11. On 5 GHz, choose non-DFS channels like 36 or 149.",
            },
            {
              title: "Reduce Channel Width to 40 MHz on 5 GHz",
              priority: "Medium",
              time: "3 mins",
              description: "If you are in a crowded apartment, change the 5 GHz channel width from 80 MHz to 40 MHz. This reduces the number of overlapping channels, lowering packet collisions.",
              tip: "Narrower channels have a lower noise floor, which improves range and reliability in dense areas."
            }
          ],
          technicalExplanation: "When two routers broadcast on the same frequency, they share time. When one router transmits, the other must wait, which reduces speed. Changing to an unused channel avoids these wait states."
        };
      }

      case "router-restarts": {
        const q1 = answers[1];
        const q2 = answers[2];
        const q3 = answers[3];

        if (q2 === "old-hot" || q2 === "young-hot") {
          return {
            title: "Thermal SoC Overheating & Processor Throttling",
            severity: "danger",
            description: "Your router's silicon core is exceeding safe thermal thresholds, triggering automated hardware shutdowns to prevent permanent component failure.",
            steps: [
              {
                title: "Relocate Router to an Open, Elevated Area",
                priority: "High",
                time: "5 mins",
                description: "Ensure the router is not stored inside closed media cabinets, bookshelves, or on the floor. Place it on a flat, solid surface with unobstructed airflow.",
                tip: "Avoid placing it directly on top of other heat-generating appliances like modems or consoles."
              },
              {
                title: "Clear Dust From Ventilation Grilles",
                priority: "Medium",
                time: "10 mins",
                description: "Use a can of compressed air to clear accumulated dust and debris from all side, bottom, and top ventilation holes of the router chassis.",
              },
              {
                title: "Lower Wireless Transmit Power Settings",
                priority: "Low",
                time: "3 mins",
                description: "Access the router admin panel, navigate to advanced wireless settings, and lower the radio transmit power from '100% / High' to 'Medium' to reduce RF amplifier heat generation.",
              }
            ],
            technicalExplanation: "Dual and quad-core network SoCs run on modern arm/mips chips. When cooling vents are obstructed, thermal resistance causes the chip temperature to climb. Once the junction temperature (Tj) hits threshold safety limits (typically 95-105°C), the SoC triggers an hardware interrupt, cycling the power supply rails immediately to prevent silicon fusion."
          };
        }

        if (q3 === "post-firmware") {
          return {
            title: "Corrupted Firmware Partition / Watchdog Kernel Panic",
            severity: "warning",
            description: "A recent firmware update has corrupted the secondary boot partition or triggered a severe memory leak inside the Linux routing kernel, causing spontaneous panic restarts.",
            steps: [
              {
                title: "Clear NVRAM via Factory Hard Reset",
                priority: "High",
                time: "5 mins",
                description: "Perform a hard factory reset by holding the physical reset button for 10-15 seconds while the router is powered on. This flushes orphaned configuration parameters left by the previous firmware version.",
                tip: "A factory reset will erase all custom configurations, so make sure you know your ISP login details first."
              },
              {
                title: "Flash Stable Firmware Build via Recovery Mode",
                priority: "High",
                time: "15 mins",
                description: "Download the last stable, non-beta firmware release from the official manufacturer portal. Access the router firmware recovery screen (often via TFTP or a static IP on a wired LAN port) to flash the clean build.",
              }
            ],
            technicalExplanation: "When router firmware updates, legacy configuration parameters stored in NVRAM often persist and fail to map to the new kernel variables. This causes pointer faults or dynamic memory buffer overflow loops (buffer bloat at kernel level). Once the Linux kernel halts or freezes, the hardware Watchdog Timer (WDT) chip ceases receiving pulse signals and interrupts the power loop to reboot."
          };
        }

        if (q1 === "frequent") {
          return {
            title: "Failing Power Adapter / Capacitor Ripple Voltage Distortion",
            severity: "danger",
            description: "The external AC/DC power brick or internal power filtering capacitors are degraded, failing to deliver steady DC voltage under intense traffic loads.",
            steps: [
              {
                title: "Inspect Power Adapter Specifications & Replace",
                priority: "High",
                time: "5 mins",
                description: "Verify that the power adapter is the original unit. If replacing, ensure the new brick matches the exact voltage (usually 12V DC) and meets or exceeds the required amperage (e.g., 2.0A).",
                tip: "Using an adapter with insufficient amperage causes the router to crash when CPU usage spikes."
              },
              {
                title: "Bypass Surge Protectors & Extension Leads",
                priority: "Medium",
                time: "2 mins",
                description: "Plug the AC/DC power brick directly into a dedicated wall outlet. Faulty surge protectors or heavily loaded power strips can introduce low-frequency AC voltage dips.",
              }
            ],
            technicalExplanation: "Electrolytic capacitors inside the power adapter or router decay over time, increasing their Equivalent Series Resistance (ESR). When the router's radio amplifiers spike during high-bandwidth packet routing, the current draw increases. The degraded capacitors fail to buffer this load, causing DC voltage to sag below the minimum threshold (brownout), tripping the system reset controller."
          };
        }

        return {
          title: "ISP Provisioning Loop & WAN Dynamic Lease Timeouts",
          severity: "info",
          description: "Your router is dropping WAN synchronization with the ISP network terminal, interpreting DHCP lease timeout failures as gateway outages and rebooting to recover.",
          steps: [
            {
              title: "Check Fiber ONT / Coax Modem Link Status",
              priority: "High",
              time: "5 mins",
              description: "Ensure the Ethernet link between your router's WAN port and the modem/ONT is fully secure. Try replacing the interconnecting Ethernet patch cord with a certified Cat6 cable.",
            },
            {
              title: "Configure WAN DHCP Query Frequency to Normal",
              priority: "Medium",
              time: "5 mins",
              description: "Access your router's Advanced WAN settings. If available, change the DHCP query frequency from 'Aggressive Mode' to 'Normal / RFC Standard Mode' to prevent the ISP from flagging your router as a spam source.",
              tip: "Aggressive DHCP probing can cause ISP servers to black-hole your MAC address temporarily."
            }
          ],
          technicalExplanation: "If the physical WAN line has high attenuation, your modem or ONT experiences packet dropouts. When the router's WAN interface attempts to renew its dynamic IP lease and receives no response, the routing engine drops the interface. In some router operating systems (e.g. customized OpenWrt overlays), a prolonged lack of WAN lease response triggers a system-wide reboot safety cycle."
        };
      }

      case "mobile-no-internet": {
        const q1 = answers[1];
        const q2 = answers[2];
        const q3 = answers[3];

        if (q3 === "vpn-active" || q3 === "private-relay") {
          return {
            title: "Encryption Layer Transport Failure / VPN Socket Deadlock",
            severity: "warning",
            description: "Your mobile device's VPN client or iOS iCloud Private Relay has crashed or failed its cryptographic handshake, blocking all outbound traffic over the Wi-Fi link.",
            steps: [
              {
                title: "Disable iCloud Private Relay (iOS/iPadOS)",
                priority: "High",
                time: "2 mins",
                description: "On iOS, navigate to Settings -> [Your Name] -> iCloud -> Private Relay and toggle it OFF. Test if standard web pages instantly load.",
                tip: "iCloud Private Relay routes traffic through dual secure proxies; if one proxy node fails, Wi-Fi will show 'Connected, No Internet'."
              },
              {
                title: "Force Kill VPN App & Reset Network Sockets",
                priority: "High",
                time: "3 mins",
                description: "Disconnect your active VPN client, force close the application, and toggle Airplane Mode ON for 10 seconds to flush device routing tables.",
              }
            ],
            technicalExplanation: "Mobile operating systems establish virtual tunnel interfaces (utun/tun) to route traffic through encrypted VPN sockets. If the VPN client drops its handshake or key-exchange parameters but keeps the tunnel interface active, the OS continues to route DNS and HTTP packets into a dead socket, causing the Wi-Fi driver to report no internet."
          };
        }

        if (q1 === "android") {
          return {
            title: "Android Private DNS / DNS-over-TLS Handshake Block",
            severity: "warning",
            description: "Android's system-wide 'Private DNS' setting is attempting to resolve hostnames via DNS-over-TLS (DoT) on port 853, which is being blocked by your router's firewall.",
            steps: [
              {
                title: "Toggle Private DNS to Automatic or Off on Android",
                priority: "High",
                time: "2 mins",
                description: "On Android, navigate to Settings -> Network & Internet -> Private DNS. Change the setting from 'Private DNS provider hostname' to 'Automatic' or 'Off'.",
                tip: "Custom secure DNS hosts like 'dns.adguard.com' will block all device traffic if their servers experience high load."
              },
              {
                title: "Disable DNS Rebinding Protection on Router",
                priority: "Medium",
                time: "5 mins",
                description: "Access your router's firewall settings and temporarily disable 'DNS Rebind Protection'. This allows Android to query secure local and external resolvers.",
              }
            ],
            technicalExplanation: "Android utilizes system-level DNS-over-TLS (DoT) queries on TCP port 853. Many consumer routers or ISP firewalls block port 853 outbound as a security measure to prevent DNS bypass. When Android fails to establish a TLS handshake on port 853, it refuses to fall back to plain UDP port 53, reporting a lack of internet connectivity."
          };
        }

        if (q1 === "iphone") {
          return {
            title: "iOS Private Wi-Fi MAC Randomization Conflict",
            severity: "warning",
            description: "Your iPhone's rotating virtual MAC address is conflicting with the router's DHCP lease pool or local security rules, causing the router to deny IP allocation.",
            steps: [
              {
                title: "Disable Private Wi-Fi Address for This Network",
                priority: "High",
                time: "2 mins",
                description: "On iOS, open Settings -> Wi-Fi. Tap the blue 'i' icon next to your connected network. Toggle 'Private Wi-Fi Address' and 'Limit IP Address Tracking' to OFF. Reconnect to the network.",
                tip: "Disabling this for your home network is safe; keep it active on public hotspots for privacy."
              },
              {
                title: "Clear DHCP Lease Table on Router",
                priority: "Medium",
                time: "5 mins",
                description: "Access your router's LAN configuration page, locate the DHCP Clients list, and delete stale leases. This frees up allocated IP blocks.",
              }
            ],
            technicalExplanation: "To prevent tracking, iOS randomizes its MAC address (Layer 2 identity). If a router has a small DHCP lease range (e.g. 50 addresses) with long lease times (e.g. 24 hours), dynamic MAC cycling quickly exhausts the entire IP pool. The router rejects new connection requests, cutting off internet access."
          };
        }

        return {
          title: "Captive Portal Hijack & Gateway Redirection Fault",
          severity: "info",
          description: "Your mobile device connected to a network requiring login but failed to capture the HTTP redirect command, leaving the device in an unauthenticated sandbox.",
          steps: [
            {
              title: "Force-Open Captive Portal Login Screen",
              priority: "High",
              time: "2 mins",
              description: "Open your mobile browser (e.g. Safari/Chrome) and manually type 'neverssl.com' or the router's gateway IP (e.g., '192.168.1.1') into the URL bar to trigger the redirection interface.",
              tip: "Browsers that attempt to open HTTPS pages first will block captive portal redirections due to SSL security rules."
            }
          ],
          technicalExplanation: "Captive portal gateways intercept all DNS queries and redirect port 80 (HTTP) traffic to a sandbox login page. If the mobile device immediately attempts an encrypted HTTPS transaction (port 443) or uses a secure local DNS cache, the SSL certificate match fails, preventing the gateway from redirecting the browser."
        };
      }

      case "modem-sync": {
        const q1 = answers[1];
        const q2 = answers[2];
        const q3 = answers[3];

        if (q3 === "splitter") {
          return {
            title: "DOCSIS Signal Attenuation / Coaxial Splitter Attenuation",
            severity: "danger",
            description: "Your coaxial cabling line is experiencing severe signal loss (attenuation) and high noise floor levels, blocking the modem from locking upstream and downstream DOCSIS channels.",
            steps: [
              {
                title: "Bypass Cable Splitters & Connect Directly",
                priority: "High",
                time: "5 mins",
                description: "Locate the incoming coaxial line. Remove any multi-way cable TV splitters and connect the coax cable directly from the wall socket to the modem's coaxial port.",
                tip: "Every splitter port drop introduces a -3.5dB to -7dB signal loss, which can push downstream power levels out of specification."
              },
              {
                title: "Verify RG6 Cable Sheath & Shielding Integrity",
                priority: "Medium",
                time: "5 mins",
                description: "Inspect the coaxial line for sharp bends, flat spots, or loose F-connector pins. Ensure the metal connectors are hand-tightened securely to the modem chassis.",
              }
            ],
            technicalExplanation: "DOCSIS modems require downstream power levels between -15dBmV and +15dBmV, and Upstream Transmit power below 50dBmV. Unnecessary splitters attenuate RF signals. When downstream power drops below threshold levels or the Signal-to-Noise Ratio (SNR) drops under 30dB, the modem experiences bit errors, causing the 'Online' light to flash indefinitely."
          };
        }

        if (q1 === "fiber") {
          return {
            title: "GPON Fiber ONT Registration Failure / Loss of Signal (LOS)",
            severity: "danger",
            description: "Your optical network terminal (ONT) has lost optical sync or is failing to register its serial number (PON key) with the ISP's local distribution exchange.",
            steps: [
              {
                title: "Inspect Physical Fiber Patch Cord (SC/APC)",
                priority: "High",
                time: "3 mins",
                description: "Examine the thin optical fiber patch cord (usually green tips) plugged into the ONT wall box. Ensure it is firmly clicked in and not sharply bent or coiled tightly.",
                tip: "Optical fiber utilizes light refraction; a bend tighter than a coin will scatter the light, dropping the connection."
              },
              {
                title: "Check ONT Indicator LEDs (LOS / PON)",
                priority: "High",
                time: "2 mins",
                description: "Look at the ONT indicator lights. If the 'LOS' light is solid or blinking RED, the fiber line is physically cut or there is an exchange outage. If 'PON' is blinking green, it is seeking ISP auth.",
              }
            ],
            technicalExplanation: "GPON networks operate on specific optical wavelengths (1490nm downstream / 1310nm upstream). The ONT registers at the ISP's Optical Line Terminal (OLT) using a unique Serial Number and Password (SLID). An LOS red light means the optical power has dropped below -28dBm (receiver sensitivity limit). This requires physical line patching from ISP engineers."
          };
        }

        if (q2 === "recurring") {
          return {
            title: "Upstream Channel T3/T4 Timeouts (Node Congestion)",
            severity: "warning",
            description: "Your modem is losing upstream transmission channels due to transient RF noise leaking into the neighborhood cable node, dropping the dynamic connection.",
            steps: [
              {
                title: "Contact ISP to Audit Upstream Power Levels",
                priority: "High",
                time: "10 mins",
                description: "Call your ISP and request a diagnostic check of your line's 'Upstream T3/T4 Timeouts'. Ask them to verify if there is an ingress noise issue on your local tap/node.",
                tip: "T3/T4 timeouts are concrete engineering logs that support level-2 ISP technicians in escalating your ticket."
              }
            ],
            technicalExplanation: "A T3 timeout occurs when the modem sends a Ranging Request to the ISP termination system (CMTS) but receives no response. This is caused by high ingress noise (RF interference leaking into degraded shielding) on the upstream return path. The modem increases its upstream transmit power to compensate; if it exceeds 54dBmV, it drops channel bonding and resets."
          };
        }

        return {
          title: "Modem Firmware Unprovisioned State / ISP Auth Lockout",
          severity: "danger",
          description: "Your physical modem has lost its configuration profile (boot file) at the ISP provisioning server, blocking external network access.",
          steps: [
            {
              title: "Perform a Hardware Power Cycle Cycle",
              priority: "High",
              time: "8 mins",
              description: "Unplug your modem from the power wall outlet. Leave it disconnected for 2-3 minutes. This forces the ISP local CMTS to clear stale MAC bindings and re-register the device.",
              tip: "Always power cycle your modem before your router to ensure proper IP handshakes."
            }
          ],
          technicalExplanation: "During registration, the modem downloads a boot file via TFTP from the ISP network. If this file is corrupted or missing, the modem remains in a walled-garden unprovisioned status. Upstream and downstream physical links are active, but the authentication layer denies packet forwarding."
        };
      }

      case "router-admin": {
        const q1 = answers[1];
        const q2 = answers[2];
        const q3 = answers[3];

        if (q2 === "remote-access") {
          return {
            title: "Access Isolation Policy Block / Remote Administration Disabled",
            severity: "warning",
            description: "Your router's security configuration prohibits loading the admin dashboard over remote, wireless, or isolated guest network connections.",
            steps: [
              {
                title: "Connect via Physical Ethernet Patch Cable",
                priority: "High",
                time: "3 mins",
                description: "Disable Wi-Fi on your computer. Connect a physical Ethernet cable from your computer's LAN port directly into one of the yellow LAN ports on your router.",
                tip: "Ethernet connections bypass AP Isolation rules, ensuring access to the gateway."
              },
              {
                title: "Ensure Connection is on the Primary Wi-Fi SSID",
                priority: "High",
                time: "2 mins",
                description: "If Ethernet is unavailable, verify you are not connected to the 'Guest' network. Guest networks typically have AP Isolation enabled, blocking local dashboard access.",
              }
            ],
            technicalExplanation: "AP Isolation (Access Point Isolation) blocks client devices from communicating with local network nodes, including the gateway's administration web server. This restricts guest clients to WAN-bound traffic only, keeping the administrative port 80/443 secure."
          };
        }

        if (q1 === "ssl-error") {
          return {
            title: "Browser HSTS Policy Block & HTTPS Certificate Warning",
            severity: "warning",
            description: "Your web browser is blocking access to the admin page because the router's local SSL/TLS certificate is self-signed and lacks a trusted third-party signature.",
            steps: [
              {
                title: "Bypass SSL Warnings in Chrome/Firefox/Safari",
                priority: "High",
                time: "1 min",
                description: "On the browser error screen, click 'Advanced' or 'More Information'. Then click 'Proceed to [IP Address] (unsafe)' or 'Accept the Risk and Continue'.",
                tip: "This warning is completely safe on a local network; your router cannot obtain a public SSL certificate because it uses a private IP address."
              },
              {
                title: "Utilize Plain HTTP Protocol Port",
                priority: "Medium",
                time: "2 mins",
                description: "Change the URL prefix in your browser address bar from 'https://' to 'http://' (for example: 'http://192.168.1.1'). This bypasses TLS handshakes.",
              }
            ],
            technicalExplanation: "Modern web browsers enforce strict security rules, including HSTS (HTTP Strict Transport Security). Private IP addresses (RFC 1918) cannot have certificates signed by public Certificate Authorities. Consumer routers generate self-signed certificates, which browsers flag as untrusted, blocking the administrative portal."
          };
        }

        if (q3 === "ap-mode" || q3 === "ip-changed") {
          return {
            title: "Subnet Gateway Mismatch & Secondary DHCP Loop",
            severity: "danger",
            description: "The router has been configured to Access Point (AP) or Bridge mode, disabling its built-in DHCP server and changing its IP address to match the primary gateway subnet.",
            steps: [
              {
                title: "Find Router's New IP Address via Advanced IP Scanner",
                priority: "High",
                time: "5 mins",
                description: "Install an IP scanner utility or check your primary modem's connected device table. Locate the secondary router's MAC address and note its new DHCP IP (e.g. 192.168.1.45).",
                tip: "AP mode switches off routing, turning your router into a Layer 2 switch; its administration page is assigned a new IP by the main gateway."
              },
              {
                title: "Perform an ARP -A Command Check",
                priority: "Medium",
                time: "3 mins",
                description: "On Windows, open Command Prompt and run: 'arp -a'. Look for your router's MAC address to identify the current IP address assigned to it.",
              }
            ],
            technicalExplanation: "When a router is switched to Access Point mode, its routing functions (NAT, DHCP, DNS forwarders) are disabled. The WAN port is bridged to the LAN switch. The administrative console releases its static IP and requests a lease from the main network router. Attempting to reach the old static IP (e.g. 192.168.1.1) will time out."
          };
        }

        return {
          title: "Browser Cache Conflict / DNS Hijack Block",
          severity: "info",
          description: "Your browser's DNS cache or local proxy configuration is attempting to route the admin page IP into a dead search tunnel or an external gateway.",
          steps: [
            {
              title: "Open Gateway in Private / Incognito Mode",
              priority: "High",
              time: "1 min",
              description: "Open an Incognito or Private Browsing window in your browser and attempt to load the gateway address (e.g. 'http://192.168.1.1'). This bypasses active browser caches.",
            },
            {
              title: "Temporarily Disable Custom Proxy & VPN Client Settings",
              priority: "High",
              time: "2 mins",
              description: "Open system network settings and ensure 'Use a proxy server' is toggled off. Active proxies will attempt to route local IP queries to external hosts, failing to resolve the admin page.",
            }
          ],
          technicalExplanation: "Consumer browsers maintain aggressive internal cache databases. If a user previously searched for '192.168.1.1' as a text string, the browser may redirect future queries to a public search engine. Additionally, active system proxies attempt to route private subnets through external servers, blocking access to the local loopback."
        };
      }

      case "dns-optimizer": {
        const q1 = answers[1];
        const q2 = answers[2];
        const q3 = answers[3];

        if (q1 === "speed" || q2 === "gaming") {
          return {
            title: "Ultra-Low Latency Public Resolvers",
            severity: "success",
            description: "Your primary bottleneck is high resolver latency from your ISP's recursive DNS servers. Shifting to global public networks will lower query resolution times.",
            steps: [
              {
                title: "Configure Cloudflare / Google Hybrid DNS Setup",
                priority: "High",
                time: "5 mins",
                description: "Set your router or primary network adapter DNS parameters to: Primary: 1.1.1.1 (Cloudflare - fastest latency) and Secondary: 8.8.8.8 (Google - highest uptime and reliability).",
                tip: "Combining Cloudflare and Google ensures you have both speed and maximum failover protection."
              },
              {
                title: "Verify Router DNS Propagation",
                priority: "Medium",
                time: "3 mins",
                description: "Open Command Prompt and run 'nslookup google.com'. Check the 'Server' line to verify that queries are resolving through your new custom IPs.",
              }
            ],
            technicalExplanation: "Cloudflare (1.1.1.1) and Google (8.8.8.8) operate massive global anycast networks, routing DNS queries to the geographically closest server node. ISP resolvers often use single-node architectures that experience heavy load, increasing latency from 15ms to 120ms+ during peak hours."
          };
        }

        if (q1 === "privacy") {
          return {
            title: "Privacy-Focused Zero-Log DNS Resolvers",
            severity: "info",
            description: "You require DNS resolvers that protect your personal data by preventing logging, blocking ISP DNS hijacking, and refusing to sell browsing telemetry.",
            steps: [
              {
                title: "Configure Mullvad or Quad9 Secure DNS",
                priority: "High",
                time: "5 mins",
                description: "Configure your device or router to use Mullvad DNS (Primary: 194.242.2.2) or Quad9 (Primary: 9.9.9.9). These providers do not log your IP address or query history.",
                tip: "Quad9 is a non-profit foundation based in Switzerland, protected by strict privacy laws."
              }
            ],
            technicalExplanation: "Standard ISP resolvers track and log every website domain query you make, building a detailed profile of your web activity. Privacy-focused public resolvers strip your IP address from queries (EDNS Client Subnet deletion) and store logs strictly in RAM, wiping them every 24 hours to prevent tracking."
          };
        }

        return {
          title: "Malware, Phishing & Tracker Filtering DNS",
          severity: "success",
          description: "You require network-level threat intelligence to automatically block malicious domains, phishing links, and tracking scripts before they load.",
          steps: [
            {
              title: "Apply Quad9 Threat Block DNS resolvers",
              priority: "High",
              time: "5 mins",
              description: "Configure your DNS to use: Primary: 9.9.9.9 (Quad9 Secured). This resolver automatically blocks connections to known malware and scam domains.",
              tip: "If you have children, consider AdGuard Family DNS (Primary: 94.140.14.15) to automatically block adult content."
            }
          ],
          technicalExplanation: "Secure DNS resolvers maintain real-time threat feeds. When a browser requests the IP of a flagged phishing or malware domain, the resolver intercepts the query and returns a loopback block IP (0.0.0.0), neutralizing the threat before any malicious payload can download."
        };
      }

      case "ethernet-speed": {
        const q1 = answers[1];
        const q2 = answers[2];
        const q3 = answers[3];

        if (q1 === "100mbps" || q2 === "cat5") {
          return {
            title: "Fast Ethernet Link Cap (100 Mbps Physical Limitation)",
            severity: "danger",
            description: "Your wired LAN connection is capped at 100 Mbps because your Ethernet cable has physical damage, lacks 8 active pins, or is connected to a Fast Ethernet port.",
            steps: [
              {
                title: "Upgrade to a Certified Cat6 or Cat8 Ethernet Cable",
                priority: "High",
                time: "3 mins",
                description: "Replace the existing network cable with a certified Cat6, Cat6A, or Cat8 cable. Ensure the cable is marked 'UTP / STP Gigabit Capable' on its outer jacket.",
                tip: "Legacy Cat5 or damaged cables with split copper pairs cannot negotiate Gigabit speeds, falling back to a 100 Mbps cap."
              },
              {
                title: "Verify Router Port Gigabit Specifications",
                priority: "High",
                time: "5 mins",
                description: "Confirm that your router's LAN ports support 10/100/1000 Mbps speeds. Connect the cable strictly to a port labeled 'Gigabit' or '1G/2.5G LAN'.",
              }
            ],
            technicalExplanation: "Gigabit Ethernet (1000BASE-T) requires all 4 twisted pairs (8 copper wires) in an RJ45 cable to negotiate and transmit data. Legacy Fast Ethernet (100BASE-TX) only requires 2 pairs (4 wires). If a single wire inside the cable is broken or dirty, the network card's physical layer interface (PHY) fails the 1000 Mbps handshake and negotiates down to the 100 Mbps cap."
          };
        }

        if (q3 === "eee-on") {
          return {
            title: "Energy Efficient Ethernet (EEE) Latency & Speed Throttling",
            severity: "warning",
            description: "Your network card's green power-saving features are active, causing the controller to enter low-power sleep states that throttle peak data throughput.",
            steps: [
              {
                title: "Disable EEE / Green Ethernet in Windows Device Manager",
                priority: "High",
                time: "4 mins",
                description: "In Windows, search for Device Manager -> Expand 'Network Adapters' -> Right-click your Ethernet card -> Properties -> Advanced tab. Locate 'Energy Efficient Ethernet' and change it to DISABLED.",
                tip: "Also disable 'Green Ethernet' and 'Ultra Low Power Mode' if present in the advanced properties list."
              }
            ],
            technicalExplanation: "Energy Efficient Ethernet (IEEE 802.3az) shuts down the network physical layer (PHY) transmitter when no data is being sent. When a high-bandwidth download starts, the transmitter wakes up. This sleep-wake transition introduces packet micro-delays and buffer sizing conflicts in some drivers, capping throughput below your maximum line speed."
          };
        }

        return {
          title: "Network Card Driver & TCP Window Auto-Tuning Mismatch",
          severity: "info",
          description: "Your operating system's TCP receive window size is static, or your network card driver is using outdated buffer parameters that bottleneck throughput.",
          steps: [
            {
              title: "Enable TCP Window Auto-Tuning via Command Prompt",
              priority: "High",
              time: "3 mins",
              description: "Open Command Prompt as Administrator and run: 'netsh interface tcp set global autotuninglevel=normal'. Restart your computer.",
              tip: "Disabling Auto-Tuning restricts Windows from dynamically resizing packet buffers, capping speeds on high-bandwidth lines."
            },
            {
              title: "Update Ethernet Controller Drivers",
              priority: "Medium",
              time: "5 mins",
              description: "Visit the website of your motherboard or NIC manufacturer (Realtek, Intel, Killer) and download the latest stand-alone driver installer.",
            }
          ],
          technicalExplanation: "The TCP Receive Window (RWIN) dictates how much data a device can accept before sending an acknowledgement (ACK) packet. On high-speed, high-latency connections, a small static RWIN forces the sending server to halt transmission while waiting for ACKs, creating a speed bottleneck."
        };
      }

      case "dns-setup": {
        const q1 = answers[1];
        const q2 = answers[2];
        const q3 = answers[3];

        if (q1 === "tplink") {
          return {
            title: "TP-Link Custom DNS & IPv6 Configuration Guide",
            severity: "success",
            description: "Step-by-step instructions to configure custom DNS servers on TP-Link Archer, Deco, and standard router models.",
            steps: [
              {
                title: "Access TP-Link Admin Interface",
                priority: "High",
                time: "2 mins",
                description: "Open your web browser and navigate to 'http://192.168.0.1' or 'http://tplinkwifi.net'. Enter your admin password to log in.",
                tip: "For Deco mesh systems, you must configure DNS settings through the Deco mobile app."
              },
              {
                title: "Configure TP-Link DHCP Server DNS Settings",
                priority: "High",
                time: "5 mins",
                description: "Navigate to Advanced -> Network -> DHCP Server. Locate the Primary and Secondary DNS fields, enter your desired public DNS IPs, and click Save.",
              }
            ],
            technicalExplanation: "TP-Link routers allow DNS configuration on both the WAN port and the LAN DHCP server. Configuring DNS on the DHCP Server page is recommended; it pushes the custom DNS servers directly to your client devices, bypassing the router's internal proxy relay for faster performance."
          };
        }

        if (q1 === "asus") {
          return {
            title: "ASUS Router WAN & LAN DNS Configuration Guide",
            severity: "success",
            description: "Step-by-step instructions to configure custom DNS servers on ASUS ZenWi-Fi, ROG, and RT-series routers.",
            steps: [
              {
                title: "Access ASUS Admin Interface",
                priority: "High",
                time: "2 mins",
                description: "Open your web browser and navigate to 'http://192.168.50.1' or 'http://router.asus.com'. Enter your credentials to log in.",
              },
              {
                title: "Configure WAN DNS settings on ASUS",
                priority: "High",
                time: "5 mins",
                description: "Under Advanced Settings, navigate to WAN -> Internet Connection. Scroll down to WAN DNS Setting. Set 'Connect to DNS Server automatically' to NO, enter your DNS IPs, and click Apply.",
                tip: "ASUS routers run a local DNS caching daemon; WAN DNS updates are cached locally to speed up home networks."
              }
            ],
            technicalExplanation: "ASUSWRT firmware uses a DNS forwarder service (dnsmasq) to manage queries. By setting DNS on the WAN interface, all client queries are sent to the router at 192.168.50.1, which then forwards them to your public DNS servers. This enables local caching of common hostnames, reducing query overhead."
          };
        }

        return {
          title: "Netgear Custom WAN DNS Configuration Guide",
          severity: "success",
          description: "Step-by-step instructions to configure custom DNS servers on Netgear Nighthawk and Orbi router models.",
          steps: [
            {
              title: "Access Netgear Admin Interface",
              priority: "High",
              time: "2 mins",
              description: "Open your web browser and navigate to 'http://192.168.1.1' or 'http://routerlogin.net'. Enter your admin credentials.",
            },
            {
              title: "Configure Netgear Internet DNS settings",
              priority: "High",
              time: "5 mins",
              description: "Navigate to the Basic tab -> Internet. Under 'Domain Name Server (DNS) Address', select 'Use These DNS Servers'. Enter your custom primary and secondary DNS IPs, and click Apply.",
              tip: "Netgear routers will reboot their network interface cards when applying WAN DNS updates, temporarily pausing the connection."
            }
          ],
          technicalExplanation: "Netgear routers register WAN DNS settings inside their routing table config space. When applying WAN DNS changes, the router flushes the DHCP client daemon on the WAN port and requests a new DHCP handshake from your modem to bind the DNS updates."
        };
      }

      case "latency": {
        const q1 = answers[1];
        const q2 = answers[2];
        const q3 = answers[3];

        if (q2 === "wifi") {
          return {
            title: "Wireless RF Jitter & Packet Loss",
            severity: "warning",
            description: "Your latency issues are primarily driven by wireless RF path degradation. Half-duplex wireless transmission, beacon frame collisions, and structural obstructions trigger packet drops that present as micro-stuttering.",
            steps: [
              {
                title: "Migrate to a Wired Cat6 Ethernet Connection",
                priority: "High",
                time: "3 mins",
                description: "Wireless connections are susceptible to electromagnetic interference. Connecting via Cat6 Ethernet cable eliminates Layer 1 frame corruption and delivers consistent sub-1ms local hop times.",
                tip: "If a direct cable run is physically impossible, consider a MoCA adapter over coax rather than wireless range extenders."
              },
              {
                title: "Isolate 5 GHz Channels & Set Width to 40 MHz",
                priority: "Medium",
                time: "5 mins",
                description: "Access your router admin portal, navigate to Wireless Settings, select 5 GHz band, and lock the channel width to 40 MHz rather than 80 or 160 MHz. This reduces noise susceptibility and overlaps.",
              },
              {
                title: "Disable Location Services & Network Scans",
                priority: "Medium",
                time: "2 mins",
                description: "On Windows/macOS, background scanning for new Wi-Fi networks every 60 seconds causes periodic 100-300ms ping spikes. Disable Wi-Fi scanning during active gaming.",
              }
            ],
            technicalExplanation: "Wi-Fi relies on CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance). When interference occurs or multiple devices try to transmit, the router drops the corrupted frame at the PHY layer. Re-transmissions require the TCP/IP stack to wait, resulting in jitter spikes and high packet loss."
          };
        }

        if (q3 === "congested") {
          return {
            title: "Bufferbloat & Local Link Congestion",
            severity: "danger",
            description: "Your packet loss is caused by bufferbloat. When other devices on your LAN perform heavy uploads or downloads, your router's buffers overflow, delay-queuing your latency-sensitive packets.",
            steps: [
              {
                title: "Enable FQ-CoDEL or SQM (Smart Queue Management)",
                priority: "High",
                time: "10 mins",
                description: "Log into your router admin page. Under advanced settings, look for QoS, Smart Queue Management (SQM), or FQ-CoDEL. Enable it and set upload/download limits to 90% of your provisioned speed.",
                tip: "This prevents your devices from saturating the buffer queue, keeping ping times perfectly flat during downloads."
              },
              {
                title: "Enable Hardware Accelerated NAT (Cut-Through Forwarding)",
                priority: "Medium",
                time: "5 mins",
                description: "If your router's CPU is hitting 100% load during speed tests, disable deep packet inspection (DPI) and ensure NAT Acceleration / Cut-Through Forwarding is enabled in LAN settings.",
              }
            ],
            technicalExplanation: "Bufferbloat occurs when network link capacity is saturated, and the router stores excess packets in oversized buffers. This introduces artificial queuing delay, inflating ping times. Once the buffer fills completely, the tail-drop policy drops incoming packets, leading to immediate packet loss."
          };
        }

        if (q1 === "gaming" || q3 === "servers") {
          return {
            title: "ISP Routing Path Congestion or Bad Game Server Hops",
            severity: "info",
            description: "The local network path to the router is optimal. Your packet loss and latency are happening upstream on the WAN link, caused by inefficient routing between your ISP and the game server's data center.",
            steps: [
              {
                title: "Run a MTR / Pathping Diagnostic",
                priority: "High",
                time: "5 mins",
                description: "Open command prompt and run 'pathping' or download WinMTR. Target the game server's IP address. This will pinpoint exactly which upstream network peer or hop is losing packets.",
                tip: "If packet loss starts at the second or third hop, it is an ISP routing issue; if it's only on the last hop, the game server itself is overloaded."
              },
              {
                title: "Configure a Low-Latency DNS Resolver",
                priority: "Medium",
                time: "3 mins",
                description: "Change your DNS settings to Cloudflare (1.1.1.1) or Google DNS (8.8.8.8). While this won't change in-game pathing directly, it speeds up initial socket handshakes and resolver queries.",
              }
            ],
            technicalExplanation: "BGP (Border Gateway Protocol) routing path selection is dictated by commercial peering agreements rather than geographic proximity. If your ISP routes traffic to a remote peering exchange before reaching the server, ping will spike. Upstream congestion at these interchanges triggers tail-drops and packet loss."
          };
        }

        return {
          title: "Upstream WAN Line Fault (ISP Side Link Failure)",
          severity: "danger",
          description: "A continuous packet loss signature suggests a Layer 1 or Layer 2 physical fault on the ISP transmission line. Corroded coaxial cabling, optical fiber macrobends, or bad DSL pairs are dropping frames before they reach the router.",
          steps: [
            {
              title: "Access Modem Diagnostic Page",
              priority: "High",
              time: "3 mins",
              description: "Open a browser and navigate to 192.168.100.1. Review downstream SNR (should be >33dB) and upstream power level (should be <50dBmV). Look for T3 or T4 timeout events in the modem log.",
              tip: "High T3/T4 counts mean the modem is losing sync due to electrical noise on the street cable. This requires an ISP technician visit."
            },
            {
              title: "Verify MTU Size Settings",
              priority: "Medium",
              time: "5 mins",
              description: "Navigate to your router's WAN configuration page and verify the MTU (Maximum Transmission Unit). For standard cable connections, use 1500; for PPPoE/DSL, set it to 1492 to prevent fragmenting.",
            }
          ],
          technicalExplanation: "When physical line noise degrades the signal-to-noise ratio, the modem's forward error correction (FEC) is overwhelmed. The modem fails to decode the incoming frames, discarding them completely. This presents as persistent, non-load-related packet loss across all devices."
        };
      }

      default:
        return {
          title: "Diagnostic Unavailable",
          severity: "info",
          description: "No diagnostic data is available for this mode. Please restart the assessment.",
          steps: [],
          technicalExplanation: "An unrecognized diagnostic mode was provided."
        };
    }
  };

  const currentResult = getResults();

  const handleStepCheck = (index: number) => {
    setCheckedSteps((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const getCompletedCount = () => {
    return Object.values(checkedSteps).filter(Boolean).length;
  };

  const severityStyles = {
    danger: {
      border: "border-red-900/30",
      bg: "bg-red-950/10",
      text: "text-red-400",
      badge: "danger" as const
    },
    warning: {
      border: "border-amber-900/30",
      bg: "bg-amber-950/10",
      text: "text-amber-400",
      badge: "warning" as const
    },
    info: {
      border: "border-blue-900/30",
      bg: "bg-blue-950/10",
      text: "text-blue-400",
      badge: "brand" as const
    },
    success: {
      border: "border-emerald-900/30",
      bg: "bg-emerald-950/10",
      text: "text-emerald-400",
      badge: "success" as const
    }
  };

  const activeSev = severityStyles[currentResult.severity];

  return (
    <div className="glass-card p-6 border border-[var(--border-subtle)] rounded-2xl relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-950/5 via-transparent to-transparent pointer-events-none" />

      {/* STEP 0: INTRO */}
      {step === 0 && (
        <div className="space-y-4 text-center py-6 relative z-10">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-orange-950/20 border border-orange-850/40 flex items-center justify-center text-orange-400 animate-pulse">
            <ModeIcon size={28} />
          </div>
          <h2 className="text-xl font-bold text-[var(--text-primary)] font-outfit">
            {config.title}
          </h2>
          <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
            {config.description}
          </p>
          <div className="pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setStep(1)}
              id="start-optimizer-btn"
            >
              Start Diagnostic Wizard <ArrowRight size={15} className="ml-1.5" />
            </Button>
          </div>
        </div>
      )}

      {/* QUESTION STEPS */}
      {step > 0 && step <= config.questions.length && currentQuestion && (
        <div className="space-y-6 relative z-10">
          {/* Progress Bar */}
          <div className="w-full h-1 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-300"
              style={{ width: `${(step / config.questions.length) * 100}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] text-[var(--text-muted)] font-mono uppercase tracking-wider">
            <span>Diagnostic Step {step} of {config.questions.length}</span>
            <span>{Math.round((step / config.questions.length) * 100)}% Complete</span>
          </div>

          <h3 className="text-sm md:text-base font-bold text-[var(--text-primary)]">
            {currentQuestion.text}
          </h3>

          <div className="grid grid-cols-1 gap-3">
            {currentQuestion.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleOptionSelect(opt.value)}
                className="w-full text-left px-5 py-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-orange-850/40 hover:bg-[var(--bg-surface)] rounded-xl text-xs md:text-sm text-[var(--text-primary)] font-medium transition-all duration-200 cursor-pointer flex items-center justify-between group"
              >
                <span>{opt.label}</span>
                <span className="w-2.5 h-2.5 rounded-full bg-transparent border border-[var(--text-muted)] group-hover:border-orange-400 group-hover:bg-orange-950/20" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* LOADING STATE */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12 space-y-4 relative z-10">
          <div className="w-10 h-10 rounded-full border-2 border-orange-500/20 border-t-orange-500 animate-spin" />
          <p className="text-xs text-[var(--text-muted)] font-mono">Running optimization engine algorithms...</p>
        </div>
      )}

      {/* RESULTS STATE */}
      {step > config.questions.length && !loading && (
        <div className="space-y-6 relative z-10">
          {/* Verdict Card */}
          <div className={`p-5 rounded-2xl border ${activeSev.border} ${activeSev.bg} space-y-3`}>
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-bold font-mono uppercase tracking-wider ${activeSev.text} flex items-center gap-1.5`}>
                <Activity size={12} /> Optimization Verdict
              </span>
              <Badge variant={activeSev.badge} size="sm" className="uppercase font-mono text-[9px]">
                {currentResult.severity} severity
              </Badge>
            </div>
            <h3 className="text-sm md:text-base font-bold text-[var(--text-primary)]">
              {currentResult.title}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {currentResult.description}
            </p>
          </div>

          {/* Action Steps Checklist */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-1.5">
                <Clock size={12} className="text-orange-400" />
                Actionable Troubleshooting Checklist
              </h4>
              <span className="text-[10px] font-mono text-[var(--text-muted)]">
                {getCompletedCount()} / {currentResult.steps.length} Resolved
              </span>
            </div>

            <div className="space-y-3">
              {currentResult.steps.map((stepItem, idx) => {
                const isChecked = !!checkedSteps[idx];
                return (
                  <div
                    key={idx}
                    className={`p-4 border rounded-xl transition-all duration-300 bg-[var(--bg-elevated)] ${
                      isChecked
                        ? "border-emerald-900/40 opacity-75 bg-emerald-950/5"
                        : "border-[var(--border-subtle)]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleStepCheck(idx)}
                        className="mt-0.5 rounded border-[var(--border-default)] text-orange-600 focus:ring-orange-500 cursor-pointer"
                        id={`step-${idx}`}
                      />
                      <div className="space-y-1.5 flex-1 select-none">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <label
                            htmlFor={`step-${idx}`}
                            className={`text-xs font-bold cursor-pointer ${
                              isChecked ? "line-through text-[var(--text-muted)]" : "text-[var(--text-primary)]"
                            }`}
                          >
                            {stepItem.title}
                          </label>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">
                              {stepItem.priority} Priority
                            </span>
                            <span className="text-[9px] font-mono text-[var(--text-muted)] flex items-center gap-1">
                              <Clock size={8} /> {stepItem.time}
                            </span>
                          </div>
                        </div>
                        <p className={`text-[11px] leading-relaxed ${
                          isChecked ? "text-[var(--text-muted)]" : "text-[var(--text-secondary)]"
                        }`}>
                          {stepItem.description}
                        </p>
                        {stepItem.tip && !isChecked && (
                          <div className="p-2.5 bg-[var(--bg-surface)] border-l-2 border-orange-500 rounded-r-lg text-[10px] text-[var(--text-muted)] italic">
                            <strong>Expert Note:</strong> {stepItem.tip}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Collapsible Technical Context */}
          <details className="group border border-[var(--border-subtle)] rounded-xl overflow-hidden bg-[var(--bg-elevated)] transition-all">
            <summary className="p-4 flex justify-between items-center cursor-pointer font-bold text-xs text-[var(--text-primary)] select-none hover:bg-[var(--bg-surface)]">
              <span className="flex items-center gap-1.5">
                <BookOpen size={13} className="text-orange-400" />
                Under the Hood: Technical Networking Context
              </span>
              <span className="text-[10px] text-[var(--text-muted)] transition-transform group-open:rotate-180">▼</span>
            </summary>
            <div className="p-4 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[11px] text-[var(--text-secondary)] leading-relaxed space-y-2">
              <p>{currentResult.technicalExplanation}</p>
            </div>
          </details>

          {/* Reset Button */}
          <div className="pt-2">
            <Button variant="secondary" size="md" onClick={resetWizard} fullWidth>
              <RotateCcw size={14} className="mr-1.5" /> Start New Assessment
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
