import germanTranslations from "@i18n/de";
import germanNamespaces from "@i18n/de/namespaces";
import englishTranslations from "@i18n/en";
import englishNamespaces from "@i18n/en/namespaces";

export const defaultLanguage:
  | keyof typeof translations
  | keyof typeof namespaces = "de";

export const translations = {
  de: germanTranslations,
  en: englishTranslations,
} as const;

export const namespaces = {
  de: germanNamespaces,
  en: englishNamespaces,
} as const;
