---
name: reuse-code
description: Search for existing implementations before adding code, and consolidate meaningful duplication when reuse can preserve behavior without creating the wrong coupling.
---

# Reuse Code

Search before implementing. Translate the requested behavior into likely domain terms,
symbols, filenames, call sites, error messages, configuration keys, and dependencies. Use
fast repository search to inspect declarations and consumers, not just exact names. Check
nearby modules, shared libraries, generated clients, framework facilities, tests, fixtures,
and declared dependencies before creating a new utility or abstraction.

Evaluate candidates by semantics rather than superficial similarity:

- Does the existing code provide the same behavior and failure contract?
- Is it owned at a layer both callers may depend on?
- Are its lifecycle, environment, performance, and security assumptions compatible?
- Is it public or intentionally reusable, rather than an internal implementation detail?
- Would reuse reduce maintenance, or merely couple unrelated domains?

Prefer direct reuse when the contract fits. Extend the existing implementation when one
owner should support both cases and the change remains coherent. Keep separate
implementations when similarity is incidental, ownership differs, or a shared abstraction
would need flags and special cases for unrelated domains. Do not create a generic helper
from a single speculative future use.

When consolidating real duplication, choose a canonical implementation, characterize
observable behavior, migrate callers in reviewable steps, and preserve compatibility where
needed. Run focused tests for every migrated caller. Remove the redundant implementation
only after repository-wide searches and relevant builds show that no supported consumer
still depends on it.

Report what was searched, the relevant candidates, and why reuse, extension, consolidation,
or intentional duplication is the best fit. Use `$explore-codebase` when ownership or flow
is unclear, `$improve-architecture` when sharing changes dependency direction, and
`$test-writing` when consolidation needs durable contract coverage.
