import { getActiveEvent } from "@/lib/events";
import { getPartnersCollection } from "@/lib/db";
import { getCanonicalSiteUrl } from "@/lib/site-url";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RegistrationForm } from "@/components/RegistrationForm";
import {
  Calendar,
  Clock,
  Globe,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "Build Your First AI Project in 60 Minutes | Free AI Workshop",
  description:
    "Join a free hands-on AI workshop designed for final-year engineering students. Build a practical AI project in 60 minutes.",
  alternates: {
    canonical: "/workshop",
  },
};

export default async function WorkshopPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string; studentRef?: string }>;
}) {
  const { ref, studentRef } = await searchParams;
  const event = await getActiveEvent();
  const siteUrl = await getCanonicalSiteUrl();

  // If partner code provided, lookup club details for context banner
  let partnerClubName: string | undefined = undefined;
  let partnerCollegeName: string | undefined = undefined;

  if (ref) {
    const partnersCol = await getPartnersCollection();
    const partner = await partnersCol.findOne({
      code: { $regex: new RegExp(`^${ref.trim()}$`, "i") },
    });
    if (partner) {
      partnerClubName = partner.clubName;
      partnerCollegeName = partner.collegeName;
    }
  }

  // Schema.org structured data only if date and time are configured
  const hasDateTime = Boolean(event.date && event.startTime);
  let eventJsonLd = null;

  if (hasDateTime) {
    const startIso = `${event.date}T${event.startTime}:00+05:30`;
    const endIso = event.endTime
      ? `${event.date}T${event.endTime}:00+05:30`
      : `${event.date}T19:00:00+05:30`;

    eventJsonLd = {
      "@context": "https://schema.org",
      "@type": "Event",
      name: event.title,
      description: event.subheadline,
      startDate: startIso,
      endDate: endIso,
      eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "VirtualLocation",
        url: `${siteUrl}/workshop`,
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        url: `${siteUrl}/workshop`,
      },
      organizer: {
        "@type": "Organization",
        name: "Build60 Campus Community Initiative",
        url: siteUrl,
      },
    };
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F3] text-[#0B1220]">
      {eventJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />
      )}

      <Navbar />

      <main className="flex-1">
        {/* Workshop Hero Strip */}
        <section className="border-b border-[#DCE1E8] bg-white pt-10 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Workshop Details */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-blue-50 text-[#2563EB] border border-blue-200 text-xs font-mono font-bold uppercase tracking-wider">
                    FREE LIVE WORKSHOP
                  </span>
                  <span className="px-2.5 py-1 rounded bg-gray-100 text-gray-700 text-xs font-mono font-medium">
                    FINAL-YEAR ENGINEERING SPRINT
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0B1220] leading-[1.12]">
                  {event.title}
                </h1>

                <p className="text-base sm:text-lg text-[#687386] leading-relaxed max-w-2xl">
                  {event.subheadline}
                </p>

                {/* Event Schedule Card */}
                <div className="p-4 sm:p-5 rounded-xl bg-[#F7F7F3] border border-[#DCE1E8] grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[#2563EB] shrink-0" />
                    <div>
                      <div className="text-[10px] font-mono text-[#687386] uppercase">DATE</div>
                      <div className="text-xs sm:text-sm font-bold text-[#0B1220]">
                        {event.date ? event.date : "Date to be announced"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#2563EB] shrink-0" />
                    <div>
                      <div className="text-[10px] font-mono text-[#687386] uppercase">TIME</div>
                      <div className="text-xs sm:text-sm font-bold text-[#0B1220]">
                        {event.startTime ? `${event.startTime} ${event.timezone}` : "Announcing soon"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-[#2563EB] shrink-0" />
                    <div>
                      <div className="text-[10px] font-mono text-[#687386] uppercase">FORMAT</div>
                      <div className="text-xs sm:text-sm font-bold text-[#0B1220]">
                        {event.mode} Interactive
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <div className="text-[10px] font-mono text-[#687386] uppercase">FEE</div>
                      <div className="text-xs sm:text-sm font-bold text-emerald-700">
                        100% Free
                      </div>
                    </div>
                  </div>
                </div>

                {/* What You'll Leave With */}
                <div className="pt-6 border-t border-[#DCE1E8] space-y-4">
                  <h2 className="text-xl font-bold text-[#0B1220]">
                    What you will actually leave with
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-white border border-[#DCE1E8]">
                      <div className="w-8 h-8 rounded bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold text-sm mb-2">
                        01
                      </div>
                      <h3 className="font-bold text-sm text-[#0B1220]">A Working AI Project</h3>
                      <p className="text-xs text-[#687386] mt-1.5 leading-relaxed">
                        A real, working application you configured and deployed on your own machine.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-white border border-[#DCE1E8]">
                      <div className="w-8 h-8 rounded bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold text-sm mb-2">
                        02
                      </div>
                      <h3 className="font-bold text-sm text-[#0B1220]">Architecture Clarity</h3>
                      <p className="text-xs text-[#687386] mt-1.5 leading-relaxed">
                        A clear, mental blueprint of how modern AI applications are structured from frontend to model.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-white border border-[#DCE1E8]">
                      <div className="w-8 h-8 rounded bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold text-sm mb-2">
                        03
                      </div>
                      <h3 className="font-bold text-sm text-[#0B1220]">A Base to Build Upon</h3>
                      <p className="text-xs text-[#687386] mt-1.5 leading-relaxed">
                        Something tangible and functional that you can continue developing into a capstone project.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 60-Minute Timeline */}
                <div className="pt-6 border-t border-[#DCE1E8] space-y-4">
                  <h2 className="text-xl font-bold text-[#0B1220]">
                    The 60-Minute Sprint Breakdown
                  </h2>

                  <div className="space-y-3">
                    <div className="flex items-start gap-4 p-3.5 rounded-lg bg-white border border-[#DCE1E8]">
                      <span className="font-mono text-xs font-bold text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded">
                        00&ndash;10 min
                      </span>
                      <div>
                        <div className="text-sm font-bold text-[#0B1220]">Understand the Architecture</div>
                        <div className="text-xs text-[#687386] mt-0.5">
                          How user input flows to the model, prompt structuring, and output handling.
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-3.5 rounded-lg bg-white border border-[#DCE1E8]">
                      <span className="font-mono text-xs font-bold text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded">
                        10&ndash;20 min
                      </span>
                      <div>
                        <div className="text-sm font-bold text-[#0B1220]">Environment & API Keys</div>
                        <div className="text-xs text-[#687386] mt-0.5">
                          Quick boilerplate setup, environment configuration and connecting the API client safely.
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-3.5 rounded-lg bg-white border border-[#DCE1E8]">
                      <span className="font-mono text-xs font-bold text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded">
                        20&ndash;50 min
                      </span>
                      <div>
                        <div className="text-sm font-bold text-[#0B1220]">Live Hands-on Build</div>
                        <div className="text-xs text-[#687386] mt-0.5">
                          Coding the core logic, state handling, error boundaries, and streaming response UI.
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-3.5 rounded-lg bg-white border border-[#DCE1E8]">
                      <span className="font-mono text-xs font-bold text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded">
                        50&ndash;60 min
                      </span>
                      <div>
                        <div className="text-sm font-bold text-[#0B1220]">Testing & Next Steps</div>
                        <div className="text-xs text-[#687386] mt-0.5">
                          Verifying edge cases, local deployment check, and guidelines for extending into a full portfolio project.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Prominent Sticky Registration Form */}
              <div id="register-form" className="lg:col-span-5 sticky top-20">
                <RegistrationForm
                  initialPartnerCode={ref}
                  initialStudentRef={studentRef}
                  partnerClubName={partnerClubName}
                  partnerCollegeName={partnerCollegeName}
                  source={ref ? "partner_link" : "direct_workshop"}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
