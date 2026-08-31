---
name: to-ticket
description: Convert a request, discussion, defect, or decision into an implementation-ready work ticket with bounded scope and verifiable acceptance criteria.
---

# To Ticket

Capture the problem and desired outcome in language a contributor can understand without
the original conversation. State why the work matters, relevant users or systems, current
behavior, target behavior, and constraints.

Define in-scope and explicitly excluded work when scope could drift. Write acceptance
criteria as observable outcomes rather than implementation instructions. Include useful
technical context, dependencies, risks, validation expectations, and links to authoritative
artifacts. Preserve unknowns as questions instead of inventing requirements.

Use `$decision-interview` first when a material choice remains unresolved and
`$implementation-planning` when the ticket needs a repository-specific execution plan.
Security, migration, and production requirements should link to their actual evidence or
specialized follow-up rather than becoming generic checklist boxes.

Produce a concise title and a structured body ready for the target tracker. Do not create or
submit the external ticket unless the user authorized that mutation and the relevant tool
is available.
