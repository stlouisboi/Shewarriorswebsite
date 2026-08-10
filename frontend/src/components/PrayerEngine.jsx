import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Flame } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const PrayerEngine = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState("idle"); // idle | dissolving | done
  const reduce = useReducedMotion();

  const submit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setState("dissolving");
    try {
      await axios.post(`${API}/prayers`, {
        message: message.trim(),
        first_name: name.trim() || null,
      });
    } catch (err) {
      console.error("prayer submission failed", err);
    }
    setTimeout(() => setState("done"), reduce ? 100 : 2200);
  };

  const reset = () => {
    setName("");
    setMessage("");
    setState("idle");
  };

  return (
    <div data-testid="prayer-engine" className="relative min-h-[260px]">
      <AnimatePresence mode="wait">
        {state !== "done" ? (
          <motion.form
            key="form"
            data-testid="prayer-form"
            onSubmit={submit}
            initial={false}
            animate={
              state === "dissolving" && !reduce
                ? { opacity: 0, filter: "blur(12px)", y: -14 }
                : { opacity: 1, filter: "blur(0px)", y: 0 }
            }
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="flex flex-col gap-4"
          >
            <input
              data-testid="prayer-name-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="First name (optional)"
              maxLength={80}
              disabled={state === "dissolving"}
              className="w-full rounded-xl border border-white/15 bg-espresso/60 px-5 py-3.5 text-sm text-cream placeholder:text-parchment/45 focus:border-softgold/60 focus:outline-none transition-colors duration-300"
            />
            <textarea
              data-testid="prayer-message-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can we pray for you?"
              required
              maxLength={2000}
              rows={4}
              disabled={state === "dissolving"}
              className="w-full resize-none rounded-xl border border-white/15 bg-espresso/60 px-5 py-3.5 text-sm text-cream placeholder:text-parchment/45 focus:border-softgold/60 focus:outline-none transition-colors duration-300"
            />
            <button
              data-testid="prayer-submit-button"
              type="submit"
              disabled={state === "dissolving"}
              className="mt-1 w-fit rounded-full bg-gold px-9 py-3.5 text-xs font-bold uppercase tracking-[0.25em] text-ink transition-all duration-300 hover:bg-softgold hover:shadow-[0_0_28px_rgba(212,175,55,0.35)] disabled:opacity-50"
            >
              Send Confidentially
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="confirmation"
            data-testid="prayer-confirmation"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex min-h-[260px] flex-col items-start justify-center gap-4"
          >
            <Flame className="h-8 w-8 text-gold" aria-hidden="true" />
            <p className="font-garamond text-3xl font-light italic text-cream sm:text-4xl">
              It is set down now.
            </p>
            <p className="max-w-md text-sm leading-relaxed text-parchment/75">
              Your words have been received and our sisterhood will quietly cover
              you in prayer this week. You do not have to carry this alone anymore.
            </p>
            <button
              data-testid="prayer-reset-button"
              onClick={reset}
              className="mt-2 text-xs font-semibold uppercase tracking-[0.25em] text-softgold underline-offset-4 hover:underline"
            >
              Leave another
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
