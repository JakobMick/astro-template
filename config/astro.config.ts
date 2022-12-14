import image from "@astrojs/image";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	site: process.env.npm_package_config_url,
	integrations: [
		tailwind({
			config: {
				path: "./config/tailwind.config.ts",
				applyBaseStyles: false,
			},
		}),
		image(),
		sitemap(),
	],
});
