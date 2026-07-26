"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * Ultra-sleek minimal top scroll progress line indicator.
 */
export function ScrollProgressBar() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const current = (window.scrollY / totalHeight) * 100;
        setScrollPercentage(Math.min(100, Math.max(0, current)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-transparent pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-white via-accent to-accent shadow-[0_0_10px_rgba(185,74,74,0.8)]"
        style={{ width: `${scrollPercentage}%` }}
        transition={{ ease: "easeOut" }}
      />
    </div>
  );
}
