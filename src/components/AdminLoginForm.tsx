"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdminAction } from "@/lib/actions";
import { Lock, Mail, AlertCircle, Loader2, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function fillDemoAdmin() {
    setEmail("admin@build60.campus");
    setPassword("AdminGrowth2025!");
    setErrorMessage(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const result = await loginAdminAction(formData);
      if (!result.success) {
        setErrorMessage(result.error || "Login failed");
        setLoading(false);
      } else {
        router.push("/admin/dashboard");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Network error during login");
      setLoading(false);
    }
  }

  return (
    <div className="bg-white border border-[#DCE1E8] rounded-xl p-6 sm:p-8 shadow-sm">
      {/* Quick Demo Access Bar */}
      <div className="mb-6 p-3.5 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-between text-xs text-amber-900">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Testing evaluation? Fill demo admin:</span>
        </div>
        <button
          type="button"
          onClick={fillDemoAdmin}
          className="px-2.5 py-1 rounded bg-[#0B1220] text-white font-mono text-[11px] font-semibold hover:bg-gray-800 transition-colors cursor-pointer"
        >
          Fill Admin
        </button>
      </div>

      {errorMessage && (
        <div
          role="alert"
          className="mb-6 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5"
        >
          <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
          <div>{errorMessage}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="admin-email" className="block text-xs font-semibold text-[#0B1220] uppercase tracking-wider mb-1.5">
            Admin Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              id="admin-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@build60.campus"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-[#DCE1E8] text-sm text-[#0B1220] focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label htmlFor="admin-password" className="block text-xs font-semibold text-[#0B1220] uppercase tracking-wider mb-1.5">
            Admin Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              id="admin-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-[#DCE1E8] text-sm text-[#0B1220] focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 flex items-center justify-center gap-2 rounded-lg bg-[#0B1220] hover:bg-[#101A33] active:scale-[0.99] text-white font-semibold text-sm transition-all shadow-sm cursor-pointer disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying Authorization...</span>
              </>
            ) : (
              <>
                <span>Enter Command Console</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        <div className="text-center pt-2">
          <Link href="/" className="text-xs text-gray-500 hover:text-gray-900">
            &larr; Back to public homepage
          </Link>
        </div>
      </form>
    </div>
  );
}
