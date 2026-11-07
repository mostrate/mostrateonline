# Claude Code — Mostrate

Leer [DOCS.md](DOCS.md) antes de cambios arquitectónicos, en particular la
sección 14, **Arquitectura y colaboración**. [README.md](README.md) es la entrada
breve al proyecto.

- Usar el código y la documentación versionada como fuentes de verdad, con el
  orden de autoridad definido en DOCS.md. Verificar las afirmaciones contra el repo.
- No introducir capas, dependencias o abstracciones sin una necesidad concreta;
  aplicar los principios comunes de DOCS.md.
- Preservar la interoperabilidad con Codex; coordinar mediante Git sin duplicar
  convenciones por proveedor.
- Actualizar ramas con `git rebase origin/main` (nunca mergear `main` en la
  rama) y publicar con `git push --force-with-lease`; los PR se integran con
  "Rebase and merge". Ver DOCS.md, sección 14.
- Las skills disponibles en `.claude/skills/` y los subagentes de `.claude/agents/`
  son procedimientos especializados y deben respetar DOCS.md, sin definir una
  arquitectura paralela. Codex usa los mismos archivos vía AGENTS.md.
- Para diseñar, modificar o revisar sitios de clientes o sus templates, aplicar
  la skill `diseno-ui`.
- Actualizar la sección pertinente de DOCS.md cuando cambie una decisión
  persistente; una conversación no reemplaza su registro.
- Ejecutar las verificaciones disponibles pertinentes antes de terminar y
  comunicar resultados o limitaciones, según DOCS.md.
- Nunca introducir secretos en archivos versionados.
