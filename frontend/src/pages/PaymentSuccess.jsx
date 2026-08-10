import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Flame, Loader2 } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    if (!sessionId) {
      setStatus("unknown");
      return;
    }
    let attempts = 0;
    const poll = async () => {
      try {
        const { data } = await axios.get(`${API}/payments/status/${sessionId}`);
        if (data.payment_status === "paid") {
          setStatus("paid");
          return;
        }
      } catch (e) {
        console.error(e);
      }
      attempts += 1;
      if (attempts < 10) setTimeout(poll, 2000);
      else setStatus("pending");
    };
    poll();
  }, [sessionId]);

  return (
    <main data-testid="payment-success-page" className="flex min-h-[70vh] items-center bg-espresso">
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        {status === "checking" ? (
          <div className="flex flex-col items-center gap-5">
            <Loader2 className="h-8 w-8 animate-spin text-gold" aria-hidden="true" />
            <p className="text-sm uppercase tracking-[0.25em] text-parchment/70">Confirming your gift…</p>
          </div>
        ) : (
          <>
            <Flame className="mx-auto h-10 w-10 text-gold" aria-hidden="true" />
            <h1 className="mt-8 font-serif text-4xl font-semibold text-cream sm:text-5xl">
              {status === "paid" ? (
                <>Your gift was <em className="text-softgold">received.</em></>
              ) : (
                <>Your gift is <em className="text-softgold">on its way.</em></>
              )}
            </h1>
            <p data-testid="payment-success-message" className="mx-auto mt-6 max-w-md text-base leading-relaxed text-parchment/80">
              {status === "paid"
                ? "Thank you, sister. Your generosity just became someone's steady ground — a care circle, a welcome bag, a mentor's hour."
                : "We are still confirming your payment. If you completed checkout, your gift will be receipted shortly."}
            </p>
            <Link
              to="/"
              data-testid="payment-success-home"
              className="mt-10 inline-block rounded-full border border-gold/60 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-gold transition-all duration-300 hover:bg-gold hover:text-ink"
            >
              Return Home
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
