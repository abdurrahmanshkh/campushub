"use client";

import { useState } from "react";
import Link from "next/link";
import { updatePartnerStatusAction } from "@/lib/actions";
import { PartnerStatus } from "@/types";
import {
  Search,
  ChevronRight,
} from "lucide-react";

interface PartnerRow {
  _id: string;
  code: string;
  slug: string;
  clubName: string;
  clubType: string;
  collegeName: string;
  city: string;
  leadName: string;
  email: string;
  phone: string;
  status: PartnerStatus;
  registrationsCount: number;
  clicksCount: number;
  createdAt: string;
}

export function AdminPartnersTable({ initialPartners }: { initialPartners: PartnerRow[] }) {
  const [partners, setPartners] = useState<PartnerRow[]>(initialPartners);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [clubTypeFilter, setClubTypeFilter] = useState<string>("ALL");
  const [processingId, setProcessingId] = useState<string | null>(null);

  const filtered = partners.filter((p) => {
    const matchSearch =
      search === "" ||
      p.clubName.toLowerCase().includes(search.toLowerCase()) ||
      p.collegeName.toLowerCase().includes(search.toLowerCase()) ||
      p.code.toLowerCase().includes(search.toLowerCase()) ||
      p.leadName.toLowerCase().includes(search.toLowerCase());

    const matchStatus = statusFilter === "ALL" || p.status === statusFilter;
    const matchType = clubTypeFilter === "ALL" || p.clubType === clubTypeFilter;

    return matchSearch && matchStatus && matchType;
  });

  async function handleStatusChange(id: string, newStatus: PartnerStatus) {
    setProcessingId(id);
    try {
      const res = await updatePartnerStatusAction(id, newStatus);
      if (res.success) {
        setPartners((prev) =>
          prev.map((p) => (p._id === id ? { ...p, status: newStatus } : p))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setProcessingId(null);
    }
  }

  const statusBadge = (status: PartnerStatus) => {
    switch (status) {
      case "APPROVED":
      case "LIVE":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "APPLIED":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "PAUSED":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "REJECTED":
        return "bg-red-50 text-red-800 border-red-200";
      default:
        return "bg-blue-50 text-blue-800 border-blue-200";
    }
  };

  return (
    <div className="space-y-4">
      {/* Controls: Search & Filters */}
      <div className="p-4 rounded-xl bg-white border border-[#DCE1E8] shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search club, college, code, lead..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-[#DCE1E8] text-xs text-[#0B1220] focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-[#DCE1E8] text-xs text-[#0B1220] bg-white focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="APPLIED">Applied (Pending Review)</option>
            <option value="APPROVED">Approved</option>
            <option value="LIVE">Live</option>
            <option value="PAUSED">Paused</option>
            <option value="REJECTED">Rejected</option>
          </select>

          <select
            value={clubTypeFilter}
            onChange={(e) => setClubTypeFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-[#DCE1E8] text-xs text-[#0B1220] bg-white focus:outline-none"
          >
            <option value="ALL">All Club Types</option>
            <option value="GDG on Campus">GDG on Campus</option>
            <option value="ACM">ACM</option>
            <option value="IEEE">IEEE</option>
            <option value="CSI">CSI</option>
            <option value="Coding club">Coding Club</option>
            <option value="AI/ML club">AI/ML Club</option>
          </select>
        </div>
      </div>

      {/* Partners Table */}
      <div className="rounded-xl bg-white border border-[#DCE1E8] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F7F7F3] border-b border-[#DCE1E8] text-[#687386] font-mono uppercase">
              <tr>
                <th className="py-3 px-4">Club / Campus</th>
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Club Type</th>
                <th className="py-3 px-4">Lead Contact</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Registrations</th>
                <th className="py-3 px-4 text-right">Clicks</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE1E8]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-gray-500 font-mono">
                    No partner clubs match the selected filters.
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <Link
                        href={`/admin/partners/${p._id}`}
                        className="font-bold text-[#0B1220] hover:text-[#2563EB] flex items-center gap-1.5"
                      >
                        <span>{p.clubName}</span>
                        <ChevronRight className="w-3 h-3 text-gray-400" />
                      </Link>
                      <div className="text-[11px] text-gray-500">{p.collegeName}, {p.city}</div>
                    </td>

                    <td className="py-3 px-4 font-mono font-bold text-[#2563EB]">
                      {p.code}
                    </td>

                    <td className="py-3 px-4 text-gray-600">
                      {p.clubType}
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{p.leadName}</div>
                      <div className="text-[11px] text-gray-500 font-mono">{p.email}</div>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded border text-[10px] font-mono font-bold uppercase ${statusBadge(
                          p.status
                        )}`}
                      >
                        {p.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right font-mono font-bold text-gray-900">
                      {p.registrationsCount}
                    </td>

                    <td className="py-3 px-4 text-right font-mono text-gray-600">
                      {p.clicksCount}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-1">
                        {p.status === "APPLIED" ? (
                          <button
                            type="button"
                            disabled={processingId === p._id}
                            onClick={() => handleStatusChange(p._id, "APPROVED")}
                            className="px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold transition-colors cursor-pointer"
                            title="Approve Partner"
                          >
                            Approve
                          </button>
                        ) : p.status === "APPROVED" || p.status === "LIVE" ? (
                          <button
                            type="button"
                            disabled={processingId === p._id}
                            onClick={() => handleStatusChange(p._id, "PAUSED")}
                            className="px-2 py-1 rounded border border-gray-300 hover:bg-gray-100 text-gray-700 text-[11px] transition-colors cursor-pointer"
                            title="Pause Partner"
                          >
                            Pause
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled={processingId === p._id}
                            onClick={() => handleStatusChange(p._id, "APPROVED")}
                            className="px-2 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-[11px] transition-colors cursor-pointer"
                            title="Reactivate Partner"
                          >
                            Reactivate
                          </button>
                        )}

                        <Link
                          href={`/admin/partners/${p._id}`}
                          className="p-1 rounded text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                          title="View Details"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
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
