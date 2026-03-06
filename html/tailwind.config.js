/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				brand: '#1db954',
				glass: 'rgba(49, 49, 49, 0.4)',
				glassBorder: 'rgba(255, 255, 255, 0.05)',
			},
			width: {
				watch: '195px',
				screen: '143px',
			},
			height: {
				watch: '303px',
				screen: '164px',
			},
			fontSize: {
				xxs: '10px',
				'xs-plus': '11px',
				time: '55px',
			},
		},
	},
	plugins: [],
};
