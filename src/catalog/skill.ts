import { existsSync, readFileSync } from "node:fs";
import { join, sep } from "node:path";

import { parseFrontmatter } from "./frontmatter.js";
import { validateLocalLinks } from "./links.js";
import { validateOpenAiMetadata } from "./metadata.js";
import {
  containsPlaceholder,
  skillNamePattern,
  skillReferencePattern,
} from "./patterns.js";

export function validateSkill(
  skillDirectory: string,
  repositoryRoot: string,
  errors: string[],
): void {
  const directoryName = skillDirectory.split(sep).at(-1) ?? "";
  const skillFile = join(skillDirectory, "SKILL.md");

  if (!skillNamePattern.test(directoryName) || directoryName.length > 64) {
    errors.push(
      `${skillDirectory}: skill directory must be a kebab-case name of at most 64 characters`,
    );
  }
  if (!existsSync(skillFile)) {
    errors.push(`${skillDirectory}: missing SKILL.md`);
    return;
  }

  const content = readFileSync(skillFile, "utf8");
  try {
    const { body, data } = parseFrontmatter(content, skillFile);
    if (data.name !== directoryName) {
      errors.push(
        `${skillFile}: frontmatter name must match directory ${directoryName}`,
      );
    }
    if (
      typeof data.description !== "string" ||
      data.description.trim().length < 30
    ) {
      errors.push(
        `${skillFile}: description must be a discriminating string of at least 30 characters`,
      );
    } else if (containsPlaceholder(data.description)) {
      errors.push(
        `${skillFile}: description contains unfinished placeholder text`,
      );
    }
    if (body.trim().length < 120) {
      errors.push(
        `${skillFile}: instructions are too short to provide a useful workflow`,
      );
    }
    if (containsPlaceholder(body)) {
      errors.push(
        `${skillFile}: instructions contain unfinished placeholder text`,
      );
    }
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error));
  }

  validateLocalLinks(content, skillFile, repositoryRoot, errors);

  const metadataFile = join(skillDirectory, "agents", "openai.yaml");
  if (existsSync(metadataFile)) {
    validateOpenAiMetadata(metadataFile, directoryName, errors);
  }
}

export function validateSkillReferences(
  skillDirectories: string[],
  errors: string[],
): void {
  const knownSkills = new Set(
    skillDirectories.map((directory) => directory.split(sep).at(-1) ?? ""),
  );

  for (const skillDirectory of skillDirectories) {
    const skillFile = join(skillDirectory, "SKILL.md");
    if (!existsSync(skillFile)) continue;

    const content = readFileSync(skillFile, "utf8");
    for (const match of content.matchAll(skillReferencePattern)) {
      const referencedSkill = match[1];
      if (referencedSkill && !knownSkills.has(referencedSkill)) {
        errors.push(
          `${skillFile}: references unknown catalog skill $${referencedSkill}`,
        );
      }
    }
  }
}
