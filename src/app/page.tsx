import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DemoBadge } from "@/components/DemoBadge";
import {
  ArrowRight,
  QrCode,
  Share2,
  BarChart3,
  CheckCircle2,
  GraduationCap,
  FileText,
  Smartphone,
  Network,
} from "lucide-react";

export const metadata = {
  title: "Build60 | Campus Growth Hub",
  description:
    "Build60 makes it easy for student clubs to launch, promote and track high-impact technical workshops across campus.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F3] text-[#0B1220]">
      <Navbar />

      <main className="flex-1">
        {/* ========================================================
            HERO SECTION
            ======================================================== */}
        <section className="relative border-b border-[#DCE1E8] bg-paper-grid pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Column: Headline & Action */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0B1220] text-[#C7F36B] text-xs font-mono tracking-wider uppercase">
                  <span>Build60</span>
                  <span className="text-[#687386]">&bull;</span>
                  <span>Campus Growth Hub</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0B1220] leading-[1.08]">
                  Make a great workshop{" "}
                  <span className="text-[#2563EB]">easy to launch.</span>
                </h1>

                <p className="text-base sm:text-lg text-[#687386] max-w-xl leading-relaxed">
                  Give your campus club one link, one QR and a complete campaign kit.
                  Your team handles the campus. Build60 handles the distribution,
                  attribution and momentum.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <Link
                    href="/partner/apply"
                    className="h-12 px-6 rounded-md bg-[#2563EB] hover:bg-[#3B82F6] active:scale-[0.98] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                  >
                    <span>Partner Your Club</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="#how-it-works"
                    className="h-12 px-6 rounded-md border border-[#DCE1E8] bg-white hover:bg-gray-50 text-[#0B1220] font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>See How It Works</span>
                  </Link>
                </div>

                {/* Supporting Strip */}
                <div className="pt-4 border-t border-[#DCE1E8]/80 flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-[#687386]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16803C]" />
                    <span>7-day campus sprint</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                    <span>Unique QR + referral link</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C7F36B] border border-black/20" />
                    <span>Real-time registration tracking</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Visual Console Preview */}
              <div className="lg:col-span-6">
                <div className="bg-[#0B1220] rounded-xl border border-[#DCE1E8]/20 shadow-xl overflow-hidden text-white p-6 sm:p-7">
                  {/* Console Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      <span className="text-xs font-mono text-gray-400 pl-2">
                        CONSOLE // CAMPUS DISPATCH
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      SAMPLE DATA
                    </span>
                  </div>

                  {/* Primary Metrics Row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                        TARGET
                      </div>
                      <div className="text-2xl font-bold font-mono text-white mt-1">
                        500
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                      <div className="text-[10px] font-mono text-blue-300 uppercase tracking-wider">
                        REGISTRATIONS
                      </div>
                      <div className="text-2xl font-bold font-mono text-[#C7F36B] mt-1">
                        326
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                        CAMPUSES
                      </div>
                      <div className="text-2xl font-bold font-mono text-white mt-1">
                        14
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                        TOP SOURCE
                      </div>
                      <div className="text-xs font-semibold text-gray-200 mt-2 truncate">
                        Campus Clubs
                      </div>
                    </div>
                  </div>

                  {/* Minimal Visual Flow */}
                  <div className="p-4 rounded-lg bg-[#101A33] border border-white/10 space-y-3">
                    <div className="text-[11px] font-mono text-gray-400 tracking-wider uppercase">
                      Campaign Lifecycle Architecture
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-center text-xs">
                      <div className="p-2.5 rounded bg-white/5 border border-white/10 flex flex-col items-center gap-1">
                        <span className="text-[10px] font-mono text-blue-400">01</span>
                        <span className="font-semibold text-gray-200">CLUB</span>
                      </div>
                      <div className="p-2.5 rounded bg-white/5 border border-white/10 flex flex-col items-center gap-1">
                        <span className="text-[10px] font-mono text-blue-400">02</span>
                        <span className="font-semibold text-gray-200">QR / LINK</span>
                      </div>
                      <div className="p-2.5 rounded bg-white/5 border border-white/10 flex flex-col items-center gap-1">
                        <span className="text-[10px] font-mono text-blue-400">03</span>
                        <span className="font-semibold text-[#C7F36B]">REGISTER</span>
                      </div>
                      <div className="p-2.5 rounded bg-white/5 border border-white/10 flex flex-col items-center gap-1">
                        <span className="text-[10px] font-mono text-blue-400">04</span>
                        <span className="font-semibold text-emerald-400">REFER</span>
                      </div>
                    </div>
                  </div>

                  {/* Active Partner Snippet */}
                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="font-mono text-gray-400">Recent:</span>
                      <span className="font-medium text-white truncate max-w-[200px]">
                        Northstar Engineering College &bull; 112 regs
                      </span>
                    </div>
                    <Link
                      href="/workshop"
                      className="text-blue-400 hover:text-blue-300 font-mono text-[11px] flex items-center gap-1"
                    >
                      <span>Workshop &rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 1: Built for the people who actually move a campus
            ======================================================== */}
        <section id="why-clubs" className="py-16 sm:py-20 border-b border-[#DCE1E8] bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <span className="text-xs font-mono text-[#2563EB] tracking-wider uppercase font-semibold">
                Direct Distribution
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B1220] mt-2">
                Built for the people who actually move a campus.
              </h2>
              <p className="text-[#687386] text-base mt-3 leading-relaxed">
                Student tech clubs already have the WhatsApp groups, class contacts,
                reputation and peer trust. Build60 provides the operational command
                layer so you can launch in minutes without friction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {/* Column 01 */}
              <div className="p-6 rounded-xl border border-[#DCE1E8] bg-[#F7F7F3] hover:border-[#2563EB]/40 transition-colors">
                <div className="text-xs font-mono text-[#2563EB] font-bold">01 / PARTNER</div>
                <h3 className="text-lg font-bold text-[#0B1220] mt-3">Pick your club</h3>
                <p className="text-sm text-[#687386] mt-2 leading-relaxed">
                  GDG on Campus, ACM, IEEE, CSI or any student developer community. Quick
                  one-minute application.
                </p>
              </div>

              {/* Column 02 */}
              <div className="p-6 rounded-xl border border-[#DCE1E8] bg-[#F7F7F3] hover:border-[#2563EB]/40 transition-colors">
                <div className="text-xs font-mono text-[#2563EB] font-bold">02 / LAUNCH</div>
                <h3 className="text-lg font-bold text-[#0B1220] mt-3">Receive your kit</h3>
                <p className="text-sm text-[#687386] mt-2 leading-relaxed">
                  Instant print-ready poster, high-contrast QR code, verified WhatsApp
                  copy and faculty request templates.
                </p>
              </div>

              {/* Column 03 */}
              <div className="p-6 rounded-xl border border-[#DCE1E8] bg-[#F7F7F3] hover:border-[#2563EB]/40 transition-colors">
                <div className="text-xs font-mono text-[#2563EB] font-bold">03 / TRACK</div>
                <h3 className="text-lg font-bold text-[#0B1220] mt-3">Every registration has a source</h3>
                <p className="text-sm text-[#687386] mt-2 leading-relaxed">
                  See real registrations live on your club dashboard. Clicks, conversions
                  and cohort progress updated automatically.
                </p>
              </div>

              {/* Column 04 */}
              <div className="p-6 rounded-xl border border-[#DCE1E8] bg-[#F7F7F3] hover:border-[#2563EB]/40 transition-colors">
                <div className="text-xs font-mono text-[#2563EB] font-bold">04 / AMPLIFY</div>
                <h3 className="text-lg font-bold text-[#0B1220] mt-3">Students become nodes</h3>
                <p className="text-sm text-[#687386] mt-2 leading-relaxed">
                  Registered students receive tasteful peer share links that attribute
                  back to your campus campaign network.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 2: Your club gets everything it needs to go live
            ======================================================== */}
        <section className="py-16 sm:py-20 border-b border-[#DCE1E8] bg-[#F7F7F3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-mono text-[#2563EB] tracking-wider uppercase font-semibold">
                Operational Campaign Kit
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B1220] mt-2">
                Your club gets everything it needs to go live.
              </h2>
              <p className="text-[#687386] text-base mt-3">
                No graphic designers needed. No waiting for marketing approvals.
                Every asset is dynamically customized for your campus and ready to forward.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              <div className="p-6 rounded-xl bg-white border border-[#DCE1E8] shadow-sm flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-blue-50 text-[#2563EB] shrink-0">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0B1220] text-base">Branded Campus QR</h3>
                  <p className="text-xs text-[#687386] mt-1 leading-relaxed">
                    High error-correction QR code pointing directly to your club attribution link. Perfect for notice boards.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-white border border-[#DCE1E8] shadow-sm flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-blue-50 text-[#2563EB] shrink-0">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0B1220] text-base">WhatsApp Broadcast Copy</h3>
                  <p className="text-xs text-[#687386] mt-1 leading-relaxed">
                    Peer-friendly copy written for batch groups. Tested to avoid feeling spammy or promotional.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-white border border-[#DCE1E8] shadow-sm flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-blue-50 text-[#2563EB] shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0B1220] text-base">A4 Campus Poster</h3>
                  <p className="text-xs text-[#687386] mt-1 leading-relaxed">
                    Clean, high-contrast printable poster featuring your club name, college identity and scan-to-register QR.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-white border border-[#DCE1E8] shadow-sm flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-blue-50 text-[#2563EB] shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0B1220] text-base">Faculty Request Template</h3>
                  <p className="text-xs text-[#687386] mt-1 leading-relaxed">
                    Formal briefing note for Department Heads and faculty advisors without making false claims about credits.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-white border border-[#DCE1E8] shadow-sm flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-blue-50 text-[#2563EB] shrink-0">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0B1220] text-base">Student Referral Nodes</h3>
                  <p className="text-xs text-[#687386] mt-1 leading-relaxed">
                    Secondary share URLs that attribute viral peer growth right back into your primary club counter.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-white border border-[#DCE1E8] shadow-sm flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-blue-50 text-[#2563EB] shrink-0">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0B1220] text-base">Live Registration Telemetry</h3>
                  <p className="text-xs text-[#687386] mt-1 leading-relaxed">
                    Real-time campaign telemetry showing your progress toward target, conversion rates and milestone signals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 3: From one club to a campus network
            ======================================================== */}
        <section id="network" className="py-16 sm:py-20 border-b border-[#DCE1E8] bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-mono text-[#2563EB] tracking-wider uppercase font-semibold">
                  Network Architecture
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B1220]">
                  From one club to a campus network.
                </h2>
                <p className="text-[#687386] text-base leading-relaxed">
                  Traditional education campaigns attempt to reach millions of students directly through paid ads.
                  Build60 equips 5–10 active tech communities per city. Each club distributes through trusted local channels.
                </p>
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                    <p className="text-sm text-gray-700">
                      <strong>Zero spam:</strong> Distributed only where students already congregate.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                    <p className="text-sm text-gray-700">
                      <strong>Preserved attribution:</strong> Campus club credit is never lost during peer forwards.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                    <p className="text-sm text-gray-700">
                      <strong>Repeatable loop:</strong> Turn every successful workshop into a permanent campus bridge.
                    </p>
                  </div>
                </div>
              </div>

              {/* Clean SVG/CSS Network Diagram */}
              <div className="lg:col-span-7">
                <div className="p-6 sm:p-8 rounded-xl bg-[#0B1220] border border-[#DCE1E8]/20 shadow-md text-white">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                    <div className="flex items-center gap-2">
                      <Network className="w-4 h-4 text-blue-400" />
                      <span className="text-xs font-mono text-gray-300">
                        DISTRIBUTION TOPOLOGY
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-[#C7F36B]">
                      TWO-TIER ATTRIBUTION
                    </span>
                  </div>

                  <div className="relative py-4">
                    {/* SVG Connector Lines */}
                    <svg
                      className="w-full h-48"
                      viewBox="0 0 600 200"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Lines from Central Node (100, 100) to Clubs (300, 40), (300, 100), (300, 160) */}
                      <path d="M 120 100 C 200 100, 220 40, 280 40" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4 4" />
                      <path d="M 120 100 L 280 100" stroke="#3B82F6" strokeWidth="2" />
                      <path d="M 120 100 C 200 100, 220 160, 280 160" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4 4" />

                      {/* Lines from Clubs to Student Nodes */}
                      <path d="M 360 40 L 480 30" stroke="#C7F36B" strokeWidth="1.5" />
                      <path d="M 360 40 L 480 60" stroke="#C7F36B" strokeWidth="1.5" />
                      <path d="M 360 100 L 480 90" stroke="#C7F36B" strokeWidth="1.5" />
                      <path d="M 360 100 L 480 120" stroke="#C7F36B" strokeWidth="1.5" />
                      <path d="M 360 160 L 480 150" stroke="#C7F36B" strokeWidth="1.5" />
                      <path d="M 360 160 L 480 180" stroke="#C7F36B" strokeWidth="1.5" />

                      {/* Central Node */}
                      <rect x="20" y="75" width="100" height="50" rx="6" fill="#1E293B" stroke="#3B82F6" strokeWidth="2" />
                      <text x="70" y="98" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">BUILD60</text>
                      <text x="70" y="112" fill="#94A3B8" fontSize="8" textAnchor="middle">CENTRAL DISPATCH</text>

                      {/* Club Nodes */}
                      <rect x="280" y="20" width="85" height="40" rx="4" fill="#101A33" stroke="#DCE1E8" strokeWidth="1" />
                      <text x="322" y="38" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">GDG CLUB</text>
                      <text x="322" y="50" fill="#687386" fontSize="7" textAnchor="middle">Code: NS-GDG</text>

                      <rect x="280" y="80" width="85" height="40" rx="4" fill="#101A33" stroke="#DCE1E8" strokeWidth="1" />
                      <text x="322" y="98" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">ACM CHAPTER</text>
                      <text x="322" y="110" fill="#687386" fontSize="7" textAnchor="middle">Code: LIT-ACM</text>

                      <rect x="280" y="140" width="85" height="40" rx="4" fill="#101A33" stroke="#DCE1E8" strokeWidth="1" />
                      <text x="322" y="158" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">AI SOCIETY</text>
                      <text x="322" y="170" fill="#687386" fontSize="7" textAnchor="middle">Code: APEX-AI</text>

                      {/* Student Nodes */}
                      <circle cx="490" cy="30" r="8" fill="#2563EB" />
                      <circle cx="490" cy="60" r="8" fill="#C7F36B" />
                      <circle cx="490" cy="90" r="8" fill="#2563EB" />
                      <circle cx="490" cy="120" r="8" fill="#C7F36B" />
                      <circle cx="490" cy="150" r="8" fill="#2563EB" />
                      <circle cx="490" cy="180" r="8" fill="#C7F36B" />
                    </svg>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-gray-400 font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
                      <span>Primary Registration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#C7F36B]" />
                      <span>Peer Referral Node</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 4: See the campaign, not just the clicks
            ======================================================== */}
        <section className="py-16 sm:py-20 border-b border-[#DCE1E8] bg-[#F7F7F3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-xs font-mono text-[#2563EB] tracking-wider uppercase font-semibold">
                  Sample Campaign Console
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B1220] mt-2">
                  See the campaign, not just the clicks.
                </h2>
                <p className="text-[#687386] text-sm sm:text-base mt-2 max-w-xl">
                  Inspect genuine growth metrics across campus clusters.
                  Real attribution tells you which clubs activated, which channels converted, and how many students shared.
                </p>
              </div>

              <DemoBadge />
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="p-4 rounded-xl bg-white border border-[#DCE1E8] shadow-sm">
                <div className="text-[10px] font-mono text-[#687386] uppercase tracking-wider">
                  TARGET
                </div>
                <div className="text-2xl font-extrabold text-[#0B1220] mt-1 font-mono">
                  500
                </div>
                <div className="text-[11px] text-[#687386] mt-0.5">Campaign goal</div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#2563EB]/40 shadow-sm">
                <div className="text-[10px] font-mono text-[#2563EB] uppercase tracking-wider font-semibold">
                  REGISTRATIONS
                </div>
                <div className="text-2xl font-extrabold text-[#2563EB] mt-1 font-mono">
                  326
                </div>
                <div className="text-[11px] text-emerald-700 mt-0.5 font-medium">
                  65.2% of target
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#DCE1E8] shadow-sm">
                <div className="text-[10px] font-mono text-[#687386] uppercase tracking-wider">
                  PARTNER CLUBS
                </div>
                <div className="text-2xl font-extrabold text-[#0B1220] mt-1 font-mono">
                  6
                </div>
                <div className="text-[11px] text-[#687386] mt-0.5">Approved & active</div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#DCE1E8] shadow-sm">
                <div className="text-[10px] font-mono text-[#687386] uppercase tracking-wider">
                  PEER REFERRALS
                </div>
                <div className="text-2xl font-extrabold text-emerald-700 mt-1 font-mono">
                  74
                </div>
                <div className="text-[11px] text-[#687386] mt-0.5">22.7% of total</div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#DCE1E8] shadow-sm">
                <div className="text-[10px] font-mono text-[#687386] uppercase tracking-wider">
                  CONVERSION RATE
                </div>
                <div className="text-2xl font-extrabold text-[#0B1220] mt-1 font-mono">
                  58.4%
                </div>
                <div className="text-[11px] text-[#687386] mt-0.5">Clicks to registrations</div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#DCE1E8] shadow-sm">
                <div className="text-[10px] font-mono text-[#687386] uppercase tracking-wider">
                  ACTIVATED
                </div>
                <div className="text-2xl font-extrabold text-blue-700 mt-1 font-mono">
                  5 / 6
                </div>
                <div className="text-[11px] text-[#687386] mt-0.5">Live campus portals</div>
              </div>
            </div>

            {/* Visual Breakdown Strip */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Distribution by Campus Club */}
              <div className="p-6 rounded-xl bg-white border border-[#DCE1E8] shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-[#DCE1E8] mb-4">
                  <h3 className="text-sm font-bold text-[#0B1220]">
                    Campus Club Distribution (Sample)
                  </h3>
                  <span className="text-xs font-mono text-gray-500">SHARE</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
                      <span>Northstar Engineering College (GDG)</span>
                      <span className="font-mono font-bold text-gray-900">112 regs (34%)</span>
                    </div>
                    <div className="w-full h-2 rounded bg-gray-100 overflow-hidden">
                      <div className="h-full bg-[#2563EB]" style={{ width: "34%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
                      <span>Lighthouse Institute of Tech (ACM)</span>
                      <span className="font-mono font-bold text-gray-900">86 regs (26%)</span>
                    </div>
                    <div className="w-full h-2 rounded bg-gray-100 overflow-hidden">
                      <div className="h-full bg-[#3B82F6]" style={{ width: "26%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
                      <span>Apex Institute of Science (AI Club)</span>
                      <span className="font-mono font-bold text-gray-900">73 regs (22%)</span>
                    </div>
                    <div className="w-full h-2 rounded bg-gray-100 overflow-hidden">
                      <div className="h-full bg-blue-400" style={{ width: "22%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
                      <span>Crestview Univ of Engineering (IEEE)</span>
                      <span className="font-mono font-bold text-gray-900">35 regs (11%)</span>
                    </div>
                    <div className="w-full h-2 rounded bg-gray-100 overflow-hidden">
                      <div className="h-full bg-blue-300" style={{ width: "11%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
                      <span>Meridian College of Tech (CSI)</span>
                      <span className="font-mono font-bold text-gray-900">20 regs (7%)</span>
                    </div>
                    <div className="w-full h-2 rounded bg-gray-100 overflow-hidden">
                      <div className="h-full bg-blue-200" style={{ width: "7%" }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Acquisition Channels */}
              <div className="p-6 rounded-xl bg-white border border-[#DCE1E8] shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-[#DCE1E8] mb-4">
                  <h3 className="text-sm font-bold text-[#0B1220]">
                    Which channels actually worked?
                  </h3>
                  <span className="text-xs font-mono text-gray-500">ATTRIBUTION</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
                      <span>Club WhatsApp Broadcasts</span>
                      <span className="font-mono font-bold text-gray-900">128 regs (39%)</span>
                    </div>
                    <div className="w-full h-2 rounded bg-gray-100 overflow-hidden">
                      <div className="h-full bg-emerald-600" style={{ width: "39%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
                      <span>Campus Notice Board QR Codes</span>
                      <span className="font-mono font-bold text-gray-900">84 regs (26%)</span>
                    </div>
                    <div className="w-full h-2 rounded bg-gray-100 overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: "26%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
                      <span>Student Peer Referrals</span>
                      <span className="font-mono font-bold text-emerald-800">74 regs (23%)</span>
                    </div>
                    <div className="w-full h-2 rounded bg-gray-100 overflow-hidden">
                      <div className="h-full bg-[#C7F36B] border border-black/10" style={{ width: "23%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
                      <span>Faculty Email Announcements</span>
                      <span className="font-mono font-bold text-gray-900">26 regs (8%)</span>
                    </div>
                    <div className="w-full h-2 rounded bg-gray-100 overflow-hidden">
                      <div className="h-full bg-gray-400" style={{ width: "8%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
                      <span>Direct / Organic</span>
                      <span className="font-mono font-bold text-gray-900">14 regs (4%)</span>
                    </div>
                    <div className="w-full h-2 rounded bg-gray-100 overflow-hidden">
                      <div className="h-full bg-gray-300" style={{ width: "4%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 5: How it works (4 steps)
            ======================================================== */}
        <section id="how-it-works" className="py-16 sm:py-20 border-b border-[#DCE1E8] bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-mono text-[#2563EB] tracking-wider uppercase font-semibold">
                Operational Playbook
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B1220] mt-2">
                How Build60 works in 4 steps.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-[#2563EB] text-white flex items-center justify-center font-bold text-base font-mono mb-4">
                  01
                </div>
                <h3 className="font-bold text-lg text-[#0B1220]">Apply Your Club</h3>
                <p className="text-sm text-[#687386] mt-2 leading-relaxed">
                  Submit your club details and college name. The campaign team verifies student club leads within 24 hours.
                </p>
              </div>

              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-[#2563EB] text-white flex items-center justify-center font-bold text-base font-mono mb-4">
                  02
                </div>
                <h3 className="font-bold text-lg text-[#0B1220]">Get Instant Kit</h3>
                <p className="text-sm text-[#687386] mt-2 leading-relaxed">
                  Log in to your private portal. Download your custom high-contrast QR code, A4 poster, and pre-formatted WhatsApp text.
                </p>
              </div>

              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-[#2563EB] text-white flex items-center justify-center font-bold text-base font-mono mb-4">
                  03
                </div>
                <h3 className="font-bold text-lg text-[#0B1220]">Broadcast on Campus</h3>
                <p className="text-sm text-[#687386] mt-2 leading-relaxed">
                  Share the tracked link in club WhatsApp groups, pin posters on department boards, and forward to faculty advisors.
                </p>
              </div>

              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-[#2563EB] text-white flex items-center justify-center font-bold text-base font-mono mb-4">
                  04
                </div>
                <h3 className="font-bold text-lg text-[#0B1220]">Watch It Scale</h3>
                <p className="text-sm text-[#687386] mt-2 leading-relaxed">
                  Track every confirmed registration live. Registered students get peer links that compound your campus numbers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 6: FAQ
            ======================================================== */}
        <section className="py-16 sm:py-20 border-b border-[#DCE1E8] bg-[#F7F7F3]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-mono text-[#2563EB] tracking-wider uppercase font-semibold">
                Clear Answers
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-[#0B1220] mt-2">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-white border border-[#DCE1E8]">
                <h3 className="text-base font-bold text-[#0B1220]">What does a club need to do?</h3>
                <p className="text-sm text-[#687386] mt-2 leading-relaxed">
                  Your club team simply accesses the portal, downloads your custom campaign kit, forwards the WhatsApp announcement to your student batches, and puts the printable QR poster on your campus notice boards.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white border border-[#DCE1E8]">
                <h3 className="text-base font-bold text-[#0B1220]">How long does setup take?</h3>
                <p className="text-sm text-[#687386] mt-2 leading-relaxed">
                  Club application takes under 2 minutes. Once approved by our team, your campaign link, QR code, and posters are generated immediately.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white border border-[#DCE1E8]">
                <h3 className="text-base font-bold text-[#0B1220]">Can more than one club from a campus participate?</h3>
                <p className="text-sm text-[#687386] mt-2 leading-relaxed">
                  Yes. Multiple communities (e.g. GDG and ACM at the same university) receive their own unique tracking codes and distinct partner kits.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white border border-[#DCE1E8]">
                <h3 className="text-base font-bold text-[#0B1220]">How are registrations attributed?</h3>
                <p className="text-sm text-[#687386] mt-2 leading-relaxed">
                  When a student clicks your club link or scans your QR, a secure 30-day attribution cookie is established. When they submit their registration, it is directly credited to your club in MongoDB.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white border border-[#DCE1E8]">
                <h3 className="text-base font-bold text-[#0B1220]">Can students share the workshop?</h3>
                <p className="text-sm text-[#687386] mt-2 leading-relaxed">
                  Yes. After registering, each student gets a personal peer link (e.g. /r/s-XXXXX). When their classmates sign up through it, the new registrations are linked as peer referrals while keeping your campus club as the primary partner.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white border border-[#DCE1E8]">
                <h3 className="text-base font-bold text-[#0B1220]">Is the workshop free?</h3>
                <p className="text-sm text-[#687386] mt-2 leading-relaxed">
                  Yes, 100% free. No payment details, credit cards, or hidden fees are required.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white border border-[#DCE1E8]">
                <h3 className="text-base font-bold text-[#0B1220]">Does the club need technical expertise to host?</h3>
                <p className="text-sm text-[#687386] mt-2 leading-relaxed">
                  No. The 60-minute technical instruction is delivered live online. Your club operates as the campus distribution partner and community host.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white border border-[#DCE1E8]">
                <h3 className="text-base font-bold text-[#0B1220]">Can faculty members be involved?</h3>
                <p className="text-sm text-[#687386] mt-2 leading-relaxed">
                  Faculty participation can vary by institution. Build60 provides ready-to-send faculty communication templates so club teams can request support where appropriate. Academic recognition or attendance credit is strictly subject to institutional policy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 7: Final CTA
            ======================================================== */}
        <section className="py-20 bg-[#0B1220] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <span className="text-xs font-mono text-[#C7F36B] tracking-wider uppercase font-semibold">
              Ready for Campus Launch
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Give your campus something worth forwarding.
            </h2>
            <p className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto">
              Partner your club today to receive your custom link, print assets, and live dashboard before the next cohort starts.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/partner/apply"
                className="w-full sm:w-auto h-12 px-8 rounded-md bg-[#2563EB] hover:bg-[#3B82F6] active:scale-[0.98] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <span>Partner Your Club</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/workshop"
                className="w-full sm:w-auto h-12 px-8 rounded-md border border-white/20 hover:bg-white/10 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Register for Workshop</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
