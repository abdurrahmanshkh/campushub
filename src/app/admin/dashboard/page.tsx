import { requireAdmin } from "@/lib/auth";
import { getAdminAnalyticsData } from "@/lib/analytics";
import { AdminNavbar } from "@/components/AdminNavbar";
import { Footer } from "@/components/Footer";
import { DemoBadge } from "@/components/DemoBadge";
import { CampusSignalChart } from "@/components/CampusSignalChart";
import {
  Building2,
  FileSpreadsheet,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Admin Command Console | Build60",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminDashboardPage() {
  await requireAdmin();
  const data = await getAdminAnalyticsData();

  const progressPercent = Math.min(
    Math.round((data.totalRegistrations / data.target) * 100),
    100
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F3] text-[#0B1220]">
      <AdminNavbar />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#2563EB] uppercase font-bold tracking-wider">
                  Campaign Operations Console
                </span>
                {data.isDemo && <DemoBadge />}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B1220] mt-1">
                Build60 Campaign Growth Command
              </h1>
              <p className="text-xs sm:text-sm text-[#687386] mt-0.5">
                Centralized telemetry across partner student tech clubs and campus distribution nodes.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/admin/registrations"
                className="h-9 px-3.5 rounded-lg border border-[#DCE1E8] bg-white hover:bg-gray-50 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Export Registrations</span>
              </Link>
              <Link
                href="/admin/partners"
                className="h-9 px-3.5 rounded-lg bg-[#2563EB] hover:bg-[#3B82F6] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Manage Clubs</span>
              </Link>
            </div>
          </div>

          {/* Primary Campaign Progress Hero */}
          <div className="p-6 sm:p-8 rounded-xl bg-white border border-[#DCE1E8] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Target & Stretch Target */}
            <div className="lg:col-span-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#687386] uppercase tracking-wider font-semibold">
                  TOTAL CAMPAIGN REGISTRATIONS
                </span>
                <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                  {progressPercent}% Achieved
                </span>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-5xl sm:text-6xl font-extrabold font-mono text-[#0B1220] tracking-tight">
                  {data.totalRegistrations}
                </span>
                <div className="text-sm font-mono text-gray-500 space-y-0.5">
                  <div>Target: <strong className="text-gray-900">{data.target}</strong></div>
                  <div>Stretch: <strong className="text-gray-900">{data.stretchTarget}</strong></div>
                </div>
              </div>

              <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full bg-[#2563EB] rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Quick Metrics Columns */}
            <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-lg bg-[#F7F7F3] border border-[#DCE1E8]">
                <div className="text-[10px] font-mono text-[#687386] uppercase">ACTIVE CAMPUSES</div>
                <div className="text-2xl font-bold font-mono text-[#0B1220] mt-1">
                  {data.activeCampuses}
                </div>
                <div className="text-[11px] text-[#687386] mt-0.5">Universities reached</div>
              </div>

              <div className="p-4 rounded-lg bg-[#F7F7F3] border border-[#DCE1E8]">
                <div className="text-[10px] font-mono text-[#687386] uppercase">PARTNER CLUBS</div>
                <div className="text-2xl font-bold font-mono text-[#0B1220] mt-1">
                  {data.approvedPartners} / {data.totalPartners}
                </div>
                <div className="text-[11px] text-[#687386] mt-0.5">Approved &bull; Live</div>
              </div>

              <div className="p-4 rounded-lg bg-[#F7F7F3] border border-[#DCE1E8]">
                <div className="text-[10px] font-mono text-[#687386] uppercase">CONVERSION</div>
                <div className="text-2xl font-bold font-mono text-emerald-700 mt-1">
                  {data.conversionRate}%
                </div>
                <div className="text-[11px] text-[#687386] mt-0.5">Click to register</div>
              </div>

              <div className="p-4 rounded-lg bg-[#F7F7F3] border border-[#DCE1E8]">
                <div className="text-[10px] font-mono text-[#687386] uppercase">TOTAL VISITS</div>
                <div className="text-2xl font-bold font-mono text-[#0B1220] mt-1">
                  {data.totalClicks}
                </div>
                <div className="text-[11px] text-[#687386] mt-0.5">Tracked link clicks</div>
              </div>

              <div className="p-4 rounded-lg bg-emerald-50/70 border border-emerald-200">
                <div className="text-[10px] font-mono text-emerald-800 uppercase font-semibold">
                  STUDENT REFERRALS
                </div>
                <div className="text-2xl font-bold font-mono text-emerald-900 mt-1">
                  {data.referralRegistrations}
                </div>
                <div className="text-[11px] text-emerald-700 mt-0.5">Secondary nodes</div>
              </div>

              <div className="p-4 rounded-lg bg-[#F7F7F3] border border-[#DCE1E8]">
                <div className="text-[10px] font-mono text-[#687386] uppercase">DIRECT CLUB</div>
                <div className="text-2xl font-bold font-mono text-blue-700 mt-1">
                  {data.directRegistrations}
                </div>
                <div className="text-[11px] text-[#687386] mt-0.5">Primary links</div>
              </div>
            </div>
          </div>

          {/* Campaign Funnel Visualization (Prompt Section 22) */}
          <div className="p-6 rounded-xl bg-white border border-[#DCE1E8] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE1E8]">
              <div>
                <h3 className="font-bold text-sm text-[#0B1220]">
                  Full Campaign Distribution Funnel
                </h3>
                <p className="text-xs text-[#687386] mt-0.5">
                  End-to-end partner acquisition through peer student referral amplification
                </p>
              </div>
              <span className="text-xs font-mono text-gray-500">7 STAGES</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
              {data.funnel.map((f, i) => (
                <div
                  key={f.step}
                  className="p-3.5 rounded-lg bg-[#F7F7F3] border border-[#DCE1E8] flex flex-col justify-between"
                >
                  <div className="text-[10px] font-mono text-blue-600 font-bold uppercase">
                    0{i + 1}
                  </div>
                  <div className="text-xl font-bold font-mono text-[#0B1220] my-1.5">
                    {f.count}
                  </div>
                  <div className="text-[11px] font-medium text-[#687386] leading-tight">
                    {f.step}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grid: Signal Chart + Top Partners */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Timeline */}
            <div className="lg:col-span-7 p-6 rounded-xl bg-white border border-[#DCE1E8] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#DCE1E8]">
                <h3 className="font-bold text-sm text-[#0B1220]">
                  Campaign Velocity &bull; Daily Registrations
                </h3>
                <span className="text-xs font-mono text-blue-600 font-bold">
                  {data.totalRegistrations} CONFIRMED
                </span>
              </div>
              <CampusSignalChart data={data.timeline} />
            </div>

            {/* Top Contributing Clubs */}
            <div className="lg:col-span-5 p-6 rounded-xl bg-white border border-[#DCE1E8] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#DCE1E8]">
                <h3 className="font-bold text-sm text-[#0B1220]">
                  Top Contributing Clubs
                </h3>
                <Link
                  href="/admin/partners"
                  className="text-xs text-blue-600 hover:underline font-mono"
                >
                  View All &rarr;
                </Link>
              </div>

              <div className="space-y-3">
                {data.topPartners.map((p, idx) => (
                  <div
                    key={p.code}
                    className="p-3 rounded-lg bg-[#F7F7F3] border border-[#DCE1E8] flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-[#0B1220] flex items-center gap-1.5">
                        <span className="font-mono text-gray-400">{idx + 1}.</span>
                        <span>{p.clubName}</span>
                      </div>
                      <div className="text-[11px] text-gray-500 font-mono mt-0.5">
                        {p.collegeName} &bull; {p.code}
                      </div>
                    </div>
                    <div className="text-right font-mono">
                      <div className="font-bold text-[#2563EB] text-sm">
                        {p.registrations}
                      </div>
                      <div className="text-[10px] text-gray-500">registrations</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
