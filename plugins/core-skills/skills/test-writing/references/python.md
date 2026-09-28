# Python tests

Use pytest for unit and integration tests unless the repository has an established unittest suite.
Keep `conftest.py` scoped to the narrowest directory that needs its fixtures; a root conftest full of
feature-specific fixtures becomes invisible global coupling.

```text
src/example/
└── domains/orders/
tests/
├── unit/orders/
├── integration/orders/
├── contract/
├── fixtures/files/
└── support/
    ├── builders/
    ├── factories/
    └── fakes/
```

Name tests by observable behavior. Parameterize meaningful input partitions instead of duplicating
nearly identical cases. Use temporary paths, deterministic clocks, and explicit environment fixtures.
Prefer dependency injection, lightweight fakes, or protocol implementations over patching deep
internal imports. Patch the name used by the system under test, not the original declaration.

Use integration markers for real databases or services and make their setup reproducible. Transaction
rollback is useful only when it matches application visibility and connection behavior. For FastAPI
or ASGI applications, test the application through an HTTP client and override boundary dependencies
explicitly rather than calling route functions as ordinary functions.

Use Hypothesis for parsers, state machines, serialization, or invariants where generated examples can
find cases humans miss. Coverage should identify unexercised risk; do not manufacture assertions to
reach a percentage.
