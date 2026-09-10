import { existsSync, readFileSync } from "node:fs";
import { join, sep } from "node:path";

import { parseFrontmatter } from "./frontmatter.js";
import { validateLocalLinks } from "./links.js";
import { validateOpenAiMetadata } from "./openai-metadata.js";
import {
  containsPlaceholder,
  skillNamePattern,
  skillReferencePattern,
} from "../../shared/constants/patterns.js";
import { listFilesRecursively } from "../../shared/utils/filesystem.js";

function listInstructionFiles(skillDirectory: string): string[] {
  const skillFile = join(skillDirectory, "SKILL.md");
  const referenceFiles = listFilesRecursively(
    join(skillDirectory, "references"),
  ).filter((file) => file.endsWith(".md"));

  return [skillFile, ...referenceFiles];
}

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

  for (const referenceFile of listInstructionFiles(skillDirectory).slice(1)) {
    validateLocalLinks(
      readFileSync(referenceFile, "utf8"),
      referenceFile,
      repositoryRoot,
      errors,
    );
  }

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
    for (const instructionFile of listInstructionFiles(skillDirectory)) {
      if (!existsSync(instructionFile)) continue;

      const content = readFileSync(instructionFile, "utf8");
      for (const match of content.matchAll(skillReferencePattern)) {
        const referencedSkill = match[1];
        if (referencedSkill && !knownSkills.has(referencedSkill)) {
          errors.push(
            `${instructionFile}: references unknown catalog skill $${referencedSkill}`,
          );
        }
      }
    }
  }
}
