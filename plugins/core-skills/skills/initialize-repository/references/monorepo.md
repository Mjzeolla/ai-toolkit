# Polyglot and JavaScript monorepos

Use a monorepo only when components share release coordination, atomic changes, generated contracts,
or substantial development infrastructure. Co-location alone is not sufficient.

## Workspace ownership

```text
repository/
├── apps/       independently runnable or deployable products
├── packages/   reusable libraries with explicit consumers
├── tooling/    shared configuration packages and generators
├── scripts/    repository-wide automation
└── docs/       cross-cutting contributor and architecture documentation
```

Do not put deployable services in `packages/`, and do not turn `shared` into an unowned dependency
sink. Apply `$organize-codebase` to design domain and application interiors.

## Package management

For JavaScript, use pnpm workspaces and one root lockfile. Add Turborepo or Nx only when task graph
caching, affected-project execution, or orchestration materially improves the repository. Keep tasks
correct without remote caching and declare inputs and outputs accurately.

For Python, use uv workspaces when packages share one managed workspace and compatible release
semantics. For Go, prefer one module until independent modules are necessary; `go.work` improves
local coordination but should not conceal invalid module dependencies.

In a polyglot repository, Mise provides the top-level runtime contract and Make or Mise tasks may
provide the command facade. Each ecosystem still owns its manifests, lockfiles, formatting, and
tests. Choose one hook owner—often Husky when Node is already required, otherwise pre-commit for a
Python-led repository—and have it invoke ecosystem commands rather than installing competing hook
managers.

## Shared configuration

Share configuration only when consumers truly agree. Version or test shared ESLint, TypeScript,
testing, and build presets like code; avoid a root configuration that accidentally reaches every
package. Establish allowed dependency direction and enforce it only after boundaries are stable.

CI should validate lockfiles, run affected tasks when change detection is trustworthy, and retain a
periodic or merge-gate path that can run the full graph. Build independently deployable applications
as their actual delivery artifacts.
