import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, HeartHandshake } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { to: "/", label: "Home" },
  { to: "/our-why", label: "Our Why" },
  { to: "/care-map", label: "Care Map" },
  { to: "/gatherings", label: "Gatherings" },
  { to: "/stories", label: "Stories" },
  { to: "/get-involved", label: "Get Involved" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navClass = ({ isActive }) =>
    `text-xs font-semibold uppercase tracking-[0.22em] transition-colors duration-300 ${
      isActive ? "text-softgold" : "text-parchment/80 hover:text-cream"
    }`;

  return (
    <nav
      data-testid="main-navigation"
      className="border-b border-white/10 bg-espresso/95 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Logo />
        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={navClass} data-testid={`nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}>
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/give"
            data-testid="nav-give"
            className="flex items-center gap-2 rounded-full bg-gold px-6 py-2.5 text-xs font-bold uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-softgold hover:shadow-[0_0_24px_rgba(212,175,55,0.35)]"
          >
            <HeartHandshake className="h-4 w-4" aria-hidden="true" />
            Give
          </Link>
        </div>
        <button
          data-testid="mobile-menu-toggle"
          onClick={() => setOpen(!open)}
          className="text-cream lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-white/10 bg-espresso px-6 py-6 lg:hidden" data-testid="mobile-menu">
          <div className="flex flex-col gap-5">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={navClass}
                data-testid={`mobile-nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/give"
              onClick={() => setOpen(false)}
              data-testid="mobile-nav-give"
              className="mt-2 flex w-fit items-center gap-2 rounded-full bg-gold px-6 py-2.5 text-xs font-bold uppercase tracking-[0.22em] text-ink"
            >
              <HeartHandshake className="h-4 w-4" aria-hidden="true" />
              Give
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
