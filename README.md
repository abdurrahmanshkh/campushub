# BUILD60 CAMPUS GROWTH HUB

> **A Growth Challenge Concept for NxtWave**  
> *Campus-Distribution Operating System for "Build Your First AI Project in 60 Minutes"*

---

## 1. Project Overview & Product Thesis

**Build60 Campus Growth Hub** is an end-to-end campus distribution platform designed to transform student technology clubs (GDG, ACM, IEEE, CSI, coding communities) into active campaign distribution partners. 

### The Core Thesis:
> **Make it as easy as possible for a student club to say yes, launch the workshop, promote it across campus, and see real attribution.**

Student clubs already possess active distribution: WhatsApp cohorts, Instagram channels, faculty relationships, and campus noticeboards. Build60 removes campaign friction by providing each approved club with an immediate operational kit:
- A unique tracking link (`/r/[code]`)
- Print-ready and digital QR codes (PNG & vector SVG)
- Ready-to-broadcast WhatsApp, Instagram, LinkedIn, and Discord copy
- A printable A4 campus poster with embedded dynamic QR
- A formal, professional faculty briefing note
- Real-time campaign telemetry and momentum tracking

### Zero Fake Social Proof & Sample Data Integrity
- This project is an assessment prototype concept and is **not an official platform operated by NxtWave**.
- All seeded demo metrics and colleges are strictly fictional (e.g., *Northstar Engineering College*, *Lighthouse Institute of Technology*, *Apex Institute of Science & Technology*).
- All demonstration views prominently display explicit `DEMO DATA` / `SAMPLE CAMPAIGN` badges when `NEXT_PUBLIC_DEMO_MODE=true`.

---

## 2. Core Product Loop & Two-Tier Attribution

```
  Student Club Applies (/partner/apply)
                │
                ▼
   Admin Reviews & Approves (/admin/partners)
                │
                ▼
   Unique Partner Code Issued (e.g. NS-GDG-42)
                │
                ▼
   Partner Console & Campaign Kit Generated (/partner/campaign)
                │
                ▼
   Campus Distribution (WhatsApp, Posters, Dynamic QR)
                │
                ▼
   Student Scans / Clicks (/r/NS-GDG-42)
   ├── Lightweight click tracking logged
   ├── Signed HTTP-only cookie set (30-day window)
   └── Seamless redirect to /workshop?ref=NS-GDG-42
                │
                ▼
   Student Registers (/register)
   ├── Normalized email + duplicate prevention
   └── Level 1 Attribution: Credited to primary campus club
                │
                ▼
   Registration Success & Referral Node (/register/success)
   ├── Google Calendar 1-click sync
   └── Unique peer referral link generated (/r/s-XXXXX)
                │
                ▼
   Peer Registers Via Referral Link
   ├── Level 2 Attribution: referredByRegistrationId recorded
   └── Primary Attribution Preserved: Campus club retains primary credit!
```

---

## 3. Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) 16 (App Router, Turbopack, Server Actions)
- **Runtime & UI**: React 19, TypeScript 5, Tailwind CSS v4
- **Database**: MongoDB Node.js Driver (`mongodb` v7) with Connection Pooling & Compound Indexes
- **Authentication**: Stateless, secure HttpOnly JWT session cookies (`jose`, HS256) + `bcryptjs` password hashing
- **Analytics & Data Vis**: `recharts` for campaign velocity and funnel charts
- **Dynamic Assets**: `qrcode` (PNG & SVG generation), `@vercel/og` for dynamic 1200x630 social cards
- **Validation**: Strict schema validation with `zod`
- **Icons**: `lucide-react`

---

## 4. Route Architecture

### Public Routes
- `/` — Editorial Landing Page explaining the campus growth engine, interactive flow, and live console preview
- `/workshop` — Workshop acquisition page with dynamic scheduling, 60-min breakdown, and JSON-LD schema
- `/register` — High-converting, mobile-optimized registration form with automatic attribution detection
- `/register/success` — Confirmation screen with Google Calendar sync and secondary peer referral sharing
- `/campus/[slug]` — Co-branded campus landing microsite for approved partner clubs
- `/r/[code]` — High-speed attribution redirect handler (sets 30-day cookie, tracks click, `X-Robots-Tag: noindex`)

### Partner Console (Role: `PARTNER`)
- `/partner/apply` — 5-step club partnership application form
- `/partner/login` — Partner authentication with 1-click demo credential autofill
- `/partner/dashboard` — Live campaign metrics, registration velocity, target progress, and next actions
- `/partner/campaign` — Multi-channel asset generator (A4 poster, WhatsApp copy, Instagram story, faculty request)
- `/partner/links` — Tracked URLs, QR code download manager (PNG/SVG), and direct campus link
- `/partner/referrals` — Peer referral telemetry and viral coefficient (K-factor) tracking
- `/partner/profile` — Club dossier and operational scope

### Admin Operations Console (Role: `ADMIN`)
- `/admin/login` — Administrator authentication with 1-click demo login
- `/admin/dashboard` — Campaign command center with 7-stage conversion funnel and target tracking
- `/admin/partners` — Partner club table with status management (`APPROVED`, `LIVE`, `PAUSED`, `REJECTED`)
- `/admin/partners/[id]` — Deep-dive partner dossier with attribution audit log
- `/admin/registrations` — Full registration database with multi-dimensional filtering and CSV export
- `/admin/analytics` — Channel breakdown, campus performance, and conversion analytics
- `/admin/settings` — Live workshop configuration (date, time, mode, targets, registration toggle)
- `/admin/og-preview` — Visual inspector for dynamic Open Graph social cards

### API & System Endpoints
- `/api/qr` — Dynamic QR code endpoint returning PNG or SVG
- `/api/og` — Dynamic 1200x630 Open Graph image generator (Global, Workshop, and Partner co-branded)
- `/api/admin/registrations/export` — Authenticated CSV export streaming live MongoDB registrations
- `/robots.txt` & `/sitemap.xml` — Search engine crawler instructions and indexable routes
- `/manifest.webmanifest` — Web App Manifest

---

## 5. Getting Started & Local Setup

### Prerequisites
- Node.js 18.18+ or 20+
- A running MongoDB instance (Local MongoDB at `mongodb://127.0.0.1:27017` or a free MongoDB Atlas connection string)

### 1. Clone & Install
```bash
git clone <repository-url>
cd campushub
npm install
```

### 2. Environment Configuration
Create a `.env.local` file in the root directory (refer to `.env.example`):
```env
# MongoDB Connection
MONGODB_URI=mongodb://127.0.0.1:27017
MONGODB_DB=build60

# Authentication Secret (min 32 characters)
AUTH_SECRET=build60_campus_growth_hub_jwt_secret_token_secure_2025

# Site URL for canonical links and Open Graph cards
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Initial Admin Credentials
ADMIN_EMAIL=admin@build60.campus
ADMIN_PASSWORD=AdminGrowth2025!

# Demo Mode Toggle (enables demo badges and sample data indicators)
NEXT_PUBLIC_DEMO_MODE=true
```

### 3. Seed Database with Deterministic Demo Campaign
Run the deterministic seed script to populate the database with:
- 1 Active Workshop Event (`Build Your First AI Project in 60 Minutes`)
- 6 Fictional Partner Clubs with unique codes (e.g., `NS-GDG-42`, `LIT-ACM-19`, `AIST-IEEE-88`)
- Exactly 326 demo student registrations across various acquisition channels
- 880+ realistic tracking events (clicks, page views, referrals)
- 1 Seeded Admin Account & 1 Seeded Partner Account

```bash
npm run seed
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 6. Demo Accounts & Access Credentials

Both login screens include a **1-click "Fill Demo Credentials" button** for evaluators:

| Role | Email | Password | Access Route |
| :--- | :--- | :--- | :--- |
| **Campaign Admin** | `admin@build60.campus` | `AdminGrowth2025!` | `/admin/login` |
| **Campus Partner** | `lead@northstar.demo` | `Partner2025!` | `/partner/login` |

*Partner code for Northstar GDG: `NS-GDG-42` (Test redirect: `/r/NS-GDG-42`)*

---

## 7. Verification & Automated Quality Tests

Run the full end-to-end test suite:
```bash
npm run test
```
This runs two automated suites:
1. `src/scripts/test-endpoints.ts`: Verifies HTTP 200/307 status codes, dynamic QR generation, dynamic OG rendering, attribution cookie emission, robots.txt, and sitemap.xml.
2. `src/scripts/test-flows.ts`: Verifies student registration, primary partner attribution, secondary peer referral propagation, duplicate registration rejection, and password authentication.

To verify code cleanliness and production bundling:
```bash
npm run lint    # ESLint verification (0 errors, 0 warnings)
npm run build   # Next.js optimized production build
npm run start   # Run production build locally
```

---

## 8. Technical Deep-Dives

### How Two-Tier Attribution Works
1. **First-Touch / Last-Touch Detection**: When a student arrives via `/r/[code]` or `/workshop?ref=[code]`, `src/lib/attribution.ts` writes a 30-day HttpOnly cookie (`build60_attribution`) storing `partnerCode`, `referralCode`, `source`, `medium`, and timestamps.
2. **Registration Level 1 (Club)**: Upon form submission (`registerStudentAction`), the server resolves the partner code against the `partners` collection. The registration is tagged with `partnerId`, `partnerCode`, and `campusId`.
3. **Registration Level 2 (Student Peer)**: Each registered student receives a random, collision-resistant referral code (e.g. `s-TQZUT`). When their peers register through `/r/s-TQZUT`, the system:
   - Sets `referredByRegistrationId` to the original student's ID.
   - **Preserves** the original `partnerCode` and `partnerId`. This ensures the student club receives full credit while tracking secondary viral propagation (K-factor).
4. **Duplicate Prevention**: Submissions are checked against a unique compound index (`eventId + emailNormalized`). Re-submissions are rejected with a friendly notice.

### How Dynamic QR Generation Works
The route `/api/qr` accepts `code`, `margin`, `format` (png or svg), and `size`. It uses `qrcode` with Error Correction Level `M` (15% redundancy) suitable for print, rendering on an off-screen canvas and streaming the resulting binary image directly with cache headers.

### How Dynamic Open Graph (OG) Images Work
Built using `@vercel/og` inside `/api/og`:
- **Global / Workshop OG**: Generates a high-contrast 1200x630 visual card with dark navy aesthetic, typography, and metadata tags.
- **Partner Co-branded OG**: Accepts `?type=partner&college=...&club=...` to generate a tailored card stating:
  > *"Build60 at [College Name] &bull; Hosted with [Club Name]"*  
  Provides high click-through preview when shared on WhatsApp, LinkedIn, or Discord.
- Visual inspection dashboard available at `/admin/og-preview`.

### Real-Time Event Configuration
Admins can navigate to `/admin/settings` to dynamically adjust:
- Workshop date, start time, and duration
- Registration status (open / closed)
- Registration targets (500 primary, 550 stretch)
- Mode (Online / Hybrid)
Changes update the `events` collection in MongoDB and immediately synchronize the public landing page, workshop curriculum timeline, JSON-LD Schema, and registration forms.

### CSV Export Security
The route `/api/admin/registrations/export` enforces server-side session authentication (`requireAdmin`). It streams CSV headers and records pulled directly from MongoDB without exposing private student information on public endpoints.

---

## 9. Deployment to Production (Vercel + MongoDB Atlas)

1. **MongoDB Atlas**:
   - Create a free M0 cluster on MongoDB Atlas.
   - In *Network Access*, allow connections from `0.0.0.0/0` (standard for serverless platforms).
   - In *Database Access*, create a user with read/write access.
   - Copy the SRV URI: `mongodb+srv://<user>:<password>@cluster0.mongodb.net/build60?retryWrites=true&w=majority`.

2. **Deploy to Vercel**:
   - Push this repository to GitHub or GitLab.
   - Import the repository in [Vercel](https://vercel.com).
   - Add the Environment Variables:
     - `MONGODB_URI`: Your Atlas connection string
     - `MONGODB_DB`: `build60`
     - `AUTH_SECRET`: A generated 32+ character random string
     - `NEXT_PUBLIC_SITE_URL`: Your Vercel production URL (e.g. `https://build60-campus.vercel.app`)
     - `ADMIN_EMAIL`: `admin@build60.campus`
     - `ADMIN_PASSWORD`: A secure production password
     - `NEXT_PUBLIC_DEMO_MODE`: `true` (or `false` for real campaign mode)
   - Click **Deploy**.

3. **Post-Deployment Seed**:
   Run the seed script against your Atlas cluster from your local terminal:
   ```bash
   MONGODB_URI="your-atlas-uri" npm run seed
   ```

---

## 10. Architectural Principles & Quality Standards

- **Accessible & Responsive**: Meets WCAG 2.2 AA standards with visible focus states, semantic HTML, ARIA landmarks, mobile-first design (tested across 360px to 1440px viewports), and 44px minimum touch targets.
- **Server-First Boundary Discipline**: Data fetching and database mutations execute strictly on the server; client components are reserved exclusively for interactive elements (charts, copy buttons, tabs, drawers).
- **Security & Privacy**: Passwords hashed with `bcryptjs` (salt factor 10), JWT tokens signed via `jose`, HttpOnly/Secure cookies, no MongoDB queries executed in client components, and zero exposure of internal database IDs.
