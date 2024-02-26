import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CFI | Inventory Management",
  description: "Composites for infrastrucvture inventory management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <AppRouterCacheProvider
          options={{
            key: 'css'
          }}
        >
          <ThemeProvider theme={theme}>
            <body className={inter.className}>{children}</body>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </html>
    </ClerkProvider>
  );
}
