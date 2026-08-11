import { Link } from "react-router-dom";

export const LogoMark = ({ className = "h-14 w-14" }) => (
  <span className="relative flex items-center justify-center">
    <span aria-hidden="true" className="absolute inset-0 rounded-full bg-gold/10 blur-md" />
    <img
      src="/assets/logo-emblem.png"
      alt=""
      aria-hidden="true"
      className={`${className} relative object-contain drop-shadow-[0_0_10px_rgba(212,175,55,0.45)]`}
    />
  </span>
);

export const Logo = ({ compact = false }) => (
  <Link to="/" data-testid="logo-link" className="flex items-center gap-3 group">
    <LogoMark className={compact ? "h-12 w-12" : "h-16 w-16"} />
    <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-wide group-hover:text-softgold transition-colors duration-300">
      <span className="text-softgold">SHE</span> <span className="text-cream">Warriors</span>
    </span>
  </Link>
);
