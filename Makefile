.PHONY: install tokens dev build test typecheck lint

install:
	pnpm install
	git submodule update --init

tokens:
	pnpm --filter @bygga/app tokens

dev:
	pnpm --filter @bygga/app dev --open

build:
	pnpm -r build

test:
	pnpm -r test

typecheck:
	pnpm -r typecheck

lint:
	pnpm lint
	npx markdownlint-cli2 "**/*.md"
