# Testing strategy

Treat tests as part of the repository foundation, not a later hardening phase. Select layers from
the risks the product actually has and make every required layer runnable through one stable command.

## Test layers

| Layer       | Proves                                                | Use it for                                                      |
| ----------- | ----------------------------------------------------- | --------------------------------------------------------------- |
| Unit        | Deterministic logic in isolation                      | Parsers, policies, transformations, state transitions           |
| Component   | A UI or module through its public surface             | React behavior, adapters, framework integration                 |
| Integration | Real boundaries work together                         | Databases, queues, filesystems, HTTP clients, generated schemas |
| Contract    | Two independently changing systems agree              | APIs, events, SDKs, schemas, compatibility promises             |
| End-to-end  | A critical user or operator journey works             | Authentication, routing, browser behavior, deployed workflows   |
| Smoke       | The built artifact starts and serves its core surface | Production builds, containers, packages, binaries               |

Use the lowest layer that can fail for the behavior under test. Do not replace unit and integration
coverage with a large end-to-end suite, but do not mock away the boundaries carrying the most risk.

## Baselines by ecosystem

- TypeScript: Vitest or the Node test runner for logic; Testing Library for user-visible component
  behavior; Playwright for a small set of real-browser journeys.
- Python: pytest for unit and integration tests, with fixtures scoped to ownership boundaries and
  coverage used as a diagnostic rather than a substitute for assertions.
- Go: standard `testing`, table-driven cases, `httptest`, integration tests for adapters, fuzz tests
  for parsers and invariants, and `-race` where concurrency warrants its cost.

Separate fast checks from slow or environment-dependent suites. A useful command surface is
`test:unit`, `test:integration`, `test:e2e`, and aggregate `test`; use the ecosystem's equivalent
naming when colons are unnatural. CI should publish actionable failure artifacts such as Playwright
traces, coverage reports, or service logs without retaining secrets.

Make tests deterministic: control time and randomness, isolate external state, use bounded retries
only at genuinely asynchronous boundaries, and fail with enough context to diagnose the behavior.
Quarantine is temporary risk management, never a permanent passing state.
