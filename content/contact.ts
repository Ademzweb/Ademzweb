/**
 * CONTACT SECTION CONTENT
 * Edit form labels, placeholders, and section text here.
 */

export const contactContent = {
  sectionLabel: "Contact Us",
  title: "Get in Touch",
  description:
    "Ready to strengthen your security posture? Reach out for a free consultation — no obligation, no pressure.",

  form: {
    nameLabel: "Full Name",
    namePlaceholder: "John Smith",
    emailLabel: "Email Address",
    emailPlaceholder: "john@company.com",
    companyLabel: "Company",
    companyPlaceholder: "Your Company Name",
    phoneLabel: "Phone Number",
    phonePlaceholder: "+1 (555) 000-0000",
    messageLabel: "Message",
    messagePlaceholder: "Tell us about your security needs...",
    submitText: "Send Message",
    successMessage:
      "Thank you! Your message has been received. We'll get back to you within 24 hours.",
  },

  // Info cards shown beside the form
  infoCards: [
    {
      icon: "Mail",
      title: "Email Us",
      value: "", // Leave empty to use siteConfig.email automatically
      href: "", // Leave empty to use mailto: link automatically
    },
    {
      icon: "Phone",
      title: "Call Us",
      value: "",
      href: "",
    },
    {
      icon: "MapPin",
      title: "Visit Us",
      value: "",
      href: "",
    },
  ],
};
