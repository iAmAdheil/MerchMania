'use client';

import { Provider as ChakraProvider } from '@/components/ui/provider';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from 'next-themes';

const ProviderWrapper = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
			<AppRouterCacheProvider>
				<ChakraProvider>{children}</ChakraProvider>
			</AppRouterCacheProvider>
		</ThemeProvider>
	);
};

export default ProviderWrapper;
