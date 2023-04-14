import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
				<link
					rel="mask-icon"
					href="/safari-pinned-tab.svg"
					color="#5bbad5"
				/>
				<meta name="msapplication-TileColor" content="#da532c" />
				<meta
					name="theme-color"
					media="(prefers-color-scheme: light)"
					content="#F9F9F9"
				/>
				<meta
					name="theme-color"
					media="(prefers-color-scheme: dark)"
					content="#1C1C1C"
				/>
				<meta
					name="description"
					content="A reference client implementation for the playback of MPEG DASH via JavaScript and compliant browsers."
				/>
				<meta name="author" content="Deniz Ugur" />
				<meta name="google" content="nositelinkssearchbox" />
				<link rel="canonical" href="https://dashjs.org" />

				<meta property="og:url" content="https://dashjs.org" />
				<meta property="og:title" content="dash.js" />
				<meta
					property="og:description"
					content="A reference client implementation for the playback of MPEG DASH via JavaScript and compliant browsers."
				/>
				<meta
					property="og:image"
					content="https://dashjs.org/dashif-logo.png"
				/>
				<meta property="og:site_name" content="dash.js" />
				<meta property="og:locale" content="en_US" />

				<meta name="twitter:card" content="summary" />
				<meta name="twitter:site" content="@dash_if" />
				<meta name="twitter:title" content="dash.js" />
				<meta
					name="twitter:description"
					content="A reference client implementation for the playback of MPEG DASH via JavaScript and compliant browsers."
				/>
				<meta
					name="twitter:image"
					content="https://dashjs.org/dashif-logo.png"
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
