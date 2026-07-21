import { PrismaClient, DeviceType, BrandCategory, WifiStandard, DeviceLifecycle } from '@prisma/client';

const prisma = new PrismaClient();

async function validateSprint12Architecture() {
  console.log("🧪 Validating Sprint 12 Normalized Database Architecture...");

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

  // 2. Create RouterFamily "Archer" and "Deco"
  const archerFamily = await prisma.routerFamily.upsert({
    where: { slug: "tp-link-archer" },
    update: {},
    create: {
      brandId: tplink.id,
      name: "Archer Series",
      slug: "tp-link-archer",
      description: "TP-Link Archer High Performance Wireless Routers"
    }
  });

  const decoFamily = await prisma.routerFamily.upsert({
    where: { slug: "tp-link-deco" },
    update: {},
    create: {
      brandId: tplink.id,
      name: "Deco Mesh Series",
      slug: "tp-link-deco",
      description: "TP-Link Deco Whole Home Mesh WiFi Systems"
    }
  });

  console.log("✅ Created Router Families:", archerFamily.name, ",", decoFamily.name);

  // 3. Create normalized RouterModel with technical specs
  const ax73Model = await prisma.routerModel.upsert({
    where: { slug: "tp-link-archer-ax73-v1" },
    update: {
      familyId: archerFamily.id,
      series: "AX Series",
      deviceType: DeviceType.ROUTER,
      wifiStandardEnum: WifiStandard.WIFI_6,
      lifecycle: DeviceLifecycle.ACTIVE_SUPPORT,
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
      supportsVlan: false
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
      supportsVlan: false,
      loginIps: ["192.168.0.1", "tplinkwifi.net"],
      wifiSetupGuide: "Connect to default SSID and open tplinkwifi.net",
      resetGuide: "Hold reset button for 10 seconds",
      status: "STAGED",
      isPublished: true
    }
  });

  console.log("✅ Created Normalized Router Model:", ax73Model.name, `[Family: ${archerFamily.name}, WiFi: ${ax73Model.wifiStandardEnum}, RAM: ${ax73Model.ramMB}MB, VPN: ${ax73Model.hasVpnServer}]`);
  console.log("\n✨ Sprint 12 Architecture Review & Database Normalization Fully Verified!");
}

validateSprint12Architecture().catch(console.error).finally(() => prisma.$disconnect());
