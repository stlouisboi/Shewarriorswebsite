import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { IMAGES, PILLARS } from "../data/resources";

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
            <h1 className="mt-6 max-w-3xl font-serif text-4xl font-light leading-[1.1] text-cream sm:text-5xl lg:text-6xl">
              Worry is heavy. <em className="text-softgold">It was never meant to be carried alone.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-12 grid gap-10 lg:grid-cols-2">
              <p className="text-base leading-relaxed text-parchment/85 md:text-lg">
                SheWorriers Foundation began with a simple observation: the women holding
                everything together — mothers, daughters, caregivers, leaders — are often
                the ones with nowhere to set their own burdens down. We exist to be that
                place. Not a program to complete, but a community to belong to.
              </p>
              <p className="text-base leading-relaxed text-parchment/85 md:text-lg">
                We believe worry loosens its grip when three things meet: honest
                connection, practical help, and a hope deeper than circumstance.
                Everything we build — every gathering, every resource on our Care Map,
                every prayer whispered over a stranger's name — flows from that belief.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-espresso">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <Reveal>
            <p className="eyebrow">Four impact pillars</p>
            <h2 className="mt-5 max-w-2xl font-serif text-4xl font-light leading-tight text-cream sm:text-5xl">
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
                <span className="font-serif text-lg italic text-softgold">{p.number}</span>
                <h3 className="mt-2 font-serif text-3xl font-medium text-cream sm:text-4xl">{p.name}</h3>
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
              See the Care in Action
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
