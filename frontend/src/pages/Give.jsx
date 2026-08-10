import { toast } from "sonner";
import { HeartHandshake } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { IMAGES } from "../data/resources";

const TIERS = [
  { amount: 25, impact: "Covers a week of warm meals and coffee for one care circle." },
  { amount: 50, impact: "Stocks a welcome bag for a woman arriving at a safe house." },
  { amount: 100, impact: "Funds a seat in a provision workshop — resume, budget, benefits." },
  { amount: 250, impact: "Sponsors a month of mentoring for a girl in our teen circle." },
];

export default function Give() {
  const choose = (amount) =>
    toast.info("Our secure giving portal is launching soon.", {
      description: `Thank you for your heart to give $${amount}. Please check back shortly or email hello@sheworriers.org.`,
    });

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
            <h1 className="mt-6 max-w-3xl font-serif text-4xl font-light leading-[1.1] text-cream sm:text-5xl lg:text-6xl">
              Generosity that becomes <em className="text-softgold">steady ground.</em>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-parchment/85 md:text-lg">
              SheWorriers Foundation is a registered 501(c)(3). Every gift is
              tax-deductible and goes directly to care circles, practical resources,
              and safe spaces for women and girls.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-espresso">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TIERS.map((t, i) => (
              <Reveal key={t.amount} delay={i * 0.08}>
                <button
                  onClick={() => choose(t.amount)}
                  data-testid={`give-tier-${t.amount}`}
                  className="group flex h-full w-full flex-col border border-white/10 bg-ink/50 p-8 text-left transition-all duration-500 hover:-translate-y-1 hover:border-gold/60 hover:bg-plum/50"
                >
                  <span className="font-serif text-5xl font-light text-cream transition-colors duration-300 group-hover:text-gold">
                    ${t.amount}
                  </span>
                  <p className="mt-5 flex-1 text-sm leading-relaxed text-parchment/70">{t.impact}</p>
                  <span className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-gold px-6 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-ink transition-colors duration-300 group-hover:bg-softgold">
                    <HeartHandshake className="h-4 w-4" aria-hidden="true" />
                    Give ${t.amount}
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15}>
            <div className="mt-16 border border-white/10 bg-plum/40 p-8 sm:p-12">
              <h2 className="font-serif text-2xl font-medium text-cream sm:text-3xl">
                Other ways to give
              </h2>
              <div className="mt-6 grid gap-8 text-sm leading-relaxed text-parchment/75 sm:grid-cols-3">
                <p>
                  <span className="mb-1 block text-xs font-bold uppercase tracking-[0.25em] text-softgold">By mail</span>
                  SheWorriers Foundation, P.O. Box 412, and we'll gratefully receipt every check.
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
