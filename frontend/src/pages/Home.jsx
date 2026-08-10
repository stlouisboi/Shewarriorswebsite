import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { IMAGES, PILLARS, CARE_CATEGORIES } from "../data/resources";

const Hero = () => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "22%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-18%"]);
  const blockY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-40%"]);

  return (
    <section ref={ref} data-testid="hero-section" className="relative flex min-h-[92vh] items-center overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        <img
          src={IMAGES.heroTexture}
          alt=""
          className="texture-image h-[120%] w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/70 via-espresso/40 to-espresso" />
      </motion.div>

      <motion.div
        style={{ y: blockY }}
        aria-hidden="true"
        className="absolute right-[8%] top-[12%] -z-0 hidden h-64 w-48 border border-gold/25 lg:block"
      />
      <motion.div
        style={{ y: blockY }}
        aria-hidden="true"
        className="absolute bottom-[18%] left-[4%] hidden h-40 w-40 bg-plum/60 lg:block"
      />

      <motion.div style={{ y: textY }} className="mx-auto w-full max-w-7xl px-6 py-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="eyebrow"
        >
          A foundation for women who worry
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-3xl font-serif text-4xl font-light leading-[1.08] text-cream sm:text-5xl lg:text-6xl"
        >
          Set down what you were never meant to{" "}
          <em className="text-softgold">carry alone.</em>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 max-w-xl text-base leading-relaxed text-parchment/85 md:text-lg"
        >
          SheWorriers Foundation surrounds women with community, practical care,
          and the quiet confidence of faith — from crisis to calling.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-10 flex flex-wrap items-center gap-5"
        >
          <Link
            to="/care-map"
            data-testid="hero-care-map-cta"
            className="flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-softgold hover:shadow-[0_0_28px_rgba(212,175,55,0.35)]"
          >
            Find Care Now
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            to="/our-why"
            data-testid="hero-our-why-cta"
            className="rounded-full border border-cream/30 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:border-softgold hover:text-softgold"
          >
            Our Why
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

const PillarsPreview = () => (
  <section data-testid="pillars-preview" className="relative bg-espresso">
    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <Reveal>
        <p className="eyebrow">What we do</p>
        <h2 className="mt-5 max-w-2xl font-serif text-4xl font-light leading-tight text-cream sm:text-5xl">
          Four movements, one promise:{" "}
          <em className="text-softgold">you are not alone.</em>
        </h2>
      </Reveal>
      <div className="mt-16 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
        {PILLARS.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.1}>
            <Link
              to="/our-why"
              data-testid={`pillar-${p.name.toLowerCase()}`}
              className="group flex h-full flex-col bg-espresso p-8 transition-colors duration-500 hover:bg-plum"
            >
              <span className="font-serif text-5xl font-light text-softgold/50 transition-colors duration-500 group-hover:text-softgold">
                {p.number}
              </span>
              <h3 className="mt-6 font-serif text-2xl font-medium text-cream">{p.name}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-parchment/70">{p.text}</p>
              <ArrowUpRight className="mt-6 h-5 w-5 text-softgold/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-softgold" aria-hidden="true" />
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const CareMapPreview = () => (
  <section data-testid="care-map-preview" className="relative overflow-hidden bg-plum">
    <img
      src={IMAGES.rockTexture}
      alt=""
      className="texture-image pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
    />
    <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">The Care Map</p>
          <h2 className="mt-5 max-w-xl font-serif text-4xl font-light leading-tight text-cream sm:text-5xl">
            Every road to help, <em className="text-softgold">gently marked.</em>
          </h2>
        </div>
        <Link
          to="/care-map"
          data-testid="care-map-preview-cta"
          className="flex items-center gap-2 rounded-full border border-cream/30 px-7 py-3 text-xs font-bold uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:border-softgold hover:text-softgold"
        >
          Open the Care Map
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </Reveal>
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CARE_CATEGORIES.slice(0, 3).map((c, i) => (
          <Reveal key={c.id} delay={i * 0.12}>
            <Link
              to={`/care-map#${c.id}`}
              data-testid={`care-preview-${c.id}`}
              className="group relative block overflow-hidden border border-white/10"
            >
              <div className="relative h-56 overflow-hidden bg-ink">
                <img
                  src={c.image}
                  alt=""
                  className="texture-image h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="bg-ink/80 p-7">
                <h3 className={`font-serif text-2xl font-medium ${c.accent === "text-emerald" ? "text-cream" : c.accent}`}>
                  {c.name}
                </h3>
                <p className="mt-2 text-sm text-parchment/70">{c.tagline}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const GiveBand = () => (
  <section data-testid="give-band" className="relative overflow-hidden bg-espresso">
    <img
      src={IMAGES.candles}
      alt=""
      className="texture-image pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-espresso via-espresso/80 to-transparent" />
    <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <Reveal className="max-w-2xl">
        <p className="eyebrow">Give</p>
        <h2 className="mt-5 font-serif text-4xl font-light leading-tight text-cream sm:text-5xl">
          Your generosity becomes <em className="text-softgold">someone's steady ground.</em>
        </h2>
        <p className="mt-6 text-base leading-relaxed text-parchment/80 md:text-lg">
          Every gift funds care circles, practical resources, and safe spaces for
          women and girls carrying more than they should.
        </p>
        <Link
          to="/give"
          data-testid="give-band-cta"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-softgold hover:shadow-[0_0_28px_rgba(212,175,55,0.35)]"
        >
          Give Today
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </Reveal>
    </div>
  </section>
);

export default function Home() {
  return (
    <main>
      <Hero />
      <PillarsPreview />
      <CareMapPreview />
      <GiveBand />
    </main>
  );
}
