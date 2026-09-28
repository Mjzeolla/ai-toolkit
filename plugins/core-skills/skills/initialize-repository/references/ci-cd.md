# CI/CD and repository automation

Keep workflow YAML declarative and move reusable or locally valuable mechanics into versioned
repository scripts. A developer should be able to run the same validation command as CI without
copying workflow steps by hand.

## Scripting layer

Use responsibility folders once several scripts exist:

```text
scripts/
├── setup/
│   └── repository          install pinned tools, locked dependencies, and hooks
├── ci/
│   ├── check               aggregate the required local CI checks
│   ├── check-links         local and external link policy
│   ├── check-markdown      Markdown structure and generated-file exclusions
│   └── check-shell         ShellCheck plus script invariants
├── dev/                    repeatable local workflows that exceed one package command
├── release/                package, version, provenance, and publish preparation
└── operations/             explicit operator workflows when the repository owns them
```

Create folders only when they have a real script. Prefer extensionless executable entrypoints for
user-facing shell commands and descriptive extensions for language-specific helpers. Each shell
script should use strict mode, resolve the repository root from its own location, quote paths, avoid
assuming the caller's current directory, and print actionable failures. Keep Make targets and CI
steps thin: they call scripts or package-native commands rather than duplicate their bodies.

## Quality gates

Add gates according to maintained surfaces and risk:

- Markdownlint when Markdown or MDX is maintained as a product surface;
- Lychee when documentation contains links, separating deterministic local checks from networked
  external checks when hook latency or reliability matters;
- ShellCheck when shell scripts are maintained;
- actionlint for GitHub Actions workflows;
- yamllint when YAML volume justifies a style contract;
- secret scanning before merge and over repository history where exposure risk warrants it;
- type checking, tests, production builds, package inspection, and container validation for the
  artifacts the repository actually ships.

Pre-commit should be fast and focused. Pre-push may run the complete local CI command if the runtime
is acceptable. Hosted CI remains authoritative and must start from a locked clean install.

## Delivery boundary

Continuous integration validates every proposed change. Continuous delivery prepares a releasable
artifact; continuous deployment also mutates an environment. Do not add deployment credentials or
workflows before the target, approval model, rollback path, and ownership are known. Use least-
privilege permissions, explicit environments, concurrency controls, timeouts, artifact provenance,
and protected approvals in proportion to deployment risk.
