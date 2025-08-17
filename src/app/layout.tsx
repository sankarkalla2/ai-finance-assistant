import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProviders from "@/components/query-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default:
      "Ask Your Finance - Smart Financial Guidance for Your Life Decisions",
    template: "%s - Ask Your Finance",
  },
  description:
    "Get personalized financial advice based on your financial data. Ask questions like 'Is it the right time to buy a new car?' and receive data-driven insights to make informed financial decisions.",
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body className={`${inter.className} antialiased`}>
        <GoogleAnalytics gaId="GTM-MZDJCZ3C" />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProviders>
            {children}
            <Toaster />
          </QueryProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
