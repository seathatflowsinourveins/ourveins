#!/usr/bin/env node
// precheck-worktree-add.mjs — W352 S5 — cap-in-code WorktreeAdd guard
// Per CLAUDE.md L14 (W352-amended) + DESIGN.md §2 S5.
// Trigger: PreToolUse[Bash] when tool_input.command matches `git worktree add`.
// Action: reject (exit 2) if `git worktree list | wc -l` >= 6.
// Bypass: $env:WORKTREE_ADD_CAP_DISABLE=1 OR file marker at
//   <repo-root>/.claude/state/worktree-add-cap-bypass.marker (CR-5 condition-(b)).
// W353-S0 migration: marker path is now resolved per-worktree via
//   `git rev-parse --show-toplevel` instead of the legacy hardcoded
//   "Z:/claude-sota-installed/.claude/state/worktree-add-cap-bypass.marker"
//   (which only worked in the primary worktree). Operators with a marker
//   at the legacy path must copy/move it to each active worktree's
//   .claude/state/worktree-add-cap-bypass.marker — the old absolute path
//   is no longer honored.
// Cite: gitworktrees(7) + CCBP claude-settings.md hook discipline
//   + Anthropic CC EnterWorktree hook event.

import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';

const CAP = 6;

function repoRoot() {
  try {
    let r = execSync('git rev-parse --show-toplevel', { encoding: 'utf8' }).trim();
    // W435: git returns POSIX /z/... on Windows; normalize to Z:\ to avoid phantom Z:\z\ paths.
    r = r.replace(/^\/([a-zA-Z])\//, (_, d) => `${d.toUpperCase()}:\\`).replace(/\//g, '\\');
    return r;
  } catch {
    return '';
  }
}

async function main() {
  if (process.env.WORKTREE_ADD_CAP_DISABLE === '1') process.exit(0);
  const root = repoRoot();
  if (root && existsSync(path.join(root, '.claude/state/worktree-add-cap-bypass.marker'))) process.exit(0);

  let payload = '';
  for await (const chunk of process.stdin) payload += chunk;
  let cmd = '';
  try { cmd = JSON.parse(payload || '{}')?.tool_input?.command || ''; } catch {}
  if (!/\bgit\s+worktree\s+add\b/.test(cmd)) process.exit(0);

  try {
    const out = execSync('git worktree list', { encoding: 'utf8' });
    const count = out.trim().split('\n').filter(Boolean).length;
    if (count >= CAP) {
      process.stderr.write(`W352-S5 BLOCK: worktree cap ${CAP} reached (count=${count}). Remove a worktree or set WORKTREE_ADD_CAP_DISABLE=1.\n`);
      process.exit(2);
    }
  } catch (e) {
    process.stderr.write(`[precheck-worktree-add] git command failed: ${e?.message || e}\n`);
    process.exit(0); // fail-open on probe error
  }
  process.exit(0);
}

main().catch(() => process.exit(0));
