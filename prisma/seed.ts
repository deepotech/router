import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// =============================================================
// DATABASE SEED SCRIPT
// Run with: npx prisma db seed
// =============================================================

async function main() {
  console.log("🌱 Seeding NetDoctor AI database...");

  // ---- Brands ----
  const brands = await Promise.all([
    prisma.brand.upsert({
      where: { slug: "tp-link" },
      update: {},
      create: {
        name: "TP-Link",
        slug: "tp-link",
        description:
          "TP-Link is a leading global provider of networking products, offering reliable Wi-Fi routers, switches, and smart home devices.",
      },
    }),
    prisma.brand.upsert({
      where: { slug: "huawei" },
      update: {},
      create: {
        name: "Huawei",
        slug: "huawei",
        description:
          "Huawei offers a wide range of networking products including home routers, enterprise networking equipment, and 5G solutions.",
      },
    }),
    prisma.brand.upsert({
      where: { slug: "zte" },
      update: {},
      create: {
        name: "ZTE",
        slug: "zte",
        description:
          "ZTE Corporation is a global leader in telecommunications equipment, providing routers, modems, and broadband solutions.",
      },
    }),
    prisma.brand.upsert({
      where: { slug: "d-link" },
      update: {},
      create: {
        name: "D-Link",
        slug: "d-link",
        description:
          "D-Link is a leading networking equipment manufacturer specializing in Wi-Fi routers, switches, and surveillance solutions.",
      },
    }),
    prisma.brand.upsert({
      where: { slug: "asus" },
      update: {},
      create: {
        name: "ASUS",
        slug: "asus",
        description:
          "ASUS produces high-performance gaming and consumer routers with advanced features like AiMesh and AiProtection.",
      },
    }),
    prisma.brand.upsert({
      where: { slug: "netgear" },
      update: {},
      create: {
        name: "Netgear",
        slug: "netgear",
        description:
          "Netgear provides home and business networking solutions including Orbi mesh WiFi systems and Nighthawk routers.",
      },
    }),
    prisma.brand.upsert({
      where: { slug: "linksys" },
      update: {},
      create: {
        name: "Linksys",
        slug: "linksys",
        description:
          "Linksys manufactures home networking equipment including the Velop mesh Wi-Fi system and WRT gaming routers.",
      },
    }),
    prisma.brand.upsert({
      where: { slug: "xiaomi" },
      update: {},
      create: {
        name: "Xiaomi",
        slug: "xiaomi",
        description:
          "Xiaomi offers affordable yet feature-rich routers and mesh Wi-Fi systems with excellent mobile app integration.",
      },
    }),
    prisma.brand.upsert({
      where: { slug: "tenda" },
      update: {},
      create: {
        name: "Tenda",
        slug: "tenda",
        description:
          "Tenda specializes in manufacturing easy-to-install, affordable routers, switches, and home mesh systems.",
      },
    }),
    prisma.brand.upsert({
      where: { slug: "mercusys" },
      update: {},
      create: {
        name: "Mercusys",
        slug: "mercusys",
        description:
          "Mercusys manufactures affordable networking devices focusing on simple setups, high-gain antennas, and basic home coverage.",
      },
    }),
    prisma.brand.upsert({
      where: { slug: "cisco" },
      update: {},
      create: {
        name: "Cisco",
        slug: "cisco",
        description:
          "Cisco Systems is a global leader in enterprise networking equipment, professional switches, and business-grade secure routers.",
      },
    }),
    prisma.brand.upsert({
      where: { slug: "belkin" },
      update: {},
      create: {
        name: "Belkin",
        slug: "belkin",
        description:
          "Belkin provides clean, stylish home routers and lifestyle accessories with straightforward wireless setup configurations.",
      },
    }),
    prisma.brand.upsert({
      where: { slug: "arris" },
      update: {},
      create: {
        name: "Arris",
        slug: "arris",
        description:
          "Arris manufactures cable modems and Surfboard gateways that connect home networks directly to cable provider backbones.",
      },
    }),
  ]);

  console.log(`✅ Created ${brands.length} brands`);

  const tpLink = brands.find((b) => b.slug === "tp-link")!;
  const huawei = brands.find((b) => b.slug === "huawei")!;
  const zte = brands.find((b) => b.slug === "zte")!;
  const dLink = brands.find((b) => b.slug === "d-link")!;
  const asus = brands.find((b) => b.slug === "asus")!;
  const netgear = brands.find((b) => b.slug === "netgear")!;
  const linksys = brands.find((b) => b.slug === "linksys")!;
  const xiaomi = brands.find((b) => b.slug === "xiaomi")!;
  const tenda = brands.find((b) => b.slug === "tenda")!;
  const mercusys = brands.find((b) => b.slug === "mercusys")!;
  const cisco = brands.find((b) => b.slug === "cisco")!;
  const belkin = brands.find((b) => b.slug === "belkin")!;
  const arris = brands.find((b) => b.slug === "arris")!;

  // ---- Router Models ----
  const models = await Promise.all([
    // TP-Link
    prisma.routerModel.upsert({
      where: { slug: "archer-c6" },
      update: {},
      create: {
        brandId: tpLink.id,
        name: "Archer C6",
        slug: "archer-c6",
        loginIps: ["192.168.0.1", "tplinkwifi.net"],
        defaultUsername: "admin",
        defaultPassword: "admin",
        wifiSetupGuide: `## How to Set Up WiFi on TP-Link Archer C6\n\n1. Connect your computer to the router via Ethernet cable or WiFi\n2. Open a browser and go to **192.168.0.1** or **tplinkwifi.net**\n3. Enter username: **admin** and password: **admin**\n4. Navigate to **Wireless > Wireless Settings**\n5. Set your network name (SSID) and click **Save**\n6. Go to **Wireless > Wireless Security**\n7. Set your WiFi password and click **Save**\n8. Restart the router`,
        resetGuide: `## How to Factory Reset TP-Link Archer C6\n\n1. Ensure the router is powered on\n2. Find the **Reset** button (small hole on the back)\n3. Use a pin or paperclip to press and hold for **10 seconds**\n4. Release when the LED lights flash\n5. Wait for the router to reboot (about 60 seconds)\n6. The router is now reset to factory settings`,
        faqs: [
          {
            question: "What is the default IP for Archer C6?",
            answer:
              "The default login IP for the TP-Link Archer C6 is 192.168.0.1. You can also use tplinkwifi.net.",
          },
          {
            question: "What are the default login credentials?",
            answer:
              "The default username is 'admin' and the default password is 'admin' for the Archer C6.",
          },
          {
            question: "How do I change the WiFi password on Archer C6?",
            answer:
              "Login to 192.168.0.1, go to Wireless > Wireless Security, enter your new password, and click Save.",
          },
        ],
        metaTitle: "TP-Link Archer C6 Login — 192.168.0.1 Default Password",
        metaDescription:
          "Access your TP-Link Archer C6 router admin page. Default IP: 192.168.0.1, username: admin, password: admin. Setup guides and FAQs included.",
      },
    }),
    prisma.routerModel.upsert({
      where: { slug: "archer-ax73" },
      update: {},
      create: {
        brandId: tpLink.id,
        name: "Archer AX73",
        slug: "archer-ax73",
        loginIps: ["192.168.0.1", "tplinkwifi.net"],
        defaultUsername: "admin",
        defaultPassword: "admin",
        wifiSetupGuide: `## How to Set Up WiFi on TP-Link Archer AX73\n\n1. Open a browser and navigate to **192.168.0.1**\n2. Login with admin/admin\n3. Use the Quick Setup wizard to configure your connection\n4. Set your WiFi SSID and password under the Wireless section`,
        resetGuide: `## Factory Reset TP-Link Archer AX73\n\n1. Press and hold the Reset button for 10 seconds\n2. Release when the power LED blinks\n3. Wait for the router to restart`,
        faqs: [
          {
            question: "Does Archer AX73 support WiFi 6?",
            answer:
              "Yes, the Archer AX73 supports WiFi 6 (802.11ax) with speeds up to AX5400.",
          },
        ],
        metaTitle: "TP-Link Archer AX73 Login — Default IP & Password",
        metaDescription:
          "Access TP-Link Archer AX73 router admin page. Login at 192.168.0.1 with admin/admin. WiFi 6 router setup guide.",
      },
    }),
    // Huawei
    prisma.routerModel.upsert({
      where: { slug: "hg8245h5" },
      update: {},
      create: {
        brandId: huawei.id,
        name: "HG8245H5",
        slug: "hg8245h5",
        loginIps: ["192.168.100.1"],
        defaultUsername: "telecomadmin",
        defaultPassword: "admintelecom",
        wifiSetupGuide: `## How to Set Up WiFi on Huawei HG8245H5\n\n1. Open browser and go to **192.168.100.1**\n2. Login with username: **telecomadmin**, password: **admintelecom**\n3. Click on **WLAN** tab\n4. Set SSID name and security key\n5. Click Apply to save`,
        resetGuide: `## Factory Reset Huawei HG8245H5\n\n1. Press and hold the Reset button for 15 seconds\n2. All LEDs will flash and the device reboots`,
        faqs: [
          {
            question: "What is the default IP for Huawei HG8245H5?",
            answer: "The default IP address is 192.168.100.1.",
          },
          {
            question: "What are the default credentials?",
            answer:
              "Username: telecomadmin, Password: admintelecom (or check the label on your router).",
          },
        ],
        metaTitle: "Huawei HG8245H5 Login — 192.168.100.1 Admin Page",
        metaDescription:
          "Access Huawei HG8245H5 router. Default IP: 192.168.100.1, username: telecomadmin, password: admintelecom.",
      },
    }),
    // ZTE
    prisma.routerModel.upsert({
      where: { slug: "zxhn-h298a" },
      update: {},
      create: {
        brandId: zte.id,
        name: "ZXHN H298A",
        slug: "zxhn-h298a",
        loginIps: ["192.168.1.1"],
        defaultUsername: "admin",
        defaultPassword: "admin",
        wifiSetupGuide: `## WiFi Setup on ZTE ZXHN H298A\n\n1. Open browser and go to **192.168.1.1**\n2. Login with admin/admin\n3. Navigate to Network > WLAN\n4. Configure SSID and password`,
        resetGuide: `## Factory Reset ZTE ZXHN H298A\n\n1. Press reset button for 10 seconds\n2. Wait for device to reboot`,
        faqs: [
          {
            question: "What is the login IP for ZTE H298A?",
            answer: "The default login IP is 192.168.1.1.",
          },
        ],
        metaTitle: "ZTE ZXHN H298A Login — 192.168.1.1 Admin",
        metaDescription:
          "Login to ZTE ZXHN H298A at 192.168.1.1. Default username and password: admin.",
      },
    }),
    // D-Link
    prisma.routerModel.upsert({
      where: { slug: "dir-842" },
      update: {},
      create: {
        brandId: dLink.id,
        name: "DIR-842",
        slug: "dir-842",
        loginIps: ["192.168.0.1"],
        defaultUsername: "Admin",
        defaultPassword: "",
        wifiSetupGuide: `## WiFi Setup on D-Link DIR-842\n\n1. Open browser and go to **192.168.0.1**\n2. Login with username: **Admin** (no password by default)\n3. Click on Setup Wizard\n4. Follow the prompts to configure WiFi`,
        resetGuide: `## Factory Reset D-Link DIR-842\n\n1. Press reset button for 10 seconds while the router is on\n2. The router will reboot with factory settings`,
        faqs: [
          {
            question: "Does D-Link DIR-842 have a default password?",
            answer:
              "By default, there is no password — just leave the password field blank.",
          },
        ],
        metaTitle: "D-Link DIR-842 Login — 192.168.0.1 Admin Page",
        metaDescription:
          "Access D-Link DIR-842 router at 192.168.0.1. Username: Admin, no default password.",
      },
    }),
    // ASUS
    prisma.routerModel.upsert({
      where: { slug: "rt-ax88u" },
      update: {},
      create: {
        brandId: asus.id,
        name: "RT-AX88U",
        slug: "rt-ax88u",
        loginIps: ["192.168.1.1", "router.asus.com"],
        defaultUsername: "admin",
        defaultPassword: "admin",
        wifiSetupGuide: `## WiFi Setup on ASUS RT-AX88U\n\n1. Open browser and go to **192.168.1.1** or **router.asus.com**\n2. Login with admin/admin\n3. Run the Quick Internet Setup wizard\n4. Configure your WiFi name and password`,
        resetGuide: `## Factory Reset ASUS RT-AX88U\n\n1. Press and hold the Reset button for 10 seconds\n2. The router will restore factory settings and reboot`,
        faqs: [
          {
            question: "Does ASUS RT-AX88U support WiFi 6?",
            answer:
              "Yes, the RT-AX88U supports WiFi 6 (802.11ax) with combined speeds up to AX6000.",
          },
        ],
        metaTitle: "ASUS RT-AX88U Login — 192.168.1.1 Admin Page",
        metaDescription:
          "Login to ASUS RT-AX88U at 192.168.1.1 or router.asus.com. Default credentials: admin/admin.",
      },
    }),
    // Netgear
    prisma.routerModel.upsert({
      where: { slug: "netgear-r7000" },
      update: {},
      create: {
        brandId: netgear.id,
        name: "R7000",
        slug: "netgear-r7000",
        loginIps: ["192.168.1.1", "routerlogin.net"],
        defaultUsername: "admin",
        defaultPassword: "password",
        wifiSetupGuide: `## WiFi Setup on Netgear R7000\n\n1. Open browser and go to **192.168.1.1** or **routerlogin.net**\n2. Login with admin/password\n3. Configure your WiFi settings under the Wireless menu`,
        resetGuide: `## Factory Reset Netgear R7000\n\n1. Hold the physical Reset button on the back for 7 seconds\n2. Release and wait for the router to reboot`,
        faqs: [
          {
            question: "What is the default password for R7000?",
            answer: "The default password is 'password'.",
          },
        ],
        metaTitle: "Netgear Nighthawk R7000 Login — Default IP & Password",
        metaDescription: "Access Netgear Nighthawk R7000 settings. Default IP: 192.168.1.1 or routerlogin.net, password: password.",
      },
    }),
    prisma.routerModel.upsert({
      where: { slug: "netgear-rax50" },
      update: {},
      create: {
        brandId: netgear.id,
        name: "RAX50",
        slug: "netgear-rax50",
        loginIps: ["192.168.1.1", "routerlogin.net"],
        defaultUsername: "admin",
        defaultPassword: "password",
        wifiSetupGuide: `## WiFi Setup on Netgear RAX50\n\n1. Open browser and go to **192.168.1.1**\n2. Login with admin/password\n3. Configure your settings`,
        resetGuide: `## Factory Reset Netgear RAX50\n\n1. Press Reset button for 7 seconds\n2. Wait for reboot`,
        faqs: [
          {
            question: "Does RAX50 support WiFi 6?",
            answer: "Yes, it supports WiFi 6 (802.11ax).",
          },
        ],
        metaTitle: "Netgear Nighthawk RAX50 Login — Default IP & Password",
        metaDescription: "Access Netgear RAX50 admin panel. Default IP: 192.168.1.1, password: password. WiFi 6 router setup guide.",
      },
    }),
    // Linksys
    prisma.routerModel.upsert({
      where: { slug: "linksys-velop" },
      update: {},
      create: {
        brandId: linksys.id,
        name: "Velop",
        slug: "linksys-velop",
        loginIps: ["192.168.1.1", "myrouter.local"],
        defaultUsername: "admin",
        defaultPassword: "admin",
        wifiSetupGuide: `## WiFi Setup on Linksys Velop\n\n1. Open the Linksys App on your phone\n2. Follow the on-screen prompts to pair and configure your Velop nodes`,
        resetGuide: `## Factory Reset Linksys Velop\n\n1. Press and hold the Reset button on the bottom of the node for 10 seconds\n2. Release when the light turns red`,
        faqs: [
          {
            question: "How do I configure Velop?",
            answer: "Use the Linksys App on iOS or Android.",
          },
        ],
        metaTitle: "Linksys Velop Login & Setup Guide — Default IP & Password",
        metaDescription: "Access Linksys Velop settings. Setup Velop nodes using the Linksys App. Troubleshooting and reset guides.",
      },
    }),
    // Xiaomi
    prisma.routerModel.upsert({
      where: { slug: "xiaomi-ax3000" },
      update: {},
      create: {
        brandId: xiaomi.id,
        name: "AX3000",
        slug: "xiaomi-ax3000",
        loginIps: ["192.168.31.1", "miwifi.com"],
        defaultUsername: "admin",
        defaultPassword: "admin",
        wifiSetupGuide: `## WiFi Setup on Xiaomi AX3000\n\n1. Open browser and go to **192.168.31.1** or **miwifi.com**\n2. Follow setup prompts\n3. Configure your network name and password`,
        resetGuide: `## Factory Reset Xiaomi AX3000\n\n1. Hold the Reset pinhole for 5 seconds\n2. Wait for the status indicator to reboot`,
        faqs: [
          {
            question: "What is the default IP for Xiaomi AX3000?",
            answer: "The default gateway IP is 192.168.31.1.",
          },
        ],
        metaTitle: "Xiaomi AX3000 Login — Default IP & Password",
        metaDescription: "Access Xiaomi AX3000 router settings. Default IP: 192.168.31.1 or miwifi.com. WiFi 6 configuration guide.",
      },
    }),
    // Tenda
    prisma.routerModel.upsert({
      where: { slug: "tenda-ac6" },
      update: {},
      create: {
        brandId: tenda.id,
        name: "AC6",
        slug: "tenda-ac6",
        loginIps: ["192.168.0.1", "tendawifi.com"],
        defaultUsername: "admin",
        defaultPassword: "admin",
        wifiSetupGuide: `## WiFi Setup on Tenda AC6\n\n1. Open browser and go to **192.168.0.1** or **tendawifi.com**\n2. Use the setup wizard to select connection type\n3. Set WiFi name and password`,
        resetGuide: `## Factory Reset Tenda AC6\n\n1. Hold the RST/WPS button for 8 seconds\n2. Release when LEDs blink`,
        faqs: [
          {
            question: "What is the default login for Tenda AC6?",
            answer: "Default IP is 192.168.0.1 or tendawifi.com. Password is 'admin'.",
          },
        ],
        metaTitle: "Tenda AC6 Login — Default IP, Password & Setup Guide",
        metaDescription: "Access Tenda AC6 router admin settings. Default IP: 192.168.0.1 or tendawifi.com. Username/password: admin/admin.",
      },
    }),
    prisma.routerModel.upsert({
      where: { slug: "tenda-rx12-pro" },
      update: {},
      create: {
        brandId: tenda.id,
        name: "RX12 Pro",
        slug: "tenda-rx12-pro",
        loginIps: ["192.168.0.1", "tendawifi.com"],
        defaultUsername: "admin",
        defaultPassword: "admin",
        wifiSetupGuide: `## WiFi Setup on Tenda RX12 Pro\n\n1. Open browser and go to **192.168.0.1**\n2. Configure your WAN connection and WiFi credentials`,
        resetGuide: `## Factory Reset Tenda RX12 Pro\n\n1. Hold the Reset button for 8 seconds\n2. Wait for system reboot`,
        faqs: [
          {
            question: "Does RX12 Pro support WiFi 6?",
            answer: "Yes, it is an AX3000 Wi-Fi 6 router.",
          },
        ],
        metaTitle: "Tenda RX12 Pro Login — Default IP, Password & Setup Guide",
        metaDescription: "Access Tenda RX12 Pro router. Default IP: 192.168.0.1 or tendawifi.com. AX3000 Wi-Fi 6 router setup.",
      },
    }),
    prisma.routerModel.upsert({
      where: { slug: "tenda-nova-mw6" },
      update: {},
      create: {
        brandId: tenda.id,
        name: "Nova MW6",
        slug: "tenda-nova-mw6",
        loginIps: ["192.168.0.1", "tendawifi.com"],
        defaultUsername: "admin",
        defaultPassword: "admin",
        wifiSetupGuide: `## WiFi Setup on Tenda Nova MW6\n\n1. Install Tenda WiFi app on your phone\n2. Connect to Nova's default Wi-Fi\n3. Scan QR code or follow app guide to pair nodes`,
        resetGuide: `## Factory Reset Tenda Nova MW6\n\n1. Press the Reset button on bottom of node with paperclip for 20 seconds\n2. Release when LED turns solid green`,
        faqs: [
          {
            question: "How do I pair Nova MW6 nodes?",
            answer: "Open the Tenda WiFi app, select Add Nova, and scan the QR code of the secondary node.",
          },
        ],
        metaTitle: "Tenda Nova MW6 Mesh Login & Setup Guide — Default IP",
        metaDescription: "Configure your Tenda Nova MW6 mesh Wi-Fi system. App setup guide, reset instructions, and default IP settings.",
      },
    }),
    // Mercusys
    prisma.routerModel.upsert({
      where: { slug: "mercusys-mr70x" },
      update: {},
      create: {
        brandId: mercusys.id,
        name: "MR70X",
        slug: "mercusys-mr70x",
        loginIps: ["192.168.1.1", "mwlogin.net"],
        defaultUsername: "admin",
        defaultPassword: "admin",
        wifiSetupGuide: `## WiFi Setup on Mercusys MR70X\n\n1. Go to **192.168.1.1** or **mwlogin.net**\n2. Set custom admin password on first run\n3. Configure your wireless network SSID and key`,
        resetGuide: `## Factory Reset Mercusys MR70X\n\n1. Press and hold the Reset button for 10 seconds\n2. Release when LEDs flash`,
        faqs: [
          {
            question: "What is the default IP for Mercusys MR70X?",
            answer: "The default gateway IP is 192.168.1.1 or mwlogin.net.",
          },
        ],
        metaTitle: "Mercusys MR70X Login — Default IP & Password",
        metaDescription: "Access Mercusys MR70X AX1800 Wi-Fi 6 router. Default IP: 192.168.1.1 or mwlogin.net. Easy setup guide.",
      },
    }),
    // Cisco
    prisma.routerModel.upsert({
      where: { slug: "cisco-rv340" },
      update: {},
      create: {
        brandId: cisco.id,
        name: "RV340",
        slug: "cisco-rv340",
        loginIps: ["192.168.1.1"],
        defaultUsername: "cisco",
        defaultPassword: "cisco",
        wifiSetupGuide: `## Setup Guide for Cisco RV340\n\n1. Connect computer to a LAN port\n2. Open browser and go to **192.168.1.1**\n3. Login with cisco/cisco\n4. Follow setup wizard to secure network`,
        resetGuide: `## Factory Reset Cisco RV340\n\n1. Press and hold Reset button for 10 seconds\n2. The system status light blinks when reset starts`,
        faqs: [
          {
            question: "What are the default login details?",
            answer: "Username: cisco, Password: cisco.",
          },
        ],
        metaTitle: "Cisco RV340 Login — 192.168.1.1 Default Credentials",
        metaDescription: "Access Cisco RV340 Dual WAN VPN router admin settings. Default IP: 192.168.1.1, username: cisco, password: cisco.",
      },
    }),
    // Belkin
    prisma.routerModel.upsert({
      where: { slug: "belkin-rt3200" },
      update: {},
      create: {
        brandId: belkin.id,
        name: "RT3200",
        slug: "belkin-rt3200",
        loginIps: ["192.168.2.1", "router"],
        defaultUsername: "admin",
        defaultPassword: "admin",
        wifiSetupGuide: `## WiFi Setup on Belkin RT3200\n\n1. Open browser and navigate to **192.168.2.1**\n2. Set up wireless network name and security key`,
        resetGuide: `## Factory Reset Belkin RT3200\n\n1. Hold Reset button for 10 seconds\n2. Device will reboot to factory default state`,
        faqs: [
          {
            question: "What is Belkin RT3200's default IP?",
            answer: "The default gateway IP is 192.168.2.1 or 'http://router'.",
          },
        ],
        metaTitle: "Belkin RT3200 Login — Default IP & Password",
        metaDescription: "Access Belkin RT3200 Wi-Fi 6 router. Default IP: 192.168.2.1 or http://router. Step-by-step setup guides.",
      },
    }),
    // Arris
    prisma.routerModel.upsert({
      where: { slug: "arris-surfboard-sb8200" },
      update: {},
      create: {
        brandId: arris.id,
        name: "Surfboard SB8200",
        slug: "arris-surfboard-sb8200",
        loginIps: ["192.168.100.1"],
        defaultUsername: "admin",
        defaultPassword: "password",
        wifiSetupGuide: `## Setup Guide for Arris SB8200\n\n1. Connect coaxial cable to SB8200\n2. Connect Ethernet from SB8200 to PC\n3. Go to **192.168.100.1** to view status`,
        resetGuide: `## Factory Reset Arris SB8200\n\n1. Hold the Reset button for 10 seconds\n2. Wait for power light to cycle`,
        faqs: [
          {
            question: "Is SB8200 a router?",
            answer: "No, the SB8200 is a standalone DOCSIS 3.1 cable modem. You need a separate Wi-Fi router.",
          },
        ],
        metaTitle: "Arris Surfboard SB8200 Login — 192.168.100.1 Modem Status",
        metaDescription: "Access Arris Surfboard SB8200 cable modem status page at 192.168.100.1. View upstream/downstream channels and power levels.",
      },
    }),
  ]);

  console.log(`✅ Created ${models.length} router models`);

  // ---- IP Addresses ----
  const ips = await Promise.all([
    prisma.ipAddress.upsert({
      where: { address: "192.168.1.1" },
      update: {},
      create: {
        address: "192.168.1.1",
        slug: "192-168-1-1",
        commonBrands: ["ASUS", "D-Link", "Netgear", "Linksys", "ZTE"],
        description:
          "192.168.1.1 is one of the most common router login IP addresses. It is the default gateway for many popular router brands including ASUS, D-Link, Netgear, and Linksys.",
        loginGuide: `## How to Login at 192.168.1.1\n\n1. Make sure you are connected to your router via WiFi or Ethernet\n2. Open any web browser (Chrome, Firefox, Edge)\n3. Type **192.168.1.1** in the address bar and press Enter\n4. Enter your router's username and password\n5. If you haven't changed them, try the defaults: admin/admin\n6. You will now be in your router's admin panel`,
        faqs: [
          {
            question: "Why can't I access 192.168.1.1?",
            answer:
              "Make sure you are connected to the router. Check that 192.168.1.1 is actually your router's IP by running 'ipconfig' (Windows) or 'ip route' (Linux/Mac) and looking for the Default Gateway.",
          },
          {
            question: "What routers use 192.168.1.1?",
            answer:
              "Many routers use 192.168.1.1 as the default gateway including ASUS, D-Link, Netgear, Linksys, and some ZTE models.",
          },
        ],
        metaTitle: "192.168.1.1 — Router Login Admin Page",
        metaDescription:
          "Access your router admin page at 192.168.1.1. Step-by-step login guide, default credentials, and troubleshooting tips.",
      },
    }),
    prisma.ipAddress.upsert({
      where: { address: "192.168.0.1" },
      update: {},
      create: {
        address: "192.168.0.1",
        slug: "192-168-0-1",
        commonBrands: ["TP-Link", "D-Link", "Huawei", "Tenda"],
        description:
          "192.168.0.1 is the default gateway for many TP-Link, D-Link, and Huawei routers. It gives you access to the router administration panel.",
        loginGuide: `## How to Login at 192.168.0.1\n\n1. Connect to your router via WiFi or Ethernet cable\n2. Open a web browser and type **192.168.0.1**\n3. Press Enter to load the admin login page\n4. Enter your username and password (try admin/admin if not changed)\n5. Access your router settings`,
        faqs: [
          {
            question: "Which routers use 192.168.0.1?",
            answer:
              "TP-Link, D-Link, and some Huawei routers commonly use 192.168.0.1 as the default gateway.",
          },
          {
            question: "What if 192.168.0.1 doesn't open?",
            answer:
              "Try 192.168.1.1 instead. If neither works, check your router's label for the correct IP or run 'ipconfig' on Windows.",
          },
        ],
        metaTitle: "192.168.0.1 — Router Login Admin Page",
        metaDescription:
          "Login to your router at 192.168.0.1. Default credentials and setup guide for TP-Link, D-Link, and Huawei routers.",
      },
    }),
    prisma.ipAddress.upsert({
      where: { address: "192.168.8.1" },
      update: {},
      create: {
        address: "192.168.8.1",
        slug: "192-168-8-1",
        commonBrands: ["Huawei"],
        description:
          "192.168.8.1 is the default login address for many Huawei home routers and mobile WiFi devices.",
        loginGuide: `## How to Login at 192.168.8.1\n\n1. Connect to your Huawei device via WiFi or cable\n2. Open a browser and go to **192.168.8.1**\n3. Enter the admin credentials from your device label\n4. Access the Huawei admin panel`,
        faqs: [
          {
            question: "Which devices use 192.168.8.1?",
            answer:
              "Huawei routers and Huawei mobile WiFi (MiFi) devices commonly use 192.168.8.1.",
          },
        ],
        metaTitle: "192.168.8.1 — Huawei Router Login Admin Page",
        metaDescription:
          "Access your Huawei router admin page at 192.168.8.1. Login guide and troubleshooting for Huawei devices.",
      },
    }),
  ]);

  console.log(`✅ Created ${ips.length} IP addresses`);

  // ---- Problems ----
  const problems = await Promise.all([
    prisma.problem.upsert({
      where: { slug: "wifi-connected-no-internet" },
      update: {},
      create: {
        title: "WiFi Connected But No Internet",
        slug: "wifi-connected-no-internet",
        category: "WIFI",
        excerpt:
          "Your device shows connected to WiFi but you cannot browse the internet. This common problem has several causes and straightforward fixes.",
        content: `## WiFi Connected But No Internet Access\n\nOne of the most frustrating network issues is when your device shows it's connected to WiFi, but you can't actually access the internet. This guide will help you diagnose and fix the problem step by step.`,
        causes: [
          "ISP (Internet Service Provider) outage",
          "Router DNS configuration issues",
          "IP address conflict on the network",
          "Router firmware bug",
          "Corrupted network adapter settings",
          "Incorrect router WAN settings",
        ],
        fixes: [
          {
            step: 1,
            title: "Restart Your Router and Modem",
            description:
              "Unplug both your router and modem from power. Wait 30 seconds. Plug in the modem first, wait 60 seconds, then plug in the router. Wait another 60 seconds for everything to connect.",
          },
          {
            step: 2,
            title: "Check Your ISP Status",
            description:
              "Visit your ISP's website on mobile data or call their support line to check for outages in your area.",
          },
          {
            step: 3,
            title: "Flush DNS Cache",
            description:
              "On Windows, open Command Prompt as Administrator and run: ipconfig /flushdns. On Mac, run: sudo dscacheutil -flushcache",
          },
          {
            step: 4,
            title: "Change Your DNS Servers",
            description:
              "Login to your router admin page and change DNS to Google's servers: Primary: 8.8.8.8, Secondary: 8.8.4.4",
          },
          {
            step: 5,
            title: "Forget and Reconnect to WiFi",
            description:
              "On your device, forget the WiFi network and reconnect from scratch with the correct password.",
          },
        ],
        faqs: [
          {
            question: "Why does my phone say connected but no internet?",
            answer:
              "This usually means your device connected to WiFi successfully, but the router cannot reach the internet. The problem is between your router and your ISP.",
          },
          {
            question: "How do I fix no internet access on Windows?",
            answer:
              "Right-click the network icon, click Troubleshoot problems. Also try: ipconfig /release, ipconfig /renew, and ipconfig /flushdns in an admin command prompt.",
          },
        ],
        relatedSlugs: ["slow-internet", "dns-not-resolving"],
        metaTitle: "WiFi Connected But No Internet — How to Fix It",
        metaDescription:
          "Fix the WiFi connected no internet problem. Step-by-step guide to diagnose causes including DNS issues, ISP outage, and router problems.",
      },
    }),
    prisma.problem.upsert({
      where: { slug: "slow-internet" },
      update: {},
      create: {
        title: "Slow Internet Speed",
        slug: "slow-internet",
        category: "SPEED",
        excerpt:
          "Experiencing slow internet despite having a fast plan? Learn the common causes and how to speed up your connection.",
        content:
          "Slow internet can be caused by many factors from WiFi interference to outdated router hardware. This guide covers all the fixes.",
        causes: [
          "Too many devices on the network",
          "WiFi interference from neighboring networks",
          "Outdated router firmware",
          "Weak WiFi signal",
          "ISP throttling",
          "Old router hardware",
          "Background downloads or updates",
        ],
        fixes: [
          {
            step: 1,
            title: "Run a Speed Test",
            description:
              "Use our Speed Test tool or fast.com to measure your actual speeds. Compare to your plan speed.",
          },
          {
            step: 2,
            title: "Reboot Your Router",
            description:
              "Power cycle your router by unplugging for 30 seconds. This clears temporary issues and memory.",
          },
          {
            step: 3,
            title: "Change WiFi Channel",
            description:
              "Login to your router and change the WiFi channel. Use channels 1, 6, or 11 for 2.4GHz.",
          },
          {
            step: 4,
            title: "Update Router Firmware",
            description:
              "Login to your router admin page and check for firmware updates under Administration or Advanced settings.",
          },
        ],
        faqs: [
          {
            question: "Why is my internet slow at night?",
            answer:
              "Peak usage hours (evening) cause network congestion as many users are online simultaneously. This is usually an ISP issue.",
          },
        ],
        relatedSlugs: ["wifi-connected-no-internet"],
        metaTitle: "Slow Internet Speed — Causes and Fixes",
        metaDescription:
          "Fix slow internet problems. Diagnose and resolve speed issues including WiFi interference, router problems, and ISP throttling.",
      },
    }),
    prisma.problem.upsert({
      where: { slug: "dns-not-resolving" },
      update: {},
      create: {
        title: "DNS Not Resolving",
        slug: "dns-not-resolving",
        category: "DNS",
        excerpt:
          "Websites not loading even though you have an internet connection? DNS resolution failures are a common culprit.",
        content:
          "DNS (Domain Name System) translates domain names to IP addresses. When DNS fails, websites won't load even if your connection is working.",
        causes: [
          "ISP DNS server is down",
          "Incorrect DNS server addresses",
          "Router DNS misconfiguration",
          "DNS cache corruption",
          "Firewall blocking DNS",
        ],
        fixes: [
          {
            step: 1,
            title: "Flush DNS Cache",
            description:
              "Windows: Run 'ipconfig /flushdns' as admin. Mac: Run 'sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder'",
          },
          {
            step: 2,
            title: "Use Public DNS Servers",
            description:
              "Change to Google DNS (8.8.8.8 / 8.8.4.4) or Cloudflare (1.1.1.1 / 1.0.0.1) in your network adapter settings.",
          },
          {
            step: 3,
            title: "Restart Router DNS",
            description:
              "Login to your router and navigate to DHCP settings. Manually set DNS servers to 8.8.8.8 and 8.8.4.4.",
          },
        ],
        faqs: [
          {
            question: "What is a DNS server?",
            answer:
              "A DNS server is like a phone book for the internet. It translates human-readable domain names (google.com) into IP addresses (142.250.80.46) that computers use.",
          },
        ],
        relatedSlugs: ["wifi-connected-no-internet"],
        metaTitle: "DNS Not Resolving — How to Fix DNS Errors",
        metaDescription:
          "Fix DNS resolution errors. Learn how to change DNS servers, flush cache, and resolve DNS failures on any device.",
      },
    }),
  ]);

  console.log(`✅ Created ${problems.length} problems`);
  console.log("🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
