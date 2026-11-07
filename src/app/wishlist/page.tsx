"use client";

import Link from "next/link";
import { useWishlistStore } from "@/stores/wishlist-store";
import { useCartStore } from "@/stores/cart-store";
import { useToastStore } from "@/stores/toast-store";
import { ProductCard } from "@/components/product/product-card";
import { Heart, ShoppingBag, ArrowLeft, Trash2 } from "lucide-react";

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlistStore();
  const { addItem } = useCartStore();
  const { showToast } = useToastStore();

  const handleAddAllToCart = () => {
    items.forEach((p) => {
      addItem(p, p.variants[0], 1);
    });
    showToast(`Berhasil memindahkan ${items.length} produk favorit ke keranjang!`);
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl py-24 px-4 text-center space-y-4">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white/5 border border-white/10 text-slate-500">
          <Heart size={38} />
        </div>
        <h1 className="text-2xl font-black text-white sm:text-3xl">
          Daftar Keinginan (Wishlist) Kosong
        </h1>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          Kamu belum menyimpan stiker anime atau template Next.js ke wishlist. Klik ikon hati pada produk untuk menyimpannya.
        </p>
        <div className="pt-4">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 rounded-full bg-[#a1f68b] px-6 py-3 text-xs font-bold text-slate-950 shadow-md hover:bg-[#8ef075]"
          >
            <ShoppingBag size={15} /> Jelajahi Katalog Produk
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1220px] px-3 py-4 sm:px-6 md:px-8 space-y-6">
      {/* Header */}
      <div className="bento-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white sm:text-3xl flex items-center gap-2.5">
            <Heart size={24} className="text-[#ff6e6e] fill-[#ff6e6e]" />
            <span>Daftar Keinginan Saya</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Tersimpan {items.length} produk pilihan favoritmu.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleAddAllToCart}
            className="flex items-center gap-1.5 rounded-full bg-white text-slate-950 px-4 py-2 text-xs font-bold hover:bg-[#a1f68b] transition-all shadow-md active:scale-95"
          >
            <ShoppingBag size={14} /> Pindahkan Semua ke Keranjang
          </button>
          <button
            onClick={clearWishlist}
            className="flex items-center gap-1 rounded-full border border-white/10 bg-[#181b28] px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-[#ff6e6e] transition-colors"
          >
            <Trash2 size={13} /> Bersihkan
          </button>
        </div>
      </div>

      {/* Grid of Wishlisted Products */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="pt-2">
        <Link
          href="/catalog"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#a1f68b] hover:underline"
        >
          <ArrowLeft size={13} /> Lanjutkan Menjelajah Produk Lain
        </Link>
      </div>
    </div>
  );
}

