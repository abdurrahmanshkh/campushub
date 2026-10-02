import { requirePartner } from "@/lib/auth";
import { getActiveEvent } from "@/lib/events";
import { PartnerNavbar } from "@/components/PartnerNavbar";
import { Footer } from "@/components/Footer";
import { CampaignKitInteractive } from "@/components/CampaignKitInteractive";
import { Megaphone } from "lucide-react";

export const metadata = {
  title: "Campaign Kit | Build60 Partner Portal",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function PartnerCampaignPage() {
  const { partner } = await requirePartner();
  const event = await getActiveEvent();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

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
              <Megaphone className="w-3.5 h-3.5" />
              <span>Campus Promotion Assets</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B1220]">
              Personalized Campaign Kit &bull; {partner.clubName}
            </h1>
            <p className="text-xs sm:text-sm text-[#687386]">
              Every asset is pre-attributed with your partner code (
              <span className="font-mono font-bold text-gray-900">{partner.code}</span>
              ). Ready to forward, print, and broadcast across {partner.collegeName}.
            </p>
          </div>

          <CampaignKitInteractive
            partnerCode={partner.code}
            clubName={partner.clubName}
            collegeName={partner.collegeName}
            eventTitle={event.title}
            eventDate={event.date}
            eventStartTime={event.startTime}
            eventTimezone={event.timezone}
            siteUrl={siteUrl}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
