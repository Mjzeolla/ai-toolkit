# TypeScript web applications

Apply this profile to React applications, including Next.js and Vite-based frontends.

## Baseline

- TypeScript in strict mode; avoid disabling checks globally to accommodate one dependency.
- React framework tooling selected for the deployment model: Next.js for integrated server rendering
  and routing, or Vite for a client application that does not need those features.
- ESLint using the framework-supported flat configuration, Prettier, Vitest where unit tests add
  value, and Playwright for a small set of critical browser flows.
- Zod for environment variables, API responses, forms, URL parameters, and other runtime trust
  boundaries. Infer types from schemas when the schema is the source of truth.
- Tailwind CSS only when utility CSS matches the product and team; do not add it to a repository
  with an established styling system without an explicit migration decision.

## Common packages by need

| Need                        | Preferred starting point                                      |
| --------------------------- | ------------------------------------------------------------- |
| Conditional class names     | `clsx`                                                        |
| Resolve Tailwind conflicts  | `tailwind-merge`                                              |
| Reusable component variants | `class-variance-authority` (CVA) when variants actually exist |
| Boundary validation         | `zod`                                                         |
| Server-state caching        | framework primitives first; TanStack Query for richer clients |
| Forms                       | native/framework forms first; React Hook Form when warranted  |
| Unit/component tests        | `vitest`, Testing Library                                     |
| Browser tests               | `@playwright/test`                                            |

Do not install both `classnames` and `clsx`; they occupy the same basic role. A Tailwind helper may
use `clsx` followed by `tailwind-merge`, commonly exposed as a small `cn()` utility owned by the UI
layer. Avoid a generic root `utils.ts` dump.

Use CVA when a reusable component has a finite, typed variant API such as `intent`, `size`, and
`disabled`, especially when compound variants otherwise create nested conditionals. CVA centralizes
the mapping from semantic component props to class strings and exposes variant prop types for React
components. It complements rather than replaces `clsx` and `tailwind-merge`: CVA selects declared
variants, `clsx` joins arbitrary conditional inputs, and `tailwind-merge` resolves conflicting
Tailwind utilities. Skip CVA for one-off elements, components with no meaningful variants, or fully
dynamic styles that are not a finite design-system contract.

## Framework-specific decisions

For Next.js, use the App Router unless maintaining an existing Pages Router application. Keep server
components as the default, introduce client boundaries deliberately, validate server-only
configuration at startup, and use framework-native metadata, image, font, caching, and route
facilities where they meet the requirement.

For Vite, decide routing, data loading, and hosting assumptions explicitly; Vite is a build tool and
does not supply those application contracts. Do not add a state library until state ownership and
sharing require one.

## Validation

Run type checking, linting, unit tests, the production build, and at least a smoke test of primary
routes. If server rendering or environment-dependent routes exist, verify them in the production
mode rather than relying only on the development server.
