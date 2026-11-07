"use client";

import { useState } from "react";
import Link from "next/link";
import { useToastStore } from "@/stores/toast-store";
import { Sparkles, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const { showToast } = useToastStore();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      showToast("Tautan reset kata sandi telah dikirim ke email kamu!");
    }, 800);
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-14rem)] max-w-md items-center justify-center px-4 py-12">
      <div className="w-full space-y-6 bento-card p-6 sm:p-8 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#a1f68b]">
            <Sparkles size={22} />
          </div>
          <h1 className="text-2xl font-black text-white">Reset Kata Sandi</h1>
          <p className="text-xs text-slate-400">
            Masukkan alamat email yang terdaftar untuk menerima instruksi pemulihan akun.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-center space-y-3 text-xs">
            <CheckCircle2 size={32} className="mx-auto text-emerald-400" />
            <div>
              <span className="font-bold text-white block">Email Terkirim!</span>
              <p className="text-slate-300 text-[11px] mt-1">
                Kami telah mengirimkan tautan reset kata sandi ke <strong className="text-white">{email}</strong>.
                Silakan periksa kotak masuk atau folder spam.
              </p>
            </div>
            <Link
              href="/login"
              className="inline-block rounded-full bg-white text-slate-950 px-5 py-2 text-xs font-bold hover:bg-[#a1f68b] mt-2"
            >
              Kembali ke Halaman Masuk
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-slate-400 font-semibold">Alamat Email Terdaftar</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-full border border-white/10 bg-[#0b0c12] pl-10 pr-3.5 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#a1f68b]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#a1f68b] py-3 text-xs font-bold text-slate-950 shadow-md transition-all hover:bg-[#8ef075] active:scale-95 disabled:opacity-50"
            >
              {isLoading ? "Mengirim Tautan..." : "Kirim Tautan Reset"}
            </button>
          </form>
        )}

        <div className="border-t border-white/[0.06] pt-4 text-center text-xs">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={13} /> Kembali ke Halaman Masuk
          </Link>
        </div>
      </div>
    </div>
  );
}

