"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Filter, Globe, Activity, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cyberSound } from "@/lib/cyberSound";

interface ThreatPoint {
  id: number;
  origin: string;
  target: string;
  type: "Ransomware" | "DDoS" | "Zero-Day" | "SQLi";
  status: "BLOCKED" | "MITIGATED" | "CONTAINED";
  time: string;
  coords: { x: number; y: number };
}

const REGIONS = ["ALL", "NORTH AMERICA", "EMEA", "APAC"];

const SAMPLE_THREATS: ThreatPoint[] = [
  { id: 1, origin: "185.220.101.x (Frankfurt)", target: "US-East Cloud Cluster", type: "Ransomware", status: "BLOCKED", time: "Just now", coords: { x: 48, y: 35 } },
  { id: 2, origin: "103.251.140.x (Singapore)", target: "APAC Payment Gateway", type: "DDoS", status: "MITIGATED", time: "2s ago", coords: { x: 75, y: 55 } },
  { id: 3, origin: "45.154.255.x (London)", target: "EU Auth Service", type: "Zero-Day", status: "CONTAINED", time: "4s ago", coords: { x: 45, y: 32 } },
  { id: 4, origin: "192.168.1.x (New York)", target: "Fintech Vault API", type: "SQLi", status: "BLOCKED", time: "6s ago", coords: { x: 28, y: 38 } },
];

export function ThreatMap() {
  const [threats, setThreats] = useState<ThreatPoint[]>(SAMPLE_THREATS);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [activeCount, setActiveCount] = useState(142095);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCount((prev) => prev + Math.floor(Math.random() * 3) + 1);

      const types: ThreatPoint["type"][] = ["Ransomware", "DDoS", "Zero-Day", "SQLi"];
      const randType = types[Math.floor(Math.random() * types.length)];
      const randX = Math.floor(Math.random() * 70) + 15;
      const randY = Math.floor(Math.random() * 50) + 20;

      const newPoint: ThreatPoint = {
        id: Date.now(),
        origin: `Node-${Math.floor(Math.random() * 999)}`,
        target: `Protected Cluster #${Math.floor(Math.random() * 8) + 1}`,
        type: randType,
        status: "BLOCKED",
        time: "Just now",
        coords: { x: randX, y: randY },
      };

      setThreats((prev) => [newPoint, ...prev.slice(0, 5)]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const filteredThreats = selectedCategory === "ALL" 
    ? threats 
    : threats.filter((t) => t.type === selectedCategory || selectedCategory === "ALL");

  return (
    <section
      id="threat-map"
      className="section-padding relative overflow-hidden bg-background"
      aria-labelledby="threat-map-heading"
    >
      <div className="section-container relative z-10">
        <SectionHeading
          label="Telemetry Visualizer"
          title="Global Threat Map & Real-Time Defense Grid"
          description="Live interactive visualization of malicious payloads, zero-day exploits, and DDoS bursts intercepted and neutralized across Ademzweb global nodes."
        />

        {/* Global Defense Stats Header */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
          <div className="glass-card rounded-xl p-4 text-center">
            <span className="font-mono text-xs uppercase text-text-muted">Total Blocked Attacks</span>
            <p className="mt-1 font-display text-2xl font-bold text-accent sm:text-3xl">
              {activeCount.toLocaleString()}
            </p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <span className="font-mono text-xs uppercase text-text-muted">Active Global Nodes</span>
            <p className="mt-1 font-display text-2xl font-bold text-emerald-400 sm:text-3xl">
              1,240 SOC Nodes
            </p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <span className="font-mono text-xs uppercase text-text-muted">Avg Response Speed</span>
            <p className="mt-1 font-display text-2xl font-bold text-cyan-400 sm:text-3xl">
              &lt; 1.2 ms
            </p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <span className="font-mono text-xs uppercase text-text-muted">Global Grid Uptime</span>
            <p className="mt-1 font-display text-2xl font-bold text-text sm:text-3xl">
              99.999%
            </p>
          </div>
        </div>

        {/* Interactive Map Visualizer Container */}
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-2xl lg:p-8">
          {/* Controls Bar */}
          <div className="mb-6 flex flex-col items-start justify-between gap-4 border-b border-border/80 pb-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
              <Globe size={16} className="text-accent" />
              <span>LIVE TELEMETRY FILTER:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {["ALL", "Ransomware", "DDoS", "Zero-Day", "SQLi"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    cyberSound.playClick();
                    setSelectedCategory(cat);
                  }}
                  className={`rounded-lg border px-3 py-1 font-mono text-xs transition-all ${
                    selectedCategory === cat
                      ? "border-accent bg-accent/10 text-accent font-semibold"
                      : "border-border bg-background/40 text-text-muted hover:border-text-muted"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive World Map Node Graphic */}
          <div className="relative min-h-[280px] w-full rounded-xl border border-border/60 bg-black/70 p-6 cyber-grid flex flex-col justify-between overflow-hidden">
            {/* World grid radar overlay */}
            <div className="absolute inset-0 opacity-20 hex-grid" />

            {/* Glowing nodes on simulated grid */}
            {threats.map((t) => (
              <motion.div
                key={t.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ left: `${t.coords.x}%`, top: `${t.coords.y}%` }}
                className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                title={`${t.type} blocked from ${t.origin}`}
              >
                <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-75" />
                <span className="relative block h-3 w-3 rounded-full bg-accent border-2 border-white" />
              </motion.div>
            ))}

            <div className="relative z-10 font-mono text-xs text-text-muted flex items-center gap-2">
              <Activity size={14} className="text-emerald-400 animate-pulse" />
              <span>STATION: GLOBAL WAR-ROOM NETWORK SHIELD</span>
            </div>

            <div className="relative z-10 mt-20 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {filteredThreats.slice(0, 4).map((threat) => (
                <motion.div
                  key={threat.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg border border-accent/30 bg-surface/90 p-3 font-mono text-xs shadow-lg backdrop-blur-md"
                >
                  <div className="flex items-center justify-between text-accent font-semibold">
                    <span>[{threat.type}]</span>
                    <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] text-emerald-400 border border-emerald-500/30">
                      {threat.status}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-[11px] text-text-muted">{threat.origin}</p>
                  <p className="text-[10px] text-text-muted/60">Target: {threat.target}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
