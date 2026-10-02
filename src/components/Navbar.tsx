"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0B1220]/95 backdrop-blur border-b border-[#DCE1E8]/10 text-white">
      {/* Top Disclaimer Strip */}
      <div className="bg-[#101A33] border-b border-[#DCE1E8]/10 py-1 px-4 text-center text-[11px] font-mono tracking-wider text-[#687386]">
        BUILD60 &bull; A GROWTH CHALLENGE CONCEPT FOR NXTWAVE &bull; PROTOTYPE OS
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded p-1"
            >
              <div className="w-8 h-8 rounded bg-[#2563EB] flex items-center justify-center font-bold text-white text-base tracking-tighter shadow-sm group-hover:bg-[#3B82F6] transition-colors">
                60
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold tracking-tight text-lg leading-tight text-white">
                  BUILD<span className="text-[#3B82F6]">60</span>
                </span>
                <span className="text-[10px] font-mono text-[#687386] tracking-widest uppercase">
                  Campus Growth Hub
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            <Link
              href="/#why-clubs"
              className="text-sm font-medium text-[#CBD5E1] hover:text-white transition-colors"
            >
              For Clubs
            </Link>
            <Link
              href="/#network"
              className="text-sm font-medium text-[#CBD5E1] hover:text-white transition-colors"
            >
              Distribution Model
            </Link>
            <Link
              href="/#how-it-works"
              className="text-sm font-medium text-[#CBD5E1] hover:text-white transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/workshop"
              className="text-sm font-medium text-[#C7F36B] hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Live Workshop
            </Link>
            <Link
              href="/partner/login"
              className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors"
            >
              Partner Login
            </Link>
            <Link
              href="/admin/login"
              className="text-xs font-mono text-[#64748B] hover:text-[#94A3B8] transition-colors flex items-center gap-1 border border-white/10 px-2 py-1 rounded"
              title="Campaign Console Access"
            >
              <ShieldCheck className="w-3 h-3" />
              Admin
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/partner/apply"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-[#2563EB] hover:bg-[#3B82F6] text-white text-sm font-semibold transition-all shadow-sm active:scale-[0.98]"
            >
              <span>Partner Your Club</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/partner/apply"
              className="px-3 py-1.5 text-xs font-semibold rounded bg-[#2563EB] text-white"
            >
              Partner
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0B1220] px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/#why-clubs"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gray-200 hover:text-white"
          >
            For Student Clubs
          </Link>
          <Link
            href="/#network"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gray-200 hover:text-white"
          >
            Distribution Model
          </Link>
          <Link
            href="/#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gray-200 hover:text-white"
          >
            How It Works
          </Link>
          <Link
            href="/workshop"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-[#C7F36B] hover:text-white"
          >
            Live Workshop
          </Link>
          <Link
            href="/partner/login"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gray-300 hover:text-white"
          >
            Club Partner Login
          </Link>
          <Link
            href="/admin/login"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-xs font-mono text-gray-400 hover:text-white"
          >
            Admin Command Console
          </Link>
          <div className="pt-2">
            <Link
              href="/partner/apply"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-md bg-[#2563EB] text-white font-semibold text-sm"
            >
              <span>Partner Your Club</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
