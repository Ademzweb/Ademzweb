"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { InteractiveScanner } from "@/components/ui/InteractiveScanner";

export function ScannerSection() {
  return (
    <section
      id="scanner"
      className="section-padding relative bg-surface/30"
      aria-labelledby="scanner-heading"
    >
      <div className="section-container">
        <SectionHeading
          label="Live Simulator"
          title="Interactive Security Audit & Threat Matrix"
          description="Test your host or select an enterprise profile below to simulate a real-time vulnerability scan, inspect telemetry logs, and analyze posture score."
        />

        <div className="mx-auto max-w-5xl">
          <InteractiveScanner />
        </div>
      </div>
    </section>
  );
}
