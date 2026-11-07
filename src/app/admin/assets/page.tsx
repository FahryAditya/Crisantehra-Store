import { AssetUploader } from "@/components/admin/asset-uploader";
import { Sparkles, Cloud } from "lucide-react";

export const metadata = {
  title: "Cloudinary Asset Manager — Crisanthera-Store",
  description: "Manajemen dan unggah aset foto produk stiker dan berkas template ZIP Next.js ke Cloudinary.",
};

export default function AdminAssetsPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#a1f68b]/30 bg-[#a1f68b]/10 px-3 py-1 text-xs font-bold text-[#a1f68b]">
          <Cloud size={14} /> Cloudinary CDN Terhubung
        </div>
        <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
          Penyimpanan Aset Produk & Berkas Template ZIP
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Unggah foto stiker vinyl anime atau berkas arsip template Next.js (.zip) berukuran hingga 100MB.
          URL CDN dapat disalin langsung untuk dimasukkan ke katalog produk.
        </p>
      </div>

      <div className="bento-card p-6 sm:p-8">
        <AssetUploader />
      </div>
    </div>
  );
}
