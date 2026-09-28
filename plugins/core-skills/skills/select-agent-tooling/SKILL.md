---
name: select-agent-tooling
description: Select a minimal set of coding-agent helper tools when context size, repository discovery, structural search, semantic navigation, or current documentation is a demonstrated bottleneck. Do not activate merely because a task uses an AI coding agent.
---

# Select Agent Tooling

Start from the bottleneck, deployment boundary, data sensitivity, and capabilities the agent already
has. Prefer native repository search, language servers, official documentation, and built-in agent
tools when they solve the problem. Every helper adds installation, permissions, updates, trust, and
context-routing cost.

Read [helper selection](references/helpers.md) to compare focused tools. Recommend the smallest
non-overlapping set and state what each tool owns, what data it can access, and how to fall back when
it is unavailable.

Do not install a helper, add an MCP server, enable global hooks, upload repository contents, or send
code to a hosted service without authorization. Inspect project-maintained installation guidance,
licenses, release activity, and the exact permission surface before recommending execution. Prefer
project-scoped configuration when global installation is unnecessary.

Use `$use-rtk` when the selected bottleneck is noisy shell output and RTK is available. Use
`$primary-source-research` for current library or API facts even when a documentation helper is
installed; retrieved third-party context still requires source judgment.
