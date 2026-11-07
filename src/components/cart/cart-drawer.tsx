"use client";

import { useCartStore } from "@/stores/cart-store";
import { formatRupiah } from "@/data/mock-products";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, updateQuantity, removeItem, getSubtotal, getTotalItems } =
    useCartStore();

  // Prevent background body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      {/* Slide-over Content */}
      <div className="relative z-10 flex h-full w-full max-w-md flex-col border-l border-border bg-surface shadow-2xl animate-fade-in">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-border p-4 sm:p-5">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-primary" size={20} />
            <h2 className="text-base font-bold text-foreground">
              Keranjang Belanja
            </h2>
            <span className="rounded-full bg-surface-secondary px-2 py-0.5 text-xs font-semibold text-muted">
              {getTotalItems()} item
            </span>
          </div>

          <button
            onClick={closeDrawer}
            className="rounded-lg p-1.5 text-muted transition-colors hover:bg-surface-secondary hover:text-foreground"
          >
            <X size={20} />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center py-12">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-secondary text-muted mb-4">
                <ShoppingBag size={32} />
              </div>
              <h3 className="text-base font-bold text-foreground">Keranjangmu Kosong</h3>
              <p className="mt-1 text-xs text-muted max-w-[240px]">
                Jelajahi koleksi stiker anime eksklusif atau template Next.js favoritmu.
              </p>
              <button
                onClick={closeDrawer}
                className="mt-6 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white shadow-md hover:opacity-90"
              >
                Mulai Belanja
              </button>
            </div>
          ) : (
            items.map((item) => {
              const itemPrice = item.product.price + (item.selectedVariant.priceOffset || 0);
              return (
                <div
                  key={item.id}
                  className="flex gap-3.5 rounded-lg border border-border/70 bg-surface-secondary/40 p-3"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="h-20 w-20 rounded-md object-cover bg-surface-secondary"
                  />

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${item.product.slug}`}
                          onClick={closeDrawer}
                          className="text-xs font-bold text-foreground line-clamp-1 hover:text-primary transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-muted hover:text-rose-400 transition-colors"
                          title="Hapus"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="mt-0.5 text-[11px] text-muted">
                        Varian: {item.selectedVariant.name}
                      </div>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs font-bold text-primary">
                        {formatRupiah(itemPrice)}
                      </span>

                      {/* Quantity Controller */}
                      <div className="flex items-center gap-1.5 rounded-md border border-border bg-surface px-1.5 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-muted hover:text-foreground"
                          title="Kurangi"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-5 text-center text-xs font-semibold text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-muted hover:text-foreground"
                          title="Tambah"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer Summary */}
        {items.length > 0 && (
          <div className="border-t border-border p-4 sm:p-5 space-y-3 bg-surface">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted">Subtotal Belanja</span>
              <span className="font-extrabold text-foreground text-base">
                {formatRupiah(getSubtotal())}
              </span>
            </div>

            <p className="text-[11px] text-muted">
              *Pajak & ongkos kirim fisik akan dihitung pada tahap checkout.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link
                href="/cart"
                onClick={closeDrawer}
                className="flex items-center justify-center rounded-lg border border-border bg-surface-secondary py-2.5 text-xs font-bold text-foreground transition-all hover:bg-surface-hover"
              >
                Lihat Keranjang
              </Link>
              <Link
                href="/cart"
                onClick={closeDrawer}
                className="flex items-center justify-center gap-1.5 rounded-lg bg-primary py-2.5 text-xs font-bold text-white transition-all hover:opacity-90 shadow-[0_0_15px_var(--primary-glow)]"
              >
                Checkout <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

