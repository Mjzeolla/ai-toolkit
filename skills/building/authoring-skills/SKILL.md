---
name: authoring-skills
description: Create or revise reusable agent skills when routing, instruction scope, supporting resources, or behavioral validation needs deliberate design.
---

# Authoring Skills

Design for discovery first. Give the skill a narrow, action-oriented name and a description
that distinguishes the requests that should activate it. Keep the entrypoint focused on
decisions and constraints an already capable agent would not reliably infer.

Preserve user intent and authorization. A skill may improve execution but must not broaden
the task, force a preferred product, or turn one incident into a universal rule. Keep
conditional procedures in focused references, repeated deterministic behavior in tested
scripts, and files intended for generated output in assets.

Make the skill independently usable. Reference another catalog skill only when the current
workflow genuinely benefits from it, and state the routing condition. Do not create an
implicit chain that loads every adjacent capability. For a workflow coordinator, use
`$task-completion`; for complex iterative execution, use `$autonomous-loop`.

Validate frontmatter, folder-name agreement, links, scripts, and realistic positive and
negative routing examples. Test observable behavior rather than exact wording. Remove
scaffold text, unused directories, duplicated guidance, and speculative edge cases before
calling the skill complete.
