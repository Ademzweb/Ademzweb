"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, CheckCircle2, FileCheck, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { scrollToSection } from "@/lib/utils";
import { cyberSound } from "@/lib/cyberSound";

interface Framework {
  id: string;
  name: string;
  badge: string;
  readinessScore: number;
  controlsCovered: number;
  description: string;
  controls: string[];
  auditorStatement: string;
}

const FRAMEWORKS: Framework[] = [
  {
    id: "soc2",
    name: "SOC 2 Type II",
    badge: "Trust Services Criteria",
    readinessScore: 100,
    controlsCovered: 64,
    description: "Evaluates security, availability, processing integrity, confidentiality, and privacy over a continuous 12-month period.",
    controls: [
      "CC6.1 - Logical Access Controls & MFA Enforcement",
      "CC6.6 - Boundary Protection & NGFW Intrusion Rules",
      "CC7.1 - Vulnerability Detection & Continuous Patching",
      "CC7.3 - 24/7 Incident Response & Anomaly Alerts",
    ],
    auditorStatement: "Complete auditor-ready evidence mapping and continuous control automated monitoring.",
  },
  {
    id: "iso27001",
    name: "ISO/IEC 27001:2022",
    badge: "International Standard",
    readinessScore: 98,
    controlsCovered: 93,
    description: "International benchmark for establishing, implementing, maintaining, and continually improving an ISMS.",
    controls: [
      "A.5.15 - Access Control Policy & Identity Management",
      "A.8.8 - Management of Technical Vulnerabilities",
      "A.8.20 - Network Security & Micro-segmentation",
      "A.8.28 - Secure Coding Guidelines & SAST/DAST",
    ],
    auditorStatement: "Certified ISMS implementation with automated evidence collection integration.",
  },
  {
    id: "hipaa",
    name: "HIPAA Security Rule",
    badge: "Healthcare PHI Protection",
    readinessScore: 100,
    controlsCovered: 42,
    description: "Mandates national standards to safeguard Protected Health Information (ePHI) created, received, or transmitted.",
    controls: [
      "§ 164.312(a)(1) - Unique User ID & Emergency Access",
      "§ 164.312(a)(2)(iv) - AES-256 Encryption in Transit/Rest",
      "§ 164.312(b) - Immutable Audit Logs & Telemetry",
      "§ 164.308(a)(1)(ii)(D) - Information System Activity Review",
    ],
    auditorStatement: "Complete Business Associate Agreement (BAA) and ePHI zero-leakage protection.",
  },
  {
    id: "pci",
    name: "PCI-DSS v4.0",
    badge: "Payment Card Security",
    readinessScore: 100,
    controlsCovered: 12,
    description: "Global standard for organizations handling credit card data, cardholder environments, and transaction processing.",
    controls: [
      "Requirement 1 - Install & Maintain Network Controls",
      "Requirement 6 - Develop & Maintain Secure Systems",
      "Requirement 11 - Test Security of Systems & Networks",
      "Requirement 12 - Support Information Security with Policies",
    ],
    auditorStatement: "QSA-aligned penetration testing and web application firewall compliance validation.",
  },
];

export function ComplianceMatrix() {
  const [activeTab, setActiveTab] = useState("soc2");
  const framework = FRAMEWORKS.find((f) => f.id === activeTab) || FRAMEWORKS[0];

  const handleConsultCompliance = () => {
    cyberSound.playClick();
    window.dispatchEvent(
      new CustomEvent("prefill-contact", {
        detail: {
          message: `Hello Ademzweb compliance team, I would like to schedule a scoping audit for compliance framework: "${framework.name}".`,
          company: "",
        },
      })
    );
    scrollToSection("#contact");
  };

  return (
    <section
      id="compliance"
      className="section-padding relative bg-surface/30"
      aria-labelledby="compliance-heading"
    >
      <div className="section-container">
        <SectionHeading
          label="Certifications & Audits"
          title="Interactive Regulatory Compliance Matrix"
          description="Explore our auditor-approved compliance readiness mapping across global governance standards."
        />

        <div className="mx-auto max-w-5xl">
          {/* Framework Tab Selectors */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {FRAMEWORKS.map((fw) => (
              <button
                key={fw.id}
                onClick={() => {
                  cyberSound.playClick();
                  setActiveTab(fw.id);
                }}
                className={`flex items-center gap-2 rounded-xl border px-5 py-3 font-display text-sm font-semibold transition-all ${
                  activeTab === fw.id
                    ? "border-accent bg-accent/15 text-accent shadow-lg shadow-accent/10"
                    : "border-border bg-surface text-text-muted hover:border-text-muted hover:text-text"
                }`}
              >
                <ShieldCheck size={18} className={activeTab === fw.id ? "text-accent" : "text-text-muted"} />
                {fw.name}
              </button>
            ))}
          </div>

          {/* Active Framework Inspector Box */}
          <AnimatePresence mode="wait">
            <motion.div
              key={framework.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="mt-8 rounded-2xl border border-border bg-surface p-6 shadow-xl sm:p-8 lg:p-10"
            >
              <div className="flex flex-col justify-between gap-6 border-b border-border/80 pb-6 md:flex-row md:items-center">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-accent/10 px-3 py-1 font-mono text-xs font-semibold text-accent border border-accent/20">
                      {framework.badge}
                    </span>
                    <span className="font-mono text-xs text-text-muted">
                      Controls Automated: {framework.controlsCovered} Key Criteria
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-bold text-text sm:text-3xl">
                    {framework.name} Audit Readiness
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm leading-relaxed text-text-muted">
                    {framework.description}
                  </p>
                </div>

                {/* Score gauge badge */}
                <div className="flex items-center gap-4 rounded-xl border border-accent/20 bg-accent/5 p-4 text-center">
                  <div>
                    <span className="block font-mono text-xs text-text-muted">Auditor Readiness</span>
                    <span className="font-display text-3xl font-bold text-accent">
                      {framework.readinessScore}%
                    </span>
                  </div>
                  <FileCheck size={36} className="text-accent" />
                </div>
              </div>

              {/* Controls List */}
              <div className="mt-6">
                <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-text">
                  Key Implemented Technical Controls
                </h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  {framework.controls.map((control) => (
                    <div
                      key={control}
                      className="flex items-start gap-3 rounded-xl border border-border/70 bg-background/50 p-4 font-mono text-xs text-text"
                    >
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent" />
                      <span>{control}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Attestation & CTA */}
              <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-xl border border-border bg-background/40 p-5 sm:flex-row">
                <p className="text-xs italic text-text-muted">
                  &ldquo;{framework.auditorStatement}&rdquo;
                </p>
                <Button onClick={handleConsultCompliance} className="w-full sm:w-auto shrink-0">
                  Request {framework.name} Scoping
                  <ArrowUpRight size={18} />
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
