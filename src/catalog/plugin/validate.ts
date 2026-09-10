import { existsSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";

import {
  semanticVersionPattern,
  skillNamePattern,
} from "../../shared/constants/patterns.js";
import type { PluginManifest } from "../../shared/types/catalog.js";

export function validatePlugin(
  pluginDirectory: string,
  errors: string[],
): void {
  const manifestFile = join(pluginDirectory, "plugin.json");
  const claudeManifestFile = join(
    pluginDirectory,
    ".claude-plugin",
    "plugin.json",
  );
  let portableManifest: PluginManifest | undefined;

  if (!existsSync(manifestFile)) {
    errors.push(
      `${pluginDirectory}: plugin must contain a portable root plugin.json manifest`,
    );
    return;
  }

  try {
    const manifest = JSON.parse(
      readFileSync(manifestFile, "utf8"),
    ) as PluginManifest;
    portableManifest = manifest;
    if (
      manifest.$schema !==
      "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json"
    ) {
      errors.push(
        `${manifestFile}: portable manifest must declare the Agent Plugins 1.0.0 schema`,
      );
    }
    if (
      typeof manifest.name !== "string" ||
      !skillNamePattern.test(manifest.name)
    ) {
      errors.push(`${manifestFile}: name must use kebab-case`);
    } else if (manifest.name !== basename(pluginDirectory)) {
      errors.push(`${manifestFile}: name must match the plugin directory`);
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

  if (!existsSync(claudeManifestFile)) {
    errors.push(
      `${pluginDirectory}: plugin must contain a Claude Code .claude-plugin/plugin.json manifest`,
    );
    return;
  }

  try {
    const manifest = JSON.parse(
      readFileSync(claudeManifestFile, "utf8"),
    ) as PluginManifest;
    if (
      manifest.$schema !==
      "https://json.schemastore.org/claude-code-plugin-manifest.json"
    ) {
      errors.push(
        `${claudeManifestFile}: Claude manifest must declare the Claude Code plugin schema`,
      );
    }
    if (manifest.name !== basename(pluginDirectory)) {
      errors.push(
        `${claudeManifestFile}: name must match the plugin directory`,
      );
    }
    if (
      typeof manifest.version !== "string" ||
      !semanticVersionPattern.test(manifest.version)
    ) {
      errors.push(
        `${claudeManifestFile}: version must use semantic versioning`,
      );
    } else if (manifest.version !== portableManifest?.version) {
      errors.push(
        `${claudeManifestFile}: version must match the portable root manifest`,
      );
    }
  } catch (error) {
    errors.push(
      `${claudeManifestFile}: invalid JSON: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}
