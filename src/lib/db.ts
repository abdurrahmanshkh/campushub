import { MongoClient, Db, Collection } from "mongodb";
import {
  User,
  Partner,
  EventConfig,
  Registration,
  TrackingEvent,
} from "@/types";

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const dbName = process.env.MONGODB_DB || "build60";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const client = new MongoClient(uri, {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
});

if (!global._mongoClientPromise) {
  global._mongoClientPromise = client.connect();
}
const clientPromise: Promise<MongoClient> = global._mongoClientPromise;

export async function getMongoClient(): Promise<MongoClient> {
  return clientPromise;
}

export async function getDb(): Promise<Db> {
  const clientInstance = await getMongoClient();
  return clientInstance.db(dbName);
}

export async function getUsersCollection(): Promise<Collection<User>> {
  const db = await getDb();
  return db.collection<User>("users");
}

export async function getPartnersCollection(): Promise<Collection<Partner>> {
  const db = await getDb();
  return db.collection<Partner>("partners");
}

export async function getEventsCollection(): Promise<Collection<EventConfig>> {
  const db = await getDb();
  return db.collection<EventConfig>("events");
}

export async function getRegistrationsCollection(): Promise<Collection<Registration>> {
  const db = await getDb();
  return db.collection<Registration>("registrations");
}

export async function getTrackingEventsCollection(): Promise<Collection<TrackingEvent>> {
  const db = await getDb();
  return db.collection<TrackingEvent>("trackingEvents");
}

export async function getSettingsCollection(): Promise<Collection<{ key: string; value: unknown; updatedAt: Date }>> {
  const db = await getDb();
  return db.collection<{ key: string; value: unknown; updatedAt: Date }>("settings");
}

let indexesCreated = false;

export async function ensureIndexes(): Promise<void> {
  if (indexesCreated) return;
  try {
    const db = await getDb();
    
    // Registrations indexes
    const registrations = db.collection("registrations");
    await registrations.createIndex(
      { eventId: 1, emailNormalized: 1 },
      { unique: true, name: "uniq_event_email" }
    );
    await registrations.createIndex({ partnerId: 1, registeredAt: -1 });
    await registrations.createIndex({ partnerCode: 1, registeredAt: -1 });
    await registrations.createIndex({ campusId: 1, registeredAt: -1 });
    await registrations.createIndex({ source: 1, registeredAt: -1 });
    await registrations.createIndex({ studentReferralCode: 1 });
    await registrations.createIndex({ registeredAt: -1 });

    // Partners indexes
    const partners = db.collection("partners");
    await partners.createIndex({ code: 1 }, { unique: true, name: "uniq_partner_code" });
    await partners.createIndex({ slug: 1 }, { unique: true, name: "uniq_partner_slug" });
    await partners.createIndex({ status: 1 });
    await partners.createIndex({ collegeName: 1 });

    // Tracking Events indexes
    const trackingEvents = db.collection("trackingEvents");
    await trackingEvents.createIndex({ createdAt: -1 });
    await trackingEvents.createIndex({ partnerId: 1, createdAt: -1 });
    await trackingEvents.createIndex({ partnerCode: 1, createdAt: -1 });
    await trackingEvents.createIndex({ eventId: 1, createdAt: -1 });
    await trackingEvents.createIndex({ type: 1, createdAt: -1 });

    // Users indexes
    const users = db.collection("users");
    await users.createIndex({ email: 1 }, { unique: true, name: "uniq_user_email" });

    indexesCreated = true;
  } catch (error) {
    console.error("Index creation warning (may already exist):", error);
  }
}
