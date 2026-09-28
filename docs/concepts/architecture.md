# Catalog architecture

The repository has three layers: versioned plugin assets, marketplace discovery metadata,
and the tooling that validates them.

## Skills

A skill is a bounded capability rooted at `skills/<name>/SKILL.md`. Frontmatter controls
discovery; the body contains instructions loaded when the skill is selected. Optional
`agents/`, `references/`, `scripts/`, and `assets/` directories remain owned by that skill.

Skills are deliberately small and independently understandable. They may route to another
capability, but they do not import sibling instruction files or depend on the repository's
category presentation.

## Plugins

A plugin is the installation and versioning boundary. Each directory under `plugins/` owns
its manifest and bundled skills. The portable `plugin.json` is authoritative;
`.claude-plugin/plugin.json` provides Claude-compatible discovery metadata.

Add a capability to `core-skills` when it belongs to the general engineering catalog.
Create another plugin when the capability needs an independent release, dependency,
permission, or installation lifecycle.

## Marketplaces

`.agents/plugins/marketplace.json` exposes packages to Codex-compatible discovery.
`.claude-plugin/marketplace.json` serves runtimes that consume the Claude-compatible
marketplace shape. Marketplace entries point at plugin packages; they do not flatten or
copy individual skills.

## Validator

The TypeScript validator checks repository-owned structural contracts:

- plugin identity, portable schema declaration, and compatible manifest versions;
- skill directory and frontmatter name agreement;
- useful descriptions and non-placeholder instructions;
- OpenAI-facing metadata shape;
- internal skill references that resolve within the catalog; and
- local Markdown links in skill instructions and nested references.

Human review still owns routing quality, correctness, safety, usefulness, and whether an
instruction adds meaningful judgment rather than generic advice.

The implementation is divided by ownership under `src/`: `catalog/` coordinates,
`plugin/` and `skill/` validate their domains, and `shared/types/`, `shared/utils/`, and
`shared/constants/` contain cross-domain support. The CLI adapter remains a small root
entrypoint.

## Delivery

Pull requests and releases repeat formatting, linting, type checking, unit tests, catalog
validation, YAML and workflow validation, spelling, link, shell, secret, and supply-chain
checks. Signed semantic-version tags package the marketplaces and plugin directories as the
reviewed release boundary.
