"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { useCartStore } from "@/stores/cart-store";
import { ShoppingBag, Search, Menu, X, Sparkles, Layers } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { toggleDrawer, getTotalItems } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalItems = getTotalItems();

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/catalog", label: "Katalog" },
    { href: "/catalog?category=sticker", label: "Stiker Anime" },
    { href: "/catalog?category=template", label: "Templates" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full px-3 py-3 sm:px-6 md:px-10">
      <div className="mx-auto flex max-w-[1220px] flex-wrap items-center justify-between gap-4">
        {/* Brand Logo from acuan.html */}
        <Link href="/" className="group flex items-center gap-2.5 focus:outline-none">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/15 bg-white/10 transition-colors duration-300 group-hover:bg-[#a1f68b] group-hover:text-slate-950">
            <span className="text-lg font-extrabold leading-none tracking-tighter">c</span>
          </div>
          <span className="text-lg font-semibold tracking-tight text-white/95">
            crisanthera<span className="text-[#a1f68b]">.</span>
          </span>
        </Link>

        {/* Center Pill Navigation from acuan.html */}
        <nav className="order-3 flex w-full items-center justify-center overflow-x-auto rounded-full border border-white/[0.07] bg-[#181b28]/90 p-1.5 backdrop-blur-md lg:order-2 lg:w-auto">
          <div className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href.split("?")[0]) &&
                    (link.href.includes("?") ? typeof window !== "undefined" && window.location.search.includes(link.href.split("?")[1]) : true);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    isActive
                      ? "relative flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-950 shadow-md transition-all duration-300"
                      : "rounded-full px-4 py-2 text-xs font-medium text-slate-400 transition-all duration-300 hover:text-white"
                  }
                >
                  {isActive && <span className="h-2 w-2 rounded-full bg-slate-950 animate-pulse" />}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Right User Actions from acuan.html */}
        <div className="order-2 flex items-center gap-2.5 lg:order-3">
          {/* Quick Search Button */}
          <Link
            href="/catalog"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.07] bg-[#181b28] text-slate-300 transition-all hover:scale-105 hover:border-white/20 hover:text-white active:scale-95"
            title="Cari Produk"
          >
            <Search size={16} />
          </Link>

          {/* Cart Icon Trigger with Neon Dot */}
          <button
            onClick={toggleDrawer}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.07] bg-[#181b28] text-slate-300 transition-all hover:scale-105 hover:border-white/20 hover:text-white active:scale-95"
            title="Keranjang Belanja"
          >
            <ShoppingBag size={16} />
            {totalItems > 0 && (
              <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-[#a1f68b] shadow-[0_0_8px_#a1f68b]" />
            )}
          </button>

          {/* Theme Switcher Button */}
          <ThemeSwitcher />

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.07] bg-[#181b28] text-slate-300 lg:hidden"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mt-3 rounded-3xl border border-white/[0.08] bg-[#151722]/95 p-4 shadow-2xl backdrop-blur-xl lg:hidden space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-2xl px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/cart"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between rounded-2xl px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white"
          >
            <span>Keranjang ({totalItems})</span>
            <span className="rounded-full bg-[#a1f68b] px-2 py-0.5 text-[10px] font-bold text-slate-950">
              {totalItems} item
            </span>
          </Link>
        </div>
      )}
    </header>
  );
}
