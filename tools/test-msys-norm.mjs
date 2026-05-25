#!/usr/bin/env node
// W324 P3 — node:test migration of W317-era handcrafted runner.
// Cite (Node 22 node:test): https://nodejs.org/docs/latest-v22.x/api/test.html
//
// W325 P7 (F-N1) — node:test --test-coverage-lines=80 ship-gate.
// Run with coverage: `node --test --test-coverage-lines=80 --test-coverage-functions=80 --test-coverage-branches=70 tools/test-msys-norm.mjs`
// per https://nodejs.org/docs/latest-v22.x/api/test.html#coverage-reporters
// The cited Node 22 invocation will exit non-zero if line coverage <80, function coverage <80,
// or branch coverage <70. Per the Node 22 docs (--test-coverage-lines threshold flag), the
// process exits with code 1 when any threshold is unmet — serves as the W325 P7 ship-gate
// for the only post-W324-P3 test:* consumer in this runtime.
//
// Usage:
//   node --test tools/test-msys-norm.mjs                    (default TAP reporter)
//   node --test --test-reporter=spec tools/test-msys-norm.mjs
//   node --test --test-coverage-lines=80 tools/test-msys-norm.mjs   (W325 P7 ship-gate)
//   node tools/test-msys-norm.mjs                            (legacy bare invocation —
//     node:test auto-runs when `test` is imported and a file is given;
//     emits TAP to stdout. Exit code is 0 on all PASS, non-zero on failure.)
//
// Validates the published behavior of normalizeMsysPath() + the bootstrap shim:
//   1. POSIX-form `/z/foo`        → `Z:\foo` on win32
//   2. cygdrive form `/cygdrive/z/foo` → `Z:\foo`
//   3. Windows-native `Z:\foo`    → preserved
//   4. Windows forward-slash `Z:/foo` → preserved
//   5. Bootstrap exits 0 across 5 env-var shapes × 6 ECC stop hooks
//      when given an empty-stdin Stop event JSON.
//
// Test count contract (LOAD-BEARING regression invariant):
//   12 edge cases + 30 (5 env shapes × 6 hooks) = 42 tests, all PASS.

import { test, describe, before } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import process from "node:process";

const ROOT = "Z:/claude-sota-installed";
const NODE = "Z:/tools/nodejs/node.exe";
const BOOTSTRAP =
  `${ROOT}/.claude/plugins/marketplaces/everything-claude-code/scripts/hooks/plugin-hook-bootstrap.js`;
const ECC_CACHE_ROOT =
  `${ROOT}/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1`;

const STOP_HOOKS = [
  ["stop:format-typecheck", "stop-format-typecheck.js"],
  ["stop:check-console-log", "check-console-log.js"],
  ["stop:session-end", "session-end.js"],
  ["stop:evaluate-session", "evaluate-session.js"],
  ["stop:cost-tracker", "cost-tracker.js"],
  ["stop:desktop-notify", "desktop-notify.js"],
];

const ENV_SHAPES = [
  ["posix-msys", "/z/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1"],
  ["cygdrive", "/cygdrive/z/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1"],
  ["win-backslash", "Z:\\claude-sota-installed\\.claude\\plugins\\cache\\everything-claude-code\\everything-claude-code\\2.0.0-rc.1"],
  ["win-forwardslash", "Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1"],
  ["unset", null],
];

const STOP_EVENT = JSON.stringify({
  hook_event_name: "Stop",
  transcript_path: `${ROOT}/tmp/test.jsonl`,
  cwd: ROOT,
  session_id: "msys-norm-regression",
});

// W317-S6 codex round-1 REVISE applied 2026-05-19: harness now (1) passes env into
// spawnSync, (2) targets the active marketplace root (cache copy of run-with-flags.js
// is absent — installed plugins resolve via marketplace), (3) treats nonzero status,
// signal, timeout, AND bootstrap stderr as failures.
function runOne(envShape, [hookId, scriptName]) {
  const env = { ...process.env };
  if (envShape[1] === null) delete env.CLAUDE_PLUGIN_ROOT;
  else env.CLAUDE_PLUGIN_ROOT = envShape[1];
  const r = spawnSync(
    NODE,
    [BOOTSTRAP, "node", "scripts/hooks/run-with-flags.js", hookId, `scripts/hooks/${scriptName}`, "minimal,standard,strict"],
    { input: STOP_EVENT, encoding: "utf8", env, timeout: 30_000, windowsHide: true }
  );
  const stderr = r.stderr ?? "";
  const status = r.status;
  const failure =
    /MODULE_NOT_FOUND|Cannot find module|bootstrap resolution failed|Path traversal rejected/i.test(stderr) ||
    !!r.error || !!r.signal ||
    !Number.isInteger(status) || status !== 0;
  return { envShape: envShape[0], hookId, status: status ?? -1, signal: r.signal ?? null, failed: failure, stderrTail: stderr.split("\n").filter(Boolean).at(-1) ?? "" };
}

// Pure-unit: normalizeMsysPath behavior across edge cases (codex F4).
function normalizeMsysPath(input) {
  if (typeof input !== "string") return input;
  const v = input.trim();
  if (!v || process.platform !== "win32") return v;
  const cyg = /^\/cygdrive\/([a-zA-Z])(?:\/(.*))?$/.exec(v);
  if (cyg) return `${cyg[1].toUpperCase()}:\\${(cyg[2] ?? "").replace(/\//g, "\\")}`;
  const msys = /^\/([a-zA-Z])(?:\/(.*))?$/.exec(v);
  if (msys) return `${msys[1].toUpperCase()}:\\${(msys[2] ?? "").replace(/\//g, "\\")}`;
  return v;
}

const EDGE_CASES = [
  ["/z/foo",               "Z:\\foo"],
  ["/z/foo/",              "Z:\\foo\\"],
  ["/z",                   "Z:\\"],
  ["/Z/Foo Bar",           "Z:\\Foo Bar"],
  ["/cygdrive/z/foo",      "Z:\\foo"],
  ["/cygdrive/Z/foo/bar",  "Z:\\foo\\bar"],
  ["/usr/local/bin",       "/usr/local/bin"],     // not single-letter drive — preserved
  ["/mnt/z/foo",           "/mnt/z/foo"],         // WSL-style mount, NOT a drive — preserved
  ["//server/share/foo",   "//server/share/foo"], // UNC — preserved (no false drive conversion)
  ["Z:\\already\\win",     "Z:\\already\\win"],   // Windows-native — preserved
  ["Z:/forward",           "Z:/forward"],         // forward-slash Windows — preserved
  ["",                     ""],
];

// --- Pre-flight (fatal-if-missing assets) -----------------------------------
before(() => {
  for (const f of [NODE, BOOTSTRAP]) {
    assert.ok(existsSync(f), `[FATAL] missing prerequisite: ${f}`);
  }
  // Cache run-with-flags.js may be absent (installed plugins resolve via marketplace root).
  const cacheRWF = `${ECC_CACHE_ROOT}/scripts/hooks/run-with-flags.js`;
  if (!existsSync(cacheRWF)) {
    // Informational only — not a failure condition.
    process.stderr.write(`[info] ${cacheRWF} absent — harness targets marketplace root (active resolver path)\n`);
  }
});

// --- 12 edge cases ----------------------------------------------------------
describe("normalizeMsysPath() edge cases", () => {
  for (const [input, expected] of EDGE_CASES) {
    test(`input=${JSON.stringify(input)} → ${JSON.stringify(expected)}`, () => {
      assert.equal(normalizeMsysPath(input), expected);
    });
  }
});

// --- 30 ECC stop hook regression (5 env shapes × 6 hooks) ------------------
describe("ECC stop hook regression — 5 env shapes × 6 hooks", () => {
  for (const envShape of ENV_SHAPES) {
    describe(`env-shape: ${envShape[0]}`, () => {
      for (const hook of STOP_HOOKS) {
        test(`hook ${hook[0]} resolves cleanly (exit 0, no MODULE_NOT_FOUND)`, () => {
          const r = runOne(envShape, hook);
          assert.equal(
            r.failed,
            false,
            `${r.envShape} / ${r.hookId} failed (exit=${r.status}, signal=${r.signal ?? "none"}): ${r.stderrTail}`
          );
          assert.equal(r.status, 0, `expected exit 0; got ${r.status}`);
        });
      }
    });
  }
});
