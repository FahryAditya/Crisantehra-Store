"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { useCartStore } from "@/stores/cart-store";
import { ShoppingBag, Menu, X, Sparkles, Layers } from "lucide-react";

export function Navbar() {
  const { toggleDrawer, getTotalItems } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalItems = getTotalItems();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-surface/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-[0_0_15px_var(--primary-glow)] transition-transform group-hover:scale-105">
              <Sparkles size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-foreground">
                Crisanthera<span className="text-primary">.</span>
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted -mt-1">
                Store
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              href="/"
              className="text-muted hover:text-foreground transition-colors"
            >
              Beranda
            </Link>
            <Link
              href="/catalog"
              className="text-muted hover:text-foreground transition-colors"
            >
              Semua Katalog
            </Link>
            <Link
              href="/catalog?category=sticker"
              className="flex items-center gap-1.5 text-muted hover:text-primary transition-colors"
            >
              <Sparkles size={14} /> Stiker Anime
            </Link>
            <Link
              href="/catalog?category=template"
              className="flex items-center gap-1.5 text-muted hover:text-primary transition-colors"
            >
              <Layers size={14} /> Next.js Templates
            </Link>
          </nav>
        </div>

        {/* Right Action Icons: Theme Switcher + Cart + Mobile Toggle */}
        <div className="flex items-center gap-3 sm:gap-4">
          <ThemeSwitcher />

          {/* Cart Icon Trigger */}
          <button
            onClick={toggleDrawer}
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors hover:border-primary hover:text-primary"
            aria-label="Buka Keranjang Belanja"
          >
            <ShoppingBag size={18} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-[0_0_8px_var(--primary-glow)]">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted hover:text-foreground md:hidden"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-surface px-4 py-4 md:hidden animate-fade-in space-y-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-surface-secondary"
          >
            Beranda
          </Link>
          <Link
            href="/catalog"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-surface-secondary"
          >
            Semua Katalog
          </Link>
          <Link
            href="/catalog?category=sticker"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-surface-secondary"
          >
            <Sparkles size={16} className="text-primary" /> Stiker Anime
          </Link>
          <Link
            href="/catalog?category=template"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-surface-secondary"
          >
            <Layers size={16} className="text-primary" /> Next.js Templates
          </Link>
          <Link
            href="/cart"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-surface-secondary"
          >
            <span className="flex items-center gap-2">
              <ShoppingBag size={16} className="text-primary" /> Keranjang Belanja
            </span>
            <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-bold text-primary">
              {totalItems}
            </span>
          </Link>
        </div>
      )}
    </header>
  );
}

