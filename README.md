# SHE Warriors Foundation

**A faith-filled sisterhood where women and girls find community, spiritual growth, mentorship, career support, and pathways to mental wellness.**

Based in Winston-Salem, North Carolina — serving women and girls across the Piedmont Triad.

---

## What This Is

The official website for SHE Warriors Foundation, a faith-centered nonprofit created with Black women at its heart (501(c)(3) status pending). The site is built around one belief: *no sister should have to carry life alone.*

### Features

- **The Care Map** — a need-first resource hub (not a directory). Five pathways: Purpose & Provision, Mind & Wellness, Faith & Flourishing, Roots & Wings, and Benefits & Stability — with working search and filters (location, cost, format, life season), standardized vetted resource cards, clinical-vs-community labels, and plain-language NC Medicaid / FNS-SNAP guides. Every resource shows its last-reviewed date.
- **The Altar** — a private, client-side release ritual on the homepage. Nothing is saved or sent; words simply dissolve.
- **Prayer & Reflection box** — confidential prayer requests in the footer of every page, stored securely for the prayer team.
- **The Altar Inbox** (`/prayer-team`) — passcode-protected inbox where the prayer team reads and covers every request (JWT, 12-hour sessions).
- **Talk to a Sister** — Care Navigator request form with consent and clear "we are not therapists / crisis responders" language.
- **Gatherings + RSVPs** — care circles, brunches, and workshops with per-gathering seat reservation.
- **Giving** — one-time gifts and the monthly Sustainer Circle via Stripe Checkout; PayPal support built in (activates when keys are added).
- **The Sister Note** — weekly encouragement email signup.
- **Legal & trust pages** — Privacy Policy, Terms of Use, Annual Reports, and Our Commitment to Care (resource-vetting and privacy promises).
- **Immediate Help** — a permanent 988 / 741741 / 911 banner on every page, plus a safety bar on the Care Map.
- **Fully self-hosted** — fonts and photography are bundled with the site (no Google Fonts / no hotlinked images), so it renders on strict church, school, and workplace networks.

### Design

Dark editorial aesthetic — espresso and plum canvas, cream text, muted gold / terracotta / berry / emerald accents. Playfair Display (headings), Cormorant Garamond (editorial italics), Manrope (UI). Framer Motion reveals, masked line-by-line hero, slow editorial marquee, Lenis smooth scrolling.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, Tailwind CSS, Framer Motion, Lenis, lucide-react |
| Backend | FastAPI (Python), Motor (async MongoDB) |
| Database | MongoDB |
| Payments | Stripe Checkout (sandbox-claimable) · PayPal Orders REST (optional) |
| Email | Resend (optional — activates when a key is added) |
| Auth | Minimal JWT (shared prayer-team passcode) |

---

## Running Locally

### Prerequisites
- Node.js 18+ and Yarn
- Python 3.11+
- MongoDB

### Backend
```bash
cd backend
pip install -r requirements.txt
# create .env (see below)
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

`backend/.env`:
```
MONGO_URL="mongodb://localhost:27017"
DB_NAME="she_warriors"
CORS_ORIGINS="*"
JWT_SECRET="<random 64-char hex>"
PRAYER_TEAM_PASSCODE="<your team passcode>"
# Optional — giving
STRIPE_SECRET_KEY="..."
STRIPE_PUBLISHABLE_KEY="..."
STRIPE_WEBHOOK_SECRET="..."
# Optional — PayPal giving
PAYPAL_CLIENT_ID=""
PAYPAL_SECRET=""
PAYPAL_ENV="sandbox"
# Optional — email (receipts, welcomes, confirmations)
RESEND_API_KEY=""
SENDER_EMAIL="SHE Warriors Foundation <onboarding@resend.dev>"
```

Stripe price catalog (one-time + monthly tiers): `python3 backend/setup_stripe.py`

### Frontend
```bash
cd frontend
yarn install
# create .env (see below)
yarn start
```

`frontend/.env`:
```
REACT_APP_BACKEND_URL="http://localhost:8001"
# Optional — shows PayPal buttons on the Give page when set
REACT_APP_PAYPAL_CLIENT_ID=""
```

App runs at `http://localhost:3000`. All API routes are prefixed `/api`.

---

## Key Routes

| Route | Purpose |
|---|---|
| `/` | Home |
| `/our-why` | Mission, pillars, founder's note |
| `/care-map` | The Care Map resource hub |
| `/gatherings` | Circles + RSVP |
| `/stories` | Community stories |
| `/get-involved` | Participation hub (Join / Mentor / Serve / Partner / Fund) |
| `/give` | One-time + monthly giving |
| `/prayer-team` | Prayer team inbox (passcode-protected) |
| `/privacy` · `/terms` · `/annual-reports` · `/commitment-to-care` | Legal & trust |

## Safety Posture

SHE Warriors provides education, community, and referrals — never therapy, medical advice, or crisis care. Crisis pathways (911 / 988 / 741741 / DV hotline) are permanent and prominent, never buried. See `/commitment-to-care`.

---

*SHE Warriors Foundation · Winston-Salem, NC · Built with love for every sister who holds everyone else together.*
