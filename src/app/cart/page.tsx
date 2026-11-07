"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/stores/cart-store";
import { formatRupiah } from "@/data/mock-products";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  Tag,
  ShieldCheck,
  Check,
} from "lucide-react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, getSubtotal, getTotalItems } =
    useCartStore();

  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const subtotal = getSubtotal();

  // Check if any physical sticker exists in cart for shipping fee
  const hasPhysicalItems = items.some((item) => item.product.type === "sticker");
  const shippingFee = hasPhysicalItems ? 15000 : 0;

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    if (promoCode.trim().toUpperCase() === "CRISANTHERA10") {
      setDiscountPercent(10);
      setPromoApplied(true);
    } else if (promoCode.trim().toUpperCase() === "DUALITY15") {
      setDiscountPercent(15);
      setPromoApplied(true);
    } else {
      setPromoError("Kode kupon tidak valid. Coba 'CRISANTHERA10' atau 'DUALITY15'");
    }
  };

  const handleMockCheckout = () => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      clearCart();
    }, 2000);
  };

  if (checkoutSuccess) {
    return (
      <div className="mx-auto max-w-xl py-24 px-4 text-center space-y-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
          <Check size={32} />
        </div>
        <h1 className="text-3xl font-black text-foreground">Pesanan Berhasil Diproses!</h1>
        <p className="text-xs sm:text-sm text-muted">
          Terima kasih telah berbelanja di Crisanthera-Store. Konfirmasi pesanan dan instruksi akses
          produk digital telah dikirimkan ke email kamu.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs font-bold text-white shadow-md hover:opacity-90"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl py-24 px-4 text-center space-y-4">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-surface-secondary text-muted">
          <ShoppingBag size={40} />
        </div>
        <h1 className="text-2xl font-black text-foreground sm:text-3xl">
          Keranjang Belanja Masih Kosong
        </h1>
        <p className="text-xs text-muted max-w-sm mx-auto">
          Kamu belum menambahkan stiker anime atau template Next.js ke dalam keranjang belanja.
        </p>
        <div className="pt-4">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-xs font-bold text-white shadow-[0_0_15px_var(--primary-glow)] hover:opacity-90"
          >
            <ShoppingBag size={16} /> Mulai Menjelajah Katalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground">
            Keranjang Belanja
          </h1>
          <p className="text-xs text-muted mt-0.5">
            Kelola {getTotalItems()} item belanja kamu sebelum melakukan checkout.
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-muted hover:text-rose-400 transition-colors"
        >
          Kosongkan Semua
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left: Cart Items List */}
        <div className="space-y-4 lg:col-span-8">
          {items.map((item) => {
            const unitPrice = item.product.price + (item.selectedVariant.priceOffset || 0);
            const lineSubtotal = unitPrice * item.quantity;

            return (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-border bg-surface p-4 transition-all hover:border-primary/40"
              >
                {/* Product Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="h-20 w-20 rounded-lg object-cover bg-surface-secondary shrink-0"
                  />
                  <div>
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="text-sm font-bold text-foreground hover:text-primary transition-colors line-clamp-1"
                    >
                      {item.product.name}
                    </Link>
                    <div className="mt-0.5 text-xs text-muted">
                      Varian: <span className="text-foreground">{item.selectedVariant.name}</span>
                    </div>
                    <div className="mt-1 text-xs font-bold text-primary">
                      {formatRupiah(unitPrice)}
                    </div>
                  </div>
                </div>

                {/* Quantity & Line Total */}
                <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-border">
                  <div className="flex items-center rounded-lg border border-border bg-surface-secondary px-2.5 py-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="text-muted hover:text-foreground"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-foreground">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-muted hover:text-foreground"
                    >
                      <Plus size={13} />
                    </button>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-black text-foreground">
                      {formatRupiah(lineSubtotal)}
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-muted hover:text-rose-400 transition-colors"
                    title="Hapus produk"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}

          <div className="pt-2">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline"
            >
              <ArrowLeft size={14} /> Lanjutkan Belanja Produk Lain
            </Link>
          </div>
        </div>

        {/* Right: Order Summary Box */}
        <div className="lg:col-span-4">
          <div className="rounded-2xl border border-border bg-surface p-6 space-y-6 shadow-xl sticky top-24">
            <h2 className="text-base font-extrabold text-foreground border-b border-border pb-3">
              Ringkasan Pesanan
            </h2>

            {/* Price Calculations */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-muted">
                <span>Subtotal ({getTotalItems()} item)</span>
                <span className="font-semibold text-foreground">{formatRupiah(subtotal)}</span>
              </div>

              <div className="flex justify-between text-muted">
                <span>Estimasi Biaya Pengiriman</span>
                <span className="font-semibold text-foreground">
                  {hasPhysicalItems ? formatRupiah(shippingFee) : "Gratis (Aset Digital)"}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Diskon Kupon ({discountPercent}%)</span>
                  <span>-{formatRupiah(discountAmount)}</span>
                </div>
              )}

              <div className="border-t border-border pt-3 flex justify-between text-sm font-black text-foreground">
                <span>Total Tagihan</span>
                <span className="text-lg font-black text-primary">{formatRupiah(finalTotal)}</span>
              </div>
            </div>

            {/* Voucher Coupon Form */}
            <form onSubmit={handleApplyPromo} className="space-y-2">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Kode kupon (e.g. DUALITY15)"
                    className="w-full rounded-xl border border-border bg-surface-secondary pl-8 pr-3 py-2 text-xs text-foreground placeholder:text-muted focus:border-primary focus:outline-none uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-xl border border-border bg-surface-secondary px-4 py-2 text-xs font-bold text-foreground hover:bg-surface-hover"
                >
                  Terapkan
                </button>
              </div>

              {promoApplied && (
                <p className="text-[11px] text-emerald-400 font-semibold">
                  ✓ Kupon {discountPercent}% berhasil diterapkan!
                </p>
              )}
              {promoError && (
                <p className="text-[11px] text-rose-400">{promoError}</p>
              )}
            </form>

            {/* Checkout Action Button */}
            <Link
              href="/checkout"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-xs font-bold text-white shadow-[0_0_20px_var(--primary-glow)] transition-all hover:opacity-90 active:scale-95"
            >
              Lanjut ke Pembayaran <ArrowRight size={16} />
            </Link>

            {/* Security Assurance Badge */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-muted pt-2 border-t border-border/60">
              <ShieldCheck size={14} className="text-primary" />
              <span>Pembayaran Aman & Terenkripsi</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

