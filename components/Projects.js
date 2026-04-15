"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

function getYouTubeEmbedUrl(source) {
  if (!source) {
    return "";
  }

  try {
    const url = new URL(source);
    const hostname = url.hostname.toLowerCase();

    if (hostname === "youtu.be") {
      const videoId = url.pathname.split("/").filter(Boolean)[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0` : "";
    }

    if (!hostname.endsWith("youtube.com")) {
      return "";
    }

    const pathSegments = url.pathname.split("/").filter(Boolean);
    const videoId =
      url.searchParams.get("v") ||
      (pathSegments[0] === "embed" ? pathSegments[1] : "") ||
      (pathSegments[0] === "shorts" ? pathSegments[1] : "") ||
      (pathSegments[0] === "live" ? pathSegments[1] : "");

    return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0` : "";
  } catch {
    return "";
  }
}

export default function Projects() {
  const reduceMotion = useReducedMotion();
  const { siteData } = useLanguage();

  return (
    <section id="projects" className="space-y-5">
      <div className="section-shell px-6 py-8 sm:px-10 sm:py-10">
        <p className="section-tag">{siteData.projectsSection.eyebrow}</p>
        <h2 className="section-title mt-4">{siteData.projectsSection.title}</h2>
        <p className="section-copy mt-5 max-w-3xl">
          {siteData.projectsSection.description}
        </p>
      </div>

      <div className="space-y-4">
        {siteData.projects.map((project, index) => {
          const demoSrc = project.demo?.src?.trim() || "";
          const demoPoster = project.demo?.poster?.trim() || "";
          const demoEmbedUrl = getYouTubeEmbedUrl(demoSrc);

          return (
            <motion.article
              key={project.title}
              className="project-card"
              data-cursor="card"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: reduceMotion ? 0 : 0.55,
                delay: reduceMotion ? 0 : index * 0.08,
                ease: "easeOut"
              }}
              whileHover={reduceMotion ? undefined : { y: -6 }}
            >
              <div className="project-layout">
                <div>
                  <p className="project-category">{project.category}</p>
                  <h3 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-[2rem]">
                    {project.title}
                  </h3>
                  <p className="text-muted mt-4 max-w-2xl text-sm leading-7 sm:text-base">
                    {project.summary}
                  </p>

                  <ul className="project-list">
                    {project.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span key={item} className="stack-chip">
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="demo-shell mt-8">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <p className="fact-label">{siteData.projectsSection.demoLabel}</p>
                      {demoSrc ? (
                        <a
                          href={demoSrc}
                          target="_blank"
                          rel="noreferrer"
                          className="demo-link focus-ring rounded-full px-3 py-2 text-xs font-medium uppercase tracking-[0.22em]"
                        >
                          {siteData.projectsSection.openVideo}
                        </a>
                      ) : null}
                    </div>

                    {demoSrc ? (
                      demoEmbedUrl ? (
                        <iframe
                          className="project-video"
                          data-cursor="media"
                          src={demoEmbedUrl}
                          title={`${project.title} demo video`}
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        />
                      ) : (
                        <video
                          className="project-video"
                          data-cursor="media"
                          controls
                          playsInline
                          preload="metadata"
                          poster={demoPoster || undefined}
                        >
                          <source src={demoSrc} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )
                    ) : (
                      <div className="video-placeholder">
                        <p className="text-sm font-medium text-[var(--foreground)]">
                          {siteData.projectsSection.noDemoTitle}
                        </p>
                        <p className="text-muted mt-2 text-sm leading-6">
                          {project.demo?.caption || siteData.projectsSection.noDemoFallback}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className={`project-aside ${index % 2 === 1 ? "tilt-card-reverse" : "tilt-card"}`}>
                  <span className="project-number">{project.id}</span>
                  <div className="space-y-2">
                    <p className="fact-label">{siteData.projectsSection.asideLabel}</p>
                    <p className="text-muted text-sm leading-6">
                      {siteData.projectsSection.asideDescription}
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
