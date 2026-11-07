"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MOCK_PRODUCTS, formatRupiah } from "@/data/mock-products";
import { ProductVariant } from "@/types/store";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import { useToastStore } from "@/stores/toast-store";
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
  Heart,
} from "lucide-react";

export default function ProductDetailClient({ slug }: { slug: string }) {
  const router = useRouter();
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);

  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { showToast } = useToastStore();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product ? product.variants[0] : ({} as ProductVariant)
  );
  const [quantity, setQuantity] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!product) {
    return (
      <div className="mx-auto max-w-xl py-24 text-center">
        <h2 className="text-2xl font-bold text-white">Produk Tidak Ditemukan</h2>
        <p className="mt-2 text-xs text-slate-400">Produk yang kamu cari mungkin telah dihapus.</p>
        <Link
          href="/catalog"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#a1f68b] px-5 py-2.5 text-xs font-bold text-slate-950 shadow-md"
        >
          <ArrowLeft size={14} /> Kembali ke Katalog
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);

  const currentPrice = product.price + (selectedVariant.priceOffset || 0);
  const originalPrice = product.originalPrice
    ? product.originalPrice + (selectedVariant.priceOffset || 0)
    : undefined;

  const discountPercent = originalPrice
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem(product, selectedVariant, quantity);
    showToast(`Ditambahkan ke keranjang: ${product.name} (${quantity}x)`);
  };

  const handleBuyNow = () => {
    addItem(product, selectedVariant, quantity);
    router.push("/cart");
  };

  const handleToggleFav = () => {
    const added = toggleWishlist(product);
    if (added) {
      showToast(`Disimpan ke Wishlist: ${product.name}`);
    } else {
      showToast(`Dihapus dari Wishlist: ${product.name}`, "info");
    }
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      showToast("Tautan produk berhasil disalin!");
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.type === product.type && p.id !== product.id
  ).slice(0, 3);

  return (
    <div className="mx-auto max-w-[1220px] px-3 py-4 sm:px-6 md:px-8 space-y-12 pb-24 md:pb-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-white">Beranda</Link>
        <span>/</span>
        <Link href={`/catalog?category=${product.type}`} className="hover:text-white capitalize">
          {product.type === "sticker" ? "Stiker Anime" : "Next.js Templates"}
        </Link>
        <span>/</span>
        <span className="text-white font-medium truncate max-w-xs">{product.name}</span>
      </div>

      {/* Main Grid in Bento Style */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        {/* Left: Gallery Column */}
        <div className="space-y-4 lg:col-span-6">
          <div className="bento-card overflow-hidden rounded-[28px] p-3 shadow-2xl">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#0b0c12]">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />

              <div className="absolute top-4 left-4 flex gap-2">
                {product.type === "sticker" ? (
                  <span className="flex items-center gap-1 rounded-full border border-[#6ee7b7]/30 bg-[#6ee7b7]/15 px-3 py-1 text-xs font-bold text-[#6ee7b7] backdrop-blur-md">
                    <Sparkles size={12} /> Stiker Vinyl
                  </span>
                ) : (
                  <span className="flex items-center gap-1 rounded-full border border-[#c084fc]/30 bg-[#c084fc]/15 px-3 py-1 text-xs font-bold text-[#c084fc] backdrop-blur-md">
                    <Layers size={12} /> Next.js 16 Template
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`h-20 w-20 overflow-hidden rounded-2xl border-2 transition-all ${
                    selectedImageIndex === idx
                      ? "border-[#a1f68b] shadow-[0_0_12px_#a1f68b]"
                      : "border-white/10 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info & Order Box */}
        <div className="bento-card p-6 sm:p-8 space-y-6 lg:col-span-6">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-amber-300">
                <Star size={14} className="fill-amber-300" />
                <span className="font-bold text-white">{product.rating}</span>
                <span className="text-slate-400">({product.reviewsCount} Ulasan pembeli)</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleFav}
                  className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all ${
                    isFavorited
                      ? "border-[#ff6e6e] bg-[#ff6e6e] text-white"
                      : "border-white/15 bg-white/5 text-slate-300 hover:text-white"
                  }`}
                  title={isFavorited ? "Hapus dari Wishlist" : "Simpan ke Wishlist"}
                >
                  <Heart size={14} className={isFavorited ? "fill-white" : ""} />
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  <Share2 size={13} />
                  <span>{copiedLink ? "Disalin!" : "Bagikan"}</span>
                </button>
              </div>
            </div>

            <h1 className="mt-2 text-2xl font-black text-white sm:text-3xl tracking-tight">
              {product.name}
            </h1>

            <p className="mt-1 text-xs sm:text-sm text-slate-400">{product.tagline}</p>
          </div>

          {/* Pricing Box */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#0b0c12]/60 p-4">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-white">
                {formatRupiah(currentPrice)}
              </span>
              {originalPrice && (
                <span className="text-sm text-slate-500 line-through">
                  {formatRupiah(originalPrice)}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="rounded-full bg-[#ff6e6e] px-2.5 py-0.5 text-xs font-bold text-slate-950">
                  Hemat {discountPercent}%
                </span>
              )}
            </div>

            <div className="mt-2 text-xs">
              {product.type === "template" ? (
                <span className="flex items-center gap-1.5 text-[#a1f68b] font-medium">
                  <Check size={14} /> Akses unduhan digital instan setelah pembayaran terverifikasi
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-[#a1f68b] font-medium">
                  <Truck size={14} /> Stok Tersedia ({product.stock} pcs) • Siap kirim hari ini
                </span>
              )}
            </div>
          </div>

          {/* Variant Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Pilih Varian:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.variants.map((v) => {
                const isSelected = selectedVariant.id === v.id;
                const offset = v.priceOffset || 0;
                return (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`flex items-center justify-between rounded-2xl border p-3 text-left transition-all ${
                      isSelected
                        ? "border-[#a1f68b] bg-[#a1f68b]/10 shadow-[0_0_12px_rgba(161,246,139,0.25)]"
                        : "border-white/[0.06] bg-[#0b0c12]/40 hover:bg-[#0b0c12]/80"
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-white">{v.name}</div>
                      {offset !== 0 && (
                        <div className="text-[11px] text-slate-400">
                          {offset > 0 ? `+${formatRupiah(offset)}` : formatRupiah(offset)}
                        </div>
                      )}
                    </div>
                    {isSelected && <Check size={16} className="text-[#a1f68b]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Template Details */}
          {product.type === "template" && (
            <div className="space-y-3 rounded-2xl border border-white/[0.06] bg-[#0b0c12]/60 p-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Live Demo Preview:</span>
                {product.demoUrl && (
                  <a
                    href={product.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#a1f68b] hover:underline font-bold"
                  >
                    Buka Preview Demo <ExternalLink size={12} />
                  </a>
                )}
              </div>

              {product.techStack && (
                <div>
                  <span className="text-slate-400 block mb-1.5 font-semibold">Tech Stack Termasuk:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-white/10 bg-[#181b28] px-2.5 py-0.5 font-mono text-[11px] text-white"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Sticker Details */}
          {product.type === "sticker" && (
            <div className="grid grid-cols-2 gap-3 rounded-2xl border border-white/[0.06] bg-[#0b0c12]/60 p-4 text-xs">
              <div>
                <span className="text-slate-400 block">Dimensi Ukuran:</span>
                <span className="font-bold text-white">{product.dimensions}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Finishing Bahan:</span>
                <span className="font-bold text-white">{product.finish}</span>
              </div>
            </div>
          )}

          {/* Actions on Desktop */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Jumlah:
              </span>
              <div className="flex items-center rounded-full border border-white/10 bg-[#0b0c12] px-3.5 py-1.5">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-slate-400 hover:text-white">
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center text-xs font-bold text-white">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="text-slate-400 hover:text-white">
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 rounded-full border border-[#a1f68b]/40 bg-[#a1f68b]/15 py-3.5 text-xs font-bold text-[#a1f68b] transition-all hover:bg-[#a1f68b] hover:text-slate-950 active:scale-95 shadow-md"
              >
                <ShoppingBag size={15} /> Tambah ke Keranjang
              </button>

              <button
                onClick={handleBuyNow}
                className="flex items-center justify-center gap-2 rounded-full bg-white text-slate-950 py-3.5 text-xs font-bold hover:bg-[#a1f68b] transition-all active:scale-95 shadow-lg"
              >
                Beli Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bento-card p-6 sm:p-8 space-y-3">
        <h3 className="text-lg font-bold text-white">Deskripsi Lengkap Produk</h3>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed whitespace-pre-line">
          {product.description}
        </p>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Produk Terkait Lainnya</h3>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}

      {/* STICKY MOBILE ACTION BAR (from UX Improvement Plan) */}
      <div className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-between border-t border-white/10 bg-[#12141f]/95 p-3.5 backdrop-blur-2xl md:hidden shadow-2xl">
        <div>
          <span className="text-[10px] text-slate-400 block">Total Harga:</span>
          <span className="text-sm font-black text-white">{formatRupiah(currentPrice * quantity)}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 rounded-full border border-[#a1f68b]/40 bg-[#a1f68b]/20 px-3.5 py-2.5 text-xs font-bold text-[#a1f68b]"
          >
            <ShoppingBag size={14} /> +Keranjang
          </button>
          <button
            onClick={handleBuyNow}
            className="rounded-full bg-white text-slate-950 px-5 py-2.5 text-xs font-bold shadow-md hover:bg-[#a1f68b]"
          >
            Beli Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}
