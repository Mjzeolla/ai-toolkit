---
name: security-audit
description: Audit a defined code or infrastructure surface for exploitable security weaknesses when trust boundaries, sensitive data, or authorization controls need evidence-based review.
---

# Security Audit

Confirm the authorized audit scope, assets, actors, entry points, and trust boundaries.
Trace realistic attacker-controlled inputs through authentication, authorization, data
access, command execution, network calls, serialization, and secret handling.

Prioritize findings with a credible path to impact. Verify protections in the effective
configuration and code; do not report a scanner label without understanding reachability
and consequence. Check for tenant isolation, privilege escalation, injection, request
forgery, unsafe file access, secret exposure, dependency risk, and insecure defaults when
they apply to the surface.

For each finding, provide evidence, prerequisites, impact, and the narrowest safe
remediation. Separate confirmed vulnerabilities from hardening suggestions and unknowns.
Do not exploit live systems, retrieve unrelated data, or broaden testing beyond the user's
authorization.

Use `$data-model` for data isolation invariants, `$code-review` for change-specific line
findings, and `$production-ready` for operational controls. Re-test remediations against the
original abuse path and relevant regressions.
