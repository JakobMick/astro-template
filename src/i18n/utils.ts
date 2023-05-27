import { defaultLanguage, namespaces, translations } from "@i18n/config";
import type { I18n } from "@i18n/types";

function useTranslations(lang: keyof typeof translations) {
	/**
	 * Get the translated string from the specified key.
	 *
	 * @param key
	 * @returns The translated string
	 */
	return function t(key: I18n.Translations) {
		return getValue(translations[lang].translations, key);
	};
}

function useNamespaces(
	lang: keyof typeof translations,
	namespace?: I18n.Namespaces
) {
	/**
	 * Get the translated string from the specified key from the specified namespace.
	 *
	 * @param key
	 * @returns The translated string
	 */
	return function n(
		key: I18n.NamespaceTranslations,
		useNamespace?: I18n.Namespaces
	) {
		if (useNamespace !== undefined) {
			return getValue(namespaces[lang][useNamespace], key);
		} else if (namespace !== undefined) {
			return getValue(namespaces[lang][namespace], key);
		}

		throw Error("You must specify a namespace to use the n function.");
	};
}

function useLinks(lang: keyof typeof translations) {
	/**
	 * Get the translated link from the specified key.
	 *
	 * @param key
	 * @returns The translated link
	 */
	return function links(key: I18n.Links) {
		return getValue(translations[lang].links, key);
	};
}

function useRoutes(lang: keyof typeof translations) {
	/**
	 * Get the translated route from the specified key.
	 *
	 * @param key
	 * @returns The translated route
	 */
	return function routes(key: I18n.Routes) {
		return getValue(translations[lang].routes, key);
	};
}

function useTitles(lang: keyof typeof translations) {
	/**
	 * Get the translated title from the specified key.
	 *
	 * @param key
	 * @returns The translated title
	 */
	return function titles(key: I18n.Titles) {
		return getValue(translations[lang].titles, key);
	};
}

function useDescriptions(lang: keyof typeof translations) {
	/**
	 * Get the translated description from the specified key.
	 *
	 * @param key
	 * @returns The translated description
	 */
	return function descriptions(key: I18n.Descriptions) {
		return getValue(translations[lang].descriptions, key);
	};
}

function useSwitchRoute(lang: keyof typeof translations) {
	/**
	 * Switch the route to the next language or to the specified language.
	 *
	 * @param url
	 * @param language
	 * @returns The translated route
	 */
	return function switchRoute(
		route?: I18n.Routes,
		language?: keyof typeof translations
	) {
		if (route === undefined) {
			route = "index";
		}

		if (language !== undefined) {
			return {
				switchedRoute: getValue(translations[language].routes, route),
				switchedLanguage: language,
			};
		}

		const languageKeys = Object.keys(translations) as Array<
			keyof typeof translations
		>;
		const nextIndex = languageKeys.indexOf(lang) + 1;
		const nextLanguage =
			languageKeys[nextIndex >= languageKeys.length ? 0 : nextIndex];

		return {
			switchedRoute: getValue(translations[nextLanguage].routes, route),
			switchedLanguage: nextLanguage,
		};
	};
}

/**
 * Get the value from an object with a key. Checks for nested objects and dot notation keys.
 *
 * @param object
 * @param key
 * @returns The value
 */
function getValue(object: object, key: string): string {
	const value = object[key as keyof typeof object];

	if (value) return value;

	const valueFromNestedObject = key
		.split(".")
		.reduce(
			(accumulator: object, currentValue: string) =>
				accumulator[currentValue as keyof typeof accumulator],
			object
		);

	return valueFromNestedObject as unknown as string;
}

/**
 * Get the language code from the specified url.
 *
 * @param url
 * @returns The language code
 */
function getLangFromUrl(url: URL) {
	if (url.pathname != undefined) {
		const [, lang] = url.pathname.split("/");

		if (lang in translations) return lang as keyof typeof translations;
	}

	return defaultLanguage;
}

/**
 * Get the i18n functions.
 *
 * @param url
 * @returns The i18n functions
 */
export function useI18n(url: URL, namespace?: I18n.Namespaces) {
	const lang = getLangFromUrl(url);

	return {
		t: useTranslations(lang),
		n: useNamespaces(lang, namespace),
		links: useLinks(lang),
		routes: useRoutes(lang),
		titles: useTitles(lang),
		descriptions: useDescriptions(lang),
		switchRoute: useSwitchRoute(lang),
		lang: lang,
	};
}
