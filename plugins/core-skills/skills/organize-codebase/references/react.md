# React applications

For a small application, begin with a shallow layout and colocate related tests and styles:

```text
src/
├── api/
├── components/
├── hooks/
├── pages/
├── lib/
├── App.tsx
└── main.tsx
```

As business areas gain distinct behavior, prefer feature ownership over global technical
buckets:

```text
src/
├── app/
│   ├── router.tsx
│   └── providers.tsx
├── features/
│   ├── authentication/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── model/
│   │   ├── schemas/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── constants/
│   │   └── index.ts
│   └── billing/
│       ├── api/
│       ├── components/
│       └── routes/
├── shared/
│   ├── api/
│   ├── components/
│   ├── hooks/
│   ├── schemas/
│   ├── types/
│   ├── utils/
│   └── constants/
└── main.tsx
```

Keep application composition, routing, and providers in `app`; domain behavior in
`features`; and genuinely domain-neutral primitives in `shared`. A feature may consume
shared code, but shared code must not import a feature. Expose deliberate feature entrypoints
instead of allowing arbitrary cross-feature deep imports. Do not introduce feature folders
when the application is too small to have meaningful feature ownership.

Within a feature, `api` owns requests and transport mapping, `components` and `hooks` own
feature-specific UI behavior, `model` owns state and selectors, and `schemas` owns runtime
validation. Keep business-specific types, helpers, and stable values under that feature's
`types`, `utils`, and `constants`; do not move them to `shared` merely because another
feature imports them. Export intentional cross-feature contracts through the owning
feature's `index.ts`.

Use the same folder names under `shared` only for domain-neutral code with multiple real
consumers. `shared/types` is for contracts such as pagination, `shared/utils` for pure
cross-domain operations such as date formatting, and `shared/constants` for genuinely
application-wide stable values. Shared code must not become the owner of domain policy.

Keep these concerns as directories even when they initially contain one implementation
file, so feature and shared layouts use the same predictable ownership boundaries. Omit a
concern entirely when it is unused; do not add empty folders merely to mirror the example.
Use leaf files with descriptive names such as `types/invoice.ts`,
`utils/calculate-tax.ts`, and `constants/supported-currencies.ts` rather than catch-all
`types.ts`, `utils.ts`, or `constants.ts` files. A feature-level `index.ts` remains useful as
an intentional public entrypoint, not as a container for implementation.
