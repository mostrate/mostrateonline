import { hero } from "@/lib/config";
import Button from "./Button";
import HeroPreview from "./HeroPreview";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[100svh] pt-16">
      <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-shell px-[clamp(20px,4vw,60px)] py-[clamp(24px,4vw,56px)]">
        <div className="grid flex-1 items-center gap-[clamp(36px,5vw,80px)] lg:grid-cols-[.9fr_1.1fr]">
          <div className="max-w-[630px]">
            <p className="mb-6 flex items-center gap-2 text-[0.68rem] font-bold tracking-[0.16em] text-accent">
              <span className="h-px w-7 bg-accent" />
              {hero.eyebrow}
            </p>
            <h1 className="max-w-[12ch] text-balance font-syne text-[clamp(2.5rem,4.35vw,4.85rem)] font-extrabold leading-[0.96] tracking-[-0.05em]">
              {hero.title.before}
              <span className="text-accent">{hero.title.highlight}</span>
              {hero.title.after}
            </h1>
            <p className="mt-[clamp(20px,2.5vw,30px)] max-w-[500px] text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.7] text-muted">
              {hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href={hero.actions.primary.href} className="max-[400px]:w-full">
                {hero.actions.primary.label}
              </Button>
              <Button href={hero.actions.secondary.href} variant="outline" className="max-[400px]:w-full">
                {hero.actions.secondary.label}
              </Button>
            </div>
            <p className="mt-5 text-[0.82rem] text-muted">{hero.proof}</p>
          </div>

          <HeroPreview />
        </div>
      </div>
    </section>
  );
}
