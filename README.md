# bygga

`bygga` is the generic WIT tool-frontend shell: one React + Vite +
TypeScript codebase wrapped by Tauri 2 that deploys to Web, Windows,
macOS, Linux, Android and iOS, rendering the shared `biti` design system
(components + design tokens). Fork it to build a WIT tool — the shell
contains no business logic.

## AI folders

Before making changes, read the shared WIT development guidance in
`+wit/development/` in this repository. Start with
`+wit/development/README.md` and `+wit/development/AGENTS.md`, then read
the relevant convention or best-practice files. These shared definitions
apply independently of which skill or AI agent is performing the work.

- `+intent/` — intent, decisions and acceptance criteria for this project.
- `+wit/` — submodule: definitions shared by all WIT projects.
- `+wit-agents/` — submodule: shared agent rules and skill sources.

## Layout

- `apps/app/` — the app: Vite + React 19 + TypeScript, Tauri 2 shell in
  `src-tauri/` (identifier `de.wit.bygga`).
- `biti/` — submodule: shadcn-format `ui/` components (imported via the
  `@/` alias) and DTCG tokens (`tokens/`).
- `packages/` — reserved for shared libraries (WIT monorepo convention).
- `+intent/`, `+team/` — intent/decisions/tests and persona task files.

## Setup

```powershell
git submodule update --init
pnpm install
pnpm --filter @bygga/app tokens   # Terrazzo build inside biti/tokens
```

Requires Node LTS (`.nvmrc` = 22), pnpm and — for native builds — Rust
plus the platform toolchain (MSVC/WebView2 on Windows; Android SDK for
`tauri android`; Xcode on macOS for `tauri ios`).

### Windows toolchain (Tauri)

Tauri needs MSVC on Windows (admin PowerShell, once):

```powershell
winget install Microsoft.VisualStudio.2022.BuildTools --override "--add Microsoft.VisualStudio.Workload.VCTools --includeRecommended --passive --norestart" --accept-package-agreements --accept-source-agreements
rustup target add x86_64-pc-windows-msvc
rustup override set stable-x86_64-pc-windows-msvc   # scoped to this repo
```

Without MSVC, `cargo check` and `cargo test --lib` still work on the
`windows-gnu` toolchain, but `tauri dev`/`tauri build` cannot link the
app (GNU `ld` hits its export limit). WebView2 ships with Windows 10/11.

## Run

```powershell
pnpm dev                              # Vite dev server (web)
pnpm --filter @bygga/app tauri dev    # desktop window
pnpm --filter @bygga/app tauri build  # native bundles
```

## Conventions

- `@/*` resolves into `biti/src` (components, `utilities/ui`); app code
  uses `~/*` for `apps/app/src`.
- Theme: `data-theme="light|dark"` on `<html>`, choice `system` default,
  storage key `bygga.theme`.
- i18n via react-i18next, `en` + `de`, key `bygga.language`.
- Tests/lint/build commands: `AGENTS.md`.
