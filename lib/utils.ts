import { siteConfig } from "@/config/site";

/**
 * Combines class names, filtering out falsy values.
 * Usage: cn("base-class", condition && "conditional-class")
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Generates CSS custom properties from site theme config.
 * Used in layout to inject theme colors globally.
 */
export function getThemeCSSVariables(): Record<string, string> {
  const { theme } = siteConfig;
  return {
    "--color-background": theme.background,
    "--color-surface": theme.surface,
    "--color-surface-light": theme.surfaceLight,
    "--color-primary": theme.primary,
    "--color-primary-light": theme.primaryLight,
    "--color-accent": theme.accent,
    "--color-accent-glow": theme.accentGlow,
    "--color-accent-dim": theme.accentDim,
    "--color-text": theme.text,
    "--color-text-muted": theme.textMuted,
    "--color-border": theme.border,
    "--color-glass": theme.glass,
  };
}

/**
 * Smooth scroll to a section by href (e.g., "#contact")
 */
export function scrollToSection(href: string): void {
  const id = href.replace("#", "");
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
