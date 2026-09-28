# Validation reference

## Validation layers

| Layer                        | Purpose                                                     |
| ---------------------------- | ----------------------------------------------------------- |
| Prettier                     | Consistent formatting for supported text formats            |
| Markdownlint                 | Markdown structure and style                                |
| ESLint and TypeScript        | Validator implementation quality and type safety            |
| Node tests                   | Observable validator behavior and regression coverage       |
| Catalog validator            | Plugin manifests, skill structure, metadata, and references |
| ShellCheck                   | Static analysis for executable shell scripts                |
| yamllint and Actionlint      | YAML and GitHub Actions correctness                         |
| typos                        | Repository spelling checks                                  |
| Lychee                       | Local and external Markdown link resolution                 |
| Secret and dependency checks | Accidental disclosure and supply-chain risk                 |

## Local commands

`pnpm check` contains Node-managed checks. `make check` adds repository tooling suitable
for normal iteration. `make ci` is the complete local verification boundary and includes
external link checks.

```bash
make check
make ci
make validate
make links
make shellcheck
```

Run focused tests first when changing validator behavior, then the complete suite. New or
changed Markdown links require `make links` when network access is available.

## Git hooks

Husky owns versioned hooks because Node is already a required repository runtime.

- Pre-commit performs staged-file safety checks and fast local validation.
- Pre-push runs the complete CI boundary, including external links.
- Hosted CI repeats required checks so bypassing local hooks cannot merge invalid assets.

Lychee is a standalone Rust tool managed by Mise; it is not a Python dependency. Python
remains in the toolchain for pipx-managed yamllint. `make setup` installs pinned tools and
Node dependencies, whose `prepare` lifecycle installs Husky hooks.

## Completion evidence

A documentation or asset change is complete when formatting, Markdown lint, catalog
validation, tests, and relevant links pass. A tooling change additionally needs type,
shell, workflow, and integration checks proportional to its affected surface. Never weaken
a validator merely to make a new asset pass.
