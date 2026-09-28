# Branch, commit, and PR conventions

Repository-specific contribution rules take precedence when they are explicit. Otherwise use these
defaults.

## Branch names

Without a ticket, choose a lowercase, hyphenated branch name with a conventional intent prefix:

```text
feat/add-search-filters
fix/prevent-empty-index
docs/explain-shard-recovery
refactor/split-query-client
test/cover-retry-policy
chore/update-tooling
```

Keep the name short and describe the outcome, not the implementing agent. Do not use prefixes or
names such as `codex/`, `claude/`, `ai/`, `agent/`, or a model name.

When the request includes a ticket identifier, use the normalized ticket identifier as the branch
name instead of inventing a parallel description, unless the repository explicitly requires a
different ticket pattern:

```text
ENG-123
OPS-482
```

Confirm that the intended branch does not already exist locally or remotely before creating it.

## Commit messages

Use the repository's established commit format. Otherwise use a concise imperative Conventional
Commit subject:

```text
feat(search): add filtered product query
fix(indexing): retry failed bulk items
docs(opensearch): explain shard allocation
```

When a ticket exists, include it in the subject using the repository's convention. With no stronger
convention, append it in parentheses:

```text
feat(search): add filtered product query (ENG-123)
```

Use the body for motivation, compatibility, or migration details that are not obvious from the diff.
Do not add agent attribution, generation notes, prompt excerpts, or synthetic co-author trailers.

## Pull-request description

Keep the description factual and reviewable:

```markdown
## Summary

- outcome and user-visible behavior
- important implementation or compatibility decision

## Validation

- exact check and result

## Risk and rollout

- migration, rollback, deployment, or remaining risk when applicable
```

Reference the ticket using the hosting platform or repository's established closing syntax. Do not
claim checks that were not run. Attach screenshots or diagrams only when they materially help review.

## Identity and protected actions

- Preserve the user's local Git author and signing configuration.
- Push and create the PR through the user's authenticated remote account.
- Do not create or switch to an agent/bot identity.
- Do not add AI-related labels, content tags, commit trailers, comments, or PR notes.
- Treat merge, deployment, release, and production mutation as separate authorized actions.
