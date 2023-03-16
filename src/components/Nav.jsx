import { useTheme } from "next-themes";
import Link from "next/link";

import { Fade as Hamburger } from "hamburger-react";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { CiDark, CiLight } from "react-icons/ci";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { MdOutlineCircle } from "react-icons/md";
import { useMediaQuery } from "usehooks-ts";

import { Social } from ".";
import meta from "../assets/meta.json";

function MenuItem({ children, link, dropdown }) {
	const [open, setopen] = useState(false);

	if (!dropdown)
		return (
			<Link
				href={link}
				className="inline-flex w-full max-w-xs cursor-pointer items-center gap-2 border-b-1 border-neutral-200 py-3 text-sm leading-6 transition-all duration-200 dark:border-neutral-700 md:rounded-lg md:border-none md:py-2 md:px-3 md:hover:bg-neutral-200 md:hover:text-sky-600 md:dark:hover:bg-neutral-800">
				{children}
				{link.includes("//") && (
					<FaExternalLinkAlt
						size={9}
						className="fill-neutral-400 dark:fill-neutral-600"
					/>
				)}
			</Link>
		);
	else
		return (
			<div
				className="w-full max-w-xs cursor-pointer border-b-1 border-neutral-200 py-3 text-sm leading-6 dark:border-neutral-700"
				onClick={() => setopen((s) => !s)}>
				<div className="flex flex-row items-center justify-between pr-2">
					<span className={open ? "text-sky-600" : ""}>
						{children}
					</span>
					<div
						className={`transition-transform ${
							open ? "rotate-45" : "rotate-0"
						}`}>
						<AiOutlinePlus />
					</div>
				</div>
				{open && (
					<div className="flex flex-col">
						{Object.keys(dropdown).map((item, index) => (
							<Link
								key={index}
								href={dropdown[item].link}
								className="inline-flex items-center gap-2 pl-3 text-sm leading-8 first:mt-2 ">
								{item}
								{dropdown[item].link.includes("//") && (
									<FaExternalLinkAlt
										size={9}
										className="fill-neutral-400 dark:fill-neutral-600"
									/>
								)}
							</Link>
						))}
					</div>
				)}
			</div>
		);
}

function Dropdown({ children, className = "" }) {
	return (
		<div
			className={`invisible absolute right-0 top-12 z-10 float-left flex min-w-max flex-col rounded-xl border-1 border-neutral-700 bg-paper p-3 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100 dark:bg-dark-paper lg:top-14 ${className}`}>
			{children}
		</div>
	);
}

function MenuItemSmall({ children, link, dropdown }) {
	if (!dropdown)
		return (
			<Link
				className="inline-flex cursor-pointer items-center gap-1 text-sm font-medium transition-all duration-200 hover:text-sky-600"
				aria-label={"Link to " + children}
				href={link}>
				{children}
			</Link>
		);
	else
		return (
			<div className="group relative inline-flex text-sm font-medium">
				<div className="inline-flex cursor-pointer items-center gap-1 transition-all duration-200 group-hover:brightness-50">
					{children}
					<FiChevronDown />
				</div>
				<Dropdown>
					{Object.keys(dropdown).map((item, index) => (
						<MenuItem key={index} link={dropdown[item].link}>
							{item}
						</MenuItem>
					))}
				</Dropdown>
			</div>
		);
}

function Appearance({ className = "", minimal }) {
	const [mounted, setMounted] = useState(false);
	const { resolvedTheme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted)
		return (
			<div
				className={`mt-6 flex w-full max-w-xs animate-pulse cursor-pointer flex-row items-center justify-between rounded-md bg-[#0000000D] py-3 px-4 text-xs dark:bg-[#FFFFFF0D] ${className}`}>
				<div className="rounded-full border-1 border-neutral-600 p-1 text-neutral-600 dark:border-neutral-400">
					<MdOutlineCircle />
				</div>
			</div>
		);

	return (
		<div
			className={`flex w-full max-w-xs cursor-pointer flex-row items-center justify-between rounded-md bg-[#0000000D] max-lg:py-3 max-lg:px-4 max-md:mt-6 text-xs dark:bg-[#FFFFFF0D] ${className}`}
			onClick={() =>
				setTheme(resolvedTheme == "dark" ? "light" : "dark")
			}>
			<span hidden={minimal}>Appearance</span>
			<div className="rounded-full border-1 border-neutral-600 p-1 dark:border-neutral-400">
				{resolvedTheme == "dark" ? <CiDark /> : <CiLight />}
			</div>
		</div>
	);
}

export default function Nav() {
	const [open, setopen] = useState(false);
	const mobile = useMediaQuery("(max-width: 640px)");
	const { resolvedTheme } = useTheme();
	const [color, setColor] = useState("#000");

	useEffect(() => {
		window.scrollTo(0, 0, "smooth");
		document.body.style.overflow = open ? "hidden" : "auto";
		return () => {};
	}, [open]);

	useEffect(() => {
		if (!mobile) setopen(false);
		return () => {};
	}, [mobile]);

	useEffect(() => {
		setColor(resolvedTheme == "dark" ? "#fff" : "#000");
		return () => {};
	}, [resolvedTheme]);

	return (
		<header className="w-full bg-transparent text-neutral-800 dark:text-neutral-200">
			<nav className="flex w-full max-w-[88rem] flex-row items-stretch justify-between border-b-1 border-neutral-200 px-4  dark:border-neutral-700 md:px-8 xl:mx-auto xl:border-0">
				<Link href="/">
					<span className="my-4 flex flex-row items-center text-lg font-medium leading-normal transition-all duration-200 hover:brightness-150 dark:hover:brightness-50 max-md:ml-3 xl:my-6">
						<span className="font-bold">dash</span>
						<span className="font-light">.js</span>
					</span>
				</Link>
				<div className="hidden flex-row items-stretch gap-6 md:flex">
					{Object.keys(meta.menu).map((item, index) => (
						<MenuItemSmall
							key={index}
							link={meta.menu[item]?.link}
							dropdown={meta.menu[item]?.items}>
							{item}
						</MenuItemSmall>
					))}
					<div className="group relative inline-flex cursor-pointer items-center lg:hidden">
						<span className="transition-all duration-200 group-hover:brightness-50">
							<BsThreeDots size={18} />
						</span>
						<Dropdown className="gap-3">
							<Appearance className="mt-0 gap-10" />
							<div className="inline-flex items-center justify-center px-2">
								<Social />
							</div>
						</Dropdown>
					</div>
					<Appearance
						className="mt-0 hidden self-center !rounded-full px-0 py-0 lg:flex"
						minimal
					/>
					<Social className="hidden items-stretch lg:flex" />
				</div>
				<div className="inline-flex items-center md:hidden">
					<Hamburger
						toggled={open}
						onToggle={(toggled) => setopen(toggled)}
						rounded
						size={18}
						label={open ? "Close Menu" : "Open Menu"}
						color={color}
					/>
				</div>
			</nav>
			<div
				className={`fixed left-0 z-10 flex h-screen w-screen flex-col items-center bg-paper px-12 pt-4 transition-all dark:bg-dark-paper ${
					open ? "" : "invisible opacity-0"
				}`}>
				{Object.keys(meta.menu).map((item, index) => (
					<MenuItem
						key={index}
						link={meta.menu[item]?.link}
						dropdown={meta.menu[item]?.items}>
						{item}
					</MenuItem>
				))}
				<Appearance />
				<Social className="mt-6" />
			</div>
		</header>
	);
}
