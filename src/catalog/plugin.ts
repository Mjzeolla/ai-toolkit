import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { semanticVersionPattern, skillNamePattern } from "./patterns.js";
import type { PluginManifest } from "./types.js";

export function validatePlugin(
  pluginDirectory: string,
  errors: string[],
): void {
  const manifestFiles = [
    join(pluginDirectory, ".codex-plugin", "plugin.json"),
    join(pluginDirectory, ".claude-plugin", "plugin.json"),
  ].filter((manifestFile) => existsSync(manifestFile));

  if (manifestFiles.length === 0) {
    errors.push(
      `${pluginDirectory}: plugin directory must contain a supported Codex or Claude manifest`,
    );
    return;
  }

  for (const manifestFile of manifestFiles) {
    try {
      const manifest = JSON.parse(
        readFileSync(manifestFile, "utf8"),
      ) as PluginManifest;
      if (
        typeof manifest.name !== "string" ||
        !skillNamePattern.test(manifest.name)
      ) {
        errors.push(`${manifestFile}: name must use kebab-case`);
      }
      if (
        typeof manifest.version !== "string" ||
        !semanticVersionPattern.test(manifest.version)
      ) {
        errors.push(`${manifestFile}: version must use semantic versioning`);
      }
      if (
        typeof manifest.description !== "string" ||
        manifest.description.trim().length < 20
      ) {
        errors.push(
          `${manifestFile}: description must contain at least 20 characters`,
        );
      }
    } catch (error) {
      errors.push(
        `${manifestFile}: invalid JSON: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }
}
