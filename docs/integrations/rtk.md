# RTK integration

`use-rtk` can use [Rust Token Killer](https://github.com/rtk-ai/rtk) to reduce repetitive
shell-command output before it enters an AI coding agent's context. RTK is optional: every
workflow must retain a direct-command fallback, and exact raw output remains authoritative
for diagnosis, auditing, or contracts that depend on ordering, whitespace, warnings, or
complete logs.

## Trust boundary

The `core-skills` plugin does not install RTK, register hooks, patch agent settings, or update
the binary. Those actions change the developer environment and require explicit authorization.
Review the upstream repository, release, installation method, files changed by `rtk init`, and
the selected project or global scope before proceeding.

Two unrelated projects use the `rtk` name. Verify that an existing binary is the `rtk-ai/rtk`
token-saving proxy before relying on it:

```bash
rtk --version
rtk gain
```

The second command should display RTK's savings dashboard. A version string alone does not
disambiguate the similarly named Rust Type Kit package.

## Install

Use one upstream-supported installation method only after authorization. For macOS or Linux,
the maintainer currently documents Homebrew and its installer:

```bash
brew install rtk-ai/tap/rtk
```

```bash
curl -fsSL https://raw.githubusercontent.com/rtk-ai/rtk/refs/heads/master/install.sh | sh
```

Piping a remote script to a shell executes current upstream code; inspect the script or choose
a package-manager or release-binary installation when that trust model is inappropriate. The
upstream [installation guide](https://github.com/rtk-ai/rtk/blob/develop/docs/guide/getting-started/installation.md)
also documents Windows, Cargo, release binaries, verification, and removal.

## Configure an agent

Prefer explicit `rtk` commands until the behavior is understood. Before allowing transparent
command rewriting, preview the files and settings RTK would change:

```bash
rtk init --global --dry-run
```

Then use the current upstream command for the selected agent and scope. For Codex, RTK currently
documents project and global hook modes:

```bash
rtk init --codex
rtk init --global --codex
```

Restart the agent after initialization and verify the integration with `rtk init --show` plus a
small supported command such as `rtk git status`. Consult RTK's
[supported-agents guide](https://github.com/rtk-ai/rtk/blob/develop/docs/guide/getting-started/supported-agents.md)
rather than reusing another agent's hook command.

## Runtime behavior and fallback

When RTK is available, the bundled `use-rtk` skill selects supported wrappers and decides when
to rerun the underlying command. Transparent hooks are convenient but make command provenance
less obvious, so explicit invocation remains useful during adoption and debugging.

Filtering never broadens authorization: a compacted push, deployment, container operation, or
destructive command has the same side effects and approval requirements as its raw form. Verify
exit codes, preserve authoritative artifacts, and rerun the smallest raw diagnostic whenever
compaction removes evidence needed to reach a conclusion.

For command mapping and fallback behavior, see the skill's
[RTK reference](../../plugins/core-skills/skills/use-rtk/references/commands.md).
