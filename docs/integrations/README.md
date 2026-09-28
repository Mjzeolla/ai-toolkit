# Integrations

Integrations are optional external capabilities that a bundled skill can use when they are
already available or the user authorizes installation. They are not dependencies of the
`core-skills` plugin, and installing the plugin does not install, configure, update, or trust
them automatically.

## Dedicated guides

- [Archify](archify.md) adds an optional interactive HTML workflow to
  `architecture-diagramming`.
- [RTK](rtk.md) compacts supported shell-command output for `use-rtk` and the workflows that
  conditionally route to it.

A dedicated guide is warranted when several skills need the same installation, trust,
availability-detection, lifecycle, and fallback rules. The installed third-party tool and its
maintainer documentation remain authoritative for commands and supported versions.

## Other agent helpers

`select-agent-tooling` also compares focused helpers such as Repomix, Serena, Context7,
ast-grep, and Sourcegraph. They remain selection candidates rather than first-class toolkit
integrations until a bundled workflow needs maintained setup or interoperability guidance.
See the skill's
[helper-selection reference](../../plugins/core-skills/skills/select-agent-tooling/references/helpers.md)
for the decision boundaries.
