import { Reveal } from "../components/Reveal";

const SECTIONS = [
  {
    title: "1. About this site",
    body: `This website is operated by SheWorriers Foundation, a registered 501(c)(3) nonprofit organization. By using this site you agree to these terms. If you do not agree, please do not use the site.`,
  },
  {
    title: "2. Not medical, legal, or professional advice",
    body: `The Care Map and all content on this site are provided for general informational purposes only. Nothing here is medical, psychological, legal, or financial advice, and using this site does not create a counselor–client, doctor–patient, or attorney–client relationship.

If you are in immediate danger, call 911. If you are in emotional distress or crisis, call or text 988 (Suicide & Crisis Lifeline) or text HOME to 741741. These services are staffed by professionals; we are not a crisis service.`,
  },
  {
    title: "3. Third-party resources",
    body: `The Care Map links to organizations and services we do not operate. We include them because we believe they are trustworthy, but we cannot guarantee their availability, quality, or policies. Please review each provider's own terms before engaging with them.`,
  },
  {
    title: "4. Prayer and reflection submissions",
    body: `By submitting a prayer request or reflection, you confirm the content is yours to share and you grant us permission to read it and pray over it. You agree not to submit content that is unlawful, abusive, or that includes another person's private information without their consent. We may decline to retain submissions that violate these terms.`,
  },
  {
    title: "5. Donations",
    body: `All gifts are voluntary and tax-deductible to the extent allowed by law. Donations are generally non-refundable; if you believe a gift was made in error, contact hello@sheworriers.org within 30 days and we will work with you in good faith.`,
  },
  {
    title: "6. Intellectual property",
    body: `The SheWorriers name, logo, and the text and design of this site belong to SheWorriers Foundation. You may share links to our pages freely; please do not reproduce our content or branding for commercial purposes without written permission.`,
  },
  {
    title: "7. Limitation of liability",
    body: `This site is provided "as is" without warranties of any kind. To the fullest extent permitted by law, SheWorriers Foundation is not liable for any damages arising from your use of the site or reliance on its content.`,
  },
  {
    title: "8. Changes and contact",
    body: `We may update these terms from time to time; the version posted here is the current one. Questions: legal@sheworriers.org or SheWorriers Foundation, P.O. Box 412.`,
  },
];

export default function Terms() {
  return (
    <main data-testid="terms-page">
      <section className="bg-plum/40">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <Reveal>
            <p className="eyebrow">Legal</p>
            <h1 className="mt-6 max-w-3xl font-serif text-4xl font-light leading-[1.1] text-cream sm:text-5xl lg:text-6xl">
              Terms of Use
            </h1>
            <p className="mt-6 text-sm uppercase tracking-[0.2em] text-parchment/60">
              Effective date: August 1, 2026
            </p>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-parchment/85 md:text-lg">
              The ground rules for using this site — written plainly, because
              trust should not require a law degree.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="bg-espresso">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:py-28">
          <div className="flex flex-col gap-12">
            {SECTIONS.map((s, i) => (
              <Reveal key={s.title} delay={Math.min(i * 0.05, 0.2)}>
                <h2 className="font-serif text-2xl font-medium text-cream sm:text-3xl">{s.title}</h2>
                {s.body.split("\n\n").map((p, j) => (
                  <p key={j} className="mt-4 text-sm leading-relaxed text-parchment/75 md:text-base">
                    {p}
                  </p>
                ))}
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
