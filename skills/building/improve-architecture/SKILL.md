---
name: improve-architecture
description: Improve software architecture when dependency direction, ownership, coupling, scalability, or change isolation needs a deliberate repository-grounded redesign.
---

# Improve Architecture

Describe the current architecture and the concrete pressure it fails to handle. Use
`$explore-codebase` when boundaries or runtime flow are not yet evidenced. Define desired
qualities—such as isolation, evolvability, operability, or throughput—without treating a
named pattern as the objective.

Propose the smallest boundary change that addresses the pressure. Make ownership,
dependency direction, contracts, state, and failure containment explicit. Compare credible
alternatives and identify costs introduced by the preferred design.

Plan an incremental transition that keeps the system testable and deployable. Route
persistent compatibility work through `$migration-planning`, schema decisions through
`$data-model`, and operational gates through `$production-ready`. Do not combine unrelated
cleanup with the architectural change.

Validate the design against representative flows, failure modes, team ownership, and
deployment topology. Deliver current and target boundaries, decisions with rationale,
migration seams, acceptance criteria, and risks that remain. Architecture diagrams are
useful only when they clarify relationships that prose cannot.
