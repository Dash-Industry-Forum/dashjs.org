import fetch from "node-fetch";

import { DOWNLOAD_COUNT_PERIOD, NPM_NAME } from "./constants";

export const githubCollector = async (page) => {
	await page.waitForSelector("div.js-navigation-container > div");
	const issueDivs = await page.$$("pierce/div.js-navigation-container > div");

	const forkCount = await page.$eval(
		"#repo-network-counter",
		(a) => a.innerText
	);

	const starCount = await page.$eval(
		"#repo-stars-counter-star",
		(a) => a.innerText
	);

	const issues = await Promise.all(
		issueDivs.map(async (issueDiv) => {
			const caption = await issueDiv.$eval(
				".markdown-title",
				(a) => a.innerText
			);
			const alt = await issueDiv.$eval(".opened-by", (a) => a.innerText);
			const timeRelative = await issueDiv.$eval(
				".opened-by relative-time",
				(a) => a.shadowRoot.innerHTML
			);
			const time = await issueDiv.$eval(
				".opened-by relative-time",
				(a) => a.attributes.datetime.value
			);

			const combined = [
				alt.substring(0, alt.indexOf("  ")),
				timeRelative,
				alt.substring(alt.indexOf("  ") + 2, alt.length),
			].join(" ");

			return {
				type: "github",
				title: "issue",
				caption,
				alt: combined,
				time,
			};
		})
	);

	return { issues, stats: { forks: forkCount, stars: starCount } };
};

export const twitterCollector = async (page) => {
	await page.waitForSelector("article");
	const tweetDivs = await page.$$("article");

	const tweets = await Promise.all(
		tweetDivs.map(async (tweetDiv) => {
			const caption = await tweetDiv.$eval(
				"div[data-testid='tweetText']",
				(a) => a.textContent
			);
			const alt = await tweetDiv.$eval(
				"div[data-testid='User-Name']",
				(a) => a.innerText
			);
			const time = await tweetDiv.$eval(
				"time",
				(a) => a.attributes.datetime.value
			);

			const retweet =
				(await tweetDiv.$("span[data-testid='socialContext']")) !==
				null;

			return {
				type: "twitter",
				title: "feed",
				caption,
				alt,
				time,
				...(retweet && { retweet: true }),
			};
		})
	);
	return tweets;
};

export const npmCollector = async () => {
	const endpoint = `https://api.npmjs.org/downloads/point/${DOWNLOAD_COUNT_PERIOD}/${NPM_NAME}`;
	const res = await fetch(endpoint);
	return await res.json();
};
