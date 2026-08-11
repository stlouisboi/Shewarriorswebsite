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
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
  wellness:
    "https://images.unsplash.com/photo-1589156280159-27698a70f29e?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
  faith:
    "https://images.unsplash.com/photo-1607746882042-944635dfe10e?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
  teens:
    "https://plus.unsplash.com/premium_photo-1658526904282-5feb6958fcdc?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
  housing:
    "https://images.unsplash.com/photo-1472224371017-08207f84aaae?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxNzV8MHwxfHNlYXJjaHwzfHxzYWZlJTIwcGVhY2VmdWwlMjB3YXJtJTIwaG91c2luZ3xlbnwwfHx8fDE3ODY0MDMyNDZ8MA&ixlib=rb-4.1.0&q=85",
};

export const CARE_CATEGORIES = [
  {
    id: "career-purpose",
    name: "Career & Purpose",
    tagline: "Job-search guides, mentorship, and financial-forward resources",
    image: IMAGES.career,
    accent: "text-softgold",
    resources: [
      {
        name: "Career OneStop",
        description: "Free job-search guides, training finders, and resume tools from the U.S. Department of Labor.",
        action: { label: "careeronestop.org", href: "https://www.careeronestop.org" },
      },
      {
        name: "Dress for Success",
        description: "Professional attire, coaching, and a network of women championing your next step.",
        action: { label: "dressforsuccess.org", href: "https://dressforsuccess.org" },
      },
      {
        name: "SBA Women's Business Resources",
        description: "Entrepreneurship training, funding guidance, and local Women's Business Centers.",
        action: { label: "sba.gov", href: "https://www.sba.gov" },
      },
      {
        name: "Provision Workshop & Mentor Interest",
        description: "Our monthly resume and budgeting workshop — plus a mentor-interest pathway if you want a sister in your corner.",
        action: { label: "See Gatherings", href: "/gatherings", internal: true },
      },
    ],
  },
  {
    id: "mind-wellness",
    name: "Mind & Wellness",
    tagline: "Education, self-care guides, and trusted referrals",
    image: IMAGES.wellness,
    accent: "text-terracotta",
    resources: [
      {
        name: "Therapy for Black Girls",
        description: "A therapist-finder and podcast dedicated to the mental wellness of Black women and girls.",
        action: { label: "therapyforblackgirls.com", href: "https://www.therapyforblackgirls.com" },
      },
      {
        name: "The Loveland Foundation",
        description: "Therapy fund and mental-wellness resources for Black women and girls.",
        action: { label: "thelovelandfoundation.org", href: "https://thelovelandfoundation.org" },
      },
      {
        name: "NAMI Helpline",
        description: "The National Alliance on Mental Illness answers questions and points to local care: 1-800-950-6264.",
        action: { label: "1-800-950-6264", href: "tel:18009506264" },
      },
      {
        name: "Quiet Hour — Guided Reflection",
        description: "Our weekly self-care rhythm: scripture, silence, and journaling before the day begins.",
        action: { label: "See Gatherings", href: "/gatherings", internal: true },
      },
    ],
  },
  {
    id: "faith-flourishing",
    name: "Faith & Flourishing",
    tagline: "Sister Circles, Bible study, prayer, and worship",
    image: IMAGES.faith,
    accent: "text-gold",
    resources: [
      {
        name: "Sacred Sister Circles",
        description: "Intimate weekly study, prayer, and deep soul-care with women who know your name.",
        action: { label: "See Gatherings", href: "/gatherings", internal: true },
      },
      {
        name: "Prayer & Reflection",
        description: "Leave a worry or a prayer in the confidential space below — our sisterhood will quietly cover you this week.",
        action: { label: "Leave a prayer", href: "#prayer-engine", anchor: true },
      },
      {
        name: "Quiet Hour Bible Study",
        description: "Thirty unhurried minutes of scripture and journaling, Thursday mornings online and in person.",
        action: { label: "See Gatherings", href: "/gatherings", internal: true },
      },
      {
        name: "Mentorship Interest",
        description: "Want a faith mentor — or to become one? Start the conversation here.",
        action: { label: "Get Involved", href: "/get-involved", internal: true },
      },
    ],
  },
  {
    id: "girls-teens",
    name: "Girls & Teens",
    tagline: "Parent tools, study guides, and mentoring — with guardians involved",
    image: IMAGES.teens,
    accent: "text-berry",
    resources: [
      {
        name: "Becoming Her",
        description: "Our mentorship and study group for teen girls — always with parent or guardian involvement.",
        action: { label: "See Gatherings", href: "/gatherings", internal: true },
      },
      {
        name: "Big Brothers Big Sisters",
        description: "One-to-one mentoring that helps girls thrive in school and in life.",
        action: { label: "bbbs.org", href: "https://www.bbbs.org" },
      },
      {
        name: "Girls Inc.",
        description: "Research-based programs that equip girls to navigate school pressure and lead.",
        action: { label: "girlsinc.org", href: "https://girlsinc.org" },
      },
      {
        name: "Teen Line",
        description: "Teens helping teens — call 1-800-852-8336 or text TEEN to 839863 (evenings).",
        action: { label: "1-800-852-8336", href: "tel:18008528336" },
      },
    ],
  },
];

export const URGENT_HELP = [
  {
    name: "988 Suicide & Crisis Lifeline",
    description: "Free, 24/7 support for anyone in emotional distress or crisis.",
    action: { label: "Call or text 988", href: "tel:988" },
  },
  {
    name: "Emergency Services",
    description: "If you or someone near you is in immediate danger, call 911 now.",
    action: { label: "Call 911", href: "tel:911" },
  },
  {
    name: "National Domestic Violence Hotline",
    description: "24/7 confidential support, safety planning, and safe-house referrals.",
    action: { label: "1-800-799-7233", href: "tel:18007997233" },
  },
  {
    name: "Crisis Text Line",
    description: "Text HOME to 741741 to reach a live, trained counselor — any hour, free of charge.",
    action: { label: "Text 741741", href: "sms:741741" },
  },
  {
    name: "211 — Shelter & Essentials",
    description: "Emergency shelter beds, rental assistance, and food programs near you.",
    action: { label: "Dial 211", href: "tel:211" },
  },
];

export const PILLARS = [
  {
    number: "01",
    name: "Connect",
    text: "Sisterhood and gatherings — circles where women are known by name and met without judgment.",
  },
  {
    number: "02",
    name: "Equip",
    text: "Career tools and mentorship — practical resources that turn worry into a workable next step.",
  },
  {
    number: "03",
    name: "Restore",
    text: "Wellness education and trusted referrals — because healing begins with honest, safe support.",
  },
  {
    number: "04",
    name: "Flourish",
    text: "Faith, worship, and purpose — our hope is not survival but abundance, shared sister to sister.",
  },
];
