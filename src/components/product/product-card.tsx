"use client";

import Link from "next/link";
import { Product } from "@/types/store";
import { formatRupiah } from "@/data/mock-products";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import { useToastStore } from "@/stores/toast-store";
import { ShoppingBag, Star, Sparkles, Layers, Heart } from "lucide-react";
import React from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { showToast } = useToastStore();

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultVariant = product.variants[0];
    addItem(product, defaultVariant, 1);
    showToast(`Ditambahkan ke keranjang: ${product.name}`);
  };

  const handleToggleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWishlist(product);
    if (added) {
      showToast(`Disimpan ke Wishlist: ${product.name}`);
    } else {
      showToast(`Dihapus dari Wishlist: ${product.name}`, "info");
    }
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bento-card rounded-[26px] p-4 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1">
      <div>
        {/* Thumbnail & Badges */}
        <Link
          href={`/product/${product.slug}`}
          className="relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#0b0c12]/60"
        >
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Top Left Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
            {product.type === "sticker" ? (
              <span className="flex items-center gap-1 rounded-full border border-[#6ee7b7]/30 bg-[#6ee7b7]/15 px-2.5 py-0.5 text-[10px] font-bold text-[#6ee7b7] backdrop-blur-md">
                <Sparkles size={10} /> Stiker
              </span>
            ) : (
              <span className="flex items-center gap-1 rounded-full border border-[#c084fc]/30 bg-[#c084fc]/15 px-2.5 py-0.5 text-[10px] font-bold text-[#c084fc] backdrop-blur-md">
                <Layers size={10} /> Template
              </span>
            )}

            {product.isBestSeller && (
              <span className="rounded-full bg-[#a1f68b] px-2 py-0.5 text-[10px] font-extrabold text-slate-950 uppercase tracking-wider">
                Best Seller
              </span>
            )}
          </div>

          {/* Top Right: Wishlist Heart Button */}
          <button
            onClick={handleToggleFav}
            className={`absolute top-2.5 right-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-full border backdrop-blur-md transition-all ${
              isFavorited
                ? "border-[#ff6e6e] bg-[#ff6e6e] text-white shadow-md scale-105"
                : "border-white/15 bg-black/40 text-slate-300 hover:text-white hover:bg-black/70"
            }`}
            title={isFavorited ? "Hapus dari Wishlist" : "Simpan ke Wishlist"}
          >
            <Heart size={13} className={isFavorited ? "fill-white" : ""} />
          </button>

          {/* Discount Tag */}
          {discountPercent > 0 && (
            <span className="absolute bottom-2.5 right-2.5 rounded-full bg-[#ff6e6e] px-2 py-0.5 text-[10px] font-extrabold text-slate-950 shadow-md">
              -{discountPercent}%
            </span>
          )}
        </Link>

        {/* Content Details */}
        <div className="pt-3.5 pb-2">
          <div className="mb-1.5 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-1 text-amber-300">
              <Star size={12} className="fill-amber-300" />
              <span className="font-bold text-white text-[11px]">{product.rating}</span>
              <span className="text-[10px] text-slate-400">({product.reviewsCount})</span>
            </div>

            {product.type === "template" && product.framework && (
              <span className="font-mono text-[10px] text-slate-400">{product.framework}</span>
            )}
            {product.type === "sticker" && product.finish && (
              <span className="text-[10px] text-slate-400 truncate max-w-[110px]">
                {product.finish}
              </span>
            )}
          </div>

          <Link href={`/product/${product.slug}`}>
            <h3 className="line-clamp-2 text-sm font-semibold text-white transition-colors group-hover:text-[#a1f68b]">
              {product.name}
            </h3>
          </Link>

          <p className="mt-1 line-clamp-2 text-xs text-slate-400 leading-relaxed">
            {product.tagline}
          </p>
        </div>
      </div>

      {/* Footer Price & Add to Cart */}
      <div className="mt-2 flex items-center justify-between border-t border-white/[0.06] pt-3">
        <div>
          <div className="text-sm sm:text-base font-extrabold text-white tracking-tight">
            {formatRupiah(product.price)}
          </div>
          {product.originalPrice && (
            <div className="text-[11px] text-slate-500 line-through">
              {formatRupiah(product.originalPrice)}
            </div>
          )}
        </div>

        <button
          onClick={handleQuickAdd}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-950 transition-all hover:bg-[#a1f68b] hover:scale-105 active:scale-95 shadow-md"
          title="Tambah ke Keranjang"
        >
          <ShoppingBag size={15} />
        </button>
      </div>
    </div>
  );
}
