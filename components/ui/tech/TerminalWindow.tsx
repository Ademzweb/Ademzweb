"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TerminalWindowProps {
  lines: string[];
  title?: string;
  className?: string;
  speed?: number;
}

/**
 * Animated terminal window with typing effect.
 * Uses monospace font for hacker/dev aesthetic.
 */
export function TerminalWindow({
  lines,
  title = "ademzweb@security ~",
  className,
  speed = 35,
}: TerminalWindowProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (currentLine >= lines.length) {
      setDone(true);
      return;
    }

    const line = lines[currentLine];
    if (currentChar < line.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const updated = [...prev];
          updated[currentLine] = line.slice(0, currentChar + 1);
          return updated;
        });
        setCurrentChar((c) => c + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setCurrentLine((l) => l + 1);
      setCurrentChar(0);
    }, 400);
    return () => clearTimeout(timeout);
  }, [currentLine, currentChar, lines, speed]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn("terminal-panel tech-corners overflow-hidden", className)}
    >
      <div className="terminal-header">
        <span className="terminal-dot bg-accent/80" />
        <span className="terminal-dot bg-white/20" />
        <span className="terminal-dot bg-white/20" />
        <span className="ml-2 font-mono text-xs text-text-muted">{title}</span>
      </div>
      <div className="space-y-1 p-4 font-mono text-xs leading-relaxed md:text-sm">
        {displayedLines.map((line, i) => (
          <div key={i} className="flex gap-2">
            <span className="select-none text-accent">$</span>
            <span className={line.startsWith("[") ? "text-accent" : "text-text-muted"}>
              {line}
            </span>
          </div>
        ))}
        {!done && (
          <span className="inline-block h-4 w-2 animate-blink bg-accent" />
        )}
      </div>
    </motion.div>
  );
}
