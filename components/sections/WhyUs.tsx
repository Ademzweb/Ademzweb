"use client";

import { whyUsContent } from "@/content/why-us";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { getIcon } from "@/lib/icons";

/**
 * Why Choose Us section with animated feature cards.
 * Edit content in /content/why-us.ts
 */
export function WhyUs() {
  return (
    <section
      id="why-us"
      className="section-padding relative"
      aria-labelledby="why-us-heading"
    >
      <div className="section-container">
        <SectionHeading
          label={whyUsContent.sectionLabel}
          title={whyUsContent.title}
          description={whyUsContent.description}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyUsContent.features.map((feature, index) => {
            const Icon = getIcon(feature.icon);
            return (
              <AnimatedCard key={feature.title} delay={index * 0.08}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 rounded-xl bg-accent/10 p-3 text-accent">
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-display text-lg font-semibold text-text">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-text-muted">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </AnimatedCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
