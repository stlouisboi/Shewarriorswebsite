import { Phone, MessageSquareHeart, Siren } from "lucide-react";

export const ImmediateHelp = () => (
  <div
    data-testid="immediate-help-banner"
    className="bg-emerald text-cream"
    role="region"
    aria-label="Immediate help"
  >
    <div className="mx-auto flex max-w-7xl items-center justify-center gap-x-4 px-3 py-2.5 text-[11px] sm:gap-x-8 sm:px-6 sm:text-sm">
      <span className="hidden items-center gap-2 font-semibold uppercase tracking-[0.2em] sm:flex">
        <Siren className="h-4 w-4" aria-hidden="true" />
        Immediate Help
      </span>
      <span className="hidden text-cream/90 lg:inline">
        In crisis? You are not alone.
      </span>
      <span className="flex flex-nowrap items-center gap-x-4 sm:gap-x-6">
        <a
          data-testid="help-call-988"
          href="tel:988"
          className="flex items-center gap-1.5 whitespace-nowrap font-semibold underline-offset-4 hover:underline"
        >
          <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          Call or Text 988
        </a>
        <a
          data-testid="help-text-line"
          href="sms:741741"
          className="flex items-center gap-1.5 whitespace-nowrap font-semibold underline-offset-4 hover:underline"
        >
          <MessageSquareHeart className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          Text HOME to 741741
        </a>
        <a
          data-testid="help-call-911"
          href="tel:911"
          className="flex items-center gap-1.5 whitespace-nowrap font-semibold underline-offset-4 hover:underline"
        >
          <Siren className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          Emergency: 911
        </a>
      </span>
    </div>
  </div>
);
