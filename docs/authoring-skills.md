# Authoring skills

## Start with routing

Choose a short kebab-case name and write a description that explains both the capability
and the circumstances that should activate it. The description is discovery metadata, not
a summary of every instruction.

Create this minimum plugin-native structure:

```text
plugins/core-skills/skills/example-skill/
├── SKILL.md
└── agents/openai.yaml
```

`SKILL.md` begins with:

```yaml
---
name: example-skill
description: Perform a specific capability when its distinguishing conditions apply.
---
```

Names must match the containing folder. Keep automatic invocation enabled unless the
capability is intentionally explicit-only.

Set `policy.allow_implicit_invocation: false` for a mode the user must deliberately select,
such as a terse response style, a question-driven interview, no-questions autonomy, or a
broad orchestration strategy. Do not use explicit-only merely because a capability is
security-sensitive; authorization checks still belong at the actual mutation boundary.

## Compose skills deliberately

Reference another installed catalog skill as `$skill-name` only when a recognizable branch
of the workflow benefits from that specialization. State the condition next to the
reference. The current skill must still define its own outcome and boundaries; a chain is
not a substitute for instructions.

Use `$task-completion` for end-to-end engineering coordination and `$autonomous-loop` for
bounded iterative execution. Use `$subagent-coordination` only when work can be partitioned
into independent scopes and the target environment supports delegation. Do not require
subagents for routine work or delegate mandatory instruction reading.

Use `$git-worktrees` when concurrent agents or tasks require isolated indexes and working
directories. Worktrees solve filesystem and branch isolation, not overlapping ownership.

## Write for an already capable agent

Include decisions, invariants, boundaries, and workflows that materially improve the
result. Avoid generic encouragement, repeated platform instructions, exhaustive edge-case
rules, or a fixed sequence where multiple approaches are safe.

Keep unconditional guidance in `SKILL.md`. Put substantial conditional detail in a focused
file under `references/` and link it at the point where the agent should read it. Use
scripts only for repeated deterministic work and test them directly. Assets are files
copied into an output, not extra instructions.

## Add interface metadata

`agents/openai.yaml` may provide:

```yaml
interface:
  display_name: "Example Skill"
  short_description: "A concise description between 25 and 64 characters"
  default_prompt: "Use $example-skill to complete this example request."
```

Quote string values. The default prompt must explicitly mention the skill. Add icons,
dependencies, or invocation policy only when they are real parts of the interface.

## Validate behavior

Run:

```bash
make validate
make check
```

The catalog validator recursively checks Markdown files under `references/`, including
their local links and every `$skill-name` reference. Each skill reference must resolve to
an installed catalog skill.

Review realistic requests the skill should and should not handle. Confirm its output is
useful without unpublished context and that its instructions preserve user authorization.
Tests should exercise observable behavior or deterministic helpers rather than matching
preferred prose.
