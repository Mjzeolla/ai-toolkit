import { readFileSync } from "node:fs";

import { parse as parseYaml } from "yaml";

import type { OpenAiMetadata } from "../../shared/types/catalog.js";

export function validateOpenAiMetadata(
  metadataFile: string,
  skillName: string,
  errors: string[],
): void {
  try {
    const metadata = parseYaml(
      readFileSync(metadataFile, "utf8"),
    ) as OpenAiMetadata;
    const displayName = metadata.interface?.display_name;
    const shortDescription = metadata.interface?.short_description;
    const defaultPrompt = metadata.interface?.default_prompt;

    if (typeof displayName !== "string" || displayName.trim().length === 0) {
      errors.push(
        `${metadataFile}: interface.display_name must be a non-empty string`,
      );
    }
    if (
      typeof shortDescription !== "string" ||
      shortDescription.length < 25 ||
      shortDescription.length > 64
    ) {
      errors.push(
        `${metadataFile}: interface.short_description must contain 25-64 characters`,
      );
    }
    if (
      typeof defaultPrompt !== "string" ||
      !defaultPrompt.includes(`$${skillName}`)
    ) {
      errors.push(
        `${metadataFile}: interface.default_prompt must mention $${skillName}`,
      );
    }

    const implicitPolicy = metadata.policy?.allow_implicit_invocation;
    if (implicitPolicy !== undefined && typeof implicitPolicy !== "boolean") {
      errors.push(
        `${metadataFile}: policy.allow_implicit_invocation must be boolean`,
      );
    }
  } catch (error) {
    errors.push(
      `${metadataFile}: invalid YAML: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}
