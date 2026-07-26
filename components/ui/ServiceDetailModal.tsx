"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, Clock, CheckCircle2, AlertTriangle, ArrowRight, FileText } from "lucide-react";
import { ServiceDetail } from "@/content/services";
import { getIcon } from "@/lib/icons";
import { Button } from "@/components/ui/Button";
import { scrollToSection } from "@/lib/utils";
import { cyberSound } from "@/lib/cyberSound";

interface ServiceDetailModalProps {
  service: ServiceDetail | null;
  onClose: () => void;
}

export function ServiceDetailModal({ service, onClose }: ServiceDetailModalProps) {
  if (!service) return null;

  const Icon = getIcon(service.icon);

  const handleRequestAudit = () => {
    cyberSound.playClick();
    onClose();
    // Dispatch event to prefill contact form
    window.dispatchEvent(
      new CustomEvent("prefill-contact", {
        detail: {
          message: `Hello Ademzweb team, I would like to request an audit/consultation for your service: "${service.title}".`,
          company: "",
        },
      })
    );
    scrollToSection("#contact");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            cyberSound.playClick();
            onClose();
          }}
          className="fixed inset-0 bg-background/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-border bg-surface p-6 shadow-2xl shadow-accent/10 sm:p-8"
        >
          {/* Close button */}
          <button
            onClick={() => {
              cyberSound.playClick();
              onClose();
            }}
            className="absolute right-4 top-4 rounded-full border border-border p-2 text-text-muted transition-colors hover:border-accent hover:text-accent"
            aria-label="Close details"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="flex items-start gap-4 pr-10">
            <div className="rounded-xl border border-accent/30 bg-accent/10 p-3 text-accent">
              <Icon size={32} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent border border-accent/20">
                  Technical Inspector
                </span>
                <span className="flex items-center gap-1 text-xs text-text-muted">
                  <Clock size={14} className="text-accent" />
                  SLA: {service.sla}
                </span>
              </div>
              <h2 className="mt-2 font-display text-2xl font-bold text-text sm:text-3xl">
                {service.title}
              </h2>
              <p className="text-sm font-medium text-text-muted">{service.tagline}</p>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-text-muted sm:text-base">
            {service.description}
          </p>

          {/* Grid specifications */}
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {/* Attack vectors covered */}
            <div className="rounded-xl border border-border bg-background/50 p-4">
              <h3 className="mb-3 flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-accent">
                <AlertTriangle size={16} />
                Attack Vectors Mitigated
              </h3>
              <ul className="space-y-2 text-sm text-text">
                {service.attackVectors.map((vector) => (
                  <li key={vector} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {vector}
                  </li>
                ))}
              </ul>
            </div>

            {/* Frameworks & Compliance */}
            <div className="rounded-xl border border-border bg-background/50 p-4">
              <h3 className="mb-3 flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-text">
                <Shield size={16} className="text-accent" />
                Standards & Frameworks
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.frameworks.map((fw) => (
                  <span
                    key={fw}
                    className="rounded-lg border border-border bg-surface px-3 py-1 text-xs text-text-muted"
                  >
                    {fw}
                  </span>
                ))}
              </div>
              <div className="mt-4 border-t border-border/50 pt-3">
                <h4 className="mb-2 flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-wider text-text-muted">
                  <FileText size={14} className="text-accent" />
                  Key Deliverables
                </h4>
                <ul className="space-y-1 text-xs text-text-muted">
                  {service.deliverables.map((del) => (
                    <li key={del}>• {del}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Key technical features */}
          <div className="mt-6 rounded-xl border border-border bg-background/50 p-5">
            <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-text">
              Core Capabilities & Execution Workflow
            </h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {service.features.map((feat) => (
                <li key={feat} className="flex items-start gap-2.5 text-xs text-text-muted sm:text-sm">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Footer */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
            <div className="text-center sm:text-left">
              <p className="text-xs text-text-muted">Ready to secure your stack?</p>
              <p className="text-sm font-semibold text-text">
                Book a scoping session with our lead security engineers.
              </p>
            </div>
            <Button size="lg" onClick={handleRequestAudit} className="w-full sm:w-auto">
              Request Audit for {service.title}
              <ArrowRight size={18} />
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
