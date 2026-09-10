# Agent instructions

These instructions apply to the entire repository.

## Mission

Maintain a portable, reviewable marketplace of AI coding-agent plugins. Prefer bounded
assets with clear activation criteria over large universal instruction sets.

## Before changing an asset

- Read `CONTEXT.md` and the relevant guide under `docs/`.
- Inspect the complete target skill or plugin before editing it.
- Preserve user authorization boundaries and repository-local conventions.
- Never copy third-party prose. Learn from public conventions, then author original work.

## Structure

- Put skills in `plugins/<plugin-name>/skills/<skill-name>/` so each plugin owns everything
  it installs.
- Keep a skill self-contained. Required instructions must not live in a sibling skill.
- Keep each portable manifest at `plugins/<plugin-name>/plugin.json` and its Claude Code
  compatibility manifest at `plugins/<plugin-name>/.claude-plugin/plugin.json`.
- Add deterministic repository tooling under `scripts/ci`, `scripts/dev`, or
  `scripts/setup`, according to who invokes it.
- Add deterministic TypeScript validation to `src/` and cover it under `test/`.

## Quality and safety

- Skill descriptions must distinguish when the skill should and should not activate.
- Instructions should add decisions, invariants, or workflows an already capable agent
  would not reliably infer.
- Keep examples free of secrets, personal data, and environment-specific credentials.
- Avoid destructive commands in helpers unless the caller explicitly opts in and the
  target is validated.
- Do not weaken validation to make a failing asset pass; fix the asset or document a
  narrow, justified exception.

## Validation

Run `make check` for normal edits and `make ci` before completion. Run `make links` when
Markdown links change and network access is available. New shell scripts must be
executable and pass ShellCheck.

## Git and delivery

Do not stage, commit, push, tag, publish, install, or overwrite local agent assets unless
the user explicitly requests that action. Preserve unrelated worktree changes. Update
`CHANGELOG.md` for user-visible plugin or installation changes.
