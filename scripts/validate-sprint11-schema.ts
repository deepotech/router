import { PrismaClient, DeviceType, BrandCategory, ProblemCategory } from '@prisma/client';

const prisma = new PrismaClient();

async function validateSprint11() {
  console.log("🧪 Validating Sprint 11 Schema Enhancements...");

  // 1. Create or upsert an ISP Brand
  const xfinityBrand = await prisma.brand.upsert({
    where: { slug: "xfinity" },
    update: { category: BrandCategory.ISP },
    create: {
      name: "Xfinity",
      slug: "xfinity",
      description: "Xfinity xFi Internet Gateways & Modems",
      category: BrandCategory.ISP
    }
  });
  console.log("✅ ISP Brand Created:", xfinityBrand.name, `(${xfinityBrand.category})`);

  // 2. Create or upsert an ISP Gateway Model in RouterModel
  const xb8Gateway = await prisma.routerModel.upsert({
    where: { slug: "xfinity-xb8" },
    update: { deviceType: DeviceType.ISP_GATEWAY, wifiStandard: "WiFi 6E" },
    create: {
      name: "XB8 (CGM4981COM)",
      slug: "xfinity-xb8",
      brandId: xfinityBrand.id,
      deviceType: DeviceType.ISP_GATEWAY,
      wifiStandard: "WiFi 6E",
      loginIps: ["10.0.0.1"],
      defaultUsername: "admin",
      defaultPassword: "password",
      wifiSetupGuide: "Connect to xFi network and use 10.0.0.1 to configure admin credentials.",
      resetGuide: "Hold reset button for 30 seconds until light flashes white.",
      status: "STAGED",
      isPublished: true
    }
  });
  console.log("✅ ISP Gateway Model Created:", xb8Gateway.name, `[${xb8Gateway.deviceType}]`);

  // 3. Create or upsert a Mesh WiFi System Model
  const eeroBrand = await prisma.brand.upsert({
    where: { slug: "eero" },
    update: { category: BrandCategory.MANUFACTURER },
    create: {
      name: "Eero",
      slug: "eero",
      description: "Eero Mesh WiFi Systems",
      category: BrandCategory.MANUFACTURER
    }
  });

  const eeroMax7 = await prisma.routerModel.upsert({
    where: { slug: "eero-max-7" },
    update: { deviceType: DeviceType.MESH_SYSTEM, wifiStandard: "WiFi 7" },
    create: {
      name: "Eero Max 7",
      slug: "eero-max-7",
      brandId: eeroBrand.id,
      deviceType: DeviceType.MESH_SYSTEM,
      wifiStandard: "WiFi 7",
      loginIps: ["192.168.4.1"],
      defaultUsername: "eero-app",
      defaultPassword: "managed-via-app",
      wifiSetupGuide: "Setup via Eero mobile app.",
      resetGuide: "Hold reset button for 15 seconds until LED turns yellow.",
      status: "STAGED",
      isPublished: true
    }
  });
  console.log("✅ Mesh System Model Created:", eeroMax7.name, `[${eeroMax7.deviceType}]`);

  // 4. Create an LED Indicator Light Problem Guide
  const orangeLightProblem = await prisma.problem.upsert({
    where: { slug: "tp-link-router-blinking-orange-light-fix" },
    update: { category: ProblemCategory.LIGHTS },
    create: {
      title: "TP-Link Router Blinking Orange Internet Light — Meaning and How to Fix",
      slug: "tp-link-router-blinking-orange-light-fix",
      category: ProblemCategory.LIGHTS,
      excerpt: "Is your TP-Link router internet light blinking orange or amber? Here is how to fix WAN DHCP failure and restore internet.",
      content: "Detailed diagnostic steps for TP-Link orange internet light...",
      causes: ["ISP Modem disconnected", "DHCP lease expired", "MAC binding required"],
      status: "STAGED",
      isPublished: true
    }
  });
  console.log("✅ LED Indicator Light Guide Created:", orangeLightProblem.title, `[${orangeLightProblem.category}]`);

  // 5. Create an Advanced Networking Guide
  const wireguardGuide = await prisma.problem.upsert({
    where: { slug: "wireguard-vpn-asus-router-setup-guide" },
    update: { category: ProblemCategory.NETWORKING },
    create: {
      title: "How to Setup WireGuard VPN Server on ASUS Router",
      slug: "wireguard-vpn-asus-router-setup-guide",
      category: ProblemCategory.NETWORKING,
      excerpt: "Step-by-step guide to configuring WireGuard VPN server on ASUS Merlin or stock firmware.",
      content: "Complete setup guide for WireGuard VPN server on ASUS routers...",
      causes: ["Remote access required", "Encrypted home traffic"],
      status: "STAGED",
      isPublished: true
    }
  });
  console.log("✅ Advanced Networking Guide Created:", wireguardGuide.title, `[${wireguardGuide.category}]`);

  console.log("\n✨ All Sprint 11 Schema Enhancements Validated Successfully!");
}

validateSprint11().catch(console.error).finally(() => prisma.$disconnect());
