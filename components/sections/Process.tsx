"use client";

import { motion } from "framer-motion";
import { processContent } from "@/content/process";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Process timeline with scroll-triggered animations.
 * Edit steps in /content/process.ts
 */
export function Process() {
  return (
    <section
      id="process"
      className="section-padding relative bg-surface/50"
      aria-labelledby="process-heading"
    >
      <div className="section-container">
        <SectionHeading
          label={processContent.sectionLabel}
          title={processContent.title}
          description={processContent.description}
        />

        <div className="relative mx-auto max-w-4xl">
          {/* Connecting line */}
          <div
            className="absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-accent via-primary to-accent/20 md:left-1/2 md:block md:-translate-x-px"
            aria-hidden="true"
          />

          {processContent.steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-center ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Step number circle */}
              <div className="relative z-10 flex md:w-1/2 md:justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 font-display text-xl font-bold text-accent glow-accent">
                  {step.number}
                </div>
              </div>

              {/* Step content */}
              <div
                className={`md:w-1/2 ${
                  index % 2 === 0 ? "md:pl-8" : "md:pr-8 md:text-right"
                }`}
              >
                <h3 className="mb-2 font-display text-xl font-semibold text-text">
                  {step.title}
                </h3>
                <p className="leading-relaxed text-text-muted">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
