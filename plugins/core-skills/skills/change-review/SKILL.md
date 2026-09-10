---
name: change-review
description: Review a concrete code or configuration change for correctness, security, regressions, and missing validation when evidence-backed findings are requested.
---

# Change Review

Review the requested diff against its intended behavior and the repository's documented
contracts. This skill reports actionable defects; it is not a request to rewrite the
change or enforce personal style preferences.

## Establish scope

- Identify the exact comparison point and changed files.
- Read repository instructions and the issue, specification, or conversation defining
  the intended outcome.
- Inspect callers, consumers, schemas, tests, and deployment configuration affected by
  the change rather than reviewing each diff hunk in isolation.
- Preserve unrelated user changes and do not mutate the worktree during a read-only
  review.

## Evaluate

Look for behavior that is incorrect under realistic inputs, including:

- broken invariants, boundary conditions, concurrency, retries, or partial failure;
- authentication, authorization, secret exposure, and unsafe defaults;
- compatibility or migration gaps for existing data and consumers;
- configuration that validates syntactically but cannot work in its runtime context;
- tests that miss the failure mode or only assert implementation details;
- operational gaps that make failure invisible or recovery impractical.

Run focused, non-mutating checks when they materially increase confidence. Do not infer a
defect solely from unfamiliar code; trace the relevant execution path and cite evidence.

## Report

List findings first, ordered by severity. For each finding, provide a concise title, the
tightest useful file and line location, the conditions that trigger it, and its concrete
impact. Explain why existing validation does not prevent it when that is not obvious.

Separate confirmed findings from questions and residual risks. If no actionable defect is
found, say so explicitly and identify meaningful validation that was not possible.
