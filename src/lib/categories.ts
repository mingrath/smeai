export const CATEGORIES = {
	"ai-basics": "พื้นฐาน AI",
	tools: "เครื่องมือ AI",
	"case-studies": "กรณีศึกษา",
	news: "ข่าวสาร AI",
} as const;

export type CategorySlug = keyof typeof CATEGORIES;

export function getCategoryName(slug: CategorySlug): string {
	return CATEGORIES[slug];
}
