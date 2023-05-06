import namespace from "./namespace";

const germanNamespaces = {
	namespace,
} as const;

type GermanNamespaces =
	| keyof typeof namespace;

export { germanNamespaces, type GermanNamespaces };
