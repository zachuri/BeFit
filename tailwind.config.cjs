/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
		colors: {
			"dark-color-bg": "#111111",
			"dark-color-text": "EEEEEE",
			"light-color-bg": "#F4F4F4",
			"light-color-text": "111111",
		},
	},
	plugins: [],
};
