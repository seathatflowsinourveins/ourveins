// tools/sota-discovery/lib/ledger.mjs
// Append-only raw-evidence ledger at .claude/state/sca-decision-outcomes.json.
// Codex W380-r1 MVP scope: CAPTURE raw verdicts, do NOT fit weights on n=12.
// Calibration is deferred to a 50-repo stratified backtest using this ledger.

import { mkdir, readFile, writeFile, rename } from "node:fs/promises";
import path from "node:path";

const LEDGER_PATH =
  process.env.SCA_LEDGER_PATH || ".claude/state/sca-decision-outcomes.json";

export async function readLedger(p = LEDGER_PATH) {
  try {
    const j = JSON.parse(await readFile(p, "utf8"));
    return Array.isArray(j) ? j : [];
  } catch {
    return [];
  }
}

export async function appendVerdict(verdict, p = LEDGER_PATH) {
  await mkdir(path.dirname(p), { recursive: true });
  const arr = await readLedger(p);
  arr.push(verdict);
  const tmp = `${p}.tmp`;
  await writeFile(tmp, JSON.stringify(arr, null, 2));
  await rename(tmp, p); // atomic on POSIX; MoveFileEx replaces on Windows
}
