import { test } from "bun:test";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { assertSeam } from "@bounded-systems/seam-check";

const SRC = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// CAS is the bottom of the provenance stack: it depends on nothing in the repo.
// Prod files may touch node builtins only (node:crypto/fs/path); any other edge
// means the substrate grew an upward dependency and is no longer extractable as
// the base package. The harness also enforces no hidden ambient authority — no
// subprocess spawn, no ambient env.
test("@bounded-systems/cas upholds its seam claim", () => {
  assertSeam({
    root: SRC,
    prod: ["node:crypto", "node:fs", "node:path"],
    test: ["@bounded-systems/cas", "@bounded-systems/seam-check"],
  });
});
