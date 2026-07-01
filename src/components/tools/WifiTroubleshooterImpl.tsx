"use client";

import { useState } from "react";
import { 
  Wifi, 
  WifiOff, 
  AlertTriangle, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle2, 
  HelpCircle, 
  BookOpen, 
  Clock, 
  Activity,
  Layers,
  ArrowUpRight,
  ShieldAlert,
  ServerCrash
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

type IssueType =
  | "disconnecting"
  | "orange-light"
  | "no-internet"
  | "wan-error"
  | "slow-firmware";

interface WifiTroubleshooterClientProps {
  issueType: IssueType;
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

const ISSUE_DATA: Record<IssueType, {
  title: string;
  icon: any;
  description: string;
  questions: Question[];
}> = {
  disconnecting: {
    title: "WiFi Disconnection Troubleshooter",
    icon: WifiOff,
    description: "Identify why your device or household is suffering from random WiFi dropouts, signal loss, or mesh roaming failure.",
    questions: [
      {
        id: 1,
        text: "How frequently does the WiFi connection drop?",
        options: [
          { label: "Constantly (every few minutes)", value: "frequent" },
          { label: "Occasionally (a few times a day)", value: "intermittent" },
          { label: "Only when I move to specific rooms or far away", value: "range" },
          { label: "Under heavy network loads (downloads, gaming, streaming)", value: "load" }
        ]
      },
      {
        id: 2,
        text: "How is your WiFi network name (SSID) set up?",
        options: [
          { label: "Combined: One name for both 2.4GHz & 5GHz (Smart Connect)", value: "smart-connect" },
          { label: "Separated: Different names (e.g., HomeWiFi_2G & HomeWiFi_5G)", value: "separated" },
          { label: "Unsure / Default ISP router settings", value: "default" }
        ]
      },
      {
        id: 3,
        text: "Does this issue happen on all devices or just one?",
        options: [
          { label: "Every device drops offline at the exact same time", value: "all" },
          { label: "Only my PC/Laptop drops connection", value: "single-pc" },
          { label: "Only mobile phones or smart home devices drop", value: "single-mobile" }
        ]
      }
    ]
  },
  "orange-light": {
    title: "Router Orange Light Diagnostics",
    icon: AlertTriangle,
    description: "Diagnose solid or blinking orange, amber, or red LED indicators on your router and restore WAN communication.",
    questions: [
      {
        id: 1,
        text: "What is the physical connection setup of your WAN port?",
        options: [
          { label: "Ethernet cable is clicked securely into WAN and Modem/ONT", value: "secure" },
          { label: "Cable is plugged in, but it is old, flat, or feels loose", value: "loose" },
          { label: "I'm unsure which port is WAN or if it's plugged into LAN", value: "unsure-port" }
        ]
      },
      {
        id: 2,
        text: "Have you rebooted the modem/ONT and router in a specific order?",
        options: [
          { label: "No, I haven't power-cycled either device yet", value: "no-reboot" },
          { label: "Yes, I restarted them at the same time", value: "simultaneous" },
          { label: "Yes, sequentially (modem first, wait 2 mins, then router)", value: "sequential" }
        ]
      },
      {
        id: 3,
        text: "Did this problem start right after setting up a new router?",
        options: [
          { label: "Yes, this is a brand new router replacing an old one", value: "new-router" },
          { label: "No, it happened randomly on a router that worked before", value: "working" }
        ]
      }
    ]
  },
  "no-internet": {
    title: "Connected No Internet Resolver",
    icon: Activity,
    description: "Troubleshoot why your device shows successful WiFi connection but cannot load websites or transmit data.",
    questions: [
      {
        id: 1,
        text: "Are multiple devices experiencing the 'No Internet' state?",
        options: [
          { label: "Yes, all devices in the house show Connected, No Internet", value: "all" },
          { label: "Only this specific device is blocked; others work fine", value: "single" },
          { label: "Only WiFi devices fail; wired Ethernet works perfectly", value: "wifi-only" }
        ]
      },
      {
        id: 2,
        text: "Can you access your router's administration panel (e.g. 192.168.1.1)?",
        options: [
          { label: "Yes, I can log into the router settings successfully", value: "yes" },
          { label: "No, the gateway page times out and won't load", value: "no" }
        ]
      },
      {
        id: 3,
        text: "Are you running any security software, VPNs, or custom DNS?",
        options: [
          { label: "Yes, a VPN or active third-party firewall/antivirus is running", value: "vpn-firewall" },
          { label: "No, using standard network settings and ISP automatic DNS", value: "standard" },
          { label: "Yes, using custom DNS (Cloudflare 1.1.1.1 / Google 8.8.8.8)", value: "custom-dns" }
        ]
      }
    ]
  },
  "wan-error": {
    title: "WAN Port Connectivity Diagnostics",
    icon: ServerCrash,
    description: "Determine why your router claims the WAN/Internet port is unplugged or fails to detect the incoming ISP gateway.",
    questions: [
      {
        id: 1,
        text: "What is your ISP hookup setup in the house?",
        options: [
          { label: "Fiber internet with a separate wall-mounted ONT box", value: "ont" },
          { label: "Cable/DSL modem with coaxial or telephone jack", value: "modem" },
          { label: "Direct ethernet port coming out of the wall", value: "wall-port" }
        ]
      },
      {
        id: 2,
        text: "Do you see physical LEDs active on the router's WAN port?",
        options: [
          { label: "No LED lights are active on the WAN/Internet port", value: "no-lights" },
          { label: "Solid green or amber light is active", value: "solid" },
          { label: "Blinking green/amber light is active", value: "blinking" }
        ]
      },
      {
        id: 3,
        text: "Does your ISP require a PPPoE login configuration?",
        options: [
          { label: "No, typical Dynamic IP (DHCP) auto-config", value: "dhcp" },
          { label: "Yes, requires PPPoE username and password (DSL/some Fiber)", value: "pppoe" },
          { label: "Unsure / Default setup", value: "unsure" }
        ]
      }
    ]
  },
  "slow-firmware": {
    title: "Post-Firmware Update Slowdown Diagnostic",
    icon: Layers,
    description: "Isolate and repair speed drops, high ping, or wireless instability following a router firmware upgrade.",
    questions: [
      {
        id: 1,
        text: "Where is the slowdown most prominent?",
        options: [
          { label: "Only on WiFi devices; wired Ethernet matches full speeds", value: "wifi-only" },
          { label: "On all devices, whether connected via WiFi or Ethernet", value: "all" },
          { label: "Speeds are normal, but gaming ping is extremely unstable", value: "ping" }
        ]
      },
      {
        id: 2,
        text: "Did you perform a hardware factory reset after the update?",
        options: [
          { label: "No, I just let the router reboot with old settings", value: "no-reset" },
          { label: "Yes, I reset it and reconfigured from scratch", value: "reset" }
        ]
      },
      {
        id: 3,
        text: "Are you utilizing router prioritization features like QoS?",
        options: [
          { label: "Yes, Quality of Service (QoS) is active with bandwidth rules", value: "qos" },
          { label: "No, QoS is turned off / using defaults", value: "no-qos" }
        ]
      }
    ]
  }
};

export default function WifiTroubleshooterImpl({ issueType }: WifiTroubleshooterClientProps) {
  const [step, setStep] = useState(0); // 0 = Intro, 1-3 = Questions, 4 = Results
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});

  const config = ISSUE_DATA[issueType];
  const IssueIcon = config.icon;
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
    switch (issueType) {
      case "disconnecting": {
        const q1 = answers[1];
        const q2 = answers[2];
        const q3 = answers[3];

        if (q3 === "single-pc") {
          return {
            title: "Client-Side Driver or Power-Saving Congestion",
            severity: "warning",
            description: "Since only one computer drops offline while other household devices remain stable, the issue resides within the computer's network adapter or driver settings.",
            steps: [
              {
                title: "Disable Network Adapter Power Saving Mode",
                priority: "High",
                time: "2 mins",
                description: "Open Device Manager on Windows, locate your WiFi card under 'Network adapters', right-click and open Properties. In the 'Power Management' tab, uncheck 'Allow the computer to turn off this device to save power'.",
                tip: "Laptops often drop WiFi when switching power profiles (e.g. unplugging the charger) if this is enabled."
              },
              {
                title: "Update Wireless NIC Drivers",
                priority: "High",
                time: "5 mins",
                description: "Download the latest package for your wireless card (Intel, Realtek, or MediaTek) directly from the motherboard or laptop manufacturer website instead of relying on default Windows Update drivers.",
              },
              {
                title: "Disable 802.11d Support & Roaming Aggressiveness",
                priority: "Medium",
                time: "3 mins",
                description: "In the Advanced tab of your network adapter Properties, lower 'Roaming Aggressiveness' to 'Medium-Low' or 'Lowest' to prevent the PC from scanning for other APs constantly.",
              }
            ],
            technicalExplanation: "Operating systems aggressively conserve battery by cutting voltage to the PCIe wireless card. During heavy network transactions, this low-power state triggers local TCP socket disconnects, forcing the router to drop the device's DHCP lease due to unresponsive keep-alive beacons."
          };
        }

        if (q2 === "smart-connect" || q2 === "default") {
          return {
            title: "Smart Connect / Band-Steering Congestion",
            severity: "danger",
            description: "Your router is combining the 2.4 GHz and 5 GHz bands under a single SSID name. As devices move, the router dynamically forces clients to jump between frequencies, triggering constant 1-2 second drops.",
            steps: [
              {
                title: "Disable Smart Connect (Separate SSIDs)",
                priority: "High",
                time: "5 mins",
                description: "Log into your router admin console (usually 192.168.1.1 or 192.168.0.1) and navigate to Wireless Settings. Locate 'Smart Connect', toggle it OFF, and append '_5G' to your 5GHz wireless name so you have two distinct networks.",
                tip: "Keep high-bandwidth devices (gaming PCs, consoles, smart TVs) strictly on the _5G network, and smart-home/loT gear on the 2.4GHz network."
              },
              {
                title: "Adjust WiFi Channel Widths",
                priority: "Medium",
                time: "4 mins",
                description: "Under Wireless settings, set your 2.4GHz channel width strictly to 20 MHz (never 40 MHz, to prevent overlapping neighbor channel interference). For 5GHz, set it to 40 MHz or 80 MHz depending on router placement.",
              },
              {
                title: "Pin a Static Wireless Channel",
                priority: "Medium",
                time: "3 mins",
                description: "Change channel selection from 'Auto' to a clear frequency. For 2.4GHz, choose strictly channel 1, 6, or 11. For 5GHz, select a non-DFS channel like 36, 44, or 149.",
              }
            ],
            technicalExplanation: "Smart Connect uses a process called band steering. When a 5GHz signal drops slightly, the router forcefully terminates the connection to migrate the device to 2.4GHz. Because the device must re-initialize a DHCP handshake, you experience packet loss, video buffering, and disconnects."
          };
        }

        return {
          title: "WiFi Range Decay or Channel Congestion",
          severity: "warning",
          description: "Your drops are caused by environmental barriers or adjacent neighbor routers broadcasting on the same wireless frequencies, polluting the local airspace.",
          steps: [
            {
              title: "Migrate to a Non-Congested Channel",
              priority: "High",
              time: "3 mins",
              description: "Install a WiFi Analyzer app on your phone. Determine which wireless channels are crowded in your living area, and manually assign your router to an unused channel (1, 6, or 11 for 2.4GHz).",
            },
            {
              title: "Increase DHCP Lease Duration",
              priority: "Medium",
              time: "4 mins",
              description: "Log into the router dashboard, go to LAN/DHCP settings, and change the DHCP Lease Time from the typical 2 hours (120 minutes) to 24 hours (1440 minutes) or 7 days.",
              tip: "A short DHCP lease forces devices to renew their IP frequently, which can cause connection dropouts on legacy hardware."
            },
            {
              title: "Relocate Router and Adjust Antennas",
              priority: "Low",
              time: "5 mins",
              description: "Elevate your router to a central location. Do not store it inside closed wooden cabinets, metal media enclosures, or directly behind TVs, which act as Faraday cages.",
            }
          ],
          technicalExplanation: "WiFi signals decay exponentially when passing through wood, drywall, and masonry. When signals drop below -75dBm, the Signal-to-Noise Ratio (SNR) degrades, causing high frame error rates. This forces the router to repeatedly request packet retransmissions, leading to eventual connection timeout."
        };
      }

      case "orange-light": {
        const q1 = answers[1];
        const q2 = answers[2];
        const q3 = answers[3];

        if (q3 === "new-router") {
          return {
            title: "ISP MAC Binding Lock / CGNAT Bottleneck",
            severity: "danger",
            description: "Your ISP modem has cached the MAC address of your old router and is actively rejecting the new router's WAN configuration, blocking all inbound traffic.",
            steps: [
              {
                title: "Perform a Sequential Modem/Router Reset",
                priority: "High",
                time: "10 mins",
                description: "Turn off both devices. Unplug the power cable from your fiber ONT/cable modem and router. Wait exactly 5 full minutes. Plug the MODEM in first and wait for the 'Internet/Online' light to go solid. Only then plug in the ROUTER.",
                tip: "This sequential boot forces the ISP DSLAM/CMTS server to clear its MAC cache and lease a fresh WAN IP to your new router."
              },
              {
                title: "Clone MAC Address of Your Old PC/Router",
                priority: "High",
                time: "5 mins",
                description: "Log into your router admin panel. Go to WAN/Internet settings, find the 'MAC Clone' section, and choose 'Clone Current PC MAC Address' or manually type the MAC of your previous working router.",
              }
            ],
            technicalExplanation: "Cable and Fiber ISPs bind their WAN IP leases to the first MAC address detected on the modem's Ethernet port. Connecting a new device without clearing this binding results in a DHCP request failure, leaving the router WAN interface without an IP address, which lights up the orange/red LED."
          };
        }

        if (q1 === "loose" || q1 === "unsure-port") {
          return {
            title: "Physical Layer (PHY) Link Failure",
            severity: "warning",
            description: "The router WAN port is not establishing a stable physical link with your modem, indicating a broken ethernet cable, bad contacts, or port speed mismatches.",
            steps: [
              {
                title: "Replace WAN Ethernet Cable (Cat6 Recommended)",
                priority: "High",
                time: "3 mins",
                description: "Replace the cable between the modem/ONT and router WAN port. Avoid flat ribbon cables which lack twisted-pair shielding and suffer from electromagnetic crosstalk.",
              },
              {
                title: "Verify Cable is in the WAN/Internet Port",
                priority: "High",
                time: "1 min",
                description: "Ensure the cable is plugged into the port labeled 'WAN' or 'Internet' (typically colored blue, yellow, or separated from the four LAN ports). You should hear a distinct 'click' when inserting it.",
              }
            ],
            technicalExplanation: "Modern routers perform physical link negotiation (Auto-MDIX). If a cable has broken internal copper pairs or degraded connectors, the hardware failover drops the connection down to 10Mbps half-duplex or shuts down the port, throwing a hardware WAN LED error."
          };
        }

        return {
          title: "ISP DHCP Lease Exhaustion or WAN Outage",
          severity: "danger",
          description: "Your router is ready, but the ISP node is not responding to WAN DHCP requests, indicating an active ISP service outage, line noise, or provisioning configuration changes.",
          steps: [
            {
              title: "Verify ISP WAN Connection Type",
              priority: "High",
              time: "4 mins",
              description: "Log into your router, go to WAN settings. Make sure 'WAN Connection Type' is set to 'Dynamic IP' (DHCP). If your ISP is DSL or PPPoE-based (like CenturyLink/PPPoE Fiber), ensure your PPPoE username and credentials are correct.",
            },
            {
              title: "Inspect Fiber ONT or Cable Modem Status Lights",
              priority: "Medium",
              time: "5 mins",
              description: "Check the lights on your ISP gateway box. If the 'LOS' (Loss of Signal) light is blinking red, there is a physical fiber break. If the 'US/DS' lights are blinking on cable, there is line signal degradation.",
              tip: "If ONT/Modem lights indicate no signal, bypass the router and call your ISP support directly as the fault is on their network."
            }
          ],
          technicalExplanation: "When the router issues a DHCP Discover broadcast on its WAN port, it expects a DHCP Offer from the ISP. If no reply is received within 30 seconds due to line attenuation or upstream provisioning blockages, the router sets the WAN status to disconnected."
        };
      }

      case "no-internet": {
        const q1 = answers[1];
        const q2 = answers[2];
        const q3 = answers[3];

        if (q1 === "single") {
          return {
            title: "Device DNS Cache Corruption or Static IP Conflict",
            severity: "warning",
            description: "Since other household devices are browsing normally, the issue is restricted to your specific device's local DNS resolver cache or a static IP routing conflict.",
            steps: [
              {
                title: "Flush DNS Cache and Reset TCP/IP Stack",
                priority: "High",
                time: "3 mins",
                description: "On Windows, search for 'cmd', right-click Command Prompt and select 'Run as Administrator'. Type: 'ipconfig /flushdns' then 'netsh int ip reset' and reboot your system.",
                tip: "On macOS, run: 'sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder' in Terminal."
              },
              {
                title: "Release and Renew DHCP IP Lease",
                priority: "High",
                time: "2 mins",
                description: "In the same command prompt, type: 'ipconfig /release' to discard your current IP, followed by 'ipconfig /renew' to request a new local IP address lease from the router.",
              },
              {
                title: "Disable Third-Party Antivirus & VPN Services",
                priority: "Medium",
                time: "3 mins",
                description: "Temporarily turn off VPN clients (NordVPN, ExpressVPN, etc.) or security suites. These tools install virtual network adapters that can freeze routing tables if they crash.",
              }
            ],
            technicalExplanation: "Operating systems store recently resolved domain name lookups in a local cache. If a cache block becomes corrupted or a VPN crashes without resetting the default gateway, the system tries to route all internet traffic into a non-existent network bridge."
          };
        }

        if (q3 === "vpn-firewall") {
          return {
            title: "Secured Port Block or Tunnel Failure",
            severity: "warning",
            description: "An active VPN or security software is routing traffic through a dead gateway tunnel, preventing your local internet traffic from finding the public network.",
            steps: [
              {
                title: "Disable VPN and Firewalls to Verify",
                priority: "High",
                time: "2 mins",
                description: "Close your VPN client completely. Temporarily disable any custom third-party firewalls and check if internet connectivity immediately returns.",
              },
              {
                title: "Configure Custom DNS Resolvers on the Device",
                priority: "Medium",
                time: "4 mins",
                description: "Instead of relying on ISP DNS, manually assign public DNS. Go to Network Adapter Properties -> IPv4 Settings. Select 'Use the following DNS server addresses' and input Primary: '1.1.1.1' (Cloudflare) and Secondary: '8.8.8.8' (Google).",
              }
            ],
            technicalExplanation: "When a VPN establishes a secure tunnel, it overrides the router's DNS and routes all traffic through a virtual adapter (TUN/TAP). If the remote VPN server drops or authentication fails, the virtual adapter blocks traffic to prevent data leaks, resulting in a 'connected, no internet' state."
          };
        }

        return {
          title: "Upstream DNS Resolution Failure",
          severity: "danger",
          description: "Your local router connection is fine, but the DNS servers assigned by your ISP are offline or failing to resolve domain names to numeric IP addresses.",
          steps: [
            {
              title: "Assign Global Public DNS in Router Dashboard",
              priority: "High",
              time: "5 mins",
              description: "Log into your router (e.g. TP-Link, ASUS, Netgear admin). Go to WAN / Network settings, change DNS from 'Automatic' or 'Get from ISP' to 'Use DNS'. Input Primary: '1.1.1.1' and Secondary: '1.0.0.1'.",
              tip: "Updating DNS at the router level automatically fixes all connected TVs, smart plugs, phones, and computers in one go."
            },
            {
              title: "Verify Router WAN IP Address",
              priority: "Medium",
              time: "4 mins",
              description: "Check the WAN status page inside your router. If your WAN/Internet IP address is empty (e.g., 0.0.0.0) or shows a local subnet (e.g., 192.168.100.2), you have a Double NAT or upstream ISP gateway disconnect.",
            }
          ],
          technicalExplanation: "Without functioning DNS, the web browser cannot translate hostnames (like google.com) into numeric IP addresses (like 142.250.190.46). Since the physical TCP link to the router is active, the system registers 'connected', but DNS requests time out, causing browser failures."
        };
      }

      case "wan-error": {
        const q1 = answers[1];
        const q2 = answers[2];
        const q3 = answers[3];

        if (q1 === "ont") {
          return {
            title: "Fiber ONT (Optical Network Terminal) Auth Misalignment",
            severity: "danger",
            description: "Your router is not receiving an IP address because the Fiber ONT (fiber-to-copper transceiver) is either out of sync with the ISP central office (OLT) or its LAN port is disabled.",
            steps: [
              {
                title: "Inspect ONT Status Lights (Check LOS Light)",
                priority: "High",
                time: "5 mins",
                description: "Locate your wall-mounted fiber ONT box. If the 'LOS' (Loss of Signal) light is blinking red, there is a physical fiber line break or bad splice. Bypass the router, do not plug/unplug the green fiber jack, and contact your ISP.",
              },
              {
                title: "Power Cycle Fiber ONT and Router in Sequence",
                priority: "High",
                time: "8 mins",
                description: "Unplug power from the ONT box and the router. Wait 3 minutes. Plug the ONT back in and wait for the 'PON/Auth' light to go solid green. Then, plug in the router WAN port.",
              },
              {
                title: "Verify WAN Port Auto-Negotiation Speed",
                priority: "Medium",
                time: "4 mins",
                description: "Log into router console -> WAN settings. Locate 'WAN Port Speed' or 'Negotiation Mode'. Set it from 'Auto' to '1000Mbps Full Duplex' or '100Mbps Full Duplex'.",
                tip: "Some ONT LAN ports fail to negotiate duplex rates automatically with third-party routers, resulting in a disconnected WAN status."
              }
            ],
            technicalExplanation: "Fiber ONTs convert light signals to copper Ethernet frames. They authenticate with the ISP using a proprietary hardware ID (SLID or GPON serial). If this link drops or the ONT ethernet port gets locked due to a MAC flood protection safety protocol, no packets will cross to the router."
          };
        }

        if (q3 === "pppoe") {
          return {
            title: "Missing or Incorrect PPPoE WAN Authentication",
            severity: "danger",
            description: "Your ISP (such as CenturyLink, PPPoE Fiber, or DSL providers) requires explicit PPPoE credentials to establish a WAN tunnel, which are missing or corrupted in your router configuration.",
            steps: [
              {
                title: "Configure PPPoE Mode inside Router WAN settings",
                priority: "High",
                time: "5 mins",
                description: "Log into router admin panel. Under WAN Connection settings, change connection type from 'Dynamic IP' to 'PPPoE'. Input your exact ISP username (often ending in @q.com or @isp.net) and password.",
                tip: "If you don't know your PPPoE password, call your ISP support or check your original setup contract. Router default settings won't auto-resolve this."
              },
              {
                title: "Enable VLAN Tagging (Required by Some Fiber ISPs)",
                priority: "High",
                time: "5 mins",
                description: "Under Advanced WAN / IPTV settings, enable VLAN ID tagging. If your ISP is CenturyLink, set the VLAN ID to '201'. For other ISPs, verify if they require a specific tag (e.g. VLAN 10 or 35).",
              }
            ],
            technicalExplanation: "PPPoE (Point-to-Point Protocol over Ethernet) encapsulates PPP packets inside Ethernet frames to handle session authentication. If your router does not authenticate with the provider's BRAS (Broadband Remote Access Server) or lacks the correct VLAN tag, the ISP switch will drop all incoming WAN packets."
          };
        }

        return {
          title: "WAN Port Physical Port Link Negotiation Failure",
          severity: "warning",
          description: "Your router is physically unable to detect any electrical loopback on its WAN port, indicating a physical cable issue or port failure.",
          steps: [
            {
              title: "Replace WAN Ethernet Cable (Cat6 or Cat5e)",
              priority: "High",
              time: "3 mins",
              description: "Replace the cable between modem/ONT and router WAN. A cable with damaged RJ45 pins or micro-fractures in the copper wires will fail to complete the 8-pin circuit.",
            },
            {
              title: "Perform a WAN Loopback Hardware Test",
              priority: "Medium",
              time: "5 mins",
              description: "Take a working ethernet cable. Connect one end to the router's WAN port, and the other end to one of the router's LAN ports (LAN 1). Check if the WAN light turns on.",
              tip: "If the WAN light turns on during a loopback test, the router's WAN port is physically working, and the issue lies in the modem/ONT port or the ISP line."
            }
          ],
          technicalExplanation: "Ethernet ports use differential signal voltages on copper pairs to detect link partners. If the transmit (TX) and receive (RX) lines do not sense a resistive loopback from the modem, the ethernet controller remains in a low-power downstate, throwing a 'port unplugged' error."
        };
      }

      case "slow-firmware": {
        const q1 = answers[1];
        const q2 = answers[2];
        const q3 = answers[3];

        if (q2 === "no-reset") {
          return {
            title: "Config NVRAM Cache Conflict",
            severity: "danger",
            description: "Upgrading firmware changes the underlying database schema of the router's NVRAM (Non-Volatile RAM). Keeping old settings causes configuration parameters to conflict, causing high CPU load and slow routing.",
            steps: [
              {
                title: "Perform a Hardware Factory Reset",
                priority: "High",
                time: "8 mins",
                description: "Locate the tiny 'Reset' pinhole on the back of your router. While the router is powered ON, press and hold the button inside using a paperclip for exactly 10 to 15 seconds. Release when all lights flash.",
                tip: "Do not restore a saved configuration backup file after the reset. Manually re-enter your network name and password to ensure a clean NVRAM partition."
              },
              {
                title: "Disable Hardware Acceleration QoS Conflict",
                priority: "High",
                time: "5 mins",
                description: "Log into the router dashboard. Go to QoS (Quality of Service) settings and disable it completely. On many modern routers, enabling QoS disables CTF (Cut-Through Forwarding) hardware acceleration, capping speeds to 100-200Mbps.",
              }
            ],
            technicalExplanation: "Router CPUs are small MIPS/ARM processors. To achieve gigabit speeds, they use NAT acceleration modules (CTF/FA) that bypass the Linux kernel stack. Enabling features like QoS, Parental Controls, or importing an outdated NVRAM configuration forces all packets to be processed by the slow main CPU, dropping speeds by up to 80%."
          };
        }

        if (q1 === "wifi-only") {
          return {
            title: "DFS Channel Re-assignment & Channel Width Cap",
            severity: "warning",
            description: "The new firmware has reset your wireless channels to default values, locking you on congested frequencies or forcing 5GHz down to 20MHz width.",
            steps: [
              {
                title: "Manually Re-configure 5GHz Channel Width",
                priority: "High",
                time: "4 mins",
                description: "Log into settings -> Wireless. Select 5GHz network, change Channel Width from 'Auto' or '20MHz' to '80 MHz' (or '160 MHz' if supported by your devices).",
                tip: "A width of 20MHz limits maximum link speeds to 173Mbps, whereas 80MHz opens link speeds up to 866Mbps or higher."
              },
              {
                title: "Disable DFS Channels on 5GHz",
                priority: "Medium",
                time: "3 mins",
                description: "Change 5GHz channel selection from 'Auto' to a fixed, non-DFS channel (like 36, 40, 44, 48, 149, or 161). DFS channels (52-144) will drop connection or run slowly if radar signals are detected.",
              }
            ],
            technicalExplanation: "Firmware updates restore regulatory defaults. To comply with FCC radar regulations, routers default to safe, narrow 20MHz channels. Changing channel width to 80MHz leverages channel bonding to aggregate multiple 20MHz bands, multiplying wireless data capacity."
          };
        }

        return {
          title: "Firmware Regression or ROM Partition Corruption",
          severity: "warning",
          description: "The current firmware build contains optimization regressions for your router's hardware version, or the flash memory partition suffered block errors during the write process.",
          steps: [
            {
              title: "Perform a Stable Firmware Rollback",
              priority: "High",
              time: "10 mins",
              description: "Go to the router manufacturer support website (TP-Link, ASUS, Netgear), select your exact router model and hardware version. Download the previous stable firmware build. Log into router -> Administration -> Firmware Upgrade. Upload the downloaded file.",
              tip: "Always double-check your router's hardware version (e.g. V1, V2) printed on the bottom sticker. Uploading the wrong version can brick the unit."
            },
            {
              title: "Disable IPv6 Connection Profile",
              priority: "Medium",
              time: "3 mins",
              description: "Navigate to IPv6 settings in your router and toggle it to Disabled. Some firmware releases have buggy IPv6 packet inspection engines that bottleneck connection speeds.",
            }
          ],
          technicalExplanation: "Firmware files contain compiled kernel binaries. If a flash block contains minor sector corruption or the vendor's kernel has unoptimized drivers for the wireless chipset, the router experiences memory leaks and high packet drops, requiring a firmware rollback."
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

  // Severity configurations
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
            <IssueIcon size={28} />
          </div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
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
              id="start-troubleshooter-btn"
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
                className="w-full text-left px-5 py-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-orange-800/40 hover:bg-[var(--bg-surface)] rounded-xl text-xs md:text-sm text-[var(--text-primary)] font-medium transition-all duration-200 cursor-pointer flex items-center justify-between group"
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
          <p className="text-xs text-[var(--text-muted)] font-mono">Running diagnostic engine algorithms...</p>
        </div>
      )}

      {/* STEP 4: RESULTS */}
      {step > config.questions.length && !loading && (
        <div className="space-y-6 relative z-10">
          {/* Diagnostic Verdict */}
          <div className={`p-5 rounded-2xl border ${activeSev.border} ${activeSev.bg} space-y-3`}>
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-bold font-mono uppercase tracking-wider ${activeSev.text} flex items-center gap-1.5`}>
                <Activity size={12} /> Diagnostic Verdict
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
                    className={`p-4 border rounded-xl transition-all duration-350 bg-[var(--bg-elevated)] ${
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

          {/* Collapsible Technical Explanation */}
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

          {/* Reset button */}
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
