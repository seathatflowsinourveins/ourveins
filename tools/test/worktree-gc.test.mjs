import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { classifyWorktree, sweep, isContained } from '../worktree-gc.mjs';

function fixture() { return mkdtempSync(join(tmpdir(), 'wt-gc-')); }

test('C1-T1: status=done + age>24h → remove decision', () => {
  const meta = { status: 'done', last_activity: new Date(Date.now() - 25*3600*1000).toISOString() };
  assert.equal(classifyWorktree(meta).action, 'remove');
});
test('C1-T2: status=done + age<24h → keep', () => {
  const meta = { status: 'done', last_activity: new Date(Date.now() - 1*3600*1000).toISOString() };
  assert.equal(classifyWorktree(meta).action, 'keep');
});
test('C1-T3: status=orphan + age>72h → remove', () => {
  const meta = { status: 'orphan', last_activity: new Date(Date.now() - 73*3600*1000).toISOString() };
  assert.equal(classifyWorktree(meta).action, 'remove');
});
test('C1-T4: artifact-only + age>12h → prune-artifacts', () => {
  const meta = { status: 'active', artifact_only: true, last_activity: new Date(Date.now() - 13*3600*1000).toISOString() };
  assert.equal(classifyWorktree(meta).action, 'prune-artifacts');
});
test('C1-T5: uncommitted changes → always SKIP regardless of age', () => {
  const meta = { status: 'done', uncommitted: true, last_activity: new Date(Date.now() - 100*3600*1000).toISOString() };
  assert.equal(classifyWorktree(meta).action, 'skip');
  assert.match(classifyWorktree(meta).reason, /uncommitted/i);
});
test('C1-T6: sweep --dry-run never mutates', () => {
  const dir = fixture();
  mkdirSync(join(dir, '.gc-meta'), { recursive: true });
  writeFileSync(join(dir, '.gc-meta', 'W999.json'), JSON.stringify({ status: 'done', last_activity: '2020-01-01T00:00:00Z', worktree_path: dir }));
  const r = sweep({ metaDir: join(dir, '.gc-meta'), dryRun: true });
  assert.equal(r.mutated, false);
  assert.ok(r.decisions.length >= 1);
  rmSync(dir, { recursive: true });
});
test('C1-T7: isContained rejects escapes, accepts strict-inside, rejects root-itself', () => {
  const root = process.platform === 'win32' ? 'Z:\\wt\\W999' : '/wt/W999';
  const inside = join(root, 'node_modules');
  const escape = join(root, '..', 'W998', 'secrets');
  assert.equal(isContained(inside, root), true);
  assert.equal(isContained(escape, root), false);   // .. escape
  assert.equal(isContained(root, root), false);       // root itself, not "inside"
  assert.equal(isContained(root + '-sibling', root), false); // prefix-collision guard
});
test('C1-T8: execute-mode live-dirty gate skips mutation on non-git/dirty worktree (fail-safe)', () => {
  const dir = fixture();
  mkdirSync(join(dir, '.gc-meta'), { recursive: true });
  // worktree_path points at a NON-git dir → isWorktreeDirty fail-safes to true → skip.
  writeFileSync(join(dir, '.gc-meta', 'W999.json'), JSON.stringify({
    status: 'done', last_activity: '2020-01-01T00:00:00Z', worktree_path: join(dir, 'wt'),
  }));
  mkdirSync(join(dir, 'wt'), { recursive: true });
  const r = sweep({ metaDir: join(dir, '.gc-meta'), dryRun: false });
  assert.equal(r.mutated, false); // mutation refused by live-dirty gate
  const d = r.decisions.find(x => x.meta_file === 'W999.json');
  assert.equal(d.action, 'skip');
  assert.match(d.reason, /live git status dirty|unreadable/i);
  rmSync(dir, { recursive: true });
});
