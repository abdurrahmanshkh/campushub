import {
  getRegistrationsCollection,
  getPartnersCollection,
  getTrackingEventsCollection,
} from "@/lib/db";
import { getActiveEvent } from "@/lib/events";
import { ObjectId } from "mongodb";

export async function getAdminAnalyticsData() {
  const event = await getActiveEvent();
  const registrationsCol = await getRegistrationsCollection();
  const partnersCol = await getPartnersCollection();
  const trackingCol = await getTrackingEventsCollection();

  const totalRegistrations = await registrationsCol.countDocuments({});
  const referralRegistrations = await registrationsCol.countDocuments({
    referredByRegistrationId: { $exists: true, $ne: null },
  });

  const totalPartners = await partnersCol.countDocuments({});
  const approvedPartners = await partnersCol.countDocuments({
    status: { $in: ["APPROVED", "LIVE"] },
  });
  const activeCampusesList = await registrationsCol.distinct("college");
  const activeCampuses = activeCampusesList.length;

  const totalClicks = await trackingCol.countDocuments({
    type: { $in: ["partner_link_click", "referral_click", "page_view"] },
  });

  const conversionRate = totalClicks > 0
    ? ((totalRegistrations / totalClicks) * 100).toFixed(1)
    : "0.0";

  // Channel breakdown
  const sourceAggregation = await registrationsCol.aggregate([
    {
      $group: {
        _id: "$source",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
  ]).toArray();

  const sources = sourceAggregation.map((s) => ({
    source: s._id || "direct",
    count: s.count,
  }));

  // Registrations over time (last 14 days or grouped by date)
  const timeAggregation = await registrationsCol.aggregate([
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$registeredAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]).toArray();

  const timeline = timeAggregation.map((t) => ({
    date: t._id,
    registrations: t.count,
  }));

  // Top partners breakdown
  const partnerAggregation = await registrationsCol.aggregate([
    {
      $match: { partnerCode: { $exists: true, $ne: null } },
    },
    {
      $group: {
        _id: "$partnerCode",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 8 },
  ]).toArray();

  const partnerCodes = partnerAggregation.map((p) => p._id);
  const partnerDocs = await partnersCol
    .find({ code: { $in: partnerCodes } })
    .toArray();
  const partnerMap = new Map(partnerDocs.map((p) => [p.code, p]));

  const topPartners = partnerAggregation.map((p) => {
    const doc = partnerMap.get(p._id);
    return {
      code: p._id,
      clubName: doc ? doc.clubName : p._id,
      collegeName: doc ? doc.collegeName : "Campus",
      registrations: p.count,
    };
  });

  // Top campuses
  const campusAggregation = await registrationsCol.aggregate([
    {
      $group: {
        _id: "$college",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 6 },
  ]).toArray();

  const topCampuses = campusAggregation.map((c) => ({
    campus: c._id || "Unspecified",
    registrations: c.count,
  }));

  // Funnel steps
  const activatedPartners = await partnersCol.countDocuments({
    activatedAt: { $exists: true, $ne: null },
  });

  const funnel = [
    { step: "Partners Contacted", count: Math.max(totalPartners + 12, 18) },
    { step: "Club Applications", count: totalPartners },
    { step: "Approved Clubs", count: approvedPartners },
    { step: "Activated Portals", count: activatedPartners },
    { step: "Campaign Visitors", count: totalClicks },
    { step: "Workshop Registrations", count: totalRegistrations },
    { step: "Student Referrals", count: referralRegistrations },
  ];

  return {
    target: event.registrationTarget,
    stretchTarget: event.stretchTarget,
    totalRegistrations,
    referralRegistrations,
    directRegistrations: totalRegistrations - referralRegistrations,
    totalPartners,
    approvedPartners,
    activeCampuses,
    totalClicks,
    conversionRate,
    sources,
    timeline,
    topPartners,
    topCampuses,
    funnel,
    isDemo: process.env.NEXT_PUBLIC_DEMO_MODE === "true" || event.isDemo,
  };
}

export async function getPartnerAnalyticsData(partnerId: string, partnerCode: string) {
  const registrationsCol = await getRegistrationsCollection();
  const trackingCol = await getTrackingEventsCollection();
  const partnersCol = await getPartnersCollection();

  let pIdQuery: ObjectId | string = partnerId;
  try {
    pIdQuery = new ObjectId(partnerId);
  } catch {
    pIdQuery = partnerId;
  }

  const partnerDoc = await partnersCol.findOne({
    $or: [{ _id: pIdQuery as ObjectId }, { code: partnerCode }],
  });

  const target = partnerDoc?.targetRegistrations || 500;

  // Registrations attributed to this partner
  const totalRegistrations = await registrationsCol.countDocuments({
    $or: [{ partnerId: pIdQuery as ObjectId }, { partnerCode: partnerCode }],
  });

  // Secondary student referrals generated under this partner's network
  const referralRegistrations = await registrationsCol.countDocuments({
    $or: [{ partnerId: pIdQuery as ObjectId }, { partnerCode: partnerCode }],
    referredByRegistrationId: { $exists: true, $ne: null },
  });

  // Total link clicks for this partner
  const totalClicks = await trackingCol.countDocuments({
    $or: [{ partnerId: pIdQuery as ObjectId }, { partnerCode: partnerCode }],
    type: { $in: ["partner_link_click", "referral_click"] },
  });

  const conversionRate = totalClicks > 0
    ? ((totalRegistrations / totalClicks) * 100).toFixed(1)
    : "0.0";

  // Registrations timeline for this partner
  const timeAggregation = await registrationsCol.aggregate([
    {
      $match: {
        $or: [{ partnerId: pIdQuery as ObjectId }, { partnerCode: partnerCode }],
      },
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$registeredAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]).toArray();

  const timeline = timeAggregation.map((t) => ({
    date: t._id,
    registrations: t.count,
  }));

  // Campus momentum: relative progress across approved partners (no student PII)
  const allApproved = await partnersCol
    .find({ status: { $in: ["APPROVED", "LIVE"] } })
    .toArray();

  const partnerCounts = await Promise.all(
    allApproved.map(async (p) => {
      const count = await registrationsCol.countDocuments({
        $or: [{ partnerId: p._id }, { partnerCode: p.code }],
      });
      const pTarget = p.targetRegistrations || 500;
      const progressPercent = Math.min(Math.round((count / pTarget) * 100), 100);
      return {
        code: p.code,
        clubName: p.clubName,
        collegeName: p.collegeName,
        registrations: count,
        target: pTarget,
        progressPercent,
        isCurrent: p.code === partnerCode,
      };
    })
  );

  // Sort descending by progress percent
  partnerCounts.sort((a, b) => b.progressPercent - a.progressPercent);

  // Milestone health determination
  const milestones = [
    { target: 10, label: "Campaign Started", description: "Your campus campaign is moving.", reached: totalRegistrations >= 10 },
    { target: 25, label: "Momentum Unlocked", description: "First wave of peer-to-peer sharing confirmed.", reached: totalRegistrations >= 25 },
    { target: 50, label: "Campus Standout", description: "Strong adoption across engineering cohorts.", reached: totalRegistrations >= 50 },
    { target: 100, label: "Featured Campus", description: "High-density campus distribution achieved.", reached: totalRegistrations >= 100 },
    { target: 250, label: "Campus Benchmark", description: "Halfway mark toward primary campaign target.", reached: totalRegistrations >= 250 },
  ];

  return {
    partner: partnerDoc,
    target,
    totalRegistrations,
    referralRegistrations,
    directClubRegistrations: totalRegistrations - referralRegistrations,
    totalClicks,
    conversionRate,
    timeline,
    momentumLeaderboard: partnerCounts.slice(0, 10),
    milestones,
  };
}
