import './globals.css';

import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import Provider from '@/Provider.client';

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

async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

export default RootLayout;
