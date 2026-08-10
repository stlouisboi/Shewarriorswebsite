import { Users, Flame, HandHeart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";

const WAYS = [
  {
    icon: Users,
    name: "Volunteer",
    title: "Give your presence",
    text: "Host a care circle, mentor a teen, staff a provision workshop, or simply be the woman who shows up every Tuesday. Training and covering provided.",
    cta: "Join the team",
  },
  {
    icon: Flame,
    name: "Prayer Team",
    title: "Carry others in prayer",
    text: "Each week our prayer team receives the confidential requests left on this site and prays over every single one by name. This is quiet, sacred work.",
    cta: "Pray with us",
  },
  {
    icon: HandHeart,
    name: "Partner",
    title: "Open your doors",
    text: "Churches, counselors, shelters, and businesses — if you serve women in our community, we would love to add your light to the Care Map.",
    cta: "Become a partner",
  },
];

export default function GetInvolved() {
  return (
    <main data-testid="get-involved-page">
      <section className="bg-plum/40">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <Reveal>
            <p className="eyebrow">Get Involved</p>
            <h1 className="mt-6 max-w-3xl font-serif text-4xl font-light leading-[1.1] text-cream sm:text-5xl lg:text-6xl">
              The table is long. <em className="text-softgold">Pull up a chair.</em>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-parchment/85 md:text-lg">
              Everything at SheWorriers runs on ordinary people doing faithful, quiet
              things. Whatever you have — time, prayer, space, skill — it has a place here.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-espresso">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <div className="grid gap-6 lg:grid-cols-3">
            {WAYS.map((w, i) => (
              <Reveal key={w.name} delay={i * 0.1}>
                <article
                  data-testid={`involve-${w.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group flex h-full flex-col border border-white/10 bg-ink/50 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-softgold/40 sm:p-10"
                >
                  <w.icon className="h-8 w-8 text-softgold" aria-hidden="true" />
                  <span className="mt-6 text-xs font-bold uppercase tracking-[0.3em] text-softgold/70">{w.name}</span>
                  <h2 className="mt-2 font-serif text-2xl font-medium text-cream sm:text-3xl">{w.title}</h2>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-parchment/70">{w.text}</p>
                  <a
                    href="mailto:hello@sheworriers.org"
                    data-testid={`involve-cta-${w.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-gold/60 px-7 py-3 text-xs font-bold uppercase tracking-[0.22em] text-gold transition-all duration-300 hover:bg-gold hover:text-ink"
                  >
                    {w.cta}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1} className="mt-16 text-center">
            <p className="font-serif text-xl font-light italic text-parchment/80 sm:text-2xl">
              Prefer to give financially instead?{" "}
              <Link to="/give" data-testid="involved-give-link" className="text-softgold underline-offset-4 hover:underline">
                Every gift matters.
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
