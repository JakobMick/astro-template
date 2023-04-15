import { defaultLanguage, languages } from "@i18n/config";
import type { I18n } from "@i18n/types";

function useTranslations(lang: keyof typeof languages) {
	/**
	 * Get the translated string from the specified key.
	 *
	 * @param key
	 * @returns The translated string
	 */
	return function t(key: I18n.Translations) {
		return languages[lang].translations[key];
	};
}

function useLinks(lang: keyof typeof languages) {
	/**
	 * Get the translated link from the specified key.
	 *
	 * @param key
	 * @returns The translated link
	 */
	return function links(key: I18n.Links) {
		return languages[lang].links[key];
	};
}

function useRoutes(lang: keyof typeof languages) {
	/**
	 * Get the translated route from the specified key.
	 *
	 * @param key
	 * @returns The translated route
	 */
	return function routes(key: I18n.Routes) {
		return languages[lang].routes[key];
	};
}

function useTitles(lang: keyof typeof languages) {
	/**
	 * Get the translated title from the specified key.
	 *
	 * @param key
	 * @returns The translated title
	 */
	return function titles(key: I18n.Titles) {
		return languages[lang].titles[key];
	};
}

function useDescriptions(lang: keyof typeof languages) {
	/**
	 * Get the translated description from the specified key.
	 *
	 * @param key
	 * @returns The translated description
	 */
	return function descriptions(key: I18n.Descriptions) {
		return languages[lang].descriptions[key];
	};
}

function useSwitchRoute(lang: keyof typeof languages) {
	/**
	 * Switch the route to the next language or to the specified language.
	 *
	 * @param url
	 * @param language
	 * @returns The translated route
	 */
	return function switchRoute(
		route?: I18n.Routes,
		language?: keyof typeof languages
	) {
		if (route === undefined) {
			route = "index";
		}

		if (language !== undefined) {
			return { route: languages[language].routes[route], language: language };
		}

		const languageKeys = Object.keys(languages) as Array<keyof typeof languages>;
		const nextIndex = languageKeys.indexOf(lang) + 1;
		const nextLanguage =
			languageKeys[nextIndex >= languageKeys.length ? 0 : nextIndex];

		return {
			switchedRoute: languages[nextLanguage].routes[route],
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

		if (lang in languages) return lang as keyof typeof languages;
	}

	return defaultLanguage;
}

/**
 * Get the i18n functions.
 *
 * @param url
 * @returns The i18n functions
 */
export function useI18n(url: URL) {
	const lang = getLangFromUrl(url);

	return {
		t: useTranslations(lang),
		links: useLinks(lang),
		routes: useRoutes(lang),
		titles: useTitles(lang),
		descriptions: useDescriptions(lang),
		switchRoute: useSwitchRoute(lang),
		lang: lang,
	};
}
