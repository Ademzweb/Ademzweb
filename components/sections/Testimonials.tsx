"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { testimonialsContent } from "@/content/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Animated testimonials carousel.
 * Edit testimonials in /content/testimonials.ts
 */
export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const total = testimonialsContent.testimonials.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  const testimonial = testimonialsContent.testimonials[current];

  return (
    <section
      id="testimonials"
      className="section-padding relative bg-surface/50"
      aria-labelledby="testimonials-heading"
      aria-roledescription="carousel"
    >
      <div className="section-container">
        <SectionHeading
          label={testimonialsContent.sectionLabel}
          title={testimonialsContent.title}
          description={testimonialsContent.description}
        />

        <div className="relative mx-auto max-w-3xl">
          {/* Quote icon */}
          <Quote
            className="absolute -top-4 left-0 h-8 w-8 text-accent/20 md:-left-8"
            aria-hidden="true"
          />

          {/* Carousel content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="glass-card rounded-2xl p-8 md:p-12"
              aria-live="polite"
            >
              {/* Star rating */}
              <div
                className="mb-6 flex gap-1"
                aria-label={`${testimonial.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < testimonial.rating
                        ? "fill-accent text-accent"
                        : "text-border"
                    }
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Feedback */}
              <blockquote className="mb-8 text-lg leading-relaxed text-text md:text-xl">
                &ldquo;{testimonial.feedback}&rdquo;
              </blockquote>

              {/* Author */}
              <div>
                <p className="font-display font-semibold text-text">
                  {testimonial.name}
                </p>
                <p className="text-sm text-text-muted">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="rounded-full border border-border p-2 text-text-muted transition-colors hover:border-accent hover:text-accent"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex gap-2" role="tablist" aria-label="Testimonials">
              {testimonialsContent.testimonials.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setCurrent(i)}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Testimonial ${i + 1} of ${total}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-8 bg-accent"
                      : "w-2 bg-border hover:bg-text-muted"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="rounded-full border border-border p-2 text-text-muted transition-colors hover:border-accent hover:text-accent"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
