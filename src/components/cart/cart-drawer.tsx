"use client";

import { useCartStore } from "@/stores/cart-store";
import { formatRupiah } from "@/data/mock-products";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, updateQuantity, removeItem, getSubtotal, getTotalItems } =
    useCartStore();

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
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over Content in Bento Glass Style */}
      <div className="relative z-10 flex h-full w-full max-w-md flex-col border-l border-white/[0.08] bg-[#12141f]/95 backdrop-blur-2xl shadow-2xl">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-white/[0.06] p-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-[#a1f68b]">
              <ShoppingBag size={16} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Keranjang Belanja</h2>
              <span className="text-[11px] text-slate-400">{getTotalItems()} item dipilih</span>
            </div>
          </div>

          <button
            onClick={closeDrawer}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center py-12">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/5 text-slate-500 mb-3">
                <ShoppingBag size={30} />
              </div>
              <h3 className="text-sm font-bold text-white">Keranjang Kosong</h3>
              <p className="mt-1 text-xs text-slate-400 max-w-[220px]">
                Pilih stiker anime atau template Next.js untuk mengisi keranjangmu.
              </p>
              <button
                onClick={closeDrawer}
                className="mt-5 rounded-full bg-[#a1f68b] px-5 py-2.5 text-xs font-bold text-slate-950 shadow-md hover:bg-[#8ef075]"
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
                  className="flex gap-3 rounded-2xl border border-white/[0.06] bg-[#181b28]/60 p-3"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="h-16 w-16 rounded-xl object-cover bg-[#0b0c12] shrink-0"
                  />

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${item.product.slug}`}
                          onClick={closeDrawer}
                          className="text-xs font-bold text-white line-clamp-1 hover:text-[#a1f68b] transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-slate-400 hover:text-[#ff6e6e] transition-colors"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {item.selectedVariant.name}
                      </div>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs font-bold text-[#a1f68b]">
                        {formatRupiah(itemPrice)}
                      </span>

                      <div className="flex items-center rounded-full border border-white/10 bg-[#0b0c12] px-2 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-slate-400 hover:text-white"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="w-5 text-center text-xs font-semibold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-slate-400 hover:text-white"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Summary */}
        {items.length > 0 && (
          <div className="border-t border-white/[0.06] p-5 space-y-3 bg-[#151722]/80">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Subtotal</span>
              <span className="font-extrabold text-white text-sm">
                {formatRupiah(getSubtotal())}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link
                href="/cart"
                onClick={closeDrawer}
                className="flex items-center justify-center rounded-full border border-white/15 bg-white/5 py-2.5 text-xs font-bold text-white hover:bg-white/10"
              >
                Lihat Keranjang
              </Link>
              <Link
                href="/checkout"
                onClick={closeDrawer}
                className="flex items-center justify-center gap-1.5 rounded-full bg-[#a1f68b] py-2.5 text-xs font-bold text-slate-950 hover:bg-[#8ef075] shadow-lg"
              >
                Checkout <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
