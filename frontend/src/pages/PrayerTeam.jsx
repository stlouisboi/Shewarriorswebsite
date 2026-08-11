import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Flame, LockKeyhole, LogOut, Loader2 } from "lucide-react";
import axios from "axios";
import { Reveal } from "../components/Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const TOKEN_KEY = "sw_prayer_team_token";

export default function PrayerTeam() {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || "");
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState(null);

  const load = useCallback(async (t) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/prayer-team/requests`, {
        headers: { Authorization: `Bearer ${t}` },
      });
      setRequests(data.requests);
    } catch (e) {
      if (e.response?.status === 401) {
        sessionStorage.removeItem(TOKEN_KEY);
        setToken("");
        setRequests(null);
        setError("Session expired — please sign in again.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) load(token);
  }, [token, load]);

  const login = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/prayer-team/login`, { passcode });
      sessionStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
    } catch (err) {
      const detail = err.response?.data?.detail;
      setError(typeof detail === "string" ? detail : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken("");
    setRequests(null);
    setPasscode("");
  };

  return (
    <main data-testid="prayer-team-page" className="min-h-[80vh] bg-espresso">
      <div className="mx-auto max-w-4xl px-6 py-24 sm:py-32">
        {!token ? (
          <Reveal className="mx-auto max-w-md text-center">
            <LockKeyhole className="mx-auto h-8 w-8 text-softgold" aria-hidden="true" />
            <p className="eyebrow mt-6">Prayer Team Only</p>
            <h1 className="mt-4 font-serif text-3xl font-semibold text-cream sm:text-4xl">
              Altar Call Inbox
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-parchment/75">
              Every request here was left in confidence. Read gently, pray faithfully,
              and hold each name with care.
            </p>
            <form data-testid="prayer-team-login-form" onSubmit={login} className="mt-8">
              <input
                data-testid="prayer-team-passcode"
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Team passcode"
                required
                className="w-full rounded-lg border border-white/15 bg-ink/60 px-4 py-3 text-center text-sm text-cream placeholder:text-parchment/40 focus:border-softgold/60 focus:outline-none transition-colors duration-300"
              />
              {error && (
                <p data-testid="prayer-team-error" className="mt-3 text-xs font-semibold text-terracotta">{error}</p>
              )}
              <button
                data-testid="prayer-team-login-button"
                type="submit"
                disabled={loading}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-8 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-softgold disabled:opacity-60"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                Enter the Inbox
              </button>
            </form>
          </Reveal>
        ) : (
          <>
            <Reveal className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow flex items-center gap-2">
                  <Flame className="h-4 w-4" aria-hidden="true" />
                  Altar Call Inbox
                </p>
                <h1 className="mt-3 font-serif text-3xl font-semibold text-cream sm:text-4xl">
                  Requests to pray over
                </h1>
                <p data-testid="prayer-team-count" className="mt-2 text-sm text-parchment/70">
                  {requests ? `${requests.length} request${requests.length === 1 ? "" : "s"} — newest first` : "Loading…"}
                </p>
              </div>
              <button
                data-testid="prayer-team-logout"
                onClick={logout}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-parchment/70 transition-colors duration-300 hover:border-softgold hover:text-softgold"
              >
                <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
                Sign Out
              </button>
            </Reveal>
            <div className="mt-10 space-y-5">
              {requests && requests.length === 0 && (
                <p data-testid="prayer-team-empty" className="font-garamond text-2xl italic text-parchment/70">
                  The altar is clear right now. Check back soon.
                </p>
              )}
              {requests?.map((r, i) => (
                <motion.article
                  key={r.id}
                  data-testid={`prayer-request-${i}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.3) }}
                  className="rounded-xl border border-white/10 bg-ink/50 p-6"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-softgold">
                      {r.first_name || "A sister"}
                    </span>
                    <span className="text-xs text-parchment/50">
                      {new Date(r.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                  <p className="mt-3 font-garamond text-xl font-light italic leading-relaxed text-cream/95">
                    "{r.message}"
                  </p>
                </motion.article>
              ))}
            </div>
            <p className="mt-12 border-t border-white/10 pt-6 text-center font-garamond text-xl italic text-parchment/60">
              "Cast all your anxiety on Him, because He cares for you." — 1 Peter 5:7
            </p>
          </>
        )}
      </div>
    </main>
  );
}
