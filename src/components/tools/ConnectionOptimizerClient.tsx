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
  | "wifi-signal";

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
