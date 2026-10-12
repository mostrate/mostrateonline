# 📘 Documentación — Mostrate

> Documento vivo. Acá va **todo**: qué es el proyecto, cómo está armado técnicamente,
> qué hace cada parte y cómo se extiende. Lo vamos actualizando a medida que crece.

---

## 1. Qué es Mostrate

**Mostrate** es un emprendimiento personal que vende **landing pages** para
pequeños negocios, emprendedores y monotributistas en Argentina que no tienen
presencia online (o tienen una desactualizada).

### Modelo de negocio
- Se ofrecen **4 templates reutilizables** que se personalizan por cliente.
- Cada cliente tiene **su propio dominio**.
- **Pago único inicial** por diseño y desarrollo.
- **Abono mensual** que cubre hosting, dominio y mantenimiento.

Este repo contiene **dos cosas distintas**:
1. **La landing de Mostrate** (`/`) → la web que *vende el servicio*.
2. **Las demos de templates** (`/templates/*`) → diseños con contenido de ejemplo
   para personalizar por cliente. La arquitectura multi-cliente sigue pendiente.

---

## 2. Stack técnico

| Pieza | Tecnología |
|---|---|
| Framework | **Next.js 15** (App Router) + **React 19** |
| Estilos | **Tailwind CSS** 3 |
| Lenguaje | **TypeScript** (strict) |
| Fuentes | **Syne** + **DM Sans** para la landing; títulos configurables en templates (sección 6). Todas alojadas en `app/fonts/` y cargadas con `next/font/local` (ver abajo) |
| Testing | **Vitest** + **React Testing Library** (jsdom), alias `@/*` vía `vite-tsconfig-paths` |
| Deploy | **Vercel** como destino documentado; estado remoto no verificado desde el repo |

Requisito de la versión instalada de Next.js: Node ^18.18.0, ^19.8.0 o >=20. Comandos:

```bash
npm install     # instalar dependencias
npm run dev     # desarrollo → http://localhost:3000
npm run build   # build de producción
npm start       # servir el build
npm test        # correr los tests una vez
npm run test:watch  # tests en modo watch
npm run coverage    # tests + reporte de cobertura (v8)
```

Convención: los tests viven junto al archivo que prueban, como
`<archivo>.test.ts(x)` (ej. `components/templates/theme.test.ts`,
`components/templates/gastronomia/Menu.test.tsx`).

Dos formas de test conviviendo en el repo, cada una con su propósito:
- **Funciones puras** (`theme.ts`, `font.ts`) — sin dependencias, rápidas,
  cero setup.
- **Componentes con estado/interacción** (`Menu.tsx`) — usan
  `@testing-library/react` + `@testing-library/user-event` sobre entorno
  `jsdom`. Requieren `vitest.setup.ts` con `afterEach(() => cleanup())`:
  sin eso, cada `render()` de un test se queda montado y contamina el
  siguiente (aparecen elementos "duplicados" que en realidad son del test
  anterior). Ya está resuelto, pero si un test nuevo falla con "Found
  multiple elements", es la primera sospecha.
- Al testear contenido real (no mocks), pueden aparecer **ambigüedades
  genuinas de UI** — ej. "Sorrentinos de jamón y muzzarella" aparece tanto
  en el destacado de "Plato del día" como en la lista de Pastas. No es un
  bug, pero el test tiene que elegir un texto que no se repita en pantalla.

Esta es la base sobre la que opera el subagente `testing-coverage`
(ver sección 10).

Verificación de tipos: `npx tsc --noEmit`. Lint: `npm run lint` (ESLint 9 con
`eslint.config.mjs`: `next/core-web-vitals` + `next/typescript`; los
parámetros con prefijo `_` se permiten sin usar). `next lint` queda deprecado
en Next 16; al migrar, pasar al CLI de ESLint.
No hay workflows de CI versionados actualmente.

**Fuentes alojadas en el repo (no usar `next/font/google`).** Google Fonts a
veces responde con URLs dinámicas sin extensión
(`fonts.gstatic.com/l/font?kit=…`) y el loader de `next/font/google` falla con
`TypeError: Cannot read properties of null (reading '1')`, de forma
intermitente y con cualquier fuente (se vio con Newsreader y Space Grotesk; el
loader sigue igual en Next 15.5.26 y 16.3.6). Por eso `app/layout.tsx` carga
las 14 fuentes con `next/font/local` desde `app/fonts/`, y el build no depende
de la red:
- Son los mismos woff2 que sirve Google, **solo el subset latin** (cubre el
  español). Glifos fuera de ese subset (p. ej. latin-ext como "ő", cirílico,
  vietnamita) caen a la fuente de respaldo.
- Cada entrada de `src` replica una cara del CSS de Google: mismo peso y
  estilo, aunque varias apunten al mismo archivo variable. No declarar rangos
  ("400 800"): un peso no pedido se vería distinto que con Google.
- Nombres: `<familia>-latin[-italic][-<peso>].woff2` (el peso solo en fuentes
  estáticas, con un archivo por peso).
- Para sumar una fuente o un peso: pedir a
  `https://fonts.googleapis.com/css2?family=<Familia>:wght@<pesos>&display=swap`
  con un User-Agent de Chrome, tomar las URLs `.woff2` del bloque `/* latin */`
  (si vienen como `/l/font?kit=`, reintentar) y agregar las entradas en
  `layout.tsx`. Serif: `adjustFontFallback: "Times New Roman"`.

**`overrides` de PostCSS.** Next 15.5 trae fijada `postcss@8.4.31` (con
vulnerabilidades corregidas en 8.5.23). `package.json` la fuerza a la misma
versión que usa el proyecto (`"overrides": { "next": { "postcss": "$postcss" } }`).
Quitarlo cuando Next traiga una versión corregida (Next 16 ya trae 8.5.23).

---

## 3. Estructura de carpetas

```
app/
  layout.tsx                     → carga fuentes, metadata global, estilos
  fonts/                         → woff2 de todas las fuentes (next/font/local, ver sección 2)
  globals.css                    → base de Tailwind + reduced-motion + scroll offset
  page.tsx                       → LANDING de Mostrate (ensambla las secciones)
  biblioteca-templates/page.tsx  → galería de templates con navegación completa
  templates/
    profesional/page.tsx         → demo Profesional desarrollada
    comercio/page.tsx            → demo Comercio desarrollada
    gastronomia/page.tsx         → demo Gastronomía desarrollada
    bienestar/page.tsx           → demo Bienestar desarrollada

components/
  landing/                       → secciones de la landing de Mostrate
    Ambient.tsx                  → luz que sigue al cursor + grano de fondo
    Nav.tsx                      → nav fija con blur + menú mobile a pantalla completa
    Logo.tsx                     → wordmark "mostrate"
    Icons.tsx                    → íconos de línea SVG inline (sin dependencias)
    Button.tsx                   → botón único de la landing (flecha circular, halo y hover)
    Hero.tsx                     → titular, propuesta y CTAs de portada
    HeroPreview.tsx              → composición animada con previews reales en la portada
    Demos.tsx                    → sección dedicada a las demos en vivo
    LiveStage.tsx                → templates reales en iframes (compu + celular)
    SectionHeader.tsx            → encabezado reutilizable (label + título + sub)
    Servicios.tsx                → lista numerada con encabezado fijo (sticky)
    Templates.tsx                → galería escalonada de la biblioteca de templates
    Tilt.tsx                     → inclinación 3D siguiendo el mouse
    Precios.tsx                  → 2 planes (precios desde config)
    Contacto.tsx                 → formulario (mailto) + datos
    Footer.tsx
  templates/                     → motor + piezas reutilizables de los templates
    theme.ts                     → tipo TemplateTheme + helper de variables CSS
    font.ts                      → tipo TemplateFont + variables CSS + fuentes compartidas
    design.ts                    → tipo TemplateDesign + resolveDesign (?diseno=)
    ThemeProvider.tsx            → aplica tema/fuente y monta la barra de demo
    DemoToolbar.tsx              → barra de demo: volver, diseño, tipografía, color
    TemplateShell.tsx            → wrapper usado solo por PlaceholderTemplate
    PlaceholderTemplate.tsx      → placeholder sin uso en las rutas actuales
    common.tsx                   → menú mobile e íconos de línea compartidos por los templates
    profesional/                 → template Profesional con 3 diseños
      DisenoClasico.tsx  DisenoTecnico.tsx  DisenoBoutique.tsx
      shared.tsx                 → formulario mailto y datos derivados (+ reexporta common)
    comercio/                    → template Comercio con 3 diseños
      DisenoEditorial.tsx  DisenoPop.tsx  DisenoGaleria.tsx
      shared.tsx                 → links de WhatsApp/Maps e íconos por rubro (+ reexporta common)
    gastronomia/                 → template Gastronomía con 3 diseños
      DisenoCarta.tsx (secciones sueltas + GrainOverlay)  DisenoBodegon.tsx  DisenoTaberna.tsx
      shared.tsx                 → estado de la carta, formulario de reserva, WhatsApp (+ reexporta common)
    bienestar/                   → template Bienestar con 3 diseños
      DisenoNucleo.tsx (secciones sueltas + Counter)  DisenoCalma.tsx  DisenoDeportivo.tsx
      shared.tsx                 → formulario de clase de prueba, intensidad por clase (+ reexporta common)

lib/
  config.ts                      → precios, textos y contacto de la LANDING de Mostrate
  templates/
    profesional.ts               → temas + fuentes + diseños + contenido de Profesional (demo)
    comercio.ts                  → temas + fuentes + diseños + contenido de Comercio (demo)
    gastronomia.ts               → temas + fuentes + diseños + contenido de Gastronomía (demo)
    bienestar.ts                 → temas + fuentes + diseños + contenido de Bienestar (demo)

docs/guias/                      → fuentes (HTML + imágenes) de las guías en PDF para clientes
public/guias/                    → PDFs generados, servidos en /guias/<nombre>.pdf
```

### Guías para clientes

Cada guía vive en `docs/guias/<nombre>/guia.html`, con sus imágenes al lado, y
se exporta a `public/guias/<nombre>.pdf` para mandarle el link al cliente. El
PDF lleva las imágenes adentro, sin links externos. Para regenerarlo, con
Chrome instalado (la página se pasa como URL `file:///` con ruta absoluta;
con ruta relativa Chrome no la encuentra):

```
chrome --headless=new --no-pdf-header-footer --virtual-time-budget=15000 \
  --print-to-pdf=public/guias/<nombre>.pdf \
  "file:///<ruta-del-repo>/docs/guias/<nombre>/guia.html"
```

- `activa-tu-direccion` → cómo autorizar a Mostrate como apoderado en NIC
  Argentina para registrar y gestionar el dominio del cliente. Capturas de NIC
  Argentina (CC BY 2.5 AR).

---

## 4. Sistema de diseño

### Dirección visual (landing de Mostrate — "vidriera en vivo", oscura)
Rediseñada el 2026-09-23. La landing vende diseño, así que tiene que demostrarlo
en vez de describirlo: el eje es la **vidriera en vivo** (los templates reales
funcionando dentro de la página). Criterios para no caer en el look genérico
"hecho con IA":

- **Mostrar el producto real**: demos reales en su propia sección y capturas
  reales en Templates, nunca mockups de relleno.
- **Composición distinta por sección** (titular a todo el ancho, lista con
  encabezado sticky, galería escalonada, cierre gigante), no el patrón repetido
  rótulo + título + grilla de cards iguales.
- **Tipografía como protagonista**: Syne 800 a gran escala para títulos y DM
  Sans para texto e interfaz.
- **Detalles hechos a mano**: luz que sigue al cursor, grano, composición
  animada de previews reales en el hero, cards con tilt y sello girando en el
  plan destacado.
- Sin emojis (íconos de línea en `Icons.tsx`), sin blobs ni gradientes violeta.
- **Botones** (`Button.tsx`, un solo componente para toda la landing): forma
  de píldora, flecha dentro de un círculo y halo azul para sostener la llamada
  a la acción. En hover se elevan levemente, gana presencia el halo y la flecha
  avanza; el primario además recibe un brillo breve. Se descartó un hover con
  inversión de color y texto rodando por recargado.

Una primera iteración clara ("atelier", generada con Stitch) se descartó el mismo
día por genérica; la paleta oscura original se mantuvo por preferencia.

### Paleta (landing de Mostrate — dark)
Definida en [`tailwind.config.ts`](tailwind.config.ts) como colores custom.
Los templates de clientes **no** usan estos tokens: sus páginas fijan fondo,
texto y fuente propios.

| Token Tailwind | Valor | Uso |
|---|---|---|
| `bg` | `#0F1117` | Fondo |
| `surface` | `#1A1D27` | Cards / superficies |
| `content` | `#F0EEE9` | Texto principal |
| `muted` | `rgba(240,238,233,0.5)` | Texto secundario |
| `accent` | `#4F7FFF` | Acento (azul) |
| `accent-dim` | `rgba(79,127,255,0.13)` | Acento tenue |
| `line` | `rgba(240,238,233,0.1)` | Bordes |

Radio por defecto: **12px** (`rounded`), usado por los templates; la landing
usa esquinas rectas o `rounded-lg` en los marcos.

### Tipografías
Cargadas en [`app/layout.tsx`](app/layout.tsx) y expuestas como variables CSS.
La landing usa:

- **Syne** 800 (`font-syne`) → titulares, logo, números. Es muy ancha: los
  tamaños gigantes (hero, "¿Arrancamos?", wordmark del footer) están calculados
  en `vw` para que entren; revisarlos si cambia el copy.
- **DM Sans** (`font-dmsans`) → texto, interfaz y acentos itálicos. Es la
  fuente base del `body`.

El layout también carga **Playfair Display**, **Space Grotesk** y **Poppins**.
Los templates eligen entre estas tres y Syne para los títulos mediante
`--tpl-font-heading`; Inter se mantiene para el texto. Ver sección 6.

### Responsive
Se usa `clamp()` para tamaños fluidos + breakpoints de Tailwind y arbitrarios
(`max-[767px]`, `max-[400px]`). Cubre: monitor grande (1440+), notebook grande,
notebook chica, tablet, celu grande, celu chico.

### Animaciones
- **Composición del hero**: los previews de escritorio y móvil flotan a ritmos
  distintos, con un halo azul suave detrás.
- **Demos en vivo**: el selector cambia la demo embebida y rota sola cada 7 s
  hasta que el visitante elige un rubro.
- Todas las animaciones de la landing respetan `prefers-reduced-motion` (ver
  `globals.css`).

---

## 5. La landing de Mostrate (`/`)

Ensamblada en [`app/page.tsx`](app/page.tsx). Secciones en orden:

1. **Nav** — fija, logo, links numerados a las secciones, CTA "Hablemos", menú mobile a pantalla completa (el nav queda visible encima para poder cerrarlo).
2. **Hero** — ocupa una pantalla: título, propuesta y CTAs a la izquierda;
   previews reales animados de escritorio y móvil a la derecha en escritorio.
3. **Servicios** — lista numerada con el encabezado fijo al costado.
4. **Templates / Demos en vivo** — la demo real de cada template se muestra en
   un iframe escalado dentro de un marco de compu (desde tablet) y de celular.
   Un selector de rubro cambia la demo; rota sola cada 7 s hasta que el visitante
   elige (no rota con reduced-motion). Mientras carga, un boceto gris tapa el
   iframe y se desvanece: el sitio "se arma". Debajo del escenario hay accesos
   a la demo activa y a la biblioteca en todos los tamaños; el marco desktop
   repite el acceso a la biblioteca.
5. **Cómo trabajamos** — recorrido de cuatro pasos desde el primer contacto hasta la publicación.
6. **Precios** — 2 planes; los precios salen de `config.ts`.
7. **FAQ** — preguntas frecuentes con controles nativos `details` / `summary`.
8. **Contacto** — "¿Arrancamos?" + formulario (abre el mail con los datos precargados) + info.
9. **Footer** — links y datos de contacto.

La biblioteca vive en [`/biblioteca-templates`](app/biblioteca-templates/page.tsx).
Renderiza la galería `Templates` sin cambios visuales: capturas reales
(`public/previews/<slug>.webp`) con tilt, cada una enlazada a
`/templates/<slug>`. Incluye Ambient, Nav, Footer y un enlace de vuelta al
inicio; los links compartidos de navegación usan anclas absolutas a `/`.

### Demos embebidas y capturas
- `ThemeProvider` detecta si la demo corre dentro de un iframe y en ese caso
  no monta los controles de demo (tema, tipografía, "Volver a Mostrate").
- Las capturas de `public/previews/` se generan cargando cada demo en un iframe
  de 1440×900 y guardándola en WebP. **Hay que regenerarlas si cambia el hero de
  un template**; no hay script versionado todavía.

### 🔧 Config central — `lib/config.ts`
Centraliza los precios, los datos de contacto y el contenido comercial de la
landing. Aún hay textos auxiliares en componentes, como las etiquetas para abrir
o cerrar el menú y el asunto/cuerpo del correo de contacto. Bloques principales:

- `pricing` → **precios** (`inicial`, `mensual`). *Editá esto para cambiar los precios.*
- `contact` → email, WhatsApp, ubicación.
- `site`, `nav`, `hero`, `demos`, `library`, `servicios`, `templates`, `precios`, `contacto`, `footer`.

---

## 6. Sistema de templates de clientes

Cada template es una **página independiente** en `/app/templates/<slug>/`,
pensada para escalar (a futuro, cada cliente = su dominio).

### Principio
- El **contenido principal** de cada template vive en `lib/templates/<slug>.ts`
  (copy + temas). Persisten textos en componentes, como "Ocultar precios" y
  "Plato del día" en Gastronomía, o "Más elegido" y "Elegir plan" en Bienestar.
  Para contenido nuevo, centralizar los textos editables en ese archivo.
- Las **secciones visuales** viven en `components/templates/<slug>/`.
- La **página** (`app/templates/<slug>/page.tsx`) solo ensambla y envuelve con el
  `ThemeProvider`.

Cada template es **visualmente distinto** a propósito, para mostrar versatilidad.

Actualmente las secciones importan su contenido demo directamente; no reciben
contenido de clientes por props. `ThemeProvider` usa estado local e inyecta
variables CSS, sin React Context ni persistencia de la selección. Siempre monta
la barra de demo (salvo embebido en un iframe): no hay un modo de publicación de
cliente que la excluya. Ver sección 9 antes de instanciar un cliente real.

### 🧩 Diseños por template (mismo contenido, distinta composición)
Un template puede ofrecer varios **diseños**: layouts completos distintos que
leen el mismo archivo de contenido, así un cliente carga sus datos una vez y
elige el estilo. Lo usan los 4 templates (3 diseños cada uno).

- [`design.ts`](components/templates/design.ts) — tipo `TemplateDesign`
  (`id`, `name`, `theme` y `font` con los que arranca) y `resolveDesign()`.
- El diseño activo viaja en la URL: `/templates/<slug>?diseno=<id>` (sin
  parámetro, el primero). La página elige el componente y monta
  `<ThemeProvider key={design.id} designs={...} design={...}>`; el `key`
  reinicia tema y fuente al cambiar de diseño.
- Cada diseño es un componente de cliente en un solo archivo
  (`components/templates/<slug>/Diseno<Nombre>.tsx`); la lógica propia del
  template (formulario, links de WhatsApp, íconos del rubro) va en su
  `shared.tsx`, y lo común a todos (menú mobile, íconos de línea) en
  [`common.tsx`](components/templates/common.tsx).
- Los diseños de distintos templates no deben parecerse entre sí: cada rubro
  tiene su propio lenguaje visual.
- La vidriera de la landing y la captura de `public/previews/` muestran el
  diseño 1.

### 🎨 Sistema de theming (3 temas por template)
Motor reutilizable en `components/templates/`:

- [`theme.ts`](components/templates/theme.ts) — define el tipo `TemplateTheme`
  (`accent`, `accentStrong`, `accentSoft`, `accentContrast`) y `themeVars()`.
- [`ThemeProvider.tsx`](components/templates/ThemeProvider.tsx) — guarda el tema
  activo, lo inyecta como **variables CSS** sobre un wrapper y monta la barra de
  demo, donde se elige el tema.

**Cómo lo consumen las secciones:** usan `var(--accent)`, `var(--accent-strong)`,
`var(--accent-soft)`, `var(--accent-contrast)` (ej. `bg-[var(--accent)]`).
No saben qué tema está activo → cambiar de tema solo reescribe las variables.

**Para agregar/editar temas:** tocás el array `<template>Themes` en el archivo de
contenido del template (ej. `profesionalThemes` en `lib/templates/profesional.ts`).

**Color primario + secundario (combinables).** Además del acento (secundario),
cada template define 3 **primarios** (`<template>Primaries`, tipo
`TemplatePrimary` en `theme.ts`): la base de su identidad como par **fondo +
tinta**. Lo que se ve cambiar es el fondo: claro en Profesional (Blanco, Marfil,
Pizarra) y Comercio (Crema, Rubor, Salvia), oscuro y claro en Gastronomía (Carbón, Chocolate,
Papel) y Bienestar (Negro, Medianoche, Niebla). Cualquier primario combina
con cualquier acento (9 mezclas). Las paletas son **propias de cada template** y
las comparten los diseños de un mismo template.

- `primaryVars()` inyecta `--primary` (fondo), `--primary-alt` (superficie
  alternativa), `--primary-light`, `--ink` (tinta) y transparencias
  `--primary-a<N>` / `--ink-a<N>` (con `color-mix`), porque Tailwind no puede
  aplicar `/70` sobre un color que viene de una variable.
- Fondos de página, secciones y nav usan `var(--primary*)`; textos y bloques de
  contraste, `var(--ink*)`. Las superficies acompañan al fondo: `--card` (cards y
  formularios, el fondo muy aclarado), `--card-alt` (cajas internas, etiquetas,
  inputs) y `--line` (bordes y divisores). Para sombras,
  `shadow-[color:var(--ink-a5)]`.
- Un diseño puede fijar su primario inicial con `primary` en `TemplateDesign`.

### 🔤 Sistema de tipografías (mismo patrón, para títulos)
Igual que el theming de color, pero para la fuente de los títulos:

- [`font.ts`](components/templates/font.ts) — tipo `TemplateFont` (`id`, `name`,
  `heading`), helper `fontVars()`, y `templateFonts` (lista compartida de 4
  opciones: Syne, Playfair Display, Space Grotesk, Poppins). Las 3 fuentes
  extra se cargan como variables CSS en [`app/layout.tsx`](app/layout.tsx)
  junto a Syne/Inter.
- `ThemeProvider` inyecta la fuente activa como `--tpl-font-heading` (usa
  `templateFonts` por defecto si el template no pasa su propio array).
- Un template puede pasar su propia lista (ej. `profesionalFonts`, con
  Newsreader y Plus Jakarta Sans además de las compartidas).

**Cómo lo consumen las secciones:** los títulos usan
`font-[family-name:var(--tpl-font-heading)]` en vez de una clase `font-syne`
fija. La landing de Mostrate y `PlaceholderTemplate` no usan esto — tienen
tipografía fija a propósito (Syne en ambos),
porque no son templates elegibles por el visitante.

### 🧰 Barra de demo de Mostrate
[`DemoToolbar.tsx`](components/templates/DemoToolbar.tsx) — una sola barra que
agrupa todo lo que no es del sitio del cliente: volver a Mostrate (logo + ←),
diseño (si hay más de uno), tipografía, colores primario y secundario, y el llamado "Quiero este
template" (va a `/#contacto`). Usa la identidad de la landing (oscuro
translúcido + azul) para leerse como herramienta de Mostrate sobre cualquier
template, claro u oscuro. Desktop: barra abajo al centro, minimizable a una
píldora. Mobile: píldora "Personalizar demo" que abre un panel inferior.
Reemplaza a los antiguos controles sueltos (ThemeSwitcher, FontSwitcher,
BackToSite).

---

## 7. Templates desarrollados

### 7.1 Profesional (referencia)

Rubro: **servicios profesionales** (contadores, abogados, consultores).
Cliente demo: **"Estudio Rivas — Contador Público"** (Martín Rivas).

Rediseñado el 2026-09-26 a partir de 3 variantes generadas en Stitch; tiene
**3 diseños** (ver "Diseños por template", sección 6) sobre el mismo contenido:

| Diseño | Carácter | Tema / fuente iniciales |
|---|---|---|
| 1 · Clásico | Blanco y navy, serif con itálica de acento, panel del cliente protagonista, servicios en grilla 7/5 | Azul ejecutivo · Newsreader |
| 2 · Técnico | Grilla estricta con reglas finas, rótulos monoespaciados, panel tipo terminal, servicios en dos catálogos | Esmeralda · Space Grotesk |
| 3 · Boutique | Cálido, foto con el panel superpuesto, pilares con listas, frase del profesional en bloque oscuro | Bordó · Newsreader |

- **Contenido:** [`lib/templates/profesional.ts`](lib/templates/profesional.ts)
  (incluye el panel del hero, detalles y grupo de cada servicio, foto,
  credenciales y el área del formulario).
- **Foto:** `public/templates/profesional/retrato.jpg` (retrato generado por
  Stitch, provisorio hasta tener fotos reales). Aparece una sola vez por diseño.
- **Funcionalidad:** nav sticky con menú mobile, anclas, formulario que abre el
  mail con nombre, email, área y mensaje; teléfono como link `tel:`.
- **Temas:** Azul ejecutivo · Esmeralda · Bordó. **Fuentes:** Newsreader, Space
  Grotesk, Playfair, Plus Jakarta Sans (`profesionalFonts`).

Sirve de **patrón de referencia** para construir los demás templates.

### 7.2 Comercio

Rubro: **tiendas y locales** (productos físicos, venta por WhatsApp).
Cliente demo: **"Casa Bonita — Deco & Hogar"**.

Rediseñado el 2026-09-26 a partir de 3 variantes generadas en Stitch; tiene
**3 diseños** sobre el mismo contenido:

| Diseño | Carácter | Tema / fuente iniciales |
|---|---|---|
| 1 · Editorial | Crema cálido, serif con itálica de acento, foto del local 4:5 con epígrafe, fichas de producto con precio de referencia | Mandarina · Playfair |
| 2 · Pop | Concept store: bordes gruesos en tinta, sombras sólidas desplazadas, stickers, cinta de anuncios en movimiento, botones verdes de WhatsApp, grilla "casas reales" | Mandarina · Bricolage Grotesque |
| 3 · Galería | Sala de exposición: nav centrada, foto del local a todo el ancho, categorías como chips, productos verticales escalonados, beneficios numerados | Mandarina · Cormorant Garamond |

- **Contenido:** [`lib/templates/comercio.ts`](lib/templates/comercio.ts)
  (anuncio, hero con sellos de confianza, categorías e íconos, productos con
  foto, promo con código, beneficios, cómo comprar, comunidad y local).
- **WhatsApp:** `whatsapp.number` vacío = los botones llevan a `#local`. Con
  número, cada "Comprar por WhatsApp" abre `wa.me` con el mensaje
  `productMessage` y el nombre del producto. "Cómo llegar" abre Google Maps con
  la dirección.
- **Fotos:** `public/templates/comercio/` (interior y fachada del local + 6
  productos, generadas por Stitch; provisorias hasta tener fotos reales).
- **Temas:** Mandarina · Frambuesa · Uva. **Primarios:** Crema · Rubor · Salvia.
  **Fuentes:** Playfair, Bricolage Grotesque, Cormorant Garamond, Plus Jakarta
  Sans (`comercioFonts`).

### 7.3 Gastronomía

Rubro: **restaurantes, cantinas, cafés**. Cliente demo: **"Cantina Sorrento"**
— cantina ítalo-argentina de barrio (San Telmo, CABA).

Desde el 2026-09-26 tiene **3 diseños** sobre el mismo contenido. El 1 es el
original, apenas refinado en Stitch; el 2 y el 3 salieron de variantes de Stitch:

| Diseño | Carácter | Tema / primario / fuente iniciales |
|---|---|---|
| 1 · Carta | Carta impresa sobre fondo casi negro: serif grande en itálica, sin botones rellenos, líneas de puntos, foto del salón con epígrafe tipo folio, destacados Nº 01–03 | Terracota · Carbón · Playfair |
| 2 · Bodegón | Bodegón porteño impreso: fondo claro de papel, condensada en mayúsculas, rojo de mantel, cajas de filete fino, carta en dos columnas por categoría | Vino · Papel · Oswald |
| 3 · Taberna | Cálido y fotográfico: sans pesada con itálica liviana, mosaico de fotos con el plato del día, carta en tarjetas | Terracota · Chocolate · Plus Jakarta |

- **Contenido:** [`lib/templates/gastronomia.ts`](lib/templates/gastronomia.ts)
  (incluye destacados con descripción, fotos del salón y de platos, textos de
  la franja de WhatsApp e íconos de las modalidades).
- **Carta:** categorías editables desde `menu.categories` (agregar o quitar
  una no toca los componentes). Arranca en "00 Todos" (agrupada por
  categoría), el índice filtra por categoría y el botón muestra u oculta los
  precios. La lógica está en `useCarta()` de
  [`shared.tsx`](components/templates/gastronomia/shared.tsx) y la usan los 3
  diseños; `Menu.test.tsx` la cubre a través del diseño 1.
- **Reservas:** formulario que abre el mail con nombre, email y "día, horario
  y cantidad de personas" (`useReserva()`). **WhatsApp:**
  `ubicacion.whatsapp.number` vacío = los botones llevan al formulario.
- **Fotos:** `public/templates/gastronomia/` (salón, sorrentinos, provoleta,
  bife; generadas por Stitch, provisorias hasta tener fotos reales).
- **Primarios:** Carbón · Chocolate (oscuros) · Papel (claro, para el
  Bodegón). **Temas:** Terracota · Vino · Oliva. **Fuentes:** Playfair,
  Oswald, Plus Jakarta Sans, Syne (`gastronomiaFonts`).
- **Superficies:** los diseños usan `--primary-alt` y `--ink-a<N>` para
  cajas y bordes (funcionan con fondo claro u oscuro); `--card` no sirve acá
  porque siempre se aclara hacia blanco.

### 7.4 Bienestar

Rubro: **gimnasios, estudios de entrenamiento, nutricionistas, coaches**.
Cliente demo: **"Núcleo Training Club"** — estudio boutique de entrenamiento
funcional en Palermo, CABA.

Desde el 2026-09-26 tiene **3 diseños** sobre el mismo contenido. El 1 es el
original, refinado en Stitch; el 2 y el 3 salieron de variantes de Stitch:

| Diseño | Carácter | Tema / primario / fuente iniciales |
|---|---|---|
| 1 · Núcleo | Negro + neón, mayúsculas bold, bloques cortados en diagonal (`clip-path`), stats animados en franja con barra de acento, clases con duración y cupo, horarios con intensidad | Lima · Negro · Space Grotesk |
| 2 · Calma | Estudio boutique luminoso: fondo claro, formas redondeadas, fotos con luz natural, "Tu primera vez en Núcleo" en 3 pasos, coaches con iniciales | Lima · Niebla · DM Sans |
| 3 · Deportivo | Revista de marca deportiva: condensada en itálica, fotografía de acción, clases en lista numerada junto a una foto, retratos de coaches | Naranja · Medianoche · Barlow Condensed |

- **Contenido:** [`lib/templates/bienestar.ts`](lib/templates/bienestar.ts)
  (clases con intensidad, duración y cupo; horarios; coaches con foto;
  "primera vez"; planes; sede del contacto; fotos).
- **Stats animados:** `Counter.tsx` (cuentan desde 0 al montar, respeta
  `prefers-reduced-motion`), usados por los 3 diseños.
- **Formulario:** abre el mail con los datos para coordinar la clase de
  prueba (`usePrueba()` en
  [`shared.tsx`](components/templates/bienestar/shared.tsx)); la intensidad
  de cada franja horaria sale de `clases.items` (`intensidadDe()`).
- **Fotos:** `public/templates/bienestar/` (estudio, grupo, acción, boxeo y
  retratos de coaches; generadas por Stitch, provisorias hasta tener fotos reales).
- **Primarios:** Negro · Medianoche (oscuros) · Niebla (claro, para Calma;
  reemplaza Ciruela). **Temas:** Lima · Naranja · Cian. **Fuentes:** Space
  Grotesk, DM Sans, Barlow Condensed, Syne (`bienestarFonts`).

---

## 8. Cómo agregar un nuevo TEMPLATE

> Automatizable con la skill `nuevo-template` (ver sección 10).

1. Crear `lib/templates/<slug>.ts` con:
   - `<slug>Themes: TemplateTheme[]` (3 temas).
   - objeto de contenido (nav, hero, secciones, footer).
2. Crear secciones en `components/templates/<slug>/` (diseño propio del rubro).
3. Crear o actualizar `app/templates/<slug>/page.tsx` para ensamblar dentro de
   `<ThemeProvider themes={<slug>Themes}>`, siguiendo las convenciones de color
   y tipografía de la sección 6. Pasar `fonts` si se necesita un orden propio.
4. (Opcional) Actualizar la card en `lib/config.ts → templates.items` y generar
   su captura en `public/previews/<slug>.webp` (ver sección 5). La vidriera
   del hero lo toma automáticamente de `templates.items`.
5. `npx tsc --noEmit` para verificar.

---

## 9. Cómo agregar un nuevo CLIENTE (a futuro)

> Automatizable con la skill `nuevo-cliente` (ver sección 10).
> La arquitectura definitiva multi-cliente se define cuando salga el primer cliente real.

Idea general: clonar el archivo de contenido de un template con los datos reales
del cliente, elegir su tema, y publicarlo en su propio dominio.

Copiar un archivo de contenido no cambia las importaciones de las secciones:
hay que resolver cómo se les proporciona el contenido del cliente según la
estrategia elegida, además de los controles/enlaces propios de las demos.
Si se elige un deploy compartido con rutas por cliente, también debe definirse
cómo se resuelve el dominio hacia el sitio correspondiente; esa lógica no existe
hoy. La elección se registra acá antes de implementar, sin asumir una opción.

---

## 10. Skills (automatización)

Skills de proyecto en `.claude/skills/`, invocables en Claude Code con
`/nombre-skill`. Son procedimientos especializados para guiar al agente, no
generadores ejecutables. Deben respetar las convenciones de este documento.

| Skill | Para qué |
|---|---|
| `nuevo-template` | Scaffold completo de un template nuevo siguiendo el patrón de Profesional. |
| `nuevo-cliente` | Generar la instancia de un cliente a partir de un template existente. |

### Subagentes

Subagentes de proyecto en `.claude/agents/`. Claude Code los invoca como
subagentes; Codex sigue el mismo archivo como procedimiento, referenciado desde
[`AGENTS.md`](AGENTS.md). No se duplican por proveedor.

| Subagente | Para qué |
|---|---|
| `testing-coverage` | Escribir tests (funciones puras o componentes con estado), correr la suite y reportar gaps de cobertura, según las convenciones de la sección 2. |

*(Se irán agregando más a medida que aparezcan tareas repetitivas.)*

---

## 11. Deploy en Vercel

1. Subir el repo a GitHub.
2. Importar en Vercel (detecta Next.js solo).
3. Deploy — sin variables de entorno.
4. Para clientes: dominio propio como objetivo; la publicación depende de la
   arquitectura pendiente de la sección 9, además de configurar los dominios.

---

## 12. Estado actual / pendientes

- [x] Landing de Mostrate completa y responsive.
- [x] Motor de theming reutilizable (3 temas por template).
- [x] Template **Profesional** desarrollado.
- [x] Template **Comercio** desarrollado.
- [x] Template **Gastronomía** desarrollado.
- [x] Template **Bienestar** desarrollado.
- [x] Base de testing (Vitest + React Testing Library) instalada, con tests
      sobre el motor compartido (theme.ts, font.ts) y sobre un componente
      con estado/interacción (Menu.tsx de Gastronomía).
- [x] Primer subagente (`testing-coverage`), usable también desde Codex vía
      `AGENTS.md` (ver sección 10).
- [ ] Backend real del formulario de contacto (hoy abre el cliente de mail).
- [ ] Definir arquitectura multi-cliente (dominio por cliente).

La landing se prerenderiza como contenido estático; las cuatro rutas
`/templates/*` se renderizan en el servidor por pedido porque leen `?diseno=`
de la URL (`searchParams`, asíncrono desde Next 15). No hay CRM, backend
de reservas/compras ni integraciones de IA: los paneles, catálogos y horarios
son contenido de demostración. Los formularios abren `mailto:`. Los números de
WhatsApp están vacíos en la landing, Comercio y Gastronomía; los enlaces no
constituyen una integración operativa mientras no se configure el número.

---

## 13. Changelog

- **2026-07-05** — Setup inicial: landing de Mostrate, estructura de carpetas,
  config central, motor de theming, template Profesional con 3 temas, y esta doc.
- **2026-08-25** — Ancho del contenedor (`max-w-shell`) pasado a `clamp()`
  responsivo en vez de un pixel fijo, para que el margen lateral se vea
  proporcional en cualquier ancho de pantalla; alineación del Nav de Mostrate
  corregida al mismo contenedor que el resto de las secciones. Sistema de
  tipografías para templates de clientes (`font.ts` + `FontSwitcher`, 4
  opciones) y link flotante `BackToSite` para volver a Mostrate desde
  cualquier template. Template **Gastronomía** desarrollado completo (cliente
  demo "Cantina Sorrento"): menú por categorías con toggle de precios,
  sección "Nosotros" minimalista, y sección de ubicación/retiro/delivery.
- **2026-08-30** — Repo pasado a público y protección de rama activada sobre
  `main` (ruleset de GitHub: PR + revisión de code owner obligatoria para
  todos, con bypass solo de "esperar aprobación" para el rol admin — nadie
  puede pushear directo, ni siquiera el admin). Agregado `.github/CODEOWNERS`.
  Fix en `Precios.tsx`: `leading-none` reemplazado por `leading-[1.15]` en el
  precio (se veía apretado al envolver a 2 líneas con textos largos como "A
  consultar"), y las cards de plan ahora se estiran a la misma altura
  (`items-start` sacado del grid + `flex flex-col h-full` en cada card) en
  vez de medir cada una su propio contenido. Base de testing instalada
  (Vitest + `@vitest/coverage-v8` + `vite-tsconfig-paths`), con tests sobre
  `theme.ts` y `font.ts`. Sumado soporte para testear componentes
  (`@testing-library/react` + `user-event` + `@vitejs/plugin-react`, entorno
  `jsdom`, `vitest.setup.ts` con cleanup entre tests) probado sobre el toggle
  de precios y las tabs de categoría de `Menu.tsx` (Gastronomía) — decisión
  deliberada de escribir un test de cada tipo (función pura + componente con
  estado) antes de armar el subagente `testing-coverage`, para que sus
  reglas salgan de la práctica y no de la especulación.
- **2026-08-25 (rediseño)** — Primera versión de Gastronomía reemplazada por
  completo: pasó de reusar el lenguaje visual "SaaS" de Profesional/Comercio
  (recoloreado a oscuro) a un lenguaje editorial propio inspirado en sitios
  reales de restaurantes — tipografía Playfair por defecto, botones sin
  relleno, menú con líneas de puntos en vez de tarjetas, y textura de grano
  (`GrainOverlay.tsx`) sobre el fondo.
- **2026-08-25** — Template **Bienestar** desarrollado (cliente demo "Núcleo
  Training Club"): cuarto lenguaje visual del proyecto — negro puro + acento
  neón en bloques angulares (`clip-path`), stats animados al montar
  (`Counter.tsx`), catálogo de clases con badge de intensidad, grilla de
  horarios semanal, coaches y planes de membresía. Con esto, los 4 templates
  de la landing (Profesional, Comercio, Gastronomía, Bienestar) quedan
  completos.
- **2026-08-30** — Correcciones documentales contra el código: demos, estructura,
  tipografías, alcance de la configuración y límites de publicación de clientes.
  Incorporación de principios comunes de arquitectura y colaboración, entradas
  breves para Codex/Claude Code y alineación de las skills existentes, sin cambios
  de comportamiento del producto.
- **2026-09-26** — Colores primario + secundario combinables en los 4 templates:
  3 primarios propios por template (`<slug>Primaries`, fondo + tinta), variables `--primary*`/`--ink*` y
  la barra de demo con "Primario" y "Secundario". Fondos y tinta fijos de cada template pasaron
  a variables.
- **2026-09-26** — Template **Bienestar** con 3 diseños (Núcleo, Calma,
  Deportivo). El diseño 1 sumó franja de stats, duración y cupo por clase,
  horarios con intensidad y sede en contacto. Lógica común en
  `bienestar/shared.tsx`, primario claro Niebla (reemplaza Ciruela), fuentes
  DM Sans y Barlow Condensed, fotos del estudio y de los coaches. Tintas y
  bordes fijos de Bienestar pasados a `--ink*`.
- **2026-09-26** — Template **Gastronomía** con 3 diseños (Carta, Bodegón,
  Taberna). El diseño 1 sumó foto del salón, destacados numerados, carta con
  "Todos" y modalidades en módulos. Lógica común en `gastronomia/shared.tsx`,
  primario claro Papel (reemplaza Bosque), fuente Oswald, fotos de platos.
  Tintas fijas de Gastronomía pasadas a `--ink*`; se suman las
  transparencias 15/25/30/35/45/85 a `PRIMARY_ALPHAS`.
- **2026-09-26** — Template **Comercio** rediseñado con 3 diseños (Editorial,
  Pop, Galería) generados en Stitch, con fotos de producto y del local, links de
  WhatsApp con mensaje por producto y link a Maps. Menú mobile e íconos pasan a
  `components/templates/common.tsx`. Se suman Bricolage Grotesque y Cormorant
  Garamond.
- **2026-09-26** — Template **Profesional** rediseñado con 3 diseños (Clásico,
  Técnico, Boutique) generados en Stitch sobre el mismo contenido, elegibles con
  `?diseno=`. Nuevo motor de diseños (`design.ts`). Los controles sueltos de la
  demo se reemplazan por una barra única de Mostrate (`DemoToolbar`). Se suman
  las fuentes Newsreader, Plus Jakarta Sans y JetBrains Mono.
- **2026-09-28** — Actualización a Next.js 15.5 + React 19 (reemplaza el PR de
  Dependabot que solo subía `next`). `searchParams` de las páginas de templates
  pasa a ser asíncrono; `JSX.Element` → `React.JSX.Element` por los tipos de
  React 19. ESLint configurado por primera vez. Newsreader pasa a
  `next/font/local` para evitar un fallo intermitente del build (sección 2).
- **2026-09-28** — Seguridad: PostCSS de Next forzado a la versión del proyecto
  (`overrides` en `package.json`; Next 15.5 trae fijada 8.4.31, vulnerable) y
  `undici` actualizado; `npm audit` sin vulnerabilidades. El fallo de fuentes
  apareció también con Space Grotesk, así que las 14 fuentes pasan a
  `app/fonts/` con `next/font/local` (mismos archivos y caras que Google,
  subset latin).
- **2026-09-23** — Rediseño de la landing de Mostrate con concepto de
  "vidriera en vivo": los templates reales se muestran funcionando en iframes
  dentro del hero (selector de rubro, boceto que "se arma" al cargar), cinta de
  rubros, luz que sigue al cursor, galería de templates con capturas reales y
  tilt, y composición distinta por sección. Se mantiene la paleta oscura
  original; Syne + DM Sans. Se
  descartó una iteración clara previa generada en Stitch por genérica. Se
  conservan anclas, menú mobile, formulario `mailto:`, WhatsApp y links a las
  demos. Copy en `lib/config.ts`; se sumaron `hero.stage`, `marquee`,
  `templates.cta`, `contacto.infoLabels` y `precios.note` (pregunta + link),
  y los íconos de servicios pasaron de emoji a claves. `ThemeProvider` oculta
  los controles de demo cuando está embebido.
- **2026-09-27** — Guía para clientes **Activá la dirección de tu página**
  (apoderamiento en NIC Argentina) con la marca de Mostrate y las capturas
  dentro del PDF. Fuente en `docs/guias/`, PDF en `public/guias/`.
- **2026-10-12** — Sobre la landing oscura original se compactaron hero y
  espaciados, se sumaron "Cómo trabajamos" y FAQ, y se agregó un favicon SVG
  temporal. El hero combina propuesta y CTAs con previews reales animados;
  Templates lleva a las demos en vivo, ubicadas después de Servicios. La
  biblioteca se trasladó a `/biblioteca-templates`, con navegación completa y
  acceso a ella —más la demo activa— desde todos los tamaños. Se retiró la
  antigua cinta rotativa y se unificó la jerarquía de los CTAs, incluido
  "Hablemos" en el header.

---

## 14. Arquitectura y colaboración

### Fuentes de verdad

Orden de autoridad para describir el estado y las decisiones del proyecto:

1. Código, configuración, tests y contratos ejecutables.
2. Documentación versionada.
3. Decisiones arquitectónicas registradas.
4. Instrucciones específicas de agentes.
5. Conversaciones.

Las conversaciones sirven para razonar y decidir, pero no deben ser la única
fuente persistente de una decisión importante. Registrar en la sección pertinente
de este documento las decisiones que cambien el proyecto, con fecha, motivo y
consecuencias; distinguir el estado implementado de propuestas y pendientes.

### Principios

- Mostrate debe permanecer agnóstico al proveedor de IA; los agentes son
  ejecutores intercambiables, no dependencias arquitectónicas del producto.
- Git es el mecanismo principal de coordinación técnica: revisar rama y cambios
  locales antes de trabajar, sin descartar ni sobrescribir trabajo ajeno.
- **Historia lineal con rebase**: cada cambio va por encima de lo que ya existe.
  Las ramas se actualizan con `git rebase origin/main`, nunca mergeando `main`
  dentro de la rama; si la rama ya estaba en el remoto, se publica con
  `git push --force-with-lease`. Los PR se integran con **Rebase and merge**
  (GitHub configurado para no permitir merge commits ni squash). Trabajar
  siempre en una rama propia, nunca directo sobre `main`.
- No introducir complejidad, capas, dependencias o abstracciones sin una
  necesidad concreta. Evaluar capacidades reutilizables antes de una solución
  específica y priorizar configuración → composición → extensión → desarrollo
  específico.
- Documentar las decisiones difíciles de revertir y actualizar la documentación
  cuando cambie una decisión persistente.
- Los clientes deben mantener contexto aislado; esto es un requisito para las
  decisiones futuras, no una capacidad multi-cliente implementada hoy.
- Ejecutar las verificaciones disponibles pertinentes al cambio y registrar sus
  resultados o limitaciones. Para cambios exclusivamente Markdown, revisar diff,
  enlaces y coherencia; no es necesario ejecutar TypeScript/build.
- Nunca introducir secretos en archivos versionados. Usar variables de entorno
  o gestión de secretos fuera de Git y aplicar el menor privilegio.

### Definiciones y dirección futura

- Proyecto = frontera de contexto.
- Agente = frontera de responsabilidad.
- Workflow = proceso reproducible.
- Skill/herramienta = capacidad concreta.
- Artefacto/estado = información persistente.
- Chat = espacio de interacción y razonamiento.

**Mostrate Core → Orquestación → Dominios → Workflows → Skills → Clientes**
es una dirección conceptual futura, no una estructura que deba implementarse
ahora. No implica crear carpetas, capas ni un agente para cada tarea.

[`AGENTS.md`](AGENTS.md) y [`CLAUDE.md`](CLAUDE.md) son entradas breves a estas
mismas fuentes. Las skills de `.claude/skills/` complementan los procedimientos
comunes; no deben convertirse en una fuente de arquitectura paralela ni requerir
duplicados por proveedor.
