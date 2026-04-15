import { Fraunces, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import LanguageProvider from "@/components/LanguageProvider";
import {
  initialTheme,
  themeAliases,
  validThemes
} from "@/components/themeOptions";
import {
  defaultLanguage,
  validLanguages
} from "@/components/siteData";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans"
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display"
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono"
});

export const metadata = {
  title: "Atef Helali | Portfolio",
  description:
    "Portfolio website for Atef Helali, focused on software, robotics, machine learning, and embedded systems.",
  icons: {
    icon: "/brand-icon.svg",
    shortcut: "/brand-icon.svg"
  }
};

const themeScript = `
  (function () {
    try {
      var validThemes = ${JSON.stringify(validThemes)};
      var themeAliases = ${JSON.stringify(themeAliases)};
      var validLanguages = ${JSON.stringify(validLanguages)};
      var storedTheme = localStorage.getItem("theme");
      var storedLanguage = localStorage.getItem("language");
      var normalizedTheme =
        validThemes.indexOf(storedTheme) !== -1
          ? storedTheme
          : themeAliases[storedTheme] || null;
      var theme =
        normalizedTheme
          ? normalizedTheme
          : "${initialTheme}";
      var language =
        validLanguages.indexOf(storedLanguage) !== -1
          ? storedLanguage
          : "${defaultLanguage}";

      function syncThemeControls(nextTheme) {
        var themeSelects = document.querySelectorAll("[data-theme-select]");
        var themeSwatches = document.querySelectorAll("[data-theme-swatch]");

        for (var i = 0; i < themeSelects.length; i += 1) {
          themeSelects[i].value = nextTheme;
        }

        for (var j = 0; j < themeSwatches.length; j += 1) {
          themeSwatches[j].setAttribute("data-theme-preview", nextTheme);
        }
      }

      function setTheme(nextTheme, persist) {
        document.documentElement.dataset.theme = nextTheme;

        if (persist) {
          localStorage.setItem("theme", nextTheme);
        }

        syncThemeControls(nextTheme);
      }

      setTheme(theme, false);
      document.documentElement.dataset.language = language;
      document.documentElement.lang = language;

      document.addEventListener("change", function (event) {
        var target = event.target;

        if (!target || !target.matches || !target.matches("[data-theme-select]")) {
          return;
        }

        var nextTheme =
          validThemes.indexOf(target.value) !== -1
            ? target.value
            : themeAliases[target.value] || null;

        if (nextTheme) {
          setTheme(nextTheme, true);
        }
      });

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", function () {
          syncThemeControls(document.documentElement.dataset.theme);
        }, { once: true });
      } else {
        syncThemeControls(document.documentElement.dataset.theme);
      }
    } catch (error) {
      document.documentElement.dataset.theme = "${initialTheme}";
      document.documentElement.dataset.language = "${defaultLanguage}";
      document.documentElement.lang = "${defaultLanguage}";
    }
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html
      lang={defaultLanguage}
      data-theme={initialTheme}
      className="scroll-smooth"
      suppressHydrationWarning
    >
      <head>
        <Script id="theme-script" strategy="beforeInteractive">
          {themeScript}
        </Script>
      </head>
      <body
        className={`${spaceGrotesk.variable} ${fraunces.variable} ${jetBrainsMono.variable} antialiased`}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
