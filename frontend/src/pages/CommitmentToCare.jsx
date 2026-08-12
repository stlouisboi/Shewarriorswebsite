import { Reveal } from "../components/Reveal";

const SECTIONS = [
  {
    title: "How resources are chosen",
    body: `Every organization on the Care Map is reviewed by a S.H.E. Warriors team member before it appears. We look for a real track record, clear contact pathways, and alignment with the dignity of the women we serve. Each listing shows the month it was last reviewed, and every listing is re-verified on a regular schedule.

If a resource ever fails you, we want to know — email hello@sheworriers.org and we will review it within five business days.`,
  },
  {
    title: "What S.H.E. Warriors is — and is not",
    body: `S.H.E. Warriors provides education, community, and referrals. We are not a crisis service, therapy practice, medical provider, or law firm, and nothing on this site is medical, legal, or professional advice.

Care Map listings are labeled so the difference is always clear: "Clinical care / therapy referral" marks resources that connect you with licensed professionals; "Community support / not clinical care" marks peer, faith, and mentoring offerings. Both are valuable — they are simply different kinds of support.

If you are in immediate danger, call 911. If you are experiencing a mental-health or suicide crisis, call or text 988.`,
  },
  {
    title: "How we protect your privacy",
    body: `Prayer requests left on this site are read only by our trained prayer team and are never published. Care Navigator requests are seen only by the navigator assigned to follow up. We never sell or share your information, and we never collect diagnoses, trauma histories, Social Security numbers, or insurance details through website forms.

For our girls' and teens' programs, a parent or guardian is always involved. We do not collect personal information from minors through this website.`,
  },
  {
    title: "Our promise to keep learning",
    body: `The Care Map is a living thing. Resources change, organizations move, and needs shift — so we re-verify listings on a schedule and welcome corrections from the community. If you know a trusted organization we should review, or spot something out of date, tell us at hello@sheworriers.org.`,
  },
];

export default function CommitmentToCare() {
  return (
    <main data-testid="commitment-page">
      <section className="bg-plum/40">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <Reveal>
            <p className="eyebrow">Our Commitment to Care</p>
            <h1 className="mt-6 max-w-3xl font-serif text-4xl font-semibold uppercase leading-[1.15] tracking-wide text-cream sm:text-5xl lg:text-6xl">
              Trusted, reviewed,{" "}
              <em className="normal-case text-terracotta">never careless.</em>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-parchment/85 md:text-lg">
              Women come to the Care Map in tender moments. This page explains how we
              choose what appears there, how we protect what you share, and exactly
              where our role begins and ends.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="bg-espresso">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:py-28">
          <div className="flex flex-col gap-14">
            {SECTIONS.map((s, i) => (
              <Reveal key={s.title} delay={Math.min(i * 0.05, 0.2)}>
                <h2 className="font-serif text-2xl font-semibold text-cream sm:text-3xl">{s.title}</h2>
                {s.body.split("\n\n").map((p, j) => (
                  <p key={j} className="mt-4 text-sm leading-relaxed text-parchment/75 md:text-base">{p}</p>
                ))}
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
