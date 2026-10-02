import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F3] text-[#0B1220]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="max-w-md mx-auto text-center space-y-5">
          <div className="w-14 h-14 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] flex items-center justify-center mx-auto">
            <Compass className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-gray-500 font-semibold tracking-wider">
              404 &bull; PAGE NOT FOUND
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1220]">
              This link is inactive or moved.
            </h1>
            <p className="text-xs sm:text-sm text-[#687386]">
              The campaign route or page you requested does not exist or may have been archived.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto h-10 px-5 rounded-lg border border-[#DCE1E8] bg-white hover:bg-gray-50 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Homepage</span>
            </Link>

            <Link
              href="/workshop"
              className="w-full sm:w-auto h-10 px-5 rounded-lg bg-[#2563EB] hover:bg-[#3B82F6] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Explore Workshop</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
