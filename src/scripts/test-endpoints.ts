async function testEndpoints() {
  console.log("=== Build60 Integration & QA Endpoint Verification ===");

  const baseUrl = "http://localhost:3000";
  const routes = [
    { path: "/", expectedStatus: 200, label: "Public Homepage" },
    { path: "/workshop", expectedStatus: 200, label: "Workshop Acquisition Page" },
    { path: "/register", expectedStatus: 200, label: "Student Registration Page" },
    { path: "/partner/apply", expectedStatus: 200, label: "Partner Club Application" },
    { path: "/partner/login", expectedStatus: 200, label: "Partner Login" },
    { path: "/admin/login", expectedStatus: 200, label: "Admin Login" },
    { path: "/campus/northstar-gdg", expectedStatus: 200, label: "Public Campus Page (Northstar GDG)" },
    { path: "/robots.txt", expectedStatus: 200, label: "Robots.txt" },
    { path: "/sitemap.xml", expectedStatus: 200, label: "Sitemap.xml" },
    { path: "/api/qr?code=NS-GDG-42", expectedStatus: 200, label: "Dynamic QR PNG Generator" },
    { path: "/api/qr?code=NS-GDG-42&format=svg", expectedStatus: 200, label: "Dynamic QR SVG Generator" },
    { path: "/api/og?title=Build%20Your%20First%20AI%20Project", expectedStatus: 200, label: "Dynamic Open Graph Image" },
  ];

  let passed = 0;
  for (const r of routes) {
    try {
      const res = await fetch(`${baseUrl}${r.path}`);
      if (res.status === r.expectedStatus) {
        console.log(`[PASS] ${r.label} (${r.path}) -> HTTP ${res.status}`);
        passed++;
      } else {
        console.error(`[FAIL] ${r.label} (${r.path}) -> Got HTTP ${res.status}, expected ${r.expectedStatus}`);
      }
    } catch (err: unknown) {
      console.error(`[FAIL] ${r.label} (${r.path}) -> Error: ${(err as Error).message}`);
    }
  }

  // Test Referral Route Redirect & Cookie
  console.log("\nTesting Referral Route Redirect & Attribution Cookie (/r/NS-GDG-42)...");
  try {
    const res = await fetch(`${baseUrl}/r/NS-GDG-42`, { redirect: "manual" });
    const location = res.headers.get("location");
    const cookie = res.headers.get("set-cookie");
    const robotsTag = res.headers.get("x-robots-tag");

    if (res.status === 307 || res.status === 302 || res.status === 308) {
      console.log(`[PASS] Referral redirect status: ${res.status} -> Location: ${location}`);
    } else {
      console.error(`[FAIL] Referral unexpected status: ${res.status}`);
    }

    if (cookie && cookie.includes("build60_attribution")) {
      console.log(`[PASS] Attribution cookie successfully emitted: ${cookie.substring(0, 60)}...`);
      passed++;
    } else {
      console.error(`[FAIL] Attribution cookie missing in referral response`);
    }

    if (robotsTag && robotsTag.includes("noindex")) {
      console.log(`[PASS] X-Robots-Tag set to noindex: ${robotsTag}`);
      passed++;
    } else {
      console.error(`[FAIL] X-Robots-Tag missing or invalid`);
    }
  } catch (err: unknown) {
    console.error(`[FAIL] Referral route test error:`, (err as Error).message);
  }

  console.log(`\n=== Verification Complete: ${passed} checks passed ===\n`);
}

testEndpoints();
