"use client";

import { useState } from "react";
import {
  Copy,
  Check,
  Download,
  Printer,
  Share2,
  Mail,
  GraduationCap,
  Smartphone,
  MessageSquare,
} from "lucide-react";

interface CampaignKitInteractiveProps {
  partnerCode: string;
  clubName: string;
  collegeName: string;
  eventTitle: string;
  eventDate?: string;
  eventStartTime?: string;
  eventTimezone?: string;
  siteUrl: string;
}

export function CampaignKitInteractive({
  partnerCode,
  clubName,
  collegeName,
  eventTitle,
  eventDate,
  eventStartTime,
  eventTimezone = "IST",
  siteUrl,
}: CampaignKitInteractiveProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const partnerUrl = `${siteUrl}/r/${partnerCode}`;
  const qrPngUrl = `/api/qr?code=${partnerCode}&format=png`;
  const qrSvgUrl = `/api/qr?code=${partnerCode}&format=svg`;

  const dateDisplay = eventDate && eventStartTime
    ? `${eventDate} at ${eventStartTime} ${eventTimezone}`
    : "Date & Time will be announced shortly";

  // 1. WhatsApp Copy
  const whatsappCopy = `Hey! Our campus tech community (${clubName} at ${collegeName}) is bringing you a free live workshop:\n\nBuild Your First AI Project in 60 Minutes.\n\nYou'll build a practical AI project step by step.\n\nDate: ${dateDisplay}\nFormat: Online Live Session\nFee: 100% Free\n\nRegister here:\n${partnerUrl}\n\nFeel free to share this with anyone from your batch who's interested in AI.`;

  // 2. Instagram Story Copy
  const instagramCopy = `⚡ BUILD YOUR FIRST AI PROJECT IN 60 MINS\n\nHosted with ${clubName} @ ${collegeName}\n\n✦ 100% Free Live Workshop\n✦ Hands-on Project Build\n✦ For Final-Year Engineers\n\n📅 ${dateDisplay}\n\n🔗 Link in Bio or DM for Registration:\n${partnerUrl}`;

  // 3. LinkedIn Post Copy
  const linkedInCopy = `Excited to announce that ${clubName} at ${collegeName} is hosting a practical developer workshop: "Build Your First AI Project in 60 Minutes".\n\nDesigned specifically for engineering students looking to move beyond theoretical AI and build a working application from the ground up.\n\nKey session highlights:\n• Hands-on project build in 60 minutes\n• Architecture breakdown for modern AI workflows\n• Practical codebase you can keep expanding\n\n📅 ${dateDisplay}\n🌐 Format: Free Online Build Sprint\n\nSecure your seat here:\n${partnerUrl}\n\n#AI #Engineering #DeveloperCommunity #StudentProjects #CampusSprint`;

  // 4. Email Announcement
  const emailSubject = `[Free Workshop] Build Your First AI Project in 60 Minutes - Hosted by ${clubName}`;
  const emailBody = `Dear Students,\n\n${clubName} at ${collegeName} is organizing a free technical workshop: "Build Your First AI Project in 60 Minutes".\n\nThis practical, hands-on session is designed for final-year engineering students who want to move from talking about AI to actually building something tangible.\n\nSession Overview:\n• Date & Time: ${dateDisplay}\n• Format: Live Interactive Online Session\n• Cost: Completely Free\n• Outcome: A functioning AI project running on your computer\n\nRegistration Link:\n${partnerUrl}\n\nBest regards,\n${clubName} Organizing Team\n${collegeName}`;

  // 5. Faculty Request Message
  const facultySubject = `Briefing Note: Free Technical AI Workshop for Engineering Students - Request for Department Circular`;
  const facultyBody = `Respected Sir/Madam,\n\nOur student technical chapter, ${clubName} at ${collegeName}, is organizing campus participation for a free, hands-on technical workshop titled "Build Your First AI Project in 60 Minutes".\n\nObjective:\nThis session provides final-year engineering students with practical exposure to building and deploying real AI applications, helping bridge the gap between classroom computer science concepts and industry developer workflows.\n\nKey Details:\n• Workshop Title: Build Your First AI Project in 60 Minutes\n• Schedule: ${dateDisplay}\n• Mode: Online Interactive Workshop\n• Financial Commitment: Nil (100% Free for all students)\n• Registration Portal: ${partnerUrl}\n\nWe would appreciate your kind support in encouraging interested students from our department to participate. Any attendance or academic recognition is subject to institutional policy.\n\nThank you for your guidance and encouragement.\n\nSincerely,\nStudent Lead, ${clubName}\n${collegeName}`;

  // 6. Campus Short Announcement (Discord/Telegram)
  const shortCopy = `🚀 ${clubName} x Build60 Workshop\n"Build Your First AI Project in 60 Minutes"\nFree live build sprint. Register here: ${partnerUrl}`;

  async function copyText(text: string, key: string) {
    await navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  }

  function handlePrintPoster() {
    window.print();
  }

  return (
    <div className="space-y-10">
      {/* ========================================================
          A4 POSTER GENERATOR PREVIEW
          ======================================================== */}
      <div className="p-6 sm:p-8 rounded-xl bg-white border border-[#DCE1E8] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DCE1E8]">
          <div>
            <span className="text-xs font-mono text-[#2563EB] uppercase font-bold tracking-wider">
              Asset 01 &bull; Printable Notice Board Poster
            </span>
            <h3 className="text-lg font-bold text-[#0B1220] mt-0.5">
              A4 Campus Event Poster
            </h3>
            <p className="text-xs text-[#687386]">
              Pre-rendered with your club name and high-contrast scannable QR code
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handlePrintPoster}
              className="h-9 px-3.5 rounded-lg bg-[#0B1220] hover:bg-[#101A33] active:scale-[0.98] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Poster (A4)</span>
            </button>

            <a
              href={qrPngUrl}
              download={`build60_${partnerCode}_qr.png`}
              className="h-9 px-3.5 rounded-lg border border-[#DCE1E8] hover:bg-gray-50 text-[#0B1220] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PNG QR</span>
            </a>

            <a
              href={qrSvgUrl}
              download={`build60_${partnerCode}_qr.svg`}
              className="h-9 px-3.5 rounded-lg border border-[#DCE1E8] hover:bg-gray-50 text-[#0B1220] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download SVG QR</span>
            </a>
          </div>
        </div>

        {/* Poster Printable Container */}
        <div className="max-w-md mx-auto p-8 rounded-xl bg-white border-2 border-[#0B1220] shadow-md text-[#0B1220] print:border-none print:shadow-none print:p-0 space-y-6">
          {/* Poster Header */}
          <div className="flex items-center justify-between border-b-2 border-[#0B1220] pb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#2563EB] text-white flex items-center justify-center font-extrabold text-sm font-mono">
                60
              </div>
              <span className="font-extrabold tracking-tight text-xl text-[#0B1220]">
                BUILD<span className="text-[#2563EB]">60</span>
              </span>
            </div>

            <div className="text-right">
              <span className="px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-blue-900 text-[10px] font-mono font-bold uppercase tracking-wider">
                FREE LIVE WORKSHOP
              </span>
            </div>
          </div>

          {/* Headline & Partner Info */}
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B1220] leading-tight">
              {eventTitle}
            </h2>

            <div className="p-3 rounded-lg bg-gray-50 border border-[#DCE1E8] text-xs">
              <div className="text-[10px] font-mono text-[#687386] uppercase">
                HOSTED IN COLLABORATION WITH
              </div>
              <div className="font-bold text-[#0B1220] text-sm mt-0.5">
                {clubName}
              </div>
              <div className="text-gray-600 font-medium">
                {collegeName}
              </div>
            </div>
          </div>

          {/* Schedule Badges */}
          <div className="grid grid-cols-2 gap-2 text-xs border-y border-[#DCE1E8] py-3 font-mono">
            <div>
              <span className="text-gray-500 uppercase text-[10px]">SCHEDULE:</span>
              <div className="font-bold text-gray-900">{dateDisplay}</div>
            </div>
            <div>
              <span className="text-gray-500 uppercase text-[10px]">FORMAT:</span>
              <div className="font-bold text-gray-900">Online Interactive Sprint</div>
            </div>
          </div>

          {/* High Contrast QR Code Block */}
          <div className="flex flex-col items-center justify-center p-5 rounded-xl bg-gray-50 border border-[#DCE1E8] space-y-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrPngUrl}
              alt={`Scan QR to register for Build60 workshop with ${clubName}`}
              className="w-44 h-44 border-2 border-[#0B1220] p-2 bg-white rounded-lg shadow-sm"
            />
            <div className="text-center space-y-0.5">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0B1220]">
                Scan to Register Free
              </div>
              <div className="text-[10px] font-mono text-gray-500 truncate max-w-xs">
                {partnerUrl}
              </div>
            </div>
          </div>

          {/* Poster Footer */}
          <div className="text-center pt-2 border-t border-[#DCE1E8] text-[10px] font-mono text-gray-500">
            A Hands-on Project Initiative for Final-Year Engineers &bull; Zero Tuition Fee
          </div>
        </div>
      </div>

      {/* ========================================================
          WHATSAPP & INSTAGRAM STORY SECTION
          ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* WhatsApp Card */}
        <div className="p-6 rounded-xl bg-white border border-[#DCE1E8] shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE1E8]">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-600" />
                <h4 className="font-bold text-sm text-[#0B1220]">WhatsApp Batch Copy</h4>
              </div>
              <span className="text-[10px] font-mono uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Verified
              </span>
            </div>
            <pre className="mt-4 p-3.5 rounded-lg bg-gray-50 border border-[#DCE1E8] text-xs text-gray-800 whitespace-pre-wrap font-sans leading-relaxed">
              {whatsappCopy}
            </pre>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => copyText(whatsappCopy, "whatsapp")}
              className="w-full h-10 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              {copiedKey === "whatsapp" ? (
                <>
                  <Check className="w-4 h-4 text-[#C7F36B]" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy WhatsApp Message</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Instagram Story Copy */}
        <div className="p-6 rounded-xl bg-white border border-[#DCE1E8] shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE1E8]">
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-pink-600" />
                <h4 className="font-bold text-sm text-[#0B1220]">Instagram Story / Caption</h4>
              </div>
              <span className="text-[10px] font-mono uppercase text-pink-700 bg-pink-50 px-2 py-0.5 rounded">
                Social
              </span>
            </div>
            <pre className="mt-4 p-3.5 rounded-lg bg-gray-50 border border-[#DCE1E8] text-xs text-gray-800 whitespace-pre-wrap font-sans leading-relaxed">
              {instagramCopy}
            </pre>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => copyText(instagramCopy, "instagram")}
              className="w-full h-10 rounded-lg bg-[#0B1220] hover:bg-[#101A33] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              {copiedKey === "instagram" ? (
                <>
                  <Check className="w-4 h-4 text-[#C7F36B]" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Instagram Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================
          LINKEDIN & STUDENT EMAIL SECTION
          ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LinkedIn Post */}
        <div className="p-6 rounded-xl bg-white border border-[#DCE1E8] shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE1E8]">
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-blue-700" />
                <h4 className="font-bold text-sm text-[#0B1220]">LinkedIn Chapter Post</h4>
              </div>
              <span className="text-[10px] font-mono uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                Professional
              </span>
            </div>
            <pre className="mt-4 p-3.5 rounded-lg bg-gray-50 border border-[#DCE1E8] text-xs text-gray-800 whitespace-pre-wrap font-sans leading-relaxed">
              {linkedInCopy}
            </pre>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => copyText(linkedInCopy, "linkedin")}
              className="w-full h-10 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              {copiedKey === "linkedin" ? (
                <>
                  <Check className="w-4 h-4 text-[#C7F36B]" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy LinkedIn Post</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Email Announcement */}
        <div className="p-6 rounded-xl bg-white border border-[#DCE1E8] shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE1E8]">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-700" />
                <h4 className="font-bold text-sm text-[#0B1220]">Student Email Announcement</h4>
              </div>
              <span className="text-[10px] font-mono uppercase text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
                Newsletter
              </span>
            </div>
            <div className="mt-4 p-3.5 rounded-lg bg-gray-50 border border-[#DCE1E8] text-xs text-gray-800 space-y-2">
              <div className="font-bold text-gray-900 border-b border-gray-200 pb-1.5 font-mono">
                Subject: {emailSubject}
              </div>
              <pre className="whitespace-pre-wrap font-sans leading-relaxed">
                {emailBody}
              </pre>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => copyText(`${emailSubject}\n\n${emailBody}`, "email")}
              className="w-full h-10 rounded-lg border border-[#DCE1E8] hover:bg-gray-50 text-[#0B1220] text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              {copiedKey === "email" ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Email Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Subject &amp; Body</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Campus Short Announcement (Discord / Telegram) */}
      <div className="p-6 rounded-xl bg-white border border-[#DCE1E8] shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#DCE1E8]">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-purple-600" />
            <h4 className="font-bold text-sm text-[#0B1220]">Discord &amp; Telegram Channel Blast</h4>
          </div>
          <span className="text-[10px] font-mono uppercase text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
            Quick Link
          </span>
        </div>

        <div className="p-3.5 rounded-lg bg-gray-50 border border-[#DCE1E8] text-xs font-mono text-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <pre className="whitespace-pre-wrap font-sans text-xs">{shortCopy}</pre>
          <button
            type="button"
            onClick={() => copyText(shortCopy, "short")}
            className="px-4 py-2 rounded-lg bg-[#0B1220] hover:bg-[#101A33] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            {copiedKey === "short" ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#C7F36B]" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Short Blast</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ========================================================
          FACULTY SUPPORT TOOL (Prompt Section 28)
          ======================================================== */}
      <div id="faculty-tool" className="p-6 sm:p-8 rounded-xl bg-white border border-[#DCE1E8] shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DCE1E8]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-blue-50 text-[#2563EB]">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-[#2563EB] uppercase font-bold tracking-wider">
                Institutional Engagement Tool
              </span>
              <h3 className="text-lg font-bold text-[#0B1220] mt-0.5">
                Need Faculty or Department Support?
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={() => copyText(`${facultySubject}\n\n${facultyBody}`, "faculty")}
            className="h-10 px-5 rounded-lg bg-[#2563EB] hover:bg-[#3B82F6] active:scale-[0.98] text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
          >
            {copiedKey === "faculty" ? (
              <>
                <Check className="w-4 h-4 text-[#C7F36B]" />
                <span>Copied Faculty Proposal!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Faculty Briefing Note</span>
              </>
            )}
          </button>
        </div>

        <p className="text-xs text-[#687386] leading-relaxed">
          Use this ready-to-send briefing note when requesting department approval, faculty coordination, or internal notice board placement.
          It accurately explains the session&apos;s educational value without promising academic credit.
        </p>

        <div className="p-4 rounded-lg bg-[#F7F7F3] border border-[#DCE1E8] text-xs space-y-2">
          <div className="font-bold text-gray-900 border-b border-[#DCE1E8] pb-1.5 font-mono">
            Subject: {facultySubject}
          </div>
          <pre className="text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
            {facultyBody}
          </pre>
        </div>
      </div>
    </div>
  );
}
