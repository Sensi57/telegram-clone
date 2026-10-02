import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { env } from "@/shared/config/env";
import ru from "./locales/ru.json";
import en from "./locales/en.json";
import kz from "./locales/kz.json";

export type Lang = "ru" | "en" | "kz";
export const LANGS: { code: Lang; label: string }[] = [
  { code: "ru", label: "Русский" },
  { code: "en", label: "English" },
  { code: "kz", label: "Қазақша" },
];

const saved = localStorage.getItem("lang") as Lang | null;

i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: ru },
    en: { translation: en },
    kz: { translation: kz },
  },
  lng: saved ?? env.defaultLang,
  fallbackLng: "ru",
  interpolation: { escapeValue: false },
});

i18n.on("languageChanged", (l) => {
  localStorage.setItem("lang", l);
  document.documentElement.lang = l;
});

export default i18n;
