# Installation

## Recommended installation

Install the complete `core-skills` plugin. This is the supported default because it keeps
the versioned package boundary intact and guarantees that every conditional internal skill
reference can resolve.

Start a new agent session after installing or updating the plugin so the runtime discovers
the current skills and metadata.

## Codex

```bash
codex plugin marketplace add Mjzeolla/ai-toolkit
codex plugin add core-skills@mzeolla-ai-toolkit
```

Inspect, update, or remove it with:

```bash
codex plugin marketplace list
codex plugin list --available --json
codex plugin marketplace upgrade mzeolla-ai-toolkit
codex plugin remove core-skills@mzeolla-ai-toolkit
codex plugin add core-skills@mzeolla-ai-toolkit
codex plugin marketplace remove mzeolla-ai-toolkit
```

Codex also provides an interactive plugin browser through `/plugins`. See the
[OpenAI plugin documentation](https://learn.chatgpt.com/docs/plugins) for supported
surfaces.

## Claude Code

```bash
claude plugin marketplace add Mjzeolla/ai-toolkit
claude plugin install core-skills@mzeolla-ai-toolkit
claude plugin list
claude plugin marketplace update mzeolla-ai-toolkit
claude plugin update core-skills@mzeolla-ai-toolkit
```

Removal:

```bash
claude plugin uninstall core-skills@mzeolla-ai-toolkit
claude plugin marketplace remove mzeolla-ai-toolkit
```

See the [Claude Code plugin reference](https://code.claude.com/docs/en/plugins-reference)
for scopes and enablement behavior.

## Grok Build

Grok consumes the Claude-compatible marketplace and manifest included in this repository.

```bash
grok plugin marketplace add Mjzeolla/ai-toolkit
grok plugin install core-skills --trust
grok plugin enable core-skills
grok plugin list --json
grok plugin marketplace update mzeolla-ai-toolkit
grok plugin update core-skills
```

Removal:

```bash
grok plugin disable core-skills
grok plugin uninstall core-skills --confirm
grok plugin marketplace remove https://github.com/Mjzeolla/ai-toolkit.git
```

Review the [Grok Build plugin guide](https://github.com/xai-org/grok-build/blob/main/crates/codegen/xai-grok-pager/docs/user-guide/09-plugins.md)
before using `--trust`.

## GitHub Copilot CLI

```bash
copilot plugin marketplace add Mjzeolla/ai-toolkit
copilot plugin marketplace browse mzeolla-ai-toolkit
copilot plugin install core-skills@mzeolla-ai-toolkit
copilot plugin list
copilot plugin marketplace update mzeolla-ai-toolkit
copilot plugin update core-skills
```

Removal:

```bash
copilot plugin uninstall core-skills
copilot plugin marketplace remove mzeolla-ai-toolkit
```

See the [GitHub Copilot CLI plugin reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-plugin-reference)
for direct-source installation and bulk updates.

## Make wrappers

The repository provides wrappers for common marketplace operations. They default to Codex:

```bash
make plugin-marketplace-add
make plugin-install
make plugin-list
make plugin-update
```

Select another supported runtime with `PLUGIN_AGENT=claude|grok|copilot`. The wrappers also
provide `plugin-marketplace-list`, `plugin-uninstall`, and `plugin-marketplace-remove`.
These commands mutate user-level agent configuration, so inspect `make help` before running
them against a fork or custom marketplace.

## Selective skill installation

The [`skills` CLI](https://github.com/vercel-labs/skills) can install individual skills for
agents that support the Agent Skills directory format:

```bash
# Browse available skills
npx skills add https://github.com/Mjzeolla/ai-toolkit/tree/main/plugins/core-skills --list

# Install one skill for the current project
npx skills add https://github.com/Mjzeolla/ai-toolkit/tree/main/plugins/core-skills \
  --skill code-review --agent codex

# Install the complete catalog globally
npx skills add https://github.com/Mjzeolla/ai-toolkit/tree/main/plugins/core-skills \
  --skill '*' --agent codex --global

# Run one skill without permanent installation
npx skills use https://github.com/Mjzeolla/ai-toolkit/tree/main/plugins/core-skills \
  --skill code-review --agent codex
```

Manage direct installations with:

```bash
npx skills list --agent codex
npx skills update code-review
npx skills remove code-review --agent codex
```

Selective installation is supported, but referenced skills are conditional companions—not
automatically resolved dependencies. Use the companion profiles in
[Skill composition](../concepts/skill-composition.md) when choosing a subset. Prefer the
native plugin whenever possible.

## Trust and compatibility

Plugins and skills execute with the current user's permissions. Review a repository before
using a runtime's trust override. ChatGPT desktop uses its Plugins interface instead of
these shell commands. Do not assume an unlisted coding agent is compatible merely because
it can read Markdown.
