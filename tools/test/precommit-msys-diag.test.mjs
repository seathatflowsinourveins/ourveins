// precommit-msys-diag.test.mjs — TDD spec for tools/precommit-msys-diag.mjs
//
// The diagnostic tool is a READ-ONLY forensic instrument that runs a pre-commit
// hook between two state snapshots and reports whether any tracked file's CONTENT
// changed (-> P0 external writer) vs whether `git diff` bytes shifted with NO
// content change (-> P1/P2 stash-internal). It must ALWAYS exit 0 and must NEVER
// modify a tracked file (CR-6 self-test).
//
// Contract under test:
//   node tools/precommit-msys-diag.mjs --hook <hook-id> [--tee <file>] [--json]
//
// Run: node --test tools/test/precommit-msys-diag.test.mjs

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');
const REPO_ROOT = resolve(__dirname, '../..');
const DIAG_CLI = resolve(__dirname, '../precommit-msys-diag.mjs');

// The hook we diagnose in tests: msys-hooks-form is provably read-only + always_run.
const HOOK_ID = 'msys-hooks-form';

// Run the diag tool, capturing stdout. execFileSync THROWS on non-zero exit, so a
// successful return is itself evidence of exit 0. We give it a generous buffer +
// timeout because it shells out to `pre-commit run --all-files`.
function runDiag(args) {
  return execFileSync('node', [DIAG_CLI, ...args], {
    cwd: REPO_ROOT,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
    timeout: 180000,
  });
}

// `git diff HEAD --stat` over the whole tree — a stable witness for "did running
// the tool change any TRACKED file's content vs HEAD". The diag tool is read-only,
// so this byte-string must be identical before and after.
function trackedDiffStat() {
  return execFileSync('git', ['diff', 'HEAD', '--stat'], {
    cwd: REPO_ROOT,
    encoding: 'utf8',
    maxBuffer: 16 * 1024 * 1024,
  });
}

test('T1: running the tool does not modify any tracked file (CR-6 self-test)', () => {
  const before = trackedDiffStat();
  runDiag(['--hook', HOOK_ID, '--json']);
  const after = trackedDiffStat();
  assert.equal(after, before, 'git diff HEAD --stat must be byte-identical before/after; the diag tool must not mutate tracked files');
});

test('T2: stdout contains the literal ATTRIBUTION: token', () => {
  const out = runDiag(['--hook', HOOK_ID]);
  assert.ok(out.includes('ATTRIBUTION:'), `stdout must contain the literal "ATTRIBUTION:" token; got:\n${out}`);
});

test('T3: tool exits 0 (reaching past execFileSync = pass)', () => {
  // execFileSync throws if exit code != 0. Reaching the assertion proves exit 0.
  const out = runDiag(['--hook', HOOK_ID]);
  assert.ok(typeof out === 'string', 'tool must exit 0 and produce stdout');
});

test('T4: --json emits parseable JSON with required keys', () => {
  const out = runDiag(['--hook', HOOK_ID, '--json']);
  let parsed;
  assert.doesNotThrow(() => { parsed = JSON.parse(out); }, '--json stdout must parse as JSON');
  assert.ok('content_delta' in parsed, 'JSON must have key content_delta');
  assert.ok('gitdiff_delta' in parsed, 'JSON must have key gitdiff_delta');
  assert.ok('discriminator_verdict' in parsed, 'JSON must have key discriminator_verdict');
  assert.ok(Array.isArray(parsed.content_delta), 'content_delta must be an array');
  assert.equal(typeof parsed.gitdiff_delta, 'boolean', 'gitdiff_delta must be a boolean');
  assert.equal(typeof parsed.discriminator_verdict, 'string', 'discriminator_verdict must be a string');
});
