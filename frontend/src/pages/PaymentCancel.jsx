import { Link } from "react-router-dom";

export default function PaymentCancel() {
  return (
    <main data-testid="payment-cancel-page" className="flex min-h-[70vh] items-center bg-espresso">
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="font-serif text-4xl font-semibold text-cream sm:text-5xl">
          No charge <em className="text-softgold">was made.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-parchment/80">
          You stepped away before completing your gift — that's okay. The door
          stays open whenever you're ready.
        </p>
        <Link
          to="/give"
          data-testid="payment-cancel-back"
          className="mt-10 inline-block rounded-full bg-gold px-8 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-softgold"
        >
          Back to Giving
        </Link>
      </div>
    </main>
  );
}
