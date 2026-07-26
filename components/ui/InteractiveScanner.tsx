"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Play, RotateCcw, AlertTriangle, CheckCircle, Terminal, Download, Cpu, Activity } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cyberSound } from "@/lib/cyberSound";

interface ScanLog {
  id: number;
  time: string;
  stage: string;
  type: "info" | "success" | "warning" | "alert";
  message: string;
}

const PRESETS = [
  "api.enterprise-app.com",
  "k8s-cloud.production-mesh.net",
  "fintech-vault.ademzweb.io",
];

const PROFILES = [
  { id: "web", name: "Web App & OWASP Top 10", duration: 3500 },
  { id: "api", name: "REST / GraphQL API Gateway", duration: 3000 },
  { id: "cloud", name: "Multi-Cloud IAM & Storage", duration: 4000 },
  { id: "network", name: "Perimeter Network & Ports", duration: 3200 },
];

export function InteractiveScanner() {
  const [target, setTarget] = useState("api.enterprise-app.com");
  const [profile, setProfile] = useState("web");
  const [isScanning, setIsScanning] = useState(false);
  const [scanCompleted, setScanCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState("");
  const [logs, setLogs] = useState<ScanLog[]>([]);

  const runScan = () => {
    cyberSound.playBeep(900, 0.1, "sawtooth");
    setIsScanning(true);
    setScanCompleted(false);
    setProgress(0);
    setLogs([]);

    const now = new Date();
    const formatTime = () => new Date().toLocaleTimeString();

    const selectedProf = PROFILES.find((p) => p.id === profile) || PROFILES[0];
    const totalDuration = selectedProf.duration;

    const stages = [
      { p: 15, stage: "Reconnaissance", log: `Initializing DNS & IP resolution for ${target}...`, type: "info" },
      { p: 35, stage: "Port & TLS Audit", log: "Auditing TLS 1.3 ciphers, HSTS headers, and open ports...", type: "info" },
      { p: 60, stage: "Payload Fuzzing", log: "Simulating SQLi, XSS, SSRF, and BOLA authentication probes...", type: "warning" },
      { p: 85, stage: "Compliance Cross-check", log: "Evaluating SOC 2 Type II & ISO 27001 policy controls...", type: "info" },
      { p: 100, stage: "Audit Complete", log: `Scan finished successfully for ${target}. Zero critical unpatched vulnerabilities found!`, type: "success" },
    ];

    let currentStep = 0;
    const intervalTime = totalDuration / stages.length;

    const timer = setInterval(() => {
      if (currentStep < stages.length) {
        const stepData = stages[currentStep];
        setProgress(stepData.p);
        setCurrentStage(stepData.stage);
        cyberSound.playBeep(600 + currentStep * 150, 0.05, "sine");

        setLogs((prev) => [
          ...prev,
          {
            id: Date.now() + currentStep,
            time: formatTime(),
            stage: stepData.stage,
            type: stepData.type as "info" | "success" | "warning" | "alert",
            message: stepData.log,
          },
        ]);

        currentStep++;
      } else {
        clearInterval(timer);
        setIsScanning(false);
        setScanCompleted(true);
        cyberSound.playScanSuccess();
      }
    }, intervalTime);
  };

  return (
    <div className="terminal-panel overflow-hidden border border-border/80 bg-surface/90 shadow-2xl backdrop-blur-xl">
      {/* Terminal Bar */}
      <div className="terminal-header justify-between bg-surfaceLight/80 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="terminal-dot bg-red-500/80" />
          <div className="terminal-dot bg-amber-500/80" />
          <div className="terminal-dot bg-emerald-500/80" />
          <span className="ml-2 font-mono text-xs font-semibold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
            <Terminal size={14} className="text-accent" />
            Ademzweb Interactive Threat Matrix & Vulnerability Audit Tool
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-0.5 font-mono text-xs font-medium text-accent border border-accent/20">
            <Activity size={12} className="animate-pulse" />
            LIVE SIMULATOR
          </span>
        </div>
      </div>

      <div className="p-6 md:p-8">
        {/* Controls Grid */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Inputs Section */}
          <div className="space-y-4 lg:col-span-7">
            <div>
              <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-text-muted">
                Target Hostname / IP / Domain
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  disabled={isScanning}
                  placeholder="e.g. app.yourdomain.com"
                  /* FIX: Added pr-72 (right padding) and explicit text color styling */
                  className="w-full rounded-lg border border-border bg-background px-4 pr-72 py-3 font-mono text-sm text-text-light dark:text-text placeholder:text-text-muted/40 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-60"
                />
  
                {/* Preset Quick Buttons */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  {PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        cyberSound.playClick();
                        setTarget(preset);
                      }}
                      disabled={isScanning}
                      /* FIX: Ensured background is dark/transparent surface and text stays readable */
                      className="hidden sm:inline-block rounded border border-border/50 bg-surface/80 px-2 py-1 font-mono text-[10px] text-text-muted transition-colors hover:border-accent hover:bg-accent/20 hover:text-accent disabled:opacity-50"
                    >
                      {preset.split(".")[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-text-muted">
                Select Audit Profile Matrix
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-2">
                {PROFILES.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      cyberSound.playClick();
                      setProfile(p.id);
                    }}
                    disabled={isScanning}
                    className={`rounded-lg border px-3 py-2.5 text-left font-mono text-xs transition-all ${
                      profile === p.id
                        ? "border-accent bg-accent/10 font-semibold text-accent"
                        : "border-border bg-background/50 text-text-muted hover:border-text-muted"
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <Button
                onClick={runScan}
                disabled={isScanning || !target}
                size="lg"
                className="w-full justify-center gap-2"
              >
                {isScanning ? (
                  <>
                    <Cpu size={18} className="animate-spin" />
                    Scanning Matrix... {progress}%
                  </>
                ) : (
                  <>
                    <Play size={18} />
                    Run Vulnerability & Security Audit
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Live Progress & Score Card */}
          <div className="flex flex-col justify-between rounded-xl border border-border/80 bg-background/60 p-5 lg:col-span-5">
            <div>
              <div className="flex items-center justify-between border-b border-border/50 pb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
                  Audit Status Index
                </span>
                <span className="font-mono text-xs font-semibold text-accent">
                  {isScanning ? currentStage : scanCompleted ? "Passed Grade A+" : "Ready"}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="mb-1 flex justify-between font-mono text-xs text-text-muted">
                  <span>Execution Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-surfaceLight">
                  <motion.div
                    className="h-full bg-gradient-to-r from-accent/80 via-accent to-white"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "easeInOut" }}
                  />
                </div>
              </div>

              {/* Security Score Meter */}
              <div className="mt-6 text-center">
                <div className="inline-flex h-24 w-24 items-center justify-center rounded-full border-4 border-accent/30 bg-accent/5 font-display text-3xl font-bold text-text shadow-inner">
                  {scanCompleted ? (
                    <span className="gradient-text">98</span>
                  ) : isScanning ? (
                    <span className="animate-pulse text-accent">{progress}</span>
                  ) : (
                    <ShieldCheck size={36} className="text-text-muted" />
                  )}
                </div>
                <p className="mt-2 font-mono text-xs text-text-muted">
                  {scanCompleted
                    ? "Security Score: 98/100 (Hardened)"
                    : isScanning
                    ? "Evaluating posture telemetry..."
                    : "Click Run to analyze vulnerability index"}
                </p>
              </div>
            </div>

            {scanCompleted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex gap-2 pt-3 border-t border-border/50"
              >
                <button
                  type="button"
                  onClick={() => {
                    cyberSound.playClick();
                    alert(`Simulated PDF Security Report downloaded for target: ${target}`);
                  }}
                  className="flex-1 rounded-lg border border-accent/40 bg-accent/10 py-2 font-mono text-xs text-accent transition-colors hover:bg-accent hover:text-background flex items-center justify-center gap-1.5"
                >
                  <Download size={14} />
                  Download Report PDF
                </button>
                <button
                  type="button"
                  onClick={runScan}
                  className="rounded-lg border border-border p-2 text-text-muted transition-colors hover:border-accent hover:text-accent"
                  title="Rescan"
                >
                  <RotateCcw size={14} />
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Real-time Telemetry Console Output */}
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between font-mono text-xs text-text-muted">
            <span>REAL-TIME AUDIT TELEMETRY LOGS</span>
            <span>{logs.length} entries</span>
          </div>

          <div className="h-44 overflow-y-auto rounded-lg border border-border/70 bg-black/60 p-4 font-mono text-xs">
            {logs.length === 0 ? (
              <div className="flex h-full items-center justify-center text-text-muted/40">
                &gt; Waiting for audit initialization. Enter host and click Run.
              </div>
            ) : (
              <div className="space-y-1.5">
                {logs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-2"
                  >
                    <span className="text-text-muted/50">[{log.time}]</span>
                    <span className="font-semibold text-accent">[{log.stage}]</span>
                    <span
                      className={
                        log.type === "success"
                          ? "text-emerald-400"
                          : log.type === "warning"
                          ? "text-amber-400"
                          : log.type === "alert"
                          ? "text-red-400"
                          : "text-gray-300"
                      }
                    >
                      {log.message}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
