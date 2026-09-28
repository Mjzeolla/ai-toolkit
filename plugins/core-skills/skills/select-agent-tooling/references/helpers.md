# Coding-agent helper selection

| Bottleneck                                       | Tool        | Use it when                                                           | Important boundary                                                                    |
| ------------------------------------------------ | ----------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Shell output consumes context                    | RTK         | Supported commands produce repetitive logs or test output             | Filtering can hide detail; keep raw fallbacks                                         |
| A repository must be handed to an external model | Repomix     | The destination cannot browse the working tree directly               | Exclude secrets, generated data, binaries, and irrelevant files before packing        |
| Large-codebase symbol navigation                 | Serena      | The client supports MCP and symbol-aware retrieval/editing adds value | It can read and modify code; scope permissions and follow current upstream setup      |
| Current library documentation                    | Context7    | Version-specific API docs are otherwise hard to retrieve              | Hosted/community content still needs verification; private code and keys require care |
| Structural search and codemods                   | ast-grep    | Syntax-aware matching is safer than text or regex search              | Test rewrites, constrain languages and paths, and review every changed file           |
| Cross-repository code search                     | Sourcegraph | Relevant code spans many repositories or code hosts                   | Account, indexing, hosting, and data-access policy are material decisions             |

These tools are complementary only when the corresponding bottlenecks coexist. Do not install all of
them as a default stack.

## Selection notes

- RTK changes how command output reaches the agent; it does not supply repository understanding.
- Repomix creates a portable snapshot. Prefer live targeted search when the agent already has safe
  repository access, because a packed snapshot can become stale and over-broad.
- Serena supplies IDE-like semantic operations through MCP. Prefer ordinary language-server or
  repository tools when the codebase is small or the agent already has equivalent symbol tooling.
- Context7 retrieves library documentation. Prefer the library's official docs directly for exact
  attribution, security-sensitive decisions, or unsupported versions.
- ast-grep is useful independently of AI and is strongest for repeatable syntax-aware searches or
  transformations.
- Sourcegraph becomes valuable when local search cannot see the relevant repository graph.

For each recommendation, include an exit strategy: a direct command, official documentation source,
local search method, or uninstall path that keeps the workflow operable without the helper.
