# Changelog

All notable changes to this project are documented here. Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) (`+wit/common/conventions/changelog.md`); versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Generic WIT tool-frontend shell: `apps/app` (React 19 + Vite +
  TypeScript + Tailwind 4) wrapped by Tauri 2 (`de.wit.bygga`) targeting
  Web, Windows, macOS, Linux, Android and iOS (D02).
- `biti` git submodule at `biti/` consumed via the `@/` alias —
  shadcn-format `ui/` components and Terrazzo-built token themes, default
  theme `wit` (D04, D05).
- WIT default stack wiring: React Router (hash), TanStack Query,
  react-i18next (`en`/`de`), `data-theme` light/dark/system toggle with
  no-flash inline script (D06).
- pnpm monorepo root (`apps/*`, `packages/*`), `tsconfig.base.json`,
  Biome, `.nvmrc` Node 22 (D03, D07, D08).

## [<version>] - <YYYY-MM-DD>

### Added

### Changed

### Deprecated

### Removed

### Fixed

### Security
