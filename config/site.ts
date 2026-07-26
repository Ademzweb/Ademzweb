/**
 * SITE CONFIGURATION
 * ==================
 * Edit this file to update company info, colors, and social links
 * across the entire website. No React knowledge needed.
 */

export const siteConfig = {
  // Company identity
  name: "Ademzweb",
  tagline: "Enterprise Cybersecurity Solutions",
  description:
    "Ademzweb delivers premium cybersecurity services to protect businesses against modern digital threats. From vulnerability assessments to incident response, we keep your organization secure.",

  // Contact information
  phone: "+91 6291698171",
  email: "contact@ademzweb.com",
  address: {
    street: "B-272, Pocket ",
    city: "New Delhi",
    state: "DL",
    zip: "110025",
    country: "India",
    full: "B-272, Pocket B, Okhla Phase I, Okhla Industrial Estate, New Delhi, Delhi 110020",
  },

  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.32643693752!2d77.27799929999999!3d28.5299063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce1dc3fcd581b%3A0x8546965d069eb58c!2sAdemzweb!5e0!3m2!1sen!2sin!4v1785062636250!5m2!1sen!2sin",

  // Logo — your brand logo in /public/logo.png
  logo: {
    src: "/logo.png",
    alt: "Ademzweb Logo",
    width: 160,
    height: 160,
  },

  social: {
    linkedin: "https://linkedin.com/company/ademzweb",
    twitter: "https://twitter.com/ademzweb",
    github: "https://github.com/ademzweb",
    youtube: "",
    facebook: "",
  },

  ctaText: "Get Protected",
  copyright: `© ${new Date().getFullYear()} Ademzweb. All rights reserved.`,

  legal: {
    privacy: "/privacy",
    terms: "/terms",
  },

  // Theme — matched to Ademzweb logo (charcoal + white + muted red)
  theme: {
    background: "#0a0c10", // deep charcoal (logo background)
    surface: "#0d1117", // card/section surface
    surfaceLight: "#161b22",
    primary: "#ffffff", // white (ADEMZ text)
    primaryLight: "#e5e7eb",
    accent: "#b94a4a", // muted red (WEB text)
    accentGlow: "#c53030",
    accentDim: "#8b3535",
    text: "#f9fafb",
    textMuted: "#9ca3af",
    border: "rgba(255, 255, 255, 0.08)",
    glass: "rgba(255, 255, 255, 0.03)",
  },

  url: "https://ademzweb.com",
  ogImage: "/logo.png",
} as const;

export type SiteConfig = typeof siteConfig;
