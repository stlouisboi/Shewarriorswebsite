import { Link } from "react-router-dom";

export const LogoMark = ({ className = "h-10 w-10" }) => (
  <img
    src="/assets/logo-emblem.png"
    alt=""
    aria-hidden="true"
    className={`${className} object-contain`}
  />
);

export const Logo = ({ compact = false }) => (
  <Link to="/" data-testid="logo-link" className="flex items-center gap-3 group">
    <LogoMark className={compact ? "h-11 w-11" : "h-14 w-14"} />
    <span className="font-serif text-2xl sm:text-3xl font-semibold text-cream tracking-wide group-hover:text-softgold transition-colors duration-300">
      SheWorriers
    </span>
  </Link>
);
