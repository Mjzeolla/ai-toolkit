import { parse as parseYaml } from "yaml";

import { frontmatterPattern } from "../../shared/constants/patterns.js";
import type { SkillFrontmatter } from "../../shared/types/catalog.js";

export function parseFrontmatter(
  content: string,
  file: string,
): { body: string; data: SkillFrontmatter } {
  const match = frontmatterPattern.exec(content);
  if (!match?.[1] || match[2] === undefined) {
    throw new Error(`${file}: expected YAML frontmatter delimited by ---`);
  }

  const parsed: unknown = parseYaml(match[1]);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error(`${file}: frontmatter must be a YAML mapping`);
  }

  return { body: match[2], data: parsed as SkillFrontmatter };
}
