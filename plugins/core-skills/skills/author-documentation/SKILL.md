---
name: author-documentation
description: Create or improve maintainable technical documentation when a repository, system, workflow, API, decision, or operational procedure needs accurate reader-oriented guidance.
---

# Author Documentation

Write for a defined reader trying to complete a defined task or understand a defined system.
Inspect the implementation, configuration, existing documentation conventions, navigation,
and validation tooling before writing. Treat code and runtime behavior as evidence, not as
an excuse to expose incidental implementation detail. Use `$primary-source-research` when
the content depends on current external facts, versions, standards, or precise attribution.

Identify the document type before choosing its shape. Read
[document types](references/document-types.md) for the relevant mode; do not combine a
tutorial, task procedure, reference catalog, conceptual explanation, decision record, and
runbook into one undifferentiated page.

Preserve the repository's established documentation system when it remains usable. If the
task changes navigation, taxonomy, folder ownership, or where a growing set of pages should
live, use `$organize-codebase` and its documentation reference. Prefer domain folders with
meaningful landing pages over flat page dumps. Add redirects when moving published routes,
and update navigation, indexes, inbound links, source metadata, and search configuration as
required by the framework.

Use `$maintain-wiki` when the target is a personal or team knowledge wiki whose notes must be
classified, cross-linked, promoted by maturity, and validated as part of a navigable knowledge base.

For a larger codebase whose runtime or ownership is already divided into stable modules,
read [module documentation structure](references/module-structure.md). A substantial module
may own documentation, architecture explanations, editable diagrams, guides, references,
and operations under `docs/modules/<module>/`. Keep cross-module concerns at the repository
level, and do not create module documentation scaffolding before a module has real content
and a clear owner.

Use `$architecture-diagramming` when a visual materially clarifies system boundaries,
dependencies, deployment, runtime interactions, or data flow. Keep the diagram focused on
one architectural question, store editable source under the owning documentation domain,
and include a concise text explanation. Do not manufacture architecture merely to make a
page look complete.

Make claims traceable to repository evidence or cited authoritative sources. Clearly
distinguish current behavior, proposed design, assumptions, and unresolved questions. Test
commands and code samples when practical; label illustrative pseudocode. Never include
secrets, live credentials, internal personal data, or destructive examples without an
explicit safety boundary.

Design for maintenance:

- keep one canonical explanation and link to it instead of copying it across pages;
- place content with the domain or audience that owns its lifecycle;
- use stable headings and descriptive link text;
- include prerequisites, expected outcomes, failure recovery, and verification where a
  procedure needs them;
- separate generated API reference from authored guidance; and
- avoid empty category pages, placeholder prose, and indexes that only repeat filenames.

Validate the affected documentation with the repository's formatter, Markdown or MDX
linting, local-link and route checks, code-sample tests, and site build when available. Run
external-link validation when links changed and network access is permitted. Render and
inspect diagrams separately from syntax validation. Report which checks actually ran and
any evidence that remains unverified. When RTK is already available, `$use-rtk` may compact
routine supported validation output, but preserve raw link, build, or rendering failures when
diagnosis depends on details the compact view omits.
