import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { IMAGES, PILLARS } from "../data/resources";

const FounderNote = () => (
  <section data-testid="founder-note" className="bg-plum/40">
    <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 sm:py-32 lg:grid-cols-2">
      <Reveal>
        <span aria-hidden="true" className="block h-px w-10 bg-gold/70" />
        <p className="eyebrow mt-8">Behind the Vision</p>
        <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.1] text-cream sm:text-5xl">
          A note from
          <br />
          <em className="text-terracotta">the founder</em>
        </h2>
        <p className="mt-8 font-garamond text-2xl font-light italic leading-snug text-cream sm:text-3xl">
          "SheWorriers began with a simple belief: women were never meant to
          carry their worries alone."
        </p>
        <div className="mt-8 max-w-lg space-y-5 text-sm leading-loose text-parchment/80 md:text-base">
          <p>
            We all experience seasons of anxiety, feeling overwhelmed by the
            weight of the world, our families, and our own expectations. I
            realized that while many of us were struggling, few of us were
            talking about it in a space that felt truly safe.
          </p>
          <p>
            I wanted to create a sanctuary — a place where you don't have to
            have it all together. A place where we can bring our real fears,
            share our real stories, and gently guide each other back to faith.
            This is an open invitation to lay down what you're carrying.
          </p>
        </div>
        <p className="mt-10 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.3em] text-parchment/60">
          <span aria-hidden="true" className="h-px w-10 bg-parchment/40" />
          Stephanie Lawrence · Founder, SheWorriers
        </p>
      </Reveal>
      <Reveal delay={0.15} className="flex justify-center lg:justify-end">
        <div className="relative">
          <div aria-hidden="true" className="absolute -inset-4 rounded-full border border-gold/25" />
          <div aria-hidden="true" className="absolute -inset-10 rounded-full border border-gold/10" />
          <img
            src="/assets/founder.jpg"
            alt="Stephanie Lawrence, founder of SheWorriers Foundation"
            className="h-72 w-72 rounded-full border-2 border-gold/50 object-cover object-top shadow-[0_0_80px_rgba(212,175,55,0.15)] sm:h-96 sm:w-96"
          />
        </div>
      </Reveal>
    </div>
  </section>
);

export default function OurWhy() {
  return (
    <main data-testid="our-why-page">
      <section className="relative overflow-hidden">
        <img
          src={IMAGES.candles}
          alt=""
          className="texture-image pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/60 to-espresso" />
        <div className="relative mx-auto max-w-7xl px-6 py-28 sm:py-36">
          <Reveal>
            <p className="eyebrow">Our Why</p>
            <h1 className="mt-6 max-w-3xl font-serif text-4xl font-semibold uppercase leading-[1.15] tracking-wide text-cream sm:text-5xl lg:text-6xl">
              Worry is heavy.{" "}
              <em className="normal-case text-terracotta">It was never meant to be carried alone.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-14 max-w-3xl rounded-2xl border border-white/10 bg-ink/50 p-8 sm:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-softgold">What We're Building</p>
              <p className="mt-4 text-base leading-relaxed text-parchment/85 md:text-lg">
                SheWorriers Foundation is a faith-centered nonprofit created with
                Black women at its heart, rooted in Winston-Salem and serving the
                Piedmont Triad. We connect women and girls to spiritual
                community, mental-wellness support, career-building opportunities,
                and intergenerational mentorship — because no sister should have
                to carry life alone.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-espresso">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <Reveal>
            <p className="eyebrow">Four impact pillars</p>
            <h2 className="mt-5 max-w-2xl font-serif text-4xl font-semibold leading-tight text-cream sm:text-5xl">
              How hope takes shape here
            </h2>
          </Reveal>
          <div className="mt-20 grid gap-x-12 gap-y-16 md:grid-cols-2">
            {PILLARS.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08} className="relative border-t border-white/10 pt-8">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-10 right-0 select-none font-serif text-[9rem] font-light leading-none text-white/[0.04]"
                >
                  {p.number}
                </span>
                <span className="font-garamond text-lg italic text-softgold">{p.number}</span>
                <h3 className="mt-2 font-serif text-3xl font-semibold text-cream sm:text-4xl">{p.name}</h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-parchment/75 md:text-base">{p.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1} className="mt-20">
            <Link
              to="/care-map"
              data-testid="our-why-care-map-cta"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-softgold"
            >
              Explore the Care Map
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <FounderNote />
    </main>
  );
}
