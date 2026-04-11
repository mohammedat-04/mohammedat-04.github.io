export const defaultLightTheme = "light";
export const defaultDarkTheme = "dark";

export const themeOptions = [
  { id: defaultLightTheme, shortLabel: "LT" },
  { id: "ivory", shortLabel: "IV" },
  { id: "slate", shortLabel: "SL" },
  { id: defaultDarkTheme, shortLabel: "DK" },
  { id: "graphite", shortLabel: "GR" },
  { id: "pine", shortLabel: "PN" }
];

export const themeAliases = {};

export const validThemes = themeOptions.map((option) => option.id);

export function normalizeTheme(theme) {
  if (!theme) {
    return null;
  }

  if (validThemes.includes(theme)) {
    return theme;
  }

  return themeAliases[theme] ?? null;
}

export function isDarkTheme(theme) {
  return [defaultDarkTheme, "graphite", "pine"].includes(theme);
}
