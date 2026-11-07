---
name: diseno-ui
description: Diseñar, ajustar o revisar interfaces de sitios de clientes y templates de Mostrate con criterios de composición, accesibilidad y validación visual. Usar en cambios visuales o de interacción de esos sitios; no aplica a la landing comercial de Mostrate salvo pedido explícito.
---

# Diseño y revisión de interfaces para clientes

# Alcance

Usá este procedimiento para diseñar, implementar o evaluar templates y sitios
de clientes. La landing comercial de Mostrate queda fuera, salvo que el usuario
pida expresamente aplicar estos criterios allí. Respetá las instrucciones del
usuario, `DOCS.md` (en especial las secciones 6, 9 y 14) y el código vigente.
Para un template nuevo, complementá
[`nuevo-template`](../nuevo-template/SKILL.md); para un cliente real, respetá
los límites de [`nuevo-cliente`](../nuevo-cliente/SKILL.md).

## Dirección

- Identificá el público, el objetivo de la página, la acción principal y las
  restricciones del pedido. Revisá la UI y sus componentes, textos, tokens y
  tipografías antes de proponer cambios. Una edición puntual conserva las
  decisiones existentes fuera del alcance solicitado.
- Partí de la identidad, el público y el material disponible de cada cliente.
  En las demos, construí una dirección propia para cada rubro; no apliques
  automáticamente los colores, la tipografía o el estilo de Mostrate.
- En una página nueva o un rediseño amplio, definí una dirección breve que
  conecte audiencia, contenido y composición. Contrastá jerarquía, ritmo de
  secciones, tipografía, color y uso de imágenes reales; evitá fórmulas
  repetidas cuando no aporten al objetivo. No inventes testimonios, cifras,
  marcas ni funciones para completar un diseño. Señalá el contenido pendiente
  y mantené separados los datos y activos privados de cada cliente.

## Implementación

- Usá primero los componentes, estilos y herramientas existentes. Un recurso
  o dependencia externa necesita una función concreta, compatibilidad con el
  stack y revisión de licencia, tamaño, mantenimiento y accesibilidad; no
  instales catálogos o efectos solo por disponibilidad.
- Cada interacción debe tener una función clara, respuesta visible y manejo
  por teclado. Revisá nombres accesibles, etiquetas de formularios, foco,
  contraste y áreas táctiles según corresponda al cambio.
- El contenido y las acciones deben funcionar sin depender de movimiento,
  hover, puntero o WebGL. Para animación, considerá movimiento reducido,
  rendimiento y dispositivos táctiles; ofrecé una alternativa estática útil.

## Verificación y entrega

- Para cambios visuales, revisá el resultado renderizado en tamaños pertinentes
  de escritorio y móvil, incluyendo alturas de pantalla ajustadas cuando afecten
  el primer pantallazo. Probá estados e interacciones afectadas, foco y ausencia de
  desbordes. Si no hay navegador disponible, indicá la limitación; no presentes
  la inspección del código como validación visual.
- En una revisión solicitada, distinguí fallas observadas de preferencias;
  priorizá los problemas que impiden uso o comprensión y citá la vista y el
  tamaño revisados. No transformes una revisión en un rediseño no solicitado.
- Ejecutá las comprobaciones pertinentes del proyecto y comunicá resultados y
  límites. No ejecutes `next build` sobre el mismo directorio `.next` mientras
  esté activo `next dev`; coordiná o aislá las verificaciones.

Las fuentes y los motivos de selección se registran en
[`docs/evaluacion-recursos-ui.md`](../../../docs/evaluacion-recursos-ui.md).
