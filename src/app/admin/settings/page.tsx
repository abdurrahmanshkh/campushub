import { requireAdmin } from "@/lib/auth";
import { getActiveEvent } from "@/lib/events";
import { AdminNavbar } from "@/components/AdminNavbar";
import { Footer } from "@/components/Footer";
import { AdminSettingsForm } from "@/components/AdminSettingsForm";
import { SlidersHorizontal } from "lucide-react";

export const metadata = {
  title: "Event Settings | Build60 Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminSettingsPage() {
  await requireAdmin();
  const event = await getActiveEvent();

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F3] text-[#0B1220]">
      <AdminNavbar />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#0B1220] text-[#C7F36B] text-xs font-mono font-bold uppercase tracking-wider">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Workshop Configuration</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B1220]">
              Event Parameters &amp; Targets
            </h1>
            <p className="text-xs sm:text-sm text-[#687386]">
              All changes saved here immediately update the public landing page, workshop schedule, and partner promotional kits.
            </p>
          </div>

          <AdminSettingsForm event={event} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
