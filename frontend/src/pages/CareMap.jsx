import { useMemo, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowUpRight, PhoneCall, ShieldAlert, Briefcase, Heart, BookOpen,
  Sprout, Home as HomeIcon, Search, SlidersHorizontal, Bookmark,
  BookmarkCheck, Compass, Users, MessageCircleHeart, Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Reveal } from "../components/Reveal";
import { BenefitsGuide } from "../components/BenefitsGuide";
import { PATHWAYS } from "../data/resources";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const PATH_ICONS = {
  "purpose-provision": Briefcase,
  "mind-wellness": Heart,
  "faith-flourishing": BookOpen,
  "roots-wings": Sprout,
  "benefits-stability": HomeIcon,
};

const LOCATIONS = [
  { id: "nearme", label: "Near Me (Triad)" },
  { id: "nc", label: "North Carolina" },
  { id: "virtual", label: "Virtual" },
  { id: "any", label: "Anywhere" },
];
const COSTS = [
  { id: "any", label: "Any cost" },
  { id: "free", label: "Free" },
  { id: "low-cost", label: "Low-cost" },
  { id: "insurance", label: "Insurance" },
];
const FORMATS = [
  { id: "any", label: "Either" },
  { id: "in-person", label: "In person" },
  { id: "virtual", label: "Virtual" },
];
const SEASONS = [
  { id: "every", label: "Every Season" },
  { id: "teen", label: "Teen" },
  { id: "young-adult", label: "Young Adult" },
  { id: "mother", label: "Mother" },
  { id: "career", label: "Career Woman" },
];

const matchesLocation = (tags, sel) => {
  if (sel === "any") return true;
  const wanted = { nearme: ["triad", "nc", "national", "virtual"], nc: ["nc", "national", "virtual"], virtual: ["virtual", "national"] }[sel];
  return tags.location.some((t) => wanted.includes(t));
};
const matchesCost = (tags, sel) => sel === "any" || tags.cost.includes(sel);
const matchesFormat = (tags, sel) => sel === "any" || tags.format.includes("either") || tags.format.includes(sel);
const matchesSeason = (tags, sel) => sel === "every" || tags.seasons.includes(sel) || tags.seasons.includes("every");

const selectCls =
  "w-full rounded-lg border border-white/15 bg-espresso px-3 py-2.5 text-xs font-semibold text-cream focus:border-softgold/60 focus:outline-none";

const Action = ({ action, id }) => {
  const cls =
    "inline-flex items-center gap-1.5 rounded-full bg-gold px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:bg-softgold";
  const icon = action.href.startsWith("tel:") || action.href.startsWith("sms:") ? (
    <PhoneCall className="h-3.5 w-3.5" aria-hidden="true" />
  ) : (
    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
  );
  if (action.internal) return <Link to={action.href} data-testid={`visit-${id}`} className={cls}>{action.label}{icon}</Link>;
  if (action.anchor) {
    return (
      <a href={action.href} data-testid={`visit-${id}`} className={cls}
        onClick={(e) => { e.preventDefault(); document.querySelector('[data-testid="prayer-engine"]')?.scrollIntoView({ behavior: "smooth" }); }}>
        {action.label}{icon}
      </a>
    );
  }
  return (
    <a href={action.href} data-testid={`visit-${id}`} target={action.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={cls}>
      {action.label}{icon}
    </a>
  );
};

const ResourceCard = ({ r, pathwayId, index, saved, onSave }) => {
  const key = `${pathwayId}-${index}`;
  const isSaved = saved.includes(key);
  return (
    <div data-testid={`resource-card-${key}`} className="flex h-full flex-col rounded-xl border border-white/10 bg-espresso p-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-softgold/40 sm:p-7">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-serif text-xl font-semibold uppercase tracking-wide text-cream">{r.name}</h3>
        <span className="shrink-0 rounded-full border border-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-parchment/60">
          {pathwayId === "purpose-provision" ? "Career" : pathwayId === "mind-wellness" ? "Wellness" : pathwayId === "faith-flourishing" ? "Faith" : pathwayId === "roots-wings" ? "Youth" : "Safety"}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-parchment/75">{r.description}</p>
      <dl className="mt-5 space-y-1.5 border-t border-white/10 pt-4 text-xs text-parchment/70">
        <div className="flex gap-2"><dt className="w-24 shrink-0 font-bold uppercase tracking-wider text-softgold/80">Best for</dt><dd>{r.bestFor}</dd></div>
        <div className="flex gap-2"><dt className="w-24 shrink-0 font-bold uppercase tracking-wider text-softgold/80">Available</dt><dd>{r.available}</dd></div>
        <div className="flex gap-2"><dt className="w-24 shrink-0 font-bold uppercase tracking-wider text-softgold/80">Cost</dt><dd>{r.cost}</dd></div>
        <div className="flex gap-2"><dt className="w-24 shrink-0 font-bold uppercase tracking-wider text-softgold/80">Reviewed</dt><dd>{r.reviewed}</dd></div>
      </dl>
      <p className={`mt-4 rounded-lg border px-3 py-2 text-[11px] leading-relaxed ${
        r.kind === "clinical"
          ? "border-terracotta/40 bg-terracotta/10 text-parchment/80"
          : "border-emerald/40 bg-emerald/10 text-parchment/80"
      }`}>
        {r.kind === "clinical" ? (
          <><strong className="text-cream">Clinical care / therapy referral.</strong> This resource may connect you with licensed mental-health professionals. S.H.E. Warriors does not provide therapy or crisis care.</>
        ) : (
          <><strong className="text-cream">Community support / not clinical care.</strong> This resource provides peer, faith, mentoring, or community support and is not a substitute for professional mental-health treatment.</>
        )}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-3 pt-1">
        <Action action={r.action} id={key} />
        <button
          onClick={() => onSave(key)}
          data-testid={`save-${key}`}
          className={`inline-flex items-center gap-1.5 rounded-full border px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-300 ${
            isSaved ? "border-gold bg-gold/15 text-gold" : "border-white/20 text-parchment/70 hover:border-softgold hover:text-softgold"
          }`}
        >
          {isSaved ? <BookmarkCheck className="h-3.5 w-3.5" aria-hidden="true" /> : <Bookmark className="h-3.5 w-3.5" aria-hidden="true" />}
          {isSaved ? "Saved" : "Save for Later"}
        </button>
      </div>
    </div>
  );
};

const TalkToSister = () => {
  const [form, setForm] = useState({ name: "", contact: "", support_seeking: "", hardest_right_now: "", contact_method: "Email", preferred_time: "" });
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState("idle");
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!consent) return;
    setState("sending");
    try {
      await axios.post(`${API}/navigator-requests`, form);
      setState("done");
    } catch (err) {
      console.error(err);
      setState("idle");
    }
  };

  return (
    <div id="talk-to-a-sister" data-testid="talk-to-a-sister" className="scroll-mt-40 rounded-2xl border border-gold/25 bg-plum/40 p-8 sm:p-12">
      <p className="eyebrow">Talk to a Sister</p>
      <h2 className="mt-4 font-serif text-3xl font-semibold text-cream sm:text-4xl">
        Tell us what you need. <em className="font-garamond font-light text-softgold">We'll help you find one next step.</em>
      </h2>
      {state === "done" ? (
        <motion.div data-testid="navigator-success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-10">
          <p className="font-garamond text-3xl font-light italic text-cream">We're here, and we heard you.</p>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-parchment/75">
            A S.H.E. Warriors Care Navigator will reach out the way you asked. You don't
            have to figure this out alone.
          </p>
        </motion.div>
      ) : (
        <form data-testid="navigator-form" onSubmit={submit} className="mt-10 grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-softgold/80">Preferred name</label>
            <input data-testid="navigator-name" required maxLength={120} value={form.name} onChange={set("name")}
              className="w-full rounded-lg border border-white/15 bg-espresso/60 px-4 py-3 text-sm text-cream placeholder:text-parchment/40 focus:border-softgold/60 focus:outline-none" placeholder="What should we call you?" />
          </div>
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-softgold/80">Email or phone</label>
            <input data-testid="navigator-contact" required maxLength={200} value={form.contact} onChange={set("contact")}
              className="w-full rounded-lg border border-white/15 bg-espresso/60 px-4 py-3 text-sm text-cream placeholder:text-parchment/40 focus:border-softgold/60 focus:outline-none" placeholder="How do we reach you?" />
          </div>
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-softgold/80">What kind of support are you looking for?</label>
            <select data-testid="navigator-support" required value={form.support_seeking} onChange={set("support_seeking")} className={selectCls}>
              <option value="">Choose one…</option>
              <option>Career or purpose</option>
              <option>Mind & wellness</option>
              <option>Faith & spiritual growth</option>
              <option>For my daughter / a girl I love</option>
              <option>Safety, housing, or essentials</option>
              <option>I'm not sure yet</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-softgold/80">Preferred contact method</label>
            <select data-testid="navigator-method" value={form.contact_method} onChange={set("contact_method")} className={selectCls}>
              <option>Email</option>
              <option>Phone call</option>
              <option>Text message</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-softgold/80">What feels hardest right now? <span className="normal-case text-parchment/50">(optional)</span></label>
            <textarea data-testid="navigator-hardest" rows={3} maxLength={1000} value={form.hardest_right_now} onChange={set("hardest_right_now")}
              className="w-full resize-none rounded-lg border border-white/15 bg-espresso/60 px-4 py-3 text-sm text-cream placeholder:text-parchment/40 focus:border-softgold/60 focus:outline-none" placeholder="Only share what feels comfortable." />
          </div>
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-softgold/80">Best time to reach you</label>
            <select data-testid="navigator-time" required value={form.preferred_time} onChange={set("preferred_time")} className={selectCls}>
              <option value="">Choose one…</option>
              <option>Mornings</option>
              <option>Afternoons</option>
              <option>Evenings</option>
              <option>Anytime</option>
            </select>
          </div>
          <div className="flex items-end">
            <label className="flex items-start gap-3 text-xs leading-relaxed text-parchment/70">
              <input data-testid="navigator-consent" type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-[#D4AF37]" />
              I consent to being contacted by a S.H.E. Warriors Care Navigator about my request.
            </label>
          </div>
          <div className="sm:col-span-2">
            <button data-testid="navigator-submit" type="submit" disabled={!consent || state === "sending"}
              className="inline-flex items-center gap-2 rounded-full bg-gold px-9 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-softgold disabled:opacity-50">
              {state === "sending" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
              Request Support
            </button>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-terracotta">
              Please do not use this form for emergencies or urgent safety concerns.
            </p>
            <p className="mt-3 max-w-2xl text-xs leading-relaxed text-parchment/60">
              We are here to listen, connect, and encourage. S.H.E. Warriors Care Navigators are not
              therapists, medical providers, attorneys, or crisis responders. If you are in
              immediate danger, call 911. In a mental-health crisis, call or text 988.
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default function CareMap() {
  const { hash } = useLocation();
  const [pathway, setPathway] = useState("purpose-provision");
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("nearme");
  const [cost, setCost] = useState("any");
  const [format, setFormat] = useState("any");
  const [season, setSeason] = useState("every");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [saved, setSaved] = useState(() => {
    try { return JSON.parse(localStorage.getItem("sw_saved") || "[]"); } catch { return []; }
  });

  useEffect(() => {
    const id = hash.replace("#", "");
    if (PATHWAYS.some((p) => p.id === id)) setPathway(id);
  }, [hash]);

  const active = PATHWAYS.find((p) => p.id === pathway);
  const featured = active.resources.find((r) => r.featured);
  const results = useMemo(
    () =>
      active.resources.filter((r) => {
        const q = search.trim().toLowerCase();
        if (q && !`${r.name} ${r.description} ${r.bestFor}`.toLowerCase().includes(q)) return false;
        return matchesLocation(r.tags, location) && matchesCost(r.tags, cost) && matchesFormat(r.tags, format) && matchesSeason(r.tags, season);
      }),
    [active, search, location, cost, format, season]
  );

  const toggleSave = (key) => {
    const next = saved.includes(key) ? saved.filter((k) => k !== key) : [...saved, key];
    setSaved(next);
    localStorage.setItem("sw_saved", JSON.stringify(next));
  };

  const choose = (id) => {
    setPathway(id);
    setTimeout(() => document.querySelector('[data-testid="care-results"]')?.scrollIntoView({ behavior: "smooth" }), 80);
  };

  const big = PATHWAYS.filter((p) => p.big);
  const small = PATHWAYS.filter((p) => !p.big);

  return (
    <main data-testid="care-map-page">
      <div data-testid="care-safety-bar" className="border-b border-emerald/40 bg-emerald/25">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-6 py-3 text-xs sm:text-sm">
          <span className="flex items-center gap-2 font-semibold text-cream">
            <ShieldAlert className="h-4 w-4 text-softgold" aria-hidden="true" />
            Need immediate help? In danger, call 911. In crisis, call or text 988.
          </span>
          <button
            data-testid="care-urgent-link"
            onClick={() => choose("benefits-stability")}
            className="font-bold uppercase tracking-[0.2em] text-gold underline-offset-4 hover:underline"
          >
            Get urgent support →
          </button>
        </div>
      </div>

      <section className="bg-plum/40">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-28">
          <Reveal className="text-center">
            <p className="eyebrow">The S.H.E. Warriors Care Map</p>
            <h1 className="mt-6 font-serif text-4xl font-semibold uppercase leading-[1.15] tracking-wide text-cream sm:text-5xl lg:text-6xl">
              What do you need <em className="normal-case text-terracotta">today?</em>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-parchment/85 md:text-lg">
              You deserve support that sees the whole of you. Choose the area
              that feels closest to what you need right now.
            </p>
          </Reveal>
          {(() => {
            const b = PATHWAYS.find((p) => p.id === "benefits-stability");
            const Icon = PATH_ICONS[b.id];
            return (
              <Reveal>
                <button
                  onClick={() => choose(b.id)}
                  data-testid={`pathway-${b.id}`}
                  className={`group mt-14 flex w-full flex-col items-start gap-6 rounded-2xl border-2 p-8 text-left transition-all duration-500 hover:-translate-y-1 sm:flex-row sm:items-center sm:p-10 ${
                    pathway === b.id
                      ? "border-gold bg-plum shadow-[0_0_40px_rgba(212,175,55,0.15)]"
                      : "border-gold/50 bg-plum/70 hover:border-gold hover:shadow-[0_0_40px_rgba(212,175,55,0.12)]"
                  }`}
                >
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gold/15 transition-colors duration-500 group-hover:bg-gold/25">
                    <Icon className="h-7 w-7 text-gold" aria-hidden="true" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-xs font-bold uppercase tracking-[0.25em] text-softgold">
                      Start here if today is heavy
                    </span>
                    <span className="mt-2 block font-serif text-3xl font-semibold text-cream sm:text-4xl">{b.name}</span>
                    <span className="mt-3 block max-w-2xl text-sm leading-relaxed text-parchment/80 md:text-base">
                      {b.short} — plus plain-language NC Medicaid and food assistance guides, and a benefits check to see what you qualify for.
                    </span>
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gold px-7 py-3 text-xs font-bold uppercase tracking-[0.2em] text-ink transition-colors duration-300 group-hover:bg-softgold">
                    {b.cta} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </button>
              </Reveal>
            );
          })()}
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {big.filter((p) => p.id !== "benefits-stability").map((p, i) => {
              const Icon = PATH_ICONS[p.id];
              return (
                <Reveal key={p.id} delay={i * 0.08}>
                  <button
                    onClick={() => choose(p.id)}
                    data-testid={`pathway-${p.id}`}
                    className={`group flex h-full w-full flex-col items-start rounded-2xl border p-8 text-left transition-all duration-500 hover:-translate-y-1 ${
                      pathway === p.id ? "border-gold/60 bg-espresso" : "border-white/10 bg-espresso/60 hover:border-softgold/40"
                    }`}
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 transition-colors duration-500 group-hover:bg-gold/20">
                      <Icon className="h-6 w-6 text-gold" aria-hidden="true" />
                    </span>
                    <h2 className="mt-6 font-serif text-2xl font-semibold text-cream">{p.name}</h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-parchment/70">{p.short}.</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-softgold">
                      {p.cta} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {small.map((p) => {
              const Icon = PATH_ICONS[p.id];
              return (
                <Reveal key={p.id}>
                  <button
                    onClick={() => choose(p.id)}
                    data-testid={`pathway-${p.id}`}
                    className={`group flex w-full items-center gap-5 rounded-2xl border p-6 text-left transition-all duration-500 hover:-translate-y-0.5 ${
                      pathway === p.id ? "border-gold/60 bg-espresso" : "border-white/10 bg-espresso/60 hover:border-softgold/40"
                    }`}
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/10">
                      <Icon className="h-5 w-5 text-gold" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-serif text-xl font-semibold text-cream">{p.name}</span>
                      <span className="mt-1 block text-sm text-parchment/70">{p.short}.</span>
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section data-testid="care-results" className="scroll-mt-32 bg-espresso">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
          <Reveal>
            <h2 className="font-serif text-3xl font-semibold text-cream sm:text-4xl">{active.resultsTitle}</h2>
            <p className="mt-3 max-w-2xl font-garamond text-xl italic text-parchment/75">{active.resultsSub}</p>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-10 rounded-2xl border border-white/10 bg-ink/50 p-5 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-parchment/50" aria-hidden="true" />
                  <input
                    data-testid="care-search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by topic, organization, or need…"
                    className="w-full rounded-lg border border-white/15 bg-espresso py-3 pl-11 pr-4 text-sm text-cream placeholder:text-parchment/40 focus:border-softgold/60 focus:outline-none"
                  />
                </div>
                <button
                  data-testid="filter-toggle"
                  onClick={() => setFiltersOpen(!filtersOpen)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-gold/50 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-gold lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                  Filter My Options
                </button>
              </div>
              <div className={`${filtersOpen ? "mt-4 grid" : "hidden"} grid-cols-2 gap-3 lg:mt-4 lg:grid lg:grid-cols-5`}>
                <select data-testid="filter-location" value={location} onChange={(e) => setLocation(e.target.value)} className={selectCls}>
                  {LOCATIONS.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
                </select>
                <select data-testid="filter-cost" value={cost} onChange={(e) => setCost(e.target.value)} className={selectCls}>
                  {COSTS.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
                </select>
                <select data-testid="filter-format" value={format} onChange={(e) => setFormat(e.target.value)} className={selectCls}>
                  {FORMATS.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
                </select>
                <select data-testid="filter-season" value={season} onChange={(e) => setSeason(e.target.value)} className={selectCls}>
                  {SEASONS.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
                </select>
                <div className="col-span-2 flex items-center lg:col-span-1">
                  <span data-testid="results-count" className="text-xs font-bold uppercase tracking-[0.2em] text-softgold">
                    {results.length} option{results.length === 1 ? "" : "s"} for you
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {featured && (
              <Reveal>
                <div data-testid="start-here-card" className="flex h-full flex-col rounded-2xl border border-gold/40 bg-plum/50 p-7">
                  <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-gold">
                    <Compass className="h-4 w-4" aria-hidden="true" /> Start Here
                  </span>
                  <h3 className="mt-4 font-serif text-2xl font-semibold text-cream">{featured.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-parchment/75">{featured.description}</p>
                  <div className="mt-6"><Action action={featured.action} id={`featured-${active.id}`} /></div>
                </div>
              </Reveal>
            )}
            <Reveal delay={0.08}>
              <button
                onClick={() => document.querySelector('[data-testid="talk-to-a-sister"]')?.scrollIntoView({ behavior: "smooth" })}
                data-testid="talk-to-sister-card"
                className="group flex h-full w-full flex-col rounded-2xl border border-white/10 bg-ink/50 p-7 text-left transition-all duration-500 hover:-translate-y-1 hover:border-softgold/40"
              >
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-gold">
                  <MessageCircleHeart className="h-4 w-4" aria-hidden="true" /> Talk to a Sister
                </span>
                <h3 className="mt-4 font-serif text-2xl font-semibold text-cream">Need help choosing?</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-parchment/75">
                  Request follow-up from a S.H.E. Warriors Care Navigator. We'll help you find one realistic next step.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-softgold group-hover:text-gold">
                  Request support <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </button>
            </Reveal>
            <Reveal delay={0.16}>
              <Link
                to="/gatherings"
                data-testid="join-circle-card"
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-ink/50 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-softgold/40"
              >
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-gold">
                  <Users className="h-4 w-4" aria-hidden="true" /> Join a Circle
                </span>
                <h3 className="mt-4 font-serif text-2xl font-semibold text-cream">Don't do it alone.</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-parchment/75">
                  The next S.H.E. Warriors gathering, workshop, or Sister Circle is a warm first step.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-softgold group-hover:text-gold">
                  See gatherings <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          </div>

          {active.id === "benefits-stability" && <BenefitsGuide />}

          <Reveal delay={0.05}>
            <h3 className="mt-16 border-t border-white/10 pt-10 text-xs font-bold uppercase tracking-[0.3em] text-softgold">
              Trusted Resources
            </h3>
          </Reveal>
          {results.length === 0 ? (
            <p data-testid="no-results" className="mt-8 font-garamond text-2xl italic text-parchment/70">
              Nothing matches those filters yet — try widening them, or talk to a sister below.
            </p>
          ) : (
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {results.map((r, i) => (
                <Reveal key={r.name} delay={Math.min(i * 0.05, 0.2)}>
                  <ResourceCard r={r} pathwayId={active.id} index={i} saved={saved} onSave={toggleSave} />
                </Reveal>
              ))}
            </div>
          )}

          <div className="mt-20">
            <TalkToSister />
          </div>

          <Reveal delay={0.05}>
            <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
              {[
                { title: "Can't find what you need?", text: "Request support from a Care Navigator.", target: "talk-to-a-sister", id: "bottom-navigator" },
                { title: "Have a resource to share?", text: "Recommend a trusted organization for review.", href: "mailto:hello@sheworriers.org?subject=Resource%20Recommendation", id: "bottom-recommend" },
                { title: "Want to help build the map?", text: "Become a partner, volunteer, or donor.", to: "/get-involved", id: "bottom-build" },
              ].map((b) => (
                <div key={b.id} className="bg-ink/60 p-8">
                  <h4 className="font-serif text-xl font-semibold uppercase tracking-wide text-cream">{b.title}</h4>
                  <p className="mt-3 text-sm text-parchment/70">{b.text}</p>
                  {b.to ? (
                    <Link to={b.to} data-testid={b.id} className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-softgold hover:text-gold">
                      Get involved <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  ) : b.href ? (
                    <a href={b.href} data-testid={b.id} className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-softgold hover:text-gold">
                      Recommend it <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ) : (
                    <button
                      onClick={() => document.querySelector('[data-testid="talk-to-a-sister"]')?.scrollIntoView({ behavior: "smooth" })}
                      data-testid={b.id}
                      className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-softgold hover:text-gold"
                    >
                      Request support <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <p data-testid="care-closing" className="mt-16 text-center font-garamond text-3xl font-light italic leading-snug text-cream sm:text-4xl">
              "You do not have to solve everything today.
              <br />
              One supported step is still a step forward."
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
