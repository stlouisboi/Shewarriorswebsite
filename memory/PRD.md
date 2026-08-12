# SheWorriers Foundation — Landing Site PRD

## Original Problem Statement
Build a landing page for SheWorriers Foundation with: dark earthy palette (espresso/plum canvas, cream text, muted gold/terracotta/berry/emerald accents); editorial typography (high-contrast serif headings + wide-tracked uppercase sans UI); grayscale/sepia multiply-blend image treatment; custom logo in nav + footer; streamlined nav (Home | Our Why | Care Map | Gatherings | Stories | Get Involved | Give); expanded footer with legal (501(c)(3), privacy, terms, annual reports); Care Map resources hub with 5 categories (Purpose & Provision, Mind & Wellness, Faith & Flourishing, Girls & Teens, Housing & Shelter); permanent Immediate Help banner (988/911); Our Why page with four pillars (Connect, Equip, Restore, Flourish); interactive Prayer/Reflection engine in footer with blur-dissolve confirmation animation; Framer Motion hero parallax and scroll reveals.

## Architecture
- Frontend: React 19 + react-router-dom v7, Tailwind CSS, framer-motion, lucide-react, sonner. Pages in /app/frontend/src/pages/, shared components in /app/frontend/src/components/ (Navbar, ImmediateHelp, Footer, PrayerEngine, Reveal, Logo). Content data in /app/frontend/src/data/resources.js.
- Backend: FastAPI at /app/backend/server.py. POST /api/prayers stores confidential prayer requests in MongoDB (prayer_requests collection). GET /api/ health check.
- DB: MongoDB via MONGO_URL env var.

## User Personas
- A woman in crisis needing immediate professional help (988/911 banner).
- A woman seeking practical resources (Care Map).
- A prospective donor or volunteer (Give, Get Involved).
- A community member wanting to leave a private prayer/reflection.

## Core Requirements (static)
1. Dark editorial theming per palette above — DONE
2. 7 nav destinations as separate routed pages — DONE
3. Care Map with 5 categories and actionable resources — DONE
4. Permanent Immediate Help banner with 988/741741/911 — DONE
5. Our Why with 4 pillars — DONE
6. Footer prayer engine with blur-dissolve animation, persisted to backend — DONE
7. Hero multi-layer parallax + scroll reveals (respect reduced motion) — DONE
8. Logo in header and footer — DONE
9. Legal footer (501(c)(3), privacy, terms, annual reports) — DONE

## Implemented
- 2026-08-10: Full multi-page site build; prayer API + MongoDB persistence; prayer blur-dissolve verified end-to-end; hero parallax; Immediate Help banner; all pages verified via screenshots.
- 2026-08-10: Legal pages (Privacy, Terms, Annual Reports) with real plain-language content; footer links wired.
- 2026-08-10: Real logo integrated (white background keyed out, strokes recolored to brand gold/sage, tagline cropped out per user request); nav + footer.
- 2026-08-10: Home page redesigned to user's mockups: editorial centered hero ("For the woman who holds everyone else together…"), "You don't have to figure it out alone" 3-card section, Psalm 34:5 foundation section, "For every season / for every sister", The Altar release ritual (client-side only, nothing saved), Transformation card, arched Our Gatherings cards.
- 2026-08-10: Care Map restructured per user sitemap: Need Help Now (emerald crisis section with exact disclaimer), Career & Purpose, Mind & Wellness, Faith & Flourishing, Girls & Teens. Our Why: "What We're Building" + four pillars + founder note. Get Involved: Join the Sisterhood / Become a Mentor / Volunteer / Partner. Footer redesigned: altar card, "Your seat is waiting" CTAs, anchor verse, link columns, big logo, legal row. Winston-Salem / Piedmont Triad location added across site.

## Backlog / Remaining
- P0: None blocking.
- P1: Real donation processing (Give page tiers are currently informational toast — no payment wired).
- P1: Real Privacy Policy / Terms / Annual Report documents or pages (footer links are placeholders).
- P2: Admin view for prayer team to read requests; email capture/newsletter; CMS for gatherings & stories.
- Note: Gatherings, Stories, and some Care Map partner entries are sample/demo content pending real foundation data.

## Next Tasks
- Wire Stripe for donations. — DONE 2026-08-10 (sandbox claimable; live after claim + KYC)
- Build legal pages. — DONE 2026-08-10
- Prayer team inbox.
- Real gatherings/stories content; "The First Crown" event details.

## Notes
- Stripe: claimable sandbox provisioned (Flow A); donation tiers $25/$50/$100/$250 one-time (give_25…give_250) + Sustainer Circle monthly $15/$25/$50/$100 (sustain_15…sustain_100). Tax mode "full" (Stripe managed payments). Webhook /api/stripe/webhook. Success/cancel pages live.
- Founder: Stephanie Lawrence, portrait at /app/frontend/public/assets/founder.jpg.
- Motion: Lenis smooth scroll, masked line-by-line hero reveal, editorial marquee, chapter numbers, parallax hero decor.
- Photography: all people photos now feature Black women/girls (verified per-image). Slogan "From Worry to Worship" restored in nav + footer logo. Founder section (Stephanie Lawrence) on both Home and Our Why.
- Care Map v2 (2026-08-11): need-based pathways (Purpose & Provision, Mind & Wellness, Faith & Flourishing, Roots & Wings, Safety & Stability), safety bar, working search/filters (location/cost/format/season), standardized resource cards with clinical-vs-community labels + Save for Later (localStorage), Start Here / Talk to a Sister / Join a Circle featured flow, Talk to a Sister navigator form (POST /api/navigator-requests), bottom conversion trio + closing message.
- RSVPs (2026-08-11): per-gathering Reserve-a-Seat forms → POST /api/rsvps.
- Email (2026-08-11): Resend wired for donor receipts + RSVP confirmations + navigator confirmations; RESEND_API_KEY empty in backend/.env — emails log-and-skip until the user adds a free Resend key.
- Get Involved v2 (2026-08-11): participation hub — hero per user copy, five numbered places (Join/Mentor/Serve/Partner/Fund), Join section with season+need chips, mentor interest pipeline form (screening consent, no matching promised), six serve areas, seven partner lanes, closing "Find Your Place". CTA system per user spec. POST /api/interest (mentor/volunteer/partner).
- Give v2 (2026-08-11): "Every gift helps build the table" + what-gifts-build list; removed invented impact figures; monthly CTA "Become a Circle Keeper".
- New page: /commitment-to-care (vetting, clinical disclaimer, privacy, re-verification) linked in footer legal.
- The Sister Note (2026-08-11): weekly email signup in global footer → POST /api/sister-note (upsert by email), welcome email via Resend when key present. Footer logo enlarged (h-64/h-80).
- Benefits & Stability pathway (2026-08-11): replaced Safety & Stability as 4th major pathway; crisis resources (911/988/DV) retained inside it; six need-based benefit cards (food, health coverage, housing/utilities, children, income/work, benefits check); BenefitsGuide component with NC Benefits Check box (ePASS/USAGov/211), NC Medicaid 3-step guide, FNS/SNAP guide + checklists, Forsyth DSS card, The Next Step Desk (can/cannot lists). Chapter eyebrows enlarged to text-sm/base. Hero/page titles resized per user feedback. Mobile (390px) + tablet (834px) verified.
- PayPal (2026-08-11): one-time gifts via PayPal REST (sandbox) — POST /api/paypal/orders + /capture, recorded in payment_transactions (provider=paypal), thank-you email via Resend. PayPalGive component under each one-time tier; hidden until REACT_APP_PAYPAL_CLIENT_ID is set. Backend gated on PAYPAL_CLIENT_ID/PAYPAL_SECRET (503 until set). User must create a PayPal Business account + developer app and supply sandbox keys.
- REBRAND FINAL v2 (2026-08-12): Brand is "S.H.E. Warriors" per user's final uploaded logo (She_logo_DarkBack.png — cream monogram + gold sunburst, slogan "Sisterhood. Healing. Empowerment."). Black background keyed to transparency. All site text, emails, Stripe product names, and page title updated to S.H.E. Warriors. Domain should be shewarriors.org.
- Secured-network hardening (2026-08-11): all Google Fonts (Playfair, Cormorant, Manrope variable woff2) self-hosted in src/assets/fonts; all 13 Unsplash images self-hosted in public/assets/img (compressed); Inter/preconnect removed from index.html; favicon set to emblem. Only remaining external calls are Emergent platform scripts. Real fix for blocked networks = deploy + connect sheworriers.org (custom domains categorize better than *.emergent.host subdomains).
- Prayer Team Inbox (2026-08-11): /prayer-team passcode-protected page (JWT 12h, shared passcode in backend/.env PRAYER_TEAM_PASSCODE = altar-pray-2026). Lists prayer requests newest-first. Not linked in nav — share URL with team.
