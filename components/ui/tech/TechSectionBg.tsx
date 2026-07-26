"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MatrixRain } from "./MatrixRain";
import { NetworkGraph } from "./NetworkGraph";
import { ScanLine } from "./ScanLine";

type TechBgVariant = "grid" | "hex" | "matrix" | "network" | "scan";

interface TechSectionBgProps {
  variant?: TechBgVariant | TechBgVariant[];
  children?: ReactNode;
  className?: string;
}

/**
 * Decorative tech background layer for lower page sections.
 * Stack variants: e.g. variant={["hex", "scan"]}
 */
export function TechSectionBg({
  variant = "grid",
  children,
  className,
}: TechSectionBgProps) {
  const variants = Array.isArray(variant) ? variant : [variant];

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      {variants.includes("grid") && (
        <div className="cyber-grid absolute inset-0 animate-grid-move opacity-30" />
      )}
      {variants.includes("hex") && (
        <div className="hex-grid absolute inset-0 opacity-60" />
      )}
      {variants.includes("matrix") && <MatrixRain />}
      {variants.includes("network") && <NetworkGraph />}
      {variants.includes("scan") && <ScanLine />}
      {/* Subtle red radial glow */}
      <div className="absolute inset-0 bg-gradient-radial from-accent/[0.04] via-transparent to-transparent" />
      {children}
    </div>
  );
}
