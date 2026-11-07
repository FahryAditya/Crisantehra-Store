import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import React from "react";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Crisanthera-Store — Ethereal Anime Stickers & Next.js Templates",
  description:
    "Marketplace stiker anime vinyl premium dan template website modern Next.js 16 dengan estetika Ethereal Bento Design System.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      data-theme="nihilux"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans relative overflow-x-hidden">
        {/* Ambient Background Blur Lights (from acuan.html) */}
        <div className="w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[130px] fixed -top-32 -left-32 pointer-events-none -z-10" />
        <div className="w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[140px] fixed bottom-10 right-10 pointer-events-none -z-10" />

        <Providers>
          <ThemeProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
