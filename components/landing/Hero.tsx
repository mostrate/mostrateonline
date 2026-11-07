import { hero } from "@/lib/config";
import Button from "./Button";
import HeroPreview from "./HeroPreview";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[100svh] pt-16">
      <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-shell px-[clamp(20px,4vw,60px)] py-[clamp(24px,4vw,56px)]">
        <div className="grid flex-1 items-center gap-[clamp(28px,3vw,48px)] lg:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)]">
          <div className="max-w-[520px] lg:self-start">
            <p className="mb-6 flex items-center gap-2 text-[0.68rem] font-bold tracking-[0.16em] text-accent">
              <span className="h-px w-7 bg-accent" />
              {hero.eyebrow}
            </p>
            <h1 className="max-w-[11ch] text-balance font-syne text-[clamp(2.5rem,3.8vw,4.4rem)] font-extrabold leading-[0.98] tracking-[-0.055em]">
              {hero.title.before}
              <span className="text-accent">{hero.title.highlight}</span>
              {hero.title.after}
            </h1>
            <p className="mt-[clamp(20px,2.5vw,30px)] max-w-[470px] text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.7] text-muted">
              {hero.subtitle}
            </p>
            <div className="mt-8 grid max-w-[390px] grid-cols-1 gap-3 min-[480px]:grid-cols-2">
              <Button href={hero.actions.primary.href} target="_blank" size="sm" className="w-full">
                {hero.actions.primary.label}
              </Button>
              <Button href={hero.actions.secondary.href} variant="outline" size="sm" className="w-full">
                {hero.actions.secondary.label}
              </Button>
            </div>
          </div>

          <HeroPreview />
        </div>
      </div>
    </section>
  );
}
