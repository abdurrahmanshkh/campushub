import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#0B1220] border-t border-[#DCE1E8]/10 text-white py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded bg-[#2563EB] flex items-center justify-center font-bold text-white text-xs">
              60
            </div>
            <span className="font-extrabold tracking-tight text-white text-base">
              BUILD<span className="text-[#3B82F6]">60</span>
            </span>
          </div>
          <p className="text-sm text-[#94A3B8] font-medium">
            Campus Growth Hub &bull; Distribution Operating System
          </p>
          <p className="text-xs text-[#687386] font-mono mt-1">
            A Growth Challenge Concept for NxtWave &bull; Prototype for Assessment
          </p>
          <p className="text-xs text-[#475569] mt-2 max-w-md">
            This platform is an independent product architecture demo created for evaluation. It is not operated by or affiliated officially with NxtWave.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-[#94A3B8]">
          <Link href="/workshop" className="hover:text-white transition-colors">
            Workshop
          </Link>
          <Link href="/partner/apply" className="hover:text-white transition-colors">
            Partner Club
          </Link>
          <Link href="/partner/login" className="hover:text-white transition-colors">
            Partner Portal
          </Link>
          <Link href="/admin/login" className="hover:text-white transition-colors">
            Admin Console
          </Link>
          <Link href="/#how-it-works" className="hover:text-white transition-colors">
            How It Works
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-xs text-[#64748B] font-mono">
        <div>&copy; {new Date().getFullYear()} Build60 Project. All prototype rights reserved.</div>
        <div className="mt-2 sm:mt-0">Attribution Engine &bull; Zero Fake Data Guarantee</div>
      </div>
    </footer>
  );
}
