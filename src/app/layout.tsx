import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tradutor de Cifras",
  description: "Converta entre símbolos e letras secretamente com o Tradutor de Cifras.",
  keywords: ["cifra", "tradutor", "código secreto", "símbolos", "letras", "criptografia"],
  authors: [{ name: "Cifra Ariane" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Tradutor de Cifras",
    description: "Converta entre símbolos e letras secretamente",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tradutor de Cifras",
    description: "Converta entre símbolos e letras secretamente",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
