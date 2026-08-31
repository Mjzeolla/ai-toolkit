SHELL := /usr/bin/env bash

.DEFAULT_GOAL := help

.PHONY: help setup check ci build validate lint markdown markdown-fix links typos shellcheck format format-check typecheck test hooks link-skills unlink-skills release-archive clean

ARCHIVE_DIR ?= dist
VERSION ?= dev

help: ## Show available commands
	@awk 'BEGIN {FS = ":.*## "; printf "Usage: make <target>\n\n"} /^[a-zA-Z0-9_.-]+:.*## / {printf "  %-18s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

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

link-skills: ## Link skills into supported local agent discovery directories
	./scripts/dev/link-skills

unlink-skills: ## Remove repository-owned links from supported agent directories
	./scripts/dev/link-skills --unlink

release-archive: check ## Build a distributable catalog archive
	mkdir -p "$(ARCHIVE_DIR)"
	tar \
		--exclude='.DS_Store' \
		--exclude='node_modules' \
		-czf "$(ARCHIVE_DIR)/MZeolla-$(VERSION).tar.gz" \
		skills plugins LICENSE README.md

clean: ## Remove generated output
	rm -rf dist coverage
