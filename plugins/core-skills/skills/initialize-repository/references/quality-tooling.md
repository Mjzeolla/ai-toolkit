# Formatting, linting, and hooks

Choose non-overlapping tools and make CI authoritative. Versions below are intentionally omitted;
resolve current compatible releases when initializing the repository.

## Prettier

Use Prettier for file types it intentionally supports—typically JavaScript, TypeScript, JSON,
YAML, CSS, Markdown, and MDX. Do not make Prettier compete with a language formatter such as Ruff
format or `gofmt`.

A compact default is usually enough:

```json
{
  "singleQuote": true,
  "trailingComma": "all"
}
```

Add plugins only for syntax Prettier cannot otherwise format or when ordering is a genuine project
convention. Tailwind class sorting through `prettier-plugin-tailwindcss` is optional; verify its
compatibility with the selected Prettier and Tailwind versions and keep it last when its
documentation requires that ordering. Exclude lockfiles, generated sources, build output, vendored
code, and coverage artifacts through `.prettierignore`.

Expose separate mutation and validation commands:

```json
{
  "format": "prettier --write .",
  "format:check": "prettier --check ."
}
```

## JavaScript and TypeScript

- Use ESLint flat configuration with TypeScript-aware rules where the signal justifies the cost.
- Start from the chosen framework's supported ESLint configuration rather than assembling a
  conflicting parallel stack.
- Use `tsc --noEmit` for application type checks; libraries may typecheck through a dedicated build
  configuration as well.
- Use Markdownlint CLI2 for Markdown and MDX, with explicit ignores for generated documentation.
- Add Stylelint only when the project owns substantial standalone CSS or enforces CSS-specific
  architecture that Tailwind and framework tooling do not cover.
- Use Knip or an equivalent unused-code check only after entrypoints, generated files, and framework
  conventions can be modeled without routine false positives.

Use Husky when Node is the primary contributor runtime. Let the package `prepare` lifecycle install
versioned hooks. Prefer direct commands for a small repository; use `lint-staged` when formatting or
linting the entire tree is measurably slow and staged-file semantics remain correct.

Typical split:

- pre-commit: formatting check, focused lint, Markdown lint, fast unit tests or local-link checks;
- pre-push: complete `check` or `ci` command when its runtime is acceptable;
- CI: clean locked install, all required checks, tests, and production build.

## Python

Use the pre-commit framework when Python is the primary contributor ecosystem. A focused baseline
may include:

- Ruff check with fixes disabled in validation;
- Ruff format check;
- repository hygiene hooks for trailing whitespace, end-of-file newlines, YAML/TOML syntax, and
  accidental large files;
- a secrets detector only when its baseline and false-positive process are maintained.

Run Pyright or mypy and pytest through project commands or CI rather than forcing a slow whole-suite
run for every commit. Pin hook revisions and keep tool configuration in `pyproject.toml` when the
tool supports it. Avoid duplicating Black, isort, Flake8, and Ruff responsibilities unless an
existing repository has a documented compatibility reason.

## Go

`gofmt` is authoritative formatting. Use `go vet`, tests, and a pinned `golangci-lint` configuration
or a smaller curated set such as Staticcheck. Add `govulncheck` where security review and networked
module resolution fit the workflow. Run race tests where concurrency behavior and CI resources
justify them.

## Shell, YAML, and links

Add ShellCheck for maintained shell scripts and an action-aware validator for GitHub Actions.
YAML linting should account for workflow syntax rather than fighting it. Use Lychee or another link
checker when links are part of the product; keep fast local-link checks separate from slower or
flakier external network checks.
