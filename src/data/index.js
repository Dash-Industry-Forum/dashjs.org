import puppeteer from "puppeteer";

import { githubCollector, npmCollector } from "./collectors";
import { GITHUB_ISSUES_URL, LIMIT } from "./constants";
import { nFormatter } from "./utils";

const crawl = async (type) => {
	const browser = await puppeteer.launch({
		defaultViewport: { width: 1920, height: 1080 },
		headless: "new",
	});
	const page = await browser.newPage();
	await page.setUserAgent(
		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
	);

	let url = null;
	if (type === Type.GitHub) url = GITHUB_ISSUES_URL;

	if (url) await page.goto(url, { waitUntil: "networkidle2" });

	let content = null;
	if (type === Type.GitHub) content = await githubCollector(page);
	else if (type === Type.NPM) content = await npmCollector(page);

	await browser.close();

	return content;
};

const fetchData = async () => {
	if (process.env.NODE_ENV === "development")
		return {
			npm: { downloads: "236.5k" },
			github: {
				stars: "4.5k",
				forks: "4.5k",
			},
			news: {
				github: [
					{
						type: "github",
						title: "issue",
						caption: "caption",
						alt: "alt",
					},
				],
			},
		};

	const [github, npm] = await Promise.all([
		crawl(Type.GitHub),
		crawl(Type.NPM),
	]);

	return {
		npm: {
			downloads: nFormatter(npm.downloads, 1),
		},
		github: github.stats,
		news: {
			github: github.issues.slice(0, LIMIT.github),
		},
	};
};

const Type = {
	GitHub: "github",
	NPM: "npm",
};

export default fetchData;
