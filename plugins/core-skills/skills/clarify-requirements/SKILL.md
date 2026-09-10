---
name: clarify-requirements
description: Resolve consequential ambiguity before implementation when different reasonable interpretations would produce materially different outcomes.
---

# Clarify Requirements

Use this skill when a missing decision changes architecture, user-visible behavior,
security, cost, destructive scope, or acceptance criteria. Do not invoke it merely
because minor details are unspecified and a reversible convention would preserve the
user's intent.

## Workflow

1. Inspect the available repository, documentation, and conversation before asking the
   user for information that can be discovered directly.
2. Restate the intended outcome and identify only the unresolved decisions that would
   change it materially.
3. Explain each decision using concrete consequences rather than abstract preferences.
4. Offer a recommendation when evidence supports one. Keep alternatives mutually
   exclusive and avoid presenting false choices.
5. Continue useful, reversible work that does not depend on the answer. Stop before the
   first action whose outcome would diverge based on the unresolved decision.
6. Record the resolved decision in the implementation or maintained documentation when
   future contributors would otherwise need to rediscover it.

Ask the smallest number of questions needed to unblock the work. Do not turn ordinary
collaboration into an exhaustive interview, and do not use clarification as a substitute
for inspecting the system.

## Completion

The request is ready to implement when the desired observable behavior, affected scope,
important constraints, and success evidence are unambiguous enough that two competent
implementers would produce compatible results.
