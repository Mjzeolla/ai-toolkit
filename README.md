# MZeolla AI Toolkit

A marketplace of installable Agent Plugins for capable AI coding agents—small enough to
review, structured enough to validate, and portable across compatible hosts.

This repository contains independently authored skills within their owning plugins and the
tooling that keeps them consistent. Every plugin change passes formatting, schema,
behavioral, spelling, link, secret, and supply-chain checks before release.

## Install and manage

Add this repository as a marketplace, install `core-skills`, and start a new session so the
runtime loads the plugin. The commands below use the marketplace name declared by this
repository: `mzeolla-ai-toolkit`.

For the common lifecycle, the Make wrapper defaults to Codex and accepts
`PLUGIN_AGENT=codex|claude|grok|copilot`:

```bash
make plugin-marketplace-add
make plugin-install
make plugin-list
make plugin-update

# Use another supported runtime
make plugin-install PLUGIN_AGENT=claude
```

The wrapper also provides `plugin-marketplace-list`, `plugin-uninstall`, and
`plugin-marketplace-remove`. These targets change the selected runtime's user-level plugin
state; review the commands below before running them. Override `PLUGIN_NAME`,
`MARKETPLACE_NAME`, or `MARKETPLACE_SOURCE` when managing a fork or another package.

### Codex

```bash
# Add the marketplace and install the plugin
codex plugin marketplace add Mjzeolla/ai-toolkit
codex plugin add core-skills@mzeolla-ai-toolkit

# Inspect installed and available plugins
codex plugin marketplace list
codex plugin list --available --json

# Refresh the marketplace and reinstall the latest published plugin version
codex plugin marketplace upgrade mzeolla-ai-toolkit
codex plugin remove core-skills@mzeolla-ai-toolkit
codex plugin add core-skills@mzeolla-ai-toolkit

# Remove the plugin or marketplace
codex plugin remove core-skills@mzeolla-ai-toolkit
codex plugin marketplace remove mzeolla-ai-toolkit
```

Codex also provides an interactive browser: launch `codex`, then enter `/plugins`.
See the [OpenAI plugin documentation](https://learn.chatgpt.com/docs/plugins) for supported
surfaces and browser behavior.

### Claude Code

```bash
# Add the marketplace and install the plugin
claude plugin marketplace add Mjzeolla/ai-toolkit
claude plugin install core-skills@mzeolla-ai-toolkit

# Inspect, refresh, and update
claude plugin list
claude plugin marketplace update mzeolla-ai-toolkit
claude plugin update core-skills@mzeolla-ai-toolkit

# Remove the plugin or marketplace
claude plugin uninstall core-skills@mzeolla-ai-toolkit
claude plugin marketplace remove mzeolla-ai-toolkit
```

See the [Claude Code plugin reference](https://code.claude.com/docs/en/plugins-reference)
for scopes, enablement, and automatic updates.

### Grok Build

Grok accepts the repository's Claude-compatible marketplace and plugin manifest.

```bash
# Add the marketplace, install the plugin, and enable it
grok plugin marketplace add Mjzeolla/ai-toolkit
grok plugin install core-skills --trust
grok plugin enable core-skills

# Inspect, refresh, and update
grok plugin marketplace list
grok plugin list --json
grok plugin details core-skills
grok plugin marketplace update mzeolla-ai-toolkit
grok plugin update core-skills

# Disable or remove the plugin
grok plugin disable core-skills
grok plugin uninstall core-skills --confirm
grok plugin marketplace remove https://github.com/Mjzeolla/ai-toolkit.git
```

See the [Grok Build plugin guide](https://github.com/xai-org/grok-build/blob/main/crates/codegen/xai-grok-pager/docs/user-guide/09-plugins.md)
for trust and enablement behavior.

### GitHub Copilot CLI

GitHub Copilot CLI supports the portable root manifest and the Claude-compatible
marketplace included in this repository.

```bash
# Add and browse the marketplace, then install the plugin
copilot plugin marketplace add Mjzeolla/ai-toolkit
copilot plugin marketplace browse mzeolla-ai-toolkit
copilot plugin install core-skills@mzeolla-ai-toolkit

# Inspect, refresh, and update
copilot plugin marketplace list
copilot plugin list
copilot plugin marketplace update mzeolla-ai-toolkit
copilot plugin update core-skills

# Remove the plugin or marketplace
copilot plugin uninstall core-skills
copilot plugin marketplace remove mzeolla-ai-toolkit
```

See the [GitHub Copilot CLI plugin reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-plugin-reference)
for direct-source installs, enablement, and bulk updates.

Only use `--trust` after reviewing the repository; plugins run with the current user's
permissions. ChatGPT desktop uses its Plugins interface rather than these shell commands.
Other coding agents need an explicit compatibility layer before they should be advertised
as supported.

### Local validation

```bash
make validate
claude plugin validate .
grok plugin validate .
```

`make validate` is always available after repository setup. The runtime-specific commands
require the corresponding CLI to be installed.

The package boundary is `plugins/core-skills/`; no per-skill symlinks or copies into global
discovery directories are required.

Contributors should install [Mise](https://mise.jdx.dev/getting-started.html), then let the
repository install its pinned Node, pnpm, Python, pre-commit, ShellCheck, Lychee, and typos
toolchain:

```bash
make setup
make ci
```

## Catalog

### Building

| Skill                        | Use it when                                                      |
| ---------------------------- | ---------------------------------------------------------------- |
| `authoring-skills`           | A reusable agent capability needs deliberate design              |
| `autonomous-loop`            | Work should iterate autonomously toward a bounded outcome        |
| `change-review`              | Any concrete change needs evidence-backed defect analysis        |
| `code-review`                | Code needs actionable correctness and security review            |
| `data-model`                 | Persistent entities, invariants, and access patterns need design |
| `dependency-upgrade`         | A package upgrade needs compatibility and regression control     |
| `enforce-structure`          | Repository layout rules need deterministic enforcement           |
| `explore-codebase`           | An unfamiliar codebase must be mapped before acting              |
| `git-worktrees`              | Concurrent branches need isolated working directories            |
| `implementation-planning`    | A repository-grounded request needs an executable change plan    |
| `improve-architecture`       | Software boundaries or coupling need deliberate redesign         |
| `migration-planning`         | A transition needs staged compatibility and recovery             |
| `performance-analysis`       | Latency, throughput, or capacity needs measurement               |
| `production-ready`           | A workload needs an evidence-based operational readiness review  |
| `red-green-testing`          | A behavior change benefits from proving the test fails first     |
| `security-audit`             | A defined surface needs an authorized security assessment        |
| `subagent-coordination`      | Independent workstreams can be delegated safely                  |
| `systematic-debugging`       | A failure must be reproduced and isolated before repair          |
| `task-completion`            | A substantial engineering task needs selective skill chaining    |
| `task-completion-autonomous` | A delegated task must finish without clarification prompts       |
| `test-writing`               | Behavior or regressions need durable automated coverage          |

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

The sections above help people browse the plugin; skills are stored flat so their source
paths match the runtime discovery layout.

### Composition

Focused skills can route to one another using `$skill-name`. The reference is a conditional
handoff, not an unconditional import. `$task-completion` selects the developer capabilities
justified by a task, `$autonomous-loop` manages bounded execution cycles, and
`$subagent-coordination` governs independent delegated work. The validator prevents broken
references while allowing intentional conditional cycles.

### Explicit-only modes

Some skills alter interaction style or enable broad orchestration, so they are available
only when explicitly invoked:

- `$ask-me`, `$brief-mode`, and `$decision-interview` change how the conversation proceeds;
- `$task-completion` and `$autonomous-loop` coordinate broad execution;
- `$task-completion-autonomous` makes reasonable in-scope decisions without asking the user;
- `$subagent-coordination` enables a delegation strategy only when requested and available.

Focused capabilities such as `$git-worktrees`, `$security-audit`, and `$data-model` remain
eligible for normal discovery when their descriptions match the request.

## Repository map

```text
plugins/
└── core-skills/
    ├── plugin.json
    ├── .claude-plugin/plugin.json
    └── skills/<skill-name>/
scripts/
├── ci/       deterministic repository validation
├── dev/      local contributor utilities
└── setup/    one-time workstation bootstrap
src/          TypeScript catalog validator
test/         validator behavior tests
docs/         architecture and authoring guides
```

Each skill owns its `SKILL.md` and optional `agents/`, `scripts/`, `references/`, and
`assets/`. Each directory under `plugins/` is an independent versioned installation
boundary.

## Common commands

```bash
make help          # show every supported command
make check         # fast, offline checks used while editing
make ci            # full local CI, including external link validation
make links         # check local and external links with Lychee
make format        # apply Prettier formatting
make markdown-fix  # apply safe Markdownlint fixes
make validate      # validate catalog structure and metadata
```

`make shellcheck` statically analyzes every executable shell script under `scripts/`. It
catches unsafe quoting, broken conditionals, non-portable constructs, accidental word
splitting, and similar shell defects without executing the scripts.

Git hooks validate links at two levels:

- pre-commit runs Lychee with `--offline`, which validates repository-local file targets
  without requiring network access;
- pre-push runs the full Lychee check, including external HTTP links;
- CI repeats the full check so bypassing local hooks cannot merge broken links.

`pnpm check` contains only Node-managed checks. `make ci` is the complete repository check:
it runs `pnpm check`, ShellCheck, typos, Lychee, actionlint, and yamllint. Lychee is managed
through Mise rather than npm, so it belongs in the CI wrapper instead of the package script.

Mise is used because this repository has a mixed toolchain. It gives developers and CI a
single version declaration instead of requiring independently managed Node, Python, and
Rust-based utilities. Markdownlint checks Markdown structure; Lychee checks whether links
resolve. Both are necessary because neither replaces the other.

Before contributing, read [CONTRIBUTING.md](CONTRIBUTING.md) and the relevant authoring
guide:

- [Authoring skills](docs/authoring-skills.md)
- [Authoring plugins](docs/authoring-plugins.md)
- [Catalog architecture](docs/architecture.md)
- [Repository context](CONTEXT.md)

## Releases

Signed semantic-version tags publish a validated Agent Plugin archive through GitHub
Releases:

```bash
git tag -s v0.1.0 -m "MZeolla AI Toolkit v0.1.0"
git push origin v0.1.0
```

Generated archives live under `dist/` and are never committed. User-visible changes are
tracked in [CHANGELOG.md](CHANGELOG.md).

## Security

Never place credentials, private keys, customer data, or environment-specific secrets in
skills or examples. Use the private reporting process in [SECURITY.md](SECURITY.md) for a
suspected vulnerability.

Released under the [MIT License](LICENSE).
