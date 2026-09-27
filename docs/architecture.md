# Catalog architecture

The repository separates portable AI assets from the tooling used to maintain them.

## Skills

Every skill lives at `plugins/<plugin-name>/skills/<name>/`, matching the portable Agent
Plugins discovery layout within its owning package. `SKILL.md` contains
the required YAML frontmatter and the instructions loaded when the skill is selected.
Product-facing metadata may live in `agents/`; deterministic helpers, conditional
references, and output assets remain colocated with their owning skill.

Skills do not import instructions from sibling skills. This keeps installation selective
and prevents a copied skill from silently losing required behavior. A skill may mention a
separate capability only when it is genuinely optional or guaranteed by its target
environment.

## Skill composition

Skills can reference another catalog capability with its `$skill-name`. Composition is
conditional, not inheritance: the caller remains useful alone and explains when loading the
next capability improves the current task. `task-completion` is the broad engineering
router, while `autonomous-loop` governs bounded iterative execution. Focused skills may
route to one another for a specific risk, but must not load the whole catalog by default.

The catalog validator rejects references to unknown skills. It does not reject cycles
because references are conditional routing choices rather than unconditional imports.

`$skill-name` is an invocation reference, not a source-file include. It asks an agent runtime
to load the installed skill through its discovery mechanism. A relative Markdown link would
instead couple one skill to this repository's category layout and could break when skills
are installed into a flat discovery directory. Use ordinary Markdown links for supporting
files owned by the same skill, such as `references/schema.md`; use `$skill-name` only for an
optional handoff to another installed capability.

Use `$skill-name` only for capabilities bundled in the same plugin or otherwise guaranteed
by the target environment. For an optional third-party skill, refer to it by product or
skill name, detect whether it is available, and retain a useful fallback. Link to the
upstream installation instructions for users who want the integration, but never install or
update it implicitly. Current portable plugin manifests do not resolve cross-marketplace
skill dependencies; tool dependencies declared in product-specific metadata are not a
substitute for skill installation.

Interaction modes and broad coordinators are explicit-only. Focused capabilities remain
implicitly discoverable when their routing descriptions match. This prevents a general task
from silently switching into interview, terse-response, delegation, or no-questions mode.

## Plugins

Each directory under `plugins/` is a separately installable package. Its root `plugin.json`
declares the portable Agent Plugins schema, stable identity, and semantic version. Skills
remain under their plugin root so packages can be installed independently without mutating
global skill directories. `.agents/plugins/marketplace.json` exposes those packages to
Codex, while `.claude-plugin/marketplace.json` and each package's
`.claude-plugin/plugin.json` provide Claude Code discovery metadata.

## Validation boundary

The TypeScript validator is split by responsibility under `src/`:

- `plugin/validate.ts` validates portable and runtime-specific plugin manifests;
- `skill/validate.ts` validates skill instructions and cross-skill routing;
- `skill/frontmatter.ts`, `skill/links.ts`, and `skill/openai-metadata.ts` own the
  supporting skill-specific parsers and validators;
- `shared/types/`, `shared/utils/`, and `shared/constants/` sit outside the catalog
  domain and contain cross-domain contracts, utilities, and immutable definitions;
- `catalog/validate.ts` coordinates the complete catalog result without owning domain rules.

`src/catalog.ts` remains a small stable public entrypoint. The command-line adapter lives in
`src/validate-catalog.ts`.

TypeScript is used because the repository already depends on Node and pnpm for Markdown
tooling, strict types improve validation of untrusted YAML and JSON shapes, and Node's
built-in test runner keeps the validator portable without another application runtime.
Python would be a reasonable alternative if the repository moved toward Python-native
automation. Go or Rust would provide standalone binaries but add disproportionate build and
distribution overhead for this small filesystem validator.

The validator enforces these repository-owned structural contracts:

- kebab-case skill names of at most 64 characters;
- required `SKILL.md` frontmatter and useful non-placeholder instructions;
- agreement between folder and frontmatter names;
- consistent optional OpenAI interface metadata;
- references only to skills present in the catalog;
- valid repository-local Markdown links in `SKILL.md` and every nested Markdown file under
  `references/`;
- the portable Agent Plugins schema and Claude Code compatibility manifest, including
  identity and semantic version.

The validator does not prescribe exact prose or attempt to prove that a skill makes good
decisions. Human review remains responsible for routing quality, scope, safety, and whether
the instructions add information an agent would not reliably infer itself.

## Delivery

Pull requests run formatting, Markdownlint, ESLint, strict type checking, unit tests,
catalog validation, YAML validation, actionlint, typo checking, link checking, and secret
scanning. Local CI additionally runs ShellCheck. Version tags repeat validation before
producing a GitHub Release archive.
