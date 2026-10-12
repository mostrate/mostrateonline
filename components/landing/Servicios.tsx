import { servicios } from "@/lib/config";
import SectionHeader from "./SectionHeader";
import { serviceIcons } from "./Icons";

export default function Servicios() {
  return (
    <section id="servicios">
      <div className="mx-auto grid max-w-shell gap-[clamp(36px,5vw,72px)] px-[clamp(20px,4vw,60px)] py-[clamp(64px,8vw,112px)] lg:grid-cols-[5fr_7fr]">
        {/* Encabezado fijo mientras se recorre la lista */}
        <SectionHeader
          label={servicios.label}
          title={servicios.title}
          subtitle={servicios.subtitle}
          className="lg:sticky lg:top-32 lg:self-start"
        />

        <ol className="list-none border-t border-line">
          {servicios.items.map((item, i) => {
            const Icon = serviceIcons[item.icon];
            return (
              <li
                key={item.title}
                className="group relative grid grid-cols-[auto_1fr] gap-x-[clamp(20px,3vw,40px)] border-b border-line py-[clamp(28px,3.5vw,44px)]"
              >
                {/* Barrido de acento al pasar el mouse */}
                <span className="pointer-events-none absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-accent transition-transform duration-500 group-hover:scale-y-100" />
                <span className="font-syne text-[clamp(3rem,6vw,5.5rem)] font-extrabold leading-[0.8] tracking-[-0.05em] text-transparent transition-colors duration-500 [-webkit-text-stroke:1px_rgba(240,238,233,0.3)] group-hover:text-accent group-hover:[-webkit-text-stroke:1px_transparent]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-syne text-[clamp(1.35rem,2.2vw,2rem)] font-bold leading-tight tracking-[-0.02em] transition-transform duration-500 group-hover:translate-x-1">
                      {item.title}
                    </h3>
                    <Icon className="mt-1 h-6 w-6 flex-shrink-0 text-muted transition-colors group-hover:text-accent" />
                  </div>
                  <p className="mt-3 max-w-[480px] text-[0.98rem] leading-[1.7] text-muted">
                    {item.desc}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
