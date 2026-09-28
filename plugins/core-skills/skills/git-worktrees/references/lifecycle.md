# Worktree lifecycle

## Create

Resolve the base ref rather than assuming the current branch is correct. Prefer a sibling path so
build tools do not accidentally traverse nested repositories.

```bash
git fetch --prune
git worktree add -b <branch> ../<repository>-<task> <base-ref>
```

Fetching is optional and still requires network authorization. If the requested base is already
available locally, use it directly. Never hide a dirty primary checkout by moving or discarding its
changes before creating the worktree.

After creation, enter the new path, install or restore dependencies through repository-owned setup
commands, and verify the expected branch with `git status --short --branch`.

## Integrate

Validate inside the task worktree and review its diff before integration. Use the repository's
normal merge, rebase, or cherry-pick policy; a worktree does not imply a particular integration
strategy. After integration, run the relevant combined checks in the destination branch because
isolated success does not prove that concurrent changes compose.

## Repair

Use `git worktree list --porcelain` and `git worktree repair` when paths were moved or metadata is
stale. Do not edit `.git/worktrees` by hand. Use `git worktree prune --dry-run` before pruning and
do not prune merely because a linked path is temporarily unavailable.

## Remove

Removal is a separate, potentially destructive operation. Confirm the exact path, branch, and
clean status, and verify that required commits exist elsewhere. Then remove only the resolved
worktree:

```bash
git worktree remove ../<repository>-<task>
git worktree prune --dry-run
```

Delete the task branch only when explicitly requested and after confirming it is integrated or
intentionally abandoned. Never use `--force` as a routine cleanup shortcut.
