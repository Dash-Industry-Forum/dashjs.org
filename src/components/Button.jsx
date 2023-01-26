import Link from "next/link";

export default function Button({ primary, children, className = "", href }) {
	if (primary)
		return (
			<Link
				href={href}
				className={`cursor-pointer rounded-3xl border-1 border-sky-700 bg-dash-blue px-4 py-2 text-sm font-medium text-white transition-all duration-500 hover:brightness-90 dark:border-sky-600 dark:bg-sky-700 dark:hover:brightness-125 ${className}`}>
				{children}
			</Link>
		);
	else
		return (
			<Link
				href={href}
				className={`${className} cursor-pointer rounded-3xl border-1 border-neutral-300 bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700 transition-all duration-500 hover:brightness-90 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:hover:brightness-125`}>
				{children}
			</Link>
		);
}
