import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { Router } from '@/router';

import './globals.css';

export const roboto = Roboto({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-roboto',
});

export const metadata: Metadata = {
	title: 'MerchMania',
	description: 'MerchMania',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={roboto.className}>
				<Router>{children}</Router>
			</body>
		</html>
	);
}
