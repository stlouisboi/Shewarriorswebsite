import { ArrowUpRight, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";
import { CARE_CATEGORIES } from "../data/resources";

const ResourceAction = ({ action, id }) => {
  const cls =
    "inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-softgold underline-offset-4 transition-colors duration-300 hover:underline";
  const icon = action.href.startsWith("tel:") || action.href.startsWith("sms:") ? (
    <PhoneCall className="h-3.5 w-3.5" aria-hidden="true" />
  ) : (
    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
  );
  if (action.internal) {
    return (
      <Link to={action.href} data-testid={`resource-action-${id}`} className={cls}>
        {action.label}
        {icon}
      </Link>
    );
  }
  if (action.anchor) {
    return (
      <a
        href={action.href}
        data-testid={`resource-action-${id}`}
        className={cls}
        onClick={(e) => {
          e.preventDefault();
          document.querySelector('[data-testid="prayer-engine"]')?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        {action.label}
        {icon}
      </a>
    );
  }
  return (
    <a href={action.href} data-testid={`resource-action-${id}`} target={action.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={cls}>
      {action.label}
      {icon}
    </a>
  );
};

export default function CareMap() {
  return (
    <main data-testid="care-map-page">
      <section className="bg-plum/40">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <Reveal>
            <p className="eyebrow">The Care Map</p>
            <h1 className="mt-6 max-w-3xl font-serif text-4xl font-light leading-[1.1] text-cream sm:text-5xl lg:text-6xl">
              Wherever you are standing, <em className="text-softgold">there is a next step.</em>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-parchment/85 md:text-lg">
              This is not a cold directory. It is a hand-drawn map from women who have
              walked these roads — every entry chosen because it leads somewhere warm.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-espresso">
        <div className="mx-auto max-w-7xl space-y-24 px-6 py-24 sm:py-32">
          {CARE_CATEGORIES.map((cat, ci) => (
            <Reveal key={cat.id}>
              <div id={cat.id} data-testid={`care-category-${cat.id}`} className="scroll-mt-40">
                <div className="grid gap-10 lg:grid-cols-5">
                  <div className={`lg:col-span-2 ${ci % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="relative h-64 overflow-hidden border border-white/10 bg-ink lg:h-full lg:min-h-[320px]">
                      <img
                        src={cat.image}
                        alt=""
                        className="texture-image h-full w-full object-cover opacity-70"
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-3">
                    <span className={`text-xs font-bold uppercase tracking-[0.3em] ${cat.accent === "text-emerald" ? "text-emerald" : cat.accent}`}>
                      {String(ci + 1).padStart(2, "0")} — {cat.tagline}
                    </span>
                    <h2 className="mt-3 font-serif text-3xl font-medium text-cream sm:text-4xl">
                      {cat.name}
                    </h2>
                    <div className="mt-8 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-1">
                      {cat.resources.map((r, ri) => (
                        <div
                          key={r.name}
                          data-testid={`resource-${cat.id}-${ri}`}
                          className="group bg-espresso p-6 transition-colors duration-500 hover:bg-plum/60 sm:p-7"
                        >
                          <div className="flex flex-wrap items-baseline justify-between gap-3">
                            <h3 className="font-serif text-xl font-medium text-cream">{r.name}</h3>
                            <ResourceAction action={r.action} id={`${cat.id}-${ri}`} />
                          </div>
                          <p className="mt-2 max-w-xl text-sm leading-relaxed text-parchment/70">
                            {r.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal>
            <p className="border-t border-white/10 pt-8 text-xs leading-relaxed text-parchment/50">
              Listings are provided for informational purposes and do not constitute medical,
              legal, or professional advice. If you are in immediate danger, please call 911.
              If you are in emotional crisis, call or text 988.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
