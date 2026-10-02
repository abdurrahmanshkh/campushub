import { requireAdmin } from "@/lib/auth";
import { getAdminAnalyticsData } from "@/lib/analytics";
import { AdminNavbar } from "@/components/AdminNavbar";
import { Footer } from "@/components/Footer";
import { DemoBadge } from "@/components/DemoBadge";
import { CampusSignalChart } from "@/components/CampusSignalChart";

export const metadata = {
  title: "Growth Analytics | Build60 Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminAnalyticsPage() {
  await requireAdmin();
  const data = await getAdminAnalyticsData();

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F3] text-[#0B1220]">
      <AdminNavbar />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#2563EB] uppercase font-bold tracking-wider">
                  Deep Growth Analytics
                </span>
                {data.isDemo && <DemoBadge />}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B1220] mt-1">
                Campaign Acquisition &amp; Attribution Breakdown
              </h1>
              <p className="text-xs sm:text-sm text-[#687386] mt-0.5">
                Answer fundamental questions: which clubs moved volume, which channels converted, and how much came from student referrals?
              </p>
            </div>
          </div>

          {/* Registrations Velocity Chart */}
          <div className="p-6 sm:p-8 rounded-xl bg-white border border-[#DCE1E8] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE1E8]">
              <div>
                <h3 className="font-bold text-sm text-[#0B1220]">
                  Registrations Over Time (Daily Trajectory)
                </h3>
                <p className="text-xs text-[#687386]">Cumulative intake across all active campuses</p>
              </div>
              <span className="text-xs font-mono font-bold text-[#2563EB]">
                {data.totalRegistrations} REGISTRATIONS
              </span>
            </div>
            <CampusSignalChart data={data.timeline} />
          </div>

          {/* Grid: Acquisition Channels + Partner Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Channels */}
            <div className="p-6 rounded-xl bg-white border border-[#DCE1E8] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#DCE1E8]">
                <h3 className="font-bold text-sm text-[#0B1220]">
                  Acquisition Channel Performance
                </h3>
                <span className="text-xs font-mono text-gray-500">CONVERTED CHANNELS</span>
              </div>

              <div className="space-y-3">
                {data.sources.map((s) => {
                  const pct = data.totalRegistrations > 0
                    ? Math.round((s.count / data.totalRegistrations) * 100)
                    : 0;
                  return (
                    <div key={s.source} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium text-gray-700">
                        <span className="capitalize">{s.source.replace(/_/g, " ")}</span>
                        <span className="font-mono font-bold text-gray-900">
                          {s.count} regs ({pct}%)
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full bg-[#2563EB]"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Partner Clubs */}
            <div className="p-6 rounded-xl bg-white border border-[#DCE1E8] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#DCE1E8]">
                <h3 className="font-bold text-sm text-[#0B1220]">
                  Registrations by Partner Club
                </h3>
                <span className="text-xs font-mono text-gray-500">ATTRIBUTION</span>
              </div>

              <div className="space-y-3">
                {data.topPartners.map((p) => {
                  const pct = data.totalRegistrations > 0
                    ? Math.round((p.registrations / data.totalRegistrations) * 100)
                    : 0;
                  return (
                    <div key={p.code} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium text-gray-700">
                        <span>{p.clubName} ({p.code})</span>
                        <span className="font-mono font-bold text-gray-900">
                          {p.registrations} regs ({pct}%)
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full bg-emerald-600"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Top Campuses Grid */}
          <div className="p-6 rounded-xl bg-white border border-[#DCE1E8] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE1E8]">
              <h3 className="font-bold text-sm text-[#0B1220]">
                High-Density Campus Clusters
              </h3>
              <span className="text-xs font-mono text-gray-500">{data.activeCampuses} TOTAL CAMPUSES</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.topCampuses.map((c) => (
                <div key={c.campus} className="p-4 rounded-lg bg-[#F7F7F3] border border-[#DCE1E8]">
                  <div className="text-xs font-bold text-[#0B1220] truncate">{c.campus}</div>
                  <div className="text-xl font-bold font-mono text-[#2563EB] mt-1">
                    {c.registrations}
                  </div>
                  <div className="text-[11px] text-[#687386]">confirmed registrations</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
