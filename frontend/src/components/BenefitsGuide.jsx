import { ArrowUpRight, ClipboardCheck, PhoneCall, Check } from "lucide-react";
import { Reveal } from "../components/Reveal";

const Btn = ({ href, children, id, gold = false }) => (
  <a
    href={href}
    data-testid={id}
    target={href.startsWith("http") ? "_blank" : undefined}
    rel="noreferrer"
    className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-300 ${
      gold
        ? "bg-gold text-ink hover:bg-softgold"
        : "border border-cream/30 text-cream hover:border-softgold hover:text-softgold"
    }`}
  >
    {children}
    {href.startsWith("tel:") ? <PhoneCall className="h-3.5 w-3.5" aria-hidden="true" /> : <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />}
  </a>
);

const Checklist = ({ items, id }) => (
  <ul data-testid={id} className="mt-5 grid gap-2.5 sm:grid-cols-2">
    {items.map((c) => (
      <li key={c} className="flex items-start gap-2.5 text-sm text-parchment/80">
        <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
        {c}
      </li>
    ))}
  </ul>
);

const GuideStep = ({ num, title, children }) => (
  <div className="border-t border-white/10 pt-6">
    <p className="flex items-baseline gap-3">
      <span className="font-garamond text-2xl italic text-softgold">{num}</span>
      <span className="font-serif text-xl font-semibold text-cream">{title}</span>
    </p>
    <div className="mt-3 text-sm leading-relaxed text-parchment/75">{children}</div>
  </div>
);

export const BenefitsGuide = () => (
  <div data-testid="benefits-guide" className="mt-14 space-y-14">
    <Reveal>
      <div className="rounded-2xl border border-gold/40 bg-plum/50 p-8 text-center sm:p-12">
        <ClipboardCheck className="mx-auto h-8 w-8 text-gold" aria-hidden="true" />
        <h3 className="mt-5 font-serif text-2xl font-semibold uppercase tracking-wide text-cream sm:text-3xl">
          Not sure what you qualify for?
        </h3>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-parchment/80 md:text-base">
          Start with a Benefits Check. Answer a few questions to see which government
          programs may fit your household and current situation.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Btn href="https://epass.nc.gov" id="benefits-epass" gold>Explore NC Benefits</Btn>
          <Btn href="https://www.usa.gov/benefit-finder" id="benefits-finder">Use the U.S. Benefit Finder</Btn>
          <Btn href="tel:211" id="benefits-211">Talk to NC 211</Btn>
        </div>
      </div>
    </Reveal>

    <Reveal>
      <div className="rounded-2xl border border-white/10 bg-ink/50 p-8 sm:p-10">
        <h3 className="font-serif text-2xl font-semibold text-cream sm:text-3xl">How to Apply for NC Medicaid</h3>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          <GuideStep num="01" title="Start an application">
            Apply online through <strong className="text-cream">ePASS</strong>, at your local Department of
            Social Services, by paper application to your county DSS, or through HealthCare.gov
            in applicable situations.
            <div className="mt-4"><Btn href="https://epass.nc.gov" id="medicaid-apply" gold>Start an NC Medicaid Application</Btn></div>
          </GuideStep>
          <GuideStep num="02" title="Gather what you have">
            You don't need every document perfect before beginning — but gather what you can:
            <Checklist id="medicaid-checklist" items={[
              "Photo identification",
              "Proof of NC address (utility bill, lease, mortgage statement, or vehicle registration)",
              "Proof of income (pay stubs, employer verification, tax return, or business records)",
              "Date-of-birth documentation",
              "Social Security information, when applicable",
              "Citizenship or qualified-immigration documents, if applicable",
            ]} />
          </GuideStep>
          <GuideStep num="03" title="Watch for notices & respond">
            Check ePASS, your mail, email, and voicemail. Respond to any DSS request for
            documents, and ask for free language or communication accommodations if needed.
            The NC Medicaid Contact Center can help you find local DSS support at{" "}
            <a href="tel:18882450179" className="text-softgold underline-offset-2 hover:underline">1-888-245-0179</a> (TTY: 711).
          </GuideStep>
        </div>
      </div>
    </Reveal>

    <Reveal>
      <div className="rounded-2xl border border-white/10 bg-ink/50 p-8 sm:p-10">
        <h3 className="font-serif text-2xl font-semibold text-cream sm:text-3xl">
          Food & Nutrition Services <span className="font-garamond font-light italic text-softgold">(FNS / SNAP / "Food Stamps")</span>
        </h3>
        <div className="mt-6 rounded-xl border border-gold/30 bg-gold/10 p-5">
          <p className="text-sm leading-relaxed text-cream">
            <strong>Good to know:</strong> You can submit an application even if you do not have
            every document yet. In North Carolina, benefits may begin from the date the
            application is submitted — you can provide additional details afterward.
          </p>
        </div>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <GuideStep num="01" title="Choose how to apply">
            Apply online through <strong className="text-cream">ePASS</strong>, in person at your county
            DSS office, or by mailing a paper application. After applying, a caseworker will
            contact you for an eligibility interview by phone, video, or in person.
            Interpreter and communication assistance:{" "}
            <a href="tel:18667190141" className="text-softgold underline-offset-2 hover:underline">866-719-0141</a> or Relay 711.
          </GuideStep>
          <GuideStep num="02" title="Your application checklist">
            <Checklist id="fns-checklist" items={[
              "ID for the head of household",
              "Social Security number, birthdate, and citizenship status information",
              "Current cash, bank-account, investment, and retirement-account information",
              "Income information",
              "Monthly expenses, including child care and child support",
              "Medical expenses for household members 60+ or disabled",
              "Other benefits already received (Medicaid, SSI, Work First)",
            ]} />
          </GuideStep>
        </div>
        <div className="mt-8 flex flex-wrap gap-4 border-t border-white/10 pt-6">
          <Btn href="https://epass.nc.gov" id="fns-apply" gold>Apply for Food Assistance</Btn>
          <Btn href="https://www.ncdhhs.gov/divisions/child-and-family-well-being/food-and-nutrition-services-food-stamps/apply-food-and-nutrition-services-food-stamps" id="fns-checklist-btn">Get the Full Checklist</Btn>
          <Btn href="https://www.secondharvestnwnc.org" id="fns-food-near-me">Find Food Near Me</Btn>
        </div>
      </div>
    </Reveal>

    <Reveal>
      <div className="rounded-2xl border border-white/10 bg-plum/40 p-8 sm:p-10">
        <p className="eyebrow">Your local office</p>
        <h3 className="mt-3 font-serif text-2xl font-semibold text-cream sm:text-3xl">Forsyth County Department of Social Services</h3>
        <p className="mt-4 text-sm leading-relaxed text-parchment/80">
          741 North Highland Ave., Winston-Salem, NC 27101
          <br />
          <a href="tel:13367033800" className="text-softgold underline-offset-2 hover:underline">336-703-3800</a>
        </p>
        <div className="mt-6">
          <Btn href="https://www.ncdhhs.gov/divisions/social-services/forsyth-county-department-social-services" id="forsyth-dss" gold>Contact Forsyth DSS</Btn>
        </div>
      </div>
    </Reveal>

    <Reveal>
      <div className="rounded-2xl border border-white/10 bg-ink/50 p-8 sm:p-10">
        <p className="eyebrow">A SHE Warriors service</p>
        <h3 className="mt-3 font-serif text-2xl font-semibold text-cream sm:text-3xl">The Next Step Desk</h3>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-parchment/80 md:text-base">
          Our volunteers make government assistance feel less confusing — at gatherings,
          Benefits & Brunch events, and Resource Navigation Nights with trained partners.
        </p>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald">We can</p>
            <Checklist id="desk-can" items={[
              "Help you find the official program page to use",
              "Explain the difference between Medicaid, FNS/SNAP, WIC, Work First, and utility assistance",
              "Help you make a document checklist",
              "Help you create an ePASS account on your own device",
              "Help you locate the correct DSS office",
              "Refer you to NC 211, a food pantry, legal aid, or a local navigator",
            ]} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-terracotta">We cannot</p>
            <Checklist id="desk-cannot" items={[
              "Submit applications in your name or on your behalf",
              "Store Social Security numbers, immigration documents, medical files, or login credentials",
              "Tell you whether you qualify, or promise approval or a benefit amount",
              "Give legal, immigration, medical, or financial advice",
              "Act as a DSS caseworker or therapist",
            ]} />
          </div>
        </div>
      </div>
    </Reveal>

    <Reveal>
      <p className="text-center font-garamond text-3xl font-light italic leading-snug text-cream sm:text-4xl">
        "Asking for help is not a setback.
        <br />
        It is a strategy for moving your family forward."
      </p>
    </Reveal>
  </div>
);
