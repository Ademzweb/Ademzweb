"use client";

import { motion } from "framer-motion";

interface PageLoaderProps {
  onComplete?: () => void;
}

/**
 * Initial page loading animation.
 * Shows briefly when the site first loads.
 */
export function PageLoader({ onComplete }: PageLoaderProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      aria-hidden="true"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-4"
      >
        {/* Animated shield icon */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="h-12 w-12 rounded-xl border-2 border-accent bg-accent/10"
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 120 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-0.5 rounded-full bg-gradient-to-r from-primary to-accent"
        />
      </motion.div>
    </motion.div>
  );
}
