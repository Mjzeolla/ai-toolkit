# Go APIs and services

Pin Go and repository tools with Mise while keeping `go.mod` as the module compatibility contract.
Commit `go.mod` and `go.sum`; use `go work` only when several modules genuinely need coordinated local
development.

## Baseline

- Standard-library HTTP routing is often sufficient in modern Go; add a router or framework only
  for demonstrated ergonomics or middleware requirements.
- `gofmt`, `go vet`, tests, and pinned static analysis.
- Configuration parsed once at startup with explicit validation.
- Structured logging through `log/slog` unless an existing observability stack requires another API.
- Context propagation, timeouts at network boundaries, graceful shutdown, and meaningful health
  behavior for deployed services.
- Table-driven unit tests and integration tests at storage or protocol boundaries.

Use generated code deliberately and document its source command. Keep generated output out of
hand-edited paths and verify generation drift in CI when reproducibility matters. Add mocks only at
real interfaces; prefer small consumer-owned interfaces over framework-shaped abstractions.

## Quality and security

Run `go test ./...`, add `-race` where concurrency risk and CI resources justify it, and use
Staticcheck or a deliberately configured `golangci-lint`. Consider `govulncheck` as a CI or scheduled
networked check. Build the real service entrypoints in CI so tests cannot hide compilation gaps.

Do not introduce Node solely for hooks in a Go-only repository. Use direct Git hooks, Mise tasks, a
Go-oriented hook runner, or rely on fast local commands plus authoritative CI according to the
repository's contributor needs.

## Packages that earn their place

Prefer the standard library first, then add a focused package for a demonstrated boundary:

| Need                   | Starting point                                  | Add it when                                                                                  |
| ---------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------- |
| HTTP routing           | `net/http`                                      | Use `go-chi/chi/v5` when route groups and composable middleware improve a growing API        |
| Struct validation      | `go-playground/validator/v10`                   | Request or configuration structs need reusable tag-based and cross-field rules               |
| JSON Schema validation | `santhosh-tekuri/jsonschema/v6`                 | Arbitrary JSON documents must conform to a published JSON Schema draft                       |
| Assertions             | standard `testing`                              | Use `stretchr/testify/require` for concise fatal assertions; add mocks only with a real seam |
| Value comparison       | `reflect.DeepEqual` or direct checks            | Use `google/go-cmp` for readable diffs and custom comparison options                         |
| PostgreSQL             | `database/sql`                                  | Use `jackc/pgx/v5` for PostgreSQL-specific features or its native API                        |
| Typed SQL              | handwritten queries                             | Use `sqlc` when SQL should remain explicit while Go access code is generated                 |
| Migrations             | deployment-owned SQL                            | Use `golang-migrate/migrate` when the service owns ordered database migrations               |
| Configuration          | `os` plus explicit parsing                      | Use `caarlos0/env` or Koanf when mapping or layered providers remove real boilerplate        |
| Observability          | `log/slog`, `runtime/metrics`, `net/http/pprof` | Use OpenTelemetry when traces and metrics must interoperate across services                  |

Struct validation and JSON Schema validation are different jobs. Decode known API payloads into
typed structs and validate domain constraints there. Use a JSON Schema engine when the schema is
external, dynamic, or itself part of the product contract. Avoid framework-sized dependency bundles
for a single helper and check maintenance, licensing, supported Go versions, and transitive
dependencies before adopting any package.
