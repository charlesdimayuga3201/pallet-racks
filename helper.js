import { fileURLToPath } from "url";
import path from "path";

export function getCurrentDirectory(importMetaUrl) {
  const filename = fileURLToPath(importMetaUrl);
  return path.dirname(filename);
}
