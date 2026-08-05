import React from "react";
import Link from "next/link";
import { Server, ShieldCheck, Wrench, Wifi, HelpCircle } from "lucide-react";

export interface LinkingItem {
  label: string;
  href: string;
  description?: string;
}

export interface InternalLinkingHubProps {
  title?: string;
  category?: "routers" | "ips" | "problems" | "tools" | "general";
  customLinks?: LinkingItem[];
}

const DEFAULT_LINK_GROUPS = {
  routers: [
    { label: "TP-Link Router Guides", href: "/routers/tp-link", description: "Default IP, admin login & password resets" },
    { label: "ASUS Router Guides", href: "/routers/asus", description: "RT-AX series configuration & recovery" },
    { label: "Netgear Router Guides", href: "/routers/netgear", description: "Nighthawk & Orbi setup tutorials" },
    { label: "D-Link Router Guides", href: "/routers/d-link", description: "DIR-series admin access & firmware" },
    { label: "Huawei Router Guides", href: "/routers/huawei", description: "HG8145V5 & AX3 gateway access" },
  ],
  ips: [
    { label: "192.168.1.1 Admin Gateway", href: "/ips/192-168-1-1", description: "Standard default router IP address" },
    { label: "192.168.0.1 Admin Gateway", href: "/ips/192-168-0-1", description: "TP-Link & D-Link login IP" },
    { label: "192.168.100.1 Gateway", href: "/ips/192-168-100-1", description: "Huawei & Fiber ONT gateway IP" },
    { label: "10.0.0.1 Admin Gateway", href: "/ips/10-0-0-1", description: "Xfinity & Comcast router IP" },
  ],
  tools: [
    { label: "Port Checker Tool", href: "/tools/port-checker", description: "Check open ports & NAT status" },
    { label: "Public IP Lookup", href: "/tools/ip-checker", description: "Detect external IPv4/IPv6 address" },
    { label: "DNS Propagation Checker", href: "/tools/dns-checker", description: "Verify global DNS record resolution" },
    { label: "Ping & Latency Tester", href: "/tools/ping-test", description: "Measure network latency & jitter" },
  ],
  problems: [
    { label: "Router Login Not Working", href: "/router-login-not-working", description: "Fix page load failures & IP timeouts" },
    { label: "Ethernet Connected No Internet", href: "/ethernet-connected-but-no-internet", description: "Resolve WAN IP & DNS assignment issues" },
    { label: "Default Gateway Not Available", href: "/default-gateway-not-available", description: "Troubleshoot network adapter unreachable errors" },
    { label: "DNS Server Not Responding", href: "/dns-server-not-responding", description: "Fix DNS lookup failures & socket timeout" },
  ]
};

export function InternalLinkingHub({
  title = "Related Technical Resources",
  category = "general",
  customLinks,
}: InternalLinkingHubProps) {
  const linksToDisplay = customLinks || [
    ...DEFAULT_LINK_GROUPS.routers.slice(0, 2),
    ...DEFAULT_LINK_GROUPS.ips.slice(0, 2),
    ...DEFAULT_LINK_GROUPS.tools.slice(0, 2),
    ...DEFAULT_LINK_GROUPS.problems.slice(0, 2),
  ];

  return (
    <section className="mt-12 pt-8 border-t border-neutral-800 space-y-6">
      <div className="flex items-center gap-3">
        <Server className="w-5 h-5 text-indigo-400" />
        <h3 className="text-xl font-bold text-white m-0">{title}</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {linksToDisplay.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex flex-col p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-indigo-500/50 hover:bg-neutral-800/80 transition-all"
          >
            <span className="text-sm font-semibold text-neutral-200 group-hover:text-indigo-300 transition-colors">
              {item.label}
            </span>
            {item.description && (
              <span className="text-xs text-neutral-400 mt-1 line-clamp-2">
                {item.description}
              </span>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
