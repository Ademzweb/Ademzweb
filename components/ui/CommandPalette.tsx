"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Terminal, Shield, Calculator, Activity, Volume2, VolumeX, Mail, ArrowRight, X } from "lucide-react";
import { scrollToSection } from "@/lib/utils";
import { cyberSound } from "@/lib/cyberSound";

interface PaletteItem {
  id: string;
  category: "Navigation" | "Services" | "Viewer Tools" | "Actions";
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const items: PaletteItem[] = [
    {
      id: "nav-scanner",
      category: "Viewer Tools",
      title: "Live Vulnerability Scanner",
      subtitle: "Simulate a live threat audit on target hosts",
      icon: Terminal,
      action: () => scrollToSection("#scanner"),
    },
    {
      id: "nav-calculator",
      category: "Viewer Tools",
      title: "Cyber Risk & ROI Calculator",
      subtitle: "Estimate annual breach exposure & savings",
      icon: Calculator,
      action: () => scrollToSection("#calculator"),
    },
    {
      id: "nav-threat-map",
      category: "Viewer Tools",
      title: "Global Threat Map Telemetry",
      subtitle: "Live grid attack map & blocked payload feed",
      icon: Activity,
      action: () => scrollToSection("#threat-map"),
    },
    {
      id: "nav-terminal",
      category: "Viewer Tools",
      title: "Interactive Cyber Terminal CLI",
      subtitle: "Type live commands or execute shortcut tags",
      icon: Terminal,
      action: () => scrollToSection("#terminal"),
    },
    {
      id: "nav-services",
      category: "Navigation",
      title: "All Security Services",
      subtitle: "Inspect 10 end-to-end security offerings",
      icon: Shield,
      action: () => scrollToSection("#services"),
    },
    {
      id: "nav-compliance",
      category: "Navigation",
      title: "Compliance & Certifications",
      subtitle: "SOC 2, ISO 27001, HIPAA & PCI-DSS matrix",
      icon: Shield,
      action: () => scrollToSection("#compliance"),
    },
    {
      id: "nav-contact",
      category: "Navigation",
      title: "Contact & Scoping Consultation",
      subtitle: "Reach out to lead security engineers",
      icon: Mail,
      action: () => scrollToSection("#contact"),
    },
    {
      id: "action-audio",
      category: "Actions",
      title: "Toggle Retro Cyber Audio FX",
      subtitle: cyberSound.isEnabled() ? "Sound currently ENABLED 🔊" : "Sound currently MUTED 🔇",
      icon: cyberSound.isEnabled() ? Volume2 : VolumeX,
      action: () => {
        cyberSound.toggle();
      },
    },
  ];

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        cyberSound.playClick();
        if (isOpen) onClose();
        else {
          // Open
          window.dispatchEvent(new CustomEvent("toggle-command-palette"));
        }
      }

      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
      } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
        e.preventDefault();
        cyberSound.playClick();
        filteredItems[selectedIndex].action();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-background/80 backdrop-blur-md"
        />

        {/* Palette Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-accent/10"
        >
          {/* Search Bar */}
          <div className="flex items-center border-b border-border/80 px-4 py-3 sm:px-6">
            <Search size={20} className="mr-3 text-accent shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools, services, sections, actions... (ESC to close)"
              className="w-full bg-transparent font-mono text-sm text-text placeholder:text-text-muted/50 focus:outline-none"
            />
            <button
              onClick={onClose}
              className="rounded p-1 text-text-muted transition-colors hover:text-text"
            >
              <X size={18} />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-96 overflow-y-auto p-2">
            {filteredItems.length === 0 ? (
              <div className="p-8 text-center font-mono text-xs text-text-muted">
                No matching results found for &ldquo;{query}&rdquo;
              </div>
            ) : (
              filteredItems.map((item, index) => {
                const Icon = item.icon;
                const isSelected = index === selectedIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      cyberSound.playClick();
                      item.action();
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-all ${
                      isSelected
                        ? "bg-accent/15 border border-accent/30 text-text"
                        : "border border-transparent text-text-muted hover:bg-surfaceLight"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`rounded-lg p-2 ${
                          isSelected ? "bg-accent text-background" : "bg-primary/10 text-primary"
                        }`}
                      >
                        <Icon size={18} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-display text-sm font-semibold text-text">
                            {item.title}
                          </span>
                          <span className="rounded bg-background/60 px-2 py-0.5 font-mono text-[10px] text-accent border border-accent/20">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-xs text-text-muted">{item.subtitle}</p>
                      </div>
                    </div>

                    <ArrowRight
                      size={16}
                      className={`transition-transform ${
                        isSelected ? "translate-x-1 text-accent" : "opacity-0"
                      }`}
                    />
                  </button>
                );
              })
            )}
          </div>

          {/* Palette Footer */}
          <div className="flex items-center justify-between border-t border-border/80 bg-surfaceLight/50 px-4 py-2 font-mono text-[11px] text-text-muted">
            <div className="flex items-center gap-3">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
              <span>ESC Close</span>
            </div>
            <span className="text-accent font-semibold">Ctrl + K</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
