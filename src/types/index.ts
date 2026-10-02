import { ObjectId } from "mongodb";

export type UserRole = "ADMIN" | "PARTNER";

export interface User {
  _id?: ObjectId | string;
  email: string;
  passwordHash: string;
  name: string;
  role: UserRole;
  partnerId?: ObjectId | string;
  createdAt: Date;
  updatedAt: Date;
}

export type PartnerStatus =
  | "APPLIED"
  | "CONTACTED"
  | "APPROVED"
  | "LIVE"
  | "PAUSED"
  | "REJECTED";

export interface Partner {
  _id?: ObjectId | string;
  code: string;
  slug: string;
  clubName: string;
  clubType: string;
  collegeName: string;
  city: string;
  logoUrl?: string;
  leadName: string;
  email: string;
  phone: string;
  facultyName?: string;
  facultyEmail?: string;
  approximateCommunitySize: number;
  applicationReason: string;
  status: PartnerStatus;
  targetRegistrations: number;
  approvedAt?: Date;
  activatedAt?: Date | null;
  isDemo?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface EventConfig {
  _id?: ObjectId | string;
  slug: string;
  title: string;
  subheadline: string;
  description: string;
  durationMinutes: number;
  mode: "Online" | "Hybrid" | "In-Person";
  date?: string; // YYYY-MM-DD
  startTime?: string; // HH:mm
  endTime?: string; // HH:mm
  timezone: string;
  registrationTarget: number;
  stretchTarget: number;
  registrationOpen: boolean;
  ctaText: string;
  isDemo?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Registration {
  _id?: ObjectId | string;
  eventId: ObjectId | string;
  name: string;
  emailNormalized: string;
  college: string;
  graduationYear: string;
  branch?: string;
  phone?: string;
  partnerId?: ObjectId | string;
  partnerCode?: string;
  campusId?: string;
  source: string;
  medium?: string;
  campaign?: string;
  content?: string;
  firstTouchRef?: string;
  lastTouchRef?: string;
  studentReferralCode: string;
  referredByRegistrationId?: ObjectId | string | null;
  isDemo?: boolean;
  registeredAt: Date;
}

export type TrackingEventType =
  | "page_view"
  | "partner_link_click"
  | "registration_started"
  | "registration_completed"
  | "share_click"
  | "asset_download"
  | "referral_click";

export interface TrackingEvent {
  _id?: ObjectId | string;
  eventId?: ObjectId | string;
  type: TrackingEventType;
  sessionId?: string;
  partnerId?: ObjectId | string;
  partnerCode?: string;
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  registrationId?: ObjectId | string;
  isDemo?: boolean;
  createdAt: Date;
}

export interface AttributionCookie {
  partnerCode?: string;
  referralCode?: string;
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  firstTouchAt: string;
  lastTouchAt: string;
}

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
  partnerId?: string;
  partnerCode?: string;
}
