#!/usr/bin/env node
// W344 Z6 P6.2 — concurrent-worktree collision guard. CR-2 ≤2KB.
// Cites: SPI/git-worktree + Anthropic CCBP a28cd96b + claudekit.
// Blocks (exit 2) if ANOTHER worktree is on this branch AND this worktree
// has staged/uncommitted changes (operator-collision risk per W343 retro).
import { execSync } from 'node:child_process';
// W435: normalize POSIX /z/... to Z:\ (git output on Windows via Git Bash).
// Extracted per codex r1 REVISE — must apply to both --show-toplevel AND parsed porcelain paths.
const normPath = (s) => /^\/[a-zA-Z]\//.test(s) ? s.replace(/^\/([a-zA-Z])\//, (_, d) => `${d.toUpperCase()}:\\`).replace(/\//g, '\\') : s;
const sh = (c) => execSync(c, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
const w = (m) => console.warn(`[cr7-wt] ${m}`);
try {
  const br = sh('git rev-parse --abbrev-ref HEAD');
  if (br === 'HEAD') process.exit(0);
  const mine = normPath(sh('git rev-parse --show-toplevel'));
  const blocks = sh('git worktree list --porcelain').split(/\n\n+/).map(b => {
    const o = {}; for (const ln of b.split('\n')) { const [k, ...v] = ln.split(' '); if (k) o[k] = v.join(' '); }
    if (o.worktree) o.worktree = normPath(o.worktree);
    return o;
  });
  const peers = blocks.filter(b => b.branch === `refs/heads/${br}` && b.worktree && b.worktree !== mine);
  if (peers.length === 0) process.exit(0);
  if (!sh('git status --porcelain')) { w(`peer on '${br}' but clean; allow.`); process.exit(0); }
  console.error(
    `[cr7-wt] FAIL: branch '${br}' also at: ${peers.map(p => p.worktree).join(', ')}\n` +
    `  This worktree has uncommitted changes. Concurrent edits desync state.\n` +
    `  CR-7 (W344): one worktree per session, OR commit on side-branch, OR /session-handoff.`
  );
  process.exit(2);
} catch (e) {
  // Fail-CLOSED on internal errors (codex W344 R5 F7 closure). Data-loss guard
  // must NOT silently allow commit when probes fail. Operator escape:
  // CR7_WORKTREE_COLLISION_DISABLE=1 (CR-5 condition-(b) sanctioned bypass).
  if (process.env.CR7_WORKTREE_COLLISION_DISABLE === '1') {
    w(`internal error bypassed via CR7_WORKTREE_COLLISION_DISABLE: ${e.message?.slice(0, 160)}`);
    process.exit(0);
  }
  console.error(`[cr7-wt] FAIL-CLOSED on internal error: ${e.message?.slice(0, 200)}`);
  console.error(`  Set CR7_WORKTREE_COLLISION_DISABLE=1 to override (operator-only).`);
  process.exit(2);
}
