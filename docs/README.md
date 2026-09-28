# Documentation

This documentation is organized by user intent instead of placing unrelated guides in one
flat directory.

## Getting started

- [Installation](getting-started/installation.md) explains native plugin installation,
  selective skill installation, updates, and removal.
- [Development setup](getting-started/development.md) covers the pinned toolchain, Husky
  hooks, common commands, and the contributor workflow.

## Concepts

- [Catalog architecture](concepts/architecture.md) describes skills, plugins,
  marketplaces, and validation boundaries.
- [Skill composition](concepts/skill-composition.md) explains dollar-prefixed references,
  companion skill sets, explicit-only modes, and external integrations.

## Authoring

- [Authoring skills](authoring/skills.md) covers discovery metadata, progressive
  disclosure, composition, metadata, and validation.
- [Authoring plugins](authoring/plugins.md) covers package boundaries, manifests,
  marketplaces, compatibility, and releases.

## Integrations

- [Integration overview](integrations/README.md) explains the optional external-capability
  boundary and when a helper receives a dedicated guide.
- [Archify](integrations/archify.md) documents interactive diagramming, installation choices,
  and fallback behavior.
- [RTK](integrations/rtk.md) documents output compaction, installation trust, agent hooks,
  verification, and raw-command fallbacks.

## Reference

- [Repository layout](reference/repository-layout.md) maps directories to ownership.
- [Validation](reference/validation.md) lists checks, hooks, and the evidence required
  before a change is complete.
