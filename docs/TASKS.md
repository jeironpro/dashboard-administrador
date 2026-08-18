# Plan de implementación por tarea — Nexo · Consola de administración

Modo de trabajo: **sin Jira** (sin identificador `ABC-123`). Se sigue el flujo
definido en la skill `dicresoft/TASK.md`: una rama por tarea → commit → PR →
squash merge contra `main` → borrar rama.

Convención de commit y título de PR: `<prefijo>/<categoría>: <mensaje>`.

## Tareas (en orden de dependencia)

| # | Rama | Tipo | Alcance |
|---|------|------|---------|
| 1 | `chore/scaffold` | chore | Base Vite + React + TS + yarn + Tailwind v4 + shadcn/ui + animejs, tokens `Cobalt` (OKLCH), libro de estilo, CI, pre-commit |
| 2 | `feature/capa-datos` | feature | `MOCK` JSON de datos reales + tipos + utilidades + primitivas shadcn/ui + hooks de animación animejs |
| 3 | `feature/layout` | feature | Shell de la consola: sidebar, topbar, command palette (⌘K) y enrutado |
| 4 | `feature/resumen` | feature | Resumen general: métricas, gráfico de actividad reciente y alertas |
| 5 | `feature/gestion-usuarios` | feature | Gestión de usuarios: tabla con búsqueda/filtro/paginación, CRUD y roles |
| 6 | `feature/gestion-contenido` | feature | Gestión de contenido: productos y artículos con estados de publicación |
| 7 | `feature/logs-auditoria` | feature | Logs y auditoría: acciones administrativas, errores y accesos fallidos |
| 8 | `feature/configuracion` | feature | Configuración: variables de entorno, integraciones y feature flags |
| 9 | `feature/salud-sistema` | feature | Monitoreo de salud: base de datos, recursos, servicios y colas de trabajo |
| 10 | `feature/reportes-exportacion` | feature | Reportes y exportación CSV/Excel + reportes programables |
| 11 | `chore/pulido-final` | chore | Verificación responsive (320/375/414/768), README y build final |

## Ciclo por tarea

1. `git checkout main && git pull --ff-only`
2. `git checkout -b <prefijo>/<categoría>`
3. Implementar.
4. `yarn typecheck` y `yarn build` (deben pasar).
5. `git add <archivos>` y commit con `<prefijo>/<categoría>: <mensaje>`.
6. `git push -u origin HEAD` y `gh pr create --base main`.
7. Verificar CI y `gh pr merge --squash --delete-branch`.

## Notas

- Sin CI previo: el PR `chore/scaffold` introduce `.github/workflows/ci.yml`.
- Los cambios no relacionados no se mezclan en una misma rama; se usa `git add`
  específico, nunca `git add -A` a ciegas.
