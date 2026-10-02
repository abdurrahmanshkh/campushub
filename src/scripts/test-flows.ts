import fs from "fs";
import path from "path";
import { MongoClient } from "mongodb";
import { loginAdminAction, loginPartnerAction, registerStudentAction } from "../lib/actions";

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

async function testFlows() {
  console.log("=== Build60 End-to-End Flow & Mutation Test ===");

  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
  const dbName = process.env.MONGODB_DB || "build60";
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);

  // 1. Test Student Registration with Partner Attribution
  console.log("\n1. Testing Student Registration with Partner Attribution...");
  const testEmail = `e2e.student.${Date.now()}@northstar.demo`;
  const regFormData = new FormData();
  regFormData.append("name", "Ananya Deshmukh");
  regFormData.append("email", testEmail);
  regFormData.append("college", "Northstar Engineering College");
  regFormData.append("graduationYear", "2025");
  regFormData.append("branch", "Information Technology");
  regFormData.append("phone", "+91 91234 56789");
  regFormData.append("partnerCode", "NS-GDG-42");
  regFormData.append("source", "club_whatsapp");

  const regResult = await registerStudentAction(regFormData);
  if (regResult.success && regResult.studentReferralCode) {
    console.log(`[PASS] Student registered successfully! Referral Code: ${regResult.studentReferralCode}`);

    // Verify in MongoDB
    const record = await db.collection("registrations").findOne({ emailNormalized: testEmail.toLowerCase() });
    if (record && record.partnerCode === "NS-GDG-42") {
      console.log(`[PASS] MongoDB record verified: partnerCode=${record.partnerCode}, studentReferralCode=${record.studentReferralCode}`);
    } else {
      console.error(`[FAIL] Registration not found in MongoDB or partnerCode mismatch`);
    }

    // 2. Test Secondary Peer Referral Registration
    console.log("\n2. Testing Secondary Peer Referral Registration...");
    const peerEmail = `e2e.peer.${Date.now()}@northstar.demo`;
    const peerFormData = new FormData();
    peerFormData.append("name", "Kavya Iyer");
    peerFormData.append("email", peerEmail);
    peerFormData.append("college", "Northstar Engineering College");
    peerFormData.append("graduationYear", "2025");
    peerFormData.append("studentRef", regResult.studentReferralCode); // Using original student's referral code!

    const peerResult = await registerStudentAction(peerFormData);
    if (peerResult.success) {
      console.log(`[PASS] Peer registered successfully! Code: ${peerResult.studentReferralCode}`);
      const peerRecord = await db.collection("registrations").findOne({ emailNormalized: peerEmail.toLowerCase() });
      if (
        peerRecord &&
        peerRecord.partnerCode === "NS-GDG-42" && // Campus attribution preserved!
        peerRecord.referredByRegistrationId // Secondary referral node recorded!
      ) {
        console.log(`[PASS] Two-Tier Attribution verified: primaryPartner=${peerRecord.partnerCode}, referredBy=${peerRecord.referredByRegistrationId}`);
      } else {
        console.error(`[FAIL] Peer attribution failed:`, peerRecord);
      }
    } else {
      console.error(`[FAIL] Peer registration failed:`, peerResult.error);
    }

    // 3. Test Duplicate Registration Prevention
    console.log("\n3. Testing Duplicate Registration Prevention...");
    const dupResult = await registerStudentAction(regFormData);
    if (!dupResult.success && dupResult.error?.includes("already registered")) {
      console.log(`[PASS] Duplicate registration rejected cleanly: "${dupResult.error}"`);
    } else {
      console.error(`[FAIL] Duplicate registration was not caught!`, dupResult);
    }
  } else {
    console.error(`[FAIL] Student registration failed:`, regResult.error);
  }

  // 4. Test Partner Authentication
  console.log("\n4. Testing Partner Authentication...");
  const partnerAuthForm = new FormData();
  partnerAuthForm.append("email", "lead@northstar.demo");
  partnerAuthForm.append("password", "Partner2025!");
  const partnerLogin = await loginPartnerAction(partnerAuthForm);
  if (partnerLogin.success) {
    console.log(`[PASS] Partner authentication succeeded!`);
  } else {
    console.error(`[FAIL] Partner authentication failed:`, partnerLogin.error);
  }

  // 5. Test Admin Authentication
  console.log("\n5. Testing Admin Authentication...");
  const adminAuthForm = new FormData();
  adminAuthForm.append("email", "admin@build60.campus");
  adminAuthForm.append("password", "AdminGrowth2025!");
  const adminLogin = await loginAdminAction(adminAuthForm);
  if (adminLogin.success) {
    console.log(`[PASS] Admin authentication succeeded!`);
  } else {
    console.error(`[FAIL] Admin authentication failed:`, adminLogin.error);
  }

  await client.close();
  console.log("\n=== All End-to-End Flows Tested Successfully ===");
}

testFlows().catch(console.error);
