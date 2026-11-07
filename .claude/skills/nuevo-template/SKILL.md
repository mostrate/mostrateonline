---
name: nuevo-template
description: Scaffold completo de un template de cliente nuevo para Mostrate (ej. comercio, gastronomia, bienestar, o uno custom). Usar cuando el usuario pida "crear/armar el template X", "nuevo template", "hacé el template de <rubro>". Sigue el patrón de referencia del template Profesional.
---

# Skill: nuevo-template

Crea un template de cliente nuevo siguiendo la arquitectura ya establecida en el
proyecto (ver `DOCS.md` secciones 6-8 y principios comunes de la sección 14).
El template **Profesional** es la referencia canónica: contenido en
`lib/templates/profesional.ts` y, si el template ofrece varios diseños,
un componente por diseño (`components/templates/<slug>/Diseno<Nombre>.tsx`)
con la lógica común en `shared.tsx` (ver `DOCS.md`, sección 6).
Para la dirección visual y su verificación, aplicar también
[`diseno-ui`](../diseno-ui/SKILL.md).

## Datos que necesito (preguntar si faltan)
- **slug**: identificador en kebab-case. Verificar si existe la ruta
  `app/templates/<slug>/page.tsx` antes de crearla o modificarla; los cuatro
  templates actuales ya están desarrollados, no son placeholders.
- **rubro / público**: para qué negocios es (ej. "tiendas y locales").
- **cliente demo**: nombre ficticio + rubro concreto para poblar el contenido.
- **estilo visual**: cómo diferenciarlo de los otros (¡cada template debe verse
  distinto! — dark vs claro, editorial, visual/producto, minimal, etc.).
- **3 temas de color**: nombres + hex de acento. Si no los dan, proponer 3
  coherentes con el rubro.

## Pasos

1. **Contenido** — Crear `lib/templates/<slug>.ts` copiando la estructura de
   `lib/templates/profesional.ts`:
   - Exportar `<slug>Themes: TemplateTheme[]` con **3** temas según `DOCS.md`,
     sección 6.
   - Exportar el objeto de contenido (nav, hero, secciones, footer), siguiendo
     la convención de centralización de textos de `DOCS.md`, sección 6.

2. **Secciones** — Crear `components/templates/<slug>/` con las secciones del
   template. **Diseño propio del rubro** (no copiar el layout de Profesional;
   variar estructura, densidad, tratamiento visual). Reglas:
   - Aplicar el sistema de acentos y tipografías de `DOCS.md`, sección 6:
     títulos con `font-[family-name:var(--tpl-font-heading)]`, sin fijar Syne;
     texto con `font-inter`.
   - Componentes con interacción (nav mobile, forms) llevan `"use client"`.
   - Secciones navegables con `id` para el scroll ancla.

3. **Página** — Crear o actualizar `app/templates/<slug>/page.tsx`:
   - Envolver todo en `<ThemeProvider themes={<slug>Themes}>`.
   - Para un orden de fuentes propio, pasar `fonts` según `DOCS.md`, sección 6.
   - Wrapper con el fondo/tipografía base del template.
   - Exportar `metadata` (title/description desde el contenido).

4. **Card en la landing** — Verificar/ajustar la entrada del template en
   `lib/config.ts → templates.items` (slug, name, desc, tag) y generar su
   captura `public/previews/<slug>.webp` según `DOCS.md`, sección 5.

5. **Verificar** — Correr `npx tsc --noEmit`. Si hay un dev server corriendo,
   revisar su log; si no, `npm run build`.

6. **Documentar** — Agregar una sección del template en `DOCS.md` (como la
   sección 7 de Profesional) y actualizar el checklist de la sección 12 +
   changelog (sección 13). Usar la fecha real del sistema, no inventarla.

## Checklist de calidad
- [ ] Se ve claramente distinto a los otros templates.
- [ ] Los 3 temas cambian todo el acento en vivo (probar el color en la barra de demo).
- [ ] Responsive en mobile/tablet/desktop.
- [ ] `tsc --noEmit` sin errores.
- [ ] Textos editables nuevos centralizados según `DOCS.md`, sección 6.
- [ ] Los títulos responden al selector de tipografía de la barra de demo.
- [ ] DOCS.md actualizado.
