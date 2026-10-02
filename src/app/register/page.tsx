import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RegistrationForm } from "@/components/RegistrationForm";
import { getActiveEvent } from "@/lib/events";
import { getPartnersCollection } from "@/lib/db";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Register for Build60 Workshop | Free Live AI Session",
  description: "Secure your seat for Build Your First AI Project in 60 Minutes. Hands-on, zero cost, designed for final-year engineering students.",
  alternates: {
    canonical: "/register",
  },
};

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string; studentRef?: string }>;
}) {
  const { ref, studentRef } = await searchParams;
  const event = await getActiveEvent();

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

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F3] text-[#0B1220]">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-50 text-[#2563EB] text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Workshop Registration</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#0B1220]">
              {event.title}
            </h1>
            <p className="text-sm text-[#687386] max-w-lg mx-auto">
              Join the live build sprint. Register below to receive your calendar invite and project resources.
            </p>
          </div>

          <RegistrationForm
            initialPartnerCode={ref}
            initialStudentRef={studentRef}
            partnerClubName={partnerClubName}
            partnerCollegeName={partnerCollegeName}
            source={ref ? "partner_link" : "direct_register"}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
