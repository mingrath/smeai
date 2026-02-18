import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { remarkReadingTime } from "./plugins/remark-reading-time.mjs";

export default defineConfig({
	site: "https://smeai.pages.dev",
	integrations: [preact(), sitemap()],
	markdown: {
		remarkPlugins: [remarkReadingTime],
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
