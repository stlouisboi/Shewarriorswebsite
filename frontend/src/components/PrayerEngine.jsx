import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Flame, LockKeyhole } from "lucide-react";
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
    <div
      data-testid="prayer-engine"
      className="relative overflow-hidden rounded-sm border border-white/10 bg-ink/70 p-8 sm:p-10"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold/10 blur-3xl" aria-hidden="true" />
      <div className="flex items-center gap-3">
        <Flame className="h-5 w-5 text-softgold" aria-hidden="true" />
        <h3 className="font-serif text-2xl font-medium text-cream sm:text-3xl">
          Leave it here tonight
        </h3>
      </div>
      <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-parchment/75">
        <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-softgold/70" aria-hidden="true" />
        A private, daily reflection. Whatever you are carrying — a worry, a hope, a name —
        set it down here. It is held in confidence and prayed over by our team.
      </p>

      <div className="relative mt-8 min-h-[220px]">
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
                className="w-full border border-white/10 bg-espresso/60 px-4 py-3 text-sm text-cream placeholder:text-parchment/40 focus:border-softgold/60 focus:outline-none transition-colors duration-300"
              />
              <textarea
                data-testid="prayer-message-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What are you carrying today?"
                required
                maxLength={2000}
                rows={4}
                disabled={state === "dissolving"}
                className="w-full resize-none border border-white/10 bg-espresso/60 px-4 py-3 text-sm text-cream placeholder:text-parchment/40 focus:border-softgold/60 focus:outline-none transition-colors duration-300"
              />
              <button
                data-testid="prayer-submit-button"
                type="submit"
                disabled={state === "dissolving"}
                className="mt-1 w-fit rounded-full border border-gold/60 px-8 py-3 text-xs font-bold uppercase tracking-[0.25em] text-gold transition-all duration-300 hover:bg-gold hover:text-ink disabled:opacity-50"
              >
                Release it
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="confirmation"
              data-testid="prayer-confirmation"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="flex min-h-[220px] flex-col items-start justify-center gap-4"
            >
              <Flame className="h-8 w-8 text-gold" aria-hidden="true" />
              <p className="font-serif text-2xl font-light italic leading-snug text-cream sm:text-3xl">
                It is set down now.
              </p>
              <p className="max-w-md text-sm leading-relaxed text-parchment/75">
                Your words have been received and will be prayed over this week.
                You do not have to carry this alone anymore.
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
    </div>
  );
};
