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
          label="Live Scanner"
          title="Real-Time Domain Security Scanner"
          description="Enter any public domain below to perform a live security audit. We analyze DNS records, SSL/TLS certificates, and HTTP security headers in real-time."
        />

        <div className="mx-auto max-w-5xl">
          <InteractiveScanner />
        </div>
      </div>
    </section>
  );
}
