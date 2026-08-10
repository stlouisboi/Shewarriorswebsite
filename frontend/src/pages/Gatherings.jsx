import { CalendarDays, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";
import { IMAGES } from "../data/resources";

const GATHERINGS = [
  {
    name: "Unburden — Weekly Care Circle",
    day: "Tuesdays",
    time: "7:00 PM",
    place: "The Hearth Room, Community Chapel",
    description:
      "A small, candle-lit circle where women share what they are carrying — or simply sit in good company. No pressure to speak. Coffee always on.",
  },
  {
    name: "Mothers & Daughters Brunch",
    day: "First Saturday monthly",
    time: "10:00 AM",
    place: "Rotating host homes",
    description:
      "A long table, warm food, and honest conversation across generations. Girls and teens especially welcome.",
  },
  {
    name: "Quiet Hour — Guided Reflection",
    day: "Thursdays",
    time: "6:30 AM",
    place: "Online & in person",
    description:
      "Thirty unhurried minutes of scripture, silence, and journaling before the day begins. Come as you are — pajamas welcome.",
  },
  {
    name: "Provision Workshop",
    day: "Third Wednesday monthly",
    time: "6:00 PM",
    place: "Foundation Office, Suite 204",
    description:
      "Practical help with resumes, budgeting, benefits enrollment, and navigating local assistance — led by volunteers who know the system.",
  },
];

export default function Gatherings() {
  return (
    <main data-testid="gatherings-page">
      <section className="relative overflow-hidden">
        <img
          src={IMAGES.gathering}
          alt=""
          className="texture-image pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/70 to-espresso" />
        <div className="relative mx-auto max-w-7xl px-6 py-28 sm:py-36">
          <Reveal>
            <p className="eyebrow">Gatherings</p>
            <h1 className="mt-6 max-w-3xl font-serif text-4xl font-light leading-[1.1] text-cream sm:text-5xl lg:text-6xl">
              Come sit with us. <em className="text-softgold">There is a chair with your name on it.</em>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-parchment/85 md:text-lg">
              Our gatherings are small on purpose. You will never be asked to perform,
              fix yourself, or have it together. Bring your worry; leave a little lighter.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-espresso">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <div className="grid gap-6 md:grid-cols-2">
            {GATHERINGS.map((g, i) => (
              <Reveal key={g.name} delay={i * 0.08}>
                <article
                  data-testid={`gathering-${i}`}
                  className="group flex h-full flex-col border border-white/10 bg-ink/50 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-softgold/40 sm:p-10"
                >
                  <h2 className="font-serif text-2xl font-medium text-cream sm:text-3xl">{g.name}</h2>
                  <div className="mt-5 flex flex-col gap-2 text-sm text-parchment/75">
                    <span className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-softgold" aria-hidden="true" />
                      {g.day}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-softgold" aria-hidden="true" />
                      {g.time}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-softgold" aria-hidden="true" />
                      {g.place}
                    </span>
                  </div>
                  <p className="mt-5 flex-1 text-sm leading-relaxed text-parchment/70">
                    {g.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1} className="mt-16">
            <div className="flex flex-wrap items-center justify-between gap-6 border border-white/10 bg-plum/40 p-8 sm:p-10">
              <p className="max-w-xl font-serif text-xl font-light italic text-cream sm:text-2xl">
                New here? Just show up. Someone will save you a seat and pour you a cup.
              </p>
              <Link
                to="/get-involved"
                data-testid="gatherings-involved-cta"
                className="rounded-full border border-cream/30 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:border-softgold hover:text-softgold"
              >
                Get Involved
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
