import type german from "@i18n/de";
import type { GermanNamespaces, germanNamespaces } from "@i18n/de/namespaces";
import type english from "@i18n/en";
import type { EnglishNamespaces, englishNamespaces } from "@i18n/en/namespaces";

export namespace I18n {
	export type Namespaces =
		| keyof typeof germanNamespaces
		| keyof typeof englishNamespaces;
	export type Descriptions =
		| keyof typeof german.descriptions
		| keyof typeof english.descriptions;
	export type Links = keyof typeof german.links | keyof typeof english.links;
	export type Routes = keyof typeof german.routes | keyof typeof english.routes;
	export type Titles = keyof typeof german.titles | keyof typeof english.titles;
	export type Translations =
		| keyof typeof german.translations
		| keyof typeof english.translations;
	export type NamespaceTranslations = GermanNamespaces | EnglishNamespaces;
}
