import Social from "./Social";

export default function Footer() {
	return (
		<footer className="flex flex-col items-center justify-center gap-4 bg-paper py-6 text-center text-neutral-500 dark:bg-dark-paper dark:text-neutral-400">
			<Social />
			Copyright &#169; 2012-present
		</footer>
	);
}
