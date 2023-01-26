import { ThemeProvider } from "next-themes";

import { Inter } from "@next/font/google";

import { Breakpoint, Footer, Nav } from "../components";
import "../styles/github-md.css";
import "../styles/globals.css";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

export default function App({ Component, pageProps }) {
	const { html } = pageProps;
	return (
		<ThemeProvider attribute="class">
			<div
				className={`${inter.variable} flex min-h-screen flex-col font-sans`}>
				<Nav />
				{!!html ? (
					<section className="container mx-auto flex flex-grow flex-col items-center justify-center px-4">
						<Component {...pageProps} />
					</section>
				) : (
					<Component {...pageProps} />
				)}
				<Footer />
				{/* <Breakpoint /> */}
			</div>
		</ThemeProvider>
	);
}
