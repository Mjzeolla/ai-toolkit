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

### Added

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
