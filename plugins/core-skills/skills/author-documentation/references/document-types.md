# Document types

Choose the mode that matches the reader's need. Split the material when two modes would
make one page difficult to navigate or maintain.

## Tutorial

Teach a newcomer through one safe, complete learning path. Control scope, state the starting
environment, explain only the concepts needed for the next step, and end with a working
result. A tutorial optimizes for learning rather than exhaustive choice.

## How-to guide

Help an informed reader complete one concrete task. State prerequisites, use copyable and
idempotent steps where possible, show the expected result, provide verification, and cover
likely recovery paths. Put optional variants after the primary path.

## Reference

Describe a contract readers consult rather than read linearly: inputs, outputs, defaults,
constraints, compatibility, errors, and examples. Generate repetitive API surfaces when a
reliable source schema exists, but keep explanatory guidance authored and reviewed.

## Explanation

Build understanding of why a system works as it does. Define boundaries, relate concepts,
explain tradeoffs, and link to procedures instead of embedding operational steps. Use
`$architecture-diagramming` when relationships or runtime sequences are hard to understand
in prose alone.

## Architecture decision record

Capture context, decision drivers, considered alternatives, the chosen decision, status,
consequences, and follow-up work. Describe the decision as accepted at a point in time; do
not silently rewrite history after implementation changes. Supersede an old record with a
linked new record when the decision changes.

## Runbook

Optimize for a responder under time pressure. Include trigger conditions, access and safety
requirements, bounded diagnostic steps, expected signals, mitigation, verification,
rollback or escalation, and links to dashboards or ownership information. Separate routine
operations from incident response when their risk and pacing differ.

## README

Orient contributors quickly: purpose, supported use, minimal setup, primary commands, and
links to deeper documentation. Do not turn the README into the full manual or duplicate
pages that have clearer long-term owners.
