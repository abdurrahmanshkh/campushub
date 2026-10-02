import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdminLoginForm } from "@/components/AdminLoginForm";
import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Admin Command Console | Build60",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F3] text-[#0B1220]">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#0B1220] text-[#C7F36B] text-xs font-mono font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Growth Operations</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B1220]">
              Campaign Command Console
            </h1>
            <p className="text-xs sm:text-sm text-[#687386]">
              Restricted growth operations access for campaign directors.
            </p>
          </div>

          <AdminLoginForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
