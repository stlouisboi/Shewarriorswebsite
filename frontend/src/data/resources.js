export const IMAGES = {
  heroTexture:
    "https://images.unsplash.com/photo-1580824469841-49c0f1401393?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHw0fHxhYnN0cmFjdCUyMGdyb3VuZGluZyUyMG5hdHVyZSUyMHRleHR1cmUlMjBkYXJrfGVufDB8fHx8MTc4NjQwMzI0Nnww&ixlib=rb-4.1.0&q=85",
  rockTexture:
    "https://images.unsplash.com/photo-1527049979667-990f1d0d8e7f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHwzfHxhYnN0cmFjdCUyMGdyb3VuZGluZyUyMG5hdHVyZSUyMHRleHR1cmUlMjBkYXJrfGVufDB8fHx8MTc4NjQwMzI0Nnww&ixlib=rb-4.1.0&q=85",
  gathering:
    "https://images.unsplash.com/flagged/photo-1574319523332-4cadaa531506?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwyfHx3b21lbiUyMGNvbW11bml0eSUyMGdhdGhlcmluZyUyMGdhdGhlcmluZyUyMHdhcm0lMjBsaWdodGluZ3xlbnwwfHx8fDE3ODY0MDMyNDZ8MA&ixlib=rb-4.1.0&q=85",
  candles:
    "https://images.unsplash.com/photo-1760367119608-2b0b33786c94?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHw0fHx3b21lbiUyMGNvbW11bml0eSUyMGdhdGhlcmluZyUyMHdhcm0lMjBsaWdodGluZ3xlbnwwfHx8fDE3ODY0MDMyNDZ8MA&ixlib=rb-4.1.0&q=85",
  career:
    "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTF8MHwxfHNlYXJjaHwzfHx3b21lbiUyMGNhcmVlciUyMHN1cHBvcnQlMjBtb2Rlcm58ZW58MHx8fHwxNzg2NDAzMjQ2fDA&ixlib=rb-4.1.0&q=85",
  housing:
    "https://images.unsplash.com/photo-1472224371017-08207f84aaae?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxNzV8MHwxfHNlYXJjaHwzfHxzYWZlJTIwcGVhY2VmdWwlMjB3YXJtJTIwaG91c2luZ3xlbnwwfHx8fDE3ODY0MDMyNDZ8MA&ixlib=rb-4.1.0&q=85",
};

export const CARE_CATEGORIES = [
  {
    id: "purpose-provision",
    name: "Purpose & Provision",
    tagline: "Career, work, and financial breathing room",
    image: IMAGES.career,
    accent: "text-softgold",
    resources: [
      {
        name: "Career OneStop",
        description: "Free job search, training, and resume support from the U.S. Department of Labor.",
        action: { label: "careeronestop.org", href: "https://www.careeronestop.org" },
      },
      {
        name: "Dress for Success",
        description: "Professional attire, coaching, and a network of women championing your next step.",
        action: { label: "dressforsuccess.org", href: "https://dressforsuccess.org" },
      },
      {
        name: "211 Resource Line",
        description: "Dial 2-1-1 for local help with bills, food, and essential services — free and confidential.",
        action: { label: "Dial 211", href: "tel:211" },
      },
    ],
  },
  {
    id: "mind-wellness",
    name: "Mind & Wellness",
    tagline: "Counseling, calm, and mental health care",
    image: IMAGES.rockTexture,
    accent: "text-terracotta",
    resources: [
      {
        name: "988 Suicide & Crisis Lifeline",
        description: "Free, 24/7 support for anyone in emotional distress or crisis. Call or text 988.",
        action: { label: "Call or text 988", href: "tel:988" },
      },
      {
        name: "NAMI Helpline",
        description: "The National Alliance on Mental Illness answers questions and points to local care: 1-800-950-6264.",
        action: { label: "1-800-950-6264", href: "tel:18009506264" },
      },
      {
        name: "Crisis Text Line",
        description: "Text HOME to 741741 to reach a live, trained counselor — any hour, free of charge.",
        action: { label: "Text 741741", href: "sms:741741" },
      },
    ],
  },
  {
    id: "faith-flourishing",
    name: "Faith & Flourishing",
    tagline: "Spiritual rhythms, prayer, and hope",
    image: IMAGES.candles,
    accent: "text-gold",
    resources: [
      {
        name: "Weekly Prayer Circle",
        description: "Our own gathering of women who pray over every request left with the foundation.",
        action: { label: "See Gatherings", href: "/gatherings", internal: true },
      },
      {
        name: "Daily Reflection",
        description: "Leave a worry or a prayer in the reflection space below — held in strict confidence.",
        action: { label: "Leave a reflection", href: "#prayer-engine", anchor: true },
      },
      {
        name: "Local Church Partners",
        description: "We maintain relationships with welcoming congregations and chaplains across the region.",
        action: { label: "Get Involved", href: "/get-involved", internal: true },
      },
    ],
  },
  {
    id: "girls-teens",
    name: "Girls & Teens",
    tagline: "Mentorship and safe spaces for the next generation",
    image: IMAGES.gathering,
    accent: "text-berry",
    resources: [
      {
        name: "Big Brothers Big Sisters",
        description: "One-to-one mentoring that helps girls thrive in school and in life.",
        action: { label: "bbbs.org", href: "https://www.bbbs.org" },
      },
      {
        name: "Girls Inc.",
        description: "Research-based programs that equip girls to navigate challenges and lead.",
        action: { label: "girlsinc.org", href: "https://girlsinc.org" },
      },
      {
        name: "Teen Line",
        description: "Teens helping teens — call 1-800-852-8336 or text TEEN to 839863 (evenings).",
        action: { label: "1-800-852-8336", href: "tel:18008528336" },
      },
    ],
  },
  {
    id: "housing-shelter",
    name: "Housing & Shelter",
    tagline: "Emergency shelter, rental assistance, and safe houses",
    image: IMAGES.housing,
    accent: "text-emerald",
    resources: [
      {
        name: "National Domestic Violence Hotline",
        description: "24/7 confidential support and safe-house referrals: 1-800-799-7233.",
        action: { label: "1-800-799-7233", href: "tel:18007997233" },
      },
      {
        name: "211 Shelter & Rent Assistance",
        description: "Dial 2-1-1 to find emergency shelter beds and rental assistance programs near you.",
        action: { label: "Dial 211", href: "tel:211" },
      },
      {
        name: "HUD Resource Locator",
        description: "Find affordable housing and HUD-approved counseling agencies in your area.",
        action: { label: "hud.gov", href: "https://www.hud.gov" },
      },
    ],
  },
];

export const PILLARS = [
  {
    number: "01",
    name: "Connect",
    text: "No woman should worry alone. We build circles — small, steady gatherings where women are known by name and met without judgment.",
  },
  {
    number: "02",
    name: "Equip",
    text: "Worry shrinks when practical needs are met. We point women to real help: career support, counseling, shelter, and financial relief.",
  },
  {
    number: "03",
    name: "Restore",
    text: "Healing takes time and gentleness. Through prayer, reflection, and patient presence, we make room for women to breathe again.",
  },
  {
    number: "04",
    name: "Flourish",
    text: "Our hope is not survival but abundance — women rising into purpose, faith, and joy, and carrying others with them.",
  },
];
