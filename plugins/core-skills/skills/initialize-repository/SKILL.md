---
name: initialize-repository
description: Create or modernize a repository foundation when a web app, API, service, library, or monorepo needs an appropriate toolchain, quality gates, dependency baseline, and contributor workflow. Do not use for ordinary feature work or folder-only reorganization.
---

# Initialize Repository

Build the smallest maintainable repository baseline that fits the actual runtime and delivery
model. Inspect existing files, package managers, lockfiles, CI, deployment configuration, and
local instructions before changing anything. When starting from a template, treat the template
as evidence rather than authority: keep useful conventions, remove irrelevant features, and do
not overwrite user work.

## Decide the profile

Identify whether the primary deliverable is a browser application, Node.js API or worker,
Python service, Go service, reusable library, or multi-application monorepo. Clarify only choices
that materially affect the result, such as framework, package manager, deployment target, or
whether the repository is truly polyglot. Prefer the repository's established package manager;
for a new JavaScript repository, prefer pnpm unless the user or hosting platform requires
another choice.

Read [shared repository standards](references/shared-standards.md) for every initialization,
then read only the matching profile:

- [TypeScript web applications](references/typescript-web.md)
- [Node.js APIs, workers, and libraries](references/node-service.md)
- [Python APIs and services](references/python-service.md)
- [Go APIs and services](references/go-service.md)
- [Polyglot and JavaScript monorepos](references/monorepo.md)

Read [formatting, linting, and hooks](references/quality-tooling.md) when configuring Prettier,
ESLint, Ruff, pre-commit, Husky, Markdownlint, or other repository checks.

Read [testing strategy](references/testing.md) whenever the repository ships executable behavior,
and [CI/CD and repository automation](references/ci-cd.md) when adding workflows or a scripting
layer.

## Establish the baseline

Pin developer runtimes with Mise and commit `mise.toml` plus its lockfile when the installed
Mise version produces one. Pin package-manager versions through their native metadata as well;
Mise controls the executable, while manifests and lockfiles preserve ecosystem behavior.

Add only dependencies with an immediate consumer. Separate runtime dependencies from developer
tooling. Use schema validation at untrusted boundaries, not as a replacement for internal static
types. For CSS class composition, choose one primitive rather than overlapping packages; in a
Tailwind application, `clsx` plus `tailwind-merge` is usually sufficient, with
`class-variance-authority` reserved for a real variant system.

Provide a small, stable command surface—normally setup, development, format, lint, typecheck,
test, build, and CI. Package scripts own ecosystem commands; a Makefile or Mise tasks may provide
cross-language aliases without duplicating their implementation. Beware command-name collisions:
for example, call a package script named `ci` with `pnpm run ci`, because `pnpm ci` is an install
command.

Configure local hooks as fast feedback, not as the only enforcement point. CI must rerun every
required check from a clean install. Keep pre-commit checks focused and deterministic; move full
test suites, production builds, and external link checks to pre-push or CI when they are too slow
for every commit.

## Preserve boundaries

Do not add infrastructure, containers, deployment workflows, release automation, databases,
authentication, UI libraries, or observability vendors without a present requirement. Do not
install both Husky and the Python pre-commit framework merely for uniformity: select hooks by the
repository's primary ecosystem, and define an explicit owner for polyglot hooks.

Agent-specific helpers are not part of the default repository baseline. When the user requests
them or an existing workflow demonstrates a concrete context, search, or navigation bottleneck,
use `$select-agent-tooling` to choose the smallest justified set. If RTK is selected or already
available, use `$use-rtk` for its setup and raw-output fallback rules rather than embedding a
second RTK policy here.

Use `$organize-codebase` when source ownership and folder boundaries also need design. Use
`$production-ready` only when deployment and operational readiness are in scope. Use
`$dependency-upgrade` when modernizing an established dependency graph rather than creating its
baseline.

## Verify the result

Install from the committed lockfile, ensure hook installation succeeds, and run the same complete
command CI will execute. Verify formatting, linting, type checking, tests, and production builds
that apply to the selected profile. Confirm a clean checkout can discover required environment
variables from a non-secret example file and that generated caches or build output are ignored.
Report intentional omissions and any decisions the repository owner still needs to make.
