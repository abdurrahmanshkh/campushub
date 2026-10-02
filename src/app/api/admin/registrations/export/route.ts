import { NextResponse } from "next/server";
import { getRegistrationsCollection } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const registrationsCol = await getRegistrationsCollection();
  const registrations = await registrationsCol
    .find({})
    .sort({ registeredAt: -1 })
    .toArray();

  const headers = [
    "Registration ID",
    "Full Name",
    "Email",
    "College",
    "Graduation Year",
    "Branch",
    "Phone",
    "Partner Code",
    "Source",
    "Student Referral Code",
    "Is Referral Registration",
    "Registered At",
  ];

  const escapeCSV = (val: unknown) => {
    if (val === null || val === undefined) return "";
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = registrations.map((r) => [
    escapeCSV(r._id),
    escapeCSV(r.name),
    escapeCSV(r.emailNormalized),
    escapeCSV(r.college),
    escapeCSV(r.graduationYear),
    escapeCSV(r.branch || "N/A"),
    escapeCSV(r.phone || "N/A"),
    escapeCSV(r.partnerCode || "Direct"),
    escapeCSV(r.source || "direct"),
    escapeCSV(r.studentReferralCode),
    escapeCSV(r.referredByRegistrationId ? "YES" : "NO"),
    escapeCSV(r.registeredAt ? new Date(r.registeredAt).toISOString() : ""),
  ]);

  const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\r\n");

  const timestamp = new Date().toISOString().split("T")[0];
  const filename = `build60_registrations_${timestamp}.csv`;

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
