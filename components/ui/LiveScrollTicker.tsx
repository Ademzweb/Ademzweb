"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Activity, X } from "lucide-react";

const LIVE_EVENTS = [
  "🟢 Grid Status: 99.99% Operational • All 1,240 nodes online",
  "🛡️ Attack Intercepted: 4.2 Gbps DDoS burst blocked in US-East",
  "⚡ Threat Neutralized: SQLi attempt safely dropped from 185.x.x.x",
  "🔒 Compliance Check: Automated SOC 2 audit controls verified",
  "🌐 Live Telemetry: 142k+ malicious payloads neutralized today",
];

export function LiveScrollTicker() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250 && !dismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % LIVE_EVENTS.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-3 rounded-full border border-border/80 bg-surface/90 backdrop-blur-xl px-4 py-2 text-xs font-mono shadow-xl border-accent/20"
      >
        <Activity size={14} className="text-emerald-400 animate-pulse shrink-0" />

        <div className="h-4 overflow-hidden w-64 md:w-80">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="truncate text-text-muted text-[11px]"
            >
              {LIVE_EVENTS[currentIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="ml-1 rounded text-text-muted hover:text-text p-0.5 transition-colors"
          aria-label="Dismiss scroll ticker"
        >
          <X size={12} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
