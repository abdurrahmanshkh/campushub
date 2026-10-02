import { requireAdmin } from "@/lib/auth";
import { getPartnersCollection, getRegistrationsCollection, getTrackingEventsCollection } from "@/lib/db";
import { AdminNavbar } from "@/components/AdminNavbar";
import { Footer } from "@/components/Footer";
import { AdminPartnersTable } from "@/components/AdminPartnersTable";
import { Building2 } from "lucide-react";

export const metadata = {
  title: "Partner Clubs Management | Build60 Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPartnersPage() {
  await requireAdmin();
  const partnersCol = await getPartnersCollection();
  const registrationsCol = await getRegistrationsCollection();
  const trackingCol = await getTrackingEventsCollection();

  const allPartners = await partnersCol.find({}).sort({ createdAt: -1 }).toArray();

  const partnerRows = await Promise.all(
    allPartners.map(async (p) => {
      const regCount = await registrationsCol.countDocuments({
        $or: [{ partnerId: p._id }, { partnerCode: p.code }],
      });
      const clickCount = await trackingCol.countDocuments({
        $or: [{ partnerId: p._id }, { partnerCode: p.code }],
        type: { $in: ["partner_link_click", "referral_click"] },
      });

      return {
        _id: p._id?.toString() || "",
        code: p.code,
        slug: p.slug,
        clubName: p.clubName,
        clubType: p.clubType,
        collegeName: p.collegeName,
        city: p.city,
        leadName: p.leadName,
        email: p.email,
        phone: p.phone,
        status: p.status,
        registrationsCount: regCount,
        clicksCount: clickCount,
        createdAt: p.createdAt ? new Date(p.createdAt).toISOString() : "",
      };
    })
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F3] text-[#0B1220]">
      <AdminNavbar />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#0B1220] text-[#C7F36B] text-xs font-mono font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>Campus Distribution Partners</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B1220]">
              Partner Clubs &amp; Chapters
            </h1>
            <p className="text-xs sm:text-sm text-[#687386]">
              Review club applications, toggle approval status, and inspect per-campus attribution.
            </p>
          </div>

          <AdminPartnersTable initialPartners={partnerRows} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
