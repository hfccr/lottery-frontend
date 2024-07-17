"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import { Web3Modal } from "@/context/Web3Modal";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <ChakraProvider>
          <Web3Modal>{children}</Web3Modal>
        </ChakraProvider>
      </body>
    </html>
  );
}
