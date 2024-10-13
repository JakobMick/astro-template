function useIsCurrentPage(url: URL) {
	/**
	 * Check if the route is the current page.
	 *
	 * @param route
	 * @returns If the route is the current page
	 */
	return function isCurrenPage(route: string) {
		const pathname = url.pathname;

		if (decodeURI(pathname) == route || decodeURI(pathname) == route + "/")
			return true;
		else return false;
	};
}

function useAriaCurrentPage(url: URL) {
	/**
	 * Check if the route is the current page.
	 *
	 * @param route
	 * @returns "page" if the route is the current page and null if it is not
	 */
	return function getAriaCurrentPage(route: string) {
		const pathname = url.pathname;

		if (decodeURI(pathname) == route || decodeURI(pathname) == route + "/")
			return "page";
		else return null;
	};
}

/**
 * Get the a11y functions.
 *
 * @param url
 * @returns The a11y functions
 */
export function useA11y(url: URL) {
	return {
		isCurrentPage: useIsCurrentPage(url),
		getAriaCurrentPage: useAriaCurrentPage(url),
	};
}
