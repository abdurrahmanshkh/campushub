"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginPartnerAction } from "@/lib/actions";
import { Lock, Mail, AlertCircle, Loader2, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function PartnerLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function fillDemoCredentials() {
    setEmail("lead@northstar.demo");
    setPassword("Partner2025!");
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
      const result = await loginPartnerAction(formData);
      if (!result.success) {
        setErrorMessage(result.error || "Login failed");
        setLoading(false);
      } else {
        router.push("/partner/dashboard");
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
      <div className="mb-6 p-3.5 rounded-lg bg-blue-50/80 border border-blue-200/60 flex items-center justify-between text-xs text-blue-900">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#2563EB]" />
          <span>Testing evaluation? Fill demo lead credentials:</span>
        </div>
        <button
          type="button"
          onClick={fillDemoCredentials}
          className="px-2.5 py-1 rounded bg-[#2563EB] text-white font-mono text-[11px] font-semibold hover:bg-[#3B82F6] transition-colors cursor-pointer"
        >
          Fill Demo
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
          <label htmlFor="partner-email" className="block text-xs font-semibold text-[#0B1220] uppercase tracking-wider mb-1.5">
            Partner Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              id="partner-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="lead@college.demo"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-[#DCE1E8] text-sm text-[#0B1220] focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label htmlFor="partner-password" className="block text-xs font-semibold text-[#0B1220] uppercase tracking-wider mb-1.5">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              id="partner-password"
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
            className="w-full h-11 flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] hover:bg-[#3B82F6] active:scale-[0.99] text-white font-semibold text-sm transition-all shadow-sm cursor-pointer disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Access Partner Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        <div className="text-center pt-2">
          <Link
            href="/partner/apply"
            className="text-xs text-[#2563EB] hover:underline"
          >
            Don&apos;t have a partner account yet? Apply your club &rarr;
          </Link>
        </div>
      </form>
    </div>
  );
}
