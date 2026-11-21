---
name: seo-ai-seo
description: Revisar y ajustar SEO y visibilidad en búsquedas con IA al cambiar contenido público, rutas, metadatos o rastreo de Mostrate, o al auditar su presencia en buscadores.
---

# SEO y búsqueda con IA de Mostrate

Aplicá este procedimiento a la web de Mostrate al modificar contenido público,
rutas, metadatos, indexación o acceso de rastreadores. Para revisiones, reportá
hallazgos sin modificar archivos salvo que el usuario también pida corregirlos.
Una skill guía al agente durante su trabajo; no observa cambios ni publica sola.

## Revisión y ajustes

- Contrastá el cambio con `lib/config.ts`, `lib/seo.ts`, `app/robots.ts`,
  `app/sitemap.ts`, los metadatos de las rutas y la sección 2 de `DOCS.md`.
  Si se crea, mueve o elimina una página, actualizá sitemap, URL canónica y
  enlaces según corresponda; no inventes fechas de modificación.
- Asegurá que títulos, descripciones, encabezados, enlaces y datos estructurados
  correspondan al contenido visible y a los hechos confirmados. Las demos se
  identifican como ejemplos; no crees clientes, testimonios ni resultados falsos.
  No reescribas textos comerciales fuera del alcance del pedido.
- Conservá el rastreo de las páginas públicas y el `noindex` de staging. Revisá
  por separado las preferencias de búsqueda y de entrenamiento de IA; habilitar
  OAI-SearchBot no requiere permitir GPTBot. No modifiques esa política sin
  autorización. Consultá documentación oficial vigente cuando cambien criterios
  o proveedores; no prometas indexación, posiciones ni citas en asistentes.
- Comprobá el HTML, canonical, robots y sitemap pertinentes, y ejecutá las
  pruebas y verificaciones adecuadas al cambio. `deploy/verify.sh` controla
  rutas y señales técnicas al publicar, pero no comprueba la indexación real.
  Después de publicar, revisar Search Console y la versión pública cuando haya
  acceso. Indicá qué se modificó y qué no pudo verificarse.

No crees páginas repetidas por ciudad ni archivos o marcado para IA sin un
beneficio comprobable. Coordinar difusión, publicación y cambios en servicios
externos según la autorización del usuario.
