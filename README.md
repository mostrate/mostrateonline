# Mostrate

Landing page del servicio **Mostrate** — desarrollo de landing pages para
emprendedores, pequeños negocios y monotributistas en Argentina.

## Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [Tailwind CSS](https://tailwindcss.com/)
- TypeScript
- Deploy en [Vercel](https://vercel.com/)

## Desarrollo

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Estructura

```
app/
  layout.tsx              → fuentes de landing y templates, metadata, estilos globales
  page.tsx                → landing principal de Mostrate
  biblioteca-templates/   → galería de templates con navegación completa
  globals.css             → base Tailwind + reduced-motion
  templates/              → páginas independientes de templates de clientes
    profesional/
    comercio/
    gastronomia/
    bienestar/
components/
  landing/                → componentes de la landing (Nav, Hero, Servicios, ...)
  templates/              → componentes reutilizables para templates de clientes
public/
  previews/               → capturas de las demos para la galería de templates
lib/
  config.ts               → precios, contenido comercial y contacto de la landing
  templates/              → contenido demo y temas de cada template
```

## Editar contenido y precios

Los precios, los datos de contacto y el contenido comercial de la landing viven
en [`lib/config.ts`](lib/config.ts). Algunos textos auxiliares siguen en los
componentes. Las demos usan `lib/templates/<slug>.ts`; ver
[`DOCS.md`](DOCS.md) para su estructura y convenciones.

- **Precios:** objeto `pricing` (`inicial` / `mensual`).
- **Contacto:** objeto `contact` (email, WhatsApp, ubicación).
- **Secciones:** `hero`, `servicios`, `templates` (demos en vivo), `como-trabajamos`, `precios`, `faq`, `contacto`, `footer`. La galería está en `/biblioteca-templates`.

## Deploy en Vercel

1. Subir el repo a GitHub.
2. Importar el proyecto en Vercel (detecta Next.js automáticamente).
3. Deploy — sin variables de entorno requeridas.
