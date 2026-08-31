# Security policy

## Supported versions

Security fixes are applied to the latest state of `main`. Released archives are immutable;
after a fix is published, use the newest release rather than an affected older archive.

## Reporting a vulnerability

Do not open a public issue for a suspected vulnerability or exposed credential. Use the
repository's **Security → Advisories → Report a vulnerability** workflow on GitHub so the
maintainer can investigate privately.

Include:

- the affected skill, plugin, script, workflow, or release;
- the security impact and realistic attack conditions;
- minimal reproduction steps or a proof of concept;
- any known mitigations; and
- whether the issue is already public or being actively exploited.

Do not include real credentials, private user data, or destructive payloads. Use synthetic
examples and redact tokens from logs and screenshots.

## Response and disclosure

The maintainer will validate the report, coordinate a correction, and publish an advisory
when appropriate. Allow time for a fix before public disclosure. If the report concerns a
third-party runtime or dependency rather than this repository, it may be redirected to that
project's security process.

## Scope

Relevant issues include unsafe executable instructions, command injection, path traversal,
secret disclosure, dangerous default permissions, compromised release automation, and
catalog validation bypasses. General feature requests and non-security defects belong in
the normal issue tracker.
