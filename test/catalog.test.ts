import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";

import { validateCatalog } from "../src/catalog.js";

function createSkill(root: string, name: string, description: string): void {
  const directory = join(root, "plugins", "useful-plugin", "skills", name);
  mkdirSync(join(directory, "agents"), { recursive: true });
  writeFileSync(
    join(directory, "SKILL.md"),
    `---\nname: ${name}\ndescription: ${description}\n---\n\n# Workflow\n\nInspect the relevant context, preserve the requested scope, and validate observable outcomes before reporting completion. This intentionally contains enough task guidance for catalog validation.\n`,
  );
  writeFileSync(
    join(directory, "agents", "openai.yaml"),
    `interface:\n  display_name: "Test Skill"\n  short_description: "A sufficiently descriptive test skill"\n  default_prompt: "Use $${name} to complete this test request."\n`,
  );
}

function createPlugin(root: string, name = "useful-plugin"): void {
  mkdirSync(join(root, "plugins", name), { recursive: true });
  writeFileSync(
    join(root, "plugins", name, "plugin.json"),
    JSON.stringify({
      $schema: "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
      name,
      version: "1.0.0",
      description: "A portable test plugin with useful runtime behavior.",
    }),
  );
  mkdirSync(join(root, "plugins", name, ".claude-plugin"), {
    recursive: true,
  });
  writeFileSync(
    join(root, "plugins", name, ".claude-plugin", "plugin.json"),
    JSON.stringify({
      $schema: "https://json.schemastore.org/claude-code-plugin-manifest.json",
      name,
      version: "1.0.0",
      description: "A Claude Code test plugin with useful runtime behavior.",
    }),
  );
}

void test("accepts a well-formed catalog", () => {
  const root = mkdtempSync(join(tmpdir(), "catalog-valid-"));
  createPlugin(root);
  createSkill(
    root,
    "useful-test",
    "Perform a useful test when repository behavior needs validation.",
  );

  assert.deepEqual(validateCatalog(root).errors, []);
});

void test("rejects mismatched names and unfinished descriptions", () => {
  const root = mkdtempSync(join(tmpdir(), "catalog-invalid-"));
  createPlugin(root);
  createSkill(root, "useful-test", "TODO replace this description later");
  const skillFile = join(
    root,
    "plugins",
    "useful-plugin",
    "skills",
    "useful-test",
    "SKILL.md",
  );
  const content = readFile(skillFile).replace(
    "name: useful-test",
    "name: wrong-name",
  );
  writeFileSync(skillFile, content);

  const errors = validateCatalog(root).errors.join("\n");
  assert.match(errors, /frontmatter name must match/);
  assert.match(
    errors,
    /description contains unfinished placeholder|description must/,
  );
});

void test("rejects references to skills outside the catalog", () => {
  const root = mkdtempSync(join(tmpdir(), "catalog-reference-"));
  createPlugin(root);
  createSkill(
    root,
    "useful-test",
    "Perform a useful test when repository behavior needs validation.",
  );
  const skillFile = join(
    root,
    "plugins",
    "useful-plugin",
    "skills",
    "useful-test",
    "SKILL.md",
  );
  writeFileSync(
    skillFile,
    `${readFile(skillFile)}\nUse $missing-skill when the missing workflow applies.\n`,
  );

  assert.match(
    validateCatalog(root).errors.join("\n"),
    /references unknown catalog skill \$missing-skill/,
  );
});

void test("validates nested reference documents", () => {
  const root = mkdtempSync(join(tmpdir(), "catalog-reference-documents-"));
  createPlugin(root);
  createSkill(
    root,
    "useful-test",
    "Perform a useful test when repository behavior needs validation.",
  );
  const referencesDirectory = join(
    root,
    "plugins",
    "useful-plugin",
    "skills",
    "useful-test",
    "references",
    "nested",
  );
  mkdirSync(referencesDirectory, { recursive: true });
  writeFileSync(
    join(referencesDirectory, "guide.md"),
    "Use $missing-skill and read the [missing guide](missing.md).\n",
  );

  const errors = validateCatalog(root).errors.join("\n");
  assert.match(errors, /references unknown catalog skill \$missing-skill/);
  assert.match(errors, /local link target does not exist: missing\.md/);
});

void test("rejects a plugin without a portable root manifest", () => {
  const root = mkdtempSync(join(tmpdir(), "catalog-plugin-no-manifest-"));
  createSkill(
    root,
    "useful-test",
    "Perform a useful test when repository behavior needs validation.",
  );

  assert.match(
    validateCatalog(root).errors.join("\n"),
    /must contain a portable root plugin\.json manifest/,
  );
});

void test("rejects a portable manifest without the Agent Plugins schema", () => {
  const root = mkdtempSync(join(tmpdir(), "catalog-plugin-schema-"));
  createSkill(
    root,
    "useful-test",
    "Perform a useful test when repository behavior needs validation.",
  );
  writeFileSync(
    join(root, "plugins", "useful-plugin", "plugin.json"),
    JSON.stringify({
      name: "useful-plugin",
      version: "1.0.0",
      description: "A portable test plugin with useful runtime behavior.",
    }),
  );

  assert.match(
    validateCatalog(root).errors.join("\n"),
    /must declare the Agent Plugins 1\.0\.0 schema/,
  );
});

void test("rejects a manifest name that differs from its plugin directory", () => {
  const root = mkdtempSync(join(tmpdir(), "catalog-plugin-name-"));
  createPlugin(root, "useful-plugin");
  createSkill(
    root,
    "useful-test",
    "Perform a useful test when repository behavior needs validation.",
  );
  const manifestFile = join(root, "plugins", "useful-plugin", "plugin.json");
  const manifest = JSON.parse(readFile(manifestFile)) as { name: string };
  manifest.name = "wrong-plugin";
  writeFileSync(manifestFile, JSON.stringify(manifest));

  assert.match(
    validateCatalog(root).errors.join("\n"),
    /name must match the plugin directory/,
  );
});

void test("rejects a plugin without a Claude Code manifest", () => {
  const root = mkdtempSync(
    join(tmpdir(), "catalog-plugin-no-claude-manifest-"),
  );
  createSkill(
    root,
    "useful-test",
    "Perform a useful test when repository behavior needs validation.",
  );
  mkdirSync(join(root, "plugins", "useful-plugin"), { recursive: true });
  writeFileSync(
    join(root, "plugins", "useful-plugin", "plugin.json"),
    JSON.stringify({
      $schema: "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
      name: "useful-plugin",
      version: "1.0.0",
      description: "A portable test plugin with useful runtime behavior.",
    }),
  );

  assert.match(
    validateCatalog(root).errors.join("\n"),
    /must contain a Claude Code \.claude-plugin\/plugin\.json manifest/,
  );
});

void test("rejects mismatched portable and Claude Code versions", () => {
  const root = mkdtempSync(join(tmpdir(), "catalog-plugin-version-mismatch-"));
  createPlugin(root);
  createSkill(
    root,
    "useful-test",
    "Perform a useful test when repository behavior needs validation.",
  );
  const manifestFile = join(
    root,
    "plugins",
    "useful-plugin",
    ".claude-plugin",
    "plugin.json",
  );
  const manifest = JSON.parse(readFile(manifestFile)) as { version: string };
  manifest.version = "2.0.0";
  writeFileSync(manifestFile, JSON.stringify(manifest));

  assert.match(
    validateCatalog(root).errors.join("\n"),
    /version must match the portable root manifest/,
  );
});

function readFile(path: string): string {
  return readFileSync(path, "utf8");
}
