import { toString } from "mdast-util-to-string";

const WORDS_PER_MINUTE = 200;

function countWords(text) {
	const segmenter = new Intl.Segmenter("th", { granularity: "word" });
	const words = [...segmenter.segment(text)].filter((s) => s.isWordLike);
	return words.length;
}

export function remarkReadingTime() {
	return function (tree, { data }) {
		const text = toString(tree);
		const words = countWords(text);
		const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
		data.astro.frontmatter.minutesRead = minutes;
	};
}
