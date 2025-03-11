import localFont from 'next/font/local'

export const inconsolata = localFont({
	src: [
		{
			path: '../app/assets/fonts/static/Inconsolata-Regular.ttf',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../app/assets/fonts/static/Inconsolata-Medium.ttf',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../app/assets/fonts/static/Inconsolata-Bold.ttf',
			weight: '700',
			style: 'normal',
		},
		{
			path: '../app/assets/fonts/static/Inconsolata-ExtraBold.ttf',
			weight: '800',
			style: 'normal',
		},
	],
	variable: '--font-inconsolata',
	display: 'swap',
})

export const inconsolataVariable = localFont({
	src: '../app/assets/fonts/Inconsolata-VariableFont_wdth,wght.ttf',
	variable: '--font-inconsolata-var',
	display: 'swap',
})
