import { Reveal } from "../components/Reveal";

const SECTIONS = [
  {
    title: "1. What we collect",
    body: `We collect only what you choose to share with us. When you leave a prayer or reflection in the footer of this site, we store the message you write and, if you provide one, your first name. We do not require an account, an email address, or any identifying information to use this website.

Like most websites, our hosting provider may automatically record standard technical information (such as browser type and pages visited) for security and performance purposes. We do not use this information to identify you.`,
  },
  {
    title: "2. How we use prayer requests",
    body: `Prayer requests and reflections are treated as confidential pastoral care, not data. They are read only by members of our trained prayer team so they can pray over what you have shared by name. We never sell, rent, trade, or publish prayer requests. We will never contact you about a request unless you separately give us a way to reach you and ask us to.

If a request indicates someone may be in immediate danger, we may encourage that person — through the resources on our site — to contact 988 or 911. We are not a crisis service and cannot respond to emergencies; the Immediate Help banner exists for that reason.`,
  },
  {
    title: "3. Donations",
    body: `When our giving portal launches, payment details will be processed by a PCI-compliant payment processor. SHE Warriors Foundation will never see or store your full card number. We will retain only the information needed to issue your tax-deductible receipt (name, email, and gift amount).`,
  },
  {
    title: "4. Cookies and analytics",
    body: `This site does not use advertising cookies or cross-site trackers. If we ever introduce privacy-respecting analytics to understand which pages help people most, we will update this policy before doing so.`,
  },
  {
    title: "5. Data retention and your rights",
    body: `Prayer requests are retained for up to twelve months and then permanently deleted. You may ask us at any time to delete anything you have shared by emailing privacy@sheworriers.org with enough detail for us to locate it. We will honor deletion requests within 30 days.`,
  },
  {
    title: "6. Children",
    body: `This site is intended for adults. Our Girls & Teens resources are directory listings for guardians and teens; we do not knowingly collect personal information from children under 13 through this website.`,
  },
  {
    title: "7. Changes and contact",
    body: `If we change this policy, we will post the updated version here with a new effective date. Questions can be sent to privacy@sheworriers.org or SHE Warriors Foundation, P.O. Box 412.`,
  },
];

export default function Privacy() {
  return (
    <main data-testid="privacy-page">
      <section className="bg-plum/40">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <Reveal>
            <p className="eyebrow">Legal</p>
            <h1 className="mt-6 max-w-3xl font-serif text-4xl font-light leading-[1.1] text-cream sm:text-5xl lg:text-6xl">
              Privacy Policy
            </h1>
            <p className="mt-6 text-sm uppercase tracking-[0.2em] text-parchment/60">
              Effective date: August 1, 2026
            </p>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-parchment/85 md:text-lg">
              You trust us with tender things. This policy explains, in plain
              language, exactly what we collect and how carefully we hold it.
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
