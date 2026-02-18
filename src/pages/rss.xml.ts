import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
	const articles = await getCollection("articles", ({ data }) => !data.draft);

	return rss({
		title: "SMEAI - AI สำหรับ SME ไทย",
		description:
			"บทความและคำแนะนำเกี่ยวกับการใช้ AI ในธุรกิจ SME ไทย",
		site: context.site!,
		items: articles
			.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
			.map((article) => {
				const slug = article.id.split("/").pop()!;
				return {
					title: article.data.title,
					pubDate: article.data.pubDate,
					description: article.data.description,
					link: `/articles/${slug}/`,
				};
			}),
		customData: "<language>th</language>",
	});
}
