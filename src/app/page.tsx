"use client";

import Link from "next/link";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { ProductCard } from "@/components/product/product-card";
import { useThemeStore } from "@/stores/theme-store";
import {
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Mail,
  Flame,
  Moon,
} from "lucide-react";
import { useState } from "react";

export default function Home() {
  const { theme } = useThemeStore();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

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
    <div className="space-y-16 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-surface/50 via-background to-background py-16 sm:py-24">
        {/* Ambient Glow Ornaments */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-96 w-[600px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Left Content */}
            <div className="space-y-6 text-center lg:col-span-7 lg:text-left">
              {/* Theme Vibe Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-muted shadow-sm">
                {theme === "nihilux" ? (
                  <>
                    <Moon size={14} className="text-primary animate-pulse" />
                    <span>Mode Aktif: <strong className="text-foreground">Nihilux</strong> (Mystic Violet)</span>
                  </>
                ) : (
                  <>
                    <Flame size={14} className="text-primary animate-pulse" />
                    <span>Mode Aktif: <strong className="text-foreground">Aha</strong> (Crimson Radiance)</span>
                  </>
                )}
              </div>

              <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl text-foreground leading-[1.1]">
                Dua Dimensi, Satu Estetika:{" "}
                <span className="text-primary drop-shadow-[0_0_25px_var(--primary-glow)]">
                  Anime Stickers
                </span>{" "}
                &{" "}
                <span className="text-foreground">
                  Next.js Templates
                </span>
              </h1>

              <p className="max-w-2xl text-base text-muted sm:text-lg">
                Koleksi stiker vinyl holographic tahan air dengan desain anime orisinal,
                serta template website Next.js 16 berstandar produksi dengan sistem tema Duality.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <Link
                  href="/catalog?category=sticker"
                  className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-[0_0_20px_var(--primary-glow)] transition-all hover:opacity-90 active:scale-95"
                >
                  <Sparkles size={16} /> Beli Stiker Anime
                </Link>

                <Link
                  href="/catalog?category=template"
                  className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-border bg-surface px-6 py-3.5 text-sm font-bold text-foreground transition-all hover:bg-surface-secondary active:scale-95"
                >
                  <Layers size={16} /> Jelajahi Templates Next.js
                </Link>
              </div>

              {/* Feature Points */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/60 text-xs text-muted">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-primary shrink-0" />
                  <span>Vinyl UV & Waterproof</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-primary shrink-0" />
                  <span>Next.js 16 App Router</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-primary shrink-0" />
                  <span>Dual Character Theme</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Visual Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm rounded-2xl border border-border bg-surface p-6 shadow-2xl">
                <div className="relative aspect-square overflow-hidden rounded-xl bg-surface-secondary border border-border">
                  <img
                    src={
                      theme === "nihilux"
                        ? "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80"
                        : "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80"
                    }
                    alt="Character Theme Showcase"
                    className="h-full w-full object-cover transition-all duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                      {theme === "nihilux" ? "Karakter Nihilux" : "Karakter Aha"}
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      {theme === "nihilux" ? "Mystic Chrysanthemum" : "Crimson Bloom Radiance"}
                    </h3>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-muted">
                  <span>Klik tombol tema di atas untuk mengubah nuansa toko</span>
                  <Link href="/catalog" className="font-semibold text-primary flex items-center gap-1 hover:underline">
                    Katalog <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY HIGHLIGHT CARDS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Pilih Kategori Belanja
            </h2>
            <p className="mt-1 text-sm text-muted">
              Temukan produk fisik stiker koleksi atau aset digital template web.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Card 1: Anime Stickers */}
          <Link
            href="/catalog?category=sticker"
            className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-8 transition-all hover:border-primary/60 hover:shadow-[0_4px_30px_var(--primary-glow)]"
          >
            <div className="relative z-10 max-w-sm space-y-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary border border-primary/30">
                <Sparkles size={20} />
              </div>
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                Anime Vinyl Stickers
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                Stiker die-cut dan holographic vinyl dengan tinta pigmen Jepang tahan pudar.
                Tahan goresan dan air untuk laptop, motor, dan tumbler.
              </p>
              <div className="flex items-center gap-1 text-xs font-bold text-primary pt-2">
                Lihat Koleksi Stiker <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          {/* Card 2: Next.js Templates */}
          <Link
            href="/catalog?category=template"
            className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-8 transition-all hover:border-primary/60 hover:shadow-[0_4px_30px_var(--primary-glow)]"
          >
            <div className="relative z-10 max-w-sm space-y-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary border border-primary/30">
                <Layers size={20} />
              </div>
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                Next.js 16 Web Templates
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                Template kode sumber siap pakai dengan App Router, Tailwind CSS v4, Zustand,
                dan Prisma 7. Langsung unduh setelah pembelian.
              </p>
              <div className="flex items-center gap-1 text-xs font-bold text-primary pt-2">
                Lihat Koleksi Template <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS GRID */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <Zap size={14} /> Pilihan Editor
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl mt-1">
              Produk Unggulan
            </h2>
          </div>

          <Link
            href="/catalog"
            className="flex items-center gap-1 text-xs font-bold text-primary hover:underline"
          >
            Lihat Semua <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. BEST SELLERS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Sparkles size={14} /> Paling Diminati
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl mt-1">
              Best Sellers
            </h2>
          </div>

          <Link
            href="/catalog"
            className="flex items-center gap-1 text-xs font-bold text-primary hover:underline"
          >
            Buka Katalog <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. NEWSLETTER SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-r from-surface to-surface-secondary p-8 sm:p-12 text-center">
          <div className="mx-auto max-w-xl space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-[0_0_20px_var(--primary-glow)]">
              <Mail size={24} />
            </div>

            <h2 className="text-2xl font-black text-foreground sm:text-3xl">
              Dapatkan Diskon 15% untuk Pembelian Pertama
            </h2>

            <p className="text-xs sm:text-sm text-muted">
              Berlangganan newsletter Crisanthera untuk menerima kabar rilis stiker anime edisi terbatas
              dan update rilis template Next.js terbaru langsung ke emailmu.
            </p>

            {subscribed ? (
              <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs font-bold text-emerald-400">
                🎉 Terima kasih! Kode voucher diskon telah dikirim ke email kamu.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto pt-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Masukkan alamat email kamu..."
                  className="flex-1 rounded-xl border border-border bg-surface px-4 py-3 text-xs text-foreground placeholder:text-muted focus:border-primary focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-primary px-5 py-3 text-xs font-bold text-white shadow-md transition-all hover:opacity-90 active:scale-95"
                >
                  Berlangganan
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
