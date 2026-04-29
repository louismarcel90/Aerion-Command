
import { rmSync } from "node:fs";
import { join } from "node:path";

const pathsToRemove = ["dist", "coverage", ".turbo"];

for (const pathToRemove of pathsToRemove) {
  rmSync(join(process.cwd(), pathToRemove), {
    recursive: true,
    force: true,
  });
}