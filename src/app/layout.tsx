import type { Metadata } from "next";
import { Space_Mono, Roboto_Mono } from "next/font/google";
import "./globals.css";

// Space Mono for headings and accent text
const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-mono",
});

// Roboto Mono for body text
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "Mental Models | Brutalist Design",
  description: "Explore powerful mental frameworks through stark, minimalist brutalist design. A radical approach to visualizing decision-making tools.",
  keywords: "mental models, brutalist design, minimalism, ikigai, eisenhower matrix, second-order thinking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${robotoMono.variable}`}>
      <body className="bg-black text-white font-mono min-h-screen">
        {children}
      </body>
    </html>
  );
}