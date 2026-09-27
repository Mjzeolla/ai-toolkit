# Changelog

This file records user-visible changes to the catalog and its developer tooling.
Versions follow semantic versioning.

## Unreleased

### Changed

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
- Replaced the Python pre-commit framework with Husky-managed pre-commit and pre-push
  hooks now that Node is a required repository runtime.

### Added

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
