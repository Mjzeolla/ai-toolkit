# RTK command selection and fallbacks

Use the wrapper that matches the underlying tool so RTK can apply its structured parser:

| Work             | Compact command                                         | Raw or diagnostic fallback                             |
| ---------------- | ------------------------------------------------------- | ------------------------------------------------------ |
| Repository state | `rtk git status`, `rtk git diff`, `rtk git log`         | corresponding `git` command                            |
| Search and files | `rtk grep`, `rtk find`, `rtk read`, `rtk ls`            | `rg`, `find`, `sed`, `cat`, or native tools            |
| TypeScript       | `rtk tsc`, `rtk lint`, `rtk vitest`                     | package script or underlying executable                |
| Browser tests    | `rtk playwright test`                                   | `playwright test`, trace, report, or headed debug mode |
| Python           | `rtk ruff check`, `rtk pytest`, `rtk uv run pytest`     | corresponding Ruff, pytest, or uv command              |
| Go               | `rtk go test`, `rtk golangci-lint run`                  | `go test -json`, ordinary `go test`, or linter command |
| Rust             | `rtk cargo build`, `rtk cargo test`, `rtk cargo clippy` | corresponding Cargo command                            |
| Containers       | `rtk docker ps`, `rtk docker logs`, `rtk kubectl pods`  | underlying Docker or kubectl command                   |
| Unknown command  | `rtk err`, `rtk test`, or `rtk summary`                 | `rtk run` or the command directly                      |

RTK's filtered direct-execution wrappers preserve argument boundaries and do not implicitly perform
shell expansion. Use an explicit shell mode only when variables, globs, pipes, redirects, or compound
syntax are intentional. Do not transform a safely quoted argv command into an opaque shell string
merely to pass it through RTK.

For a failing test or build, use the compact result to locate the relevant target, then request the
smallest raw diagnostic that resolves the uncertainty: one failing test, one package, one trace, or
one verbose command. Avoid responding to compression by dumping the entire repository output.

Use `rtk gain`, `rtk discover`, and `rtk session` only for RTK adoption or savings analysis. Its
reported savings estimate reductions in shell-output bytes/tokens, not an equivalent reduction in
the total model bill.
