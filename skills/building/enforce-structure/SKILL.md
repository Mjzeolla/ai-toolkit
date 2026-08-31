---
name: enforce-structure
description: Establish and automate repository structure rules when layout drift, misplaced files, or inconsistent package boundaries need deterministic enforcement.
---

# Enforce Structure

Infer the intended structure from documented architecture, build tooling, ownership, and
several representative packages. Separate conventions that improve navigation or tooling
from preferences that do not justify enforcement.

Define a small contract: allowed roots, required files, naming rules, ownership boundaries,
and documented exceptions. Prefer a deterministic validator with actionable errors over a
long prose rule. The check should explain the offending path, expected location, and safe
remediation. Test both accepted and rejected layouts.

Do not move user files or rewrite the repository merely to satisfy a new convention without
authorization. Introduce enforcement with existing violations understood; either migrate
them in scope or use narrow, temporary exceptions with owners and removal criteria.

Use `$explore-codebase` before enforcing an unfamiliar layout and `$improve-architecture`
when the requested structure changes dependency or ownership boundaries rather than only
filesystem placement. Integrate the validator into local checks and CI so contributors see
the same result before review.
