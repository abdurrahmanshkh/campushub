import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SuccessActions } from "@/components/SuccessActions";
import { getActiveEvent } from "@/lib/events";
import { getCanonicalSiteUrl } from "@/lib/site-url";
import { CheckCircle } from "lucide-react";

export const metadata = {
  title: "You're In! | Build60 Registration Confirmed",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function RegistrationSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; code?: string; name?: string; college?: string }>;
}) {
  const { code, name, college } = await searchParams;
  const event = await getActiveEvent();
  const siteUrl = await getCanonicalSiteUrl();

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F3] text-[#0B1220]">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Header Confirmation */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-50 text-emerald-800 text-xs font-mono font-bold uppercase tracking-wider">
              <span>Registration Confirmed</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B1220]">
              You’re in{name ? `, ${name}` : ""}.
            </h1>

            <p className="text-sm text-[#687386] max-w-md mx-auto">
              Your seat for <strong className="text-gray-900">{event.title}</strong> has been secured
              {college ? ` under ${college}` : ""}.
            </p>
          </div>

          {/* Workshop Details Badge */}
          <div className="p-4 rounded-xl bg-white border border-[#DCE1E8] shadow-sm grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 border-r border-[#DCE1E8]">
              <div className="text-[10px] font-mono text-[#687386] uppercase">DATE</div>
              <div className="font-bold text-[#0B1220] mt-0.5">
                {event.date || "TBA"}
              </div>
            </div>
            <div className="p-2 border-r border-[#DCE1E8]">
              <div className="text-[10px] font-mono text-[#687386] uppercase">TIME</div>
              <div className="font-bold text-[#0B1220] mt-0.5">
                {event.startTime ? `${event.startTime} ${event.timezone}` : "TBA"}
              </div>
            </div>
            <div className="p-2">
              <div className="text-[10px] font-mono text-[#687386] uppercase">DURATION</div>
              <div className="font-bold text-[#0B1220] mt-0.5">
                {event.durationMinutes} Minutes
              </div>
            </div>
          </div>

          {/* Interactive Calendar & Referral Module */}
          <SuccessActions
            referralCode={code || "direct"}
            siteUrl={siteUrl}
            eventTitle={event.title}
            eventDate={event.date}
            eventStartTime={event.startTime}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
