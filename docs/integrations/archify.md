# Archify integration

`architecture-diagramming` can use the independently maintained
[Archify skill](https://github.com/tt-a1i/archify) to create validated, interactive,
self-contained HTML diagrams. Archify is optional: draw.io, Mermaid, or another appropriate
format remains available when it is not installed.

## Install or try it

Install Archify globally through its upstream-supported installer:

```bash
npx skills add tt-a1i/archify -g
```

Try it for one Codex session without permanent installation:

```bash
npx skills use tt-a1i/archify@archify --agent codex
```

Start a new session after installation so the runtime can discover it. Review Archify's
repository and installation behavior before authorizing installation; `core-skills` does
not install, vendor, pin, or update it.

## Runtime behavior

The diagramming skill checks whether Archify is available before selecting its workflow.
When present, the installed Archify `SKILL.md`, schemas, references, and commands are
authoritative. When absent, the agent should explain the optional integration and continue
with a suitable fallback unless the user authorizes installation.

This avoids a false hard dependency, stale copied schemas, conflicting installations, and
ambiguous ownership of third-party runtime code.

For detailed authoring and delivery behavior, see the diagramming skill's
[Archify reference](../../plugins/core-skills/skills/architecture-diagramming/references/archify.md).
