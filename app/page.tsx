"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { ScannerSection } from "@/components/sections/ScannerSection";
import { Services } from "@/components/sections/Services";
import { ThreatMap } from "@/components/sections/ThreatMap";
import { SecurityCalculator } from "@/components/sections/SecurityCalculator";
import { CyberTerminalSection } from "@/components/sections/CyberTerminalSection";
import { ComplianceMatrix } from "@/components/sections/ComplianceMatrix";
import { About } from "@/components/sections/About";
import { WhyUs } from "@/components/sections/WhyUs";
import { Process } from "@/components/sections/Process";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { PageLoader } from "@/components/ui/PageLoader";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { CyberDock } from "@/components/ui/CyberDock";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { LiveScrollTicker } from "@/components/ui/LiveScrollTicker";
import { ScrollAmbientGlow } from "@/components/ui/ScrollAmbientGlow";
import { RedScatteredBackground } from "@/components/ui/RedScatteredBackground";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const handleTogglePalette = () => {
      setPaletteOpen((prev) => !prev);
    };

    window.addEventListener("toggle-command-palette", handleTogglePalette);
    return () => window.removeEventListener("toggle-command-palette", handleTogglePalette);
  }, []);

  return (
    <>
      {/* Top minimal scroll progress line */}
      <ScrollProgressBar />

      {/* Ambient background glow orb */}
      <ScrollAmbientGlow />

      {/* Scroll-activated red scattered particles background across the site */}
      <RedScatteredBackground />

      {loading && <PageLoader onComplete={() => setLoading(false)} />}

      <Navbar onOpenCommandPalette={() => setPaletteOpen(true)} />

      <main id="main-content" className="relative z-10">
        <Hero />
        <ScannerSection />
        <Services />
        <ThreatMap />
        <SecurityCalculator />
        <CyberTerminalSection />
        <ComplianceMatrix />
        <About />
        <WhyUs />
        <Process />
        <Stats />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>

      <Footer />

      {/* Minimal live telemetry scroll ticker pill */}
      <LiveScrollTicker />

      {/* Floating Interactive Utility Dock */}
      <CyberDock onOpenCommandPalette={() => setPaletteOpen(true)} />

      {/* Interactive Command Palette Modal (Ctrl + K) */}
      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
      />
    </>
  );
}
