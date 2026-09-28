# Documentation structure

Organize documentation around reader intent, domain ownership, and maintenance lifecycle.
Do not keep a growing set of unrelated pages as siblings merely because they share a file
format. Preserve framework-controlled roots and route conventions, but introduce meaningful
folders before a section becomes a flat catalog.

## Repository documentation

Use this shape when documentation supports one code repository:

```text
README.md
CONTRIBUTING.md
docs/
├── getting-started/
│   ├── index.md
│   ├── installation.md
│   └── development.md
├── architecture/
│   ├── index.md
│   ├── decisions/
│   ├── diagrams/
│   └── system/
├── guides/
│   ├── development/
│   └── operations/
├── reference/
│   ├── configuration/
│   └── interfaces/
└── troubleshooting/
```

Omit unused sections. The root README is an entry point, not a duplicate of every guide.
Architecture decision records belong under `architecture/decisions/`; editable diagram
sources belong under the narrowest architecture domain that owns them. Keep a rendered
artifact adjacent only when readers or tooling cannot render the source format directly.

For a larger codebase with stable architectural or ownership modules, add `docs/modules/`
and let each substantial module own its landing page, module architecture, diagrams, guides,
references, and operations. Keep cross-module diagrams and system-wide decisions under the
repository-level `architecture/`. The `$author-documentation` skill's
[`module structure`](../../author-documentation/references/module-structure.md) reference
contains the detailed layout and boundary rules. Do not mirror every source directory or
create empty module scaffolding.

## Documentation site or personal knowledge base

Use stable top-level reader concerns, then organize growing areas by domain:

```text
content/
├── knowledge/
│   ├── languages/
│   ├── platforms/
│   └── tooling/
├── playbooks/
│   ├── development/
│   └── operations/
├── architecture/
│   ├── decisions/
│   ├── diagrams/
│   └── systems/
├── reference/
└── notes/
```

Knowledge explains durable concepts. Playbooks help perform repeatable work. Reference
pages expose exact contracts or lookup material. Notes may be provisional; promote them to
a maintained domain once their audience and owner are clear. Avoid a broad `misc/` or
`general/` section when a real domain exists.

Each navigable folder needs a meaningful landing page that explains its scope and routes
readers to its children. Do not create empty category scaffolding far ahead of actual
content. When several tools share a concern, group them under folders such as `formatting/`,
`linting/`, `testing/`, or `package-management/` instead of leaving one page per product in
a flat tooling directory.

## Dependency and migration rules

- Higher-level indexes may link into domains; domain pages should not depend on unrelated
  sibling internals.
- Keep reusable media and snippets with their owning domain unless they have multiple real
  consumers and the documentation framework provides a clear shared-assets convention.
- Preserve published URLs where practical. For route moves, add direct redirects to the
  final destination, update internal links and navigation, and validate against redirect
  chains or destinations that do not exist.
- Keep generated reference output separate from authored content and identify its source
  and regeneration command.
- Use `$author-documentation` for content quality and `$architecture-diagramming` for the
  diagram itself when reorganizing includes new explanatory material.
