"use client";

import { useState } from "react";
import { Check, Copy, Share2, CalendarPlus, ExternalLink } from "lucide-react";

interface SuccessActionsProps {
  referralCode: string;
  siteUrl: string;
  eventTitle: string;
  eventDate?: string;
  eventStartTime?: string;
}

export function SuccessActions({
  referralCode,
  siteUrl,
  eventTitle,
  eventDate,
  eventStartTime,
}: SuccessActionsProps) {
  const [copied, setCopied] = useState(false);
  const referralUrl = `${siteUrl}/r/${referralCode}`;

  const whatsappMessage = encodeURIComponent(
    `Hey! I just registered for the free workshop: "${eventTitle}". We're building a real AI project in 60 minutes.\n\nRegister with my campus link here:\n${referralUrl}`
  );

  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    referralUrl
  )}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  }

  // Google Calendar URL generator
  const startDateStr = eventDate && eventStartTime
    ? `${eventDate.replace(/-/g, "")}T${eventStartTime.replace(/:/g, "")}00`
    : "";
  const googleCalendarUrl = startDateStr
    ? `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        eventTitle
      )}&dates=${startDateStr}/${startDateStr}&details=${encodeURIComponent(
        "Build60 Hands-on Live AI Project Session. Join link will be dispatched before start."
      )}`
    : "#";

  return (
    <div className="space-y-6">
      {/* Calendar Action Strip */}
      <div className="p-4 rounded-xl bg-white border border-[#DCE1E8] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-[#687386] uppercase font-semibold">
            Next Action
          </div>
          <div className="text-sm font-bold text-[#0B1220] mt-0.5">
            Add the 60-minute build session to your calendar
          </div>
        </div>

        {startDateStr ? (
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 px-4 rounded-lg bg-[#2563EB] hover:bg-[#3B82F6] text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shrink-0"
          >
            <CalendarPlus className="w-4 h-4" />
            <span>Add to Google Calendar</span>
          </a>
        ) : (
          <button
            type="button"
            className="h-10 px-4 rounded-lg bg-gray-100 text-gray-700 text-xs font-semibold cursor-not-allowed shrink-0"
            disabled
          >
            Schedule announced soon
          </button>
        )}
      </div>

      {/* Secondary Referral Module */}
      <div className="p-6 rounded-xl bg-white border border-[#DCE1E8] shadow-sm space-y-4">
        <div>
          <span className="text-xs font-mono text-emerald-700 uppercase font-semibold">
            Campus Referral
          </span>
          <h3 className="text-lg font-bold text-[#0B1220] mt-1">
            Know 2 friends who would build this with you?
          </h3>
          <p className="text-xs text-[#687386] mt-1 leading-relaxed">
            Invite classmates from your batch or branch. Every registration through your unique link credits back to your campus tech community.
          </p>
        </div>

        {/* Unique Link Input + Copy Button */}
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            readOnly
            value={referralUrl}
            className="flex-1 px-3.5 py-2.5 rounded-lg border border-[#DCE1E8] bg-gray-50 text-xs font-mono text-gray-800 select-all focus:outline-none"
          />
          <button
            type="button"
            onClick={handleCopy}
            className="h-10 px-5 rounded-lg bg-[#0B1220] hover:bg-[#101A33] active:scale-[0.98] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#C7F36B]" />
                <span className="text-[#C7F36B]">Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy My Link</span>
              </>
            )}
          </button>
        </div>

        {/* Social Share Buttons */}
        <div className="flex flex-wrap gap-2 pt-2">
          <a
            href={`https://api.whatsapp.com/send?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 px-4 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share via WhatsApp</span>
          </a>

          <a
            href={linkedInShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 px-4 rounded-md bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Post on LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  );
}
