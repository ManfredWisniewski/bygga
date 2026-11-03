# Instructions for AI agents

This repository is `bygga` — the generic WIT tool-frontend shell
(React + Vite + TypeScript + Tauri 2, consuming `biti` components and
tokens via a git submodule). Read `+wit/development/README.md`,
`+wit/development/AGENTS.md` and `+intent/` before making changes.

## Rules

The shared rules in `+wit/AGENTS.md` (*Shared rules* section) apply.
Additionally:

- `biti/` is a read-only submodule: component or token changes belong to
  the biti repository; here only the pin (gitlink) is bumped.
- The root `package.json` `dependencies` block is deliberately the
  biti-component dependency set — submodule sources resolve them via Node
  resolution walking up to `node_modules/`. Keep app-only deps in
  `apps/app`; keep this set aligned with `biti/src/components/ui` imports.
- `@/*` imports resolve into `biti/src/*`; app code uses `~/*` or relative
  imports. `ui/wit/wit-space.tsx` imports `next/font` — do not import it.
- Token CSS is generated inside the submodule (`pnpm --filter @bygga/app
  tokens`); it is git-ignored upstream and must be rebuilt after changing
  the pin.

## Commands

```text
install:  pnpm install            (then: git submodule update --init)
tokens:   pnpm --filter @bygga/app tokens
dev:      pnpm dev                (web)  |  pnpm --filter @bygga/app tauri dev   (desktop)
build:    pnpm -r build           |  pnpm --filter @bygga/app tauri build  (native)
test:     pnpm -r test
typecheck: pnpm -r typecheck
lint:     pnpm lint  &&  npx markdownlint-cli2 "**/*.md"
```
