# Authoring plugins

Create a plugin when a capability needs a separately installable bundle of skills, MCP
servers, apps, commands, or shared metadata. Do not add a plugin wrapper merely to group
similar Markdown files.

Each plugin must include at least one manifest for a supported target runtime. For
example, a Codex plugin uses:

```text
plugins/example-plugin/
└── .codex-plugin/
    └── plugin.json
```

A Claude plugin uses the equivalent runtime-owned location:

```text
plugins/example-plugin/
└── .claude-plugin/
    └── plugin.json
```

A genuinely cross-runtime plugin may contain both manifests. Do not add a manifest for
a runtime the plugin does not support merely to make its directory look symmetrical.

The manifest must include a kebab-case `name`, semantic `version`, and useful
`description`. Every included manifest must satisfy these rules. Add only directories
recognized by its target plugin runtime. Keep all
plugin-owned resources underneath its root so the package remains independently movable.

Before adding a real plugin, verify the current runtime manifest schema and installation
workflow. Plugin interfaces evolve independently from the repository's catalog validator;
the validator deliberately enforces only stable identity invariants.

Run `make check` before review. A release archive includes the complete `plugins/`
directory, so never store local credentials, generated caches, or test installations
inside a plugin package.
