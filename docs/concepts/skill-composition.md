# Skill composition and installation profiles

## References are routing, not imports

A dollar-prefixed skill name asks the runtime to load another installed capability when a
specific branch of work needs it. It is a conditional handoff, not inheritance, source
inclusion, or an unconditional execution chain. The calling skill must remain useful on its
own and explain why the companion is relevant.

Use relative Markdown links for resources owned by the same skill, such as
`references/schema.md`. Use dollar-prefixed names only for skills bundled in the same
plugin or guaranteed by the target environment. The validator rejects unknown internal
references but permits intentional conditional cycles.

## What users should install

The recommended installation is the complete `core-skills` plugin. It guarantees that all
internal routes are available and lets discovery load only the skills relevant to each
request.

Selective installation remains useful for constrained environments. There are no hard
per-skill dependencies, but these companion sets preserve the richest routing:

| Profile           | Primary skills                                                          | Recommended companions                                                                                                                                                                            |
| ----------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Implementation    | `task-completion`, `autonomous-loop`                                    | `clarify-requirements`, `explore-codebase`, `reuse-code`, `implementation-planning`, `test-writing`, `red-green-testing`, `systematic-debugging`, `babysit-jobs`, `use-rtk`, `raise-pull-request` |
| Review            | `code-review`, `change-review`                                          | `data-model`, `security-audit`, `test-writing`, `production-ready`                                                                                                                                |
| Architecture      | `improve-architecture`, `architecture-diagramming`, `organize-codebase` | `explore-codebase`, `data-model`, `migration-planning`, `enforce-structure`, `production-ready`                                                                                                   |
| Documentation     | `author-documentation`, `maintain-wiki`                                 | `organize-codebase`, `architecture-diagramming`, `primary-source-research`, `explore-codebase`, `raise-pull-request`                                                                              |
| Parallel work     | `subagent-coordination`, `git-worktrees`                                | `task-completion`, `autonomous-loop`, `babysit-jobs`                                                                                                                                              |
| Operations        | `production-ready`, `performance-analysis`                              | `security-audit`, `migration-planning`, `data-model`, `systematic-debugging`                                                                                                                      |
| Product decisions | `decision-interview`, `to-ticket`                                       | `ask-me`, `clarify-requirements`, `implementation-planning`, `meeting-to-actions`                                                                                                                 |
| Agent tooling     | `select-agent-tooling`                                                  | `use-rtk`, `primary-source-research`, `explore-codebase`                                                                                                                                          |

These are recommendations, not automatic installers. A focused skill should degrade
gracefully when a conditional companion is absent rather than pretending it ran.

## Explicit-only skills

Some skills change interaction or coordination style and therefore require deliberate
invocation:

- `ask-me`, `brief-mode`, and `decision-interview` alter the conversation mode;
- `task-completion` and `autonomous-loop` coordinate broad execution;
- `task-completion-autonomous` makes reasonable in-scope decisions without questions; and
- `subagent-coordination` enables parallel delegation when the runtime supports it.

Focused capabilities remain eligible for normal discovery when their descriptions match.

## External skills

Portable plugin manifests do not currently resolve cross-marketplace skill dependencies.
For an optional third-party skill:

1. Refer to it by product or skill name rather than emitting an internal invocation token.
2. Detect whether it is available before selecting its workflow.
3. Keep a useful built-in fallback.
4. Link to maintainer-owned installation instructions.
5. Never install or update it without explicit authorization.

If an external capability becomes mandatory, create a separate integration plugin with a
clear installation and version lifecycle rather than making `core-skills` silently depend
on it. Archify follows this optional pattern; see the [Archify integration](../integrations/archify.md).
