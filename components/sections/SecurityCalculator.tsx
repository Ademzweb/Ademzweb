"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, ShieldAlert, DollarSign, Award, ArrowRight, CheckCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { scrollToSection } from "@/lib/utils";
import { cyberSound } from "@/lib/cyberSound";

const COMPANY_SIZES = [
  { id: "sm", label: "10 – 50 Employees", multiplier: 1, baseExposure: 180000 },
  { id: "md", label: "51 – 250 Employees", multiplier: 2.5, baseExposure: 450000 },
  { id: "lg", label: "251 – 1,000 Employees", multiplier: 6, baseExposure: 1200000 },
  { id: "ent", label: "1,000+ Enterprise", multiplier: 15, baseExposure: 4500000 },
];

const INDUSTRIES = [
  { id: "fintech", label: "FinTech & Banking", riskFactor: 1.8 },
  { id: "healthcare", label: "Healthcare & Biotech", riskFactor: 1.6 },
  { id: "saas", label: "SaaS & Cloud Software", riskFactor: 1.4 },
  { id: "ecommerce", label: "E-Commerce & Retail", riskFactor: 1.3 },
  { id: "enterprise", label: "Defense & Enterprise", riskFactor: 1.7 },
];

const COMPLIANCES = ["SOC 2 Type II", "ISO 27001", "HIPAA", "PCI-DSS v4.0"];

export function SecurityCalculator() {
  const [sizeIndex, setSizeIndex] = useState(1);
  const [industryId, setIndustryId] = useState("fintech");
  const [selectedCompliance, setSelectedCompliance] = useState<string[]>(["SOC 2 Type II"]);

  const size = COMPANY_SIZES[sizeIndex];
  const industry = INDUSTRIES.find((i) => i.id === industryId) || INDUSTRIES[0];

  // Dynamic calculations
  const rawExposure = Math.round(size.baseExposure * industry.riskFactor * (1 + selectedCompliance.length * 0.15));
  const breachSavings = Math.round(rawExposure * 0.88);
  const recommendedTier = sizeIndex === 0 ? "Starter Shield" : sizeIndex === 1 ? "Growth Defense" : "Enterprise Fortress";

  const toggleCompliance = (item: string) => {
    cyberSound.playClick();
    if (selectedCompliance.includes(item)) {
      setSelectedCompliance(selectedCompliance.filter((c) => c !== item));
    } else {
      setSelectedCompliance([...selectedCompliance, item]);
    }
  };

  const handleApplyEstimate = () => {
    cyberSound.playClick();
    const details = `Risk Audit Calculation Profile:\n- Size: ${size.label}\n- Industry: ${industry.label}\n- Compliance Targets: ${selectedCompliance.join(", ") || "General Security"}\n- Estimated Risk Exposure: $${rawExposure.toLocaleString()}/yr\n- Recommended Package: ${recommendedTier}`;

    window.dispatchEvent(
      new CustomEvent("prefill-contact", {
        detail: {
          message: `Hello Ademzweb team, I used your Cyber Risk Calculator and would like to consult on our profile:\n\n${details}`,
          company: "",
        },
      })
    );
    scrollToSection("#contact");
  };

  return (
    <section
      id="calculator"
      className="section-padding relative"
      aria-labelledby="calculator-heading"
    >
      <div className="section-container">
        <SectionHeading
          label="Risk Assessment"
          title="Interactive Cyber Risk & ROI Calculator"
          description="Select your organization size, sector, and compliance requirements below to calculate your estimated annual breach exposure and recommended defense roadmap."
        />

        <div className="mx-auto max-w-5xl rounded-2xl border border-border bg-surface p-6 shadow-xl sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Inputs Column */}
            <div className="space-y-6 lg:col-span-7">
              {/* Size Slider */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="font-display text-sm font-semibold text-text">
                    1. Company Size
                  </label>
                  <span className="font-mono text-sm font-bold text-accent">
                    {size.label}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={COMPANY_SIZES.length - 1}
                  step={1}
                  value={sizeIndex}
                  onChange={(e) => {
                    cyberSound.playClick();
                    setSizeIndex(parseInt(e.target.value));
                  }}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-surfaceLight accent-accent"
                />
                <div className="mt-2 flex justify-between font-mono text-[11px] text-text-muted">
                  <span>10-50</span>
                  <span>51-250</span>
                  <span>251-1K</span>
                  <span>1K+</span>
                </div>
              </div>

              {/* Industry Grid */}
              <div>
                <label className="mb-3 block font-display text-sm font-semibold text-text">
                  2. Industry Sector
                </label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {INDUSTRIES.map((ind) => (
                    <button
                      key={ind.id}
                      type="button"
                      onClick={() => {
                        cyberSound.playClick();
                        setIndustryId(ind.id);
                      }}
                      className={`rounded-xl border px-3 py-2.5 text-left text-xs font-medium transition-all ${
                        industryId === ind.id
                          ? "border-accent bg-accent/10 text-accent font-semibold shadow-sm"
                          : "border-border bg-background/50 text-text-muted hover:border-text-muted"
                      }`}
                    >
                      {ind.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Compliance Frameworks */}
              <div>
                <label className="mb-3 block font-display text-sm font-semibold text-text">
                  3. Targeted Compliance Standards
                </label>
                <div className="flex flex-wrap gap-2">
                  {COMPLIANCES.map((comp) => {
                    const active = selectedCompliance.includes(comp);
                    return (
                      <button
                        key={comp}
                        type="button"
                        onClick={() => toggleCompliance(comp)}
                        className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
                          active
                            ? "border-accent bg-accent/20 text-accent"
                            : "border-border bg-background/40 text-text-muted hover:border-border"
                        }`}
                      >
                        <CheckCircle size={14} className={active ? "text-accent" : "opacity-30"} />
                        {comp}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Calculated Output Card */}
            <div className="flex flex-col justify-between rounded-2xl border border-accent/30 bg-gradient-to-b from-background/90 to-surfaceLight/60 p-6 lg:col-span-5">
              <div>
                <div className="flex items-center justify-between border-b border-border/60 pb-4">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
                    <Calculator size={16} className="text-accent" />
                    Calculated Risk Index
                  </span>
                  <span className="rounded-full bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-accent border border-accent/20">
                    ESTIMATED
                  </span>
                </div>

                <div className="mt-6 space-y-5">
                  <div>
                    <span className="text-xs font-medium text-text-muted">
                      Est. Annual Breach Risk Exposure
                    </span>
                    <div className="mt-1 font-display text-3xl font-bold text-text sm:text-4xl">
                      <span className="gradient-text">
                        ${rawExposure.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border/80 bg-background/60 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-text-muted">Potential Risk Reduction Savings</span>
                      <span className="font-mono text-xs font-bold text-emerald-400">+88%</span>
                    </div>
                    <p className="mt-1 font-display text-xl font-bold text-emerald-400">
                      ${breachSavings.toLocaleString()} / yr
                    </p>
                  </div>

                  <div className="space-y-2 text-xs text-text-muted">
                    <div className="flex justify-between border-b border-border/40 py-1.5">
                      <span>Recommended Architecture:</span>
                      <span className="font-semibold text-text">{recommendedTier}</span>
                    </div>
                    <div className="flex justify-between border-b border-border/40 py-1.5">
                      <span>Response SLA:</span>
                      <span className="font-semibold text-text">15-Min Guaranteed</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span>Continuous Monitoring:</span>
                      <span className="font-semibold text-emerald-400">24 / 7 SOC Included</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/60">
                <Button onClick={handleApplyEstimate} size="lg" className="w-full justify-center">
                  Apply Calculation to Consultation
                  <ArrowRight size={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
