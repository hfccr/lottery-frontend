"use client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import { Web3Modal } from "@/context/Web3Modal";
import { Header } from "@/components/Header";
import "@fontsource-variable/unbounded";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const theme = extendTheme({
  fonts: {
    heading: `'Unbounded Variable', sans-serif`,
    body: `'Unbounded Variable', sans-serif`,
    text: `'Unbounded Variable', sans-serif`,
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <ChakraProvider theme={theme}>
          <Web3Modal>
            <Header />
            {children}
          </Web3Modal>
        </ChakraProvider>
      </body>
    </html>
  );
}
