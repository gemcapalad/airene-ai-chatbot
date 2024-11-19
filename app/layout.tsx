import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export function generateMetadata(): Metadata {
  return {
    title: "Chat with Airene!",
    description: "Your intelligent chat application",
    // Other metadata options
    icons: {
      icon: "./meralco.svg",
    },
    openGraph: {
      title: "Chat with Airene!",
      description: "Your intelligent chat application",
      // Add more Open Graph metadata if needed
    },
  };
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
