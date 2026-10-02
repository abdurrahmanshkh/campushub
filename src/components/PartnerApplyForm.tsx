"use client";

import { useState } from "react";
import { applyPartnerAction } from "@/lib/actions";
import { CheckCircle2, AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

export function PartnerApplyForm() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedClub, setSubmittedClub] = useState<{
    code: string;
    clubName: string;
    collegeName: string;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    try {
      const result = await applyPartnerAction(formData);
      if (!result.success) {
        setErrorMessage(result.error || "Failed to submit application");
        setLoading(false);
      } else {
        setSubmittedClub({
          code: result.code || "",
          clubName: result.clubName || "",
          collegeName: result.collegeName || "",
        });
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Network error during submission. Please try again.");
      setLoading(false);
    }
  }

  if (submittedClub) {
    return (
      <div className="bg-white border border-[#DCE1E8] rounded-xl p-8 shadow-sm text-center space-y-5">
        <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 rounded bg-emerald-50 text-emerald-800 text-xs font-mono font-bold uppercase tracking-wider">
            APPLICATION RECEIVED
          </span>
          <h2 className="text-2xl font-bold text-[#0B1220]">
            {submittedClub.clubName}
          </h2>
          <p className="text-sm text-[#687386] max-w-md mx-auto">
            Your application for {submittedClub.collegeName} has been recorded in the Build60 growth system.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-[#F7F7F3] border border-[#DCE1E8] max-w-md mx-auto text-left space-y-2 text-xs text-gray-700">
          <div className="flex justify-between font-mono">
            <span className="text-gray-500">Reserved Partner Code:</span>
            <span className="font-bold text-[#2563EB]">{submittedClub.code}</span>
          </div>
          <div className="flex justify-between font-mono">
            <span className="text-gray-500">Review Window:</span>
            <span className="font-medium text-gray-900">Within 24 Hours</span>
          </div>
          <p className="text-[11px] text-gray-500 pt-1 border-t border-[#DCE1E8]">
            Once approved by the campaign director, your credentials and personalized campaign kit will be activated.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/partner/login"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#3B82F6] text-white text-xs font-semibold transition-colors"
          >
            <span>Go to Partner Login</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#DCE1E8] rounded-xl p-6 sm:p-8 shadow-sm">
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
        {/* Club Name & College */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="p-club" className="block text-xs font-semibold text-[#0B1220] uppercase tracking-wider mb-1.5">
              Club / Community Name <span className="text-red-500">*</span>
            </label>
            <input
              id="p-club"
              name="clubName"
              type="text"
              required
              placeholder="e.g. GDG on Campus, ACM Chapter"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE1E8] text-sm text-[#0B1220] focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="p-college" className="block text-xs font-semibold text-[#0B1220] uppercase tracking-wider mb-1.5">
              College / University Name <span className="text-red-500">*</span>
            </label>
            <input
              id="p-college"
              name="collegeName"
              type="text"
              required
              placeholder="e.g. Demo Institute of Technology"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE1E8] text-sm text-[#0B1220] focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>
        </div>

        {/* City & Club Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="p-city" className="block text-xs font-semibold text-[#0B1220] uppercase tracking-wider mb-1.5">
              City / State <span className="text-red-500">*</span>
            </label>
            <input
              id="p-city"
              name="city"
              type="text"
              required
              placeholder="e.g. Bengaluru, Karnataka"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE1E8] text-sm text-[#0B1220] focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="p-type" className="block text-xs font-semibold text-[#0B1220] uppercase tracking-wider mb-1.5">
              Club Type <span className="text-red-500">*</span>
            </label>
            <select
              id="p-type"
              name="clubType"
              required
              defaultValue="GDG on Campus"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE1E8] text-sm text-[#0B1220] bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
            >
              <option value="GDG on Campus">GDG on Campus</option>
              <option value="CSI">CSI (Computer Society of India)</option>
              <option value="IEEE">IEEE Student Branch</option>
              <option value="ACM">ACM Student Chapter</option>
              <option value="Google Developer community">Google Developer Community</option>
              <option value="Coding club">Campus Coding Club</option>
              <option value="AI/ML club">AI / ML / Data Science Club</option>
              <option value="Other">Other Tech Community</option>
            </select>
          </div>
        </div>

        {/* Website & Community Size */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="p-web" className="block text-xs font-semibold text-[#0B1220] uppercase tracking-wider mb-1.5">
              Club Website or Instagram Link <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <input
              id="p-web"
              name="websiteUrl"
              type="url"
              placeholder="https://instagram.com/myclub"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE1E8] text-sm text-[#0B1220] focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="p-size" className="block text-xs font-semibold text-[#0B1220] uppercase tracking-wider mb-1.5">
              Approximate Community Size <span className="text-red-500">*</span>
            </label>
            <input
              id="p-size"
              name="approximateCommunitySize"
              type="number"
              min="10"
              required
              defaultValue="500"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE1E8] text-sm text-[#0B1220] focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Lead Organizer Info */}
        <div className="pt-2 border-t border-[#DCE1E8]/60">
          <div className="text-xs font-bold text-[#0B1220] uppercase tracking-wider mb-3">
            Lead Student Organizer Details
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="p-lead" className="block text-xs font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="p-lead"
                name="leadName"
                type="text"
                required
                placeholder="Arjun Verma"
                className="w-full px-3.5 py-2 rounded-lg border border-[#DCE1E8] text-sm text-[#0B1220] focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="p-email" className="block text-xs font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="p-email"
                name="email"
                type="email"
                required
                placeholder="arjun@college.edu"
                className="w-full px-3.5 py-2 rounded-lg border border-[#DCE1E8] text-sm text-[#0B1220] focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="p-phone" className="block text-xs font-medium text-gray-700 mb-1">
                Phone / WhatsApp <span className="text-red-500">*</span>
              </label>
              <input
                id="p-phone"
                name="phone"
                type="tel"
                required
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2 rounded-lg border border-[#DCE1E8] text-sm text-[#0B1220] focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Faculty Coordinator (Optional) */}
        <div className="pt-2 border-t border-[#DCE1E8]/60">
          <div className="text-xs font-bold text-[#0B1220] uppercase tracking-wider mb-2">
            Faculty Coordinator <span className="text-gray-400 font-normal font-sans">(Optional)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input
                name="facultyName"
                type="text"
                placeholder="Faculty Advisor Name (e.g. Dr. K. Ramanathan)"
                className="w-full px-3.5 py-2 rounded-lg border border-[#DCE1E8] text-xs text-[#0B1220] focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
            <div>
              <input
                name="facultyEmail"
                type="email"
                placeholder="Faculty Email (e.g. hod.cse@college.edu)"
                className="w-full px-3.5 py-2 rounded-lg border border-[#DCE1E8] text-xs text-[#0B1220] focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Collaboration Reason */}
        <div>
          <label htmlFor="p-reason" className="block text-xs font-semibold text-[#0B1220] uppercase tracking-wider mb-1.5">
            Why do you want to collaborate with Build60? <span className="text-red-500">*</span>
          </label>
          <textarea
            id="p-reason"
            name="applicationReason"
            required
            rows={3}
            placeholder="Tell us about your campus tech community and what you want your members to get out of building their first AI project..."
            className="w-full px-3.5 py-2 rounded-lg border border-[#DCE1E8] text-sm text-[#0B1220] focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </div>

        {/* Authorization Checkbox */}
        <div className="flex items-start gap-2 pt-1">
          <input
            id="p-auth"
            name="authorized"
            type="checkbox"
            required
            className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="p-auth" className="text-xs text-gray-700 leading-relaxed cursor-pointer">
            I confirm that I am an authorized lead organizer submitting this campaign application on behalf of our campus club or chapter.
          </label>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] hover:bg-[#3B82F6] active:scale-[0.99] text-white font-semibold text-sm transition-all shadow-sm cursor-pointer disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Recording Application...</span>
              </>
            ) : (
              <>
                <span>Submit Club Application</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
