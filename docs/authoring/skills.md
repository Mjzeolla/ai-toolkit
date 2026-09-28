# Authoring skills

## Start with discovery

Choose a short kebab-case name and a description that states the capability and the
conditions that should activate it. Descriptions are routing metadata, not summaries of
every instruction.

```text
plugins/core-skills/skills/example-skill/
├── SKILL.md
├── agents/
│   └── openai.yaml
├── references/  optional conditional guidance
├── scripts/     optional deterministic helpers
└── assets/      optional output resources
```

Only create directories with an actual owner and use. Do not add placeholder files or a
skill-local README.

## Write the entrypoint

`SKILL.md` begins with matching frontmatter:

```yaml
---
name: example-skill
description: Perform a bounded capability when its distinguishing conditions apply.
---
```

Write for an already capable agent. Include non-obvious decisions, invariants, boundaries,
and validation expectations. Avoid generic encouragement, copied manuals, exhaustive edge
cases, or a rigid sequence where several approaches are safe.

Keep unconditional guidance in `SKILL.md`. Move format-, framework-, or mode-specific
procedures into focused files under `references/`, and link each one where the agent should
read it. Put repeated deterministic transformations in tested scripts. Assets belong in
generated output and are not extra instruction files.

## Compose deliberately

Reference another bundled capability only when a recognizable branch benefits from it.
State the condition next to the handoff, keep the current skill independently useful, and
avoid chains that load the whole catalog.

External skills use the optional-integration pattern rather than an internal invocation
reference. See [Skill composition](../concepts/skill-composition.md) for installation
profiles and third-party boundaries.

## Invocation policy

Automatic selection is the default. Set `policy.allow_implicit_invocation: false` only for
a capability the user must deliberately choose, such as an interview style, brief-response
mode, broad orchestration, delegation strategy, or no-questions autonomy. Security-sensitive
operations still require authorization at the mutation boundary; explicit-only discovery
does not replace that check.

## OpenAI-facing metadata

`agents/openai.yaml` may contain:

```yaml
interface:
  display_name: "Example Skill"
  short_description: "A concise description for skill discovery"
  default_prompt: "Use $example-skill to complete this example request."
```

Quote strings and mention the exact skill in the default prompt. Add icons, supported tool
dependencies, or invocation policy only when they are real parts of the interface.

## Review and validation

Check positive and negative routing examples: requests that should activate the skill and
similar requests that should not. Confirm that the result remains useful without hidden
repository context and does not broaden authorization.

Run:

```bash
make validate
make check
```

The validator checks structure and references; it cannot prove judgment quality. Tests
should exercise observable behavior or deterministic helpers rather than matching preferred
prose.
