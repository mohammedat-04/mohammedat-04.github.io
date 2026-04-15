"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const { siteData } = useLanguage();

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.8, ease: "easeOut" };

  const initial = siteData.name.charAt(0).toUpperCase();
  const academicEntry = siteData.education;

  return (
    <section id="home" className="xl:sticky xl:top-28 xl:self-start">
      <div className="space-y-5">
        <motion.p
          className="section-tag"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition}
        >
          {siteData.heroTag}
        </motion.p>

        <motion.div
          className="shell-panel profile-stage overflow-hidden px-6 py-8 sm:px-8 sm:py-10"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: reduceMotion ? 0 : 0.06 }}
        >
          <div className="profile-backdrop" aria-hidden="true" />

          <div className="profile-header">
            <div className="profile-avatar-shell">
              <div className="profile-avatar-ring" />
              <div className="profile-avatar">
                <span>{initial}</span>
              </div>
            </div>

            <div className="min-w-0">
              <p className="fact-label">{siteData.role}</p>
              <h2 className="profile-name mt-3">{siteData.name}</h2>
              <p className="text-muted mt-2 text-sm leading-6">{siteData.heroIntro}</p>
            </div>
          </div>

          {academicEntry ? (
            <div className="hero-education mt-6">
              <p className="fact-label">{siteData.educationLabel}</p>
              <div className="hero-education-card mt-3">
                <div
                  className={`institute-mark ${academicEntry.logo?.tone ? `institute-mark-${academicEntry.logo.tone}` : ""}`}
                >
                  {academicEntry.logo?.src ? (
                    <Image
                      src={academicEntry.logo.src}
                      alt={academicEntry.logo.alt || `${academicEntry.company} logo`}
                      width={68}
                      height={68}
                      className="institute-mark-image"
                    />
                  ) : (
                    <span aria-hidden="true">{academicEntry.logo?.short || initial}</span>
                  )}
                </div>

                <div className="min-w-0">
                  <p className="project-category">{academicEntry.company}</p>
                  <h3 className="mt-2 text-lg font-semibold text-[var(--foreground)]">
                    {academicEntry.role}
                  </h3>
                  <p className="text-muted mt-2 text-sm leading-6">
                    {academicEntry.summary}
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          <motion.div
            className="hero-about mt-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: reduceMotion ? 0 : 0.28 }}
          >
            <p className="fact-label">{siteData.aboutLabel}</p>
            <p className="hero-summary mt-4">{siteData.summary}</p>
          </motion.div>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: reduceMotion ? 0 : 0.36 }}
          >
            <a
              href="#projects"
              className="primary-button focus-ring inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium hover:-translate-y-0.5"
            >
              {siteData.heroPrimaryCta}
            </a>
            <a
              href="#contact"
              className="secondary-button focus-ring inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium hover:-translate-y-0.5"
            >
              {siteData.heroSecondaryCta}
            </a>
          </motion.div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <motion.article
            className="shell-panel accent-panel tilt-card p-5"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: reduceMotion ? 0 : 0.44 }}
          >
            <p className="fact-label">{siteData.heroQuickFactsTitle}</p>
            <div className="mt-4 space-y-3">
              {siteData.quickFacts.map((fact) => (
                <div key={fact.label} className="fact-row">
                  <span className="fact-row-label">{fact.label}</span>
                  <span className="fact-row-value">{fact.value}</span>
                </div>
              ))}
            </div>
          </motion.article>

          <motion.article
            className="shell-panel tilt-card-reverse p-5"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: reduceMotion ? 0 : 0.5 }}
          >
            <p className="fact-label">{siteData.heroExploreTitle}</p>
            <div className="link-grid mt-4">
              {siteData.quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="quick-link-card focus-ring"
                >
                  <span className="quick-link-label">{link.label}</span>
                  <span className="quick-link-value">{link.value}</span>
                </a>
              ))}
            </div>
            <p className="text-muted mt-4 text-sm leading-6">
              {siteData.availability}
            </p>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
