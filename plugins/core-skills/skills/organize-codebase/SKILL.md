---
name: organize-codebase
description: Propose or improve a codebase folder structure when application boundaries, feature ownership, shared code, tests, or framework conventions need a coherent layout.
---

# Organize Codebase

Design the folder structure around ownership, dependency direction, deployment boundaries,
and how contributors locate code. Inspect the existing repository, build and import tooling,
framework conventions, tests, and several representative modules before proposing change.
Preserve a clear existing convention unless concrete navigation, coupling, or scaling
problems justify migration.

Choose the simplest layout that fits the system. Small applications may benefit from a few
technical folders; larger applications usually need feature or domain boundaries. Keep
independently deployable applications separate from reusable packages. Treat `shared`,
`common`, `helpers`, and `utils` as claims of broad ownership: place code there only when it
has multiple real consumers and no more specific domain owner.

Within a domain or shared boundary, use named concern directories such as `types/`,
`utils/`, `constants/`, `errors/`, `models/`, `schemas/`, `services/`, and `repositories/`
when those concerns exist. Omit an unused concern instead of creating an empty placeholder,
but do not collapse several responsibilities into broad sibling files such as `types.py`,
`utils.ts`, or `service.py`. Files are leaves inside the owning concern directory; folders
communicate the ownership and extension boundary.

Read only the reference matching the current codebase:

- [React applications](references/react.md)
- [Node.js services](references/node-service.md)
- [Python services](references/python-service.md)
- [Full-stack and multi-application monorepos](references/monorepo.md)

Present the proposed tree with responsibilities, allowed dependency direction, examples of
where representative existing files belong, and important exceptions. When restructuring
an existing repository, separate the target layout from the migration sequence. Preserve
public imports and build entrypoints or plan explicit compatibility changes; avoid a flag-day
move when incremental seams are available.

Use `$reuse-code` to find existing shared facilities before creating new common folders.
Use `$improve-architecture` when the proposal changes runtime, ownership, or dependency
boundaries. After the structure is accepted, use `$enforce-structure` only when deterministic
validation is valuable. Do not move files merely because a sample tree looks cleaner.
