import Link from "next/link";
import TemplateShell from "./TemplateShell";

/**
 * Placeholder reutilizable para los templates de clientes que todavía no
 * están desarrollados. Cuando se construya cada template real, esta página
 * se reemplaza por el diseño definitivo del rubro.
 */
type Props = {
  name: string;
  tag: string;
  desc: string;
  accent: string;
};

export default function PlaceholderTemplate({ name, tag, desc, accent }: Props) {
  return (
    <TemplateShell accent={accent}>
      <main className="mx-auto flex min-h-screen max-w-shell flex-col items-center justify-center px-6 py-24 text-center">
        <span
          className="mb-6 inline-block rounded-full px-3.5 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.08em]"
          style={{ backgroundColor: `${accent}22`, color: accent }}
        >
          {tag}
        </span>

        <h1 className="mb-4 font-syne text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.1] tracking-[-0.03em]">
          Template{" "}
          <span style={{ color: accent }}>{name}</span>
        </h1>

        <p className="mb-2 max-w-[480px] text-[clamp(0.95rem,1.3vw,1.1rem)] text-muted">
          {desc}
        </p>
        <p className="mb-10 max-w-[480px] text-[clamp(0.95rem,1.3vw,1.1rem)] text-muted">
          Este template está en construcción. Acá va a vivir la página
          personalizada de cada cliente de este rubro.
        </p>

        <Link
          href="/biblioteca-templates"
          className="rounded-lg border border-line px-6 py-3 text-sm font-medium text-content transition hover:-translate-y-px hover:border-[rgba(240,238,233,0.3)]"
        >
          ← Volver a la biblioteca
        </Link>
      </main>
    </TemplateShell>
  );
}
