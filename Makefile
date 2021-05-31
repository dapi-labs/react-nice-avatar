NODE_BIN = ./node_modules/.bin

# Development
lint:
	@echo "Linting..."
	@$(NODE_BIN)/eslint .
lint-fix:
	@echo "Fix linting..."
	@$(NODE_BIN)/eslint --fix .
dev:
	@echo "Start server..."
	@NODE_ENV=development $(NODE_BIN)/rollup -c rollup.config.demo.js -w
.PHONY: lint lint-fix dev

# Deployment
build:
	@echo "Building lib..."
	@rm -rf ./dist
	@$(NODE_BIN)/rollup -c rollup.config.js
	@echo "Copy type into dist..."
	@cp react-nice-avatar.d.ts dist/react-nice-avatar.d.ts
	@make build-demo
build-demo:
	@echo "Building demo..."
	@rm -rf ./demo/dist
	@NODE_ENV=production $(NODE_BIN)/rollup -c rollup.config.demo.js
.PHONY: build build-demo
