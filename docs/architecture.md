# Catalog architecture

The repository separates portable AI assets from the tooling used to maintain them.

## Skills

Every skill lives at `skills/<category>/<name>/`. Categories are source navigation for
people and do not become part of runtime identity. `SKILL.md` contains
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

Interaction modes and broad coordinators are explicit-only. Focused capabilities remain
implicitly discoverable when their routing descriptions match. This prevents a general task
from silently switching into interview, terse-response, delegation, or no-questions mode.

Agent discovery directories are commonly flat. `scripts/dev/link-skills` therefore links
each skill leaf into `~/.agents/skills`, `~/.claude/skills`, selected harnesses, or custom
destinations. It refuses to replace unrelated files or symlinks and removes only links that
still point into this repository.

## Plugins

A plugin is a separately installable bundle rooted at `plugins/<name>/`. It includes one or
more platform manifests, currently `.codex-plugin/plugin.json` and
`.claude-plugin/plugin.json`. Each manifest name matches the directory and its version uses
semantic versioning. Skills owned by a plugin remain within that plugin so the package can
be installed independently.

The repository intentionally does not treat every group of skills as a plugin. Add a
plugin only when packaging, lifecycle, dependencies, or installation behavior requires
one.

## Validation boundary

The TypeScript validator is split by responsibility under `src/catalog/`:

- `filesystem.ts` discovers categories, skills, and plugins;
- `frontmatter.ts` parses skill metadata;
- `skill.ts` validates skill instructions and cross-skill routing;
- `metadata.ts` validates optional Codex-facing metadata;
- `plugin.ts` validates plugin manifests;
- `links.ts` validates repository-local Markdown targets;
- `validate.ts` coordinates the complete catalog result;
- `types.ts` and `patterns.ts` contain shared contracts and primitives.

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
- valid repository-local Markdown links;
- basic plugin manifest identity and semantic versions.

The validator does not prescribe exact prose or attempt to prove that a skill makes good
decisions. Human review remains responsible for routing quality, scope, safety, and whether
the instructions add information an agent would not reliably infer itself.

## Delivery

Pull requests run formatting, Markdownlint, ESLint, strict type checking, unit tests,
catalog validation, YAML validation, actionlint, typo checking, link checking, and secret
scanning. Local CI additionally runs ShellCheck. Version tags repeat validation before
producing a GitHub Release archive.
