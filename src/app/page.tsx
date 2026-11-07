"use client";

import Link from "next/link";
import { useState } from "react";
import { MOCK_PRODUCTS, formatRupiah } from "@/data/mock-products";
import { ProductCard } from "@/components/product/product-card";
import { useThemeStore } from "@/stores/theme-store";
import {
  Sparkles,
  Layers,
  ArrowRight,
  TrendingUp,
  Coins,
  ShieldCheck,
  CheckCircle2,
  Mail,
  ArrowUpRight,
  ArrowDownRight,
  Layers as LayersIcon,
} from "lucide-react";

export default function Home() {
  const { theme } = useThemeStore();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isStackExpanded, setIsStackExpanded] = useState(false);

  const featuredProducts = MOCK_PRODUCTS.filter((p) => p.featured);
  const bestSellers = MOCK_PRODUCTS.filter((p) => p.isBestSeller);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail("");
    }
  };

  return (
    <div className="mx-auto max-w-[1220px] px-3 py-4 sm:px-6 md:px-8 space-y-8">
      {/* 1. TOP BENTO ROW: HERO BALANCE CARD + STATS MINI CARDS */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 items-stretch">
        {/* Total Balance Hero Card (7 cols) from acuan.html */}
        <div className="lg:col-span-7 hero-balance-card p-6 sm:p-8 text-slate-950 flex flex-col justify-between min-h-[260px] shadow-2xl">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-semibold text-slate-900/80 uppercase tracking-wider">
                Edisi Koleksi Crisanthera
              </span>
              <span className="text-xs font-bold bg-slate-950/10 px-3 py-1 rounded-full">
                Mode: {theme === "nihilux" ? "Nihilux (Lilac)" : "Aha (Coral)"}
              </span>
            </div>

            <div className="mt-4 flex items-baseline">
              <span className="text-3xl sm:text-[42px] font-extrabold tracking-tight leading-none text-slate-950">
                Anime & Next.js
              </span>
            </div>

            <p className="mt-2 text-xs sm:text-sm font-semibold text-slate-900/80 flex items-center gap-1.5">
              <TrendingUp size={16} />
              <span>Stiker vinyl holographic waterproof + template web Next.js 16 produksi</span>
            </p>
          </div>

          {/* Action Buttons: Transfer + Gooey Pill Button from acuan.html */}
          <div className="mt-6 flex flex-wrap items-center gap-3 relative z-10">
            <Link
              href="/catalog?category=sticker"
              className="bg-[#0b0c12] hover:bg-slate-900 text-white text-xs font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2"
            >
              <Sparkles size={14} className="text-[#a1f68b]" />
              <span>Beli Stiker Anime</span>
            </Link>

            {/* Connected Gooey Pill Button */}
            <Link
              href="/catalog?category=template"
              className="gooey-group group cursor-pointer"
            >
              <button
                type="button"
                className="bg-white group-hover:bg-slate-50 text-slate-950 text-xs font-semibold px-5 py-3 rounded-full transition-transform group-hover:-translate-y-0.5"
              >
                Unduh Templates
              </button>
              <div className="gooey-bridge" />
              <button
                type="button"
                className="w-10 h-10 rounded-full bg-white group-hover:bg-slate-50 text-slate-950 flex items-center justify-center transition-transform group-hover:-translate-y-0.5 group-hover:rotate-12"
              >
                <Layers size={15} />
              </button>
            </Link>
          </div>
        </div>

        {/* Income & Expense Mini Cards (5 cols) from acuan.html */}
        <div className="lg:col-span-5 flex flex-col gap-4 justify-between">
          {/* Income Card style: Anime Stickers */}
          <Link
            href="/catalog?category=sticker"
            className="bento-card income-card p-5 flex flex-col justify-between flex-1 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-medium text-slate-300">
                Anime Vinyl Stickers
              </span>
              <ArrowUpRight className="text-[#a1f68b] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={18} />
            </div>
            <div className="my-2 flex items-baseline">
              <span className="text-2xl font-bold tracking-tight text-white">4 Varian Koleksi</span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[11px] text-slate-400">Holographic & Matte Vinyl</span>
              <span className="bg-[#a1f68b] text-slate-950 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                100% Waterproof
              </span>
            </div>
          </Link>

          {/* Expense Card style: Next.js Templates */}
          <Link
            href="/catalog?category=template"
            className="bento-card expense-card p-5 flex flex-col justify-between flex-1 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-medium text-slate-300">
                Next.js 16 Web Templates
              </span>
              <ArrowDownRight className="text-[#ff6e6e] transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" size={18} />
            </div>
            <div className="my-2 flex items-baseline">
              <span className="text-2xl font-bold tracking-tight text-white">4 Source Code</span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[11px] text-slate-400">Turbopack, Tailwind v4 & Prisma</span>
              <span className="bg-[#ff6e6e] text-slate-950 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                Instant ZIP
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* 2. MIDDLE ROW: 3D STACKED SHOWCASE + FEATURE HIGHLIGHT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: 3D Stacked Cards (5 cols) from acuan.html wallet-stack */}
        <div className="lg:col-span-5 bento-card p-6 flex flex-col justify-between min-h-[340px]">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-base font-semibold text-white">Duality Stack Bundle</h2>
              <p className="text-xs text-slate-400">Klik tumpukan kartu untuk membuka layer</p>
            </div>
            <span className="text-xs font-mono font-bold text-[#a1f68b] bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/[0.06]">
              3 In 1
            </span>
          </div>

          {/* 3D Stacked Layers */}
          <div
            onClick={() => setIsStackExpanded(!isStackExpanded)}
            className={`wallet-stack my-4 ${isStackExpanded ? "expanded" : ""}`}
            title="Klik untuk membuka / menutup tumpukan kartu"
          >
            {/* Layer 1: Orange */}
            <div className="credit-card card-layer-1 px-5 py-3 flex items-start justify-between text-slate-950">
              <span className="text-xs font-bold">Stiker Holographic Nihilux</span>
              <span className="text-[11px] font-mono font-bold">7.5 cm</span>
            </div>

            {/* Layer 2: Mint */}
            <div className="credit-card card-layer-2 px-5 py-3 flex items-start justify-between text-slate-950">
              <span className="text-xs font-extrabold italic">Die-Cut Spark Aha</span>
              <span className="text-[11px] font-mono font-bold">8.0 cm</span>
            </div>

            {/* Layer 3: Purple */}
            <div className="credit-card card-layer-3 px-6 py-4 flex items-start justify-between text-white">
              <span className="text-sm font-extrabold italic tracking-wider">Next.js 16 Template</span>
              <span className="text-xs font-mono font-semibold">v2.1.0</span>
            </div>

            {/* Layer 4: Front Glass Overlay */}
            <div className="credit-card card-layer-4 px-6 py-4 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white/95">
                  Crisanthera Duality Master Pack
                </span>
                <span className="text-[10px] font-bold text-[#a1f68b]">ALL ACCESS</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-300 mt-2">
                <span>Rp 349.000</span>
                <span className="font-mono text-[11px] text-slate-400">Koleksi Terlengkap</span>
              </div>
            </div>
          </div>

          <div className="pt-2 text-center">
            <Link
              href="/catalog"
              className="text-xs font-bold text-[#a1f68b] hover:underline inline-flex items-center gap-1"
            >
              Lihat Rincian Bundle Produk <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Right: Featured Products Grid (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">
                Produk Unggulan
              </h2>
              <p className="text-xs text-slate-400">Pilihan terpopuler bulan ini</p>
            </div>
            <Link
              href="/catalog"
              className="text-xs font-bold text-[#a1f68b] hover:underline flex items-center gap-1"
            >
              Semua Katalog <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      {/* 3. BEST SELLERS SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">Best Sellers</h2>
            <p className="text-xs text-slate-400">Produk dengan ulasan tertinggi oleh pembeli</p>
          </div>
          <Link
            href="/catalog"
            className="text-xs font-bold text-[#a1f68b] hover:underline flex items-center gap-1"
          >
            Buka Katalog Lengkap <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* 4. NEWSLETTER BENTO CARD */}
      <div className="bento-card p-6 sm:p-8 text-center space-y-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 border border-white/15 text-[#a1f68b]">
          <Mail size={22} />
        </div>

        <div className="max-w-md mx-auto space-y-1">
          <h3 className="text-xl font-extrabold text-white">
            Dapatkan Diskon 15% untuk Pembelian Pertama
          </h3>
          <p className="text-xs text-slate-400">
            Daftarkan emailmu untuk menerima voucher diskon dan info rilis stiker anime edisi terbatas.
          </p>
        </div>

        {subscribed ? (
          <div className="inline-block rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-xs font-bold text-emerald-400">
            🎉 Voucher diskon telah dikirimkan ke email kamu!
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto pt-2">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="name@example.com"
              className="flex-1 rounded-full border border-white/10 bg-[#0b0c12] px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#a1f68b]"
            />
            <button
              type="submit"
              className="rounded-full bg-[#a1f68b] px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-[#8ef075] transition-all active:scale-95 shadow-md"
            >
              Berlangganan
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
