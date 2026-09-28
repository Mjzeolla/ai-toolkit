# Changelog

This file records user-visible changes to the catalog and its developer tooling.
Versions follow semantic versioning.

## Unreleased

### Changed

- Routed agent-tool selection and optional RTK output compaction through relevant completion,
  exploration, planning, review, debugging, monitoring, initialization, and documentation skills.
- Converted the repository from a category-nested skill catalog with manual symlink
  installation into a plugin marketplace with a `core-skills` package and directly
  discoverable plugin-owned skills.
- Added a repository marketplace entry for plugin-native installation from GitHub.
- Updated validation, tests, documentation, and release archives around the plugin as the
  single installation boundary.
- Documented complete plugin lifecycle commands for Codex, Claude Code, Grok Build, and
  GitHub Copilot CLI.
- Added parameterized Make targets for common marketplace and plugin lifecycle operations.
- Documented direct per-skill installation and lifecycle commands through the cross-agent
  `npx skills` CLI.
- Documented Archify as an optional external integration and clarified cross-plugin skill
  reference and fallback conventions.
- Reorganized and expanded documentation around installation, composition, authoring,
  integrations, repository structure, development, and validation.
- Replaced the Python pre-commit framework with Husky-managed pre-commit and pre-push
  hooks now that Node is a required repository runtime.

### Added

- Integration documentation for RTK installation, identity verification, Codex hook scope,
  trust boundaries, lifecycle ownership, and raw-command fallbacks, plus an integrations index.
- Documentation authoring guidance for tutorials, how-to guides, reference, explanation,
  decision records, runbooks, repository navigation, evidence, validation, and architecture
  diagram handoffs.
- Documentation-specific codebase organization guidance for repository docs, documentation
  sites, knowledge bases, architecture artifacts, generated reference, and route migrations.
- Expanded Git worktree guidance with lifecycle, repair, cleanup, and parallel-isolation
  references, and routed one-shot and autonomous task workflows through it when isolation helps.
- RTK workflow guidance with explicit raw-output fallbacks, command selection, and authorization
  boundaries, plus a decision skill for focused coding-agent helpers.
- Language-specific test-writing guidance for TypeScript/React, Python, and Go, with folder-first
  shared test support, configuration ownership, fixtures, builders, fakes, and suite layering.
- Repository initialization guidance with shared standards and focused profiles for TypeScript
  web apps, Node.js services and libraries, Python services, Go services, and monorepos.
- Stack-aware recommendations for Mise, package management, formatting, linting, Git hooks,
  validation, and commonly useful dependencies without forcing unused tooling.
- Expanded React initialization guidance for CVA, including when it complements `clsx` and
  `tailwind-merge` and when its variant abstraction is unnecessary.
- Added testing, CI/CD, and repository scripting-layer guidance; expanded Python toolchain choices
  and practical Go package recommendations for validation, persistence, configuration, and tests.
- Added folder-first scripting-layer guidance to codebase organization, including setup, CI,
  development, release, migration, and operations ownership.
- Architecture diagramming workflow with format-specific draw.io and Archify guidance.
- Codebase organization profiles for React, Node.js, Python, and multi-application
  repositories, using concern folders instead of flat domain or shared-file dumps.
- Search-before-implementation guidance for code reuse and safe deduplication.
- Bounded monitoring guidance for commands, CI checks, reviews, and delegated jobs.
- Initial reusable skill catalog organized into building and productivity categories.
- Expanded building and productivity workflows, including task completion, autonomous
  execution, selective skill composition, and subagent coordination.
- Strict catalog validation, unit tests, formatting, linting, link checking, typo checking,
  secret scanning, and release automation.
- Mise-managed developer toolchain.
- Two-stage Lychee Git hooks for fast local-link validation at commit time and complete
  external-link validation before push.
- Explicit-only interaction and orchestration modes, an autonomous no-questions completion
  workflow, and safe Git worktree guidance for parallel tasks.
- Modular TypeScript catalog validation and complete local CI link checking.
