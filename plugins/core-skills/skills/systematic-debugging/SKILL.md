---
name: systematic-debugging
description: Diagnose reproducible software, infrastructure, or performance failures by narrowing causes with direct evidence before implementing a fix.
---

# Systematic Debugging

Use this skill for defects whose cause is not already established. Diagnosis and repair
are separate scopes: explain the cause first, and modify the system only when the user
also requested a fix.

## Establish the failure

- Capture the exact command, input, environment, expected result, and actual result.
- Reproduce with the smallest safe feedback loop available.
- Separate primary failure output from secondary retries, cleanup errors, and warnings.
- Check recent changes and relevant boundaries: caller/callee, host/container,
  client/server, build/runtime, and configuration/secret materialization.

## Narrow the cause

1. State a falsifiable hypothesis that explains the observed evidence.
2. Choose the cheapest observation that distinguishes it from credible alternatives.
3. Instrument or inspect without changing unrelated state.
4. Update the hypothesis from the result; do not accumulate speculative fixes.
5. Minimize the reproducer when doing so improves signal or makes a regression test
   possible.

Prefer primary evidence such as failing tests, structured logs, effective configuration,
network traces, process state, and versioned source. Treat timing correlation and familiar
symptoms as leads, not conclusions.

Use `$use-rtk` only for routine supported commands when RTK is already available. Debugging
usually requires exact failure evidence, so rerun the underlying raw command as soon as a
filtered result omits ordering, warnings, repeated events, or other hypothesis-relevant detail.
If the investigation exposes a recurring tooling gap rather than a product defect, use
`$select-agent-tooling` to evaluate a focused helper without expanding the repair scope.

## Repair and prove

When authorized to fix the issue:

- change the narrowest responsible layer;
- add a regression test or deterministic validation at the failure boundary;
- rerun the original reproducer and the relevant surrounding suite;
- check that the fix does not weaken security or silently discard errors;
- report the cause, changed behavior, and remaining uncertainty separately.

Do not declare success because an error disappeared after a restart or broad cleanup.
Success requires an explanation consistent with the evidence and a repeatable passing
check.
