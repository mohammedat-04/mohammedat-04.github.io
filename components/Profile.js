"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

export default function Profile() {
  const reduceMotion = useReducedMotion();
  const { siteData } = useLanguage();
  const profileStats = [
    {
      label: siteData.overview.stats.focusAreas,
      value: String(siteData.focus.length).padStart(2, "0")
    },
    {
      label: siteData.overview.stats.featuredProjects,
      value: String(siteData.projects.length).padStart(2, "0")
    },
    {
      label: siteData.overview.stats.stackGroups,
      value: String(siteData.stackGroups.length).padStart(2, "0")
    }
  ];

  return (
    <section id="profile">
      <motion.div
        className="section-shell px-6 py-8 sm:px-10 sm:py-10"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: reduceMotion ? 0 : 0.55, ease: "easeOut" }}
      >
        <p className="section-tag">{siteData.overview.eyebrow}</p>
        <h2 className="section-title mt-4 max-w-3xl">{siteData.overview.title}</h2>
        <p className="section-copy mt-5 max-w-3xl">
          {siteData.overview.description}
        </p>

        <div className="profile-stats-grid mt-8">
          {profileStats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {siteData.strengths.map((strength, index) => (
            <motion.article
              key={strength.title}
              className="info-card strength-card p-5"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: reduceMotion ? 0 : 0.4,
                delay: reduceMotion ? 0 : index * 0.07,
                ease: "easeOut"
              }}
            >
              <p className="fact-label">0{index + 1}</p>
              <h3 className="mt-4 text-xl font-semibold text-[var(--foreground)]">
                {strength.title}
              </h3>
              <p className="text-muted mt-3 text-sm leading-7">
                {strength.description}
              </p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
