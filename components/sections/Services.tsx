"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, SearchCode } from "lucide-react";
import { servicesContent, ServiceDetail } from "@/content/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { ServiceDetailModal } from "@/components/ui/ServiceDetailModal";
import { getIcon } from "@/lib/icons";
import { cyberSound } from "@/lib/cyberSound";

/**
 * Services grid with interactive modal inspectors.
 */
export function Services() {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  return (
    <section
      id="services"
      className="section-padding relative"
      aria-labelledby="services-heading"
    >
      <div className="section-container">
        <SectionHeading
          label={servicesContent.sectionLabel}
          title={servicesContent.title}
          description={servicesContent.description}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicesContent.services.map((service, index) => {
            const Icon = getIcon(service.icon);
            return (
              <div
                key={service.id}
                onClick={() => {
                  cyberSound.playClick();
                  setSelectedService(service as ServiceDetail);
                }}
                className="cursor-pointer"
              >
                <AnimatedCard delay={index * 0.05}>
                  <div className="group relative">
                    {/* Icon & Inspect badge */}
                    <div className="mb-4 flex items-center justify-between">
                      <div className="inline-flex rounded-xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-accent/10 group-hover:text-accent">
                        <Icon size={24} aria-hidden="true" />
                      </div>
                      <span className="flex items-center gap-1 rounded-full border border-border bg-background/60 px-2.5 py-1 font-mono text-[10px] text-text-muted transition-colors group-hover:border-accent/40 group-hover:text-accent">
                        <SearchCode size={12} />
                        Inspect Specs
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mb-2 font-display text-lg font-semibold text-text transition-colors group-hover:text-accent">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm leading-relaxed text-text-muted">
                      {service.description}
                    </p>

                    {/* SLA Pill */}
                    <div className="mt-4 pt-3 border-t border-border/50 flex justify-between items-center text-xs font-mono text-text-muted">
                      <span>SLA: {(service as ServiceDetail).sla || "Express"}</span>
                      <span className="text-accent group-hover:underline flex items-center gap-0.5">
                        Details <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </div>
                </AnimatedCard>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
}
