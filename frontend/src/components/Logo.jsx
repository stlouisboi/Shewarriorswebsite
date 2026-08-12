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
    <span className="flex flex-col leading-none">
      <span className="font-serif text-2xl sm:text-3xl font-semibold text-cream tracking-wide group-hover:text-softgold transition-colors duration-300">
        S.H.E. Warriors
      </span>
      <span className="mt-1 whitespace-nowrap font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-softgold sm:text-xs">
        Sisterhood · Healing · Empowerment
      </span>
    </span>
  </Link>
);
