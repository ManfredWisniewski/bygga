# Intent: `bygga`

## Purpose

`bygga` is the generic WIT tool-frontend shell: a logic-free React + Vite +
TypeScript application wrapped by Tauri 2 so that one codebase deploys to
Web, Windows, macOS, Linux, Android and iOS. It consumes the shared design
system from `biti` (shadcn-format `ui/` components and DTCG token themes)
as a git submodule. New tools fork/copy this repository and add their
business logic on top.

State: in implementation — see `decisions.md` (D01–D09) and `tests.md` (A01–A06).

## Concepts

- **shell**: the Tauri 2 native wrapper plus the Vite web build it embeds.
- **biti submodule**: `biti/` pinned to a commit; provides `src/components/ui/*`
  (imported via the `@/` alias) and `tokens/` (DTCG tokens built with
  Terrazzo inside the submodule).
- **theme**: one biti token pair `<theme>-light.css` / `<theme>-dark.css`
  (`arr`, `manni`, `trurl`, `wit`, `wuttke`); `data-theme="dark"` on
  `<html>` selects dark, storage key `bygga.theme` (`system` default).
- **tool repository**: a repository created from bygga that implements one
  concrete tool.

## Scope

- In scope: monorepo layout (`apps/app`), Tauri 2 shell configuration,
  biti component and token wiring, WIT default stack (React Router,
  TanStack Query, react-i18next DE/EN, light/dark/system theme toggle),
  demo page proving the wiring, lint/typecheck/build/test commands.
- Out of scope: business logic, backends (an `apps/bff` may be added by a
  tool repository per `+wit/development/bestpractices/mobile-web-app.md`),
  authentication, store release signing, iOS/Android CI build lanes.

## Software projects

### Configuration

- Tauri: `apps/app/src-tauri/tauri.conf.json` — identifier `de.wit.bygga`,
  devUrl `http://localhost:5173`, frontendDist `../dist`.
- Aliases: `@/*` → `biti/src/*` (biti-internal imports resolve inside the
  submodule), `~/*` → `apps/app/src/*`.
- Theme: `<html data-theme>` = `light` | `dark`; choice stored in
  `localStorage["bygga.theme"]` = `system` (default) | `light` | `dark`;
  inline script in `index.html` applies it before first paint.

### Processing order

1. `pnpm --filter @bygga/app tokens` installs and runs the Terrazzo token
   build inside `biti/tokens` (its own npm package, output not committed).
2. `pnpm dev` runs the Vite dev server; `pnpm tauri dev` runs the desktop shell.
3. `pnpm build` produces `apps/app/dist`; `pnpm tauri build` wraps it.

### Main workflows

- **develop**: Vite dev server with HMR; biti source files under `biti/src`
  are compiled by the app's Vite/TS pipeline directly.
- **web deploy**: static hosting of `apps/app/dist` (base `./`).
- **desktop**: `pnpm tauri build` (Windows/macOS/Linux).
- **mobile**: `pnpm tauri android init|dev|build` (Android SDK required);
  `pnpm tauri ios init|dev|build` (macOS + Xcode required).

### Public functions

- `~/lib/theme.ts` — `resolveTheme()`, `applyTheme(choice)`,
  `initThemeListener()` per `+wit/design/bestpractices/design-tokens.md`.
- `~/i18n.ts` — react-i18next instance, resources `en` + `de`.
- `~/lib/query.ts` — TanStack Query client singleton.

### Data and file formats

- i18n resources: TypeScript objects in `~/i18n.ts` until a tool moves them
  to JSON; namespaces per tool.
- Token CSS: generated under `biti/tokens/build/css/` (git-ignored inside
  the submodule); the app imports `wit-light.css` + `wit-dark.css`.

### Safety and preservation

- `biti/` is read-only in this repository: component or token changes
  belong to commits in the biti repository; the submodule pin is bumped
  deliberately.
- `tokens/build` inside the submodule is regenerable output, never edited.

## Tests and verification

Acceptance criteria and test commands: `tests.md`.

## Non-goals and limitations

- No backend; tools add one under `apps/bff` if needed.
- iOS builds require macOS/Xcode; Android builds require Android SDK/JDK —
  neither is provisioned by this repository.
- biti component `ui/wit/wit-space.tsx` imports `next/font/local` and is
  excluded from app use until patched upstream.
- Biti's website markup contract (`tokens/shell.css`, site blocks) is not
  part of the app shell; only `ui/` components and token themes are consumed.

## Open items

Open tasks: `+team/+tasks/<persona>.md`. Unresolved design decisions:
`decisions.md`, section "Backlog".
