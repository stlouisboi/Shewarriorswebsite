import { Link } from "react-router-dom";

export const LogoMark = ({ className = "h-10 w-10" }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
    <circle cx="24" cy="24" r="22" stroke="#C5A059" strokeWidth="1.5" />
    <path
      d="M24 10c-4 5-8 8-8 13a8 8 0 0 0 16 0c0-2-1-4-2.5-5.5C28 19 26 15 24 10z"
      fill="#C5A059"
    />
    <path
      d="M24 26c-1.5 1.8-3 3-3 5a3 3 0 0 0 6 0c0-.8-.4-1.5-1-2.1-.5-.6-1.2-1.7-2-2.9z"
      fill="#2C1E16"
    />
  </svg>
);

export const Logo = ({ compact = false }) => (
  <Link to="/" data-testid="logo-link" className="flex items-center gap-3 group">
    <LogoMark className={compact ? "h-8 w-8" : "h-10 w-10"} />
    <span className="flex flex-col leading-none">
      <span className="font-serif text-xl sm:text-2xl font-medium text-cream tracking-wide group-hover:text-softgold transition-colors duration-300">
        SheWorriers
      </span>
      <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-parchment/70">
        Foundation
      </span>
    </span>
  </Link>
);
