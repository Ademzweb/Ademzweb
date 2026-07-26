"use client";

import { motion } from "framer-motion";
import { companyContent } from "@/content/company";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCard } from "@/components/ui/AnimatedCard";

/**
 * About section with mission, vision, values, and animated timeline.
 * Edit content in /content/company.ts
 */
export function About() {
  return (
    <section
      id="about"
      className="section-padding relative bg-surface/50"
      aria-labelledby="about-heading"
    >
      <div className="section-container">
        <SectionHeading
          label={companyContent.sectionLabel}
          title={companyContent.title}
          description={companyContent.description}
        />

        {/* Mission & Vision */}
        <div className="mb-16 grid gap-6 md:grid-cols-2">
          <AnimatedCard delay={0.1}>
            <h3 className="mb-3 font-display text-xl font-semibold text-text">
              {companyContent.mission.title}
            </h3>
            <p className="leading-relaxed text-text-muted">
              {companyContent.mission.description}
            </p>
          </AnimatedCard>
          <AnimatedCard delay={0.2}>
            <h3 className="mb-3 font-display text-xl font-semibold text-text">
              {companyContent.vision.title}
            </h3>
            <p className="leading-relaxed text-text-muted">
              {companyContent.vision.description}
            </p>
          </AnimatedCard>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h3 className="mb-8 text-center font-display text-2xl font-semibold text-text">
            Core Values
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {companyContent.values.map((value, index) => (
              <AnimatedCard key={value.title} delay={index * 0.1}>
                <div className="text-center">
                  <div className="mx-auto mb-3 h-1 w-8 rounded-full bg-accent" />
                  <h4 className="mb-2 font-display font-semibold text-text">
                    {value.title}
                  </h4>
                  <p className="text-sm text-text-muted">{value.description}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h3 className="mb-10 text-center font-display text-2xl font-semibold text-text">
            Our Journey
          </h3>
          <div className="relative mx-auto max-w-2xl">
            {/* Timeline line */}
            <div
              className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-px"
              aria-hidden="true"
            />

            {companyContent.timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative mb-10 flex items-start gap-6 md:gap-0 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-accent bg-background md:left-1/2">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                </div>

                {/* Content */}
                <div
                  className={`ml-12 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                  }`}
                >
                  <span className="text-sm font-bold text-accent">
                    {item.year}
                  </span>
                  <h4 className="mt-1 font-display text-lg font-semibold text-text">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-sm text-text-muted">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
