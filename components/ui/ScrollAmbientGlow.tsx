"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * Ambient background glow orb that subtly tracks viewport scroll position.
 */
export function ScrollAmbientGlow() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-accent/5 blur-[140px]"
        animate={{
          y: scrollY * 0.15,
        }}
        transition={{ ease: "easeOut", duration: 0.8 }}
      />
    </div>
  );
}
