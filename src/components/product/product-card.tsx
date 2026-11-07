"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/store";
import { formatRupiah } from "@/data/mock-products";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/stores/cart-store";
import { ShoppingBag, Star, Sparkles, Layers } from "lucide-react";
import React from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultVariant = product.variants[0];
    addItem(product, defaultVariant, 1);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:border-primary/60 hover:shadow-[0_4px_30px_var(--primary-glow)]">
      <div>
        {/* Thumbnail & Badges */}
        <Link href={`/product/${product.slug}`} className="relative block aspect-[4/3] w-full overflow-hidden bg-surface-secondary">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Top Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
            {product.type === "sticker" ? (
              <Badge variant="sticker">
                <Sparkles size={11} /> Stiker
              </Badge>
            ) : (
              <Badge variant="template">
                <Layers size={11} /> Template
              </Badge>
            )}

            {product.isBestSeller && (
              <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-300 border border-amber-500/30">
                Best Seller
              </span>
            )}
          </div>

          {/* Discount Tag */}
          {discountPercent > 0 && (
            <span className="absolute top-2.5 right-2.5 rounded-full bg-primary px-2 py-0.5 text-[11px] font-bold text-white shadow-md">
              -{discountPercent}%
            </span>
          )}
        </Link>

        {/* Content Details */}
        <div className="p-4">
          <div className="mb-1.5 flex items-center justify-between text-xs text-muted">
            <div className="flex items-center gap-1 text-amber-400">
              <Star size={13} className="fill-amber-400" />
              <span className="font-semibold text-foreground">{product.rating}</span>
              <span>({product.reviewsCount})</span>
            </div>

            {product.type === "template" && product.framework && (
              <span className="font-mono text-[10px] text-muted-light">{product.framework}</span>
            )}
            {product.type === "sticker" && product.finish && (
              <span className="text-[11px] text-muted-light truncate max-w-[110px]">{product.finish}</span>
            )}
          </div>

          <Link href={`/product/${product.slug}`}>
            <h3 className="line-clamp-2 text-sm font-bold text-foreground transition-colors group-hover:text-primary">
              {product.name}
            </h3>
          </Link>

          <p className="mt-1 line-clamp-2 text-xs text-muted">
            {product.tagline}
          </p>
        </div>
      </div>

      {/* Footer Price & Add to Cart */}
      <div className="mt-2 flex items-center justify-between border-t border-border/60 p-4 pt-3">
        <div>
          <div className="text-base font-extrabold text-foreground">
            {formatRupiah(product.price)}
          </div>
          {product.originalPrice && (
            <div className="text-xs text-muted line-through">
              {formatRupiah(product.originalPrice)}
            </div>
          )}
        </div>

        <button
          onClick={handleQuickAdd}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-secondary text-foreground transition-all hover:bg-primary hover:text-white hover:shadow-[0_0_12px_var(--primary-glow)] active:scale-95"
          title="Tambah ke Keranjang"
        >
          <ShoppingBag size={16} />
        </button>
      </div>
    </div>
  );
}

