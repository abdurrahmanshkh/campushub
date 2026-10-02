import { requirePartner } from "@/lib/auth";
import { PartnerNavbar } from "@/components/PartnerNavbar";
import { Footer } from "@/components/Footer";
import { UserCheck } from "lucide-react";

export const metadata = {
  title: "Partner Profile | Build60 Partner Portal",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function PartnerProfilePage() {
  const { partner } = await requirePartner();

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F3] text-[#0B1220]">
      <PartnerNavbar
        partnerName={partner.clubName}
        partnerCode={partner.code}
      />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#0B1220] text-[#C7F36B] text-xs font-mono font-bold uppercase tracking-wider">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Campus Chapter Record</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B1220]">
              Club &amp; Organizer Profile
            </h1>
            <p className="text-xs sm:text-sm text-[#687386]">
              Verified details associated with partner tracking code{" "}
              <span className="font-mono font-bold text-gray-900">{partner.code}</span>.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-xl bg-white border border-[#DCE1E8] shadow-sm space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <span className="text-[10px] font-mono text-[#687386] uppercase">CLUB NAME</span>
                <div className="font-bold text-[#0B1220] text-base mt-0.5">{partner.clubName}</div>
                <div className="text-xs text-gray-500 mt-0.5">{partner.clubType}</div>
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#687386] uppercase">COLLEGE / CAMPUS</span>
                <div className="font-bold text-[#0B1220] text-base mt-0.5">{partner.collegeName}</div>
                <div className="text-xs text-gray-500 mt-0.5">{partner.city}</div>
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#687386] uppercase">LEAD ORGANIZER</span>
                <div className="font-bold text-[#0B1220] text-base mt-0.5">{partner.leadName}</div>
                <div className="text-xs text-gray-500 mt-0.5 font-mono">{partner.email} &bull; {partner.phone}</div>
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#687386] uppercase">FACULTY COORDINATOR</span>
                <div className="font-bold text-[#0B1220] text-base mt-0.5">
                  {partner.facultyName || "Not specified"}
                </div>
                <div className="text-xs text-gray-500 mt-0.5 font-mono">
                  {partner.facultyEmail || "No faculty email on file"}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#687386] uppercase">COMMUNITY SIZE</span>
                <div className="font-bold font-mono text-[#0B1220] text-base mt-0.5">
                  ~{partner.approximateCommunitySize} students
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#687386] uppercase">PARTNERSHIP STATUS</span>
                <div className="mt-1">
                  <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 text-xs font-mono font-bold">
                    {partner.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#DCE1E8] text-xs text-[#687386] leading-relaxed">
              <strong>Access Scope:</strong> As a verified campus club lead, your account can access real-time registrations and launch assets for your campus only. Global campaign parameters and cross-institution metrics are managed by the Build60 growth director.
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
