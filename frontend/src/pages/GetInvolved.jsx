import { Users, GraduationCap, HandHeart, Handshake, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";

const WAYS = [
  {
    icon: Users,
    name: "Join the Sisterhood",
    title: "You belong here",
    text: "Come to a circle, a brunch, or a Quiet Hour. No application, no performance — just show up and be known by name.",
    cta: "Find a gathering",
    href: "/gatherings",
    internal: true,
  },
  {
    icon: GraduationCap,
    name: "Become a Mentor",
    title: "Pass your wisdom on",
    text: "Walk with a teen girl or a younger sister through school pressure, career firsts, and faith questions. Training and covering provided.",
    cta: "Start mentoring",
    href: "mailto:hello@sheworriers.org?subject=Mentor%20Interest",
  },
  {
    icon: HandHeart,
    name: "Volunteer",
    title: "Give your presence",
    text: "Host a care circle, staff a provision workshop, or join the prayer team that quietly covers every request left on this site.",
    cta: "Join the team",
    href: "mailto:hello@sheworriers.org?subject=Volunteer%20Interest",
  },
  {
    icon: Handshake,
    name: "Partner With Us",
    title: "Open your doors",
    text: "Churches, counselors, shelters, and businesses — if you serve women in our community, we would love to add your light to the Care Map.",
    cta: "Become a partner",
    href: "mailto:hello@sheworriers.org?subject=Partnership",
  },
];

export default function GetInvolved() {
  return (
    <main data-testid="get-involved-page">
      <section className="bg-plum/40">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <Reveal>
            <p className="eyebrow">Get Involved</p>
            <h1 className="mt-6 max-w-3xl font-serif text-4xl font-semibold uppercase leading-[1.15] tracking-wide text-cream sm:text-5xl lg:text-6xl">
              The table is long.{" "}
              <em className="normal-case text-terracotta">Pull up a chair.</em>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-parchment/85 md:text-lg">
              Everything at SheWorriers runs on ordinary people doing faithful,
              quiet things. Whatever you have — time, prayer, space, skill — it
              has a place here.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-espresso">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <div className="grid gap-6 sm:grid-cols-2">
            {WAYS.map((w, i) => (
              <Reveal key={w.name} delay={i * 0.08}>
                <article
                  data-testid={`involve-${w.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-ink/50 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-softgold/40 sm:p-10"
                >
                  <w.icon className="h-8 w-8 text-gold" aria-hidden="true" />
                  <span className="mt-6 text-xs font-bold uppercase tracking-[0.3em] text-softgold/70">{w.name}</span>
                  <h2 className="mt-2 font-serif text-2xl font-semibold text-cream sm:text-3xl">{w.title}</h2>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-parchment/70">{w.text}</p>
                  {w.internal ? (
                    <Link
                      to={w.href}
                      data-testid={`involve-cta-${i}`}
                      className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-gold/60 px-7 py-3 text-xs font-bold uppercase tracking-[0.22em] text-gold transition-all duration-300 hover:bg-gold hover:text-ink"
                    >
                      {w.cta}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  ) : (
                    <a
                      href={w.href}
                      data-testid={`involve-cta-${i}`}
                      className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-gold/60 px-7 py-3 text-xs font-bold uppercase tracking-[0.22em] text-gold transition-all duration-300 hover:bg-gold hover:text-ink"
                    >
                      {w.cta}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1} className="mt-16 text-center">
            <p className="font-garamond text-2xl font-light italic text-parchment/80 sm:text-3xl">
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
