import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next Project",
  description: "Learning Next",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="flex gap-6 p-4 bg-gray-800 border-b border-blue-500/30">
          <Link className="text-white font-medium hover:text-blue-400 transition-colors" href="/">Home</Link>
          <Link className="text-white font-medium hover:text-blue-400 transition-colors" href="/forecast">Forecast</Link>
          <Link className="text-white font-medium hover:text-blue-400 transition-colors" href="/favorites">Favorites</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
