import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

export function listDirectories(path: string): string[] {
  if (!existsSync(path)) return [];

  return readdirSync(path)
    .map((entry) => join(path, entry))
    .filter((entry) => statSync(entry).isDirectory())
    .sort();
}

export function listSkillDirectories(skillsRoot: string): string[] {
  return listDirectories(skillsRoot).filter((directory) =>
    existsSync(join(directory, "SKILL.md")),
  );
}

export function listFilesRecursively(path: string): string[] {
  if (!existsSync(path)) return [];

  return readdirSync(path, { withFileTypes: true })
    .flatMap((entry) => {
      const entryPath = join(path, entry.name);
      if (entry.isDirectory()) return listFilesRecursively(entryPath);
      return entry.isFile() ? [entryPath] : [];
    })
    .sort();
}
