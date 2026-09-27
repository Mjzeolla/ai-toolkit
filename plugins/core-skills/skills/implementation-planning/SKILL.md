---
name: implementation-planning
description: Convert a defined engineering goal into a repository-grounded execution plan when sequencing, ownership, migration, or verification needs explicit design.
---

# Implementation Planning

Use this skill when the user asks for a plan or when a multi-component change needs an
agreed sequence before implementation. Do not produce ceremony for a small local edit
whose implementation is already obvious.

## Ground the plan

Inspect the relevant entrypoints, configuration, tests, deployment path, and maintained
documentation. Identify existing conventions and current worktree changes. Distinguish
facts found in the repository from assumptions and unresolved decisions.

Use `$reuse-code` to identify existing components, utilities, contracts, and dependencies
that the implementation can extend instead of planning parallel replacements. Use
`$organize-codebase` when folder ownership or target placement is itself part of the plan.

Describe the intended end state in observable terms. Include important invariants such
as compatibility, data ownership, authorization boundaries, rollback needs, and which
system remains authoritative during a migration.

## Define executable work

Organize steps by dependency rather than by file listing. Each step should identify:

- the behavior or contract being changed;
- the responsible component or directory;
- how it connects to preceding and following work;
- the evidence that will prove the step complete;
- any rollout, migration, or recovery requirement.

Prefer vertical slices that produce early feedback. Call out destructive operations,
external coordination, credentials, and decisions requiring explicit authorization.
Avoid vague steps such as “update backend” or “test everything.”

## Validate the plan

Walk a representative request or event through the proposed end state. Check failure
paths, partial rollout, retries, observability, and rollback. Ensure the validation plan
includes static checks, focused tests, integration boundaries, and an operational smoke
test proportional to risk.

The final plan should be usable by another engineer without relying on hidden context,
while leaving ordinary implementation choices to the person doing the work.
