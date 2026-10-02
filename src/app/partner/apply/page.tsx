import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PartnerApplyForm } from "@/components/PartnerApplyForm";
import { Users2 } from "lucide-react";

export const metadata = {
  title: "Partner Your Club | Build60 Campus Growth Hub",
  description:
    "Bring Build60 to your campus. We partner with student clubs and communities that already know how to bring students together.",
  alternates: {
    canonical: "/partner/apply",
  },
};

export default function PartnerApplyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F3] text-[#0B1220]">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#0B1220] text-[#C7F36B] text-xs font-mono font-bold uppercase tracking-wider">
              <Users2 className="w-3.5 h-3.5" />
              <span>Campus Partnership</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B1220]">
              Bring Build60 to your campus.
            </h1>
            <p className="text-base text-[#687386] max-w-xl mx-auto">
              We partner with student clubs and communities that already know how to bring students together.
              Get your custom campaign link, printable QR assets and live attribution.
            </p>
          </div>

          {/* Form */}
          <PartnerApplyForm />

          {/* Partner Perks Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs">
            <div className="p-4 rounded-lg bg-white border border-[#DCE1E8]">
              <div className="font-bold text-[#0B1220]">Verified Attribution</div>
              <div className="text-[#687386] mt-1">
                Every student registration through your channel stays attributed to your club.
              </div>
            </div>
            <div className="p-4 rounded-lg bg-white border border-[#DCE1E8]">
              <div className="font-bold text-[#0B1220]">One-Click Print Assets</div>
              <div className="text-[#687386] mt-1">
                Instant high-contrast QR poster and WhatsApp templates ready to forward.
              </div>
            </div>
            <div className="p-4 rounded-lg bg-white border border-[#DCE1E8]">
              <div className="font-bold text-[#0B1220]">Live Telemetry Console</div>
              <div className="text-[#687386] mt-1">
                Track your registrations in real time and see peer-to-peer student referrals unfold.
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
