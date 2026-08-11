import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PrayerEngine } from "./PrayerEngine";

const navCol1 = [
  { to: "/our-why", label: "Our Why" },
  { to: "/care-map", label: "Care Map" },
  { to: "/stories", label: "Stories" },
];

const navCol2 = [
  { to: "/gatherings", label: "Gatherings" },
  { to: "/get-involved", label: "Get Involved" },
  { to: "/give", label: "Give" },
];

const legal = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms & Conditions", to: "/terms" },
  { label: "Annual Reports", to: "/annual-reports" },
  { label: "Commitment to Care", to: "/commitment-to-care" },
  { label: "Contact", href: "mailto:hello@sheworriers.org" },
];

const NavColumn = ({ items, prefix }) => (
  <ul className="flex flex-col gap-4">
    {items.map((l) => (
      <li key={l.to}>
        <Link
          to={l.to}
          data-testid={`${prefix}-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
          className="text-xs font-bold uppercase tracking-[0.25em] text-parchment/75 transition-colors duration-300 hover:text-cream"
        >
          {l.label}
        </Link>
      </li>
    ))}
  </ul>
);

export const Footer = () => (
  <footer data-testid="site-footer" className="border-t border-white/10 bg-ink">
    <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
      <div className="grid items-center gap-12 rounded-[2rem] border border-white/10 bg-plum/50 p-8 sm:p-14 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Leave it at the altar</p>
          <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight text-cream sm:text-4xl">
            A safe place for{" "}
            <em className="font-garamond font-light">your heavy things.</em>
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-parchment/75 md:text-base">
            You don't have to carry it alone. Share what's on your heart, and
            our sisterhood will quietly cover you in prayer this week.
          </p>
        </div>
        <PrayerEngine />
      </div>

      <div className="mt-20 grid gap-14 lg:grid-cols-2">
        <div>
          <span aria-hidden="true" className="block h-px w-10 bg-gold/70" />
          <h2 className="mt-8 font-garamond text-4xl font-light italic text-cream sm:text-5xl">
            Your seat is waiting.
          </h2>
          <div className="mt-9 flex max-w-sm flex-col gap-4">
            <Link
              to="/get-involved"
              data-testid="footer-join-sisterhood"
              className="flex items-center justify-between rounded-full bg-terracotta px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:bg-[#d47a62] hover:shadow-[0_0_24px_rgba(200,106,83,0.35)]"
            >
              Join the Sisterhood
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/gatherings"
              data-testid="footer-rsvp"
              className="flex items-center justify-between rounded-full border border-cream/30 px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:border-softgold hover:text-softgold"
            >
              RSVP for Next Gathering
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/gatherings"
              data-testid="footer-first-crown"
              className="flex items-center justify-between rounded-full border border-cream/30 px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:border-softgold hover:text-softgold"
            >
              The First Crown
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div>
          <p className="eyebrow">Anchor Verse</p>
          <blockquote className="mt-5 max-w-md font-garamond text-2xl font-light italic leading-snug text-cream">
            "Those who look to Him are radiant; their faces are never covered with shame."
          </blockquote>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-parchment/60">Psalm 34:5</p>
          <div className="mt-12 grid grid-cols-2 gap-10">
            <NavColumn items={navCol1} prefix="footer-link" />
            <NavColumn items={navCol2} prefix="footer-link" />
          </div>
        </div>
      </div>

      <div className="mt-20 flex flex-col items-center border-t border-white/10 pt-14">
        <Link to="/" data-testid="footer-logo-link">
          <img
            src="/assets/logo-full.png"
            alt="SheWorriers — From Worry to Worship"
            className="h-48 w-auto sm:h-56"
          />
        </Link>
        <div aria-hidden="true" className="mt-8 flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-gold" />
          <span className="h-2 w-2 rounded-full bg-emerald" />
          <span className="h-2 w-2 rounded-full bg-terracotta" />
        </div>
        <nav aria-label="Legal" className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {legal.map((l) =>
            l.to ? (
              <Link
                key={l.label}
                to={l.to}
                data-testid={`footer-legal-${l.label.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}`}
                className="text-xs font-semibold uppercase tracking-[0.25em] text-parchment/60 transition-colors duration-300 hover:text-cream"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.label}
                href={l.href}
                data-testid="footer-legal-contact"
                className="text-xs font-semibold uppercase tracking-[0.25em] text-parchment/60 transition-colors duration-300 hover:text-cream"
              >
                {l.label}
              </a>
            )
          )}
        </nav>
        <p data-testid="footer-nonprofit-status" className="mt-10 max-w-xl text-center text-xs leading-relaxed text-parchment/45">
          SheWorriers Foundation is a faith-centered nonprofit based in Winston-Salem, North Carolina,
          serving women and girls across the Piedmont Triad (501(c)(3) status pending approval). EIN and
          determination letter will be published here once approved.
        </p>
        <p className="mt-3 text-xs text-parchment/40">
          © {new Date().getFullYear()} SheWorriers Foundation. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);
