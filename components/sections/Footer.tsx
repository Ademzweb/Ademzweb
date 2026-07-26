"use client";

import Image from "next/image";
import { Linkedin, Twitter, Github, Youtube, Facebook } from "lucide-react";
import { siteConfig } from "@/config/site";
import { navigationContent } from "@/content/navigation";
import { footerContent } from "@/content/footer";
import { scrollToSection } from "@/lib/utils";

/**
 * Social icon mapping
 */
const socialIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  linkedin: Linkedin,
  twitter: Twitter,
  github: Github,
  youtube: Youtube,
  facebook: Facebook,
};

/**
 * Site footer with links, services, social icons, and legal links.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="border-t border-border bg-surface pt-16 pb-8"
    >
      <div className="section-container">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Image
              src={siteConfig.logo.src}
              alt={siteConfig.logo.alt}
              width={siteConfig.logo.width}
              height={siteConfig.logo.height}
              className="mb-4 h-8 w-auto"
            />
            <p className="text-sm leading-relaxed text-text-muted">
              {footerContent.description}
            </p>

            {/* Social icons */}
            <div className="mt-6 flex gap-3">
              {Object.entries(siteConfig.social).map(([platform, url]) => {
                if (!url) return null;
                const Icon = socialIcons[platform];
                if (!Icon) return null;
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-border p-2 text-text-muted transition-colors hover:border-accent hover:text-accent"
                    aria-label={`Follow us on ${platform}`}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-text">
              {footerContent.quickLinksTitle}
            </h3>
            <ul className="space-y-3" role="list">
              {navigationContent.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-sm text-text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-text">
              {footerContent.servicesTitle}
            </h3>
            <ul className="space-y-3" role="list">
              {footerContent.serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-sm text-text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-text">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-text-muted" role="list">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition-colors hover:text-accent"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-accent"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li>{siteConfig.address.full}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-text-muted">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href={siteConfig.legal.privacy}
              className="text-sm text-text-muted transition-colors hover:text-accent"
            >
              Privacy Policy
            </a>
            <a
              href={siteConfig.legal.terms}
              className="text-sm text-text-muted transition-colors hover:text-accent"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
