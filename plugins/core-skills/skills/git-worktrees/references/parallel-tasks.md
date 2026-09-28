# Parallel task isolation

Use one worktree and one branch per independently integrated task. Record for each task:

- the exact worktree path and branch;
- its base ref or base commit;
- its owned files or component boundary;
- setup, validation, and completion commands;
- the intended integration order when changes may overlap.

Do not let two agents share a worktree, reuse the same ports, or write to the same external state.
Allocate task-specific caches, temporary directories, databases, and service ports when the tools
are not naturally isolated. Secrets and ignored environment files must be supplied deliberately;
do not copy them broadly as a convenience.

Parallelize only work with a clean merge boundary. If two tasks must repeatedly edit the same
files, share generated artifacts, or depend on each other's intermediate state, keep them
sequential or define an explicit integration seam first.

Before declaring the parent task complete, integrate reviewed commits and run validation against
the combined result. Preserve unfinished worktrees until their changes are committed, exported, or
otherwise intentionally retained.
