# Node.js services

For a moderate API or worker, organize business behavior by domain while keeping runtime
composition and external adapters visible:

```text
src/
├── app/
│   ├── create-app.ts
│   └── routes.ts
├── modules/
│   ├── accounts/
│   │   ├── api/
│   │   │   ├── accounts.controller.ts
│   │   │   └── accounts.routes.ts
│   │   ├── application/
│   │   │   └── create-account.ts
│   │   ├── constants/
│   │   │   └── account-statuses.ts
│   │   ├── errors/
│   │   │   └── account-errors.ts
│   │   ├── models/
│   │   │   └── account.ts
│   │   ├── repositories/
│   │   │   └── account-repository.ts
│   │   ├── schemas/
│   │   │   └── account-schema.ts
│   │   ├── services/
│   │   │   └── account-service.ts
│   │   ├── types/
│   │   │   └── account-types.ts
│   │   ├── utils/
│   │   │   └── normalize-account.ts
│   │   └── index.ts
│   └── billing/
├── infrastructure/
│   ├── database/
│   ├── messaging/
│   └── observability/
├── shared/
│   ├── errors/
│   ├── middleware/
│   ├── schemas/
│   ├── types/
│   ├── utils/
│   └── constants/
├── server.ts
└── worker.ts
tests/
├── fixtures/
└── integration/
```

Keep process entrypoints thin and separate application construction from listening or job
startup. Domain modules own their behavior and contracts; infrastructure contains database,
queue, external-service, and telemetry adapters. Prefer module-local helpers over global
`utils` until more than one domain has the same semantic need. Respect framework-required
locations and generated code boundaries rather than moving them for visual symmetry.

Keep domain-owned types, utilities, constants, errors, models, repositories, schemas, and
services in their corresponding concern directories. Omit concerns that the module does not
need, but do not flatten the remaining concerns into a row of broad files at the module
root. `application/` owns use cases and orchestration; `services/` owns cohesive domain
operations rather than becoming a miscellaneous behavior dump.

Use `shared/types` only for contracts that do not belong to one module, `shared/utils` for
domain-neutral operations with several consumers, and `shared/constants` for process-wide
stable values rather than business rules. A module may expose an owned type through its
public `index.ts`; reuse by another module does not automatically make the type shared.

Use descriptive leaf names such as `types/account-types.ts`,
`utils/normalize-account.ts`, and `constants/account-statuses.ts`. Apply the same directory
convention under `shared`, while omitting unused directories. Keep `index.ts` only as a
deliberate public export boundary.
