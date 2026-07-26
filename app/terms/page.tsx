import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${siteConfig.name}`,
};

/**
 * Terms of Service placeholder page.
 * Replace this content with your actual terms.
 */
export default function TermsPage() {
  return (
    <main className="section-container section-padding min-h-screen">
      <Link
        href="/"
        className="mb-8 inline-block text-sm text-accent hover:underline"
      >
        ← Back to Home
      </Link>
      <h1 className="font-display text-4xl font-bold text-text">
        Terms of Service
      </h1>
      <p className="mt-4 text-text-muted">
        Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
      </p>
      <div className="prose prose-invert mt-8 max-w-3xl space-y-6 text-text-muted">
        <p>
          This is a placeholder terms of service page. Replace this content
          with your actual terms, or link to an external URL in{" "}
          <code className="text-accent">config/site.ts</code>.
        </p>
        <p>
          By accessing and using the {siteConfig.name} website and services,
          you agree to be bound by these Terms of Service.
        </p>
        <h2 className="font-display text-xl font-semibold text-text">
          Services
        </h2>
        <p>
          {siteConfig.name} provides cybersecurity consulting and assessment
          services. All engagements are subject to separate service agreements
          and non-disclosure agreements.
        </p>
        <h2 className="font-display text-xl font-semibold text-text">
          Contact Us
        </h2>
        <p>
          Questions about these terms? Contact us at{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-accent hover:underline">
            {siteConfig.email}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
