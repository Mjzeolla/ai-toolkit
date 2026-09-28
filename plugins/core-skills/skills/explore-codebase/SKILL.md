---
name: explore-codebase
description: Map an unfamiliar codebase when ownership, entry points, execution flow, configuration, or change impact must be understood before acting.
---

# Explore Codebase

Begin with repository instructions, manifests, top-level layout, and the narrow concept in
question. Search symbols and configuration with fast indexed tools, then follow concrete
entry points through callers, state changes, and tests. Prefer evidence from code over
guesses based on filenames.

Build a working map of component ownership, runtime boundaries, data flow, configuration,
and validation commands. Record uncertainty and resolve only what affects the requested
decision. Avoid reading the entire repository or producing a generic inventory with no
connection to the task.

If native search, repository indexes, and language tooling cannot efficiently answer the
focused question, use `$select-agent-tooling` to evaluate the smallest helper for the
demonstrated gap. When RTK is already available, use `$use-rtk` for supported discovery
commands whose raw output is mostly noise; rerun raw commands when ordering, complete matches,
or omitted details affect the conclusion.

When exploration uncovers architecture debt, do not silently expand into refactoring; use
`$improve-architecture` only when improvement is requested. Hand focused findings to
`$implementation-planning` for a change plan or `$systematic-debugging` for a concrete
failure.

The result should identify the relevant paths, explain how control and data move between
them, state the likely change surface, and name the commands or tests that can validate a
future modification.
