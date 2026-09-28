# Authoring plugins

## Choose the package boundary

Add a skill to `core-skills` when it belongs to the general engineering and productivity
catalog. Create another plugin when capabilities need independent installation, versions,
permissions, dependencies, branding, or release cadence.

```text
plugins/
└── example-plugin/
    ├── plugin.json
    ├── .claude-plugin/
    │   └── plugin.json
    └── skills/
        └── example-skill/
            ├── SKILL.md
            └── agents/
                └── openai.yaml
```

Do not place category directories between `skills/` and individual skill folders. Runtime
discovery expects the flat plugin-owned skills root.

## Manifests

The root `plugin.json` is authoritative. It declares the portable Agent Plugins schema,
stable package name, semantic version, description, ownership, and optional product
extensions. The package name must match its directory.

The Claude compatibility manifest at `.claude-plugin/plugin.json` must keep identity and
version synchronized with the portable manifest. Do not place resources outside the plugin
root if installation requires them.

Verify the current Agent Plugins schema and runtime workflows before changing manifest
shape. Product interfaces evolve independently; the repository validator intentionally
enforces only the stable contracts it owns.

## Marketplace entries

`.agents/plugins/marketplace.json` and `.claude-plugin/marketplace.json` expose installable
packages. Entries point at the plugin root, not individual skills. Keep the source path,
plugin name, marketplace name, category, and installation policy consistent with the
package being shipped.

Do not use marketplace metadata as a cross-plugin dependency mechanism. Optional external
skills need discovery checks, fallbacks, and maintainer-owned installation documentation.

## Validation and release

Run `make check` during development and `make ci` before completion. When the relevant
runtime is installed, supplement repository checks with its native plugin validator.

Release archives include `.agents/`, `.claude-plugin/`, and `plugins/`. Never store
credentials, generated caches, local installations, or unpublished environment data in
those directories. User-visible package and installation changes belong in `CHANGELOG.md`.
