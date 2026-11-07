"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { SearchModal } from "@/components/search/search-modal";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import { useAuthStore } from "@/stores/auth-store";
import { useToastStore } from "@/stores/toast-store";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  Heart,
  User,
  ShieldCheck,
  LogOut,
  ChevronDown,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { toggleDrawer, getTotalItems } = useCartStore();
  const { getWishlistCount } = useWishlistStore();
  const { user, isAuthenticated, logout, checkSession } = useAuthStore();
  const { addToast } = useToastStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const totalItems = getTotalItems();
  const totalWishlist = getWishlistCount();

  const handleLogout = async () => {
    await logout();
    setUserDropdownOpen(false);
    addToast({
      title: "Berhasil Keluar",
      message: "Sesi akun Anda telah diakhiri dengan aman.",
      type: "info",
    });
    router.push("/login");
  };

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/catalog", label: "Katalog" },
    { href: "/catalog?category=sticker", label: "Stiker Anime" },
    { href: "/catalog?category=template", label: "Templates" },
    { href: "/support", label: "Pusat Bantuan" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full px-3 py-3 sm:px-6 md:px-10">
        <div className="mx-auto flex max-w-[1220px] items-center justify-between gap-4">
          {/* Brand Logo from acuan.html */}
          <Link href="/" className="group flex items-center gap-2.5 focus:outline-none">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/15 bg-white/10 transition-colors duration-300 group-hover:bg-[#a1f68b] group-hover:text-slate-950">
              <span className="text-lg font-extrabold leading-none tracking-tighter">c</span>
            </div>
            <span className="text-lg font-semibold tracking-tight text-white/95">
              crisanthera<span className="text-[#a1f68b]">.</span>
            </span>
          </Link>

          {/* Center Pill Navigation from acuan.html - Desktop only */}
          <nav className="hidden lg:flex items-center justify-center overflow-x-auto rounded-full border border-white/[0.07] bg-[#181b28]/90 p-1.5 backdrop-blur-md">
            <div className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href.split("?")[0]) &&
                      (link.href.includes("?")
                        ? typeof window !== "undefined" &&
                          window.location.search.includes(link.href.split("?")[1])
                        : true);

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
          <div className="order-2 flex items-center gap-2 lg:order-3">
            {/* Quick Search Modal Trigger (CMD+K) */}
            <button
              id="search-modal-trigger"
              onClick={() => setSearchModalOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.07] bg-[#181b28] text-slate-300 transition-all hover:scale-105 hover:border-white/20 hover:text-white active:scale-95"
              title="Cari Produk (Ctrl+K)"
            >
              <Search size={16} />
            </button>

            {/* Wishlist Link with Badge */}
            <Link
              href="/wishlist"
              className="relative hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.07] bg-[#181b28] text-slate-300 transition-all hover:scale-105 hover:border-white/20 hover:text-white active:scale-95"
              title="Daftar Keinginan (Wishlist)"
            >
              <Heart size={16} className={totalWishlist > 0 ? "text-[#ff6e6e] fill-[#ff6e6e]" : ""} />
              {totalWishlist > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#ff6e6e] text-[9px] font-bold text-white shadow-sm">
                  {totalWishlist}
                </span>
              )}
            </Link>

            {/* Cart Icon Trigger with Neon Dot */}
            <button
              onClick={toggleDrawer}
              className="relative hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.07] bg-[#181b28] text-slate-300 transition-all hover:scale-105 hover:border-white/20 hover:text-white active:scale-95"
              title="Keranjang Belanja"
            >
              <ShoppingBag size={16} />
              {totalItems > 0 && (
                <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-[#a1f68b] shadow-[0_0_8px_#a1f68b]" />
              )}
            </button>

            {/* Theme Switcher Button */}
            <ThemeSwitcher />

            {/* Auth User Menu / Login Pill */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 rounded-full border border-white/10 bg-[#181b28] py-1.5 px-3 text-xs font-bold text-white hover:border-white/25 transition-all"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-[#9df68c] to-[#76e4ca] text-slate-950 font-black text-[10px]">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden md:inline max-w-[80px] truncate">{user.name}</span>
                  <ChevronDown size={12} className="text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-white/10 bg-[#151722]/95 p-2 shadow-2xl backdrop-blur-xl z-50 text-xs space-y-1">
                    <div className="px-3 py-2 border-b border-white/10">
                      <div className="font-bold text-white truncate">{user.name}</div>
                      <div className="text-[10px] text-slate-400 truncate">{user.email}</div>
                    </div>

                    {user.role === "ADMIN" && (
                      <Link
                        href="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 rounded-xl px-3 py-2 font-semibold text-[#c084fc] hover:bg-white/5"
                      >
                        <ShieldCheck size={14} />
                        <span>Admin Hub</span>
                      </Link>
                    )}

                    <Link
                      href="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 rounded-xl px-3 py-2 font-semibold text-slate-300 hover:bg-white/5 hover:text-white"
                    >
                      <User size={14} />
                      <span>Dashboard Akun</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
                    >
                      <LogOut size={14} />
                      <span>Keluar (Logout)</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 rounded-full bg-white text-slate-950 px-4 py-2 text-xs font-bold shadow-md hover:bg-[#a1f68b] transition-all active:scale-95"
              >
                <User size={13} />
                <span>Masuk</span>
              </Link>
            )}

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
              href="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-2xl px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white"
            >
              <span>Daftar Keinginan</span>
              <span className="rounded-full bg-[#ff6e6e] px-2 py-0.5 text-[10px] font-bold text-white">
                {totalWishlist} item
              </span>
            </Link>
            <Link
              href="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-2xl px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white"
            >
              <span>Keranjang</span>
              <span className="rounded-full bg-[#a1f68b] px-2 py-0.5 text-[10px] font-bold text-slate-950">
                {totalItems} item
              </span>
            </Link>
          </div>
        )}
      </header>

      {/* Quick Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </>
  );
}
