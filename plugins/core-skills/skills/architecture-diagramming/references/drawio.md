# draw.io diagrams

Use draw.io when collaborators need a broadly supported, manually editable canvas. Keep the
`.drawio` file as the canonical source and provide SVG, PNG, or PDF only as a rendered
delivery format.

## Source contract

Generate uncompressed XML so that changes remain reviewable. A complete `<mxfile>` document
is appropriate for multiple pages or document-level settings; a bare `<mxGraphModel>` is a
valid, simpler choice for a generated single-page diagram. Do not generate draw.io's
compressed Base64 representation.

Maintain these model invariants:

- Include root cells `<mxCell id="0"/>` and `<mxCell id="1" parent="0"/>`.
- Give every cell a unique, stable identifier.
- Mark nodes with `vertex="1"` and connectors with `edge="1"`.
- Encode styles as semicolon-delimited `key=value` pairs.
- Escape labels and other values correctly for XML.
- Use relative geometry for children of groups.
- Connect edges to explicit source and target cells when the relationship is known.

Use groups for real architectural boundaries and layers for concerns that users may need to
show or hide independently. Prefer simple shapes and text labels over product-specific icons
unless the icon meaning is established. Preserve stable cell IDs when revising an existing
diagram so diffs and references remain useful.

## Validation and export

At minimum, parse the generated XML and check the model invariants above. When available,
validate against draw.io's official `mxfile.xsd` and consult the official style reference.
Open or render the file with an existing draw.io application, integration, or CLI before
claiming it renders correctly. If no renderer is available, report that the XML was reviewed
but not rendered.

When the draw.io Desktop CLI is already installed, inspect its current help before using it
because options may vary by release. Export the requested SVG, PNG, or PDF while retaining
the `.drawio` source. Visually inspect the export for clipping, overlap, unreadable labels,
misrouted connectors, and unexpected page bounds.

Authoritative references:

- [draw.io diagram generation reference](https://www.drawio.com/docs/reference/diagram-generation/)
- [Export a diagram](https://www.drawio.com/docs/manual/export/export-diagram/)
