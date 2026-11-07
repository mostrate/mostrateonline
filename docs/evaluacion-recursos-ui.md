# Evaluación de recursos para diseño de interfaces

Revisión del 7 de noviembre de 2026 para el desarrollo de sitios de clientes
de Mostrate y sus templates. Se consultaron los README,
licencias disponibles y, cuando correspondía, instrucciones de las skills.
Las decisiones se apoyan en el estado de los repositorios en esa fecha; antes
de copiar código hay que comprobar los términos y dependencias del archivo
concreto. La skill `diseno-ui` contiene criterios redactados para este flujo;
no se copiaron archivos de terceros ni se instalaron dependencias.

| Recurso | Evaluación y decisión |
|---|---|
| [Superdesign](https://github.com/superdesigndev/superdesign) | El repositorio enlazado es la extensión anterior, cuyo README indica que dejó de mantenerse; su licencia combina AGPL y archivos comerciales. Su [skill actual](https://github.com/superdesigndev/superdesign-skill) es un proyecto separado que usa CLI y servicio con login. Se toma como referencia la exploración desde la identidad existente; no se instala ni se duplica el sistema de diseño. |
| [Better Design](https://github.com/marvkr/better-design) | Skill y catálogo con licencia MIT; la skill depende de un MCP y su configuración. Aporta la secuencia de revisar identidad existente, UX y accesibilidad. Se incorporan esos criterios, sin conectar el servicio ni imponer un sistema visual ajeno al cliente. |
| [Design Taste](https://github.com/madebymustafa/design-taste) | Conjunto MIT de skills de diseño y revisión. Se adaptan la definición de dirección según audiencia, la revisión visual por prioridades y los controles de accesibilidad y movimiento. No se adoptan prohibiciones estéticas ni cantidades rígidas que contradigan el encargo o la identidad del proyecto. |
| [Canvas UI](https://github.com/DavidHDev/canvas-ui) | Componentes HTML con efectos WebGL. Su licencia combina MIT y Commons Clause, con restricciones sobre venta y redistribución de componentes. Solo considerar un efecto para una necesidad concreta y revisar los términos antes de reutilizarlo. |
| [Paper Shaders](https://github.com/paper-design/shaders) | Shaders para canvas, licencia Apache 2.0. El proyecto indica que sus versiones 0.0.x pueden introducir cambios incompatibles. Referencia opcional para una necesidad visual específica, evaluando rendimiento, alternativa estática y licencia; no se instala. |
| [UI Layouts](https://github.com/ui-layouts/uilayouts) | Catálogo MIT de componentes; varias muestras usan Motion y utilidades adicionales. Puede consultarse por componente cuando exista una necesidad concreta, verificando sus dependencias y atribución. |
| [Motion Primitives](https://github.com/ibelick/motion-primitives) | Biblioteca de componentes con Motion y Tailwind, declarada MIT en su README y descrita allí como beta. Referencia para interacciones concretas; verificar licencia del código específico antes de copiarlo y priorizar soluciones existentes. |
| [Cursify](https://github.com/ui-layouts/cursify) | Repositorio de efectos de cursor; no se encontró archivo de licencia en el árbol consultado. No copiar código hasta aclarar sus términos. Los efectos de cursor deben ser prescindibles en táctil y con movimiento reducido. |

No se agregaron MCP, claves, dependencias ni un agente por repositorio. La
capacidad compartida vive en `.claude/skills/diseno-ui/` y se usa también desde
Codex mediante `AGENTS.md`, sin duplicar sus instrucciones.
Se aplica a la landing comercial de Mostrate solo si el usuario lo pide.
