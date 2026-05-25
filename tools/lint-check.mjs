#!/usr/bin/env node
// lint-check.mjs — portable `node --check` runner across tools/*.mjs
//
// Why: `node --check tools/*.mjs` does not expand the glob on Windows cmd
// (or via npm's default `script-shell`). This helper enumerates files in
// Node itself so the npm `lint` script works cross-platform.
//
// Exit 0 if all files parse; exit 1 with a per-file fail summary otherwise.

import { readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const dir = 'tools';
const files = readdirSync(dir).filter((f) => f.endsWith('.mjs'));
const fails = [];
for (const f of files) {
  const path = join(dir, f);
  try {
    execFileSync(process.execPath, ['--check', path], { stdio: ['ignore', 'ignore', 'pipe'] });
  } catch (err) {
    fails.push({ path, msg: String(err.stderr || err.message || err) });
  }
}
if (fails.length === 0) {
  process.stdout.write(`[lint-check] ${files.length} file(s) PASS\n`);
  process.exit(0);
}
process.stderr.write(`[lint-check] ${fails.length}/${files.length} file(s) FAILED:\n`);
for (const { path, msg } of fails) {
  process.stderr.write(`  ${path}: ${msg.split('\n')[0]}\n`);
}
process.exit(1);
