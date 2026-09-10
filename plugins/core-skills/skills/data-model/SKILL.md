---
name: data-model
description: Design or evaluate persistent data models when entities, invariants, lifecycle, indexing, compatibility, or migration behavior must be made explicit.
---

# Data Model

Start from domain invariants and access patterns, not tables or document shapes. Identify
entity identity, ownership, cardinality, lifecycle, retention, and which transitions must
be atomic. Distinguish authoritative data from derived projections and caches.

Model constraints where the system can enforce them. Specify nullability, uniqueness,
referential behavior, concurrency expectations, and indexes justified by real reads or
writes. Account for tenancy and authorization in both keys and queries; do not rely on
callers remembering filters that protect data isolation.

For an existing system, compare the proposed shape with stored data and deployed readers.
Use `$migration-planning` when rollout needs backfill, dual-read/write, compatibility, or
rollback stages. Use `$security-audit` for sensitive fields, encryption, erasure, or access
boundaries, and `$performance-analysis` when volume or query cost is material.

Deliver the model with explicit invariants, representative operations, failure behavior,
and unresolved tradeoffs. Avoid premature normalization or denormalization without an
access-pattern reason. Validate with edge cases such as duplicate requests, deletion,
partial failure, concurrent updates, and historical records.
