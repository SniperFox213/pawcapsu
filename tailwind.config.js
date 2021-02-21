const { tailwindExtractor } = require("tailwindcss/lib/lib/purgeUnusedStyles");

module.exports = {
	purge: {
		content: [
			"./src/**/*.html",
			"./src/**/*.svelte",
		],
		options: {
			defaultExtractor: (content) => [
				// This is an internal Tailwind function that we're not supposed to be allowed to use
				// So if this stops working, please open an issue at
				// https://github.com/babichjacob/sapper-postcss-template/issues
				// rather than bothering Tailwind Labs about it
				...tailwindExtractor(content),
				// Match Svelte class: directives (https://github.com/tailwindlabs/tailwindcss/discussions/1731)
				...[...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(([_match, group, ..._rest]) => group),
			],
			keyframes: true,
		},
	},
	theme: {
		extend: {
			backgroundColor: {
				"dark": "#1f1d2b",
				"light-dark": "#353340",
				"lighter-dark": "#ACACA7"
			},

			borderColor: {
				"dark": "#1f1d2b",
				"light-dark": "#353340",
				"lighter-dark": "#ACACA7"
			},

			textColor: {
				"dark": "#1f1d2b",
				"light-dark": "#5A5861",
				"lighter-dark": "#ACACA7"
			}
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
