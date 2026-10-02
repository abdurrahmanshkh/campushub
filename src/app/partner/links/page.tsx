import { requirePartner } from "@/lib/auth";
import { getCanonicalSiteUrl } from "@/lib/site-url";
import { PartnerNavbar } from "@/components/PartnerNavbar";
import { Footer } from "@/components/Footer";
import { PartnerQuickActions } from "@/components/PartnerQuickActions";
import { Link2, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Campaign Links & QR | Build60 Partner Portal",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function PartnerLinksPage() {
  const { partner } = await requirePartner();
  const siteUrl = await getCanonicalSiteUrl();

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
              <Link2 className="w-3.5 h-3.5" />
              <span>Link Management</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B1220]">
              Campaign Tracking Links &amp; Dynamic QR
            </h1>
            <p className="text-xs sm:text-sm text-[#687386]">
              Use these URLs across all physical and digital channels. Clicks and registrations automatically attribute to your campus.
            </p>
          </div>

          <PartnerQuickActions
            partnerCode={partner.code}
            clubName={partner.clubName}
            collegeName={partner.collegeName}
            siteUrl={siteUrl}
          />

          {/* Campus Landing Page Card */}
          <div className="p-6 rounded-xl bg-white border border-[#DCE1E8] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#2563EB]" />
                <h3 className="font-bold text-sm text-[#0B1220]">
                  Your Dedicated Campus Landing Page
                </h3>
              </div>
              <p className="text-xs text-[#687386] mt-1">
                A public microsite showcasing the workshop co-hosted by {partner.clubName} at {partner.collegeName}.
              </p>
              <div className="font-mono text-xs text-blue-600 mt-1">
                {siteUrl}/campus/{partner.slug}
              </div>
            </div>

            <Link
              href={`/campus/${partner.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 px-4 rounded-lg bg-[#0B1220] hover:bg-[#101A33] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
            >
              <span>View Public Campus Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
