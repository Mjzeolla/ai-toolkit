# Claude Code repository guidance

Read and follow [AGENTS.md](AGENTS.md); it is the canonical repository instruction file.

This repository is a source catalog, not itself a Claude Code plugin. Category folders
under `skills/` are for catalog organization and are flattened into each selected agent
discovery directory by `scripts/dev/link-skills`. When a distributable Claude Code
plugin is added, place it under `plugins/<name>/`, keep its components at that plugin
root, and put only its manifest in `.claude-plugin/plugin.json`.

Do not add a repository-level Claude marketplace manifest until at least one valid plugin
package exists. Empty marketplace entries create an install surface with nothing usable.
