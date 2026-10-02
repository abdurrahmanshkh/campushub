import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getPartnersCollection, getRegistrationsCollection, getTrackingEventsCollection } from "@/lib/db";
import { AdminNavbar } from "@/components/AdminNavbar";
import { Footer } from "@/components/Footer";
import { ObjectId } from "mongodb";
import Link from "next/link";
import {
  ExternalLink,
  ChevronLeft,
} from "lucide-react";

export const metadata = {
  title: "Partner Detail | Build60 Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPartnerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;

  const partnersCol = await getPartnersCollection();
  const registrationsCol = await getRegistrationsCollection();
  const trackingCol = await getTrackingEventsCollection();

  let partnerDoc = null;
  try {
    partnerDoc = await partnersCol.findOne({ _id: new ObjectId(id) });
  } catch {
    partnerDoc = await partnersCol.findOne({ _id: id as unknown as ObjectId });
  }

  if (!partnerDoc) {
    notFound();
  }

  const registrations = await registrationsCol
    .find({
      $or: [{ partnerId: partnerDoc._id }, { partnerCode: partnerDoc.code }],
    })
    .sort({ registeredAt: -1 })
    .toArray();

  const totalRegs = registrations.length;
  const referralRegs = registrations.filter((r) => r.referredByRegistrationId).length;

  const totalClicks = await trackingCol.countDocuments({
    $or: [{ partnerId: partnerDoc._id }, { partnerCode: partnerDoc.code }],
    type: { $in: ["partner_link_click", "referral_click"] },
  });

  const conversionRate = totalClicks > 0
    ? ((totalRegs / totalClicks) * 100).toFixed(1)
    : "0.0";

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F3] text-[#0B1220]">
      <AdminNavbar />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Breadcrumb Back */}
          <Link
            href="/admin/partners"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#687386] hover:text-[#0B1220]"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to All Partners</span>
          </Link>

          {/* Header Card */}
          <div className="p-6 sm:p-8 rounded-xl bg-white border border-[#DCE1E8] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-blue-100 text-blue-800 text-xs font-mono font-bold">
                  {partnerDoc.code}
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-bold uppercase">
                  {partnerDoc.status}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B1220] mt-2">
                {partnerDoc.clubName}
              </h1>
              <p className="text-xs sm:text-sm text-[#687386] mt-0.5">
                {partnerDoc.collegeName} &bull; {partnerDoc.city}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/r/${partnerDoc.code}`}
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 px-3.5 rounded-lg border border-[#DCE1E8] hover:bg-gray-50 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Test Tracking Link</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <Link
                href={`/campus/${partnerDoc.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 px-3.5 rounded-lg bg-[#2563EB] hover:bg-[#3B82F6] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Campus Microsite</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white border border-[#DCE1E8] shadow-sm">
              <div className="text-[10px] font-mono text-[#687386] uppercase">REGISTRATIONS</div>
              <div className="text-2xl font-bold font-mono text-[#0B1220] mt-1">{totalRegs}</div>
              <div className="text-[11px] text-[#687386] mt-0.5">Confirmed students</div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#DCE1E8] shadow-sm">
              <div className="text-[10px] font-mono text-[#687386] uppercase">TOTAL CLICKS</div>
              <div className="text-2xl font-bold font-mono text-[#0B1220] mt-1">{totalClicks}</div>
              <div className="text-[11px] text-[#687386] mt-0.5">Tracking visits</div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#DCE1E8] shadow-sm">
              <div className="text-[10px] font-mono text-[#687386] uppercase">CONVERSION</div>
              <div className="text-2xl font-bold font-mono text-emerald-700 mt-1">{conversionRate}%</div>
              <div className="text-[11px] text-[#687386] mt-0.5">Visits to signups</div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 shadow-sm">
              <div className="text-[10px] font-mono text-emerald-800 uppercase font-semibold">PEER REFERRALS</div>
              <div className="text-2xl font-bold font-mono text-emerald-900 mt-1">+{referralRegs}</div>
              <div className="text-[11px] text-emerald-700 mt-0.5">Student network nodes</div>
            </div>
          </div>

          {/* Application Details */}
          <div className="p-6 rounded-xl bg-white border border-[#DCE1E8] shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-[#0B1220] pb-2 border-b border-[#DCE1E8]">
              Application Dossier
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-[#687386] font-mono uppercase text-[10px]">LEAD ORGANIZER</span>
                <div className="font-bold text-[#0B1220] mt-0.5">{partnerDoc.leadName}</div>
                <div className="text-gray-500 font-mono mt-0.5">{partnerDoc.email} &bull; {partnerDoc.phone}</div>
              </div>

              <div>
                <span className="text-[#687386] font-mono uppercase text-[10px]">FACULTY COORDINATOR</span>
                <div className="font-bold text-[#0B1220] mt-0.5">{partnerDoc.facultyName || "None"}</div>
                <div className="text-gray-500 font-mono mt-0.5">{partnerDoc.facultyEmail || "No faculty email"}</div>
              </div>

              <div>
                <span className="text-[#687386] font-mono uppercase text-[10px]">COMMUNITY SIZE</span>
                <div className="font-bold font-mono text-[#0B1220] mt-0.5">
                  ~{partnerDoc.approximateCommunitySize} students
                </div>
              </div>
            </div>

            <div>
              <span className="text-[#687386] font-mono uppercase text-[10px]">COLLABORATION STATEMENT</span>
              <p className="text-xs text-gray-700 mt-1 leading-relaxed bg-[#F7F7F3] p-3 rounded-lg border border-[#DCE1E8]">
                {partnerDoc.applicationReason}
              </p>
            </div>
          </div>

          {/* Recent Registrations Table */}
          <div className="p-6 rounded-xl bg-white border border-[#DCE1E8] shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-[#0B1220] pb-2 border-b border-[#DCE1E8]">
              Registrations Attributed to {partnerDoc.clubName} ({registrations.length})
            </h3>

            {registrations.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#687386] font-mono">
                No registrations have been attributed to this partner yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-[#DCE1E8] text-[#687386] font-mono uppercase">
                      <th className="py-2 pr-4">Student</th>
                      <th className="py-2 px-4">Grad Year</th>
                      <th className="py-2 px-4">Source</th>
                      <th className="py-2 px-4">Student Referral Code</th>
                      <th className="py-2 pl-4 text-right">Registered At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DCE1E8]">
                    {registrations.slice(0, 15).map((r) => (
                      <tr key={r._id?.toString()} className="hover:bg-gray-50">
                        <td className="py-2.5 pr-4 font-semibold text-[#0B1220]">
                          {r.name}
                        </td>
                        <td className="py-2.5 px-4 font-mono text-gray-600">
                          {r.graduationYear}
                        </td>
                        <td className="py-2.5 px-4">
                          <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-mono text-[10px]">
                            {r.source}
                          </span>
                        </td>
                        <td className="py-2.5 px-4 font-mono text-blue-600">
                          {r.studentReferralCode}
                        </td>
                        <td className="py-2.5 pl-4 text-right text-gray-500 font-mono text-[11px]">
                          {r.registeredAt ? new Date(r.registeredAt).toLocaleDateString() : ""}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
