# Changelog

This file records user-visible changes to the catalog and its developer tooling.
Versions follow semantic versioning.

## Unreleased

### Added

- Initial reusable skill catalog organized into building and productivity categories.
- Expanded building and productivity workflows, including task completion, autonomous
  execution, selective skill composition, and subagent coordination.
- Strict catalog validation, unit tests, formatting, linting, link checking, typo checking,
  secret scanning, and release automation.
- Mise-managed developer toolchain and scripts for local skill installation.
- Two-stage Lychee Git hooks for fast local-link validation at commit time and complete
  external-link validation before push.
- Explicit-only interaction and orchestration modes, an autonomous no-questions completion
  workflow, and safe Git worktree guidance for parallel tasks.
- Modular TypeScript catalog validation and complete local CI link checking.
- Harness-neutral skill linking for Agent Skills-compatible tools, Claude Code, and custom
  discovery directories.
