/** @type {import('tailwindcss').Config} */

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			backgroundImage: {
				'fondo-svg': "url('/fondo.webp')",
			}
		},
		fontFamily: {
			'poetsen': ["Poetsen One", "sans-serif"],
			'public': ["Public Sans", "sans-serif"]
		}
	},
	plugins: [
		require('tailwindcss-animated')
	],
}
