import german from "@i18n/de";
import germanNamespaces from "@i18n/de/namespaces";
import english from "@i18n/en";
import englishNamespaces from "@i18n/en/namespaces";

export const defaultLanguage: keyof typeof languages = "de";

export const languages = {
	de: german,
	en: english,
} as const;

export const namespaces = {
	de: germanNamespaces,
	en: englishNamespaces,
} as const;
