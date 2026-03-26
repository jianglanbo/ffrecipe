import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "FFRecipe - Your Guide to Smart Insurance Choices",
    template: "%s | FFRecipe"
  },
  description: "Compare insurance options, read expert reviews, and make informed decisions about life, health, auto, and home insurance.",
  keywords: ["insurance", "life insurance", "health insurance", "auto insurance", "home insurance", "insurance comparison", "insurance guide"],
  authors: [{ name: "FFRecipe Team" }],
  creator: "FFRecipe",
  publisher: "FFRecipe",
  metadataBase: new URL("https://ffrecipe.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ffrecipe.com",
    siteName: "FFRecipe",
    title: "FFRecipe - Your Guide to Smart Insurance Choices",
    description: "Compare insurance options, read expert reviews, and make informed decisions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FFRecipe - Insurance Guides & Reviews",
    description: "Your trusted source for insurance information",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-white text-gray-900`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
