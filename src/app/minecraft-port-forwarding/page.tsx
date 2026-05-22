import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import { Hammer, Users, HelpCircle } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Minecraft Port Forwarding Guide | Port 25565 Server Tutorial — RouterVia",
  description:
    "Step-by-step Minecraft port forwarding tutorial. Learn how to open port 25565 on your router so friends can join your local server.",
  canonical: "/minecraft-port-forwarding",
  keywords: [
    "minecraft port forwarding",
    "port 25565 router guide",
    "host minecraft server",
    "how to open minecraft port",
    "minecraft server connection timed out",
  ],
});

const breadcrumbs = [
  { name: "Gaming Tools", url: "/nat-type-checker" },
  { name: "Minecraft Port Forwarding", url: "/minecraft-port-forwarding" },
];

const steps = [
  {
    title: "Assign a Static IP Address to Your Minecraft Server Host PC",
    description: "Your computer must keep the same local IP address. If it changes, the port forwarding rules on the router will direct external players to the wrong machine. Open your router's DHCP reservation list and bind your computer's MAC address to a fixed local IP (like 192.168.1.100).",
    tip: "On Windows, you can find your local IP and MAC address by typing 'ipconfig /all' in Command Prompt.",
  },
  {
    title: "Access Your Router Admin Console",
    description: "Enter your router's default gateway IP address (typically 192.168.1.1) in your browser. Input your administrator credentials to access the settings dashboard.",
  },
  {
    title: "Locate Port Forwarding Settings",
    description: "Navigate to the Port Forwarding, Virtual Server, or Advanced NAT rules section within your router's configuration system.",
  },
  {
    title: "Configure the Port 25565 Rule",
    description: "Create a new rule with these specifications: Name: 'Minecraft Server', Protocol: 'TCP/UDP' (or Both), Internal Port: '25565', External Port: '25565', and IP Address: the static IP of your Minecraft host PC.",
    tip: "Make sure both internal and external port fields are filled with 25565.",
  },
  {
    title: "Configure Windows Defender Firewall Exceptions",
    description: "Even if your router redirects traffic, Windows Firewall may block incoming connections. Open Windows Security -> Firewall & Network Protection -> Advanced Settings. Create a new Inbound Rule for 'Port', specify 'TCP' and port '25565', select 'Allow the connection', and save. Repeat the process to create another Inbound Rule for 'UDP' on port '25565'.",
    tip: "Select 'Java(TM) Platform SE binary' and ensure it has private/public access checked in the allowed apps list.",
  },
];

const faqs = [
  {
    question: "Do my friends need to port forward to join my Minecraft server?",
    answer: "No. Only the host (the person running the server software on their computer) needs to configure port forwarding on their router. The connecting players only need your public IP address and the port number (e.g. 203.0.113.50:25565) to join from their client.",
  },
  {
    question: "Why do my friends get a 'Connection Timed Out' error?",
    answer: "This is almost always caused by: 1) Your Windows Defender Firewall is blocking the Java connection on the host PC, 2) The router rule is directing traffic to the wrong local IP address, or 3) Your ISP has you behind a Carrier-Grade NAT (CGNAT).",
  },
  {
    question: "What is my public IP address to give to my friends?",
    answer: "Your local IP (e.g., 192.168.1.x) is only visible inside your home. To allow friends to connect over the internet, search 'what is my IP' on RouterVia. Give them that public IP address, which they will paste into Minecraft's Multiplayer Server Address bar.",
  },
];

export default async function MinecraftPortForwardingPage() {
  return (
    <TroubleshootingArticleShell
      h1="Minecraft Port Forwarding"
      intro="Want to host your own Minecraft server and let friends join your world? Follow our definitive guide to open port 25565 and build a lag-free gaming session."
      category="nat"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={steps}
    >
      <div className="space-y-6">
        {/* Visual Minecraft Info block */}
        <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-2xl bg-gradient-to-br from-green-950/10 via-transparent to-transparent space-y-4">
          <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <Hammer size={16} className="text-green-400" />
            Minecraft Server Specifications
          </h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Unlike commercial hosting, local self-hosted Java servers require specific configurations to direct incoming player packets safely to the JVM runtime:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-1">
              <span className="font-bold text-green-400 block font-mono">Standard Game Port</span>
              <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">
                Java edition uses <strong>25565</strong>. Bedrock edition uses <strong>19132</strong> (UDP).
              </p>
            </div>
            <div className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-1">
              <span className="font-bold text-green-400 block font-mono">Server Connection String</span>
              <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">
                Provide your public IP formatted as: <code>[Your_Public_IP]:25565</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </TroubleshootingArticleShell>
  );
}
