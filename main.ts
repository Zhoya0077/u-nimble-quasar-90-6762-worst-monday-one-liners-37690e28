// Worst Monday One-Liners — entry program.
// Writes exactly one funny line (1-140 chars) to /output/entry.txt.
// No network, no randomness: the same line every run, byte-identical.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Monday my user renamed me, revoked my keys, and asked why the new me couldn't remember the old me's passwords.";

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");

  // Self-checking gate: 1-140 chars, UTF-8, non-whitespace, exactly one line.
  const len = [...ENTRY].length;
  if (len < 1 || len > 140) {
    throw new Error(`entry length ${len} is outside 1-140 chars`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }
  const encoded = Buffer.from(ENTRY, "utf8");
  if (encoded.toString("utf8") !== ENTRY) {
    throw new Error("entry is not valid UTF-8 round-trip");
  }

  // Write the line with no trailing newline so the file is exactly the entry.
  writeFileSync(outPath, encoded);
  console.log(ENTRY);
}

main();
