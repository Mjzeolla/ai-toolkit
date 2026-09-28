# Wiki content model

Prefer the wiki's existing structure. When it follows a personal knowledge-base model, use these
ownership rules:

| Domain          | Owns                                                                  |
| --------------- | --------------------------------------------------------------------- |
| `knowledge/`    | Verified explanations grouped by language, platform, tooling, or idea |
| `playbooks/`    | Repeatable procedures with prerequisites, verification, and recovery  |
| `glossary/`     | Concise definitions and links to deeper canonical explanations        |
| `notes/`        | Provisional captures, daily observations, and uncategorized insights  |
| `architecture/` | System-level decisions, diagrams, and cross-module explanations       |

For a larger codebase documented by stable ownership boundaries, use the module pattern from
`$author-documentation`: `docs/modules/<module>/` may own its landing page, architecture, diagrams,
guides, reference, operations, and troubleshooting. Cross-module flows remain in repository-level
architecture.

## Writing a durable entry

1. State the reader's question and the practical decision or mental model the page supports.
2. Search titles, body text, aliases, and inbound links for an existing owner.
3. Prefer one canonical page; link rather than copy.
4. Separate explanation from step-by-step procedures and exact reference material.
5. Cite authoritative current sources for non-obvious or time-sensitive claims.
6. Include examples only when they clarify behavior, and test executable examples when practical.
7. Link the page from its parent navigation and the closest related concepts.
8. Remove placeholder instructions once real content exists and update its maturity status.

## Page movement

When moving a published page, update navigation, indexes, inbound links, aliases, source metadata,
and search configuration. Add a direct redirect from the previous route to the final route and avoid
redirect chains. Validate both the new route and redirect destination.

## Pull-request handoff

If publication is explicitly requested, use `$raise-pull-request` after content validation. Summarize
the knowledge added, sources used, navigation or redirects changed, and checks run. Do not add AI
authorship or generation disclosures to the content, commit, or pull request.
