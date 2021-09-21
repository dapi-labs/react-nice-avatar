level?=patch

# Development
lint:
	@echo "Linting..."
	@npx eslint .
lint-fix:
	@echo "Fix linting..."
	@npx eslint --fix .
dev:
	@echo "Starting server..."
	@NODE_ENV=development npx webpack-dev-server --config ./webpack/demo.js --progress
.PHONY: lint lint-fix dev

# Test
test: lint-fix
	@echo "Running test..."
	@npx jest
.PHONY: test

# Deployment
build:
	@echo "Building lib..."
	@rm -rf ./dist
	@npx webpack --config ./webpack/production.js --progress --bail
	@echo "Copy type into dist..."
	@cp src/types.ts dist/index.d.ts
build-demo:
	@echo "Building demo..."
	@rm -rf ./demo/dist
	@NODE_ENV=production npx webpack --config ./webpack/demo.js --progress --bail
release:
	@echo "Release $(level)"
	@echo "Adding tag and modify the CHANGELOG"
	@npx standard-version --release-as $(level)
	@echo "Pushing to the github and trigger action for npm:publish"
	@git push --follow-tags origin main
.PHONY: build build-demo release
