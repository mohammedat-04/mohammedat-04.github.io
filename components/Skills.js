"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

export default function Skills() {
  const reduceMotion = useReducedMotion();
  const { siteData } = useLanguage();

  return (
    <section id="stack">
      <motion.div
        className="section-shell px-6 py-8 sm:px-10 sm:py-10"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: reduceMotion ? 0 : 0.55, ease: "easeOut" }}
      >
        <p className="section-tag">{siteData.skillsSection.eyebrow}</p>
        <h2 className="section-title mt-4">{siteData.skillsSection.title}</h2>
        <p className="section-copy mt-5 max-w-3xl">
          {siteData.skillsSection.description}
        </p>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {siteData.stackGroups.map((group, index) => (
            <motion.article
              key={group.title}
              className="info-card skill-card p-5"
              data-cursor="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={reduceMotion ? undefined : { y: -4 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: reduceMotion ? 0 : 0.4,
                delay: reduceMotion ? 0 : index * 0.07,
                ease: "easeOut"
              }}
            >
              <div className="skill-card-head">
                <p className="fact-label">{group.title}</p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => {
                  const chipKey =
                    typeof item === "string" ? item : `${group.title}-${item.label}`;
                  const isLevelChip = typeof item !== "string";

                  return (
                    isLevelChip ? (
                      <span
                        key={chipKey}
                        className="tool-chip tool-chip-with-level"
                        tabIndex={0}
                        aria-label={`${item.label} — ${siteData.skillsSection.levelLabel}: ${item.level}`}
                        data-cursor="link"
                      >
                        <span className="tool-chip-label">{item.label}</span>
                        <span className="tool-chip-level" aria-hidden="true">
                          {item.level}
                        </span>
                      </span>
                    ) : (
                      <span key={chipKey} className="tool-chip" data-cursor="link">
                        {item}
                      </span>
                    )
                  );
                })}
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
