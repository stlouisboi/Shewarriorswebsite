import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Briefcase, Heart, BookOpen, ArrowRight, Flame } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { FounderNote } from "../components/FounderNote";

const GoldDash = () => (
  <span aria-hidden="true" className="mx-auto block h-px w-10 bg-gold/70" />
);

const CircularBadge = () => (
  <div aria-hidden="true" className="absolute bottom-14 right-16 hidden lg:block">
    <div className="relative h-28 w-28 animate-[spin_24s_linear_infinite]">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          <path id="badge-circle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <circle cx="50" cy="50" r="48" fill="none" stroke="#C5A059" strokeOpacity="0.4" strokeWidth="0.75" />
        <text fill="#C5A059" fontSize="8.2" letterSpacing="2.5" style={{ fontFamily: "Manrope, sans-serif", textTransform: "uppercase" }}>
          <textPath href="#badge-circle">Sacred Sisterhood • Sacred Sisterhood •</textPath>
        </text>
      </svg>
    </div>
  </div>
);

const MARQUEE_WORDS = ["Sisterhood", "Sanctuary", "Stillness", "Strength", "Softness", "Shalom"];

const Marquee = () => (
  <div data-testid="editorial-marquee" aria-hidden="true" className="overflow-hidden border-y border-white/10 bg-ink py-7">
    <div className="marquee-track flex w-max items-center gap-14">
      {[...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
        <span key={i} className="flex items-center gap-14">
          <span className="font-garamond text-3xl font-light italic text-parchment/40 sm:text-4xl">{w}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-gold/50" />
        </span>
      ))}
    </div>
  </div>
);

const Hero = () => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-16%"]);
  const decoY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "30%"]);

  return (
    <section ref={ref} data-testid="hero-section" className="relative flex min-h-[100vh] items-center overflow-hidden bg-espresso">
      <motion.div style={{ y: decoY }} aria-hidden="true" className="absolute inset-y-0 right-0 w-14 bg-plum sm:w-24" />
      <motion.div style={{ y: decoY }} aria-hidden="true" className="absolute -top-6 right-10 h-14 w-40 rounded-full bg-terracotta sm:right-20" />
      <motion.div style={{ y: decoY }} aria-hidden="true" className="absolute bottom-24 left-[6%] hidden h-40 w-40 rounded-full border border-gold/20 lg:block" />

      <motion.div style={{ y: textY }} className="relative mx-auto w-full max-w-5xl px-6 py-28 text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.1 }}>
          <GoldDash />
        </motion.div>
        <h1
          data-testid="hero-headline"
          className="mt-10 font-serif text-4xl font-semibold uppercase leading-[1.15] tracking-wide text-cream sm:text-5xl lg:text-6xl"
        >
          {[
            <>For the woman who holds</>,
            <><em className="normal-case text-terracotta">everyone else</em> together.</>,
            <>This is a place for you to</>,
            <>be <em className="normal-case text-softgold">held, too.</em></>,
          ].map((line, i) => (
            <span key={i} className="block overflow-hidden pb-1">
              <motion.span
                className="block"
                initial={reduce ? false : { y: "115%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.25 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mx-auto mt-9 max-w-2xl text-base leading-relaxed text-parchment/85 md:text-lg"
        >
          A faith-filled sisterhood rooted in the legacy, resilience, joy, and
          worship of Black women.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-11 flex flex-wrap items-center justify-center gap-5"
        >
          <Link
            to="/care-map"
            data-testid="hero-find-circle-cta"
            className="rounded-full bg-terracotta px-9 py-4 text-xs font-bold uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-[#d47a62] hover:shadow-[0_0_28px_rgba(200,106,83,0.4)]"
          >
            Find Your Circle
          </Link>
          <Link
            to="/gatherings"
            data-testid="hero-sit-with-us-cta"
            className="rounded-full border border-gold/60 px-9 py-4 text-xs font-bold uppercase tracking-[0.22em] text-gold transition-all duration-300 hover:bg-gold/10 hover:border-gold"
          >
            Come Sit With Us
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.85 }}
          className="mt-14 font-garamond text-xl italic leading-relaxed text-parchment/75 sm:text-2xl"
        >
          <p>You have been strong.</p>
          <p>You are allowed to be soft.</p>
          <p>You are allowed to release it.</p>
        </motion.div>
      </motion.div>
      <CircularBadge />
    </section>
  );
};

const SUPPORT_CARDS = [
  {
    icon: Briefcase,
    title: "Purpose & Provision",
    text: "Career support, leadership, work, and financial-forward resources",
    cta: "Find Career Support",
    to: "/care-map#purpose-provision",
  },
  {
    icon: Heart,
    title: "Mind & Wellness",
    text: "Mental-wellness education, trusted referrals, and a place to exhale",
    cta: "Explore Wellness Support",
    to: "/care-map#mind-wellness",
  },
  {
    icon: BookOpen,
    title: "Faith & Flourishing",
    text: "Prayer, mentoring, Scripture, worship, and sisterhood",
    cta: "Grow in Faith",
    to: "/care-map#faith-flourishing",
  },
];

const SupportSection = () => (
  <section data-testid="support-section" className="bg-plum">
    <div className="mx-auto max-w-7xl px-6 py-24 text-center sm:py-32">
      <Reveal>
        <GoldDash />
        <p className="eyebrow mt-8">Chapter 01 · The First Step</p>
        <h2 className="mt-6 font-serif text-4xl font-semibold uppercase leading-[1.15] tracking-wide text-cream sm:text-5xl">
          You don't have to figure it out
          <br />
          <em className="normal-case text-terracotta">alone.</em>
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-parchment/85 md:text-lg">
          Whether you need career direction, support for your mental well-being,
          or a place to grow spiritually, we'll help you find a next step.
        </p>
      </Reveal>
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {SUPPORT_CARDS.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.1}>
            <div
              data-testid={`support-card-${i}`}
              className="group flex h-full flex-col items-center rounded-2xl border border-white/10 bg-espresso/70 px-8 py-12 transition-all duration-500 hover:-translate-y-1 hover:border-softgold/40"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 transition-colors duration-500 group-hover:bg-gold/20">
                <c.icon className="h-7 w-7 text-gold" aria-hidden="true" />
              </span>
              <h3 className="mt-8 font-serif text-2xl font-semibold text-cream">{c.title}</h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-parchment/70">{c.text}</p>
              <Link
                to={c.to}
                data-testid={`support-cta-${i}`}
                className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-softgold transition-colors duration-300 hover:text-gold"
              >
                {c.cta}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.15}>
        <p data-testid="support-strip" className="mt-20 border-y border-white/10 py-6 text-xs font-semibold uppercase tracking-[0.3em] text-parchment/60">
          Black-woman-centered. Faith-filled. Open to every sister seeking support.
        </p>
      </Reveal>
    </div>
  </section>
);

const SEASONS = [
  "The girl learning to name her fears",
  "The teen trying to find her identity",
  "The mother holding everyone together",
  "The woman rebuilding after a hard season",
  "The mentor with wisdom worth passing on",
  "The sister ready to worship again",
];

const FoundationSection = () => (
  <section data-testid="foundation-section" className="bg-espresso">
    <div className="mx-auto max-w-4xl px-6 py-24 text-center sm:py-32">
      <Reveal>
        <p className="eyebrow">Chapter 02 · Our Foundation</p>
        <blockquote className="mt-10 font-garamond text-5xl font-light italic leading-snug text-cream sm:text-6xl lg:text-7xl">
          "Those who look to Him are radiant; their faces are never covered with shame."
        </blockquote>
        <p className="mt-10 text-sm font-semibold uppercase tracking-[0.3em] text-parchment/60">Psalm 34:5</p>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="mt-20 border-t border-white/10 pt-20">
          <p className="eyebrow">Chapter 03 · Who We Are</p>
          <h2 className="mt-8 font-serif text-4xl font-semibold uppercase leading-[1.15] tracking-wide text-cream sm:text-5xl">
            For every season.
            <br />
            <em className="normal-case text-terracotta">for every sister.</em>
          </h2>
          <ul className="mt-14 flex flex-col gap-7">
            {SEASONS.map((s, i) => (
              <li key={s} data-testid={`season-${i}`} className="font-garamond text-2xl italic text-parchment/85 sm:text-3xl lg:text-4xl">
                {s}
              </li>
            ))}
          </ul>
          <p className="mt-16 border-t border-white/10 pt-12 font-garamond text-3xl italic text-cream sm:text-4xl lg:text-5xl">
            The table is set, sister. Come as you are.
          </p>
        </div>
      </Reveal>
    </div>
  </section>
);

const AltarSection = () => {
  const [message, setMessage] = useState("");
  const [state, setState] = useState("idle"); // idle | dissolving | done
  const reduce = useReducedMotion();

  const release = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setState("dissolving");
    setTimeout(() => setState("done"), reduce ? 100 : 2400);
  };

  const reset = () => {
    setMessage("");
    setState("idle");
  };

  return (
    <section data-testid="altar-section" className="bg-plum">
      <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-32">
        <Reveal>
          <p className="eyebrow">Chapter 04 · The Altar</p>
          <h2 className="mt-8 font-serif text-4xl font-semibold uppercase leading-[1.15] tracking-wide text-cream sm:text-5xl">
            Leave it <em className="normal-case text-terracotta">here.</em>
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-parchment/85 md:text-lg">
            Type a worry, a prayer, or a heavy thought. When you are ready,
            release it. This space is completely private — nothing is saved,
            nothing is sent.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative mt-12 min-h-[220px]">
            <AnimatePresence mode="wait">
              {state !== "done" ? (
                <motion.form
                  key="altar-form"
                  data-testid="altar-form"
                  onSubmit={release}
                  initial={false}
                  animate={
                    state === "dissolving" && !reduce
                      ? { opacity: 0, filter: "blur(12px)", y: -14 }
                      : { opacity: 1, filter: "blur(0px)", y: 0 }
                  }
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.2, ease: "easeInOut" }}
                  className="flex flex-col items-center gap-6"
                >
                  <textarea
                    data-testid="altar-textarea"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What is weighing on your heart today?"
                    required
                    maxLength={2000}
                    rows={4}
                    disabled={state === "dissolving"}
                    className="w-full resize-none rounded-2xl border border-white/15 bg-espresso/60 px-6 py-5 font-garamond text-lg italic text-cream placeholder:text-parchment/40 focus:border-softgold/60 focus:outline-none transition-colors duration-300"
                  />
                  <button
                    data-testid="altar-release-button"
                    type="submit"
                    disabled={state === "dissolving"}
                    className="rounded-full bg-gold px-10 py-4 text-xs font-bold uppercase tracking-[0.25em] text-ink transition-all duration-300 hover:bg-softgold hover:shadow-[0_0_28px_rgba(212,175,55,0.35)] disabled:opacity-50"
                  >
                    Release It
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="altar-confirmation"
                  data-testid="altar-confirmation"
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="flex min-h-[220px] flex-col items-center justify-center gap-4"
                >
                  <Flame className="h-8 w-8 text-gold" aria-hidden="true" />
                  <p className="font-garamond text-3xl font-light italic text-cream sm:text-4xl">
                    It is released now.
                  </p>
                  <p className="max-w-md text-sm leading-relaxed text-parchment/75">
                    Breathe deep, sister. What you set down here stays here.
                  </p>
                  <button
                    data-testid="altar-reset-button"
                    onClick={reset}
                    className="mt-2 text-xs font-semibold uppercase tracking-[0.25em] text-softgold underline-offset-4 hover:underline"
                  >
                    Write another
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const TRANSFORMATIONS = [
  ["Worry", "Worship"],
  ["Isolation", "Sisterhood"],
  ["Shame", "Radiance"],
  ["Fear", "Faith"],
  ["Surviving", "Flourishing"],
];

const TransformationSection = () => (
  <section data-testid="transformation-section" className="bg-espresso">
    <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 sm:py-32 lg:grid-cols-2">
      <Reveal>
        <span aria-hidden="true" className="block h-px w-10 bg-gold/70" />
        <h2 className="mt-10 font-serif text-4xl font-semibold uppercase leading-[1.2] tracking-wide text-cream sm:text-5xl">
          A softer place to <em className="normal-case text-terracotta">land.</em>
          <br />
          A stronger way to <em className="normal-case text-softgold">rise.</em>
        </h2>
        <p className="mt-8 max-w-md text-base leading-relaxed text-parchment/80 md:text-lg">
          We are building a sanctuary where heavy burdens are exchanged for deep
          peace. Step by step, we walk together out of the shadows.
        </p>
      </Reveal>
      <Reveal delay={0.12}>
        <div data-testid="transformation-card" className="rounded-2xl border border-white/10 bg-plum/60 p-8 sm:p-12">
          <p className="eyebrow">Chapter 05 · The Transformation</p>
          <div className="mt-8 flex flex-col gap-6">
            {TRANSFORMATIONS.map(([from, to], i) => (
              <div key={from} data-testid={`transformation-row-${i}`} className="flex items-baseline gap-4">
                <span className="shrink-0 font-garamond text-sm italic text-parchment/50">From</span>
                <span className="font-serif text-xl font-medium text-cream">{from}</span>
                <span aria-hidden="true" className="mx-2 h-px flex-1 bg-white/15" />
                <span className="font-serif text-xl font-medium italic text-terracotta">{to}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 border-t border-gold/30 pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-parchment/60">
              Intergenerational mentorship & soul-care spaces
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

const GATHERINGS = [
  {
    name: "Sacred Sister Circles",
    tag: "Intimate study, prayer, and deep soul-care",
    image: "/assets/img/premium_photo-1700070732070-6e3bd74f9a20.jpg",
  },
  {
    name: "Roots & Wings Mentorship",
    tag: "Intergenerational guidance and connection",
    image: "/assets/img/photo-1521510186458-bbbda7aef46b.jpg",
  },
  {
    name: "The Radiant Table",
    tag: "Brunches, gatherings, and shared laughter",
    image: "/assets/img/premium_photo-1771416587253-88eb194c0d17.jpg",
  },
  {
    name: "The Exhale Retreat",
    tag: "A sacred space to rest, worship, and renew",
    image: "/assets/img/photo-1544367567-0f2fcb009e0b.jpg",
  },
  {
    name: "Becoming Her",
    tag: "Mentorship and study group for teen girls",
    image: "/assets/img/premium_photo-1663051145175-3c730be6adc3.jpg",
  },
  {
    name: "Little Lights",
    tag: "Joyful discipleship resources for kids",
    image: "/assets/img/photo-1588072432836-e10032774350.jpg",
  },
];

const GatheringsSection = () => (
  <section data-testid="gatherings-section" className="bg-espresso">
    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <Reveal>
        <span aria-hidden="true" className="block h-px w-10 bg-gold/70" />
        <p className="eyebrow mt-8">Chapter 06 · The Table</p>
        <h2 className="mt-6 font-serif text-4xl font-semibold uppercase leading-[1.15] tracking-wide text-cream sm:text-5xl">
          Our Gatherings
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-parchment/85 md:text-lg">
          Discover beautiful chapters of connection, designed to meet you
          wherever you are in your journey.
        </p>
      </Reveal>
      <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {GATHERINGS.map((g, i) => (
          <Reveal key={g.name} delay={(i % 3) * 0.1}>
            <Link to="/gatherings" data-testid={`gathering-card-${i}`} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] border border-white/10">
                <img
                  src={g.image}
                  alt={g.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent" />
              </div>
              <h3 className="mt-6 font-serif text-2xl font-semibold text-softgold transition-colors duration-300 group-hover:text-gold">
                {g.name}
              </h3>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-parchment/60">
                {g.tag}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <SupportSection />
      <FoundationSection />
      <AltarSection />
      <TransformationSection />
      <FounderNote compact />
      <GatheringsSection />
    </main>
  );
}
