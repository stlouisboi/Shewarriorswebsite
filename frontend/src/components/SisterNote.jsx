import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MailOpen, Loader2 } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const SisterNote = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle");

  const submit = async (e) => {
    e.preventDefault();
    setState("sending");
    try {
      await axios.post(`${API}/sister-note`, { email: email.trim(), name: name.trim() || null });
      setState("done");
    } catch (err) {
      console.error("sister note signup failed", err);
      setState("idle");
    }
  };

  return (
    <div data-testid="sister-note" className="mt-20 w-full rounded-2xl border border-white/10 bg-espresso/60 p-8 sm:p-12">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <p className="eyebrow flex items-center gap-2">
            <MailOpen className="h-4 w-4" aria-hidden="true" />
            The Sister Note
          </p>
          <h3 className="mt-4 font-serif text-2xl font-semibold text-cream sm:text-3xl">
            One gentle letter, <em className="font-garamond font-light text-softgold">every week.</em>
          </h3>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-parchment/75">
            Faith, care, and community updates from the sisterhood — a soft place
            to land in your inbox between gatherings.
          </p>
        </div>
        <AnimatePresence mode="wait">
          {state === "done" ? (
            <motion.p
              key="done"
              data-testid="sister-note-success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-garamond text-2xl font-light italic text-cream"
            >
              You're on the list, sister. Watch for your first note.
            </motion.p>
          ) : (
            <motion.form
              key="form"
              data-testid="sister-note-form"
              exit={{ opacity: 0 }}
              onSubmit={submit}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <input
                data-testid="sister-note-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="First name (optional)"
                maxLength={120}
                className="w-full rounded-lg border border-white/15 bg-ink/60 px-4 py-3 text-sm text-cream placeholder:text-parchment/40 focus:border-softgold/60 focus:outline-none transition-colors duration-300 sm:w-44"
              />
              <input
                data-testid="sister-note-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full flex-1 rounded-lg border border-white/15 bg-ink/60 px-4 py-3 text-sm text-cream placeholder:text-parchment/40 focus:border-softgold/60 focus:outline-none transition-colors duration-300"
              />
              <button
                data-testid="sister-note-submit"
                type="submit"
                disabled={state === "sending"}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gold px-7 py-3 text-xs font-bold uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-softgold disabled:opacity-60"
              >
                {state === "sending" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                Get the Sister Note
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
