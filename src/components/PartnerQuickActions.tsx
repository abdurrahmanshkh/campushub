"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Check, ExternalLink, Download, Megaphone } from "lucide-react";

interface PartnerQuickActionsProps {
  partnerCode: string;
  clubName: string;
  collegeName: string;
  siteUrl: string;
}

export function PartnerQuickActions({
  partnerCode,
  clubName,
  collegeName,
  siteUrl,
}: PartnerQuickActionsProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedWhatsApp, setCopiedWhatsApp] = useState(false);
  const partnerUrl = `${siteUrl}/r/${partnerCode}`;

  const defaultWhatsAppCopy = `Hey! Our campus tech community (${clubName} at ${collegeName}) is bringing you a free live workshop:\n\nBuild Your First AI Project in 60 Minutes.\n\nYou'll build a practical AI project step by step.\n\nRegister here:\n${partnerUrl}\n\nFeel free to share this with anyone from your batch who's interested in AI.`;

  async function handleCopyLink() {
    await navigator.clipboard.writeText(partnerUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  }

  async function handleCopyWhatsApp() {
    await navigator.clipboard.writeText(defaultWhatsAppCopy);
    setCopiedWhatsApp(true);
    setTimeout(() => setCopiedWhatsApp(false), 2500);
  }

  return (
    <div className="space-y-6">
      {/* Campaign Link Card */}
      <div className="p-6 rounded-xl bg-white border border-[#DCE1E8] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DCE1E8]">
          <div>
            <span className="text-xs font-mono text-[#2563EB] uppercase font-semibold">
              Official Campus Tracking Link
            </span>
            <h3 className="text-lg font-bold text-[#0B1220] mt-0.5">
              Your Campaign URL & QR
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/partner/campaign"
              className="h-9 px-3.5 rounded-lg bg-[#2563EB] hover:bg-[#3B82F6] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Megaphone className="w-3.5 h-3.5" />
              <span>Full Campaign Kit</span>
            </Link>
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            readOnly
            value={partnerUrl}
            className="flex-1 px-3.5 py-2.5 rounded-lg border border-[#DCE1E8] bg-gray-50 text-xs font-mono text-gray-800 select-all focus:outline-none"
          />
          <button
            type="button"
            onClick={handleCopyLink}
            className="h-10 px-4 rounded-lg bg-[#0B1220] hover:bg-[#101A33] active:scale-[0.98] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#C7F36B]" />
                <span className="text-[#C7F36B]">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Link</span>
              </>
            )}
          </button>

          <a
            href={partnerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 px-4 rounded-lg border border-[#DCE1E8] hover:bg-gray-50 text-[#0B1220] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shrink-0"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Link</span>
          </a>

          <a
            href={`/api/qr?code=${partnerCode}&format=png`}
            download={`build60_${partnerCode}_qr.png`}
            className="h-10 px-4 rounded-lg border border-[#DCE1E8] hover:bg-gray-50 text-[#0B1220] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download QR</span>
          </a>
        </div>
      </div>

      {/* Quick Launch Assets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* WhatsApp Card */}
        <div className="p-5 rounded-xl bg-white border border-[#DCE1E8] shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono text-emerald-700 uppercase font-semibold">
              WhatsApp Broadcast
            </div>
            <h4 className="font-bold text-sm text-[#0B1220] mt-1">Classroom & Batch Copy</h4>
            <p className="text-xs text-[#687386] mt-1 leading-relaxed">
              Tested peer copy tailored for WhatsApp groups.
            </p>
          </div>
          <div className="pt-4 mt-2 border-t border-[#DCE1E8]">
            <button
              type="button"
              onClick={handleCopyWhatsApp}
              className="w-full py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedWhatsApp ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied WhatsApp Message!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy WhatsApp Text</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Poster Download Card */}
        <div className="p-5 rounded-xl bg-white border border-[#DCE1E8] shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono text-[#2563EB] uppercase font-semibold">
              Printable Asset
            </div>
            <h4 className="font-bold text-sm text-[#0B1220] mt-1">A4 Campus Poster</h4>
            <p className="text-xs text-[#687386] mt-1 leading-relaxed">
              High-contrast notice board poster with your QR code.
            </p>
          </div>
          <div className="pt-4 mt-2 border-t border-[#DCE1E8]">
            <Link
              href="/partner/campaign"
              className="w-full py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#2563EB] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Generate Poster &rarr;</span>
            </Link>
          </div>
        </div>

        {/* Faculty Request Card */}
        <div className="p-5 rounded-xl bg-white border border-[#DCE1E8] shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono text-gray-700 uppercase font-semibold">
              Institutional
            </div>
            <h4 className="font-bold text-sm text-[#0B1220] mt-1">Faculty Briefing Note</h4>
            <p className="text-xs text-[#687386] mt-1 leading-relaxed">
              Formal request note for department heads without false promises.
            </p>
          </div>
          <div className="pt-4 mt-2 border-t border-[#DCE1E8]">
            <Link
              href="/partner/campaign#faculty-tool"
              className="w-full py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Megaphone className="w-3.5 h-3.5" />
              <span>View Faculty Tool &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
