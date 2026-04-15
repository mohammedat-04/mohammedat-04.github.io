"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

export default function Story() {
  const reduceMotion = useReducedMotion();
  const { siteData, language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeChapter = siteData.storyChapters[activeIndex];

  return (
    <section id="story" className="space-y-5">
      <div className="section-shell px-6 py-8 sm:px-10 sm:py-10">
        <p className="section-tag">{siteData.storySection.eyebrow}</p>
        <h2 className="section-title mt-4 max-w-3xl">
          {siteData.storySection.title}
        </h2>
        <p className="section-copy mt-5 max-w-3xl">
          {siteData.storySection.description}
        </p>
      </div>

      <div className="story-grid">
        <div className="story-stage-shell">
          <div className="story-stage" data-cursor="card">
            <div className="story-stage-glow" aria-hidden="true" />

            <div className="story-stage-nav">
              {siteData.storyChapters.map((chapter, index) => (
                <button
                  key={chapter.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`story-step-pill ${index === activeIndex ? "story-step-pill-active" : ""}`}
                >
                  <span>{chapter.id}</span>
                  <span>{chapter.label}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${language}-${activeChapter.id}`}
                className="story-stage-content"
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -18 }}
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
              >
                <p className="fact-label">{activeChapter.label}</p>
                <span className="story-stage-index">{activeChapter.id}</span>
                <h3 className="story-stage-title">{activeChapter.title}</h3>
                <p className="story-stage-copy">{activeChapter.description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {activeChapter.tags.map((tag) => (
                    <span key={tag} className="story-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="story-rail">
          {siteData.storyChapters.map((chapter, index) => (
            <motion.article
              key={chapter.id}
              className={`story-card ${index === activeIndex ? "story-card-active" : ""}`}
              data-cursor="card"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.55 }}
              transition={{
                duration: reduceMotion ? 0 : 0.45,
                ease: "easeOut"
              }}
              onViewportEnter={() => setActiveIndex(index)}
            >
              <div className="story-card-head">
                <span className="story-card-index">{chapter.id}</span>
                <div>
                  <p className="project-category">{chapter.label}</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-[2rem]">
                    {chapter.title}
                  </h3>
                </div>
              </div>

              <p className="text-muted mt-5 text-sm leading-7 sm:text-base">
                {chapter.description}
              </p>

              <ul className="project-list mt-6">
                {chapter.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
