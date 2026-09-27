# Python services

Prefer a `src` layout for an installable service so imports resolve through the package
rather than accidentally from the repository root:

```text
src/
└── payments_service/
    ├── __init__.py
    ├── main.py
    ├── api/
    │   ├── dependencies.py
    │   └── routes/
    ├── domains/
    │   ├── accounts/
    │   │   ├── api/
    │   │   │   └── account_routes.py
    │   │   ├── application/
    │   │   │   └── create_account.py
    │   │   ├── constants/
    │   │   │   └── account_statuses.py
    │   │   ├── errors/
    │   │   │   └── account_errors.py
    │   │   ├── models/
    │   │   │   └── account.py
    │   │   ├── repositories/
    │   │   │   └── account_repository.py
    │   │   ├── schemas/
    │   │   │   └── account_schema.py
    │   │   ├── services/
    │   │   │   └── account_service.py
    │   │   ├── types/
    │   │   │   └── account_types.py
    │   │   └── utils/
    │   │       └── normalize_account.py
    │   └── billing/
    ├── infrastructure/
    │   ├── database/
    │   ├── messaging/
    │   └── observability/
    └── shared/
        ├── constants/
        ├── errors/
        ├── schemas/
        ├── types/
        └── utils/
tests/
├── fixtures/
├── integration/
└── unit/
migrations/
pyproject.toml
```

The tree omits routine `__init__.py` files for readability; include them wherever the
project's supported Python versions and packaging conventions require regular packages.

Use the service's import package as the stable code boundary. Keep transport routes thin,
domain behavior owned by its domain, and external adapters under infrastructure. Separate
HTTP schemas from persistence or domain models when their contracts differ. Follow the
selected framework's discovery requirements for migrations, plugins, commands, and settings.
Avoid creating a module per architectural label when each file would contain only trivial
pass-through behavior.

Within a domain, keep models, schemas, protocols or types, constants, errors, repositories,
services, and helper functions locally owned in named packages. Use `application/` for use
cases and orchestration and `api/` for transport-facing handlers. Omit a package when its
concern does not exist, but do not flatten existing concerns into generic sibling files at
the domain root.

Use `shared/types/` for cross-domain protocols or type aliases, `shared/utils/` for
domain-neutral functions, and `shared/constants/` for truly service-wide stable values.
Apply the same folder convention to other shared concerns, and omit empty packages. Use
descriptive leaves such as `types/pagination.py`, `utils/format_datetime.py`, and
`constants/http_headers.py` instead of broad catch-all modules. Reuse alone does not erase
ownership: another domain may import an explicitly public account type without relocating
it into `shared`.
