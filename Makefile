NODE_BIN = ./node_modules/.bin

# Development
lint:
	@echo "Linting..."
	@$(NODE_BIN)/eslint .
lint-fix:
	@echo "Fix linting..."
	@$(NODE_BIN)/eslint --fix .
.PHONY: lint lint-fix

# Deployment
build:
	@echo "Building..."
	@rm -rf ./dist
	@$(NODE_BIN)/rollup -c

.PHONY: build
