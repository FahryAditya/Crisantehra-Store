import { AssetUploader } from "@/components/admin/asset-uploader";
import { Sparkles, Cloud } from "lucide-react";

export const metadata = {
  title: "Cloudinary Asset Manager — Crisanthera-Store",
  description: "Manajemen dan unggah aset foto produk stiker dan berkas template ZIP Next.js ke Cloudinary.",
};

export default function AdminAssetsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      <div className="border-b border-border pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
          <Cloud size={14} /> Cloudinary Cloud Storage Terhubung
        </div>
        <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
          Penyimpanan Aset Produk & Template
        </h1>
        <p className="text-xs sm:text-sm text-muted">
          Unggah foto produk stiker atau berkas arsip template Next.js (.ZIP). File akan otomatis
          disimpan di Cloudinary dengan CDN global berkecepatan tinggi.
        </p>
      </div>

      <AssetUploader />
    </div>
  );
}

