yarn: ## Installation des dépendances de package.json
	yarn install
.PHONY: yarn

start: ## Compilation des assets en mode dev
	yarn run dev-server
.PHONY: yarn-watch

yarn-watch: ## Compilation des assets en mode dev
	yarn run watch
.PHONY: yarn-watch

yarn-dev: ## Build des assets pour l'environnement de développement
	yarn run dev
.PHONY: yarn-dev

yarn-build: ## Build des assets pour l'environnement de production
	yarn run build
.PHONY: yarn-build

install: ## Installation du projet
	make yarn
	make yarn-dev
.PHONY: install

qa-eslint: ## Analyse du code avec ESLint
	yarn eslint assets
.PHONY: qa-eslint

qa-stylelint: ## Analyse du code avec StyleLint
	yarn stylelint assets/**/*.scss
.PHONY: qa-stylelint

qa: ## Analyse du code
	make qa-eslint
	make qa-stylelint
.PHONY: qa

fix-eslint: ## Correction automatique des erreurs de code avec ESLint
	yarn eslint assets --fix
.PHONY: fix-cs-fixer

fix-stylelint: ## Correction automatique des erreurs de code avec StyleLint
	yarn stylelint assets/**/*.scss --fix
.PHONY: fix-stylelint

fix: ## Correction automatique des erreurs de code
	make fix-eslint
	make fix-stylelint
.PHONY: fix

help: ## Show this help.
	@echo "Makefile"
	@echo "---------------------------"
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@grep -E '(^[a-zA-Z0-9_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'
.PHONY: help