import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { PrayerEngine } from "./PrayerEngine";

const explore = [
  { to: "/our-why", label: "Our Why" },
  { to: "/care-map", label: "Care Map" },
  { to: "/gatherings", label: "Gatherings" },
  { to: "/stories", label: "Stories" },
  { to: "/get-involved", label: "Get Involved" },
  { to: "/give", label: "Give" },
];

const legal = [
  { label: "Privacy Policy", id: "footer-privacy" },
  { label: "Terms of Use", id: "footer-terms" },
  { label: "Annual Reports", id: "footer-annual-reports" },
];

export const Footer = () => (
  <footer data-testid="site-footer" className="border-t border-white/10 bg-ink">
    <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <Logo />
          <p className="mt-6 max-w-md font-serif text-xl font-light italic leading-relaxed text-parchment/85">
            "Cast all your anxiety on Him, because He cares for you." — 1 Peter 5:7
          </p>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-parchment/65">
            SheWorriers Foundation walks with women who worry — connecting them to
            community, practical care, and the steady hope of faith.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-10">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-softgold">Explore</h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                {explore.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      data-testid={`footer-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-sm text-parchment/75 transition-colors duration-300 hover:text-cream"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-softgold">Legal</h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                {legal.map((l) => (
                  <li key={l.label}>
                    <span data-testid={l.id} className="text-sm text-parchment/50">
                      {l.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <PrayerEngine />
      </div>
      <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-parchment/50 sm:flex-row sm:items-center sm:justify-between">
        <p data-testid="footer-nonprofit-status">
          SheWorriers Foundation is a registered 501(c)(3) nonprofit organization. All gifts are tax-deductible.
        </p>
        <p>© {new Date().getFullYear()} SheWorriers Foundation. All rights reserved.</p>
      </div>
    </div>
  </footer>
);
