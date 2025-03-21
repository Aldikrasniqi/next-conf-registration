import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { inconsolata } from '@/lib/fonts'
import './globals.css'
import ErrorBoundary from '@/components/ErrorBoundary'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Ticket Generator',
	description: 'Ticket Generator Conference app made by @aldikrasniqi',
	icons: {
		icon: [
			{ url: '/favicon.ico', sizes: 'any' },
			{ url: '/images/favicon-32x32.png', sizes: '32x32' },
		],
		shortcut: '/images/favicon-32x32.png',
		apple: '/images/favicon-32x32.png',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${inconsolata.variable} antialiased`}
			>
				<ErrorBoundary>{children}</ErrorBoundary>
			</body>
		</html>
	)
}
