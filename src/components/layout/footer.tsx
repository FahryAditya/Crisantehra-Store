"use client";

import Link from "next/link";
import { Sparkles, Heart, ShieldCheck, Truck, RefreshCw } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface text-muted">
      {/* Value Proposition Highlights */}
      <div className="border-b border-border/60 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-secondary text-primary">
              <Sparkles size={20} />
            </div>
            <div>
              <div className="font-bold text-foreground">Vinyl Holographic Premium</div>
              <p className="text-muted mt-0.5">Stiker anti-air & anti-gores tahan lama.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-secondary text-primary">
              <ShieldCheck size={20} />
            </div>
            <div>
              <div className="font-bold text-foreground">Next.js 16 Production Ready</div>
              <p className="text-muted mt-0.5">Template modern clean code & App Router.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-secondary text-primary">
              <Truck size={20} />
            </div>
            <div>
              <div className="font-bold text-foreground">Instant Digital Download</div>
              <p className="text-muted mt-0.5">Template dapat diunduh langsung setelah beli.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-secondary text-primary">
              <RefreshCw size={20} />
            </div>
            <div>
              <div className="font-bold text-foreground">Duality Theme System</div>
              <p className="text-muted mt-0.5">Eksplorasi visual Nihilux & Aha.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                <Sparkles size={16} />
              </div>
              <span className="text-base font-extrabold text-foreground">
                Crisanthera<span className="text-primary">.</span>Store
              </span>
            </div>
            <p className="text-xs leading-relaxed text-muted">
              Marketplace anime stickers fisik berkualitas tinggi dan template website Next.js modern
              dengan identitas desain ganda Nihilux & Aha.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">
              Koleksi Produk
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/catalog" className="hover:text-primary transition-colors">
                  Semua Produk
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=sticker" className="hover:text-primary transition-colors">
                  Anime Vinyl Stickers
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=template" className="hover:text-primary transition-colors">
                  Next.js 16 Web Templates
                </Link>
              </li>
              <li>
                <Link href="/catalog?tag=Holographic" className="hover:text-primary transition-colors">
                  Holographic Editions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">
              Dukungan & Info
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/cart" className="hover:text-primary transition-colors">
                  Keranjang Belanja
                </Link>
              </li>
              <li>
                <span className="text-muted-light">Panduan Lisensi Template</span>
              </li>
              <li>
                <span className="text-muted-light">Instruksi Perawatan Stiker</span>
              </li>
              <li>
                <span className="text-muted-light">Kebijakan Pengembalian</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">
              Karakter Duality
            </h4>
            <p className="text-xs text-muted mb-2">
              Pilih atmosfer tokomu: <strong className="text-foreground">Nihilux</strong> (Mystic Violet) atau{" "}
              <strong className="text-foreground">Aha</strong> (Crimson Radiance).
            </p>
            <div className="rounded-lg border border-border bg-surface-secondary p-3 text-[11px] text-muted">
              Built with Next.js 16 App Router, Tailwind CSS v4, Motion & Zustand.
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-border/80 pt-6 text-xs text-muted sm:flex-row">
          <p>© 2026 Crisanthera-Store. All rights reserved.</p>
          <p className="mt-2 flex items-center gap-1 sm:mt-0">
            Crafted with <Heart size={12} className="text-rose-500 fill-rose-500" /> for anime & web developers
          </p>
        </div>
      </div>
    </footer>
  );
}

