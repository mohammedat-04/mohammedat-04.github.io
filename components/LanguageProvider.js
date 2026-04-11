"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  defaultLanguage,
  getSiteData,
  languageOptions,
  validLanguages
} from "@/components/siteData";

const LanguageContext = createContext({
  language: defaultLanguage,
  setLanguage: () => {},
  languageOptions,
  siteData: getSiteData(defaultLanguage)
});

function getCurrentLanguage() {
  if (typeof document === "undefined") {
    return defaultLanguage;
  }

  const lang = document.documentElement.dataset.language;

  if (lang && validLanguages.includes(lang)) {
    return lang;
  }

  return defaultLanguage;
}

export default function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(defaultLanguage);

  useEffect(() => {
    setLanguageState(getCurrentLanguage());
  }, []);

  function setLanguage(nextLanguage) {
    if (!validLanguages.includes(nextLanguage)) {
      return;
    }

    setLanguageState(nextLanguage);
    document.documentElement.dataset.language = nextLanguage;
    document.documentElement.lang = nextLanguage;
    localStorage.setItem("language", nextLanguage);
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        languageOptions,
        siteData: getSiteData(language)
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
