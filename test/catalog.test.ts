import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";

import { validateCatalog } from "../src/catalog.js";

function createSkill(root: string, name: string, description: string): void {
  const directory = join(root, "skills", "building", name);
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

function createPlugin(
  root: string,
  name: string,
  runtime: "claude" | "codex",
): void {
  const manifestDirectory = join(root, "plugins", name, `.${runtime}-plugin`);
  mkdirSync(manifestDirectory, { recursive: true });
  writeFileSync(
    join(manifestDirectory, "plugin.json"),
    JSON.stringify({
      name,
      version: "1.0.0",
      description: "A portable test plugin with useful runtime behavior.",
    }),
  );
}

void test("accepts a well-formed catalog", () => {
  const root = mkdtempSync(join(tmpdir(), "catalog-valid-"));
  mkdirSync(join(root, "plugins"));
  createSkill(
    root,
    "useful-test",
    "Perform a useful test when repository behavior needs validation.",
  );

  assert.deepEqual(validateCatalog(root).errors, []);
});

void test("rejects mismatched names and unfinished descriptions", () => {
  const root = mkdtempSync(join(tmpdir(), "catalog-invalid-"));
  mkdirSync(join(root, "plugins"));
  createSkill(root, "useful-test", "TODO replace this description later");
  const skillFile = join(root, "skills", "building", "useful-test", "SKILL.md");
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
  mkdirSync(join(root, "plugins"));
  createSkill(
    root,
    "useful-test",
    "Perform a useful test when repository behavior needs validation.",
  );
  const skillFile = join(root, "skills", "building", "useful-test", "SKILL.md");
  writeFileSync(
    skillFile,
    `${readFile(skillFile)}\nUse $missing-skill when the missing workflow applies.\n`,
  );

  assert.match(
    validateCatalog(root).errors.join("\n"),
    /references unknown catalog skill \$missing-skill/,
  );
});

void test("accepts a Claude plugin manifest", () => {
  const root = mkdtempSync(join(tmpdir(), "catalog-claude-plugin-"));
  createSkill(
    root,
    "useful-test",
    "Perform a useful test when repository behavior needs validation.",
  );
  createPlugin(root, "useful-plugin", "claude");

  assert.deepEqual(validateCatalog(root).errors, []);
});

void test("accepts a cross-runtime plugin with both manifests", () => {
  const root = mkdtempSync(join(tmpdir(), "catalog-cross-runtime-plugin-"));
  createSkill(
    root,
    "useful-test",
    "Perform a useful test when repository behavior needs validation.",
  );
  createPlugin(root, "useful-plugin", "claude");
  createPlugin(root, "useful-plugin", "codex");

  assert.deepEqual(validateCatalog(root).errors, []);
});

void test("rejects a plugin without a supported runtime manifest", () => {
  const root = mkdtempSync(join(tmpdir(), "catalog-plugin-no-manifest-"));
  createSkill(
    root,
    "useful-test",
    "Perform a useful test when repository behavior needs validation.",
  );
  mkdirSync(join(root, "plugins", "useful-plugin"), { recursive: true });

  assert.match(
    validateCatalog(root).errors.join("\n"),
    /must contain a supported Codex or Claude manifest/,
  );
});

function readFile(path: string): string {
  return readFileSync(path, "utf8");
}
