import { useState } from "react";
import { Link } from "react-router-dom";
import { HeartHandshake, Loader2 } from "lucide-react";
import axios from "axios";
import { Reveal } from "../components/Reveal";
import { PayPalGive } from "../components/PayPalGive";
import { IMAGES } from "../data/resources";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const TIERS = [
  { amount: 25, lookup: "give_25", impact: "A one-time gift toward gatherings, mentorship, and the Care Map." },
  { amount: 50, lookup: "give_50", impact: "A one-time gift toward gatherings, mentorship, and the Care Map." },
  { amount: 100, lookup: "give_100", impact: "A one-time gift toward gatherings, mentorship, and the Care Map." },
  { amount: 250, lookup: "give_250", impact: "A one-time gift toward gatherings, mentorship, and the Care Map." },
];

const SUSTAINER_TIERS = [
  { amount: 15, lookup: "sustain_15", impact: "A steady monthly gift that keeps circles meeting." },
  { amount: 25, lookup: "sustain_25", impact: "A steady monthly gift that keeps circles meeting." },
  { amount: 50, lookup: "sustain_50", impact: "A steady monthly gift that keeps circles meeting." },
  { amount: 100, lookup: "sustain_100", impact: "A steady monthly gift that keeps circles meeting." },
];

const GIFT_BUILDS = [
  "Sister Circles and community gatherings",
  "Programs for girls and young women",
  "Mentorship infrastructure",
  "Career and professional-development opportunities",
  "Community resource connections",
  "Retreats and faith-centered experiences",
  "The SHE Warriors Care Map",
  "Scholarships and participation assistance",
];

export default function Give() {
  const [loading, setLoading] = useState(null);

  const give = async (tier) => {
    setLoading(tier.lookup);
    try {
      const { data } = await axios.post(`${API}/payments/checkout`, {
        lookup_key: tier.lookup,
        origin_url: window.location.origin,
      });
      window.location.href = data.checkout_url;
    } catch (err) {
      console.error("checkout failed", err);
      setLoading(null);
    }
  };

  return (
    <main data-testid="give-page">
      <section className="relative overflow-hidden">
        <img
          src={IMAGES.candles}
          alt=""
          className="texture-image pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/70 to-espresso" />
        <div className="relative mx-auto max-w-7xl px-6 py-28 sm:py-36">
          <Reveal>
            <p className="eyebrow">Give</p>
            <h1 className="mt-6 max-w-3xl font-serif text-4xl font-semibold uppercase leading-[1.15] tracking-wide text-cream sm:text-5xl lg:text-6xl">
              Every gift helps{" "}
              <em className="normal-case text-terracotta">build the table.</em>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-parchment/85 md:text-lg">
              SHE Warriors Foundation is a faith-centered nonprofit based in
              Winston-Salem, NC (501(c)(3) status pending approval). Your support
              helps us develop:
            </p>
            <ul className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
              {GIFT_BUILDS.map((g) => (
                <li key={g} className="flex items-start gap-3 text-sm text-parchment/80">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {g}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-espresso">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TIERS.map((t, i) => (
              <Reveal key={t.amount} delay={i * 0.08}>
                <div
                  data-testid={`give-tier-${t.amount}`}
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-ink/50 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold/60 hover:bg-plum/50"
                >
                  <span className="font-serif text-5xl font-light text-cream transition-colors duration-300 group-hover:text-gold">
                    ${t.amount}
                  </span>
                  <p className="mt-5 flex-1 text-sm leading-relaxed text-parchment/70">{t.impact}</p>
                  <button
                    onClick={() => give(t)}
                    disabled={loading !== null}
                    data-testid={`give-button-${t.amount}`}
                    className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-gold px-6 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-softgold disabled:opacity-60"
                  >
                    {loading === t.lookup ? (
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    ) : (
                      <HeartHandshake className="h-4 w-4" aria-hidden="true" />
                    )}
                    Give ${t.amount}
                  </button>
                  <PayPalGive lookup={t.lookup} amount={t.amount} />
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15}>
            <div data-testid="sustainer-circle" className="mt-20 rounded-2xl border border-gold/25 bg-plum/50 p-8 sm:p-12">
              <p className="eyebrow">Monthly Giving</p>
              <h2 className="mt-4 font-serif text-3xl font-semibold text-cream sm:text-4xl">
                The Sustainer <em className="font-garamond font-light text-softgold">Circle</em>
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-parchment/75 md:text-base">
                One-time gifts open doors; monthly gifts keep them open. Sustainers
                give automatically each month — steady care for steady burdens.
                Cancel anytime.
              </p>
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {SUSTAINER_TIERS.map((t, i) => (
                  <div
                    key={t.lookup}
                    data-testid={`sustainer-tier-${t.amount}`}
                    className="group flex h-full flex-col rounded-xl border border-white/10 bg-ink/60 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold/60"
                  >
                    <span className="font-serif text-4xl font-light text-cream transition-colors duration-300 group-hover:text-gold">
                      ${t.amount}
                      <span className="font-garamond text-lg italic text-parchment/60"> /month</span>
                    </span>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-parchment/70">{t.impact}</p>
                    <button
                      onClick={() => give(t)}
                      disabled={loading !== null}
                      data-testid={`sustainer-button-${t.amount}`}
                      className="mt-7 inline-flex w-fit items-center gap-2 rounded-full border border-gold/60 px-6 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-gold transition-all duration-300 hover:bg-gold hover:text-ink disabled:opacity-60"
                    >
                      {loading === t.lookup ? (
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      ) : (
                        <HeartHandshake className="h-4 w-4" aria-hidden="true" />
                      )}
                      Join Monthly — Circle Keeper
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-16 rounded-2xl border border-white/10 bg-plum/40 p-8 sm:p-12">
              <h2 className="font-serif text-2xl font-semibold text-cream sm:text-3xl">Other ways to give</h2>
              <div className="mt-6 grid gap-8 text-sm leading-relaxed text-parchment/75 sm:grid-cols-3">
                <p>
                  <span className="mb-1 block text-xs font-bold uppercase tracking-[0.25em] text-softgold">By mail</span>
                  SHE Warriors Foundation, P.O. Box 412, Winston-Salem, NC — we'll gratefully receipt every check.
                </p>
                <p>
                  <span className="mb-1 block text-xs font-bold uppercase tracking-[0.25em] text-softgold">Monthly circle</span>
                  Steady monthly givers sustain steady care. Email hello@sheworriers.org to join.
                </p>
                <p>
                  <span className="mb-1 block text-xs font-bold uppercase tracking-[0.25em] text-softgold">Transparency</span>
                  Annual reports and financials are published in our footer for every donor to review.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
