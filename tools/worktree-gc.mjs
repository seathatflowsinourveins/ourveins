#!/usr/bin/env node
// tools/worktree-gc.mjs — W364 tiered-TTL worktree garbage collector.
//
// Spec + tests per:
//   docs/superpowers/plans/2026-05-21-W364-pattern-lift-suite.md Task C1
//   umbrella spec §5.2 (multica .gc_meta pattern lift)
//
// Tiered TTL policy (classifyWorktree):
//   uncommitted   → SKIP ALWAYS (never `git worktree remove --force`; data-safety first)
//   done    >24h  → remove
//   orphan  >72h  → remove
//   artifact_only >12h → prune-artifacts (keep the worktree, drop scratch artifacts)
//   otherwise     → keep
//
// `sweep` defaults dryRun:true and returns { mutated, decisions }. In dry-run it performs
// ZERO filesystem/git mutations (decisions are reported, mutated:false). In --execute mode it
// applies decisions: `remove` → `git worktree remove <path>` (NO --force — uncommitted is
// SKIP-classified upstream so a clean remove is correct); `prune-artifacts` → delete the
// worktree's artifact dir(s) declared in meta.artifact_paths (best-effort).
//
// CLI: node tools/worktree-gc.mjs [--execute] [--meta-dir <path>]   (default dry-run)
//
// SOTA convergent pattern: file-as-metadata + tiered-TTL sweep + data-safety-first
// (never destroy uncommitted work). Anchors: multica .gc_meta tiered GC + git worktree
// lifecycle + LangGraph ThreadTTLConfig age-based reaping.

import { existsSync, readFileSync, readdirSync, rmSync, statSync } from 'node:fs';
import { join, resolve, isAbsolute, sep, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const HOUR_MS = 3600 * 1000;
const TTL_HOURS = { done: 24, orphan: 72, artifact_only: 12 };

// Allowlist of artifact dir basenames eligible for prune-artifacts. A path is pruned ONLY if
// (a) it resolves strictly inside meta.worktree_path AND (b) its basename is in this set.
// Per codex W364 round-1: prevents stale/malformed metadata from deleting data outside the
// worktree (absolute-path escape) or deleting non-scratch dirs.
const ARTIFACT_ALLOWLIST = new Set(['node_modules', '.next', '.turbo', 'dist', 'build', '.cache', 'coverage', '.parcel-cache', '.vite']);

// isContained(abs, root) → true iff `abs` resolves strictly inside `root` (not root itself,
// not a sibling, not an escape via `..`). Uses path.sep boundary to avoid prefix-collision
// (e.g. /a/foo vs /a/foobar).
export function isContained(abs, root) {
  if (!abs || !root) return false;
  const a = resolve(abs);
  const r = resolve(root);
  return a !== r && a.startsWith(r + sep);
}

// isWorktreeDirty(worktreePath) → true iff `git -C <wt> status --porcelain` reports any change.
// Live check (not the cached meta.uncommitted flag) — defends against stale metadata at
// execute time. Returns true (fail-safe = treat as dirty = skip) on any git error.
export function isWorktreeDirty(worktreePath) {
  if (!worktreePath) return true;
  try {
    const r = spawnSync('git', ['-C', worktreePath, 'status', '--porcelain'], { encoding: 'utf8' });
    if (r.status !== 0) return true; // git error → fail-safe dirty
    return (r.stdout || '').trim().length > 0;
  } catch {
    return true; // fail-safe dirty
  }
}

function ageHours(lastActivity) {
  if (!lastActivity) return Infinity; // no activity stamp => treat as maximally stale
  const t = new Date(lastActivity).getTime();
  if (Number.isNaN(t)) return Infinity; // unparseable => maximally stale
  return (Date.now() - t) / HOUR_MS;
}

// classifyWorktree(meta) → { action, reason }
//   action ∈ 'skip' | 'remove' | 'prune-artifacts' | 'keep'
// Precedence: uncommitted-safety FIRST (overrides every TTL tier, regardless of age),
// then status-based removal tiers, then artifact-only pruning, else keep.
export function classifyWorktree(meta) {
  if (!meta || typeof meta !== 'object') {
    return { action: 'keep', reason: 'no-meta' };
  }
  // 1. Data-safety: uncommitted work is NEVER reaped — skip regardless of age/status.
  if (meta.uncommitted === true) {
    return { action: 'skip', reason: 'uncommitted changes present; never force-removed (data-safety)' };
  }
  const age = ageHours(meta.last_activity);
  // 2. done / orphan removal tiers (status-driven).
  if (meta.status === 'done' && age > TTL_HOURS.done) {
    return { action: 'remove', reason: `status=done aged ${age.toFixed(1)}h > ${TTL_HOURS.done}h TTL` };
  }
  if (meta.status === 'orphan' && age > TTL_HOURS.orphan) {
    return { action: 'remove', reason: `status=orphan aged ${age.toFixed(1)}h > ${TTL_HOURS.orphan}h TTL` };
  }
  // 3. artifact-only pruning tier (independent of status — a still-active worktree can
  //    accumulate prunable scratch artifacts). Keeps the worktree; drops artifacts.
  if (meta.artifact_only === true && age > TTL_HOURS.artifact_only) {
    return { action: 'prune-artifacts', reason: `artifact_only aged ${age.toFixed(1)}h > ${TTL_HOURS.artifact_only}h TTL` };
  }
  // 4. Default: keep.
  return { action: 'keep', reason: `status=${meta.status ?? 'unknown'} aged ${Number.isFinite(age) ? age.toFixed(1) + 'h' : 'unknown'}; within TTL` };
}

function applyRemove(meta) {
  // Clean remove ONLY — uncommitted is SKIP-classified before we ever get here, so we
  // deliberately omit --force. A `git worktree remove` without --force refuses if the
  // worktree is dirty, which is the correct fail-safe.
  const wt = meta.worktree_path;
  if (!wt) return { ok: false, error: 'no worktree_path in meta' };
  try {
    const r = spawnSync('git', ['worktree', 'remove', wt], { encoding: 'utf8' });
    if (r.status === 0) return { ok: true, op: 'git worktree remove' };
    return { ok: false, error: `git worktree remove exit=${r.status}: ${(r.stderr || '').trim()}` };
  } catch (err) {
    return { ok: false, error: String(err && err.message || err) };
  }
}

function applyPruneArtifacts(meta) {
  // Delete declared artifact paths (best-effort). The worktree itself is preserved.
  // SAFETY (codex W364 r1): each path MUST (a) resolve strictly inside meta.worktree_path
  // AND (b) have an allowlisted scratch-dir basename. Paths failing either gate are REJECTED
  // (not pruned) and reported in `rejected[]` — never deleted. Absolute-path escape + stale/
  // malformed metadata can no longer destroy data outside the worktree or non-scratch dirs.
  const wt = meta.worktree_path;
  if (!wt) return { ok: false, error: 'no worktree_path in meta; refusing to prune' };
  const paths = Array.isArray(meta.artifact_paths) ? meta.artifact_paths : [];
  if (paths.length === 0) return { ok: true, op: 'prune-artifacts', note: 'no artifact_paths declared; nothing pruned', pruned: [], rejected: [] };
  const pruned = []; const errors = []; const rejected = [];
  for (const p of paths) {
    const abs = isAbsolute(p) ? resolve(p) : resolve(join(wt, p));
    if (!isContained(abs, wt)) {
      rejected.push({ path: abs, reason: 'escapes worktree_path (containment violation)' });
      continue;
    }
    if (!ARTIFACT_ALLOWLIST.has(basename(abs))) {
      rejected.push({ path: abs, reason: `basename '${basename(abs)}' not in artifact allowlist` });
      continue;
    }
    try { rmSync(abs, { recursive: true, force: true }); pruned.push(abs); }
    catch (err) { errors.push(`${abs}: ${String(err && err.message || err)}`); }
  }
  return { ok: errors.length === 0, op: 'prune-artifacts', pruned, rejected, errors };
}

// sweep({ metaDir, dryRun }) → { mutated, decisions }
//   Reads every *.json meta file in metaDir, classifies each, and (in --execute mode only)
//   applies remove / prune-artifacts decisions. dryRun defaults true → ZERO mutations.
export function sweep({ metaDir, dryRun = true } = {}) {
  const decisions = [];
  let mutated = false;
  if (!metaDir || !existsSync(metaDir)) {
    return { mutated: false, decisions };
  }
  let entries;
  try { entries = readdirSync(metaDir); }
  catch { return { mutated: false, decisions }; }
  for (const name of entries) {
    if (!name.endsWith('.json')) continue;
    const path = join(metaDir, name);
    let meta;
    try {
      const st = statSync(path);
      if (!st.isFile()) continue;
      meta = JSON.parse(readFileSync(path, 'utf8'));
    } catch (err) {
      decisions.push({ meta_file: name, action: 'skip', reason: `parse-error: ${String(err && err.message || err)}`, applied: false });
      continue;
    }
    const cls = classifyWorktree(meta);
    const decision = {
      meta_file: name,
      worktree_path: meta.worktree_path ?? null,
      status: meta.status ?? null,
      action: cls.action,
      reason: cls.reason,
      applied: false,
    };
    if (!dryRun && (cls.action === 'remove' || cls.action === 'prune-artifacts')) {
      // Live dirty-gate (codex W364 r1): re-check git state at execute time, NOT the cached
      // meta.uncommitted flag. Stale metadata must never cause a mutation against a worktree
      // that has become dirty since the meta was written. Fail-safe: skip on any dirtiness.
      if (isWorktreeDirty(meta.worktree_path)) {
        decision.action = 'skip';
        decision.reason = `live git status dirty (or unreadable) at execute time; mutation refused (was: ${cls.action} — ${cls.reason})`;
        decision.applied = false;
      } else {
        const res = cls.action === 'remove' ? applyRemove(meta) : applyPruneArtifacts(meta);
        decision.applied = res.ok;
        decision.apply_result = res;
        if (res.ok) mutated = true;
      }
    }
    decisions.push(decision);
  }
  return { mutated, decisions };
}

// CLI entrypoint. Cross-platform main-module detection (Windows file:///Z:/... vs *nix).
const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] && resolve(process.argv[1]) === __filename) {
  const args = process.argv.slice(2);
  const get = (flag, def = null) => { const i = args.indexOf(flag); return i >= 0 ? args[i + 1] : def; };
  const execute = args.includes('--execute');
  const metaDir = get('--meta-dir', join('.claude', 'state', 'gc-meta'));
  const result = sweep({ metaDir, dryRun: !execute });
  console.log(JSON.stringify({ mode: execute ? 'execute' : 'dry-run', metaDir, ...result }, null, 2));
  // Exit 0 always (GC is advisory/janitorial; failures surface in decisions[].apply_result).
  process.exit(0);
}
