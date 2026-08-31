# MZeolla AI Toolkit

Reusable building blocks for capable AI agents—small enough to review, structured enough
to validate, and portable enough to install without adopting an entire framework.

This repository contains independently authored skills, future plugin packages, and the
tooling that keeps both consistent. Every catalog change passes formatting, schema,
behavioral, spelling, link, secret, and supply-chain checks before release.

## Start here

Install [Mise](https://mise.jdx.dev/getting-started.html), then let the repository install
its pinned Node, pnpm, Python, pre-commit, ShellCheck, Lychee, and typos toolchain:

```bash
make setup
make ci
```

Link every skill into the standard Agent Skills-compatible and Claude Code directories:

```bash
make link-skills
```

The default destinations are:

```text
~/.agents/skills   Agent Skills-compatible harnesses, including Codex
~/.claude/skills   Claude Code
```

Select one harness or provide a custom discovery directory when needed:

```bash
./scripts/dev/link-skills --agent claude
./scripts/dev/link-skills --agent codex
./scripts/dev/link-skills --target "$HOME/.my-agent/skills"
```

The links point back to this checkout, so reviewed edits are available immediately. The
linker never replaces an existing skill with the same name. Remove only the links it
owns with `make unlink-skills`.

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

Categories help people browse the source catalog; they do not change a skill's runtime
name. The local linker flattens them into each selected agent's discovery directory.

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
skills/
├── building/<skill-name>/
└── productivity/<skill-name>/
plugins/<plugin-name>/
scripts/
├── ci/       deterministic repository validation
├── dev/      local contributor utilities
└── setup/    one-time workstation bootstrap
src/          TypeScript catalog validator
test/         validator behavior tests
docs/         architecture and authoring guides
```

Each skill owns its `SKILL.md` and optional `agents/`, `scripts/`, `references/`, and
`assets/`. Plugins are added only when a capability needs a separately versioned bundle of
skills, agents, hooks, tools, or app metadata.

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

Signed semantic-version tags publish a validated catalog archive through GitHub Releases:

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
