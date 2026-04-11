"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { defaultLightTheme, themeOptions } from "@/components/themeOptions";

export default function ThemeToggle() {
  const { siteData } = useLanguage();

  return (
    <label
      className="theme-toggle theme-toggle-select inline-flex items-center gap-3 rounded-full px-3 py-2 text-sm font-medium"
      aria-label={siteData.themeControl.chooseLabel}
      title={siteData.themeControl.chooseLabel}
    >
      <span
        aria-hidden="true"
        className="theme-swatch theme-swatch-large"
        data-theme-swatch
        data-theme-preview={defaultLightTheme}
      />
      <span className="hidden sm:inline">{siteData.themeControl.buttonPrefix}</span>
      <div className="theme-select-wrap">
        <select
          defaultValue={defaultLightTheme}
          data-theme-select
          className="theme-select"
          aria-label={siteData.themeControl.chooseLabel}
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
        <span aria-hidden="true" className="theme-select-caret">
          ▾
        </span>
      </div>
    </label>
  );
}
