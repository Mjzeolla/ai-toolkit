---
name: babysit-jobs
description: Monitor long-running commands, CI checks, pull-request reviews, delegated tasks, or external jobs until a defined terminal state requires completion, action, or escalation.
---

# Babysit Jobs

Attach to existing work and monitor it toward a defined terminal state. Establish the exact
job, authoritative status source, success and failure states, expected duration, and what
actions are authorized. Do not restart, duplicate, cancel, approve, merge, or modify a job
merely because monitoring was requested.

Use the environment's native wait or watch mechanism when available. For local commands,
retain the process or session identifier and consume incremental output. For CI and pull
requests, track the exact repository, commit, check run, and review state so a newer or stale
run is not mistaken for the target. For delegated agent work, wait on the task identifier
and inspect its actual artifacts before accepting completion. If monitoring must continue
beyond the active task, use the environment's supported scheduler or heartbeat rather than
pretending an inactive process is still being watched.

Poll with bounded waits and reasonable backoff when no event-driven mechanism exists. Keep
a compact state snapshot and report only meaningful transitions, actionable failures, or
requested periodic updates. Do not busy-loop or repeatedly announce unchanged state.
Use `$use-rtk` only when RTK is already available and compacting a supported command does not
discard the status, failure evidence, or terminal state being monitored. Preserve raw logs or
stable artifact links when they are the authoritative record.

On failure, capture the failing step, relevant output, and stable link or identifier. Diagnose
or repair only when the original request authorizes it; otherwise report the failure and the
next decision required. Use `$systematic-debugging` for an authorized investigation and
`$task-completion` when an authorized fix must be implemented and validated. Never weaken,
rerun, or bypass a required check solely to obtain a green status.

Stop when the defined success state is proven, a terminal failure requires user action, the
job is superseded or cancelled, the user changes direction, or further progress requires
new authority. Report the final state, target revision or identifier, evidence, elapsed
monitoring context when useful, and any follow-up action. A timeout is not success; distinguish
it from a failed job and preserve enough state to resume monitoring safely.
