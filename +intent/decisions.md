# Decision records — `bygga`

*Session date: 2026-11-03. Format per `+wit/common/conventions/decisions.md`; requirement levels per `+wit/common/specifications.md`.*

## Template source

- **D01 Initialised as a development project with `+wit/scripts/init-repo`** from the `+wit` templates (revision `946a196`, 2026-11-03). The copied files are point-in-time and owned by this project (wit-templates D03).

## Platform & stack

- **D02 Tauri 2 as the single shell for desktop and mobile** (alternatives: Capacitor per `+wit/development/bestpractices/mobile-web-app.md` plus a separate desktop shell; Electron + Capacitor; pywebview like `hulid`). The WIT reference covers web + Android/iOS but not desktop; Tauri 2 wraps the same Vite build for Windows/macOS/Linux/Android/iOS, so one shell covers every target a WIT tool needs. The mobile-web-app reference is a SHOULD — this decision records the deliberate deviation; its BFF, auth and topology guidance still applies unchanged.
- **D03 Monorepo layout: `apps/app` + pnpm workspaces** (alternatives: flat single app). Matches `+wit/development/bestpractices/typescript-node.md`; leaves room for `apps/bff` and `packages/*` in tools spawned from this template.
- **D04 biti is consumed as a git submodule mounted at `biti/`** (alternatives: vendored copy of `src/components/ui` + tokens; npm package — biti is not published). Single source of truth, version-pinned; components are compiled by the app's pipeline via the `@` alias → `biti/src`. Consequence: `biti/tokens/build` is generated and never committed upstream, so the app MUST run the Terrazzo build inside the submodule (`pnpm --filter @bygga/app tokens`) before the token CSS exists.
- **D05 UI components and tokens come from biti** (alternatives: per-app headless components + own token CSS per `mobile-web-app.md`; Ionic). Requirement from the owner: tools must render the shared WIT design system. The app imports biti's `globals.css` model (shadcn semantic vars + `@theme inline` mapping) and one token theme pair; default theme `wit`, switchable to `arr`/`manni`/`trurl`/`wuttke`.
- **D06 App stack: React 19 + Vite + TypeScript, React Router, TanStack Query, react-i18next (DE + EN), `data-theme` light/dark/system** — the WIT mobile-web-app defaults, wired so spawned tools start from working conventions. `bygga.theme` is the storage key.

## Tooling

- **D07 Biome for lint/format, `tsc --noEmit` for typecheck, Vitest for unit tests** per `typescript-node.md`; markdownlint for docs. Tauri's `src-tauri` Rust code follows upstream `cargo fmt`/`clippy` defaults.
- **D08 Node baseline is the current LTS (`.nvmrc` = 22)** although the development machine runs Node 23 — odd releases MUST NOT be the baseline (`typescript-node.md`).
- **D09 Identifiers**: npm scope `@bygga/*`, Tauri identifier `de.wit.bygga`, custom scheme `bygga://`, storage keys `bygga.*` — per `+wit/common/conventions/filenames.md`.

## Backlog (not decided, parked)

- Whether spawned tools should consume bygga via git submodule, template copy, or a scaffolding script.
- BFF addition path and auth (OIDC PKCE per `mobile-web-app.md`) when a tool needs server-side credentials.
- Release signing and CI lanes for Windows installers, AAB and iOS.
- Which biti token theme each spawned tool defaults to; multi-theme switching at runtime.
