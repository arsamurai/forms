/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		container: {
			center: true,
			padding: '1rem',
			screens: {
				lg: '1200',
			},
		},
		extend: {},
	},
	plugins: [],
};
