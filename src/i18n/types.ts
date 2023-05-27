import type germanTranslations from "@i18n/de";
import type germanNamespaces from "@i18n/de/namespaces";
import type englishTranslations from "@i18n/en";
import type englishNamespaces from "@i18n/en/namespaces";

export namespace I18n {
	export type Routes =
		| DotNestedKeys<(typeof germanTranslations)["routes"]>
		| DotNestedKeys<(typeof englishTranslations)["routes"]>;
	export type Links =
		| DotNestedKeys<(typeof germanTranslations)["links"]>
		| DotNestedKeys<(typeof englishTranslations)["links"]>;
	export type Titles =
		| DotNestedKeys<(typeof germanTranslations)["titles"]>
		| DotNestedKeys<(typeof englishTranslations)["titles"]>;
	export type Descriptions =
		| DotNestedKeys<(typeof germanTranslations)["descriptions"]>
		| DotNestedKeys<(typeof englishTranslations)["descriptions"]>;
	export type Translations =
		| DotNestedKeys<(typeof germanTranslations)["translations"]>
		| DotNestedKeys<(typeof englishTranslations)["translations"]>;
	export type Namespaces =
		| keyof typeof germanNamespaces
		| keyof typeof englishNamespaces;
	export type NamespaceTranslations =
		| DotNestedKeys<(typeof germanNamespaces)[keyof typeof germanNamespaces]>
		| DotNestedKeys<(typeof englishNamespaces)[keyof typeof englishNamespaces]>;
}

export type DotPrefix<T extends string> = T extends "" ? "" : `.${T}`;

export type DotNestedKeys<T> = (
	T extends object
		? {
				[K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<DotNestedKeys<T[K]>>}`;
		  }[Exclude<keyof T, symbol>]
		: ""
) extends infer D
	? Extract<D, string>
	: never;

export type DeepestKeys<T> = T extends string
	? never
	: {
			[K in keyof T & string]: T[K] extends string ? K : DeepestKeys<T[K]>;
	  }[keyof T & string];
