import { requireAdmin } from "@/lib/auth";
import { getRegistrationsCollection, getPartnersCollection } from "@/lib/db";
import { AdminNavbar } from "@/components/AdminNavbar";
import { Footer } from "@/components/Footer";
import { AdminRegistrationsTable } from "@/components/AdminRegistrationsTable";
import { FileSpreadsheet } from "lucide-react";

export const metadata = {
  title: "Registrations Telemetry | Build60 Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminRegistrationsPage() {
  await requireAdmin();
  const registrationsCol = await getRegistrationsCollection();
  const partnersCol = await getPartnersCollection();

  const registrations = await registrationsCol
    .find({})
    .sort({ registeredAt: -1 })
    .toArray();

  const partners = await partnersCol.find({}).toArray();
  const partnerOptions = partners.map((p) => p.code).filter(Boolean);
  const sourceOptions = Array.from(new Set(registrations.map((r) => r.source || "direct")));

  const rows = registrations.map((r) => ({
    _id: r._id?.toString() || "",
    name: r.name,
    email: r.emailNormalized,
    college: r.college,
    graduationYear: r.graduationYear,
    branch: r.branch,
    phone: r.phone,
    partnerCode: r.partnerCode,
    source: r.source || "direct",
    studentReferralCode: r.studentReferralCode,
    isReferral: Boolean(r.referredByRegistrationId),
    registeredAt: r.registeredAt ? new Date(r.registeredAt).toISOString() : "",
  }));

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F3] text-[#0B1220]">
      <AdminNavbar />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#0B1220] text-[#C7F36B] text-xs font-mono font-bold uppercase tracking-wider">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Registration Records</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B1220]">
              Workshop Registrations ({registrations.length})
            </h1>
            <p className="text-xs sm:text-sm text-[#687386]">
              All confirmed attendee records with two-tier attribution and export to CSV.
            </p>
          </div>

          <AdminRegistrationsTable
            initialRegistrations={rows}
            partnerOptions={partnerOptions}
            sourceOptions={sourceOptions}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
