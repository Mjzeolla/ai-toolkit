# Go tests

Use the standard `testing` package as the foundation. Co-locate unit tests in `*_test.go` files; use
the same package for internal behavior or an external `_test` package when enforcing the public API
boundary is valuable.

```text
internal/order/
├── service.go
├── service_test.go
└── testdata/
    └── invalid-order.json
internal/testsupport/
├── builders/
├── fakes/
└── testdb/
tests/
├── integration/
└── contract/
```

Go recognizes `testdata/` specially and ignores it as a package; keep feature-owned golden files and
fixtures there. Put cross-package support in a clearly named internal test boundary only after real
reuse exists.

Use table-driven tests when cases share the same behavior and assertion shape. Mark helpers with
`t.Helper()`, use `t.Cleanup()` for owned resources, and use `t.TempDir()` for files. Run parallel
subtests only when state is isolated and loop values are safely scoped. Prefer `httptest` for HTTP
handlers and servers.

Use direct checks or `google/go-cmp` for value comparison. Testify `require` can reduce repetitive
fatal assertions, but do not introduce assertion DSLs or generated mocks without enough benefit.
Define small consumer-owned interfaces and use handwritten fakes for important stateful behavior.

Add fuzz tests for parsers, decoders, and invariants. Run `go test ./...` broadly and `go test -race`
where concurrency risk warrants the cost. Integration tests may use build tags or separate commands,
but the default command must make omissions visible.
