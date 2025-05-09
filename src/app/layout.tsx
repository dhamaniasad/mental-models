import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Mental Models Explorer | Interactive Thinking Tools",
  description: "Explore powerful mental frameworks through interactive visualizations. Improve your decision-making and problem-solving skills.",
  keywords: "mental models, decision making, interactive visualization, ikigai, eisenhower matrix, second-order thinking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}