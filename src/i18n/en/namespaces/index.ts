import namespace from "./namespace";

const englishNamespaces = {
	namespace,
} as const;

type EnglishNamespaces =
	| keyof typeof namespace;

export { englishNamespaces, type EnglishNamespaces };
