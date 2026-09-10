# Claude Code repository guidance

Read and follow [AGENTS.md](AGENTS.md); it is the canonical repository instruction file.

This repository is a marketplace of portable Agent Plugins. Skills live under their owning
plugin at `plugins/<plugin-name>/skills/`. Keep each plugin's root `plugin.json` and
`.claude-plugin/plugin.json`
authoritative; add runtime-specific compatibility metadata only when required.
