import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const articles = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		category: z.enum(["ai-basics", "tools", "case-studies", "news"]),
		tags: z.array(z.string()).default([]),
		pubDate: z.coerce.date(),
		lastReviewed: z.coerce.date(),
		draft: z.boolean().default(false),
		seoTitle: z.string().optional(),
		seoKeywords: z.array(z.string()).default([]),
	}),
});

const projects = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		thumbnail: z.string().optional(),
		thumbnailAlt: z.string().default(""),
		client: z.string(),
		industry: z.string(),
		metric: z.string(),
		metricLabel: z.string(),
		tags: z.array(z.string()).default([]),
		pubDate: z.coerce.date(),
		featured: z.boolean().default(false),
		draft: z.boolean().default(false),
		seoTitle: z.string().optional(),
		seoKeywords: z.array(z.string()).default([]),
	}),
});

export const collections = { articles, projects };
