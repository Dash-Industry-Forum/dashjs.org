import { FaGithub, FaLinkedinIn, FaSlack, FaTwitter } from "react-icons/fa";
import { MdGroups } from "react-icons/md";

import meta from "../assets/meta.json";

export default function Social({ className = "" }) {
	return (
		<div
			className={`flex flex-row gap-4 text-xl text-neutral-500 dark:text-neutral-400 ${className}`}>
			<a
				className="inline-flex items-center transition-all duration-500 hover:brightness-125"
				target="_blank"
				rel="noreferrer"
				aria-label="Check us out on GitHub"
				href={meta.social.github}>
				<FaGithub />
			</a>
			<a
				className="inline-flex items-center transition-all duration-500 hover:brightness-125"
				target="_blank"
				rel="noreferrer"
				aria-label="Join our Slack community"
				href={meta.social.slack}>
				<FaSlack />
			</a>
			<a
				className="inline-flex items-center transition-all duration-500 hover:brightness-125"
				target="_blank"
				rel="noreferrer"
				aria-label="Follow us on Twitter"
				href={meta.social.twitter}>
				<FaTwitter />
			</a>
			<a
				className="inline-flex items-center transition-all duration-500 hover:brightness-125"
				target="_blank"
				rel="noreferrer"
				aria-label="Follow us on LinkedIn"
				href={meta.social.linkedin}>
				<FaLinkedinIn />
			</a>
			<a
				className="inline-flex items-center transition-all duration-500 hover:brightness-125"
				target="_blank"
				rel="noreferrer"
				aria-label="Join our Google Group"
				href={meta.social.google}>
				<MdGroups size={22} />
			</a>
		</div>
	);
}
