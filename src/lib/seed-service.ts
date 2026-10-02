import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcryptjs";

export interface SeedResult {
  success: boolean;
  event: string;
  partnersCount: number;
  usersCount: number;
  registrationsCount: number;
  trackingEventsCount: number;
  credentials: {
    admin: { email: string; pass: string };
    partner: { email: string; pass: string; club: string };
  };
  error?: string;
}

export async function seedDatabase(targetUri?: string, targetDbName?: string): Promise<SeedResult> {
  const uri = targetUri || process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
  const dbName = targetDbName || process.env.MONGODB_DB || "build60";

  console.log(`Connecting to MongoDB to seed database: [${dbName}] at ${uri.replace(/:([^@]+)@/, ":****@")}`);
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 8000,
  });

  try {
    await client.connect();
    const db = client.db(dbName);

    console.log("1. Resetting previous demo records...");
    await db.collection("users").deleteMany({
      email: {
        $in: [
          "admin@build60.campus",
          "lead@northstar.demo",
          "lead@lighthouse.demo",
          "lead@apex.demo",
          "lead@crestview.demo",
          "lead@meridian.demo",
          "lead@demo.tech",
        ],
      },
    });
    await db.collection("partners").deleteMany({ isDemo: true });
    await db.collection("events").deleteMany({ slug: "ai-in-60" });
    await db.collection("registrations").deleteMany({ isDemo: true });
    await db.collection("trackingEvents").deleteMany({ isDemo: true });

    console.log("2. Ensuring compound indexes...");
    await db.collection("registrations").createIndex(
      { eventId: 1, emailNormalized: 1 },
      { unique: true, name: "uniq_event_email" }
    );
    await db.collection("registrations").createIndex({ partnerCode: 1, registeredAt: -1 });
    await db.collection("registrations").createIndex({ studentReferralCode: 1 });
    await db.collection("registrations").createIndex({ registeredAt: -1 });

    await db.collection("partners").createIndex({ code: 1 }, { unique: true, name: "uniq_partner_code" });
    await db.collection("partners").createIndex({ slug: 1 }, { unique: true, name: "uniq_partner_slug" });
    await db.collection("users").createIndex({ email: 1 }, { unique: true, name: "uniq_user_email" });

    console.log("3. Seeding Active Workshop Event...");
    const eventId = new ObjectId();
    await db.collection("events").insertOne({
      _id: eventId,
      slug: "ai-in-60",
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
    });

    console.log("4. Seeding Partner Clubs...");
    const partnerData = [
      {
        code: "NS-GDG-42",
        slug: "northstar-gdg",
        clubName: "Google Developer Groups on Campus",
        clubType: "GDG on Campus",
        collegeName: "Northstar Engineering College",
        city: "Bengaluru",
        leadName: "Arjun Verma",
        email: "lead@northstar.demo",
        phone: "+91 98765 43210",
        facultyName: "Dr. K. Ramanathan",
        facultyEmail: "hod.cse@northstar.demo",
        approximateCommunitySize: 1200,
        applicationReason: "Our final year students need real project experience before campus placements.",
        status: "APPROVED",
        targetRegistrations: 500,
        approvedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
        activatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6),
        isDemo: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8),
        updatedAt: new Date(),
      },
      {
        code: "LIT-ACM-19",
        slug: "lighthouse-acm",
        clubName: "ACM Student Chapter",
        clubType: "ACM",
        collegeName: "Lighthouse Institute of Technology",
        city: "Hyderabad",
        leadName: "Sneha Reddy",
        email: "lead@lighthouse.demo",
        phone: "+91 98765 43211",
        facultyName: "Prof. P. Sunitha",
        facultyEmail: "faculty.acm@lighthouse.demo",
        approximateCommunitySize: 850,
        applicationReason: "Engage pre-final and final year developers in hands-on LLM engineering.",
        status: "APPROVED",
        targetRegistrations: 400,
        approvedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6),
        activatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
        isDemo: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
        updatedAt: new Date(),
      },
      {
        code: "APEX-AI-88",
        slug: "apex-ai-club",
        clubName: "Apex AI & Data Science Club",
        clubType: "AI/ML club",
        collegeName: "Apex Institute of Science & Technology",
        city: "Pune",
        leadName: "Rohan Deshmukh",
        email: "lead@apex.demo",
        phone: "+91 98765 43212",
        facultyName: "Dr. S. Kulkarni",
        facultyEmail: "head.ai@apex.demo",
        approximateCommunitySize: 600,
        applicationReason: "Provide rapid deployment workshop for aspiring machine learning engineers.",
        status: "APPROVED",
        targetRegistrations: 350,
        approvedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
        activatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
        isDemo: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6),
        updatedAt: new Date(),
      },
      {
        code: "CV-IEEE-07",
        slug: "crestview-ieee",
        clubName: "IEEE Student Branch",
        clubType: "IEEE",
        collegeName: "Crestview University of Engineering",
        city: "Chennai",
        leadName: "Kavya Sundaram",
        email: "lead@crestview.demo",
        phone: "+91 98765 43213",
        approximateCommunitySize: 750,
        applicationReason: "Upskill IEEE tech club members in modern developer tooling.",
        status: "APPROVED",
        targetRegistrations: 300,
        approvedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
        activatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
        isDemo: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
        updatedAt: new Date(),
      },
      {
        code: "MCT-CSI-33",
        slug: "meridian-csi",
        clubName: "CSI Student Chapter",
        clubType: "CSI",
        collegeName: "Meridian College of Technology",
        city: "Coimbatore",
        leadName: "Vikas Nair",
        email: "lead@meridian.demo",
        phone: "+91 98765 43214",
        approximateCommunitySize: 500,
        applicationReason: "Introduce practical full-stack AI integration to club members.",
        status: "APPROVED",
        targetRegistrations: 250,
        approvedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
        activatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        isDemo: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
        updatedAt: new Date(),
      },
      {
        code: "DIT-CODE-11",
        slug: "demo-inst-coding",
        clubName: "Coding & Innovation Society",
        clubType: "Coding club",
        collegeName: "Demo Institute of Technology",
        city: "Noida",
        leadName: "Pooja Sharma",
        email: "lead@demo.tech",
        phone: "+91 98765 43215",
        approximateCommunitySize: 450,
        applicationReason: "Weekend hackathon preparation and project kickstarter.",
        status: "APPLIED",
        targetRegistrations: 200,
        isDemo: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
        updatedAt: new Date(),
      },
    ];

    const insertedPartners = await db.collection("partners").insertMany(partnerData);
    const northstarPartnerId = insertedPartners.insertedIds[0];
    const lighthousePartnerId = insertedPartners.insertedIds[1];
    const apexPartnerId = insertedPartners.insertedIds[2];

    console.log("5. Seeding Accounts (Admin & Partners)...");
    const salt = await bcrypt.genSalt(10);
    const adminPasswordHash = await bcrypt.hash("AdminGrowth2025!", salt);
    const partnerPasswordHash = await bcrypt.hash("Partner2025!", salt);

    await db.collection("users").insertMany([
      {
        email: "admin@build60.campus",
        passwordHash: adminPasswordHash,
        name: "Campaign Growth Lead",
        role: "ADMIN",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "lead@northstar.demo",
        passwordHash: partnerPasswordHash,
        name: "Arjun Verma (Northstar GDG)",
        role: "PARTNER",
        partnerId: northstarPartnerId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "lead@lighthouse.demo",
        passwordHash: partnerPasswordHash,
        name: "Sneha Reddy (Lighthouse ACM)",
        role: "PARTNER",
        partnerId: lighthousePartnerId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "lead@apex.demo",
        passwordHash: partnerPasswordHash,
        name: "Rohan Deshmukh (Apex AI)",
        role: "PARTNER",
        partnerId: apexPartnerId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    console.log("6. Seeding 326 Attributed Student Registrations...");
    const distribution = [
      { partner: partnerData[0], count: 112, college: "Northstar Engineering College" },
      { partner: partnerData[1], count: 86, college: "Lighthouse Institute of Technology" },
      { partner: partnerData[2], count: 73, college: "Apex Institute of Science & Technology" },
      { partner: partnerData[3], count: 35, college: "Crestview University of Engineering" },
      { partner: partnerData[4], count: 20, college: "Meridian College of Technology" },
    ];

    const firstNames = [
      "Aarav", "Ananya", "Rohan", "Pooja", "Vikram", "Isha", "Aditya", "Neha", "Varun",
      "Priya", "Rahul", "Meera", "Kabir", "Tanvi", "Siddharth", "Anika", "Rishi", "Divya",
      "Karan", "Sneha",
    ];
    const lastNames = [
      "Sharma", "Verma", "Patel", "Reddy", "Nair", "Iyer", "Rao", "Deshmukh",
      "Kulkarni", "Gupta", "Malhotra", "Mehta", "Bhat", "Chopra", "Joshi", "Menon",
    ];
    const sources = ["club_whatsapp", "campus_qr", "club_instagram", "faculty", "student_referral", "direct"];
    const branches = [
      "Computer Science & Engineering",
      "Information Technology",
      "AI & Machine Learning",
      "Electronics & Communication",
      "Data Science",
    ];
    const gradYears = ["2025", "2026", "2027"];

    const registrationsToInsert = [];
    const trackingEventsToInsert = [];
    let regIndex = 0;

    for (const group of distribution) {
      const groupPartnerId = insertedPartners.insertedIds[partnerData.indexOf(group.partner)];
      const primaryStudentIds: ObjectId[] = [];

      for (let i = 0; i < group.count; i++) {
        regIndex++;
        const firstName = firstNames[(regIndex + i) % firstNames.length];
        const lastName = lastNames[(regIndex * 3 + i) % lastNames.length];
        const name = `${firstName} ${lastName}`;
        const email = `student${regIndex}.${group.partner.slug}@campusdemo.test`;

        // Calculate secondary peer referral nodes
        const isReferral = i > 15 && i % 4 === 0 && primaryStudentIds.length > 0;
        const referredBy = isReferral ? primaryStudentIds[i % primaryStudentIds.length] : undefined;
        const source = isReferral ? "student_referral" : sources[i % (sources.length - 1)];

        const regId = new ObjectId();
        if (!isReferral) {
          primaryStudentIds.push(regId);
        }

        const daysAgo = 7 - (i % 7);
        const regDate = new Date(
          Date.now() - daysAgo * 24 * 60 * 60 * 1000 + ((i * 1234567) % (24 * 60 * 60 * 1000))
        );

        const randomReferralSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
        const studentReferralCode = `s-${randomReferralSuffix}`;

        registrationsToInsert.push({
          _id: regId,
          eventId: eventId,
          name: name,
          emailNormalized: email.toLowerCase(),
          college: group.college,
          graduationYear: gradYears[i % gradYears.length],
          branch: branches[i % branches.length],
          phone: `+91 9${Math.floor(100000000 + Math.random() * 900000000)}`,
          partnerId: groupPartnerId,
          partnerCode: group.partner.code,
          campusId: group.partner.slug,
          source: source,
          medium: "campus_outreach",
          campaign: "build60_sprint",
          studentReferralCode: studentReferralCode,
          referredByRegistrationId: referredBy,
          isDemo: true,
          registeredAt: regDate,
        });

        // Add telemetry clicks and completion events
        trackingEventsToInsert.push({
          eventId: eventId,
          type: isReferral ? "referral_click" : "partner_link_click",
          partnerId: groupPartnerId,
          partnerCode: group.partner.code,
          source: source,
          campaign: "build60_sprint",
          isDemo: true,
          createdAt: new Date(regDate.getTime() - 1000 * 60 * 5),
        });

        trackingEventsToInsert.push({
          eventId: eventId,
          type: "registration_completed",
          partnerId: groupPartnerId,
          partnerCode: group.partner.code,
          registrationId: regId,
          isDemo: true,
          createdAt: regDate,
        });
      }
    }

    // Additional realistic non-converting visitors to simulate realistic ~58% conversion
    for (let k = 0; k < 230; k++) {
      const p = partnerData[k % 5];
      const daysAgo = k % 7;
      trackingEventsToInsert.push({
        eventId: eventId,
        type: "partner_link_click",
        partnerCode: p.code,
        source: sources[k % sources.length],
        isDemo: true,
        createdAt: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000),
      });
    }

    await db.collection("registrations").insertMany(registrationsToInsert);
    await db.collection("trackingEvents").insertMany(trackingEventsToInsert);

    console.log("Database seeded successfully!");
    return {
      success: true,
      event: "ai-in-60",
      partnersCount: partnerData.length,
      usersCount: 4,
      registrationsCount: registrationsToInsert.length,
      trackingEventsCount: trackingEventsToInsert.length,
      credentials: {
        admin: { email: "admin@build60.campus", pass: "AdminGrowth2025!" },
        partner: { email: "lead@northstar.demo", pass: "Partner2025!", club: "NS-GDG-42" },
      },
    };
  } finally {
    await client.close();
  }
}
