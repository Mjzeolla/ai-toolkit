SHELL := /usr/bin/env bash

.DEFAULT_GOAL := help

.PHONY: help setup check ci build validate lint markdown markdown-fix links typos shellcheck format format-check typecheck test hooks plugin-marketplace-add plugin-marketplace-list plugin-install plugin-list plugin-update plugin-uninstall plugin-marketplace-remove release-archive clean

ARCHIVE_DIR ?= dist
VERSION ?= dev
PLUGIN_AGENT ?= codex
PLUGIN_NAME ?= core-skills
MARKETPLACE_NAME ?= mzeolla-ai-toolkit
MARKETPLACE_SOURCE ?= Mjzeolla/ai-toolkit
PLUGIN_SELECTOR := $(PLUGIN_NAME)@$(MARKETPLACE_NAME)

help: ## Show available commands
	@awk 'BEGIN {FS = ":.*## "; printf "Usage: make <target>\n\n"} /^[a-zA-Z0-9_.-]+:.*## / {printf "  %-26s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

setup: ## Install pinned dependencies and repository Git hooks
	./scripts/setup/repository

check: ## Run every required repository validation
	mise exec -- pnpm check

ci: ## Run the full local equivalent of continuous integration
	./scripts/ci/check

build: ## Compile the TypeScript catalog tooling
	mise exec -- pnpm build

validate: ## Validate skills, plugin manifests, metadata, and local links
	mise exec -- pnpm validate

lint: ## Run ESLint
	mise exec -- pnpm lint

markdown: ## Check Markdown structure and style
	mise exec -- pnpm markdown:check

markdown-fix: ## Apply safe Markdown formatting fixes
	mise exec -- pnpm markdown:fix

links: ## Check repository links with Lychee
	./scripts/ci/check-links

typos: ## Check maintained files for spelling mistakes
	./scripts/ci/check-typos

shellcheck: ## Validate repository shell scripts
	./scripts/ci/check-shell

format: ## Format maintained text and source files
	mise exec -- pnpm format

format-check: ## Check formatting without changing files
	mise exec -- pnpm format:check

typecheck: ## Run strict TypeScript checking
	mise exec -- pnpm typecheck

test: ## Run validator unit tests
	mise exec -- pnpm test

hooks: ## Install the versioned pre-commit and pre-push hooks
	mise exec -- pre-commit install --hook-type pre-commit --hook-type pre-push

plugin-marketplace-add: ## Add the marketplace for PLUGIN_AGENT
	@case "$(PLUGIN_AGENT)" in \
		codex) codex plugin marketplace add "$(MARKETPLACE_SOURCE)" ;; \
		claude) claude plugin marketplace add "$(MARKETPLACE_SOURCE)" ;; \
		grok) grok plugin marketplace add "$(MARKETPLACE_SOURCE)" ;; \
		copilot) copilot plugin marketplace add "$(MARKETPLACE_SOURCE)" ;; \
		*) echo "Unsupported PLUGIN_AGENT: $(PLUGIN_AGENT)" >&2; exit 2 ;; \
	esac

plugin-marketplace-list: ## List marketplaces for PLUGIN_AGENT
	@case "$(PLUGIN_AGENT)" in \
		codex) codex plugin marketplace list ;; \
		claude) claude plugin marketplace list ;; \
		grok) grok plugin marketplace list ;; \
		copilot) copilot plugin marketplace list ;; \
		*) echo "Unsupported PLUGIN_AGENT: $(PLUGIN_AGENT)" >&2; exit 2 ;; \
	esac

plugin-install: ## Install PLUGIN_NAME for PLUGIN_AGENT
	@case "$(PLUGIN_AGENT)" in \
		codex) codex plugin add "$(PLUGIN_SELECTOR)" ;; \
		claude) claude plugin install "$(PLUGIN_SELECTOR)" ;; \
		grok) grok plugin install "$(PLUGIN_NAME)" --trust && grok plugin enable "$(PLUGIN_NAME)" ;; \
		copilot) copilot plugin install "$(PLUGIN_SELECTOR)" ;; \
		*) echo "Unsupported PLUGIN_AGENT: $(PLUGIN_AGENT)" >&2; exit 2 ;; \
	esac

plugin-list: ## List plugins for PLUGIN_AGENT
	@case "$(PLUGIN_AGENT)" in \
		codex) codex plugin list --available --json ;; \
		claude) claude plugin list ;; \
		grok) grok plugin list --json ;; \
		copilot) copilot plugin list ;; \
		*) echo "Unsupported PLUGIN_AGENT: $(PLUGIN_AGENT)" >&2; exit 2 ;; \
	esac

plugin-update: ## Refresh and update PLUGIN_NAME for PLUGIN_AGENT
	@case "$(PLUGIN_AGENT)" in \
		codex) codex plugin marketplace upgrade "$(MARKETPLACE_NAME)" && codex plugin remove "$(PLUGIN_SELECTOR)" && codex plugin add "$(PLUGIN_SELECTOR)" ;; \
		claude) claude plugin marketplace update "$(MARKETPLACE_NAME)" && claude plugin update "$(PLUGIN_SELECTOR)" ;; \
		grok) grok plugin marketplace update "$(MARKETPLACE_NAME)" && grok plugin update "$(PLUGIN_NAME)" ;; \
		copilot) copilot plugin marketplace update "$(MARKETPLACE_NAME)" && copilot plugin update "$(PLUGIN_NAME)" ;; \
		*) echo "Unsupported PLUGIN_AGENT: $(PLUGIN_AGENT)" >&2; exit 2 ;; \
	esac

plugin-uninstall: ## Uninstall PLUGIN_NAME for PLUGIN_AGENT
	@case "$(PLUGIN_AGENT)" in \
		codex) codex plugin remove "$(PLUGIN_SELECTOR)" ;; \
		claude) claude plugin uninstall "$(PLUGIN_SELECTOR)" ;; \
		grok) grok plugin uninstall "$(PLUGIN_NAME)" --confirm ;; \
		copilot) copilot plugin uninstall "$(PLUGIN_NAME)" ;; \
		*) echo "Unsupported PLUGIN_AGENT: $(PLUGIN_AGENT)" >&2; exit 2 ;; \
	esac

plugin-marketplace-remove: ## Remove the marketplace for PLUGIN_AGENT
	@case "$(PLUGIN_AGENT)" in \
		codex) codex plugin marketplace remove "$(MARKETPLACE_NAME)" ;; \
		claude) claude plugin marketplace remove "$(MARKETPLACE_NAME)" ;; \
		grok) grok plugin marketplace remove "https://github.com/$(MARKETPLACE_SOURCE).git" ;; \
		copilot) copilot plugin marketplace remove "$(MARKETPLACE_NAME)" ;; \
		*) echo "Unsupported PLUGIN_AGENT: $(PLUGIN_AGENT)" >&2; exit 2 ;; \
	esac

release-archive: check ## Build a distributable Agent Plugin archive
	mkdir -p "$(ARCHIVE_DIR)"
	tar \
		--exclude='.DS_Store' \
		--exclude='node_modules' \
		-czf "$(ARCHIVE_DIR)/MZeolla-$(VERSION).tar.gz" \
		.agents .claude-plugin plugins LICENSE README.md

clean: ## Remove generated output
	rm -rf dist coverage
