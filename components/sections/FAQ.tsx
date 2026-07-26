"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { faqContent } from "@/content/faq";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Single FAQ accordion item
 */
function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-accent"
        aria-expanded={isOpen}
      >
        <span className="font-display text-base font-medium text-text md:text-lg">
          {question}
        </span>
        <span className="flex-shrink-0 text-accent">
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 leading-relaxed text-text-muted">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * FAQ accordion section.
 * Edit questions in /content/faq.ts
 */
export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(faqContent.faqs[0]?.id ?? null);

  return (
    <section
      id="faq"
      className="section-padding relative"
      aria-labelledby="faq-heading"
    >
      <div className="section-container">
        <SectionHeading
          label={faqContent.sectionLabel}
          title={faqContent.title}
          description={faqContent.description}
        />

        <div className="mx-auto max-w-3xl">
          {faqContent.faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openId === faq.id}
              onToggle={() =>
                setOpenId(openId === faq.id ? null : faq.id)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
