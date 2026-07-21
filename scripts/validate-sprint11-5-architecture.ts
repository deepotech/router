import { PrismaClient, DeviceType, BrandCategory, WifiStandard, DeviceLifecycle, ResourceType } from '@prisma/client';

const prisma = new PrismaClient();

async function validatePrincipalArchitecture() {
  console.log("🧪 Validating Principal Architect Production Blueprint...");

  // 1. Create or upsert Brand with Family
  const tplink = await prisma.brand.upsert({
    where: { slug: "tp-link" },
    update: { category: BrandCategory.MANUFACTURER },
    create: {
      name: "TP-Link",
      slug: "tp-link",
      description: "TP-Link Networking Devices",
      category: BrandCategory.MANUFACTURER
    }
  });

  const archerFamily = await prisma.routerFamily.upsert({
    where: { slug: "tp-link-archer" },
    update: {},
    create: {
      brandId: tplink.id,
      name: "Archer Series",
      slug: "tp-link-archer",
      description: "TP-Link Archer Wireless Routers"
    }
  });

  console.log("✅ Created Router Family:", archerFamily.name, `[Brand: ${tplink.name}]`);

  // 2. Create RouterModel with inlined specs and GIN array aliases
  const ax73Model = await prisma.routerModel.upsert({
    where: { slug: "tp-link-archer-ax73-v1" },
    update: {
      familyId: archerFamily.id,
      series: "AX Series",
      deviceType: DeviceType.ROUTER,
      wifiStandardEnum: WifiStandard.WIFI_6,
      lifecycle: DeviceLifecycle.ACTIVE_SUPPORT,
      aliases: ["ax73", "archer-ax73", "tp-link-ax5400"],
      ramMB: 512,
      flashMB: 128,
      cpuCores: 3,
      cpuFrequencyMHz: 1500,
      maxSpeedMbps: 5400,
      wanPortSpeedMbps: 1000,
      lanPortSpeedMbps: 1000,
      hasUsb3: true,
      hasVpnServer: true,
      hasQos: true,
      supportsWpa3: true
    },
    create: {
      name: "Archer AX73",
      slug: "tp-link-archer-ax73-v1",
      brandId: tplink.id,
      familyId: archerFamily.id,
      series: "AX Series",
      deviceType: DeviceType.ROUTER,
      wifiStandardEnum: WifiStandard.WIFI_6,
      lifecycle: DeviceLifecycle.ACTIVE_SUPPORT,
      aliases: ["ax73", "archer-ax73", "tp-link-ax5400"],
      ramMB: 512,
      flashMB: 128,
      cpuCores: 3,
      cpuFrequencyMHz: 1500,
      maxSpeedMbps: 5400,
      wanPortSpeedMbps: 1000,
      lanPortSpeedMbps: 1000,
      hasUsb3: true,
      hasVpnServer: true,
      hasQos: true,
      supportsWpa3: true,
      loginIps: ["192.168.0.1"],
      wifiSetupGuide: "Setup via tplinkwifi.net",
      resetGuide: "Hold reset button for 10s",
      status: "STAGED",
      isPublished: true
    }
  });

  console.log("✅ Created Inlined Router Model:", ax73Model.name, `[Aliases: ${ax73Model.aliases.join(', ')}, RAM: ${ax73Model.ramMB}MB]`);

  // 3. Create RouterAnalytics (1:1 decoupled analytics)
  const analytics = await prisma.routerAnalytics.upsert({
    where: { routerId: ax73Model.id },
    update: { popularityScore: 94.2, monthlyImpressions: 45000 },
    create: {
      routerId: ax73Model.id,
      popularityScore: 94.2,
      evergreenScore: 1.0,
      commercialIntentScore: 0.85,
      informationalIntentScore: 0.95,
      monthlyImpressions: 45000
    }
  });

  console.log("✅ Created Decoupled Analytics Record:", `Popularity: ${analytics.popularityScore}, Impressions: ${analytics.monthlyImpressions}`);

  // 4. Create Unified Download Resource & Firmware
  const resource = await prisma.routerResource.create({
    data: {
      routerId: ax73Model.id,
      resourceType: ResourceType.FIRMWARE_BINARY,
      title: "Firmware v1.3.1 (Security Patch)",
      fileUrl: "https://static.tp-link.com/firmware/Archer_AX73_v1.zip",
      version: "1.3.1 Build 20240220",
      releaseNotes: "Fixes WPA3 handshake edge case.",
      cveFixes: ["CVE-2024-1234"]
    }
  });

  console.log("✅ Created Unified Resource Record:", resource.title, `[Type: ${resource.resourceType}, Version: ${resource.version}]`);

  console.log("\n✨ Principal Architect Production Blueprint Fully Verified!");
}

validatePrincipalArchitecture().catch(console.error).finally(() => prisma.$disconnect());
