.PHONY: dev build build-demo test test-watch coverage check check-fix lint lint-fix typecheck

# Development
dev:
	npm run dev

# Testing
test:
	npm test

test-watch:
	npm run test:watch

coverage:
	npm run test:coverage

# Linting, Formatting & Types (Vite+ / Oxlint / Oxfmt)
check:
	npm run check

check-fix:
	npm run check:fix

lint:
	npm run lint

lint-fix:
	npm run lint:fix

typecheck:
	npm run typecheck

# Build
build:
	npm run build

build-demo:
	npm run build:demo
