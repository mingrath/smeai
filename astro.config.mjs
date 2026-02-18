import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { remarkReadingTime } from "./plugins/remark-reading-time.mjs";

export default defineConfig({
	site: "https://smeaithai.com",
	integrations: [preact(), sitemap(), pagefind()],
	markdown: {
		remarkPlugins: [remarkReadingTime],
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
