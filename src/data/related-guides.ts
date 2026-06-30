export interface GuideItem {
  title: string;
  url: string;
  category: "wifi" | "nat" | "dns";
  tags: string[];
  brand?: string;
}

export const ALL_GUIDES: GuideItem[] = [
  {
    title: "Forgot Router Password Recovery",
    url: "/forgot-router-password",
    category: "wifi",
    tags: ["password", "recovery", "reset"],
  },
  {
    title: "Router Admin Password Guide",
    url: "/router-admin-password",
    category: "wifi",
    tags: ["password", "credentials"],
  },
  {
    title: "Cannot Access Router Settings Page",
    url: "/router-cannot-access-settings",
    category: "nat",
    tags: ["access", "timeout", "settings"],
  },
  {
    title: "Web Interface Not Opening Troubleshooting",
    url: "/router-web-interface-not-opening",
    category: "nat",
    tags: ["access", "browser", "settings"],
  },
  {
    title: "Login Page Not Loading Fix",
    url: "/router-login-page-not-loading",
    category: "nat",
    tags: ["access", "timeout", "loading"],
  },
  {
    title: "Router IP Conflict Resolution",
    url: "/router-ip-conflict",
    category: "nat",
    tags: ["ip", "conflict", "dhcp"],
  },
  {
    title: "No Internet Access After Login",
    url: "/router-no-internet-after-login",
    category: "wifi",
    tags: ["internet", "wan", "dns"],
  },
  {
    title: "Router Firmware Update Guide",
    url: "/router-firmware-update-guide",
    category: "wifi",
    tags: ["firmware", "update", "setup"],
  },
  {
    title: "How to Change Router Admin Password",
    url: "/change-router-admin-password",
    category: "wifi",
    tags: ["password", "setup", "credentials"],
  },
  {
    title: "How to Secure Your Router After Setup",
    url: "/secure-router-after-setup",
    category: "wifi",
    tags: ["security", "setup", "hardening"],
  },
  {
    title: "TP-Link Default Password Guide",
    url: "/tp-link-default-password",
    category: "wifi",
    tags: ["password", "default"],
    brand: "tp-link",
  },
  {
    title: "Netgear Default Password Guide",
    url: "/netgear-default-password",
    category: "wifi",
    tags: ["password", "default"],
    brand: "netgear",
  },
  {
    title: "ASUS Default Password Guide",
    url: "/asus-default-password",
    category: "wifi",
    tags: ["password", "default"],
    brand: "asus",
  },
  {
    title: "D-Link Default Password Guide",
    url: "/d-link-default-password",
    category: "wifi",
    tags: ["password", "default"],
    brand: "d-link",
  },
  {
    title: "Linksys Default Password Guide",
    url: "/linksys-default-password",
    category: "wifi",
    tags: ["password", "default"],
    brand: "linksys",
  },
];
