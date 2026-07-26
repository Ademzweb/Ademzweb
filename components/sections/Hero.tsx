"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { heroContent } from "@/content/hero";
import { Button } from "@/components/ui/Button";
import { GlobalHackingSimulation } from "@/components/ui/GlobalHackingSimulation";
import { scrollToSection } from "@/lib/utils";

/**
 * Hero section with animated headline, CTAs, and global hacking simulation background.
 * Edit text in /content/hero.ts
 */
export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-20"
      aria-labelledby="hero-heading"
    >
      <GlobalHackingSimulation />

      <div className="section-container relative z-10 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-2 text-sm text-accent">
              <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
              {heroContent.badge}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="gradient-text">{heroContent.headline}</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-muted md:text-xl"
          >
            {heroContent.subheadline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              size="lg"
              onClick={() => scrollToSection(heroContent.primaryButton.href)}
              className="group w-full sm:w-auto"
            >
              {heroContent.primaryButton.text}
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => scrollToSection(heroContent.secondaryButton.href)}
              className="w-full sm:w-auto"
            >
              {heroContent.secondaryButton.text}
            </Button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.button
            onClick={() => scrollToSection("#services")}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-text-muted transition-colors hover:text-accent"
            aria-label="Scroll to services section"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ChevronDown size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
