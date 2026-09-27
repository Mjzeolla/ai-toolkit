# Archify diagrams

Archify is an optional external agent skill for producing deterministic, self-contained HTML
diagrams from typed JSON intermediate representations. Use it when interactive exploration,
themes, or a polished HTML artifact adds value. Prefer a simpler text-native format when an
inline documentation diagram is sufficient.

The installed Archify package's `SKILL.md`, schemas, references, and command help are
authoritative. Read its complete `SKILL.md` before creating an artifact because its
interface and diagram types can evolve. Do not vendor or guess its current schema here, and
do not silently install or update Archify. If it is unavailable, use another requested
format or ask for authorization before adding the dependency.

## Availability and installation

Check whether the `archify` skill is present in the runtime's discovered skill locations
before selecting this workflow. Do not use an unconditional dollar-prefixed skill handoff
for Archify because this skill remains useful without that independently installed
capability.

When Archify is missing and its output is materially useful, tell the user it is an optional
third-party integration and offer its upstream-supported command:

```bash
npx skills add tt-a1i/archify -g
```

For a one-session Codex trial without permanent installation, offer:

```bash
npx skills use tt-a1i/archify@archify --agent codex
```

Installation requires explicit user authorization. After installation, start a new agent
session so discovery can load the skill. If the user declines or installation is unavailable,
continue with draw.io, Mermaid, or another format that satisfies the request.

## Upstream reference router

Load Archify's supporting files progressively rather than reading its whole package:

- Read the matching type schema, `schemas/common.schema.json`, and one matching example for
  ordinary generation.
- Read `references/authoring-contract.md` only when field enums, geometry repair, placement,
  localization, or repository-evidence rules are needed.
- Read `references/delivery-contract.md` when using preview, delivery receipts, exports,
  browser evidence, manual review records, or post-delivery opening.
- Read `references/brand-marks.md` only for an unknown brand when the user supplied an
  official URL and the installed skill directs you to capture it.
- Read `references/viewer-runtime.md` only when the user asks for reader-facing features
  such as guided stories, deep links, presentation, search or focus, relationship and route
  exploration, motion, or Share Cards. These capabilities are already provided by the
  generated HTML; do not rebuild them as authoring features.

Treat viewer interactions as overlays on the authored graph, not as another topology or
source of truth. Curated views must use stable authored node IDs. Routes and reachability
must derive from authored directed relationships rather than geometry or proximity. Static
meaning must survive reduced motion, printing, and canonical export, and temporary viewer
state must not leak into canonical exports.

## Workflow

1. Locate the installed Archify skill and read its complete `SKILL.md`. Follow the upstream
   reference router above for any additional material.
2. Select the narrowest supported type for the question, such as architecture, workflow,
   sequence, data flow, or lifecycle. Build a candidate JSON model with stable identifiers
   and source-backed facts, preserving that model as editable source.
3. Run the installed version's validation command after each candidate edit and at the
   quality level appropriate to the
   requested artifact. Repair reported diagnostics without adding unsupported architecture.
   Keep repair attempts bounded and stop if a change makes validation worse.
4. Treat the passing final validation as freezing the candidate. Use the installed version's
   delivery command as final acceptance and do not edit the source afterward. A failed
   delivery may leave an older artifact at the output path, so do not visually check that
   path as if it represented the failed candidate.
5. After successful delivery, run Archify's browser-based visual check when available, then
   inspect the rendered result
   perceptually for legibility, overlap, clipping, edge routing, and misleading emphasis.

Current releases commonly expose commands shaped like the following from the Archify
package root, but confirm them against the installed skill before use:

```bash
node bin/archify.mjs validate <type> <candidate.json> --quality showcase --json
node bin/archify.mjs deliver <type> <candidate.json> <output.html> --quality showcase --json
node bin/archify.mjs visual-check <output.html> --json
```

Report the candidate JSON path, output HTML path, selected type, schema-validation result,
delivery receipt, browser-check result, and perceptual-review result separately. Delivery
proves deterministic artifact checks, browser checking proves bounded runtime behavior, and
perceptual review requires an actual human or image-capable reviewer. Never claim one form
of evidence implies another or report a check that was not performed. Static diagrams are
the default; add motion only when the user requests it.

Authoritative references:

- [Archify repository](https://github.com/tt-a1i/archify)
- [Archify installation options](https://github.com/tt-a1i/archify#installation-options)
- [Archify skill instructions](https://github.com/tt-a1i/archify/blob/main/archify/SKILL.md)
- [Archify Viewer Runtime reference](https://github.com/tt-a1i/archify/blob/main/archify/references/viewer-runtime.md)
