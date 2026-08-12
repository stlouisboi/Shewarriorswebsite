import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Loader2, Users, GraduationCap, HandHeart, Handshake, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { Reveal } from "../components/Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const inputCls =
  "w-full rounded-lg border border-white/15 bg-espresso/60 px-4 py-3 text-sm text-cream placeholder:text-parchment/40 focus:border-softgold/60 focus:outline-none transition-colors duration-300";
const labelCls = "mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-softgold/80";

const scrollTo = (id) => document.querySelector(`[data-testid="${id}"]`)?.scrollIntoView({ behavior: "smooth" });

const InterestForm = ({ kind, fields, testid, submitLabel, note }) => {
  const [form, setForm] = useState({});
  const [checked, setChecked] = useState(false);
  const [state, setState] = useState("idle");

  const submit = async (e) => {
    e.preventDefault();
    setState("sending");
    try {
      const { name, email, phone, ...details } = form;
      await axios.post(`${API}/interest`, { kind, name, email, phone: phone || null, details });
      setState("done");
    } catch (err) {
      console.error(err);
      setState("idle");
    }
  };

  if (state === "done") {
    return (
      <motion.div data-testid={`${testid}-success`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
        <p className="font-garamond text-3xl font-light italic text-cream">You're on the list.</p>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-parchment/75">{note}</p>
      </motion.div>
    );
  }

  return (
    <form data-testid={`${testid}-form`} onSubmit={submit} className="mt-10 grid gap-5 sm:grid-cols-2">
      {fields.map((f) => (
        <div key={f.key} className={f.wide ? "sm:col-span-2" : ""}>
          <label className={labelCls}>
            {f.label} {f.optional && <span className="normal-case text-parchment/50">(optional)</span>}
          </label>
          {f.type === "textarea" ? (
            <textarea data-testid={`${testid}-${f.key}`} rows={3} required={!f.optional} value={form[f.key] || ""}
              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.placeholder}
              className={`${inputCls} resize-none`} />
          ) : f.type === "select" ? (
            <select data-testid={`${testid}-${f.key}`} required={!f.optional} value={form[f.key] || ""}
              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} className={inputCls}>
              <option value="">Choose one…</option>
              {f.options.map((o) => <option key={o}>{o}</option>)}
            </select>
          ) : (
            <input data-testid={`${testid}-${f.key}`} type={f.type || "text"} required={!f.optional} value={form[f.key] || ""}
              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.placeholder} className={inputCls} />
          )}
        </div>
      ))}
      {kind === "mentor" && (
        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 text-xs leading-relaxed text-parchment/70">
            <input data-testid={`${testid}-screening`} type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-[#D4AF37]" />
            I'm willing to complete future orientation and screening before mentoring begins.
          </label>
        </div>
      )}
      <div className="sm:col-span-2">
        <button data-testid={`${testid}-submit`} type="submit"
          disabled={state === "sending" || (kind === "mentor" && !checked)}
          className="inline-flex items-center gap-2 rounded-full bg-gold px-9 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-softgold disabled:opacity-50">
          {state === "sending" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {submitLabel}
        </button>
        <p className="mt-4 text-xs leading-relaxed text-parchment/60">{note}</p>
      </div>
    </form>
  );
};

const PLACES = [
  { num: "01", icon: Users, name: "Join the Sisterhood", tag: "For women seeking community, encouragement, prayer, events, and support.", text: "Come as you are. Find your people.", cta: "Find Your Circle", target: "section-join" },
  { num: "02", icon: GraduationCap, name: "Mentor a Sister", tag: "For women ready to share wisdom, faith, professional experience, or life experience.", text: "Your story may be the answer to another woman's prayer.", cta: "Pass It Forward", target: "section-mentor" },
  { num: "03", icon: HandHeart, name: "Serve the Movement", tag: "For volunteers ready to bring time, skills, creativity, hospitality, or professional gifts.", text: "Bring your hands, heart, and gifts.", cta: "Share Your Gift", target: "section-serve" },
  { num: "04", icon: Handshake, name: "Partner With Us", tag: "For churches, schools, providers, businesses, nonprofits, and community organizations.", text: "We are building a network, not trying to become everything.", cta: "Build With Us", target: "section-partner" },
  { num: "05", icon: HeartHandshake, name: "Fund the Mission", tag: "For donors, sponsors, and supporters helping SheWorriers grow programs, gatherings, and access.", text: "Help make room for another woman to flourish.", cta: "Help Set the Table", to: "/give" },
];

const SEASONS = ["Teen", "College & Career", "Motherhood", "Transition", "Legacy"];
const LOOKING_FOR = ["Community", "Prayer", "Mentorship", "Career Support", "Wellness Resources", "Youth Support", "Events & Gatherings"];

const SERVE_AREAS = [
  { name: "Gatherings", text: "Hospitality, registration, setup, food, prayer, photography." },
  { name: "Creative & Communications", text: "Graphic design, website, writing, photography, video, social media." },
  { name: "Community", text: "Outreach, Care Map research, resource verification, community events." },
  { name: "Youth", text: "Girls programming and event support." },
  { name: "Professional Skills", text: "Legal, finance, HR, therapy, career development, education." },
  { name: "Development", text: "Fundraising, sponsorship outreach, donor support." },
];

const PARTNER_LANES = [
  { name: "Care", text: "Therapists, counselors, wellness providers, support organizations." },
  { name: "Faith", text: "Churches, ministries, prayer partners." },
  { name: "Opportunity", text: "Employers, colleges, career professionals, entrepreneurs." },
  { name: "Youth", text: "Schools, youth organizations, educators." },
  { name: "Community", text: "Nonprofits, civic organizations, community groups." },
  { name: "Resources", text: "Venues, restaurants, caterers, photographers, transportation." },
  { name: "Funding", text: "Businesses, foundations, corporate sponsors, donors." },
];

const SectionHead = ({ num, title, accent, children }) => (
  <Reveal>
    <span className="font-garamond text-lg italic text-softgold">{num}</span>
    <h2 className="mt-2 font-serif text-3xl font-semibold leading-tight text-cream sm:text-4xl lg:text-5xl">
      {title} {accent && <em className="font-garamond font-light text-terracotta">{accent}</em>}
    </h2>
    {children}
  </Reveal>
);

export default function GetInvolved() {
  return (
    <main data-testid="get-involved-page">
      <section className="bg-plum/40">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <Reveal>
            <span aria-hidden="true" className="block h-px w-10 bg-gold/70" />
            <h1 className="mt-8 max-w-4xl font-serif text-4xl font-semibold uppercase leading-[1.12] tracking-wide text-cream sm:text-5xl lg:text-6xl">
              Help us build what <em className="normal-case text-terracotta">women deserve.</em>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-parchment/85 md:text-lg">
              SheWorriers is building a faith-filled sisterhood where women and girls can
              find community, spiritual growth, mentorship, career support, and pathways
              to mental wellness.
            </p>
            <div className="mt-10 font-garamond text-2xl font-light italic leading-relaxed text-parchment/85 sm:text-3xl">
              <p>You may have time.</p>
              <p>You may have wisdom.</p>
              <p>You may have a skill.</p>
              <p>You may have resources.</p>
              <p>You may simply have a heart to pray.</p>
              <p className="mt-4 text-cream">There is a place for you at the table.</p>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <button onClick={() => scrollTo("section-join")} data-testid="hero-join"
                className="rounded-full bg-terracotta px-8 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-[#d47a62]">
                Join the Sisterhood
              </button>
              <button onClick={() => scrollTo("section-serve")} data-testid="hero-serve"
                className="rounded-full border border-cream/30 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:border-softgold hover:text-softgold">
                Serve With Us
              </button>
              <button onClick={() => scrollTo("section-partner")} data-testid="hero-partner"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-softgold underline-offset-4 hover:underline">
                Partner or Sponsor <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-espresso">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-28">
          <Reveal>
            <p className="eyebrow">Choose Your Place</p>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {PLACES.map((p, i) => (
              <Reveal key={p.num} delay={i * 0.06}>
                {p.to ? (
                  <Link to={p.to} data-testid={`place-${p.num}`}
                    className="group flex h-full flex-col rounded-2xl border border-white/10 bg-ink/50 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold/50">
                    <span className="font-garamond text-3xl font-light italic text-softgold/60">{p.num}</span>
                    <p.icon className="mt-4 h-6 w-6 text-gold" aria-hidden="true" />
                    <h3 className="mt-3 font-serif text-lg font-semibold text-cream">{p.name}</h3>
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-parchment/65">{p.tag}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-softgold group-hover:text-gold">
                      {p.cta} <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </span>
                  </Link>
                ) : (
                  <button onClick={() => scrollTo(p.target)} data-testid={`place-${p.num}`}
                    className="group flex h-full w-full flex-col rounded-2xl border border-white/10 bg-ink/50 p-6 text-left transition-all duration-500 hover:-translate-y-1 hover:border-gold/50">
                    <span className="font-garamond text-3xl font-light italic text-softgold/60">{p.num}</span>
                    <p.icon className="mt-4 h-6 w-6 text-gold" aria-hidden="true" />
                    <h3 className="mt-3 font-serif text-lg font-semibold text-cream">{p.name}</h3>
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-parchment/65">{p.tag}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-softgold group-hover:text-gold">
                      {p.cta} <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </span>
                  </button>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section data-testid="section-join" className="scroll-mt-32 bg-plum/50">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <SectionHead num="01" title="Join the Sisterhood" accent="Come as you are. Find your people.">
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-parchment/85">
              This is why SheWorriers exists. Whatever season you're in and whatever
              you're carrying, there is a circle here with your name on it.
            </p>
          </SectionHead>
          <Reveal delay={0.1}>
            <div className="mt-12 grid gap-10 lg:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-softgold/80">What's your season?</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {SEASONS.map((s) => (
                    <span key={s} data-testid={`season-chip-${s.toLowerCase().replace(/\s+/g, "-")}`}
                      className="rounded-full border border-white/15 bg-espresso/60 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-parchment/85">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-softgold/80">What are you looking for right now?</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {LOOKING_FOR.map((s) => (
                    <span key={s} data-testid={`need-chip-${s.toLowerCase().replace(/\s+/g, "-")}`}
                      className="rounded-full border border-gold/25 bg-espresso/60 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-parchment/85">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-14 font-garamond text-3xl font-light italic text-cream sm:text-4xl">
              You do not have to have it all together to join us.
            </p>
            <Link to="/gatherings" data-testid="join-find-circle"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-terracotta px-8 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-[#d47a62]">
              Find Your Circle <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section data-testid="section-mentor" className="scroll-mt-32 bg-espresso">
        <div className="mx-auto max-w-4xl px-6 py-24 sm:py-32">
          <SectionHead num="02" title="Help Us Build" accent="the Mentor Network">
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-parchment/85">
              We are developing a thoughtful mentorship pathway for women and girls.
              If you have wisdom, professional experience, spiritual maturity, or life
              experience you'd like to share, tell us about yourself. This is an
              interest list — active mentor matching begins after orientation and screening.
            </p>
          </SectionHead>
          <Reveal delay={0.1}>
            <InterestForm
              kind="mentor"
              testid="mentor"
              submitLabel="Pass It Forward"
              note="After you submit, we'll contact you about the pathway as it develops — including orientation and screening. No matching happens before then."
              fields={[
                { key: "name", label: "Name", placeholder: "Your full name" },
                { key: "email", label: "Email", type: "email", placeholder: "you@example.com" },
                { key: "phone", label: "Phone", optional: true, placeholder: "(336) 555-0100" },
                { key: "city", label: "City", placeholder: "Winston-Salem" },
                { key: "profession", label: "Career / profession", placeholder: "What do you do?" },
                { key: "areas", label: "Areas of life experience", placeholder: "Motherhood, career change, grief, entrepreneurship…" },
                { key: "age_group", label: "Preferred age group", type: "select", options: ["Girls 5–11", "Teens 12–18", "Young women", "Women", "Any age"] },
                { key: "availability", label: "Availability", type: "select", options: ["Weekly", "Twice a month", "Monthly", "Occasionally"] },
                { key: "why", label: "Why mentorship matters to you", type: "textarea", wide: true, placeholder: "A few honest sentences are plenty." },
                { key: "faith", label: "Faith / community involvement", type: "textarea", wide: true, optional: true, placeholder: "Where appropriate — church, community, service." },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <section data-testid="section-serve" className="scroll-mt-32 bg-plum/40">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <SectionHead num="03" title="Serve the Movement" accent="Bring your hands, heart, and gifts." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVE_AREAS.map((a, i) => (
              <Reveal key={a.name} delay={i * 0.05}>
                <div data-testid={`serve-area-${i}`} className="h-full rounded-xl border border-white/10 bg-ink/50 p-6">
                  <h3 className="font-serif text-xl font-semibold text-cream">{a.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-parchment/70">{a.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <InterestForm
              kind="volunteer"
              testid="volunteer"
              submitLabel="Share Your Gift"
              note="After you submit your interest, we will contact you about current opportunities, orientation, and the next best fit for your gifts."
              fields={[
                { key: "name", label: "Name", placeholder: "Your full name" },
                { key: "email", label: "Email", type: "email", placeholder: "you@example.com" },
                { key: "area", label: "Where would you love to serve?", type: "select", wide: true, options: SERVE_AREAS.map((a) => a.name).concat("Wherever I'm needed") },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <section data-testid="section-partner" className="scroll-mt-32 bg-espresso">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <SectionHead num="04" title="It Takes a Village to Build" accent="a Safe Place for Women to Flourish.">
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-parchment/85">
              SheWorriers is a trusted connector and convener — not a counseling center,
              employer, or church. Partners make the Care Map real.
            </p>
          </SectionHead>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PARTNER_LANES.map((a, i) => (
              <Reveal key={a.name} delay={Math.min(i * 0.05, 0.2)}>
                <div data-testid={`partner-lane-${i}`} className="h-full rounded-xl border border-white/10 bg-ink/50 p-6">
                  <h3 className="font-serif text-xl font-semibold text-softgold">{a.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-parchment/70">{a.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <InterestForm
              kind="partner"
              testid="partner"
              submitLabel="Build With Us"
              note="Tell us who you are and how you'd like to help — hosting a circle, offering a workshop, sponsoring a table, or joining the Care Map. We'll follow up personally."
              fields={[
                { key: "name", label: "Your name", placeholder: "Contact person" },
                { key: "organization", label: "Organization", placeholder: "Church, business, practice, nonprofit…" },
                { key: "email", label: "Email", type: "email", placeholder: "you@example.com" },
                { key: "lane", label: "How you'd like to partner", type: "select", options: PARTNER_LANES.map((a) => a.name) },
                { key: "message", label: "Anything you'd like us to know", type: "textarea", wide: true, optional: true, placeholder: "Host a circle, offer a workshop, sponsor a table…" },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-ink">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center sm:py-32">
          <Reveal>
            <p className="eyebrow">05 · Fund the Mission</p>
            <h2 className="mx-auto mt-6 max-w-3xl font-serif text-4xl font-semibold uppercase leading-[1.15] tracking-wide text-cream sm:text-5xl">
              A sisterhood this powerful is{" "}
              <em className="normal-case text-terracotta">never built by one woman.</em>
            </h2>
            <p className="mx-auto mt-8 max-w-xl font-garamond text-2xl font-light italic leading-relaxed text-parchment/85 sm:text-3xl">
              You do not have to do everything.
              <br />
              You can do something.
            </p>
            <div className="mt-10">
              <button onClick={() => scrollTo("place-01")} data-testid="closing-find-your-place"
                className="rounded-full bg-gold px-10 py-4 text-xs font-bold uppercase tracking-[0.25em] text-ink transition-all duration-300 hover:bg-softgold hover:shadow-[0_0_28px_rgba(212,175,55,0.35)]">
                Find Your Place
              </button>
            </div>
            <p className="mx-auto mt-14 max-w-2xl font-garamond text-xl font-light italic leading-relaxed text-parchment/60 sm:text-2xl">
              "God, show me where my hands, heart, story, and resources can make room
              for another woman to flourish."
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
