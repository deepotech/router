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
        wifiSetupGuide: `## Detailed WiFi Setup for TP-Link Archer AX73

To configure your wireless network on the TP-Link Archer AX73 (AX5400 Wi-Fi 6 Router), follow this comprehensive step-by-step setup procedure:

1. **Hardware Connections:** Plug the Ethernet cable from your internet modem into the blue WAN port on the rear of the Archer AX73. Connect your computer to one of the four yellow gigabit LAN ports using an RJ45 cable, or connect wirelessly using the default Wi-Fi network name (SSID) and password printed on the product label on the bottom of the device.
2. **Access the Router Dashboard:** Launch a web browser and enter **192.168.0.1** or **tplinkwifi.net** in the address bar. Press Enter to load the router admin interface.
3. **Establish Administrator Credentials:** On the first run, the router will require you to create a unique administrator password. Avoid default combinations and choose a strong password consisting of alphanumeric characters and special symbols to prevent unauthorized dashboard access.
4. **Initiate the Quick Setup Wizard:** Locate the **Quick Setup** tab in the top navigation menu. The wizard will automatically attempt to detect your internet connection type. For standard consumer cable, fiber, or DSL connections, choose **Dynamic IP**. If your ISP requires PPPoE authentication, enter the username and password provided in your service contract.
5. **Configure Dual-Band Wi-Fi 6 Parameters:** Under the Wireless configuration step, you can set your Network Name (SSID) and security keys. The Archer AX73 supports dual-band operations. You can enable **Smart Connect** to unify both the 2.4GHz and 5GHz bands under a single SSID, allowing the router to automatically steer devices to the optimal frequency. Ensure **WPA2-PSK [AES]** or the newer **WPA3-Personal** encryption is selected for security.
6. **Smart Connect and TP-Link Tether App:** Alternatively, you can use the TP-Link Tether app on your mobile phone to complete setup. Open the app, scan the local Wi-Fi, select the Archer AX73, and follow the setup wizard. Smart Connect is recommended for most users to manage band steering dynamically.
7. **Optimize Channel Width and OFDMA:** Navigate to the **Advanced > Wireless > Wireless Settings** page. Set the Channel Width for 5GHz to **160MHz** to enable the maximum throughput of Wi-Fi 6. Enable **OFDMA** and **TWT** (Target Wake Time) settings. If your home has walls that block signals, enable **Beamforming** under Advanced Wireless to focus the signal directly at connected clients rather than broadcasting in all directions.
8. **Configure Guest Network Isolation:** Go to the **Guest Network** settings. Enable the guest network. Make sure **Allow Guests to Access My Local Network** is turned off. This keeps your home automation servers, NAS drives, and home computers private and secure from guest devices.
9. **Save and Complete:** Review the summary of your configurations and click **Save** or **Finish**. The router will restart its wireless modules. Reconnect your client devices using your new Wi-Fi credentials.`,
        resetGuide: `## Factory Reset Guide for TP-Link Archer AX73

Restoring your TP-Link Archer AX73 to factory default settings will wipe all custom configurations, including Wi-Fi network names, passwords, and admin credentials. Use this procedure if you forget your admin password or experience routing system errors:

1. **Verify Power Status:** Ensure the Archer AX73 is plugged into a power source and that the power LED indicator on the front panel is solid green, indicating the router has fully booted.
2. **Locate the Physical Reset Button:** Look on the rear panel of the router for the small pinhole button labeled **RESET**, situated next to the WPS button and USB port.
3. **Perform the Reset:** Insert a paperclip, SIM ejector tool, or pin into the pinhole. Press and hold the internal button firmly for **10 seconds**.
4. **Observe LED Indicators:** Keep holding the button until all front-panel LED lights flash simultaneously and then turn off, indicating the system has initiated the restore process. Release the button.
5. **Reboot Cycle:** Wait approximately 2 minutes for the router to complete its reboot cycle. Once the Power and Wi-Fi LEDs are solid green again, the factory restore is complete. Access the router at **192.168.0.1** using default parameters to set up the connection again.`,
        faqs: [
          {
            question: "Does the TP-Link Archer AX73 support Wi-Fi 6?",
            answer: "Yes, the Archer AX73 is a high-performance dual-band Wi-Fi 6 (802.11ax) router. It features 4x4 MU-MIMO and OFDMA, offering combined wireless transmission speeds of up to AX5400 (4804 Mbps on the 5GHz band and 574 Mbps on the 2.4GHz band) for improved throughput and reduced congestion."
          },
          {
            question: "How do I change the Wi-Fi password on Archer AX73?",
            answer: "Log in to the web console at 192.168.0.1, go to the Advanced tab at the top, select Wireless from the left menu, and click on Wireless Settings. Update the Password field for the 2.4GHz and 5GHz bands, then click Save at the bottom of the page."
          },
          {
            question: "How do I update the firmware on my Archer AX73?",
            answer: "Connect to the router, log in to the web admin interface, and go to Advanced > System > Firmware Upgrade. Click the Check for Upgrade button to search TP-Link's servers. If an update is available, click Upgrade to download and install it automatically. Do not turn off the router during this process."
          },
          {
            question: "What is the default admin password for the Archer AX73?",
            answer: "Unlike older TP-Link models, the Archer AX73 does not have a default admin password printed on the label. Instead, you are required to create a custom administrator password during the initial setup wizard when you first log in to the dashboard at 192.168.0.1."
          }
        ],
        metaTitle: "TP-Link Archer AX73 Login — Default IP & Password Setup",
        metaDescription: "Access your TP-Link Archer AX73 router admin dashboard. Default IP: 192.168.0.1, username: admin. Complete Wi-Fi 6 configuration, firmware, and factory reset guide.",
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
        wifiSetupGuide: `## Detailed WiFi Setup for Huawei HG8245H5 GPON Terminal

Setting up the wireless network on the Huawei HG8245H5 GPON ONT requires access to the dedicated telecommunications admin panel. Follow these detailed steps:

1. **Connect to the Huawei Terminal:** Connect your computer directly to one of the LAN ports on the Huawei gateway using an Ethernet cable. Alternatively, connect via Wi-Fi using the SSID and security key printed on the label at the bottom of the gateway.
2. **Access the Web Interface:** Open your web browser and enter **192.168.100.1** in the address bar. Press Enter to load the Huawei GPON terminal gateway page.
3. **Log In with Telecom Credentials:** Use the default provider administrator credentials: Username: **telecomadmin**, Password: **admintelecom** (or check the underside label for ISP custom defaults). Standard user credentials (like admin/admin) will restrict you from accessing advanced WLAN setup panels.
4. **Navigate to the Wireless Settings Menu:** Click on the **WLAN** tab in the top menu bar. Choose **WLAN Basic Configuration** from the left-hand navigation list.
5. **Configure SSID and Wireless Security:** Select **Enable WLAN**. Set your Network Name (SSID) in the SSID Name field. Set the Authentication Mode to **WPA2 Pre-Shared Key**. Set the Encryption Mode to **AES**. Input your custom secure Wi-Fi password in the WPA Pre-Shared Key field.
6. **Huawei Smart Home App and HarmonyOS Connect:** Download the Huawei AI Life app on your smartphone and connect to the default Wi-Fi network. The app automatically scans the network and detects the GPON gateway. If your gateway supports HarmonyOS Connect, you can synchronize Wi-Fi settings across compatible Huawei range extenders and smart devices. Enabling "One Wi-Fi" creates a single SSID for both the 2.4GHz and 5GHz bands, allowing the router to automatically steer devices to the optimal frequency based on signal strength.
7. **Configure Dynamic Channel Allocation:** Under advanced WLAN settings, change the channel width from 20MHz to **40MHz** on the 2.4GHz band to increase maximum throughput, or select **80MHz** on the 5GHz band. Set the Wi-Fi Channel selection to **Auto** so the terminal can scan and select channels with minimal interference.
8. **Save Configurations:** Click **Apply** at the bottom of the screen to save your wireless setup profile. Reconnect your client devices to the newly secured Wi-Fi network.`,
        resetGuide: `## Factory Reset Guide for Huawei HG8245H5 GPON Terminal

Restoring your Huawei HG8245H5 terminal to factory settings will reset all configurations back to the defaults assigned by your service provider. This is useful if the interface becomes unresponsive or you forget custom configurations:

1. **Keep Powered On:** Make sure the Huawei HG8245H5 is plugged into a power source and that the power LED is stable.
2. **Locate the Reset Button:** Find the physical **RESET** pinhole button on the side panel of the gateway.
3. **Perform Pinhole Reset:** Insert a paperclip or a SIM card tray ejector pin into the reset hole. Press and hold the internal button firmly for **15 seconds**.
4. **Monitor LED Indicators:** Hold the button until all lights on the front panel flash simultaneously and then go completely dark. Release the pin. The terminal will automatically restart.
5. **Wait for Reinitialization:** The GPON terminal takes approximately 2 minutes to complete its reboot cycle. Do not unplug the power cord or press any buttons during this phase. When the Power and PON (Passive Optical Network) lights turn solid green, the device is online and using default configurations.
6. **Reconnect and Set Up:** Connect your computer via Ethernet to LAN port 1. Open a browser and load **http://192.168.100.1**. Log in using default credentials (**telecomadmin** / **admintelecom**). On your first login, configure custom Wi-Fi network names, security parameters, and administrator passwords.`,
        faqs: [
          {
            question: "What is the default IP address for Huawei HG8245H5?",
            answer: "The default login IP address for the Huawei HG8245H5 GPON terminal is 192.168.100.1. Ensure your computer's IP address is on the same subnet (e.g. 192.168.100.10) to access it."
          },
          {
            question: "Why does telecomadmin/admintelecom login fail on HG8245H5?",
            answer: "Some ISPs customize the default password to protect the fiber ONT settings. Check the printed sticker on the bottom of the device for a custom password, or call your ISP helpdesk to request administrator console access."
          },
          {
            question: "How do I configure WPA2 security on my Huawei HG8245H5?",
            answer: "Log in to 192.168.100.1 with telecomadmin, navigate to the WLAN tab > WLAN Basic Configuration. Select your SSID, choose WPA2 Pre-Shared Key as the authentication mode, set Encryption to AES, input your password in the WPA Pre-Shared Key field, and click Apply."
          },
          {
            question: "Is the Huawei HG8245H5 a Wi-Fi 6 router?",
            answer: "No, the Huawei HG8245H5 is a dual-band Wi-Fi 5 (802.11ac) GPON ONT terminal. It supports standard wireless speeds suitable for everyday browsing and streaming, but does not include the newer Wi-Fi 6 technologies."
          }
        ],
        metaTitle: "Huawei HG8245H5 Login — 192.168.100.1 Admin Page",
        metaDescription: "Access your Huawei HG8245H5 GPON router. Default IP: 192.168.100.1, username: telecomadmin, password: admintelecom. Detailed Wi-Fi setup and reset guide.",
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
        wifiSetupGuide: `## Detailed WiFi Setup for ZTE ZXHN H298A

To configure your wireless network settings on the ZTE ZXHN H298A home gateway router, follow these steps:

1. **Verify Connection Status:** Connect your PC to the ZTE H298A using an Ethernet cable, or connect to the default Wi-Fi network printed on the back label.
2. **Access the Login Interface:** Launch your web browser, enter **192.168.1.1** in the address bar, and press Enter to load the ZTE gateway portal.
3. **Input Administrator Credentials:** Log in using the default username: **admin** and default password: **admin** (or check the label for custom passwords if admin/admin is rejected).
4. **Navigate to WLAN Configuration:** Click on the **Local Network** tab in the top menu. Under the left navigation menu, expand the **WLAN** list and select **WLAN Basic** or **WLAN SSID Configuration**.
5. **Set Network Credentials:** Set WLAN RF to On. Select the target SSID profile (SSID 1 is typically the primary 2.4GHz network, and SSID 5 is the 5GHz network). In the SSID Name field, type your network name. Set the Security Type to **WPA2-PSK-AES**. Type your custom wireless password in the WPA Passphrase field.
6. **Wireless Optimization: Channels, Channel Width, and Coexistence:** To minimize overlapping channel interference from neighboring access points, navigate to the WLAN settings. On the 2.4GHz band, only select non-overlapping channels (1, 6, or 11). Enable 20/40MHz coexistence to allow legacy smart-home devices to connect reliably. On the 5GHz band, change the channel width from 40MHz to **80MHz** to enable maximum throughput for high-speed video streaming and console downloads. Select Auto channel scanning so the router automatically adjusts configurations when local Wi-Fi noise changes.
7. **Advanced Settings: DHCP Reservations and Port Forwarding:** Under the Local Network configuration, you can assign static IP reservations. Go to DHCP Server settings, locate your target device (like a gaming console or local web server), and bind its MAC address to a specific static IP. Then navigate to **Internet > Port Forwarding** to map external WAN ports directly to the local IP, securing open NAT types for multiplayer environments.
8. **Disable WPS for Security:** Navigate to Local Network > WLAN > WLAN Basic. Find the **WPS** setting and turn it **Off**. WPS has security vulnerabilities (PIN brute-forcing), and turning it off protects your router from intrusion tools.
9. **Save WiFi Settings:** Click **Apply** at the bottom of the page to apply the settings. Your device will refresh its wireless adapters; reconnect your clients using the new network settings.`,
        resetGuide: `## Factory Reset Guide for ZTE ZXHN H298A

Restoring the ZTE ZXHN H298A back to factory default settings will clear your customized parameters, restoring default login details. Follow this procedure:

1. **Check Router Power:** Ensure the ZTE H298A is powered on and that the Power LED is solid green.
2. **Locate the Reset Button:** Find the physical **Reset** pinhole button located on the side panel of the router.
3. **Perform Pinhole Reset:** Insert a paperclip or SIM tray ejector pin into the hole. Press and hold the internal button firmly for **10 seconds**.
4. **Verify Reset Initialization:** Watch the front panel LEDs. The power indicator will briefly flicker or change color, and the rest of the lights will go dark, indicating the system is restarting. Release the pin.
5. **Reboot Timeframe:** Wait approximately 2 minutes for the reboot to finish. When the power and WLAN lights are solid green again, the factory default configurations are active. Log in at **192.168.1.1** with default admin credentials to start setup.`,
        faqs: [
          {
            question: "What is the default IP address for ZTE ZXHN H298A?",
            answer: "The default login IP address for the ZTE ZXHN H298A router is 192.168.1.1."
          },
          {
            question: "How do I secure my ZTE H298A Wi-Fi network?",
            answer: "Log in to 192.168.1.1, navigate to Local Network > WLAN > WLAN SSID Configuration. Under Security Type, select WPA2-PSK-AES or WPA2/WPA3 Mixed mode, create a strong password, and click Apply."
          },
          {
            question: "Does the ZTE H298A support dual-band Wi-Fi?",
            answer: "Yes, the ZTE ZXHN H298A supports dual-band operations (2.4GHz and 5GHz). The 2.4GHz band is best for range, while the 5GHz band is optimal for higher speeds and lower interference."
          },
          {
            question: "How do I disable WPS on ZTE H298A for security?",
            answer: "Log in to the router admin page, navigate to Local Network > WLAN > WLAN Basic. Locate the WPS option and toggle it to Disabled, then click Apply. Disabling WPS prevents security pin cracking attacks."
          }
        ],
        metaTitle: "ZTE ZXHN H298A Login — 192.168.1.1 Default Admin Setup",
        metaDescription: "Access ZTE ZXHN H298A router at 192.168.1.1. Default username and password: admin. Complete Wi-Fi configuration, WPS setup, and factory reset guide.",
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
        wifiSetupGuide: `## Detailed WiFi Setup for D-Link DIR-842

To configure your Wi-Fi network and secure the D-Link DIR-842 AC1200 dual-band router, follow these steps:

1. **Establish Local Connection:** Connect your PC to a LAN port on the DIR-842 using an Ethernet cable. Alternatively, connect via Wi-Fi using the default SSID (e.g., dlink-XXXX) and password printed on the card included with the router.
2. **Access Web Administration:** Launch a web browser and go to **192.168.0.1** in the address bar. Press Enter to load the D-Link portal.
3. **Log In with Defaults:** Enter the default Username: **Admin** (with a capital A) and leave the Password field completely blank. Click Log In.
4. **Use the Setup Wizard or Manual Settings:** The first login will launch the D-Link Setup Wizard. If configuring manually, go to **Settings > Wireless** in the top menu.
5. **Configure Network Credentials:** In the Wireless Settings page, you can choose to enable **Smart Connect** to unify both bands under one SSID, or disable it to configure 2.4GHz and 5GHz bands separately. Set the SSID name. Under Security, select **WPA2-Personal** and type your custom password in the Wi-Fi Password field.
6. **Set Channel Bandwidth and Transmit Power:** To maximize performance, navigate to the Advanced settings. Change the Channel Width for 2.4GHz to **20/40MHz** and for 5GHz to **80MHz**. Set the transmit power to High and set the Wi-Fi Channel selection to Auto. This allows the DIR-842 to scan the local frequency environment and select the clearest channel.
7. **Configure Guest Zone Isolation:** Navigate to the Guest Zone menu. Enable the Guest Zone SSID for visitors. Ensure **Internet Access Only** is enabled and **Local Routing** is disabled. This isolates guest devices from your primary LAN network, protecting local file shares, printers, and NAS drives from external access.
8. **Save Changes:** Click **Save** to write settings. Reconnect your computers, smartphones, and smart devices using the new credentials.`,
        resetGuide: `## Factory Reset Guide for D-Link DIR-842

Performing a factory default restore on the D-Link DIR-842 will clear all custom profiles and credentials. Use this procedure if you forget your admin password:

1. **Power Status:** Verify the DIR-842 is plugged into power and that the Power LED on the front panel is solid green.
2. **Locate the Reset Button:** Find the physical **RESET** pinhole button on the rear panel of the router.
3. **Perform the Reset:** Insert a paperclip or safety pin into the reset hole. Press and hold the button down for **10 seconds**.
4. **Observe Power LED Changes:** Keep the button pressed until the Power LED on the front panel turns red or starts flashing amber. Release the pin.
5. **Reboot Timeframe:** The router will restart. This takes about 60 to 90 seconds. Once the Power LED turns solid green and the Wi-Fi LEDs illuminate, the D-Link router is fully booted.
6. **Initial Setup Access:** Connect to the router using a network cable. Open a browser and load **http://192.168.0.1**. Log in with the default username **Admin** and leave the password blank. Run the Setup Wizard to reconfigure your internet access, Wi-Fi SSIDs, and security credentials.`,
        faqs: [
          {
            question: "What is the default login for D-Link DIR-842?",
            answer: "The default login IP address is 192.168.0.1. The default username is 'Admin' (case-sensitive) and there is no default password (leave the field blank)."
          },
          {
            question: "Why does 192.168.0.1 fail to open for DIR-842?",
            answer: "Ensure your computer is connected to one of the router's LAN ports, not the WAN port. Disable any active VPN clients or custom proxy settings that might route queries away from local addresses."
          },
          {
            question: "Does D-Link DIR-842 support gigabit connections?",
            answer: "Yes, the D-Link DIR-842 AC1200 router features four gigabit LAN ports and one gigabit WAN port, supporting high-speed cable and fiber connections up to 1000 Mbps."
          },
          {
            question: "How do I create an admin password on DIR-842?",
            answer: "Log in to the router admin page at 192.168.0.1, go to Management > Admin Settings. Enter your custom password in the Admin Password field, confirm it, and click Save. Creating a custom password prevents unauthorized configuration changes."
          }
        ],
        metaTitle: "D-Link DIR-842 Login — 192.168.0.1 Admin Settings",
        metaDescription: "Access D-Link DIR-842 router admin panel at 192.168.0.1. Default credentials: Admin (blank password). Complete setup, reset, and password config guide.",
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
        wifiSetupGuide: `## Detailed WiFi Setup for ASUS RT-AX88U

To configure your wireless network on the ASUS RT-AX88U (AX6000 Wi-Fi 6 Gaming Router), follow these steps:

1. **Hardware Setup:** Connect the Ethernet cable from your internet modem to the WAN port on the rear of the RT-AX88U. Connect your PC to one of the eight LAN ports, or join the default Wi-Fi network (SSID) printed on the router's bottom label.
2. **Access the Admin Panel:** Open a web browser and go to **192.168.1.1** or **router.asus.com** to load the ASUSWRT setup portal.
3. **Log In with Defaults:** Enter the default username: **admin** and password: **admin** (the Quick Internet Setup wizard will launch automatically on your first login).
4. **Choose WAN Mode:** The QIS wizard will detect your connection type. Most fiber and cable plans use **Dynamic IP**. Select PPPoE and enter your credentials if required by your provider.
5. **Configure Wi-Fi Parameters:** Under the Wireless menu, you can configure your 2.4GHz and 5GHz SSIDs and passwords. You can check **Smart Connect** to allow the router to aggregate both bands under one SSID, routing clients based on signal strength. Select **WPA2-Personal** or **WPA3-Personal** for security.
6. **Wi-Fi 6 Features Optimization:** Navigate to **Advanced Settings > Wireless > General**. Ensure **802.11ax / WiFi 6 mode** is enabled. Turn on **OFDMA/MU-MIMO** for both uplink and downlink to enable simultaneous multi-device transmission. Select **160MHz** channel bandwidth on the 5GHz band to allow maximum transfer speeds. Enable **Target Wake Time (TWT)** to reduce power consumption for battery-powered smart home clients.
7. **Configure Adaptive QoS for Gaming:** Go to the **Adaptive QoS** tab. Enable QoS and select **Gaming** as the priority mode. This ensures that game packet routing on your PS5, Xbox, or PC is prioritized over background video downloads or file syncs, maintaining low ping and jitter.
8. **AiMesh Node Setup:** If using other ASUS routers to extend coverage, navigate to the **AiMesh** tab. Click **Add AiMesh Node** and the RT-AX88U will scan for compatible ASUS routers. Follow the prompts to add them to your mesh network for seamless roaming.
9. **Save Configurations:** Apply settings. Reconnect your client devices to the newly secured Wi-Fi network.`,
        resetGuide: `## Factory Reset Guide for ASUS RT-AX88U

Restoring the ASUS RT-AX88U to factory settings clears all custom configurations, including admin credentials, Wi-Fi passwords, and QoS rules. Use this procedure:

1. **Power Status:** Verify the RT-AX88U is powered on (the Power LED on the front panel should be solid white).
2. **Locate the Reset Button:** Find the physical **RESET** pinhole button on the rear panel of the router.
3. **Perform the Reset:** Insert a paperclip into the reset hole. Press and hold the button for **10 seconds**.
4. **Observe LED Behavior:** Keep holding the button until the Power LED begins to flash slowly. Release the paperclip.
5. **Physical WPS Button Reset Method:** If the reset pinhole fails, use the physical WPS button reset. Turn off the router. Press and hold the **WPS** button on the side panel. While holding WPS, turn the router on. Keep holding WPS until the Power LED flashes rapidly or turns red, then release.
6. **Reboot Completion:** The router takes about 2 to 3 minutes to clear its NVRAM and reboot. Once the Power and Wi-Fi LEDs are solid white again, connect your PC and navigate to **http://router.asus.com** or **192.168.1.1** to run the Quick Internet Setup wizard.`,
        faqs: [
          {
            question: "What is the default IP address for ASUS RT-AX88U?",
            answer: "The default login IP address is 192.168.1.1. You can also use router.asus.com when connected to the router's network."
          },
          {
            question: "What are the default login credentials for RT-AX88U?",
            answer: "Default username: admin. Default password: admin. Change these during the initial setup wizard to secure your admin panel."
          },
          {
            question: "Does the ASUS RT-AX88U support AiMesh?",
            answer: "Yes, the RT-AX88U supports ASUS AiMesh. You can connect compatible ASUS routers to build a mesh Wi-Fi network, providing seamless coverage across large homes."
          },
          {
            question: "How do I configure QoS for gaming on RT-AX88U?",
            answer: "Log in to the dashboard at router.asus.com, go to Adaptive QoS under the General tab, toggle Enable QoS to On, select Gaming as the priority profile, and click Apply to prioritize gaming packets."
          }
        ],
        metaTitle: "ASUS RT-AX88U Login — 192.168.1.1 Admin Settings",
        metaDescription: "Access ASUS RT-AX88U router admin panel at 192.168.1.1 or router.asus.com. Default credentials: admin/admin. Complete setup, AiMesh, and reset guide.",
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
    // TP-Link High-SEO Models
    prisma.routerModel.upsert({
      where: { slug: "archer-ax55" },
      update: {},
      create: {
        brandId: tpLink.id,
        name: "Archer AX55",
        slug: "archer-ax55",
        loginIps: ["192.168.0.1", "tplinkwifi.net"],
        defaultUsername: "admin",
        defaultPassword: "admin",
        wifiSetupGuide: `## How to Set Up WiFi on TP-Link Archer AX55\n\n1. Connect your PC or phone to the Archer AX55 via Ethernet or its default Wi-Fi network\n2. Open a browser and go to **192.168.0.1** or **tplinkwifi.net**\n3. Log in with username: **admin** and password: **admin** (or your custom password)\n4. Use the Quick Setup wizard to select your WAN connection type (Dynamic IP for most home setups, PPPoE if your ISP requires credentials)\n5. Navigate to **Wireless > Wireless Settings** to set your 2.4GHz and 5GHz SSIDs and passwords\n6. Enable WPA3 under Wireless Security for maximum protection\n7. Click Save and reconnect your devices with the new Wi-Fi credentials`,
        resetGuide: `## How to Factory Reset TP-Link Archer AX55\n\n1. Ensure the Archer AX55 is powered on and fully booted (Power LED solid)\n2. Locate the **RESET** button on the rear panel of the router\n3. Use a paperclip to press and hold the RESET button for **10 seconds**\n4. Release the button when all LED indicators blink simultaneously\n5. The router will automatically reboot (takes approximately 60 seconds)\n6. After reset, the Archer AX55 returns to factory defaults — reconnect using the default credentials on the bottom label`,
        faqs: [
          {
            question: "What is the default login IP for TP-Link Archer AX55?",
            answer: "The default admin panel IP for the TP-Link Archer AX55 is 192.168.0.1. You can also use the local web address tplinkwifi.net when connected to the router's network.",
          },
          {
            question: "What are the default credentials for Archer AX55?",
            answer: "The default username is 'admin' and the default password is 'admin'. If this doesn't work, check the label on the bottom of the router for a unique default password set by TP-Link.",
          },
          {
            question: "Does Archer AX55 support Wi-Fi 6?",
            answer: "Yes, the TP-Link Archer AX55 is a dual-band Wi-Fi 6 (802.11ax) router with combined speeds of up to AX3000 (574 Mbps on 2.4GHz + 2402 Mbps on 5GHz).",
          },
          {
            question: "How do I change the Wi-Fi password on Archer AX55?",
            answer: "Log in to 192.168.0.1, navigate to Wireless > Wireless Settings, select your band (2.4GHz or 5GHz), update the SSID and password fields, then click Save.",
          },
          {
            question: "Does TP-Link Archer AX55 support WPA3?",
            answer: "Yes, the Archer AX55 supports WPA3-Personal (SAE) encryption. Enable it under Wireless > Wireless Security by selecting WPA3-Personal or WPA2/WPA3 Mixed mode for backward compatibility.",
          },
        ],
        metaTitle: "TP-Link Archer AX55 Login — Default IP 192.168.0.1 & Password",
        metaDescription: "Access TP-Link Archer AX55 admin panel at 192.168.0.1 or tplinkwifi.net. Default credentials: admin/admin. Complete Wi-Fi 6 setup, firmware update, and reset guide.",
        diagnosticCategory: "WIFI",
      },
    }),
    prisma.routerModel.upsert({
      where: { slug: "archer-ax21" },
      update: {},
      create: {
        brandId: tpLink.id,
        name: "Archer AX21",
        slug: "archer-ax21",
        loginIps: ["192.168.0.1", "tplinkwifi.net"],
        defaultUsername: "admin",
        defaultPassword: "admin",
        wifiSetupGuide: `## How to Set Up WiFi on TP-Link Archer AX21\n\n1. Connect your device to the Archer AX21 via Ethernet or the default Wi-Fi network on the bottom label\n2. Open a browser and navigate to **192.168.0.1** or **tplinkwifi.net**\n3. Log in with admin/admin (or your custom admin password)\n4. Run the Quick Setup wizard: select your WAN type (Dynamic IP for cable/fiber, PPPoE for ISP credentials)\n5. Navigate to **Wireless** to set your 2.4GHz and 5GHz SSID names and Wi-Fi passwords\n6. Save settings and reconnect all devices with the new credentials`,
        resetGuide: `## Factory Reset TP-Link Archer AX21\n\n1. With the router powered on, locate the RESET button on the rear panel\n2. Press and hold using a paperclip for **10 seconds** until all LEDs blink\n3. Release — the router will reboot and restore factory default settings\n4. After reset (≈60 seconds), reconnect using the default credentials from the bottom label`,
        faqs: [
          {
            question: "What is the default IP address for TP-Link Archer AX21?",
            answer: "The default admin panel IP for the Archer AX21 is 192.168.0.1. You can also use the local hostname tplinkwifi.net when connected to the router's Wi-Fi.",
          },
          {
            question: "What is the default username and password for Archer AX21?",
            answer: "Default username: admin. Default password: admin. If login fails, check the sticker on the bottom of the router for a unique printed password.",
          },
          {
            question: "Is the TP-Link Archer AX21 a Wi-Fi 6 router?",
            answer: "Yes, the Archer AX21 is a dual-band Wi-Fi 6 (802.11ax) AX1800 router — 300 Mbps on 2.4GHz and 1201 Mbps on 5GHz. It's one of the most affordable Wi-Fi 6 entry-level routers available.",
          },
          {
            question: "How do I update firmware on Archer AX21?",
            answer: "Log in to 192.168.0.1, navigate to Advanced > System Tools > Firmware Upgrade, and click Check for Updates. Or download the latest firmware from TP-Link's website and upload it manually.",
          },
        ],
        metaTitle: "TP-Link Archer AX21 Login — Default IP 192.168.0.1 & Password",
        metaDescription: "Access TP-Link Archer AX21 admin panel at 192.168.0.1 or tplinkwifi.net. Default credentials admin/admin. AX1800 Wi-Fi 6 setup guide and factory reset instructions.",
        diagnosticCategory: "WIFI",
      },
    }),
    // ASUS High-SEO Models
    prisma.routerModel.upsert({
      where: { slug: "rt-ax86u" },
      update: {},
      create: {
        brandId: asus.id,
        name: "RT-AX86U",
        slug: "rt-ax86u",
        loginIps: ["192.168.1.1", "router.asus.com"],
        defaultUsername: "admin",
        defaultPassword: "admin",
        wifiSetupGuide: `## How to Set Up WiFi on ASUS RT-AX86U\n\n1. Connect your PC to the RT-AX86U via Ethernet cable (LAN port 1-4)\n2. Open a browser and go to **192.168.1.1** or **router.asus.com**\n3. Log in with username: **admin** and password: **admin**\n4. The ASUS Quick Internet Setup (QIS) wizard will launch automatically\n5. Select your WAN connection type: Auto Detect works for most setups, or manually select PPPoE if your ISP requires credentials\n6. Set your 2.4GHz and 5GHz Wi-Fi names (SSID) and passwords\n7. Enable AiProtection (Trend Micro powered) for network security scanning\n8. Configure Adaptive QoS for gaming traffic prioritization under the Gaming tab`,
        resetGuide: `## Factory Reset ASUS RT-AX86U\n\n1. Ensure the router is powered on (Power LED solid white)\n2. Locate the **WPS/Reset** button on the rear panel\n3. Press and hold for **10 seconds** until the Power LED blinks slowly\n4. Release the button — the router will reboot to factory settings (takes 2-3 minutes)\n5. After reset, log in with admin/admin and run the QIS setup wizard again`,
        faqs: [
          {
            question: "What is the default IP for ASUS RT-AX86U?",
            answer: "The default admin panel IP for the ASUS RT-AX86U is 192.168.1.1. You can also use the local hostname router.asus.com when connected to the router's network.",
          },
          {
            question: "What are the default credentials for ASUS RT-AX86U?",
            answer: "Default username: admin. Default password: admin. After first login, the QIS wizard will prompt you to change the admin password and Wi-Fi credentials.",
          },
          {
            question: "Does ASUS RT-AX86U support Wi-Fi 6?",
            answer: "Yes, the RT-AX86U is a dual-band Wi-Fi 6 (802.11ax) router with AX5700 combined speeds — 861 Mbps on 2.4GHz and 4804 Mbps on 5GHz, making it ideal for gaming and high-bandwidth households.",
          },
          {
            question: "What is the difference between RT-AX86U and RT-AX88U?",
            answer: "The RT-AX88U has 8 LAN ports vs the RT-AX86U's 4 LAN ports. The RT-AX86U Pro features a 2.5G WAN port for multi-gig internet. Both are dual-band AX-class routers with similar gaming features.",
          },
          {
            question: "How do I enable AiMesh on ASUS RT-AX86U?",
            answer: "Log in to router.asus.com, navigate to AiMesh, and click Add AiMesh Node. Power on a compatible ASUS router in the same room and the RT-AX86U will automatically detect and add it to your mesh network.",
          },
        ],
        metaTitle: "ASUS RT-AX86U Login — Default IP 192.168.1.1 & Password",
        metaDescription: "Access ASUS RT-AX86U admin panel at 192.168.1.1 or router.asus.com. Default credentials: admin/admin. Wi-Fi 6 gaming router setup, AiMesh configuration, and factory reset guide.",
        diagnosticCategory: "WIFI",
      },
    }),
    // Netgear High-SEO Models
    prisma.routerModel.upsert({
      where: { slug: "rs700s" },
      update: {},
      create: {
        brandId: netgear.id,
        name: "Nighthawk RS700S",
        slug: "rs700s",
        loginIps: ["192.168.1.1", "routerlogin.net"],
        defaultUsername: "admin",
        defaultPassword: "password",
        wifiSetupGuide: `## How to Set Up WiFi on Netgear Nighthawk RS700S\n\n1. Connect your PC to the RS700S via Ethernet\n2. Open a browser and go to **192.168.1.1** or **routerlogin.net**\n3. Log in with username: **admin** and password: **password**\n4. Run the Nighthawk Setup wizard to configure your WAN connection\n5. Under Wireless Settings, configure your 2.4GHz, 5GHz, and 6GHz SSIDs\n6. Enable WPA3 encryption under each wireless band\n7. Set up Netgear Armor (Bitdefender powered) for cybersecurity protection`,
        resetGuide: `## Factory Reset Netgear RS700S\n\n1. With the router powered on, locate the RESET button on the rear panel\n2. Insert a paperclip and hold for **7 seconds** until the Power LED blinks amber\n3. Release — the router will reboot (takes 2-3 minutes)\n4. After reset, log in with admin/password and reconfigure settings`,
        faqs: [
          {
            question: "What is the default IP for Netgear Nighthawk RS700S?",
            answer: "The default admin IP for the Netgear RS700S is 192.168.1.1. You can also use routerlogin.net when connected to the router's network.",
          },
          {
            question: "Does the Netgear RS700S support Wi-Fi 7?",
            answer: "Yes, the Netgear Nighthawk RS700S is a tri-band Wi-Fi 7 (802.11be) router — the first generation Nighthawk Wi-Fi 7 flagship with combined speeds up to 19.0 Gbps across 2.4GHz, 5GHz, and 6GHz bands.",
          },
          {
            question: "What are the default login credentials for Netgear RS700S?",
            answer: "Default username: admin. Default password: password. Change these immediately after first login to secure your router.",
          },
          {
            question: "What is Multi-Link Operation (MLO) on the RS700S?",
            answer: "MLO is a Wi-Fi 7 feature that allows the RS700S to aggregate multiple frequency bands simultaneously for a single device connection. This dramatically reduces latency and increases throughput compared to Wi-Fi 6.",
          },
        ],
        metaTitle: "Netgear Nighthawk RS700S Login — Default IP & Password",
        metaDescription: "Access Netgear Nighthawk RS700S Wi-Fi 7 router admin panel at 192.168.1.1 or routerlogin.net. Default credentials: admin/password. Complete setup and reset guide.",
        diagnosticCategory: "WIFI",
      },
    }),
    // Huawei High-SEO Model
    prisma.routerModel.upsert({
      where: { slug: "huawei-ax3" },
      update: {},
      create: {
        brandId: huawei.id,
        name: "AX3 (WS7200)",
        slug: "huawei-ax3",
        loginIps: ["192.168.3.1", "192.168.3.1"],
        defaultUsername: "admin",
        defaultPassword: "admin",
        wifiSetupGuide: `## How to Set Up WiFi on Huawei AX3 (WS7200)\n\n1. Connect your PC to the Huawei AX3 via Ethernet or join the default Wi-Fi network on the bottom label\n2. Open a browser and go to **192.168.3.1**\n3. Log in with username: **admin** and password: **admin** (or your custom password)\n4. The Huawei Smart Home App provides guided setup — download it and follow the Quick Setup\n5. Under Settings > Wi-Fi, configure your 2.4GHz and 5GHz SSIDs and passwords\n6. Enable HarmonyOS Connect (for Huawei device ecosystem integration)\n7. Set up One Wi-Fi (Smart Roaming) to allow seamless band steering`,
        resetGuide: `## Factory Reset Huawei AX3 (WS7200)\n\n1. Ensure the router is powered on\n2. Use a paperclip to press and hold the RESET button on the rear panel for **10 seconds**\n3. Release when the indicator LED flashes rapidly\n4. The router will reboot with factory settings (about 60 seconds)\n5. Reconnect using the default SSID and credentials from the bottom label`,
        faqs: [
          {
            question: "What is the default IP for Huawei AX3?",
            answer: "The default admin panel IP for the Huawei AX3 (WS7200) is 192.168.3.1. This is Huawei's standard gateway IP, unlike most brands that use 192.168.1.1 or 192.168.0.1.",
          },
          {
            question: "What are the default credentials for Huawei AX3?",
            answer: "Default username: admin. Default password: admin. On some units, the default password may be printed on the bottom label of the router.",
          },
          {
            question: "Does Huawei AX3 support Wi-Fi 6?",
            answer: "Yes, the Huawei AX3 (WS7200) is a dual-band Wi-Fi 6 (802.11ax) router supporting OFDMA and MU-MIMO with combined speeds of AX3000 (574 Mbps on 2.4GHz + 2402 Mbps on 5GHz).",
          },
          {
            question: "How do I update firmware on Huawei AX3?",
            answer: "Log in to 192.168.3.1, navigate to More > Update, and click Check for Updates. The router will download and install the latest EMUI firmware automatically if connected to the internet.",
          },
        ],
        metaTitle: "Huawei AX3 (WS7200) Login — Default IP 192.168.3.1 & Password",
        metaDescription: "Access Huawei AX3 router admin panel at 192.168.3.1. Default credentials: admin/admin. Wi-Fi 6 AX3000 router setup guide, LED meanings, and factory reset instructions.",
        diagnosticCategory: "WIFI",
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
        content: `## WiFi Connected But No Internet Access: Diagnostic Guide

Connecting to a Wi-Fi access point successfully only to find you cannot load web pages is a common networking issue. This problem indicates that while the local wireless link between your client device and the router access point is active, the router is unable to communicate with the broader internet, or there is an configuration mismatch blocking IP routing.

To troubleshoot this issue, it is helpful to understand the boundary between your local network (LAN) and the public network (WAN). The local connection to the router does not guarantee an active link to your ISP.

### LAN vs. WAN Boundaries
Your local area network (LAN) consists of your devices connected to the router via Wi-Fi or Ethernet. The wide area network (WAN) is the network connecting your router to the Internet Service Provider (ISP) and the rest of the web. A "Connected, No Internet" status means the LAN connection is functioning perfectly (your device can speak to the router), but the link between the router and the WAN is broken, or your device has been assigned an invalid routing profile that blocks it from accessing the WAN gateway.

### DHCP Lease Conflicts and APIPA Configuration
A frequent cause of local network routing blocks is a conflict in Dynamic Host Configuration Protocol (DHCP) lease allocations. If two devices are assigned the same local IP address, or if a device's network configuration is stale, the router cannot route public traffic to it. Furthermore, if your device fails to receive any IP configuration from the router's DHCP server, it will self-assign an Automatic Private IP Address (APIPA) in the range **169.254.0.1** to **169.254.255.254**. An APIPA address indicates a complete breakdown in communication with the router's DHCP service. You must renew your DHCP lease or manually bind a static IP address within the router's active subnet mask (usually 255.255.255.0).

### WAN Interface Drop Symptoms & Hardware Diagnostics
If multiple devices on your network show the "No Internet" status, the issue is likely at the router's WAN interface or modem level. Check the physical connections:
1. **Modem Status Lights:** Look at the LEDs on your broadband modem. The "Online", "Sync", or "WAN" indicator must be solid green or blue. If it is blinking amber, red, or turned off, the modem has lost its connection to the ISP.
2. **Fiber ONT Optical Power Levels:** If you have a fiber-to-the-home (FTTH) setup, inspect the Optical Network Terminal (ONT). A red "LOS" (Loss of Signal) light indicates that the optical fiber is bent, broken, or receiving insufficient light levels (typically below -27 dBm).
3. **WAN Ethernet Cables:** Ensure the cable connecting the modem's LAN port to the router's WAN port is a high-quality Category 5e (Cat5e) or Category 6 (Cat6) copper patch cable. Damaged RJ45 clips can cause intermittent WAN port link drops.

### Adware, VPN, and Proxy Conflicts
Security software and virtual private networks (VPNs) create virtual network adapters and edit your system's routing tables. If a VPN tunnel disconnects abruptly or its "Kill Switch" engages, it will block all traffic outside the secure tunnel, leading to a "Connected, No Internet" state. Similarly, misconfigured proxy servers, third-party firewalls, or adware can inject themselves into the TCP/IP stack, preventing standard HTTP/HTTPS traffic from reaching the default gateway.

To resolve this issue, use the step-by-step diagnostic resolution flow below:`,
        causes: [
          "ISP (Internet Service Provider) connection outage or maintenance work",
          "DNS resolver failure at the provider level or local misconfiguration",
          "DHCP server IP address allocation conflicts or invalid IP bindings",
          "Modem-to-router physical WAN port link drops or cable issues",
          "Local firewall software, proxy configuration, or VPN profile conflicts"
        ],
        fixes: [
          {
            step: 1,
            title: "Power Cycle Your Router and Modem",
            description:
              "Power cycling clears memory issues and restarts the WAN link. Unplug both devices from power. Wait 30 seconds. Plug in the modem first and wait 60 seconds for the DSL/Online indicator to turn solid. Then plug in the router, waiting another 60 seconds to establish the Wi-Fi AP link.",
          },
          {
            step: 2,
            title: "Check Your Local IP Address Configuration",
            description:
              "Verify that your device is receiving a valid local IP address (typically in the 192.168.1.X or 192.168.0.X range) from the router's DHCP server. If your IP address begins with 169.254.X.X, your device was unable to obtain an IP from the router. Run IP release/renew commands to request a new address.",
            technicalDetails: "Windows CMD:\nipconfig /release\nipconfig /renew\n\nmacOS Terminal:\nsudo ipconfig set en0 DHCP"
          },
          {
            step: 3,
            title: "Flush DNS Cache and Run Ping Diagnostics",
            description:
              "Clear corrupted hostname records from your operating system's local memory. To determine if the issue is DNS-related, attempt to ping a public IP address (such as 8.8.8.8) directly. If the IP ping succeeds but domain name pings fail, you have a DNS configuration issue.",
            technicalDetails: "Windows CMD:\nipconfig /flushdns\nping 8.8.8.8\nping google.com"
          },
          {
            step: 4,
            title: "Manually Configure DNS Resolvers",
            description:
              "Bypass your ISP's default name servers, which may be offline. Log in to your router admin panel (e.g. 192.168.1.1) or your network adapter settings, change DNS selection to manual, and enter Cloudflare DNS (1.1.1.1 / 1.0.0.1) or Google Public DNS (8.8.8.8 / 8.8.4.4).",
          },
          {
            step: 5,
            title: "Forget and Reconnect to the Wi-Fi Network",
            description:
              "Forget the Wi-Fi profile on your device to clear corrupted network configurations and cached security keys. Reconnect to the SSID and enter the security password from scratch.",
          }
        ],
        faqs: [
          {
            question: "Why does my phone say 'Connected, No Internet' on Wi-Fi?",
            answer: "This status means your phone has established a local wireless link with your router, but the router itself cannot reach the internet. The issue could be an ISP outage, a disconnected cable between the router and modem, or an IP address conflict on the local network."
          },
          {
            question: "How do I diagnose if the connection issue is DNS-related?",
            answer: "Open a command terminal and ping a public IP address directly (like 'ping 8.8.8.8'). If the ping succeeds, your internet link is active. If you then try to ping 'google.com' and it fails, the issue is DNS host resolution. Changing your DNS servers will resolve this."
          },
          {
            question: "What does an IP address beginning with 169.254 mean?",
            answer: "An IP address starting with 169.254.X.X is an Automatic Private IP Address (APIPA). It indicates that your device connected to the network, but the router's DHCP server failed to assign it a valid IP address. Restarting the router or renewing the DHCP lease usually fixes this."
          },
          {
            question: "Can a VPN cause a 'Connected, No Internet' error?",
            answer: "Yes. If your VPN client fails to authenticate or loses its connection to the secure server, it may block all outgoing traffic to protect your data. Temporarily disable your VPN client or secure proxy settings to see if your internet access returns."
          }
        ],
        relatedSlugs: ["slow-internet", "dns-not-resolving"],
        metaTitle: "WiFi Connected But No Internet — How to Troubleshoot",
        metaDescription: "Diagnose and resolve the 'WiFi connected but no internet' error. Step-by-step troubleshooting, IP renew commands, and DNS configurations.",
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
        content: `## Troubleshooting Slow Internet Speeds: Step-by-Step Diagnostic Guide

Experiencing slow internet speeds or high packet latency (ping) can be frustrating, especially when paying for a high-speed subscription plan. This guide provides technical steps to isolate routing issues, wireless interference, and hardware bottlenecks on your local network.

To troubleshoot slow speeds effectively, you must identify whether the bottleneck lies within your local wireless setup (LAN) or your ISP's physical connection (WAN).

### LAN vs. WAN Speed Bottlenecks
A network connection is only as fast as its slowest link. If you run a speed test over Wi-Fi and get 30 Mbps, but a wired connection directly to the modem yields 300 Mbps, your speed bottleneck is entirely within your local wireless network (LAN). However, if both wired and wireless tests yield speeds far below your subscribed plan, the bottleneck is on the WAN side, which could point to ISP throttling, line noise, or an overloaded local node.

### Bufferbloat Diagnosis and Packet Latency
Bufferbloat occurs when network traffic saturates your connection, causing your router to buffer packets excessively. This results in massive latency spikes (high ping) and packet loss, rendering real-time applications like online gaming or video conferencing unusable. You can diagnose bufferbloat by running a continuous ping test in your terminal while performing a speed test:
\`\`\`bash
# On Windows CMD
ping 8.8.8.8 -t
# On macOS/Linux Terminal
ping 8.8.8.8
\`\`\`
Observe the response times. If your ping jumps from 15ms to 300ms+ during the upload or download phase of the speed test, your router is suffering from bufferbloat.

### Wireless Frequency Congestion & DFS Channels
The 2.4GHz Wi-Fi band is highly congested because it has only three non-overlapping channels (1, 6, and 11) and is shared with household appliances like microwaves and Bluetooth devices. To maximize speeds, switch to the 5GHz or 6GHz bands. However, the 5GHz band can also experience congestion. Advanced routers allow you to access Dynamic Frequency Selection (DFS) channels. DFS channels operate on frequencies shared with radar systems (like military or weather radar). If no radar is detected, your router can use these clear, high-speed channels, avoiding interference from neighboring Wi-Fi routers.

### Quality of Service (QoS) Optimization
Quality of Service (QoS) allows you to instruct your router on how to prioritize traffic. Traditional QoS requires manual setup of rules per device or protocol, but modern routers feature **Adaptive QoS** or **Smart Queue Management (SQM)** using algorithms like FQ-CoDel or Cake. SQM prevents bufferbloat by ensuring that no single device or download can hog the entire upload or download queue, dynamically allocating bandwidth to maintain low latency for gaming and streaming.

### Router Hardware Throughput Constraints
Sometimes, the router itself is the bottleneck. Legacy hardware with single-core processors cannot handle high-speed fiber plans (500 Mbps to 1 Gbps). When processing high-throughput traffic, the router's CPU spikes to 100%, causing packet drops and speed degradation. Ensure **Hardware NAT Acceleration** (also known as Cut-Through Forwarding) is enabled in your router's settings. Disabling features like custom traffic monitoring or parental controls can free up CPU resources and restore full gigabit throughput.

To resolve these speed bottlenecks, follow this diagnostic resolution checklist:`,
        causes: [
          "Wi-Fi frequency band congestion and overlapping channel interference",
          "Router hardware CPU limits or outdated firmware versions",
          "Signal attenuation due to physical obstructions and distance",
          "Network bufferbloat and lack of Quality of Service (QoS) configurations",
          "Background data transfers and ISP bandwidth throttling policies"
        ],
        fixes: [
          {
            step: 1,
            title: "Run a Local Speed Test",
            description:
              "Measure your current download speed, upload speed, and ping using a speed test tool. Perform tests on both a wired Ethernet link and Wi-Fi to isolate wireless signal issues.",
          },
          {
            step: 2,
            title: "Upgrade to the 5GHz or 6GHz Wi-Fi Band",
            description:
              "Switch your devices to the 5GHz or 6GHz frequency band. The 2.4GHz band is slower and prone to interference from household electronics, whereas higher bands provide wider channels and less congestion.",
          },
          {
            step: 3,
            title: "Configure Custom DNS Resolvers",
            description:
              "Bypass slow or overloaded DNS servers assigned by your ISP. Change your router's DNS settings to Cloudflare (1.1.1.1) or Google DNS (8.8.8.8) to improve host resolution speed.",
          },
          {
            step: 4,
            title: "Enable Quality of Service (QoS) and Fix Bufferbloat",
            description:
              "Set up Adaptive QoS on your router. Set upload and download limits slightly below your actual plan speed (e.g. at 95%) to prevent your connection from maxing out, which keeps your network latency low.",
          },
          {
            step: 5,
            title: "Perform a Router and Modem Power Cycle",
            description:
              "Unplug your network equipment from power for 30 seconds to clear temporary cache, free up router memory, and re-establish a fresh connection to your ISP gateway.",
          }
        ],
        faqs: [
          {
            question: "Why is my internet speed slower on Wi-Fi than on Ethernet?",
            answer: "Wi-Fi connections are subject to signal loss from walls, distance, and interference from neighboring networks. Ethernet cables provide a dedicated connection free from interference, ensuring you get your full plan speeds."
          },
          {
            question: "What is network bufferbloat and how do I fix it?",
            answer: "Bufferbloat is high latency that occurs when your internet connection is maxed out, causing packets to queue up in your router's memory. To fix this, enable Quality of Service (QoS) on your router to allocate bandwidth and prevent upload/download saturation."
          },
          {
            question: "How do I choose the best Wi-Fi channel on my router?",
            answer: "For the 2.4GHz band, only use non-overlapping channels 1, 6, or 11. For the 5GHz band, choose wider 80MHz or 160MHz channels with less congestion. You can use a Wi-Fi analyzer app to scan neighboring networks and select the clearest channel."
          },
          {
            question: "Why does my internet speed drop during the evening?",
            answer: "This drop is usually caused by ISP network congestion during peak usage hours (typically 7 PM to 11 PM), when many households in your area are streaming and gaming. If the slowdown is severe, contact your ISP to check for local node capacity issues."
          }
        ],
        relatedSlugs: ["wifi-connected-no-internet"],
        metaTitle: "Slow Internet Speed — Causes and How to Fix It",
        metaDescription: "Diagnose and resolve slow internet speeds. Fix Wi-Fi interference, configure QoS settings, and optimize router parameters for faster browsing.",
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
        content: `## How to Fix DNS Resolution Failures: Technical Diagnostic Guide

A DNS resolution failure (often resulting in 'DNS server not responding' or 'ERR_NAME_NOT_RESOLVED' errors) occurs when your client device is unable to map domain hostnames to IP addresses. While your physical internet connection is active, you cannot open websites using their domain names.

This issue indicates that your queries on UDP/TCP port 53 are timing out or being blocked before they reach a recursive resolver.

### Understanding the Domain Name System (DNS) Architecture
DNS acts as the phonebook of the internet. When you type a domain name (e.g., \`google.com\`), your device queries a recursive DNS resolver (usually provided by your ISP). If the resolver does not have the IP cached, it queries the root hints servers, the Top-Level Domain (TLD) servers (e.g., \`.com\`), and finally the authoritative name servers for the domain to retrieve the IP address. A breakdown at any stage in this chain, or a failure in your local client's connection to the recursive resolver, stops domain resolution entirely.

### Local Cache Corruption and Clearing Procedures
Operating systems and web browsers cache DNS queries locally to speed up browsing. If a domain's IP changes or the cache becomes corrupted, your browser will try to connect to the outdated IP, leading to a resolution error. Clearing this cache forces the operating system to query the network resolvers again.
- **Windows CMD (Admin):** Run \`ipconfig /flushdns\`
- **macOS Terminal:** Run \`sudo killall -HUP mDNSResponder\`
- **Linux (systemd-resolved):** Run \`resolvectl flush-caches\`
- **Google Chrome:** Navigate to \`chrome://net-internals/#dns\` and click "Clear host cache".

### Advanced DNS Troubleshooting CLI Diagnostics
When basic connection steps fail, you must run advanced command-line interface (CLI) diagnostics to verify name resolution paths. Using \`nslookup\` (Windows) or \`dig\` (macOS/Linux), you can test queries directly against specific recursive servers. For example, run:
\`\`\`bash
# Test Google DNS resolver directly
nslookup google.com 8.8.8.8
# Run a trace using dig on Linux/macOS
dig google.com +trace
\`\`\`
If the direct IP query returns an IP but your default query fails, your router is blocking DNS traffic, or the ISP resolver is offline. Check the status flags returned in the query response: a \`NOERROR\` status indicates success, while \`NXDOMAIN\` indicates the domain name does not exist, and \`SERVFAIL\` indicates the resolver encountered an internal processing block.

### Public Resolvers vs. ISP DNS
By default, your router receives recursive DNS resolvers automatically from your ISP. However, ISP DNS servers are often slow, lack security features, and experience frequent outages. Configuring your router or device to use public resolvers like **Cloudflare** (1.1.1.1 / 1.0.0.1) or **Google Public DNS** (8.8.8.8 / 8.8.4.4) improves resolution speeds, enhances reliability, and bypasses local ISP domain filtering.

### Port 53 Blocking and DNS Security Protocols
Standard DNS queries are sent in plain text over UDP port 53. This makes them vulnerable to hijacking, spoofing, and ISP monitoring. If a local firewall or security suite blocks UDP port 53, DNS queries fail. To secure your queries and bypass network blocks, configure modern DNS protocols:
1. **DNS over HTTPS (DoH):** Encrypts DNS queries inside standard HTTPS traffic on TCP port 443, making it indistinguishable from regular web browsing. Most modern browsers (Chrome, Firefox) support DoH settings out of the box.
2. **DNS over TLS (DoT):** Wraps DNS queries in a secure TLS tunnel on TCP port 853, commonly used by modern mobile devices (Android Private DNS).
3. **DNSSEC:** Cryptographically signs DNS records to verify that the returned IP address matches the authoritative source, preventing cache poisoning attacks.

Use this step-by-step diagnostic resolution flow to restore DNS functionality:`,
        causes: [
          "Unresponsive or offline default DNS resolvers assigned by your ISP",
          "Corrupted local DNS resolver cache on your operating system",
          "Local firewalls, security suites, or parent controls blocking UDP port 53",
          "Incorrectly configured DNS server addresses in your adapter properties",
          "Outdated network adapter drivers or routing configuration conflicts"
        ],
        fixes: [
          {
            step: 1,
            title: "Flush Your Local OS DNS Cache",
            description:
              "Clear out corrupted or stale lookup records stored in your system memory. This forces your browser and operating system to request fresh IP mappings from your recursive resolver.",
            technicalDetails: "Windows CMD:\nipconfig /flushdns\n\nmacOS Terminal:\nsudo killall -HUP mDNSResponder"
          },
          {
            step: 2,
            title: "Manually Configure Public DNS Resolvers",
            description:
              "Bypass your ISP's name servers by manually setting your DNS addresses to Cloudflare (1.1.1.1 / 1.0.0.1) or Google DNS (8.8.8.8 / 8.8.4.4) in your network adapter settings.",
          },
          {
            step: 3,
            title: "Test Resolution Using CLI Diagnostics",
            description:
              "Use the 'nslookup' command to query a domain using specific DNS servers. This helps determine if the issue is with your network settings or a specific resolver.",
            technicalDetails: "Query Google DNS:\nnslookup google.com 8.8.8.8\n\nQuery Cloudflare:\nnslookup google.com 1.1.1.1"
          },
          {
            step: 4,
            title: "Reset TCP/IP Winsock Catalog",
            description:
              "If DNS settings continue to fail, reset your system's network socket configurations to default. This resets your network configuration and requires a PC reboot.",
            technicalDetails: "Windows CMD (Admin):\nnetsh int ip reset\nnetsh winsock reset"
          },
          {
            step: 5,
            title: "Temporarily Disable Security Software",
            description:
              "Verify that your local Windows Defender firewall or third-party antivirus suites are not blocking port 53 traffic. Temporarily disable them to test connectivity.",
          }
        ],
        faqs: [
          {
            question: "What does 'DNS server not responding' mean?",
            answer: "This error means your web browser was unable to connect to the DNS server responsible for translating domain names into IP addresses. It is usually caused by an outage on your ISP's DNS servers or a corrupted local DNS cache."
          },
          {
            question: "How do I flush my DNS cache on Windows and Mac?",
            answer: "On Windows, open Command Prompt and run 'ipconfig /flushdns'. On macOS, open Terminal and execute 'sudo killall -HUP mDNSResponder'. This clears out old, cached address records and requests fresh data."
          },
          {
            question: "What are the best DNS servers to use if my ISP's DNS fails?",
            answer: "Cloudflare DNS (Primary: 1.1.1.1, Secondary: 1.0.0.1) and Google Public DNS (Primary: 8.8.8.8, Secondary: 8.8.4.4) are the fastest and most reliable public resolvers."
          },
          {
            question: "Can malware cause DNS resolution failures?",
            answer: "Yes. Certain types of malware can modify your network settings or your hosts file (located at C:\\Windows\\System32\\drivers\\etc\\hosts) to hijack your DNS queries. If your DNS fails persistently, run a malware scan and check your hosts file for unauthorized entries."
          }
        ],
        relatedSlugs: ["wifi-connected-no-internet"],
        metaTitle: "DNS Not Resolving — How to Fix DNS Errors",
        metaDescription: "Fix DNS resolution failures. Step-by-step diagnostic guide, ipconfig flush commands, and public DNS setup configurations.",
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
