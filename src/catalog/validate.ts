import { join } from "node:path";

import { validatePlugin } from "./plugin/validate.js";
import type { ValidationResult } from "../shared/types/catalog.js";
import {
  listDirectories,
  listSkillDirectories,
} from "../shared/utils/filesystem.js";
import { validateSkill, validateSkillReferences } from "./skill/validate.js";

export function validateCatalog(repositoryRoot: string): ValidationResult {
  const errors: string[] = [];
  const pluginDirectories = listDirectories(join(repositoryRoot, "plugins"));
  const skillDirectories = pluginDirectories.flatMap((pluginDirectory) =>
    listSkillDirectories(join(pluginDirectory, "skills")),
  );

  if (pluginDirectories.length === 0) {
    errors.push(
      `${join(repositoryRoot, "plugins")}: catalog must contain a plugin`,
    );
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
