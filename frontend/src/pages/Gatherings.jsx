import { useState } from "react";
import { CalendarDays, MapPin, Clock, Armchair, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Reveal } from "../components/Reveal";
import { IMAGES } from "../data/resources";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const GATHERINGS = [
  {
    name: "Unburden — Weekly Care Circle",
    day: "Tuesdays",
    time: "7:00 PM",
    place: "The Hearth Room, Community Chapel",
    description:
      "A small, candle-lit circle where women share what they are carrying — or simply sit in good company. No pressure to speak. Coffee always on.",
  },
  {
    name: "Mothers & Daughters Brunch",
    day: "First Saturday monthly",
    time: "10:00 AM",
    place: "Rotating host homes",
    description:
      "A long table, warm food, and honest conversation across generations. Girls and teens especially welcome.",
  },
  {
    name: "Quiet Hour — Guided Reflection",
    day: "Thursdays",
    time: "6:30 AM",
    place: "Online & in person",
    description:
      "Thirty unhurried minutes of scripture, silence, and journaling before the day begins. Come as you are — pajamas welcome.",
  },
  {
    name: "Provision Workshop",
    day: "Third Wednesday monthly",
    time: "6:00 PM",
    place: "Foundation Office, Suite 204",
    description:
      "Practical help with resumes, budgeting, benefits enrollment, and navigating local assistance — led by volunteers who know the system.",
  },
];

const RsvpForm = ({ gathering, index }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle"); // idle | sending | done

  const submit = async (e) => {
    e.preventDefault();
    setState("sending");
    try {
      await axios.post(`${API}/rsvps`, { gathering: gathering.name, name: name.trim(), email: email.trim() });
      setState("done");
    } catch (err) {
      console.error("rsvp failed", err);
      setState("idle");
    }
  };

  return (
    <div className="mt-6 border-t border-white/10 pt-5">
      <AnimatePresence mode="wait">
        {state === "done" ? (
          <motion.p
            key="done"
            data-testid={`rsvp-success-${index}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-garamond text-lg italic text-softgold"
          >
            Your seat is saved — we can't wait to welcome you.
          </motion.p>
        ) : !open ? (
          <button
            key="button"
            onClick={() => setOpen(true)}
            data-testid={`rsvp-button-${index}`}
            className="inline-flex items-center gap-2 rounded-full border border-gold/60 px-6 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-gold transition-all duration-300 hover:bg-gold hover:text-ink"
          >
            <Armchair className="h-4 w-4" aria-hidden="true" />
            Reserve a Seat
          </button>
        ) : (
          <motion.form
            key="form"
            data-testid={`rsvp-form-${index}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={submit}
            className="flex flex-col gap-3"
          >
            <input
              data-testid={`rsvp-name-${index}`}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              maxLength={120}
              className="w-full rounded-lg border border-white/15 bg-espresso/60 px-4 py-2.5 text-sm text-cream placeholder:text-parchment/45 focus:border-softgold/60 focus:outline-none transition-colors duration-300"
            />
            <input
              data-testid={`rsvp-email-${index}`}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              className="w-full rounded-lg border border-white/15 bg-espresso/60 px-4 py-2.5 text-sm text-cream placeholder:text-parchment/45 focus:border-softgold/60 focus:outline-none transition-colors duration-300"
            />
            <button
              data-testid={`rsvp-submit-${index}`}
              type="submit"
              disabled={state === "sending"}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-gold px-6 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-softgold disabled:opacity-60"
            >
              {state === "sending" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
              Save My Seat
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Gatherings() {
  return (
    <main data-testid="gatherings-page">
      <section className="relative overflow-hidden">
        <img
          src={IMAGES.gathering}
          alt=""
          className="texture-image pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/70 to-espresso" />
        <div className="relative mx-auto max-w-7xl px-6 py-28 sm:py-36">
          <Reveal>
            <p className="eyebrow">Gatherings</p>
            <h1 className="mt-6 max-w-3xl font-serif text-4xl font-semibold uppercase leading-[1.15] tracking-wide text-cream sm:text-5xl lg:text-6xl">
              Come sit with us.{" "}
              <em className="normal-case text-terracotta">There is a chair with your name on it.</em>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-parchment/85 md:text-lg">
              Our gatherings happen across Winston-Salem and the Piedmont Triad —
              and they are small on purpose. You will never be asked to perform,
              fix yourself, or have it together. Bring your worry; leave a little lighter.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-espresso">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <div className="grid gap-6 md:grid-cols-2">
            {GATHERINGS.map((g, i) => (
              <Reveal key={g.name} delay={i * 0.08}>
                <article
                  data-testid={`gathering-${i}`}
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-ink/50 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-softgold/40 sm:p-10"
                >
                  <h2 className="font-serif text-2xl font-semibold text-cream sm:text-3xl">{g.name}</h2>
                  <div className="mt-5 flex flex-col gap-2 text-sm text-parchment/75">
                    <span className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-softgold" aria-hidden="true" />
                      {g.day}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-softgold" aria-hidden="true" />
                      {g.time}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-softgold" aria-hidden="true" />
                      {g.place}
                    </span>
                  </div>
                  <p className="mt-5 flex-1 text-sm leading-relaxed text-parchment/70">
                    {g.description}
                  </p>
                  <RsvpForm gathering={g} index={i} />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
