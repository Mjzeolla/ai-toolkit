---
name: dependency-upgrade
description: Upgrade software dependencies when version compatibility, lockfiles, migrations, supply-chain risk, and regression validation require controlled handling.
---

# Dependency Upgrade

Identify the package manager, declared constraint, resolved version, consumers, and reason
for the upgrade. Read authoritative release and migration notes for the exact version span.
Separate required code changes from optional adoption of new features.

Update manifests and lockfiles with the repository's package manager. Avoid unrelated
dependency churn. Check runtime, build, peer, language, and platform compatibility, then
adapt affected APIs or configuration. Review install scripts and provenance when the
dependency materially changes supply-chain exposure.

Run focused tests for changed integrations plus the repository's standard checks and build.
Use `$migration-planning` for breaking multi-stage upgrades, `$security-audit` for a
security-driven update with meaningful exposure, and `$production-ready` when rollout or
rollback behavior changes.

Report old and new versions, important release-note impacts, changed files, validation, and
remaining rollout considerations. Do not claim a vulnerability is remediated until the
resolved artifact and affected path are verified.
