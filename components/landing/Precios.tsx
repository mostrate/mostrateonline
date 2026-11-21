import { precios } from "@/lib/config";
import SectionHeader from "./SectionHeader";
import { CheckIcon } from "./Icons";

export default function Precios() {
  return (
    <section id="precios" className="border-t border-line">
      <div className="mx-auto max-w-shell px-[clamp(20px,4vw,60px)] pt-[clamp(64px,8vw,112px)] pb-[clamp(28px,3.5vw,44px)]">
        <SectionHeader label={precios.label} title={precios.title} subtitle={precios.subtitle} />

        <div className="mt-[clamp(36px,5vw,64px)] grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {precios.plans.map((plan) => (
            <article key={plan.name} className="flex min-w-0 flex-col rounded-lg border border-line bg-surface/50 p-[clamp(22px,2vw,32px)] transition-[transform,border-color,box-shadow] duration-300 hover:border-accent/60 hover:shadow-[0_18px_42px_-24px_rgba(79,127,255,0.5)] motion-safe:hover:-translate-y-1 motion-reduce:transition-none">
              <h3 className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-muted">
                {plan.name}
              </h3>
              <div className="mt-4 font-syne text-[clamp(1.35rem,1.6vw,1.8rem)] font-extrabold leading-tight tracking-[-0.04em]">
                {plan.price}
              </div>

              <ul className="mt-8 flex list-none flex-col gap-3.5 border-t border-line pt-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-[0.95rem] leading-snug">
                    <CheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                    {feature}
                  </li>
                ))}
              </ul>

            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
