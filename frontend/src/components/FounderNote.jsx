import { Reveal } from "./Reveal";

export const FounderNote = ({ compact = false }) => (
  <section data-testid="founder-note" className="bg-plum/40">
    <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 sm:py-32 lg:grid-cols-2">
      <Reveal>
        <span aria-hidden="true" className="block h-px w-10 bg-gold/70" />
        <p className="eyebrow mt-8">Behind the Vision</p>
        <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.1] text-cream sm:text-5xl">
          A note from
          <br />
          <em className="text-terracotta">the founder</em>
        </h2>
        <p className="mt-8 font-garamond text-2xl font-light italic leading-snug text-cream sm:text-3xl">
          "SheWorriers began with a simple belief: women were never meant to
          carry their worries alone."
        </p>
        {!compact && (
          <div className="mt-8 max-w-lg space-y-5 text-sm leading-loose text-parchment/80 md:text-base">
            <p>
              We all experience seasons of anxiety, feeling overwhelmed by the
              weight of the world, our families, and our own expectations. I
              realized that while many of us were struggling, few of us were
              talking about it in a space that felt truly safe.
            </p>
            <p>
              I wanted to create a sanctuary — a place where you don't have to
              have it all together. A place where we can bring our real fears,
              share our real stories, and gently guide each other back to faith.
              This is an open invitation to lay down what you're carrying.
            </p>
          </div>
        )}
        <p className="mt-10 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.3em] text-parchment/60">
          <span aria-hidden="true" className="h-px w-10 bg-parchment/40" />
          Stephanie Lawrence · Founder, SheWorriers
        </p>
      </Reveal>
      <Reveal delay={0.15} className="flex justify-center lg:justify-end">
        <div className="relative">
          <div aria-hidden="true" className="absolute -inset-4 rounded-full border border-gold/25" />
          <div aria-hidden="true" className="absolute -inset-10 rounded-full border border-gold/10" />
          <img
            src="/assets/founder.jpg"
            alt="Stephanie Lawrence, founder of SheWorriers Foundation"
            className="h-72 w-72 rounded-full border-2 border-gold/50 object-cover object-top shadow-[0_0_80px_rgba(212,175,55,0.15)] sm:h-96 sm:w-96"
          />
        </div>
      </Reveal>
    </div>
  </section>
);
