"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  ShieldAlert,
  Play,
  RotateCcw,
  Terminal,
  Download,
  Cpu,
  Activity,
  Globe,
  Lock,
  FileWarning,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Server,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cyberSound } from "@/lib/cyberSound";

// ── Types matching API response ──────────────────────────────────────────────

interface DnsResult {
  a: string[];
  mx: Array<{ exchange: string; priority: number }>;
  ns: string[];
  txt: string[];
}

interface SslResult {
  subject: string;
  issuer: string;
  validFrom: string;
  validTo: string;
  daysUntilExpiry: number;
  protocol: string;
  cipher: string;
  keyExchange: string;
  bits: number;
  serialNumber: string;
  fingerprint: string;
}

interface HeaderCheck {
  header: string;
  label: string;
  present: boolean;
  value: string | null;
  status: "pass" | "fail" | "warn";
  weight: number;
}

interface ScanApiResponse {
  target: string;
  timestamp: string;
  duration: number;
  dns: DnsResult | null;
  ssl: SslResult | null;
  headers: HeaderCheck[] | null;
  score: number;
  grade: string;
  errors: string[];
}

interface ScanLog {
  id: number;
  time: string;
  stage: string;
  type: "info" | "success" | "warning" | "alert" | "error";
  message: string;
}

// ── Component ────────────────────────────────────────────────────────────────

export function InteractiveScanner() {
  const [target, setTarget] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanCompleted, setScanCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState("");
  const [logs, setLogs] = useState<ScanLog[]>([]);
  const [result, setResult] = useState<ScanApiResponse | null>(null);
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (stage: string, type: ScanLog["type"], message: string) => {
    setLogs((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        time: new Date().toLocaleTimeString(),
        stage,
        type,
        message,
      },
    ]);
  };

  const runScan = async () => {
    if (!target.trim()) return;

    cyberSound.playBeep(900, 0.1, "sawtooth");
    setIsScanning(true);
    setScanCompleted(false);
    setProgress(0);
    setLogs([]);
    setResult(null);

    const domain = target.replace(/^https?:\/\//, "").split("/")[0].split(":")[0].trim();

    // Phase 1: Initializing
    setCurrentStage("Initializing");
    setProgress(5);
    addLog("INIT", "info", `Starting full security audit for ${domain}...`);
    addLog("INIT", "info", "Resolving DNS records via 8.8.8.8 & 1.1.1.1...");
    await sleep(300);

    // Phase 2: DNS
    setCurrentStage("DNS Resolution");
    setProgress(15);
    cyberSound.playBeep(600, 0.05, "sine");
    addLog("DNS", "info", `Querying A, MX, NS, and TXT records for ${domain}...`);
    await sleep(400);

    setProgress(25);
    addLog("SSL", "info", "Initiating TLS 1.3 handshake on port 443...");
    setCurrentStage("SSL/TLS Audit");
    cyberSound.playBeep(750, 0.05, "sine");
    await sleep(300);

    setProgress(40);
    addLog("SSL", "info", "Inspecting X.509 certificate chain & cipher suites...");
    await sleep(300);

    // Phase 3: Headers
    setProgress(55);
    setCurrentStage("Header Analysis");
    cyberSound.playBeep(900, 0.05, "sine");
    addLog("HEADERS", "info", "Sending GET request to analyze HTTP security headers...");
    addLog("HEADERS", "info", "Checking HSTS, CSP, X-Frame-Options, Referrer-Policy...");
    await sleep(200);

    // Make the real API call
    setProgress(65);
    setCurrentStage("Processing");
    addLog("ENGINE", "info", "Executing parallel security checks against live target...");

    try {
      const response = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target: domain }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Scan failed");
      }

      setProgress(85);
      setCurrentStage("Analyzing Results");
      cyberSound.playBeep(1050, 0.05, "sine");

      const apiResult = data as ScanApiResponse;

      // Stream DNS results into logs
      if (apiResult.dns) {
        if (apiResult.dns.a.length > 0) {
          addLog("DNS", "success", `A Records: ${apiResult.dns.a.join(", ")}`);
        } else {
          addLog("DNS", "warning", "No A records found");
        }
        if (apiResult.dns.mx.length > 0) {
          addLog("DNS", "success", `MX: ${apiResult.dns.mx.map((m) => `${m.exchange} (pri:${m.priority})`).join(", ")}`);
        }
        if (apiResult.dns.ns.length > 0) {
          addLog("DNS", "success", `NS: ${apiResult.dns.ns.join(", ")}`);
        }
        const spfRecords = apiResult.dns.txt.filter((t) => t.startsWith("v=spf"));
        if (spfRecords.length > 0) {
          addLog("DNS", "success", `SPF: ${spfRecords[0].substring(0, 80)}...`);
        }
      } else {
        addLog("DNS", "error", "DNS resolution failed");
      }

      await sleep(200);

      // Stream SSL results into logs
      if (apiResult.ssl) {
        addLog("SSL", "success", `Certificate: ${apiResult.ssl.subject} issued by ${apiResult.ssl.issuer}`);
        addLog("SSL", "info", `Protocol: ${apiResult.ssl.protocol} | Cipher: ${apiResult.ssl.cipher}`);
        if (apiResult.ssl.daysUntilExpiry > 30) {
          addLog("SSL", "success", `Expires: ${apiResult.ssl.validTo} (${apiResult.ssl.daysUntilExpiry} days remaining)`);
        } else if (apiResult.ssl.daysUntilExpiry > 0) {
          addLog("SSL", "warning", `⚠ Certificate expiring soon: ${apiResult.ssl.daysUntilExpiry} days remaining`);
        } else {
          addLog("SSL", "alert", `✗ Certificate EXPIRED on ${apiResult.ssl.validTo}`);
        }
      } else {
        addLog("SSL", "error", "SSL/TLS check failed — site may not support HTTPS");
      }

      await sleep(200);

      // Stream header results into logs
      if (apiResult.headers) {
        const passed = apiResult.headers.filter((h) => h.status === "pass").length;
        const failed = apiResult.headers.filter((h) => h.status === "fail").length;
        const warned = apiResult.headers.filter((h) => h.status === "warn").length;

        apiResult.headers.forEach((h) => {
          const icon = h.status === "pass" ? "✓" : h.status === "fail" ? "✗" : "⚠";
          const type: ScanLog["type"] = h.status === "pass" ? "success" : h.status === "fail" ? "alert" : "warning";
          addLog("HEADERS", type, `${icon} ${h.label}: ${h.present ? (h.value?.substring(0, 60) || "present") : "MISSING"}`);
        });

        addLog("HEADERS", "info", `Summary: ${passed} passed, ${warned} warnings, ${failed} failed`);
      } else {
        addLog("HEADERS", "error", "HTTP header analysis failed");
      }

      // Report any errors from the API
      if (apiResult.errors.length > 0) {
        apiResult.errors.forEach((err) => {
          addLog("ERROR", "error", err);
        });
      }

      setProgress(100);
      setCurrentStage("Audit Complete");
      addLog("RESULT", "success", `Security Score: ${apiResult.score}/100 (Grade ${apiResult.grade}) — Scan completed in ${apiResult.duration}ms`);

      setResult(apiResult);
      setIsScanning(false);
      setScanCompleted(true);
      cyberSound.playScanSuccess();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setProgress(100);
      setCurrentStage("Error");
      addLog("ERROR", "error", `Scan failed: ${message}`);
      setIsScanning(false);
      setScanCompleted(false);
    }
  };

  const downloadReport = () => {
    if (!result) return;
    cyberSound.playClick();

    let report = `ADEMZWEB SECURITY AUDIT REPORT\n${"=".repeat(50)}\n\n`;
    report += `Target: ${result.target}\n`;
    report += `Date: ${new Date(result.timestamp).toLocaleString()}\n`;
    report += `Duration: ${result.duration}ms\n`;
    report += `Security Score: ${result.score}/100 (Grade ${result.grade})\n\n`;

    if (result.dns) {
      report += `DNS RECORDS\n${"-".repeat(30)}\n`;
      report += `A Records: ${result.dns.a.join(", ") || "None"}\n`;
      report += `MX Records: ${result.dns.mx.map((m) => `${m.exchange} (${m.priority})`).join(", ") || "None"}\n`;
      report += `NS Records: ${result.dns.ns.join(", ") || "None"}\n\n`;
    }

    if (result.ssl) {
      report += `SSL/TLS CERTIFICATE\n${"-".repeat(30)}\n`;
      report += `Subject: ${result.ssl.subject}\n`;
      report += `Issuer: ${result.ssl.issuer}\n`;
      report += `Valid From: ${result.ssl.validFrom}\n`;
      report += `Valid To: ${result.ssl.validTo}\n`;
      report += `Days Until Expiry: ${result.ssl.daysUntilExpiry}\n`;
      report += `Protocol: ${result.ssl.protocol}\n`;
      report += `Cipher: ${result.ssl.cipher}\n\n`;
    }

    if (result.headers) {
      report += `HTTP SECURITY HEADERS\n${"-".repeat(30)}\n`;
      result.headers.forEach((h) => {
        const status = h.status === "pass" ? "PASS" : h.status === "fail" ? "FAIL" : "WARN";
        report += `[${status}] ${h.label}: ${h.present ? (h.value || "present") : "MISSING"}\n`;
      });
      report += "\n";
    }

    if (result.errors.length > 0) {
      report += `ERRORS\n${"-".repeat(30)}\n`;
      result.errors.forEach((e) => { report += `- ${e}\n`; });
    }

    report += `\n${"=".repeat(50)}\nGenerated by Ademzweb Security Scanner\nhttps://ademzweb.com\n`;

    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ademzweb-audit-${result.target}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "text-emerald-400";
    if (grade.startsWith("B")) return "text-yellow-400";
    if (grade.startsWith("C")) return "text-amber-500";
    return "text-red-400";
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
            Ademzweb Domain Security Scanner
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-mono text-xs font-medium text-emerald-400 border border-emerald-500/20">
            <Activity size={12} className="animate-pulse" />
            LIVE SCANNER
          </span>
        </div>
      </div>

      <div className="p-6 md:p-8">
        {/* Controls Grid */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Input Section */}
          <div className="space-y-4 lg:col-span-7">
            <div>
              <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-text-muted">
                Target Domain
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                  <Globe size={16} className="text-text-muted/50" />
                </div>
                <input
                  type="text"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !isScanning) runScan(); }}
                  disabled={isScanning}
                  placeholder="e.g. google.com, github.com, your-domain.com"
                  className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-3 font-mono text-sm text-text placeholder:text-text-muted/40 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-60"
                />
              </div>
              <p className="mt-1.5 text-[11px] text-text-muted/50 font-mono">
                Enter any public domain — real DNS, SSL, and HTTP header analysis will be performed.
              </p>
            </div>

            {/* What We Check */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: Server, label: "DNS Records", sub: "A, MX, NS, TXT" },
                { icon: Lock, label: "SSL/TLS Cert", sub: "Chain & Cipher" },
                { icon: FileWarning, label: "Security Headers", sub: "8 Header Checks" },
              ].map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="rounded-lg border border-border/50 bg-background/40 px-3 py-2.5 text-center"
                >
                  <Icon size={16} className="mx-auto mb-1 text-accent" />
                  <p className="font-mono text-[10px] font-semibold text-text">{label}</p>
                  <p className="font-mono text-[9px] text-text-muted">{sub}</p>
                </div>
              ))}
            </div>

            <div className="pt-1">
              <Button
                onClick={runScan}
                disabled={isScanning || !target.trim()}
                size="lg"
                className="w-full justify-center gap-2"
              >
                {isScanning ? (
                  <>
                    <Cpu size={18} className="animate-spin" />
                    Scanning... {progress}%
                  </>
                ) : (
                  <>
                    <Play size={18} />
                    Run Full Security Audit
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
                  Security Score
                </span>
                <span className="font-mono text-xs font-semibold text-accent">
                  {isScanning ? currentStage : scanCompleted && result ? `Grade ${result.grade}` : "Ready"}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="mb-1 flex justify-between font-mono text-xs text-text-muted">
                  <span>Audit Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-surfaceLight">
                  <motion.div
                    className="h-full bg-gradient-to-r from-accent/80 via-accent to-emerald-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "easeInOut" }}
                  />
                </div>
              </div>

              {/* Security Score Meter */}
              <div className="mt-6 text-center">
                <div className="inline-flex h-24 w-24 items-center justify-center rounded-full border-4 border-accent/30 bg-accent/5 font-display text-3xl font-bold shadow-inner">
                  {scanCompleted && result ? (
                    <span className={getGradeColor(result.grade)}>{result.score}</span>
                  ) : isScanning ? (
                    <span className="animate-pulse text-accent">{progress}</span>
                  ) : (
                    <ShieldCheck size={36} className="text-text-muted" />
                  )}
                </div>
                <p className="mt-2 font-mono text-xs text-text-muted">
                  {scanCompleted && result
                    ? `${result.score}/100 — Grade ${result.grade} (${result.duration}ms)`
                    : isScanning
                    ? currentStage
                    : "Enter a domain and click Run"}
                </p>
              </div>
            </div>

            {/* SSL Quick Info */}
            {scanCompleted && result?.ssl && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 space-y-1 border-t border-border/50 pt-3 font-mono text-[10px]"
              >
                <div className="flex justify-between">
                  <span className="text-text-muted">CERT</span>
                  <span className="text-text truncate ml-2">{result.ssl.subject}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">ISSUER</span>
                  <span className="text-text">{result.ssl.issuer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">TLS</span>
                  <span className="text-emerald-400">{result.ssl.protocol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">EXPIRY</span>
                  <span className={result.ssl.daysUntilExpiry > 30 ? "text-emerald-400" : "text-amber-400"}>
                    {result.ssl.daysUntilExpiry}d
                  </span>
                </div>
              </motion.div>
            )}

            {scanCompleted && result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 flex gap-2 pt-3 border-t border-border/50"
              >
                <button
                  type="button"
                  onClick={downloadReport}
                  className="flex-1 rounded-lg border border-accent/40 bg-accent/10 py-2 font-mono text-xs text-accent transition-colors hover:bg-accent hover:text-background flex items-center justify-center gap-1.5"
                >
                  <Download size={14} />
                  Download Report
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

        {/* Header Results Grid */}
        {scanCompleted && result?.headers && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <div className="mb-2 flex items-center justify-between font-mono text-xs text-text-muted">
              <span>HTTP SECURITY HEADERS ANALYSIS</span>
              <span>
                {result.headers.filter((h) => h.status === "pass").length}/{result.headers.length} passed
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {result.headers.map((h) => (
                <div
                  key={h.header}
                  className={`flex items-center gap-2.5 rounded-lg border px-3 py-2 font-mono text-xs ${
                    h.status === "pass"
                      ? "border-emerald-500/20 bg-emerald-500/5"
                      : h.status === "fail"
                      ? "border-red-500/20 bg-red-500/5"
                      : "border-amber-500/20 bg-amber-500/5"
                  }`}
                >
                  {h.status === "pass" ? (
                    <CheckCircle2 size={14} className="flex-shrink-0 text-emerald-400" />
                  ) : h.status === "fail" ? (
                    <XCircle size={14} className="flex-shrink-0 text-red-400" />
                  ) : (
                    <AlertTriangle size={14} className="flex-shrink-0 text-amber-400" />
                  )}
                  <div className="min-w-0">
                    <p className={`font-semibold ${h.status === "pass" ? "text-emerald-400" : h.status === "fail" ? "text-red-400" : "text-amber-400"}`}>
                      {h.label}
                    </p>
                    <p className="text-[10px] text-text-muted truncate">
                      {h.present ? (h.value?.substring(0, 50) || "Present") : "Not set"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Real-time Telemetry Console Output */}
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between font-mono text-xs text-text-muted">
            <span>REAL-TIME AUDIT LOG</span>
            <span>{logs.length} entries</span>
          </div>

          <div ref={logContainerRef} className="h-48 overflow-y-auto rounded-lg border border-border/70 bg-black/60 p-4 font-mono text-xs">
            {logs.length === 0 ? (
              <div className="flex h-full items-center justify-center text-text-muted/40">
                &gt; Enter a domain above and click Run to begin live security audit.
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
                    <span className="text-text-muted/50 flex-shrink-0">[{log.time}]</span>
                    <span className="font-semibold text-accent flex-shrink-0">[{log.stage}]</span>
                    <span
                      className={
                        log.type === "success"
                          ? "text-emerald-400"
                          : log.type === "warning"
                          ? "text-amber-400"
                          : log.type === "alert" || log.type === "error"
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

// ── Helpers ───────────────────────────────────────────────────────────────────

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
