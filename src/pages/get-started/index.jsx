import Head from "next/head";
import fetch from "node-fetch";

import { load } from "cheerio";

export default function Index({ title, description, html }) {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
			</Head>
			<div
				className="markdown-body container mx-auto max-w-7xl pt-8 md:pt-16"
				dangerouslySetInnerHTML={{ __html: html }}
			/>
		</>
	);
}

export async function getStaticProps() {
	const pages = [
		"https://github.com/dsilhavy/dashjs-jekyll-documentation/blob/master/pages/quickstart/installation.md",
		"https://github.com/dsilhavy/dashjs-jekyll-documentation/blob/master/pages/quickstart/setup.md",
	];
	const markdown = await Promise.all(
		pages.map(async (page) => {
			const response = await fetch(page);
			const payload = await response.json();
			const $ = load(payload.payload.blob.richText);
			$(".markdown-body table").first().remove();
			const content = $(".markdown-body").html();
			return content;
		})
	);
	const html = markdown.join("");

	return {
		props: {
			title: "Get Started",
			description: "Get Started with dash.js",
			content: true,
			html,
		},
	};
}
