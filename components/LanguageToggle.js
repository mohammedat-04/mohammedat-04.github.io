"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

export default function LanguageToggle() {
  const menuRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, languageOptions, siteData } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    function handlePointerDown(event) {
      if (!menuRef.current?.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  const activeOption = languageOptions.find((option) => option.id === language) ?? languageOptions[0];
  const buttonLabel = mounted
    ? `${siteData.languageControl.buttonPrefix}: ${activeOption.label}`
    : siteData.languageControl.chooseLabel;

  return (
    <div ref={menuRef} className="theme-picker">
      <button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        className="theme-toggle focus-ring inline-flex items-center gap-3 rounded-full px-3 py-2 text-sm font-medium"
        aria-expanded={menuOpen}
        aria-haspopup="menu"
        aria-label={buttonLabel}
        title={buttonLabel}
      >
        <span aria-hidden="true" className="control-code">
          {activeOption.shortLabel}
        </span>
        <span className="hidden sm:inline">
          {mounted ? activeOption.label : siteData.languageControl.buttonPrefix}
        </span>
        <span aria-hidden="true" className="text-xs leading-none">
          ▾
        </span>
      </button>

      {menuOpen ? (
        <div className="theme-menu" role="menu" aria-label={siteData.languageControl.chooseLabel}>
          {languageOptions.map((option) => {
            const selected = option.id === language;

            return (
              <button
                key={option.id}
                type="button"
                role="menuitemradio"
                aria-checked={selected}
                onClick={() => {
                  setLanguage(option.id);
                  setMenuOpen(false);
                }}
                className={`theme-menu-item ${selected ? "theme-menu-item-active" : ""}`}
              >
                <span aria-hidden="true" className="control-code control-code-large">
                  {option.shortLabel}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-[var(--foreground)]">
                    {option.label}
                  </span>
                  <span className="block text-xs text-[var(--muted)]">
                    {siteData.languageControl.descriptions[option.id]}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
