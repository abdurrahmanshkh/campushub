import { NextResponse } from "next/server";
import { seedDatabase } from "@/lib/seed-service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await seedDatabase();
    return NextResponse.json({
      status: "success",
      message: "Build60 Campus Growth Hub database successfully seeded!",
      ...result,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error during seeding";
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to seed database. Verify MONGODB_URI and MongoDB Atlas network access (allow 0.0.0.0/0).",
        error: message,
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  return GET();
}
