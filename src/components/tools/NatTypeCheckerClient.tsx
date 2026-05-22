"use client";

import { useState } from "react";
import { Gamepad2, ArrowRight, ShieldCheck, ShieldAlert, CheckCircle2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Question {
  id: number;
  text: string;
  options: { label: string; value: string; nextStep?: number }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Which gaming platform are you currently using?",
    options: [
      { label: "PlayStation 5 / PlayStation 4", value: "playstation" },
      { label: "Xbox Series X / Series S / One", value: "xbox" },
      { label: "Nintendo Switch", value: "switch" },
      { label: "PC / Steam / Epic Games", value: "pc" },
    ],
  },
  {
    id: 2,
    text: "How is your gaming system connected to your router?",
    options: [
      { label: "WiFi (Wireless Connection)", value: "wifi" },
      { label: "Ethernet LAN Cable (Wired)", value: "lan" },
    ],
  },
  {
    id: 3,
    text: "Do you have multiple routers in your home network (e.g. ISP Modem/Router + Mesh WiFi)?",
    options: [
      { label: "No, just a single router/modem", value: "single-router" },
      { label: "Yes, I have an ISP modem connected to a separate router", value: "double-nat" },
    ],
  },
  {
    id: 4,
    text: "Which error message or connection behavior do you experience?",
    options: [
      { label: "Strict NAT / Type 3 / NAT Type F", value: "strict" },
      { label: "Moderate NAT / Type 2 / Double NAT warning", value: "moderate" },
      { label: "Voice chat fail / Can join games but can't host", value: "voice-fail" },
      { label: "No connection errors, just want to check", value: "none" },
    ],
  },
];

export default function NatTypeCheckerClient() {
  const [step, setStep] = useState(0); // 0 = intro, 1-4 = questions, 5 = results
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function handleSelect(questionKey: string, value: string) {
    setAnswers((prev) => ({ ...prev, [questionKey]: value }));
    if (step < QUESTIONS.length) {
      setStep((s) => s + 1);
    } else {
      calculateResults();
    }
  }

  function calculateResults() {
    setLoading(true);
    setTimeout(() => {
      setStep(5);
      setLoading(false);
    }, 1200);
  }

  function reset() {
    setAnswers({});
    setStep(0);
  }

  const currentQuestion = QUESTIONS[step - 1];

  // Logic to determine estimated NAT Type
  const isDoubleNat = answers["multiple-routers"] === "double-nat" || answers["multiple-routers"] === "yes";
  const isStrictInput = answers["error-behavior"] === "strict" || answers["error-behavior"] === "voice-fail";
  const platform = answers["platform"] || "playstation";

  let natType = "Moderate (Type 2 / B)";
  let natStatusColor = "text-amber-400 border-amber-800/40 bg-amber-900/10";
  let natDescription = "Your ports are partially translated. You can play online and join lobbies, but you will occasionally experience chat dropouts or fail to host lobbies for strict players.";
  let natIcon = ShieldAlert;

  if (isDoubleNat) {
    natType = "Strict (Double NAT Detected)";
    natStatusColor = "text-red-400 border-red-800/40 bg-red-900/10";
    natDescription = "Double Network Address Translation detected! You have two active DHCP/NAT routers chaining your connection, severely blocking inbound peer handshake ports.";
    natIcon = ShieldAlert;
  } else if (isStrictInput) {
    natType = "Strict (Type 3 / C / D / F)";
    natStatusColor = "text-red-400 border-red-800/40 bg-red-900/10";
    natDescription = "Your router's secure firewall is actively blocking incoming ports required for peer-to-peer matchmaking. Lobby creation, hosting, and party voice chat will fail.";
    natIcon = ShieldAlert;
  } else if (answers["error-behavior"] === "none") {
    natType = "Open (Type 1 / A)";
    natStatusColor = "text-emerald-400 border-emerald-800/40 bg-emerald-900/10";
    natDescription = "Perfect connectivity! Your console has unrestricted access to the public internet. You can host multiplayer lobbies, join any game, and use clear voice chat.";
    natIcon = ShieldCheck;
  }

  const NatIcon = natIcon;

  return (
    <div className="glass-card p-6 border border-[var(--border-subtle)] rounded-2xl relative overflow-hidden">
      {/* Dynamic Grid Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/5 via-transparent to-transparent pointer-events-none" />

      {/* STEP 0: INTRO */}
      {step === 0 && (
        <div className="space-y-4 text-center py-6 relative z-10">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-900/20 border border-cyan-800/40 flex items-center justify-center text-cyan-400 animate-pulse">
            <Gamepad2 size={28} />
          </div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Determine Your Multiplayer NAT Status
          </h2>
          <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
            Answer 4 simple questions about your home router, gaming system, and connection setup to calculate your exact NAT Type and receive a step-by-step custom fix guide.
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => setStep(1)}
            id="start-nat-checker-btn"
            className="mt-4"
          >
            Start NAT Assessment <ArrowRight size={15} className="ml-1.5" />
          </Button>
        </div>
      )}

      {/* QUESTION STEPS */}
      {step > 0 && step <= QUESTIONS.length && currentQuestion && (
        <div className="space-y-6 relative z-10">
          {/* Progress Bar */}
          <div className="w-full h-1 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
              style={{ width: `${(step / QUESTIONS.length) * 100}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] text-[var(--text-muted)] font-mono uppercase tracking-wider">
            <span>Assessment Step {step} of {QUESTIONS.length}</span>
            <span>{Math.round((step / QUESTIONS.length) * 100)}% Complete</span>
          </div>

          <h3 className="text-sm md:text-base font-bold text-[var(--text-primary)]">
            {currentQuestion.text}
          </h3>

          <div className="grid grid-cols-1 gap-3">
            {currentQuestion.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect(`q-${step}`, opt.value)}
                className="w-full text-left px-5 py-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-cyan-800/40 hover:bg-[var(--bg-surface)] rounded-xl text-xs md:text-sm text-[var(--text-primary)] font-medium transition-all duration-200 cursor-pointer flex items-center justify-between"
              >
                <span>{opt.label}</span>
                <span className="w-2 h-2 rounded-full bg-transparent border border-[var(--text-muted)] group-hover:border-cyan-400" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <RefreshCw size={24} className="text-cyan-400 animate-spin" />
          <p className="text-xs text-[var(--text-muted)] font-mono">Analyzing network configuration hops…</p>
        </div>
      )}

      {/* RESULTS STEP */}
      {step === 5 && !loading && (
        <div className="space-y-6 relative z-10">
          <div className={`p-5 rounded-2xl border ${natStatusColor} flex items-start gap-4`}>
            <NatIcon size={24} className="shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-[var(--text-primary)] font-mono uppercase tracking-wider">
                Estimated NAT Type: {natType}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {natDescription}
              </p>
            </div>
          </div>

          {/* Action Steps */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
              Recommended Network Actions:
            </h4>
            <div className="divide-y divide-[var(--border-subtle)] border border-[var(--border-subtle)] rounded-xl overflow-hidden bg-[var(--bg-elevated)] text-xs">
              {isDoubleNat ? (
                <>
                  <div className="p-4 space-y-1">
                    <h5 className="font-semibold text-[var(--text-primary)]">1. Enable AP / Bridge Mode</h5>
                    <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">Log into your secondary personal router and change its connection operation to <strong>Access Point (AP) Mode</strong> or <strong>Bridge Mode</strong>. This disables its secondary DHCP NAT server.</p>
                  </div>
                  <div className="p-4 space-y-1">
                    <h5 className="font-semibold text-[var(--text-primary)]">2. Bypass ISP Gateway</h5>
                    <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">Alternatively, configure the ISP gateway modem into full transparent <strong>Bridge Mode</strong>, delegating all routing tasks exclusively to your own mesh router.</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-4 space-y-1">
                    <h5 className="font-semibold text-[var(--text-primary)]">1. Enable UPnP in Router Console</h5>
                    <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">Access your router admin settings (usually at 192.168.1.1) and toggle <strong>UPnP (Universal Plug and Play)</strong> to enabled. This is the simplest fix for moderate NAT.</p>
                  </div>
                  <div className="p-4 space-y-1">
                    <h5 className="font-semibold text-[var(--text-primary)]">2. Allocate Static DHCP Lease</h5>
                    <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">Bind your gaming console/PC MAC address to a permanent, static local IP address under your router DHCP setup to keep routing rules locked.</p>
                  </div>
                  <div className="p-4 space-y-1">
                    <h5 className="font-semibold text-[var(--text-primary)]">3. Set Up Permanent Port Forwarding</h5>
                    <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">Create explicit port forwarding rules linking your device IP to required game ports (e.g. TCP 3478-3480 and UDP 3074, 3478-3479 for PlayStation).</p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="secondary" size="md" onClick={reset} className="flex-1">
              Reset Checker
            </Button>
            {natType.includes("Strict") && (
              <a
                href="#port-forwarding-tutorial"
                className="flex-1 inline-flex items-center justify-center text-xs font-semibold px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-white transition-all shadow-md"
              >
                Go to Port Forwarding Tutorial
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
