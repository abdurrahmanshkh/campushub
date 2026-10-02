"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerStudentAction } from "@/lib/actions";
import { CheckCircle2, AlertCircle, ArrowRight, Loader2, Sparkles, UserCheck } from "lucide-react";

interface RegistrationFormProps {
  initialPartnerCode?: string;
  initialStudentRef?: string;
  partnerClubName?: string;
  partnerCollegeName?: string;
  source?: string;
  className?: string;
}

export function RegistrationForm({
  initialPartnerCode = "",
  initialStudentRef = "",
  partnerClubName,
  partnerCollegeName,
  source = "web",
  className = "",
}: RegistrationFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    try {
      const result = await registerStudentAction(formData);
      if (!result.success) {
        setErrorMessage(result.error || "Failed to complete registration.");
        setLoading(false);
      } else {
        // Redirect to success page with query params
        const params = new URLSearchParams({
          id: result.registrationId || "",
          code: result.studentReferralCode || "",
          name: result.name || "",
          college: result.college || "",
        });
        router.push(`/register/success?${params.toString()}`);
      }
    } catch (err) {
      console.error("Submission error:", err);
      setErrorMessage("A network error occurred while submitting your registration. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className={`bg-white border border-[#DCE1E8] rounded-xl p-6 sm:p-8 shadow-sm ${className}`}>
      {/* Attribution Context Strip */}
      {initialPartnerCode ? (
        <div className="mb-6 p-3 rounded-lg bg-blue-50/80 border border-blue-200/60 flex items-start gap-2.5 text-xs text-blue-900">
          <UserCheck className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
          <div>
            <span className="font-semibold">Attributed Campaign Link: </span>
            {partnerClubName && partnerCollegeName ? (
              <span>
                Supported by <span className="font-semibold">{partnerClubName}</span> ({partnerCollegeName})
              </span>
            ) : (
              <span>
                Partner Code <span className="font-mono font-bold">{initialPartnerCode}</span>
              </span>
            )}
            {initialStudentRef && (
              <span className="block mt-0.5 text-blue-700 font-mono">
                Secondary Referral Node: {initialStudentRef}
              </span>
            )}
          </div>
        </div>
      ) : initialStudentRef ? (
        <div className="mb-6 p-3 rounded-lg bg-emerald-50/80 border border-emerald-200/60 flex items-start gap-2.5 text-xs text-emerald-900">
          <Sparkles className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
          <div>
            <span className="font-semibold">Student Referral Active: </span>
            You are registering via peer link <span className="font-mono font-bold">{initialStudentRef}</span>.
          </div>
        </div>
      ) : null}

      <div className="mb-6">
        <h3 className="text-xl font-bold text-[#0B1220] tracking-tight">
          Claim Your Workshop Seat
        </h3>
        <p className="text-xs text-[#687386] mt-1">
          Free hands-on workshop &bull; 60 minutes &bull; Live build session
        </p>
      </div>

      {errorMessage && (
        <div
          role="alert"
          className="mb-6 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5"
        >
          <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
          <div className="leading-relaxed">{errorMessage}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Hidden Attribution Fields */}
        <input type="hidden" name="partnerCode" value={initialPartnerCode} />
        <input type="hidden" name="studentRef" value={initialStudentRef} />
        <input type="hidden" name="source" value={source} />

        {/* Full Name */}
        <div>
          <label htmlFor="reg-name" className="block text-xs font-semibold text-[#0B1220] uppercase tracking-wider mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="reg-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="e.g. Rahul Sharma"
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE1E8] text-sm text-[#0B1220] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="reg-email" className="block text-xs font-semibold text-[#0B1220] uppercase tracking-wider mb-1.5">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="reg-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="rahul@college.edu or personal email"
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE1E8] text-sm text-[#0B1220] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
          />
        </div>

        {/* College Name */}
        <div>
          <label htmlFor="reg-college" className="block text-xs font-semibold text-[#0B1220] uppercase tracking-wider mb-1.5">
            College / University <span className="text-red-500">*</span>
          </label>
          <input
            id="reg-college"
            name="college"
            type="text"
            required
            defaultValue={partnerCollegeName || ""}
            placeholder="e.g. Northstar Engineering College"
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE1E8] text-sm text-[#0B1220] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
          />
        </div>

        {/* Graduation Year & Branch */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="reg-year" className="block text-xs font-semibold text-[#0B1220] uppercase tracking-wider mb-1.5">
              Graduation Year <span className="text-red-500">*</span>
            </label>
            <select
              id="reg-year"
              name="graduationYear"
              required
              defaultValue="2025"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE1E8] text-sm text-[#0B1220] bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            >
              <option value="2024">2024 (Graduated)</option>
              <option value="2025">2025 (Final Year)</option>
              <option value="2026">2026 (Pre-final)</option>
              <option value="2027">2027 (Second Year)</option>
              <option value="2028">2028 (First Year)</option>
            </select>
          </div>

          <div>
            <label htmlFor="reg-branch" className="block text-xs font-semibold text-[#0B1220] uppercase tracking-wider mb-1.5">
              Branch / Major <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <input
              id="reg-branch"
              name="branch"
              type="text"
              placeholder="e.g. CSE / IT / ECE"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE1E8] text-sm text-[#0B1220] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Phone / WhatsApp (Optional) */}
        <div>
          <label htmlFor="reg-phone" className="block text-xs font-semibold text-[#0B1220] uppercase tracking-wider mb-1.5">
            Phone / WhatsApp <span className="text-gray-400 font-normal">(For workshop reminder link)</span>
          </label>
          <input
            id="reg-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE1E8] text-sm text-[#0B1220] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] hover:bg-[#3B82F6] active:scale-[0.99] text-white font-semibold text-sm transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Confirming Registration...</span>
              </>
            ) : (
              <>
                <span>Complete Free Registration</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-[11px] text-[#687386] font-mono pt-1 text-center">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Zero Cost &bull; Instant Confirmation &bull; Calendar Invite</span>
        </div>
      </form>
    </div>
  );
}
