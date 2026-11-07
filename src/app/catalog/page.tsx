"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MOCK_PRODUCTS, CATEGORIES } from "@/data/mock-products";
import { ProductCard } from "@/components/product/product-card";
import { ProductType, CharacterTheme } from "@/types/store";
import { Search, Sparkles, Layers, RotateCcw } from "lucide-react";

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get("category") as ProductType) || "all";
  const initialTag = searchParams.get("tag") || "";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedTag, setSelectedTag] = useState<string>(initialTag);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [themeFilter, setThemeFilter] = useState<"all" | CharacterTheme>("all");

  // Extract all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    MOCK_PRODUCTS.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, []);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      if (selectedCategory !== "all" && product.type !== selectedCategory) {
        return false;
      }
      if (selectedTag && !product.tags.includes(selectedTag)) {
        return false;
      }
      if (themeFilter !== "all" && product.themeAura !== themeFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesTagline = product.tagline.toLowerCase().includes(query);
        const matchesTags = product.tags.some((t) => t.toLowerCase().includes(query));
        return matchesName || matchesTagline || matchesTags;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, selectedTag, themeFilter, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedTag("");
    setThemeFilter("all");
    setSortBy("featured");
  };

  return (
    <div className="mx-auto max-w-[1220px] px-3 py-4 sm:px-6 md:px-8 space-y-6">
      {/* Top Header Card with Search */}
      <div className="bento-card p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Katalog Produk Crisanthera
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Jelajahi stiker vinyl anime eksklusif dan template web Next.js 16 siap pakai.
          </p>
        </div>

        {/* Search Bar Input */}
        <div className="relative w-full max-w-sm">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari stiker atau template..."
            className="w-full rounded-full border border-white/10 bg-[#0b0c12] pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#a1f68b]"
          />
        </div>
      </div>

      {/* Floating Pill Filter Controls */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Category Tabs Pill from acuan.html */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-full border border-white/[0.07] bg-[#181b28]/90 p-1.5 backdrop-blur-md">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-white text-slate-950 shadow-md font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {isActive && <span className="h-1.5 w-1.5 rounded-full bg-slate-950" />}
                {cat.id === "sticker" && <Sparkles size={12} />}
                {cat.id === "template" && <Layers size={12} />}
                <span>{cat.name}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    isActive ? "bg-slate-200 text-slate-950" : "bg-white/10 text-slate-400"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Secondary Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-xs">Aura:</span>
            <select
              value={themeFilter}
              onChange={(e) => setThemeFilter(e.target.value as any)}
              className="rounded-full border border-white/10 bg-[#181b28] px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#a1f68b]"
            >
              <option value="all">Semua Karakter</option>
              <option value="nihilux">Nihilux (Lilac)</option>
              <option value="aha">Aha (Coral)</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-xs">Urutkan:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-full border border-white/10 bg-[#181b28] px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#a1f68b]"
            >
              <option value="featured">Pilihan Unggulan</option>
              <option value="price-asc">Harga: Rendah ke Tinggi</option>
              <option value="price-desc">Harga: Tinggi ke Rendah</option>
              <option value="rating">Rating Tertinggi</option>
            </select>
          </div>
        </div>
      </div>

      {/* Popular Tags Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 shrink-0 text-[11px] font-semibold uppercase tracking-wider">
          Tag:
        </span>
        {allTags.map((tag) => {
          const isSelected = selectedTag === tag;
          return (
            <button
              key={tag}
              onClick={() => setSelectedTag(isSelected ? "" : tag)}
              className={`shrink-0 rounded-full px-3 py-1 text-xs transition-colors ${
                isSelected
                  ? "bg-[#a1f68b] text-slate-950 font-bold"
                  : "border border-white/10 bg-[#181b28] text-slate-400 hover:text-white"
              }`}
            >
              #{tag}
            </button>
          );
        })}
      </div>

      {/* Count & Reset */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>Menampilkan {filteredProducts.length} produk</span>
        {(searchQuery || selectedCategory !== "all" || selectedTag || themeFilter !== "all") && (
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1 text-[#a1f68b] hover:underline font-semibold"
          >
            <RotateCcw size={12} /> Reset Filter
          </button>
        )}
      </div>

      {/* Grid or Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="bento-card py-16 px-4 text-center">
          <h3 className="text-base font-bold text-white">Tidak Ada Produk yang Cocok</h3>
          <p className="mt-1 text-xs text-slate-400 max-w-sm mx-auto">
            Coba gunakan kata kunci pencarian lain atau klik tombol reset filter di bawah.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-5 rounded-full bg-[#a1f68b] px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-[#8ef075]"
          >
            Reset Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Memuat katalog...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
