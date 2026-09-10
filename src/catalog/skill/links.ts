import { existsSync } from "node:fs";
import { dirname, relative, resolve, sep } from "node:path";

import { markdownLinkPattern } from "../../shared/constants/patterns.js";

export function validateLocalLinks(
  content: string,
  file: string,
  repositoryRoot: string,
  errors: string[],
): void {
  for (const match of content.matchAll(markdownLinkPattern)) {
    const target = match[1];
    if (!target || /^(?:[a-z]+:|#|\/)/i.test(target)) continue;

    const decodedTarget = decodeURIComponent(target.split("#", 1)[0] ?? "");
    if (!decodedTarget) continue;

    const resolvedTarget = resolve(dirname(file), decodedTarget);
    const relativeTarget = relative(repositoryRoot, resolvedTarget);
    if (relativeTarget.startsWith(`..${sep}`) || relativeTarget === "..") {
      errors.push(`${file}: local link escapes the repository: ${target}`);
      continue;
    }
    if (!existsSync(resolvedTarget)) {
      errors.push(`${file}: local link target does not exist: ${target}`);
    }
  }
}
