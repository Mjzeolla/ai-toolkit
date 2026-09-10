# Authoring plugins

Each directory under `plugins/` is a portable Agent Plugin. Add a skill to `core-skills`
when it belongs in the general engineering and productivity collection; create another
plugin when a capability needs an independent installation lifecycle or dependencies.

The portable package boundary is:

```text
plugins/example-plugin/
├── plugin.json
├── .claude-plugin/plugin.json
└── skills/
    └── example-skill/
        ├── SKILL.md
        └── agents/openai.yaml
```

Each plugin's `plugin.json` must declare the Agent Plugins schema and include a stable
kebab-case name, semantic version, and useful description. Its name must match the plugin
directory. Compatible hosts discover skills directly from `skills/<skill-name>/`; do not
add category directories between `skills/` and a skill.

Claude Code requires its compatibility manifest at `.claude-plugin/plugin.json`. Keep its
identity and version synchronized with the portable root manifest. The root `plugin.json`
remains authoritative, and every plugin-owned resource must remain under that plugin root
so the package can be installed independently.

Before changing packaging, verify the current Agent Plugins manifest schema and
installation workflow. Plugin interfaces evolve independently from the repository's
validator, which deliberately enforces only stable identity and layout invariants.

Run `make check` before review. Release archives include `.agents/`, `.claude-plugin/`, and
`plugins/`, so never store credentials, generated caches, or test installations in those
locations.
