# MZeolla AI Toolkit

A portable marketplace of focused engineering and productivity skills for capable AI
coding agents. Skills are small enough to review, plugins provide versioned installation
boundaries, and repository tooling validates structure, metadata, references, and releases.

## Quick start

Install the complete `core-skills` plugin. This is the recommended setup because every
internal skill reference is then available when a workflow needs it.

```bash
codex plugin marketplace add Mjzeolla/ai-toolkit
codex plugin add core-skills@mzeolla-ai-toolkit
```

Start a new session after installation or update so the runtime discovers the current
catalog. Claude Code, Grok Build, GitHub Copilot CLI, Make wrappers, selective `npx skills`
installation, updates, and removal are documented in the
[installation guide](docs/getting-started/installation.md).

### Distributor commands

Use the commands for your coding agent. Each example covers marketplace registration,
installation, inspection, update, and removal.

#### Codex

```bash
# Add the marketplace and install the plugin
codex plugin marketplace add Mjzeolla/ai-toolkit
codex plugin add core-skills@mzeolla-ai-toolkit

# Inspect the installation
codex plugin marketplace list
codex plugin list --available --json

# Refresh the marketplace and reinstall the current plugin release
codex plugin marketplace upgrade mzeolla-ai-toolkit
codex plugin remove core-skills@mzeolla-ai-toolkit
codex plugin add core-skills@mzeolla-ai-toolkit

# Remove the plugin and marketplace
codex plugin remove core-skills@mzeolla-ai-toolkit
codex plugin marketplace remove mzeolla-ai-toolkit
```

#### Claude Code

```bash
# Add the marketplace and install the plugin
claude plugin marketplace add Mjzeolla/ai-toolkit
claude plugin install core-skills@mzeolla-ai-toolkit

# Inspect and update the installation
claude plugin marketplace list
claude plugin list
claude plugin marketplace update mzeolla-ai-toolkit
claude plugin update core-skills@mzeolla-ai-toolkit

# Remove the plugin and marketplace
claude plugin uninstall core-skills@mzeolla-ai-toolkit
claude plugin marketplace remove mzeolla-ai-toolkit
```

#### Grok Build

Review the trust prompt before using `--trust`.

```bash
# Add the marketplace, install the plugin, and enable it
grok plugin marketplace add Mjzeolla/ai-toolkit
grok plugin install core-skills --trust
grok plugin enable core-skills

# Inspect and update the installation
grok plugin marketplace list
grok plugin list --json
grok plugin marketplace update mzeolla-ai-toolkit
grok plugin update core-skills

# Remove the plugin and marketplace
grok plugin disable core-skills
grok plugin uninstall core-skills --confirm
grok plugin marketplace remove https://github.com/Mjzeolla/ai-toolkit.git
```

#### GitHub Copilot CLI

```bash
# Add and browse the marketplace, then install the plugin
copilot plugin marketplace add Mjzeolla/ai-toolkit
copilot plugin marketplace browse mzeolla-ai-toolkit
copilot plugin install core-skills@mzeolla-ai-toolkit

# Inspect and update the installation
copilot plugin marketplace list
copilot plugin list
copilot plugin marketplace update mzeolla-ai-toolkit
copilot plugin update core-skills

# Remove the plugin and marketplace
copilot plugin uninstall core-skills
copilot plugin marketplace remove mzeolla-ai-toolkit
```

The equivalent repository wrappers use Codex by default. Select another distributor with
`PLUGIN_AGENT=claude`, `PLUGIN_AGENT=grok`, or `PLUGIN_AGENT=copilot`.

```bash
make plugin-marketplace-add PLUGIN_AGENT=codex
make plugin-install PLUGIN_AGENT=codex
make plugin-marketplace-list PLUGIN_AGENT=codex
make plugin-list PLUGIN_AGENT=codex
make plugin-update PLUGIN_AGENT=codex
make plugin-uninstall PLUGIN_AGENT=codex
make plugin-marketplace-remove PLUGIN_AGENT=codex
```

## What should be installed?

For normal use, install the entire plugin. Internal dollar-prefixed skill references are
conditional routing—not hidden package imports—but full installation preserves every
specialized handoff.

Selective installation is supported for constrained environments. Recommended companion
sets include:

| Goal                     | Start with                                         | Useful companions                                                                                                         |
| ------------------------ | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Start a repository       | `initialize-repository`                            | `organize-codebase`, `production-ready`, `test-writing`                                                                   |
| Implement changes        | `task-completion`, `autonomous-loop`               | `explore-codebase`, `reuse-code`, `implementation-planning`, `test-writing`, `systematic-debugging`, `raise-pull-request` |
| Review changes           | `code-review`, `change-review`                     | `data-model`, `security-audit`, `test-writing`                                                                            |
| Improve architecture     | `improve-architecture`, `architecture-diagramming` | `explore-codebase`, `organize-codebase`, `migration-planning`, `production-ready`                                         |
| Create documentation     | `author-documentation`, `maintain-wiki`            | `organize-codebase`, `architecture-diagramming`, `primary-source-research`, `raise-pull-request`                          |
| Coordinate parallel work | `subagent-coordination`, `git-worktrees`           | `task-completion`, `babysit-jobs`                                                                                         |
| Improve agent tooling    | `select-agent-tooling`                             | `use-rtk`, `primary-source-research`, `explore-codebase`                                                                  |

These companions are recommendations, not automatically installed dependencies. See
[Skill composition and installation profiles](docs/concepts/skill-composition.md) for the
complete model and additional profiles.

Archify and RTK are optional external capabilities that remain separately installed and
versioned. See the [integration guides](docs/integrations/README.md) for trust, setup, and
fallback behavior.

## Catalog

### Building

| Skill                        | Use it when                                                       |
| ---------------------------- | ----------------------------------------------------------------- |
| `architecture-diagramming`   | System relationships need a clear, editable visual                |
| `author-documentation`       | Technical guidance needs accurate, maintainable reader structure  |
| `authoring-skills`           | A reusable agent capability needs deliberate design               |
| `autonomous-loop`            | Work should iterate autonomously toward a bounded outcome         |
| `babysit-jobs`               | Existing commands, checks, or reviews need terminal monitoring    |
| `change-review`              | Any concrete change needs evidence-backed defect analysis         |
| `code-review`                | Code needs actionable correctness and security review             |
| `data-model`                 | Persistent entities, invariants, and access patterns need design  |
| `dependency-upgrade`         | A package upgrade needs compatibility and regression control      |
| `enforce-structure`          | Repository layout rules need deterministic enforcement            |
| `explore-codebase`           | An unfamiliar codebase must be mapped before acting               |
| `git-worktrees`              | Concurrent branches need isolated working directories             |
| `implementation-planning`    | A repository-grounded request needs an executable change plan     |
| `initialize-repository`      | A repository needs a modern stack-specific foundation             |
| `improve-architecture`       | Software boundaries or coupling need deliberate redesign          |
| `maintain-wiki`              | Personal knowledge must be organized, linked, and validated       |
| `migration-planning`         | A transition needs staged compatibility and recovery              |
| `organize-codebase`          | Application folders need coherent ownership and boundaries        |
| `performance-analysis`       | Latency, throughput, or capacity needs measurement                |
| `production-ready`           | A workload needs an evidence-based operational readiness review   |
| `red-green-testing`          | A behavior change benefits from proving the test fails first      |
| `raise-pull-request`         | Completed work needs a user-authored, review-ready pull request   |
| `reuse-code`                 | Existing code should be found before adding or duplicating it     |
| `security-audit`             | A defined surface needs an authorized security assessment         |
| `subagent-coordination`      | Independent workstreams can be delegated safely                   |
| `systematic-debugging`       | A failure must be reproduced and isolated before repair           |
| `task-completion`            | A substantial engineering task needs selective skill chaining     |
| `task-completion-autonomous` | A delegated task must finish without clarification prompts        |
| `test-writing`               | Behavior or regressions need durable automated coverage           |
| `use-rtk`                    | Supported shell output should be compacted without losing control |
| `select-agent-tooling`       | A demonstrated agent-workflow bottleneck needs a focused helper   |

### Productivity

| Skill                     | Use it when                                                    |
| ------------------------- | -------------------------------------------------------------- |
| `ask-me`                  | The user wants a focused question-driven exchange              |
| `brief-mode`              | Only the outcome and essential supporting detail are needed    |
| `clarify-requirements`    | Ambiguity would materially change the requested outcome        |
| `decision-interview`      | A consequential choice needs criteria and tradeoff discovery   |
| `handoff-summary`         | Another person or agent must resume without rediscovery        |
| `meeting-to-actions`      | Notes must become decisions, owners, and follow-through        |
| `primary-source-research` | Current technical claims need authoritative evidence and links |
| `to-ticket`               | A request or decision must become implementation-ready work    |

## Documentation

The [documentation index](docs/README.md) routes readers by intent:

- [Installation](docs/getting-started/installation.md)
- [Development setup](docs/getting-started/development.md)
- [Catalog architecture](docs/concepts/architecture.md)
- [Skill composition](docs/concepts/skill-composition.md)
- [Authoring skills](docs/authoring/skills.md)
- [Authoring plugins](docs/authoring/plugins.md)
- [Repository layout](docs/reference/repository-layout.md)
- [Validation](docs/reference/validation.md)

## Repository overview

```text
plugins/     versioned plugin packages and their skills
docs/        user, contributor, concept, integration, and reference guides
scripts/     setup, development, and CI entrypoints
src/         TypeScript catalog validator
test/        validator behavior tests
```

Each plugin owns everything it installs. Each skill owns its `SKILL.md` and optional
`agents/`, `references/`, `scripts/`, and `assets/` directories. See the
[repository layout](docs/reference/repository-layout.md) for the complete tree.

## Contributing

Install the pinned toolchain and Git hooks, then run the complete local checks:

```bash
make setup
make ci
```

Read [CONTRIBUTING.md](CONTRIBUTING.md), [AGENTS.md](AGENTS.md), and
[CONTEXT.md](CONTEXT.md) before changing an asset. Common commands and Husky behavior are
documented in [Development setup](docs/getting-started/development.md).

## Releases and security

Signed semantic-version tags publish validated Agent Plugin archives. Generated archives
live under `dist/` and are not committed. User-visible changes are tracked in
[CHANGELOG.md](CHANGELOG.md).

Never place credentials, private keys, customer data, or environment-specific secrets in
skills or examples. Use the private reporting process in [SECURITY.md](SECURITY.md) for a
suspected vulnerability.

Released under the [MIT License](LICENSE).
