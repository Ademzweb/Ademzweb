"use client";

import { statsContent } from "@/content/stats";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useInView, useCounter } from "@/hooks/useInView";

/**
 * Individual animated stat counter
 */
function StatItem({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const { ref, isInView } = useInView(0.3);
  const count = useCounter(value, 2000, isInView);

  return (
    <div
      ref={ref}
      className="text-center"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="font-display text-4xl font-bold text-text md:text-5xl lg:text-6xl">
        <span className="gradient-text">
          {count}
          {suffix}
        </span>
      </div>
      <p className="mt-2 text-sm text-text-muted md:text-base">{label}</p>
    </div>
  );
}

/**
 * Statistics section with animated counters.
 * Edit numbers in /content/stats.ts
 */
export function Stats() {
  return (
    <section
      id="stats"
      className="section-padding relative overflow-hidden"
      aria-labelledby="stats-heading"
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5"
        aria-hidden="true"
      />

      <div className="section-container relative">
        <SectionHeading
          label={statsContent.sectionLabel}
          title={statsContent.title}
        />

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {statsContent.stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
