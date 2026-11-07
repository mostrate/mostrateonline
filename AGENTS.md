# Codex — Mostrate

Leer [DOCS.md](DOCS.md) antes de cambios arquitectónicos, en particular la
sección 14, **Arquitectura y colaboración**. [README.md](README.md) es la entrada
breve al proyecto.

- Usar el código y la documentación versionada como fuentes de verdad, con el
  orden de autoridad definido en DOCS.md. Verificar las afirmaciones contra el repo.
- No introducir capas, dependencias o abstracciones sin una necesidad concreta;
  aplicar los principios comunes de DOCS.md.
- Preservar la interoperabilidad con Claude Code y las skills de `.claude/skills/`;
  coordinar mediante Git sin duplicar convenciones por proveedor.
- Para diseñar, modificar o revisar interfaces de sitios de clientes o sus
  templates, leer y aplicar
  [`.claude/skills/diseno-ui/SKILL.md`](.claude/skills/diseno-ui/SKILL.md).
- Actualizar ramas con `git rebase origin/main` (nunca mergear `main` en la
  rama) y publicar con `git push --force-with-lease`; los PR se integran con
  "Rebase and merge". Ver DOCS.md, sección 14.
- Al escribir o revisar tests, seguir el procedimiento de
  [`.claude/agents/testing-coverage.md`](.claude/agents/testing-coverage.md)
  (el frontmatter es específico de Claude Code; el cuerpo aplica igual).
- Actualizar la sección pertinente de DOCS.md cuando cambie una decisión
  persistente; una conversación no reemplaza su registro.
- Ejecutar las verificaciones disponibles pertinentes antes de terminar y
  comunicar resultados o limitaciones, según DOCS.md.
- Nunca introducir secretos en archivos versionados.
