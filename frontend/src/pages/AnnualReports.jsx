import { FileText, ArrowDownToLine } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { IMAGES } from "../data/resources";

const HIGHLIGHTS = [
  { value: "1,240", label: "Women welcomed into care circles" },
  { value: "312", label: "Prayer requests prayed over by name" },
  { value: "87", label: "Women connected to housing or shelter help" },
  { value: "64", label: "Trained volunteers and mentors" },
];

const ALLOCATION = [
  { name: "Care circles & gatherings", pct: 42, color: "bg-gold" },
  { name: "Practical provision (housing, career, counseling aid)", pct: 31, color: "bg-terracotta" },
  { name: "Girls & teens mentoring", pct: 17, color: "bg-berry" },
  { name: "Operations & administration", pct: 10, color: "bg-emerald" },
];

export default function AnnualReports() {
  return (
    <main data-testid="annual-reports-page">
      <section className="relative overflow-hidden">
        <img
          src={IMAGES.candles}
          alt=""
          className="texture-image pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/70 to-espresso" />
        <div className="relative mx-auto max-w-7xl px-6 py-28 sm:py-36">
          <Reveal>
            <p className="eyebrow">Transparency</p>
            <h1 className="mt-6 max-w-3xl font-serif text-4xl font-light leading-[1.1] text-cream sm:text-5xl lg:text-6xl">
              Annual Report <em className="text-softgold">2025</em>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-parchment/85 md:text-lg">
              Every dollar given to SheWorriers is a trust. Here is exactly what
              that trust built last year — and where every dollar went.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-espresso">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <Reveal>
            <h2 className="font-serif text-3xl font-light text-cream sm:text-4xl">
              The year in numbers
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {HIGHLIGHTS.map((h, i) => (
              <Reveal key={h.label} delay={i * 0.08}>
                <div data-testid={`report-stat-${i}`} className="flex h-full flex-col bg-espresso p-8">
                  <span className="font-serif text-5xl font-light text-softgold">{h.value}</span>
                  <span className="mt-4 text-sm leading-relaxed text-parchment/70">{h.label}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-24 grid gap-12 lg:grid-cols-2">
            <Reveal>
              <h2 className="font-serif text-3xl font-light text-cream sm:text-4xl">
                Where every dollar went
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-parchment/75 md:text-base">
                Ninety cents of every dollar funds programs directly. Our board
                reviews all spending quarterly, and our books are open to any
                donor who asks.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex flex-col gap-6">
                {ALLOCATION.map((a, i) => (
                  <div key={a.name} data-testid={`report-allocation-${i}`}>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-sm text-parchment/85">{a.name}</span>
                      <span className="font-serif text-xl text-softgold">{a.pct}%</span>
                    </div>
                    <div className="mt-2 h-1.5 w-full bg-white/10">
                      <div className={`h-full ${a.color}`} style={{ width: `${a.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="mt-24">
            <div className="flex flex-wrap items-center justify-between gap-6 border border-white/10 bg-plum/40 p-8 sm:p-10">
              <div className="flex items-start gap-4">
                <FileText className="mt-1 h-7 w-7 shrink-0 text-softgold" aria-hidden="true" />
                <div>
                  <h2 className="font-serif text-2xl font-medium text-cream">Full financial statements</h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-parchment/70">
                    Our complete IRS Form 990 and audited financials are available on
                    request. Email reports@sheworriers.org and we will send them within
                    five business days.
                  </p>
                </div>
              </div>
              <a
                href="mailto:reports@sheworriers.org"
                data-testid="request-report-cta"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-softgold"
              >
                <ArrowDownToLine className="h-4 w-4" aria-hidden="true" />
                Request Full Report
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
