---
name: git-worktrees
description: Create, use, inspect, or remove Git worktrees when concurrent branches need isolated working directories without duplicating repository history.
---

# Git Worktrees

Use a worktree when simultaneous tasks, a dirty primary checkout, or branch-specific validation
need separate indexes and working directories. Do not add one for a short sequential change when
the current checkout is already safe and isolated.

Before changing worktree state, inspect `git worktree list --porcelain`, the current branch,
repository status, remotes, and the intended parent directory. Choose a unique task branch and a
sibling path that is not inside another worktree. Follow the repository's branch-name convention;
otherwise use a short task-oriented name.

When the worktree will produce a published pull request, use `$raise-pull-request` for branch naming,
ticket inclusion, user identity, commit, push, and PR conventions.

Create new work safely with either:

```bash
git worktree add -b work/<task-name> ../<repository>-<task-name> <base-ref>
git worktree add ../<repository>-<task-name> <existing-branch>
```

One branch can be checked out in only one worktree. Treat each worktree as an independent
workspace: run setup and validation there, preserve its uncommitted changes, and never assume
dependencies, ignored environment files, running services, ports, or generated state are shared.
Git history and object storage remain shared with the main repository.

Read [lifecycle guidance](references/lifecycle.md) when creating, integrating, repairing, or
removing a worktree. Read [parallel-task isolation](references/parallel-tasks.md) when separate
agents or autonomous tasks will use worktrees concurrently.

Before removal, verify the exact path, branch, status, and whether its changes are preserved
elsewhere. `git worktree remove` and `git worktree prune` can discard access to work, so run
them only when removal is explicitly requested and the target is clean or intentionally
discarded. Do not manually delete administrative entries under `.git/worktrees`.

Use `$subagent-coordination` when assigning separate worktrees to parallel agents. Give each
agent exclusive file or component ownership, integrate reviewed commits deliberately, and
run combined validation after merge or cherry-pick.
