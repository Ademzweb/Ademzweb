import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name}`,
};

/**
 * Privacy Policy placeholder page.
 * Replace this content with your actual privacy policy.
 */
export default function PrivacyPage() {
  return (
    <main className="section-container section-padding min-h-screen">
      <Link
        href="/"
        className="mb-8 inline-block text-sm text-accent hover:underline"
      >
        ← Back to Home
      </Link>
      <h1 className="font-display text-4xl font-bold text-text">
        Privacy Policy
      </h1>
      <p className="mt-4 text-text-muted">
        Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
      </p>
      <div className="prose prose-invert mt-8 max-w-3xl space-y-6 text-text-muted">
        <p>
          This is a placeholder privacy policy page. Replace this content with
          your actual privacy policy, or link to an external URL in{" "}
          <code className="text-accent">config/site.ts</code>.
        </p>
        <p>
          {siteConfig.name} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is
          committed to protecting your privacy. This policy explains how we
          collect, use, and safeguard your information when you visit our
          website or use our services.
        </p>
        <h2 className="font-display text-xl font-semibold text-text">
          Information We Collect
        </h2>
        <p>
          We may collect personal information you provide directly, such as
          your name, email address, phone number, and company name when you
          contact us through our website.
        </p>
        <h2 className="font-display text-xl font-semibold text-text">
          Contact Us
        </h2>
        <p>
          If you have questions about this privacy policy, contact us at{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-accent hover:underline">
            {siteConfig.email}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
