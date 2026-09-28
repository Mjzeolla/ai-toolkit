# Shared repository standards

Use this baseline for every repository, then specialize it with the matching runtime profile.

## Runtime and dependency control

- Pin language runtimes and global developer tools in `mise.toml`; commit `mise.lock` when used.
- Commit exactly one lockfile per ecosystem boundary and use frozen or locked installs in CI.
- Declare supported runtime ranges in ecosystem metadata such as `engines`, `requires-python`, or
  `go.mod`, in addition to the local Mise pin.
- Prefer current supported releases. Resolve versions from the package registry or official
  release source at initialization time rather than copying stale versions from this reference.
- Enable automated dependency updates only after the repository has tests and an accountable
  review path.

## Root files

Create only files that carry an active responsibility:

```text
repository/
├── .github/workflows/ci.yml   required clean-environment checks
├── .editorconfig              editor-neutral whitespace defaults
├── .env.example               names and safe example values, never secrets
├── .gitignore                 generated output, caches, local environment
├── AGENTS.md                  repository-local agent constraints when useful
├── CONTRIBUTING.md            contributor workflow for shared repositories
├── LICENSE                    only when the owner has chosen a license
├── Makefile                   optional cross-ecosystem command facade
├── README.md                  purpose, setup, commands, architecture, deployment
└── mise.toml                  runtime and tool pins
```

Do not create empty directories or placeholder policy files. Keep configuration close to the
tool that consumes it and split large configuration only when the tool supports a meaningful
composition model.

## Command contract

Expose the applicable subset of these semantic commands:

| Command     | Contract                                                       |
| ----------- | -------------------------------------------------------------- |
| `setup`     | Install pinned tools, locked dependencies, and local hooks     |
| `dev`       | Start the normal local development loop                        |
| `format`    | Apply deterministic formatting                                 |
| `lint`      | Run static style and defect checks                             |
| `typecheck` | Run static type analysis without emitting build artifacts      |
| `test`      | Run deterministic automated tests                              |
| `build`     | Create the production or distributable artifact                |
| `check`     | Run non-mutating validation suitable before a commit           |
| `ci`        | Reproduce the complete required CI validation, including build |

Keep one implementation for each check. Hooks, Make, Mise, and CI should invoke that implementation
instead of reproducing long command lists.

## CI and repository hygiene

- Use least-privilege workflow permissions, timeouts, dependency caching, and locked installs.
- Run validation on pull requests and the protected default branch. Add release or deployment
  workflows only when delivery requirements are known.
- Ignore build output, dependency directories, coverage output, type caches, local environment
  files, editor state, and operating-system metadata.
- Preserve `.env.example`; ignore `.env` and environment-specific secret files.
- Add Markdown link checking, secret scanning, license checks, or typo checking when the repository's
  documentation volume or risk justifies the maintenance cost.

## Selection rules

- A browser UI may justify Tailwind and class-composition utilities; an API usually does not.
- A published library needs exports, API compatibility, package provenance, and a publish dry run;
  a private application does not need library bundling metadata.
- A service needs health, configuration, logging, graceful shutdown, and integration tests when
  those runtime surfaces exist; a pure library does not.
- Docker is a deployment or reproducibility decision, not a universal repository requirement.
