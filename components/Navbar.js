"use client";

import Image from "next/image";
import { withBasePath } from "@/components/assetPath";
import { motion } from "framer-motion";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/components/LanguageProvider";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const { siteData } = useLanguage();

  return (
    <motion.header
      className="sticky top-4 z-50 px-4 sm:px-6 lg:px-8"
      initial={false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <nav
        aria-label="Primary"
        className="nav-shell mx-auto flex w-full max-w-7xl items-center justify-between gap-3 rounded-[1.75rem] px-4 py-3 sm:px-5"
      >
        <a
          href="#home"
          className="brand-mark focus-ring inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.24em] sm:text-base"
        >
          <Image
            src={withBasePath("/brand-icon.svg")}
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 rounded-[0.8rem]"
            priority
          />
          {siteData.name}
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="status-pill hidden rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] lg:inline-flex">
            {siteData.navStatus}
          </span>

          <div className="nav-links no-scrollbar flex max-w-[58vw] items-center gap-1 overflow-x-auto rounded-full p-1 text-sm">
            {siteData.navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link focus-ring whitespace-nowrap rounded-full px-4 py-2"
              >
                {item.label}
              </a>
            ))}
          </div>

          <LanguageToggle />
          <ThemeToggle />
        </div>
      </nav>
    </motion.header>
  );
}
