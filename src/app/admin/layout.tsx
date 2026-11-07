"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Cloud,
  Users,
  Store,
  Menu,
  X,
  Database,
  Sparkles,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      label: "Ringkasan Penjualan",
      href: "/admin",
      icon: LayoutDashboard,
      isActive: pathname === "/admin",
    },
    {
      label: "Katalog Produk",
      href: "/admin/products",
      icon: Package,
      isActive: pathname.startsWith("/admin/products"),
    },
    {
      label: "Pesanan & Resi",
      href: "/admin/orders",
      icon: ShoppingBag,
      isActive: pathname.startsWith("/admin/orders"),
    },
    {
      label: "Aset Cloudinary",
      href: "/admin/assets",
      icon: Cloud,
      isActive: pathname.startsWith("/admin/assets"),
    },
    {
      label: "Pelanggan",
      href: "/admin/customers",
      icon: Users,
      isActive: pathname.startsWith("/admin/customers"),
    },
  ];

  return (
    <div className="min-h-screen bg-[#090a0f] text-white">
      {/* Top Admin Navbar */}
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-white/[0.08] bg-[#12141f]/90 px-4 sm:px-6 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 md:hidden hover:text-white"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          {/* Admin Brand */}
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-[#9df68c] to-[#76e4ca] text-slate-950 font-black shadow-[0_0_15px_rgba(161,246,139,0.35)]">
              <span>C</span>
            </div>
            <div>
              <span className="text-sm font-extrabold tracking-tight text-white">
                crisanthera<span className="text-[#a1f68b]">.</span>
              </span>
              <span className="ml-1.5 rounded-md bg-white/10 px-1.5 py-0.5 text-[9px] font-bold text-[#c084fc] uppercase tracking-wider">
                Admin Hub
              </span>
            </div>
          </Link>
        </div>

        {/* Right Status & Public Store Link */}
        <div className="flex items-center gap-3">
          {/* Neon DB Indicator */}
          <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold text-emerald-400">
            <Database size={12} className="animate-pulse" />
            <span>Neon DB Live</span>
          </div>

          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-[#181b28] px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:border-white/20 transition-all"
            title="Buka Toko Publik"
          >
            <Store size={13} />
            <span className="hidden sm:inline">Lihat Toko Publik</span>
            <ExternalLink size={11} className="text-slate-500" />
          </Link>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px]">
        {/* Desktop Bento Sidebar */}
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-white/[0.08] p-4 md:block overflow-y-auto">
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Menu Utama
              </span>
              <nav className="space-y-1 pt-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
                        item.isActive
                          ? "bg-white text-slate-950 font-bold shadow-lg"
                          : "text-slate-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Icon size={16} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Quick Summary Card */}
            <div className="rounded-2xl border border-white/[0.06] bg-[#151722] p-4 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <ShieldCheck size={14} className="text-[#a1f68b]" />
                <span>Duality Theme System</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Mendukung tema Nihilux (Dark Mint) dan Aha (Crimson Spark) secara real-time.
              </p>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />
            <div className="relative z-10 w-72 border-r border-white/10 bg-[#12141f] p-5 shadow-2xl flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#a1f68b] text-slate-950 font-bold text-xs">
                      C
                    </div>
                    <span className="font-bold text-sm text-white">Admin Panel</span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-xs font-semibold ${
                          item.isActive
                            ? "bg-white text-slate-950 font-bold"
                            : "text-slate-400 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <Icon size={16} />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-white/10">
                <Link
                  href="/"
                  className="flex items-center justify-center gap-2 rounded-xl bg-white/10 py-2.5 text-xs font-bold text-white hover:bg-white/20"
                >
                  <Store size={14} /> Ke Toko Publik
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Admin Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">{children}</main>
      </div>
    </div>
  );
}

