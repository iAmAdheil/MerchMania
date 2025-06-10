'use client';

import { Provider as ChakraProvider } from '@/components/ui/provider';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { ThemeProvider } from 'next-themes';
import theme from './theme';

const ProviderWrapper = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
			<AppRouterCacheProvider>
				<MUIThemeProvider theme={theme}>
					<ChakraProvider>{children}</ChakraProvider>
				</MUIThemeProvider>
			</AppRouterCacheProvider>
		</ThemeProvider>
	);
};

export default ProviderWrapper;
