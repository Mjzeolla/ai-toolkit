# Test suite structure and shared support

Co-locate fast tests with owned code when proximity improves discovery. Use top-level test roots for
cross-feature integration, contract, end-to-end, performance, and test infrastructure.

```text
src/
└── domains/
    └── billing/
        ├── services/
        │   ├── calculate-total.ts
        │   └── calculate-total.test.ts
        └── testing/
            └── builders/
tests/
├── integration/
│   └── billing/
├── contract/
├── e2e/
├── fixtures/
│   ├── files/
│   └── payloads/
├── support/
│   ├── builders/
│   ├── factories/
│   ├── fakes/
│   ├── matchers/
│   └── servers/
└── config/
```

Omit unused folders. Do not create one flat `test_utils` file. Group reusable support by concern and
make the consumer boundary visible.

## Ownership rules

- Builders create valid in-memory domain values with explicit overrides.
- Factories create persisted or externally backed records and own cleanup.
- Fixtures are stable input artifacts, not miscellaneous helper code.
- Fakes implement a real boundary with deterministic behavior; prefer them over mocks when stateful
  interaction matters.
- Matchers improve assertion meaning without concealing the contract.
- Servers own test HTTP, queue, or protocol harnesses.
- Global setup is limited to genuinely suite-wide infrastructure and must clean up reliably.

Keep production code independent of the test tree. A generally useful parser or adapter belongs in
production under its domain owner; test-only shortcuts stay in test support.

## Configuration

Have one base test configuration per runner and derive narrow projects only for materially different
environments such as DOM, Node, browser, integration, or end-to-end. Centralize timeouts, reports,
coverage exclusions, and aliases, but keep suite-specific setup close to that suite. Do not let one
global bootstrap silently alter every test's clock, network, environment, or mock state.

Expose focused commands and one aggregate command. CI can shard or parallelize behind those stable
entrypoints without changing local semantics.
