import { requirePartner } from "@/lib/auth";
import { getPartnerAnalyticsData } from "@/lib/analytics";
import { getCanonicalSiteUrl } from "@/lib/site-url";
import { PartnerNavbar } from "@/components/PartnerNavbar";
import { Footer } from "@/components/Footer";
import { DemoBadge } from "@/components/DemoBadge";
import { PartnerQuickActions } from "@/components/PartnerQuickActions";
import { CampusSignalChart } from "@/components/CampusSignalChart";
import {
  TrendingUp,
  MousePointerClick,
  CheckCircle2,
  Circle,
  Share2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Partner Dashboard | Build60 Campus Growth Hub",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function PartnerDashboardPage() {
  const { partner } = await requirePartner();
  const analytics = await getPartnerAnalyticsData(
    partner._id?.toString() || "",
    partner.code
  );

  const siteUrl = await getCanonicalSiteUrl();
  const progressPercent = Math.min(
    Math.round((analytics.totalRegistrations / analytics.target) * 100),
    100
  );

  // Time-based greeting
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F3] text-[#0B1220]">
      <PartnerNavbar
        partnerName={partner.clubName}
        partnerCode={partner.code}
      />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#2563EB] uppercase font-bold tracking-wider">
                  Campus Campaign Command
                </span>
                {partner.isDemo && <DemoBadge />}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B1220] mt-1">
                {greeting}, {partner.leadName.split(" ")[0]}
              </h1>
              <p className="text-xs sm:text-sm text-[#687386] mt-0.5">
                Here’s how your campaign at <span className="font-semibold text-gray-900">{partner.collegeName}</span> is moving.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/partner/campaign"
                className="h-10 px-4 rounded-lg bg-[#2563EB] hover:bg-[#3B82F6] text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>Launch Campaign Kit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Primary Metric Hero Card */}
          <div className="p-6 sm:p-8 rounded-xl bg-white border border-[#DCE1E8] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Oversized Metric & Target */}
            <div className="lg:col-span-6 space-y-3">
              <div className="text-xs font-mono text-[#687386] uppercase tracking-wider font-semibold">
                YOUR CAMPUS TOTAL
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl sm:text-6xl font-extrabold font-mono text-[#0B1220] tracking-tight">
                  {analytics.totalRegistrations}
                </span>
                <span className="text-lg font-bold text-gray-400">
                  / {analytics.target}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#687386]">
                Confirmed student registrations attributed to <strong className="text-gray-900">{partner.clubName}</strong>.
              </p>

              {/* Progress Bar */}
              <div className="pt-2">
                <div className="flex justify-between text-xs font-mono text-[#687386] mb-1.5">
                  <span>Progress to Target</span>
                  <span className="font-bold text-[#0B1220]">{progressPercent}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full bg-[#2563EB] rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Right: Compact Sub-Metrics */}
            <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-lg bg-[#F7F7F3] border border-[#DCE1E8]">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#687386] uppercase">
                  <MousePointerClick className="w-3.5 h-3.5 text-blue-600" />
                  <span>TOTAL CLICKS</span>
                </div>
                <div className="text-2xl font-bold font-mono text-[#0B1220] mt-1.5">
                  {analytics.totalClicks}
                </div>
                <div className="text-[11px] text-[#687386] mt-0.5">Campaign visits</div>
              </div>

              <div className="p-4 rounded-lg bg-[#F7F7F3] border border-[#DCE1E8]">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#687386] uppercase">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span>CONVERSION</span>
                </div>
                <div className="text-2xl font-bold font-mono text-emerald-700 mt-1.5">
                  {analytics.conversionRate}%
                </div>
                <div className="text-[11px] text-[#687386] mt-0.5">Visit to register</div>
              </div>

              <div className="p-4 rounded-lg bg-emerald-50/60 border border-emerald-200">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-800 uppercase font-semibold">
                  <Share2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>PEER REFERRALS</span>
                </div>
                <div className="text-2xl font-bold font-mono text-emerald-900 mt-1.5">
                  {analytics.referralRegistrations}
                </div>
                <div className="text-[11px] text-emerald-700 mt-0.5">Secondary nodes</div>
              </div>
            </div>
          </div>

          {/* Quick Actions (Link copy, WhatsApp, QR) */}
          <PartnerQuickActions
            partnerCode={partner.code}
            clubName={partner.clubName}
            collegeName={partner.collegeName}
            siteUrl={siteUrl}
          />

          {/* Grid: Campus Signal Chart + Campaign Health Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Campus Signal Chart */}
            <div className="lg:col-span-7 p-6 rounded-xl bg-white border border-[#DCE1E8] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#DCE1E8]">
                <div>
                  <h3 className="font-bold text-sm text-[#0B1220]">
                    Campus Signal &bull; Registrations Over Time
                  </h3>
                  <p className="text-xs text-[#687386] mt-0.5">
                    Daily velocity across your campus networks
                  </p>
                </div>
                <span className="text-xs font-mono text-blue-600 font-bold">
                  {analytics.totalRegistrations} TOTAL
                </span>
              </div>

              <CampusSignalChart data={analytics.timeline} />
            </div>

            {/* Campaign Health & Next Actions Panel */}
            <div className="lg:col-span-5 p-6 rounded-xl bg-white border border-[#DCE1E8] shadow-sm space-y-5">
              <div className="pb-3 border-b border-[#DCE1E8]">
                <h3 className="font-bold text-sm text-[#0B1220]">
                  Campaign Health &amp; Next Actions
                </h3>
                <p className="text-xs text-[#687386] mt-0.5">
                  Convert analytics into campus momentum
                </p>
              </div>

              {/* Status checklist */}
              <div className="space-y-3">
                <div className="flex items-center gap-2.5 text-xs text-gray-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium">Partner approved &amp; verified</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium">Custom link created ({partner.code})</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium">QR code ready for campus print</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-800">
                  {analytics.totalRegistrations > 0 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-gray-400 shrink-0" />
                  )}
                  <span className="font-medium">First registrations recorded</span>
                </div>
              </div>

              {/* Next Recommended Playbook */}
              <div className="p-4 rounded-lg bg-[#F7F7F3] border border-[#DCE1E8] space-y-2.5">
                <div className="text-[11px] font-mono text-[#2563EB] uppercase font-bold">
                  Recommended Next Steps
                </div>
                <ul className="text-xs text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#2563EB] font-bold">&bull;</span>
                    <span>Forward the WhatsApp copy to your club&apos;s core batch groups.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2563EB] font-bold">&bull;</span>
                    <span>Download and pin the A4 QR poster in computer lab notice boards.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2563EB] font-bold">&bull;</span>
                    <span>Share the faculty briefing note with your HOD or faculty coordinator.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section: Private Campus Momentum Leaderboard */}
          <div className="p-6 rounded-xl bg-white border border-[#DCE1E8] shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#DCE1E8]">
              <div>
                <span className="text-xs font-mono text-[#2563EB] uppercase font-bold">
                  Private Partner Telemetry
                </span>
                <h3 className="font-bold text-base text-[#0B1220] mt-0.5">
                  Campus Momentum &bull; Relative Campaign Progress
                </h3>
              </div>
              <div className="text-xs text-[#687386]">
                Confidential to authorized campus club leads &bull; No student PII
              </div>
            </div>

            <p className="text-xs text-[#687386]">
              Your campus is currently at <strong className="text-gray-900">{progressPercent}%</strong> of its campaign target.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-[#DCE1E8] text-[#687386] font-mono uppercase">
                    <th className="py-2.5 pr-4">Club / Chapter</th>
                    <th className="py-2.5 px-4">Campus</th>
                    <th className="py-2.5 px-4 text-right">Registrations</th>
                    <th className="py-2.5 px-4 text-right">Target</th>
                    <th className="py-2.5 pl-4 text-right">Momentum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DCE1E8]">
                  {analytics.momentumLeaderboard.map((item, idx) => (
                    <tr
                      key={item.code}
                      className={
                        item.isCurrent
                          ? "bg-blue-50/70 font-semibold text-[#0B1220]"
                          : "text-gray-700 hover:bg-gray-50"
                      }
                    >
                      <td className="py-3 pr-4 flex items-center gap-2">
                        <span className="font-mono text-gray-400 w-4">{idx + 1}</span>
                        <span>{item.clubName}</span>
                        {item.isCurrent && (
                          <span className="px-1.5 py-0.5 rounded bg-blue-600 text-white text-[10px] font-mono">
                            YOU
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">{item.collegeName}</td>
                      <td className="py-3 px-4 text-right font-mono font-bold">
                        {item.registrations}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-gray-500">
                        {item.target}
                      </td>
                      <td className="py-3 pl-4 text-right font-mono font-bold text-[#2563EB]">
                        {item.progressPercent}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
