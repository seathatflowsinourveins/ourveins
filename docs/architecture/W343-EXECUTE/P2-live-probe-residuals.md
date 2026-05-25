# W343 P2 — Live-Probe Residuals (codex r2 META-AUDIT)

**Wave**: W343 /goal P2
**Date**: 2026-05-20
**Runtime**: `Z:\claude-sota-installed`
**Operator**: live-probe verification of W342 Stream C UNVERIFIABLE residuals

---

## Summary (1 para)

Three residual probes executed against the live runtime. **PROBE-1 (ECC load_failures=1)** is UNVERIFIABLE-LIVE-ONLY: `.claude/debug/` contains exactly one stale codex-review log dated 2026-05-17 (no plugin-load diagnostics; debug logging not currently emitting plugin-load events), and `.claude/plugins/installed_plugins.json` has **no** `lastError` / `loadStatus` / `loadError` fields anywhere — the everything-claude-code@everything-claude-code entry (L15-22) shows only standard scope/installPath/version/installedAt/lastUpdated fields; CLAUDE.md L35's "load_failures=1" claim originates from a codex r2 axis-9 probe in a prior session and CANNOT be reproduced from current on-disk state. **PROBE-2 (SubagentStop guard false-positive rate)** is an INSTRUMENTATION-GAP: `tools/subagent-stop-guard.mjs` (5,596 bytes, wired correctly in `.claude/settings.json:231-239`) is silent-by-design (no audit-trail writes; only stderr on block + optional `CLAUDE_SUBAGENT_STOP_GUARD_DEBUG=1` error logging), and `.claude/state/audit/` directory does NOT exist. Zero fires can be counted ⇒ rate UNMEASURABLE. **PROBE-3 (session-report analyzer)** is CONFIRMED-PRESENT: canonical path `Z:\claude-sota-installed\.claude\plugins\cache\claude-plugins-official\session-report\40609072c000\skills\session-report\analyze-sessions.mjs` (28,225 bytes, matches active install per installed_plugins.json L180-187 gitCommitSha 40609072c00044b49f169c6af9c93e2827f64728); corpus = **3,475 jsonl files / 10,516.24 MB** (~10.3 GB) under `.claude/projects/Z--claude-sota-installed/` — analyzer NOT executed (heavy).

---

## PROBE-1: ECC load_failures=1 fresh verification

**Verdict**: `UNVERIFIABLE-LIVE-ONLY`

**Evidence**:
- `.claude/debug/` contains 1 file: `codex-W272-decisions-review-1779050836.log` (11,017 bytes, mtime 2026-05-17 16:47:45). Grep for `load_failures|everything-claude-code|ECC|plugin failed|load error|loadError|lastError` → **0 matches**.
- `.claude/plugins/installed_plugins.json` everything-claude-code entry (L15-22): standard fields only (scope, projectPath, installPath, version `2.0.0-rc.1`, installedAt 2026-05-17, lastUpdated 2026-05-20T13:59:15.128Z). Grep for `lastError|loadStatus|load_failures|loadError|failed` → **0 matches** anywhere in installed_plugins.json.
- No `.claude/debug/plugin-load-*.log` or similar diagnostic emitter — CC plugin-load failures (if occurring) are not currently being persisted to debug log.

**Interpretation**: The CLAUDE.md L35 `load_failures=1` count likely came from a codex r2 probe of CC stdout/stderr at session start (transient runtime telemetry, not durable disk state). To verify in future, would need (a) CC verbose-startup capture, (b) NDJSON debug-log channel enabled, or (c) operator-side `claude --debug` invocation captured to file.

---

## PROBE-2: SubagentStop guard false-positive monitoring

**Verdict**: `INSTRUMENTATION-GAP`

**Evidence**:
- `tools/subagent-stop-guard.mjs` exists (5,596 bytes), wired in `.claude/settings.json:231-239` SubagentStop hooks block, timeout 5s.
- `.claude/state/audit/` directory **does NOT exist** (`Test-Path` → False). `.claude/state/` has only `archive/`, `gateguard/`, `sessions/`, `tmp/` subdirs.
- Reading the guard source: writes ONLY to stderr on block (L127) + optional debug stderr (L140) gated on `CLAUDE_SUBAGENT_STOP_GUARD_DEBUG=1`. No file-write/JSONL append. Allow-path is silent (exit 0).
- Zero events captured ⇒ neither total fire-count nor false-positive count is computable from disk.

**Proposed minimal logging shim** (CR-2-compliant, ≤2 KB, append-only JSONL):

Within `subagent-stop-guard.mjs` add (after L100 `extractMessage`):

```js
// W343-P2 instrumentation — append-only audit JSONL (~50 bytes/event)
try {
  const auditDir = process.env.SUBAGENT_STOP_AUDIT_DIR
    || 'Z:/claude-sota-installed/.claude/state/audit';
  const fs = await import('node:fs');
  fs.mkdirSync(auditDir, { recursive: true });
  const day = new Date().toISOString().slice(0, 10);
  const rec = {
    ts: new Date().toISOString(),
    agent_id: ev.agent_id || ev.subagent_id || ev.session_id || null,
    decision: trimmed.length > 0 ? 'allow-nonempty'
            : msg.includes(NO_FINDINGS_SENTINEL) ? 'allow-sentinel'
            : 'block-empty',
    msg_len: msg.length,
  };
  fs.appendFileSync(`${auditDir}/subagent-stop-${day}.jsonl`, JSON.stringify(rec) + '\n');
} catch { /* fail-silent: never break the guard */ }
```

Inserts within `main()` before the decision branches (L104) so all three decision paths are recorded. Adds ~30 LOC; file remains <8 KB. Reuses `SUBAGENT_STOP_AUDIT_DIR` env override (default `.claude/state/audit/`). After ≥7d, count: `block-empty / (allow-nonempty + allow-sentinel + block-empty)` → false-positive proxy (`block-empty` against subagents that did legitimately want to emit findings, manually triaged).

---

## PROBE-3: session-report analyzer locate

**Verdict**: `CONFIRMED-PRESENT (NOT EXECUTED)`

**Canonical path** (active install per `installed_plugins.json` L180-187, gitCommitSha `40609072c00044b49f169c6af9c93e2827f64728`):

```
Z:\claude-sota-installed\.claude\plugins\cache\claude-plugins-official\session-report\40609072c000\skills\session-report\analyze-sessions.mjs
```

Size: **28,225 bytes**. Identical-size copies exist under prior gitCommitSha subdirs (`019a87b0b7b2`, `01ffc11b4398`, ... — historical install snapshots, NOT the active version).

**Corpus size**:
- Path: `Z:\claude-sota-installed\.claude\projects\Z--claude-sota-installed\`
- Files: **3,475 jsonl**
- Total bytes: **11,027,079,089** (~**10,516.24 MB** / ~10.3 GB)

**Invocation pattern** (per session-report skill SKILL.md convention — not executed here):

```powershell
node "Z:\claude-sota-installed\.claude\plugins\cache\claude-plugins-official\session-report\40609072c000\skills\session-report\analyze-sessions.mjs" `
  --projects-dir "Z:\claude-sota-installed\.claude\projects\Z--claude-sota-installed" `
  --output report.html
```

**Recommendation**: Given 10.3 GB / 3,475-jsonl corpus, run analyzer **off-the-critical-path** via `claude --bg` (W259-v8 U4 mode 4) or a dedicated subagent — heavy I/O + parse; do NOT inline.

---

## Path

`Z:\claude-sota-installed\docs\architecture\W343-EXECUTE\P2-live-probe-residuals.md`
