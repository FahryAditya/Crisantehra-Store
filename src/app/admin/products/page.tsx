"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { formatRupiah, MOCK_PRODUCTS } from "@/data/mock-products";
import { useToastStore } from "@/stores/toast-store";
import {
  Package,
  Plus,
  Search,
  Filter,
  Trash2,
  Edit2,
  CheckCircle2,
  X,
  Code2,
  ExternalLink,
  Sparkles,
  Layers,
  Save,
} from "lucide-react";

export default function AdminProductsPage() {
  const { showToast } = useToastStore();
  const [products, setProducts] = useState<any[]>(MOCK_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "sticker" | "template">("all");
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  // Form Fields
  const [formData, setFormData] = useState({
    name: "",
    type: "sticker",
    price: 45000,
    originalPrice: 55000,
    stock: 50,
    tagline: "",
    description: "",
    images: "/mock/sticker-nihilux.jpg",
    themeAura: "nihilux",
    finish: "Vinyl Doff Waterproof",
    dimensions: "7 x 7 cm",
    waterproof: true,
    framework: "Next.js 16 (App Router)",
    demoUrl: "",
    techStack: "Tailwind CSS, TypeScript, Zustand",
  });

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/admin/products");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setProducts(json.data);
      }
    } catch (err) {
      console.warn("Using local products state:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      type: "sticker",
      price: 45000,
      originalPrice: 55000,
      stock: 50,
      tagline: "",
      description: "",
      images: "/mock/sticker-nihilux.jpg",
      themeAura: "nihilux",
      finish: "Vinyl Doff Waterproof",
      dimensions: "7 x 7 cm",
      waterproof: true,
      framework: "Next.js 16 (App Router)",
      demoUrl: "",
      techStack: "Tailwind CSS, TypeScript, Zustand",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      type: product.type.toLowerCase(),
      price: product.price,
      originalPrice: product.originalPrice || product.price,
      stock: product.stock || 0,
      tagline: product.tagline || "",
      description: product.description || "",
      images: product.images?.[0] || "",
      themeAura: product.themeAura || "nihilux",
      finish: product.finish || "Vinyl Doff Waterproof",
      dimensions: product.dimensions || "7 x 7 cm",
      waterproof: product.waterproof ?? true,
      framework: product.framework || "Next.js 16 (App Router)",
      demoUrl: product.demoUrl || "",
      techStack: Array.isArray(product.techStack)
        ? product.techStack.join(", ")
        : product.techStack || "",
    });
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus produk "${name}"?`)) return;

    try {
      await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showToast(`Produk "${name}" berhasil dihapus.`, "success");
    } catch {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showToast(`Produk "${name}" berhasil dihapus dari katalog lokal.`, "success");
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      images: [formData.images],
      techStack: formData.techStack.split(",").map((s) => s.trim()).filter(Boolean),
    };

    try {
      if (editingProduct) {
        // Edit existing
        await fetch("/api/admin/products", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingProduct.id, ...payload }),
        });
        setProducts((prev) =>
          prev.map((p) => (p.id === editingProduct.id ? { ...p, ...payload } : p))
        );
        showToast("Produk berhasil diperbarui!", "success");
      } else {
        // Create new
        const res = await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        const newProd = json.data || { id: `prod-${Date.now()}`, ...payload };
        setProducts((prev) => [newProd, ...prev]);
        showToast("Produk baru berhasil ditambahkan ke katalog!", "success");
      }
    } catch (err) {
      console.error(err);
      showToast("Gagal menyimpan produk.", "error");
    } finally {
      setIsModalOpen(false);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType =
      typeFilter === "all" ? true : p.type.toLowerCase() === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white sm:text-3xl tracking-tight">
            Katalog Produk & Stok
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Kelola stiker anime vinyl fisik dan template Next.js 16 digital.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-1.5 rounded-full bg-[#a1f68b] text-slate-950 px-4 py-2 text-xs font-bold hover:scale-105 active:scale-95 transition-all shadow-md self-start sm:self-auto"
        >
          <Plus size={15} /> Tambah Produk Baru
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bento-card p-4">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama stiker atau template..."
            className="w-full rounded-xl border border-white/10 bg-[#181b28] pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-[#a1f68b] focus:outline-none"
          />
        </div>

        {/* Type Filter Pills */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <button
            onClick={() => setTypeFilter("all")}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
              typeFilter === "all"
                ? "bg-white text-slate-950 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Semua ({products.length})
          </button>
          <button
            onClick={() => setTypeFilter("sticker")}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
              typeFilter === "sticker"
                ? "bg-[#a1f68b] text-slate-950 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Stiker Vinyl
          </button>
          <button
            onClick={() => setTypeFilter("template")}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
              typeFilter === "template"
                ? "bg-[#c084fc] text-slate-950 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Templates Next.js
          </button>
        </div>
      </div>

      {/* Product Table */}
      <div className="bento-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] bg-[#12141f] text-slate-400">
                <th className="py-3 px-4 font-semibold">Produk</th>
                <th className="py-3 px-4 font-semibold">Tipe</th>
                <th className="py-3 px-4 font-semibold">Harga</th>
                <th className="py-3 px-4 font-semibold">Stok / Format</th>
                <th className="py-3 px-4 font-semibold">Tema Aura</th>
                <th className="py-3 px-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    Tidak ada produk yang cocok dengan pencarian Anda.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const isSticker = p.type.toLowerCase() === "sticker";
                  return (
                    <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                      {/* Product Name & Thumbnail */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#0b0c12]">
                            <Image
                              src={p.images?.[0] || "/placeholder.jpg"}
                              alt={p.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="font-bold text-white block">{p.name}</span>
                            <span className="text-[11px] text-slate-400 line-clamp-1">
                              {p.tagline}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Type Badge */}
                      <td className="py-3 px-4">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                            isSticker
                              ? "bg-[#a1f68b]/15 text-[#a1f68b] border border-[#a1f68b]/30"
                              : "bg-[#c084fc]/15 text-[#c084fc] border border-[#c084fc]/30"
                          }`}
                        >
                          {isSticker ? "Stiker Vinyl" : "Template ZIP"}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-3 px-4 font-bold text-white">
                        {formatRupiah(p.price)}
                      </td>

                      {/* Stock / Format */}
                      <td className="py-3 px-4">
                        {isSticker ? (
                          <span
                            className={`font-semibold ${
                              p.stock < 15 ? "text-amber-400" : "text-slate-300"
                            }`}
                          >
                            {p.stock} pcs tersedia
                          </span>
                        ) : (
                          <span className="text-slate-400 font-mono text-[11px]">
                            Source Code (.ZIP)
                          </span>
                        )}
                      </td>

                      {/* Theme Aura */}
                      <td className="py-3 px-4">
                        <span className="capitalize text-[11px] font-semibold text-slate-300">
                          {p.themeAura || "Nihilux"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEditModal(p)}
                            className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10"
                            title="Edit Produk"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id, p.name)}
                            className="flex h-7 w-7 items-center justify-center rounded-lg border border-rose-500/20 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                            title="Hapus Produk"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tambah / Edit Produk */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />
          <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#151722] p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-base font-bold text-white">
                  {editingProduct ? "Edit Informasi Produk" : "Tambah Produk Baru ke Katalog"}
                </h3>
                <p className="text-xs text-slate-400">
                  Lengkapi data stiker vinyl atau template Next.js.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              {/* Product Type & Aura */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Tipe Produk</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#181b28] px-3.5 py-2.5 text-white focus:border-[#a1f68b] focus:outline-none"
                  >
                    <option value="sticker">Stiker Anime Vinyl (Fisik)</option>
                    <option value="template">Template Next.js (Digital ZIP)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Tema Karakter (Aura)</label>
                  <select
                    value={formData.themeAura}
                    onChange={(e) => setFormData({ ...formData, themeAura: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#181b28] px-3.5 py-2.5 text-white focus:border-[#a1f68b] focus:outline-none"
                  >
                    <option value="nihilux">Nihilux (Lilac & Neon Mint)</option>
                    <option value="aha">Aha (Coral & Neon Lime)</option>
                  </select>
                </div>
              </div>

              {/* Name & Tagline */}
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Nama Produk</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Contoh: Nihilux — Void Chrysanthemum Sticker"
                  className="w-full rounded-xl border border-white/10 bg-[#181b28] px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-[#a1f68b] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Tagline Singkat</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="Contoh: Vinyl Waterproof UV Protected Finish"
                  className="w-full rounded-xl border border-white/10 bg-[#181b28] px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-[#a1f68b] focus:outline-none"
                />
              </div>

              {/* Price & Stock */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Harga Jual (IDR)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full rounded-xl border border-white/10 bg-[#181b28] px-3.5 py-2.5 text-white focus:border-[#a1f68b] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Harga Coret (Opsional)</label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) =>
                      setFormData({ ...formData, originalPrice: Number(e.target.value) })
                    }
                    className="w-full rounded-xl border border-white/10 bg-[#181b28] px-3.5 py-2.5 text-white focus:border-[#a1f68b] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">
                    {formData.type === "sticker" ? "Stok Unit" : "Lisensi Tersedia"}
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full rounded-xl border border-white/10 bg-[#181b28] px-3.5 py-2.5 text-white focus:border-[#a1f68b] focus:outline-none"
                  />
                </div>
              </div>

              {/* Image URL / Cloudinary CDN */}
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">URL Gambar (Cloudinary CDN)</label>
                <input
                  type="text"
                  value={formData.images}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                  placeholder="https://res.cloudinary.com/... atau /mock/..."
                  className="w-full rounded-xl border border-white/10 bg-[#181b28] px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-[#a1f68b] focus:outline-none"
                />
              </div>

              {/* Type Specific Fields */}
              {formData.type === "sticker" ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 rounded-2xl border border-white/10 bg-[#12141f] p-4">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300">Lapisan Finish</label>
                    <input
                      type="text"
                      value={formData.finish}
                      onChange={(e) => setFormData({ ...formData, finish: e.target.value })}
                      placeholder="Contoh: Vinyl Doff Waterproof"
                      className="w-full rounded-xl border border-white/10 bg-[#181b28] px-3.5 py-2 text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300">Dimensi Stiker</label>
                    <input
                      type="text"
                      value={formData.dimensions}
                      onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                      placeholder="Contoh: 7 x 7 cm"
                      className="w-full rounded-xl border border-white/10 bg-[#181b28] px-3.5 py-2 text-white focus:outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 rounded-2xl border border-white/10 bg-[#12141f] p-4">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300">Live Demo Preview URL</label>
                    <input
                      type="text"
                      value={formData.demoUrl}
                      onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                      placeholder="https://demo.crisanthera.store"
                      className="w-full rounded-xl border border-white/10 bg-[#181b28] px-3.5 py-2 text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300">Tech Stack (Dipisah koma)</label>
                    <input
                      type="text"
                      value={formData.techStack}
                      onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                      placeholder="Next.js 16, Tailwind, Prisma"
                      className="w-full rounded-xl border border-white/10 bg-[#181b28] px-3.5 py-2 text-white focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Deskripsi Lengkap</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Deskripsi detail spesifikasi stiker atau arsitektur template..."
                  className="w-full rounded-xl border border-white/10 bg-[#181b28] px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-[#a1f68b] focus:outline-none resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-2.5 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-full border border-white/10 px-5 py-2 font-semibold text-slate-300 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-full bg-[#a1f68b] px-6 py-2 font-bold text-slate-950 hover:scale-105 active:scale-95 transition-all shadow-md"
                >
                  <Save size={14} />
                  <span>{editingProduct ? "Simpan Perubahan" : "Tambahkan ke Katalog"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

