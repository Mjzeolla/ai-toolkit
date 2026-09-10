---
name: production-ready
description: Assess and close production-readiness gaps when a service or change must be safely operated, observed, secured, deployed, and recovered in a real environment.
---

# Production Ready

Define the workload, environment, service objectives, and failure tolerance. Inspect the
actual deployment artifacts and operational controls rather than applying a generic
checklist blindly.

Evaluate configuration and secret delivery, health and startup behavior, resource bounds,
scaling, dependency timeouts, retries, idempotency, logs, metrics, traces, alert ownership,
backups, restore evidence, rollout, rollback, and incident access. Use `$security-audit`
for material trust boundaries, `$performance-analysis` for capacity evidence, and
`$migration-planning` for stateful rollout.

Classify gaps as release blockers, accepted risks, or follow-up improvements with an owner
and verification method. Do not claim readiness merely because manifests exist or tests
pass. Exercise the most important failure and recovery paths where safe.

Produce a go/no-go conclusion tied to evidence, the exact remaining blockers, deployment
and rollback procedure, monitoring signals, and recovery expectations. Preserve the user's
chosen platform unless changing it is part of the request.
