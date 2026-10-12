import { comoTrabajamos } from "@/lib/config";
import SectionHeader from "./SectionHeader";

export default function ComoTrabajamos() {
  return (
    <section id="como-trabajamos" className="border-t border-line">
      <div className="mx-auto max-w-shell px-[clamp(20px,4vw,60px)] py-[clamp(64px,8vw,112px)]">
        <SectionHeader
          label={comoTrabajamos.label}
          title={comoTrabajamos.title}
          subtitle={comoTrabajamos.subtitle}
        />
        <ol className="mt-[clamp(40px,5vw,64px)] grid border-t border-line md:grid-cols-4">
          {comoTrabajamos.items.map((item, index) => (
            <li
              key={item.number}
              className={`border-b border-line py-7 md:border-b-0 md:px-6 md:py-0 ${index ? "md:border-l" : "md:pl-0"}`}
            >
              <span className="font-syne text-sm font-extrabold tracking-[-0.02em] text-accent">
                {item.number}
              </span>
              <h3 className="mt-5 font-syne text-[clamp(1.25rem,1.8vw,1.7rem)] font-bold leading-tight tracking-[-0.02em]">
                {item.title}
              </h3>
              <p className="mt-3 max-w-[260px] text-[0.95rem] leading-[1.7] text-muted">{item.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
