---
name: test-writing
description: Add or improve automated tests when behavior, regressions, contracts, or failure handling need durable verification without overfitting implementation details.
---

# Test Writing

Identify the observable contract and the risk the test should catch. Read nearby tests and
use the repository's established harness, fixtures, and naming conventions. Choose the
lowest test level that proves the behavior with acceptable fidelity.

Cover representative success, meaningful boundary, and failure cases. Assert externally
visible outcomes, state transitions, and interactions that form the contract; avoid
snapshotting noise or mocking the implementation under test into a tautology. Make tests
deterministic and independent of execution order, wall-clock timing, and live external
services unless integration is the purpose.

Use `$red-green-testing` when fixing a defect or developing a behavior where proving the
test fails first adds confidence. Use `$data-model` for persistence invariants and
`$security-audit` for abuse cases that require a security model.

Run the focused test, then the relevant broader suite. Report what behavior is covered and
any untested risk. Do not change production behavior solely to satisfy a brittle test
unless the behavior itself is wrong.
