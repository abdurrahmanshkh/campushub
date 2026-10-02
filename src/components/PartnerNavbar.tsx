"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/lib/actions";
import {
  LayoutDashboard,
  Megaphone,
  Link2,
  Users2,
  UserCheck,
  LogOut,
  ExternalLink,
} from "lucide-react";

interface PartnerNavbarProps {
  partnerName: string;
  partnerCode: string;
}

export function PartnerNavbar({ partnerName, partnerCode }: PartnerNavbarProps) {
  const pathname = usePathname();

  const navItems = [
    { label: "Overview", href: "/partner/dashboard", icon: LayoutDashboard },
    { label: "Campaign Kit", href: "/partner/campaign", icon: Megaphone },
    { label: "Links & QR", href: "/partner/links", icon: Link2 },
    { label: "Referral Nodes", href: "/partner/referrals", icon: Users2 },
    { label: "Profile", href: "/partner/profile", icon: UserCheck },
  ];

  return (
    <header className="bg-[#0B1220] border-b border-[#DCE1E8]/10 text-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Partner Identity */}
          <div className="flex items-center gap-3">
            <Link href="/partner/dashboard" className="flex items-center gap-2">
              <span className="w-7 h-7 rounded bg-[#2563EB] flex items-center justify-center font-bold text-white text-xs">
                60
              </span>
              <span className="font-bold tracking-tight text-white text-base">
                BUILD<span className="text-[#3B82F6]">60</span>
              </span>
            </Link>
            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-white/10 text-xs">
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono font-semibold">
                {partnerCode}
              </span>
              <span className="text-gray-300 font-medium truncate max-w-[200px]">
                {partnerName}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Partner Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold transition-colors ${
                    isActive
                      ? "bg-white/15 text-white shadow-sm"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Actions: View Link & Logout */}
          <div className="flex items-center gap-3">
            <Link
              href={`/r/${partnerCode}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-mono bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition-colors"
            >
              <span>Test /r/{partnerCode}</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <form action={logoutAction}>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium text-gray-300 hover:text-white hover:bg-red-500/20 transition-colors border border-white/10"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </form>
          </div>
        </div>

        {/* Mobile Horizontal Subnav */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-2 border-t border-white/5 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap flex items-center gap-1 px-3 py-1.5 rounded text-xs font-semibold ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
