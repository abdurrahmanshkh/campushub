import { notFound } from "next/navigation";
import { getPartnersCollection } from "@/lib/db";
import { getActiveEvent } from "@/lib/events";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RegistrationForm } from "@/components/RegistrationForm";
import { CheckCircle2 } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const partnersCol = await getPartnersCollection();
  const partner = await partnersCol.findOne({ slug });

  if (!partner) {
    return {
      title: "Campus Campaign | Build60",
    };
  }

  const isIndexable = partner.status === "APPROVED" || partner.status === "LIVE";

  return {
    title: `Build60 at ${partner.collegeName} | Free AI Workshop`,
    description: `Join ${partner.clubName} at ${partner.collegeName} for Build Your First AI Project in 60 Minutes. Hands-on student sprint.`,
    alternates: {
      canonical: `/campus/${slug}`,
    },
    robots: {
      index: isIndexable,
      follow: isIndexable,
    },
    openGraph: {
      title: `Build60 at ${partner.collegeName}`,
      description: `Hosted with ${partner.clubName}. Build your first practical AI project in 60 minutes.`,
      images: [
        {
          url: `/api/og?type=partner&college=${encodeURIComponent(
            partner.collegeName
          )}&club=${encodeURIComponent(partner.clubName)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function CampusPublicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const partnersCol = await getPartnersCollection();
  const partner = await partnersCol.findOne({ slug });

  if (!partner) {
    notFound();
  }

  const event = await getActiveEvent();

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F3] text-[#0B1220]">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Campus Collaboration Hero */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded bg-[#0B1220] text-[#C7F36B] text-xs font-mono font-bold uppercase tracking-wider">
                  Campus Co-Host
                </span>
                <span className="px-2.5 py-1 rounded bg-blue-50 text-[#2563EB] text-xs font-mono font-semibold">
                  Partner Code: {partner.code}
                </span>
              </div>

              <div>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0B1220] leading-[1.12]">
                  Build60 at {partner.collegeName}
                </h1>
                <p className="text-lg text-[#687386] mt-3 leading-relaxed">
                  Join <strong className="text-gray-900">{partner.clubName}</strong> for a free, hands-on workshop:{" "}
                  <em>{event.title}</em>.
                </p>
              </div>

              {/* Event Quick Strip */}
              <div className="p-5 rounded-xl bg-white border border-[#DCE1E8] shadow-sm grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <div className="text-[10px] font-mono text-[#687386] uppercase">DATE</div>
                  <div className="text-sm font-bold text-[#0B1220] mt-0.5">{event.date || "TBA"}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#687386] uppercase">TIME</div>
                  <div className="text-sm font-bold text-[#0B1220] mt-0.5">
                    {event.startTime ? `${event.startTime} ${event.timezone}` : "TBA"}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#687386] uppercase">FORMAT</div>
                  <div className="text-sm font-bold text-[#0B1220] mt-0.5">{event.mode}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#687386] uppercase">TUITION</div>
                  <div className="text-sm font-bold text-emerald-700 mt-0.5">100% Free</div>
                </div>
              </div>

              {/* What students will build */}
              <div className="p-6 rounded-xl bg-white border border-[#DCE1E8] shadow-sm space-y-3">
                <h2 className="text-base font-bold text-[#0B1220]">
                  Why participate through your campus chapter?
                </h2>
                <ul className="text-xs sm:text-sm text-[#687386] space-y-2.5">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Build alongside peers from your engineering department and batch.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Leave with a working project configured on your local developer machine.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Receive secondary peer links to invite project collaborators.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Pre-attributed Registration Form */}
            <div className="lg:col-span-5 sticky top-20">
              <RegistrationForm
                initialPartnerCode={partner.code}
                partnerClubName={partner.clubName}
                partnerCollegeName={partner.collegeName}
                source="campus_page"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
