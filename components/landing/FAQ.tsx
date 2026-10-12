import { faq } from "@/lib/config";
import SectionHeader from "./SectionHeader";

export default function FAQ() {
  return (
    <section id="faq" className="border-t border-line">
      <div className="mx-auto grid max-w-shell gap-12 px-[clamp(20px,4vw,60px)] py-[clamp(64px,8vw,112px)] lg:grid-cols-[5fr_7fr]">
        <SectionHeader label={faq.label} title={faq.title} subtitle={faq.subtitle} />
        <div className="border-t border-line">
          {faq.items.map((item, index) => (
            <details key={item.question} className="group border-b border-line">
              <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-6 py-4 font-syne text-[clamp(1.1rem,1.7vw,1.5rem)] font-bold tracking-[-0.025em] marker:hidden [&::-webkit-details-marker]:hidden">
                <span><span className="mr-4 font-dmsans text-xs font-medium text-accent">{String(index + 1).padStart(2, "0")}</span>{item.question}</span>
                <span aria-hidden="true" className="text-2xl font-light transition-transform group-open:rotate-45 motion-reduce:transition-none">+</span>
              </summary>
              <p className="max-w-2xl pb-6 pl-9 text-[0.98rem] leading-[1.7] text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
