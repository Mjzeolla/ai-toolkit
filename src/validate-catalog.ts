import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { validateCatalog } from "./catalog.js";

const repositoryRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const result = validateCatalog(repositoryRoot);

if (result.errors.length > 0) {
  console.error(
    `Catalog validation failed with ${result.errors.length} error(s):`,
  );
  for (const error of result.errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(
    `Catalog valid: ${result.skillCount} skill(s), ${result.pluginCount} plugin(s).`,
  );
}
