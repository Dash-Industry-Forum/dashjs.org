import Head from "next/head";

import { createContext, useContext, useState } from "react";
import { FaGithub, FaRetweet, FaStar, FaTwitter } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { GoRepoForked } from "react-icons/go";
import { useMediaQuery } from "usehooks-ts";

import DashLogo from "../assets/dash.svg";
import { getContributors, getSponsors, getUsedBy } from "../assets/logo";
import meta from "../assets/meta.json";
import { Brands, Button, PlayerLogo } from "../components";
import fetchData from "../data";

const DataContext = createContext();

function GitHubStats() {
	const data = useContext(DataContext);
	return (
		<div
			className="mt-4 flex cursor-pointer flex-row divide-x-1 divide-neutral-200 rounded-3xl border-1 border-neutral-300 bg-neutral-100 text-sm font-medium text-neutral-700 shadow-md transition-all duration-500 hover:brightness-90 dark:divide-neutral-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:hover:brightness-125"
			onClick={() => window.open(meta.social.github)}>
			<span className="flex flex-row items-center p-3 pl-4">
				<FaGithub size={18} />
				<span className="ml-2 mr-1 block whitespace-nowrap sm:hidden">
					View on
				</span>
				<span className="flex flex-row sm:ml-2">GitHub</span>
			</span>
			<span className="flex flex-row items-center gap-2 p-3 pr-4">
				<div className="inline-flex items-center">
					<FaStar className="mr-1" /> {data.github.stars}
				</div>
				<div className="inline-flex items-center">
					<GoRepoForked className="mr-1" /> {data.github.forks}
				</div>
				<div className="hidden items-center xs:inline-flex">
					<FiDownload className="mr-1" /> {data.npm.downloads}
				</div>
			</span>
		</div>
	);
}

function Entry() {
	const [videoPlaying, setVideoPlaying] = useState(false);
	return (
		<section className="mx-auto mb-12 flex h-fit max-w-7xl select-none flex-col flex-wrap items-center justify-evenly px-4 pt-14 lg:flex-row lg:pt-16">
			<div className="flex w-full max-w-2xl justify-center max-lg:mb-8 xs:w-11/12 sm:w-9/12 md:w-2/3 lg:order-2 lg:w-5/12 lg:justify-end">
				<PlayerLogo videoPlayingCallback={(p) => setVideoPlaying(p)} />
			</div>
			<div className="flex flex-col items-center lg:items-start">
				<h1 className="flex flex-row items-center text-4xl font-semibold leading-normal sm:text-5xl sm:leading-tight lg:font-bold">
					{videoPlaying && <DashLogo className="mr-2 h-10" />}
					<span className="font-bold">dash</span>
					<span className="font-light">.js</span>
				</h1>
				<p className="whitespace-pre-line text-center text-3xl font-semibold text-black dark:text-white sm:text-4xl sm:font-bold lg:text-start lg:text-6xl">
					{"Open Source\nMedia Player"}
				</p>
				<p className="mt-2 whitespace-pre-line text-center font-medium text-neutral-500 dark:text-neutral-400 max-lg:max-w-lg sm:text-lg lg:text-start lg:text-2xl">
					{
						"Seamless and reliable DASH streaming\non any browser-based device"
					}
				</p>
				<GitHubStats />
				<div className="mt-4 flex flex-row flex-wrap gap-4 max-sm:justify-center">
					<Button primary href={meta.social.reference_player}>
						Try&nbsp;
						<span className="font-bold">dash</span>
						<span className="font-light">.js</span>
						&nbsp;now!
					</Button>
					<div className="flex gap-4">
						<Button
							className="hidden sm:block"
							href={meta.social.get_started}>
							Get Started
						</Button>
						<Button
							className="hidden sm:block"
							href={meta.social.github}>
							View on GitHub
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}

function NewsComponent({ type, title, caption, alt, retweet }) {
	return (
		<div
			className={`flex w-full flex-grow flex-row rounded-md border-l-8 bg-neutral-100 p-3 shadow-md dark:bg-dark-paper-100 sm:max-lg:w-9/12 ${
				type === "twitter"
					? "border-twitter dark:border-twitter-dark"
					: "border-github dark:border-github-dark"
			}`}>
			<span
				className={`self-center text-2xl ${
					type === "twitter"
						? "text-twitter dark:text-twitter-dark"
						: "text-github dark:text-github-dark"
				}`}>
				{type === "github" ? <FaGithub /> : <FaTwitter />}
			</span>
			<div className="ml-3 flex min-w-0 flex-col gap-1 text-sm text-slate-700 dark:text-slate-100 lg:justify-between">
				<span className="text-xs font-bold uppercase">{title}</span>
				<span className="text-md truncate-content">{caption}</span>
				<span className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 dark:text-gray-400">
					{retweet && <FaRetweet />}
					{alt}
				</span>
			</div>
		</div>
	);
}

function NewsFeed({ data, title, children }) {
	const isOneColumn = useMediaQuery("(max-width: 1024px)");
	return (
		<div className="mt-6 flex flex-1 flex-col max-w-2xl items-center lg:mt-0">
			<h2 className="mb-2 text-sm font-bold uppercase text-black dark:text-white lg:mb-4">
				{title}
			</h2>
			<div className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center gap-3 px-2 py-4 sm:items-center lg:flex-row lg:flex-wrap lg:items-stretch">
				{data.slice(0, isOneColumn ? 5 : data.length).map((data, i) => (
					<NewsComponent key={i} {...data} />
				))}
			</div>
			{children}
		</div>
	);
}

function News() {
	const data = useContext(DataContext);

	return (
		<section className="mb-12 flex w-full px-4 pt-12">
			<div className="mx-auto flex w-full max-w-7xl flex-col justify-center gap-6 lg:flex-row">
				<NewsFeed
					data={data.news.github}
					title="Latest updates from GitHub">
					<h2 className="mt-2 text-sm font-medium text-black dark:text-white">
						More news on
					</h2>
					<div className="mt-2 flex flex-row gap-4 lg:mt-6">
						<Button href="https://github.com/Dash-Industry-Forum/dash.js/issues">
							GitHub Issues
						</Button>
					</div>
				</NewsFeed>
			</div>
		</section>
	);
}

export default function Home({ data }) {
	return (
		<DataContext.Provider value={data}>
			<Head>
				<meta charSet="UTF-8" />
				<title>dash.js</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
			</Head>
			<main className="divide-y-1 divide-neutral-300 border-b-1 border-neutral-300 pb-12 transition-colors dark:divide-neutral-700 dark:border-neutral-700">
				<Entry />
				<Brands title="Sponsors" images={getSponsors()}>
					{/* <Button className="mt-2" href={meta.social.github}>
						Become a sponsor
					</Button> */}
				</Brands>
				<Brands
					title="Trusted by the industry leaders"
					images={getUsedBy()}
				/>
				<News />
				<Brands title="Contributors" images={getContributors()} />
			</main>
		</DataContext.Provider>
	);
}

export async function getStaticProps() {
	const data = await fetchData();
	return {
		props: {
			data,
		},
	};
}
