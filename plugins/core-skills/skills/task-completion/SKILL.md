---
name: task-completion
description: Coordinate a substantial engineering task from clarified outcome through implementation and proof when multiple focused capabilities may need selective chaining.
---

# Task Completion

Establish the requested outcome, scope, authorization, and completion evidence. Use
`$clarify-requirements` only when unresolved ambiguity would materially change the result.
Map unfamiliar ownership with `$explore-codebase`, then use `$implementation-planning` when
the work needs a multi-step design. Use `$reuse-code` before introducing utilities,
abstractions, or behavior that may already exist.

Execute through `$autonomous-loop`: inspect, make one coherent advance, validate, and adapt.
Route only the risks present in the task:

- persistence and compatibility: `$data-model` and `$migration-planning`;
- behavior and regression proof: `$red-green-testing` or `$test-writing`;
- trust boundaries: `$security-audit`;
- dependency changes: `$dependency-upgrade`;
- architecture pressure: `$improve-architecture`;
- new repository foundation: `$initialize-repository`;
- repository layout: `$organize-codebase`;
- operational release: `$production-ready`;
- measurable latency or capacity: `$performance-analysis`;
- demonstrated agent workflow bottleneck: `$select-agent-tooling`.

Use `$subagent-coordination` only for concrete independent subtasks with clean ownership and
available delegation. Use `$git-worktrees` when parallel branches, a dirty primary checkout, or
branch-specific validation need isolated working directories; keep short sequential work in the
current checkout when it is already safe. If the user explicitly requests no questions or fully
delegated judgment, route
to `$task-completion-autonomous`. Use `$babysit-jobs` when completion depends on an existing
long-running command, check, review, or delegated task reaching a terminal state. Finish with
targeted review and validation. Use `$use-rtk` for noisy supported shell commands when RTK is
already available and compact output will not hide evidence required by the task. A task is complete only
when the requested outcome is present, relevant checks pass, and residual limitations are
explicit. Do not equate a plan, partial implementation, or exhausted time budget with
completion.

Use `$raise-pull-request` only when the user requests publication or defines a pull request as the
completion boundary. Implementation authorization alone does not authorize commits, pushes, merges,
deployments, or releases.
