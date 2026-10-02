import { requirePartner } from "@/lib/auth";
import { PartnerNavbar } from "@/components/PartnerNavbar";
import { Footer } from "@/components/Footer";
import { getRegistrationsCollection } from "@/lib/db";
import { Network } from "lucide-react";
import { ObjectId } from "mongodb";

export const metadata = {
  title: "Student Referral Nodes | Build60 Partner Portal",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function PartnerReferralsPage() {
  const { partner } = await requirePartner();
  const registrationsCol = await getRegistrationsCollection();

  // Find all registrations attributed to this partner
  const pQuery = {
    $or: [{ partnerId: partner._id as ObjectId }, { partnerCode: partner.code }],
  };

  const allPartnerRegs = await registrationsCol.find(pQuery).toArray();
  const referralRegs = allPartnerRegs.filter((r) => r.referredByRegistrationId);
  const directRegs = allPartnerRegs.filter((r) => !r.referredByRegistrationId);

  // Group secondary registrations by referrer
  const referrerCounts = new Map<string, number>();
  for (const r of referralRegs) {
    const refId = r.referredByRegistrationId?.toString();
    if (refId) {
      referrerCounts.set(refId, (referrerCounts.get(refId) || 0) + 1);
    }
  }

  // Top student referral nodes
  const topReferrers = [];
  for (const [refId, count] of referrerCounts.entries()) {
    const originalStudent = allPartnerRegs.find((r) => r._id?.toString() === refId);
    if (originalStudent) {
      // Anonymize last name: "Rahul S."
      const parts = originalStudent.name.split(" ");
      const maskedName = parts.length > 1 ? `${parts[0]} ${parts[1][0]}.` : parts[0];
      topReferrers.push({
        maskedName,
        code: originalStudent.studentReferralCode,
        count,
        registeredAt: originalStudent.registeredAt,
      });
    }
  }
  topReferrers.sort((a, b) => b.count - a.count);

  const viralMultiplier =
    directRegs.length > 0
      ? (1 + referralRegs.length / directRegs.length).toFixed(2)
      : "1.00";

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F3] text-[#0B1220]">
      <PartnerNavbar
        partnerName={partner.clubName}
        partnerCode={partner.code}
      />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#0B1220] text-[#C7F36B] text-xs font-mono font-bold uppercase tracking-wider">
              <Network className="w-3.5 h-3.5" />
              <span>Peer Attribution Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B1220]">
              Student Referral Nodes &bull; Viral Telemetry
            </h1>
            <p className="text-xs sm:text-sm text-[#687386]">
              When students register through your club, they receive unique peer referral links.
              Every friend they invite is attributed directly to your campus total.
            </p>
          </div>

          {/* Viral Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-white border border-[#DCE1E8] shadow-sm">
              <div className="text-[10px] font-mono text-[#687386] uppercase tracking-wider">
                DIRECT CLUB REGISTRATIONS
              </div>
              <div className="text-3xl font-extrabold font-mono text-[#0B1220] mt-1">
                {directRegs.length}
              </div>
              <div className="text-xs text-[#687386] mt-0.5">Primary acquisition from club links</div>
            </div>

            <div className="p-5 rounded-xl bg-emerald-50/70 border border-emerald-200 shadow-sm">
              <div className="text-[10px] font-mono text-emerald-800 uppercase tracking-wider font-semibold">
                PEER REFERRAL NODES
              </div>
              <div className="text-3xl font-extrabold font-mono text-emerald-900 mt-1">
                +{referralRegs.length}
              </div>
              <div className="text-xs text-emerald-700 mt-0.5">
                {(allPartnerRegs.length > 0
                  ? (referralRegs.length / allPartnerRegs.length) * 100
                  : 0
                ).toFixed(1)}% of your campus volume
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white border border-[#DCE1E8] shadow-sm">
              <div className="text-[10px] font-mono text-[#687386] uppercase tracking-wider">
                NETWORK AMPLIFIER (K-FACTOR)
              </div>
              <div className="text-3xl font-extrabold font-mono text-[#2563EB] mt-1">
                {viralMultiplier}x
              </div>
              <div className="text-xs text-[#687386] mt-0.5">Campus viral multiplier</div>
            </div>
          </div>

          {/* Active Referral Nodes Table */}
          <div className="p-6 rounded-xl bg-white border border-[#DCE1E8] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE1E8]">
              <div>
                <h3 className="font-bold text-base text-[#0B1220]">
                  Active Student Referral Nodes
                </h3>
                <p className="text-xs text-[#687386] mt-0.5">
                  Peer organizers driving secondary batch registrations (PII masked for privacy)
                </p>
              </div>
              <span className="text-xs font-mono text-gray-500">
                {topReferrers.length} ACTIVE REFERRERS
              </span>
            </div>

            {topReferrers.length === 0 ? (
              <div className="py-12 text-center text-xs text-[#687386] font-mono">
                No students have shared their personal referral link yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-[#DCE1E8] text-[#687386] font-mono uppercase">
                      <th className="py-2.5 pr-4">Student Node</th>
                      <th className="py-2.5 px-4">Referral Code</th>
                      <th className="py-2.5 px-4 text-right">Secondary Registrations Brought</th>
                      <th className="py-2.5 pl-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DCE1E8]">
                    {topReferrers.map((r, i) => (
                      <tr key={r.code} className="hover:bg-gray-50">
                        <td className="py-3 pr-4 font-semibold text-[#0B1220]">
                          <span className="font-mono text-gray-400 mr-2">{i + 1}.</span>
                          {r.maskedName}
                        </td>
                        <td className="py-3 px-4 font-mono text-blue-600">{r.code}</td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-emerald-700">
                          +{r.count} students
                        </td>
                        <td className="py-3 pl-4 text-right">
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                            AMPLIFYING
                          </span>
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
