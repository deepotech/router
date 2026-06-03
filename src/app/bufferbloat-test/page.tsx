import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import TroubleshootingArticleShell from "@/components/tools/TroubleshootingArticleShell";
import ConnectionOptimizerClient from "@/components/tools/ConnectionOptimizerClient";

// ─────────────────────────────────────────────
// Premium SEO Metadata
// ─────────────────────────────────────────────
export const metadata: Metadata = buildMetadata({
  title:
    "Bufferbloat Test (2026) – How to Test Bufferbloat & Diagnose Loaded Latency on Any Connection",
  description:
    "Learn how to run a bufferbloat test and interpret your results. Use DSLReports, Waveform, and terminal commands to measure loaded latency, identify queue bloat, and confirm your A–F grade before and after applying SQM fixes.",
  canonical: "/bufferbloat-test",
  keywords: [
    "bufferbloat test",
    "how to test bufferbloat",
    "bufferbloat grade",
    "test internet bufferbloat",
    "loaded latency test",
    "bufferbloat checker",
    "dslreports bufferbloat test",
    "waveform bufferbloat test",
    "how to measure bufferbloat",
    "bufferbloat a grade",
    "bufferbloat score meaning",
    "bufferbloat diagnosis",
    "is my connection bufferbloated",
    "bufferbloat gaming test",
  ],
});

// ─────────────────────────────────────────────
// Breadcrumbs
// ─────────────────────────────────────────────
const breadcrumbs = [
  { name: "Gaming Net", url: "/problems" },
  { name: "Bufferbloat Test", url: "/bufferbloat-test" },
];

// ─────────────────────────────────────────────
// Troubleshooting Steps
// ─────────────────────────────────────────────
const troubleshootingSteps = [
  {
    title: "Run the DSLReports Speed & Bufferbloat Test",
    description:
      "Navigate to dslreports.com/speedtest in a desktop browser. Click Start Speed Test. The tool runs simultaneous upload and download saturation tests while measuring your latency (ICMP ping) in real-time under load. At the end it assigns a letter grade (A+ to F) based on the ratio of your loaded latency vs. your idle latency. Record your grade, idle ping, and loaded ping spike to document your baseline before applying any fixes.",
    tip: "Use a desktop browser, not a phone. Close all other browser tabs and stop any background downloads before running the test to ensure only the test itself is saturating your connection.",
  },
  {
    title: "Run the Waveform Bufferbloat Test for Detailed Metrics",
    description:
      "Navigate to waveform.com/tools/bufferbloat in a browser. This tool measures your connection quality using three simultaneous download streams, three simultaneous upload streams, and a continuous ICMP ping to a reference server. It reports your Download Latency, Upload Latency, and Idle Latency separately, making it easy to determine whether your bufferbloat is worse on upload or download. A loaded latency increase of less than 20ms is considered good.",
    tip: "Run the Waveform test twice — once with only your gaming device active, and once while another device streams 4K video. Compare both latency spikes to quantify how much bufferbloat is introduced by household background traffic.",
  },
  {
    title: "Perform a Manual Terminal Bufferbloat Test",
    description:
      "Open a terminal and start a continuous ping to 8.8.8.8 (ping 8.8.8.8 -t on Windows, ping 8.8.8.8 on macOS/Linux). Observe the idle ping value. Then open a browser and start a speed test at fast.com or speedtest.net. Watch the ping terminal during the speed test — if your ping value jumps by more than 15–20ms during the download phase or more than 30ms during the upload phase, your connection has bufferbloat. The exact spike amount is your bufferbloat severity.",
    tip: "The upload phase typically reveals worse bufferbloat than download, especially on DSL and cable connections where upload bandwidth is significantly lower than download bandwidth.",
  },
  {
    title: "Document Your Results Before Applying Any Fix",
    description:
      "Before changing any router settings, screenshot or record: your DSLReports grade (A–F), your idle ping, your download-loaded ping maximum, your upload-loaded ping maximum, and the date/time of the test. After applying SQM (FQ-CoDel or CAKE), run the exact same tests again. This before/after comparison proves whether the fix worked and by how much the bufferbloat was reduced.",
    tip: "Save the DSLReports test result URL — the site generates a permanent link for each test result that you can share with ISP support representatives as evidence of connection quality problems.",
  },
  {
    title: "Re-Test After Enabling SQM to Confirm Grade Improvement",
    description:
      "After enabling Smart Queue Management (SQM) on your router and setting the bandwidth cap to 85–90% of your measured speed, run the DSLReports and Waveform tests again. A correctly configured SQM system should reduce your bufferbloat grade from C/D/F to A or B. If the grade does not improve, confirm that hardware NAT acceleration (CTF/Flow Cache) has been disabled on your router, as it bypasses SQM entirely.",
    tip: "If your grade is still B or C after enabling SQM, try reducing your bandwidth caps further (to 80%) to give the queue management algorithm more headroom to enforce delay targets before the physical link saturates.",
  },
];

// ─────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────
const faqs = [
  {
    question: "What is a bufferbloat test?",
    answer:
      "A bufferbloat test measures how much your network latency (ping) increases when your internet connection is under full load — for example, when downloading a large file or streaming video. It does this by saturating your upload and download bandwidth simultaneously while continuously measuring ping. The difference between your idle ping (low load) and your loaded ping (full saturation) is your bufferbloat severity. The larger the spike, the worse your bufferbloat.",
  },
  {
    question: "What does the bufferbloat grade A, B, C, D, F mean?",
    answer:
      "The DSLReports bufferbloat grading system rates your connection based on how much loaded latency increases above your idle baseline. A+ or A means your loaded ping increased by less than 5–20ms — excellent, no bufferbloat problem. B means 20–50ms increase — acceptable. C means 50–100ms — noticeable gaming lag spikes. D means 100–300ms — severe bufferbloat requiring SQM. F means your ping spikes more than 300ms under load — unplayable for online games.",
  },
  {
    question: "What is the best tool to test bufferbloat?",
    answer:
      "The two most reliable bufferbloat test tools are: (1) DSLReports Speed Test (dslreports.com/speedtest) — provides a letter grade and shows your latency graph during the test, making it easy to visualize the spike. (2) Waveform Bufferbloat Test (waveform.com/tools/bufferbloat) — separates download and upload latency measurements, which helps identify whether upload-path or download-path bufferbloat is worse on your connection.",
  },
  {
    question: "How do I know if I have bufferbloat without a special tool?",
    answer:
      "Open a terminal and run a continuous ping (ping 8.8.8.8 -t on Windows). Note your idle ping (e.g., 15ms). Then start a speed test in your browser and watch the ping terminal. If your ping jumps from 15ms to 150ms or more during the download or upload phase, you have bufferbloat. The amount of the spike tells you the severity — a 10ms spike is fine, a 200ms spike is severe and requires SQM configuration on your router.",
  },
  {
    question: "Why does my ping spike when I run a speed test?",
    answer:
      "When you run a speed test, it saturates your entire download and upload bandwidth. Your router's internal buffer fills with queued speed test packets. Real-time packets — like your ping or game packets — must wait behind these queued packets before being transmitted. The time they spend waiting in the queue is the latency spike you observe. This is bufferbloat. The fix is to enable SQM (FQ-CoDel or CAKE) on your router, which keeps queue depths short even during full-bandwidth saturation.",
  },
  {
    question: "What is a good bufferbloat score?",
    answer:
      "A good bufferbloat score is an A or B grade on DSLReports, or a loaded latency increase of less than 30ms on Waveform. For competitive gaming, you want your loaded ping to increase by no more than 10–15ms above your idle baseline. An increase of 50ms or more will cause noticeable lag spikes during games when other household devices use the internet simultaneously.",
  },
  {
    question: "Does a fiber connection automatically pass the bufferbloat test?",
    answer:
      "No. Fiber optic connections have very low idle latency, but they can still fail the bufferbloat test if the router does not have proper queue management. Bufferbloat is a router-side problem, not a medium problem. Even a 1 Gbps fiber connection will show severe bufferbloat (D or F grade) if the router uses a basic FIFO queue without AQM. The fix is always router-side: enable SQM with FQ-CoDel or CAKE.",
  },
  {
    question: "How often should I run a bufferbloat test?",
    answer:
      "Run a bufferbloat test: (1) Before and after changing any router QoS settings to verify the fix worked. (2) After your ISP performs any line maintenance or firmware update on your modem. (3) If you notice sudden gaming lag spikes returning after a period of good performance. (4) Seasonally — ISP node load can change as neighbors upgrade their internet plans, potentially worsening upstream bufferbloat on shared infrastructure.",
  },
  {
    question: "Can I test bufferbloat on a mobile/4G connection?",
    answer:
      "Yes. Navigate to the Waveform Bufferbloat Test or DSLReports in your mobile browser. 4G and 5G connections often show moderate bufferbloat (B–C grade) because cellular networks include significant internal buffering in the radio access network (RAN) to handle wireless channel variability. If your mobile bufferbloat is worse than your home Wi-Fi, the cellular network itself is the limiting factor and cannot be fixed with router SQM.",
  },
  {
    question: "Does Starlink have bad bufferbloat?",
    answer:
      "Starlink connections typically show C–D grade bufferbloat without SQM due to the high variability in satellite link throughput caused by orbital geometry and atmospheric conditions. The bufferbloat is compounded by Starlink's use of large internal buffers to smooth over inter-beam handoffs. Running CAKE with a conservative bandwidth cap (70–80% of measured speed) on a router between your Starlink dish and your devices significantly improves bufferbloat grades to A or B.",
  },
];

// ─────────────────────────────────────────────
// Common Causes
// ─────────────────────────────────────────────
const commonCauses = [
  {
    title: "No Active Queue Management (AQM)",
    desc: "Default FIFO queues in consumer routers fill completely before dropping packets, causing 200–500ms delay spikes under bandwidth saturation.",
  },
  {
    title: "Hardware NAT Bypassing SQM",
    desc: "CTF/Flow Cache routes packets directly in hardware, completely bypassing any CPU-based SQM algorithm — making SQM appear active but have no effect.",
  },
  {
    title: "SQM Cap Set Too High",
    desc: "Setting the SQM bandwidth limit to 100% of line speed means the physical link saturates before SQM can constrain the queue, leaving bufferbloat intact.",
  },
  {
    title: "ISP-Side CMTS/DSLAM Buffering",
    desc: "Congested ISP distribution equipment maintains its own large buffers that home router SQM cannot control, causing residual bufferbloat at the WAN edge.",
  },
];

// ─────────────────────────────────────────────
// Quick Fix Checklist
// ─────────────────────────────────────────────
const quickFixChecklist = [
  "Run DSLReports Speed Test to get your current bufferbloat grade (A–F).",
  "Run Waveform Bufferbloat Test to separate download vs. upload latency spikes.",
  "Record your idle ping and loaded ping before making any router changes.",
  "Enable SQM (FQ-CoDel or CAKE) on your router — see /bufferbloat-fix for steps.",
  "Set SQM bandwidth caps to 85–90% of your actual measured speed.",
  "Disable hardware NAT acceleration (CTF) so SQM can operate on all flows.",
  "Re-run DSLReports after enabling SQM — confirm grade improved to A or B.",
  "If grade is still C or lower, reduce the SQM cap further to 80% of measured speed.",
];

// ─────────────────────────────────────────────
// Page Component
// ─────────────────────────────────────────────
export default function BufferbloatTestPage() {
  return (
    <TroubleshootingArticleShell
      h1="Bufferbloat Test: How to Measure, Diagnose, and Interpret Your Connection's Bufferbloat Grade"
      intro="Wondering why your ping spikes to 300ms the moment someone starts a download? Before you can fix bufferbloat, you need to measure it. This guide explains exactly how to run a bufferbloat test using DSLReports, Waveform, and terminal ping commands, how to interpret your A–F grade, and what your loaded latency numbers mean for gaming, video calls, and everyday browsing."
      category="wifi"
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      troubleshootingSteps={troubleshootingSteps}
      warningBanner={{
        title: "Test on Wired Ethernet for Accurate Results",
        text: "Always run your bufferbloat test with your testing device connected directly to your router via a wired Cat6 Ethernet cable. Running the test over Wi-Fi introduces wireless-layer jitter and retransmission delays that will artificially inflate your bufferbloat measurement, making it impossible to determine whether the problem is on your router or your wireless medium. Test on Ethernet, fix what you find, then re-test on Wi-Fi to isolate wireless-specific issues.",
      }}
      quickFixChecklist={quickFixChecklist}
      commonCauses={commonCauses}
      whenToContactISP="Contact your ISP if: after enabling SQM with correct settings your DSLReports grade remains D or F even on an otherwise idle network with only one device; a Waveform test shows high loaded latency starting immediately (suggesting ISP-side queue bloat at the CMTS/DSLAM before your traffic even reaches your router). Provide your Waveform test results and a WinMTR trace showing elevated latency at hop 2 (the ISP's first router) as evidence."
      severityLevel="medium"
    >
      <div className="space-y-12">

        {/* ── Section 1: Quick AI Answer ── */}
        <section
          className="glass-card p-6 border border-amber-950/20 bg-amber-950/5 rounded-2xl relative overflow-hidden"
          aria-label="Quick AI Answer"
        >
          <div className="absolute top-0 right-0 bg-[var(--brand-500)]/10 text-[var(--brand-400)] text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-bl-lg font-bold">
            Quick AI Response
          </div>
          <h2 className="text-xs font-bold text-[var(--brand-400)] mb-3 uppercase tracking-wide">
            How to Test Bufferbloat in 60 Seconds
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Go to <strong>dslreports.com/speedtest</strong> or <strong>waveform.com/tools/bufferbloat</strong>.
            Connect your device via <strong>Ethernet</strong>. Run the test. If your grade is{" "}
            <strong className="text-green-400">A or B</strong>, your connection is healthy.
            If it is <strong className="text-red-400">C, D, or F</strong>, you have bufferbloat — enable{" "}
            <strong>SQM (FQ-CoDel or CAKE)</strong> on your router following our{" "}
            <Link href="/bufferbloat-fix" className="text-[var(--brand-400)] hover:underline">
              Bufferbloat Fix Guide
            </Link>{" "}
            and re-test to confirm improvement.
          </p>
        </section>

        {/* ── Interactive Tool ── */}
        <section aria-label="Interactive Network Optimizer">
          <div className="mb-4">
            <h2 className="text-base font-bold text-[var(--text-primary)]">
              Interactive Latency & Bufferbloat Optimizer
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Configure your network environment to generate a custom remediation plan based on your connection type and router brand.
            </p>
          </div>
          <ConnectionOptimizerClient mode="latency" />
        </section>

        {/* ── Section 2: What the Test Measures ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            1. What a Bufferbloat Test Actually Measures
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            A bufferbloat test does not just measure your download or upload speed. It specifically measures{" "}
            <strong>loaded latency</strong> — how much your round-trip time (ping) increases when your internet connection is simultaneously handling a large data transfer.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            The test methodology is simple: it saturates your bandwidth (fills your download and upload channels to capacity) while continuously sending ICMP ping packets to a reference server. Under a FIFO-queued router, the ping packets must wait behind the bulk data in the buffer, causing latency to spike. The spike magnitude is your bufferbloat score.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            <div className="p-4 bg-[var(--bg-elevated)] border border-green-900/30 rounded-xl">
              <p className="text-xs font-bold text-green-400 mb-1">Idle Ping (No Load)</p>
              <p className="text-xs text-[var(--text-muted)]">Baseline latency with no bandwidth in use. Reflects physical distance to server and ISP routing quality.</p>
            </div>
            <div className="p-4 bg-[var(--bg-elevated)] border border-yellow-900/30 rounded-xl">
              <p className="text-xs font-bold text-yellow-400 mb-1">Download-Loaded Ping</p>
              <p className="text-xs text-[var(--text-muted)]">Ping measured while download is saturated. Higher spike = more download-path bufferbloat in router or modem buffers.</p>
            </div>
            <div className="p-4 bg-[var(--bg-elevated)] border border-red-900/30 rounded-xl">
              <p className="text-xs font-bold text-red-400 mb-1">Upload-Loaded Ping</p>
              <p className="text-xs text-[var(--text-muted)]">Ping measured while upload is saturated. Often worse than download on DSL/cable due to narrow upload bandwidth.</p>
            </div>
          </div>
        </section>

        {/* ── Section 3: DSLReports Method ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            2. How to Use DSLReports Speed Test for Bufferbloat
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            DSLReports is the most widely referenced bufferbloat test tool because it provides a clear letter grade and a real-time latency graph. Follow these steps for an accurate measurement:
          </p>
          <div className="space-y-3">
            {[
              { step: "1", title: "Connect via Ethernet", desc: "Plug your testing device directly into your router via a Cat6 cable. Wireless testing will add its own jitter on top of bufferbloat, making results inaccurate." },
              { step: "2", title: "Close all background traffic", desc: "Stop all downloads, streaming, cloud backups, and other network activity on all devices in your home. You want only the test to saturate the link." },
              { step: "3", title: "Open dslreports.com/speedtest", desc: "Navigate to the DSLReports Speed Test in a desktop browser (Chrome or Firefox recommended)." },
              { step: "4", title: "Click Start Speed Test", desc: "The test runs for approximately 30–60 seconds. Watch the Bufferbloat section on the right side of the screen — it shows real-time A–F grading." },
              { step: "5", title: "Record your results", desc: "Note: Download speed, Upload speed, Idle ping, Download latency (loaded ping under download), Upload latency (loaded ping under upload), Bufferbloat grade." },
              { step: "6", title: "Save the results link", desc: "After the test, DSLReports generates a permanent URL for your results. Copy it — you can share it with ISP support or compare it to future tests." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-4 p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--brand-600)] flex items-center justify-center text-white text-xs font-bold">
                  {step}
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--text-primary)]">{title}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 4: Waveform Method ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            3. How to Use the Waveform Bufferbloat Test
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            The Waveform Bufferbloat Test at <code>waveform.com/tools/bufferbloat</code> provides more granular data than DSLReports, separating download and upload latency measurements independently:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">Waveform Metric</th>
                  <th className="px-4 py-3 text-left">What It Means</th>
                  <th className="px-4 py-3 text-left">Good Value</th>
                  <th className="px-4 py-3 text-left">Bad Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Idle Latency</td>
                  <td className="px-4 py-3">Your baseline ping with no load</td>
                  <td className="px-4 py-3 text-green-400">&lt;30ms</td>
                  <td className="px-4 py-3 text-red-400">&gt;100ms</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Download Latency</td>
                  <td className="px-4 py-3">Ping measured during full download saturation</td>
                  <td className="px-4 py-3 text-green-400">&lt;20ms increase</td>
                  <td className="px-4 py-3 text-red-400">&gt;100ms increase</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Upload Latency</td>
                  <td className="px-4 py-3">Ping measured during full upload saturation</td>
                  <td className="px-4 py-3 text-green-400">&lt;20ms increase</td>
                  <td className="px-4 py-3 text-red-400">&gt;100ms increase</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Bi-directional Latency</td>
                  <td className="px-4 py-3">Ping during simultaneous up + download saturation</td>
                  <td className="px-4 py-3 text-green-400">&lt;30ms increase</td>
                  <td className="px-4 py-3 text-red-400">&gt;150ms increase</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            If your <strong>Upload Latency is much worse</strong> than your Download Latency, your SQM upload cap is either set too high or hardware NAT is bypassing your upload queue. If <strong>Download Latency is worse</strong>, check that your download SQM cap is correct and that your modem&apos;s internal receive buffer is not bloating.
          </p>
        </section>

        {/* ── Section 5: Manual Terminal Test ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            4. Manual Terminal Bufferbloat Test (Windows, macOS, Linux)
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            You can perform a manual bufferbloat test without any external tool using your operating system&apos;s built-in terminal commands. This method gives you the raw latency numbers directly:
          </p>
          <div className="space-y-4">
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-3">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Windows (Command Prompt)</h3>
              <p className="text-xs text-[var(--text-muted)]">Step 1: Open Command Prompt. Run the ping and note idle time. Step 2: Open browser and start Fast.com. Step 3: Watch Command Prompt for spikes.</p>
              <pre className="p-3 bg-black/40 rounded font-mono text-[10px] text-green-400 overflow-x-auto">
{`# Step 1: Start continuous ping (note idle ping)
ping 8.8.8.8 -t

# Step 2: Open browser, go to fast.com
# Step 3: Watch ping output during speed test
# If ping jumps from e.g. 20ms to 200ms = bufferbloat confirmed

# Optional: measure with timestamp
ping 8.8.8.8 -t | Tee-Object -FilePath ping_log.txt`}
              </pre>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-3">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">macOS / Linux (Terminal)</h3>
              <pre className="p-3 bg-black/40 rounded font-mono text-[10px] text-green-400 overflow-x-auto">
{`# Start continuous ping
ping -i 0.2 8.8.8.8

# While ping is running, open browser and start fast.com
# Watch ping output — the spike during saturation = your bufferbloat

# Advanced: use mtr for per-hop analysis
mtr --report --report-cycles=60 8.8.8.8`}
              </pre>
            </div>
            <div className="glass-card p-5 border border-[var(--border-subtle)] rounded-xl space-y-3">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">How to Interpret Terminal Results</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs text-[var(--text-muted)]">
                  <thead>
                    <tr className="text-[var(--text-primary)] font-semibold border-b border-[var(--border-subtle)]">
                      <th className="py-2 pr-6 text-left">Observed Ping Behavior</th>
                      <th className="py-2 text-left">Interpretation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-subtle)]/50">
                    <tr>
                      <td className="py-2 pr-6 text-green-400 font-mono">15ms → 18ms during test</td>
                      <td className="py-2">No bufferbloat — excellent AQM in place</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-6 text-yellow-400 font-mono">15ms → 45ms during test</td>
                      <td className="py-2">Mild bufferbloat — B grade, minor SQM tuning needed</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-6 text-orange-400 font-mono">15ms → 120ms during test</td>
                      <td className="py-2">Significant bufferbloat — C/D grade, SQM required</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-6 text-red-400 font-mono">15ms → 400ms during test</td>
                      <td className="py-2">Severe bufferbloat — F grade, full SQM overhaul needed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 6: Grade Table ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            5. Complete Bufferbloat Grade Reference Table (A+ to F)
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            This table shows what each DSLReports grade means, how much latency increase it represents, and the impact on different use cases:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">Grade</th>
                  <th className="px-4 py-3 text-left">Loaded Latency Increase</th>
                  <th className="px-4 py-3 text-left">Competitive Gaming</th>
                  <th className="px-4 py-3 text-left">Video Calls</th>
                  <th className="px-4 py-3 text-left">Browsing</th>
                  <th className="px-4 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-bold text-green-400 text-base">A+</td>
                  <td className="px-4 py-3">&lt;5ms under full load</td>
                  <td className="px-4 py-3 text-green-400">✅ Excellent</td>
                  <td className="px-4 py-3 text-green-400">✅ Perfect</td>
                  <td className="px-4 py-3 text-green-400">✅ Instant</td>
                  <td className="px-4 py-3">Nothing — optimal</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold text-green-400 text-base">A</td>
                  <td className="px-4 py-3">5–20ms under full load</td>
                  <td className="px-4 py-3 text-green-400">✅ Great</td>
                  <td className="px-4 py-3 text-green-400">✅ Great</td>
                  <td className="px-4 py-3 text-green-400">✅ Fast</td>
                  <td className="px-4 py-3">Nothing — healthy</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold text-yellow-400 text-base">B</td>
                  <td className="px-4 py-3">20–50ms under full load</td>
                  <td className="px-4 py-3 text-yellow-400">⚠️ Acceptable</td>
                  <td className="px-4 py-3 text-green-400">✅ Fine</td>
                  <td className="px-4 py-3 text-green-400">✅ Fine</td>
                  <td className="px-4 py-3">Optional SQM tuning</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold text-orange-400 text-base">C</td>
                  <td className="px-4 py-3">50–100ms under full load</td>
                  <td className="px-4 py-3 text-red-400">❌ Noticeable lag</td>
                  <td className="px-4 py-3 text-yellow-400">⚠️ Minor glitches</td>
                  <td className="px-4 py-3 text-yellow-400">⚠️ Sluggish</td>
                  <td className="px-4 py-3">Enable SQM immediately</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold text-red-400 text-base">D</td>
                  <td className="px-4 py-3">100–300ms under full load</td>
                  <td className="px-4 py-3 text-red-500">❌ Severe desync</td>
                  <td className="px-4 py-3 text-red-400">❌ Frequent drops</td>
                  <td className="px-4 py-3 text-red-400">❌ Very slow</td>
                  <td className="px-4 py-3">SQM + disable HW NAT</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold text-red-600 text-base">F</td>
                  <td className="px-4 py-3">&gt;300ms under full load</td>
                  <td className="px-4 py-3 text-red-600">❌ Unplayable</td>
                  <td className="px-4 py-3 text-red-600">❌ Call drops</td>
                  <td className="px-4 py-3 text-red-600">❌ Timeouts</td>
                  <td className="px-4 py-3">Full router SQM overhaul</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Section 7: Bufferbloat by Connection Type ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            6. Typical Bufferbloat Test Results by Connection Type
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Different internet connection types have different baseline bufferbloat characteristics, even before applying SQM fixes:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <thead>
                <tr className="bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold">
                  <th className="px-4 py-3 text-left">Connection Type</th>
                  <th className="px-4 py-3 text-left">Typical Grade (No SQM)</th>
                  <th className="px-4 py-3 text-left">Typical Grade (With SQM)</th>
                  <th className="px-4 py-3 text-left">Primary Bufferbloat Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-surface)]/20">
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Fiber (FTTH)</td>
                  <td className="px-4 py-3"><span className="text-yellow-400">B–C</span></td>
                  <td className="px-4 py-3"><span className="text-green-400">A+–A</span></td>
                  <td className="px-4 py-3">Router FIFO queue only</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Cable (DOCSIS 3.1)</td>
                  <td className="px-4 py-3"><span className="text-orange-400">C–D</span></td>
                  <td className="px-4 py-3"><span className="text-green-400">A–B</span></td>
                  <td className="px-4 py-3">Router + cable modem buffer</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">DSL (PPPoE)</td>
                  <td className="px-4 py-3"><span className="text-red-400">D–F</span></td>
                  <td className="px-4 py-3"><span className="text-yellow-400">B–C</span></td>
                  <td className="px-4 py-3">Router + ISP DSLAM buffers</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">5G Home Internet</td>
                  <td className="px-4 py-3"><span className="text-orange-400">C–D</span></td>
                  <td className="px-4 py-3"><span className="text-yellow-400">B</span></td>
                  <td className="px-4 py-3">Router + cellular RAN buffers</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-[var(--brand-400)]">Starlink</td>
                  <td className="px-4 py-3"><span className="text-red-400">D–F</span></td>
                  <td className="px-4 py-3"><span className="text-yellow-400">B–C</span></td>
                  <td className="px-4 py-3">Satellite RAN + router buffers</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Section 8: Before vs After ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            7. What a Before vs. After Bufferbloat Test Should Look Like
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            After enabling SQM with the correct settings, your bufferbloat test results should show a dramatic improvement in loaded latency while your raw speed remains roughly the same (only slightly reduced by the SQM cap):
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-5 border border-red-900/30 bg-red-950/5 rounded-xl space-y-3">
              <h3 className="text-sm font-bold text-red-400">❌ Before SQM (Typical D Grade)</h3>
              <div className="space-y-1.5 text-xs text-[var(--text-muted)] font-mono">
                <p>Download Speed: 94 Mbps</p>
                <p>Upload Speed: 11 Mbps</p>
                <p>Idle Ping: 16ms</p>
                <p className="text-red-400">Download Loaded Ping: 287ms (+271ms)</p>
                <p className="text-red-400">Upload Loaded Ping: 412ms (+396ms)</p>
                <p className="text-red-400">Bufferbloat Grade: D</p>
              </div>
            </div>
            <div className="glass-card p-5 border border-green-900/30 bg-green-950/5 rounded-xl space-y-3">
              <h3 className="text-sm font-bold text-green-400">✅ After SQM/CAKE (A Grade)</h3>
              <div className="space-y-1.5 text-xs text-[var(--text-muted)] font-mono">
                <p>Download Speed: 85 Mbps (−10%)</p>
                <p>Upload Speed: 10 Mbps (−9%)</p>
                <p>Idle Ping: 16ms</p>
                <p className="text-green-400">Download Loaded Ping: 23ms (+7ms)</p>
                <p className="text-green-400">Upload Loaded Ping: 21ms (+5ms)</p>
                <p className="text-green-400">Bufferbloat Grade: A</p>
              </div>
            </div>
          </div>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Notice that raw speed dropped by only ~10% (the SQM cap) but loaded latency improved by over <strong>400ms</strong>. This is the trade-off: a small reduction in peak throughput eliminates the bufferbloat spike completely, making the connection feel dramatically smoother for gaming, video calls, and responsive browsing.
          </p>
        </section>

        {/* ── Section 9: When SQM Doesn't Fix It ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            8. Why Your Bufferbloat Grade Didn&apos;t Improve After Enabling SQM
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            If you enabled SQM but your DSLReports grade is still C or worse, work through this troubleshooting checklist:
          </p>
          <div className="space-y-3">
            {[
              {
                issue: "Hardware NAT is still enabled",
                fix: "Disable CTF, Cut-Through Forwarding, Flow Cache, or NAT Acceleration on your router. This is the #1 reason SQM appears active but has zero effect.",
              },
              {
                issue: "SQM bandwidth cap set to advertised speed (not measured speed)",
                fix: "Run a raw speed test first. Set SQM caps to 85–90% of the measured result, not your ISP plan speed. Plan speeds are theoretical maximums.",
              },
              {
                issue: "SQM applied to wrong interface",
                fix: "Confirm SQM is applied to the WAN interface (eth0.2, pppoe-wan, etc.) — not a LAN interface. Only the WAN interface creates the bottleneck.",
              },
              {
                issue: "ISP-side DSLAM or CMTS buffering",
                fix: "If your grade is still D/F even with a single device and idle network, the ISP's own equipment may be bloating. Contact ISP and request node inspection.",
              },
              {
                issue: "Router CPU cannot keep up with line speed",
                fix: "SQM requires the router's CPU to inspect every packet. On older routers with slow CPUs, SQM may cause packet loss at high speeds. Consider upgrading to a modern router or flashing OpenWrt on a more powerful device.",
              },
            ].map(({ issue, fix }) => (
              <div key={issue} className="p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl">
                <p className="text-xs font-bold text-red-400 mb-1">⚠️ {issue}</p>
                <p className="text-xs text-[var(--text-muted)]">Fix: {fix}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 10: Internal Links ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            9. Next Steps: Fix Your Bufferbloat and Optimize Your Gaming Connection
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Once you&apos;ve tested and confirmed your bufferbloat grade, use these guides to fix it and optimize your entire gaming network:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: "/bufferbloat-fix", label: "Bufferbloat Fix Guide", desc: "Complete SQM, FQ-CoDel, and CAKE configuration for all router brands" },
              { href: "/gaming-lag-spikes-fix", label: "Gaming Lag Spikes Fix", desc: "Fix sudden latency spikes in competitive games" },
              { href: "/gaming-jitter-fix", label: "Gaming Jitter Fix", desc: "Reduce packet delay variation and stabilize ping" },
              { href: "/gaming-packet-loss-fix", label: "Gaming Packet Loss Fix", desc: "Stop dropped packets in Warzone, Valorant, CS2" },
              { href: "/high-ping-fix", label: "High Ping Fix", desc: "Reduce your baseline latency to game servers" },
              { href: "/how-to-reduce-latency", label: "How to Reduce Latency", desc: "Comprehensive latency reduction for all connection types" },
              { href: "/best-qos-settings-for-gaming", label: "Best QoS Settings", desc: "Optimize router QoS rules for gaming traffic" },
              { href: "/best-router-settings-for-gaming", label: "Best Router Settings", desc: "Full gaming router optimization guide" },
              { href: "/packet-loss-test", label: "Packet Loss Test", desc: "Check your connection for true packet drops" },
            ].map(({ href, label, desc }) => (
              <Link
                key={href}
                href={href}
                className="glass-card p-4 border border-[var(--border-subtle)] rounded-xl hover:border-[var(--brand-800)] transition-all duration-200 group"
              >
                <p className="text-xs font-bold text-[var(--brand-400)] group-hover:text-[var(--brand-300)] transition-colors">
                  {label}
                </p>
                <p className="text-[11px] text-[var(--text-muted)] mt-1">{desc}</p>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </TroubleshootingArticleShell>
  );
}
