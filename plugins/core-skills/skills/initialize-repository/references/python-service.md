# Python APIs and services

Use `pyproject.toml` as the central project and tool configuration. Prefer uv for new repositories
when fast project management, lockfiles, tool execution, and workspaces are the main needs. Poetry
remains a sound choice when an organization already standardizes on its workflow or a package relies
on its mature build, publish, plugin, and dependency-group conventions. Do not combine uv and Poetry
as competing environment and lockfile owners. Pin the selected manager with Mise, declare
`requires-python`, and commit its lockfile for applications and services.

## Baseline

- A `src/` package layout for distributable packages and non-trivial services.
- Ruff for linting, import organization, and formatting.
- Pyright or mypy for static type checking; select one and configure its strictness deliberately.
- pytest with coverage thresholds only where a meaningful baseline exists.
- pre-commit with pinned Ruff and repository-hygiene hooks.
- Pydantic Settings or an equivalent typed configuration boundary when runtime configuration is
  non-trivial.

For an HTTP API, FastAPI is a productive default when typed request/response models and OpenAPI are
valuable. Flask, Django, Litestar, or another framework may be the better choice for an existing
ecosystem or different product shape. Do not add FastAPI to workers or libraries merely to provide a
health endpoint.

For a new service, a cohesive modern baseline is often uv + Ruff + Pyright + pytest + pre-commit:
uv owns dependency resolution and command execution, Ruff owns formatting and linting, Pyright owns
static types, pytest owns behavioral tests, and pre-commit owns fast file-oriented hooks. Substitute
Poetry for uv when its established packaging workflow or organizational support is the deciding
constraint; keep the other responsibilities separate.

## Dependencies by responsibility

Keep runtime and development groups distinct. Add database drivers, SQLAlchemy, Alembic, HTTPX,
background queues, structured logging, and telemetry only with a real consumer. Use Pydantic models
at external boundaries; do not force every internal domain object to inherit from a framework model.

## Validation and hooks

Expose project commands for Ruff check, Ruff format check, type checking, pytest, and any package or
container build. The pre-commit framework should run fast file-oriented checks. CI must install from
the lockfile and rerun the full project commands independently of pre-commit.

Test application startup with representative environment configuration. For APIs, test schema
generation and key routes. For packages, build the wheel and source distribution and inspect their
contents before considering the baseline complete.
