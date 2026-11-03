# Tests and acceptance criteria — `bygga`

*Format per `+wit/development/bestpractices/tests.md`. Criteria are numbered `A01`, `A02`, ... and never renumbered.*

## Commands

```text
test:   pnpm -r test
typecheck: pnpm -r typecheck
build:  pnpm -r build
lint:   pnpm lint  &&  npx markdownlint-cli2 "**/*.md"
tokens: pnpm --filter @bygga/app tokens
dev:    pnpm --filter @bygga/app dev   (web)  |  pnpm --filter @bygga/app tauri dev   (desktop)
```

## Acceptance criteria

### A01 Repository structure

- `README.md`, `AGENTS.md`, `+team/+tasks/README.md`, `+team/+tasks/backlog.md`, `+intent/{intent,decisions,tests}.md`, `.gitignore` and `.markdownlint-cli2.jsonc` exist at the root.
- The branches and submodules required by `+wit/common/conventions/repo-setup.md` exist.
- `pnpm-workspace.yaml`, `tsconfig.base.json`, `biome.json`, `.nvmrc` (Node LTS) exist at the root; `biti` is a registered submodule at `biti/`.

### A02 App builds

- `pnpm install && pnpm --filter @bygga/app tokens && pnpm -r typecheck && pnpm -r build` succeed from a clean clone.
- `apps/app/dist` is produced and loadable as a static site (base `./`).

### A03 biti wiring

- The demo page renders at least three biti `ui/` components (e.g. Button, Card, Tabs) without missing styles.
- Token CSS variables (`--colors-brand-primary-*`, `--typography-*`) resolve in the built app.
- `wit-space.tsx` is not imported anywhere in the app.

### A04 Theming

- `data-theme="dark"` switches both the shadcn semantic palette and the biti token values; `system` follows `prefers-color-scheme` live.
- No theme flash on load: `data-theme` is set by an inline script before first paint; choice persists under `bygga.theme`.

### A05 i18n and routing

- UI strings render in `de` and `en` via react-i18next; at least one route beyond `/` exists via React Router.

### A06 Tauri shell

- `src-tauri/tauri.conf.json` has identifier `de.wit.bygga` and `pnpm tauri build` succeeds on Windows.

## Not tested

- Android and iOS builds (require Android SDK and macOS/Xcode respectively); only the Tauri configuration is committed.
- Native window behaviour beyond `tauri build` succeeding.
- biti website markup contract (`shell.css`) — not part of the app shell.
