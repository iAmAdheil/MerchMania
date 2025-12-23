'use client';

import { ThemeProvider } from 'next-themes';
import { AppRouterCacheProvider as MUIProvider } from '@mui/material-nextjs/v15-appRouter';
import { Provider as ChakraProvider } from '@/components/ui/provider';

const ProviderWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <ChakraProvider>
        <MUIProvider>
          {children}
        </MUIProvider>
      </ChakraProvider>
    </ThemeProvider>
  );
};

export default ProviderWrapper;
