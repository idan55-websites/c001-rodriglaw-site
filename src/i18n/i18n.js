import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import fr from "./locales/fr.json";
import he from "./locales/he.json";
import nl from "./locales/nl.json";
import { getRouteInfo } from "../utils/siteRoutes";

function detectLang() {
  // The URL is authoritative, giving crawlers and visitors the same page language.
  return typeof window === 'undefined' ? 'he' : getRouteInfo(window.location.pathname).language;
}

const initialLang = detectLang();

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    he: { translation: he },
    nl: { translation: nl },
  },
  lng: initialLang,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

// set <html lang=""> and dir
function applyHtmlAttrs(lang) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
}

applyHtmlAttrs(initialLang);

i18n.on("languageChanged", (lng) => {
  applyHtmlAttrs(lng);
  try { localStorage.setItem("moria-language", lng); } catch { /* Storage is optional. */ }
});

export default i18n;
