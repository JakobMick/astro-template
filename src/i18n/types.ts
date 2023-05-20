import type germanTranslations from "@i18n/de";
import type germanNamespaces from "@i18n/de/namespaces";
import type englishTranslations from "@i18n/en";
import type englishNamespaces from "@i18n/en/namespaces";

export namespace I18n {
	export type Namespaces =
		| keyof typeof germanNamespaces
		| keyof typeof englishNamespaces;
	export type Descriptions =
		| keyof typeof germanTranslations.descriptions
		| keyof typeof englishTranslations.descriptions;
	export type Links = keyof typeof germanTranslations.links | keyof typeof englishTranslations.links;
	export type Routes = keyof typeof germanTranslations.routes | keyof typeof englishTranslations.routes;
	export type Titles = keyof typeof germanTranslations.titles | keyof typeof englishTranslations.titles;
	export type Translations =
		| keyof typeof germanTranslations.translations
		| keyof typeof englishTranslations.translations;
}

export type DeepestKeys<T> = T extends string
	? never
	: {
			[K in keyof T & string]: T[K] extends string ? K : DeepestKeys<T[K]>;
	  }[keyof T & string];
