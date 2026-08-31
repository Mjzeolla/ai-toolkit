import { join, sep } from "node:path";

import { listDirectories, listSkillDirectories } from "./filesystem.js";
import { skillNamePattern } from "./patterns.js";
import { validatePlugin } from "./plugin.js";
import { validateSkill, validateSkillReferences } from "./skill.js";
import type { ValidationResult } from "./types.js";

export function validateCatalog(repositoryRoot: string): ValidationResult {
  const errors: string[] = [];
  const skillsRoot = join(repositoryRoot, "skills");
  const categories = listDirectories(skillsRoot);
  const skillDirectories = listSkillDirectories(skillsRoot);
  const pluginDirectories = listDirectories(join(repositoryRoot, "plugins"));

  if (skillDirectories.length === 0) {
    errors.push(`${skillsRoot}: catalog must contain at least one skill`);
  }

  for (const category of categories) {
    const categoryName = category.split(sep).at(-1) ?? "";
    if (!skillNamePattern.test(categoryName)) {
      errors.push(`${category}: category directory must use kebab-case`);
    }
  }

  for (const skillDirectory of skillDirectories) {
    validateSkill(skillDirectory, repositoryRoot, errors);
  }
  validateSkillReferences(skillDirectories, errors);

  for (const pluginDirectory of pluginDirectories) {
    validatePlugin(pluginDirectory, errors);
  }

  return {
    errors,
    pluginCount: pluginDirectories.length,
    skillCount: skillDirectories.length,
  };
}
