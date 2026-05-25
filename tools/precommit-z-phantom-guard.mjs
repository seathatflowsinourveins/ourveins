#!/usr/bin/env node
// precommit-z-phantom-guard.mjs — W370-A F0 ongoing detection
//
// Detects writes to Z:\z\ phantom directory. Root cause: Claude Code's plugin-spawn
// boundary converts CLAUDE_PLUGIN_DATA from Z:\... to /z/... (POSIX form); Node on
// Windows then interprets /z/... as drive-relative → Z:\z\... Same class of bug as
// W317 MSYS-fix-wave neutralized at the hook-command layer. This guard catches the
// pathology at the plugin-data-dir layer.
//
// PASS: Z:\z\ absent OR contains 0 files. BLOCK (exit 2): any file present.
// Escape hatch: Z_PHANTOM_GUARD_DISABLE=1 (CR-5 b, operator-only).
//
// Cite-anchors:
//   - tmp/W370-AUDIT/W370-FINAL-SYNTHESIS.md F0
//   - docs/architecture/W317-FULL-MSYS-FIX-WAVE/ (sister pathology, hook layer)
//   - .claude/plugins/cache/openai-codex/codex/1.0.4/scripts/lib/state.mjs:42
//     (path.join(CLAUDE_PLUGIN_DATA, "state", slug-hash) — the locus that produces the write)

import { existsSync, readdirSync, lstatSync, mkdirSync, appendFileSync } from 'node:fs';
import { join } from 'node:path';

if (process.env.Z_PHANTOM_GUARD_DISABLE === '1') {
  // Codex r1 W372 fix-6: append-only forensic record (stderr alone is not audit control).
  // Records every bypass with timestamp/cwd/ppid for post-hoc abuse detection.
  try {
    const auditDir = 'Z:/claude-sota-installed/.claude/state';
    const auditFile = `${auditDir}/z-phantom-guard-bypass.jsonl`;
    const row = {
      ts: new Date().toISOString(),
      cwd: process.cwd(),
      ppid: process.ppid,
      session: process.env.CLAUDE_SESSION_ID || null,
      user: process.env.USER || process.env.USERNAME || null,
    };
    mkdirSync(auditDir, { recursive: true });
    appendFileSync(auditFile, JSON.stringify(row) + '\n');
  } catch { /* best-effort — audit-log failure must not block work */ }
  process.stderr.write('[z-phantom-guard] BYPASS via Z_PHANTOM_GUARD_DISABLE=1 (audit-logged)\n');
  process.exit(0);
}

const PHANTOM_ROOT = 'Z:/z';
if (!existsSync(PHANTOM_ROOT)) { process.exit(0); }

// Codex r1 fix-1: use lstatSync (does NOT follow symlinks) — codex flagged
// statSync could walk into parent Z:\claude via a Z:\z\claude reparse-point,
// false-positiving the guard. lstat treats symlinks as leaf entries we record
// (still a violation: ANY file/link under Z:\z\ is unwanted).
//
// Codex r2 fix: depth cap is now BLOCKING. cap-hit = exit-2 violation (cannot
// silently miss "any file under Z:\z\"). Cap raised 32 -> 128 to handle adversarial
// 1-char segment names (Windows MAX_PATH=260 leaves ~128 segments of /a/). 128 still
// prevents infinite recursion via symlink loops (lstatSync handles those anyway).
// W371 Stream A Mitigation C: empty-dir detection. Codex r3 (W370) flagged empty-dir
// shells (Z:\z\claude-sota-installed\ with 0 files) silently pass — phantom-write
// evidence of plugin spawns that mkdir but don't write files. Patch: count ANY entry
// (file OR symlink OR empty-subdir at depth>0) and BLOCK if total > 0.
const violations = [];
let depthCapHits = 0;
const DEPTH_CAP = 128;
function walk(dir, depth = 0) {
  if (depth > DEPTH_CAP) { depthCapHits++; return; }
  let entries;
  // Codex r1 W372 fix-5: unreadable subtree below root is a violation (silent-PASS hazard).
  // The `try { } catch { return }` previously skipped locked/permission-denied subdirs without
  // counting them — same class of bug as the depth-cap silent-pass that fix-2 closed.
  try { entries = readdirSync(dir); }
  catch (err) {
    if (depth > 0) {
      violations.push({ path: dir, size: 0, kind: 'unreadable-dir' });
    }
    return;
  }
  // W371 Mitigation C: empty-dir shell at depth>0 is a violation (phantom-mkdir evidence)
  if (entries.length === 0 && depth > 0) {
    violations.push({ path: dir, size: 0, kind: 'empty-dir-shell' });
    return;
  }
  for (const name of entries) {
    const full = join(dir, name);
    let st;
    try { st = lstatSync(full); } catch { continue; }
    if (st.isSymbolicLink()) {
      violations.push({ path: full, size: 0, kind: 'symlink-or-reparse' });
      continue;
    }
    if (st.isDirectory()) { walk(full, depth + 1); continue; }
    if (st.isFile()) { violations.push({ path: full, size: st.size, kind: 'file' }); }
  }
}
walk(PHANTOM_ROOT);
if (depthCapHits > 0) {
  // r2 fix: depth-cap-hit is now BLOCKING. Adversarial deep nesting would otherwise
  // silently pass the "any file" contract.
  process.stderr.write(`[z-phantom-guard] BLOCK: depth cap (${DEPTH_CAP}) exceeded ${depthCapHits} time(s) — paths beyond cap NOT verified; treat as contract violation\n`);
  process.exit(2);
}

if (violations.length === 0) {
  // Codex r1 W372 fix-4: "0 entries" not "0 files" — empty-dir-shells / symlinks / unreadable
  // dirs are also violations now, not just regular files.
  process.stderr.write('[z-phantom-guard] PASS — Z:\\z\\ contains 0 entries\n');
  process.exit(0);
}

// Codex r1 W372 fix-4: pluralize "entry/entries" + surface `kind` so operator sees WHY
// (empty-dir-shell vs file vs symlink vs unreadable-dir) and knows the right remediation.
process.stderr.write(`[z-phantom-guard] BLOCK — ${violations.length} unexpected entr${violations.length === 1 ? 'y' : 'ies'} under Z:\\z\\:\n`);
for (const v of violations.slice(0, 10)) {
  process.stderr.write(`  ${v.path} (${v.kind}, ${v.size}B)\n`);
}
process.stderr.write(`
Root: codex-openai-codex (and possibly other) plugins write to /z/<project>/.claude/plugins/data/...
which Node-on-Windows resolves to Z:\\z\\<project>\\.claude\\plugins\\data\\...
See tmp/W370-AUDIT/W370-FINAL-SYNTHESIS.md F0 + lib/state.mjs:42.

Remediation:
  1. robocopy Z:\\z\\<project>\\.claude\\plugins\\data <legit-path>\\.claude\\plugins\\data /MOVE /E
  2. Verify Z:\\z\\ empty (this guard returns 0)
  3. File upstream anthropics/claude-code issue if not yet filed

Escape: Z_PHANTOM_GUARD_DISABLE=1 (CR-5 b)
`);
process.exit(2);
