"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

export default function Contact() {
  const reduceMotion = useReducedMotion();
  const { siteData } = useLanguage();

  return (
    <section id="contact" className="pb-10">
      <motion.div
        className="section-shell contact-shell px-6 py-8 sm:px-10 sm:py-10"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: reduceMotion ? 0 : 0.55, ease: "easeOut" }}
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="section-tag">{siteData.contact.eyebrow}</p>
            <h2 className="section-title mt-4">{siteData.contact.title}</h2>
            <p className="section-copy mt-5">{siteData.contact.description}</p>
          </div>

          <a
            href={siteData.linkedin}
            target="_blank"
            rel="noreferrer"
            className="primary-button focus-ring inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium hover:-translate-y-0.5"
            aria-label={siteData.contact.ariaLabel}
          >
            {siteData.contact.cta}
          </a>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {siteData.contact.notes.map((note, index) => (
            <motion.article
              key={note.title}
              className="info-card p-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: reduceMotion ? 0 : 0.4,
                delay: reduceMotion ? 0 : index * 0.06,
                ease: "easeOut"
              }}
            >
              <p className="fact-label">{note.title}</p>
              {note.href ? (
                <a
                  href={note.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex text-sm leading-7 text-[var(--foreground-soft)] hover:text-[var(--accent)]"
                >
                  {note.value}
                </a>
              ) : (
                <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
                  {note.value}
                </p>
              )}
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
