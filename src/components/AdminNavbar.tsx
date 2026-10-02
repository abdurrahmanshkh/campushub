"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/lib/actions";
import {
  LayoutDashboard,
  Building2,
  FileSpreadsheet,
  BarChart3,
  SlidersHorizontal,
  LogOut,
  ShieldAlert,
} from "lucide-react";

export function AdminNavbar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Partners", href: "/admin/partners", icon: Building2 },
    { label: "Registrations", href: "/admin/registrations", icon: FileSpreadsheet },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { label: "Settings", href: "/admin/settings", icon: SlidersHorizontal },
  ];

  return (
    <header className="bg-[#0B1220] border-b border-[#DCE1E8]/10 text-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Admin Identity */}
          <div className="flex items-center gap-3">
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <span className="w-7 h-7 rounded bg-[#2563EB] flex items-center justify-center font-bold text-white text-xs">
                60
              </span>
              <span className="font-bold tracking-tight text-white text-base">
                BUILD<span className="text-[#3B82F6]">60</span>
              </span>
            </Link>
            <div className="hidden sm:flex items-center gap-1.5 pl-3 border-l border-white/10 text-xs">
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-semibold flex items-center gap-1">
                <ShieldAlert className="w-3 h-3" />
                COMMAND CONSOLE
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Admin Navigation">
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

          {/* Actions & Logout */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-gray-400 hover:text-white hidden lg:inline"
            >
              Public Site &rarr;
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
