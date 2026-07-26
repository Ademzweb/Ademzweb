"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Volume2, VolumeX, ArrowUp, ShieldCheck, Activity } from "lucide-react";
import { cyberSound } from "@/lib/cyberSound";
import { scrollToSection } from "@/lib/utils";

interface CyberDockProps {
  onOpenCommandPalette: () => void;
}

export function CyberDock({ onOpenCommandPalette }: CyberDockProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(cyberSound.isEnabled());

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
        setShowBackToTop(window.scrollY > 300);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleAudio = () => {
    const nowState = cyberSound.toggle();
    setAudioEnabled(nowState);
  };

  return (
    <aside className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Status Pill Badge */}
      <div className="hidden md:flex items-center gap-2 rounded-full border border-border bg-surface/90 backdrop-blur-xl px-4 py-2 text-xs font-mono text-text shadow-xl">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-text-muted">GRID ONLINE</span>
        <span className="text-accent font-semibold">99.99%</span>
      </div>

      {/* Control Dock Buttons */}
      <div className="flex items-center gap-2 rounded-full border border-border/80 bg-surface/90 backdrop-blur-xl p-2 shadow-2xl">
        {/* Search Trigger */}
        <button
          onClick={() => {
            cyberSound.playClick();
            onOpenCommandPalette();
          }}
          className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/60 text-text-muted transition-colors hover:border-accent hover:text-accent"
          aria-label="Open Command Palette (Ctrl+K)"
          title="Search / Command Palette (Ctrl+K)"
        >
          <Search size={18} />
          <span className="absolute -top-8 hidden group-hover:block rounded bg-surface px-2 py-1 font-mono text-[10px] text-text whitespace-nowrap border border-border shadow-lg">
            Ctrl + K
          </span>
        </button>

        {/* Audio Toggle */}
        <button
          onClick={handleToggleAudio}
          className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/60 text-text-muted transition-colors hover:border-accent hover:text-accent"
          aria-label={audioEnabled ? "Mute audio" : "Enable audio"}
          title={audioEnabled ? "Mute Audio FX" : "Enable Cyber Audio FX"}
        >
          {audioEnabled ? <Volume2 size={18} className="text-accent" /> : <VolumeX size={18} />}
          <span className="absolute -top-8 hidden group-hover:block rounded bg-surface px-2 py-1 font-mono text-[10px] text-text whitespace-nowrap border border-border shadow-lg">
            {audioEnabled ? "Audio ON" : "Audio MUTED"}
          </span>
        </button>

        {/* Scroll To Top Circular Tracker */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => {
                cyberSound.playClick();
                scrollToSection("#home");
              }}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent transition-transform hover:scale-105"
              aria-label="Scroll to top"
              title={`Scroll to top (${Math.round(scrollProgress)}%)`}
            >
              {/* Circular SVG Ring Progress */}
              <svg className="absolute inset-0 h-full w-full -rotate-90 p-0.5" viewBox="0 0 36 36">
                <path
                  className="text-border"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-accent"
                  strokeDasharray={`${scrollProgress}, 100`}
                  strokeWidth="3"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <ArrowUp size={16} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
