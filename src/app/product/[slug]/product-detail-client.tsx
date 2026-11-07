"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MOCK_PRODUCTS, formatRupiah } from "@/data/mock-products";
import { ProductVariant } from "@/types/store";
import { useCartStore } from "@/stores/cart-store";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product/product-card";
import {
  Sparkles,
  Layers,
  Star,
  Check,
  Plus,
  Minus,
  ShoppingBag,
  ExternalLink,
  Truck,
  ArrowLeft,
  Share2,
} from "lucide-react";

export default function ProductDetailClient({ slug }: { slug: string }) {
  const router = useRouter();
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="mx-auto max-w-xl py-24 text-center">
        <h2 className="text-2xl font-bold text-foreground">Produk Tidak Ditemukan</h2>
        <p className="mt-2 text-xs text-muted">Produk yang kamu cari mungkin telah dihapus atau tautan salah.</p>
        <Link
          href="/catalog"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white shadow-md"
        >
          <ArrowLeft size={14} /> Kembali ke Katalog
        </Link>
      </div>
    );
  }

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);

  const { addItem } = useCartStore();

  const currentPrice = product.price + (selectedVariant.priceOffset || 0);
  const originalPrice = product.originalPrice
    ? product.originalPrice + (selectedVariant.priceOffset || 0)
    : undefined;

  const discountPercent = originalPrice
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem(product, selectedVariant, quantity);
  };

  const handleBuyNow = () => {
    addItem(product, selectedVariant, quantity);
    router.push("/cart");
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Related products from same category
  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.type === product.type && p.id !== product.id
  ).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-16">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-muted">
        <Link href="/" className="hover:text-foreground">
          Beranda
        </Link>
        <span>/</span>
        <Link href={`/catalog?category=${product.type}`} className="hover:text-foreground capitalize">
          {product.type === "sticker" ? "Stiker Anime" : "Next.js Templates"}
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium truncate max-w-xs">{product.name}</span>
      </div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left: Gallery Column */}
        <div className="space-y-4 lg:col-span-6">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-surface-secondary shadow-lg">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 flex gap-2">
              {product.type === "sticker" ? (
                <Badge variant="sticker">
                  <Sparkles size={12} /> Stiker Vinyl
                </Badge>
              ) : (
                <Badge variant="template">
                  <Layers size={12} /> Next.js 16 Template
                </Badge>
              )}
            </div>
          </div>

          {/* Thumbnail Gallery Strip */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`h-20 w-20 overflow-hidden rounded-xl border-2 transition-all ${
                    selectedImageIndex === idx
                      ? "border-primary shadow-[0_0_12px_var(--primary-glow)]"
                      : "border-border opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info & Order Action Column */}
        <div className="space-y-6 lg:col-span-6">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-amber-400">
                <Star size={14} className="fill-amber-400" />
                <span className="font-bold text-foreground">{product.rating}</span>
                <span className="text-muted">({product.reviewsCount} Ulasan pembeli)</span>
              </div>

              <button
                onClick={handleShare}
                className="flex items-center gap-1 text-xs text-muted hover:text-foreground transition-colors"
                title="Salin tautan produk"
              >
                <Share2 size={14} />
                <span>{copiedLink ? "Disalin!" : "Bagikan"}</span>
              </button>
            </div>

            <h1 className="mt-2 text-2xl font-black text-foreground sm:text-3xl">
              {product.name}
            </h1>

            <p className="mt-1 text-sm text-muted">{product.tagline}</p>
          </div>

          {/* Pricing Box */}
          <div className="rounded-xl border border-border bg-surface p-4">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-foreground">
                {formatRupiah(currentPrice)}
              </span>
              {originalPrice && (
                <span className="text-sm text-muted line-through">
                  {formatRupiah(originalPrice)}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-bold text-primary">
                  Hemat {discountPercent}%
                </span>
              )}
            </div>

            <div className="mt-2 flex items-center gap-2 text-xs text-muted">
              {product.type === "template" ? (
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <Check size={14} /> Akses unduhan digital instan setelah pembayaran terverifikasi
                </span>
              ) : (
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <Truck size={14} /> Stok Tersedia ({product.stock} pcs) • Siap kirim hari ini
                </span>
              )}
            </div>
          </div>

          {/* Variant Selector */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted">
              Pilih Varian:
            </label>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {product.variants.map((v) => {
                const isSelected = selectedVariant.id === v.id;
                const offset = v.priceOffset || 0;
                return (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`flex items-center justify-between rounded-xl border p-3 text-left transition-all ${
                      isSelected
                        ? "border-primary bg-primary/10 shadow-[0_0_12px_var(--primary-glow)]"
                        : "border-border bg-surface hover:bg-surface-secondary"
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-foreground">{v.name}</div>
                      {offset !== 0 && (
                        <div className="text-[11px] text-muted">
                          {offset > 0 ? `+${formatRupiah(offset)}` : formatRupiah(offset)}
                        </div>
                      )}
                    </div>
                    {isSelected && <Check size={16} className="text-primary" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Template Specific Details (Tech Stack & Live Preview) */}
          {product.type === "template" && (
            <div className="space-y-3 rounded-xl border border-border bg-surface p-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">Live Demo Preview:</span>
                {product.demoUrl && (
                  <a
                    href={product.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:underline font-bold"
                  >
                    Buka Preview Demo <ExternalLink size={12} />
                  </a>
                )}
              </div>

              {product.techStack && (
                <div>
                  <span className="text-muted block mb-1.5 font-semibold">Tech Stack Termasuk:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border bg-surface-secondary px-2 py-0.5 font-mono text-[11px] text-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Sticker Specific Details */}
          {product.type === "sticker" && (
            <div className="grid grid-cols-2 gap-3 rounded-xl border border-border bg-surface p-4 text-xs">
              <div>
                <span className="text-muted block">Dimensi Ukuran:</span>
                <span className="font-bold text-foreground">{product.dimensions}</span>
              </div>
              <div>
                <span className="text-muted block">Finishing Bahan:</span>
                <span className="font-bold text-foreground">{product.finish}</span>
              </div>
            </div>
          )}

          {/* Quantity and Order Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">
                Jumlah:
              </span>
              <div className="flex items-center rounded-xl border border-border bg-surface px-3 py-1.5">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-muted hover:text-foreground"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center text-xs font-bold text-foreground">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-muted hover:text-foreground"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 pt-2">
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 rounded-xl border border-primary bg-primary/10 py-3.5 text-xs font-bold text-primary transition-all hover:bg-primary hover:text-white hover:shadow-[0_0_15px_var(--primary-glow)] active:scale-95"
              >
                <ShoppingBag size={16} /> Tambah ke Keranjang
              </button>

              <button
                onClick={handleBuyNow}
                className="flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-xs font-bold text-white shadow-[0_0_20px_var(--primary-glow)] transition-all hover:opacity-90 active:scale-95"
              >
                Beli Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description Section */}
      <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold text-foreground">Deskripsi Lengkap Produk</h3>
        <p className="text-xs sm:text-sm text-muted leading-relaxed whitespace-pre-line">
          {product.description}
        </p>
      </div>

      {/* Related Products Recommendation */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-foreground">Produk Terkait Lainnya</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

