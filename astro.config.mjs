import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import preact from '@astrojs/preact';

export default defineConfig({
	site: 'https://smeai.pages.dev',
	integrations: [preact()],
	vite: {
		plugins: [tailwindcss()],
	},
});
