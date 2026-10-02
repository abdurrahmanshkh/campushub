import { getEventsCollection } from "@/lib/db";
import { EventConfig } from "@/types";

export const DEFAULT_EVENT_SLUG = "ai-in-60";

export const FALLBACK_EVENT: EventConfig = {
  slug: DEFAULT_EVENT_SLUG,
  title: "Build Your First AI Project in 60 Minutes",
  subheadline:
    "A free hands-on workshop designed for final-year engineering students who want to move from talking about AI to actually building something.",
  description:
    "Move past surface-level AI theories. In this 60-minute practical workshop, you will configure, wire up, and launch a working AI-powered web tool from scratch. No theoretical slides, pure project build.",
  durationMinutes: 60,
  mode: "Online",
  date: "2026-10-24",
  startTime: "18:00",
  endTime: "19:00",
  timezone: "IST",
  registrationTarget: 500,
  stretchTarget: 550,
  registrationOpen: true,
  ctaText: "Claim Your Workshop Seat",
  isDemo: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export async function getActiveEvent(): Promise<EventConfig> {
  try {
    const events = await getEventsCollection();
    const event = await events.findOne({ slug: DEFAULT_EVENT_SLUG });
    if (event) {
      return event;
    }
  } catch (err) {
    console.error("Error retrieving active event from DB, using fallback:", err);
  }
  return FALLBACK_EVENT;
}
