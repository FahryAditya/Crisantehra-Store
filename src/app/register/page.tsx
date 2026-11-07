"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, Lock, Mail, User, Phone, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import { useToastStore } from "@/stores/toast-store";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const { addToast } = useToastStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("Konfirmasi kata sandi tidak cocok.");
      return;
    }

    if (password.length < 8) {
      setErrorMsg("Kata sandi minimal 8 karakter demi keamanan.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.error || "Gagal melakukan registrasi.");
        setIsLoading(false);
        return;
      }

      // Update client session store
      login(data.user);

      addToast({
        title: "Pendaftaran Berhasil",
        message: `Selamat datang di Crisanthera Store, ${data.user.name}!`,
        type: "success",
      });

      router.push("/dashboard");
    } catch (err) {
      setErrorMsg("Terjadi gangguan koneksi ke server. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-14rem)] max-w-md items-center justify-center px-4 py-12">
      <div className="w-full space-y-6 bento-card p-6 sm:p-8 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#a1f68b]">
            <Sparkles size={22} />
          </div>
          <h1 className="text-2xl font-black text-white">Daftar Akun Baru</h1>
          <p className="text-xs text-slate-400">
            Bergabunglah untuk membeli stiker anime dan mengakses template Next.js eksklusif.
          </p>
        </div>

        {errorMsg && (
          <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-400">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-3.5 text-xs">
          <div className="space-y-1">
            <label className="text-slate-300 font-semibold">Nama Lengkap</label>
            <div className="relative">
              <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Alya Renanta"
                className="w-full rounded-xl border border-white/10 bg-[#181b28] pl-10 pr-3.5 py-2.5 text-white placeholder-slate-500 focus:border-[#a1f68b] focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-slate-300 font-semibold">Alamat Email</label>
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full rounded-xl border border-white/10 bg-[#181b28] pl-10 pr-3.5 py-2.5 text-white placeholder-slate-500 focus:border-[#a1f68b] focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-slate-300 font-semibold">Nomor WhatsApp / Ponsel (Opsional)</label>
            <div className="relative">
              <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+62 812-3456-7890"
                className="w-full rounded-xl border border-white/10 bg-[#181b28] pl-10 pr-3.5 py-2.5 text-white placeholder-slate-500 focus:border-[#a1f68b] focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-slate-300 font-semibold">Kata Sandi (Min. 8 Karakter)</label>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-[#181b28] pl-10 pr-10 py-2.5 text-white placeholder-slate-500 focus:border-[#a1f68b] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-slate-300 font-semibold">Konfirmasi Kata Sandi</label>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-[#181b28] pl-10 pr-3.5 py-2.5 text-white placeholder-slate-500 focus:border-[#a1f68b] focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#a1f68b] py-3 text-xs font-bold text-slate-950 shadow-md hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 mt-4"
          >
            <span>{isLoading ? "Mendaftarkan Akun..." : "Buat Akun Sekarang"}</span>
            <ArrowRight size={14} />
          </button>
        </form>

        <div className="text-center text-xs text-slate-400">
          Sudah memiliki akun?{" "}
          <Link href="/login" className="font-semibold text-[#a1f68b] hover:underline">
            Masuk di Sini
          </Link>
        </div>
      </div>
    </div>
  );
}
