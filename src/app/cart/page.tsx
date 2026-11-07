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

  const subtotal = getSubtotal();
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
      setPromoError("Kode kupon tidak valid. Coba 'DUALITY15' atau 'CRISANTHERA10'");
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl py-24 px-4 text-center space-y-4">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white/5 border border-white/10 text-slate-400">
          <ShoppingBag size={38} />
        </div>
        <h1 className="text-2xl font-black text-white sm:text-3xl">
          Keranjang Belanja Kosong
        </h1>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          Kamu belum menambahkan stiker anime atau template Next.js ke keranjang.
        </p>
        <div className="pt-4">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 rounded-full bg-[#a1f68b] px-6 py-3 text-xs font-bold text-slate-950 shadow-md hover:bg-[#8ef075]"
          >
            <ShoppingBag size={15} /> Mulai Menjelajah Katalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1220px] px-3 py-4 sm:px-6 md:px-8 space-y-6">
      {/* Page Header */}
      <div className="bento-card p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            Keranjang Belanja
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Total {getTotalItems()} item siap untuk pembayaran
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-slate-400 hover:text-[#ff6e6e] transition-colors"
        >
          Kosongkan Semua
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
        {/* Left: Cart Items in Bento List */}
        <div className="space-y-3.5 lg:col-span-8">
          {items.map((item) => {
            const unitPrice = item.product.price + (item.selectedVariant.priceOffset || 0);
            const lineSubtotal = unitPrice * item.quantity;

            return (
              <div
                key={item.id}
                className="bento-card p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="h-16 w-16 rounded-2xl object-cover bg-[#0b0c12] shrink-0"
                  />
                  <div>
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="text-xs sm:text-sm font-bold text-white hover:text-[#a1f68b] transition-colors line-clamp-1"
                    >
                      {item.product.name}
                    </Link>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Varian: <span className="text-white">{item.selectedVariant.name}</span>
                    </div>
                    <div className="text-xs font-bold text-[#a1f68b] mt-1">
                      {formatRupiah(unitPrice)}
                    </div>
                  </div>
                </div>

                <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-5 border-t sm:border-t-0 pt-2.5 sm:pt-0 border-white/[0.06]">
                  {/* Quantity Controller */}
                  <div className="flex items-center rounded-full border border-white/10 bg-[#0b0c12] px-2.5 py-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="text-slate-400 hover:text-white"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-7 text-center text-xs font-bold text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-slate-400 hover:text-white"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  <div className="text-sm font-black text-white">
                    {formatRupiah(lineSubtotal)}
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-slate-400 hover:text-[#ff6e6e] transition-colors"
                    title="Hapus"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            );
          })}

          <div className="pt-2">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#a1f68b] hover:underline"
            >
              <ArrowLeft size={13} /> Lanjutkan Belanja Produk Lain
            </Link>
          </div>
        </div>

        {/* Right: Order Summary Bento Box */}
        <div className="lg:col-span-4">
          <div className="bento-card p-6 space-y-6 shadow-2xl sticky top-24">
            <h2 className="text-base font-bold text-white border-b border-white/[0.06] pb-3">
              Ringkasan Pesanan
            </h2>

            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Subtotal ({getTotalItems()} item)</span>
                <span className="font-semibold text-white">{formatRupiah(subtotal)}</span>
              </div>

              <div className="flex justify-between">
                <span>Estimasi Biaya Pengiriman</span>
                <span className="font-semibold text-white">
                  {hasPhysicalItems ? formatRupiah(shippingFee) : "Gratis (Digital)"}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#a1f68b] font-semibold">
                  <span>Diskon Kupon ({discountPercent}%)</span>
                  <span>-{formatRupiah(discountAmount)}</span>
                </div>
              )}

              <div className="border-t border-white/[0.08] pt-3 flex justify-between text-sm font-black text-white">
                <span>Total Tagihan</span>
                <span className="text-lg font-black text-[#a1f68b]">{formatRupiah(finalTotal)}</span>
              </div>
            </div>

            {/* Voucher Coupon Form */}
            <form onSubmit={handleApplyPromo} className="space-y-2">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="DUALITY15"
                    className="w-full rounded-full border border-white/10 bg-[#0b0c12] pl-9 pr-3 py-2 text-xs text-white uppercase placeholder:text-slate-500 focus:outline-none focus:border-[#a1f68b]"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-full bg-white/10 border border-white/15 px-4 py-2 text-xs font-bold text-white hover:bg-white/20"
                >
                  Terapkan
                </button>
              </div>

              {promoApplied && (
                <p className="text-[11px] text-[#a1f68b] font-semibold">
                  ✓ Kupon {discountPercent}% berhasil diterapkan!
                </p>
              )}
              {promoError && (
                <p className="text-[11px] text-[#ff6e6e]">{promoError}</p>
              )}
            </form>

            {/* Checkout Action Button */}
            <Link
              href="/checkout"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-white text-slate-950 py-3.5 text-xs font-bold hover:bg-[#a1f68b] transition-all active:scale-95 shadow-xl"
            >
              Lanjut ke Pembayaran <ArrowRight size={15} />
            </Link>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-2 border-t border-white/[0.06]">
              <ShieldCheck size={14} className="text-[#a1f68b]" />
              <span>Pembayaran Aman & Terenkripsi</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
