import { Phone, MessageSquareHeart, Siren } from "lucide-react";

export const ImmediateHelp = () => (
  <div
    data-testid="immediate-help-banner"
    className="bg-emerald text-cream"
    role="region"
    aria-label="Immediate help"
  >
    <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-1 px-6 py-2.5 text-xs sm:text-sm">
      <span className="flex items-center gap-2 font-semibold uppercase tracking-[0.2em]">
        <Siren className="h-4 w-4" aria-hidden="true" />
        Immediate Help
      </span>
      <span className="text-cream/90">
        In crisis? You are not alone.
      </span>
      <span className="flex flex-wrap items-center gap-x-6 gap-y-1">
        <a
          data-testid="help-call-988"
          href="tel:988"
          className="flex items-center gap-1.5 font-semibold underline-offset-4 hover:underline"
        >
          <Phone className="h-3.5 w-3.5" aria-hidden="true" />
          Call or Text 988
        </a>
        <a
          data-testid="help-text-line"
          href="sms:741741"
          className="flex items-center gap-1.5 font-semibold underline-offset-4 hover:underline"
        >
          <MessageSquareHeart className="h-3.5 w-3.5" aria-hidden="true" />
          Text HOME to 741741
        </a>
        <a
          data-testid="help-call-911"
          href="tel:911"
          className="flex items-center gap-1.5 font-semibold underline-offset-4 hover:underline"
        >
          <Siren className="h-3.5 w-3.5" aria-hidden="true" />
          Emergency: 911
        </a>
      </span>
    </div>
  </div>
);
