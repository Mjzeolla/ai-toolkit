# Module documentation structure

Use a `modules/*` documentation section when a larger codebase has stable modules with distinct
ownership, behavior, interfaces, or operational lifecycles. Mirror real architectural boundaries;
do not invent documentation modules solely to reduce the number of sibling files.

## Recommended shape

```text
docs/
├── index.md
├── getting-started/
├── architecture/
│   ├── index.md
│   ├── decisions/
│   ├── diagrams/
│   └── system/
├── modules/
│   ├── authentication/
│   │   ├── index.md
│   │   ├── architecture/
│   │   │   ├── index.md
│   │   │   ├── decisions/
│   │   │   └── diagrams/
│   │   │       ├── authentication-context.drawio
│   │   │       └── token-flow.mmd
│   │   ├── guides/
│   │   │   ├── development.md
│   │   │   └── operations.md
│   │   ├── reference/
│   │   │   ├── configuration.md
│   │   │   └── interfaces.md
│   │   └── troubleshooting/
│   │       └── index.md
│   └── billing/
│       ├── index.md
│       ├── architecture/
│       │   └── diagrams/
│       ├── guides/
│       └── reference/
├── guides/
├── reference/
└── troubleshooting/
```

Adapt directory names to the documentation framework and omit empty concerns. Every navigable module
folder needs a useful landing page that states its responsibility, boundaries, owner, primary entry
points, dependencies, and links to deeper material.

## Ownership rules

- Store a diagram under the narrowest module whose lifecycle it explains. Keep its editable source
  there, with a rendered artifact only when the site or reviewers cannot render the source directly.
- Keep module-specific decisions, runbooks, configuration, interfaces, and troubleshooting with that
  module so code and documentation ownership remain aligned.
- Keep system context, shared deployment topology, cross-module flows, platform-wide decisions, and
  shared operational procedures under the repository-level `architecture/`, `guides/`, or `reference/`.
- Link to one canonical explanation rather than copying cross-module guidance into every module.
- A module may link to another module's public contract, but should not depend on undocumented sibling
  internals.

## Choosing module boundaries

Use a module folder when at least one of these is true:

- the module has a distinct team or maintainer;
- it exposes a meaningful interface to other modules;
- it has its own architecture, data model, deployment, or operational behavior;
- contributors regularly need several related pages to work safely in it; or
- its diagrams and runbooks change with the module rather than the entire system.

Do not create one documentation module per source directory, package, class, or small utility. Small
modules can remain a section on a parent page until their content and ownership justify a directory.

## Diagrams

Use `$architecture-diagramming` when creating or revising module diagrams. A module commonly benefits
from a boundary or container view and, when needed, focused runtime sequence, data-flow, or deployment
views. Keep each diagram focused on one architectural question and accompany it with concise prose,
assumptions, and evidence links.

For a flow spanning several modules, store the canonical diagram under repository-level architecture
and link to it from each affected module. Do not maintain slightly different copies of the same
cross-module diagram.

## Navigation and validation

Add `modules/` and each included module to the documentation site's navigation metadata. When moving
published pages into modules, preserve routes with direct redirects, update inbound links and indexes,
and check for redirect chains. Run formatting, Markdown or MDX linting, local-link checks, route checks,
diagram rendering, and the documentation build when available.
