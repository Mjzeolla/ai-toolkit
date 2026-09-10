---
name: subagent-coordination
description: Coordinate subagents when a task contains independent bounded workstreams that can run concurrently and be integrated without conflicting ownership.
---

# Subagent Coordination

Delegate only when parallel work creates real value. Give each subagent a concrete outcome,
exclusive scope, relevant constraints, required evidence, and the minimum context needed.
Do not delegate reading mandatory repository or skill instructions that the coordinating
agent must understand itself.

Partition by ownership boundary: separate components, research questions, test surfaces, or
independent reviews. Avoid assigning two agents to edit the same files or asking a subagent
to make decisions that require missing user authority. Keep risky external mutations with
the primary agent unless explicitly authorized.

Use `$git-worktrees` when agents need isolated Git indexes or branches. Assign one worktree
and branch per agent, keep paths distinct, and decide in advance whether integration will use
merge, rebase, or cherry-pick. Worktrees isolate files; they do not resolve overlapping
design ownership or merge conflicts.

While agents work, continue useful non-overlapping work. Integrate their results by
inspecting actual artifacts and evidence; do not accept summaries as proof. Reconcile
conflicts against the user's outcome and repository conventions, then run combined
validation.

Use `$task-completion` as the parent workflow and specialized skills inside a delegated
task when appropriate. Stop or redirect a subagent when scope changes, its work overlaps,
or the expected value disappears. Credit unresolved uncertainty in the final handoff.
