"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, CornerDownLeft, Volume2, VolumeX, Shield, Play } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cyberSound } from "@/lib/cyberSound";
import { scrollToSection } from "@/lib/utils";

interface TerminalLine {
  id: number;
  text: string;
  type: "input" | "output" | "error" | "system" | "accent";
}

const COMMAND_PILLS = [
  { cmd: "help", desc: "List Commands" },
  { cmd: "services", desc: "Show Services" },
  { cmd: "scan", desc: "Launch Scanner" },
  { cmd: "calc", desc: "Risk Calculator" },
  { cmd: "threats", desc: "Threat Feed" },
  { cmd: "audio", desc: "Toggle Audio" },
  { cmd: "contact", desc: "Reach Out" },
  { cmd: "clear", desc: "Clear Output" },
];

export function CyberTerminalSection() {
  const [inputVal, setInputVal] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(cyberSound.isEnabled());
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      id: 1,
      text: "ADEMZWEB CYBER SHELL v4.2.0-PROD [Type 'help' or click a command tag below]",
      type: "system",
    },
    {
      id: 2,
      text: "System status: ALL SHIELDS OPERATIONAL | 24/7 SOC AGENTS READY",
      type: "accent",
    },
  ]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const handleRunCommand = (cmdStr: string) => {
    const cleanCmd = cmdStr.trim().toLowerCase();
    if (!cleanCmd) return;

    cyberSound.playClick();

    const newHistory: TerminalLine[] = [
      ...history,
      { id: Date.now(), text: `$ ${cmdStr}`, type: "input" },
    ];

    switch (cleanCmd) {
      case "help":
        newHistory.push({
          id: Date.now() + 1,
          text: `AVAILABLE COMMANDS:
- help         : Display command manual
- services     : View Ademzweb 10 core cybersecurity offerings
- scan         : Scroll to live vulnerability scanner tool
- calc         : Scroll to interactive ROI risk calculator
- threats      : View live threat intelligence feed summary
- audio        : Toggle retro cyber sound synthesizer (ON/OFF)
- contact      : Jump directly to consultation form
- clear        : Clear console screen`,
          type: "output",
        });
        break;

      case "services":
        newHistory.push({
          id: Date.now() + 1,
          text: `ADEMZWEB ACTIVE SERVICES:
[01] Vulnerability Assessment      [06] Cloud Security Audit
[02] Penetration Testing           [07] Technical Security Audits
[03] Web Application Security     [08] Compliance Consulting
[04] API Security Testing          [09] 24/7 Incident Response
[05] Network Perimeter Defense     [10] Security Awareness Training`,
          type: "accent",
        });
        break;

      case "scan":
        newHistory.push({
          id: Date.now() + 1,
          text: "Navigating to Live Threat Scanner Simulator...",
          type: "system",
        });
        scrollToSection("#scanner");
        break;

      case "calc":
        newHistory.push({
          id: Date.now() + 1,
          text: "Navigating to Risk & ROI Calculator...",
          type: "system",
        });
        scrollToSection("#calculator");
        break;

      case "threats":
        newHistory.push({
          id: Date.now() + 1,
          text: `LIVE THREAT MATRIX LOG (LAST 60 SECONDS):
- [STOPPED] Ransomware Exfiltration Payload to 194.26.29.x
- [BLOCKED] SQL Injection attack target: /api/v1/auth/login
- [NEUTRALIZED] Distributed Denial of Service (DDoS) 4.2 Gbps burst
- [MITIGATED] Zero-Day BOLA exploit probe on customer API endpoint`,
          type: "output",
        });
        break;

      case "audio":
        const nowState = cyberSound.toggle();
        setSoundEnabled(nowState);
        newHistory.push({
          id: Date.now() + 1,
          text: `Cyber Sound Synthesizer toggled: ${nowState ? "ENABLED 🔊" : "MUTED 🔇"}`,
          type: "accent",
        });
        break;

      case "contact":
        newHistory.push({
          id: Date.now() + 1,
          text: "Navigating to Contact & Scoping Form...",
          type: "system",
        });
        scrollToSection("#contact");
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        newHistory.push({
          id: Date.now() + 1,
          text: `Command not recognized: '${cleanCmd}'. Type 'help' for valid options.`,
          type: "error",
        });
        break;
    }

    setHistory(newHistory);
    setInputVal("");
  };

  return (
    <section
      id="terminal"
      className="section-padding relative bg-surface/50"
      aria-labelledby="terminal-heading"
    >
      <div className="section-container">
        <SectionHeading
          label="Ademzweb Shell"
          title="Interactive Cyber Terminal Console"
          description="Viewer CLI console. Type commands directly or click any shortcut tag below to interact with our security system."
        />

        <div className="mx-auto max-w-4xl">
          {/* Terminal Box */}
          <div className="terminal-panel overflow-hidden border border-border/80 shadow-2xl">
            {/* Header */}
            <div className="terminal-header justify-between bg-surfaceLight/90 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="terminal-dot bg-red-500" />
                <div className="terminal-dot bg-amber-500" />
                <div className="terminal-dot bg-emerald-500" />
                <span className="ml-2 font-mono text-xs font-semibold text-text-muted flex items-center gap-1.5">
                  <TerminalIcon size={14} className="text-accent" />
                  ademzweb-shell@security-node-01:~
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  const nowState = cyberSound.toggle();
                  setSoundEnabled(nowState);
                }}
                className="flex items-center gap-1.5 rounded bg-background/60 px-2.5 py-1 font-mono text-xs text-text-muted transition-colors hover:text-accent"
              >
                {soundEnabled ? <Volume2 size={14} className="text-accent" /> : <VolumeX size={14} />}
                <span>{soundEnabled ? "Audio ON" : "Audio MUTED"}</span>
              </button>
            </div>

            {/* Console Output Area */}
            <div ref={containerRef} className="h-80 overflow-y-auto bg-black/85 p-4 font-mono text-xs leading-relaxed md:p-6">
              {history.map((line) => (
                <div key={line.id} className="mb-2 whitespace-pre-wrap">
                  {line.type === "input" && (
                    <span className="font-semibold text-accent">{line.text}</span>
                  )}
                  {line.type === "output" && (
                    <span className="text-gray-300">{line.text}</span>
                  )}
                  {line.type === "system" && (
                    <span className="text-emerald-400 font-semibold">{line.text}</span>
                  )}
                  {line.type === "accent" && (
                    <span className="text-cyan-400">{line.text}</span>
                  )}
                  {line.type === "error" && (
                    <span className="text-red-400 font-semibold">{line.text}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Input prompt line */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRunCommand(inputVal);
              }}
              className="flex items-center border-t border-border/80 bg-surface px-4 py-3"
            >
              <span className="mr-2 font-mono text-xs font-bold text-accent">$</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Type command here (e.g. help, scan, services)..."
                className="w-full bg-transparent font-mono text-xs text-text placeholder:text-text-muted/40 focus:outline-none"
              />
              <button
                type="submit"
                className="ml-2 rounded border border-accent/40 bg-accent/10 p-1.5 text-accent hover:bg-accent hover:text-background"
              >
                <CornerDownLeft size={14} />
              </button>
            </form>
          </div>

          {/* Quick command pill buttons */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="font-mono text-xs text-text-muted/60">Shortcut Commands:</span>
            {COMMAND_PILLS.map((pill) => (
              <button
                key={pill.cmd}
                type="button"
                onClick={() => handleRunCommand(pill.cmd)}
                className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-text-muted transition-colors hover:border-accent hover:text-accent flex items-center gap-1"
              >
                <span className="text-accent">$</span> {pill.cmd}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
