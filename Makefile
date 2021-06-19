# Development
lint:
	@echo "Linting..."
	@npx eslint .
lint-fix:
	@echo "Fix linting..."
	@npx eslint --fix .
dev:
	@echo "Start server..."
	@NODE_ENV=development npx rollup -c rollup.config.demo.js -w
.PHONY: lint lint-fix dev

# Deployment
build:
	@echo "Building lib..."
	@rm -rf ./dist
	@npx rollup -c rollup.config.js
	@echo "Copy type into dist..."
	@cp react-nice-avatar.d.ts dist/react-nice-avatar.d.ts
build-demo:
	@echo "Building demo..."
	@rm -rf ./demo/dist
	@NODE_ENV=production npx rollup -c rollup.config.demo.js
.PHONY: build build-demo
