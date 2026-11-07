"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MOCK_PRODUCTS, CATEGORIES } from "@/data/mock-products";
import { ProductCard } from "@/components/product/product-card";
import { ProductType, CharacterTheme } from "@/types/store";
import { Search, SlidersHorizontal, Sparkles, Layers, RotateCcw } from "lucide-react";

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
      // Category filter
      if (selectedCategory !== "all" && product.type !== selectedCategory) {
        return false;
      }
      // Tag filter
      if (selectedTag && !product.tags.includes(selectedTag)) {
        return false;
      }
      // Theme filter
      if (themeFilter !== "all" && product.themeAura !== themeFilter) {
        return false;
      }
      // Search query
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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header & Title */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            Katalog Produk Crisanthera
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-muted">
            Temukan stiker vinyl anime eksklusif dan template web Next.js 16 siap pakai.
          </p>
        </div>

        {/* Search Bar Input */}
        <div className="relative w-full max-w-sm">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari stiker atau template..."
            className="w-full rounded-xl border border-border bg-surface pl-10 pr-4 py-2.5 text-xs text-foreground placeholder:text-muted focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      {/* Filter Controls Row */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  isActive
                    ? "bg-primary text-white shadow-[0_0_15px_var(--primary-glow)]"
                    : "border border-border bg-surface text-muted hover:text-foreground"
                }`}
              >
                {cat.id === "sticker" && <Sparkles size={13} />}
                {cat.id === "template" && <Layers size={13} />}
                <span>{cat.name}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    isActive ? "bg-white/20 text-white" : "bg-surface-secondary text-muted"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Secondary Filters: Theme Aura & Sort */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          {/* Character Vibe Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-muted">Aura:</span>
            <select
              value={themeFilter}
              onChange={(e) => setThemeFilter(e.target.value as any)}
              className="rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none"
            >
              <option value="all">Semua Karakter</option>
              <option value="nihilux">Nihilux (Purple)</option>
              <option value="aha">Aha (Crimson)</option>
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-muted">Urutkan:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none"
            >
              <option value="featured">Pilihan Unggulan</option>
              <option value="price-asc">Harga: Rendah ke Tinggi</option>
              <option value="price-desc">Harga: Tinggi ke Rendah</option>
              <option value="rating">Rating Tertinggi</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tag Badges Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
        <span className="text-muted shrink-0 text-[11px] font-semibold uppercase tracking-wider">
          Tag Populer:
        </span>
        {allTags.map((tag) => {
          const isSelected = selectedTag === tag;
          return (
            <button
              key={tag}
              onClick={() => setSelectedTag(isSelected ? "" : tag)}
              className={`shrink-0 rounded-full px-3 py-1 text-xs transition-colors ${
                isSelected
                  ? "bg-primary text-white font-bold"
                  : "border border-border bg-surface text-muted hover:border-primary/50 hover:text-foreground"
              }`}
            >
              #{tag}
            </button>
          );
        })}
      </div>

      {/* Results Count & Active Filter Indicator */}
      <div className="flex items-center justify-between text-xs text-muted">
        <span>Menampilkan {filteredProducts.length} produk</span>

        {(searchQuery || selectedCategory !== "all" || selectedTag || themeFilter !== "all") && (
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1 text-primary hover:underline font-semibold"
          >
            <RotateCcw size={12} /> Reset Semua Filter
          </button>
        )}
      </div>

      {/* Product Grid / Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-surface/50 py-16 px-4 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-secondary text-muted mb-3">
            <Search size={24} />
          </div>
          <h3 className="text-base font-bold text-foreground">Tidak Ada Produk yang Cocok</h3>
          <p className="mt-1 text-xs text-muted max-w-sm mx-auto">
            Coba ubah kata kunci pencarian atau hilangkan filter kategori dan tag yang dipilih.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-5 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white shadow-md hover:opacity-90"
          >
            Reset Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
    <Suspense fallback={<div className="p-12 text-center text-muted">Memuat katalog...</div>}>
      <CatalogContent />
    </Suspense>
  );
}

