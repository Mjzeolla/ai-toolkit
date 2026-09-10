---
name: migration-planning
description: Plan a safe migration when data, APIs, infrastructure, dependencies, or runtime behavior must transition without an unsafe flag day.
---

# Migration Planning

Define current and target states, affected producers and consumers, compatibility window,
traffic and data scale, downtime tolerance, and rollback limits. Identify irreversible
steps and the evidence required before crossing them.

Design stages that keep old and new versions interoperable where practical: expand,
backfill, verify, switch reads or traffic, observe, and contract. Specify idempotency,
resumption, rate limits, ownership, and monitoring for each stage. A rollback that cannot
undo transformed data must describe forward recovery instead.

Use `$data-model` for schema invariants, `$dependency-upgrade` for version transitions,
`$security-audit` for credential or trust-boundary changes, and `$production-ready` for
deployment gates. Test the migration and recovery path against representative data in a
safe environment.

Deliver prerequisites, ordered stages, validation queries or signals, stop conditions,
rollback or recovery procedures, and cleanup criteria. Do not remove compatibility code
until deployed consumers and stored data prove it is no longer needed.
