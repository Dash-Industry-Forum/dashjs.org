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
