# Node.js APIs, workers, and libraries

Use TypeScript with Node's supported module model and make the runtime entrypoint explicit. Select a
framework from actual protocol, plugin, and deployment requirements rather than scaffolding a large
framework by default.

## Service baseline

- pnpm with a committed lockfile and pinned package-manager version.
- Strict TypeScript, ESLint, Prettier, and a separate production build.
- Zod or the framework's compatible schema system at configuration, HTTP, queue, and persistence
  boundaries.
- Structured logging; Pino is a common low-overhead starting point when the framework does not own
  logging.
- Vitest or Node's built-in test runner, with integration tests at real adapter boundaries.
- Explicit startup validation, graceful shutdown, readiness behavior, and signal handling for a
  deployed process.

Fastify is a useful default for a new HTTP API that benefits from schemas and a plugin model, while
Hono is attractive for portable web-standard runtimes. Express remains reasonable when ecosystem or
existing-team constraints require it. Do not select a framework solely because it is familiar.

Use `tsx` for local TypeScript execution when needed. Build applications with `tsc` or the framework's
supported compiler; add a bundler such as tsup only for a concrete distribution or packaging need.

## API concerns

Add CORS, rate limiting, authentication, OpenAPI generation, database clients, migrations, queues,
and telemetry only when required, but establish clear extension points for them. Never expose raw
validation or database errors as an accidental public contract. Keep transport schemas distinct from
persistent models when their lifecycles differ.

## Published libraries

Define package exports, generated declarations, ESM/CommonJS support based on consumers, supported
runtime ranges, and files included in the package. Test the packed artifact in a temporary consumer
and run a publish dry run. Do not copy application-only dependencies or hooks into a small library
without need.
