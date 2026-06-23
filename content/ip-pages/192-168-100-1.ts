/**
 * Content for the 192.168.100.1 IP page.
 * Edit this file to update the page — then re-run: npx prisma db seed
 */
export const ip_192_168_100_1 = {
  slug: "192-168-100-1",
  commonBrands: ["Huawei ONT", "ZTE ONT", "Motorola", "Arris SURFboard"],
  description:
    "192.168.100.1 is the standard management IP for ISP-deployed fiber GPON gateways (ONTs) from Huawei and ZTE, and for standalone cable modems from Motorola and Arris. Connect directly via Ethernet to access signal diagnostics, WAN status, and bridge mode settings.",

  loginGuide: `## 192.168.100.1 — Complete ONT & Cable Modem Login Guide

192.168.100.1 occupies the 192.168.100.x subnet, a range that many ISPs around the world have standardized for their CPE (Customer Premises Equipment) management interfaces. Unlike home router gateways such as 192.168.1.1 or 192.168.0.1, this address is not used by a router you purchased — it is almost always the IP of a **fiber ONT (Optical Network Terminal)** or a **standalone cable modem** provided by your Internet Service Provider.

Understanding the difference between these device types is critical for troubleshooting:

- **Fiber ONT/ONU:** Converts optical fiber signal (light) to Ethernet. Deployed by ISPs using GPON or XGSPON technology. Brands: Huawei (HG8145V5, HG8245H, EG8145V5), ZTE (F660, F680).
- **Cable Modem:** Converts coaxial cable signal to Ethernet using DOCSIS standard. Brands: Motorola (MB8600, MB7621), Arris (SURFboard SB8200, SB6183).

### Device Credentials for 192.168.100.1

<table class="min-w-full divide-y divide-gray-700 text-sm my-4">
  <thead>
    <tr class="bg-gray-900 text-white font-semibold">
      <th class="px-4 py-2 text-left">Device / Brand</th>
      <th class="px-4 py-2 text-left">Username</th>
      <th class="px-4 py-2 text-left">Password</th>
      <th class="px-4 py-2 text-left">Access Level</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-t border-gray-800">
      <td class="px-4 py-2 font-medium">Huawei ONT (ISP admin)</td>
      <td class="px-4 py-2 font-mono">telecomadmin</td>
      <td class="px-4 py-2 font-mono">admintelecom</td>
      <td class="px-4 py-2 text-emerald-400 font-semibold">Full Root Access</td>
    </tr>
    <tr class="border-t border-gray-800 bg-gray-900/40">
      <td class="px-4 py-2 font-medium">Huawei ONT (end user)</td>
      <td class="px-4 py-2 font-mono">user</td>
      <td class="px-4 py-2 font-mono">(printed on label)</td>
      <td class="px-4 py-2 text-yellow-400">Basic Wi-Fi Only</td>
    </tr>
    <tr class="border-t border-gray-800">
      <td class="px-4 py-2 font-medium">ZTE ONT (ISP admin)</td>
      <td class="px-4 py-2 font-mono">admin</td>
      <td class="px-4 py-2 font-mono">admin (or label)</td>
      <td class="px-4 py-2 text-emerald-400 font-semibold">Full Access</td>
    </tr>
    <tr class="border-t border-gray-800 bg-gray-900/40">
      <td class="px-4 py-2 font-medium">Motorola Cable Modem</td>
      <td class="px-4 py-2 font-mono">admin</td>
      <td class="px-4 py-2 font-mono">motorola</td>
      <td class="px-4 py-2">Diagnostics</td>
    </tr>
    <tr class="border-t border-gray-800">
      <td class="px-4 py-2 font-medium">Arris SURFboard</td>
      <td class="px-4 py-2 font-mono">admin</td>
      <td class="px-4 py-2 font-mono">password</td>
      <td class="px-4 py-2">Signal Diagnostics</td>
    </tr>
  </tbody>
</table>

> **ISP Warning:** Many ISPs remotely lock the \`telecomadmin\` account or change its password to prevent unauthorized modifications to ONT configuration. If \`telecomadmin / admintelecom\` is rejected, contact your ISP directly or try the \`user\` account with the password printed on the device sticker.

### Step-by-Step Login Instructions

**Step 1 — Connect directly via Ethernet**
This is the most important step. Standalone modems and fiber ONTs typically do **not** provide DHCP to devices connected through a downstream router on a different subnet. Plug your computer **directly** into LAN Port 1 of the ONT or modem using an Ethernet cable. Bypass any personal router.

**Step 2 — Set a static IP if necessary**
If your computer does not automatically receive an IP in the 192.168.100.x range, set a temporary static IP:
- Windows: Network Adapter Settings → TCP/IPv4 → Use the following IP: **192.168.100.10**, Subnet mask: **255.255.255.0**, Default gateway: **192.168.100.1**
- After accessing the admin panel, switch back to "Obtain an IP address automatically".

**Step 3 — Open a browser and navigate**
Type **http://192.168.100.1** in the browser's address bar. Press Enter. The login page for your ONT or cable modem will appear.

**Step 4 — Enter the correct credentials**
Use the credentials from the table above matching your device type. For Huawei ONTs, start with **telecomadmin / admintelecom**. If that fails, try **user** with the password from your device sticker.

**Step 5 — What you can monitor and configure**
- **ONT status:** Optical power level (Rx power), uptime, GPON registration status
- **WAN settings:** PPPoE username/password, IP settings, VLAN configuration
- **Port forwarding:** NAT rules (only available in Router Mode)
- **Bridge Mode toggle:** Switch the ONT between Router Mode and Bridge Mode
- **WLAN settings:** If the ONT has built-in Wi-Fi
- **Cable modem:** Downstream/upstream signal levels, SNR, T3/T4 timeout counts

### Advanced Troubleshooting

**"Site can't be reached" from behind a router**
If your computer is connected to your personal router (e.g. at 192.168.1.1), your browser cannot reach 192.168.100.1 directly because the two subnets are isolated. You must connect your computer **directly** to the ONT/modem LAN port, bypassing the personal router entirely.

**telecomadmin rejected**
Your ISP has changed the telecomadmin password via TR-069 remote provisioning. Options:
1. Try the **user** account with the password on the device label
2. Contact your ISP and request they give you admin access or put the ONT in bridge mode
3. Some ISPs provide a local admin password in the customer portal

**No optical signal (LOS light red on Huawei ONT)**
LOS (Loss of Signal) means the ONT is not receiving light from the fiber line. Check:
1. The green SC/APC fiber connector at the bottom of the ONT — make sure it is fully inserted
2. The fiber cable for any sharp bends or physical damage
3. If the connector and cable are fine, the issue is upstream (fiber cut or OLT port failure) — contact your ISP

**Cable modem shows no WAN IP**
An empty or 0.0.0.0 WAN IP on a cable modem means authentication with the ISP head-end (CMTS) failed. Causes:
1. Account not activated or suspended
2. MAC address not provisioned (contact ISP)
3. Firmware mismatch — your ISP may need to push a firmware update

**Checking cable modem signal quality**
At 192.168.100.1 on a Motorola or Arris modem, navigate to Signal or Connection Status:
- **Downstream power:** Acceptable range is **-15 to +15 dBmV** (optimal: 0 dBmV)
- **Downstream SNR:** Should be **>30 dB** (ideally >35 dB)
- **Upstream power:** 38–48 dBmV is acceptable; above 50 dBmV indicates line problems
- **T3 Timeout count:** Should be 0. High counts indicate upstream packet loss

**Factory reset warning**
Resetting a Huawei ONT clears its GPON authentication keys (LOID / serial number registration). The fiber line will go offline until your ISP re-provisions the device remotely via the OLT. Only reset an ONT if instructed by your ISP.

### Understanding Bridge Mode vs Router Mode

Most fiber ONTs support two operational modes:

**Router Mode (default):** The ONT performs NAT, assigns IP addresses to devices via DHCP, and manages the WAN connection directly. Port forwarding and firewall rules are configured on the ONT. If you place a personal router behind the ONT in Router Mode, you get double-NAT.

**Bridge Mode:** The ONT acts purely as a media converter — it passes the ISP's raw WAN IP directly to your personal router. NAT, DHCP, and firewall are handled entirely by your router. This is the preferred configuration for users who want full control. Contact your ISP to enable Bridge Mode, or access the ONT at 192.168.100.1 and change the connection type under WAN Settings.

### Security on ISP Gateway Devices

ISP-deployed ONTs are managed remotely by the ISP through **TR-069** (a WAN management protocol). Your ISP can push configuration changes, firmware updates, and password resets to the device at any time. This limits what you can permanently change at 192.168.100.1. Treat these devices as ISP infrastructure, not personal equipment.

### Related Guides

- Huawei HG8145V5 ONT full setup: /routers/huawei
- Huawei MiFi login at 192.168.8.1: /ips/192-168-8-1
- Double NAT detected: /double-nat-detected
- Default gateway not available: /default-gateway-not-available
- Router not assigning IP addresses: /router-not-assigning-ip-addresses`,

  faqs: [
    {
      question: "What is 192.168.100.1?",
      answer:
        "192.168.100.1 is the default management IP for ISP-deployed fiber GPON gateways (ONTs) from Huawei and ZTE, and for standalone cable modems from Motorola and Arris. It provides access to signal diagnostics and WAN configuration.",
    },
    {
      question: "What devices use 192.168.100.1?",
      answer:
        "Huawei fiber ONTs (HG8145V5, HG8245H, EG8145V5), ZTE ONTs (F660, F680), Motorola cable modems (MB8600, MB7621), and Arris SURFboard modems use 192.168.100.1 as their management IP.",
    },
    {
      question: "What is the Huawei telecomadmin login?",
      answer:
        "telecomadmin is the ISP-level administrator account on Huawei ONTs with full access to all settings. The default password is admintelecom. Many ISPs change or lock this password remotely — contact your ISP if it fails.",
    },
    {
      question: "Why is 192.168.100.1 not accessible from my computer?",
      answer:
        "The most common cause is that your computer is connected through a personal router on a different subnet (e.g. 192.168.1.x). Connect your computer directly to the ONT or modem LAN port using an Ethernet cable to access 192.168.100.1.",
    },
    {
      question: "What is the difference between an ONT and a cable modem?",
      answer:
        "An ONT (Optical Network Terminal) converts fiber optic light signals to Ethernet, used in fiber/GPON networks. A cable modem converts coaxial cable signals to Ethernet using DOCSIS. Both often use 192.168.100.1 as their management IP.",
    },
    {
      question: "How do I check fiber signal levels at 192.168.100.1?",
      answer:
        "Log in at 192.168.100.1, navigate to Status → Optical Information (Huawei) or PON Information (ZTE). The Rx Optical Power should be between -8 dBm and -27 dBm. Values outside this range indicate a fiber connection problem.",
    },
    {
      question: "What does the LOS red light mean on a Huawei ONT?",
      answer:
        "LOS (Loss of Signal) means the ONT is not receiving optical light from the fiber line. Check that the green SC/APC fiber connector at the bottom is fully plugged in. If it is, the issue is likely a cut fiber or ISP infrastructure problem.",
    },
    {
      question: "Can I reset my fiber ONT at 192.168.100.1?",
      answer:
        "You can factory reset via the Reset button, but this clears the ONT's GPON registration keys. The fiber line will go offline until your ISP re-provisions the device remotely. Only reset if instructed by your ISP.",
    },
    {
      question: "What is bridge mode and how do I enable it?",
      answer:
        "Bridge mode turns the ONT into a pure media converter, passing the WAN IP to your personal router. This eliminates double NAT. Access 192.168.100.1 with telecomadmin and change the WAN connection type, or ask your ISP to enable it remotely.",
    },
    {
      question: "How do I check cable modem signal quality at 192.168.100.1?",
      answer:
        "Log in at 192.168.100.1 and go to Signal or Connection Status. Check Downstream Power (-15 to +15 dBmV), SNR (>30 dB), and Upstream Power (38-48 dBmV). High T3/T4 timeout counts indicate upstream packet loss.",
    },
    {
      question: "Can I change settings on my ISP-provided ONT?",
      answer:
        "The user account allows basic Wi-Fi changes. The telecomadmin account provides full access but ISPs may lock it. Advanced settings like VLAN and PPPoE credentials require telecomadmin or ISP assistance.",
    },
    {
      question: "Why is my WAN IP empty at 192.168.100.1?",
      answer:
        "An empty or 0.0.0.0 WAN IP means the device failed to authenticate with the ISP. Causes include: account not activated, MAC address not provisioned, or a GPON registration mismatch. Contact your ISP.",
    },
    {
      question: "What is TR-069 and how does it affect my ONT?",
      answer:
        "TR-069 is a WAN management protocol that allows your ISP to remotely configure, update, and monitor your ONT. ISPs use it to push firmware updates and configuration changes. Settings you change locally may be overwritten by TR-069.",
    },
    {
      question: "Can I update firmware on a Huawei ONT?",
      answer:
        "Huawei ONT firmware is managed remotely by your ISP via TR-069. You cannot manually update it from the admin panel. If you need a firmware update, contact your ISP.",
    },
    {
      question: "How is 192.168.100.1 different from 192.168.1.1?",
      answer:
        "192.168.100.1 is the management IP for ISP modems and ONTs (not purchased by the end user). 192.168.1.1 is the typical gateway for consumer routers (ASUS, Netgear, Linksys). In a standard home setup, the modem at 192.168.100.1 is upstream from the router at 192.168.1.1.",
    },
  ],

  metaTitle: "192.168.100.1 — Fiber ONT & Cable Modem Login Admin Page",
  metaDescription:
    "Access your fiber ONT or cable modem admin panel at 192.168.100.1. Complete login guide for Huawei, ZTE, Motorola, and Arris devices — signal diagnostics, bridge mode, and troubleshooting.",
  isPublished: true,
  status: "PUBLISHED" as const,
  decayScore: 0.95,
  diagnosticCategory: "CONNECTION",
};
