import { PrismaClient } from "@prisma/client";
import { ip_192_168_1_1 } from "../content/ip-pages/192-168-1-1";
import { ip_192_168_0_1 } from "../content/ip-pages/192-168-0-1";
import { ip_192_168_8_1 } from "../content/ip-pages/192-168-8-1";
import { ip_192_168_100_1 } from "../content/ip-pages/192-168-100-1";

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
      update: {
        wifiSetupGuide: `## Complete Login & Setup Guide for TP-Link Archer AX73

### How to Access the Archer AX73 Admin Panel

The TP-Link Archer AX73 (AX5400 Wi-Fi 6 Router) is accessed via its web-based administration dashboard. Follow these steps to log in:

1. **Connect to the Router:** Use an Ethernet cable from your PC to any of the four yellow LAN ports on the rear of the Archer AX73, or connect wirelessly using the default SSID and password printed on the product label on the device's bottom panel.
2. **Open the Admin Dashboard:** Launch any web browser (Chrome, Firefox, Edge). In the address bar, type **192.168.0.1** or **tplinkwifi.net** and press Enter. The TP-Link AGHP login page will load.
3. **First-Time Password Creation:** If this is the first login, the Archer AX73 will prompt you to create a unique admin password — unlike older TP-Link routers, it does not use a preset default. Create a strong password using alphanumeric characters and at least one symbol (e.g., Tp@Link2024!).
4. **Subsequent Logins:** Enter your custom admin password at the login prompt. Click **Log In** to access the full AGHP admin panel.

### Quick Setup Wizard — Internet Connection

1. Once logged in, navigate to the **Quick Setup** tab in the top menu bar.
2. The wizard will auto-detect your internet connection type. For standard cable, fiber, or FTTH services, select **Dynamic IP (DHCP)**. For DSL services requiring authentication, choose **PPPoE** and enter the username and password provided by your ISP.
3. If your ISP assigns a static IP, select **Static IP** and enter the IP, Subnet Mask, Gateway, and DNS server details from your ISP documentation.
4. Click **Next** to advance through the wizard stages.

### Wi-Fi 6 Configuration — Advanced Wireless Setup

The Archer AX73 supports dual-band Wi-Fi 6 (802.11ax) with combined speeds up to 5400 Mbps (AX5400). To configure optimal wireless performance:

1. Navigate to **Advanced > Wireless > Wireless Settings**.
2. **Enable Smart Connect:** Check the Smart Connect box to unify both the 2.4GHz and 5GHz bands under one SSID. The router's band steering algorithm will automatically place devices on the optimal frequency based on distance and signal strength.
3. **Set SSID and Password:** Enter your desired Wi-Fi Network Name (SSID) and select **WPA3-Personal** (or WPA2/WPA3 mixed mode for older client compatibility) as the security protocol. Enter a complex password of at least 12 characters.
4. **Channel Optimization:** Set Channel Width to **160MHz** on the 5GHz band to maximize Wi-Fi 6 speeds. On 2.4GHz, use 20/40MHz for compatibility with legacy IoT devices. Select **Auto** channel to allow the router to scan and choose the least congested frequency.
5. **Enable OFDMA:** Under Advanced Wireless settings, ensure **Orthogonal Frequency Division Multiple Access (OFDMA)** is enabled. OFDMA allows multiple devices to transmit simultaneously in the same channel, dramatically reducing latency in dense device environments.
6. **Enable MU-MIMO:** Enable Multi-User MIMO (MU-MIMO) for the 5GHz band. The Archer AX73 supports 4x4 MU-MIMO, meaning it can serve up to 4 clients simultaneously at full speed.
7. **Beamforming:** Enable Beamforming to focus the wireless signal toward connected client devices rather than broadcasting omnidirectionally. This improves per-device signal quality and reduces interference.
8. **Target Wake Time (TWT):** Enable TWT under advanced settings. TWT is a Wi-Fi 6 power-saving feature that schedules when IoT devices and smartphones need to wake up to receive data, reducing battery drain significantly.

### Guest Network Configuration

1. Go to **Advanced > Guest Network**.
2. Enable the guest network for both 2.4GHz and 5GHz if desired.
3. Set a unique SSID (e.g., HomeGuest or VisitorWiFi).
4. Ensure **Allow Guests to Access My Local Network** is toggled **OFF**. This prevents guest devices from accessing your NAS drives, printers, smart home hubs, or local servers.
5. Configure the guest network with WPA2-Personal security and a separate password.

### TP-Link Tether App Setup

The TP-Link Tether app (iOS/Android) provides an alternative mobile-first setup experience:

1. Download the Tether app from the App Store or Google Play.
2. Ensure your phone is connected to the Archer AX73's default Wi-Fi (printed on the bottom label).
3. Open Tether — it will auto-detect the Archer AX73.
4. Follow the guided setup wizard to configure your internet connection, set SSIDs, create an admin password, and register for TP-Link ID for remote management.

### Firmware Update Procedure

Keeping the Archer AX73 firmware updated is critical for security patches and performance improvements:

1. Log in to the dashboard at **192.168.0.1**.
2. Navigate to **Advanced > System > Firmware Upgrade**.
3. Click **Check for Upgrade** — the router contacts TP-Link's cloud servers and displays available firmware versions.
4. If an update is available, click **Upgrade Now**. The router will download and install the update automatically.
5. Alternatively, visit the TP-Link support page for the Archer AX73, download the latest firmware file (.bin), and use the **Manual Upgrade** option to upload it directly.
6. **Warning:** Do NOT power off the router during firmware installation. Wait for the automatic reboot to complete (approximately 3-5 minutes).

### Security Hardening Checklist

Once your Archer AX73 is set up, apply these security configurations:

- **Change Admin Password:** Go to Advanced > System > Administration. Change the admin password from any factory default.
- **Disable WPS:** Navigate to Advanced > Wireless > WPS and toggle WPS Off. WPS PIN mode has known brute-force vulnerabilities.
- **Enable WPA3:** In wireless settings, select WPA3-Personal or WPA2/WPA3 mixed mode for maximum security.
- **Update Firmware:** Always install available firmware updates.
- **Disable Remote Management:** Go to Advanced > System > Remote Management. Ensure this is disabled to prevent WAN-side admin access.
- **Enable SPI Firewall:** Go to Advanced > Security > Firewall. Enable Stateful Packet Inspection (SPI) for incoming traffic protection.
- **DNS-over-HTTPS:** Configure DoH under Advanced > DNS for encrypted DNS queries.

### Port Forwarding Configuration

For gaming consoles, home servers, or P2P applications requiring specific ports:

1. Assign a static local IP to your device. Go to **Advanced > Network > DHCP Server > Address Reservation**. Enter the device MAC address and desired static IP.
2. Go to **Advanced > NAT Forwarding > Port Forwarding**.
3. Click **Add** and enter: Service Type (e.g., PS5, Minecraft), External Port range, Internal IP (the static IP you reserved), Internal Port, and Protocol (TCP/UDP).
4. Click **Save**. The port forwarding rule is now active.
5. Common gaming ports: PS5 — TCP 80, 443, 3478-3480; Xbox — UDP 88, 3074; PC Steam — UDP 27015-27030.

### Common ISP Defaults for Archer AX73

| ISP Region | Connection Type | Notes |
|---|---|---|
| US Cable ISPs | Dynamic IP (DHCP) | No PPPoE needed |
| UK BT/Sky DSL | PPPoE | Use ISP-provided credentials |
| EU Fiber ISPs | PPPoE or DHCP | Varies by provider |
| APAC ISPs | PPPoE | Check ISP documentation |`,
        resetGuide: `## Factory Reset Guide for TP-Link Archer AX73

### Soft Reset (Admin Panel)

If you still have admin access:

1. Log in to the dashboard at **192.168.0.1**.
2. Navigate to **Advanced > System > Backup & Restore**.
3. Click **Restore** under Factory Default Settings.
4. Confirm the restore. The router will reboot and clear all custom configurations.

### Hard Reset (Physical Button)

Use this method if you have forgotten your admin password:

1. **Verify Power Status:** Ensure the Archer AX73 is plugged into a power source and the Power LED is solid green.
2. **Locate the RESET Button:** Find the small pinhole labeled **RESET** on the rear panel, adjacent to the WPS button and USB port.
3. **Perform the Reset:** Insert a paperclip, SIM ejector, or straightened pin into the pinhole. Press and hold the internal button firmly for exactly **10 seconds**.
4. **Watch LED Indicators:** Hold the button until all front-panel LEDs flash simultaneously and then turn off — this signals that the NVRAM wipe has begun. Release the button.
5. **Wait for Reboot:** The router takes approximately 2 minutes to complete its reboot and self-test cycle. Do not unplug power during this period.
6. **Reconnect:** Once the Power and Wi-Fi LEDs are solid green, connect via Ethernet or the default SSID (printed on the bottom label) and navigate to **192.168.0.1** to run the setup wizard.

### Pre-Reset Checklist

Before performing a factory reset, note or backup:

- ISP credentials (PPPoE username and password from your ISP)
- Custom SSID names and Wi-Fi passwords
- Port forwarding rules
- DHCP static reservations (MAC-to-IP bindings)
- Any VPN server configuration details

### Post-Reset Security Steps

1. Create a strong unique admin password during initial setup.
2. Change both 2.4GHz and 5GHz SSIDs and passwords.
3. Update firmware to the latest version immediately.
4. Disable WPS and enable SPI Firewall.
5. Configure DNS to a secure resolver (e.g., Cloudflare 1.1.1.1 or Google 8.8.8.8).`,
        faqs: [
          {
            question: "Does the TP-Link Archer AX73 support Wi-Fi 6?",
            answer: "Yes, the Archer AX73 is a dual-band Wi-Fi 6 (802.11ax) router supporting AX5400 combined speeds: 4804 Mbps on the 5GHz band and 574 Mbps on the 2.4GHz band. It features 4x4 MU-MIMO, OFDMA, and Target Wake Time (TWT)."
          },
          {
            question: "How do I change the Wi-Fi password on Archer AX73?",
            answer: "Log in to 192.168.0.1, go to Advanced > Wireless > Wireless Settings. Update the Password field for both the 2.4GHz and 5GHz bands. Click Save to apply the new credentials."
          },
          {
            question: "How do I update the firmware on my Archer AX73?",
            answer: "Log in to 192.168.0.1, navigate to Advanced > System > Firmware Upgrade. Click Check for Upgrade. If available, click Upgrade Now. Do not power off the router during the upgrade process."
          },
          {
            question: "What is the default admin password for the Archer AX73?",
            answer: "The Archer AX73 requires you to create a custom admin password during initial setup. Unlike older TP-Link models, there is no preset factory password. Log in at 192.168.0.1 for the first time and set your own secure password."
          },
          {
            question: "How do I enable OFDMA on Archer AX73?",
            answer: "Log in to the dashboard, go to Advanced > Wireless > Wireless Settings (Advanced). Enable the OFDMA option. This allows multiple devices to share the same Wi-Fi channel simultaneously, reducing latency in homes with many connected devices."
          },
          {
            question: "How do I set up port forwarding on Archer AX73?",
            answer: "Go to Advanced > NAT Forwarding > Port Forwarding. Click Add. Enter the external port range, internal IP (assign a static IP to your device via DHCP Address Reservation first), internal port, and select TCP/UDP protocol. Click Save."
          },
          {
            question: "What is Smart Connect on Archer AX73?",
            answer: "Smart Connect is a band-steering feature that combines the 2.4GHz and 5GHz Wi-Fi bands under a single SSID. The router automatically assigns connected devices to the optimal band based on signal strength and available bandwidth."
          },
          {
            question: "How do I disable WPS on Archer AX73?",
            answer: "Log in to 192.168.0.1, go to Advanced > Wireless > WPS. Toggle the WPS switch to Off and click Save. Disabling WPS prevents brute-force PIN attacks against your router."
          },
          {
            question: "Can I use the TP-Link Tether app to manage Archer AX73?",
            answer: "Yes, the TP-Link Tether app (available for iOS and Android) provides full management including setup, speed tests, client monitoring, parental controls, and remote access via TP-Link ID."
          },
          {
            question: "How do I configure a guest network on Archer AX73?",
            answer: "Go to Advanced > Guest Network. Enable the guest network for 2.4GHz or 5GHz. Set a unique SSID and password. Ensure 'Allow Guests to Access My Local Network' is disabled to isolate guest devices from your main LAN."
          },
          {
            question: "What should I do if 192.168.0.1 is not loading?",
            answer: "Verify your Ethernet cable is plugged into a LAN port (not the WAN port). Disable any VPN clients. Open Command Prompt and run 'ipconfig' — ensure your IPv4 address is in the 192.168.0.x range. Try accessing tplinkwifi.net as an alternative."
          },
          {
            question: "Does the Archer AX73 support AiMesh or mesh Wi-Fi?",
            answer: "The Archer AX73 does not support ASUS AiMesh. However, it supports TP-Link OneMesh when paired with compatible TP-Link range extenders (e.g., RE650 or RE600X), creating seamless whole-home Wi-Fi coverage."
          }
        ],
      },
      create: {
        brandId: tpLink.id,
        name: "Archer AX73",
        slug: "archer-ax73",
        loginIps: ["192.168.0.1", "tplinkwifi.net"],
        defaultUsername: "admin",
        defaultPassword: "admin",
        wifiSetupGuide: `## Complete Login & Setup Guide for TP-Link Archer AX73

### How to Access the Archer AX73 Admin Panel

The TP-Link Archer AX73 (AX5400 Wi-Fi 6 Router) is accessed via its web-based administration dashboard. Follow these steps to log in:

1. **Connect to the Router:** Use an Ethernet cable from your PC to any of the four yellow LAN ports on the rear of the Archer AX73, or connect wirelessly using the default SSID and password printed on the product label on the device's bottom panel.
2. **Open the Admin Dashboard:** Launch any web browser (Chrome, Firefox, Edge). In the address bar, type **192.168.0.1** or **tplinkwifi.net** and press Enter. The TP-Link AGHP login page will load.
3. **First-Time Password Creation:** If this is the first login, the Archer AX73 will prompt you to create a unique admin password — unlike older TP-Link routers, it does not use a preset default. Create a strong password using alphanumeric characters and at least one symbol (e.g., Tp@Link2024!).
4. **Subsequent Logins:** Enter your custom admin password at the login prompt. Click **Log In** to access the full AGHP admin panel.

### Wi-Fi 6 Configuration

Navigate to Advanced > Wireless > Wireless Settings. Enable Smart Connect, set WPA3-Personal encryption, configure Channel Width to 160MHz on 5GHz, enable OFDMA and MU-MIMO for optimal multi-device performance.

### Firmware Updates

Go to Advanced > System > Firmware Upgrade. Click Check for Upgrade and install available updates to keep security patches current.

### Security Hardening

Disable WPS (Advanced > Wireless > WPS), enable SPI Firewall (Advanced > Security > Firewall), disable Remote Management, and configure DNS-over-HTTPS.

### Port Forwarding

Go to Advanced > NAT Forwarding > Port Forwarding. Create rules mapping external ports to static device IPs for gaming consoles and servers.`,
        resetGuide: `## Factory Reset Guide for TP-Link Archer AX73

1. Verify the router is powered on (Power LED solid green).
2. Locate the RESET pinhole on the rear panel.
3. Insert a paperclip and hold the button for 10 seconds until LEDs flash.
4. Wait 2 minutes for the reboot cycle to complete.
5. Connect via Ethernet and navigate to 192.168.0.1 to run setup.`,
        faqs: [
          {
            question: "Does the TP-Link Archer AX73 support Wi-Fi 6?",
            answer: "Yes, the Archer AX73 is a dual-band Wi-Fi 6 (802.11ax) router supporting AX5400 combined speeds: 4804 Mbps on 5GHz and 574 Mbps on 2.4GHz, with OFDMA and MU-MIMO."
          },
          {
            question: "How do I change the Wi-Fi password on Archer AX73?",
            answer: "Log in to 192.168.0.1, go to Advanced > Wireless > Wireless Settings. Update the Password field for 2.4GHz and 5GHz and click Save."
          },
          {
            question: "How do I update firmware on Archer AX73?",
            answer: "Navigate to Advanced > System > Firmware Upgrade and click Check for Upgrade. Install available updates without powering off the router during the process."
          },
          {
            question: "What is the default admin password for Archer AX73?",
            answer: "The Archer AX73 requires creating a custom admin password during first-time setup. There is no factory-preset default password."
          },
          {
            question: "How do I set up port forwarding on Archer AX73?",
            answer: "Go to Advanced > NAT Forwarding > Port Forwarding. Add a rule with external port, internal device IP (reserved via DHCP), internal port, and protocol (TCP/UDP)."
          },
          {
            question: "How do I disable WPS on Archer AX73?",
            answer: "Go to Advanced > Wireless > WPS and toggle WPS to Off. This prevents brute-force PIN attacks."
          },
          {
            question: "What is Smart Connect?",
            answer: "Smart Connect combines 2.4GHz and 5GHz bands under one SSID, automatically steering devices to the optimal band."
          },
          {
            question: "How do I configure a guest network?",
            answer: "Go to Advanced > Guest Network. Enable the guest SSID and disable 'Allow Guests to Access My Local Network' to isolate guest devices."
          },
          {
            question: "Can I use TP-Link Tether app with Archer AX73?",
            answer: "Yes, the Tether app provides full management including setup wizard, speed tests, parental controls, and remote access."
          },
          {
            question: "What should I do if 192.168.0.1 is not loading?",
            answer: "Ensure Ethernet cable is in a LAN port, disable VPN clients, and verify your IP is in the 192.168.0.x subnet via ipconfig."
          }
        ],
        metaTitle: "TP-Link Archer AX73 Login — Default IP & Password Setup",
        metaDescription: "Access your TP-Link Archer AX73 router admin dashboard. Default IP: 192.168.0.1. Complete Wi-Fi 6 setup, OFDMA configuration, firmware update, and factory reset guide.",
      },
    }),
    // Huawei
    prisma.routerModel.upsert({
      where: { slug: "hg8245h5" },
      update: {
        wifiSetupGuide: `## Complete Login & Admin Guide for Huawei HG8245H5 GPON Terminal

### Understanding the HG8245H5: ISP vs User Access Levels

The Huawei HG8245H5 is a GPON Optical Network Terminal (ONT) commonly deployed by fiber ISPs. It has **two admin levels**: the standard user account (username: admin, password varies by ISP) and the telecom/provider administrator account (username: telecomadmin). The telecom admin account has full access to advanced WLAN, VLAN, and TR-069 settings. Many ISPs restrict user access to the telecomadmin credentials — contact your ISP if access is denied.

### How to Log In to the Huawei HG8245H5

1. **Connect via Ethernet:** Plug an Ethernet cable from your PC into any of the LAN ports on the HG8245H5. Alternatively, connect wirelessly to the default SSID printed on the device's label.
2. **Access the Web Interface:** Open a browser and navigate to **http://192.168.100.1**. The Huawei ONT login page will load.
3. **Choose Your Account Level:**
   - Standard user: Username **admin**, password as printed on the device label (varies by ISP — common defaults: admin, 1234, or the last 8 digits of the serial number).
   - Full telecom admin: Username **telecomadmin**, password **admintelecom** (may be ISP-customized — check with your ISP).
4. **Click Log In** to enter the web management interface.

### ISP-Specific Default Credentials

| ISP | Username | Password | Notes |
|---|---|---|---|
| Generic Huawei | telecomadmin | admintelecom | Full admin access |
| Starhub (SG) | admin | Printed on label | User-level only |
| PLDT (PH) | pldt | pldtadmin1234 | Check label first |
| TM (MY) | tmadmin | Various | ISP-assigned |
| STC (SA) | telecomadmin | admintelecom | Full access |

### WLAN Configuration — 2.4GHz and 5GHz Setup

1. After logging in, click the **WLAN** tab in the top navigation bar.
2. Select **WLAN Basic Configuration** from the left panel.
3. Click the **WLAN Switch** toggle to ensure Wi-Fi is enabled.
4. Click on **SSID1** (primary 2.4GHz network) to expand its configuration:
   - **SSID Name:** Enter your desired network name.
   - **Authentication Mode:** Select **WPA2 Pre-Shared Key** for maximum security on standard clients.
   - **Encryption Mode:** Select **AES**.
   - **WPA Pre-Shared Key:** Enter a strong Wi-Fi password (minimum 12 characters).
5. For the 5GHz band, look for SSID configurations under the 5GHz WLAN interface (may appear as SSID5 or under a separate 5GHz tab depending on firmware version).
6. Click **Apply** to save changes.

### Advanced Wireless Optimization

- **Channel Width:** For 2.4GHz, set channel width to **40MHz** for higher throughput. For 5GHz, configure to **80MHz** for maximum speed.
- **Channel Selection:** Set both bands to **Auto** so the ONT scans and selects the least congested frequency.
- **Transmit Power:** Set to Maximum for larger home coverage areas.
- **DTIM Period:** Set to 1 for real-time gaming applications to reduce beacon latency.

### Huawei AI Life App Integration

The HG8245H5 supports integration with the Huawei AI Life app (formerly HiLink) on Android and iOS:

1. Download the Huawei AI Life app.
2. Connect your smartphone to the HG8245H5's default Wi-Fi.
3. Open the app — it auto-detects the gateway.
4. Manage Wi-Fi settings, view connected devices, enable parental controls, and check ONT signal levels from your smartphone.

### Firmware Update Procedure

The HG8245H5 is typically managed via the ISP's TR-069 Auto-Configuration Server (ACS), meaning firmware is **pushed by the ISP automatically** over the WAN. Manual firmware updates are generally not available to end users to prevent configuration conflicts with ISP provisioning. If you need a firmware update:

1. Contact your ISP's technical support.
2. Request a firmware push or TR-069 configuration refresh.
3. ISPs typically schedule firmware updates during maintenance windows.

### Security Hardening for HG8245H5

1. **Change the default WLAN password** from the factory preset immediately after ISP installation.
2. **Disable WPS:** Navigate to WLAN > WPS Settings and set WPS Mode to Disabled. WPS PIN attacks are a significant risk on older GPON terminals.
3. **Enable MAC Address Filtering:** Under WLAN > WLAN MAC Filtering, add your trusted device MAC addresses and set the mode to Allow Only Listed MACs.
4. **Change User Admin Password:** Under the Security tab or System > User Management, change the standard user password. Note: the telecomadmin password may be ISP-controlled and cannot always be changed.
5. **Disable Remote Management:** Ensure the WAN-facing HTTP/Telnet management interfaces are disabled. This is usually configured by the ISP via TR-069 but verify under System > Remote Management.

### Port Forwarding on HG8245H5

1. Assign a static IP to your target device. Navigate to **LAN > DHCP Static Address** and bind the device MAC to a fixed local IP (e.g., 192.168.100.50).
2. Navigate to **Application > Port Mapping** or **Forwarding > Port Mapping**.
3. Click **New** to add a rule:
   - **WAN Interface:** Select your active WAN profile.
   - **Protocol:** TCP, UDP, or Both.
   - **Start/End External Port:** Enter the port range to forward.
   - **Internal Host IP:** Enter the static IP of your device.
   - **Start/End Internal Port:** Usually same as external port range.
4. Click **Apply** to save the port forwarding rule.
5. Common port forwarding scenarios: PS5 gaming (TCP/UDP 1935, 3478-3480), HTTP server (TCP 80), FTP server (TCP 21).

### TR-069 and ISP Auto-Configuration

The HG8245H5 uses the **TR-069 CWMP protocol** to communicate with your ISP's Auto-Configuration Server. This allows ISPs to:

- Push configuration updates remotely
- Perform remote diagnostics
- Update firmware
- Apply service provisioning changes

Important: After a factory reset, the ISP's TR-069 server will automatically re-provision the device with your service profile. This means your ISP-specific settings (VLAN IDs, PPPoE profiles) will be restored automatically — but your custom WLAN names and passwords will NOT be re-applied.`,
        resetGuide: `## Factory Reset Guide for Huawei HG8245H5

### Soft Reset via Admin Panel

1. Log in to **192.168.100.1** with telecomadmin credentials.
2. Navigate to **System > Configuration Management** or **Maintenance > Factory Reset**.
3. Click **Restore Default Configuration** and confirm.
4. The ONT will reboot — this takes 2-3 minutes.

### Hard Reset via Physical Button

1. Ensure the HG8245H5 is powered on (Power LED solid green).
2. Locate the **RESET** pinhole on the side panel of the gateway.
3. Insert a paperclip firmly and hold for **15 seconds**.
4. Watch the front panel LEDs — they will flash simultaneously then go dark, indicating the wipe has begun.
5. Release the pin and wait approximately 2-3 minutes for the full reboot cycle.
6. When the Power and PON LEDs return to solid green, the ONT is online with factory defaults.
7. Connect via Ethernet and navigate to **192.168.100.1** to log in.

### Post-Reset Behavior (ISP TR-069)

After resetting an ISP-provided HG8245H5, the TR-069 ACS will automatically re-provision the device within minutes. Your internet service will be restored, but custom WLAN SSIDs and passwords must be reconfigured manually.`,
        faqs: [
          {
            question: "What is the default IP address for Huawei HG8245H5?",
            answer: "The default login IP address is 192.168.100.1. This is different from most consumer routers which use 192.168.1.1 or 192.168.0.1."
          },
          {
            question: "Why does telecomadmin/admintelecom fail on HG8245H5?",
            answer: "Many ISPs customize the telecomadmin password to prevent unauthorized access to GPON settings. Check the label on the device for ISP-assigned credentials, or contact your ISP helpdesk to request admin access."
          },
          {
            question: "How do I configure WPA2 security on HG8245H5?",
            answer: "Log in to 192.168.100.1, navigate to WLAN > WLAN Basic Configuration. Select your SSID, set Authentication Mode to WPA2 Pre-Shared Key, set Encryption to AES, enter your password in the WPA Pre-Shared Key field, and click Apply."
          },
          {
            question: "Is the Huawei HG8245H5 a Wi-Fi 6 router?",
            answer: "No, the HG8245H5 is a Wi-Fi 5 (802.11ac) dual-band GPON ONT. It does not support Wi-Fi 6 (802.11ax) technologies."
          },
          {
            question: "Can I update the firmware on HG8245H5 myself?",
            answer: "Generally no. The HG8245H5 firmware is managed by your ISP through TR-069 auto-configuration. Contact your ISP to request a firmware update or configuration refresh."
          },
          {
            question: "How do I set up port forwarding on HG8245H5?",
            answer: "Navigate to Application > Port Mapping (or Forwarding > Port Mapping). Assign a static IP to your device via LAN > DHCP Static Address first, then create a port mapping rule specifying WAN interface, protocol, external port, and internal device IP."
          },
          {
            question: "What happens after I factory reset my ISP HG8245H5?",
            answer: "After a factory reset, the ISP's TR-069 server will automatically re-provision your internet service within a few minutes. Custom Wi-Fi names and passwords must be reconfigured manually through the WLAN settings at 192.168.100.1."
          },
          {
            question: "How do I disable WPS on HG8245H5?",
            answer: "Navigate to WLAN > WPS Settings and set WPS Mode to Disabled. Click Apply. Disabling WPS protects against WPS PIN brute-force attacks."
          },
          {
            question: "What is the difference between admin and telecomadmin on HG8245H5?",
            answer: "The 'admin' account has limited access to basic WLAN and LAN settings. The 'telecomadmin' account has full access to all settings including TR-069, VLAN configuration, and advanced security parameters."
          },
          {
            question: "How do I change the Wi-Fi channel on HG8245H5?",
            answer: "Log in to 192.168.100.1 with telecomadmin, navigate to WLAN > WLAN Basic Configuration. Select your target SSID and set the Channel field to Auto or a specific channel (1, 6, or 11 for 2.4GHz; 36-165 for 5GHz)."
          }
        ],
      },
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
      update: {
        wifiSetupGuide: `## Complete Login & Setup Guide for ZTE ZXHN H298A

### How to Access the ZTE H298A Admin Panel

The ZTE ZXHN H298A is a dual-band AC1200 home gateway router commonly deployed by telecom ISPs. Access its web interface as follows:

1. **Connect to the Router:** Use an Ethernet cable from your PC to any LAN port on the H298A, or connect wirelessly to the default SSID and password printed on the device's rear label.
2. **Open a Web Browser:** Enter **192.168.1.1** in the address bar and press Enter.
3. **Enter Login Credentials:** Use the default username **admin** and password **admin**. If these fail, check the label for an ISP-assigned custom password. Some deployments use: admin/admin123, admin/password, or the last 6 digits of the device serial number.
4. **Select Your Language:** The H298A interface supports multiple languages. Select your preferred language from the settings dropdown.

### ISP-Specific Login Credentials

| ISP | Username | Password | Region |
|---|---|---|---|
| Generic ZTE | admin | admin | Default |
| Etisalat (UAE) | admin | admin | UAE |
| Mobily (SA) | admin | admin | Saudi Arabia |
| Vodafone (EG) | admin | admin | Egypt |
| PTCL (PK) | admin | admin | Pakistan |

### WLAN Configuration — 2.4GHz and 5GHz

1. After logging in, click the **Local Network** tab in the top navigation menu.
2. In the left panel, expand **WLAN** and select **WLAN Basic** or **WLAN SSID Configuration**.
3. **Configure the 2.4GHz network (SSID 1):**
   - SSID Name: Enter your desired network name.
   - Security Type: Select **WPA2-PSK-AES**.
   - WPA Passphrase: Enter a strong password (minimum 12 characters).
4. **Configure the 5GHz network (SSID 5 or under 5GHz section):**
   - Set a separate SSID name or the same name with a "_5G" suffix.
   - Security Type: WPA2-PSK-AES.
   - Enter a strong password.
5. Click **Apply** to save changes to both bands.

### Advanced Wireless Optimization

- **Channel Width:** For 2.4GHz, enable 20/40MHz coexistence for compatibility with legacy IoT devices. For 5GHz, set to **80MHz** for maximum throughput on modern devices.
- **Channel Selection:** Set both bands to **Auto** to allow the router to dynamically select the least congested channel. You can also manually select channels: 1, 6, or 11 for 2.4GHz; 36, 40, 44, or 149 for 5GHz.
- **Transmission Power:** Set to Maximum for full coverage area.
- **Band Steering:** If available under Advanced WLAN settings, enable Band Steering so dual-band capable clients are pushed to the faster 5GHz band.

### Guest Network Setup

1. Navigate to **WLAN > Guest Network** or **WLAN SSID Configuration** and look for SSID 2 (guest profile).
2. Enable the guest SSID.
3. Set a unique SSID name (e.g., HomeGuest).
4. Set security to WPA2-PSK-AES with a separate password.
5. Ensure **Internet Access Only** is enabled and guest-to-LAN routing is disabled.

### Firmware Update Procedure

Like many ISP-deployed routers, the ZTE H298A firmware is typically managed via **TR-069** by your ISP:

1. Check if a manual update option exists under **System > Firmware Update** or **Maintenance > Upgrade**.
2. If available, visit ZTE's official support website, download the firmware package for ZXHN H298A, and upload it via the manual upgrade interface.
3. If no manual option exists, contact your ISP to request a firmware update push.
4. **Warning:** Never upload firmware from unofficial sources — corrupted firmware can brick the device.

### Security Hardening Checklist

1. **Change Admin Password:** Navigate to **Maintenance > Account** (or System > User Management). Change the admin password from the default.
2. **Disable WPS:** Go to **WLAN > WLAN Basic** and set WPS to Disabled. WPS PIN attacks are a documented vulnerability.
3. **Enable WPA2/WPA3 Encryption:** Ensure all SSIDs use WPA2-PSK-AES or WPA2/WPA3 mixed mode.
4. **Disable Remote Management:** Check under **Internet > Remote Management** and ensure this is turned off.
5. **DHCP Static Reservations:** Assign fixed local IPs to critical devices (servers, printers, gaming consoles) for easier port forwarding management.

### Port Forwarding on ZTE H298A

1. Assign a static IP to your target device via **Local Network > DHCP Server > Static DHCP** (bind MAC to fixed IP).
2. Navigate to **Internet > Port Forwarding** (or NAT > Port Mapping).
3. Click **New Entry** or **Add Rule**:
   - **WAN Connection:** Select your active internet connection profile.
   - **Protocol:** TCP, UDP, or Both.
   - **External Port:** The port number(s) accessible from the internet.
   - **Internal Host IP:** The local device IP address.
   - **Internal Port:** The application's local listening port.
4. Click **Apply** to activate the rule.
5. Common ports: Gaming — PS5 (TCP/UDP 3478-3480), Xbox (UDP 88, 3074); Remote Desktop — TCP 3389; HTTP — TCP 80.

### DHCP and LAN Settings

1. Navigate to **Local Network > LAN Settings** to configure the DHCP range.
2. Adjust the IP pool start/end range (default: 192.168.1.2 to 192.168.1.254).
3. Set DNS servers to Cloudflare (1.1.1.1) or Google (8.8.8.8) for improved resolution speeds.
4. Set lease time to 24 hours (86400 seconds) for stable device IP assignments.`,
        resetGuide: `## Factory Reset Guide for ZTE ZXHN H298A

### Soft Reset via Admin Panel

1. Log in to **192.168.1.1** with admin credentials.
2. Navigate to **Maintenance > Factory Reset** or **System > Restore Default Configuration**.
3. Click **Restore** and confirm the action. The router will reboot automatically.

### Hard Reset via Physical Button

1. Ensure the H298A is powered on.
2. Locate the **RESET** pinhole on the side panel.
3. Insert a paperclip and hold for **10 seconds**.
4. Release when the Power LED flickers or turns off.
5. Wait 2 minutes for the reboot to complete.
6. Connect via Ethernet and navigate to **192.168.1.1** with default admin/admin credentials.

### Post-Reset Steps

1. Reconfigure your SSID names and Wi-Fi passwords.
2. Change the admin panel password immediately.
3. Re-apply port forwarding rules.
4. Disable WPS and enable WPA2-PSK-AES on all SSIDs.`,
        faqs: [
          {
            question: "What is the default IP address for ZTE ZXHN H298A?",
            answer: "The default login IP address for the ZTE ZXHN H298A is 192.168.1.1."
          },
          {
            question: "How do I secure my ZTE H298A Wi-Fi network?",
            answer: "Log in to 192.168.1.1, navigate to Local Network > WLAN > WLAN SSID Configuration. Set Security Type to WPA2-PSK-AES, create a strong password, and click Apply. Also disable WPS under WLAN > WLAN Basic."
          },
          {
            question: "Does the ZTE H298A support dual-band Wi-Fi?",
            answer: "Yes, the ZTE ZXHN H298A supports dual-band operations on 2.4GHz and 5GHz. Configure each band separately in the WLAN SSID Configuration menu."
          },
          {
            question: "How do I disable WPS on ZTE H298A?",
            answer: "Navigate to Local Network > WLAN > WLAN Basic. Locate the WPS option and toggle it to Disabled, then click Apply."
          },
          {
            question: "How do I set up port forwarding on ZTE H298A?",
            answer: "Go to Internet > Port Forwarding. First assign a static IP to your device via DHCP Static settings. Then create a port mapping rule with protocol, external port, internal IP, and internal port."
          },
          {
            question: "Can I manually update firmware on ZTE H298A?",
            answer: "Some H298A units support manual firmware uploads via System > Firmware Update. Download official firmware from ZTE's support site only. Many ISP-deployed units are updated automatically via TR-069."
          },
          {
            question: "How do I change the admin password on ZTE H298A?",
            answer: "Navigate to Maintenance > Account or System > User Management. Enter the current password and set a new secure password. Click Apply."
          },
          {
            question: "What should I do if 192.168.1.1 is not loading on H298A?",
            answer: "Verify your Ethernet cable is in a LAN port. Disable VPN clients. Run ipconfig in Command Prompt and confirm your IP is in the 192.168.1.x range. Try clearing browser cache or using a private window."
          },
          {
            question: "Does ZTE H298A support WPA3 security?",
            answer: "WPA3 support depends on the firmware version. Most standard H298A deployments support WPA2-PSK-AES as the strongest option. Check your firmware version and consult ZTE support for WPA3 availability."
          },
          {
            question: "How do I configure DNS servers on ZTE H298A?",
            answer: "Navigate to Local Network > LAN Settings or DHCP Server settings. Enter primary DNS (e.g., 1.1.1.1 for Cloudflare) and secondary DNS (e.g., 8.8.8.8 for Google). Click Apply."
          }
        ],
      },
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
      update: {
        wifiSetupGuide: `## Complete Login & Setup Guide for D-Link DIR-842

### How to Access the DIR-842 Admin Panel

The D-Link DIR-842 AC1200 dual-band router features an intuitive web-based management interface. Follow these steps:

1. **Connect to the Router:** Use an Ethernet cable from your PC to one of the four LAN ports on the DIR-842's rear panel. Alternatively, connect wirelessly using the default SSID (e.g., dlink-XXXX) and password from the Quick Install card included with the router.
2. **Access the Web Interface:** Open any web browser and navigate to **http://192.168.0.1** (or **http://dlinkrouter.local** if mDNS is enabled on your network).
3. **Login with Default Credentials:** Username: **Admin** (capital A is important — it is case-sensitive), Password: **leave blank** (press Enter without typing a password).
4. **Setup Wizard Launch:** On first login, the D-Link Setup Wizard will automatically launch. Follow the on-screen prompts or dismiss it to access manual settings.

### Internet Connection Setup

1. Navigate to **Settings > Internet**.
2. Select your connection type:
   - **Dynamic IP (DHCP):** Used by most cable and fiber ISPs. No credentials needed.
   - **PPPoE:** Used by DSL and some fiber ISPs. Enter your ISP-provided username and password.
   - **Static IP:** Enter the IP address, Subnet Mask, Gateway, and DNS values provided by your ISP.
3. Configure MTU: For PPPoE connections, set MTU to **1492**. For DHCP, leave at **1500**.
4. Click **Save** to apply the internet settings.

### Wireless Configuration — 2.4GHz and 5GHz

1. Navigate to **Settings > Wireless**.
2. **Smart Connect Mode:** If you want a single unified SSID for both bands, enable Smart Connect. D-Link's band steering will direct devices to the optimal frequency automatically.
3. **Separate Band Configuration:** If Smart Connect is disabled, configure each band individually:
   - **2.4GHz SSID:** Set your network name, Security Mode to WPA2-Personal (AES), and enter a Wi-Fi password.
   - **5GHz SSID:** Repeat with a distinct SSID name (e.g., MyHome_5G) for easy band identification.
4. **Channel Settings:**
   - 2.4GHz: Set Channel Width to **20/40MHz**, Channel to **Auto**.
   - 5GHz: Set Channel Width to **80MHz**, Channel to **Auto** (or manually select 149-165 range for less congested 5GHz spectrum).
5. **Transmit Power:** Set to High for maximum range coverage.
6. Click **Save** to apply.

### Guest Zone Configuration

1. Navigate to **Features > Guest Zone**.
2. Enable the guest network for 2.4GHz and/or 5GHz.
3. Set a distinct SSID (e.g., GuestWiFi or VisitorNetwork).
4. Enable **Internet Access Only** and disable **Local Routing**. This isolates guest clients from your private LAN devices.
5. Set security to WPA2-Personal with a simple but secure guest password.
6. Click **Save**.

### Firmware Update Procedure

1. Log in to the admin panel at **192.168.0.1**.
2. Navigate to **Management > Firmware Update** (or **System > Firmware**).
3. Click **Check for New Firmware**. If available, follow the prompts to download and install.
4. Alternatively, visit the D-Link support page for DIR-842, download the latest firmware for your hardware version (e.g., A1, B1), and use the **Manual Firmware Update** option to upload the file.
5. **Important:** Do not power off the router during firmware installation. The process takes 2-5 minutes.

### Security Hardening

1. **Create an Admin Password:** Navigate to **Management > Admin**. Enter your new password and confirm. D-Link routers with blank default passwords are highly vulnerable — set a password immediately.
2. **Disable WPS:** Go to **Settings > Wireless > WPS** and toggle it off.
3. **Enable SPI Firewall:** Under **Features > Firewall**, enable Stateful Packet Inspection.
4. **Disable UPnP:** Navigate to **Features > UPnP** and disable it to prevent unauthorized port mapping by applications.
5. **Disable Remote Management:** Under **Management > Remote Management**, ensure this is turned off.
6. **Update DNS:** Under **Settings > Internet**, set DNS to Cloudflare (1.1.1.1) or Google (8.8.8.8).

### Port Forwarding on DIR-842

1. Assign a static IP to your device. Navigate to **Settings > Network** (or under DHCP settings) to create a static IP reservation.
2. Go to **Features > Port Forwarding**.
3. Click **Add** to create a new rule:
   - **Name:** Give the rule a descriptive name (e.g., PS5_Gaming).
   - **IP Address:** Enter the device's static local IP.
   - **TCP/UDP:** Select the protocol for your application.
   - **Port Start/End:** Enter the external port range to forward.
4. Click **Save** to activate the rule.
5. Verify NAT type using an online port checker after applying rules.

### Parental Controls and Access Scheduling

1. Navigate to **Features > Parental Controls**.
2. Add devices by MAC address to create parental control profiles.
3. Set allowed internet access hours and days for each profile.
4. Enable website filtering to block category-based content (adult, gambling, etc.).
5. Click **Save** to apply all parental control rules.

### Common ISP Defaults for DIR-842

| ISP Region | Connection Type | Notes |
|---|---|---|
| US/Canada | Dynamic IP | DHCP, no credentials |
| UK DSL | PPPoE | Enter ISP credentials |
| Australia NBN | PPPoE | VLAN tag may be needed |
| Middle East | PPPoE | ISP-specific credentials |`,
        resetGuide: `## Factory Reset Guide for D-Link DIR-842

### Soft Reset via Admin Panel

1. Log in to **192.168.0.1** with admin credentials.
2. Navigate to **Management > Reboot** for a soft reboot, or **Management > Factory Default** for a full reset.
3. Click **Restore Factory Default** and confirm.
4. The router will reboot — wait 90 seconds.

### Hard Reset via Physical Button

1. Verify the DIR-842 is powered on (Power LED solid).
2. Locate the **RESET** pinhole on the rear panel.
3. Insert a paperclip and hold for **10 seconds** until the Power LED turns red or amber.
4. Release the button.
5. Wait 60-90 seconds for the reboot to complete.
6. Connect via Ethernet and navigate to **192.168.0.1**. Login with Admin (blank password).

### Post-Reset Checklist

1. **Set admin password** immediately (Management > Admin).
2. Reconfigure your SSID names and Wi-Fi passwords.
3. Disable WPS under Settings > Wireless.
4. Re-apply port forwarding rules.
5. Update firmware to the latest version.`,
        faqs: [
          {
            question: "What is the default login for D-Link DIR-842?",
            answer: "Default login IP: 192.168.0.1. Username: Admin (capital A). Password: leave blank. Set a custom admin password immediately after logging in."
          },
          {
            question: "Why does 192.168.0.1 fail to load for DIR-842?",
            answer: "Ensure your Ethernet cable is in a LAN port (not WAN). Disable VPN clients and check that your IP address is in the 192.168.0.x range via ipconfig."
          },
          {
            question: "Does D-Link DIR-842 support gigabit connections?",
            answer: "Yes, the DIR-842 has four gigabit LAN ports and one gigabit WAN port, supporting high-speed cable and fiber connections up to 1000 Mbps."
          },
          {
            question: "How do I create an admin password on DIR-842?",
            answer: "Go to Management > Admin. Enter your new password and confirm. The router defaults to no password, which is a significant security risk — set a password immediately."
          },
          {
            question: "How do I update firmware on DIR-842?",
            answer: "Navigate to Management > Firmware Update. Click Check for New Firmware or manually upload the firmware file downloaded from D-Link's support site for your hardware version."
          },
          {
            question: "How do I set up port forwarding on DIR-842?",
            answer: "Go to Features > Port Forwarding. Click Add. Enter the rule name, target device IP (assign static first), protocol (TCP/UDP), and port range. Click Save."
          },
          {
            question: "Does D-Link DIR-842 support WPA3?",
            answer: "The DIR-842 supports WPA2-Personal (AES) as its strongest encryption mode in standard firmware. WPA3 is not available on this hardware generation — consider upgrading to a Wi-Fi 6 router for WPA3 support."
          },
          {
            question: "How do I set up the guest network on DIR-842?",
            answer: "Navigate to Features > Guest Zone. Enable the guest network, set a unique SSID, enable Internet Access Only, and disable Local Routing. Set WPA2-Personal security with a separate password."
          },
          {
            question: "How do I disable WPS on DIR-842?",
            answer: "Go to Settings > Wireless. Scroll to the WPS section and toggle it Off. Click Save to disable WPS and protect against PIN brute-force attacks."
          },
          {
            question: "What is the DIR-842 AC1200 speed rating?",
            answer: "The DIR-842 is an AC1200 router providing a combined maximum wireless throughput of 1200 Mbps: 300 Mbps on 2.4GHz (2x2 MIMO) and 867 Mbps on 5GHz (2x2 MIMO)."
          },
          {
            question: "How do I configure parental controls on DIR-842?",
            answer: "Navigate to Features > Parental Controls. Add device MAC addresses, set allowed internet hours, and configure website filtering categories to restrict content access."
          }
        ],
      },
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
      update: {
        wifiSetupGuide: `## Complete Login & Setup Guide for ASUS RT-AX88U

### How to Access the RT-AX88U Admin Panel

The ASUS RT-AX88U (AX6000 Wi-Fi 6 Gaming Router) uses the ASUSWRT firmware, a powerful and feature-rich router operating system. To log in:

1. **Connect to the RT-AX88U:** Use an Ethernet cable from your PC to one of the eight gigabit LAN ports on the rear panel. Alternatively, connect wirelessly to the default SSID printed on the router's bottom label.
2. **Access the Dashboard:** Open a browser and navigate to **192.168.1.1** or **http://router.asus.com**. The ASUSWRT Quick Internet Setup (QIS) wizard loads on first boot.
3. **Login Credentials:** Default username: **admin**. Default password: **admin**. Change both immediately during initial setup.
4. **Initial Setup Wizard:** The QIS wizard will walk through WAN connection type detection, SSID naming, and password creation.

### Internet Connection Configuration

1. The QIS wizard auto-detects your WAN type. If it fails, manually select:
   - **Dynamic IP (DHCP):** For cable or fiber connections without credentials.
   - **PPPoE:** For DSL or fiber requiring ISP username/password.
   - **Static IP:** Enter IP, Subnet Mask, Gateway, and DNS from your ISP.
2. If your ISP requires a specific MAC address (MAC cloning), go to **WAN > Internet Connection** and enable **MAC Address Spoofing**.
3. Set MTU to **1500** for DHCP or **1492** for PPPoE connections.

### Wi-Fi 6 Configuration — ASUSWRT Wireless Settings

Navigate to **Wireless > General** in the left panel:

1. **SSID Configuration:**
   - Set distinct SSIDs for 2.4GHz and 5GHz-1 and 5GHz-2 bands (the RT-AX88U has dual 5GHz capability on compatible firmware).
   - Set Security to **WPA3-Personal** or **WPA2/WPA3** mixed mode for backward compatibility.
   - Enter a strong password (12+ characters with mixed case, numbers, and symbols).
2. **Enable Smart Connect:** Under **Wireless > General**, enable Smart Connect to merge all bands under one SSID with automatic band steering.
3. **Channel Width:**
   - 2.4GHz: Set to 20/40MHz.
   - 5GHz: Set to **160MHz** to enable maximum Wi-Fi 6 throughput.
4. **Control Channel:** Set to Auto for automatic selection of the least congested channel.
5. **Enable 802.11ax Mode:** Under **Advanced Settings**, ensure **802.11ax / Wi-Fi 6** mode is enabled on both bands.
6. **OFDMA:** Enable Orthogonal Frequency Division Multiple Access (OFDMA) — this Wi-Fi 6 feature allows the RT-AX88U to serve multiple devices simultaneously on the same channel, dramatically reducing network congestion.
7. **MU-MIMO:** Enable MU-MIMO (Multi-User MIMO) — the RT-AX88U supports 4x4 MU-MIMO on both 5GHz bands, enabling simultaneous full-speed service to multiple devices.
8. **Beamforming:** Enable under **Advanced Settings** to focus wireless signals toward client devices.
9. **Target Wake Time (TWT):** Enable under **Advanced Settings** to extend battery life of Wi-Fi 6 IoT devices.
10. **TX Burst:** Enable under **Advanced Settings > Professional** for gaming optimization.

### Adaptive QoS — Gaming Optimization

The RT-AX88U's Adaptive QoS is one of its defining features for gaming:

1. Navigate to **General > Adaptive QoS** (or **QoS > Bandwidth Monitor**).
2. Toggle **Enable QoS** to On.
3. Select **Gaming** as the priority profile.
4. In the Device Priority list, add your gaming consoles or gaming PC and drag them to the highest priority position.
5. ASUS Adaptive QoS uses Deep Packet Inspection (DPI) to intelligently classify traffic — gaming packets are given priority bandwidth over video streaming and file downloads, reducing latency spikes during gaming sessions.

### AiMesh Network Setup

The RT-AX88U serves as an excellent AiMesh node controller:

1. Navigate to **AiMesh** in the left panel.
2. Click **Add AiMesh Node** to scan for compatible ASUS routers on the network.
3. Select the discovered node and follow the pairing prompts.
4. Once added, the AiMesh controller manages roaming, band steering, and network topology across all nodes.
5. The RT-AX88U supports **tri-band backhaul** — a dedicated wireless backhaul channel for mesh traffic reduces congestion on client-facing bands.

### AiProtection — Built-in Network Security

1. Navigate to **AiProtection > General**.
2. Enable **Trend Micro AiProtection** — this provides:
   - Malicious site blocking (blocks known C&C servers, phishing sites)
   - Two-way IPS (intrusion prevention for incoming and outgoing threats)
   - Infected device detection (quarantine alerts for compromised clients)
3. Enable **Malicious Sites Blocking** and **Vulnerability Protection** for maximum security.

### ASUS DDNS and VPN Server Setup

1. **DDNS:** Navigate to **WAN > DDNS**. Enable the ASUS DDNS service and register a free hostname (e.g., yourhome.asuscomm.com). This lets you access your home network remotely using a memorable hostname.
2. **VPN Server:** Navigate to **VPN > VPN Server**. Enable OpenVPN or WireGuard server to create a secure tunnel for remote home network access. Export the client configuration file and load it on your devices.

### Firmware Updates

1. Navigate to **Administration > Firmware Upgrade**.
2. Click **Check** to search for available ASUS firmware updates.
3. If available, click **Upload** to install automatically.
4. Alternatively, visit ASUS Support for RT-AX88U, download the latest firmware ZIP file, extract the .w or .trx firmware file, and manually upload it.
5. **Do not power off during update.** The RT-AX88U also supports **scheduled automatic updates** — configure under Firmware Upgrade settings.

### Security Hardening Checklist

1. Change admin username and password (Administration > System).
2. Enable AiProtection (AiProtection > General).
3. Disable WPS (Wireless > WPS).
4. Enable WPA3 or WPA2/WPA3 mixed mode.
5. Update firmware immediately after setup.
6. Disable UPnP (WAN > UPnP) unless required.
7. Enable SPI Firewall (Firewall > General).
8. Disable remote management (Administration > System > Enable Web Access from WAN — set to No).
9. Enable DNS-over-TLS under WAN > Internet Connection > DNS Privacy Protocol.
10. Configure AiProtection's Parental Controls for children's devices.

### Port Forwarding for Gaming

1. Assign a static IP to your console via **LAN > DHCP Server > Manual Assignment** (bind device MAC to fixed IP).
2. Navigate to **WAN > Virtual Server / Port Forwarding**.
3. Click **Add Profile** and enter:
   - **Service Name:** (e.g., PS5_Gaming)
   - **Protocol:** TCP/UDP or Both
   - **External Port Range:** (e.g., 3478-3480)
   - **Internal IP:** (console's static IP)
   - **Internal Port:** (same as external or application-specific)
4. Click **OK** to save.
5. Verify with an open NAT type test on your console.

### ASUS Router Related Links

For ASUS-specific IP management, see the /ips/192-168-50-1 guide if your RT-AX88U uses a 192.168.50.x subnet.`,
        resetGuide: `## Factory Reset Guide for ASUS RT-AX88U

### Soft Reset via ASUSWRT Panel

1. Log in to **192.168.1.1** or **router.asus.com**.
2. Navigate to **Administration > Restore/Save/Upload Setting**.
3. Click **Factory Default** and confirm.
4. The router reboots with factory defaults — wait 3 minutes.

### Hard Reset via Physical Button

1. Ensure RT-AX88U is powered on (Power LED solid white).
2. Locate the **RESET** pinhole on the rear panel.
3. Insert a paperclip and hold for **10 seconds** until the Power LED flashes slowly.
4. Release the button.
5. Wait 2-3 minutes for the NVRAM wipe and reboot.
6. Navigate to **192.168.1.1** or **router.asus.com** to run Quick Internet Setup.

### WPS Button Reset Method (Alternative)

1. Power off the RT-AX88U.
2. Press and hold the **WPS button** on the rear panel.
3. While holding WPS, power the router back on.
4. Continue holding WPS until the Power LED flashes rapidly.
5. Release — the router will clear NVRAM and reboot with factory defaults.`,
        faqs: [
          {
            question: "What is the default IP address for ASUS RT-AX88U?",
            answer: "The default login IP address is 192.168.1.1. You can also access the admin panel via http://router.asus.com when connected to the router's network."
          },
          {
            question: "What are the default login credentials for RT-AX88U?",
            answer: "Default username: admin. Default password: admin. Change both during the initial Quick Internet Setup wizard to secure your admin panel."
          },
          {
            question: "Does the ASUS RT-AX88U support AiMesh?",
            answer: "Yes, the RT-AX88U is an excellent AiMesh controller. Connect compatible ASUS AiMesh nodes to build a seamless whole-home mesh Wi-Fi network with automatic roaming."
          },
          {
            question: "How do I configure QoS for gaming on RT-AX88U?",
            answer: "Navigate to General > Adaptive QoS. Enable QoS and select Gaming as the priority mode. Add your gaming devices to the priority list. ASUS uses Deep Packet Inspection to identify and prioritize gaming traffic."
          },
          {
            question: "How do I enable Wi-Fi 6 on the RT-AX88U?",
            answer: "Navigate to Wireless > General. Ensure 802.11ax mode is enabled. Enable OFDMA, MU-MIMO, and set 5GHz channel width to 160MHz for maximum Wi-Fi 6 performance."
          },
          {
            question: "How do I set up a VPN server on RT-AX88U?",
            answer: "Go to VPN > VPN Server. Enable OpenVPN or WireGuard. Export the client configuration file and import it into your VPN client application on remote devices for secure home network access."
          },
          {
            question: "How do I update firmware on ASUS RT-AX88U?",
            answer: "Navigate to Administration > Firmware Upgrade. Click Check to search for updates. Download and install automatically, or manually upload the firmware file from ASUS Support for RT-AX88U."
          },
          {
            question: "What is AiProtection on ASUS RT-AX88U?",
            answer: "AiProtection (powered by Trend Micro) is a built-in security suite offering malicious site blocking, two-way intrusion prevention, and infected device quarantine. Enable it under AiProtection > General."
          },
          {
            question: "How do I set up port forwarding on RT-AX88U?",
            answer: "Assign a static IP via LAN > DHCP Server. Then go to WAN > Virtual Server / Port Forwarding. Add a profile with service name, protocol, external port range, and internal device IP."
          },
          {
            question: "Does ASUS RT-AX88U support WPA3?",
            answer: "Yes, the RT-AX88U supports WPA3-Personal and WPA2/WPA3 mixed mode. Configure under Wireless > General > Authentication Method."
          },
          {
            question: "How do I disable WPS on ASUS RT-AX88U?",
            answer: "Navigate to Wireless > WPS. Toggle WPS to Off and click Apply. Disabling WPS prevents PIN brute-force attacks against your network."
          },
          {
            question: "What is the difference between 192.168.1.1 and router.asus.com for RT-AX88U?",
            answer: "Both addresses access the same ASUSWRT admin panel. 192.168.1.1 is the direct IP address, while router.asus.com is a local hostname that resolves to the router's IP. Use either interchangeably."
          }
        ],
      },
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
      update: {
        brandId: huawei.id,
        name: "AX3 (WS7200)",
        slug: "huawei-ax3",
        loginIps: ["192.168.3.1", "192.168.3.1"],
        defaultUsername: "admin",
        defaultPassword: "admin",
        wifiSetupGuide: `## How to Set Up WiFi on Huawei AX3 (WS7200)\n\n1. Connect your PC to the Huawei AX3 via Ethernet or join the default Wi-Fi network on the bottom label\n2. Open a browser and go to **192.168.3.1**\n3. Log in with username: **admin** and password: **admin** (or your custom password)\n4. The Huawei Smart Home App provides guided setup — download it and follow the Quick Setup\n5. Under Settings > Wi-Fi, configure your 2.4GHz and 5GHz SSIDs and passwords. If you need to update WiFi credentials later, go to [change-wifi-password](file:///change-wifi-password).\n6. Enable HarmonyOS Connect (for Huawei device ecosystem integration)\n7. Set up One Wi-Fi (Smart Roaming) to allow seamless band steering.\n\n### Huawei AX3 WiFi 6 Features\nThe Huawei AX3 features true WiFi 6 (802.11ax) tech with several key performance improvements:\n- **OFDMA (Orthogonal Frequency Division Multiple Access):** Allows multiple devices to share a single channel simultaneously, significantly reducing latency and queuing.\n- **MU-MIMO (Multi-User, Multiple-Input, Multiple-Output):** Supports sending data streams to up to 4 devices simultaneously, maintaining high throughput.\n- **160 MHz Channel Width:** Doubles the channel bandwidth compared to Wi-Fi 5 routers, enabling speeds up to 2402 Mbps on the 5GHz band for compatible devices.\n\n### Optimize AX3 For Gaming\nTo minimize ping spikes and lag on the AX3, apply these gaming optimizations:\n1. Access the router dashboard and navigate to **More Services** -> **Wi-Fi Settings** -> **Wi-Fi Advanced Settings**.\n2. Change the 5GHz channel bandwidth to **160 MHz** for maximum throughput.\n3. Enable **Wi-Fi Game Acceleration** (deep integration for Huawei phones, and generic QoS queue priority for online consoles).\n4. Configure manual high-performance DNS servers in the LAN settings. Check our guide on [best-router-for-gaming](file:///best-router-for-gaming) for more general optimizations.\n\n### Optimize AX3 For Fiber\nFor gigabit fiber plans, configure these WAN and NAT parameters:\n1. Go to **Connect to Internet** on the top menu.\n2. For most GPON fiber connections, set connection type to **Dynamic IP (DHCP)**. If your fiber provider uses authentication, select **PPPoE** and input your account details.\n3. Go to **More Services** -> **System Settings** -> **System Settings** and ensure that **Hardware NAT Acceleration** is active. This offloads packet forwarding from the CPU to the hardware switch chip, ensuring full gigabit speeds. More advanced options can be checked in [router-settings](file:///router-settings).`,
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
          {
            question: "Does Huawei AX3 support true WiFi 6 speeds?",
            answer: "Yes, the Huawei AX3 is a true Wi-Fi 6 router capable of speeds up to 3000 Mbps (2402 Mbps on 5GHz and 574 Mbps on 2.4GHz) when using 160MHz channels with compatible client adapters.",
          },
          {
            question: "How do I enable 160MHz bandwidth channel on Huawei AX3?",
            answer: "Log in, navigate to Wi-Fi Settings > Wi-Fi Advanced Settings, select the 5GHz network, and set Channel Bandwidth to 20/40/80/160 MHz (Auto) or lock it to 160 MHz for maximum speed.",
          },
          {
            question: "Can I use Huawei AX3 in a mesh setup with other Huawei routers?",
            answer: "Yes, Huawei AX3 supports HarmonyOS Connect (Link+). You can press the physical 'H' button on the AX3 and secondary Huawei routers to automatically sync settings and create a seamless mesh network.",
          },
          {
            question: "What is the default IP address of the Huawei AX3 router?",
            answer: "The default IP address is 192.168.3.1. Ensure your device is connected to the AX3 and enter 192.168.3.1 in any browser address bar to access the console.",
          },
          {
            question: "How do I enable game acceleration mode on AX3?",
            answer: "Go to the router management page, select More Services > Wi-Fi Settings > Wi-Fi Advanced Settings, and turn on the Game Acceleration toggle to prioritize gaming packets.",
          },
        ],
        metaTitle: "Huawei AX3 (WS7200) Login — Default IP 192.168.3.1 & Password",
        metaDescription: "Access Huawei AX3 router admin panel at 192.168.3.1. Default credentials: admin/admin. Wi-Fi 6 AX3000 router setup guide, LED meanings, and factory reset instructions.",
        diagnosticCategory: "WIFI",
      },
      create: {
        brandId: huawei.id,
        name: "AX3 (WS7200)",
        slug: "huawei-ax3",
        loginIps: ["192.168.3.1", "192.168.3.1"],
        defaultUsername: "admin",
        defaultPassword: "admin",
        wifiSetupGuide: `## How to Set Up WiFi on Huawei AX3 (WS7200)\n\n1. Connect your PC to the Huawei AX3 via Ethernet or join the default Wi-Fi network on the bottom label\n2. Open a browser and go to **192.168.3.1**\n3. Log in with username: **admin** and password: **admin** (or your custom password)\n4. The Huawei Smart Home App provides guided setup — download it and follow the Quick Setup\n5. Under Settings > Wi-Fi, configure your 2.4GHz and 5GHz SSIDs and passwords. If you need to update WiFi credentials later, go to [change-wifi-password](file:///change-wifi-password).\n6. Enable HarmonyOS Connect (for Huawei device ecosystem integration)\n7. Set up One Wi-Fi (Smart Roaming) to allow seamless band steering.\n\n### Huawei AX3 WiFi 6 Features\nThe Huawei AX3 features true WiFi 6 (802.11ax) tech with several key performance improvements:\n- **OFDMA (Orthogonal Frequency Division Multiple Access):** Allows multiple devices to share a single channel simultaneously, significantly reducing latency and queuing.\n- **MU-MIMO (Multi-User, Multiple-Input, Multiple-Output):** Supports sending data streams to up to 4 devices simultaneously, maintaining high throughput.\n- **160 MHz Channel Width:** Doubles the channel bandwidth compared to Wi-Fi 5 routers, enabling speeds up to 2402 Mbps on the 5GHz band for compatible devices.\n\n### Optimize AX3 For Gaming\nTo minimize ping spikes and lag on the AX3, apply these gaming optimizations:\n1. Access the router dashboard and navigate to **More Services** -> **Wi-Fi Settings** -> **Wi-Fi Advanced Settings**.\n2. Change the 5GHz channel bandwidth to **160 MHz** for maximum throughput.\n3. Enable **Wi-Fi Game Acceleration** (deep integration for Huawei phones, and generic QoS queue priority for online consoles).\n4. Configure manual high-performance DNS servers in the LAN settings. Check our guide on [best-router-for-gaming](file:///best-router-for-gaming) for more general optimizations.\n\n### Optimize AX3 For Fiber\nFor gigabit fiber plans, configure these WAN and NAT parameters:\n1. Go to **Connect to Internet** on the top menu.\n2. For most GPON fiber connections, set connection type to **Dynamic IP (DHCP)**. If your fiber provider uses authentication, select **PPPoE** and input your account details.\n3. Go to **More Services** -> **System Settings** -> **System Settings** and ensure that **Hardware NAT Acceleration** is active. This offloads packet forwarding from the CPU to the hardware switch chip, ensuring full gigabit speeds. More advanced options can be checked in [router-settings](file:///router-settings).`,
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
          {
            question: "Does Huawei AX3 support true WiFi 6 speeds?",
            answer: "Yes, the Huawei AX3 is a true Wi-Fi 6 router capable of speeds up to 3000 Mbps (2402 Mbps on 5GHz and 574 Mbps on 2.4GHz) when using 160MHz channels with compatible client adapters.",
          },
          {
            question: "How do I enable 160MHz bandwidth channel on Huawei AX3?",
            answer: "Log in, navigate to Wi-Fi Settings > Wi-Fi Advanced Settings, select the 5GHz network, and set Channel Bandwidth to 20/40/80/160 MHz (Auto) or lock it to 160 MHz for maximum speed.",
          },
          {
            question: "Can I use Huawei AX3 in a mesh setup with other Huawei routers?",
            answer: "Yes, Huawei AX3 supports HarmonyOS Connect (Link+). You can press the physical 'H' button on the AX3 and secondary Huawei routers to automatically sync settings and create a seamless mesh network.",
          },
          {
            question: "What is the default IP address of the Huawei AX3 router?",
            answer: "The default IP address is 192.168.3.1. Ensure your device is connected to the AX3 and enter 192.168.3.1 in any browser address bar to access the console.",
          },
          {
            question: "How do I enable game acceleration mode on AX3?",
            answer: "Go to the router management page, select More Services > Wi-Fi Settings > Wi-Fi Advanced Settings, and turn on the Game Acceleration toggle to prioritize gaming packets.",
          },
        ],
        metaTitle: "Huawei AX3 (WS7200) Login — Default IP 192.168.3.1 & Password",
        metaDescription: "Access Huawei AX3 router admin panel at 192.168.3.1. Default credentials: admin/admin. Wi-Fi 6 AX3000 router setup guide, LED meanings, and factory reset instructions.",
        diagnosticCategory: "WIFI",
      },
    }),
    // Huawei HG8145V5 Setup Page
    prisma.routerModel.upsert({
      where: { slug: "huawei-hg8145v5" },
      update: {
        brandId: huawei.id,
        name: "HG8145V5",
        slug: "huawei-hg8145v5",
        loginIps: ["192.168.100.1"],
        defaultUsername: "telecomadmin",
        defaultPassword: "admintelecom",
        wifiSetupGuide: `# Huawei HG8145V5 WiFi Setup Guide\n\n### Step 1: Connect to the Device\n1. **Connect your computer** to the Huawei HG8145V5 using an Ethernet cable or connect to its default WiFi network if available.\n\n### Step 2: Access the Admin Panel\n1. Open a web browser.\n2. Enter the default IP address: [192.168.100.1](file:///ips/192-168-100-1) (which is the standard gateway for Huawei ONTs).\n3. Log in using the default credentials.\n\n### HG8145V5 Default Credentials\nTo modify settings, you need the administrator login. Here is the credential matrix:\n\n| Username | Password | ISP / Region Access Level |\n| --- | --- | --- |\n| \`telecomadmin\` | \`admintelecom\` | Global Full Administrator |\n| \`root\` | \`admin\` | Standard User / Read-Only |\n| \`admin\` | \`admin\` | Standard User (secondary) |\n| *Custom* | *Serial Number* | Custom ISP provisioned logins |\n\nFor full wireless control and WAN setups, log in using \`telecomadmin\`. Standard logins may block access to VLAN and WAN configurations.\n\n### Step 3: Configure Wireless Settings\n1. Navigate to **WLAN** -> **WLAN Configuration** in the top menu.\n2. Enable the Wireless option for 2.4GHz and 5GHz.\n3. Configure the following settings:\n   - **SSID Name:** Enter your desired WiFi network name.\n   - **Security Mode:** Set to \`WPA2-PSK\` or \`WPA2/WPA3-PSK\` hybrid.\n   - **Pre-Shared Key:** Enter your secure WiFi password.\n4. Click **Apply** to save the changes. If you need to change your login credentials, visit the [router-password](file:///router-password) settings.\n\n### Common ISP Configurations\nHuawei HG8145V5 is a GPON Optical Network Terminal (ONT). Standard fiber setup details:\n- **GPON Authentication:** Auths via LOID (Logical ONT Identifier) or SN (Serial Number) supplied by your fiber provider.\n- **PPPoE WAN Interface:** Under WAN configuration, select \`PPPoE\` WAN type, enter your ISP username/password, and bind it to the relevant VLAN ID.\n- **VLAN Tagging:** Most fiber providers require tagging (e.g., VLAN ID 10 or 20) for internet traffic.\n- **IPTV Configuration:** Set up a secondary WAN interface in bridge mode tagged with the IPTV VLAN ID and bind it to a specific LAN port.\n\n### Troubleshooting HG8145V5\n- **LOS Light Blinking Red:** Loss of Optical Signal. Inspect the fiber optic cable for sharp bends or breaks. Contact your ISP if line levels fall below -27 dBm.\n- **PON Light Blinking Green:** The ONT is trying to authenticate with the OLT at the central office. Wait for it to turn solid green.\n- **Internet Not Working:** Ensure the WAN interface displays a valid IP. If connection parameters are lost, you might need to perform a [router-reset](file:///router-reset).\n- **WiFi Not Broadcasting:** Ensure WLAN is active in the interface and the physical Wi-Fi button on the ONT side panel is not toggled off.`,
        resetGuide: `# Huawei HG8145V5 Factory Reset Guide\n\n### Step 1: Locate Reset Button\n1. Find the **Reset** button on the back of the Huawei HG8145V5 device.\n\n### Step 2: Perform the Reset\n1. Using a pin or paperclip, press and hold the **Reset** button for **10 seconds** (until the power LED starts blinking).\n\n### Step 3: Wait for Restart\n1. Release the button and wait for the device to reboot. This may take up to **2 minutes**.\n\n### Step 4: Access Admin Panel\n1. Once reset, the default IP will be [192.168.100.1](file:///ips/192-168-100-1).\n2. Use default credentials to log in:\n   - **Username:** \`telecomadmin\`\n   - **Password:** \`admintelecom\` (or ISP provided passwords).\n\n*Note: Factory reset will revert all settings to factory defaults. Backup important configurations beforehand.*`,
        faqs: [
          {
            question: "What is the default access IP for Huawei HG8145V5?",
            answer: "The default login IP address for the Huawei HG8145V5 GPON terminal is 192.168.100.1. Open your browser and navigate to http://192.168.100.1 to open the admin panel.",
          },
          {
            question: "How do I change the default admin password?",
            answer: "Once logged in, navigate to System Tools > Modify Login Password. Enter your current password and set a new strong administrator password to prevent unauthorized config modifications.",
          },
          {
            question: "What does a blinking red LOS light mean on HG8145V5?",
            answer: "A blinking red LOS (Loss of Signal) light indicates that the ONT is not receiving an optical signal from the fiber cable. Check the green connector on the bottom, avoid bending the cable, and call your ISP to test line signals.",
          },
          {
            question: "How do I configure bridge mode on this Huawei ONT?",
            answer: "Log in as telecomadmin, go to WAN > WAN Configuration, create or modify the WAN interface, set WAN Mode to Bridge, configure the VLAN ID, and bind it to the LAN port connected to your external router.",
          },
          {
            question: "Can I set up a guest network on the HG8145V5?",
            answer: "Yes. Log into the gateway, go to WLAN > WLAN Configuration, enable SSID2 or SSID3, name it for your guests, and configure a distinct security key to separate guest traffic from your main network.",
          },
        ],
        metaTitle: "Huawei HG8145V5 WiFi Setup & Configuration",
        metaDescription: "Learn how to configure your Huawei HG8145V5 ONT router, default credentials, ISP configuration settings, and wireless troubleshooting.",
        diagnosticCategory: "WIFI",
      },
      create: {
        brandId: huawei.id,
        name: "HG8145V5",
        slug: "huawei-hg8145v5",
        loginIps: ["192.168.100.1"],
        defaultUsername: "telecomadmin",
        defaultPassword: "admintelecom",
        wifiSetupGuide: `# Huawei HG8145V5 WiFi Setup Guide\n\n### Step 1: Connect to the Device\n1. **Connect your computer** to the Huawei HG8145V5 using an Ethernet cable or connect to its default WiFi network if available.\n\n### Step 2: Access the Admin Panel\n1. Open a web browser.\n2. Enter the default IP address: [192.168.100.1](file:///ips/192-168-100-1) (which is the standard gateway for Huawei ONTs).\n3. Log in using the default credentials.\n\n### HG8145V5 Default Credentials\nTo modify settings, you need the administrator login. Here is the credential matrix:\n\n| Username | Password | ISP / Region Access Level |\n| --- | --- | --- |\n| \`telecomadmin\` | \`admintelecom\` | Global Full Administrator |\n| \`root\` | \`admin\` | Standard User / Read-Only |\n| \`admin\` | \`admin\` | Standard User (secondary) |\n| *Custom* | *Serial Number* | Custom ISP provisioned logins |\n\nFor full wireless control and WAN setups, log in using \`telecomadmin\`. Standard logins may block access to VLAN and WAN configurations.\n\n### Step 3: Configure Wireless Settings\n1. Navigate to **WLAN** -> **WLAN Configuration** in the top menu.\n2. Enable the Wireless option for 2.4GHz and 5GHz.\n3. Configure the following settings:\n   - **SSID Name:** Enter your desired WiFi network name.\n   - **Security Mode:** Set to \`WPA2-PSK\` or \`WPA2/WPA3-PSK\` hybrid.\n   - **Pre-Shared Key:** Enter your secure WiFi password.\n4. Click **Apply** to save the changes. If you need to change your login credentials, visit the [router-password](file:///router-password) settings.\n\n### Common ISP Configurations\nHuawei HG8145V5 is a GPON Optical Network Terminal (ONT). Standard fiber setup details:\n- **GPON Authentication:** Auths via LOID (Logical ONT Identifier) or SN (Serial Number) supplied by your fiber provider.\n- **PPPoE WAN Interface:** Under WAN configuration, select \`PPPoE\` WAN type, enter your ISP username/password, and bind it to the relevant VLAN ID.\n- **VLAN Tagging:** Most fiber providers require tagging (e.g., VLAN ID 10 or 20) for internet traffic.\n- **IPTV Configuration:** Set up a secondary WAN interface in bridge mode tagged with the IPTV VLAN ID and bind it to a specific LAN port.\n\n### Troubleshooting HG8145V5\n- **LOS Light Blinking Red:** Loss of Optical Signal. Inspect the fiber optic cable for sharp bends or breaks. Contact your ISP if line levels fall below -27 dBm.\n- **PON Light Blinking Green:** The ONT is trying to authenticate with the OLT at the central office. Wait for it to turn solid green.\n- **Internet Not Working:** Ensure the WAN interface displays a valid IP. If connection parameters are lost, you might need to perform a [router-reset](file:///router-reset).\n- **WiFi Not Broadcasting:** Ensure WLAN is active in the interface and the physical Wi-Fi button on the ONT side panel is not toggled off.`,
        resetGuide: `# Huawei HG8145V5 Factory Reset Guide\n\n### Step 1: Locate Reset Button\n1. Find the **Reset** button on the back of the Huawei HG8145V5 device.\n\n### Step 2: Perform the Reset\n1. Using a pin or paperclip, press and hold the **Reset** button for **10 seconds** (until the power LED starts blinking).\n\n### Step 3: Wait for Restart\n1. Release the button and wait for the device to reboot. This may take up to **2 minutes**.\n\n### Step 4: Access Admin Panel\n1. Once reset, the default IP will be [192.168.100.1](file:///ips/192-168-100-1).\n2. Use default credentials to log in:\n   - **Username:** \`telecomadmin\`\n   - **Password:** \`admintelecom\` (or ISP provided passwords).\n\n*Note: Factory reset will revert all settings to factory defaults. Backup important configurations beforehand.*`,
        faqs: [
          {
            question: "What is the default access IP for Huawei HG8145V5?",
            answer: "The default login IP address for the Huawei HG8145V5 GPON terminal is 192.168.100.1. Open your browser and navigate to http://192.168.100.1 to open the admin panel.",
          },
          {
            question: "How do I change the default admin password?",
            answer: "Once logged in, navigate to System Tools > Modify Login Password. Enter your current password and set a new strong administrator password to prevent unauthorized config modifications.",
          },
          {
            question: "What does a blinking red LOS light mean on HG8145V5?",
            answer: "A blinking red LOS (Loss of Signal) light indicates that the ONT is not receiving an optical signal from the fiber cable. Check the green connector on the bottom, avoid bending the cable, and call your ISP to test line signals.",
          },
          {
            question: "How do I configure bridge mode on this Huawei ONT?",
            answer: "Log in as telecomadmin, go to WAN > WAN Configuration, create or modify the WAN interface, set WAN Mode to Bridge, configure the VLAN ID, and bind it to the LAN port connected to your external router.",
          },
          {
            question: "Can I set up a guest network on the HG8145V5?",
            answer: "Yes. Log into the gateway, go to WLAN > WLAN Configuration, enable SSID2 or SSID3, name it for your guests, and configure a distinct security key to separate guest traffic from your main network.",
          },
        ],
        metaTitle: "Huawei HG8145V5 WiFi Setup & Configuration",
        metaDescription: "Learn how to configure your Huawei HG8145V5 ONT router, default credentials, ISP configuration settings, and wireless troubleshooting.",
        diagnosticCategory: "WIFI",
      },
    }),
  ]);

  console.log(`✅ Created ${models.length} router models`);

  // ---- IP Addresses ----
  const ips = await Promise.all([
    prisma.ipAddress.upsert({
      where: { address: "192.168.1.1" },
      update: {
        slug: ip_192_168_1_1.slug,
        commonBrands: ip_192_168_1_1.commonBrands,
        description: ip_192_168_1_1.description,
        loginGuide: ip_192_168_1_1.loginGuide,
        faqs: ip_192_168_1_1.faqs,
        metaTitle: ip_192_168_1_1.metaTitle,
        metaDescription: ip_192_168_1_1.metaDescription,
      },
      create: {
        address: "192.168.1.1",
        slug: ip_192_168_1_1.slug,
        commonBrands: ip_192_168_1_1.commonBrands,
        description: ip_192_168_1_1.description,
        loginGuide: ip_192_168_1_1.loginGuide,
        faqs: ip_192_168_1_1.faqs,
        metaTitle: ip_192_168_1_1.metaTitle,
        metaDescription: ip_192_168_1_1.metaDescription,
      },
    }),
    prisma.ipAddress.upsert({
      where: { address: "192.168.0.1" },
      update: {
        slug: ip_192_168_0_1.slug,
        commonBrands: ip_192_168_0_1.commonBrands,
        description: ip_192_168_0_1.description,
        loginGuide: ip_192_168_0_1.loginGuide,
        faqs: ip_192_168_0_1.faqs,
        metaTitle: ip_192_168_0_1.metaTitle,
        metaDescription: ip_192_168_0_1.metaDescription,
      },
      create: {
        address: "192.168.0.1",
        slug: ip_192_168_0_1.slug,
        commonBrands: ip_192_168_0_1.commonBrands,
        description: ip_192_168_0_1.description,
        loginGuide: ip_192_168_0_1.loginGuide,
        faqs: ip_192_168_0_1.faqs,
        metaTitle: ip_192_168_0_1.metaTitle,
        metaDescription: ip_192_168_0_1.metaDescription,
      },
    }),
    prisma.ipAddress.upsert({
      where: { address: "192.168.8.1" },
      update: {
        slug: ip_192_168_8_1.slug,
        commonBrands: ip_192_168_8_1.commonBrands,
        description: ip_192_168_8_1.description,
        loginGuide: ip_192_168_8_1.loginGuide,
        faqs: ip_192_168_8_1.faqs,
        metaTitle: ip_192_168_8_1.metaTitle,
        metaDescription: ip_192_168_8_1.metaDescription,
      },
      create: {
        address: "192.168.8.1",
        slug: ip_192_168_8_1.slug,
        commonBrands: ip_192_168_8_1.commonBrands,
        description: ip_192_168_8_1.description,
        loginGuide: ip_192_168_8_1.loginGuide,
        faqs: ip_192_168_8_1.faqs,
        metaTitle: ip_192_168_8_1.metaTitle,
        metaDescription: ip_192_168_8_1.metaDescription,
      },
    }),
    prisma.ipAddress.upsert({
      where: { address: "192.168.100.1" },
      update: {
        slug: ip_192_168_100_1.slug,
        commonBrands: ip_192_168_100_1.commonBrands,
        description: ip_192_168_100_1.description,
        loginGuide: ip_192_168_100_1.loginGuide,
        faqs: ip_192_168_100_1.faqs,
        metaTitle: ip_192_168_100_1.metaTitle,
        metaDescription: ip_192_168_100_1.metaDescription,
      },
      create: {
        address: "192.168.100.1",
        slug: ip_192_168_100_1.slug,
        commonBrands: ip_192_168_100_1.commonBrands,
        description: ip_192_168_100_1.description,
        loginGuide: ip_192_168_100_1.loginGuide,
        faqs: ip_192_168_100_1.faqs,
        metaTitle: ip_192_168_100_1.metaTitle,
        metaDescription: ip_192_168_100_1.metaDescription,
      },
    }),
  ]);

  console.log(`✅ Created ${ips.length} IP address pages`);

  const wifiConnectedNoInternetContent = `## WiFi Connected But No Internet Access: Diagnostic Guide

Connecting to a Wi-Fi access point successfully only to find you cannot load web pages is a common networking issue. This problem indicates that while the local wireless link between your client device and the router access point is active, the router is unable to communicate with the broader internet, or there is an configuration mismatch blocking IP routing.

To troubleshoot this issue, it is helpful to understand the boundary between your local network (LAN) and the public network (WAN). The local connection to the router does not guarantee an active link to your ISP.

### LAN vs. WAN Boundaries and the OSI Model
Your local area network (LAN) consists of your devices connected to the router via Wi-Fi or Ethernet. This operates primarily at Layer 1 (Physical) and Layer 2 (Data Link) of the Open Systems Interconnection (OSI) model. When your device connects to the Wi-Fi radio, it establishes a physical and data-link connection (verifying WPA2/WPA3 security keys and associating MAC addresses).

The wide area network (WAN) is the network interface connecting your router to the Internet Service Provider (ISP) and the rest of the web, operating at Layer 3 (Network). A "Connected, No Internet" status means the Layer 2 LAN connection is functioning perfectly (your device can speak to the router), but the Layer 3 path between the router and the WAN is broken, or your device has been assigned an invalid routing profile that blocks it from accessing the WAN gateway.

### DHCP Lease Conflicts, the DORA Handshake, and APIPA Configuration
A frequent cause of local network routing blocks is a conflict in Dynamic Host Configuration Protocol (DHCP) lease allocations. The DHCP process follows a four-step handshake known as DORA:
1. **Discover:** The client broadcasts a request looking for a DHCP server on the local link.
2. **Offer:** The DHCP server (your router) responds with an available IP address, subnet mask, default gateway, and DNS servers.
3. **Request:** The client requests the offered IP address.
4. **Acknowledge:** The server confirms the lease and registers the client's MAC address.

If two devices are assigned the same local IP address, or if a device's network configuration is stale, the router cannot route public traffic to it. Furthermore, if your device fails to receive any IP configuration from the router's DHCP server, it will self-assign an Automatic Private IP Address (APIPA) in the range **169.254.0.1** to **169.254.255.254**. An APIPA address indicates a complete breakdown in communication with the router's DHCP service. You must renew your DHCP lease or manually bind a static IP address within the router's active subnet mask (usually 255.255.255.0).

### WAN Interface Drop Symptoms & Hardware Diagnostics
If multiple devices on your network show the "No Internet" status, the issue is likely at the router's WAN interface or modem level. Check the physical connections:
1. **Modem Status Lights:** Look at the LEDs on your broadband modem. The "Online", "Sync", or "WAN" indicator must be solid green or blue. If it is blinking amber, red, or turned off, the modem has lost its connection to the ISP.
2. **Fiber ONT Optical Power Levels:** If you have a fiber-to-the-home (FTTH) setup, inspect the Optical Network Terminal (ONT). A red "LOS" (Loss of Signal) light indicates that the optical fiber is bent, broken, or receiving insufficient light levels (typically below -27 dBm).
3. **WAN Ethernet Cables:** Ensure the cable connecting the modem's LAN port to the router's WAN port is a high-quality Category 5e (Cat5e) or Category 6 (Cat6) copper patch cable. Damaged RJ45 clips can cause intermittent WAN port link drops.

### Adware, VPN, and Proxy Conflicts
Security software and virtual private networks (VPNs) create virtual network adapters and edit your system's routing tables. If a VPN tunnel disconnects abruptly or its "Kill Switch" engages, it will block all traffic outside the secure tunnel, leading to a "Connected, No Internet" state. Similarly, misconfigured proxy servers, third-party firewalls, or adware can inject themselves into the TCP/IP stack, preventing standard HTTP/HTTPS traffic from reaching the default gateway.

---

## Section 1: What Does "WiFi Connected But No Internet" Mean?

The message "WiFi Connected, No Internet Access" or the yellow warning triangle on your network icon means your operating system has detected that while your device is connected to the local Wi-Fi network, it cannot reach the internet. Technically, your device passed the local connection phase but failed the internet reachability check.

Modern operating systems run a background internet connectivity probe to verify network status:
- **Windows NCSI (Network Connectivity Status Indicator):** Windows attempts to download a small text file from http://www.msftconnecttest.com/connecttest.txt and checks if it contains the text "Microsoft Connect Test". It also performs a DNS resolution lookup for dns.msftncsi.com, which should return the IP address 131.107.255.255. If either check fails, the system displays the yellow warning triangle.
- **Android Captive Portal Detection:** Android sends an HTTP GET request to http://connectivitycheck.gstatic.com/generate_204. If it receives an HTTP status code 204 (No Content), it knows the connection is fully open. If it receives a redirect or an HTTP 200, it flags the network as having a captive portal (requiring login) or redirects to a portal login page. If the request fails entirely, it shows a cross next to the Wi-Fi icon.
- **Apple iOS/macOS Captive Portal Assistant:** Apple devices request a page from http://captive.apple.com/hotspot-detect.html expecting a specific signature. If it is blocked or redirected, Apple launches the Captive Portal screen.

This does not necessarily mean your router is broken. It could mean:
- Your ISP is experiencing an outage in your area
- Your router's WAN configuration is incorrect
- DNS servers are failing to resolve hostnames
- Your device has an APIPA address (169.254.x.x) instead of a valid LAN IP
- A firewall, VPN, or antivirus is intercepting all outbound connections
- Your router's NAT (Network Address Translation) table has become corrupted

---

## Section 2: Most Common Causes

### ISP Outage and GPON Line Issues
Your Internet Service Provider may be experiencing a partial or total network outage in your area. This is one of the most common reasons multiple devices on your network all lose internet simultaneously while the Wi-Fi radio still functions normally. Outages can occur due to physical fiber cuts, upstream routing changes, power failures at local distribution cabinets, or maintenance on your provider's Gigabit Passive Optical Network (GPON) splitters. GPON splitters divide a single optical feed from the OLT (Optical Line Terminal) at the central office into up to 64 individual fiber runs, meaning any hardware issue at this critical splitting node affects dozens of households simultaneously. Check your ISP's status page, Twitter feed, or use a service like Downdetector to confirm whether a regional outage is active.

### Router Failure or Firmware Crash
Routers run embedded operating systems that can crash or deadlock. A router experiencing a memory overflow, firmware exception, or overheating condition may continue to broadcast Wi-Fi SSIDs and respond to local ARP requests while failing to process any WAN routing tasks. In particular, the NAT connection tracking table (conntrack) has a finite size. If torrent clients or smart home appliances open thousands of concurrent connections, the conntrack table fills up, blocking any new outbound connections. A factory reset or firmware update often resolves this.

### DNS Issues
The Domain Name System is the backbone of all internet navigation. When your DNS resolver fails — whether because your ISP's name servers are down, your manually configured DNS entries are incorrect, or your router's internal DNS forwarder has crashed — all hostnames (google.com, youtube.com, etc.) fail to resolve. Switching to public DNS (Cloudflare 1.1.1.1 or Google 8.8.8.8) bypasses this layer entirely.

### DHCP Issues
Your router assigns local IP addresses via DHCP. If the DHCP server leases run out (too many devices competing for a small DHCP pool), if lease records become corrupted, or if the DHCP daemon on your router crashes, your device will fail to receive a valid IP address. You will see addresses beginning with 169.254.x.x (APIPA range), indicating your device gave up waiting and self-assigned an address that cannot route beyond your local link.

### Gateway Problems
The default gateway is the router's IP address that all traffic is forwarded through. If your device's route table does not have a valid default gateway entry, or if the gateway IP is unreachable, all external traffic fails immediately. This can happen after a network adapter driver update, a VPN software installation, or a Windows update that corrupts the routing table.

### VPN Conflicts
VPN software creates virtual network adapters and inserts custom routing rules that can override your physical network adapter's default gateway. If the VPN fails mid-session or its kill-switch activates, all internet traffic is blocked by design. Disabling the VPN temporarily is the fastest diagnostic test.

### Firewall Conflicts
Third-party firewall software or Windows Defender Firewall with overly aggressive rules can block all outbound TCP/UDP connections. Some antivirus software updates introduce rules that block HTTPS traffic on port 443, rendering all modern websites inaccessible even though the network layer is functional.

---

## Section 3: Quick Fixes

Before diving into platform-specific diagnostics, try these universal fixes:

1. **Restart your router and modem.** Unplug both devices from power. Wait 30 seconds. This allows the capacitors in the power adapters to discharge completely, resetting the volatile memory. Plug in the modem first, wait 60 seconds for the online indicator to become solid. Then plug in the router and wait another 60 seconds.
2. **Reconnect your device to Wi-Fi.** On your device, forget the network and reconnect. This clears the stored DHCP lease and forces a fresh IP assignment.
3. **Turn airplane mode on and off** (on mobile devices). This triggers a full Wi-Fi radio reset.
4. **Check other devices.** If all devices lose internet simultaneously, the problem is on the router/ISP side. If only one device fails, the problem is device-specific.
5. **Try a different DNS.** Change your DNS manually to 1.1.1.1 or 8.8.8.8. If the internet resumes working, your ISP's DNS was the problem.

---

## Section 4: Windows Fixes

**Step 1 — Release and Renew DHCP Lease**
Open Command Prompt as Administrator (search "cmd", right-click, Run as Administrator):
\`\`\`cmd
ipconfig /release
ipconfig /renew
\`\`\`
This releases your current IP address and requests a fresh one from the router.

**Step 2 — Flush DNS Cache**
\`\`\`cmd
ipconfig /flushdns
\`\`\`
This clears the local resolver cache of any stale or corrupted DNS records.

**Step 3 — Reset TCP/IP Stack and Winsock**
\`\`\`cmd
netsh int ip reset
netsh winsock reset
\`\`\`
This resets the network adapter registry settings and repairs the Winsock LSP stack. Reboot after running these commands.

**Step 4 — Change DNS Servers**
Settings → Network & Internet → Wi-Fi → Hardware Properties → DNS Server Assignment. Switch to Manual. Enable IPv4 and enter Primary: 1.1.1.1, Secondary: 1.0.0.1.

**Step 5 — Disable IPv6**
Control Panel → Network and Sharing Center → Change Adapter Settings. Right-click your Wi-Fi adapter → Properties. Uncheck "Internet Protocol Version 6 (TCP/IPv6)" to see if an IPv6 configuration issue is blocking routing.

**Step 6 — Reinstall Network Adapter Drivers**
Open Device Manager (devmgmt.msc), expand "Network adapters", right-click your wireless card (e.g., Intel Wi-Fi 6E AX211), and select "Uninstall device". Do NOT check the option to delete driver software. Restart your PC; Windows will automatically reinstall the driver.

---

## Section 5: macOS Fixes

**Step 1 — Renew DHCP Lease**
System Settings → Network → Wi-Fi → Details → Renew DHCP Lease button.

**Step 2 — Flush DNS Cache**
Open Terminal and run:
\`\`\`bash
sudo killall -HUP mDNSResponder
\`\`\`

**Step 3 — Forget and Reconnect to Wi-Fi**
System Settings → Network → Wi-Fi → tap the details of your network → Forget This Network. Reconnect.

**Step 4 — Change DNS on macOS**
System Settings → Network → Wi-Fi → Details → DNS tab. Add 1.1.1.1 and 8.8.8.8. Remove ISP DNS entries.

**Step 5 — Check Proxy Settings**
System Settings → Network → Wi-Fi → Details → Proxies tab. Ensure no proxies are configured unless intentionally set.

**Step 6 — Delete System Configuration PLIST Files**
To fix deep-seated macOS network stack bugs, open Terminal and run:
\`\`\`bash
sudo rm /Library/Preferences/SystemConfiguration/NetworkInterfaces.plist
sudo rm /Library/Preferences/SystemConfiguration/preferences.plist
\`\`\`
Reboot your Mac. This forces macOS to recreate clean default network configuration files.

---

## Section 6: Android Fixes

**Step 1 — Toggle Wi-Fi Off and On**
Swipe down the notification panel and tap the Wi-Fi icon to disable, wait 10 seconds, then re-enable.

**Step 2 — Forget and Reconnect**
Settings → Wi-Fi → Long-press your network → Forget → Reconnect.

**Step 3 — Set Static DNS**
Settings → Wi-Fi → Long-press network → Modify Network → Advanced Options → IP Settings: Static. Enter DNS 1: 1.1.1.1, DNS 2: 8.8.8.8.

**Step 4 — Use Private DNS (Android 9+)**
Settings → Network & Internet → Advanced → Private DNS → Private DNS provider hostname: one.one.one.one. This uses encrypted DNS-over-TLS.

**Step 5 — Clear Network Settings**
Settings → System → Reset options → Reset Wi-Fi, mobile & Bluetooth. This restores all wireless settings to default.

---

## Section 7: iPhone/iPad Fixes

**Step 1 — Toggle Airplane Mode**
Control Center → airplane icon → wait 15 seconds → tap again.

**Step 2 — Forget Network and Reconnect**
Settings → Wi-Fi → tap the "i" icon → Forget This Network → Reconnect.

**Step 3 — Configure Custom DNS**
Settings → Wi-Fi → "i" icon → Configure DNS → Manual → Add Server: 1.1.1.1 and 8.8.8.8.

**Step 4 — Renew DHCP Lease**
Settings → Wi-Fi → "i" icon → tap "Renew Lease".

**Step 5 — Disable MAC Address Randomization (Private Wi-Fi Address)**
Settings → Wi-Fi → "i" icon → toggle off "Private Wi-Fi Address". Some routers block devices that frequently rotate MAC addresses to prevent MAC spoofing.

**Step 6 — Reset Network Settings (Last Resort)**
Settings → General → Transfer or Reset iPhone → Reset → Reset Network Settings.
*WARNING: This erases all Wi-Fi passwords and VPN settings.*

---

## Section 8: Router Troubleshooting

### Check Router Admin Panel
Log in to your router's admin interface (typically 192.168.1.1, 192.168.0.1, or 10.0.0.1). Verify:
- WAN IP address is assigned (not 0.0.0.0 or empty)
- DNS server IPs are populated
- Gateway IP is present and correct

### PPPoE Re-Authentication
If you use DSL or fiber with PPPoE authentication, re-enter your ISP username and password in the WAN settings and click Reconnect.

### Factory Reset the Router
Hold the physical reset button on the back of the device using a paperclip for 10-30 seconds until the LEDs flash. Reconfigure from scratch with your ISP credentials.

### Update Router Firmware
Log into router admin, find Firmware Update section, and apply any available updates. Many modern routers support automatic updates.

### Check DHCP Pool and IP Exclusions
Verify the DHCP lease pool is large enough. If you have many smart home devices and guests, you may be exhausting the available IP pool. Adjust the lease time from 24 hours to 2 hours to recycle unused addresses faster.

---

## Section 9: Advanced Diagnostics

### ipconfig — Check IP Configuration (Windows)
\`\`\`cmd
ipconfig /all
\`\`\`
Verify IPv4 Address is in 192.168.x.x range (NOT 169.254.x.x), Default Gateway matches your router IP, and DNS Servers show valid IPs.

### ping — Test Layer by Layer and ICMP Routing
The ping command uses the Internet Control Message Protocol (ICMP) Echo Request and Echo Reply packets to test the reachability of a host on an Internet Protocol (IP) network. When you run \`ping 8.8.8.8\`, your operating system sends a 32-byte ICMP echo request packet to the destination address. It then waits for a response. If a reply is received within a specific timeout threshold, the tool prints the round-trip time (RTT) in milliseconds. This tells you if the packet routing is complete. If you get a 'Request Timed Out' error, it means the packet was sent but no reply was received, which happens when a router along the way drops ICMP packets or the host is offline. If you get a 'Destination Host Unreachable' error, it means your local device could not find a route to the destination IP address, which indicates a local gateway routing configuration issue.
\`\`\`cmd
ping 192.168.1.1        (Test router reachability - local link)
ping 8.8.8.8            (Test internet IP connectivity - bypasses DNS)
ping google.com         (Test DNS resolution + internet connectivity)
\`\`\`
If the first ping fails, your device cannot reach the router. If the second fails, your router cannot reach the internet. If only the third fails, DNS is the problem.

### tracert — Trace the Network Route
\`\`\`cmd
tracert 8.8.8.8
\`\`\`
Shows every routing hop from your device to Google's servers. If it stops at the first hop (your router), the WAN connection is the problem. If it stops further out, there is an upstream ISP issue.

### nslookup — Test DNS Resolution
\`\`\`cmd
nslookup google.com
nslookup google.com 1.1.1.1
\`\`\`
If the second works but the first doesn't, your router's DNS forwarder or ISP DNS is the problem. Switch to Cloudflare DNS immediately.

---

## Section 10: When To Contact Your ISP

Contact your Internet Service Provider if:
- Multiple devices all show "No Internet" simultaneously after a full router and modem restart
- The modem's WAN light is off, blinking red/amber, or showing a "No Sync" pattern even after a power cycle
- You have factory reset the router and re-entered ISP credentials, but the WAN IP remains 0.0.0.0
- The router admin panel shows WAN status as "Disconnected" or "Authentication Failed" with correct credentials
- The outage is confirmed regional — verified through Downdetector or neighbors reporting the same issue
- Your modem is ISP-provided (rented equipment) — it may need remote reconfiguration by your provider

When calling your ISP, have ready:
1. Your account number or the phone number associated with the account
2. The modem's serial number and MAC address (printed on the device label)
3. The exact LED patterns visible on the modem
4. The error or IP status shown in your router admin panel
5. Whether the issue affects all devices or only specific ones`;

  const wifiConnectedNoInternetCauses = [
    "ISP (Internet Service Provider) connection outage or maintenance work",
    "DNS resolver failure at the provider level or local misconfiguration",
    "DHCP server IP address allocation conflicts or invalid IP bindings",
    "Modem-to-router physical WAN port link drops or cable issues",
    "Local firewall software, proxy configuration, or VPN profile conflicts",
    "Router firmware crash or memory overflow requiring a reboot",
    "Gateway routing table corruption from driver updates or VPN software"
  ];

  const wifiConnectedNoInternetFixes = [
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
      technicalDetails: "Windows CMD:\nipconfig /flushdns\nping 8.8.8.8\nping google.com\n\nmacOS Terminal:\nsudo killall -HUP mDNSResponder\nping 8.8.8.8"
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
    },
    {
      step: 6,
      title: "Reset TCP/IP Stack (Windows)",
      description:
        "Open Command Prompt as Administrator and run netsh winsock reset followed by netsh int ip reset. These commands repair corrupted network stack settings at the kernel level. Reboot immediately after.",
      technicalDetails: "netsh int ip reset\nnetsh winsock reset\nipconfig /flushdns\nReboot the computer"
    },
    {
      step: 7,
      title: "Disable VPN or Third-Party Firewall Temporarily",
      description:
        "Temporarily disable any active VPN client or third-party firewall application. Test internet access. If it resumes, your security software is the cause. Update the software, adjust its settings, or reinstall it with correct configurations.",
    },
    {
      step: 8,
      title: "Log Into Router Admin and Check WAN Status",
      description:
        "Open a browser and navigate to your router's admin panel (192.168.1.1, 192.168.0.1, or 10.0.0.1). Check the WAN or Internet status page. The WAN IP must be assigned (not 0.0.0.0). If authentication fails, re-enter your ISP credentials and reconnect.",
    }
  ];

  const wifiConnectedNoInternetFaqs = [
    {
      question: "Why does my phone say 'Connected, No Internet' on Wi-Fi?",
      answer: "This status means your phone has established a local wireless link with your router, but the router itself cannot reach the internet. The issue could be an ISP outage, a disconnected cable between the router and modem, or an IP address conflict on the local network. Try rebooting the router and modem, then check if the problem persists on other devices."
    },
    {
      question: "How do I diagnose if the connection issue is DNS-related?",
      answer: "Open a command terminal and ping a public IP address directly (like 'ping 8.8.8.8'). If the ping succeeds, your internet link is active. If you then try to ping 'google.com' and it fails, the issue is DNS host resolution. Changing your DNS servers to Cloudflare (1.1.1.1) or Google (8.8.8.8) will resolve this."
    },
    {
      question: "What does an IP address beginning with 169.254 mean?",
      answer: "An IP address starting with 169.254.X.X is an Automatic Private IP Address (APIPA). It indicates that your device connected to the network, but the router's DHCP server failed to assign it a valid IP address. Restarting the router or renewing the DHCP lease (ipconfig /release then ipconfig /renew on Windows) usually fixes this."
    },
    {
      question: "Can a VPN cause a 'Connected, No Internet' error?",
      answer: "Yes. If your VPN client fails to authenticate or loses its connection to the secure server, it may block all outgoing traffic to protect your data (this is called a kill switch). Temporarily disable your VPN client or secure proxy settings to see if your internet access returns."
    },
    {
      question: "Why does only one device lose internet while all others work fine?",
      answer: "When only one device fails while others work, the problem is on that specific device rather than the router or ISP. Check the device's IP address for APIPA (169.254.x.x), flush its DNS cache, forget and rejoin the Wi-Fi network, and disable any VPN or firewall software. If the issue persists, try reinstalling your network adapter driver."
    },
    {
      question: "How do I fix 'WiFi Connected But No Internet' on Windows 11?",
      answer: "On Windows 11, open Command Prompt as Administrator and run these commands in sequence: ipconfig /release, ipconfig /renew, ipconfig /flushdns, netsh winsock reset, netsh int ip reset. Then reboot. Additionally, go to Settings > Network > Wi-Fi > Hardware Properties and set DNS manually to 1.1.1.1 and 8.8.8.8."
    },
    {
      question: "Does resetting the router erase my WiFi password?",
      answer: "A factory reset (pressing the physical reset button on the router) will erase ALL settings including your custom WiFi name (SSID), password, and any ISP credentials. A soft reboot (unplugging and replugging the power cord) does NOT erase settings. Only perform a factory reset as a last resort, and have your ISP credentials ready to reconfigure the connection."
    },
    {
      question: "Why does my router show 'No Internet' even with the modem light solid green?",
      answer: "A solid green modem light means the modem has a physical connection to the ISP network, but this doesn't guarantee the router is configured correctly to use it. Common causes include: incorrect PPPoE username/password in the router WAN settings, a mismatch in the connection type, or corrupted router firmware. Try re-entering your ISP credentials in the router admin panel."
    },
    {
      question: "How long does it take for internet to come back after a router reboot?",
      answer: "Most home routers take between 60 to 120 seconds to fully restart and re-establish the WAN connection after a power cycle. DSL connections with PPPoE authentication may take longer (2-3 minutes). Fiber connections typically reconnect faster (under 60 seconds). If internet is not restored after 5 minutes, the issue likely requires further diagnostics."
    },
    {
      question: "Can an ISP block my router from accessing the internet?",
      answer: "Yes, ISPs can suspend service for several reasons: unpaid bills, suspected abuse, equipment provisioning issues, or incorrect hardware registration. If your modem WAN light is active but internet access is completely blocked across all devices, contact your ISP to check your account status. They may need to re-provision your modem remotely."
    }
  ];

  const problems = await Promise.all([
    prisma.problem.upsert({
      where: { slug: "wifi-connected-no-internet" },
      update: {
        title: "WiFi Connected But No Internet",
        category: "WIFI",
        excerpt:
          "Your device shows connected to WiFi but you cannot browse the internet. This common problem has several causes and straightforward fixes across Windows, macOS, Android, and iOS.",
        content: wifiConnectedNoInternetContent,
        causes: wifiConnectedNoInternetCauses,
        fixes: wifiConnectedNoInternetFixes,
        faqs: wifiConnectedNoInternetFaqs,
        relatedSlugs: ["slow-internet", "dns-not-resolving"],
        metaTitle: "WiFi Connected But No Internet — Complete Troubleshooting Guide",
        metaDescription: "Fix 'WiFi connected but no internet' on Windows, macOS, iPhone, and Android. Step-by-step diagnosis with ping, tracert, DNS fixes, and router solutions.",
      },
      create: {
        title: "WiFi Connected But No Internet",
        slug: "wifi-connected-no-internet",
        category: "WIFI",
        excerpt:
          "Your device shows connected to WiFi but you cannot browse the internet. This common problem has several causes and straightforward fixes.",
        content: wifiConnectedNoInternetContent,
        causes: wifiConnectedNoInternetCauses,
        fixes: wifiConnectedNoInternetFixes,
        faqs: wifiConnectedNoInternetFaqs,
        relatedSlugs: ["slow-internet", "dns-not-resolving"],
        metaTitle: "WiFi Connected But No Internet — Complete Troubleshooting Guide",
        metaDescription: "Fix 'WiFi connected but no internet' on Windows, macOS, iPhone, and Android. Step-by-step diagnosis with ping, tracert, DNS fixes, and router solutions.",
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
    prisma.problem.upsert({
      where: { slug: "router-not-assigning-ip-addresses" },
      update: {
        title: "Router not assigning IP addresses",
        slug: "router-not-assigning-ip-addresses",
        category: "OTHER",
        excerpt: "The router fails to assign IP addresses due to DHCP service issues, pool exhaustion, or local IP conflicts, leading to self-assigned APIPA addresses (169.254.x.x) and no internet access.",
        content: `## Troubleshooting: Router Not Assigning IP Addresses\n\nWhen client systems connect to a network but fail to obtain an IP configuration, it indicates a failure in local IP address lease negotiation. This guide details the diagnostics and resolution steps for DHCP service outages.\n\n### How DHCP Works (The DORA Process)\nThe Dynamic Host Configuration Protocol (DHCP) is a client-server protocol that automates IP parameter allocation. It operates on UDP Port 67 (server) and UDP Port 68 (client) through a four-way handshake:\n1. **Discover:** The client broadcasts a DHCP Discover packet to locate active DHCP servers on the subnet.\n2. **Offer:** The router DHCP server reserves an IP from its pool and broadcasts or unicasts a DHCP Offer containing the proposed IP, subnet mask, gateway, and DNS servers.\n3. **Request:** The client broadcasts a DHCP Request confirming it accepts the offered IP configuration.\n4. **Acknowledgement (ACK):** The server registers the client's MAC address, binds the IP lease, and sends a DHCP ACK to finalize the configuration.\n\n*Common Failure Points:*\n- Discover packets are dropped due to network loops (STP blocks) or VLAN isolation.\n- The DHCP daemon crashes or exhausts memory buffers, dropping Discover broadcasts.\n- The router fails to send an ACK because the IP lease is claimed by another static device.\n\n### DHCP Lease Lifecycle\nThe allocation of dynamic IP addresses follows a specific state-transition cycle:\n\n| State | Trigger | Action |\n| --- | --- | --- |\n| **INIT** | Client network interface active | Client sends DHCP Discover broadcast |\n| **SELECTING** | Client receives DHCP Offer(s) | Client selects best offer and prepares Request |\n| **REQUESTING** | Client sends DHCP Request | Client requests lease confirmation from server |\n| **BOUND** | Client receives DHCP ACK | Lease active; client binds IP configuration |\n| **RENEWING (T1)** | Lease time reaches 50% | Client unicasts DHCP Request to renew lease |\n| **REBINDING (T2)** | Lease time reaches 87.5% | Client broadcasts DHCP Request to any DHCP server |\n| **EXPIRED** | Lease time reaches 100% | IP released; interface disabled; INIT state triggered |\n\n### How To Verify DHCP Using Command Line\n\n#### Windows CMD / PowerShell\nRun these commands in an elevated Command Prompt or PowerShell terminal:\n- **Display Full Configuration:** \`ipconfig /all\` - verify if your adapter has a DHCP enabled flag and check your current gateway and DNS.\n- **Release Current Lease:** \`ipconfig /release\` - forces the system to drop its current IP allocation.\n- **Request New Lease:** \`ipconfig /renew\` - triggers a new DORA handshake to obtain fresh configuration parameters.\n\n#### macOS Terminal\nLocate your active interface (usually \`en0\` or \`en1\`) and run:\n- **Renew DHCP Lease:** \`sudo ipconfig set en0 DHCP\` - releases and requests a new DHCP config.\n- **Query Configuration:** \`networksetup -getinfo "Wi-Fi"\` or \`networksetup -getinfo "Belkin USB-C LAN"\` - inspects lease info.\n\n#### Linux Terminal\nUse the standard DHCP client daemon \`dhclient\` or NetworkManager's command line interface \`nmcli\`:\n- **Release and Renew using dhclient:**\n  \`\`\`bash\n  sudo dhclient -r eth0\n  sudo dhclient eth0\n  \`\`\`\n- **Toggle interface using nmcli:**\n  \`\`\`bash\n  nmcli device disconnect eth0\n  nmcli device connect eth0\n  \`\`\`\n\n### DHCP Failure Causes vs Solution Matrix\n\n| Observed Fault | Root Cause | Resolution Steps |\n| --- | --- | --- |\n| **APIPA Fallback (169.254.x.x)** | No DHCP Offer received; server down or link blocked | Restart DHCP service; verify physical cabling |\n| **IP Lease Depletion** | High volume of guest connections or smart devices | Extend DHCP pool range; shorten lease duration |\n| **Rogue DHCP Server** | Conflict from active DHCP on extender/AP | Log into secondary AP and toggle DHCP to Disabled |\n| **VLAN Handshake Failure** | Discover packets blocked at boundary | Configure DHCP Relay / IP Helper on Layer 3 switch |\n| **STP Broadcast Loop** | Mesh node switch loops flood CPU | Enable Spanning Tree Protocol (STP) on local switches |\n\n### Static IP vs DHCP\n- **DHCP (Dynamic Host Configuration Protocol):** The router automatically assigns IP parameters from a dynamic pool. Addresses can change when the lease expires, which is perfect for general clients but problematic for hosts needing consistent routes.\n- **Static IP Configuration:** Manually binding an IP address directly to the client network adapter. This bypasses the DHCP server entirely. \n- *Risk of Collisions:* If you configure a static IP manually (e.g., \`192.168.1.150\`) and that address lies inside the router's active DHCP range, the router may assign it to another device, triggering an **IP address conflict error** and dropping both devices offline. To prevent this, always set static IP reservations in the router GUI under **DHCP Reservations / Static Lease** bindings.\n\n### DHCP Pool Exhaustion\nA router's address pool defines the beginning and end of assignable IPs (e.g., \`192.168.1.100\` to \`192.168.1.199\`, supporting 100 devices). When guests, smart home devices, and mobile random-MAC devices connect, they lease these addresses.\n- **NAT Mapping Limits:** If the pool is fully leased, the DHCP server ignores Discover packets. Device number 101 will fail to get an IP, causing an APIPA fallback.\n- **Lease Duration Settings:** By default, many routers set lease durations to 24 or 72 hours. To avoid exhaustion on high-traffic networks, reduce the lease duration to **8 or 12 hours**. This instructs the router to reclaim inactive IP addresses faster.\n\n---\n\n### Internal References\n- If your device is configured but you can't access the login screen, see the [router-login](/router-login) checklist.\n- For instructions on setting up base configuration properties, read our guide on [router-settings](/router-settings).\n- If your WAN link is active but you receive DNS resolving warnings, look at [dns-server-not-responding](/dns-server-not-responding) or [default-gateway-not-available](/default-gateway-not-available).\n- To clear all system states and reset the DHCP daemon, check [router-reset](/router-reset).`,
        causes: [
          "DHCP service is disabled or not running on the router.",
          "Incorrect DHCP configuration settings (e.g., wrong subnet mask or excluded IP range).",
          "IP address pool is exhausted due to too many connected devices.",
          "Network interface issues or hardware malfunctions on the router.",
          "Firewall rules blocking DHCP requests from clients."
        ],
        fixes: [
          {
            stepTitle: "Enable DHCP Service",
            description: "Ensure that the DHCP server is enabled on the router's configuration interface.",
            technicalDetails: "Access your router settings (commonly 192.168.1.1) and navigate to the DHCP settings to enable the service."
          },
          {
            stepTitle: "Review and Correct DHCP Settings",
            description: "Check the DHCP configuration for subnet mask, gateway, and exclusion settings.",
            technicalDetails: "Verify that the subnet mask matches the network configuration (usually 255.255.255.0) and check for valid IP range."
          },
          {
            stepTitle: "Increase IP Address Pool",
            description: "If the IP address pool is exhausted, expand it or reduce the number of connected devices.",
            technicalDetails: "Modify the DHCP settings to increase the pool size, ensuring it is within the network subnet range."
          },
          {
            stepTitle: "Inspect Hardware for Malfunctions",
            description: "Check for hardware issues such as a faulty network interface on the router.",
            technicalDetails: "Run diagnostics via the router UI and check LEDs indicating health status of network interfaces."
          },
          {
            stepTitle: "Modify Firewall Settings",
            description: "Adjust firewall rules to allow DHCP traffic through the necessary ports.",
            technicalDetails: "Ensure that UDP port 67 and 68 are open to allow communication for DHCP requests and offers."
          }
        ],
        faqs: [
          {
            question: "Why is my router giving some devices IP addresses but not others?",
            answer: "This usually happens due to DHCP pool exhaustion (no more addresses available in the range), MAC filtering policies blocking specific hardware, or guest devices using randomized private MAC addresses that consume multiple leases. Check the active lease table in your router config and expand the start/end IP range."
          },
          {
            question: "Can DHCP exhaustion cause this issue?",
            answer: "Yes, DHCP pool exhaustion is a primary cause. If your pool is set to 50 addresses and you have 50 active smart plugs, phones, and laptops connected, any new device will fail to obtain an IP and default to a 169.254.x.x APIPA address."
          },
          {
            question: "How do I increase DHCP pool size?",
            answer: "Log into your router (commonly 192.168.1.1 or 192.168.0.1), navigate to Network Settings > LAN / DHCP Server, and adjust the IP Address Range. For example, change the End IP from 192.168.1.150 to 192.168.1.250, then save settings."
          },
          {
            question: "Does rebooting the router reset DHCP leases?",
            answer: "Rebooting clears the router's active RAM cache, restarting the DHCP server daemon. However, many routers store active leases in flash memory and will preserve them. To force a complete lease clearance, you can temporarily change the IP pool range or perform a full system reset."
          },
          {
            question: "Can VLAN settings break DHCP?",
            answer: "Yes. DHCP broadcasts do not cross VLAN boundaries. If your server is on VLAN 10 and clients are on VLAN 20, they will fail to receive IP addresses unless a DHCP Relay Agent (IP Helper) is configured on the routing switch to forward UDP packets between subnets."
          }
        ],
        relatedSlugs: ["default-gateway-not-available", "dns-server-not-responding"],
        metaTitle: "Router Not Assigning IP Addresses? Fix DHCP Issues Fast",
        metaDescription: "Learn how to resolve DHCP server timeouts, lease pool exhaustion, static IP conflicts, and self-assigned APIPA (169.254.x.x) IP errors.",
        diagnosticCategory: "DHCP",
        isPublished: true,
        status: "PUBLISHED"
      },
      create: {
        title: "Router not assigning IP addresses",
        slug: "router-not-assigning-ip-addresses",
        category: "OTHER",
        excerpt: "The router fails to assign IP addresses due to DHCP service issues, pool exhaustion, or local IP conflicts, leading to self-assigned APIPA addresses (169.254.x.x) and no internet access.",
        content: `## Troubleshooting: Router Not Assigning IP Addresses\n\nWhen client systems connect to a network but fail to obtain an IP configuration, it indicates a failure in local IP address lease negotiation. This guide details the diagnostics and resolution steps for DHCP service outages.\n\n### How DHCP Works (The DORA Process)\nThe Dynamic Host Configuration Protocol (DHCP) is a client-server protocol that automates IP parameter allocation. It operates on UDP Port 67 (server) and UDP Port 68 (client) through a four-way handshake:\n1. **Discover:** The client broadcasts a DHCP Discover packet to locate active DHCP servers on the subnet.\n2. **Offer:** The router DHCP server reserves an IP from its pool and broadcasts or unicasts a DHCP Offer containing the proposed IP, subnet mask, gateway, and DNS servers.\n3. **Request:** The client broadcasts a DHCP Request confirming it accepts the offered IP configuration.\n4. **Acknowledgement (ACK):** The server registers the client's MAC address, binds the IP lease, and sends a DHCP ACK to finalize the configuration.\n\n*Common Failure Points:*\n- Discover packets are dropped due to network loops (STP blocks) or VLAN isolation.\n- The DHCP daemon crashes or exhausts memory buffers, dropping Discover broadcasts.\n- The router fails to send an ACK because the IP lease is claimed by another static device.\n\n### DHCP Lease Lifecycle\nThe allocation of dynamic IP addresses follows a specific state-transition cycle:\n\n| State | Trigger | Action |\n| --- | --- | --- |\n| **INIT** | Client network interface active | Client sends DHCP Discover broadcast |\n| **SELECTING** | Client receives DHCP Offer(s) | Client selects best offer and prepares Request |\n| **REQUESTING** | Client sends DHCP Request | Client requests lease confirmation from server |\n| **BOUND** | Client receives DHCP ACK | Lease active; client binds IP configuration |\n| **RENEWING (T1)** | Lease time reaches 50% | Client unicasts DHCP Request to renew lease |\n| **REBINDING (T2)** | Lease time reaches 87.5% | Client broadcasts DHCP Request to any DHCP server |\n| **EXPIRED** | Lease time reaches 100% | IP released; interface disabled; INIT state triggered |\n\n### How To Verify DHCP Using Command Line\n\n#### Windows CMD / PowerShell\nRun these commands in an elevated Command Prompt or PowerShell terminal:\n- **Display Full Configuration:** \`ipconfig /all\` - verify if your adapter has a DHCP enabled flag and check your current gateway and DNS.\n- **Release Current Lease:** \`ipconfig /release\` - forces the system to drop its current IP allocation.\n- **Request New Lease:** \`ipconfig /renew\` - triggers a new DORA handshake to obtain fresh configuration parameters.\n\n#### macOS Terminal\nLocate your active interface (usually \`en0\` or \`en1\`) and run:\n- **Renew DHCP Lease:** \`sudo ipconfig set en0 DHCP\` - releases and requests a new DHCP config.\n- **Query Configuration:** \`networksetup -getinfo "Wi-Fi"\` or \`networksetup -getinfo "Belkin USB-C LAN"\` - inspects lease info.\n\n#### Linux Terminal\nUse the standard DHCP client daemon \`dhclient\` or NetworkManager's command line interface \`nmcli\`:\n- **Release and Renew using dhclient:**\n  \`\`\`bash\n  sudo dhclient -r eth0\n  sudo dhclient eth0\n  \`\`\`\n- **Toggle interface using nmcli:**\n  \`\`\`bash\n  nmcli device disconnect eth0\n  nmcli device connect eth0\n  \`\`\`\n\n### DHCP Failure Causes vs Solution Matrix\n\n| Observed Fault | Root Cause | Resolution Steps |\n| --- | --- | --- |\n| **APIPA Fallback (169.254.x.x)** | No DHCP Offer received; server down or link blocked | Restart DHCP service; verify physical cabling |\n| **IP Lease Depletion** | High volume of guest connections or smart devices | Extend DHCP pool range; shorten lease duration |\n| **Rogue DHCP Server** | Conflict from active DHCP on extender/AP | Log into secondary AP and toggle DHCP to Disabled |\n| **VLAN Handshake Failure** | Discover packets blocked at boundary | Configure DHCP Relay / IP Helper on Layer 3 switch |\n| **STP Broadcast Loop** | Mesh node switch loops flood CPU | Enable Spanning Tree Protocol (STP) on local switches |\n\n### Static IP vs DHCP\n- **DHCP (Dynamic Host Configuration Protocol):** The router automatically assigns IP parameters from a dynamic pool. Addresses can change when the lease expires, which is perfect for general clients but problematic for hosts needing consistent routes.\n- **Static IP Configuration:** Manually binding an IP address directly to the client network adapter. This bypasses the DHCP server entirely. \n- *Risk of Collisions:* If you configure a static IP manually (e.g., \`192.168.1.150\`) and that address lies inside the router's active DHCP range, the router may assign it to another device, triggering an **IP address conflict error** and dropping both devices offline. To prevent this, always set static IP reservations in the router GUI under **DHCP Reservations / Static Lease** bindings.\n\n### DHCP Pool Exhaustion\nA router's address pool defines the beginning and end of assignable IPs (e.g., \`192.168.1.100\` to \`192.168.1.199\`, supporting 100 devices). When guests, smart home devices, and mobile random-MAC devices connect, they lease these addresses.\n- **NAT Mapping Limits:** If the pool is fully leased, the DHCP server ignores Discover packets. Device number 101 will fail to get an IP, causing an APIPA fallback.\n- **Lease Duration Settings:** By default, many routers set lease durations to 24 or 72 hours. To avoid exhaustion on high-traffic networks, reduce the lease duration to **8 or 12 hours**. This instructs the router to reclaim inactive IP addresses faster.\n\n---\n\n### Internal References\n- If your device is configured but you can't access the login screen, see the [router-login](/router-login) checklist.\n- For instructions on setting up base configuration properties, read our guide on [router-settings](/router-settings).\n- If your WAN link is active but you receive DNS resolving warnings, look at [dns-server-not-responding](/dns-server-not-responding) or [default-gateway-not-available](/default-gateway-not-available).\n- To clear all system states and reset the DHCP daemon, check [router-reset](/router-reset).`,
        causes: [
          "DHCP service is disabled or not running on the router.",
          "Incorrect DHCP configuration settings (e.g., wrong subnet mask or excluded IP range).",
          "IP address pool is exhausted due to too many connected devices.",
          "Network interface issues or hardware malfunctions on the router.",
          "Firewall rules blocking DHCP requests from clients."
        ],
        fixes: [
          {
            stepTitle: "Enable DHCP Service",
            description: "Ensure that the DHCP server is enabled on the router's configuration interface.",
            technicalDetails: "Access your router settings (commonly 192.168.1.1) and navigate to the DHCP settings to enable the service."
          },
          {
            stepTitle: "Review and Correct DHCP Settings",
            description: "Check the DHCP configuration for subnet mask, gateway, and exclusion settings.",
            technicalDetails: "Verify that the subnet mask matches the network configuration (usually 255.255.255.0) and check for valid IP range."
          },
          {
            stepTitle: "Increase IP Address Pool",
            description: "If the IP address pool is exhausted, expand it or reduce the number of connected devices.",
            technicalDetails: "Modify the DHCP settings to increase the pool size, ensuring it is within the network subnet range."
          },
          {
            stepTitle: "Inspect Hardware for Malfunctions",
            description: "Check for hardware issues such as a faulty network interface on the router.",
            technicalDetails: "Run diagnostics via the router UI and check LEDs indicating health status of network interfaces."
          },
          {
            stepTitle: "Modify Firewall Settings",
            description: "Adjust firewall rules to allow DHCP traffic through the necessary ports.",
            technicalDetails: "Ensure that UDP port 67 and 68 are open to allow communication for DHCP requests and offers."
          }
        ],
        faqs: [
          {
            question: "Why is my router giving some devices IP addresses but not others?",
            answer: "This usually happens due to DHCP pool exhaustion (no more addresses available in the range), MAC filtering policies blocking specific hardware, or guest devices using randomized private MAC addresses that consume multiple leases. Check the active lease table in your router config and expand the start/end IP range."
          },
          {
            question: "Can DHCP exhaustion cause this issue?",
            answer: "Yes, DHCP pool exhaustion is a primary cause. If your pool is set to 50 addresses and you have 50 active smart plugs, phones, and laptops connected, any new device will fail to obtain an IP and default to a 169.254.x.x APIPA address."
          },
          {
            question: "How do I increase DHCP pool size?",
            answer: "Log into your router (commonly 192.168.1.1 or 192.168.0.1), navigate to Network Settings > LAN / DHCP Server, and adjust the IP Address Range. For example, change the End IP from 192.168.1.150 to 192.168.1.250, then save settings."
          },
          {
            question: "Does rebooting the router reset DHCP leases?",
            answer: "Rebooting clears the router's active RAM cache, restarting the DHCP server daemon. However, many routers store active leases in flash memory and will preserve them. To force a complete lease clearance, you can temporarily change the IP pool range or perform a full system reset."
          },
          {
            question: "Can VLAN settings break DHCP?",
            answer: "Yes. DHCP broadcasts do not cross VLAN boundaries. If your server is on VLAN 10 and clients are on VLAN 20, they will fail to receive IP addresses unless a DHCP Relay Agent (IP Helper) is configured on the routing switch to forward UDP packets between subnets."
          }
        ],
        relatedSlugs: ["default-gateway-not-available", "dns-server-not-responding"],
        metaTitle: "Router Not Assigning IP Addresses? Fix DHCP Issues Fast",
        metaDescription: "Learn how to resolve DHCP server timeouts, lease pool exhaustion, static IP conflicts, and self-assigned APIPA (169.254.x.x) IP errors.",
        diagnosticCategory: "DHCP",
        isPublished: true,
        status: "PUBLISHED"
      },
    }),
    prisma.problem.upsert({
      where: { slug: "google-nest-wifi-point-flashing-yellow" },
      update: {
        title: "Google Nest WiFi point flashing yellow",
        slug: "google-nest-wifi-point-flashing-yellow",
        category: "WIFI",
        excerpt: "A flashing yellow light on a Google Nest WiFi point indicates a factory reset is in progress, or that the node is having critical difficulties syncing with the main router.",
        content: `## Troubleshooting: Google Nest WiFi Point Flashing Yellow\n\nGoogle Nest WiFi points use a single LED indicator ring on the base of the device to communicate status. A flashing yellow light is a warning signal that indicates either a factory reset has been triggered or a critical mesh synchronization error has occurred.\n\n### Yellow Light Meaning Matrix\nUnderstanding the state of the yellow LED is key to identifying the network issue:\n\n| LED State | System Meaning | Recommended Action |\n| --- | --- | --- |\n| **Solid Yellow** | Factory reset sequence is initializing | Keep the device plugged in; wait for the reset to complete |\n| **Flashing Yellow** | Reset in progress, or critical link failure | Do not unplug; wait for reboot, or perform a manual setup scan |\n| **Pulsing Yellow** | Node is booting up, or seeking network | Wait for the light to turn solid white; if it fails, trigger re-sync |\n\n### Factory Reset Walkthrough\nIf your Google Nest WiFi point continues to flash yellow and does not show up in the Google Home app, a hardware reset is required to clear corrupted configurations:\n1. Locate the physical **Factory Reset** button on the bottom of the Nest point.\n2. Press and hold the button for about **15 seconds**.\n3. The LED ring will pulse yellow and then turn **solid yellow**.\n4. Release the button. The point will now begin the reset cycle. This process takes about **5 minutes**.\n5. Once complete, the LED ring will pulse white, indicating the point is ready for setup.\n\n### Mesh Node Reconnection\nIf the yellow light was triggered by a connection drop between the Nest point and your main Nest router, follow these steps to restore the mesh:\n1. **Optimize Node Placement:** Ensure the Nest point is placed within 2 rooms or 30 feet of the main Nest router. Thicker concrete walls or metal appliances can block the 5GHz mesh backhaul.\n2. **Re-Add in Google Home App:**\n   - Open the **Google Home** app.\n   - Tap **Devices** -> **Add** -> **New Device**.\n   - Select your Home and wait for the app to scan the local area.\n   - Scan the QR code on the bottom of the Nest point to register it.\n3. **Run a Mesh Test:** Go to WiFi Settings in the Google Home app and run a **Mesh Test** to verify that connection strength is rated as "Great" or "Good".\n\n---\n\n### Internal References\n- Learn more about mesh topologies in our [mesh-wifi](/mesh-wifi) overview.\n- For detailed setup guidelines for primary and secondary nodes, check [mesh-wifi-setup](/mesh-wifi-setup).\n- To compare mesh setups with traditional extenders, read [wifi-extender-vs-mesh](/wifi-extender-vs-mesh).\n- If you need to reset other router models, see the general [router-reset](/router-reset) guide.`,
        causes: [
          "Factory reset button was physically held down.",
          "Lost mesh backhaul connection with the primary router.",
          "Firmware update interruption or corrupted software state.",
          "Power adapter output instability causing CPU brownouts."
        ],
        fixes: [
          {
            stepTitle: "Wait for Factory Reset to Finish",
            description: "If the reset was intentional, wait 5 minutes until the LED pulses white before re-configuring the point in Google Home."
          },
          {
            stepTitle: "Relocate Point Closer to Router",
            description: "Move the Nest point to a location closer to the main Nest router, bypassing thick walls and electronic interference."
          },
          {
            stepTitle: "Perform a Hard Manual Reset",
            description: "Hold the bottom reset button for 15 seconds until the LED turns solid yellow, then release and wait for the reboot."
          },
          {
            stepTitle: "Re-add Point in Google Home App",
            description: "Remove the offline point from your Home network dashboard, scan its QR code, and run a fresh installation cycle."
          }
        ],
        faqs: [
          {
            question: "What does a blinking yellow light on a Google Nest Wifi point mean?",
            answer: "A blinking yellow light on a Nest Wifi point means the device is performing a factory reset, or it has encountered a critical connection failure and cannot link to the main Nest router."
          },
          {
            question: "How do I force my Google Nest Wifi point to reconnect to the router?",
            answer: "Unplug the Nest Wifi point for 30 seconds, plug it back in, and place it closer to the main router. If the light does not turn solid white, you may need to remove it from the Google Home app and add it again."
          },
          {
            question: "Can a software update cause the Nest Wifi point to flash yellow?",
            answer: "Yes. If a firmware update fails or is interrupted due to a power loss, the Nest point's operating system can become corrupted, triggering a recovery state indicated by the flashing yellow LED."
          },
          {
            question: "How do I perform a hard reset on a Google Nest point?",
            answer: "Press and hold the reset button on the bottom of the device for 15 seconds. The LED ring will turn solid yellow. Release the button and wait 5 minutes for the device to restart in setup mode."
          },
          {
            question: "Will resetting the Nest point erase my main router settings?",
            answer: "No. Performing a factory reset on a secondary Nest point only clears the configuration of that specific node. Your main router, network name (SSID), and Wi-Fi password will remain completely unaffected."
          }
        ],
        relatedSlugs: ["mesh-wifi", "mesh-wifi-setup"],
        metaTitle: "Google Nest WiFi Point Flashing Yellow: Troubleshooting Guide",
        metaDescription: "Learn the causes and solutions for Google Nest WiFi points flashing yellow, performing a hard factory reset, and re-syncing mesh nodes.",
        diagnosticCategory: "WIFI",
        isPublished: true,
        status: "PUBLISHED"
      },
      create: {
        title: "Google Nest WiFi point flashing yellow",
        slug: "google-nest-wifi-point-flashing-yellow",
        category: "WIFI",
        excerpt: "A flashing yellow light on a Google Nest WiFi point indicates a factory reset is in progress, or that the node is having critical difficulties syncing with the main router.",
        content: `## Troubleshooting: Google Nest WiFi Point Flashing Yellow\n\nGoogle Nest WiFi points use a single LED indicator ring on the base of the device to communicate status. A flashing yellow light is a warning signal that indicates either a factory reset has been triggered or a critical mesh synchronization error has occurred.\n\n### Yellow Light Meaning Matrix\nUnderstanding the state of the yellow LED is key to identifying the network issue:\n\n| LED State | System Meaning | Recommended Action |\n| --- | --- | --- |\n| **Solid Yellow** | Factory reset sequence is initializing | Keep the device plugged in; wait for the reset to complete |\n| **Flashing Yellow** | Reset in progress, or critical link failure | Do not unplug; wait for reboot, or perform a manual setup scan |\n| **Pulsing Yellow** | Node is booting up, or seeking network | Wait for the light to turn solid white; if it fails, trigger re-sync |\n\n### Factory Reset Walkthrough\nIf your Google Nest WiFi point continues to flash yellow and does not show up in the Google Home app, a hardware reset is required to clear corrupted configurations:\n1. Locate the physical **Factory Reset** button on the bottom of the Nest point.\n2. Press and hold the button for about **15 seconds**.\n3. The LED ring will pulse yellow and then turn **solid yellow**.\n4. Release the button. The point will now begin the reset cycle. This process takes about **5 minutes**.\n5. Once complete, the LED ring will pulse white, indicating the point is ready for setup.\n\n### Mesh Node Reconnection\nIf the yellow light was triggered by a connection drop between the Nest point and your main Nest router, follow these steps to restore the mesh:\n1. **Optimize Node Placement:** Ensure the Nest point is placed within 2 rooms or 30 feet of the main Nest router. Thicker concrete walls or metal appliances can block the 5GHz mesh backhaul.\n2. **Re-Add in Google Home App:**\n   - Open the **Google Home** app.\n   - Tap **Devices** -> **Add** -> **New Device**.\n   - Select your Home and wait for the app to scan the local area.\n   - Scan the QR code on the bottom of the Nest point to register it.\n3. **Run a Mesh Test:** Go to WiFi Settings in the Google Home app and run a **Mesh Test** to verify that connection strength is rated as "Great" or "Good".\n\n---\n\n### Internal References\n- Learn more about mesh topologies in our [mesh-wifi](/mesh-wifi) overview.\n- For detailed setup guidelines for primary and secondary nodes, check [mesh-wifi-setup](/mesh-wifi-setup).\n- To compare mesh setups with traditional extenders, read [wifi-extender-vs-mesh](/wifi-extender-vs-mesh).\n- If you need to reset other router models, see the general [router-reset](/router-reset) guide.`,
        causes: [
          "Factory reset button was physically held down.",
          "Lost mesh backhaul connection with the primary router.",
          "Firmware update interruption or corrupted software state.",
          "Power adapter output instability causing CPU brownouts."
        ],
        fixes: [
          {
            stepTitle: "Wait for Factory Reset to Finish",
            description: "If the reset was intentional, wait 5 minutes until the LED pulses white before re-configuring the point in Google Home."
          },
          {
            stepTitle: "Relocate Point Closer to Router",
            description: "Move the Nest point to a location closer to the main Nest router, bypassing thick walls and electronic interference."
          },
          {
            stepTitle: "Perform a Hard Manual Reset",
            description: "Hold the bottom reset button for 15 seconds until the LED turns solid yellow, then release and wait for the reboot."
          },
          {
            stepTitle: "Re-add Point in Google Home App",
            description: "Remove the offline point from your Home network dashboard, scan its QR code, and run a fresh installation cycle."
          }
        ],
        faqs: [
          {
            question: "What does a blinking yellow light on a Google Nest Wifi point mean?",
            answer: "A blinking yellow light on a Nest Wifi point means the device is performing a factory reset, or it has encountered a critical connection failure and cannot link to the main Nest router."
          },
          {
            question: "How do I force my Google Nest Wifi point to reconnect to the router?",
            answer: "Unplug the Nest Wifi point for 30 seconds, plug it back in, and place it closer to the main router. If the light does not turn solid white, you may need to remove it from the Google Home app and add it again."
          },
          {
            question: "Can a software update cause the Nest Wifi point to flash yellow?",
            answer: "Yes. If a firmware update fails or is interrupted due to a power loss, the Nest point's operating system can become corrupted, triggering a recovery state indicated by the flashing yellow LED."
          },
          {
            question: "How do I perform a hard reset on a Google Nest point?",
            answer: "Press and hold the reset button on the bottom of the device for 15 seconds. The LED ring will turn solid yellow. Release the button and wait 5 minutes for the device to restart in setup mode."
          },
          {
            question: "Will resetting the Nest point erase my main router settings?",
            answer: "No. Performing a factory reset on a secondary Nest point only clears the configuration of that specific node. Your main router, network name (SSID), and Wi-Fi password will remain completely unaffected."
          }
        ],
        relatedSlugs: ["mesh-wifi", "mesh-wifi-setup"],
        metaTitle: "Google Nest WiFi Point Flashing Yellow: Troubleshooting Guide",
        metaDescription: "Learn the causes and solutions for Google Nest WiFi points flashing yellow, performing a hard factory reset, and re-syncing mesh nodes.",
        diagnosticCategory: "WIFI",
        isPublished: true,
        status: "PUBLISHED"
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
