import { Quote } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { IMAGES } from "../data/resources";

const STORIES = [
  {
    name: "Marisol",
    title: "From eviction notice to keys of her own",
    text: "I came to a Tuesday circle with an eviction notice folded in my purse. I didn't say a word that first night — I just cried. By spring, the women around that table had helped me find rental assistance, a new job lead, and a church family. I have my own keys now. I still come on Tuesdays.",
  },
  {
    name: "Dana",
    title: "Learning to sleep again",
    text: "After my husband passed, worry ran my nights. The Quiet Hour gave me somewhere to put it. Six months of Thursday mornings — scripture, silence, women who didn't flinch at my grief — and I can finally sleep.",
  },
  {
    name: "Amara, 16",
    title: "A mentor in my corner",
    text: "My mentor from the foundation's teen circle helped me apply to college when nobody in my family had been. She sat with me through every form. I got in. First in my family.",
  },
  {
    name: "Ruth",
    title: "Leaving safely, landing softly",
    text: "The night I left, a volunteer met me with a bag of essentials and a list of safe houses. She didn't rush me. She just stayed. That steadiness is why I'm standing today.",
  },
];

export default function Stories() {
  return (
    <main data-testid="stories-page">
      <section className="relative overflow-hidden">
        <img
          src={IMAGES.heroTexture}
          alt=""
          className="texture-image pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/70 to-espresso" />
        <div className="relative mx-auto max-w-7xl px-6 py-28 sm:py-36">
          <Reveal>
            <p className="eyebrow">Stories</p>
            <h1 className="mt-6 max-w-3xl font-serif text-4xl font-light leading-[1.1] text-cream sm:text-5xl lg:text-6xl">
              Worry, set down. <em className="text-softgold">In their own words.</em>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-parchment/85 md:text-lg">
              Names and details are shared with permission and care. Every story here
              began with a woman who thought she had to carry it alone.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-espresso">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <div className="grid gap-6 md:grid-cols-2">
            {STORIES.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.08}>
                <figure
                  data-testid={`story-${i}`}
                  className={`flex h-full flex-col border border-white/10 p-8 transition-colors duration-500 hover:border-softgold/40 sm:p-10 ${
                    i % 3 === 0 ? "bg-plum/50" : "bg-ink/50"
                  }`}
                >
                  <Quote className="h-7 w-7 text-softgold/60" aria-hidden="true" />
                  <blockquote className="mt-5 flex-1 font-serif text-xl font-light italic leading-relaxed text-cream/95 sm:text-2xl">
                    "{s.text}"
                  </blockquote>
                  <figcaption className="mt-8 border-t border-white/10 pt-5">
                    <span className="text-sm font-bold uppercase tracking-[0.2em] text-softgold">{s.name}</span>
                    <span className="mt-1 block text-xs text-parchment/60">{s.title}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
