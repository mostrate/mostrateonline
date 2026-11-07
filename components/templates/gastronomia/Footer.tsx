import Link from "next/link";
import { gastronomia } from "@/lib/templates/gastronomia";

const { business, footer, nav } = gastronomia;

export default function Footer() {
  return (
    <footer>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 sm:px-8 md:flex-row">
        <div>
          <div className="font-[family-name:var(--tpl-font-heading)] text-sm font-bold uppercase tracking-[0.14em] text-[var(--ink)]">
            {business.name}
          </div>
          <div className="mt-0.5 text-xs text-[var(--ink-a40)]">{footer.tagline}</div>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-[0.08em] text-[var(--ink-a45)] hover:text-[var(--accent)]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="border-t border-[var(--ink-a10)]">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-5 py-4 sm:px-8">
          <Link
            href="/biblioteca-templates"
            className="text-xs text-[var(--ink-a30)] transition-colors hover:text-[var(--accent)]"
          >
            Sitio de demostración · hecho con Mostrate ↗
          </Link>
        </div>
      </div>
    </footer>
  );
}
