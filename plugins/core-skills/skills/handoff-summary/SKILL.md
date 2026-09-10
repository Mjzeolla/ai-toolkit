---
name: handoff-summary
description: Create a continuity-focused handoff when another person or agent must resume work without rereading the full conversation or rediscovering current state.
---

# Handoff Summary

State the objective and current outcome first. Record decisions already made, artifacts and
paths changed, commands or checks run, observed results, and remaining work in execution
order. Include the reason behind non-obvious decisions so the next owner does not reopen
settled questions accidentally.

Separate verified facts from assumptions and suspected causes. Name blockers, missing
authority, external dependencies, and safety constraints. Preserve exact identifiers or
commands only when they are needed to continue; never include secrets or transient tokens.

Use `$brief-mode` when the audience needs only a compact status. Use `$to-ticket` when the
remaining work should become independently tracked rather than continued as the same task.

The handoff should be self-contained but not a conversation transcript. Remove obsolete
attempts and incidental detail unless they prevent repeating a costly failure. End with the
single best next action and the evidence that will show it succeeded.
