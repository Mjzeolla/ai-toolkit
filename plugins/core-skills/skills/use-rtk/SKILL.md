---
name: use-rtk
description: Use RTK to reduce noisy shell-command output reaching an AI coding agent when RTK is already available or the user asks to configure it. Do not use filtered output when exact raw output is required for correctness, auditing, or diagnosis.
---

# Use RTK

RTK is a command proxy that runs supported development commands and filters, groups, truncates, or
deduplicates their output before it enters model context. Treat it as a context-efficiency layer,
not as a replacement for the underlying command or a guarantee that omitted output is irrelevant.

Check `rtk --version` before relying on it. Do not install RTK, modify global hooks, or initialize an
agent integration unless the user requested setup or authorized that environment change. When it is
available, prefer explicit RTK commands until repository behavior is understood; transparent rewrite
hooks can make debugging command provenance harder.

Read [command selection and fallbacks](references/commands.md) before using RTK for tests, builds,
linting, Git, logs, or file inspection.

Use filtered output for routine discovery and green-path validation. Re-run the original raw command
or use `rtk run`/`rtk proxy` when:

- the compact output omits evidence needed to explain a failure;
- exact whitespace, ordering, progress, warnings, or exit behavior is part of the contract;
- investigating an RTK filter, parser, or compatibility issue;
- capturing auditable logs or a complete artifact; or
- another tool consumes the command's stdout.

Preserve the underlying command's scope and authorization. RTK does not make `git push`, deployment,
cloud, container, or destructive commands safer or newly authorized. Verify exit codes, not just the
compact summary. Report that output was filtered when the distinction could affect confidence.
