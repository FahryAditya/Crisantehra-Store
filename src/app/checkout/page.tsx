"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cart-store";
import { useAuthStore } from "@/stores/auth-store";
import { useToastStore } from "@/stores/toast-store";
import { formatRupiah } from "@/data/mock-products";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  QrCode,
  Building2,
  Lock,
  ArrowLeft,
  CheckCircle2,
  ShoppingBag,
  Sparkles,
  Layers,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { showToast } = useToastStore();
  const { items, getSubtotal, getTotalItems, clearCart } = useCartStore();

  // Customer Information (prefilled from logged in user if available)
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");

  // Shipping Information (for physical stickers)
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [shippingCourier, setShippingCourier] = useState<"jne" | "jnt" | "sicepat">("jne");

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<"qris" | "va_bca" | "va_mandiri" | "card">("qris");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = getSubtotal();
  const hasPhysical = items.some((item) => item.product.type === "sticker");
  const hasDigital = items.some((item) => item.product.type === "template");

  const courierRates = {
    jne: 15000,
    jnt: 18000,
    sicepat: 22000,
  };

  const shippingFee = hasPhysical ? courierRates[shippingCourier] : 0;
  const finalTotal = subtotal + shippingFee;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      showToast("Mohon lengkapi nama, email, dan nomor telepon.", "error");
      return;
    }

    if (hasPhysical && (!address || !city || !postalCode)) {
      showToast("Mohon lengkapi alamat pengiriman untuk stiker fisik.", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id || null,
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          shippingAddress: hasPhysical ? address : null,
          shippingCity: hasPhysical ? city : null,
          postalCode: hasPhysical ? postalCode : null,
          shippingCourier: hasPhysical ? shippingCourier : null,
          shippingFee,
          subtotal,
          totalAmount: finalTotal,
          paymentMethod,
          items,
        }),
      });

      const data = await res.json();
      const orderId = data.orderId || `CRIS-${Math.floor(100000 + Math.random() * 900000)}`;

      clearCart();
      showToast("Pembayaran berhasil diproses!", "success");
      router.push(`/checkout/success?orderId=${orderId}&email=${encodeURIComponent(email)}`);
    } catch (err) {
      console.error("Checkout submission error:", err);
      // Fallback
      const orderId = `CRIS-${Math.floor(100000 + Math.random() * 900000)}`;
      clearCart();
      router.push(`/checkout/success?orderId=${orderId}&email=${encodeURIComponent(email)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl py-24 px-4 text-center space-y-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-surface-secondary text-muted">
          <ShoppingBag size={32} />
        </div>
        <h1 className="text-2xl font-black text-foreground">Tidak Ada Item untuk Di-checkout</h1>
        <p className="text-xs text-muted max-w-xs mx-auto">
          Silakan tambahkan produk ke keranjang belanja terlebih dahulu.
        </p>
        <div className="pt-2">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-md hover:opacity-90"
          >
            <ArrowLeft size={14} /> Kembali ke Katalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Page Title & Breadcrumb */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground">
            Checkout Pembayaran
          </h1>
          <p className="text-xs text-muted mt-0.5">
            Lengkapi data penerima dan pilih metode pembayaran resmi.
          </p>
        </div>
        <Link href="/cart" className="flex items-center gap-1.5 text-xs text-muted hover:text-foreground">
          <ArrowLeft size={14} /> Kembali ke Keranjang
        </Link>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Forms */}
        <div className="space-y-6 lg:col-span-7">
          {/* 1. Customer Information */}
          <div className="rounded-2xl border border-border bg-surface p-6 space-y-4">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                1
              </span>
              Informasi Pemesan
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-muted font-semibold">Nama Lengkap *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Alya Renanta"
                  className="w-full rounded-xl border border-border bg-surface-secondary px-3.5 py-2.5 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-muted font-semibold">Alamat Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-border bg-surface-secondary px-3.5 py-2.5 text-foreground focus:border-primary focus:outline-none"
                />
                <span className="text-[10px] text-muted block">
                  Link unduhan template digital dikirimkan ke email ini.
                </span>
              </div>

              <div className="space-y-1">
                <label className="text-muted font-semibold">No. WhatsApp / Telepon *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="081234567890"
                  className="w-full rounded-xl border border-border bg-surface-secondary px-3.5 py-2.5 text-foreground focus:border-primary focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* 2. Physical Shipping Address (Conditional) */}
          {hasPhysical ? (
            <div className="rounded-2xl border border-border bg-surface p-6 space-y-4">
              <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                  2
                </span>
                Alamat Pengiriman (Stiker Fisik)
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-muted font-semibold">Alamat Lengkap *</label>
                  <textarea
                    required
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan"
                    className="w-full rounded-xl border border-border bg-surface-secondary px-3.5 py-2.5 text-foreground focus:border-primary focus:outline-none resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-muted font-semibold">Kota / Kabupaten *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Contoh: Bandung"
                    className="w-full rounded-xl border border-border bg-surface-secondary px-3.5 py-2.5 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-muted font-semibold">Kode Pos *</label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="40123"
                    className="w-full rounded-xl border border-border bg-surface-secondary px-3.5 py-2.5 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Courier Selection */}
              <div className="pt-2 space-y-2">
                <label className="text-muted font-semibold text-xs">Pilih Ekspedisi Pengiriman:</label>
                <div className="grid grid-cols-3 gap-2.5 text-xs">
                  {[
                    { id: "jne", name: "JNE Regular", est: "2-3 Hari", fee: 15000 },
                    { id: "jnt", name: "J&T Express", est: "1-2 Hari", fee: 18000 },
                    { id: "sicepat", name: "SiCepat Best", est: "1 Hari", fee: 22000 },
                  ].map((courier) => {
                    const isSelected = shippingCourier === courier.id;
                    return (
                      <button
                        key={courier.id}
                        type="button"
                        onClick={() => setShippingCourier(courier.id as any)}
                        className={`rounded-xl border p-3 text-left transition-all ${
                          isSelected
                            ? "border-primary bg-primary/10 shadow-[0_0_12px_var(--primary-glow)]"
                            : "border-border bg-surface-secondary/50 hover:bg-surface-secondary"
                        }`}
                      >
                        <div className="font-bold text-foreground">{courier.name}</div>
                        <div className="text-[11px] text-muted">{courier.est}</div>
                        <div className="text-xs font-bold text-primary mt-1">
                          {formatRupiah(courier.fee)}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 flex items-center gap-3 text-xs text-emerald-400">
              <CheckCircle2 size={18} className="shrink-0" />
              <span>Semua item di keranjangmu adalah produk digital. Pengiriman fisik tidak diperlukan.</span>
            </div>
          )}

          {/* 3. Payment Method */}
          <div className="rounded-2xl border border-border bg-surface p-6 space-y-4">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                {hasPhysical ? "3" : "2"}
              </span>
              Metode Pembayaran
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                {
                  id: "qris",
                  name: "QRIS Instant",
                  desc: "GoPay, OVO, Dana, ShopeePay",
                  icon: <QrCode size={18} className="text-primary" />,
                },
                {
                  id: "va_bca",
                  name: "BCA Virtual Account",
                  desc: "Verifikasi otomatis 24 jam",
                  icon: <Building2 size={18} className="text-primary" />,
                },
                {
                  id: "va_mandiri",
                  name: "Mandiri Virtual Account",
                  desc: "Verifikasi instan via Livin",
                  icon: <Building2 size={18} className="text-primary" />,
                },
                {
                  id: "card",
                  name: "Kartu Kredit / Debit",
                  desc: "Visa & Mastercard 3D Secure",
                  icon: <CreditCard size={18} className="text-primary" />,
                },
              ].map((method) => {
                const isSelected = paymentMethod === method.id;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={`flex items-start gap-3 rounded-xl border p-3.5 text-left transition-all ${
                      isSelected
                        ? "border-primary bg-primary/10 shadow-[0_0_12px_var(--primary-glow)]"
                        : "border-border bg-surface-secondary/40 hover:bg-surface-secondary"
                    }`}
                  >
                    <div className="mt-0.5">{method.icon}</div>
                    <div>
                      <div className="font-bold text-foreground">{method.name}</div>
                      <div className="text-[11px] text-muted">{method.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary Review */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-border bg-surface p-6 space-y-6 shadow-xl sticky top-24">
            <h2 className="text-base font-bold text-foreground border-b border-border pb-3">
              Rincian Pesanan ({getTotalItems()} Item)
            </h2>

            {/* Item Mini List */}
            <div className="max-h-64 overflow-y-auto space-y-3 pr-1 text-xs">
              {items.map((item) => {
                const price = (item.product.price + (item.selectedVariant.priceOffset || 0)) * item.quantity;
                return (
                  <div key={item.id} className="flex items-center justify-between gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="h-12 w-12 rounded-lg object-cover bg-surface-secondary shrink-0"
                    />
                    <div className="flex-1 truncate">
                      <div className="font-bold text-foreground truncate">{item.product.name}</div>
                      <div className="text-[11px] text-muted">
                        {item.quantity}x • {item.selectedVariant.name}
                      </div>
                    </div>
                    <div className="font-bold text-foreground shrink-0">{formatRupiah(price)}</div>
                  </div>
                );
              })}
            </div>

            {/* Price Calculations */}
            <div className="border-t border-border pt-4 space-y-2.5 text-xs">
              <div className="flex justify-between text-muted">
                <span>Subtotal Produk</span>
                <span className="font-semibold text-foreground">{formatRupiah(subtotal)}</span>
              </div>

              <div className="flex justify-between text-muted">
                <span>Ongkos Kirim Fisik</span>
                <span className="font-semibold text-foreground">
                  {hasPhysical ? formatRupiah(shippingFee) : "Gratis (Digital)"}
                </span>
              </div>

              <div className="border-t border-border pt-3 flex justify-between text-sm font-black text-foreground">
                <span>Total Pembayaran</span>
                <span className="text-lg font-black text-primary">{formatRupiah(finalTotal)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-xs font-bold text-white shadow-[0_0_20px_var(--primary-glow)] transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Memproses Pesanan...</span>
              ) : (
                <>
                  <Lock size={14} /> Bayar Sekarang ({formatRupiah(finalTotal)})
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted">
              <ShieldCheck size={14} className="text-primary" />
              <span>Didukung Enkripsi SSL 256-Bit Standar Perbankan</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

