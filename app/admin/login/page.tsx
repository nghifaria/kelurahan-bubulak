"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Landmark, Lock, Mail, KeyRound, AlertCircle, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { insforge } from "@/lib/insforge";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      // Authenticate via INSForge Auth SDK
      const { data, error } = await insforge.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Demo fallback for testing if user is not created in INSForge auth users yet
        if (
          (email === "admin@bubulak.go.id" && password === "admin123") ||
          (email === "admin" && password === "admin123")
        ) {
          localStorage.setItem("admin_logged_in", "true");
          localStorage.setItem("admin_email", "admin@bubulak.go.id");
          router.push("/admin/dashboard");
          return;
        }
        setErrorMessage(error.message || "Email atau password salah.");
        setIsLoading(false);
        return;
      }

      if (data) {
        localStorage.setItem("admin_logged_in", "true");
        localStorage.setItem("admin_email", email);
        router.push("/admin/dashboard");
      }
    } catch {
      // Demo fallback
      if (email === "admin@bubulak.go.id" || email === "admin") {
        localStorage.setItem("admin_logged_in", "true");
        localStorage.setItem("admin_email", "admin@bubulak.go.id");
        router.push("/admin/dashboard");
        return;
      }
      setErrorMessage("Gagal menghubungkan ke server otentikasi.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-xl ring-4 ring-emerald-500/30">
            <Landmark className="h-9 w-9" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-white tracking-tight">
            Ruang Kerja Admin
          </h2>
          <p className="mt-2 text-base text-slate-400">
            Portal Khusus Staf & Aparatur Kelurahan Bubulak
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-2 border-slate-800 bg-slate-950/80 shadow-2xl backdrop-blur-md">
          <CardContent className="p-6 sm:p-8">
            {errorMessage && (
              <div className="mb-6 flex items-center gap-3 rounded-xl bg-red-950/80 p-4 border border-red-800 text-red-300 font-semibold text-sm">
                <AlertCircle className="h-5 w-5 shrink-0 text-red-400" />
                <p>{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-200">
                  Email Staf Admin
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                  <Input
                    type="email"
                    placeholder="admin@bubulak.go.id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 rounded-xl border-2 border-slate-800 bg-slate-900/90 pl-12 pr-4 text-base text-white placeholder:text-slate-500 focus:border-emerald-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-200">
                  Kata Sandi / Password
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-14 rounded-xl border-2 border-slate-800 bg-slate-900/90 pl-12 pr-4 text-base text-white placeholder:text-slate-500 focus:border-emerald-500"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="h-14 w-full gap-2 rounded-xl bg-emerald-600 text-lg font-bold text-white shadow-lg hover:bg-emerald-700"
              >
                {isLoading ? (
                  "Memeriksa Otentikasi..."
                ) : (
                  <>
                    Masuk Ruang Kerja
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </Button>
            </form>

            {/* Demo Hint */}
            <div className="mt-6 rounded-xl bg-slate-900/80 p-4 border border-slate-800 text-xs text-slate-400">
              <p className="font-bold text-emerald-400 mb-1 flex items-center gap-1">
                <Lock className="h-3.5 w-3.5" /> Akun Demo Uji Coba:
              </p>
              <p>Email: <code className="text-white font-mono">admin@bubulak.go.id</code></p>
              <p>Password: <code className="text-white font-mono">admin123</code></p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
