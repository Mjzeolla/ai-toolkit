---
name: red-green-testing
description: Apply a red-green-refactor cycle when a bug fix or behavior change benefits from proving the test detects the problem before implementation.
---

# Red Green Testing

Translate the requested behavior into the smallest meaningful failing test. Run it before
changing production code and confirm it fails for the intended reason—not because of a
fixture, compilation, or environment error. Preserve the failure evidence.

Make the minimal coherent production change that satisfies the behavior, then rerun the
focused test to reach green. Run adjacent regression checks before refactoring. Improve
structure only while all relevant tests remain green; avoid bundling unrelated cleanup.

If the current behavior cannot be reproduced, stop and investigate with
`$systematic-debugging` rather than writing a test that assumes the cause. Use
`$test-writing` when broad test design is needed but a strict red-first proof adds little
value, such as characterization of already-correct legacy behavior.

Report the red failure, the green result, the production change, and the broader validation
performed. Never weaken an assertion or delete coverage simply to make the cycle green.
