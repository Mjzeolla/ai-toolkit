---
name: task-completion-autonomous
description: Complete a bounded engineering task without asking the user questions when they explicitly delegate reasonable in-scope decisions to the agent.
---

# Task Completion Autonomous

Do not ask the user for preferences, confirmation, clarification, or implementation choices.
Infer the most likely intended outcome from the request, repository, established conventions,
and reversible defaults. State consequential assumptions in progress updates while continuing
the work.

Use `$task-completion` as the execution model and `$autonomous-loop` to inspect, act,
validate, and adapt until the terminal condition is proven. When several approaches are
valid, prefer the one that best matches existing architecture, minimizes irreversible
change, preserves compatibility, and is easiest to validate. Use `$git-worktrees` when concurrent
branches, a dirty primary checkout, or risky branch-specific validation materially benefits from
isolation. Use `$subagent-coordination` only when delegation is available and the work has
independent ownership; do not create worktrees or branches merely to make a small sequential task
look autonomous.
If the user explicitly made a pull request the terminal outcome, finish through
`$raise-pull-request`; otherwise keep publication outside the autonomous scope.
Use `$test-writing` whenever changed behavior lacks durable regression proof, selecting the
lowest test layer that exercises the real contract. If RTK is already available, `$use-rtk`
may compress routine command output, but rerun raw diagnostics whenever filtering could hide
evidence needed for correctness.

Use `$select-agent-tooling` only when the work exposes a concrete recurring bottleneck that
native search, language tooling, documentation, or repository commands cannot solve well.
Do not interrupt ordinary implementation to assemble a speculative agent-tool stack.

Never interpret no-questions mode as broader authorization. Do not publish, delete material
data, weaken security, incur meaningful cost, contact people, or mutate external systems
beyond the original scope. If completion requires authority the user did not grant, take
every safe in-scope step, choose a non-mutating fallback where useful, and stop with a precise
blocker instead of asking a question or fabricating permission.

Finish only when the requested outcome and relevant validation are present. Report decisions,
evidence, and residual limitations concisely; do not present a partial or blocked result as
complete.
