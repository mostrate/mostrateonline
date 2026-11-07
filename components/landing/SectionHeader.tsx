type Props = {
  label: string;
  /** Título: string simple o array de líneas (en desktop se separan con <br/>) */
  title: string | string[];
  subtitle?: string;
  className?: string;
  as?: "h1" | "h2";
};

export const labelClass =
  "inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-accent";

export const titleClass =
  "text-balance font-syne text-[clamp(2rem,3.6vw,3.6rem)] font-extrabold leading-[1] tracking-[-0.04em]";

/** Rótulo + título grande + bajada. Cada sección decide cómo lo compone. */
export default function SectionHeader({ label, title, subtitle, className = "", as: Heading = "h2" }: Props) {
  const lines = Array.isArray(title) ? title : [title];
  return (
    <div className={className}>
      <span className={`${labelClass} mb-5`}>
        <span className="h-px w-6 bg-accent" />
        {label}
      </span>
      <Heading className={titleClass}>
        {lines.map((line, i) => (
          <span key={i}>
            {line}
            {i < lines.length - 1 && (
              <>
                {" "}
                <br className="max-sm:hidden" />
              </>
            )}
          </span>
        ))}
      </Heading>
      {subtitle && (
        <p className="mt-6 max-w-[440px] text-[clamp(0.95rem,1.2vw,1.05rem)] leading-[1.7] text-muted">
          {subtitle}
        </p>
      )}
    </div>
  );
}
