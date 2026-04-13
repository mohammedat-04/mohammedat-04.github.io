"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import {
  defaultDarkTheme,
  defaultLightTheme,
  normalizeTheme,
  themeOptions
} from "@/components/themeOptions";

export default function ThemeToggle() {
  const { siteData } = useLanguage();
  const [theme, setTheme] = useState(defaultLightTheme);

  useEffect(() => {
    try {
      const rootTheme = document.documentElement.dataset.theme;
      const storedTheme = window.localStorage.getItem("theme");
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const nextTheme =
        normalizeTheme(rootTheme || storedTheme) ||
        (systemPrefersDark ? defaultDarkTheme : defaultLightTheme);

      setTheme(nextTheme);
    } catch {
      setTheme(defaultLightTheme);
    }
  }, []);

  function handleChange(event) {
    const nextTheme = normalizeTheme(event.target.value) || defaultLightTheme;

    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;

    try {
      window.localStorage.setItem("theme", nextTheme);
    } catch {}
  }

  const themeCopy =
    siteData.themeControl.options[theme] ||
    siteData.themeControl.options[defaultLightTheme];

  return (
    <div
      className="theme-toggle theme-toggle-select inline-flex items-center gap-3 rounded-full px-3 py-2 text-sm font-medium"
      aria-label={siteData.themeControl.chooseLabel}
      title={siteData.themeControl.chooseLabel}
    >
      <span
        aria-hidden="true"
        className="theme-swatch theme-swatch-large"
        suppressHydrationWarning
        data-theme-swatch
        data-theme-preview={theme}
      />
      <span aria-hidden="true" className="theme-prefix hidden sm:inline">
        {siteData.themeControl.buttonPrefix}
      </span>
      <span
        aria-hidden="true"
        className="theme-current-label"
        suppressHydrationWarning
      >
        {themeCopy.label}
      </span>
      <span aria-hidden="true" className="theme-select-caret">
        ▾
      </span>
      <select
        suppressHydrationWarning
        data-theme-select
        className="theme-select"
        aria-label={siteData.themeControl.chooseLabel}
        value={theme}
        onChange={handleChange}
      >
        {themeOptions.map((option) => {
          const optionCopy = siteData.themeControl.options[option.id];

          return (
            <option key={option.id} value={option.id}>
              {optionCopy.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
