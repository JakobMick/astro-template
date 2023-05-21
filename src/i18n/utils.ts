import { defaultLanguage, namespaces, translations } from "@i18n/config";
import type { DeepestKeys, I18n } from "@i18n/types";

function useTranslations(lang: keyof typeof translations) {
	/**
	 * Get the translated string from the specified key.
	 *
	 * @param key
	 * @returns The translated string
	 */
	return function t(key: I18n.Translations) {
		return translations[lang].translations[key];
	};
}

function useNamespaces<
	Lang extends keyof typeof translations,
	Namespace extends keyof (typeof namespaces)[keyof typeof translations]
>(lang: Lang, namespace?: Namespace) {
	/**
	 * Get the translated string from the specified key from the specified namespace.
	 *
	 * @param key
	 * @returns The translated string
	 */
	return function n<
		Namespace extends keyof (typeof namespaces)[keyof typeof translations],
		Key extends DeepestKeys<(typeof namespaces)[typeof lang][Namespace]>
	>(key: Key, useNamespace?: Namespace) {
		if (useNamespace !== undefined) {
			const ns = namespaces[lang][useNamespace];
			const returnValue = ns[key as keyof typeof ns];
			return returnValue;
		} else if (namespace !== undefined) {
			const ns = namespaces[lang][namespace];
			const returnValue = ns[key as keyof typeof ns];
			return returnValue;
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
		return translations[lang].links[key];
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
		return translations[lang].routes[key];
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
		return translations[lang].titles[key];
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
		return translations[lang].descriptions[key];
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
				switchedRoute: translations[language].routes[route], 
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
			switchedRoute: translations[nextLanguage].routes[route],
			switchedLanguage: nextLanguage,
		};
	};
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
