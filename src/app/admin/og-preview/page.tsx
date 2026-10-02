import { requireAdmin } from "@/lib/auth";
import { AdminNavbar } from "@/components/AdminNavbar";
import { Footer } from "@/components/Footer";
import { Eye, ExternalLink } from "lucide-react";

export const metadata = {
  title: "OG Image Visual Inspector | Build60 Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function OGPreviewPage() {
  await requireAdmin();

  const previewCards = [
    {
      title: "1. Global Homepage Open Graph Card (1200x630)",
      url: "/api/og",
      directUrl: "/api/og",
      notes: "Default social sharing card when homepage is shared on WhatsApp, LinkedIn or X.",
    },
    {
      title: "2. Workshop Acquisition Open Graph Card",
      url: "/api/og?title=Build%20Your%20First%20AI%20Project%20in%2060%20Minutes",
      directUrl: "/api/og?title=Build%20Your%20First%20AI%20Project%20in%2060%20Minutes",
      notes: "Acquisition card highlighting 60-minute hands-on build sprint.",
    },
    {
      title: "3. Northstar Engineering College & GDG Co-Branded Card",
      url: "/api/og?type=partner&college=Northstar%20Engineering%20College&club=Google%20Developer%20Groups%20on%20Campus",
      directUrl: "/api/og?type=partner&college=Northstar%20Engineering%20College&club=Google%20Developer%20Groups%20on%20Campus",
      notes: "Dynamic co-branded card generated when partner referral links are shared.",
    },
    {
      title: "4. Lighthouse Institute & ACM Co-Branded Card",
      url: "/api/og?type=partner&college=Lighthouse%20Institute%20of%20Technology&club=ACM%20Student%20Chapter",
      directUrl: "/api/og?type=partner&college=Lighthouse%20Institute%20of%20Technology&club=ACM%20Student%20Chapter",
      notes: "Dynamic card for Lighthouse ACM campus sprint.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F3] text-[#0B1220]">
      <AdminNavbar />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#0B1220] text-[#C7F36B] text-xs font-mono font-bold uppercase tracking-wider">
              <Eye className="w-3.5 h-3.5" />
              <span>Asset QA Suite</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B1220] mt-1">
              Dynamic Open Graph Image Inspector
            </h1>
            <p className="text-xs sm:text-sm text-[#687386]">
              Visual inspection tool verifying 1200x630 composition, typography balance, contrast and branding.
            </p>
          </div>

          <div className="space-y-8">
            {previewCards.map((item) => (
              <div key={item.title} className="p-6 rounded-xl bg-white border border-[#DCE1E8] shadow-sm space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#DCE1E8]">
                  <div>
                    <h3 className="font-bold text-sm text-[#0B1220]">{item.title}</h3>
                    <p className="text-xs text-[#687386]">{item.notes}</p>
                  </div>
                  <a
                    href={item.directUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-[#2563EB] hover:underline flex items-center gap-1"
                  >
                    <span>Open Raw Image</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="rounded-lg overflow-hidden border border-[#DCE1E8] bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-auto aspect-[1200/630] object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
