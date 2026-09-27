---
name: architecture-diagramming
description: Create or review evidence-backed software architecture diagrams when system boundaries, components, dependencies, deployment, or runtime interactions need a clear editable visual.
---

# Architecture Diagramming

Create a diagram that answers one architectural question for a defined audience. Establish
whether the view describes the current system, a proposed design, or both. Inspect the
provided evidence before drawing; use `$explore-codebase` when the current repository must
be inferred. If the task requires choosing or redesigning architecture, route that work
through `$improve-architecture` rather than inventing decisions in the diagram.

Choose the smallest view that communicates the needed relationship:

- Use a context view for people, external systems, and the system boundary.
- Use a container or component view for internal responsibilities and dependencies.
- Use a deployment view for runtime nodes, regions, trust boundaries, and ownership.
- Use a sequence or dynamic view for one runtime interaction, including important errors,
  retries, and asynchronous handoffs.
- Use a data-flow view for sources, transformations, stores, sensitivity, and consumers.

Do not mix abstraction levels merely to fit more information into one canvas. Split the
material into related views when one diagram cannot remain legible.

Honor the user's requested format and the repository's established conventions. Use
draw.io when an editable canvas and broad human handoff matter; read
[`references/drawio.md`](references/drawio.md) before producing it. Use Archify when its
installed skill is available and an interactive, self-contained HTML diagram is valuable;
read [`references/archify.md`](references/archify.md) first. For a small diagram embedded
in Markdown, a text-native format such as Mermaid may be sufficient.

Keep each diagram focused on one claim. Give nodes short responsibility-oriented labels,
show meaningful boundaries, and label directed edges with the interaction, protocol, or
data they represent. Distinguish synchronous calls, asynchronous messages, and failure
paths only when those distinctions affect the architectural question. Mark uncertain or
inferred elements instead of presenting them as established facts. Do not use color as the
only carrier of meaning, and provide a short text description for readers who cannot use
the visual.

Validate the source with locally available tooling and render it when practical. Treat
syntax validation, successful rendering, and perceptual inspection as separate evidence;
never claim one implies the others. Do not upload system details to a remote renderer or
install diagramming dependencies without authorization.

Deliver the editable source, any requested rendered artifact, a short caption explaining
the view, and notes covering scope, evidence, and unresolved uncertainty. Before finishing,
confirm that:

- every important node and edge is supported by evidence or explicitly marked as proposed;
- boundaries and abstraction level are internally consistent;
- labels remain readable at the intended viewing size;
- the source can be edited without reconstructing the diagram; and
- validation and visual-review claims accurately describe what was actually performed.
