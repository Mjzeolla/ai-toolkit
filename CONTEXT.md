# Repository context

## Purpose

This repository is a personal collection of reusable AI instructions, plugins, and related
agent assets. It favors small, independently installable capabilities over one universal
prompt and has no organizational or product affiliation.

## Domain model

- A **skill** is a directory whose `SKILL.md` describes when and how an agent should apply
  a bounded capability.
- A **category** organizes source assets for people. It is not part of a skill's runtime
  identity.
- A **plugin** is a versioned installation unit that can bundle skills with agents, hooks,
  tools, or application metadata.
- The **catalog validator** checks portable structural contracts. Human review owns
  judgment, safety, usefulness, and routing quality.
- **Linking** creates local symlinks from category-nested source skills into a flat agent
  discovery directory without copying or modifying source files.

## Compatibility

Skills use portable Markdown instructions. Product-specific metadata is optional:
`agents/openai.yaml` adds OpenAI-facing presentation metadata, while Claude and Codex plugin
packages use their own manifests under `plugins/`. The catalog itself is not tied to one
agent harness.
