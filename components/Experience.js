"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

export default function Experience() {
  const reduceMotion = useReducedMotion();
  const { siteData } = useLanguage();
  const [failedLogos, setFailedLogos] = useState({});
  const experienceItems = [...(siteData.hiwiRoles || []), ...(siteData.experience || [])];

  return (
    <section id="experience" className="space-y-5">
      <div className="section-shell px-6 py-8 sm:px-10 sm:py-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-tag">{siteData.experienceSection.eyebrow}</p>
          </div>

          <a
            href={siteData.linkedin}
            target="_blank"
            rel="noreferrer"
            className="secondary-button focus-ring inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium hover:-translate-y-0.5"
          >
            {siteData.experienceSection.cta}
          </a>
        </div>
      </div>

      <div className="space-y-4">
        {experienceItems.map((item, index) => {
          const logoKey = `${item.company}-${item.period}`;
          const showImage = item.logo?.src && !failedLogos[logoKey];

          return (
            <motion.article
              key={`${item.company}-${item.role}-${item.period}`}
              className="experience-card experience-card-compact"
              data-cursor="card"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: reduceMotion ? 0 : 0.5,
                delay: reduceMotion ? 0 : index * 0.08,
                ease: "easeOut"
              }}
            >
            <div className="experience-compact-top">
              <div className={`institute-mark ${item.logo?.tone ? `institute-mark-${item.logo.tone}` : ""}`}>
                {showImage ? (
                  <Image
                    src={item.logo.src}
                    alt={item.logo.alt || `${item.company} logo`}
                    width={68}
                    height={68}
                    className="institute-mark-image"
                    onError={() =>
                      setFailedLogos((current) => ({
                        ...current,
                        [logoKey]: true
                      }))
                    }
                  />
                ) : (
                  <span aria-hidden="true">{item.logo?.short || "AH"}</span>
                )}
              </div>

              <div className="experience-main">
                <div className="experience-compact-meta">
                  <p className="project-category">{item.company}</p>
                </div>

                <h3 className="mt-2 text-lg font-semibold tracking-tight text-[var(--foreground)] sm:text-[1.45rem]">
                  {item.role}
                </h3>
                <p className="experience-summary-line text-muted mt-2.5 max-w-3xl text-sm leading-7 sm:text-base">
                  {item.summary}
                </p>

                <a
                  href={item.link?.href || siteData.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="demo-link focus-ring mt-4 inline-flex rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.22em]"
                >
                  {siteData.experienceSection.moreCta}
                </a>
              </div>
            </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
