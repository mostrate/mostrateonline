---
name: nuevo-cliente
description: Genera la instancia de un cliente real a partir de un template existente de Mostrate (contenido con sus datos + su tema + su ruta/deploy). Usar cuando el usuario diga "nuevo cliente", "dar de alta a <negocio>", "personalizar el template <X> para <cliente>", "onboarding de cliente".
---

# Skill: nuevo-cliente

Toma un **template ya construido** y produce la versión personalizada de un
**cliente real** con su contenido, su color y lista para publicar en su dominio.

Respetar `DOCS.md`, secciones 6 y 9 (estado y límites actuales), y los principios
comunes de arquitectura y colaboración de la sección 14.
Para diseñar y verificar la interfaz del cliente, aplicar también
[`diseno-ui`](../diseno-ui/SKILL.md).

> ⚠️ La arquitectura multi-cliente definitiva se confirma con el usuario la
> primera vez que se corra esta skill (ver "Decisión de arquitectura"). A partir
> de ahí se sigue la convención elegida.

## Datos que necesito (preguntar si faltan)
- **template base**: `profesional` | `comercio` | `gastronomia` | `bienestar`.
- **cliente**: nombre del negocio, rubro, y un **slug** en kebab-case.
- **contenido real**: textos de cada sección (o pedir lo mínimo y dejar el resto
  con placeholders claros para completar después).
- **tema**: cuál de los 3 del template usa (o un acento custom → agregar un tema).
- **contacto**: email/teléfono/WhatsApp/ubicación reales.
- **dominio** (si ya lo tienen).

## Decisión de arquitectura (confirmar la 1ª vez)
Elegir con el usuario cómo se sirven los clientes y dejarlo anotado en `DOCS.md`:
- **A) Ruta por cliente** en este mismo repo: `app/sites/<slug>/` + contenido en
  `lib/clients/<slug>.ts`. Simple para pocos clientes; un solo deploy.
- **B) Un repo/deploy por cliente**: se clona el proyecto (o solo el template) por
  cliente. Aísla dominios y facturación; más overhead.

La configuración del dominio no resuelve por sí sola la instancia del cliente.
Antes de publicar, resolver los límites descritos en `DOCS.md`, sección 9,
según la opción elegida; ninguna de estas opciones está implementada hoy.

## Pasos (para la opción A — ruta por cliente)

1. **Content-aware check** — Verificar si las secciones del template base ya leen
   su contenido por **prop** en vez de importarlo fijo. Si todavía importan el
   objeto directo (ej. `import { profesional }`), refactorizar UNA vez ese
   template para que cada sección reciba `content` (y el tipo del contenido).
   Esto habilita múltiples clientes sobre el mismo template.

2. **Contenido del cliente** — Crear `lib/clients/<slug>.ts` copiando la
   estructura de `lib/templates/<template>.ts` y volcando los datos reales del
   cliente. Elegir/ajustar su tema.

3. **Ruta** — Crear `app/sites/<slug>/page.tsx`: ensambla las secciones del
   template base con el contenido del cliente, dentro de `<ThemeProvider>` con el
   tema elegido. Exportar `metadata` con los datos del negocio. Tener en cuenta
   los controles y enlaces de demo que hoy monta el template (`DOCS.md`,
   secciones 6 y 9); no asumir que la ruta ya está lista para publicar.

4. **Verificar** — `npx tsc --noEmit` y revisar en el navegador.

5. **Deploy / dominio** — Documentar el dominio del cliente y los pasos de Vercel.

6. **Documentar** — Registrar el cliente en `DOCS.md` (tabla de clientes + estado)
   con la fecha real del sistema.

## Checklist
- [ ] Contenido real cargado (sin textos de otro cliente).
- [ ] Tema/acento correcto.
- [ ] Datos de contacto reales.
- [ ] `tsc --noEmit` sin errores.
- [ ] Responsive verificado.
- [ ] Cliente anotado en DOCS.md.
