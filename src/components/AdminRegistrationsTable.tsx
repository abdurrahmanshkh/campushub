"use client";

import { useState } from "react";
import { Search, Download, Share2 } from "lucide-react";

interface RegRow {
  _id: string;
  name: string;
  email: string;
  college: string;
  graduationYear: string;
  branch?: string;
  phone?: string;
  partnerCode?: string;
  source: string;
  studentReferralCode: string;
  isReferral: boolean;
  registeredAt: string;
}

export function AdminRegistrationsTable({
  initialRegistrations,
  partnerOptions,
  sourceOptions,
}: {
  initialRegistrations: RegRow[];
  partnerOptions: string[];
  sourceOptions: string[];
}) {
  const [registrations] = useState<RegRow[]>(initialRegistrations);
  const [search, setSearch] = useState("");
  const [partnerFilter, setPartnerFilter] = useState("ALL");
  const [sourceFilter, setSourceFilter] = useState("ALL");
  const [yearFilter, setYearFilter] = useState("ALL");

  const filtered = registrations.filter((r) => {
    const matchSearch =
      search === "" ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      r.college.toLowerCase().includes(search.toLowerCase()) ||
      (r.partnerCode && r.partnerCode.toLowerCase().includes(search.toLowerCase())) ||
      r.studentReferralCode.toLowerCase().includes(search.toLowerCase());

    const matchPartner = partnerFilter === "ALL" || r.partnerCode === partnerFilter;
    const matchSource = sourceFilter === "ALL" || r.source === sourceFilter;
    const matchYear = yearFilter === "ALL" || r.graduationYear === yearFilter;

    return matchSearch && matchPartner && matchSource && matchYear;
  });

  return (
    <div className="space-y-4">
      {/* Controls: Search, Filters & Export */}
      <div className="p-4 rounded-xl bg-white border border-[#DCE1E8] shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, college, code..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-[#DCE1E8] text-xs text-[#0B1220] focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={partnerFilter}
            onChange={(e) => setPartnerFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-[#DCE1E8] text-xs text-[#0B1220] bg-white focus:outline-none"
          >
            <option value="ALL">All Partners</option>
            {partnerOptions.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>

          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-[#DCE1E8] text-xs text-[#0B1220] bg-white focus:outline-none"
          >
            <option value="ALL">All Sources</option>
            {sourceOptions.map((src) => (
              <option key={src} value={src}>
                {src}
              </option>
            ))}
          </select>

          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-[#DCE1E8] text-xs text-[#0B1220] bg-white focus:outline-none"
          >
            <option value="ALL">All Grad Years</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
          </select>

          <a
            href="/api/admin/registrations/export"
            download
            className="h-8 px-3 rounded-lg bg-[#2563EB] hover:bg-[#3B82F6] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CSV</span>
          </a>
        </div>
      </div>

      {/* Registrations Table */}
      <div className="rounded-xl bg-white border border-[#DCE1E8] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F7F7F3] border-b border-[#DCE1E8] text-[#687386] font-mono uppercase">
              <tr>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Email Address</th>
                <th className="py-3 px-4">College</th>
                <th className="py-3 px-4">Grad Year</th>
                <th className="py-3 px-4">Partner</th>
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4">Student Referral Node</th>
                <th className="py-3 px-4 text-right">Registered</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE1E8]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-gray-500 font-mono">
                    No registrations match the selected filters.
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r._id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-4 font-semibold text-[#0B1220]">
                      {r.name}
                    </td>

                    <td className="py-3 px-4 font-mono text-gray-600">
                      {r.email}
                    </td>

                    <td className="py-3 px-4 text-gray-700">
                      {r.college}
                    </td>

                    <td className="py-3 px-4 font-mono text-gray-600">
                      {r.graduationYear}
                    </td>

                    <td className="py-3 px-4 font-mono font-bold text-[#2563EB]">
                      {r.partnerCode || "Direct"}
                    </td>

                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-mono text-[10px]">
                        {r.source}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-mono text-gray-800">
                      {r.isReferral ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                          <Share2 className="w-3 h-3" />
                          <span>{r.studentReferralCode}</span>
                        </span>
                      ) : (
                        <span>{r.studentReferralCode}</span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right font-mono text-gray-500 text-[11px]">
                      {r.registeredAt ? new Date(r.registeredAt).toLocaleDateString() : ""}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
