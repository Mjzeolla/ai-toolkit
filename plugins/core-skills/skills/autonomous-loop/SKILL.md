---
name: autonomous-loop
description: Drive a bounded implementation through inspect, act, validate, and adapt cycles when the user expects autonomous progress toward a concrete terminal outcome.
---

# Autonomous Loop

Establish the terminal condition, authorized scope, and evidence that will prove completion.
Do not interpret persistence as permission for unrelated changes, external publication, or
destructive recovery.

Run a compact loop:

1. Inspect current state, search for existing applicable code with `$reuse-code`, and
   identify the next highest-information action.
2. Make the smallest coherent change that advances the terminal condition.
3. Validate the affected behavior in proportion to risk.
4. Use the result to continue, revise the hypothesis, or stop.

Use `$explore-codebase` when ownership or execution flow is unclear. Route schema work to
`$data-model`, behavioral changes to `$test-writing` or `$red-green-testing`, security
boundaries to `$security-audit`, and deployment-sensitive completion to
`$production-ready`. Use `$subagent-coordination` only when independent parallel work has
a clear merge boundary and delegation is available.

Use `$babysit-jobs` rather than busy polling when progress depends on an existing command,
CI run, review, or delegated task reaching a terminal state.

Stop when the outcome is proven, the user changes direction, further progress requires new
authority, or the same blocker remains after safe alternatives are exhausted. Report the
actual terminal state and residual risk; do not label partial progress complete.
