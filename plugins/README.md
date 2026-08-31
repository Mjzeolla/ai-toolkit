# Plugins

Each child directory is an independently installable plugin with at least one supported
runtime manifest, such as `.codex-plugin/plugin.json` or
`.claude-plugin/plugin.json`. A cross-runtime plugin may provide both. See
[Authoring plugins](../docs/authoring-plugins.md) before creating one.

This directory contains no placeholder package. Add a plugin only when a capability needs
plugin-specific packaging or dependencies.
