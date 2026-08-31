---
name: code-review
description: Review code changes for concrete correctness, security, reliability, and maintainability defects when actionable line-level findings are required.
---

# Code Review

Review the change in its execution context, not as isolated syntax. Read the diff, relevant
callers, tests, configuration, and repository conventions. Identify defects introduced by
the change that a maintainer can act on.

Prioritize incorrect behavior, data loss, authorization failures, races, unsafe migrations,
broken contracts, and missing validation for meaningful risk. Trace inputs through state
changes and outputs. Use `$data-model` for persistence semantics, `$security-audit` for a
material trust boundary, and `$test-writing` when a finding depends on a missing behavioral
case.

Each finding should name the failure, the conditions that trigger it, its consequence, and
the tightest useful file or line range. Do not report style preferences, speculative risks,
or pre-existing problems as defects in the change. Avoid duplicating the same root cause
across several comments.

If no actionable defect is supported by evidence, say so and identify any testing limits.
This skill reviews code; use `$change-review` when the artifact includes broader
documentation, infrastructure, or operational changes.
