import fetch from "node-fetch";

import { DOWNLOAD_COUNT_PERIOD, GITHUB_REPO, NPM_NAME } from "./constants";

export const githubCollector = async () => {
	const base = `https://api.github.com/repos/${GITHUB_REPO}`;
	const headers = {
		Accept: "application/vnd.github.v3+json",
		Authorization: `token ${process.env.GITHUB_TOKEN}`,
	};
	if (!process.env.GITHUB_TOKEN) throw new Error("GITHUB_TOKEN is not set");

	// Request issues
	const issuesRes = await fetch(`${base}/issues`, { headers });
	const issues = (await issuesRes.json()).map((issue) => {
		return {
			type: "github",
			title: issue.title,
			caption: issue.body,
			alt: `Opened by ${issue.user.login}`,
			url: issue.html_url,
			time: issue.created_at,
		};
	});

	// Request stats
	const statsRes = await fetch(base, { headers });
	const { forks_count: forkCount, stargazers_count: starCount } =
		await statsRes.json();

	return { issues, stats: { forks: forkCount, stars: starCount } };
};

export const npmCollector = async () => {
	const endpoint = `https://api.npmjs.org/downloads/point/${DOWNLOAD_COUNT_PERIOD}/${NPM_NAME}`;
	const res = await fetch(endpoint);
	return await res.json();
};
