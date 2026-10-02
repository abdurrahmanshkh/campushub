"use client";

import { useState } from "react";
import { updateEventSettingsAction } from "@/lib/actions";
import { EventConfig } from "@/types";
import { CheckCircle2, AlertCircle, Loader2, Save } from "lucide-react";

export function AdminSettingsForm({ event }: { event: EventConfig }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSuccess(false);
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    try {
      const res = await updateEventSettingsAction(formData);
      if (res.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(res.error || "Failed to update event settings");
      }
    } catch (err) {
      console.error(err);
      setError("Network error while saving settings");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white border border-[#DCE1E8] rounded-xl p-6 sm:p-8 shadow-sm">
      {success && (
        <div
          role="status"
          className="mb-6 p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Workshop parameters updated successfully! Changes are live across all public pages.</span>
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="mb-6 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title & Subhead */}
        <div>
          <label htmlFor="ev-title" className="block text-xs font-semibold text-[#0B1220] uppercase tracking-wider mb-1.5">
            Workshop Title
          </label>
          <input
            id="ev-title"
            name="title"
            type="text"
            required
            defaultValue={event.title}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE1E8] text-sm text-[#0B1220] focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="ev-desc" className="block text-xs font-semibold text-[#0B1220] uppercase tracking-wider mb-1.5">
            Workshop Description / Subheadline
          </label>
          <textarea
            id="ev-desc"
            name="description"
            rows={3}
            defaultValue={event.description}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE1E8] text-sm text-[#0B1220] focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </div>

        {/* Date, Times & Timezone */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label htmlFor="ev-date" className="block text-xs font-semibold text-[#0B1220] uppercase tracking-wider mb-1.5">
              Event Date (YYYY-MM-DD)
            </label>
            <input
              id="ev-date"
              name="date"
              type="date"
              defaultValue={event.date || ""}
              className="w-full px-3.5 py-2 rounded-lg border border-[#DCE1E8] text-xs text-[#0B1220] focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="ev-start" className="block text-xs font-semibold text-[#0B1220] uppercase tracking-wider mb-1.5">
              Start Time (24h)
            </label>
            <input
              id="ev-start"
              name="startTime"
              type="time"
              defaultValue={event.startTime || ""}
              className="w-full px-3.5 py-2 rounded-lg border border-[#DCE1E8] text-xs text-[#0B1220] focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="ev-end" className="block text-xs font-semibold text-[#0B1220] uppercase tracking-wider mb-1.5">
              End Time (24h)
            </label>
            <input
              id="ev-end"
              name="endTime"
              type="time"
              defaultValue={event.endTime || ""}
              className="w-full px-3.5 py-2 rounded-lg border border-[#DCE1E8] text-xs text-[#0B1220] focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="ev-tz" className="block text-xs font-semibold text-[#0B1220] uppercase tracking-wider mb-1.5">
              Timezone
            </label>
            <input
              id="ev-tz"
              name="timezone"
              type="text"
              defaultValue={event.timezone || "IST"}
              className="w-full px-3.5 py-2 rounded-lg border border-[#DCE1E8] text-xs text-[#0B1220] focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Mode, Registration Status & Targets */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label htmlFor="ev-mode" className="block text-xs font-semibold text-[#0B1220] uppercase tracking-wider mb-1.5">
              Event Mode
            </label>
            <select
              id="ev-mode"
              name="mode"
              defaultValue={event.mode}
              className="w-full px-3.5 py-2 rounded-lg border border-[#DCE1E8] text-xs text-[#0B1220] bg-white focus:outline-none"
            >
              <option value="Online">Online Interactive</option>
              <option value="Hybrid">Hybrid</option>
              <option value="In-Person">In-Person</option>
            </select>
          </div>

          <div>
            <label htmlFor="ev-target" className="block text-xs font-semibold text-[#0B1220] uppercase tracking-wider mb-1.5">
              Registration Target
            </label>
            <input
              id="ev-target"
              name="registrationTarget"
              type="number"
              defaultValue={event.registrationTarget}
              className="w-full px-3.5 py-2 rounded-lg border border-[#DCE1E8] text-xs text-[#0B1220] font-mono focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="ev-stretch" className="block text-xs font-semibold text-[#0B1220] uppercase tracking-wider mb-1.5">
              Stretch Target
            </label>
            <input
              id="ev-stretch"
              name="stretchTarget"
              type="number"
              defaultValue={event.stretchTarget}
              className="w-full px-3.5 py-2 rounded-lg border border-[#DCE1E8] text-xs text-[#0B1220] font-mono focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="ev-status" className="block text-xs font-semibold text-[#0B1220] uppercase tracking-wider mb-1.5">
              Registration Status
            </label>
            <select
              id="ev-status"
              name="registrationOpen"
              defaultValue={event.registrationOpen ? "true" : "false"}
              className="w-full px-3.5 py-2 rounded-lg border border-[#DCE1E8] text-xs text-[#0B1220] bg-white focus:outline-none"
            >
              <option value="true">Open for Registrations</option>
              <option value="false">Closed / Paused</option>
            </select>
          </div>
        </div>

        {/* CTA Text */}
        <div>
          <label htmlFor="ev-cta" className="block text-xs font-semibold text-[#0B1220] uppercase tracking-wider mb-1.5">
            Registration Button CTA Text
          </label>
          <input
            id="ev-cta"
            name="ctaText"
            type="text"
            defaultValue={event.ctaText || "Claim Your Workshop Seat"}
            className="w-full px-3.5 py-2 rounded-lg border border-[#DCE1E8] text-xs text-[#0B1220] focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="h-11 px-6 rounded-lg bg-[#2563EB] hover:bg-[#3B82F6] active:scale-[0.99] text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-sm cursor-pointer disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Parameters...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Live Workshop Parameters</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
