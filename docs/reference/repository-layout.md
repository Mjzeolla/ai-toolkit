# Repository layout

```text
.
├── .agents/
│   └── plugins/              Codex-compatible marketplace metadata
├── .claude-plugin/           Claude-compatible marketplace metadata
├── .github/
│   └── workflows/            CI, release, and security automation
├── .husky/                   versioned local Git hooks
├── docs/
│   ├── authoring/            skill and plugin creation contracts
│   ├── concepts/             architecture and composition model
│   ├── getting-started/      user installation and contributor setup
│   ├── integrations/         optional external capability guidance
│   └── reference/            repository and validation lookup material
├── plugins/
│   └── core-skills/
│       ├── plugin.json       portable package manifest
│       ├── .claude-plugin/   runtime compatibility manifest
│       └── skills/           flat runtime discovery root
├── scripts/
│   ├── ci/                   deterministic validation entrypoints
│   ├── dev/                  contributor utilities
│   └── setup/                workstation bootstrap
├── src/
│   ├── catalog/              validation orchestration
│   ├── plugin/               plugin manifest validation
│   ├── skill/                skill and reference validation
│   └── shared/               cross-domain types, utilities, and constants
└── test/                     validator behavior tests
```

## Ownership rules

- A plugin owns every resource required at installation and runtime.
- A skill owns its instructions, references, scripts, metadata, and output assets.
- Marketplace directories describe discovery; they do not contain skill implementations.
- `scripts/` contains repository operations, while a skill-specific helper stays with its
  skill.
- `src/shared/` contains only code with multiple real domain consumers and no narrower
  owner.
- Documentation belongs to the reader-oriented concern directory rather than the root of
  `docs/`.

Generated archives belong under `dist/` and are not committed. Local runtime caches,
credentials, and installed plugin copies must remain outside release-owned directories.
