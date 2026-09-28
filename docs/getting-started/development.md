# Development setup

## Prerequisites

Install [Mise](https://mise.jdx.dev/getting-started.html). The repository then installs its
pinned Node, pnpm, Python, ShellCheck, Lychee, typos, Actionlint, and yamllint toolchain.

```bash
make setup
```

`make setup` runs the pinned package installation. The root `prepare` lifecycle installs
Husky's versioned Git hooks; `make hooks` is available when hooks need to be repaired
without reinstalling dependencies. CI sets `HUSKY=0` because server-side checks do not need
local Git hooks.

## Contributor workflow

1. Read `AGENTS.md`, `CONTEXT.md`, and the relevant authoring guide.
2. Inspect the complete skill or plugin before editing it.
3. Preserve unrelated working-tree changes.
4. Make the smallest coherent change and update user-facing documentation or the changelog
   when behavior, installation, or packaging changes.
5. Run `make check` while iterating and `make ci` before completion.

Do not stage, commit, push, tag, publish, or install local agent assets unless the user
explicitly requests that action.

## Common commands

```bash
make help          # list supported commands
make check         # repository checks used during development
make ci            # complete local CI, including external links
make validate      # validate plugin and skill structure
make test          # run validator behavior tests
make format        # apply Prettier formatting
make format-check  # verify formatting without writes
make markdown      # check Markdown structure
make markdown-fix  # apply safe Markdownlint fixes
make links         # check local and external links
make shellcheck    # statically analyze executable shell scripts
make hooks         # reinstall Husky hooks
```

Runtime-specific validators such as `claude plugin validate .` or
`grok plugin validate .` require the corresponding CLI and supplement rather than replace
the repository validator.

## Adding an asset

- Add skills under `plugins/<plugin>/skills/<skill-name>/`.
- Keep conditional details in the owning skill's `references/` directory.
- Put deterministic helpers in the owning skill's `scripts/` directory and test them.
- Add a new plugin only when capabilities need a separate installation, dependency, or
  release lifecycle.
- Extend `src/` and `test/` together when changing a structural validation contract.

See [Authoring skills](../authoring/skills.md),
[Authoring plugins](../authoring/plugins.md), and
[Validation](../reference/validation.md) for the detailed contracts.
