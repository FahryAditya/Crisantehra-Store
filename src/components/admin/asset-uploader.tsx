"use client";

import { useState } from "react";
import {
  UploadCloud,
  FileArchive,
  Image as ImageIcon,
  Check,
  Copy,
  AlertCircle,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export function AssetUploader() {
  const [activeTab, setActiveTab] = useState<"image" | "template">("image");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setErrorMsg("");
      setUploadResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setErrorMsg("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", activeTab);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Gagal mengunggah ke Cloudinary");
      }

      setUploadResult(json.data);
      setFile(null);
    } catch (err: any) {
      setErrorMsg(err.message || "Gagal mengunggah file");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 space-y-6 shadow-xl">
      {/* Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-border pb-4">
        <button
          onClick={() => {
            setActiveTab("image");
            setFile(null);
            setErrorMsg("");
            setUploadResult(null);
          }}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
            activeTab === "image"
              ? "bg-primary text-white shadow-[0_0_15px_var(--primary-glow)]"
              : "border border-border bg-surface-secondary text-muted hover:text-foreground"
          }`}
        >
          <ImageIcon size={15} /> Upload Gambar Produk
        </button>

        <button
          onClick={() => {
            setActiveTab("template");
            setFile(null);
            setErrorMsg("");
            setUploadResult(null);
          }}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
            activeTab === "template"
              ? "bg-primary text-white shadow-[0_0_15px_var(--primary-glow)]"
              : "border border-border bg-surface-secondary text-muted hover:text-foreground"
          }`}
        >
          <FileArchive size={15} /> Upload Template Next.js (.ZIP)
        </button>
      </div>

      {/* Description info */}
      <p className="text-xs text-muted">
        {activeTab === "image"
          ? "Unggah foto stiker anime atau mockup template ke Cloudinary CDN (Otomatis kompresi webp & resolusi optimal)."
          : "Unggah file bundle source code Next.js (.zip) ke penyimpanan Cloudinary Raw Storage yang aman."}
      </p>

      {/* File Dropzone */}
      <div className="relative rounded-2xl border-2 border-dashed border-border/80 bg-surface-secondary/40 p-8 text-center transition-colors hover:border-primary/60">
        <input
          type="file"
          accept={activeTab === "image" ? "image/*" : ".zip"}
          onChange={handleFileChange}
          className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
        />

        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            {activeTab === "image" ? <ImageIcon size={28} /> : <FileArchive size={28} />}
          </div>

          <div>
            <span className="text-xs font-bold text-foreground">
              {file ? file.name : "Klik atau seret file ke sini untuk mengunggah"}
            </span>
            <p className="text-[11px] text-muted mt-0.5">
              {activeTab === "image"
                ? "Format JPG, PNG, WEBP, atau SVG (Maksimal 10MB)"
                : "Format arsip berkas .ZIP (Maksimal 100MB)"}
            </p>
          </div>
        </div>
      </div>

      {/* Upload Action Button */}
      {file && (
        <div className="flex items-center justify-between rounded-xl border border-border bg-surface-secondary p-3 text-xs">
          <span className="truncate max-w-xs font-semibold text-foreground">{file.name}</span>
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 font-bold text-white shadow-md hover:opacity-90 active:scale-95 disabled:opacity-50"
          >
            <UploadCloud size={14} />
            {isUploading ? "Mengunggah..." : "Mulai Upload ke Cloudinary"}
          </button>
        </div>
      )}

      {/* Error Message */}
      {errorMsg && (
        <div className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-400">
          <AlertCircle size={16} className="shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Upload Success Card */}
      {uploadResult && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 space-y-3 text-xs">
          <div className="flex items-center gap-2 font-bold text-emerald-400">
            <Check size={16} />
            <span>File Berhasil Diunggah ke Cloudinary!</span>
          </div>

          <div className="space-y-2 text-muted">
            <div>
              <span className="block text-[11px]">Cloudinary Public ID:</span>
              <code className="font-mono text-foreground">{uploadResult.public_id}</code>
            </div>

            <div>
              <span className="block text-[11px]">Secure CDN URL:</span>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  readOnly
                  value={uploadResult.secure_url}
                  className="flex-1 rounded-lg border border-border bg-surface px-3 py-1.5 font-mono text-[11px] text-foreground"
                />
                <button
                  onClick={() => handleCopyUrl(uploadResult.secure_url)}
                  className="flex items-center gap-1 rounded-lg bg-surface-secondary px-3 py-1.5 font-semibold text-foreground hover:bg-surface-hover"
                >
                  <Copy size={13} /> {copied ? "Disalin!" : "Salin"}
                </button>
                <a
                  href={uploadResult.secure_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 rounded-lg bg-primary/20 text-primary px-3 py-1.5 font-semibold hover:bg-primary/30"
                >
                  <ExternalLink size={13} /> Buka
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

