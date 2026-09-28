# TypeScript and React tests

Use Vitest when Vite integration, modern ESM, or its runner API fits the repository; use Node's test
runner for small Node-focused packages when it is sufficient. Preserve Jest for established suites
unless migration solves a real compatibility, speed, or maintenance problem.

For React, use Testing Library to exercise accessible roles, labels, text, and user interactions.
Prefer `user-event`-style interactions over calling handlers directly. Test business logic outside
React when it does not need rendering.

Use Playwright for critical flows requiring a real browser, navigation, cookies, storage, browser
APIs, multiple pages, or production routing. Configure a web server, stable base URL, traces and
screenshots on failure, and a deliberately small browser matrix. Do not repeat every unit-level edge
case in E2E tests.

Suggested structure:

```text
src/features/account/
├── components/profile-form.tsx
├── components/profile-form.test.tsx
├── services/update-profile.ts
└── services/update-profile.test.ts
tests/
├── integration/account/
├── support/builders/
└── support/servers/
e2e/
├── account.spec.ts
└── support/fixtures.ts
vitest.config.ts
playwright.config.ts
```

Use MSW or a similarly scoped protocol fake when testing browser-facing HTTP behavior without a live
backend. Restore mocks between tests, avoid module-wide mutation where dependency injection suffices,
and assert public results rather than private calls. Type test builders so defaults remain valid as
contracts evolve.
