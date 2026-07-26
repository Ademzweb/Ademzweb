"use client";

import { motion } from "framer-motion";

/**
 * Horizontal scanning line — security radar aesthetic.
 */
export function ScanLine() {
  return (
    <motion.div
      animate={{ top: ["-5%", "105%"] }}
      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
      style={{ boxShadow: "0 0 20px rgba(185, 74, 74, 0.3)" }}
    />
  );
}
