import { precios } from "@/lib/config";
import SectionHeader from "./SectionHeader";
import { CheckIcon } from "./Icons";
import Button from "./Button";

/** Sello circular girado con texto en órbita (badge del plan destacado). */
function Stamp({ text }: { text: string }) {
  const orbit = `${text} · ${text} · `.toUpperCase();
  return (
    <svg
      viewBox="0 0 100 100"
      className="absolute -right-5 -top-9 h-[88px] w-[88px] rotate-[14deg] text-accent motion-safe:animate-[spin_24s_linear_infinite]"
      role="img"
      aria-label={text}
    >
      <defs>
        <path id="stamp-orbit" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
      </defs>
      <circle cx="50" cy="50" r="48" className="fill-bg" stroke="currentColor" strokeWidth="1" />
      <text fontSize="9.6" fontWeight="700" fill="currentColor" className="font-dmsans">
        <textPath href="#stamp-orbit" textLength="226" lengthAdjust="spacing">
          {orbit}
        </textPath>
      </text>
      <path d="M50 36 L53.5 46.5 L64 50 L53.5 53.5 L50 64 L46.5 53.5 L36 50 L46.5 46.5 Z" fill="currentColor" />
    </svg>
  );
}

export default function Precios() {
  return (
    <section id="precios" className="border-t border-line">
      <div className="mx-auto grid max-w-shell gap-[clamp(40px,5vw,72px)] px-[clamp(20px,4vw,60px)] py-[clamp(64px,8vw,112px)] lg:grid-cols-[4fr_8fr]">
        <div className="lg:self-start">
          <SectionHeader label={precios.label} title={precios.title} subtitle={precios.subtitle} />
          <p className="mt-8 text-[0.95rem] text-muted">
            {precios.note.question}{" "}
            <a
              href={precios.note.link.href}
              className="text-content underline decoration-accent decoration-1 underline-offset-4 transition-colors hover:text-accent"
            >
              {precios.note.link.label}
            </a>
          </p>
        </div>

        <div className="grid items-stretch gap-[clamp(20px,2.5vw,32px)] pt-6 md:grid-cols-2">
          {precios.plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-lg p-[clamp(28px,3vw,44px)] ${
                plan.featured
                  ? "border border-accent bg-accent/[0.06]"
                  : "border border-line bg-surface/50"
              }`}
            >
              {plan.featured && plan.badge && <Stamp text={plan.badge} />}

              <h3 className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-muted">
                {plan.name}
              </h3>
              <div className="mt-4 font-syne text-[clamp(1.6rem,2.2vw,2.2rem)] font-extrabold leading-none tracking-[-0.04em]">
                {plan.price}
              </div>
              <div className="mt-3 text-[0.85rem] text-muted">{plan.period}</div>

              <ul className="my-8 flex flex-1 list-none flex-col gap-3.5 border-t border-line pt-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-[0.95rem] leading-snug">
                    <CheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                href={plan.cta.href}
                variant={plan.cta.style === "solid" ? "primary" : "outline"}
                full
              >
                {plan.cta.label}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
