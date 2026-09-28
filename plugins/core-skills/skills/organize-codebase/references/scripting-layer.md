# Repository scripting layer

Treat repository scripts as a small internal product. They provide stable, locally runnable
entrypoints for workflows that are too involved for one package-manager command and should not be
buried inside CI YAML.

## Structure by caller and responsibility

```text
scripts/
├── setup/
│   ├── repository          complete contributor bootstrap
│   └── install-git-hooks   hook installation when not package-managed
├── ci/
│   ├── check               local equivalent of required CI
│   ├── check-links         focused link policy
│   └── check-shell         shell validation
├── dev/                    repeatable development workflows
├── migrations/             explicit compatibility or data transitions
├── release/                version, package, sign, and publish preparation
└── operations/             bounded operator commands owned by this repository
```

Use domain names instead of generic `helpers/` or a flat script dump. In an infrastructure
repository, domain folders such as `kubernetes/`, `tofu/`, `flux/`, or `applications/` may be more
useful than generic `operations/`. In a monorepo, keep truly repository-wide automation at the root
and application-specific scripts inside the owning application.

Create a folder only with its first real command. A repository with two scripts may keep
`scripts/setup` and `scripts/check`; do not manufacture taxonomy before it improves navigation.

## Layering

- Package manifests own short ecosystem commands such as format, lint, typecheck, unit tests, and
  build.
- Scripts compose commands, handle environment preparation, or express multi-step workflows.
- Make or Mise exposes a memorable cross-ecosystem command surface.
- Git hooks call the same stable entrypoints for fast feedback.
- CI invokes the same scripts from a clean environment and adds platform concerns such as caches,
  permissions, artifacts, matrices, and deployment approvals.

Keep orchestration in one layer. If `scripts/ci/check` aggregates validation, the Make target and CI
workflow should call it instead of repeating its commands. Avoid chains where scripts call Make,
Make calls package scripts, and package scripts call back into the same script.

## Script contracts

For shell entrypoints:

- use `#!/usr/bin/env bash` only when Bash features are intentional;
- enable `set -euo pipefail`;
- calculate the repository root from the script location and `cd` there;
- quote paths and forward arguments intentionally;
- validate required tools and input before mutation;
- keep non-interactive CI behavior explicit;
- send errors to stderr and make success/failure exit codes reliable;
- make destructive targets narrow, explicit, and opt-in.

Prefer a typed language for non-trivial parsing, structured data transformations, API clients, or
logic that deserves tests. Name the file by its responsibility, keep shared script libraries under a
language-specific internal folder only after multiple scripts need them, and test important script
behavior like other production code.

## Boundaries and documentation

Document public script entrypoints through `make help`, Mise task descriptions, or a focused
`scripts/README.md` when the command set is too large to discover safely. The README should explain
contracts and ownership, not duplicate every implementation detail. Generated, vendored, and
dependency-owned scripts are not part of the repository's scripting architecture.
