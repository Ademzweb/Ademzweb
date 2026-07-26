"use client";

import { useState, useEffect, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { contactContent } from "@/content/contact";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { getIcon } from "@/lib/icons";

/**
 * Contact section with form and info cards.
 * Supports custom `prefill-contact` events.
 */
export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    const handlePrefill = (e: Event) => {
      const customEvent = e as CustomEvent<{ message?: string; company?: string }>;
      if (customEvent.detail) {
        setFormData((prev) => ({
          ...prev,
          message: customEvent.detail.message || prev.message,
          company: customEvent.detail.company || prev.company,
        }));
      }
    };

    window.addEventListener("prefill-contact", handlePrefill);
    return () => window.removeEventListener("prefill-contact", handlePrefill);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const contactInfo = [
    {
      icon: "Mail",
      title: contactContent.infoCards[0].title,
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
    {
      icon: "Phone",
      title: contactContent.infoCards[1].title,
      value: siteConfig.phone,
      href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
    },
    {
      icon: "MapPin",
      title: contactContent.infoCards[2].title,
      value: siteConfig.address.full,
      href: "#map",
    },
  ];

  return (
    <section
      id="contact"
      className="section-padding relative bg-surface/50"
      aria-labelledby="contact-heading"
    >
      <div className="section-container">
        <SectionHeading
          label={contactContent.sectionLabel}
          title={contactContent.title}
          description={contactContent.description}
        />

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card flex flex-col items-center justify-center rounded-2xl p-12 text-center"
              >
                <CheckCircle size={48} className="mb-4 text-accent" />
                <p className="text-lg text-text">
                  {contactContent.form.successMessage}
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass-card space-y-5 rounded-2xl p-8 shadow-xl border border-border"
                aria-label="Contact form"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-text"
                    >
                      {contactContent.form.nameLabel}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={contactContent.form.namePlaceholder}
                      className="w-full rounded-lg border border-border bg-background/50 px-4 py-3 text-text placeholder:text-text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-text"
                    >
                      {contactContent.form.emailLabel}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={contactContent.form.emailPlaceholder}
                      className="w-full rounded-lg border border-border bg-background/50 px-4 py-3 text-text placeholder:text-text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="company"
                      className="mb-2 block text-sm font-medium text-text"
                    >
                      {contactContent.form.companyLabel}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder={contactContent.form.companyPlaceholder}
                      className="w-full rounded-lg border border-border bg-background/50 px-4 py-3 text-text placeholder:text-text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-medium text-text"
                    >
                      {contactContent.form.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={contactContent.form.phonePlaceholder}
                      className="w-full rounded-lg border border-border bg-background/50 px-4 py-3 text-text placeholder:text-text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-text"
                  >
                    {contactContent.form.messageLabel}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={contactContent.form.messagePlaceholder}
                    className="w-full resize-none rounded-lg border border-border bg-background/50 px-4 py-3 text-text placeholder:text-text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent font-sans"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  {contactContent.form.submitText}
                  <Send size={18} />
                </Button>
              </form>
            )}
          </div>

          {/* Contact Info Cards */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            {contactInfo.map((info, index) => {
              const Icon = getIcon(info.icon);
              return (
                <motion.a
                  key={info.title}
                  href={info.href}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card flex items-start gap-4 rounded-2xl p-5 transition-colors hover:border-accent/30"
                >
                  <div className="rounded-xl bg-accent/10 p-3 text-accent">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-muted">
                      {info.title}
                    </p>
                    <p className="mt-1 text-sm text-text">{info.value}</p>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* Google Maps Embed */}
        <div id="map" className="mt-12 overflow-hidden rounded-2xl border border-border">
          <iframe
            src={siteConfig.mapEmbedUrl}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${siteConfig.name} office location`}
            className="grayscale transition-all duration-500 hover:grayscale-0"
          />
        </div>
      </div>
    </section>
  );
}
