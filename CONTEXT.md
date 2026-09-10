# Repository context

## Purpose

This repository is a marketplace and authoring toolkit for portable Agent Plugins. It
favors small, independently activated capabilities over one universal prompt and has no
organizational or product affiliation.

## Domain model

- A **skill** is a directory whose `SKILL.md` describes when and how an agent should apply
  a bounded capability.
- A **plugin** is a versioned installation unit that owns its bundled skills.
- The **catalog validator** checks portable structural contracts. Human review owns
  judgment, safety, usefulness, and routing quality.

## Compatibility

Skills use portable Markdown instructions. Product-specific metadata is optional:
`agents/openai.yaml` adds OpenAI-facing presentation metadata, while each plugin's
`plugin.json` declares the portable package consumed by compatible coding agents.
