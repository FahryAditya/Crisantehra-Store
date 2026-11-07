"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MOCK_PRODUCTS, formatRupiah } from "@/data/mock-products";
import { Search, X, Sparkles, Layers, ArrowRight } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  // Keyboard shortcut Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger open via custom event or state
          const searchBtn = document.getElementById("search-modal-trigger");
          if (searchBtn) searchBtn.click();
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? MOCK_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.tagline.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : MOCK_PRODUCTS.slice(0, 5); // default show 5 popular

  const handleSelect = (slug: string) => {
    onClose();
    setQuery("");
    router.push(`/product/${slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-fade-in"
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-xl rounded-3xl border border-white/[0.12] bg-[#12141f] p-4 sm:p-6 shadow-2xl space-y-4 animate-fade-in">
        {/* Search Header Input */}
        <div className="relative flex items-center border-b border-white/[0.08] pb-3">
          <Search size={18} className="text-slate-400 mr-2 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari stiker anime, holographic, template Next.js... (Esc to close)"
            className="w-full bg-transparent text-sm font-semibold text-white placeholder:text-slate-500 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="text-slate-400 hover:text-white mr-2"
            >
              <X size={16} />
            </button>
          ) : (
            <span className="hidden sm:inline-block rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-mono text-slate-400">
              ESC
            </span>
          )}
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2">
            {query.trim() ? `Hasil Pencarian (${filtered.length})` : "Produk Populer"}
          </span>

          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              Tidak ada produk yang cocok dengan &quot;{query}&quot;
            </div>
          ) : (
            filtered.map((product) => (
              <div
                key={product.id}
                onClick={() => handleSelect(product.slug)}
                className="flex items-center justify-between gap-3 rounded-2xl p-2.5 transition-colors hover:bg-white/[0.06] cursor-pointer group"
              >
                <div className="flex items-center gap-3 truncate">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-10 w-10 rounded-xl object-cover bg-[#0b0c12] shrink-0"
                  />
                  <div className="truncate">
                    <div className="text-xs font-bold text-white group-hover:text-[#a1f68b] transition-colors truncate">
                      {product.name}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5">
                      {product.type === "sticker" ? (
                        <span className="text-[#6ee7b7] flex items-center gap-0.5">
                          <Sparkles size={9} /> Stiker
                        </span>
                      ) : (
                        <span className="text-[#c084fc] flex items-center gap-0.5">
                          <Layers size={9} /> Template
                        </span>
                      )}
                      <span>•</span>
                      <span>{product.tagline}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-white block">
                    {formatRupiah(product.price)}
                  </span>
                  <span className="text-[10px] text-[#a1f68b] font-medium group-hover:underline inline-flex items-center gap-0.5">
                    Lihat <ArrowRight size={10} />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between border-t border-white/[0.06] pt-3 text-[11px] text-slate-400">
          <span>
            Pintasan: <kbd className="rounded bg-white/10 px-1 py-0.5 font-mono text-[10px]">Ctrl+K</kbd>
          </span>
          <button
            onClick={() => {
              onClose();
              router.push(`/catalog${query ? `?q=${encodeURIComponent(query)}` : ""}`);
            }}
            className="text-[#a1f68b] hover:underline font-bold"
          >
            Buka Katalog Lengkap &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

