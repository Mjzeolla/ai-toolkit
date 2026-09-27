# Full-stack and multi-application monorepos

Separate deployable units from reusable packages and repository tooling:

```text
apps/
├── web/
├── api/
└── worker/
packages/
├── contracts/
├── database/
├── observability/
├── test-support/
└── ui/
tooling/
├── eslint/
├── scripts/
└── typescript/
docs/
├── architecture/
└── decisions/
```

Each `apps` entry should be independently runnable or deployable. Each `packages` entry
needs an explicit contract, owner, and actual consumer; do not extract packages solely for
symmetry. Applications may depend on packages but must not import another application's
internals. Put cross-application API or event contracts in a dedicated package when shared
generation or compatibility checks justify it.

Mirror language-specific package conventions inside each application or package rather than
flattening every ecosystem into one repository-wide tree. Keep build presets and reusable
tool configuration distinct from production libraries. Document exceptions for generated
clients, deployment manifests, or framework-controlled roots.
