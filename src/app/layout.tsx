import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import connectDB from "@/lib/mongodb";
import { SiteConfig } from "@/models/SiteConfig";
import { NextAuthProvider } from "@/components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  await connectDB();
  const config = await SiteConfig.findOne({});
  
  return {
    title: "Local Pankaj | Home Service in Jaipur",
    description: "Best AC Repair, RO Repair and Household Services in Jaipur",
    icons: {
      icon: config?.logo || "/favicon.ico",
      shortcut: config?.logo || "/favicon.ico",
      apple: config?.logo || "/favicon.ico",
    }
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          {children}
          <Toaster position="top-center" />
        </NextAuthProvider>
      </body>
    </html>
  );
}
