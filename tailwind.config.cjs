const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: "class", // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-inter)", ...fontFamily.sans],
			},
			screens: {
				xs: "400px",
			},
			colors: {
				paper: "#F9F9F9",
				"dark-paper": {
					DEFAULT: "#1c1c1c",
					100: "#282828",
				},
				"dash-blue": "#208AF8",
				twitter: "#1DA1F2",
				"twitter-dark": "#1780C1",
				github: "#24292E",
				"github-dark": {
					DEFAULT: "#f5f5f5",
					100: "#1C2024",
				},
			},
			boxShadow: {
				center: "0 0 16px 4px #F9F9F940",
				"center-dark": "0 0 16px 4px #1c1c1c40",
			},
			borderWidth: {
				1: "1px",
			},
		},
	},
	plugins: [],
};
