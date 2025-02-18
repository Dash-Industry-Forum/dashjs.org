import { githubCollector, npmCollector } from "./collectors";
import { LIMIT } from "./constants";
import { nFormatter } from "./utils";

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
		githubCollector(),
		npmCollector(),
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
