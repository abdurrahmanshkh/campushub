import fs from "fs";
import path from "path";
import { seedDatabase } from "../lib/seed-service";

// Ensure .env.local is loaded even if runner doesn't support --env-file
function loadEnv() {
  const envLocalPath = path.resolve(process.cwd(), ".env.local");
  const envPath = path.resolve(process.cwd(), ".env");
  const targetPath = fs.existsSync(envLocalPath)
    ? envLocalPath
    : fs.existsSync(envPath)
    ? envPath
    : null;

  if (targetPath) {
    const content = fs.readFileSync(targetPath, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx > 0) {
        const key = trimmed.substring(0, eqIdx).trim();
        let val = trimmed.substring(eqIdx + 1).trim();
        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
          val = val.substring(1, val.length - 1);
        }
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

loadEnv();

async function main() {
  console.log("=== BUILD60 CAMPUS GROWTH HUB SEED SCRIPT ===");
  const targetUri = process.env.MONGODB_URI;
  const targetDb = process.env.MONGODB_DB || "build60";

  console.log(`Target Database: ${targetDb}`);
  console.log(`Target URI: ${targetUri ? targetUri.replace(/:([^@]+)@/, ":****@") : "Default Local"}\n`);

  try {
    const result = await seedDatabase(targetUri, targetDb);
    console.log("\n============================================");
    console.log("  SEED COMPLETED SUCCESSFULLY");
    console.log("============================================");
    console.log(`- Active Event: ${result.event}`);
    console.log(`- Partner Clubs: ${result.partnersCount}`);
    console.log(`- Demo Registrations: ${result.registrationsCount}`);
    console.log(`- Tracking Telemetry Events: ${result.trackingEventsCount}`);
    console.log(`- Admin Credentials: ${result.credentials.admin.email} / ${result.credentials.admin.pass}`);
    console.log(`- Demo Partner: ${result.credentials.partner.email} / ${result.credentials.partner.pass} (${result.credentials.partner.club})`);
    console.log("============================================\n");
    process.exit(0);
  } catch (err: unknown) {
    console.error("\n[ERROR] Seed operation failed:", (err as Error).message);
    process.exit(1);
  }
}

main();
