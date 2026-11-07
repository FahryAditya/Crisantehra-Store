import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { SyncProvider } from "@/components/providers/sync-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileBottomBar } from "@/components/layout/mobile-bottom-bar";
import { PwaInstallPrompt } from "@/components/pwa/pwa-install-prompt";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { ToastContainer } from "@/components/ui/toast-container";
import React from "react";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: "#090a0f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Crisanthera-Store — Ethereal Anime Stickers & Next.js Templates",
  description:
    "Marketplace stiker anime vinyl premium dan template website modern Next.js 16 dengan estetika Ethereal Bento Design System.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Crisanthera",
  },
  formatDetection: {
    telephone: false,
  },
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
      <body className="min-h-full flex flex-col font-sans relative overflow-x-hidden pb-16 md:pb-0">
        {/* Ambient Background Blur Lights (from acuan.html) */}
        <div className="w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[130px] fixed -top-32 -left-32 pointer-events-none -z-10" />
        <div className="w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[140px] fixed bottom-10 right-10 pointer-events-none -z-10" />

        <Providers>
          <ThemeProvider>
            <SyncProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <MobileBottomBar />
              <PwaInstallPrompt />
              <CartDrawer />
              <ToastContainer />
            </SyncProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
