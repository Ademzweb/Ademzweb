"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import { siteConfig } from "@/config/site";
import { navigationContent } from "@/content/navigation";
import { Button } from "@/components/ui/Button";
import { scrollToSection } from "@/lib/utils";
import { useLockBodyScroll } from "@/hooks/useInView";
import { cyberSound } from "@/lib/cyberSound";

interface NavbarProps {
  onOpenCommandPalette?: () => void;
}

/**
 * Sticky navigation bar with desktop links, command palette search, and animated mobile menu.
 */
export function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useLockBodyScroll(isMobileOpen);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    cyberSound.playClick();
    setIsMobileOpen(false);
    scrollToSection(href);
  };

  const handleTriggerSearch = () => {
    cyberSound.playClick();
    if (onOpenCommandPalette) {
      onOpenCommandPalette();
    } else {
      window.dispatchEvent(new CustomEvent("toggle-command-palette"));
    }
  };

  return (
    <header
      role="banner"
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <nav
        className="section-container flex h-16 items-center justify-between md:h-20"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#home");
          }}
          className="relative z-50 flex items-center gap-2"
          aria-label={`${siteConfig.name} - Go to homepage`}
        >
          <Image
            src={siteConfig.logo.src}
            alt={siteConfig.logo.alt}
            width={siteConfig.logo.width}
            height={siteConfig.logo.height}
            priority
            className="h-8 w-auto md:h-10"
          />
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-1 xl:flex" role="list">
          {navigationContent.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="rounded-lg px-3 py-2 text-xs font-medium text-text-muted transition-colors hover:text-text"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Search & CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={handleTriggerSearch}
            className="flex items-center gap-2 rounded-lg border border-border bg-surface/60 px-3 py-1.5 font-mono text-xs text-text-muted transition-all hover:border-accent hover:text-accent"
            aria-label="Search site (Ctrl+K)"
          >
            <Search size={14} className="text-accent" />
            <span>Search...</span>
            <kbd className="rounded bg-background px-1.5 py-0.5 text-[10px] text-text-muted border border-border">
              Ctrl K
            </kbd>
          </button>

          <Button
            size="sm"
            onClick={() => handleNavClick("#contact")}
            aria-label={siteConfig.ctaText}
          >
            {siteConfig.ctaText}
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={handleTriggerSearch}
            className="rounded-lg border border-border p-2 text-text-muted transition-colors hover:text-accent"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="relative z-50 rounded-lg p-2 text-text"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl lg:hidden"
            >
              <motion.nav
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="flex h-full flex-col items-center justify-center gap-2"
                aria-label="Mobile navigation"
              >
                {navigationContent.links.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="rounded-lg px-6 py-2.5 text-base text-text-muted transition-colors hover:text-text"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-4"
                >
                  <Button onClick={() => handleNavClick("#contact")}>
                    {siteConfig.ctaText}
                  </Button>
                </motion.div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
